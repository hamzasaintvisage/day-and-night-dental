<?php
/**
 * Day Night Dental — contact / registration enquiry endpoint (Hostinger / PHP 8).
 *
 * POST JSON -> validate -> back up -> email via Resend -> JSON response.
 * Mirrors the hardened logic of the audited Cloudflare function: origin allowlist,
 * honeypot, client-measured time-trap, length caps, field-count cap, CRLF rejection
 * (email-header-injection guard), HTML escaping, per-IP rate limit. No persistent
 * process. No Composer — uses built-in cURL. Secrets come from _config.php (never
 * web-served). A best-effort encrypted-at-rest? no — plaintext NDJSON backup ABOVE
 * the web root, perms 0600, auto-purged after 90 days by cron. Email is the primary
 * record; the backup is the fail-safe so an enquiry is never silently lost.
 */

declare(strict_types=1);
ini_set('display_errors', '0'); // never surface PHP errors/warnings to the client

// --- Response helper: JSON + defence-in-depth headers (since .htaccess doesn't always
//     cover PHP responses identically). Never leak internals. --------------------------
function respond(array $obj, int $status = 200, array $extra = []): void {
    header_remove('X-Powered-By'); // don't disclose the exact PHP version
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: DENY');
    foreach ($extra as $k => $v) { header($k . ': ' . $v); }
    echo json_encode($obj);
    exit;
}

// --- Config (Resend key + recipients + site). Lives in _config.php, denied to the web.
$cfgPath = __DIR__ . '/_config.php';
if (!is_file($cfgPath)) {
    error_log('send-enquiry: _config.php missing');
    respond(['ok' => false, 'error' => 'Email not configured'], 500);
}
require $cfgPath; // defines DND_RESEND_KEY, DND_SEND_FROM, DND_ENQUIRY_TO, DND_SITE

// --- Constants (kept in sync with the JS version) -----------------------------------
const CAPS = [
    'name' => 100, 'firstName' => 100, 'lastName' => 100, 'email' => 150, 'phone' => 30,
    'address' => 200, 'postcode' => 200, 'notes' => 2000, 'message' => 2000,
];
const DEFAULT_TEXT_CAP = 2000;
const MIN_FILL_MS = 600;            // faster than this = bot
const MAX_FIELDS = 40;
const MAX_BODY_BYTES = 64 * 1024;   // 64 KB hard cap on the request body
const RATE_LIMIT_MAX = 8;           // submissions per window per IP
const RATE_LIMIT_WINDOW = 60;       // seconds
const RESEND_TIMEOUT = 8;           // seconds
$SKIP_FIELDS = ['bot-field', 'ts', 'elapsed', 'turnstileToken', 'form-name', 'formType'];
$MULTILINE   = ['notes', 'message'];
$STATIC_ALLOWED = ['https://www.daynightdental.co.uk', 'https://daynightdental.co.uk'];
const EMAIL_RE = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

// --- Helpers ------------------------------------------------------------------------
function esc($v): string {
    return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function label_for(string $key): string {
    $spaced = preg_replace('/([A-Z])/', ' $1', $key);
    $spaced = preg_replace('/[_-]+/', ' ', $spaced);
    return ucfirst(strtolower(trim($spaced)));
}
function origin_allowed(?string $origin, array $static): bool {
    if (!$origin) return false;
    $parts = parse_url($origin);
    if (!$parts || empty($parts['scheme']) || empty($parts['host'])) return false;
    // Exact, case-sensitive match. Real browsers always send a lowercased, untrimmed
    // Origin, so do NOT normalise case/whitespace here — doing so would accept spoofed
    // variants like HTTPS://DAYNIGHTDENTAL.CO.UK or space-padded origins.
    $host = $parts['scheme'] . '://' . $parts['host'];
    if (!empty($parts['port'])) $host .= ':' . $parts['port'];
    if (in_array($host, $static, true)) return true;
    // localhost is only trusted in development. A scripted client can spoof
    // Origin: http://localhost, so production must reject it. Dev opts in by
    // defining DND_ALLOW_LOCALHOST in _config.php (never set on the live server).
    if (defined('DND_ALLOW_LOCALHOST') && DND_ALLOW_LOCALHOST
        && preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $host)) return true;
    return false;
}
// The site is served DIRECTLY by Hostinger (no Cloudflare proxy in front), so forwarded-IP
// headers (CF-Connecting-IP, X-Forwarded-For) are client-spoofable and MUST NOT be trusted —
// trusting them lets an attacker rotate the value to defeat the rate limiter. Use the real peer.
function client_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}
// Rate-limit bucket key. Normalise IPv6 to its /64 prefix so one allocation can't rotate
// individual addresses to win fresh buckets.
function rate_limit_key(string $ip): string {
    if (strpos($ip, ':') !== false) {
        $bin = @inet_pton($ip);
        if ($bin !== false && strlen($bin) === 16) $ip = bin2hex(substr($bin, 0, 8)) . '/64';
    }
    return hash('sha256', $ip);
}
// Resolve a private storage dir ABOVE the web root (best effort), with safe fallbacks.
function private_dir(): ?string {
    $candidates = [];
    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $candidates[] = dirname($_SERVER['DOCUMENT_ROOT']) . '/dnd-private';
    }
    $candidates[] = dirname(__DIR__, 2) . '/dnd-private';   // .../<domain>/dnd-private (above public_html)
    $candidates[] = sys_get_temp_dir() . '/dnd-private';     // last resort
    foreach ($candidates as $dir) {
        if (is_dir($dir) || @mkdir($dir, 0700, true)) {
            if (is_writable($dir)) return $dir;
        }
    }
    return null;
}
function validate_field(string $key, $value, array $multiline): ?string {
    if ($value === null) return null;
    if (is_bool($value) || is_int($value) || is_float($value)) return null;
    if (!is_string($value)) return label_for($key) . ' is invalid';
    $cap = CAPS[$key] ?? DEFAULT_TEXT_CAP;
    if (mb_strlen($value) > $cap) return label_for($key) . ' is too long';
    if (!in_array($key, $multiline, true) && preg_match('/[\r\n\t]/', $value)) {
        return label_for($key) . ' contains invalid characters';
    }
    return null;
}

// === 0) Method + content-type + body-size ===========================================
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(['ok' => false, 'error' => 'Method not allowed'], 405, ['Allow' => 'POST']);
}
$ctype = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($ctype, 'application/json') === false) {
    respond(['ok' => false, 'error' => 'Unsupported content type'], 415);
}
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false) respond(['ok' => false, 'error' => 'Invalid request'], 400);
if (strlen($raw) > MAX_BODY_BYTES) respond(['ok' => false, 'error' => 'Request too large'], 413);

// === 1) Parse body ==================================================================
$body = json_decode($raw, true);
if (!is_array($body) || array_is_list($body)) {
    respond(['ok' => false, 'error' => 'Invalid JSON'], 400);
}
if (count($body) > MAX_FIELDS) respond(['ok' => false, 'error' => 'Too many fields'], 400);

// === 2) Form type ===================================================================
$formType = $body['formType'] ?? null;
if ($formType !== 'contact' && $formType !== 'register') {
    respond(['ok' => false, 'error' => 'Unknown form type'], 400);
}

// === 3) Origin / referer allowlist ==================================================
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? null);
if (!origin_allowed($origin, $STATIC_ALLOWED)) {
    error_log('send-enquiry: blocked origin/referer');
    respond(['ok' => false, 'error' => 'Forbidden'], 403);
}

// === 3b) Per-IP rate limit (file-based, flock, hashed IP) ===========================
$priv = private_dir();
if ($priv) {
    $rlDir = $priv . '/rl';
    if (is_dir($rlDir) || @mkdir($rlDir, 0700, true)) {
        $rlFile = $rlDir . '/' . rate_limit_key(client_ip()) . '.json';
        $fh = @fopen($rlFile, 'c+');
        if ($fh) {
            flock($fh, LOCK_EX);
            $data = json_decode((string)stream_get_contents($fh), true) ?: ['n' => 0, 't' => 0];
            $now = time();
            if (($now - ($data['t'] ?? 0)) > RATE_LIMIT_WINDOW) { $data = ['n' => 0, 't' => $now]; }
            if (($data['n'] ?? 0) >= RATE_LIMIT_MAX) {
                flock($fh, LOCK_UN); fclose($fh);
                respond(['ok' => false, 'error' => 'Too many requests. Please wait a minute and try again, or call us.'], 429);
            }
            $data['n'] = ($data['n'] ?? 0) + 1;
            ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($data));
            flock($fh, LOCK_UN); fclose($fh);
        }
    }
}

// === 4) Honeypot — silently accept ==================================================
if (isset($body['bot-field']) && is_string($body['bot-field']) && $body['bot-field'] !== '') {
    respond(['ok' => true]);
}

// === 5) Time-trap (client-measured elapsed; immune to clock skew) ===================
if (isset($body['elapsed']) && is_numeric($body['elapsed'])) {
    $elapsed = (float)$body['elapsed'];
    if ($elapsed > 0 && $elapsed < MIN_FILL_MS) {
        respond(['ok' => true]); // silently drop, don't tip off bots
    }
}

// === 6) Required fields =============================================================
$required = $formType === 'contact'
    ? ['name', 'phone', 'email']
    : ['firstName', 'lastName', 'phone', 'email', 'consent'];
foreach ($required as $key) {
    $val = $body[$key] ?? null;
    if ($key === 'consent') {
        if (!$val) respond(['ok' => false, 'error' => 'Consent is required'], 400);
        continue;
    }
    if (!is_string($val) || trim($val) === '') {
        respond(['ok' => false, 'error' => label_for($key) . ' is required'], 400);
    }
}

// === 7) Length caps + injection chars on every field ================================
foreach ($body as $key => $val) {
    $err = validate_field((string)$key, $val, $MULTILINE);
    if ($err) respond(['ok' => false, 'error' => $err], 400);
}

// === 8) Email format ================================================================
$email = is_string($body['email'] ?? null) ? trim($body['email']) : '';
if (!preg_match(EMAIL_RE, $email) || mb_strlen($email) > CAPS['email']) {
    respond(['ok' => false, 'error' => 'A valid email is required'], 400);
}

// === 9) Build the email =============================================================
$formLabel = $formType === 'contact' ? 'Website enquiry (Contact)' : 'New patient registration';
$subject = $formType === 'contact'
    ? 'New website enquiry — ' . $body['name']
    : 'New patient registration — ' . $body['firstName'] . ' ' . $body['lastName'];

$rows = [];
foreach ($body as $key => $val) {
    if (in_array($key, $SKIP_FIELDS, true) || $val === null || $val === '') continue;
    $rows[] = [
        'label' => label_for((string)$key),
        'value' => is_bool($val) ? ($val ? 'Yes' : 'No') : (string)$val,
    ];
}
$when = (new DateTime('now', new DateTimeZone('Europe/London')))->format('l, j F Y, H:i');
$SITE = defined('DND_SITE') ? DND_SITE : 'https://daynightdental.co.uk';

$textLines = [$formLabel, 'Received: ' . $when, ''];
foreach ($rows as $r) $textLines[] = $r['label'] . ': ' . $r['value'];
$textLines[] = '';
$textLines[] = '— Sent from ' . $SITE;
$text = implode("\n", $textLines);

$htmlRows = '';
foreach ($rows as $r) {
    $htmlRows .= '<tr><td style="padding:6px 12px;font-weight:600;color:#444;vertical-align:top;white-space:nowrap;">'
        . esc($r['label']) . '</td><td style="padding:6px 12px;color:#111;">' . esc($r['value']) . '</td></tr>';
}
$html = '<!doctype html><html><body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#111;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">'
    . '<tr><td style="padding:24px;text-align:center;background:#fff;"><img src="' . esc($SITE) . '/logo.png" alt="Day Night Dental" width="180" style="max-width:180px;height:auto;display:inline-block;" /></td></tr>'
    . '<tr><td style="padding:24px;"><h1 style="margin:0 0 4px;font-size:18px;color:#0b2545;">' . esc($formLabel) . '</h1>'
    . '<p style="margin:0 0 16px;font-size:13px;color:#777;">Received: ' . esc($when) . '</p>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">' . $htmlRows . '</table></td></tr>'
    . '<tr><td style="padding:16px 24px;background:#f4f5f7;text-align:center;font-size:12px;color:#999;">Sent from <a href="' . esc($SITE) . '" style="color:#0b2545;">' . esc($SITE) . '</a></td></tr>'
    . '</table></body></html>';

// === 10) BACKUP STORE (fail-safe; written BEFORE the email) =========================
// NDJSON above the web root, perms 0600. Best-effort: a storage failure must NOT block
// the email. No raw IPs stored (hashed). Auto-purged after 90 days by cron.
if ($priv) {
    $record = [
        'at' => gmdate('c'),
        'formType' => $formType,
        'fields' => array_diff_key($body, array_flip(['bot-field', 'ts', 'elapsed', 'turnstileToken', 'form-name'])),
        'iph' => substr(hash('sha256', client_ip()), 0, 16),
    ];
    $line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
    $store = $priv . '/enquiries.ndjson';
    $bh = @fopen($store, 'a');
    if ($bh) {
        if (flock($bh, LOCK_EX)) { fwrite($bh, $line); fflush($bh); flock($bh, LOCK_UN); }
        fclose($bh);
        @chmod($store, 0600);
    } else {
        error_log('send-enquiry: backup write failed (continuing)');
    }
}

// === 11) Recipients + sender ========================================================
if (!defined('DND_RESEND_KEY') || !DND_RESEND_KEY || !defined('DND_SEND_FROM') || !DND_SEND_FROM) {
    error_log('send-enquiry: missing Resend key or sender');
    respond(['ok' => false, 'error' => 'Email not configured'], 500);
}
$to = array_values(array_filter(array_map('trim', explode(',', defined('DND_ENQUIRY_TO') && DND_ENQUIRY_TO ? DND_ENQUIRY_TO : 'reception@daynightdental.co.uk'))));

// === 12) Send via Resend (built-in cURL, short timeout) =============================
$payload = json_encode([
    'from' => DND_SEND_FROM,
    'to' => $to,
    'subject' => $subject,
    'html' => $html,
    'text' => $text,
    'reply_to' => $email,
]);
$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . DND_RESEND_KEY, 'Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => RESEND_TIMEOUT,
    CURLOPT_CONNECTTIMEOUT => 5,
]);
$resBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($resBody === false || $httpCode < 200 || $httpCode >= 300) {
    error_log('send-enquiry: Resend error http=' . $httpCode . ' ' . substr((string)$curlErr, 0, 120) . ' ' . substr((string)$resBody, 0, 200));
    // Flag this enquiry for follow-up. Full data is already in the main backup; this is the
    // short "didn't email — chase it" list the monitor watches and the team works from.
    if ($priv) {
        @file_put_contents(
            $priv . '/failed-sends.ndjson',
            json_encode(['at' => gmdate('c'), 'formType' => $formType, 'email' => $email, 'http' => $httpCode], JSON_UNESCAPED_SLASHES) . "\n",
            FILE_APPEND | LOCK_EX
        );
        @chmod($priv . '/failed-sends.ndjson', 0600);
    }
    respond(['ok' => false, 'error' => 'Failed to send'], 502);
}
respond(['ok' => true]);

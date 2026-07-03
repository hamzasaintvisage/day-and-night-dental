<?php
/**
 * Day Night Dental — contact / registration enquiry endpoint (Hostinger / PHP 8).
 *
 * POST JSON -> validate (locked form contract, shared with tests via _validation.php)
 * -> back up -> email via Resend -> JSON response.
 * Mirrors the hardened logic of the audited Cloudflare function: origin allowlist,
 * honeypot, client-measured time-trap, length caps, field-count cap, unknown-key
 * rejection, CRLF rejection (email-header-injection guard), HTML escaping, per-IP and
 * per-email rate limits (FAIL-CLOSED when no store is usable), duplicate-submission
 * drop (idempotent ok within 10 minutes), reCAPTCHA v3 (only when a secret is configured),
 * and a per-request correlation id (returned as "ref" on errors, prefixed to every log
 * line). No persistent process. No Composer — uses built-in cURL. Secrets come from
 * _config.php (never web-served). A best-effort encrypted-at-rest? no — plaintext NDJSON
 * backup ABOVE the web root, perms 0600, auto-purged after 90 days by cron. Email is the
 * primary record; the backup is the fail-safe so an enquiry is never silently lost.
 */

declare(strict_types=1);
ini_set('display_errors', '0'); // never surface PHP errors/warnings to the client
// Create every private file/dir with restrictive perms from the moment of creation, so there
// is no world-readable TOCTOU window before a later chmod. 0077 => new dirs 0700, files 0600.
umask(0077);

// --- Correlation id: 8 hex chars per request. Returned as "ref" on every error response
//     and prefixed to every log line, so a patient-reported error can be matched to the
//     server log without leaking any internals to the client. -------------------------
define('DND_REF', bin2hex(random_bytes(4)));
function logref(string $msg): void {
    error_log('send-enquiry[' . DND_REF . ']: ' . $msg);
}

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
    if ($status >= 400 && !isset($obj['ref'])) $obj['ref'] = DND_REF; // correlate errors with logs
    $json = json_encode($obj);
    echo $json === false ? '{"ok":false,"error":"Internal error"}' : $json;
    exit;
}

// --- Config (Resend key + recipients + site). Lives in _config.php, denied to the web.
$cfgPath = __DIR__ . '/_config.php';
if (!is_file($cfgPath)) {
    logref('_config.php missing');
    respond(['ok' => false, 'error' => 'Email not configured'], 500);
}
require $cfgPath; // defines DND_RESEND_KEY, DND_SEND_FROM, DND_ENQUIRY_TO, DND_SITE

// --- Shared validation (the locked form contract + field caps + fingerprint). Split into
//     _validation.php so the CLI test suite exercises exactly the code that runs here.
$valPath = __DIR__ . '/_validation.php';
if (!is_file($valPath)) {
    logref('_validation.php missing');
    respond(['ok' => false, 'error' => 'We could not process this right now, please call us on the practice number.'], 503);
}
require $valPath; // defines CAPS, ALLOWED/REQUIRED/EMAIL_FIELD_ORDER/BACKUP_FIELDS, validate_* etc.

// --- Constants (transport + abuse limits; field rules live in _validation.php) -------
const MIN_FILL_MS = 600;            // faster than this = bot
const MAX_FIELDS = 40;
const MAX_BODY_BYTES = 64 * 1024;   // 64 KB hard cap on the request body
const RATE_LIMIT_MAX = 5;           // submissions per burst window per IP (tightened from 8)
const RATE_LIMIT_WINDOW = 60;       // seconds
const RATE_LIMIT_EMAIL_MAX = 8;     // submissions per window per email address
const RATE_LIMIT_EMAIL_WINDOW = 60; // seconds
const IP_HOUR_MAX = 40;             // second per-IP window: sustained hourly cap
const IP_HOUR_WINDOW = 3600;        // seconds
const EMAIL_DAY_MAX = 20;           // per-email daily cap (one address across a whole day)
const EMAIL_DAY_WINDOW = 86400;     // seconds
const GLOBAL_MAX = 60;              // circuit breaker: accepted sends across the whole site per window
const GLOBAL_WINDOW = 3600;         // seconds
const DUPLICATE_WINDOW = 600;       // seconds an identical submission is answered ok without re-sending
const RESEND_TIMEOUT = 8;           // seconds
const RECAPTCHA_TIMEOUT = 5;        // seconds (siteverify is fast; keep the request snappy)
$STATIC_ALLOWED = ['https://www.daynightdental.co.uk', 'https://daynightdental.co.uk'];

// --- Helpers ------------------------------------------------------------------------
function esc($v): string {
    return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
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
    // NOTE: deliberately NO sys_get_temp_dir() fallback — on shared hosting the system temp dir
    // is commonly world-readable, and this store holds enquiry PII. If no above-webroot dir is
    // writable we return null and skip the backup (email is the primary record).
    foreach ($candidates as $dir) {
        if (is_dir($dir) || @mkdir($dir, 0700, true)) {
            if (is_writable($dir)) return $dir;
        }
    }
    return null;
}
// One rate-limit bucket: check + increment in the file store. Returns true when over the
// limit, false when the request was counted, null when this store could not be used.
function rl_file_hit(string $rlFile, int $max, int $window): ?bool {
    $fh = @fopen($rlFile, 'c+');
    if (!$fh) return null;
    flock($fh, LOCK_EX);
    $data = json_decode((string)stream_get_contents($fh), true) ?: ['n' => 0, 't' => 0];
    $now = time();
    if (($now - ($data['t'] ?? 0)) > $window) { $data = ['n' => 0, 't' => $now]; }
    if (($data['n'] ?? 0) >= $max) {
        flock($fh, LOCK_UN); fclose($fh);
        return true;
    }
    $data['n'] = ($data['n'] ?? 0) + 1;
    ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($data));
    flock($fh, LOCK_UN); fclose($fh);
    return false;
}
// Same contract for the in-memory APCu fallback (used when no durable store is writable).
function rl_apcu_hit(string $key, int $max, int $window): ?bool {
    if (!function_exists('apcu_inc')) return null;
    $ok = false;
    $n = apcu_inc($key, 1, $ok);
    if (!$ok || $n === 1) { apcu_store($key, 1, $window); $n = 1; }
    return $n > $max;
}
// Enforce one bucket. $prefix distinguishes the stores ('' = per-IP, 'em-' = per-email);
// files land under <priv>/rl/ where the daily cron sweep already purges stale ones.
// File store first, APCu fallback, and FAIL CLOSED (503) when neither is available:
// a silently unlimited endpoint is worse than a rare, loud 503.
function enforce_rate_limit(?string $priv, string $prefix, string $hash, int $max, int $window): void {
    $hit = null;
    if ($priv) {
        $rlDir = $priv . '/rl';
        if (is_dir($rlDir) || @mkdir($rlDir, 0700, true)) {
            $hit = rl_file_hit($rlDir . '/' . $prefix . $hash . '.json', $max, $window);
        }
    }
    if ($hit === null) $hit = rl_apcu_hit('dnd_rl_' . $prefix . $hash, $max, $window);
    if ($hit === null) {
        logref('CRITICAL: rate limiter unavailable (no private dir, no APCu), failing closed');
        respond(['ok' => false, 'error' => 'We could not process this right now, please call us on the practice number.'], 503);
    }
    if ($hit) {
        respond(['ok' => false, 'error' => 'Too many requests. Please wait a minute and try again, or call us.'], 429);
    }
}
// Duplicate-submission markers: one tiny file per accepted fingerprint, stored alongside
// the rate-limit buckets (rl/fp-<hash>.json) so the cron sweep of rl/*.json purges them
// too; APCu when no private dir exists. Freshness window = DUPLICATE_WINDOW.
function duplicate_marker(?string $priv, string $fp): ?string {
    if (!$priv) return null;
    $dir = $priv . '/rl';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return null;
    return $dir . '/fp-' . $fp . '.json';
}
function duplicate_seen(?string $priv, string $fp): bool {
    $path = duplicate_marker($priv, $fp);
    if ($path !== null) {
        $mt = @filemtime($path);
        return $mt !== false && (time() - $mt) < DUPLICATE_WINDOW;
    }
    return function_exists('apcu_fetch') && apcu_fetch('dnd_fp_' . $fp) !== false;
}
function duplicate_mark(?string $priv, string $fp): void {
    $path = duplicate_marker($priv, $fp);
    if ($path !== null) {
        @file_put_contents($path, json_encode(['at' => gmdate('c')])); // umask keeps it 0600
        return;
    }
    if (function_exists('apcu_store')) apcu_store('dnd_fp_' . $fp, 1, DUPLICATE_WINDOW);
}

// === 0) Method + content-type + body-size ===========================================
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(['ok' => false, 'error' => 'Method not allowed'], 405, ['Allow' => 'POST']);
}
$ctype = $_SERVER['CONTENT_TYPE'] ?? '';
$ctypeMain = strtolower(trim(explode(';', $ctype)[0])); // drop charset/boundary params, then exact match
if ($ctypeMain !== 'application/json') {
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

// === 3) Origin allowlist ============================================================
// Require the Origin header. Browsers always send it on a POST (same- or cross-origin);
// Referer is easier to strip/forge, so we do NOT fall back to it.
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if (!origin_allowed($origin, $STATIC_ALLOWED)) {
    logref('blocked origin');
    respond(['ok' => false, 'error' => 'Forbidden'], 403);
}

// === 3a) Google reCAPTCHA v3 - verified ONLY when a secret is configured ==============
// While DND_RECAPTCHA_SECRET is unset the badge is off and this is skipped, so the form works
// normally on the rest of the anti-abuse stack. When the secret is set we require the invisible
// score token: a low or failed score is rejected, but if the verify service is unreachable we FAIL
// OPEN (owner decision for a 24/7 emergency practice) and fall back to the other defences. The verify
// DECISION is a pure helper in _validation.php (verify_recaptcha) so the CLI tests exercise it
// without any network; only the siteverify HTTP call itself lives here.
if (defined('DND_RECAPTCHA_SECRET') && DND_RECAPTCHA_SECRET) {
    $token = is_string($body['recaptchaToken'] ?? null) ? $body['recaptchaToken'] : '';
    if ($token === '') {
        respond(['ok' => false, 'error' => 'Verification required'], 400);
    }
    $vc = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($vc, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(['secret' => DND_RECAPTCHA_SECRET, 'response' => $token, 'remoteip' => client_ip()]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => RECAPTCHA_TIMEOUT,
        CURLOPT_CONNECTTIMEOUT => 4,
    ]);
    $vres = curl_exec($vc);
    $vcode = curl_getinfo($vc, CURLINFO_HTTP_CODE);
    curl_close($vc);
    // Treat a non-2xx HTTP status as a service failure, exactly like a transport error.
    $httpResult = ($vres === false || $vcode < 200 || $vcode >= 300) ? false : $vres;
    $expectedAction = RECAPTCHA_ACTIONS[$formType] ?? null;
    $decision = verify_recaptcha($httpResult, $expectedAction);
    if ($decision === 'unreachable') {
        // Verify service unreachable: FAIL OPEN (owner decision). A 24/7 emergency practice must
        // never turn a real patient away because Google had an outage. Log it and fall through to
        // the rest of the anti-abuse stack (rate limits, honeypot, time-trap, validation, global cap),
        // which still fully applies to this request.
        logref('WARNING: recaptcha siteverify unreachable http=' . $vcode . ', failing open (other defences still apply)');
    }
    if ($decision === 'fail') {
        logref('recaptcha verification failed or below score threshold');
        respond(['ok' => false, 'error' => 'Verification failed. Please try again, or call us.'], 403);
    }
    // Passed. Note (do not reject on) an action mismatch, which can indicate a replayed token.
    $vjson = json_decode((string)$vres, true);
    if ($expectedAction !== null && is_array($vjson) && isset($vjson['action']) && $vjson['action'] !== $expectedAction) {
        logref('recaptcha action mismatch: expected ' . $expectedAction . ', got ' . (string)$vjson['action']);
    }
}

// === 3b) Per-IP rate limit — file-based when private storage exists, APCu fallback
//          otherwise, and FAIL-CLOSED (503, logged loudly) if neither is available =====
$priv = private_dir();
$ipKey = rate_limit_key(client_ip());
enforce_rate_limit($priv, '', $ipKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
// Second per-IP window: a sustained ~40/hour cap that a slow drip under the 60s burst limit
// would otherwise sail past. Same store, its own bucket. Same friendly 429.
enforce_rate_limit($priv, 'iph-', $ipKey, IP_HOUR_MAX, IP_HOUR_WINDOW);

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

// === 6) Strict validation — the locked form contract (see _validation.php) ==========
// Unknown-key rejection, required fields, caps + header-injection guard, and the strict
// register formats (dob, phone, postcode, careType enum, consent === true, referral enum)
// all live in validate_submission so the CLI tests exercise exactly this code path.
$verr = validate_submission($formType, $body);
if ($verr !== null) respond(['ok' => false, 'error' => $verr], 400);
$email = trim((string)$body['email']);
// Store and email the canonical postcode (e.g. 'M8 4QL'), not whatever spacing the patient
// typed. Validation has already confirmed the shape; this only tidies it for the record.
if ($formType === 'register' && isset($body['postcode']) && is_string($body['postcode'])) {
    $body['postcode'] = normalize_postcode($body['postcode']);
}

// === 7) Per-email rate limit — a second bucket so one address cannot be hammered from
//          many IPs (and a stuck client cannot flood one inbox). Same 429 as per-IP. ===
$emailHash = hash('sha256', strtolower($email));
enforce_rate_limit($priv, 'em-', $emailHash, RATE_LIMIT_EMAIL_MAX, RATE_LIMIT_EMAIL_WINDOW);
// Per-email DAILY cap: one address cannot submit more than ~20 times across a whole day,
// even spread out under the 60s bucket. Same store, its own bucket. Same friendly 429.
enforce_rate_limit($priv, 'emd-', $emailHash, EMAIL_DAY_MAX, EMAIL_DAY_WINDOW);

// === 8) Duplicate drop (idempotency) ================================================
// An identical submission accepted within the last 10 minutes (double-click, impatient
// retry, connection replay) is answered ok again WITHOUT re-sending, so the patient
// never sees an error and reception never gets five copies of one enquiry.
$fingerprint = submission_fingerprint($formType, $body);
if (duplicate_seen($priv, $fingerprint)) {
    logref('duplicate submission within window, idempotent ok (not re-sent)');
    respond(['ok' => true]);
}

// === 9) Build the email =============================================================
$formLabel = $formType === 'contact' ? 'Website enquiry (Contact)' : 'New patient registration';
$subject = $formType === 'contact'
    ? 'New website enquiry — ' . $body['name']
    : 'New patient registration — ' . $body['firstName'] . ' ' . $body['lastName'];

// Fixed, sensible order (locked contract; transport extras are never rendered):
// register: name -> dob -> contact details -> address/postcode -> careType -> referral -> notes -> consent.
$rows = [];
foreach (EMAIL_FIELD_ORDER[$formType] as $key) {
    $val = $body[$key] ?? null;
    if ($val === null || $val === '') continue;
    $rows[] = [
        'label' => label_for($key),
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
        // Allowlist (BACKUP_FIELDS, _validation.php): store ONLY the locked-contract fields,
        // never attacker-injected extras. dentistPreference was removed with the contract.
        'fields' => array_intersect_key($body, array_flip(BACKUP_FIELDS)),
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
        logref('backup write failed (continuing)');
    }
}

// === 11) Recipients + sender ========================================================
if (!defined('DND_RESEND_KEY') || !DND_RESEND_KEY || !defined('DND_SEND_FROM') || !DND_SEND_FROM) {
    logref('missing Resend key or sender');
    respond(['ok' => false, 'error' => 'Email not configured'], 500);
}
$to = array_values(array_filter(array_map('trim', explode(',', defined('DND_ENQUIRY_TO') && DND_ENQUIRY_TO ? DND_ENQUIRY_TO : 'reception@daynightdental.co.uk'))));

// === 11a) GLOBAL send ceiling (circuit breaker) =====================================
// The LAST gate before the send, so it counts ONLY submissions that passed every other
// gate (origin, honeypot, both rate limits, full validation, duplicate drop). One fixed
// bucket for the whole site: if more than GLOBAL_MAX accepted sends land in GLOBAL_WINDOW,
// something is very wrong (a distributed flood or a runaway client), so we stop sending and
// tell the patient to call, rather than blast reception's inbox. Fail-closed like the per-IP
// limiter: if no store is usable we cannot prove we are under budget, so we refuse loudly.
$globalHit = null;
if ($priv) {
    $rlDir = $priv . '/rl';
    if (is_dir($rlDir) || @mkdir($rlDir, 0700, true)) {
        $globalHit = rl_file_hit($rlDir . '/global.json', GLOBAL_MAX, GLOBAL_WINDOW);
    }
}
if ($globalHit === null) $globalHit = rl_apcu_hit('dnd_rl_global', GLOBAL_MAX, GLOBAL_WINDOW);
if ($globalHit === null) {
    logref('CRITICAL: global send ceiling store unavailable (no private dir, no APCu), failing closed');
    respond(['ok' => false, 'error' => 'We could not process this right now, please call us on the practice number.'], 503);
}
if ($globalHit) {
    logref('CRITICAL: global send ceiling breached (' . GLOBAL_MAX . '/' . GLOBAL_WINDOW . 's), refusing to send');
    respond(['ok' => false, 'error' => 'We could not process this right now, please call us on the practice number.'], 503);
}

// === 12) Send via Resend (built-in cURL, short timeout) =============================
$payload = json_encode([
    'from' => DND_SEND_FROM,
    'to' => $to,
    'subject' => $subject,
    'html' => $html,
    'text' => $text,
    'reply_to' => $email,
]);
if ($payload === false) {
    logref('failed to encode Resend payload');
    respond(['ok' => false, 'error' => 'Failed to send'], 502);
}
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
    // Log status + transport error only — never the Resend response body (it can echo PII).
    logref('Resend error http=' . $httpCode . ' ' . substr((string)$curlErr, 0, 120));
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
// Only a SUCCESSFUL send marks the fingerprint: a failed send must stay retryable, or the
// retry would be dropped as a "duplicate" and the enquiry silently lost.
duplicate_mark($priv, $fingerprint);
respond(['ok' => true]);

<?php
/**
 * Day Night Dental — email-pipeline monitor (run daily by Hostinger cron).
 *
 * Early warning that enquiry email might be broken. Checks:
 *   1. Resend domain is still 'verified' (DNS didn't break).
 *   2. No enquiries landed in failed-sends.ndjson in the last 24h.
 * Always appends a line to monitor.log (the reliable record). On a problem it also tries to
 * alert two ways — Resend (works if the domain is healthy) and the server's mail() (works
 * if Resend itself is down) — so an outage in either path still reaches a human.
 *
 * CLI-only. Schedule:
 *   php /home/UXXXXXXXXX/domains/daynightdental.co.uk/public_html/cron/monitor.php
 */
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

$cfg = __DIR__ . '/../api/_config.php';
if (!is_file($cfg)) { fwrite(STDERR, "monitor: _config.php missing\n"); exit(1); }
require $cfg;

const DOMAIN_ID = '9e838f7b-10b4-49b7-b927-adcf367a82f3';
const FAILED_WINDOW = 86400; // 24h

function private_dir(): ?string {
    foreach ([
        !empty($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/dnd-private' : null,
        dirname(__DIR__, 2) . '/dnd-private',
        sys_get_temp_dir() . '/dnd-private',
    ] as $dir) { if ($dir && is_dir($dir)) return $dir; }
    return null;
}

$problems = [];

// 1) Resend domain status
$ch = curl_init('https://api.resend.com/domains/' . DOMAIN_ID);
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . DND_RESEND_KEY],
    CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_CONNECTTIMEOUT => 5,
]);
$body = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
$domainHealthy = false;
if ($body === false || $code !== 200) {
    $problems[] = "Resend API unreachable (HTTP $code)";
} else {
    $status = json_decode($body, true)['status'] ?? 'unknown';
    if ($status === 'verified') { $domainHealthy = true; }
    else { $problems[] = "Resend domain status is '$status' (expected 'verified') — sending will fail"; }
}

// 2) Recent failed sends
$priv = private_dir();
if ($priv && is_file($priv . '/failed-sends.ndjson')) {
    $cut = time() - FAILED_WINDOW; $recent = 0;
    foreach (file($priv . '/failed-sends.ndjson', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $l) {
        $at = strtotime(json_decode($l, true)['at'] ?? '');
        if ($at !== false && $at >= $cut) $recent++;
    }
    if ($recent > 0) $problems[] = "$recent enquiry(s) failed to email in the last 24h — see failed-sends.ndjson (full data in enquiries.ndjson)";
}

// log every run
if ($priv) {
    @file_put_contents($priv . '/monitor.log',
        gmdate('c') . ' ' . ($problems ? 'PROBLEM: ' . implode(' | ', $problems) : 'ok') . "\n",
        FILE_APPEND | LOCK_EX);
}

if (!$problems) { echo "monitor: ok\n"; exit(0); }

// alert
$alertTo = defined('DND_ENQUIRY_TO') && DND_ENQUIRY_TO ? DND_ENQUIRY_TO : 'reception@daynightdental.co.uk';
$subject = '[Day Night Dental] Website email alert';
$msg = "The website email monitor found a problem:\n\n - " . implode("\n - ", $problems)
     . "\n\nChecked: " . gmdate('c') . " UTC\nThis is an automated message.";

// channel A: Resend (only viable if the domain is healthy)
$sent = false;
if ($domainHealthy && defined('DND_SEND_FROM')) {
    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode(['from' => DND_SEND_FROM, 'to' => [$alertTo], 'subject' => $subject, 'text' => $msg]),
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . DND_RESEND_KEY, 'Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
    ]);
    $r = curl_exec($ch); $c = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    $sent = ($r !== false && $c >= 200 && $c < 300);
}
// channel B: server mail() — independent of Resend
if (!$sent) {
    @mail($alertTo, $subject, $msg, "From: monitor@daynightdental.co.uk\r\nContent-Type: text/plain; charset=utf-8");
}
fwrite(STDERR, "monitor: " . implode(' | ', $problems) . "\n");
exit(1);

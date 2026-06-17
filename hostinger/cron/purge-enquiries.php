<?php
/**
 * Day Night Dental — GDPR retention purge (run daily by Hostinger cron).
 *
 * Deletes enquiry-backup records older than 90 days. The backup is a safety-net, not the
 * system of record, so it must not be kept indefinitely (ICO storage-limitation). Locks the
 * file (same lock the endpoint uses to append) and rewrites it atomically. Unparseable lines
 * are KEPT — we never drop data we can't positively date.
 *
 * CLI-only: an HTTP request gets 404. Schedule:
 *   php /home/UXXXXXXXXX/domains/daynightdental.co.uk/public_html/cron/purge-enquiries.php
 */
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

const RETENTION_DAYS = 90;

function private_dir(): ?string {
    foreach ([
        !empty($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/dnd-private' : null,
        dirname(__DIR__, 2) . '/dnd-private',   // .../public_html/cron -> .../<domain>/dnd-private
        sys_get_temp_dir() . '/dnd-private',
    ] as $dir) {
        if ($dir && is_dir($dir)) return $dir;
    }
    return null;
}

function purge_file(string $path, int $cutoff): array {
    if (!is_file($path)) return [0, 0];
    $fh = fopen($path, 'r+');
    if (!$fh) return [0, 0];
    flock($fh, LOCK_EX);
    $kept = []; $removed = 0;
    rewind($fh);
    while (($line = fgets($fh)) !== false) {
        $line = rtrim($line, "\r\n");
        if ($line === '') continue;
        $rec = json_decode($line, true);
        $at = (is_array($rec) && isset($rec['at'])) ? strtotime((string)$rec['at']) : false;
        if ($at === false) { $kept[] = $line; continue; }   // keep undatable lines
        if ($at >= $cutoff) { $kept[] = $line; } else { $removed++; }
    }
    ftruncate($fh, 0);
    rewind($fh);
    if ($kept) fwrite($fh, implode("\n", $kept) . "\n");
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    return [$removed, count($kept)];
}

$priv = private_dir();
if (!$priv) { fwrite(STDERR, "purge: no private dir found\n"); exit(0); }
$cutoff = time() - RETENTION_DAYS * 86400;

foreach (['enquiries.ndjson', 'failed-sends.ndjson', 'monitor.log'] as $name) {
    if ($name === 'monitor.log') {
        // trim the log too, but it has no JSON 'at' — date by the leading ISO timestamp
        $path = $priv . '/' . $name;
        if (!is_file($path)) continue;
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        $keep = array_filter($lines, fn($l) => ($t = strtotime(substr($l, 0, 25))) === false || $t >= $cutoff);
        file_put_contents($path, $keep ? implode("\n", $keep) . "\n" : '', LOCK_EX);
        continue;
    }
    [$removed, $kept] = purge_file($priv . '/' . $name, $cutoff);
    echo "purge: $name -> removed $removed, kept $kept\n";
}

// Sweep stale rate-limit buckets (one file per IP / IPv6-/64). Their window is 60s, so any
// bucket untouched for a day is dead weight — delete it so an address-rotating flood can't
// pile up files and exhaust inodes (which would silently disable rate limiting for everyone).
$rlDir = $priv . '/rl';
if (is_dir($rlDir)) {
    $rlCut = time() - 86400;
    $swept = 0;
    foreach (glob($rlDir . '/*.json') ?: [] as $f) {
        if (@filemtime($f) < $rlCut) { @unlink($f); $swept++; }
    }
    echo "purge: rl/ -> swept $swept stale buckets\n";
}

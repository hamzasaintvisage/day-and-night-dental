<?php
/**
 * Day Night Dental — shared validation for the enquiry endpoint (send-enquiry.php).
 *
 * Pure functions and constants only: no I/O, no config, no side effects. The CLI test
 * suite (tests/send-enquiry.test.php) includes this file directly, so the tests exercise
 * EXACTLY the rules the live endpoint enforces. Never web-served (denied by api/.htaccess,
 * and a direct request would only define functions and emit nothing anyway).
 *
 * THE LOCKED FORM CONTRACT (owner-finalised, keep in sync with the React forms):
 *   register required: firstName, lastName, dob, phone, email, postcode, careType, consent
 *   register optional: address, referral, notes
 *   contact  required: name, phone, email      optional: preference, treatment, notes
 *   transport extras (never stored or emailed): bot-field, ts, elapsed, recaptchaToken, formType
 *   dentistPreference was REMOVED by the owner and is now rejected as an unexpected key.
 */

declare(strict_types=1);

// --- Field rules (kept in sync with the JS forms) ------------------------------------
const CAPS = [
    'name' => 100, 'firstName' => 100, 'lastName' => 100, 'email' => 150, 'phone' => 30,
    'address' => 200, 'postcode' => 200, 'notes' => 2000, 'message' => 2000,
    'consentVersion' => 60,
];
const DEFAULT_TEXT_CAP = 2000;
const EMAIL_RE = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
const MULTILINE_FIELDS = ['notes', 'message'];
// Transport-only keys: legitimate on the wire, never validated as data, never stored or emailed.
const TRANSPORT_FIELDS = ['bot-field', 'ts', 'elapsed', 'recaptchaToken', 'form-name', 'formType'];

const CARE_TYPES = ['private', 'nhs', 'mixed', 'unsure'];
const REFERRAL_OPTIONS = [
    'Google search', 'Friend or family', 'Instagram',
    'Walked past the practice', 'Existing patient', 'Other',
];

// Throwaway / disposable inbox domains. A registration from one of these cannot be reached
// for the confirmation call, so it is almost always abuse or a test. Exact-domain match only,
// lowercased, and deliberately NOT paired with any DNS lookup (see validate_email_format).
const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
    'guerrillamailblock.com', 'sharklasers.com', 'grr.la', 'spam4.me',
    '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org',
    'tempmailo.com', 'tempmail.net', 'tempr.email', 'yopmail.com', 'yopmail.net',
    'trashmail.com', 'trashmail.net', 'trash-mail.com', 'dispostable.com',
    'getnada.com', 'nada.email', 'maildrop.cc', 'mailnesia.com', 'mailnesia.net',
    'throwawaymail.com', 'throw-away.email', 'fakeinbox.com', 'fakemail.net',
    'mohmal.com', 'emailondeck.com', 'mintemail.com', 'mytemp.email',
    'moakt.com', 'inboxkitten.com', 'mailcatch.com', 'discard.email',
    'spamgourmet.com', 'jetable.org', 'burnermail.io', 'anonaddy.me',
];

const REQUIRED_FIELDS = [
    'contact'  => ['name', 'phone', 'email'],
    'register' => ['firstName', 'lastName', 'dob', 'phone', 'email', 'postcode', 'careType', 'consent'],
];
const ALLOWED_FIELDS = [
    'contact'  => ['name', 'phone', 'email', 'preference', 'treatment', 'notes'],
    'register' => ['firstName', 'lastName', 'dob', 'phone', 'email', 'address', 'postcode',
                   'careType', 'referral', 'notes', 'consent', 'consentVersion'],
];
// Render order for the admin notification email (labels come from label_for below).
const EMAIL_FIELD_ORDER = [
    'contact'  => ['name', 'phone', 'email', 'preference', 'treatment', 'notes'],
    'register' => ['firstName', 'lastName', 'dob', 'phone', 'email', 'address', 'postcode',
                   'careType', 'referral', 'notes', 'consent', 'consentVersion'],
];
// Backup-store allowlist (NDJSON above the web root): union of both contracts + formType.
const BACKUP_FIELDS = ['formType', 'name', 'firstName', 'lastName', 'dob', 'phone', 'email',
    'address', 'postcode', 'careType', 'preference', 'treatment', 'referral', 'notes', 'consent',
    'consentVersion'];

// --- Helpers --------------------------------------------------------------------------
function label_for(string $key): string {
    $overrides = ['dob' => 'Date of birth'];
    if (isset($overrides[$key])) return $overrides[$key];
    $spaced = preg_replace('/([A-Z])/', ' $1', $key);
    $spaced = preg_replace('/[_-]+/', ' ', $spaced);
    return ucfirst(strtolower(trim($spaced)));
}

// Generic per-field guard: length cap + CRLF/tab rejection (email-header-injection guard).
function validate_field(string $key, $value, array $multiline = MULTILINE_FIELDS): ?string {
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

// Real calendar date (checkdate rejects 31 Feb etc.), born after 1900, not in the future.
// $today ('Y-m-d') is injectable so the CLI tests are deterministic.
function validate_dob(string $dob, ?string $today = null): ?string {
    $dob = trim($dob);
    if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $dob, $m)) {
        return 'Please enter a valid date of birth';
    }
    $y = (int)$m[1]; $mo = (int)$m[2]; $d = (int)$m[3];
    if ($y <= 1900 || !checkdate($mo, $d, $y)) return 'Please enter a valid date of birth';
    if ($today === null) {
        $today = (new DateTime('now', new DateTimeZone('Europe/London')))->format('Y-m-d');
    }
    if ($dob > $today) return 'Date of birth cannot be in the future'; // ISO strings compare safely
    return null;
}

// 7 to 20 characters, only digits, spaces and + ( ) - . allowed, at least 9 actual digits.
function validate_phone_strict(string $phone): ?string {
    $p = trim($phone);
    if (!preg_match('/^[0-9+()\-. ]{7,20}$/', $p)) return 'Please enter a valid phone number';
    if (preg_match_all('/[0-9]/', $p) < 9) return 'Please enter a valid phone number';
    // Reject obviously fake numbers: all identical digits (0000000000, 1111111111) or fewer
    // than 4 distinct digits. Otherwise stay lenient, reception confirms the number anyway.
    $digits = preg_replace('/[^0-9]/', '', $p);
    if (count(array_unique(str_split($digits))) < 4) return 'Please enter a valid phone number';
    return null;
}

// Canonicalise a UK postcode: uppercase, strip ALL whitespace, then insert a single space
// before the final three characters (the inward code). 'm84ql' -> 'M8 4QL', 'M8  4QL' -> 'M8 4QL'.
// Junk shorter than four characters is returned uppercased-and-trimmed as-is (validation rejects it).
function normalize_postcode(string $pc): string {
    $s = strtoupper(preg_replace('/\s+/', '', $pc));
    if (strlen($s) < 4) return $s;
    return substr($s, 0, -3) . ' ' . substr($s, -3);
}

// Validate the REAL UK postcode shape against the space-stripped, uppercased value. This
// drops pure junk (12345, ABCDE, AAAAAA) while accepting M84QL, m8 4ql, SW1A1AA, EH39DR.
// Reception confirms the address anyway, so this only keeps obvious garbage out.
function validate_postcode_lenient(string $postcode): ?string {
    $compact = strtoupper(preg_replace('/\s+/', '', trim($postcode)));
    if (!preg_match('/^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/', $compact)) {
        return 'Please enter a valid UK postcode';
    }
    return null;
}

// Count web links in a free-text value: http(s):// URLs, www.-prefixed hosts, and bare
// domain.tld tokens. Multiline-aware (newlines in notes are fine). A single link is allowed
// (a patient may paste one article); two or more reads as spam. Case-insensitive.
// The bare-domain branch has a negative look-behind for '@' and for a name-char/dot, so an
// email address (ada@example.com) and sub-labels of one host are not miscounted as links.
function count_links(string $text): int {
    $re = '~(?:https?://|www\.)\S+'
        . '|(?<![@a-z0-9.])[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.(?:com|net|org|co\.uk|uk|io|info|biz|xyz|top|ru|cn|de|nl|shop|online|site|link)\b~i';
    if (!preg_match_all($re, $text, $m)) {
        return 0;
    }
    return count($m[0]);
}

function validate_email_format($email): ?string {
    if (!is_string($email)) return 'A valid email is required';
    $e = trim($email);
    if ($e === '' || mb_strlen($e) > CAPS['email'] || !preg_match(EMAIL_RE, $e)) {
        return 'A valid email is required';
    }
    // Authoritative additional check: filter_var rejects shapes the simple regex lets through
    // (a@b..com, leading/trailing/consecutive dots, embedded newlines). No MX/DNS lookup.
    if (filter_var($e, FILTER_VALIDATE_EMAIL) === false) {
        return 'A valid email is required';
    }
    // Disposable / throwaway inbox: exact-domain match only, lowercased, no DNS. We could not
    // reach the patient for the confirmation call, so ask for a permanent address.
    $at = strrpos($e, '@');
    if ($at !== false) {
        $domain = strtolower(substr($e, $at + 1));
        if (in_array($domain, DISPOSABLE_DOMAINS, true)) {
            return 'Please use a permanent email address so we can reach you.';
        }
    }
    return null;
}

/**
 * Validate a parsed JSON body against the locked contract for its form type.
 * Returns null when acceptable, otherwise a friendly per-field message that is safe to
 * show to the patient (never echoes their input back, never leaks internals).
 */
function validate_submission(string $formType, array $body, ?string $today = null): ?string {
    if (!isset(REQUIRED_FIELDS[$formType])) return 'Unknown form type';

    // 1) Unknown-key rejection: strip the transport extras, then everything left must be
    //    on the allowlist for this form type. Probing with extra fields gets a 400.
    $clean = array_diff_key($body, array_flip(TRANSPORT_FIELDS));
    foreach (array_keys($clean) as $k) {
        if (!in_array((string)$k, ALLOWED_FIELDS[$formType], true)) {
            return 'Unexpected data in submission';
        }
    }

    // 2) Required fields: consent must be boolean true, everything else a non-empty string.
    foreach (REQUIRED_FIELDS[$formType] as $key) {
        $val = $body[$key] ?? null;
        if ($key === 'consent') {
            if ($val !== true) return 'Consent is required';
            continue;
        }
        if (!is_string($val) || trim($val) === '') return label_for($key) . ' is required';
    }

    // 3) Generic caps + header-injection guard on every field. The register form is all
    //    strings apart from the consent boolean, so enforce the types too.
    foreach ($clean as $key => $val) {
        $key = (string)$key;
        if ($formType === 'register' && $key !== 'consent' && $val !== null && !is_string($val)) {
            return label_for($key) . ' is invalid';
        }
        $err = validate_field($key, $val, MULTILINE_FIELDS);
        if ($err !== null) return $err;
    }

    // 4) Format checks. Email applies to both forms; the rest is the register contract.
    $err = validate_email_format($body['email'] ?? null);
    if ($err !== null) return $err;

    // Link filter on the free-text fields (notes on register, notes/message on contact).
    // One link is fine (a shared article); two or more is spam. Multiline-safe.
    foreach (['notes', 'message'] as $freeText) {
        $val = $body[$freeText] ?? null;
        if (is_string($val) && count_links($val) >= 2) {
            return 'Please remove web links from your message.';
        }
    }

    if ($formType === 'register') {
        $err = validate_dob((string)$body['dob'], $today);
        if ($err !== null) return $err;
        $err = validate_phone_strict((string)$body['phone']);
        if ($err !== null) return $err;
        $err = validate_postcode_lenient((string)$body['postcode']);
        if ($err !== null) return $err;
        if (!in_array($body['careType'], CARE_TYPES, true)) return 'Please choose a care type';
        $referral = $body['referral'] ?? null;
        if ($referral !== null && $referral !== '' && !in_array($referral, REFERRAL_OPTIONS, true)) {
            return 'Please choose a valid option for how you heard about us';
        }
    }
    return null;
}

/**
 * Stable fingerprint of the identifying fields of a submission, used to drop identical
 * repeats (double-clicks, impatient retries, connection replays) within a short window.
 * Phone is reduced to its digits so "0141 555 0192" and "(0141) 5550192" collide as intended.
 */
function submission_fingerprint(string $formType, array $body): string {
    $s = static function ($v): string { return is_scalar($v) ? trim((string)$v) : ''; };
    $email = strtolower($s($body['email'] ?? ''));
    $phoneDigits = preg_replace('/[^0-9]/', '', $s($body['phone'] ?? ''));
    $dob = $s($body['dob'] ?? '');
    $name = $formType === 'contact'
        ? $s($body['name'] ?? '')
        : $s($body['firstName'] ?? '') . $s($body['lastName'] ?? '');
    return hash('sha256', $formType . '|' . $email . '|' . $phoneDigits . '|' . $dob . '|' . $name);
}

// --- Google reCAPTCHA v3 -----------------------------------------------------------------
// Minimum score to accept. reCAPTCHA v3 returns 0.0 (almost certainly a bot) to 1.0 (almost
// certainly human); 0.5 is Google's suggested default. Below this we refuse and ask them to call.
const RECAPTCHA_MIN_SCORE = 0.5;
// Expected 'action' per form type (set on grecaptcha.execute in the client). We compare it but
// do NOT hard-fail on a mismatch alone: a stale/duplicated action must not lock a real patient out.
const RECAPTCHA_ACTIONS = ['contact' => 'contact', 'register' => 'register'];

/**
 * Decide a reCAPTCHA v3 verification from the ALREADY-FETCHED siteverify result. Pure so the
 * CLI tests can inject the parsed Google response without any network. $httpResult is the raw
 * body string from siteverify, or false when the call could not be made / returned a non-2xx.
 *
 * Returns one of:
 *   'pass'         success AND score >= RECAPTCHA_MIN_SCORE (accept)
 *   'unreachable'  the verify SERVICE failed ($httpResult === false): caller fails closed (503)
 *   'fail'         Google says not-human, or the score is below threshold (403)
 */
function verify_recaptcha($httpResult, ?string $expectedAction = null): string {
    if ($httpResult === false) return 'unreachable';
    $json = json_decode((string)$httpResult, true);
    if (!is_array($json) || empty($json['success'])) return 'fail';
    $score = isset($json['score']) && is_numeric($json['score']) ? (float)$json['score'] : 0.0;
    if ($score < RECAPTCHA_MIN_SCORE) return 'fail';
    // Action mismatch is logged by the caller but is NOT on its own a reason to reject a
    // sender who otherwise scored as human, so we still return 'pass' here.
    return 'pass';
}

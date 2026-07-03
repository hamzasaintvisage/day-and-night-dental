<?php
/**
 * Day Night Dental — CLI tests for the enquiry endpoint's validation (_validation.php).
 *
 * No framework, no network, no config: includes the same _validation.php the live
 * endpoint requires, so these assertions exercise exactly the production rules.
 *
 * Run:   php hostinger/api/tests/send-enquiry.test.php
 * Exit:  0 = all passed, 1 = at least one failure (CI-friendly).
 */

declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

require __DIR__ . '/../_validation.php';

$tests = 0;
$fails = 0;
$messages = []; // every produced error message, swept for em dashes at the end

function check(string $name, bool $cond): void {
    global $tests, $fails;
    $tests++;
    if ($cond) {
        echo "ok   - $name\n";
    } else {
        $fails++;
        echo "FAIL - $name\n";
    }
}
// Assert the body is accepted (validate_submission returns null).
function accepted(string $name, string $formType, array $body): void {
    $err = validate_submission($formType, $body, '2026-07-02');
    check($name . ($err !== null ? " (got: $err)" : ''), $err === null);
}
// Assert the body is rejected; optionally that the message matches exactly.
function rejected(string $name, string $formType, array $body, ?string $expect = null): void {
    global $messages;
    $err = validate_submission($formType, $body, '2026-07-02');
    if ($err !== null) $messages[] = $err;
    $ok = $err !== null && ($expect === null || $err === $expect);
    check($name . ($ok ? '' : ' (got: ' . var_export($err, true) . ')'), $ok);
}

function valid_register(): array {
    return [
        'firstName' => 'Ada',
        'lastName'  => 'Lovelace',
        'dob'       => '1985-03-14',
        'phone'     => '0141 555 0192',
        'email'     => 'ada@example.com',
        'postcode'  => 'G1 1AA',
        'careType'  => 'private',
        'consent'   => true,
        'address'   => '1 High Street, Merchant City',
        'referral'  => 'Google search',
        'notes'     => "Evenings suit best.\nThank you.",
    ];
}
function valid_contact(): array {
    return ['name' => 'Ada Lovelace', 'phone' => '0141 555 0192', 'email' => 'ada@example.com'];
}

// --- 1) Happy paths -------------------------------------------------------------------
accepted('register: full valid body accepted', 'register', valid_register());

$minimal = valid_register();
unset($minimal['address'], $minimal['referral'], $minimal['notes']);
accepted('register: required-only body accepted', 'register', $minimal);

// The forms send empty strings for untouched optional fields; those must pass.
accepted('register: empty optional strings accepted', 'register',
    array_merge(valid_register(), ['address' => '', 'referral' => '', 'notes' => '']));

// Transport extras ride along on the wire and must never trip the unknown-key check.
accepted('register: transport extras ignored', 'register', array_merge(valid_register(), [
    'formType' => 'register', 'bot-field' => '', 'ts' => 1234, 'elapsed' => 5000, 'recaptchaToken' => 'tok',
]));
// The reCAPTCHA token is stripped as transport, not stored, and never rejected as an unknown key.
check('transport: recaptchaToken is a transport field', in_array('recaptchaToken', TRANSPORT_FIELDS, true));
check('transport: recaptchaToken is not stored in backup', !in_array('recaptchaToken', BACKUP_FIELDS, true));
rejected('register: legacy turnstileToken now rejected as unknown key', 'register',
    array_merge(valid_register(), ['turnstileToken' => 'tok']), 'Unexpected data in submission');

accepted('contact: name/phone/email only accepted', 'contact', valid_contact());
accepted('contact: with optional fields accepted', 'contact', array_merge(valid_contact(), [
    'preference' => 'emergency', 'treatment' => 'Emergency / pain', 'notes' => 'Broken crown.',
]));

// --- 2) Every required register field missing = rejected -------------------------------
foreach (REQUIRED_FIELDS['register'] as $key) {
    $body = valid_register();
    unset($body[$key]);
    rejected("register: missing $key rejected", 'register', $body);
}
foreach (REQUIRED_FIELDS['contact'] as $key) {
    $body = valid_contact();
    unset($body[$key]);
    rejected("contact: missing $key rejected", 'contact', $body);
}
rejected('register: blank required field rejected', 'register',
    array_merge(valid_register(), ['firstName' => '   ']));

// --- 3) Date of birth -----------------------------------------------------------------
rejected('dob: 31 Feb rejected', 'register', array_merge(valid_register(), ['dob' => '1985-02-31']));
rejected('dob: future date rejected', 'register', array_merge(valid_register(), ['dob' => '2999-01-01']),
    'Date of birth cannot be in the future');
rejected('dob: tomorrow rejected (injected today)', 'register', array_merge(valid_register(), ['dob' => '2026-07-03']));
accepted('dob: today accepted (not in the future)', 'register', array_merge(valid_register(), ['dob' => '2026-07-02']));
rejected('dob: year 1900 rejected (born after 1900)', 'register', array_merge(valid_register(), ['dob' => '1900-06-15']));
accepted('dob: year 1901 accepted', 'register', array_merge(valid_register(), ['dob' => '1901-06-15']));
rejected('dob: wrong format rejected', 'register', array_merge(valid_register(), ['dob' => '14/03/1985']));
rejected('dob: not a string rejected', 'register', array_merge(valid_register(), ['dob' => 19850314]));

// --- 4) Phone (register: 7-20 chars, >=9 digits, digits/spaces/+()-. only) -------------
rejected('phone: letters rejected', 'register', array_merge(valid_register(), ['phone' => 'not a number']));
rejected('phone: too short rejected', 'register', array_merge(valid_register(), ['phone' => '12345'])); // < 7 chars
rejected('phone: too few digits rejected', 'register', array_merge(valid_register(), ['phone' => '123 456'])); // 7 chars, 6 digits
rejected('phone: too long rejected', 'register', array_merge(valid_register(), ['phone' => '+44 (0)141 555 0192 0192']));
rejected('phone: disallowed char rejected', 'register', array_merge(valid_register(), ['phone' => '0141555019#2']));
accepted('phone: +44 format accepted', 'register', array_merge(valid_register(), ['phone' => '+44 141 555 0192']));
accepted('phone: dotted format accepted', 'register', array_merge(valid_register(), ['phone' => '0141.555.0192']));

// --- 5) Postcode (lenient UK shape: 5-8 alphanumeric + space) ---------------------------
rejected('postcode: too short rejected', 'register', array_merge(valid_register(), ['postcode' => 'G1']));
rejected('postcode: too long rejected', 'register', array_merge(valid_register(), ['postcode' => 'G11 1AAAA']));
rejected('postcode: symbol rejected', 'register', array_merge(valid_register(), ['postcode' => 'G1!1AA']));
accepted('postcode: G1 1AA accepted', 'register', array_merge(valid_register(), ['postcode' => 'G1 1AA']));
accepted('postcode: SW1A 1AA accepted', 'register', array_merge(valid_register(), ['postcode' => 'SW1A 1AA']));
accepted('postcode: no-space form accepted', 'register', array_merge(valid_register(), ['postcode' => 'G11AA']));

// --- 6) Care type + consent + referral ---------------------------------------------------
rejected('careType: unknown value rejected', 'register', array_merge(valid_register(), ['careType' => 'gold']),
    'Please choose a care type');
foreach (CARE_TYPES as $ct) {
    accepted("careType: $ct accepted", 'register', array_merge(valid_register(), ['careType' => $ct]));
}
rejected('consent: false rejected', 'register', array_merge(valid_register(), ['consent' => false]),
    'Consent is required');
rejected('consent: string "true" rejected (must be boolean)', 'register',
    array_merge(valid_register(), ['consent' => 'true']), 'Consent is required');
rejected('referral: unknown option rejected', 'register', array_merge(valid_register(), ['referral' => 'Billboard']));
foreach (REFERRAL_OPTIONS as $opt) {
    accepted("referral: '$opt' accepted", 'register', array_merge(valid_register(), ['referral' => $opt]));
}

// --- 7) Unknown-key rejection ------------------------------------------------------------
rejected('register: dentistPreference rejected (removed by owner)', 'register',
    array_merge(valid_register(), ['dentistPreference' => 'female']), 'Unexpected data in submission');
rejected('register: arbitrary extra key rejected', 'register',
    array_merge(valid_register(), ['adminOverride' => '1']), 'Unexpected data in submission');
rejected('contact: register-only key rejected', 'contact',
    array_merge(valid_contact(), ['postcode' => 'G1 1AA']), 'Unexpected data in submission');
rejected('unknown form type rejected', 'enquiry', valid_contact());

// --- 8) Caps, injection guard, email ------------------------------------------------------
rejected('caps: 101-char firstName rejected', 'register',
    array_merge(valid_register(), ['firstName' => str_repeat('a', 101)]));
rejected('caps: 2001-char notes rejected', 'register',
    array_merge(valid_register(), ['notes' => str_repeat('a', 2001)]));
rejected('injection: newline in lastName rejected', 'register',
    array_merge(valid_register(), ['lastName' => "Love\r\nlace"]));
accepted('multiline: newlines allowed in notes', 'register',
    array_merge(valid_register(), ['notes' => "line one\nline two"]));
rejected('email: missing @ rejected', 'register', array_merge(valid_register(), ['email' => 'ada.example.com']),
    'A valid email is required');
rejected('email: over 150 chars rejected', 'register',
    array_merge(valid_register(), ['email' => str_repeat('a', 145) . '@example.com']));
rejected('contact: bad email rejected', 'contact', array_merge(valid_contact(), ['email' => 'nope']));

// --- 8a) Email robustness (filter_var) + disposable-domain blocklist ------------------------
// filter_var rejects shapes the simple regex lets through.
rejected('email: consecutive dots (a@b..com) rejected', 'register',
    array_merge(valid_register(), ['email' => 'a@b..com']), 'A valid email is required');
rejected('email: leading dot in local part rejected', 'register',
    array_merge(valid_register(), ['email' => '.ada@example.com']), 'A valid email is required');
rejected('email: trailing dot in local part rejected', 'register',
    array_merge(valid_register(), ['email' => 'ada.@example.com']), 'A valid email is required');
accepted('email: ordinary address still accepted', 'register',
    array_merge(valid_register(), ['email' => 'ada.lovelace@example.co.uk']));
// Disposable / throwaway inbox rejected (exact-domain, case-insensitive).
rejected('email: mailinator disposable rejected', 'register',
    array_merge(valid_register(), ['email' => 'ada@mailinator.com']),
    'Please use a permanent email address so we can reach you.');
rejected('email: guerrillamail disposable rejected', 'register',
    array_merge(valid_register(), ['email' => 'ada@guerrillamail.com']),
    'Please use a permanent email address so we can reach you.');
rejected('email: disposable case-insensitive rejected', 'register',
    array_merge(valid_register(), ['email' => 'Ada@YOPMAIL.com']),
    'Please use a permanent email address so we can reach you.');
accepted('email: permanent provider accepted', 'register',
    array_merge(valid_register(), ['email' => 'ada@gmail.com']));

// --- 8b) Phone fake-number rejection --------------------------------------------------------
rejected('phone: all-zero rejected', 'register',
    array_merge(valid_register(), ['phone' => '0000000000']), 'Please enter a valid phone number');
rejected('phone: all-one rejected', 'register',
    array_merge(valid_register(), ['phone' => '1111111111']), 'Please enter a valid phone number');
rejected('phone: fewer than 4 distinct digits rejected', 'register',
    array_merge(valid_register(), ['phone' => '0101010101']), 'Please enter a valid phone number');
accepted('phone: real UK number still passes', 'register',
    array_merge(valid_register(), ['phone' => '0141 555 0192']));

// --- 8c) Notes/message link filter (2+ links rejected, 0-1 pass) ----------------------------
rejected('notes: two links rejected', 'register', array_merge(valid_register(),
    ['notes' => 'See http://spam.example and https://more.example please']),
    'Please remove web links from your message.');
rejected('notes: two bare domains rejected', 'register', array_merge(valid_register(),
    ['notes' => 'visit cheap-pills.com and buy-now.net']),
    'Please remove web links from your message.');
accepted('notes: single link still passes', 'register', array_merge(valid_register(),
    ['notes' => 'I read this article: https://nhs.uk/dental']));
accepted('notes: no links passes', 'register', array_merge(valid_register(),
    ['notes' => "Evenings suit best.\nThank you."]));
accepted('notes: two email addresses are not links', 'register', array_merge(valid_register(),
    ['notes' => 'Reach me at ada@example.com or bob@work.co.uk']));
accepted('notes: decimals are not links', 'register', array_merge(valid_register(),
    ['notes' => 'Teeth 2.5 and 3.6, quote was 199.99']));
rejected('contact: two links in notes rejected', 'contact', array_merge(valid_contact(),
    ['notes' => 'http://a.example and http://b.example']),
    'Please remove web links from your message.');

// --- 8d) Postcode normalisation + tightened validation --------------------------------------
check('postcode: normalize m84ql -> M8 4QL', normalize_postcode('m84ql') === 'M8 4QL');
check('postcode: normalize "M8  4QL" -> M8 4QL', normalize_postcode('M8  4QL') === 'M8 4QL');
check('postcode: normalize "m8 4ql" -> M8 4QL', normalize_postcode('m8 4ql') === 'M8 4QL');
check('postcode: normalize SW1A1AA -> SW1A 1AA', normalize_postcode('SW1A1AA') === 'SW1A 1AA');
accepted('postcode: M8 4QL accepted', 'register', array_merge(valid_register(), ['postcode' => 'M8 4QL']));
accepted('postcode: no-space m84ql accepted', 'register', array_merge(valid_register(), ['postcode' => 'm84ql']));
accepted('postcode: EH39DR accepted', 'register', array_merge(valid_register(), ['postcode' => 'EH39DR']));
accepted('postcode: SW1A1AA accepted', 'register', array_merge(valid_register(), ['postcode' => 'SW1A1AA']));
rejected('postcode: pure numeric junk 12345 rejected', 'register',
    array_merge(valid_register(), ['postcode' => '12345']), 'Please enter a valid UK postcode');
rejected('postcode: ABCDE rejected', 'register',
    array_merge(valid_register(), ['postcode' => 'ABCDE']), 'Please enter a valid UK postcode');
rejected('postcode: AAAAAA rejected', 'register',
    array_merge(valid_register(), ['postcode' => 'AAAAAA']), 'Please enter a valid UK postcode');

// --- 8e) Versioned consent (optional, round-trips) ------------------------------------------
accepted('consentVersion: present round-trips', 'register',
    array_merge(valid_register(), ['consentVersion' => 'privacy-2026-07-02']));
accepted('consentVersion: absent still valid', 'register', valid_register());
check('consentVersion: in register allowlist', in_array('consentVersion', ALLOWED_FIELDS['register'], true));
check('consentVersion: in backup fields', in_array('consentVersion', BACKUP_FIELDS, true));
check('consentVersion: in email field order', in_array('consentVersion', EMAIL_FIELD_ORDER['register'], true));
rejected('consentVersion: over-long rejected (length cap)', 'register',
    array_merge(valid_register(), ['consentVersion' => str_repeat('x', 61)]));

// --- 9) Fingerprint (idempotency key) ------------------------------------------------------
$fp1 = submission_fingerprint('register', valid_register());
$fp2 = submission_fingerprint('register', valid_register());
check('fingerprint: identical bodies collide', $fp1 === $fp2);
check('fingerprint: phone formatting collapses to digits',
    $fp1 === submission_fingerprint('register', array_merge(valid_register(), ['phone' => '(0141) 5550192'])));
check('fingerprint: email case-insensitive',
    $fp1 === submission_fingerprint('register', array_merge(valid_register(), ['email' => 'ADA@Example.com'])));
check('fingerprint: different email differs',
    $fp1 !== submission_fingerprint('register', array_merge(valid_register(), ['email' => 'bob@example.com'])));
check('fingerprint: form types differ',
    submission_fingerprint('contact', valid_contact()) !== submission_fingerprint('register', valid_register()));
check('fingerprint: is 64 hex chars', preg_match('/^[0-9a-f]{64}$/', $fp1) === 1);

// --- 9a) reCAPTCHA v3 verification (verify_recaptcha, injectable: no network) ----------------
// The endpoint fetches the siteverify response and passes the raw body (or false on a service
// failure) into verify_recaptcha(); these assertions inject that body directly so the decision
// logic is tested without any network. The OFF case (secret unset => whole block skipped, form
// works) is enforced by the `defined('DND_RECAPTCHA_SECRET')` guard in send-enquiry.php, which
// this pure suite does not execute; it is covered by the deploy.py render_config() logic that
// only emits the define() when the env var is present and non-empty.
$rc = static fn(array $j): string => json_encode($j);
check('recaptcha: min score constant is 0.5', RECAPTCHA_MIN_SCORE === 0.5);
check('recaptcha: service failure (false) => unreachable',
    verify_recaptcha(false, 'register') === 'unreachable');
check('recaptcha: success:false => fail',
    verify_recaptcha($rc(['success' => false, 'error-codes' => ['invalid-input-response']]), 'register') === 'fail');
check('recaptcha: success:true score 0.2 (below threshold) => fail',
    verify_recaptcha($rc(['success' => true, 'score' => 0.2, 'action' => 'register']), 'register') === 'fail');
check('recaptcha: success:true score 0.9 => pass',
    verify_recaptcha($rc(['success' => true, 'score' => 0.9, 'action' => 'register']), 'register') === 'pass');
check('recaptcha: success:true score exactly 0.5 (at threshold) => pass',
    verify_recaptcha($rc(['success' => true, 'score' => 0.5, 'action' => 'register']), 'register') === 'pass');
check('recaptcha: success:true score 0.49 => fail',
    verify_recaptcha($rc(['success' => true, 'score' => 0.49, 'action' => 'register']), 'register') === 'fail');
check('recaptcha: missing score treated as 0 => fail',
    verify_recaptcha($rc(['success' => true, 'action' => 'register']), 'register') === 'fail');
check('recaptcha: garbage body (not JSON) => fail',
    verify_recaptcha('not json at all', 'register') === 'fail');
check('recaptcha: high score but action mismatch still passes (not hard-failed)',
    verify_recaptcha($rc(['success' => true, 'score' => 0.9, 'action' => 'contact']), 'register') === 'pass');
check('recaptcha: contact action high score => pass',
    verify_recaptcha($rc(['success' => true, 'score' => 0.8, 'action' => 'contact']), 'contact') === 'pass');
check('recaptcha: expected actions defined for both forms',
    RECAPTCHA_ACTIONS['contact'] === 'contact' && RECAPTCHA_ACTIONS['register'] === 'register');

// --- 10) No em dashes in any error message shown to a patient -------------------------------
$dashFree = true;
foreach ($messages as $m) {
    if (strpos($m, "\u{2014}") !== false) { $dashFree = false; break; }
}
check('copy: no em dashes in any error message', $dashFree);

echo "\n$tests tests, $fails failure(s)\n";
exit($fails > 0 ? 1 : 0);

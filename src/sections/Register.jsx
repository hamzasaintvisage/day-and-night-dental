import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { PRACTICE } from '../data/practice';
import { RECAPTCHA_SITE_KEY, PRIVACY_CONSENT_VERSION } from '../data/config';
import { submitEnquiry, buildEnquiryExtras, loadRecaptcha, getRecaptchaToken } from '../lib/submitEnquiry';

const REFERRAL_OPTIONS = ['Google search', 'Friend or family', 'Instagram', 'Walked past the practice', 'Existing patient', 'Other'].map((t) => ({ value: t, label: t }));
const DAYS = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => ({ value: String(i + 1), label: m }));
const DOB_CURRENT_YEAR = 2026; // fixed for SSR determinism
const YEARS = Array.from({ length: DOB_CURRENT_YEAR - 1915 + 1 }, (_, i) => { const y = DOB_CURRENT_YEAR - i; return { value: String(y), label: String(y) }; });

const CARE_OPTIONS = [
  { v: 'private', label: 'Private', side: 'day', desc: 'Full choice of times and treatments' },
  { v: 'nhs', label: 'NHS', side: 'night', desc: 'Waiting list, when we have space' },
  { v: 'mixed', label: 'Either', side: 'day', desc: 'Whatever gets you seen soonest' },
  { v: 'unsure', label: 'Not sure yet', side: 'night', desc: 'We’ll talk it through on the call' },
];

const RAIL_ITEMS = [
  { num: '01', title: 'Comprehensive examination', text: 'A 45-minute full assessment with intra-oral scans and bite analysis.' },
  { num: '02', title: 'Digital x-rays', text: 'Low-dose, with no films to develop, so you are not left waiting.' },
  { num: '03', title: 'Personalised treatment plan', text: 'Written, with the cost of each item set out before any work starts.' },
  { num: '04', title: 'Hygiene appointment', text: 'Booked alongside the examination, so you leave with a fresh start.' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-. ]{7,20}$/;          // digits, spaces, + ( ) - . only
const POSTCODE_RE = /^[A-Za-z0-9 ]{5,8}$/;        // lenient UK postcode shape

// Display-only mirror of the server's normalize_postcode(): uppercase, strip all whitespace,
// then put a single space before the final three characters. The server stays the source of
// truth; this just shows the patient the tidy form (e.g. 'm84ql' -> 'M8 4QL').
function displayPostcode(pc) {
  const s = pc.toUpperCase().replace(/\s+/g, '');
  if (s.length < 4) return s;
  return `${s.slice(0, -3)} ${s.slice(-3)}`;
}
// Parity with the server's extra filter_var() email check: reject leading/trailing/consecutive
// dots that the simple regex lets through. Kept minimal on purpose (the server is authoritative).
function emailShapeOk(email) {
  if (!EMAIL_RE.test(email)) return false;
  const [local, domain] = email.split('@');
  if (!local || !domain) return false;
  if (/^\.|\.$|\.\./.test(local) || /^\.|\.$|\.\./.test(domain)) return false;
  return true;
}

function CareTick() {
  return (
    <span className="rd-care-tick" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="#0a0a0c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 6.5l3 3 6-7" /></svg>
    </span>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false); // synchronous guard: blocks rapid double/triple-clicks
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    careType: '',       // deliberately no default: the patient must choose
    referral: '',
    notes: '',
    consent: false,
  });

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };
  const setField = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));
  // Tidy the postcode for display on blur (server stays the source of truth on submit).
  const normalizePostcodeField = () => setForm((f) => (f.postcode ? { ...f, postcode: displayPostcode(f.postcode) } : f));

  // Form-load time for the server-side time-trap (client-only; SSG hydration-safe).
  const loadedAt = useRef(0);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  // Date of birth assembled from three dropdowns into form.dob (YYYY-MM-DD, or '').
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const setDobPart = (part) => (v) => {
    const nextDob = { ...dob, [part]: v };
    setDob(nextDob);
    // Only assemble form.dob when all three are set AND form a real calendar date (rejects
    // 31 Feb, 31 Apr, 29 Feb in a non-leap year) so a malformed ISO date is never submitted.
    let combined = '';
    if (nextDob.year && nextDob.month && nextDob.day) {
      const y = Number(nextDob.year), m = Number(nextDob.month), d = Number(nextDob.day);
      const probe = new Date(Date.UTC(y, m - 1, d));
      if (probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d) {
        combined = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }
    }
    setForm((f) => ({ ...f, dob: combined }));
  };

  // Google reCAPTCHA v3 (only when a Site key is configured; empty key = off, zero network to
  // Google). v3 is invisible/score-based, so there is no widget to render, only a small badge.
  // The script loads lazily in an effect, so this stays SSR-safe. A fresh token is fetched at
  // submit time via getRecaptchaToken().
  useEffect(() => { loadRecaptcha(RECAPTCHA_SITE_KEY); }, []);

  // Client-side validation mirroring the server contract. Returns '' when clean.
  const validate = () => {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const postcode = form.postcode.trim();
    if (!firstName) return 'Please enter your first name.';
    if (firstName.length > 100) return 'Your first name looks too long (100 characters at most).';
    if (!lastName) return 'Please enter your last name.';
    if (lastName.length > 100) return 'Your last name looks too long (100 characters at most).';
    if (!form.dob) return 'Please select your full date of birth.';
    if (Number(form.dob.slice(0, 4)) <= 1900) return 'Please check your year of birth.';
    if (new Date(`${form.dob}T00:00:00Z`).getTime() > Date.now()) return 'Your date of birth cannot be in the future.';
    if (!phone) return 'Please enter your phone number.';
    if (!PHONE_RE.test(phone) || (phone.match(/\d/g) || []).length < 9) return 'Please enter a valid phone number.';
    if (!email) return 'Please enter your email address.';
    if (email.length > 150 || !emailShapeOk(email)) return 'Please enter a valid email address.';
    if (form.address.trim().length > 200) return 'Your address looks too long (200 characters at most).';
    if (!postcode) return 'Please enter your postcode.';
    if (!POSTCODE_RE.test(postcode)) return 'Please enter a valid UK postcode.';
    if (!form.careType) return 'Please choose a care type.';
    if (form.notes.trim().length > 2000) return 'Please shorten your message (2,000 characters at most).';
    if (!form.consent) return 'Please tick the consent box so we can process your registration.';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // a submit is already in flight; ignore repeat clicks
    normalizePostcodeField(); // show the tidy postcode; server normalises authoritatively too
    const problem = validate();
    if (problem) { setError(problem); return; }
    submittingRef.current = true;
    setSubmitting(true);
    setError('');
    const botField = e.target['bot-field']?.value || '';
    const extras = buildEnquiryExtras(loadedAt.current, botField);
    // reCAPTCHA v3: fetch a fresh, single-use score token for this submit (no-op when the
    // Site key is empty, so the form still submits with zero network to Google).
    const recaptchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY, 'register');
    if (recaptchaToken) extras.recaptchaToken = recaptchaToken;

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      dob: form.dob,
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      postcode: form.postcode.trim(),
      careType: form.careType,
      referral: form.referral,
      notes: form.notes.trim(),
      consent: form.consent,
      consentVersion: PRIVACY_CONSENT_VERSION,
    };

    // Submit to the email pipeline (/api/send-enquiry). Route to the welcome page on
    // success; on failure surface the server's own reason, with the "call us" fallback.
    let msg = 'Sorry, something went wrong sending your registration.';
    try {
      const res = await submitEnquiry('register', payload, extras);
      if (res.ok) {
        navigate('/registered/', { state: { submitted: true, firstName: payload.firstName } });
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.error) msg = data.error;
    } catch { msg = 'Sorry, we couldn’t reach our booking system.'; }
    submittingRef.current = false;
    setSubmitting(false);
    setError(msg);
    // reCAPTCHA v3 tokens are single-use and fetched fresh on each submit, so there is nothing
    // to reset here after a failed send.
  };

  return (
    <section id="register" className="dn-section dn-register">
      <div className="dn-container">
        <div className="rd-glow day" aria-hidden="true" />
        <div className="rd-glow night" aria-hidden="true" />

        {/* Standard centred section head */}
        <div className="dn-section-head rn-head">
          <span className="dn-eyebrow dn-pill day">New Patients</span>
          <h2 className="rd-hero-title rn-title">
            Here for you, <em>day</em> or <span className="rd-night">night</span>.
          </h2>
          <p className="dn-section-lead">
            We are taking on new patients for every treatment we offer, and we confirm your
            first appointment within one working hour. Please check in below, just the
            essentials, the rest we cover on the call.
          </p>
          <div className="rn-chip">
            <span className="rd-status-dot" aria-hidden="true" />
            <b>Register in three minutes</b>
          </div>
        </div>

        {/* The desk: form panel left, value rail right */}
        <div className="rd-desk">

          <div className="rd-form-panel">
            <noscript>
              <p className="dn-form-error">
                This registration form needs JavaScript. Please call us on{' '}
                <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a> or email{' '}
                <a href={`mailto:${PRACTICE.email}`}>{PRACTICE.email}</a> to register.
              </p>
            </noscript>

            <form className="rd-form" onSubmit={onSubmit}>
              {/* Honeypot, the function drops any submission where this is filled.
                  Hidden from users, password managers and the keyboard so a real visitor
                  never trips it (autoComplete off, not tabbable, aria-hidden). */}
              <p hidden aria-hidden="true">
                <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </p>

              {/* ===== Group 1: your details ===== */}
              <section className="rd-group">
                <div className="rd-group-head">
                  <span className="rd-group-tab" aria-hidden="true">1</span>
                  <div>
                    <h3>Your details</h3>
                    <div className="rd-group-sub">Who we should welcome, and how to reach you.</div>
                  </div>
                </div>

                <div className="rd-row">
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-firstName">First name <span className="rd-req">*</span></label>
                    <input className="rd-input" id="reg-firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Hamza" maxLength={100} required value={form.firstName} onChange={update('firstName')} />
                  </div>
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-lastName">Last name <span className="rd-req">*</span></label>
                    <input className="rd-input" id="reg-lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Abrar" maxLength={100} required value={form.lastName} onChange={update('lastName')} />
                  </div>
                </div>

                <div className="rd-row one">
                  <div className="rd-field">
                    <span className="rd-label" id="reg-dob-label">Date of birth <span className="rd-req">*</span></span>
                    <div className="rd-dob" role="group" aria-labelledby="reg-dob-label">
                      <Dropdown name="dobDay" suppressHidden value={dob.day} onChange={setDobPart('day')} options={DAYS} placeholder="Day" ariaLabel="Day of birth" />
                      <Dropdown name="dobMonth" suppressHidden value={dob.month} onChange={setDobPart('month')} options={MONTHS} placeholder="Month" ariaLabel="Month of birth" />
                      <Dropdown name="dobYear" suppressHidden value={dob.year} onChange={setDobPart('year')} options={YEARS} placeholder="Year" ariaLabel="Year of birth" />
                    </div>
                    <input type="hidden" name="dob" value={form.dob} />
                  </div>
                </div>

                <div className="rd-row">
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-phone">Phone <span className="rd-req">*</span></label>
                    <input className="rd-input" id="reg-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Best contact number" maxLength={20} required value={form.phone} onChange={update('phone')} />
                  </div>
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-email">Email <span className="rd-req">*</span></label>
                    <input className="rd-input" id="reg-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" maxLength={150} required value={form.email} onChange={update('email')} />
                  </div>
                </div>

                <div className="rd-row address">
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-address">Address <span className="rd-opt">optional</span></label>
                    <input className="rd-input" id="reg-address" name="address" type="text" autoComplete="street-address" placeholder="Street address (optional)" maxLength={200} value={form.address} onChange={update('address')} />
                  </div>
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-postcode">Postcode <span className="rd-req">*</span></label>
                    <input className="rd-input" id="reg-postcode" name="postcode" type="text" autoComplete="postal-code" placeholder="G1 1SH" maxLength={8} required value={form.postcode} onChange={update('postcode')} onBlur={normalizePostcodeField} />
                  </div>
                </div>
              </section>

              {/* ===== Group 2: your care ===== */}
              <section className="rd-group care">
                <div className="rd-group-head">
                  <span className="rd-group-tab" aria-hidden="true">2</span>
                  <div>
                    <h3>Your care</h3>
                    <div className="rd-group-sub">How you would like to be seen, and what is on your mind.</div>
                  </div>
                </div>

                <div className="rd-field rd-field-care">
                  <span className="rd-label" id="reg-care-label">Care type <span className="rd-req">*</span></span>
                  <div className="rd-care-grid" role="radiogroup" aria-labelledby="reg-care-label">
                    {CARE_OPTIONS.map((opt) => (
                      <label key={opt.v} className={`rd-care-card ${opt.side} ${form.careType === opt.v ? 'is-on' : ''}`}>
                        <input
                          type="radio"
                          name="careType"
                          value={opt.v}
                          required
                          checked={form.careType === opt.v}
                          onChange={update('careType')}
                        />
                        <span className="rd-care-title">{opt.label}<CareTick /></span>
                        <span className="rd-care-desc">{opt.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rd-row">
                  <div className="rd-field">
                    <span className="rd-label">How did you hear about us? <span className="rd-opt">optional</span></span>
                    <Dropdown name="referral" value={form.referral} onChange={setField('referral')} options={REFERRAL_OPTIONS} placeholder="Optional" ariaLabel="How did you hear about us?" />
                  </div>
                  <div className="rd-field rd-field-end">
                    <span className="rd-label rd-label-spacer" aria-hidden="true">spacer</span>
                    <div className="rd-field-hint">
                      Anything you tell us helps the desk prepare before your call.
                    </div>
                  </div>
                </div>

                <div className="rd-row one">
                  <div className="rd-field">
                    <label className="rd-label" htmlFor="reg-notes">What do you need help with? <span className="rd-opt">optional</span></label>
                    <textarea className="rd-textarea" id="reg-notes" name="notes" rows={3} maxLength={2000} placeholder="e.g. toothache, a check-up, whitening, or a second opinion. Optional, but it helps us prepare for your call." value={form.notes} onChange={update('notes')} />
                    <div className="rd-field-hint">Please keep this brief. No need to include your full medical history, we will go through it on the call.</div>
                  </div>
                </div>

                <div className="rd-row one">
                  <label className="rd-consent">
                    <input
                      type="checkbox"
                      required
                      name="consent"
                      checked={form.consent}
                      onChange={update('consent')}
                    />
                    <span>
                      I{'’'}m happy for Day Night Dental to hold my information in line
                      with the{' '}
                      <Link to="/privacy/" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>privacy policy</Link>,
                      and to contact me about my registration.
                    </span>
                  </label>
                </div>
              </section>

              {error && (
                <p className="dn-form-error" role="alert">
                  {error} Please try again, or call us on{' '}
                  <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>.
                </p>
              )}

              {/* ===== submit ===== */}
              <div className="rd-submit-row">
                <p className="rd-submit-note"><strong>No payment now.</strong> We confirm the cost of your first visit before anything goes ahead.</p>
                <button type="submit" className="rd-submit" disabled={!form.consent || !form.careType || submitting}>
                  {submitting ? 'Sending…' : <>Complete Registration <span className="arrow" aria-hidden="true">→</span></>}
                </button>
              </div>
            </form>
          </div>

          {/* ===== right: the value rail ===== */}
          <aside className="rd-rail">
            <span className="rn-monogram" aria-hidden="true">DN</span>

            <div className="rn-inner">
              <span className="rn-eyebrow">What{'’'}s included</span>
              <h3>Your first visit</h3>
              <p className="rd-rail-lead">Everything below is part of your first appointment, set out plainly before you decide anything.</p>

              <ol className="rn-list">
                {RAIL_ITEMS.map((item) => (
                  <li className="rn-item" key={item.num}>
                    <span className="rn-ghost" aria-hidden="true">{item.num}</span>
                    <div className="rn-card">
                      <span className="rn-num">{item.num}</span>
                      <div className="rn-body">
                        <h4 className="rn-item-title">{item.title}</h4>
                        <p className="rn-item-text">{item.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="rn-pricerow">
                <div className="rn-plate">
                  <span className="rn-plate-label">First visit from</span>
                  <span className="rn-plate-figure">£95</span>
                </div>
                <ul className="rn-notes">
                  <li>Children under 18 are examined free.</li>
                  <li>NHS care is by waiting list when we have space.</li>
                </ul>
              </div>

              <div className="rn-emergency">
                <span className="rn-dot" aria-hidden="true"><span className="rn-dot-core" /></span>
                <div className="rn-em-body">
                  <p className="rn-em-eyebrow">24/7 Emergency</p>
                  <p>In pain right now? Don{'’'}t wait to register, we are a new practice in Merchant City, Glasgow.</p>
                  <a className="rn-tel" href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { PRACTICE } from '../data/practice';
import { submitEnquiry, buildEnquiryExtras } from '../lib/submitEnquiry';

const DENTIST_OPTIONS = [
  { value: 'no-preference', label: 'No preference, just assign me someone' },
  { value: 'female', label: 'Female dentist preferred' },
  { value: 'male', label: 'Male dentist preferred' },
  { value: 'principal', label: 'Principal dentist if available' },
  { value: 'anxiety-trained', label: 'Dentist experienced with anxious patients' },
];
const REFERRAL_OPTIONS = ['Google search', 'Friend or family', 'Instagram', 'Walked past the practice', 'Existing patient', 'Other'].map((t) => ({ value: t, label: t }));
const DAYS = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => ({ value: String(i + 1), label: m }));
const DOB_CURRENT_YEAR = 2026; // fixed for SSR determinism
const YEARS = Array.from({ length: DOB_CURRENT_YEAR - 1915 + 1 }, (_, i) => { const y = DOB_CURRENT_YEAR - i; return { value: String(y), label: String(y) }; });

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false); // synchronous guard: blocks rapid double/triple-clicks
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    careType: 'private',
    dentistPreference: 'no-preference',
    referral: '',
    consent: false,
  });

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });
  };
  const setField = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  // Form-load time for the server-side time-trap (client-only; SSG hydration-safe).
  const loadedAt = useRef(0);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  // Date of birth assembled from three dropdowns into form.dob (YYYY-MM-DD, or '').
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const setDobPart = (part) => (v) => {
    const nextDob = { ...dob, [part]: v };
    setDob(nextDob);
    const combined = nextDob.year && nextDob.month && nextDob.day
      ? `${nextDob.year}-${String(nextDob.month).padStart(2, '0')}-${String(nextDob.day).padStart(2, '0')}`
      : '';
    setForm((f) => ({ ...f, dob: combined }));
  };

  const next = () => setStep(Math.min(step + 1, 2));
  const back = () => setStep(Math.max(step - 1, 1));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // a submit is already in flight; ignore repeat clicks
    submittingRef.current = true;
    setSubmitting(true);
    setError(false);
    const botField = e.target['bot-field']?.value || '';
    const extras = buildEnquiryExtras(loadedAt.current, botField);

    // Submit to the email pipeline (/api/send-enquiry). Route to the welcome page on
    // success; on any failure show the "please call us" error.
    try {
      const res = await submitEnquiry('register', form, extras);
      if (res.ok) {
        navigate('/registered', { state: { firstName: form.firstName } });
        return;
      }
    } catch { /* network error -> error state below */ }
    submittingRef.current = false;
    setSubmitting(false);
    setError(true);
  };

  // Gate step 1 on a real email format (not just presence), so a typo is caught here with a
  // clear UI block rather than only failing at the server with a generic error after submit.
  const canProceedStep1 = form.firstName.trim() && form.lastName.trim() && form.phone.trim()
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((form.email || '').trim());

  return (
    <section id="register" className="dn-section dn-register">
      <div className="dn-glow day" style={{
        width: '500px', height: '500px',
        top: '20%', left: '-150px',
        opacity: 0.08,
      }} />
      <div className="dn-glow night" style={{
        width: '500px', height: '500px',
        bottom: '20%', right: '-150px',
        opacity: 0.08,
      }} />

      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">New Patients</span>
          <h2 className="dn-display">
            Register in <em>three</em> minutes
          </h2>
          <p className="dn-section-lead">
            We’re taking on new patients for every treatment we offer. Fill in the form
            below and we’ll confirm your first appointment within one working hour.
          </p>
          <p className="dn-register-urgent">
            In pain right now? Don’t wait to register, {' '}
            <a href={`tel:${PRACTICE.phoneE164}`}>call our 24/7 emergency line on {PRACTICE.phoneDisplay}</a>.
          </p>
        </div>

        <div className="dn-register-grid">
          {/* Left, benefits / why register */}
          <aside className="dn-register-aside">
            <div className="dn-register-aside-inner">
              <span className="dn-eyebrow day">What's Included</span>
              <h3 className="dn-display">Your first visit</h3>

              <ul className="dn-register-includes">
                <li>
                  <span className="num">01</span>
                  <div>
                    <h4>Comprehensive examination</h4>
                    <p>A full assessment with intra-oral scans and bite analysis. That’s 45 minutes with your assigned dentist.</p>
                  </div>
                </li>
                <li>
                  <span className="num">02</span>
                  <div>
                    <h4>Digital x-rays</h4>
                    <p>Low-dose digital imaging when it’s clinically needed. There are no films to develop, so you won’t be left waiting.</p>
                  </div>
                </li>
                <li>
                  <span className="num">03</span>
                  <div>
                    <h4>Personalised treatment plan</h4>
                    <p>You’ll get a written plan with the cost of each item set out before any work starts, so you always know where you stand.</p>
                  </div>
                </li>
                <li>
                  <span className="num">04</span>
                  <div>
                    <h4>Hygiene appointment</h4>
                    <p>We book this in alongside your examination, so you leave with a proper clean and a fresh start.</p>
                  </div>
                </li>
              </ul>

              <div className="dn-register-aside-foot">
                <p className="dn-register-aside-note">
                  We confirm the cost of your first visit before anything goes ahead, so there are no surprises. NHS care is available when we have space, and children under 18 are examined free.
                </p>
              </div>
            </div>
          </aside>

          {/* Right, multi-step form */}
          <div className="dn-register-form-wrap">
              <form
                className="dn-register-form"
                onSubmit={onSubmit}
              >
                {/* Honeypot, the function drops any submission where this is filled.
                    Hidden from users, password managers and the keyboard so a real visitor
                    never trips it (autoComplete off, not tabbable, aria-hidden). */}
                <p hidden aria-hidden="true">
                  <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                </p>
                {/* Progress */}
                <div className="dn-register-progress">
                  {[1, 2].map((s) => (
                    <div key={s} className={`dn-progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
                      <span className="dn-progress-num">0{s}</span>
                      <span className="dn-progress-label">
                        {s === 1 && 'Your Details'}
                        {s === 2 && 'Your Care'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step 1, Personal details */}
                {step === 1 && (
                  <div className="dn-register-step">
                    <h3 className="dn-display">Tell us about you</h3>

                    <div className="dn-form-row dn-form-row-2">
                      <label>
                        <span>First name *</span>
                        <input type="text" required name="firstName" autoComplete="given-name" value={form.firstName} onChange={update('firstName')} />
                      </label>
                      <label>
                        <span>Last name *</span>
                        <input type="text" required name="lastName" autoComplete="family-name" value={form.lastName} onChange={update('lastName')} />
                      </label>
                    </div>

                    <div className="dn-form-row">
                      <span className="dn-form-label">Date of birth</span>
                      <div className="dn-dob-grid">
                        <Dropdown name="dobDay" suppressHidden value={dob.day} onChange={setDobPart('day')} options={DAYS} placeholder="Day" ariaLabel="Day of birth" />
                        <Dropdown name="dobMonth" suppressHidden value={dob.month} onChange={setDobPart('month')} options={MONTHS} placeholder="Month" ariaLabel="Month of birth" />
                        <Dropdown name="dobYear" suppressHidden value={dob.year} onChange={setDobPart('year')} options={YEARS} placeholder="Year" ariaLabel="Year of birth" />
                      </div>
                      <input type="hidden" name="dob" value={form.dob} />
                    </div>

                    <div className="dn-form-row dn-form-row-2">
                      <label>
                        <span>Phone *</span>
                        <input type="tel" required name="phone" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update('phone')} placeholder="Best contact number" />
                      </label>
                      <label>
                        <span>Email *</span>
                        <input type="email" required name="email" autoComplete="email" inputMode="email" value={form.email} onChange={update('email')} placeholder="you@email.com" />
                      </label>
                    </div>

                    <div className="dn-form-row dn-form-row-2">
                      <label>
                        <span>Address</span>
                        <input type="text" name="address" autoComplete="street-address" value={form.address} onChange={update('address')} placeholder="Street address" />
                      </label>
                      <label>
                        <span>Postcode</span>
                        <input type="text" name="postcode" autoComplete="postal-code" value={form.postcode} onChange={update('postcode')} placeholder="SW1A 1AA" />
                      </label>
                    </div>

                    <div className="dn-register-actions">
                      <span className="dn-step-counter">Step 1 of 2</span>
                      <button type="button" className="dn-btn primary" onClick={next} disabled={!canProceedStep1}>
                        Continue <span className="arrow">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2, Care preferences */}
                {step === 2 && (
                  <div className="dn-register-step">
                    <h3 className="dn-display">How would you like to be seen?</h3>

                    <div className="dn-form-row">
                      <span className="dn-form-label" id="care-type-label">Care type</span>
                      <div className="dn-form-radios" role="radiogroup" aria-labelledby="care-type-label">
                        {[
                          { v: 'private', label: 'Private', side: 'day', desc: 'Full choice of times and treatments' },
                          { v: 'nhs', label: 'NHS', side: 'night', desc: 'When we have space' },
                          { v: 'mixed', label: 'Either', side: 'day', desc: 'Whatever gets you seen soonest' },
                          { v: 'unsure', label: 'Not sure yet', side: 'night', desc: 'We’ll talk it through on the call' },
                        ].map(opt => (
                          <label key={opt.v} className={`dn-radio-card ${opt.side} ${form.careType === opt.v ? 'checked' : ''}`}>
                            <input
                              type="radio"
                              name="careType"
                              value={opt.v}
                              checked={form.careType === opt.v}
                              onChange={update('careType')}
                            />
                            <span className="title">{opt.label}</span>
                            <span className="desc">{opt.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="dn-form-row">
                      <span className="dn-form-label">Dentist preference</span>
                      <Dropdown name="dentistPreference" value={form.dentistPreference} onChange={setField('dentistPreference')} options={DENTIST_OPTIONS} ariaLabel="Dentist preference" />
                    </div>

                    <div className="dn-form-row">
                      <span className="dn-form-label">How did you hear about us?</span>
                      <Dropdown name="referral" value={form.referral} onChange={setField('referral')} options={REFERRAL_OPTIONS} placeholder="Optional" ariaLabel="How did you hear about us?" />
                    </div>

                                        <div className="dn-form-row">
                      <label className="dn-checkbox">
                        <input
                          type="checkbox"
                          required
                          name="consent"
                          checked={form.consent}
                          onChange={update('consent')}
                        />
                        <span>
                          I’m happy for Day Night Dental to hold my information in line
                          with their privacy policy, and to contact me about my registration.
                        </span>
                      </label>
                    </div>

                    {error && (
                      <p className="dn-form-error" role="alert">
                        Sorry, something went wrong sending your registration. Please try again, or call us on{' '}
                        <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>.
                      </p>
                    )}
                    <div className="dn-register-actions">
                      <button type="button" className="dn-btn dn-btn-ghost" onClick={back}>
                        <span className="arrow-back">←</span> Back
                      </button>
                      <button type="submit" className="dn-btn primary" disabled={!form.consent || submitting}>
                        {submitting ? 'Sending…' : 'Complete Registration'}{!submitting && <span className="arrow"> →</span>}
                      </button>
                    </div>
                  </div>
                )}
              </form>
          </div>
        </div>
      </div>

    </section>
  );
}

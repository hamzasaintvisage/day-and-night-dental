import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { PRACTICE } from '../data/practice';

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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const go = () => navigate('/registered', { state: { firstName: form.firstName, email: form.email, phone: form.phone } });
    const fail = () => { setSubmitting(false); setError(true); };
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'register', ...form }),
    })
      .then((res) => (res.ok ? go() : fail()))
      .catch(fail);
  };

  const canProceedStep1 = form.firstName && form.lastName && form.phone && form.email;

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
            In pain right now? Don’t wait to register —{' '}
            <a href={`tel:${PRACTICE.phoneE164}`}>call our 24/7 emergency line on {PRACTICE.phoneDisplay}</a>.
          </p>
        </div>

        <div className="dn-register-grid">
          {/* Left — benefits / why register */}
          <aside className="dn-register-aside">
            <div className="dn-register-aside-inner">
              <span className="dn-eyebrow day">What's Included</span>
              <h3 className="dn-display">Your first visit</h3>

              <ul className="dn-register-includes">
                <li>
                  <span className="num">01</span>
                  <div>
                    <h5>Comprehensive examination</h5>
                    <p>A full assessment with intra-oral scans and bite analysis. That’s 45 minutes with your assigned dentist.</p>
                  </div>
                </li>
                <li>
                  <span className="num">02</span>
                  <div>
                    <h5>Digital x-rays</h5>
                    <p>Low-dose digital imaging when it’s clinically needed. There are no films to develop, so you won’t be left waiting.</p>
                  </div>
                </li>
                <li>
                  <span className="num">03</span>
                  <div>
                    <h5>Personalised treatment plan</h5>
                    <p>You’ll get a written plan with the cost of each item set out before any work starts, so you always know where you stand.</p>
                  </div>
                </li>
                <li>
                  <span className="num">04</span>
                  <div>
                    <h5>Hygiene appointment</h5>
                    <p>We book this in alongside your examination, so you leave with a proper clean and a fresh start.</p>
                  </div>
                </li>
              </ul>

              <div className="dn-register-aside-foot">
                <div className="dn-register-price">
                  <span className="label">First visit from</span>
                  <span className="amount"><span className="currency">£</span>95</span>
                </div>
                <p className="dn-register-aside-note">
                  NHS care is available when we have space. Children under 18 are examined free.
                </p>
              </div>
            </div>
          </aside>

          {/* Right — multi-step form */}
          <div className="dn-register-form-wrap">
            {!submitted ? (
              <form
                className="dn-register-form"
                name="register"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                <input type="hidden" name="form-name" value="register" />
                <p hidden>
                  <label>Leave this empty: <input name="bot-field" /></label>
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

                {/* Step 1 — Personal details */}
                {step === 1 && (
                  <div className="dn-register-step">
                    <h3 className="dn-display">Tell us about you</h3>

                    <div className="dn-form-row dn-form-row-2">
                      <label>
                        <span>First name *</span>
                        <input type="text" required name="firstName" value={form.firstName} onChange={update('firstName')} />
                      </label>
                      <label>
                        <span>Last name *</span>
                        <input type="text" required name="lastName" value={form.lastName} onChange={update('lastName')} />
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
                        <input type="tel" required name="phone" value={form.phone} onChange={update('phone')} placeholder="Best contact number" />
                      </label>
                      <label>
                        <span>Email *</span>
                        <input type="email" required name="email" value={form.email} onChange={update('email')} placeholder="you@email.com" />
                      </label>
                    </div>

                    <div className="dn-form-row dn-form-row-2">
                      <label>
                        <span>Address</span>
                        <input type="text" name="address" value={form.address} onChange={update('address')} placeholder="Street address" />
                      </label>
                      <label>
                        <span>Postcode</span>
                        <input type="text" name="postcode" value={form.postcode} onChange={update('postcode')} placeholder="SW1A 1AA" />
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

                {/* Step 2 — Care preferences */}
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
                          I’m happy for Day & Night Dental to hold my information in line
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
            ) : (
              <div className="dn-register-success">
                <div className="dn-success-mark">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="28" stroke="url(#grad-reg-success)" strokeWidth="1" />
                    <path d="M18 30 L26 38 L42 22" stroke="url(#grad-reg-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <defs>
                      <linearGradient id="grad-reg-success" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#D4A453" />
                        <stop offset="1" stopColor="#5B8FBF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="dn-display">Welcome to the practice, {form.firstName}.</h3>
                <p>
                  That’s your registration done. One of the team will be in touch within
                  one working hour to confirm your first appointment.
                </p>
                <div className="dn-success-details">
                  <div>
                    <span className="dn-eyebrow day">Confirmation sent to</span>
                    <span>{form.email}</span>
                  </div>
                  <div>
                    <span className="dn-eyebrow night">We'll call you on</span>
                    <span>{form.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}

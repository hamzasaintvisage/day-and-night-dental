import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';

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
    const go = () => navigate('/registered', { state: { firstName: form.firstName, email: form.email, phone: form.phone } });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'register', ...form }),
    }).then(go).catch(go);
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
                      <span className="dn-form-label">Care type</span>
                      <div className="dn-form-radios">
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

                    <div className="dn-register-actions">
                      <button type="button" className="dn-btn dn-btn-ghost" onClick={back}>
                        <span className="arrow-back">←</span> Back
                      </button>
                      <button type="submit" className="dn-btn primary" disabled={!form.consent}>
                        Complete Registration <span className="arrow">→</span>
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

      <style>{`
        .dn-register { position: relative; }
        .dn-register-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 3rem;
          margin-top: 4rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* Aside */
        .dn-register-aside {
          position: sticky;
          top: 110px;
        }
        .dn-register-aside-inner {
          padding: 3rem 2.5rem;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          position: relative;
          overflow: hidden;
        }
        .dn-register-aside-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--dn-day) 50%, var(--dn-night) 50%);
        }
        .dn-register-aside h3 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0.5rem 0 2rem;
        }
        .dn-register-includes {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .dn-register-includes li {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--dn-mist);
        }
        .dn-register-includes li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .dn-register-includes .num {
          font-family: var(--font-display);
          font-style: normal;
          font-size: 1.4rem;
          color: var(--dn-day);
          line-height: 1;
        }
        .dn-register-includes li:nth-child(even) .num { color: var(--dn-night); }
        .dn-register-includes h5 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 0.4rem;
        }
        .dn-register-includes p {
          font-size: 0.85rem;
          color: var(--dn-bone-dim);
          line-height: 1.5;
        }
        .dn-register-aside-foot {
          padding-top: 1.5rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-register-price {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .dn-register-price .label {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
        }
        .dn-register-price .amount {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dn-register-price .currency {
          font-size: 1.2rem;
          margin-right: 0.1em;
        }
        .dn-register-aside-note {
          font-size: 0.75rem;
          color: var(--dn-bone-faint);
          font-style: normal;
          line-height: 1.5;
        }

        /* Form */
        .dn-register-form {
          padding: 3rem;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          position: relative;
          overflow: hidden;
        }
        .dn-register-form::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--dn-day) 0%, var(--dn-day) 50%, var(--dn-night) 50%, var(--dn-night) 100%);
        }
        .dn-register-progress {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--dn-mist);
        }
        .dn-progress-step {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.5rem 0;
          border-top: 1px solid var(--dn-mist);
          opacity: 0.4;
          transition: all 0.4s;
        }
        .dn-progress-step.active {
          opacity: 1;
          border-top-color: var(--dn-day);
        }
        .dn-progress-step.current {
          border-top-color: var(--dn-day);
        }
        .dn-progress-step:nth-child(2).active { border-top-color: var(--dn-bone); }
        .dn-progress-step:nth-child(3).active { border-top-color: var(--dn-night); }
        .dn-progress-num {
          font-family: var(--font-display);
          font-style: normal;
          font-size: 0.9rem;
          color: var(--dn-bone-dim);
        }
        .dn-progress-step.active .dn-progress-num { color: var(--dn-bone); }
        .dn-progress-label {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
        }
        .dn-progress-step.active .dn-progress-label { color: var(--dn-bone); }

        .dn-register-step h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .dn-step-intro {
          color: var(--dn-bone-dim);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        .dn-register-step .dn-form-row:first-of-type {
          margin-top: 2rem;
        }
        .dn-register-form .dn-form-row {
          margin-bottom: 1.5rem;
        }
        .dn-register-form .dn-form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dn-register-form label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dn-register-form label > span,
        .dn-form-label {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
        }
        .dn-register-form input,
        .dn-register-form select,
        .dn-register-form textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--dn-charcoal);
          border: 1px solid var(--dn-mist);
          color: var(--dn-bone);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }
        .dn-register-form input:focus,
        .dn-register-form select:focus,
        .dn-register-form textarea:focus {
          outline: none;
          border-color: var(--dn-day);
        }
        .dn-form-radios {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .dn-radio-card {
          padding: 1rem 1.25rem;
          background: var(--dn-charcoal);
          border: 1px solid var(--dn-mist);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .dn-radio-card input {
          display: none;
        }
        .dn-radio-card .title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--dn-bone);
        }
        .dn-radio-card .desc {
          font-size: 0.75rem;
          color: var(--dn-bone-dim);
        }
        .dn-radio-card.checked.day {
          border-color: var(--dn-day);
          background: rgba(212, 164, 83, 0.05);
        }
        .dn-radio-card.checked.day .title { color: var(--dn-day); }
        .dn-radio-card.checked.night {
          border-color: var(--dn-night);
          background: rgba(91, 143, 191, 0.05);
        }
        .dn-radio-card.checked.night .title { color: var(--dn-night-soft); }

        .dn-checkbox {
          flex-direction: row !important;
          align-items: flex-start;
          gap: 0.75rem !important;
          cursor: pointer;
          padding: 1rem;
          background: var(--dn-charcoal);
          border: 1px solid var(--dn-mist);
        }
        .dn-checkbox input {
          width: auto !important;
          margin-top: 4px;
          accent-color: var(--dn-day);
        }
        .dn-checkbox span {
          font-size: 0.8rem !important;
          text-transform: none !important;
          letter-spacing: 0 !important;
          color: var(--dn-bone-dim) !important;
          line-height: 1.5;
        }

        .dn-register-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--dn-mist);
          gap: 1rem;
        }
        .dn-step-counter {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--dn-bone-faint);
        }
        .dn-btn-ghost {
          border-color: var(--dn-mist);
          color: var(--dn-bone-dim);
        }
        .dn-btn-ghost::before { display: none; }
        .dn-btn-ghost:hover {
          color: var(--dn-bone);
          border-color: var(--dn-bone-dim);
        }
        .arrow-back {
          transition: transform 0.4s ease;
        }
        .dn-btn:hover .arrow-back {
          transform: translateX(-4px);
        }
        .dn-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .dn-btn:disabled:hover::before { transform: translateX(-100%); }

        /* Success */
        .dn-register-success {
          padding: 4rem 3rem;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          text-align: center;
        }
        .dn-success-mark {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }
        .dn-register-success h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .dn-register-success p {
          color: var(--dn-bone-dim);
          max-width: 420px;
          margin: 0 auto 2rem;
        }
        .dn-success-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-success-details > div {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dn-success-details span:last-child {
          font-family: var(--font-display);
          color: var(--dn-bone);
          font-size: 1.05rem;
        }

        @media (max-width: 1000px) {
          .dn-register-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .dn-register-aside { position: static; }
        }
        @media (max-width: 600px) {
          .dn-register-form,
          .dn-register-aside-inner { padding: 2rem 1.5rem; }
          .dn-register-form .dn-form-row-2 { grid-template-columns: 1fr; }
          .dn-form-radios { grid-template-columns: 1fr; }
          .dn-success-details { grid-template-columns: 1fr; }
          .dn-register-progress { gap: 0.25rem; }
          .dn-progress-label { font-size: 0.6rem; }
        }
      `}</style>
    </section>
  );
}

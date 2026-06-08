import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRACTICE } from '../data/practice';
import Dropdown from '../components/Dropdown';

const treatmentOptions = [
  'Emergency / pain', 'New patient examination', 'Hygienist appointment',
  'Cosmetic consultation', 'Invisalign', 'Dental implants', 'Teeth whitening', 'Other / unsure',
].map((t) => ({ value: t, label: t }));

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preference: 'emergency',
    treatment: '',
    notes: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const setField = (field) => (value) => setForm({ ...form, [field]: value });

  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    // Netlify Forms: POST the encoded fields to the site root. Only a 2xx response
    // counts as success; anything else surfaces an error so an enquiry is never
    // silently dropped — the patient is told to call instead.
    const go = () => navigate('/thank-you', { state: { firstName: (form.name || '').split(' ')[0] } });
    const fail = () => { setSubmitting(false); setError(true); };
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...form }),
    })
      .then((res) => (res.ok ? go() : fail()))
      .catch(fail);
  };

  return (
    <section id="contact" className="dn-section dn-contact">
      <div className="dn-glow day" style={{
        width: '500px', height: '500px',
        top: '10%', left: '5%',
        opacity: 0.08,
      }} />
      <div className="dn-glow night" style={{
        width: '500px', height: '500px',
        bottom: '10%', right: '5%',
        opacity: 0.08,
      }} />

      <div className="dn-container">
        <div className="dn-contact-grid">
          {/* Left — info */}
          <div className="dn-contact-info">
            <span className="dn-eyebrow">Book Appointment</span>
            <h2 className="dn-display">
              Pain doesn't wait.<br />
              <em>Neither do we.</em>
            </h2>
            <p className="dn-contact-lead">
              We see emergencies the same day, every day. For a routine booking, just tell
              us when suits and we’ll call you back within the hour while we’re open.
            </p>

            <div className="dn-contact-details">
              <div className="dn-contact-detail">
                <span className="dn-eyebrow day">Day Line</span>
                <a href={`tel:${PRACTICE.phoneE164}`} className="value">{PRACTICE.phoneDisplay}</a>
                <span className="hint">Mon to Sun, 7am to 11pm</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-eyebrow night">Night & Emergency</span>
                <a href={`tel:${PRACTICE.phoneE164}`} className="value">{PRACTICE.phoneDisplay}</a>
                <span className="hint">24-hour duty dentist</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-eyebrow">Email</span>
                <a href={`mailto:${PRACTICE.email}`} className="value">{PRACTICE.email}</a>
                <span className="hint">We reply within 1 working hour</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-eyebrow">Visit</span>
                <p className="value">
                  {PRACTICE.streetAddress}<br />
                  {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
                </p>
                <span className="hint">Free parking nearby</span>
              </div>
            </div>

            <div className="dn-contact-map">
              <iframe
                title="Day & Night Dental, Merchant City, Glasgow map"
                src={PRACTICE.mapEmbed || 'https://www.google.com/maps?q=Merchant+City,+Glasgow&output=embed'}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="dn-contact-hours">
              <div className="dn-hours-head">
                <span className="dn-eyebrow">Opening Hours</span>
              </div>
              <table>
                <tbody>
                  <tr><td>Monday to Friday</td><td>7am to 11pm</td></tr>
                  <tr><td>Saturday</td><td>8am to 10pm</td></tr>
                  <tr><td>Sunday</td><td>9am to 9pm</td></tr>
                  <tr className="emergency-row">
                    <td>Emergency line</td>
                    <td><span className="live-dot" /> 24 hours, 7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right — form */}
          <div className="dn-contact-form-wrap">
            {!submitted ? (
              <form
                className="dn-contact-form"
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                {/* Netlify Forms plumbing */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>Leave this empty: <input name="bot-field" /></label>
                </p>
                <h3 className="dn-display">Request an appointment</h3>

                <div className="dn-form-row">
                  <label>
                    <span>Your name</span>
                    <input type="text" name="name" required value={form.name} onChange={update('name')} placeholder="Full name" />
                  </label>
                </div>

                <div className="dn-form-row dn-form-row-2">
                  <label>
                    <span>Phone</span>
                    <input type="tel" name="phone" required value={form.phone} onChange={update('phone')} placeholder="Best number to call" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" name="email" required value={form.email} onChange={update('email')} placeholder="you@email.com" />
                  </label>
                </div>

                <div className="dn-form-row">
                  <span className="dn-form-label" id="pref-time-label">Preferred time</span>
                  <div className="dn-form-radios" role="radiogroup" aria-labelledby="pref-time-label">
                    {[
                      { v: 'emergency', label: 'Emergency, today', side: 'night', emergency: true },
                      { v: 'day', label: 'Day (7am to 5pm)', side: 'day' },
                      { v: 'evening', label: 'Evening (5pm to 11pm)', side: 'night' },
                      { v: 'weekend', label: 'Weekend', side: 'day' },
                    ].map(opt => (
                      <label key={opt.v} className={`dn-radio ${opt.side} ${opt.emergency ? 'urgent' : ''} ${form.preference === opt.v ? 'checked' : ''}`}>
                        <input
                          type="radio"
                          name="preference"
                          value={opt.v}
                          checked={form.preference === opt.v}
                          onChange={update('preference')}
                        />
                        <span>
                          {opt.emergency && <span className="urgent-dot" />}
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="dn-form-row">
                  <span className="dn-form-label">Treatment of interest</span>
                  <Dropdown
                    name="treatment"
                    value={form.treatment}
                    onChange={setField('treatment')}
                    options={treatmentOptions}
                    placeholder="Select an option"
                    ariaLabel="Treatment of interest"
                  />
                </div>

                <div className="dn-form-row">
                  <label>
                    <span>Anything we should know?</span>
                    <textarea
                      name="notes"
                      rows="3"
                      value={form.notes}
                      onChange={update('notes')}
                      placeholder="Optional. Concerns, dental anxiety, accessibility needs..."
                    />
                  </label>
                </div>

                {error && (
                  <p className="dn-form-error" role="alert">
                    Sorry, something went wrong sending your request. Please try again, or call us now on{' '}
                    <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>.
                  </p>
                )}
                <button type="submit" disabled={submitting} className={`dn-btn primary dn-form-submit ${form.preference === 'emergency' ? 'dn-btn-emergency' : ''}`}>
                  {form.preference === 'emergency' && !submitting && <span className="dn-btn-pulse" />}
                  {submitting ? 'Sending…' : (form.preference === 'emergency' ? 'Request Emergency Appointment' : 'Request Booking')}
                  {!submitting && <span className="arrow">→</span>}
                </button>

                <p className="dn-form-disclaimer">
                  We’ll never share your details. By sending this you’re happy for us to
                  contact you about your enquiry. Read our <Link to="/privacy">privacy policy</Link>.
                </p>
              </form>
            ) : (
              <div className="dn-contact-success">
                <div className="dn-success-mark">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="28" stroke="url(#grad-success)" strokeWidth="1" />
                    <path d="M18 30 L26 38 L42 22" stroke="url(#grad-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <defs>
                      <linearGradient id="grad-success" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#D4A453" />
                        <stop offset="1" stopColor="#5B8FBF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="dn-display">Thank you, {form.name.split(' ')[0]}.</h3>
                <p>
                  Your request has come through. One of the team will give you a ring
                  shortly to sort out a time that suits you.
                </p>
                <p className="dn-success-emergency">
                  In bad pain right now? Call our emergency line on <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dn-contact { position: relative; }
        .dn-form-error {
          margin: 1rem 0 0;
          padding: 0.85rem 1rem;
          border: 1px solid #ef4444;
          background: rgba(239, 68, 68, 0.08);
          color: var(--dn-bone);
          font-size: 0.85rem;
          border-radius: 4px;
        }
        .dn-form-error a { color: var(--dn-night-soft); font-weight: 600; }
        .dn-contact-form .dn-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .dn-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 5rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .dn-contact-info h2 {
          font-size: clamp(1.7rem, 3.2vw, 2.5rem);
          margin: 1rem 0 1.5rem;
          font-weight: 700;
        }
        .dn-contact-info h2 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dn-contact-lead {
          color: var(--dn-bone-dim);
          margin-bottom: 3rem;
          max-width: 480px;
          font-size: 1.05rem;
        }
        .dn-contact-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem 1.5rem;
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--dn-mist);
        }
        .dn-contact-detail {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dn-contact-detail .value {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--dn-bone);
          margin-top: 0.2rem;
        }
        .dn-contact-detail .hint {
          font-size: 0.75rem;
          color: var(--dn-bone-faint);
          letter-spacing: 0.05em;
        }
        .dn-contact-hours table {
          width: 100%;
          margin-top: 1rem;
          border-collapse: collapse;
        }
        .dn-contact-hours td {
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--dn-mist);
          font-size: 0.95rem;
        }
        .dn-contact-hours td:last-child {
          text-align: right;
          font-family: var(--font-display);
          color: var(--dn-bone);
        }
        .dn-contact-hours .emergency-row td:last-child {
          color: var(--dn-night-soft);
        }
        .live-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          margin-right: 0.5rem;
          box-shadow: 0 0 8px #4ade80;
          animation: dn-glow-day 2s infinite;
        }

        /* Form */
        .dn-contact-form-wrap {
          position: sticky;
          top: 100px;
        }
        .dn-contact-form {
          padding: 3rem;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          position: relative;
          overflow: hidden;
        }
        .dn-contact-form::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--dn-day) 0%, var(--dn-day) 50%, var(--dn-night) 50%, var(--dn-night) 100%);
        }
        .dn-contact-form h3 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          font-weight: 700;
        }
        .dn-form-row {
          margin-bottom: 1.5rem;
        }
        .dn-form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dn-form-row label,
        .dn-form-label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dn-form-row label > span,
        .dn-form-label {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
        }
        .dn-contact-form input,
        .dn-contact-form select,
        .dn-contact-form textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: var(--dn-charcoal);
          border: 1px solid var(--dn-mist);
          color: var(--dn-bone);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }
        .dn-contact-form input:focus,
        .dn-contact-form select:focus,
        .dn-contact-form textarea:focus {
          outline: none;
          border-color: var(--dn-day);
        }
        .dn-form-radios {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .dn-radio {
          padding: 0.75rem 1rem;
          background: var(--dn-charcoal);
          border: 1px solid var(--dn-mist);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.85rem;
          color: var(--dn-bone-dim);
        }
        .dn-radio input {
          display: none;
        }
        .dn-radio.checked.day {
          border-color: var(--dn-day);
          color: var(--dn-day);
          background: rgba(212, 164, 83, 0.05);
        }
        .dn-radio.checked.night {
          border-color: var(--dn-night);
          color: var(--dn-night-soft);
          background: rgba(91, 143, 191, 0.05);
        }
        .dn-radio.urgent {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.04);
        }
        .dn-radio.urgent.checked {
          border-color: #ef4444 !important;
          background: rgba(239, 68, 68, 0.1) !important;
          color: var(--dn-bone) !important;
        }
        .urgent-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          margin-right: 0.5rem;
          box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
          animation: emergency-pulse 1.8s infinite;
        }
        .dn-form-submit {
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
        }
        .dn-form-disclaimer {
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: var(--dn-bone-faint);
          text-align: center;
        }

        /* Success state */
        .dn-contact-success {
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
        .dn-contact-success h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .dn-contact-success p {
          color: var(--dn-bone-dim);
          margin-bottom: 1rem;
        }
        .dn-success-emergency {
          margin-top: 2rem !important;
          padding-top: 2rem;
          border-top: 1px solid var(--dn-mist);
          color: var(--dn-night-soft) !important;
        }
        .dn-success-emergency a {
          color: var(--dn-night);
          font-weight: 500;
        }

        @media (max-width: 1000px) {
          .dn-contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .dn-contact-form-wrap { position: static; }
        }
        @media (max-width: 600px) {
          .dn-contact-details { grid-template-columns: 1fr; }
          .dn-form-row-2 { grid-template-columns: 1fr; }
          .dn-form-radios { grid-template-columns: 1fr; }
          .dn-contact-form { padding: 2rem 1.5rem; }
        }
      `}</style>
    </section>
  );
}

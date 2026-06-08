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

    </section>
  );
}

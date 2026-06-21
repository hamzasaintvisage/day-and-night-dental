import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRACTICE } from '../data/practice';
import Dropdown from '../components/Dropdown';
import { Icon } from '../components/ConcernIcon';
import { submitEnquiry, buildEnquiryExtras } from '../lib/submitEnquiry';
import { hasConsent } from '../lib/analytics';

const treatmentOptions = [
  'Emergency / pain', 'New patient examination', 'Hygienist appointment',
  'Cosmetic consultation', 'Invisalign', 'Dental implants', 'Teeth whitening', 'Other / unsure',
].map((t) => ({ value: t, label: t }));

export default function Contact() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false); // synchronous guard: blocks rapid double/triple-clicks
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preference: '',
    treatment: '',
    notes: '',
  });

  // Form-load time for the server-side time-trap (client-only; never at render/module
  // scope, to keep SSG hydration-safe).
  const loadedAt = useRef(0);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  // Don't load the Google map (third-party cookies) until the visitor has consented, or
  // explicitly chooses to show it (PECR: no non-essential cookies before consent).
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    if (hasConsent()) setShowMap(true);
    const onChange = () => setShowMap(hasConsent());
    window.addEventListener('dnd-cookie-settings', onChange);
    return () => window.removeEventListener('dnd-cookie-settings', onChange);
  }, []);

  // Functional updates: multi-field browser autofill fires several change events before a
  // re-render, so a stale-snapshot spread would drop all but the last. Merge from the latest state.
  const update = (field) => (e) => { const { value } = e.target; setForm((f) => ({ ...f, [field]: value })); };
  const setField = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // a submit is already in flight; ignore repeat clicks
    submittingRef.current = true;
    setSubmitting(true);
    setError('');
    const botField = e.target['bot-field']?.value || '';
    const extras = buildEnquiryExtras(loadedAt.current, botField);

    // Submit to the email pipeline (/api/send-enquiry). Route to thank-you on success;
    // on failure surface the server's own reason (rate limit, validation, etc.) so the
    // visitor knows what to fix, with the "call us" fallback so an enquiry is never lost.
    let msg = 'Sorry, something went wrong sending your request.';
    try {
      const res = await submitEnquiry('contact', form, extras);
      if (res.ok) {
        navigate('/thank-you/', { state: { submitted: true, firstName: (form.name || '').split(' ')[0] } });
        return;
      }
      const data = await res.json().catch(() => null);
      if (data?.error) msg = data.error;
    } catch { msg = 'Sorry, we couldn’t reach our booking system.'; }
    submittingRef.current = false;
    setSubmitting(false);
    setError(msg);
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
          {/* Left, info */}
          <div className="dn-contact-info">
            <span className="dn-eyebrow dn-pill day">Book Appointment</span>
            <h2 className="dn-display">
              Tooth trouble?<br />
              Let’s get you <em className="dn-hl-gold">seen</em>.
            </h2>
            <p className="dn-contact-lead">
              For urgent toothache, swelling or a broken tooth, call our 24/7 emergency line.
              For routine appointments, send us your details and the team will get back to you.
            </p>

            <div className="dn-contact-details">
              <div className="dn-contact-detail">
                <span className="dn-contact-ico day" aria-hidden="true"><Icon type="phone" /></span>
                <span className="dn-eyebrow day">Day Line</span>
                <a href={`tel:${PRACTICE.phoneE164}`} className="value">{PRACTICE.phoneDisplay}</a>
                <span className="hint">Mon to Sun, 7am to 11pm</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-contact-ico night" aria-hidden="true"><Icon type="pulse" /></span>
                <span className="dn-eyebrow night">Night & Emergency</span>
                <a href={`tel:${PRACTICE.phoneE164}`} className="value">{PRACTICE.phoneDisplay}</a>
                <span className="hint">24-hour emergency line</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-contact-ico" aria-hidden="true"><Icon type="mail" /></span>
                <span className="dn-eyebrow">Email</span>
                <a href={`mailto:${PRACTICE.email}`} className="value">{PRACTICE.email}</a>
                <span className="hint">We reply within 1 working hour</span>
              </div>

              <div className="dn-contact-detail">
                <span className="dn-contact-ico" aria-hidden="true"><Icon type="pin" /></span>
                <span className="dn-eyebrow">Visit</span>
                <p className="value">
                  {PRACTICE.streetAddress}<br />
                  {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
                </p>
                <span className="hint">Free parking nearby</span>
              </div>
            </div>

            <div className="dn-contact-map">
              {showMap ? (
                <iframe
                  title="Day Night Dental, Merchant City, Glasgow map"
                  src={PRACTICE.mapEmbed || 'https://www.google.com/maps?q=Merchant+City,+Glasgow&output=embed'}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="dn-contact-map-facade" onClick={() => setShowMap(true)}>
                  <span className="dn-contact-map-facade-ico" aria-hidden="true"><Icon type="pin" /></span>
                  <span className="dn-contact-map-facade-text">
                    <strong>{PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}</strong>
                    Show Google map
                  </span>
                  <span className="dn-contact-map-facade-note">Loads Google Maps, which may set cookies.</span>
                </button>
              )}
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

          {/* Right, form */}
          <div className="dn-contact-form-wrap">
              <noscript>
                <p className="dn-form-error">
                  This form needs JavaScript. Please call us on{' '}
                  <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a> or email{' '}
                  <a href={`mailto:${PRACTICE.email}`}>{PRACTICE.email}</a> and we’ll help straight away.
                </p>
              </noscript>
              <form
                className="dn-contact-form"
                onSubmit={onSubmit}
              >
                {/* Honeypot, the function drops any submission where this is filled.
                    Hidden from users, password managers and the keyboard so a real visitor
                    never trips it (autoComplete off, not tabbable, aria-hidden). */}
                <p hidden aria-hidden="true">
                  <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                </p>
                <h3 className="dn-display">Request an appointment</h3>

                <div className="dn-form-row">
                  <label>
                    <span>Your name</span>
                    <input type="text" name="name" required autoComplete="name" value={form.name} onChange={update('name')} placeholder="Full name" />
                  </label>
                </div>

                <div className="dn-form-row dn-form-row-2">
                  <label>
                    <span>Phone</span>
                    <input type="tel" name="phone" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={update('phone')} placeholder="Best number to call" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" name="email" required autoComplete="email" inputMode="email" value={form.email} onChange={update('email')} placeholder="you@email.com" />
                  </label>
                </div>

                <div className="dn-form-row">
                  <span className="dn-form-label" id="pref-time-label">Preferred time</span>
                  <div className="dn-form-radios" role="radiogroup" aria-labelledby="pref-time-label">
                    {[
                      { v: 'emergency', label: 'Emergency, today', side: 'night', emergency: true },
                      { v: 'day', label: 'Day (7am to 5pm)', side: 'day' },
                      { v: 'evening', label: 'Evening (5pm to 11pm)', side: 'night' },
                      { v: 'weekend', label: 'Weekend', side: 'night' },
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
                      placeholder="Optional. Anything that helps us handle your enquiry, e.g. best times to call. Please don't include detailed medical information here."
                    />
                  </label>
                </div>

                {error && (
                  <p className="dn-form-error" role="alert">
                    {error} Please try again, or call us now on{' '}
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
                  contact you about your enquiry. Read our <Link to="/privacy/">privacy policy</Link>.
                </p>
              </form>
          </div>
        </div>
      </div>

    </section>
  );
}

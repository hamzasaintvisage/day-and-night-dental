import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { PRACTICE } from '../data/practice';

export default function Footer() {
  // SSR-safe year: render the build year on server + first client paint (no
  // hydration mismatch), then update to the live year after mount.
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="dn-footer">
      <div className="dn-divider" />

      <div className="dn-container dn-footer-inner">
        <div className="dn-footer-brand">
          <Logo size={50} showText={true} />
          <p className="dn-footer-tagline">
            Expert dental care, around the clock.
          </p>
        </div>

        <div className="dn-footer-cols">
          <div className="dn-footer-col">
            <h6 className="dn-eyebrow day">Treatments</h6>
            <ul>
              <li><Link to="/treatments/general-dentistry">General Dentistry</Link></li>
              <li><Link to="/treatments/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
              <li><Link to="/treatments/invisalign">Invisalign®</Link></li>
              <li><Link to="/treatments/dental-implants">Dental Implants</Link></li>
              <li><Link to="/treatments/teeth-whitening">Teeth Whitening</Link></li>
              <li><Link to="/treatments/emergency-dentist">Emergency Care</Link></li>
            </ul>
          </div>

          <div className="dn-footer-col">
            <h6 className="dn-eyebrow night">Practice</h6>
            <ul>
              <li><Link to="/our-team">Our Team</Link></li>
              <li><Link to="/register-as-patient">Register as Patient</Link></li>
              <li><a href="/#testimonials">Reviews</a></li>
              <li><a href="/#contact">Contact</a></li>
              <li><Link to="/treatments/emergency-dentist">Emergency Care</Link></li>
              <li><Link to="/blog">Advice &amp; Guides</Link></li>
              <li><Link to="/register-as-patient">Fees &amp; first visit</Link></li>
            </ul>
          </div>

          <div className="dn-footer-col">
            <h6 className="dn-eyebrow">Visit Us</h6>
            <address>
              {PRACTICE.streetAddress}<br />
              {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
            </address>
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-footer-phone">{PRACTICE.phoneDisplay}</a>
            <a href={`mailto:${PRACTICE.email}`} className="dn-footer-email">{PRACTICE.email}</a>
          </div>
        </div>
      </div>

      <div className="dn-footer-bottom">
        <div className="dn-container">
          <div className="dn-footer-legal">
            <span>© {year} Day & Night Dental</span>
            <span className="sep">·</span>
            <Link to="/privacy">Privacy</Link>
            <span className="sep">·</span>
            <Link to="/complaints">Complaints Procedure</Link>
            <span className="sep">·</span>
            <Link to="/terms">Terms</Link>
            <span className="sep">·</span>
            <Link to="/accessibility">Accessibility</Link>
          </div>
          <div className="dn-footer-regulator">
            Regulated by the General Dental Council
          </div>
        </div>
      </div>

      <style>{`
        .dn-footer {
          padding-top: 5rem;
          background: var(--dn-near-black);
        }
        .dn-footer-inner {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          gap: 4rem;
          padding-block: 4rem;
        }
        .dn-footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .dn-footer-tagline {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--dn-bone-dim);
          max-width: 240px;
          letter-spacing: -0.005em;
        }
        .dn-footer-cols {
          display: grid;
          grid-template-columns: 1fr 1fr 1.3fr;
          gap: 2rem;
        }
        .dn-footer-col h6 {
          margin-bottom: 1.5rem;
        }
        .dn-footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .dn-footer-col a {
          font-size: 0.9rem;
          color: var(--dn-bone-dim);
          transition: color 0.3s;
        }
        .dn-footer-col a:hover {
          color: var(--dn-bone);
        }
        .dn-footer-col address {
          font-style: normal;
          color: var(--dn-bone-dim);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .dn-footer-phone {
          display: block;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--dn-bone);
          margin-bottom: 0.5rem;
        }
        .dn-footer-email {
          font-size: 0.85rem;
          color: var(--dn-bone-dim);
        }
        .dn-footer-bottom {
          border-top: 1px solid var(--dn-mist);
          padding: 1.5rem 0;
        }
        .dn-footer-bottom .dn-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .dn-footer-legal {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          font-size: 0.8rem;
          color: var(--dn-bone-faint);
          flex-wrap: wrap;
        }
        .dn-footer-legal .sep {
          color: var(--dn-mist);
        }
        .dn-footer-legal a {
          color: var(--dn-bone-dim);
          transition: color 0.3s;
        }
        .dn-footer-legal a:hover { color: var(--dn-bone); }
        .dn-footer-regulator {
          font-size: 0.78rem;
          color: var(--dn-bone-faint);
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .dn-footer-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 600px) {
          .dn-footer-cols {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

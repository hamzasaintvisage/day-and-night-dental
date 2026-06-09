import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <img src="/logo.png" alt="Day & Night Dental" className="dn-footer-logo-img" width="160" height="160" />
          <p className="dn-footer-tagline">
            Trusted dental care, day and night.
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

    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { PRACTICE } from '../data/practice';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Treatments', href: '/#treatments' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'Register', href: '/register-as-patient' },
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header className={`dn-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="dn-header-inner">
          <a href="/" className="dn-header-logo">
            <Logo size={42} />
            <div className="dn-header-wordmark">
              <span className="day">DAY</span>
              <span className="amp">&</span>
              <span className="night">NIGHT</span>
              <span className="sub">DENTAL</span>
            </div>
          </a>

          <nav className="dn-header-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="dn-header-cta">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-header-phone">
              <span className="dot" />
              {PRACTICE.phoneDisplay}
            </a>
            <a href="/#contact" className="dn-btn primary dn-btn-emergency">
              <span className="dn-btn-pulse" />
              Emergency Booking
              <span className="arrow">→</span>
            </a>
          </div>

          <button
            className="dn-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="dn-mobile-menu" id="mobile-menu">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/#contact" className="dn-btn primary dn-btn-emergency" onClick={() => setMenuOpen(false)}>
            <span className="dn-btn-pulse" />
            Emergency Booking →
          </a>
        </div>
      )}

    </>
  );
}

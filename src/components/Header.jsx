import React, { useState, useEffect } from 'react';
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
          <a href="/" className="dn-header-logo" aria-label="Day & Night Dental home">
            <img src="/logo.png" alt="Day & Night Dental" className="dn-header-logo-img" width="56" height="56" />
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

      <style>{`
        .dn-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 0;
          transition: all 0.4s ease;
          background: transparent;
        }
        .dn-header.scrolled {
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--dn-mist);
        }
        .dn-header-inner {
          width: var(--container);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .dn-header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .dn-header-logo-img {
          height: 56px;
          width: auto;
          display: block;
          transition: height 0.4s ease;
        }
        .dn-header.scrolled .dn-header-logo-img { height: 46px; }
        .dn-header-wordmark {
          display: flex;
          flex-direction: column;
          font-family: var(--font-display);
          line-height: 1;
          font-weight: 800;
        }
        .dn-header-wordmark > span:first-child,
        .dn-header-wordmark > .day {
          display: inline;
        }
        .dn-header-wordmark .day { color: var(--dn-day); font-size: 1.05rem; letter-spacing: 0.04em; }
        .dn-header-wordmark .amp { color: var(--dn-bone); margin: 0 0.2em; }
        .dn-header-wordmark .night { color: var(--dn-night); letter-spacing: 0.04em; }
        .dn-header-wordmark .sub {
          font-family: var(--font-display);
          font-size: 0.55rem;
          letter-spacing: 0.32em;
          color: var(--dn-bone-dim);
          margin-top: 0.35rem;
          font-weight: 700;
        }
        .dn-header-nav {
          display: flex;
          gap: 2.5rem;
        }
        .dn-header-nav a {
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
          transition: color 0.3s;
          position: relative;
          font-weight: 600;
        }
        .dn-header-nav a:hover {
          color: var(--dn-bone);
        }
        .dn-header-nav a::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dn-header-nav a:hover::after {
          transform: scaleX(1);
        }
        .dn-header-cta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .dn-header-phone {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          color: var(--dn-bone-dim);
        }
        .dn-header-phone .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          animation: dn-glow-day 2s infinite;
        }
        .dn-burger {
          display: none;
          background: none;
          border: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          padding: 8px;
        }
        .dn-burger span {
          width: 24px;
          height: 1px;
          background: var(--dn-bone);
        }
        .dn-mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          z-index: 99;
          background: rgba(10, 10, 12, 0.98);
          backdrop-filter: blur(20px);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-bottom: 1px solid var(--dn-mist);
        }
        .dn-mobile-menu a {
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        @media (max-width: 1100px) {
          .dn-header-nav { display: none; }
          .dn-burger { display: flex; }
          .dn-header-phone { display: none; }
        }
        @media (max-width: 640px) {
          .dn-header-logo-img { height: 44px; }
          .dn-header-cta .dn-btn { padding: 0.7rem 1.2rem; font-size: 0.7rem; }
        }
      `}</style>
    </>
  );
}

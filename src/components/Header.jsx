import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { PRACTICE } from '../data/practice';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the overlay whenever the route or hash changes (i.e. a link was followed).
  useEffect(() => { setMenuOpen(false); }, [pathname, hash]);

  // If the viewport grows past the mobile breakpoint while the menu is open,
  // close it so the scroll-lock is never left stuck on desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => { if (window.innerWidth > 1100) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeAndRefocus = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, []);

  const navItems = [
    { label: 'Treatments', href: '/#treatments' },
    { label: 'Our Team', href: '/our-team/' },
    { label: 'Register', href: '/register-as-patient/' },
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header className={`dn-header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="dn-header-inner">
          <Link to="/" className="dn-header-logo" aria-label="Day Night Dental home">
            <img src="/logo-mark.png" className="dn-header-mark" alt="" width="280" height="243" />
            <div className="dn-header-wordmark">
              <span className="name"><span className="day">Day</span><span className="night">Night</span></span>
              <span className="sub">DENTAL</span>
            </div>
          </Link>

          <nav className="dn-header-nav">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>{item.label}</Link>
            ))}
          </nav>

          <div className="dn-header-cta">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-header-phone">
              <span className="dot" />
              {PRACTICE.phoneDisplay}
            </a>
            <Link to="/#contact" className="dn-btn primary dn-btn-emergency">
              <span className="dn-btn-pulse" />
              Emergency Booking
              <span className="arrow">→</span>
            </Link>
          </div>

          <button
            ref={burgerRef}
            type="button"
            className="dn-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} onEscClose={closeAndRefocus} />
    </>
  );
}

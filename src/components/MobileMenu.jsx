import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRACTICE } from '../data/practice';

// The six real treatment pages, surfaced in an expandable group so mobile users
// can reach them directly instead of only the homepage #treatments anchor.
const TREATMENTS = [
  { label: 'Emergency Dentist', to: '/treatments/emergency-dentist/' },
  { label: 'General Dentistry', to: '/treatments/general-dentistry/' },
  { label: 'Cosmetic Dentistry', to: '/treatments/cosmetic-dentistry/' },
  { label: 'Dental Implants', to: '/treatments/dental-implants/' },
  { label: 'Invisalign', to: '/treatments/invisalign/' },
  { label: 'Teeth Whitening', to: '/treatments/teeth-whitening/' },
];

// Full-screen overlay navigation for mobile/tablet. Animated, focus-trapped,
// scroll-locked and accessible. Rendered (hidden) on every route; the burger in
// Header toggles `open`.
export default function MobileMenu({ open, onClose, onEscClose }) {
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  // Lock background scroll and suppress the fixed call-bar / cookie banner while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('dn-menu-open');
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('dn-menu-open');
    };
  }, [open]);

  // Esc to close + trap Tab focus inside the panel while open.
  useEffect(() => {
    if (!open) return;
    const getFocusable = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll('a[href], button:not([disabled])')
          ).filter(
            (el) =>
              el.offsetParent !== null &&
              (typeof el.checkVisibility !== 'function' ||
                el.checkVisibility({ visibilityProperty: true }))
          )
        : [];

    // Move focus into the dialog on open (double rAF so it is painted/focusable first).
    let raf2 = 0;
    const raf = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => panelRef.current?.focus());
    });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        (onEscClose || onClose)();
        return;
      }
      if (e.key === 'Tab') {
        const f = getFocusable();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, onEscClose]);

  // Normalise trailing slashes so /our-team and /our-team/ compare equal (routes/links use the
  // trailing-slash form, so a bare `pathname === to` never matched on /our-team or /register-as-patient).
  const isActive = (to) => pathname.replace(/\/+$/, '') === to.replace(/\/+$/, '');

  // Per-item stagger index for the entrance animation.
  let i = 0;
  const step = () => ({ '--i': i++ });

  return (
    <div
      className="dn-mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-open={open ? 'true' : 'false'}
      aria-hidden={open ? 'false' : 'true'}
    >
      <nav className="dn-mm-nav" ref={panelRef} tabIndex={-1} aria-label="Mobile navigation">
        <div className="dn-mm-group" style={step()}>
          <button
            type="button"
            className={`dn-mm-toggle ${treatmentsOpen ? 'is-open' : ''}`}
            aria-expanded={treatmentsOpen}
            aria-controls="mm-treatments"
            onClick={() => setTreatmentsOpen((v) => !v)}
          >
            Treatments
            <span className="dn-mm-chev" aria-hidden="true" />
          </button>
          <div className="dn-mm-sub" id="mm-treatments" data-open={treatmentsOpen ? 'true' : 'false'}>
            <div className="dn-mm-sub-inner">
              {TREATMENTS.map((t) => (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`dn-mm-sublink ${isActive(t.to) ? 'active' : ''}`}
                  aria-current={isActive(t.to) ? 'page' : undefined}
                  onClick={onClose}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link
          to="/our-team/"
          className={`dn-mm-link ${isActive('/our-team') ? 'active' : ''}`}
          aria-current={isActive('/our-team') ? 'page' : undefined}
          style={step()}
          onClick={onClose}
        >
          Our Team
        </Link>

        <Link
          to="/register-as-patient/"
          className={`dn-mm-link ${isActive('/register-as-patient') ? 'active' : ''}`}
          aria-current={isActive('/register-as-patient') ? 'page' : undefined}
          style={step()}
          onClick={onClose}
        >
          Register
        </Link>

        <a href="/#testimonials" className="dn-mm-link" style={step()} onClick={onClose}>
          Reviews
        </a>

        <a href="/#contact" className="dn-mm-link" style={step()} onClick={onClose}>
          Contact
        </a>

        <a
          href="/#contact"
          className="dn-btn primary dn-btn-emergency dn-mm-cta"
          style={step()}
          onClick={onClose}
        >
          <span className="dn-btn-pulse" />
          Emergency Booking
          <span className="arrow">→</span>
        </a>

        <div className="dn-mm-foot" style={step()}>
          <a href={`tel:${PRACTICE.phoneE164}`} className="dn-mm-phone" onClick={onClose}>
            <span className="dot" />
            {PRACTICE.phoneDisplay}
          </a>
          <span className="dn-mm-meta">Open day and night · Glasgow</span>
        </div>
      </nav>
    </div>
  );
}

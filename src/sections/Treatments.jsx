import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Concerns';

// Maps the homepage treatment ids to their dedicated treatment-page slugs.
const slugMap = {
  general: 'general-dentistry',
  cosmetic: 'cosmetic-dentistry',
  invisalign: 'invisalign',
  implants: 'dental-implants',
  whitening: 'teeth-whitening',
  emergency: 'emergency-dentist',
};

const treatments = [
  {
    id: 'general',
    title: 'General Dentistry',
    tag: 'Foundation Care',
    side: 'day',
    icon: 'tooth',
    description: 'Check-ups, hygiene visits, fillings and the everyday preventative care that keeps your teeth healthy.',
    points: ['Routine check-ups', 'Hygiene visits', 'Tooth-coloured fillings', 'Care for all ages'],
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    tag: 'Smile Design',
    side: 'night',
    icon: 'smile',
    description: 'Veneers, bonding and smile makeovers, planned around your own face rather than a one-size-fits-all template.',
    points: ['Porcelain veneers', 'Composite bonding', 'Smile makeovers', 'Tailored treatment plans'],
  },
  {
    id: 'invisalign',
    title: 'Invisalign®',
    tag: 'Clear Aligners',
    side: 'day',
    icon: 'align',
    description: 'A nearly invisible way to straighten your teeth, a discreet alternative to traditional fixed braces.',
    points: ['Clear, removable aligners', 'A discreet alternative to braces', 'Suitable for many cases', 'Consultation to start'],
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    tag: 'Permanent Solutions',
    side: 'night',
    icon: 'denture',
    description: 'Designed to look, feel and work like a natural tooth, for replacing a single tooth or several.',
    points: ['Single tooth implants', 'Implant-supported bridges', 'Full-arch solutions', 'Replacing missing teeth'],
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    tag: 'Brighter Smile',
    side: 'day',
    icon: 'sparkle',
    description: 'Professional whitening carried out by trained clinicians. A world away from the kits you find on the high street.',
    points: ['Clinician-led treatment', 'In-chair and at-home options', 'Custom-made trays', 'A brighter, natural look'],
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    tag: '24/7 Available',
    side: 'night',
    icon: 'gap',
    description: 'Toothache, a broken crown, a knocked-out tooth, an abscess. Urgent dental help, day or night.',
    points: ['24-hour helpline', 'Same-day appointments', 'Out-of-hours care', 'Pain relief first'],
    highlight: true,
  },
];

// Shared detail content, rendered in both the desktop panel and each mobile
// accordion body, so every treatment's text + link is in the HTML for SEO.
function TreatmentBody({ t, withTitle }) {
  return (
    <>
      {t.highlight && (
        <div className="dn-tx-badge">
          <span className="dot" /> Available Now
        </div>
      )}
      {withTitle && <h3 className="dn-tx-panel-title dn-display">{t.title}</h3>}
      <p className="dn-tx-desc">{t.description}</p>

      <ul className="dn-tx-points">
        {t.points.map((p, i) => (
          <li key={i}>
            <span className="bullet" />
            {p}
          </li>
        ))}
      </ul>

      <div className="dn-tx-actions">
        <a href="#contact" className="dn-btn primary">
          Book Consultation
          <span className="arrow">→</span>
        </a>
        <Link to={`/treatments/${slugMap[t.id]}`} className="dn-tx-link">
          Read full guide
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}

function SideMark({ side }) {
  return (
    <div className="dn-tx-mark" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100" height="100">
        {side === 'day' ? (
          <>
            <circle cx="50" cy="50" r="15" fill="var(--dn-day)" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const r = (n) => Math.round(n * 1000) / 1000;
              return (
                <line
                  key={i}
                  x1={r(50 + Math.cos(angle) * 28)}
                  y1={r(50 + Math.sin(angle) * 28)}
                  x2={r(50 + Math.cos(angle) * 38)}
                  y2={r(50 + Math.sin(angle) * 38)}
                  stroke="var(--dn-day)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              );
            })}
          </>
        ) : (
          <path d="M 50 25 A 25 25 0 1 0 50 75 A 18 18 0 1 1 50 25" stroke="var(--dn-night)" strokeWidth="1" fill="none" />
        )}
      </svg>
    </div>
  );
}

export default function Treatments() {
  const [active, setActive] = useState(treatments[0].id);
  const current = treatments.find(t => t.id === active) || treatments[0];

  return (
    <section id="treatments" className="dn-section dn-treatments">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">Our Treatments</span>
          <h2 className="dn-display">
            Every aspect of <em>modern</em> dentistry,<br />
            under one roof
          </h2>
        </div>

        <div className="dn-tx">
          {/* List, left column on desktop, tap-accordion on mobile */}
          <div className="dn-tx-list">
            {treatments.map((t, i) => {
              const isActive = active === t.id;
              return (
                <div
                  key={t.id}
                  className={`dn-tx-item ${t.side} ${isActive ? 'is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="dn-tx-head"
                    aria-expanded={isActive}
                    aria-controls={`tx-body-${t.id}`}
                    onClick={() => setActive(t.id)}
                    onMouseEnter={() => setActive(t.id)}
                    onFocus={() => setActive(t.id)}
                  >
                    <span className="dn-tx-num">0{i + 1}</span>
                    <span className="dn-tx-ico"><Icon type={t.icon} /></span>
                    <span className="dn-tx-titles">
                      <span className="dn-tx-tag">{t.tag}</span>
                      <span className="dn-tx-title">{t.title}</span>
                    </span>
                    <span className="dn-tx-chev" aria-hidden="true" />
                  </button>

                  {/* Mobile accordion body, always in the DOM (collapsed via
                      grid-rows, not display:none) so search engines read it. */}
                  <div id={`tx-body-${t.id}`} className="dn-tx-body" role="region">
                    <div className="dn-tx-body-inner">
                      <div className="dn-tx-pad">
                        <TreatmentBody t={t} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel, desktop only (hidden on mobile, where the accordion
              bodies above carry the same content). */}
          <div className={`dn-tx-detail ${current.side}`} aria-hidden="true">
            <div className="dn-tx-detail-inner" key={current.id}>
              <TreatmentBody t={current} withTitle />
            </div>
            <SideMark side={current.side} />
          </div>
        </div>
      </div>
    </section>
  );
}

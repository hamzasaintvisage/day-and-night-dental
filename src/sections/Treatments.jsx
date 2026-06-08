import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Maps the homepage tab ids to their dedicated treatment-page slugs.
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
    description: 'Check-ups, hygiene visits, fillings and the steady preventative work that keeps your teeth healthy for years.',
    points: ['Comprehensive check-ups', 'Hygienist appointments', 'White composite fillings', 'Children\'s dentistry'],
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    tag: 'Smile Design',
    side: 'night',
    description: 'Veneers, bonding and full smile makeovers. We plan every case around your own face, never a one-size-fits-all template.',
    points: ['Porcelain veneers', 'Composite bonding', 'Smile makeovers', 'Digital smile preview'],
  },
  {
    id: 'invisalign',
    title: 'Invisalign®',
    tag: 'Clear Aligners',
    side: 'day',
    description: 'A nearly invisible way to straighten your teeth. We show you a 3D preview of the finished result before you commit to anything.',
    points: ['Free initial consultation', '3D outcome simulation', 'Complimentary whitening', 'Retainers included'],
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    tag: 'Permanent Solutions',
    side: 'night',
    description: 'About as close to a real tooth as it gets. We plan single implants, bridges and full-arch work using our own CBCT scanner here in the practice.',
    points: ['Single tooth implants', 'Implant-supported bridges', 'All-on-4 restoration', 'CBCT scan included'],
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    tag: 'Brighter Smile',
    side: 'day',
    description: 'Enlighten and combination whitening, done by trained clinicians using proven systems. A world away from the kits you find on the high street.',
    points: ['Enlighten Evolution', 'In-chair acceleration', 'Home top-up trays', 'Sensitivity managed'],
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    tag: '24/7 Available',
    side: 'night',
    description: 'Toothache, a broken crown, a knocked-out tooth, an abscess. There’s a clinician on call any hour of the day, and we always keep same-day slots free.',
    points: ['24-hour helpline', 'Same-day appointments', 'Out-of-hours surgery', 'Pain relief priority'],
    highlight: true,
  },
];

export default function Treatments() {
  const [active, setActive] = useState(treatments[0].id);
  const current = treatments.find(t => t.id === active);

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

        <div className="dn-treatments-layout">
          {/* Treatment list — left column */}
          <div className="dn-treatments-list">
            {treatments.map((t, i) => (
              <Link
                key={t.id}
                to={`/treatments/${slugMap[t.id]}`}
                className={`dn-treatment-item ${active === t.id ? 'active' : ''} ${t.side}`}
                onMouseEnter={() => setActive(t.id)}
                onFocus={() => setActive(t.id)}
              >
                <span className="dn-treatment-num">0{i + 1}</span>
                <div className="dn-treatment-titles">
                  <span className="dn-treatment-tag">{t.tag}</span>
                  <span className="dn-treatment-title">{t.title}</span>
                </div>
                <span className="dn-treatment-indicator">
                  {active === t.id ? '●' : '○'}
                </span>
              </Link>
            ))}
          </div>

          {/* Detail panel — right column */}
          <div className={`dn-treatment-detail ${current.side}`}>
            <div className="dn-treatment-detail-inner">
              {current.highlight && (
                <div className="dn-treatment-badge">
                  <span className="dot" /> Available Now
                </div>
              )}
              <h3 className="dn-display">{current.title}</h3>
              <p>{current.description}</p>

              <ul className="dn-treatment-points">
                {current.points.map((p, i) => (
                  <li key={i}>
                    <span className="bullet" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="dn-treatment-actions">
                <a href="#contact" className="dn-btn primary">
                  Book Consultation
                  <span className="arrow">→</span>
                </a>
                <Link to={`/treatments/${slugMap[current.id]}`} className="dn-treatment-link">
                  Read full guide
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Decorative side mark */}
            <div className="dn-treatment-mark">
              <svg viewBox="0 0 100 100" width="100" height="100">
                {current.side === 'day' ? (
                  <>
                    <circle cx="50" cy="50" r="20" stroke="var(--dn-day)" strokeWidth="1" fill="none" />
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      return (
                        <line
                          key={i}
                          x1={50 + Math.cos(angle) * 28}
                          y1={50 + Math.sin(angle) * 28}
                          x2={50 + Math.cos(angle) * 38}
                          y2={50 + Math.sin(angle) * 38}
                          stroke="var(--dn-day)"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </>
                ) : (
                  <>
                    <path d="M 50 25 A 25 25 0 1 0 50 75 A 18 18 0 1 1 50 25" stroke="var(--dn-night)" strokeWidth="1" fill="none" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dn-treatments-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-treatments-list {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--dn-mist);
        }
        .dn-treatment-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.5rem;
          align-items: center;
          padding: 1.75rem 1.5rem 1.75rem 0;
          background: none;
          border: none;
          border-bottom: 1px solid var(--dn-mist);
          color: var(--dn-bone-dim);
          cursor: pointer;
          text-align: left;
          font-family: var(--font-body);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .dn-treatment-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: transparent;
          transition: background 0.4s;
        }
        .dn-treatment-item.active::before,
        .dn-treatment-item:hover::before {
          background: linear-gradient(180deg, var(--dn-day), var(--dn-night));
        }
        .dn-treatment-item.active {
          color: var(--dn-bone);
        }
        .dn-treatment-num {
          font-family: var(--font-display);
          font-style: normal;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dn-bone-faint);
          padding-left: 1.5rem;
        }
        .dn-treatment-item.active.day .dn-treatment-num { color: var(--dn-day); }
        .dn-treatment-item.active.night .dn-treatment-num { color: var(--dn-night); }
        .dn-treatment-titles {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .dn-treatment-tag {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--dn-bone-faint);
          font-weight: 600;
        }
        .dn-treatment-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .dn-treatment-indicator {
          font-size: 0.6rem;
          color: var(--dn-bone-faint);
        }
        .dn-treatment-item.active .dn-treatment-indicator {
          color: var(--dn-bone);
        }

        .dn-treatment-detail {
          position: relative;
          padding: 3rem;
          background: linear-gradient(135deg, var(--dn-near-black), var(--dn-charcoal));
          border: 1px solid var(--dn-mist);
          overflow: hidden;
          min-height: 500px;
        }
        .dn-treatment-detail::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.5;
        }
        .dn-treatment-detail.day::before {
          background: radial-gradient(ellipse at top left, rgba(212, 164, 83, 0.12), transparent 60%);
        }
        .dn-treatment-detail.night::before {
          background: radial-gradient(ellipse at top right, rgba(91, 143, 191, 0.12), transparent 60%);
        }
        .dn-treatment-detail-inner {
          position: relative;
          z-index: 1;
        }
        .dn-treatment-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--dn-night-deep);
          color: var(--dn-night-soft);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .dn-treatment-badge .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
        }
        .dn-treatment-detail h3 {
          font-size: clamp(1.55rem, 2.8vw, 2.1rem);
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .dn-treatment-detail p {
          font-size: 1.05rem;
          color: var(--dn-bone-dim);
          margin-bottom: 2rem;
          max-width: 480px;
        }
        .dn-treatment-points {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-treatment-points li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--dn-bone);
        }
        .dn-treatment-points .bullet {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--dn-day);
          flex-shrink: 0;
        }
        .dn-treatment-detail.night .dn-treatment-points .bullet { background: var(--dn-night); }
        .dn-treatment-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .dn-treatment-link {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s;
        }
        .dn-treatment-link:hover { color: var(--dn-bone); }

        .dn-treatment-mark {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          opacity: 0.4;
          z-index: 0;
        }

        @media (max-width: 900px) {
          .dn-treatments-layout {
            grid-template-columns: 1fr;
          }
          .dn-treatments-list {
            border-right: none;
          }
          .dn-treatment-points {
            grid-template-columns: 1fr;
          }
          .dn-treatment-detail {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

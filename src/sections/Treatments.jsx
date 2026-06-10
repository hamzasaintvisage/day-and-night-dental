import { useState } from 'react';
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
    description: 'Designed to look, feel and work like a natural tooth. We plan single implants, bridges and full-arch work using our own CBCT scanner here in the practice.',
    points: ['Single tooth implants', 'Implant-supported bridges', 'All-on-4 restoration', 'CBCT scan included'],
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    tag: 'Brighter Smile',
    side: 'day',
    description: 'Enlighten and combination whitening, carried out by trained clinicians using clinically established systems. A world away from the kits you find on the high street.',
    points: ['Enlighten Evolution', 'In-chair acceleration', 'Home top-up trays', 'Sensitivity managed'],
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    tag: '24/7 Available',
    side: 'night',
    description: 'Toothache, a broken crown, a knocked-out tooth, an abscess. There’s emergency help any hour of the day, and we always keep same-day slots free.',
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
                  <>
                    <path d="M 50 25 A 25 25 0 1 0 50 75 A 18 18 0 1 1 50 25" stroke="var(--dn-night)" strokeWidth="1" fill="none" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

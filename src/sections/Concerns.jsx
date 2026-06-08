import React from 'react';
import { Link } from 'react-router-dom';

const concerns = [
  { title: 'Fix My Worn Teeth', icon: 'tooth', href: '/treatments/cosmetic-dentistry#concern' },
  { title: 'Replace Missing Teeth', icon: 'gap', href: '/treatments/dental-implants#concern' },
  { title: 'Straighten My Teeth', icon: 'align', href: '/treatments/invisalign#concern' },
  { title: 'Whiten My Smile', icon: 'sparkle', href: '/treatments/teeth-whitening#concern' },
  { title: 'Replace My Dentures', icon: 'denture', href: '/treatments/dental-implants#concern' },
  { title: 'Improve My Smile', icon: 'smile', href: '/treatments/cosmetic-dentistry#concern' },
];

// Hand-drawn line icons in the same minimal style as the logo
function Icon({ type }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: '0 0 36 36',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'tooth':
      return (
        <svg {...common}>
          <path d="M18 8 Q11 8, 9 14 Q8 22, 11 28 Q13 30, 14 26 Q15 22, 18 22 Q21 22, 22 26 Q23 30, 25 28 Q28 22, 27 14 Q25 8, 18 8 Z" />
          <path d="M14 14 Q14 17, 16 18" opacity="0.5" />
        </svg>
      );
    case 'gap':
      return (
        <svg {...common}>
          <path d="M8 12 Q8 8, 12 8 Q15 8, 15 14 L15 22 Q15 26, 12 26 Q8 26, 8 22 Z" />
          <path d="M28 12 Q28 8, 24 8 Q21 8, 21 14 L21 22 Q21 26, 24 26 Q28 26, 28 22 Z" />
          <line x1="17" y1="18" x2="19" y2="18" strokeDasharray="1 2" />
        </svg>
      );
    case 'align':
      return (
        <svg {...common}>
          <path d="M8 14 L8 22 M12 12 L12 22 M16 14 L16 22 M20 12 L20 22 M24 14 L24 22 M28 12 L28 22" />
          <line x1="6" y1="26" x2="30" y2="26" />
          <path d="M9 10 L29 8" opacity="0.5" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M10 18 Q10 10, 18 10 Q26 10, 26 18 Q26 26, 18 26 Q10 26, 10 18 Z" />
          <path d="M18 6 L18 9 M18 27 L18 30 M6 18 L9 18 M27 18 L30 18" opacity="0.6" />
          <path d="M15 15 Q17 17, 19 16" />
        </svg>
      );
    case 'denture':
      return (
        <svg {...common}>
          <path d="M6 14 Q6 22, 18 24 Q30 22, 30 14 Q30 12, 28 12 Q24 12, 22 14 Q18 16, 14 14 Q12 12, 8 12 Q6 12, 6 14 Z" />
        </svg>
      );
    case 'smile':
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="11" />
          <path d="M12 20 Q18 26, 24 20" />
          <circle cx="14" cy="14" r="0.8" fill="currentColor" />
          <circle cx="22" cy="14" r="0.8" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Concerns() {
  return (
    <section className="dn-section dn-concerns">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">What Brings You In</span>
          <h2 className="dn-display">
            Your <em>concerns</em>, our craft
          </h2>
        </div>

        <div className="dn-concerns-grid">
          {concerns.map((c, i) => (
            <Link key={c.title} to={c.href} className="dn-concern-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="dn-concern-icon">
                <Icon type={c.icon} />
              </div>
              <h4>{c.title}</h4>
              <span className="dn-concern-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .dn-concerns { position: relative; }
        .dn-section-head {
          text-align: center;
          margin-bottom: 4rem;
        }
        .dn-section-head h2 {
          font-size: clamp(1.7rem, 3.4vw, 2.7rem);
          margin-top: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .dn-section-head h2 em {
          font-style: normal;
          font-weight: 800;
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dn-concerns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0;
          border: 1px solid var(--dn-mist);
        }
        .dn-concern-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding: 3rem 1.5rem;
          border-right: 1px solid var(--dn-mist);
          border-bottom: 1px solid var(--dn-mist);
          color: var(--dn-bone);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .dn-concern-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212, 164, 83, 0.08), rgba(91, 143, 191, 0.08));
          opacity: 0;
          transition: opacity 0.5s;
        }
        .dn-concern-card:hover {
          background: var(--dn-near-black);
        }
        .dn-concern-card:hover::before {
          opacity: 1;
        }
        .dn-concern-icon {
          color: var(--dn-bone-dim);
          transition: color 0.4s;
          position: relative;
          z-index: 1;
        }
        .dn-concern-card:nth-child(odd):hover .dn-concern-icon { color: var(--dn-day); }
        .dn-concern-card:nth-child(even):hover .dn-concern-icon { color: var(--dn-night); }
        .dn-concern-card h4 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .dn-concern-arrow {
          position: relative;
          z-index: 1;
          font-size: 0.9rem;
          color: var(--dn-bone-faint);
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.4s;
        }
        .dn-concern-card:hover .dn-concern-arrow {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

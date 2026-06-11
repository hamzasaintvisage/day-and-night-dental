import { Link } from 'react-router-dom';

const concerns = [
  { title: 'Fix My Worn Teeth', tag: 'Cosmetic Dentistry', icon: 'tooth', href: '/treatments/cosmetic-dentistry#concern',
    lead: 'Worn or chipped edges rebuilt with veneers, bonding or crowns, planned around your own smile.' },
  { title: 'Replace Missing Teeth', tag: 'Dental Implants', icon: 'gap', href: '/treatments/dental-implants#concern',
    lead: 'A gap closed for good with a natural-looking implant or bridge that restores your bite.' },
  { title: 'Straighten My Teeth', tag: 'Invisalign', icon: 'align', href: '/treatments/invisalign#concern',
    lead: 'Crowded or gappy teeth straightened discreetly with clear aligners, with a 3D preview before you commit.' },
  { title: 'Whiten My Smile', tag: 'Teeth Whitening', icon: 'sparkle', href: '/treatments/teeth-whitening#concern',
    lead: 'Clinician-led whitening that lifts years of stains safely and evenly, a world away from high-street kits.' },
  { title: 'Replace My Dentures', tag: 'Dental Implants', icon: 'denture', href: '/treatments/dental-implants#concern',
    lead: 'A stable, fixed alternative to loose dentures, with implant-secured teeth that stay put.' },
  { title: 'Improve My Smile', tag: 'Cosmetic Dentistry', icon: 'smile', href: '/treatments/cosmetic-dentistry#concern',
    lead: 'A complete smile makeover, designed around exactly what you want to change.' },
];

// Hand-drawn line icons in the same minimal style as the logo
export function Icon({ type }) {
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
          {concerns.map((c) => (
            <Link key={c.title} to={c.href} className="dn-concern-card">
              <div className="dn-concern-icon"><Icon type={c.icon} /></div>
              <h3>{c.title}</h3>
              <p className="dn-concern-lead">{c.lead}</p>
              <span className="dn-concern-cta">{c.tag}<span className="dn-concern-arrow"> →</span></span>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

import { Link } from 'react-router-dom';
import { Icon } from './Concerns';
import './concerns-bento.css';

// "Option B" — bento layout: one featured hero tile + asymmetric mix, everything visible.
// Big tiles carry a full selling sentence; small tiles get a short tag. Safe copy (no
// brand-name / equipment claims to verify).
const items = [
  { area: 'feat', title: 'Whiten My Smile', tag: 'Teeth Whitening', icon: 'sparkle', side: 'day', href: '/treatments/teeth-whitening#concern',
    lead: 'Clinician-led whitening that lifts years of stains safely and evenly, a world away from high-street kits.' },
  { area: 'c1', title: 'Fix My Worn Teeth', tag: 'Cosmetic Dentistry', icon: 'tooth', side: 'night', href: '/treatments/cosmetic-dentistry#concern',
    ds: 'Veneers, bonding & crowns' },
  { area: 'c2', title: 'Replace Missing Teeth', tag: 'Dental Implants', icon: 'gap', side: 'day', href: '/treatments/dental-implants#concern',
    ds: 'Implants & bridges' },
  { area: 'c3', title: 'Straighten My Teeth', tag: 'Invisalign', icon: 'align', side: 'night', href: '/treatments/invisalign#concern',
    lead: 'Crowded or gappy teeth straightened discreetly with clear aligners, and a 3D preview before you commit.' },
  { area: 'c4', title: 'Move On From Dentures', tag: 'Dental Implants', icon: 'denture', side: 'day', href: '/treatments/dental-implants#concern',
    ds: 'Fixed, secured alternatives' },
  { area: 'c5', title: 'Transform My Smile', tag: 'Cosmetic Dentistry', icon: 'smile', side: 'night', href: '/treatments/cosmetic-dentistry#concern',
    ds: 'A full smile makeover' },
];

export default function ConcernsBento() {
  return (
    <section className="dn-section">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">What Brings You In</span>
          <h2 className="dn-display">Your <em>concerns</em>, our craft</h2>
        </div>
        <div className="bento">
          {items.map((c) => (
            <Link
              key={c.title}
              to={c.href}
              className={`bt ${c.side}${c.area === 'feat' ? ' bt-feat' : ''}`}
              style={{ gridArea: c.area }}
            >
              <span className="bt-ic"><Icon type={c.icon} /></span>
              <span className="bt-arr" aria-hidden="true">→</span>
              <div className="bt-body">
                <span className="bt-tag">{c.tag}</span>
                <h3 className="bt-title">{c.title}</h3>
                {c.lead ? <p className="bt-lead">{c.lead}</p> : <span className="bt-ds">{c.ds}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

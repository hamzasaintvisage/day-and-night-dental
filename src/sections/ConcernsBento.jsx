import { Link } from 'react-router-dom';
import { Icon } from '../components/ConcernIcon';
import './concerns-bento.css';

// "Option B", bento layout: one featured hero tile + asymmetric mix, everything visible.
// Safe copy with concern-led links into the relevant treatment page/section.
const items = [
  { area: 'feat', title: 'Transform My Smile', icon: 'smile', side: 'day', href: '/treatments/cosmetic-dentistry#concern',
    ds: 'A full smile makeover' },
  { area: 'c1', title: 'Fix My Worn Teeth', icon: 'tooth', side: 'night', href: '/treatments/cosmetic-dentistry#concern',
    ds: 'Veneers, bonding & crowns' },
  { area: 'c2', title: 'Replace Missing Teeth', icon: 'gap', side: 'day', href: '/treatments/dental-implants#concern',
    ds: 'Implants & bridges' },
  { area: 'c3', title: 'Straighten My Teeth', icon: 'align', side: 'night', href: '/treatments/invisalign#concern',
    ds: 'Clear aligners and discreet orthodontic options' },
  { area: 'c4', title: 'Whiten My Smile', icon: 'sparkle', side: 'day', href: '/treatments/teeth-whitening#concern',
    ds: 'Professional whitening for a brighter smile' },
  { area: 'c5', title: 'Move On From Dentures', icon: 'denture', side: 'night', href: '/treatments/dental-implants#concern',
    ds: 'Fixed, secured alternatives' },
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

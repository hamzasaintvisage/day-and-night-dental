import { Link } from 'react-router-dom';
import { Icon } from '../components/ConcernIcon';
import './concerns-bento.css';

// "Your concerns, our craft" — editorial index: one calm list row per concern, each linking
// into the relevant treatment page. day/night is a gold/blue colour rhythm only, not a category.
// Icons use the shared ConcernIcon line-SVG set (same as the Treatments section) so they match.
const items = [
  { title: 'Transform My Smile', icon: 'smile', side: 'day', href: '/treatments/cosmetic-dentistry/#concern', ds: 'A full smile makeover', featured: true },
  { title: 'Fix My Worn Teeth', icon: 'tooth', side: 'night', href: '/treatments/cosmetic-dentistry/#concern', ds: 'Veneers, bonding & crowns' },
  { title: 'Replace Missing Teeth', icon: 'implant', side: 'day', href: '/treatments/dental-implants/#concern', ds: 'Implants & bridges' },
  { title: 'Straighten My Teeth', icon: 'align', side: 'night', href: '/treatments/invisalign/#concern', ds: 'Clear aligners and discreet orthodontic options' },
  { title: 'Whiten My Smile', icon: 'sparkle', side: 'day', href: '/treatments/teeth-whitening/#concern', ds: 'Professional whitening for a brighter smile' },
  { title: 'Move On From Dentures', icon: 'denture', side: 'night', href: '/treatments/dental-implants/#concern', ds: 'Fixed, secured alternatives' },
];

export default function ConcernsBento() {
  return (
    <section className="dn-section dn-concerns-index">
      <div className="dn-container">
        <div className="dn-cx">
          <span className="dn-eyebrow">What Brings You In</span>
          <h2 className="dn-cx-head">Your <em>concerns</em>, our craft</h2>
          <div className="dn-cx-list">
            {items.map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className={`dn-cx-row ${c.side}`}
              >
                <span className="dn-cx-bar" aria-hidden="true" />
                <span className="dn-cx-ic" aria-hidden="true"><Icon type={c.icon} /></span>
                <span className="dn-cx-body">
                  <span className="dn-cx-title">
                    {c.title}
                    {c.featured && <span className="dn-cx-feat">Featured</span>}
                  </span>
                  <span className="dn-cx-sub">{c.ds}</span>
                </span>
                <span className="dn-cx-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

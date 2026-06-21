import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/ConcernIcon';
import { PRACTICE } from '../data/practice';
import './concerns-bento.css';

// "Your concerns, our craft" — a conversational picker: one selectable chip per concern,
// and a result panel below that recommends the matching treatment for the chosen chip.
// The pure-CSS ":checked radio" interaction from the static design is implemented here with
// React useState so it is SSR-safe (default selection renders on the server). day/night is a
// gold/blue colour rhythm only, not a category. Icons use the shared ConcernIcon line-SVG set
// (same as the Treatments section) so they match.
const items = [
  {
    id: 'cosmetic',
    title: 'Transform My Smile',
    icon: 'smile',
    side: 'day',
    href: '/treatments/cosmetic-dentistry/#concern',
    ds: 'A full smile makeover',
    featured: true,
    kicker: "We'd start with Cosmetic Dentistry",
    rTitle: 'A full smile makeover, planned around your face.',
    rLine: 'We design the whole result first, then build it, so your new smile suits your features and feels unmistakably yours.',
    cta: 'Explore cosmetic dentistry',
  },
  {
    id: 'worn',
    title: 'Fix My Worn Teeth',
    icon: 'tooth',
    side: 'night',
    href: '/treatments/cosmetic-dentistry/#concern',
    ds: 'Veneers, bonding & crowns',
    kicker: "We'd start with Cosmetic Dentistry",
    rTitle: 'Veneers, bonding and crowns to rebuild worn or chipped teeth.',
    rLine: 'Worn edges and small chips are restored conservatively, bringing back shape, strength and an even, healthy line.',
    cta: 'Explore cosmetic dentistry',
  },
  {
    id: 'missing',
    title: 'Replace Missing Teeth',
    icon: 'implant',
    side: 'day',
    href: '/treatments/dental-implants/#concern',
    ds: 'Implants & bridges',
    kicker: "We'd start with Dental Implants",
    rTitle: 'Implants and bridges that look, feel and work like your own.',
    rLine: 'A replacement tooth set on a secure foundation, so you can bite, speak and smile with full confidence again.',
    cta: 'Explore dental implants',
  },
  {
    id: 'straighten',
    title: 'Straighten My Teeth',
    icon: 'align',
    side: 'night',
    href: '/treatments/invisalign/#concern',
    ds: 'Clear aligners and discreet orthodontic options',
    kicker: "We'd start with Invisalign",
    rTitle: 'Clear aligners and discreet orthodontic options.',
    rLine: 'Gentle, near-invisible aligners guide your teeth into place on a plan mapped out before you ever begin.',
    cta: 'Explore Invisalign',
  },
  {
    id: 'whiten',
    title: 'Whiten My Smile',
    icon: 'sparkle',
    side: 'day',
    href: '/treatments/teeth-whitening/#concern',
    ds: 'Professional whitening for a brighter smile',
    kicker: "We'd start with Teeth Whitening",
    rTitle: 'Professional whitening for a brighter, natural-looking smile.',
    rLine: 'Dentist-led whitening lifts everyday staining safely, for a fresher shade that still looks like you.',
    cta: 'Explore teeth whitening',
  },
  {
    id: 'dentures',
    title: 'Move On From Dentures',
    icon: 'denture',
    side: 'night',
    href: '/treatments/dental-implants/#concern',
    ds: 'Fixed, secured alternatives',
    kicker: "We'd start with Dental Implants",
    rTitle: 'Fixed, secured alternatives to loose or uncomfortable dentures.',
    rLine: 'Implant-held teeth stay put while you eat and talk, no movement, no slipping, no covering the roof of your mouth.',
    cta: 'Explore dental implants',
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ConcernsBento() {
  // Default-select the featured concern so the result panel renders correctly on the server.
  const defaultId = (items.find((i) => i.featured) || items[0]).id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected = items.find((i) => i.id === selectedId) || items[0];

  return (
    <section className="cxg-section" aria-labelledby="cxg-title">
      {/* section-scoped ambient gold(TL)/blue(BR) corner glow */}
      <span className="cxg-glow" aria-hidden="true" />

      <div className="cxg-inner">
        <div className="cxg-head">
          <p className="dn-eyebrow dn-pill day">What Brings You In</p>
          <h2 className="cxg-title" id="cxg-title">
            Your <em>concerns</em>, our craft
          </h2>
          <p className="cxg-sub">
            Tell us what's on your mind and we'll point you to the right treatment, whether cosmetic, restorative or urgent.
          </p>
        </div>

        <p className="cxg-prompt-q">What brings you in today?</p>
        <p className="cxg-prompt-hint">Choose the one that sounds most like you.</p>

        <div className="cxg-picker">
          <div className="cxg-chips" role="radiogroup" aria-label="Your concern">
            {items.map((c) => {
              const isActive = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  className={`cxg-chip ${c.side}${c.featured ? ' featured' : ''}${isActive ? ' is-active' : ''}`}
                  onClick={() => setSelectedId(c.id)}
                >
                  <span className="cxg-ic" aria-hidden="true"><Icon type={c.icon} /></span>
                  <span className="cxg-chip-label">{c.title}</span>
                  {c.featured && <span className="cxg-tag">Most asked</span>}
                </button>
              );
            })}
          </div>

          <div className="cxg-result-stage">
            <div
              className="cxg-result r-gold"
              key={selected.id}
              role="region"
              aria-label="Recommended treatment"
            >
              <div className="cxg-result-grid">
                <div className="cxg-result-ic" aria-hidden="true">
                  <Icon type={selected.icon} />
                </div>
                <div>
                  <p className="cxg-r-kicker">
                    <span className="cxg-r-dot" aria-hidden="true" />
                    {selected.kicker}
                  </p>
                  <h3 className="cxg-r-title">{selected.rTitle}</h3>
                  <p className="cxg-r-line">{selected.rLine}</p>
                  <Link className="cxg-r-cta" to={selected.href}>
                    {selected.cta}
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer CTA row */}
        <div className="cxg-footer-cta">
          <Link className="cxg-btn cxg-btn-primary" to="/contact/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            Book a consultation
          </Link>
          <Link className="cxg-btn cxg-btn-ghost" to="/treatments/">
            See all treatments
            <ArrowIcon />
          </Link>
          <p className="cxg-footer-note">
            Not sure yet? <a className="cxg-footer-tel" href={`tel:${PRACTICE.phoneE164}`}>Call us on {PRACTICE.phoneDisplay}</a> or a consultation is the easiest place to start.
          </p>
        </div>
      </div>
    </section>
  );
}

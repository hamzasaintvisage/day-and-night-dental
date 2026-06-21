import { useState } from 'react'

// Smile gallery images (composite bonding, veneers, implants, Invisalign).
const smiles = [
  { image: '/smiles/bonding-patient.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'day' },
  { image: '/smiles/bonding-patient-2.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'night' },
  { image: '/smiles/implant-patient.webp', caption: 'Dental implants', cat: 'Implants', side: 'day' },
  { image: '/smiles/invisalign-patient.webp', caption: 'Invisalign', cat: 'Orthodontics', side: 'night' },
  { image: '/smiles/featured-smile.webp', caption: 'Porcelain veneers', cat: 'Cosmetic', side: 'day' },
  { image: '/smiles/veneers-patient-2.webp', caption: 'Porcelain veneers', cat: 'Cosmetic', side: 'night' },
]

// "The Gold Standard" results gallery (statement lens, panel design): one colossal
// hero smile beside an oversized ruled headline + a solid-gold numbered index rail.
// Hovering / selecting / focusing a slat promotes that smile to the hero. Responsive
// (collapses to a single column on phones); SSR-safe (default selection renders server-side).
export default function SmileGallerySpotlight() {
  const [active, setActive] = useState(0)
  const feat = smiles[active]

  return (
    <section className="dn-section dn-gallery dn-gallery-gold">
      <div className="dn-container">
        <div className="dn-gold-spread">

          <div className="dn-gold-head">
            <span className="dn-eyebrow dn-pill day">The Results</span>
            <h2 className="dn-gold-kicker">
              Real smiles,<em className="dn-hl-gold">real results</em>
            </h2>
            <p className="dn-gold-lead">
              A look at the difference composite bonding, veneers, Invisalign and dental
              implants can make &mdash; one result at a time.
            </p>
            <p className="dn-gold-count" aria-live="polite">
              <b>{String(active + 1).padStart(2, '0')}</b>
              <span>/ {String(smiles.length).padStart(2, '0')}</span>
              <span className="lab">The portfolio</span>
            </p>
          </div>

          <div className="dn-gold-stage">
            <figure className={`dn-gold-hero ${feat.side}`}>
              <img
                key={active}
                src={feat.image}
                alt={`${feat.caption}, Day Night Dental, Glasgow`}
                width={900}
                height={1100}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="dn-gold-cap">
                <span className={`dn-gold-tag ${feat.side}`}>{feat.cat}</span>
                <h3>{feat.caption}</h3>
              </figcaption>
            </figure>

            <div className="dn-gold-rail" role="tablist" aria-label="Real smile results">
              {smiles.map((s, i) => (
                <button
                  type="button"
                  role="tab"
                  key={i}
                  aria-selected={i === active}
                  className={`dn-gold-slat ${s.side} ${i === active ? 'on' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lbl">
                    <span className="cat">{s.cat}</span>
                    <span className="ttl">{s.caption}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="dn-gallery-cta">
          <a href="#contact" className="dn-btn primary">
            Begin your transformation
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

// Real consented patient results from across our group (bonding, veneers, implants).
const smiles = [
  { image: '/smiles/implant-patient.webp', caption: 'Dental implants', cat: 'Implants', side: 'day' },
  { image: '/smiles/bonding-patient.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'night' },
  { image: '/smiles/bonding-patient-2.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'day' },
  { image: '/smiles/veneers-patient.webp', caption: 'Porcelain veneers', cat: 'Cosmetic', side: 'night' },
  { image: '/smiles/invisalign-patient.webp', caption: 'Invisalign', cat: 'Orthodontics', side: 'day' },
  { image: '/smiles/jaffar-implants.webp', caption: 'Dental implants', cat: 'Implants', side: 'night' },
]

export default function SmileGallerySpotlight() {
  const [active, setActive] = useState(0)
  const feat = smiles[active]

  return (
    <section className="dn-section dn-gallery dn-gallery-spot">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">The Results</span>
          <h2 className="dn-display">
            Real smiles, <em>real results</em>
          </h2>
          <p className="dn-section-lead">
            A look at the difference composite bonding, veneers, Invisalign and dental implants can make.
          </p>
        </div>

        <div className="dn-spot-grid">
          <div className={`dn-spot-feature ${feat.side}`}>
            <img src={feat.image} alt={`${feat.caption}, Day Night Dental, Glasgow`} width={900} height={1100} loading="lazy" decoding="async" />
            <div className="dn-spot-ov" />
            <div className="dn-spot-cap">
              <span className={`dn-spot-tag ${feat.side}`}>{feat.cat}</span>
              <h3>{feat.caption}</h3>
            </div>
          </div>

          <div className="dn-spot-rail">
            {smiles.map((s, i) => (
              <button
                type="button"
                key={i}
                className={`dn-spot-thumb ${s.side} ${i === active ? 'on' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.caption}`}
              >
                <span className="dn-spot-th-img">
                  <img src={s.image} alt="" width={120} height={120} loading="lazy" decoding="async" />
                </span>
                <span className="dn-spot-th-text">
                  <span className={`dn-spot-th-cat ${s.side}`}>{s.cat}</span>
                  <span className="dn-spot-th-title">{s.caption}</span>
                </span>
              </button>
            ))}
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

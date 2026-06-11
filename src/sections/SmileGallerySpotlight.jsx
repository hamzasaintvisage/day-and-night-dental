import { useState } from 'react'

// Six placeholders. Replace with consented patient photography before launch.
const smiles = [
  { image: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Veneers & whitening', cat: 'Cosmetic', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Invisalign', cat: 'Invisalign', side: 'night' },
  { image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Smile makeover', cat: 'Cosmetic', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'night' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Implant restoration', cat: 'Implants', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=900&h=1100&fit=crop&q=80&fm=webp', caption: 'Professional whitening', cat: 'Whitening', side: 'night' },
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
            Modern dentistry, <em>illustrated</em>
          </h2>
          <p className="dn-section-lead">
            A glimpse of what modern dentistry can do. Images are illustrative only; we will share
            real patient smiles, with their consent, once we are open.
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

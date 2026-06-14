import { useRef } from 'react'

// Real consented patient results from across our group (bonding, veneers, implants).
const smiles = [
  { image: '/smiles/charly-bonding.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'day' },
  { image: '/smiles/katie-veneers.webp', caption: 'Porcelain veneers', cat: 'Cosmetic', side: 'night' },
  { image: '/smiles/carlos-implants.webp', caption: 'Dental implants', cat: 'Implants', side: 'day' },
  { image: '/smiles/tom-bonding.webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'night' },
  { image: '/smiles/gosia-veneers.webp', caption: 'Porcelain veneers', cat: 'Cosmetic', side: 'day' },
  { image: '/smiles/jaffar-implants.webp', caption: 'Dental implants', cat: 'Implants', side: 'night' },
]

function Marker({ side }) {
  if (side === 'day') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 45 * Math.PI) / 180
          const r = (n) => Math.round(n * 1000) / 1000
          return (
            <line key={idx}
              x1={r(10 + Math.cos(angle) * 5.5)} y1={r(10 + Math.sin(angle) * 5.5)}
              x2={r(10 + Math.cos(angle) * 8)}   y2={r(10 + Math.sin(angle) * 8)}
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          )
        })}
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M 10 3 A 7 7 0 1 0 10 17 A 5 5 0 1 1 10 3" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

export default function SmileGallery() {
  const trackRef = useRef(null)

  const scrollBy = (delta) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="dn-section dn-gallery dn-gallery-strip">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">The Results</span>
          <h2 className="dn-display">
            Real smiles, <em>real results</em>
          </h2>
          <p className="dn-section-lead">
            Genuine patient results from across our group of clinics, shared with their consent.
          </p>
        </div>

        <div className="dn-strip-wrap">
          <button type="button" className="dn-strip-arrow prev" aria-label="Scroll left" onClick={() => scrollBy(-360)}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M12 4 L6 10 L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="dn-strip-track" ref={trackRef}>
            {smiles.map((s, i) => (
              <figure key={i} className={`dn-strip-card ${s.side}`}>
                <img src={s.image} alt={`${s.caption}, Day Night Dental, Glasgow`} width={700} height={900} loading="lazy" decoding="async" />
                <div className="dn-strip-ov" />
                <div className={`dn-strip-marker ${s.side}`}><Marker side={s.side} /></div>
                <figcaption className="dn-strip-cap">
                  <span className={`dn-strip-tag ${s.side}`}>{s.cat}</span>
                  <div className="dn-strip-title">{s.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <button type="button" className="dn-strip-arrow next" aria-label="Scroll right" onClick={() => scrollBy(360)}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M8 4 L14 10 L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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

import { useRef } from 'react'

// Six patient smile placeholders. Replace with consented patient photography before launch.
const smiles = [
  { image: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Veneers & whitening', cat: 'Cosmetic', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Invisalign', cat: 'Invisalign', side: 'night' },
  { image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Smile makeover', cat: 'Cosmetic', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Composite bonding', cat: 'Cosmetic', side: 'night' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Implant restoration', cat: 'Implants', side: 'day' },
  { image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=700&h=900&fit=crop&q=80&fm=webp', caption: 'Professional whitening', cat: 'Whitening', side: 'night' },
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
            Modern dentistry, <em>illustrated</em>
          </h2>
          <p className="dn-section-lead">
            Scroll through a filmstrip of cases. Images are illustrative only; we will share real
            patient smiles, with their consent, once we are open.
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

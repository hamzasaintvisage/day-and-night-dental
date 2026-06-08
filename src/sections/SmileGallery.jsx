import React from 'react';

// Six patient smile images — diverse, warm, real human warmth against the dark palette.
// Replace with actual practice patient photography (with written consent) before launch.
const smiles = [
  {
    image: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Veneers & whitening',
    side: 'day',
  },
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Invisalign, 9 months',
    side: 'night',
  },
  {
    image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Smile makeover',
    side: 'day',
  },
  {
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Composite bonding',
    side: 'night',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Implant restoration',
    side: 'day',
  },
  {
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=600&h=800&fit=crop&q=80&fm=webp',
    caption: 'Enlighten whitening',
    side: 'night',
  },
];

export default function SmileGallery() {
  return (
    <section className="dn-section dn-gallery">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">The Results</span>
          <h2 className="dn-display">
            Real <em>smiles</em>, made here
          </h2>
          <p className="dn-section-lead">
            A glimpse of what modern dentistry can do, from a brighter smile to a full
            transformation. Images are illustrative only; we will share real patient smiles,
            with their consent, once we are open.
          </p>
        </div>

        <div className="dn-gallery-grid">
          {smiles.map((s, i) => (
            <figure key={i} className={`dn-gallery-item ${s.side}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="dn-gallery-image">
                <img src={s.image} alt={`${s.caption}, Day & Night Dental, Glasgow`} width={600} height={800} loading="lazy" decoding="async" />
                <div className="dn-gallery-overlay" />
                <div className="dn-gallery-marker">
                  {s.side === 'day' ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1" />
                      {Array.from({ length: 8 }).map((_, idx) => {
                        const angle = (idx * 45 * Math.PI) / 180;
                        return (
                          <line
                            key={idx}
                            x1={10 + Math.cos(angle) * 5.5}
                            y1={10 + Math.sin(angle) * 5.5}
                            x2={10 + Math.cos(angle) * 8}
                            y2={10 + Math.sin(angle) * 8}
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M 10 3 A 7 7 0 1 0 10 17 A 5 5 0 1 1 10 3" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  )}
                </div>
              </div>
              <figcaption>
                <span className={`dn-eyebrow ${s.side}`}>{s.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="dn-gallery-cta">
          <a href="#contact" className="dn-btn primary">
            Begin your transformation
            <span className="arrow">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}

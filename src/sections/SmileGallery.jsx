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

      <style>{`
        .dn-gallery { position: relative; }
        .dn-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 4rem;
        }
        .dn-gallery-item {
          margin: 0;
          opacity: 0;
          animation: dn-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dn-gallery-image {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          transition: border-color 0.5s;
        }
        .dn-gallery-item.day:hover .dn-gallery-image { border-color: rgba(212, 164, 83, 0.4); }
        .dn-gallery-item.night:hover .dn-gallery-image { border-color: rgba(91, 143, 191, 0.4); }

        .dn-gallery-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%) brightness(0.9) contrast(1.1);
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dn-gallery-item:hover .dn-gallery-image img {
          filter: grayscale(0%) brightness(1) contrast(1);
          transform: scale(1.04);
        }
        .dn-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }
        .dn-gallery-item.day .dn-gallery-overlay {
          background:
            radial-gradient(ellipse at top right, rgba(212, 164, 83, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
        }
        .dn-gallery-item.night .dn-gallery-overlay {
          background:
            radial-gradient(ellipse at top right, rgba(91, 143, 191, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
        }
        .dn-gallery-marker {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(244, 239, 230, 0.2);
          color: var(--dn-bone);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dn-gallery-item.day .dn-gallery-marker { color: var(--dn-day); }
        .dn-gallery-item.night .dn-gallery-marker { color: var(--dn-night); }

        .dn-gallery-item figcaption {
          margin-top: 1.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--dn-mist);
          transition: border-color 0.5s;
        }
        .dn-gallery-item.day:hover figcaption { border-color: var(--dn-day); }
        .dn-gallery-item.night:hover figcaption { border-color: var(--dn-night); }

        .dn-gallery-cta {
          text-align: center;
          margin-top: 4rem;
        }

        @media (max-width: 900px) {
          .dn-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        @media (max-width: 500px) {
          .dn-gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

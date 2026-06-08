import React from 'react';

export default function About() {
  return (
    <section className="dn-section dn-about">
      <div className="dn-container">
        <div className="dn-about-grid">
          <div className="dn-about-visual">
            {/* Background clinic photograph */}
            <div className="dn-about-photo">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&h=900&fit=crop&q=80&fm=webp"
                alt="Day & Night Dental practice interior, Merchant City, Glasgow"
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
              />
              <div className="dn-about-photo-overlay" />
            </div>

            {/* Decorative split sun/moon emblem overlaid */}
            <svg viewBox="0 0 400 400" className="dn-emblem">
              {/* Sun rays */}
              <g stroke="var(--dn-day)" strokeWidth="1" strokeLinecap="round" opacity="0.9">
                {Array.from({ length: 7 }).map((_, i) => {
                  const angle = -90 + (i - 3) * 22;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 200 + Math.cos(rad) * 145;
                  const y1 = 200 + Math.sin(rad) * 145;
                  const x2 = 200 + Math.cos(rad) * 175;
                  const y2 = 200 + Math.sin(rad) * 175;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
              {/* Sun arc */}
              <path d="M 200 60 A 140 140 0 0 0 200 340" stroke="var(--dn-day)" strokeWidth="1.2" fill="none" />
              {/* Moon arcs */}
              <path d="M 200 60 A 140 140 0 0 1 200 340" stroke="var(--dn-night)" strokeWidth="1.2" fill="none" />
              <path d="M 200 80 A 120 120 0 0 1 200 320" stroke="var(--dn-night)" strokeWidth="1" fill="none" opacity="0.5" />
              <path d="M 200 100 A 100 100 0 0 1 200 300" stroke="var(--dn-night)" strokeWidth="1" fill="none" opacity="0.3" />
              {/* Center line */}
              <line x1="200" y1="60" x2="200" y2="340" stroke="var(--dn-bone-faint)" strokeWidth="0.5" />
            </svg>
            <div className="dn-about-visual-glow" />
          </div>

          <div className="dn-about-content">
            <span className="dn-eyebrow">About The Practice</span>
            <h2 className="dn-display">
              Dentistry that<br />
              meets you in <em>your</em> hours
            </h2>
            <p className="dn-about-lead">
              We opened Day & Night Dental for one reason. Toothache doesn't keep
              office hours, and the people living with it shouldn't have to either.
            </p>
            <p>
              Come in for a routine check-up before the school run, a cosmetic
              consultation on your lunch break, or for help when something flares up
              at midnight. We're a Glasgow practice in the Merchant City, and our
              dentists work mornings, evenings and weekends. You shouldn't have to
              book time off work just to look after your teeth.
            </p>

            <div className="dn-about-pillars">
              <div className="dn-pillar">
                <span className="dn-pillar-num day">01</span>
                <h5>Open Seven Days</h5>
                <p>7am to 11pm, every day of the year, bank holidays included.</p>
              </div>
              <div className="dn-pillar">
                <span className="dn-pillar-num night">02</span>
                <h5>Emergency On-Call</h5>
                <p>A duty dentist is reachable 24 hours for registered patients.</p>
              </div>
              <div className="dn-pillar">
                <span className="dn-pillar-num day">03</span>
                <h5>Same-Day Treatment</h5>
                <p>Most cosmetic and restorative work completed in a single visit.</p>
              </div>
            </div>

            <a href="/our-team" className="dn-btn primary" style={{ marginTop: '2rem' }}>
              Meet Our Team
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .dn-about-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 6rem;
          align-items: center;
        }
        .dn-about-visual {
          position: relative;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dn-about-photo {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border: 1px solid var(--dn-mist);
        }
        .dn-about-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(50%) brightness(0.55) contrast(1.15);
        }
        .dn-about-photo-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at top left, rgba(212, 164, 83, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(91, 143, 191, 0.15) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
        }
        .dn-emblem {
          width: 80%;
          height: auto;
          position: relative;
          z-index: 2;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 20px rgba(0,0,0,0.8));
        }
        .dn-about-visual-glow {
          position: absolute;
          inset: 10%;
          background: radial-gradient(circle,
            rgba(212, 164, 83, 0.15) 0%,
            rgba(91, 143, 191, 0.15) 60%,
            transparent 100%);
          filter: blur(40px);
          z-index: 1;
        }
        .dn-about-content h2 {
          font-size: clamp(1.7rem, 3.2vw, 2.5rem);
          margin: 1rem 0 2rem;
          font-weight: 700;
        }
        .dn-about-content h2 em {
          font-style: normal;
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dn-about-lead {
          font-family: var(--font-body);
          font-size: 1.15rem;
          font-style: normal;
          font-weight: 500;
          color: var(--dn-bone);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .dn-about-content p {
          color: var(--dn-bone-dim);
          max-width: 540px;
          margin-bottom: 1rem;
        }
        .dn-about-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-pillar-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          font-style: normal;
        }
        .dn-pillar-num.day { color: var(--dn-day); }
        .dn-pillar-num.night { color: var(--dn-night); }
        .dn-pillar h5 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0.5rem 0;
        }
        .dn-pillar p {
          font-size: 0.85rem;
          color: var(--dn-bone-dim);
          margin: 0;
        }
        @media (max-width: 900px) {
          .dn-about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .dn-about-visual {
            max-width: 320px;
            margin: 0 auto;
          }
          .dn-about-pillars {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

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
                <p>A duty dentist is on call for dental emergencies, 24 hours a day.</p>
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

    </section>
  );
}

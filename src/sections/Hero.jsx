import React from 'react';
import Logo from '../components/Logo';
import { PRACTICE } from '../data/practice';

export default function Hero() {
  return (
    <section id="top" className="dn-hero">
      {/* Atmospheric glows */}
      <div className="dn-glow day" style={{
        width: '600px', height: '600px',
        top: '-200px', left: '-150px',
        opacity: 0.15,
      }} />
      <div className="dn-glow night" style={{
        width: '600px', height: '600px',
        bottom: '-200px', right: '-150px',
        opacity: 0.15,
      }} />

      {/* Atmospheric backdrop portrait — heavily darkened for depth */}
      <div className="dn-hero-backdrop">
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1100&h=733&fit=crop&q=55&fm=webp"
          alt=""
          aria-hidden="true"
          width={1100}
          height={733}
          decoding="async"
          fetchPriority="low"
        />
      </div>

      {/* The split divider line — full height, runs down the middle */}
      <div className="dn-hero-divider" />

      <div className="dn-hero-inner">
        {/* Top eyebrow */}
        <div className="dn-hero-eyebrow dn-reveal">
          <span className="line day" />
          <span>Glasgow's 24/7 Emergency Dentist</span>
          <span className="line night" />
        </div>

        {/* Main title */}
        <h1 className="dn-hero-title dn-display">
          <span className="word-day dn-reveal dn-delay-1">Day</span>
          <span className="word-amp dn-reveal dn-delay-2">&</span>
          <span className="word-night dn-reveal dn-delay-3">Night</span>
          <span className="dn-visually-hidden">Day &amp; Night Dental, your 24-hour emergency and cosmetic dentist in Merchant City, Glasgow</span>
        </h1>

        <div className="dn-hero-subtitle dn-reveal dn-delay-4">
          <div className="dn-hero-dental">
            <span className="line day" />
            <span>DENTAL</span>
            <span className="line night" />
          </div>
        </div>

        {/* Tagline */}
        <p className="dn-hero-tagline dn-reveal dn-delay-5">
          Toothache at 2am? A broken tooth on a Sunday? We're open when other dentists are closed.<br />
          <strong>A real dentist on the phone in Glasgow, day or night.</strong>
        </p>

        {/* CTAs — phone first for emergency intent */}
        <div className="dn-hero-actions dn-reveal dn-delay-5">
          <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call our 24/7 emergency line
          </a>
          <a href="#contact" className="dn-btn">
            Book an appointment
            <span className="arrow">→</span>
          </a>
        </div>

        <p className="dn-hero-trust dn-reveal dn-delay-5">
          GDC-registered dentists · Same-day emergencies · A real dentist answers, 24/7
        </p>

        {/* Bottom meta strip */}
        <div className="dn-hero-meta dn-reveal dn-delay-5">
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow day">Mornings</span>
            <span className="time">07:00</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item center">
            <span className="dn-eyebrow">Emergency Line</span>
            <span className="time gradient">24 / 7</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow night">Late Nights</span>
            <span className="time">23:00</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="dn-hero-scroll">
        <span>Scroll</span>
        <span className="line" />
      </div>

      <style>{`
        .dn-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8rem 0 4rem;
        }

        .dn-hero-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.25;
        }
        .dn-hero-backdrop img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(80%) brightness(0.4) contrast(1.3);
        }
        .dn-hero-backdrop::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, transparent 0%, var(--dn-black) 80%),
            linear-gradient(180deg, var(--dn-black) 0%, transparent 30%, transparent 70%, var(--dn-black) 100%);
        }

        .dn-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(212, 164, 83, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(91, 143, 191, 0.08) 0%, transparent 50%);
          z-index: 0;
        }

        .dn-hero-divider {
          position: absolute;
          top: 15%;
          bottom: 15%;
          left: 50%;
          width: 1px;
          background: linear-gradient(180deg,
            transparent 0%,
            var(--dn-day) 20%,
            var(--dn-day) 45%,
            var(--dn-bone-faint) 50%,
            var(--dn-night) 55%,
            var(--dn-night) 80%,
            transparent 100%);
          opacity: 0.3;
          z-index: 1;
        }

        .dn-hero-inner {
          position: relative;
          z-index: 2;
          width: var(--container);
          margin: 0 auto;
          text-align: center;
        }

        .dn-hero-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
          margin-bottom: 3rem;
          font-weight: 600;
        }
        .dn-hero-eyebrow .line {
          height: 2px;
          width: 60px;
        }
        .dn-hero-eyebrow .line.day { background: var(--dn-day); }
        .dn-hero-eyebrow .line.night { background: var(--dn-night); }

        .dn-hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 8.5vw, 6rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: clamp(0.5rem, 2vw, 1.5rem);
          font-style: normal;
        }
        .word-day { color: var(--dn-day); }
        .word-amp {
          color: var(--dn-bone);
          font-size: 0.65em;
          font-style: normal;
          font-weight: 700;
        }
        .word-night { color: var(--dn-night); }

        .dn-hero-subtitle {
          margin-top: 1.5rem;
        }
        .dn-hero-dental {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          letter-spacing: 0.4em;
          color: var(--dn-bone);
        }
        .dn-hero-dental .line {
          height: 2.5px;
          width: 40px;
          border-radius: 1px;
        }
        .dn-hero-dental .line.day { background: var(--dn-day); }
        .dn-hero-dental .line.night { background: var(--dn-night); }

        .dn-hero-tagline {
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          font-weight: 400;
          color: var(--dn-bone-dim);
          margin: 2.5rem auto 0;
          max-width: 540px;
          line-height: 1.5;
          letter-spacing: -0.005em;
        }
        .dn-hero-tagline strong {
          font-weight: 600;
          color: var(--dn-bone);
        }

        .dn-hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }
        .dn-hero-trust {
          margin: 1.25rem auto 0;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          color: var(--dn-bone-dim);
        }

        .dn-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1.5rem, 4vw, 4rem);
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid var(--dn-mist);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .dn-hero-meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .dn-hero-meta-item .time {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .dn-hero-meta-item .time.gradient {
          background: linear-gradient(90deg, var(--dn-day), var(--dn-night));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
        .dn-hero-meta-divider {
          width: 1px;
          height: 30px;
          background: var(--dn-mist);
        }

        .dn-hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--dn-bone-faint);
          font-size: 0.65rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .dn-hero-scroll .line {
          width: 1px;
          height: 30px;
          background: linear-gradient(180deg, var(--dn-bone-faint), transparent);
          animation: scroll-line 2s infinite;
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 640px) {
          .dn-hero { min-height: auto; padding: 6.5rem 0 3rem; }
          .dn-hero-eyebrow { margin-bottom: 1.75rem; }
          .dn-hero-meta { flex-direction: column; gap: 1.5rem; margin-top: 2.5rem; padding-top: 2rem; }
          .dn-hero-meta-divider { display: none; }
        }
      `}</style>
    </section>
  );
}

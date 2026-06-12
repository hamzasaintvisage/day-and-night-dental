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

      {/* Atmospheric backdrop portrait, heavily darkened for depth */}
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

      {/* The split divider line, full height, runs down the middle */}
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
          {/* Decorative split-word lockup; aria-hidden so the accessible name is the
              single descriptive string below, not "DayNight Day Night Dental…". */}
          <span className="word-day dn-reveal dn-delay-1" aria-hidden="true">Day</span>
          <span className="word-night dn-reveal dn-delay-3" aria-hidden="true">Night</span>
          <span className="dn-visually-hidden">Day Night Dental, your 24-hour emergency and cosmetic dentist in Merchant City, Glasgow</span>
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
          <strong>Pain doesn’t wait. Neither do we.</strong><br />
          24/7 emergency dental care in Glasgow, with same-day appointments for urgent dental problems.
        </p>

        {/* CTAs, phone first for emergency intent */}
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
          24/7 emergency line · Same-day emergency treatment · Glasgow
        </p>

        {/* Bottom meta strip */}
        <div className="dn-hero-meta dn-reveal dn-delay-5">
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow day">Mornings</span>
            <span className="time day">07:00</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item center">
            <span className="dn-eyebrow">Emergency Line</span>
            <span className="time gradient">24 / 7</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow night">Late Nights</span>
            <span className="time night">23:00</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="dn-hero-scroll">
        <span>Scroll</span>
        <span className="line" />
      </div>

    </section>
  );
}

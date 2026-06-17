import { PRACTICE } from '../data/practice';

export default function Hero() {
  return (
    <section id="top" className="dn-hero">
      {/* Atmospheric glow on the content side */}
      <div className="dn-glow day" style={{ width: '600px', height: '600px', top: '-220px', left: '-160px', opacity: 0.16 }} />

      <div className="dn-hero-grid">
        <div className="dn-hero-content">
          <div className="dn-hero-eyebrow dn-reveal">
            <span className="line" />
            <span>Glasgow's 24/7 Emergency Dentist</span>
          </div>

          {/* Title has no reveal animation so it paints immediately (LCP-safe). */}
          <h1 className="dn-hero-title dn-display">
            <span className="word-day" aria-hidden="true">Day</span>
            <span className="word-night" aria-hidden="true">Night</span>
            <span className="dn-visually-hidden">Day Night Dental, your 24-hour emergency and cosmetic dentist in Merchant City, Glasgow</span>
          </h1>
          <div className="dn-hero-dental dn-reveal dn-delay-4">
            <span className="line" />
            <span>DENTAL</span>
          </div>

          <p className="dn-hero-tagline dn-reveal dn-delay-5">
            <strong>Pain doesn&rsquo;t wait. Neither do we.</strong><br />
            Same-day emergency care and confident, natural-looking dentistry, day and night in Merchant City.
          </p>

          <div className="dn-hero-actions dn-reveal dn-delay-5">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
              <span className="dn-btn-pulse" />
              Call our 24/7 emergency line
            </a>
            <a href="#contact" className="dn-btn">
              Book an appointment
              <span className="arrow">&rarr;</span>
            </a>
          </div>

          <p className="dn-hero-trust dn-reveal dn-delay-5">
            <span>Open 7 days</span><span className="dot" aria-hidden="true" />
            <span>GDC-registered dentists</span><span className="dot" aria-hidden="true" />
            <span>Merchant City, Glasgow</span>
          </p>
        </div>

        {/* Image paints immediately (LCP), high priority, decorative. */}
        <div className="dn-hero-media">
          <img src="/hero.webp" alt="" width={1024} height={1536} fetchPriority="high" decoding="async" />
          <div className="dn-hero-media-wash" />
          <div className="dn-hero-media-fade" />
          <div className="dn-hero-chip">
            <span className="ring" aria-hidden="true"><span>24/7</span></span>
            <span className="tx"><strong>Emergency line</strong><span>Day &amp; night</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

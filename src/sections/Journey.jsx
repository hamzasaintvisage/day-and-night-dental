import { PRACTICE } from '../data/practice';
import './journey.css';

// "What to expect when you call", three reassuring steps that sit directly under the hero,
// in place of the old emergency strip (which just repeated the hero's 24/7 message).
export default function Journey() {
  const tel = `tel:${PRACTICE.phoneE164}`;
  return (
    <section id="how-it-works" className="dn-journey">
      <div className="dn-journey-inner">
        <span className="dn-journey-eyebrow">What to expect when you call</span>
        <h2 className="dn-journey-head">
          From your call to <em className="grad">seen and sorted</em>, the same day or night.
        </h2>

        <div className="dn-journey-map">
          <div className="dn-journey-step">
            <span className="num">01</span>
            <h3>Immediate call triage</h3>
            <p>You reach our on-call team, who assess how urgent it is and what happens next.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">02</span>
            <h3>Same-day or night appointment</h3>
            <p>We secure your emergency slot at the Merchant City clinic straight away, any hour.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">03</span>
            <h3>Diagnosis &amp; pain relief</h3>
            <p>Our dentists use on-site diagnostics to find the cause and get you comfortable.</p>
          </div>
        </div>

        <div className="dn-journey-cta">
          <a href={tel} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call our 24/7 line<span className="arrow"> →</span>
          </a>
          <a href={tel} className="dn-journey-num">{PRACTICE.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}

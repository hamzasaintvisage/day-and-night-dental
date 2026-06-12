import { PRACTICE } from '../data/practice';
import './journey.css';

// "What to expect when you call", three reassuring steps that sit directly under the hero,
// in place of the old emergency strip (which just repeated the hero's 24/7 message).
export default function Journey() {
  const tel = `tel:${PRACTICE.phoneE164}`;
  return (
    <section id="how-it-works" className="dn-section dn-journey">
      <div className="dn-journey-inner">
        <span className="dn-journey-eyebrow">What to expect when you call</span>
        <h2 className="dn-journey-head">
          Call in pain. Get seen fast. Day or night.
        </h2>

        <div className="dn-journey-map">
          <div className="dn-journey-step">
            <span className="num">01</span>
            <h3>Tell us what’s wrong</h3>
            <p>We’ll ask a few quick questions, check how urgent it sounds, and guide you from there.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">02</span>
            <h3>Priority care, day or night</h3>
            <p>We’ll help arrange the earliest suitable emergency appointment.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">03</span>
            <h3>Relief and a clear plan</h3>
            <p>We’ll assess the problem, explain your options, and provide urgent treatment where suitable.</p>
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

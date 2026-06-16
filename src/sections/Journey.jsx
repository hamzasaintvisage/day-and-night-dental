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
          Call with dental pain. We’ll help you get seen fast.
        </h2>

        <div className="dn-journey-map">
          <div className="dn-journey-step">
            <span className="num">01</span>
            <h3>Tell us what’s happening</h3>
            <p>We’ll ask a few quick questions to understand your symptoms and how urgent they are.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">02</span>
            <h3>We’ll find the earliest appointment</h3>
            <p>If you need urgent care, we’ll help arrange the soonest suitable appointment.</p>
          </div>
          <div className="dn-journey-step">
            <span className="num">03</span>
            <h3>Get relief and a clear plan</h3>
            <p>A dentist will assess the problem, explain your options, and provide urgent treatment where appropriate.</p>
          </div>
        </div>

        <div className="dn-journey-cta">
          <a href={tel} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call the 24/7 emergency line<span className="arrow"> →</span>
          </a>
          <a href={tel} className="dn-journey-num">{PRACTICE.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}

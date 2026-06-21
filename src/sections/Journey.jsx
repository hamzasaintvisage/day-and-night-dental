import { PRACTICE } from '../data/practice';
import './journey.css';

// "What to expect when you call" — a connected timeline of three reassuring steps,
// sitting directly under the hero in place of the old emergency strip.
export default function Journey() {
  const tel = `tel:${PRACTICE.phoneE164}`;
  return (
    <section id="how-it-works" className="dn-section dn-journey">
      <div className="dn-journey-inner">
        <span className="dn-eyebrow dn-pill day">What to expect when you call</span>
        <h2 className="dn-journey-head">
          Call with dental pain.{' '}
          <span className="grad">We&rsquo;ll help you get seen fast.</span>
        </h2>

        <ol className="dn-journey-tl">
          <li className="dn-journey-st">
            <span className="dn-journey-node">
              <span className="dn-journey-node-in">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              <span className="dn-journey-node-n">1</span>
            </span>
            <h3>Tell us what&rsquo;s happening</h3>
            <p>We&rsquo;ll ask a few quick questions to understand your symptoms and how urgent they are.</p>
          </li>

          <li className="dn-journey-st">
            <span className="dn-journey-node">
              <span className="dn-journey-node-in">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 3v4M16 3v4" />
                </svg>
              </span>
              <span className="dn-journey-node-n">2</span>
            </span>
            <h3>We&rsquo;ll find the earliest appointment</h3>
            <p>If you need urgent care, we&rsquo;ll help arrange the soonest suitable appointment.</p>
          </li>

          <li className="dn-journey-st">
            <span className="dn-journey-node">
              <span className="dn-journey-node-in">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3c3 0 5 2 5 5 0 4-2 6-2 9 0 1-1 2-2 2s-1-2-1-4-1-2-2 0-1 4-2 4-2-1-2-2c0-3-2-5-2-9 0-3 2-5 5-5" />
                </svg>
              </span>
              <span className="dn-journey-node-n">3</span>
            </span>
            <h3>Get relief and a clear plan</h3>
            <p>A dentist will assess the problem, explain your options, and provide urgent treatment where appropriate.</p>
          </li>
        </ol>

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

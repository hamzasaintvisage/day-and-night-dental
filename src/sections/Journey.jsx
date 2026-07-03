import { PRACTICE } from '../data/practice';
import './journey.css';

// "What to expect when you call" - the "You and Us" split: a small YOU side (gold,
// one thing to do) handed over to a larger US side (blue, the three things we carry).
// Renders fully server-side; no JS needed for the default state.
export default function Journey() {
  const tel = `tel:${PRACTICE.phoneE164}`;
  return (
    <section id="how-it-works" className="dn-section dn-journey" aria-labelledby="journey-heading">
      <div className="dn-container dn-journey-container">

        <div className="dn-journey-intro">
          <span className="dn-eyebrow dn-pill day">What to expect when you call</span>
          <h2 className="dn-journey-head" id="journey-heading">
            Call with dental pain.{' '}
            <span className="grad">We&rsquo;ll help you get seen fast.</span>
          </h2>
        </div>

        <div className="dn-journey-split">

          {/* YOU side: gold, the single thing the caller does */}
          <div className="dn-journey-col dn-journey-you">
            <span className="dn-journey-col-tag">You</span>
            <p className="dn-journey-you-label">All you do</p>
            <p className="dn-journey-you-do">is pick up the phone.</p>
            <p className="dn-journey-you-sub">
              In pain, unsure, or it is the middle of the night. One call, and the rest is ours to carry.
            </p>
            <div className="dn-journey-you-count">
              <b>1</b> <span>thing to do</span>
            </div>
          </div>

          {/* seam: the handover from you (gold) to us (blue) */}
          <div className="dn-journey-seam" aria-hidden="true">
            <span className="dn-journey-seam-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path className="a" d="M3 12h11" />
                <path className="b" d="M14 12h7M17 8l4 4-4 4" />
              </svg>
            </span>
          </div>

          {/* US side: blue, the three things the practice carries */}
          <div className="dn-journey-col dn-journey-us">
            <span className="dn-journey-col-tag">Us</span>
            <p className="dn-journey-us-lede">
              From the moment you call, <em>we take it from here.</em>
            </p>

            <ol className="dn-journey-tasks">
              <li className="dn-journey-task">
                <span className="dn-journey-task-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                </span>
                <div className="dn-journey-task-body">
                  <h3>Tell us what&rsquo;s happening</h3>
                  <p>We&rsquo;ll ask a few quick questions to understand your symptoms and how urgent they are.</p>
                </div>
              </li>

              <li className="dn-journey-task">
                <span className="dn-journey-task-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                  </svg>
                </span>
                <div className="dn-journey-task-body">
                  <h3>We&rsquo;ll find the earliest appointment</h3>
                  <p>If you need urgent care, we&rsquo;ll help arrange the soonest suitable appointment.</p>
                </div>
              </li>

              <li className="dn-journey-task">
                <span className="dn-journey-task-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3c3 0 5 2 5 5 0 4-2 6-2 9 0 1-1 2-2 2s-1-2-1-4-1-2-2 0-1 4-2 4-2-1-2-2c0-3-2-5-2-9 0-3 2-5 5-5" />
                  </svg>
                </span>
                <div className="dn-journey-task-body">
                  <h3>Get relief and a clear plan</h3>
                  <p>A dentist will assess the problem, explain your options, and provide urgent treatment where appropriate.</p>
                </div>
              </li>
            </ol>
          </div>

        </div>

        <div className="dn-journey-cta">
          <a href={tel} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call the 24/7 emergency line<span className="arrow"> →</span>
          </a>
          <a href={tel} className="dn-journey-num">{PRACTICE.phoneDisplay}</a>
          <p className="dn-journey-cta-note">{PRACTICE.name}, {PRACTICE.locality}, {PRACTICE.city}</p>
        </div>

      </div>
    </section>
  );
}

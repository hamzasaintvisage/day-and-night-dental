import { Link } from 'react-router-dom'
import { PRACTICE } from '../data/practice'

// Full-width emergency-flavoured call-to-action band, dropped down the homepage
// so a "call us / book" prompt is never far away.
export default function CtaBand({ eyebrow = 'Day or Night', heading, sub, callLabel }) {
  return (
    <section className="dn-ctaband">
      <div className="dn-container">
        <div className="dn-ctaband-inner">
          <div className="dn-ctaband-text">
            <span className="dn-eyebrow night">{eyebrow}</span>
            <h2 className="dn-display">{heading}</h2>
            {sub && <p>{sub}</p>}
          </div>
          <div className="dn-ctaband-actions">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
              <span className="dn-btn-pulse" />
              {callLabel || `Call ${PRACTICE.phoneDisplay}`}
            </a>
            <Link to="/register-as-patient" className="dn-btn">
              Book an appointment<span className="arrow"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

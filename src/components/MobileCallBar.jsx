import { Link } from 'react-router-dom'
import { PRACTICE } from '../data/practice'

// Fixed bottom bar on mobile, the highest-converting element for emergency intent.
export default function MobileCallBar() {
  return (
    <div className="dn-callbar" role="region" aria-label="Quick contact">
      <a href={`tel:${PRACTICE.phoneE164}`} className="dn-callbar-btn call" aria-label="Call now">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6.6 10.8a14 14 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" fill="currentColor"/>
        </svg>
        Call now
      </a>
      <Link to="/#contact" className="dn-callbar-btn book" aria-label="Book an appointment">
        Book
      </Link>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadAnalytics } from '../lib/analytics'

// GDPR cookie banner. SSR-safe: renders nothing until mounted (localStorage read
// in an effect). Analytics only loads after Accept (or if already granted).
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let v = null
    try { v = localStorage.getItem('dnd-consent') } catch {}
    if (v === 'granted') loadAnalytics()
    else if (!v) setShow(true)
  }, [])

  const decide = (granted) => {
    try { localStorage.setItem('dnd-consent', granted ? 'granted' : 'denied') } catch {}
    if (granted) loadAnalytics()
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="dn-cookie" role="dialog" aria-label="Cookie consent">
      <p>
        We use a few cookies to make this site work and, with your consent, to understand
        how it's used. See our <Link to="/privacy">privacy policy</Link>.
      </p>
      <div className="dn-cookie-actions">
        <button type="button" className="dn-cookie-btn ghost" onClick={() => decide(false)}>Decline</button>
        <button type="button" className="dn-cookie-btn accept" onClick={() => decide(true)}>Accept</button>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { pageview, hasConsent } from '../lib/analytics'

// Sends an SPA page_view on each route/hash change, only after consent. Skips the very first
// view, which gtag('config') and the fbq init already count, so the landing page isn't
// double-counted. Renders nothing.
export default function Analytics() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (!hasConsent()) return
    if (first.current) { first.current = false; return }
    pageview(pathname + hash)
  }, [pathname, hash])
  return null
}

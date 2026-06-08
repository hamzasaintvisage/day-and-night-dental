import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageview, hasConsent } from '../lib/analytics'

// Sends an SPA page_view on each route change, only if the user has consented
// and analytics has loaded. Renders nothing.
export default function Analytics() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (hasConsent()) pageview(pathname)
  }, [pathname])
  return null
}

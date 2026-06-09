import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Header from './Header'
import Footer from './Footer'
import MobileCallBar from './MobileCallBar'
import CookieConsent from './CookieConsent'
import Analytics from './Analytics'
import { PRACTICE } from '../data/practice'

// Shared chrome for every route: noise overlay, sticky header, footer, mobile call bar.
// Handles scroll-to-top on navigation and smooth-scroll to #hash targets.
export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  // Subtle scroll-reveal: fade each section in as it enters view (opacity-only, sticky-safe).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.dn-section'))
    if (!els.length) return
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('dn-in'))
      return
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('dn-in'); obs.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <div className="dn-root">
      {/* Site-wide geo signals (consumed by Bing + citation parsers) */}
      <Head>
        <meta name="geo.region" content="GB-GLG" />
        <meta name="geo.placename" content="Merchant City, Glasgow" />
        <meta name="geo.position" content={`${PRACTICE.geo.lat};${PRACTICE.geo.lng}`} />
        <meta name="ICBM" content={`${PRACTICE.geo.lat}, ${PRACTICE.geo.lng}`} />
      </Head>
      <a href="#main" className="dn-skip-link">Skip to main content</a>
      <div className="dn-noise" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
      <CookieConsent />
      <Analytics />
    </div>
  )
}

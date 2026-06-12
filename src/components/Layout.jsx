import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Header from './Header'
import Footer from './Footer'
import MobileCallBar from './MobileCallBar'
import CookieConsent from './CookieConsent'
import Analytics from './Analytics'
import ErrorBoundary from './ErrorBoundary'
import { PRACTICE, SITE } from '../data/practice'

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
        {/* Default robots for indexable routes; noindex pages (thank-you/registered) override by name. */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="geo.region" content="GB-GLG" />
        <meta name="geo.placename" content="Merchant City, Glasgow" />
        <meta name="geo.position" content={`${PRACTICE.geo.lat};${PRACTICE.geo.lng}`} />
        <meta name="ICBM" content={`${PRACTICE.geo.lat}, ${PRACTICE.geo.lng}`} />
        {/* OG/Twitter defaults so every route (incl. legal pages) unfurls with a card.
            Pages with their own Head override og:title/description/url + twitter:title/description. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Day Night Dental, 24/7 emergency &amp; cosmetic dentist, Glasgow" />
        <meta property="og:description" content="A 24/7 emergency and cosmetic dental practice in Merchant City, Glasgow. Same-day emergency care, Invisalign, implants and whitening." />
        <meta property="og:image" content={`${SITE}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Day Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Day Night Dental, 24/7 emergency &amp; cosmetic dentist, Glasgow" />
        <meta name="twitter:description" content="A 24/7 emergency and cosmetic dental practice in Merchant City, Glasgow." />
        <meta name="twitter:image" content={`${SITE}/og-image.jpg`} />
      </Head>
      <a href="#main" className="dn-skip-link">Skip to main content</a>
      <div className="dn-noise" />
      <Header />
      <main id="main" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <MobileCallBar />
      <CookieConsent />
      <Analytics />
    </div>
  )
}

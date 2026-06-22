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
  // Per-page canonical URL (trailing slash) - also the og:url default, so every route (incl. legal
  // pages) gets its own shareable URL instead of inheriting the homepage's card.
  const canonicalUrl = SITE + (pathname.endsWith('/') ? pathname : pathname + '/')

  useEffect(() => {
    if (hash) {
      const focusTarget = (el) => {
        el.classList.add('dn-in') // reveal before measuring (scroll-reveal may not have fired yet)
        el.scrollIntoView({ behavior: 'smooth' })
        // Move focus + AT announcement to the target, not just the scroll position (WCAG 2.4.3).
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
      const el = document.getElementById(hash.slice(1))
      if (el) { focusTarget(el); return }
      // The target may not be mounted on the first paint of a deep-linked route: retry next frame.
      const raf = requestAnimationFrame(() => {
        const late = document.getElementById(hash.slice(1))
        if (late) focusTarget(late)
        else window.scrollTo(0, 0)
      })
      return () => cancelAnimationFrame(raf)
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
    // Per-route failsafe: if the observer misses a section (e.g. one above a hash-nav target, or
    // unobserved before it intersects), reveal anything still hidden so content is never stuck at
    // opacity:0. The index.html 'load' failsafe only fires once per document, not on SPA nav.
    const failsafe = setTimeout(() => {
      document.querySelectorAll('.dn-section:not(.dn-in)').forEach((el) => el.classList.add('dn-in'))
    }, 1600)
    return () => { clearTimeout(failsafe); io.disconnect() }
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
        <meta property="og:image" content={`${SITE}/og-image.jpg?v=2`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Day Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Day Night Dental, 24/7 emergency &amp; cosmetic dentist, Glasgow" />
        <meta name="twitter:description" content="A 24/7 emergency and cosmetic dental practice in Merchant City, Glasgow." />
        <meta name="twitter:image" content={`${SITE}/og-image.jpg?v=2`} />
        <meta name="twitter:image:alt" content="Day Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
      </Head>
      <a href="#main" className="dn-skip-link">Skip to main content</a>
      {/* Single continuous gold/blue page glow behind all content */}
      <div className="dn-ambient" aria-hidden="true" />
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

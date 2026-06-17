import { GA4_ID, META_PIXEL_ID } from '../data/config'

// Consent-gated analytics. Nothing loads until loadAnalytics() is called
// (from CookieConsent on Accept, or on load if consent was already granted).

let loaded = false

// Consent is stored as JSON { v, value, at } so it can expire and be invalidated on policy change.
export const CONSENT_VERSION = 1
const CONSENT_KEY = 'dnd-consent'
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180 // ~6 months, then re-ask (ICO expectation)

export function readConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    if (raw === 'granted' || raw === 'denied') return { value: raw, v: 0, at: 0 } // legacy bare string
    const o = JSON.parse(raw)
    if (!o || o.v !== CONSENT_VERSION) return null              // policy/version changed -> re-ask
    if (o.at && (Date.now() - o.at) > CONSENT_MAX_AGE_MS) return null // expired -> re-ask
    return o
  } catch {
    return null
  }
}

export function hasConsent() {
  const c = readConsent()
  return !!c && c.value === 'granted'
}

// Same-session withdrawal: GA4's official opt-out flag + neutralise the pixel, so no further hits
// are sent without waiting for a page reload (withdrawal as immediate as granting).
export function disableAnalytics() {
  if (typeof window === 'undefined') return
  if (GA4_ID) window[`ga-disable-${GA4_ID}`] = true
  if (window.fbq) { try { window.fbq = function () {} } catch { /* noop */ } }
}

export function loadAnalytics() {
  if (loaded || typeof window === 'undefined') return
  loaded = true

  if (GA4_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)
  }

  if (META_PIXEL_ID) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
      if (!f._fbq) f._fbq = n
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = !0; t.src = v
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// SPA page view on route change (only if analytics is loaded).
export function pageview(path) {
  if (typeof window === 'undefined') return
  if (window.gtag) window.gtag('event', 'page_view', { page_path: path })
  if (window.fbq) window.fbq('track', 'PageView')
}

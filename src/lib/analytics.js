import { GA4_ID, META_PIXEL_ID } from '../data/config'

// Consent-gated analytics. Nothing loads until loadAnalytics() is called
// (from CookieConsent on Accept, or on load if consent was already granted).

let loaded = false

export function hasConsent() {
  try {
    return localStorage.getItem('dnd-consent') === 'granted'
  } catch {
    return false
  }
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
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
      if (!f._fbq) f._fbq = n
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = !0; t.src = v
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// SPA page view on route change (only if analytics is loaded).
export function pageview(path) {
  if (window.gtag) window.gtag('event', 'page_view', { page_path: path })
  if (window.fbq) window.fbq('track', 'PageView')
}

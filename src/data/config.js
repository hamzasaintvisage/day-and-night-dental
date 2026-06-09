// Analytics / tracking IDs. Empty = disabled (no scripts load, calls no-op).
// Fill these once the owner has the accounts, then redeploy. Nothing else changes.
export const GA4_ID = ''          // e.g. 'G-XXXXXXXXXX'  (Google Analytics 4)
export const META_PIXEL_ID = ''   // e.g. '123456789012345' (Meta / Facebook Pixel)

// Cloudflare Turnstile site key for form spam protection. Empty = Turnstile off
// (the send-enquiry function also skips verification unless TURNSTILE_SECRET is set).
export const TURNSTILE_SITE_KEY = ''

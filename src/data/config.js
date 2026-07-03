// Analytics / tracking IDs. Empty = disabled (no scripts load, calls no-op).
// Fill these once the owner has the accounts, then redeploy. Nothing else changes.
export const GA4_ID = ''          // e.g. 'G-XXXXXXXXXX'  (Google Analytics 4)
export const META_PIXEL_ID = ''   // e.g. '123456789012345' (Meta / Facebook Pixel)

// Google reCAPTCHA v3 Site key. Empty = protection OFF (form still works). Paste the Site key
// from google.com/recaptcha/admin to switch it on. See hostinger/RECAPTCHA-SETUP.md
export const RECAPTCHA_SITE_KEY = ''

// Version stamp for the consent copy the patient agrees to at registration. Sent with each
// registration so we have a record of which privacy wording was in force. Bump this string
// whenever the consent/privacy wording changes.
export const PRIVACY_CONSENT_VERSION = 'privacy-2026-07-02'

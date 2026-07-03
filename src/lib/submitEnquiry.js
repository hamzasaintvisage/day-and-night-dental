// Shared browser helper for the custom Resend email pipeline.
// SSR-safe: no window/document/Date access at module scope.
// Used by both Contact and Register form onSubmit handlers.

/**
 * Build the anti-bot "extras" to merge into a submission.
 *
 * `elapsed` is the fill duration in ms, measured entirely on the CLIENT clock
 * (form load -> submit). Sending the delta (not an absolute timestamp) keeps the
 * server-side time-trap immune to client/server clock skew. If the form-load time
 * is unknown (ref not yet set) we send null, which the server treats as "no signal".
 * `bot-field` is the honeypot, it must stay empty for real users.
 *
 * @param {number} loadedAt - Date.now() captured when the form mounted (0 if unset).
 * @param {string} [botField] - the honeypot input's value.
 * @returns {{ elapsed: number|null, 'bot-field': string }}
 */
export function buildEnquiryExtras(loadedAt, botField = '') {
  return { elapsed: loadedAt ? Date.now() - loadedAt : null, 'bot-field': botField }
}

/**
 * Lazily inject the Google reCAPTCHA v3 script exactly once. No-op when the site key is empty
 * (protection off, zero network to Google) or when not running in a browser (SSR-safe: all
 * window/document access is guarded so this can be called from an effect during hydration).
 *
 * @param {string} siteKey - the public reCAPTCHA v3 Site key (empty = disabled).
 */
export function loadRecaptcha(siteKey) {
  if (!siteKey || typeof window === 'undefined' || typeof document === 'undefined') return
  if (document.getElementById('dn-recaptcha')) return
  const script = document.createElement('script')
  script.id = 'dn-recaptcha'
  script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

/**
 * Get a fresh reCAPTCHA v3 token for an action, or '' when protection is off / grecaptcha is
 * not available. reCAPTCHA v3 is invisible (score-based) and shows only a small badge, so there
 * is no widget to render. SSR-safe: never touches window/grecaptcha at module scope.
 *
 * @param {string} siteKey - the public reCAPTCHA v3 Site key (empty = disabled).
 * @param {'register'|'contact'} action - the action name, for score context + server checks.
 * @returns {Promise<string>} a one-time token, or '' when disabled/unavailable.
 */
export async function getRecaptchaToken(siteKey, action) {
  if (!siteKey || typeof window === 'undefined' || !window.grecaptcha) return ''
  try {
    return await new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action }).then(resolve, () => resolve(''))
      })
    })
  } catch {
    return ''
  }
}

/**
 * POST a form submission to the custom email pipeline at /api/send-enquiry.php.
 *
 * @param {'contact'|'register'} formType - which form is submitting.
 * @param {Record<string, unknown>} fields - the user-entered fields.
 * @param {Record<string, unknown>} [extras] - anti-bot extras (see buildEnquiryExtras) plus any recaptchaToken.
 * @returns {Promise<Response>} the raw fetch Response so callers can check res.ok.
 */
export async function submitEnquiry(formType, fields, extras = {}) {
  // Abort after 15s so a hung/unreachable endpoint surfaces the "please call us" error
  // (via the caller's catch) instead of leaving the form stuck on "Sending…" forever.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    return await fetch('/api/send-enquiry.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, ...fields, ...extras }),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }
}

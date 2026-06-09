// Shared browser helper for the custom Resend email pipeline.
// SSR-safe: no window/document/Date access at module scope.
// NOTE: not wired into Contact/Register yet — Stage 2 does that.

/**
 * Build the anti-bot "extras" to merge into a submission: a render timestamp
 * (`ts`, ms) for the server-side time-trap and an empty honeypot (`bot-field`).
 * Call this when the form renders, then pass the result to submitEnquiry().
 *
 * @returns {{ ts: number, 'bot-field': string }}
 */
export function buildEnquiryExtras() {
  return { ts: Date.now(), 'bot-field': '' }
}

/**
 * POST a form submission to the custom email pipeline at /api/send-enquiry.
 *
 * @param {'contact'|'register'} formType - which form is submitting.
 * @param {Record<string, unknown>} fields - the user-entered fields.
 * @param {Record<string, unknown>} [extras] - anti-bot extras (see buildEnquiryExtras) plus any turnstileToken.
 * @returns {Promise<Response>} the raw fetch Response so callers can check res.ok.
 */
export async function submitEnquiry(formType, fields, extras = {}) {
  return fetch('/api/send-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, ...fields, ...extras }),
  })
}

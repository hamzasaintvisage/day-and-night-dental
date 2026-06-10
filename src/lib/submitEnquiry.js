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
 * `bot-field` is the honeypot — it must stay empty for real users.
 *
 * @param {number} loadedAt - Date.now() captured when the form mounted (0 if unset).
 * @param {string} [botField] - the honeypot input's value.
 * @returns {{ elapsed: number|null, 'bot-field': string }}
 */
export function buildEnquiryExtras(loadedAt, botField = '') {
  return { elapsed: loadedAt ? Date.now() - loadedAt : null, 'bot-field': botField }
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

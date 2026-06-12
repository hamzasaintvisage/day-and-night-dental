// Cloudflare Pages Function — POST /api/send-enquiry
// Email-ONLY enquiry pipeline via Resend. No data store (GDPR: patient enquiry data,
// incl. health-adjacent free-text, is NOT persisted in KV — it is emailed straight to
// the practice inbox). Uses only web-standard APIs (fetch/Request/Response/URL/Intl).
// Ported from the original Netlify function: same validation/escaping/honeypot/time-trap.

const STATIC_ALLOWED = [
  'https://www.daynightdental.co.uk',
  'https://daynightdental.co.uk',
]

// Field length caps (chars). Anything over is rejected.
const CAPS = {
  name: 100, firstName: 100, lastName: 100, email: 150, phone: 30,
  address: 200, postcode: 200, notes: 2000, message: 2000,
}
const DEFAULT_TEXT_CAP = 2000

// Minimum plausible time to fill + submit the form (ms). Anything faster is treated as a
// bot. Measured on the CLIENT clock (load -> submit) so it is immune to client/server skew.
const MIN_FILL_MS = 600
// Hard ceiling on field count (the forms send ~15) — bounds abuse via giant payloads.
const MAX_FIELDS = 40
// Per-IP rate limit: max submissions per window (KV-backed; see onRequestPost step 3b).
const RATE_LIMIT_MAX = 8
const RATE_LIMIT_WINDOW_S = 60 // KV minimum TTL is 60s

// Internal fields that never appear in the email body.
const SKIP_FIELDS = new Set(['bot-field', 'ts', 'elapsed', 'turnstileToken', 'form-name', 'formType'])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Free-text textarea fields may contain newlines/tabs (HTML-escaped into the body); all
// other single-line fields reject CR/LF/TAB to block email-header injection.
const MULTILINE_FIELDS = new Set(['notes', 'message'])

// JSON response with defence-in-depth headers. _headers does NOT apply to Function
// responses, so set the security/no-cache headers here too. `extra` allows e.g. Allow.
const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'x-frame-options': 'DENY',
      ...extra,
    },
  })

// This endpoint only accepts POST; answer other methods with a clean 405 (+ Allow).
const methodNotAllowed = () => json({ ok: false, error: 'Method not allowed' }, 405, { allow: 'POST' })
export const onRequestGet = methodNotAllowed
export const onRequestPut = methodNotAllowed
export const onRequestDelete = methodNotAllowed
export const onRequestPatch = methodNotAllowed

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Hash a value (e.g. an IP) so the rate-limit KV stores no raw identifier — just a tally.
async function sha256hex(value) {
  const data = new TextEncoder().encode(String(value))
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// True if the request origin/referer is acceptable: the live domain, any Cloudflare
// Pages preview/prod URL for this project, or localhost for dev.
function originAllowed(origin) {
  let host
  try { host = new URL(origin).origin } catch { return false }
  if (STATIC_ALLOWED.includes(host)) return true
  if (/^https:\/\/([a-z0-9-]+\.)?daynightdental\.pages\.dev$/.test(host)) return true
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true
  return false
}

function londonNow() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short',
  }).format(new Date())
}

function labelFor(key) {
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/[_-]+/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase().trim()
}

function validateField(key, value) {
  if (value == null) return null
  // Booleans (consent) and numbers (elapsed) are valid as-is. Arrays/objects are never
  // expected and would BYPASS the length cap (String(val) in the email body), so reject them.
  if (typeof value === 'boolean' || typeof value === 'number') return null
  if (typeof value !== 'string') return `${labelFor(key)} is invalid`
  const cap = CAPS[key] ?? DEFAULT_TEXT_CAP
  if (value.length > cap) return `${labelFor(key)} is too long`
  if (!MULTILINE_FIELDS.has(key) && /[\r\n\t]/.test(value)) return `${labelFor(key)} contains invalid characters`
  return null
}

export async function onRequestPost(context) {
  const { request, env } = context
  const SITE = env.SITE || 'https://www.daynightdental.co.uk'

  // 1) Parse body
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'Invalid request' }, 400)
  }
  if (Object.keys(body).length > MAX_FIELDS) {
    return json({ ok: false, error: 'Too many fields' }, 400)
  }

  // 2) Form type
  const formType = body.formType
  if (formType !== 'contact' && formType !== 'register') {
    return json({ ok: false, error: 'Unknown form type' }, 400)
  }

  // 3) Origin / referer allowlist — a real browser submission always sends one of these
  // (same-origin POST). Missing BOTH = a non-browser/script request -> reject (hardening).
  const origin = request.headers.get('origin') || request.headers.get('referer')
  if (!origin || !originAllowed(origin)) {
    console.warn(`send-enquiry: blocked origin/referer: ${origin || '(none)'}`)
    return json({ ok: false, error: 'Forbidden' }, 403)
  }

  // 3b) Per-IP rate limit via a KV counter (hashed IP, short TTL window). Caps abuse and
  // inbox-flooding. Stores ONLY a transient request tally (a small integer under a hashed
  // key, 60s TTL) — never enquiry or patient data — so it does not change the email-only
  // data-protection posture. Fails OPEN: if the namespace is absent or errors, a genuine
  // enquiry is NEVER blocked. (An edge WAF rate-limit rule supersedes this once the custom
  // domain is on Cloudflare.)
  if (env.RATE_LIMIT_KV) {
    try {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
      const rlKey = `rl:${await sha256hex(ip)}`
      const count = parseInt(await env.RATE_LIMIT_KV.get(rlKey), 10) || 0
      if (count >= RATE_LIMIT_MAX) {
        console.warn('send-enquiry: rate limit hit')
        return json({ ok: false, error: 'Too many requests. Please wait a minute and try again, or call us.' }, 429)
      }
      await env.RATE_LIMIT_KV.put(rlKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_S })
    } catch (err) {
      console.error('send-enquiry: rate limiter error (failing open)', err)
    }
  }

  // 4) Honeypot — silently accept (don't tip off bots).
  if (typeof body['bot-field'] === 'string' && body['bot-field'].length > 0) {
    console.warn('send-enquiry: honeypot tripped — dropping submission')
    return json({ ok: true })
  }

  // 5) Time-trap. `elapsed` is the fill duration (ms), measured entirely on the CLIENT
  // clock (form load -> submit), so it is immune to client/server clock skew. Missing,
  // non-finite, or non-positive => "no signal" => allow (NEVER drop a real enquiry over a
  // missing timestamp). There is deliberately NO upper bound: a tab left open for hours is
  // a real (if slow) user, not a bot, and an attacker can forge any value anyway. Only an
  // implausibly fast submit is dropped — silently accepted (don't tip off bots) but not sent.
  const elapsed = Number(body.elapsed)
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_MS) {
    console.warn(`send-enquiry: time-trap tripped (elapsed=${elapsed}ms) — dropping`)
    return json({ ok: true })
  }

  // 6) Required fields
  const required =
    formType === 'contact'
      ? ['name', 'phone', 'email']
      : ['firstName', 'lastName', 'phone', 'email', 'consent']
  for (const key of required) {
    const val = body[key]
    if (key === 'consent') {
      if (!val) return json({ ok: false, error: 'Consent is required' }, 400)
      continue
    }
    if (typeof val !== 'string' || val.trim() === '') {
      return json({ ok: false, error: `${labelFor(key)} is required` }, 400)
    }
  }

  // 7) Length caps + injection chars on every string field.
  for (const [key, val] of Object.entries(body)) {
    const err = validateField(key, val)
    if (err) return json({ ok: false, error: err }, 400)
  }

  // 8) Email format.
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const emailValid = EMAIL_RE.test(email) && email.length <= CAPS.email
  if (!emailValid) return json({ ok: false, error: 'A valid email is required' }, 400)

  // 9) CAPTCHA: intentionally NOT enforced server-side. A Turnstile check is only safe once
  // the CLIENT half is also wired (renders the widget and sends a token). That half does not
  // exist yet (TURNSTILE_SITE_KEY is empty, no widget in the DOM), so enforcing here on the
  // presence of an env var alone would 400 every real submission and silently kill all lead
  // capture. When enabling CAPTCHA, add BOTH halves together. The honeypot, time-trap, and
  // origin allowlist above are the active anti-spam guards in the meantime.

  // 10) Build the email --------------------------------------------------------
  const formLabel = formType === 'contact' ? 'Website enquiry (Contact)' : 'New patient registration'
  const subject =
    formType === 'contact'
      ? `New website enquiry — ${body.name}`
      : `New patient registration — ${body.firstName} ${body.lastName}`

  const rows = Object.entries(body)
    .filter(([key, val]) => !SKIP_FIELDS.has(key) && val != null && val !== '')
    .map(([key, val]) => ({
      label: labelFor(key),
      value: typeof val === 'boolean' ? (val ? 'Yes' : 'No') : String(val),
    }))

  const when = londonNow()

  const text = [
    formLabel,
    `Received: ${when}`,
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
    '',
    `— Sent from ${SITE}`,
  ].join('\n')

  const htmlRows = rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#444;vertical-align:top;white-space:nowrap;">${esc(
          r.label,
        )}</td><td style="padding:6px 12px;color:#111;">${esc(r.value)}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:24px;text-align:center;background:#ffffff;">
          <img src="${SITE}/logo.png" alt="Day Night Dental" width="180" style="max-width:180px;height:auto;display:inline-block;" />
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <h1 style="margin:0 0 4px;font-size:18px;color:#0b2545;">${esc(formLabel)}</h1>
          <p style="margin:0 0 16px;font-size:13px;color:#777;">Received: ${esc(when)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
            ${htmlRows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;background:#f4f5f7;text-align:center;font-size:12px;color:#999;">
          Sent from <a href="${SITE}" style="color:#0b2545;">${esc(SITE)}</a>
        </td>
      </tr>
    </table>
  </body>
</html>`

  // 11) Recipients + sender (FAIL LOUD if not configured — no silent dry-run, no test-domain fallback).
  const apiKey = env.RESEND_API_KEY
  const from = env.SEND_FROM
  if (!apiKey || !from) {
    console.error('send-enquiry: missing RESEND_API_KEY or SEND_FROM env var')
    return json({ ok: false, error: 'Email not configured' }, 500)
  }
  // Primary recipient + optional second practice-controlled backup inbox (comma-separated).
  const to = (env.ENQUIRY_TO || 'reception@daynightdental.co.uk')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const reply_to = email

  // 12) Send via Resend.
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, text, reply_to }),
    })
    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error(`send-enquiry: Resend error ${res.status}: ${errBody.slice(0, 300)}`)
      return json({ ok: false, error: 'Failed to send' }, 502)
    }
    return json({ ok: true })
  } catch (err) {
    console.error('send-enquiry: Resend request error', err)
    return json({ ok: false, error: 'Failed to send' }, 502)
  }
}

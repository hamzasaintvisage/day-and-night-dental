// Modern Netlify Function (req, context) => Response.
// Custom Resend email pipeline that runs ALONGSIDE Netlify Forms.
// This is additive: Netlify Forms keep working untouched.
//
// Netlify Functions are bundled separately from src/ and must NOT import from
// src/. So the canonical site URL is hardcoded here (kept in sync by hand with
// `SITE` in src/data/practice.js).
const SITE = 'https://www.dayandnightdental.co.uk'

// --- Origin / referer allowlist -------------------------------------------
const STATIC_ALLOWED = [
  'https://www.dayandnightdental.co.uk',
  'https://dayandnightdental.co.uk',
]

// Field length caps (chars). Anything over is rejected.
const CAPS = {
  name: 100,
  firstName: 100,
  lastName: 100,
  email: 150,
  phone: 30,
  address: 200,
  postcode: 200,
  // free text
  notes: 2000,
  message: 2000,
}
const DEFAULT_TEXT_CAP = 2000

// Internal fields that never appear in the email body.
const SKIP_FIELDS = new Set(['bot-field', 'ts', 'turnstileToken', 'form-name', 'formType'])

// Sane-enough email regex (single @, no whitespace, a dot in the domain).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (obj, status = 200) => Response.json(obj, { status })

// Escape user values for safe embedding in HTML.
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Build the list of allowed origins (static + Netlify-provided env URLs).
function allowedOrigins() {
  const list = [...STATIC_ALLOWED]
  if (process.env.URL) list.push(process.env.URL)
  if (process.env.DEPLOY_PRIME_URL) list.push(process.env.DEPLOY_PRIME_URL)
  return list
}

// True if the request origin/referer is acceptable.
function originAllowed(origin) {
  let host
  try {
    host = new URL(origin).origin
  } catch {
    return false
  }
  if (allowedOrigins().includes(host)) return true
  // Any localhost / 127.0.0.1 (any port) is allowed for local dev.
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true
  return false
}

// A human-friendly London timestamp.
function londonNow() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date())
}

// Pretty label for a field key (firstName -> "First name").
function labelFor(key) {
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/[_-]+/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase().trim()
}

// Validate a single string field against caps + injection chars.
// Returns an error string, or null if OK.
function validateField(key, value) {
  if (typeof value !== 'string') return null
  const cap = CAPS[key] ?? DEFAULT_TEXT_CAP
  if (value.length > cap) return `${labelFor(key)} is too long`
  if (/[\r\n\t]/.test(value)) return `${labelFor(key)} contains invalid characters`
  return null
}

export default async (req, _context) => {
  // 1) Method
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)

  // 2) Parse body
  let body
  try {
    body = await req.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }

  // 3) Form type
  const formType = body.formType
  if (formType !== 'contact' && formType !== 'register') {
    return json({ ok: false, error: 'Unknown form type' }, 400)
  }

  // 4) Origin / referer allowlist
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (!origin) {
    console.warn('send-enquiry: no origin/referer header present — allowing')
  } else if (!originAllowed(origin)) {
    console.warn(`send-enquiry: blocked origin/referer: ${origin}`)
    return json({ ok: false, error: 'Forbidden' }, 403)
  }

  // 5) Honeypot — silently accept (don't tip off bots).
  if (typeof body['bot-field'] === 'string' && body['bot-field'].length > 0) {
    console.warn('send-enquiry: honeypot tripped — dropping submission')
    return json({ ok: true })
  }

  // 6) Time-trap — too-fast or too-old submissions are bots.
  if (body.ts != null) {
    const ts = Number(body.ts)
    if (Number.isFinite(ts)) {
      const elapsed = Date.now() - ts
      if (elapsed < 3000 || elapsed > 2 * 60 * 60 * 1000) {
        console.warn(`send-enquiry: time-trap tripped (elapsed=${elapsed}ms) — dropping`)
        return json({ ok: true })
      }
    }
  }

  // 7) Validation
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

  // Length caps + injection chars on EVERY string field.
  for (const [key, val] of Object.entries(body)) {
    const err = validateField(key, val)
    if (err) return json({ ok: false, error: err }, 400)
  }

  // Email format.
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const emailValid = EMAIL_RE.test(email) && email.length <= CAPS.email
  if (!emailValid) return json({ ok: false, error: 'A valid email is required' }, 400)

  // 8) Optional Turnstile
  if (process.env.TURNSTILE_SECRET) {
    const token = body.turnstileToken
    if (!token || typeof token !== 'string') {
      return json({ ok: false, error: 'Captcha required' }, 400)
    }
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET,
          response: token,
        }),
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        console.warn('send-enquiry: Turnstile verification failed')
        return json({ ok: false, error: 'Captcha verification failed' }, 400)
      }
    } catch (err) {
      console.error('send-enquiry: Turnstile request error', err)
      return json({ ok: false, error: 'Captcha verification failed' }, 400)
    }
  }

  // 9) Build the email -------------------------------------------------------
  const formLabel = formType === 'contact' ? 'Website enquiry (Contact)' : 'New patient registration'
  const subject =
    formType === 'contact'
      ? `New website enquiry — ${body.name}`
      : `New patient registration — ${body.firstName} ${body.lastName}`

  // Ordered, human-readable list of every submitted field (minus internals).
  const rows = Object.entries(body)
    .filter(([key, val]) => !SKIP_FIELDS.has(key) && val != null && val !== '')
    .map(([key, val]) => ({
      label: labelFor(key),
      value: typeof val === 'boolean' ? (val ? 'Yes' : 'No') : String(val),
    }))

  const when = londonNow()

  // Plaintext (complete — all critical info lives here too).
  const text = [
    formLabel,
    `Received: ${when}`,
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
    '',
    `— Sent from ${SITE}`,
  ].join('\n')

  // Branded HTML (logo at top, but every field repeated in text-safe markup).
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
        <td style="padding:24px;text-align:center;background:#0b2545;">
          <img src="${SITE}/logo.png" alt="Day &amp; Night Dental" width="180" style="max-width:180px;height:auto;display:inline-block;" />
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

  // 10) Recipients ----------------------------------------------------------
  const to = process.env.ENQUIRY_TO || 'reception@dayandnightdental.co.uk'
  // onboarding@resend.dev is Resend's built-in test sender — replace via the
  // SEND_FROM env var with a verified domain address at launch.
  const from = process.env.SEND_FROM || 'Day & Night Dental <onboarding@resend.dev>'
  const reply_to = emailValid ? email : undefined

  // 11) Send decision matrix ------------------------------------------------
  const mode = process.env.FORMS_DRY_RUN === 'true'
    ? 'dry-run (FORMS_DRY_RUN)'
    : process.env.RESEND_API_KEY
      ? 'send (Resend)'
      : process.env.CONTEXT !== 'production'
        ? 'dry-run (non-production preview)'
        : 'unconfigured (production, no key)'
  console.log(`send-enquiry: mode=${mode} formType=${formType}`)

  const payloadSummary = { formType, to, from, subject, reply_to }

  if (process.env.FORMS_DRY_RUN === 'true') {
    console.log('send-enquiry: DRY RUN payload', payloadSummary)
    return json({ ok: true, dryRun: true })
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, subject, html, text, reply_to }),
      })
      if (!res.ok) {
        const errBody = await res.text()
        console.error(`send-enquiry: Resend error ${res.status}: ${errBody}`)
        return json({ ok: false, error: 'Failed to send' }, 502)
      }
      return json({ ok: true })
    } catch (err) {
      console.error('send-enquiry: Resend request error', err)
      return json({ ok: false, error: 'Failed to send' }, 502)
    }
  }

  if (process.env.CONTEXT !== 'production') {
    console.log('send-enquiry: DRY RUN (preview) payload', payloadSummary)
    return json({ ok: true, dryRun: true })
  }

  return json({ ok: false, error: 'Email not configured' }, 503)
}

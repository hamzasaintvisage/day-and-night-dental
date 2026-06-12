// Day Night Dental — daily enquiry-pipeline health check (Cloudflare scheduled Worker).
//
// This is a SEPARATE Worker from the website (Cloudflare Pages can't run scheduled jobs).
// Once a day it checks the site, the enquiry endpoint, and the Resend sending domain, and
// emails an alert if anything is broken — so a dead contact form never goes unnoticed.
//
// DEPLOY AT GO-LIVE (after the Resend domain is verified), because the alert email is sent
// THROUGH Resend: until the domain is verified, an alert could not be delivered anyway.
//
// Deploy:  cd monitor
//          npx wrangler@3 secret put RESEND_API_KEY      # the Resend key (NEVER in code)
//          npx wrangler@3 secret put SEND_FROM           # e.g. "Day Night Dental <bookings@daynightdental.co.uk>"
//          npx wrangler@3 secret put ALERT_TO            # where alerts go, e.g. reception@daynightdental.co.uk
//          npx wrangler@3 deploy
// (Run with CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID set, like the Pages deploy.)

const SITE = 'https://www.daynightdental.co.uk'
const RESEND_DOMAIN = 'daynightdental.co.uk'

export default {
  async scheduled(event, env, ctx) {
    const problems = []

    // 1) Is the website reachable?
    try {
      const r = await fetch(`${SITE}/`, { method: 'GET' })
      if (!r.ok) problems.push(`Homepage returned HTTP ${r.status}`)
    } catch (e) {
      problems.push(`Homepage unreachable: ${e.message}`)
    }

    // 2) Is the enquiry function alive? An invalid body must return 400 (no email is sent).
    //    Any 5xx / network error means the form's server side is broken.
    try {
      const r = await fetch(`${SITE}/api/send-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: SITE },
        body: JSON.stringify({ formType: 'contact' }),
      })
      if (r.status !== 400) problems.push(`Enquiry endpoint health probe returned HTTP ${r.status} (expected 400)`)
    } catch (e) {
      problems.push(`Enquiry endpoint unreachable: ${e.message}`)
    }

    // 3) Is the Resend sending domain still verified?
    try {
      const r = await fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
      })
      if (!r.ok) {
        problems.push(`Resend API returned HTTP ${r.status}`)
      } else {
        const data = await r.json()
        const domain = (data.data || []).find((d) => d.name === RESEND_DOMAIN)
        if (!domain) problems.push(`Resend sending domain ${RESEND_DOMAIN} is missing`)
        else if (domain.status !== 'verified') {
          problems.push(`Resend domain ${RESEND_DOMAIN} status is "${domain.status}" (not verified) — outgoing enquiry emails will fail`)
        }
      }
    } catch (e) {
      problems.push(`Resend API unreachable: ${e.message}`)
    }

    if (problems.length === 0) return // all healthy — stay quiet
    await sendAlert(env, problems)
  },
}

async function sendAlert(env, problems) {
  const to = (env.ALERT_TO || 'reception@daynightdental.co.uk')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const text = [
    'The automated daily health check found a problem with the Day Night Dental website enquiry pipeline:',
    '',
    ...problems.map((p) => ` - ${p}`),
    '',
    'Patients may be unable to send the contact or registration form right now.',
    'Please check the website, or forward this to whoever maintains it.',
    '',
    '(Automated message. If the email service itself is down, this alert may not have been delivered.)',
  ].join('\n')
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.SEND_FROM,
        to,
        subject: 'ALERT: Day Night Dental contact form may be down',
        text,
      }),
    })
  } catch {
    /* best effort — nothing more we can do if Resend itself is unreachable */
  }
}

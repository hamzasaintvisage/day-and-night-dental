// Scheduled health check for the Resend email pipeline.
// The schedule ("@daily") is declared in netlify.toml, NOT inline here.
//
// A scheduled function must never throw, so every branch returns 200.
// It pings the Resend API; if that fails it tries to email an alert.

export default async (_req) => {
  // Without a key we can't query Resend OR send an alert — just log.
  if (!process.env.RESEND_API_KEY) {
    console.error('healthcheck: RESEND_API_KEY missing')
    return new Response('RESEND_API_KEY missing', { status: 200 })
  }

  try {
    const res = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    })

    if (res.ok) {
      console.log('healthcheck: ok')
      return new Response('ok', { status: 200 })
    }

    // Resend reachable but unhealthy — try to alert.
    const status = `${res.status} ${res.statusText}`.trim()
    console.error(`healthcheck: Resend domains check failed (${status})`)

    const from = process.env.SEND_FROM || 'Day Night Dental <onboarding@resend.dev>'
    const to =
      process.env.ALERT_EMAIL ||
      process.env.ENQUIRY_TO ||
      'reception@daynightdental.co.uk'

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to,
          subject: 'ALERT: Day Night Dental form pipeline failing',
          text: `The Day Night Dental form pipeline health check failed.\n\nResend /domains responded with: ${status}\n\nForm submissions may not be delivered. Please investigate.`,
        }),
      })
    } catch (err) {
      console.error('healthcheck: failed to send alert email', err)
    }

    return new Response('unhealthy', { status: 200 })
  } catch (err) {
    console.error('healthcheck: request error', err)
    return new Response('error', { status: 200 })
  }
}

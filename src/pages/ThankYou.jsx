import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import FormSuccess from '../components/FormSuccess'
import { SITE, PRACTICE } from '../data/practice'

export default function ThankYou() {
  const { state } = useLocation()
  const firstName = state?.firstName

  useEffect(() => {
    // Conversion events, no-op until analytics loads (after cookie consent).
    window.gtag?.('event', 'generate_lead', { method: 'contact_form' })
    window.fbq?.('track', 'Lead')
  }, [])

  return (
    <>
      <Head>
        <title>Thank you | Day Night Dental</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${SITE}/thank-you/`} />
      </Head>
      <FormSuccess
        eyebrow="Enquiry received"
        heading={firstName ? `Thank you, ${firstName}.` : 'Thank you.'}
        lead="Your request has come through. A member of the team will call you back shortly to sort out a time that suits you."
        steps={[
          'We call you back within one working hour, during opening times.',
          'We confirm a time that works around you.',
          'You come in and meet the team.',
        ]}
        links={[
          { to: '/treatments/emergency-dentist', label: 'Emergency info' },
          { href: '/#treatments', label: 'Browse treatments' },
        ]}
      >
        <p className="dn-success-emergency">
          In bad pain right now? Call our 24/7 emergency line on <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a>.
        </p>
      </FormSuccess>
    </>
  )
}

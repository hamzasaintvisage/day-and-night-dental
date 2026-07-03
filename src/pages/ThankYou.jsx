import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { useLocation, useNavigate } from 'react-router-dom'
import FormSuccess from '../components/FormSuccess'
import { SITE, PRACTICE } from '../data/practice'

export default function ThankYou() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const submitted = state?.submitted
  const firstName = state?.firstName

  useEffect(() => {
    // Only a real form submission lands here with state.submitted. A direct hit,
    // refresh or shared link has no state: send them home rather than show a false
    // confirmation, and never fire a phantom conversion event.
    if (!submitted) { navigate('/', { replace: true }); return }
    window.gtag?.('event', 'generate_lead', { method: 'contact_form' })
    window.fbq?.('track', 'Lead')
  }, [submitted, navigate])

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
          'We aim to call you back within one working hour, during opening times.',
          'We confirm a time that works around you.',
          'You come in and meet the team.',
        ]}
        links={[
          { to: '/treatments/emergency-dentist/', label: 'Emergency info' },
          { href: '/#treatments', label: 'Browse treatments' },
        ]}
      >
        <p className="dn-success-emergency">
          If you are in severe pain, have facial swelling or a knocked-out tooth, call our 24/7 emergency line now on <a href={`tel:${PRACTICE.phoneE164}`}>{PRACTICE.phoneDisplay}</a> instead of waiting for a reply.
        </p>
      </FormSuccess>
    </>
  )
}

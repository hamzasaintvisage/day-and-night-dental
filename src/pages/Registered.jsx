import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { useLocation, useNavigate } from 'react-router-dom'
import FormSuccess from '../components/FormSuccess'
import { SITE, PRACTICE } from '../data/practice'

export default function Registered() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const submitted = state?.submitted
  const firstName = state?.firstName

  useEffect(() => {
    // Only a real registration lands here with state.submitted. A direct hit,
    // refresh or shared link has no state: send them home rather than show a false
    // confirmation, and never fire a phantom conversion event.
    if (!submitted) { navigate('/', { replace: true }); return }
    window.gtag?.('event', 'sign_up', { method: 'patient_registration' })
    window.fbq?.('track', 'CompleteRegistration')
  }, [submitted, navigate])

  return (
    <>
      <Head>
        <title>Welcome to the practice | Day Night Dental</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${SITE}/registered/`} />
      </Head>
      <FormSuccess
        eyebrow="Registration received"
        heading={firstName ? `Welcome, ${firstName}.` : 'Welcome to the practice.'}
        lead="That's your registration request through. The team aims to be in touch within one working hour to confirm your first appointment."
        steps={[
          'We aim to call you back within one working hour.',
          'We confirm your first appointment time.',
          'We send directions and what to bring.',
        ]}
        links={[
          { to: '/our-team/', label: 'Meet the team' },
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

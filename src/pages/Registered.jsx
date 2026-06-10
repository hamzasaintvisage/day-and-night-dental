import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import FormSuccess from '../components/FormSuccess'
import { SITE } from '../data/practice'

export default function Registered() {
  const { state } = useLocation()
  const firstName = state?.firstName

  useEffect(() => {
    // Conversion events — no-op until analytics loads (after cookie consent).
    window.gtag?.('event', 'sign_up', { method: 'patient_registration' })
    window.fbq?.('track', 'CompleteRegistration')
  }, [])

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
        lead="That's your registration request through. The team will be in touch within one working hour to confirm your first appointment."
        steps={[
          'We call you back within one working hour.',
          'We confirm your first appointment time.',
          'We send directions and what to bring.',
        ]}
        links={[
          { to: '/our-team', label: 'Meet the team' },
          { href: '/#treatments', label: 'Browse treatments' },
        ]}
      />
    </>
  )
}

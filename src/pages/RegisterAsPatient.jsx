import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import Register from '../sections/Register'
import { SITE, PRACTICE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd } from '../lib/schemas'

const url = `${SITE}/register-as-patient/`
const OG_IMAGE = `${SITE}/og-image.jpg?v=2`

export default function RegisterAsPatient() {
  return (
    <>
      <Head>
        <title>Register as a Patient | Day Night Dental, Glasgow</title>
        <meta name="description" content="Register as a new patient at Day Night Dental in Merchant City, Glasgow. Now welcoming new patients for every treatment, with day, evening and weekend appointments." />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Register as a Patient | Day Night Dental, Glasgow" />
        <meta property="og:description" content="Become a new patient at Day Night Dental in Merchant City, Glasgow. New patients welcome for every treatment." />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:title" content="Register as a Patient | Day Night Dental, Glasgow" />
        <meta name="twitter:description" content="Become a new patient at Day Night Dental in Merchant City, Glasgow. New patients welcome for every treatment." />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(dentistLd)}</script>
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Register as a Patient</span>
        </div>
      </nav>

      <h1 className="dn-visually-hidden">Register as a new patient at Day Night Dental, Glasgow</h1>
      <Register />

      {/* Dedicated register-page content (below the shared form section) */}
      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill day">After You Register</span>
            <h2 className="dn-display">What happens <em className="dn-hl-gold">next</em></h2>
            <p className="lead" style={{ maxWidth: '680px' }}>
              Registering takes about three minutes. Here is exactly what follows, so there
              are no surprises.
            </p>
          </div>
          <div className="tp-benefit-grid">
            <article className="tp-benefit day">
              <span className="bar" />
              <h3>1. We call you back</h3>
              <p>
                Once you have sent your details, our reception team gets in touch to arrange a
                first appointment that fits around your day, whether that is a morning, an
                evening or a weekend.
              </p>
            </article>
            <article className="tp-benefit night">
              <span className="bar" />
              <h3>2. Your first visit</h3>
              <p>
                A full assessment: an examination of your teeth, gums and soft tissues, any
                x-rays you need, and time to talk through anything that has been on your mind.
                Nothing rushed.
              </p>
            </article>
            <article className="tp-benefit day">
              <span className="bar" />
              <h3>3. A clear plan</h3>
              <p>
                You leave with a written plan and the cost of each item set out before any
                treatment goes ahead. Finance options are available to spread the cost, subject
                to status. Nothing happens until you are happy.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="dn-section tp-cta">
        <div className="dn-glow night" style={{ width: '480px', height: '480px', top: 0, right: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill night">Good To Know</span>
          <h2 className="dn-display">NHS, private, or <em className="dn-hl-blue">in pain right now?</em></h2>
          <p style={{ maxWidth: '760px' }}>
            We are welcoming new private patients now. NHS places are offered by waiting list
            when we have space, so tell us on the form if that is what you are after and we
            will keep you posted. And if you are in pain right now, do not wait to register.
            Call our 24/7 emergency line and we will help you first.
          </p>
          <div className="tp-cta-actions">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary">Call {PRACTICE.phoneDisplay}</a>
            <Link to="/treatments/emergency-dentist/" className="dn-btn">Emergency dentist info</Link>
          </div>
        </div>
      </section>
    </>
  )
}

import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import Team, { team } from '../sections/Team'
import { SITE, PRACTICE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd } from '../lib/schemas'

const url = `${SITE}/our-team/`
const OG_IMAGE = `${SITE}/og-image.jpg?v=2`

// Person schema per clinician (E-E-A-T for a medical site). Real names + GDC
// numbers go in src/sections/Team.jsx; add `gdc` to a member to emit it here.
// Placeholder entries (names like "[Principal Name]") are suppressed so no
// unfinished identity reaches Google; the node appears once a real name lands.
const realTeam = team.filter((m) => !/\[.*\]/.test(m.name))
const teamLd = realTeam.length
  ? {
      '@context': 'https://schema.org',
      '@graph': realTeam.map((m) => ({
        '@type': 'Person',
        name: m.name,
        jobTitle: m.role,
        worksFor: { '@id': `${SITE}/#dentist` },
        ...(m.gdc ? { identifier: { '@type': 'PropertyValue', propertyID: 'GDC', value: m.gdc } } : {}),
      })),
    }
  : null

export default function OurTeam() {
  return (
    <>
      <Head>
        <title>Our Team, Meet the Dentists | Day Night Dental, Glasgow</title>
        <meta name="description" content="Meet the GDC-registered dentists and team behind Day Night Dental in Merchant City, Glasgow, the people who look after your smile, day and night." />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Team | Day Night Dental, Glasgow" />
        <meta property="og:description" content="Meet the GDC-registered team behind Day Night Dental, Glasgow." />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:title" content="Our Team | Day Night Dental, Glasgow" />
        <meta name="twitter:description" content="Meet the GDC-registered team behind Day Night Dental, Glasgow." />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(dentistLd)}</script>
      </Head>
      {teamLd && (
        <Head>
          <script type="application/ld+json">{jsonLd(teamLd)}</script>
        </Head>
      )}

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Our Team</span>
        </div>
      </nav>

      <h1 className="dn-visually-hidden">Meet the dental team at Day Night Dental in Glasgow</h1>
      <Team />

      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill day">What We Do</span>
            <h2 className="dn-display">One team for emergencies <em className="dn-hl-gold">and</em> everyday care</h2>
          </div>
          <p style={{ maxWidth: '720px' }}>
            The team here looks after both sides of dentistry. There are the urgent problems: toothache that
            will not settle, broken teeth, swelling, lost crowns. And there is the everyday work that keeps
            you out of trouble in the first place: check-ups, fillings, and cosmetic and implant treatment
            when you choose it. Everything happens under one roof at 80 Hutcheson Street in Merchant City,
            a short walk from Argyle Street and Queen Street stations and St Enoch subway, and the practice
            is open day and night, every day.
          </p>
        </div>
      </section>

      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill night">Your Protection</span>
            <h2 className="dn-display">Regulated care you can <em className="dn-hl-blue">check yourself</em></h2>
          </div>
          <p style={{ maxWidth: '720px' }}>
            Every dentist who treats you is registered with the General Dental Council, the UK regulator for
            dental professionals. That registration is not a formality. It means recognised qualifications,
            professional indemnity, ongoing training every year, and clear standards the whole team is
            accountable to. You can look up any dentist on the GDC's public register before you ever sit in
            the chair, and we would encourage you to.
          </p>
        </div>
      </section>

      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill day">Before You Visit</span>
            <h2 className="dn-display">Nervous, or not sure <em className="dn-hl-gold">what to expect?</em></h2>
          </div>
          <p style={{ maxWidth: '720px' }}>
            Nervous patients are welcome here, and you will not be rushed. Tell us when you book and the team
            will go at your pace: everything is explained before it happens, you can ask for a pause at any
            point, and nothing goes ahead until you say so. If it helps, a first visit can simply be a look
            and a chat, with no treatment at all.
          </p>
          <p style={{ maxWidth: '720px' }}>
            When you call, just tell us what is happening. We will ask a few quick questions to understand
            how urgent things are, give you practical advice for the meantime, and offer you a time to come
            in. We hold same-day emergency slots every day and aim to see you quickly, whatever the hour.
          </p>
        </div>
      </section>

      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill day">Become a Patient</span>
          <h2 className="dn-display">Care from a team that <em className="dn-hl-gold">knows you</em></h2>
          <p>Register today and you'll see the same friendly faces every time you visit.</p>
          <div className="tp-cta-actions">
            <Link to="/register-as-patient/" className="dn-btn primary">Register as a patient<span className="arrow">→</span></Link>
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn">Call {PRACTICE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}

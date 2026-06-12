import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import Team, { team } from '../sections/Team'
import { SITE, PRACTICE } from '../data/practice'

const url = `${SITE}/our-team/`
const OG_IMAGE = `${SITE}/og-image.jpg`

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
      {teamLd && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(teamLd)}</script>
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

      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow">Become a Patient</span>
          <h2 className="dn-display">Care from a team that <em>knows you</em></h2>
          <p>Register today and you'll see the same friendly faces every time you visit.</p>
          <div className="tp-cta-actions">
            <Link to="/register-as-patient" className="dn-btn primary">Register as a patient<span className="arrow">→</span></Link>
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn">Call {PRACTICE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}

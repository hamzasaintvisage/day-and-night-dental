import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE, PRACTICE, AREAS_SERVED } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd } from '../lib/schemas'

const url = `${SITE}/areas-served/`
const OG_IMAGE = `${SITE}/og-image.jpg?v=2`

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: url },
  ],
}

// The full Dentist business node, with this page's fuller area list overriding
// the default. Same @id as the homepage, so the entity stays single + consistent.
const areasServedLd = {
  ...dentistLd,
  areaServed: AREAS_SERVED.map((a) => ({ '@type': 'Place', name: a })),
}

const areas = [
  { name: 'Merchant City', note: 'This is our home. We’re in central Glasgow, right by Queen Street station, the Trongate and George Square.' },
  { name: 'Glasgow City Centre', note: 'Minutes from Buchanan Street, St Enoch and the main office districts.' },
  { name: 'Glasgow West End', note: 'Easy to reach from Finnieston, Hillhead, Partick and the university quarter.' },
  { name: 'Dennistoun & the East End', note: 'A short hop along the High Street and Duke Street.' },
  { name: 'The Southside', note: 'Quick access over the river from Shawlands, Govanhill and the Gorbals.' },
  { name: 'Finnieston', note: 'Convenient for the SEC, the Hydro and the waterfront.' },
]

export default function AreasServed() {
  return (
    <>
      <Head>
        <title>Areas We Serve in Glasgow | Day Night Dental</title>
        <meta name="description" content="Day Night Dental serves Merchant City and all of Glasgow, from the city centre to the West End. 24/7 emergency and cosmetic dentistry in Glasgow." />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Areas We Serve in Glasgow | Day Night Dental" />
        <meta property="og:description" content="A 24/7 dentist in the heart of Merchant City, serving the whole of Glasgow." />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:title" content="Areas We Serve in Glasgow | Day Night Dental" />
        <meta name="twitter:description" content="A 24/7 dentist in the heart of Merchant City, serving the whole of Glasgow." />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(breadcrumbLd)}</script>
        <script type="application/ld+json">{jsonLd(areasServedLd)}</script>
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Areas We Serve</span>
        </div>
      </nav>

      <section className="tp-hero">
        <div className="dn-glow night" style={{ width: '520px', height: '520px', top: '-10%', right: '-8%', opacity: 0.1 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill night tag">Glasgow &amp; Merchant City</span>
          <h1 className="dn-display" style={{ maxWidth: '900px' }}>
            A 24-hour dentist for the <em className="dn-hl-blue">whole of Glasgow</em>
          </h1>
          <p className="lead" style={{ maxWidth: '640px' }}>
            We’re right in the heart of Merchant City, so we’re an easy trip from anywhere in Glasgow. And if
            something goes wrong at 3am, our 24-hour emergency line is always open.
          </p>
          <div className="tp-hero-actions">
            <a href="/#contact" className="dn-btn primary">Book an Appointment<span className="arrow">→</span></a>
            <a href={`tel:${PRACTICE.phoneE164}`} className="tp-hero-ghost">Call {PRACTICE.phoneDisplay}<span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="dn-section dn-areas">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill day">Across the City</span>
            <h2 className="dn-display">Patients we welcome from across <em className="dn-hl-gold">Glasgow</em></h2>
          </div>
          <div className="tp-benefit-grid">
            {areas.map((a) => (
              <article className="tp-benefit" key={a.name}>
                <span className="bar" />
                <h3>{a.name}</h3>
                <p>{a.note}</p>
              </article>
            ))}
          </div>
          <div className="dn-areas-grid" style={{ marginTop: '2.5rem' }}>
            {AREAS_SERVED.map((a) => <span className="dn-area-chip" key={a}>{a}</span>)}
          </div>
        </div>
      </section>

      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill night">Whenever, Wherever</span>
          <h2 className="dn-display">In pain in Glasgow <em className="dn-hl-blue">right now?</em></h2>
          <p>Do not wait it out. Our emergency line is open day and night, with same-day appointments held back across the city.</p>
          <div className="tp-cta-actions">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary">Call {PRACTICE.phoneDisplay}</a>
            <Link to="/treatments/emergency-dentist/" className="dn-btn">Emergency dentist info</Link>
          </div>
        </div>
      </section>
    </>
  )
}

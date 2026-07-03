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
  {
    name: 'Merchant City',
    note: (
      <>
        This is home. The practice sits at 80 Hutcheson Street, in the middle of Merchant City, a couple of
        minutes’ walk from Queen Street and Argyle Street stations and the St Enoch subway. If you live or work
        around the Trongate or George Square, you are close enough to walk here at any hour, which matters when
        a toothache decides not to wait for morning. For our nearest neighbours, we are quite literally the
        dentist around the corner.
      </>
    ),
  },
  {
    name: 'Glasgow City Centre',
    note: (
      <>
        If you work in the city centre, we are the appointment that fits around your day: a few minutes on foot
        from Buchanan Street, St Enoch and the main office blocks, so a check-up can slot into a lunch break
        without drama. Late at night the city centre is also where the taxis keep circulating long after the
        trains stop, so reaching an <Link to="/treatments/emergency-dentist/">emergency dentist</Link> at 2am is
        rarely the hard part. Deciding to stop putting up with the pain usually is.
      </>
    ),
  },
  {
    name: 'Glasgow West End',
    note: (
      <>
        From Hillhead, Partick and the university quarter, the subway does most of the work: ride round to
        St Enoch or Buchanan Street and we are a short walk away. Once the subway has finished for the night, a
        taxi from the West End into Merchant City is a quick, direct run, and buses along the main corridors all
        point towards the city centre. Plenty of West End patients also{' '}
        <Link to="/register-as-patient/">register with us</Link> as their regular practice rather than only
        calling us in a crisis.
      </>
    ),
  },
  {
    name: 'Dennistoun & the East End',
    note: (
      <>
        Dennistoun is one of the few neighbourhoods where you can genuinely walk to a 24-hour dentist: a
        straightforward stroll down Duke Street and along the Trongate ends at our door. Buses along Duke Street
        and the High Street drop you close by, and at night a taxi across town from the East End is a short hop.
        For a part of the city with deep roots and busy family life, having urgent dental care this close is a
        practical comfort, not a luxury.
      </>
    ),
  },
  {
    name: 'The Southside',
    note: (
      <>
        From Shawlands, Govanhill and the Gorbals, the river is not the barrier it looks. Trains from across the
        Southside run into Central, a short walk from the practice, and by car or taxi you cross one bridge and
        you are here. If a filling comes out on a Sunday evening in Shawlands, you do not have to sit it out
        until Monday: our <Link to="/treatments/emergency-dentist/">emergency dentist page</Link> explains what
        we treat and how to reach us out of hours.
      </>
    ),
  },
  {
    name: 'Finnieston',
    note: (
      <>
        Finnieston is one straight run along Argyle Street from our door, which makes us convenient for the SEC,
        the Hydro and the waterfront as well as the tenements in between. If a crown gives way before a gig or a
        conference dinner, a short taxi ride east along the river brings you to us, and you can head back the
        same way. For residents, the same trip works just as well for routine care as it does in an emergency.
      </>
    ),
  },
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
            We’re right in the heart of Merchant City, so we’re an easy trip from anywhere in Glasgow, by
            train, subway, bus, car or a late-night taxi. And if something goes wrong at 3am, the journey to
            reach us is exactly the same short one.
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
            <p className="lead" style={{ maxWidth: '720px' }}>
              Glasgow is a compact city, and Merchant City sits near the middle of its transport map. Wherever
              you start from, the trip tends to end the same way: a short walk from a station or a quick taxi
              to our door, and we are open day and night, every day. Here is what the journey looks like from
              each side of the city.
            </p>
          </div>
          <div className="tp-benefit-grid">
            {areas.map((a, i) => (
              <article className={`tp-benefit ${i % 2 ? 'night' : 'day'}`} key={a.name}>
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

      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill night">Find Us</span>
            <h2 className="dn-display">Right in the heart of <em className="dn-hl-blue">Merchant City</em></h2>
            <p className="lead" style={{ maxWidth: '680px' }}>
              We are at 80 Hutcheson Street, a couple of minutes on foot from Queen Street and
              Argyle Street stations and the St Enoch subway, and a short taxi from anywhere in
              Glasgow at any hour of the day or night.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 440px', minWidth: 0, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', minHeight: '400px' }}>
              <iframe
                src={PRACTICE.mapEmbed}
                title="Day Night Dental on the map, 80 Hutcheson Street, Merchant City, Glasgow"
                loading="lazy"
                style={{ width: '100%', height: '100%', minHeight: '400px', border: 0, display: 'block' }}
              />
            </div>
            <aside style={{ flex: '1 1 300px', minWidth: 0, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <span className="dn-eyebrow day">Visit Us</span>
                <address style={{ fontStyle: 'normal', lineHeight: 1.7, marginTop: '0.6rem' }}>
                  {PRACTICE.streetAddress}<br />
                  {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
                </address>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.55rem', lineHeight: 1.5 }}>
                <li><strong>Emergency care:</strong> open 24 hours, 7 days</li>
                <li><strong>Routine appointments:</strong> by appointment</li>
                <li><strong>NHS places:</strong> waiting list, when available</li>
              </ul>
              <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary" style={{ marginTop: 'auto' }}>
                Call {PRACTICE.phoneDisplay}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill night">Whenever, Wherever</span>
          <h2 className="dn-display">In pain in Glasgow <em className="dn-hl-blue">right now?</em></h2>
          <p>Do not wait it out. Our emergency line is open day and night, we hold same-day emergency slots every day, and we aim to see you quickly wherever in Glasgow you are starting from.</p>
          <div className="tp-cta-actions">
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary">Call {PRACTICE.phoneDisplay}</a>
            <Link to="/treatments/emergency-dentist/" className="dn-btn">Emergency dentist info</Link>
          </div>
        </div>
      </section>
    </>
  )
}

import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE, PRACTICE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd } from '../lib/schemas'
import { TREATMENTS, treatmentTitle, treatmentTag } from '../data/treatments'

const url = `${SITE}/treatments/`
const SEO = {
  title: 'Dental Treatments in Glasgow | Day Night Dental',
  description:
    'Every treatment we offer in Merchant City, Glasgow, in one place: emergency care, cosmetic and smile treatments, Invisalign, implants and everyday general dentistry.',
}

// Slug groupings for the listing (titles/tags come from the central registry).
const GROUPS = [
  { eyebrow: "When it can't wait", heading: 'Emergency & urgent care', slugs: ['emergency-dentist'] },
  {
    eyebrow: 'Smile design',
    heading: 'Cosmetic & straightening',
    slugs: ['cosmetic-dentistry', 'composite-bonding', 'porcelain-veneers', 'smile-makeover', 'teeth-whitening', 'invisalign'],
  },
  {
    eyebrow: 'Foundation care',
    heading: 'General, restorative & implants',
    slugs: [
      'general-dentistry', 'dental-check-ups', 'dental-hygiene', 'white-fillings', 'root-canal-treatment',
      'tooth-extraction', 'dental-crowns', 'dental-bridges', 'dentures', 'gum-disease-treatment',
      'inlays-onlays', 'dental-implants', 'childrens-dentistry', 'nervous-patients',
    ],
  },
]

export default function TreatmentsIndex() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Treatments', item: url },
    ],
  }
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dental treatments at Day Night Dental',
    itemListElement: TREATMENTS.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.title, url: `${SITE}/treatments/${t.slug}/`,
    })),
  }

  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(dentistLd)}</script>
        <script type="application/ld+json">{jsonLd(breadcrumbLd)}</script>
        <script type="application/ld+json">{jsonLd(itemListLd)}</script>
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Treatments</span>
        </div>
      </nav>

      <section className="tp-hero">
        <div className="dn-glow day" style={{ width: '520px', height: '520px', top: '-10%', left: '-8%', opacity: 0.1 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill day tag">Our Treatments</span>
          <h1 className="dn-display">Dental treatments in Glasgow</h1>
          <p className="lead">
            From a knocked-out tooth at 2am to a wedding smile booked months ahead, here is everything we do under one
            roof in Merchant City. Pick a treatment to see how it works, what to expect and the honest trade-offs.
          </p>
          <div className="tp-hero-actions">
            <a href="/#contact" className="dn-btn primary">Book a Consultation<span className="arrow">→</span></a>
            <a href={`tel:${PRACTICE.phoneE164}`} className="tp-hero-ghost">Or call {PRACTICE.phoneDisplay}<span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {GROUPS.map((g, gi) => (
        <section className={`dn-section${gi % 2 ? ' tp-band' : ''}`} key={g.heading}>
          <div className="dn-container">
            <div className="tp-section-head">
              <span className={`dn-eyebrow dn-pill ${gi % 2 ? 'night' : 'day'}`}>{g.eyebrow}</span>
              <h2 className="dn-display">{g.heading}</h2>
            </div>
            <div className="tp-related-grid">
              {g.slugs.map((slug) => (
                <Link className="tp-related-card" to={`/treatments/${slug}/`} key={slug}>
                  <span className="tag">{treatmentTag(slug)}</span>
                  <h3>{treatmentTitle(slug)}</h3>
                  <span className="go">View treatment →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-glow night" style={{ width: '480px', height: '480px', bottom: 0, right: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow dn-pill night">Ready When You Are</span>
          <h2 className="dn-display">Not sure which you need?</h2>
          <p>Tell us what is going on and we will point you to the right treatment, or see you for a consultation in Merchant City, Glasgow.</p>
          <div className="tp-cta-actions">
            <a href="/#contact" className="dn-btn primary">Request an Appointment<span className="arrow">→</span></a>
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn">Call {PRACTICE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}

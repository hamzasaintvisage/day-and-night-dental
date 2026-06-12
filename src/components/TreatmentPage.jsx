import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE, PRACTICE } from '../data/practice'

const DENTIST_ID = `${SITE}/#dentist`
const OG_IMAGE = `${SITE}/og-image.jpg`

// Decorative hero mark, sun (day) or moon (night), each cradling the split tooth.
function HeroMark({ side }) {
  const accent = side === 'night' ? 'var(--dn-night)' : 'var(--dn-day)'
  return (
    <div className="tp-hero-mark" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {side === 'night' ? (
          <path d="M 130 28 A 74 74 0 1 0 130 172 A 56 56 0 1 1 130 28 Z"
            stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" />
        ) : (
          <>
            <circle cx="100" cy="100" r="60" stroke={accent} strokeWidth="1" opacity="0.5" />
            <g stroke={accent} strokeWidth="1.5" strokeLinecap="round">
              <line x1="100" y1="14" x2="100" y2="34" /><line x1="40" y1="40" x2="54" y2="54" />
              <line x1="14" y1="100" x2="34" y2="100" /><line x1="40" y1="160" x2="54" y2="146" />
              <line x1="100" y1="186" x2="100" y2="166" /><line x1="160" y1="160" x2="146" y2="146" />
              <line x1="186" y1="100" x2="166" y2="100" /><line x1="160" y1="40" x2="146" y2="54" />
            </g>
          </>
        )}
        <g strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M 100 70 Q 84 68, 78 82 Q 73 100, 76 122 Q 79 140, 84 146 Q 89 152, 92 140 Q 95 128, 100 125 L 100 125 Z" stroke="var(--dn-day)" />
          <path d="M 100 70 Q 116 68, 122 82 Q 127 100, 124 122 Q 121 140, 116 146 Q 111 152, 108 140 Q 105 128, 100 125 L 100 125 Z" stroke="var(--dn-night)" />
        </g>
      </svg>
    </div>
  )
}

/**
 * Data-driven dedicated treatment page. Each treatment route renders this with
 * its own `data` object, so layout + SEO stay consistent and DRY.
 * Optional data fields: ctaPrimaryLabel, priceFrom, reviewer, lastReviewed (ISO),
 * lastReviewedLabel, procedureType.
 */
export default function TreatmentPage({ data }) {
  const url = `${SITE}/treatments/${data.slug}/`

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE}/#treatments` },
      { '@type': 'ListItem', position: 3, name: data.h1Plain, item: url },
    ],
  }
  // MedicalProcedure, references the single Dentist entity by @id (no duplicated provider).
  const procedureLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: data.h1Plain,
    description: data.seo.description,
    url,
    provider: { '@id': DENTIST_ID },
    ...(data.lastReviewed ? { lastReviewed: data.lastReviewed } : {}),
    ...(data.reviewer ? { reviewedBy: { '@type': 'Person', name: data.reviewer } } : {}),
  }
  // Service/Offer, signals the priced, bookable nature; price emitted only when real.
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: data.h1Plain,
    provider: { '@id': DENTIST_ID },
    areaServed: { '@type': 'City', name: 'Glasgow' },
    ...(data.priceFrom
      ? { offers: { '@type': 'Offer', priceCurrency: 'GBP', price: data.priceFrom, availability: 'https://schema.org/InStock' } }
      : {}),
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Head>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.seo.title} />
        <meta property="og:description" content={data.seo.description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Day Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      {/* Structured data, emitted into <head> (via Head) for rich results */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(procedureLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      {/* Breadcrumb */}
      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <a href="/#treatments">Treatments</a>
          <span className="crumb-sep">/</span>
          <span className="current">{data.h1Plain}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="tp-hero">
        <div className={`dn-glow ${data.side}`} style={{ width: '520px', height: '520px', top: '-10%', left: '-8%', opacity: 0.1 }} />
        <div className="dn-container">
          <div className="tp-hero-grid">
            <div>
              <span className={`dn-eyebrow ${data.side} tag`}>{data.tag}</span>
              <h1 className="dn-display">{data.title}</h1>
              {data.lastReviewedLabel && (
                <p className="tp-byline">
                  Clinically reviewed{data.reviewer ? <> by <strong>{data.reviewer}</strong></> : ''} · Last updated {data.lastReviewedLabel}
                </p>
              )}
              <p className="lead">{data.lead}</p>
              <div className="tp-hero-actions">
                <a href="/#contact" className="dn-btn primary">{data.ctaPrimaryLabel || 'Book a Consultation'}<span className="arrow">→</span></a>
                <a href={`tel:${PRACTICE.phoneE164}`} className="tp-hero-ghost">Or call {PRACTICE.phoneDisplay}<span aria-hidden="true">→</span></a>
              </div>
            </div>
            <HeroMark side={data.side} />
          </div>

          <div className="tp-meta">
            {data.meta.map((m, i) => (
              <div className="item" key={i}>
                <span className="k">{m.k}</span>
                <span className={`v ${m.tone || ''}`}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-overview-grid">
            <div className="tp-prose">
              <div className="tp-section-head">
                <span className="dn-eyebrow">{data.overviewEyebrow || 'The Treatment'}</span>
                <h2 className="dn-display">{data.overviewHeading}</h2>
              </div>
              {data.overview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <aside className="tp-facts">
              <h3>At a glance</h3>
              <dl>
                {data.facts.map((f, i) => (
                  <div className="fact" key={i}>
                    <dt>{f.dt}</dt>
                    <dd>{f.dd}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Concern / problem section (deep-linked from the homepage concern cards) */}
      {data.concern && (
        <section id="concern" className="dn-section">
          <div className="dn-container">
            <div className="tp-overview-grid">
              <div className="tp-prose">
                <div className="tp-section-head">
                  <span className="dn-eyebrow night">, , , Is This You?, , , </span>
                  <h2 className="dn-display">{data.concern.heading}</h2>
                </div>
                {data.concern.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {data.concern.symptoms && (
                <aside className="tp-facts">
                  <h3>You might recognise…</h3>
                  <ul className="tp-concern-list">
                    {data.concern.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="dn-section tp-benefits">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow day">Why Patients Choose It</span>
            <h2 className="dn-display">{data.benefitsHeading}</h2>
          </div>
          <div className="tp-benefit-grid">
            {data.benefits.map((b, i) => (
              <article className="tp-benefit" key={i}>
                <span className="bar" />
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow">How It Works</span>
            <h2 className="dn-display">{data.stepsHeading}</h2>
          </div>
          <div className="tp-steps">
            {data.steps.map((s, i) => (
              <div className="tp-step" key={i}>
                <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="dn-section tp-faq">
        <div className="dn-container">
          <div className="tp-section-head" style={{ textAlign: 'center' }}>
            <span className="dn-eyebrow night">Common Questions</span>
            <h2 className="dn-display" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{data.faqHeading}</h2>
          </div>
          <div className="tp-faq-list">
            {data.faqs.map((f, i) => (
              <details key={i}>
                <summary>{f.q}<span className="icon" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow">Explore More</span>
            <h2 className="dn-display">Related <em>treatments</em></h2>
          </div>
          <div className="tp-related-grid">
            {data.related.map((r) => (
              <Link className="tp-related-card" to={`/treatments/${r.slug}`} key={r.slug}>
                <span className="tag">{r.tag}</span>
                <h3>{r.title}</h3>
                <span className="go">View treatment →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dn-section tp-cta">
        <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
        <div className="dn-glow night" style={{ width: '480px', height: '480px', bottom: 0, right: '8%', opacity: 0.08 }} />
        <div className="dn-container">
          <span className="dn-eyebrow">Ready When You Are</span>
          <h2 className="dn-display">{data.cta.heading}</h2>
          <p>{data.cta.sub}</p>
          <div className="tp-cta-actions">
            <a href="/#contact" className="dn-btn primary">Request an Appointment<span className="arrow">→</span></a>
            <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn">Call {PRACTICE.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}

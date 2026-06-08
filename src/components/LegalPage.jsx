import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE } from '../data/practice'

// Shared layout for legal / policy pages (Privacy, Complaints, Terms, Accessibility).
export default function LegalPage({ slug, title, description, updated, intro, sections }) {
  const url = `${SITE}/${slug}`
  return (
    <>
      <Head>
        <title>{title} | Day &amp; Night Dental</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">{title}</span>
        </div>
      </nav>

      <section className="dn-section">
        <div className="dn-container dn-legal">
          <h1 className="dn-display">{title}</h1>
          {updated && <p className="dn-legal-updated">Last updated: {updated}</p>}
          {intro && <p className="dn-legal-intro">{intro}</p>}
          {sections.map((s, i) => (
            <div className="dn-legal-section" key={i}>
              {s.h && <h2>{s.h}</h2>}
              {s.body.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

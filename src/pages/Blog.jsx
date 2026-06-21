import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import { SITE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'

const url = `${SITE}/blog/`

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Advice & Guides', item: url },
  ],
}

export default function Blog() {
  return (
    <>
      <Head>
        <title>Dental Advice &amp; Guides | Day Night Dental, Glasgow</title>
        <meta name="description" content="Honest dental advice from our Glasgow team, emergency care, the cost of treatments, Invisalign, implants and more. From Day Night Dental in Merchant City." />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dental Advice & Guides | Day Night Dental" />
        <meta property="og:description" content="Honest dental advice from our Glasgow team." />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={`${SITE}/og-image.jpg?v=2`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE}/og-image.jpg?v=2`} />
        <meta name="twitter:title" content="Dental Advice & Guides | Day Night Dental" />
        <meta name="twitter:description" content="Honest dental advice from our Glasgow team." />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(breadcrumbLd)}</script>
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Advice</span>
        </div>
      </nav>

      <section className="dn-section">
        <div className="dn-container">
          <div className="tp-section-head">
            <span className="dn-eyebrow dn-pill day">Advice &amp; Guides</span>
            <h1 className="dn-display">Dental advice from our <em className="dn-hl-gold">Glasgow</em> team</h1>
          </div>
          <div className="dn-blog-grid">
            {posts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}/`} className="dn-blog-card">
                <span className="meta">{p.date} · {p.readTime}</span>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <span className="go">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

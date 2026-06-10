import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { SITE, PRACTICE } from '../data/practice'
import { posts } from '../data/blog'

const TREATMENT_TITLES = {
  'emergency-dentist': 'Emergency Dentist',
  'dental-implants': 'Dental Implants',
  'general-dentistry': 'General Dentistry',
  'cosmetic-dentistry': 'Cosmetic Dentistry',
  'invisalign': 'Invisalign',
  'teeth-whitening': 'Teeth Whitening',
}

// slug -> title for blog-to-blog "Related reading" links
const POST_TITLES = Object.fromEntries(posts.map((p) => [p.slug, p.title]))

export default function ArticleLayout({ post }) {
  const url = `${SITE}/blog/${post.slug}/`
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { '@type': 'Organization', name: PRACTICE.name },
    publisher: { '@id': `${SITE}/#dentist` },
    mainEntityOfPage: url,
    image: `${SITE}/og-image.jpg`,
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }
  const faqLd = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      <Head>
        <title>{post.title} | Day Night Dental</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={`${SITE}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE}/og-image.jpg`} />
      </Head>
      <Head>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link to="/blog">Blog</Link>
          <span className="crumb-sep">/</span>
          <span className="current">{post.title}</span>
        </div>
      </nav>

      <article className="dn-section">
        <div className="dn-container dn-legal">
          <h1 className="dn-display">{post.title}</h1>
          <p className="dn-legal-updated">{post.date} · {post.readTime}</p>
          <p className="dn-legal-intro">{post.intro}</p>
          {post.sections.map((s, i) => (
            <div className="dn-legal-section" key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          ))}

          {post.faqs && post.faqs.length > 0 && (
            <div className="dn-legal-section">
              <h2>Common questions</h2>
              {post.faqs.map((f, i) => (
                <div className="dn-article-faq" key={i}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          )}

          {post.related && post.related.length > 0 && (
            <div className="dn-article-related">
              <span className="dn-eyebrow">Related treatments</span>
              <div className="dn-article-related-links">
                {post.related.map((slug) => (
                  <Link key={slug} to={`/treatments/${slug}`}>{TREATMENT_TITLES[slug]} →</Link>
                ))}
              </div>
            </div>
          )}

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="dn-article-related">
              <span className="dn-eyebrow">Related reading</span>
              <div className="dn-article-related-links">
                {post.relatedPosts.map((slug) => POST_TITLES[slug] && (
                  <Link key={slug} to={`/blog/${slug}`}>{POST_TITLES[slug]} →</Link>
                ))}
              </div>
            </div>
          )}

          <div className="dn-article-cta">
            <p>Need to be seen? We're open day and night in Merchant City, Glasgow.</p>
            <div className="tp-cta-actions">
              <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary">Call {PRACTICE.phoneDisplay}</a>
              <Link to="/register-as-patient" className="dn-btn">Register as a patient</Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

import { Link } from 'react-router-dom'

// Shared "thank you" chrome used by /thank-you and /registered.
// Animated branded checkmark (new palette, gated by prefers-reduced-motion globally),
// a "what happens next" strip, optional detail block, and next-step links.
export default function FormSuccess({ eyebrow, heading, lead, steps = [], children, links = [] }) {
  return (
    <section className="dn-section dn-formsuccess">
      <div className="dn-glow day" style={{ width: '480px', height: '480px', top: 0, left: '8%', opacity: 0.08 }} />
      <div className="dn-glow night" style={{ width: '480px', height: '480px', bottom: 0, right: '8%', opacity: 0.08 }} />
      <div className="dn-container">
        <div className="dn-success-card">
          <div className="dn-success-mark" aria-hidden="true">
            <svg width="76" height="76" viewBox="0 0 72 72" fill="none">
              <circle className="dn-check-circle" cx="36" cy="36" r="33" stroke="url(#fs-grad)" strokeWidth="1.5" />
              <path className="dn-check-path" d="M22 37 L32 47 L51 26" stroke="url(#fs-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="fs-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--dn-day)" />
                  <stop offset="1" stopColor="var(--dn-night)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {eyebrow && <span className="dn-eyebrow">{eyebrow}</span>}
          <h1 className="dn-display">{heading}</h1>
          {lead && <p className="dn-success-lead">{lead}</p>}

          {steps.length > 0 && (
            <div className="dn-success-steps">
              {steps.map((s, i) => (
                <div className="dn-success-step" key={i}>
                  <span className="n">{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          )}

          {children}

          {links.length > 0 && (
            <div className="dn-success-links">
              {links.map((l) => {
                const dest = l.to || l.href
                const cls = l.primary ? 'dn-btn primary' : 'dn-btn'
                const label = <>{l.label}{l.primary && <span className="arrow"> →</span>}</>
                // External protocols (tel:, mailto:, https:) get a plain <a>;
                // in-app routes/hashes stay with <Link> for SPA nav.
                return /^(https?:|tel:|mailto:)/.test(dest || '')
                  ? <a key={l.label} href={dest} className={cls}>{label}</a>
                  : <Link key={l.label} to={dest} className={cls}>{label}</Link>
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import { Component } from 'react'
import { PRACTICE } from '../data/practice'

// Last line of defence: if a route throws during render or hydration, show a
// minimal, on-brand fallback that STILL surfaces the 24/7 phone line, instead of
// letting React unmount the tree and leave a blank page. Resets per route (the
// parent passes key={pathname}), so navigating away recovers automatically.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (typeof console !== 'undefined') console.error('Render error caught by boundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <section
        className="dn-section"
        style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1.1rem' }}
      >
        <h1 className="dn-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Something went wrong on this page</h1>
        <p style={{ color: 'var(--dn-bone-dim)', maxWidth: '42ch' }}>
          Sorry about that. If you need urgent dental help, call our 24/7 line straight away, we&rsquo;re here around the clock.
        </p>
        <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
          <span className="dn-btn-pulse" aria-hidden="true" />Call {PRACTICE.phoneDisplay}
        </a>
        <a href="/" className="dn-btn">Back to home</a>
      </section>
    )
  }
}

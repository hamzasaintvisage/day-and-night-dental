import { describe, it, expect } from 'vitest'
import { SITE, PRACTICE, AREAS_SERVED } from '../data/practice.js'

// Guards the single-source-of-truth data: catches canonical-domain drift and
// NAP regressions (the local-SEO signals that must never silently change).
describe('practice data (single source of truth)', () => {
  it('canonical SITE is the apex host over https, no www', () => {
    expect(SITE).toBe('https://daynightdental.co.uk')
  })

  it('has the core NAP fields populated', () => {
    expect(PRACTICE.name).toBe('Day Night Dental')
    expect(PRACTICE.streetAddress).toBeTruthy()
    expect(PRACTICE.postcode).toBeTruthy()
    expect(PRACTICE.phoneDisplay).toMatch(/\d/)
    expect(PRACTICE.phoneE164).toMatch(/^\+44\d+$/)
  })

  it('serves at least one Glasgow area', () => {
    expect(Array.isArray(AREAS_SERVED)).toBe(true)
    expect(AREAS_SERVED.length).toBeGreaterThan(0)
  })
})

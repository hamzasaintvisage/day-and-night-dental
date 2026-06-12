import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { buildEnquiryExtras, submitEnquiry } from '../lib/submitEnquiry.js'
import { jsonLd } from '../lib/jsonLd.js'

describe('buildEnquiryExtras', () => {
  it('returns null elapsed when loadedAt is 0', () => {
    const result = buildEnquiryExtras(0)
    expect(result.elapsed).toBeNull()
    expect(result['bot-field']).toBe('')
  })

  it('returns positive elapsed when loadedAt is set', () => {
    const past = Date.now() - 3000
    const result = buildEnquiryExtras(past)
    expect(result.elapsed).toBeGreaterThanOrEqual(3000)
    expect(result['bot-field']).toBe('')
  })

  it('passes through a honeypot value', () => {
    const result = buildEnquiryExtras(0, 'bot-was-here')
    expect(result['bot-field']).toBe('bot-was-here')
  })
})

describe('jsonLd', () => {
  it('serialises an object to JSON', () => {
    const obj = { '@context': 'https://schema.org', '@type': 'Dentist', name: 'Day Night Dental' }
    const out = jsonLd(obj)
    expect(JSON.parse(out)).toEqual(obj)
  })

  it('escapes < so a rogue </script> cannot break out of the tag', () => {
    const out = jsonLd({ name: '</script><script>alert(1)</script>' })
    expect(out).not.toContain('</')
    expect(out).toContain('\\u003c')
  })

  it('escapes > and &', () => {
    const out = jsonLd({ val: 'a > b & c' })
    expect(out).not.toContain('>')
    expect(out).not.toContain('&')
    expect(out).toContain('\\u003e')
    expect(out).toContain('\\u0026')
  })
})

describe('submitEnquiry', () => {
  let fetchSpy

  beforeEach(() => {
    fetchSpy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    vi.stubGlobal('fetch', fetchSpy)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts to /api/send-enquiry.php with the right shape', async () => {
    await submitEnquiry('contact', { name: 'Alice', message: 'hi' })

    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, opts] = fetchSpy.mock.calls[0]
    expect(url).toBe('/api/send-enquiry.php')
    expect(opts.method).toBe('POST')
    expect(opts.headers['Content-Type']).toBe('application/json')

    const body = JSON.parse(opts.body)
    expect(body.formType).toBe('contact')
    expect(body.name).toBe('Alice')
  })

  it('merges extras into the request body', async () => {
    await submitEnquiry('register', { firstName: 'Bob' }, { elapsed: 4200, 'bot-field': '' })

    const body = JSON.parse(fetchSpy.mock.calls[0][1].body)
    expect(body.elapsed).toBe(4200)
    expect(body['bot-field']).toBe('')
  })

  it('returns the raw Response', async () => {
    const res = await submitEnquiry('contact', {})
    expect(res.ok).toBe(true)
  })
})

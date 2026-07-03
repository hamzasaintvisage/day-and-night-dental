// Post-build smoke check + launch gate (run via `npm run check`; `npm run check:launch` = go-live mode).
// HARD failures (always): missing pages, FIXED-DATA placeholders, wrong sitemap domain, any BROKEN
// internal link or #anchor, invalid medical schema @types, unparseable JSON-LD, banned schema
// strategy (FAQPage, review markup before real reviews), a #dentist node without true 24/7 hours,
// missing 24/7 positioning copy, and noindex/sitemap contradictions. Owner-rule + hygiene issues
// (gold->blue gradient, TODO NAP in source, public .vite manifests) and parked name placeholders
// warn in dev and hard-fail at go-live (LAUNCH=1).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { TREATMENT_SLUGS } from '../src/data/treatments.js'
import { PRACTICE } from '../src/data/practice.js'

const DIST = process.env.CHECK_DIST || 'dist' // CHECK_DIST: self-test hook, points at a scratch copy
const LAUNCH = process.env.LAUNCH === '1' // go-live mode: parked/owner-rule items become hard failures
const errors = []
const warnings = []
const launchOnly = (msg) => (LAUNCH ? errors : warnings).push(msg)

// 1. Key prerendered pages must exist (clean routes render as folder/index.html).
const required = [
  'index.html', 'sitemap.xml', 'robots.txt', '404.html',
  'our-team/index.html', 'register-as-patient/index.html',
  'areas-served/index.html', 'blog/index.html',
  'treatments/emergency-dentist/index.html',
]
for (const f of required) if (!existsSync(join(DIST, f))) errors.push(`missing page: ${f}`)

// 1b. Dev/trial artifacts must NEVER ship to production.
if (existsSync(join(DIST, 'font-trial.html'))) errors.push('dev artifact in dist: font-trial.html')
const distFonts = join(DIST, 'fonts')
if (existsSync(distFonts)) {
  for (const f of readdirSync(distFonts)) if (f.startsWith('trial-')) errors.push(`trial font artifact in dist: fonts/${f}`)
}

function walk(dir) {
  let out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) { out = out.concat(walk(full)); continue }
    if (/\.(html|xml|txt)$/.test(name)) out.push(full)
  }
  return out
}

// Exclude the noindex design-lab mockups under dist/preview/, they are not real site pages
// (owner rule) and link to placeholder anchors, so they must not be gated as production routes.
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html') && !f.includes('/preview/'))
const rel = (f) => f.replace(DIST + '/', '')

// 2. No leftover fixed-data placeholders or old domain in any rendered page.
const hardBanned = ['dayandnightdental', '[Practice Street Name]', '[Postcode]', '0000 000 0000']
// Parked placeholders await owner data: warned about pre-launch, hard-failed at go-live (LAUNCH=1).
const softBanned = ['Dr. [', '[Name]', '[Principal', '[Dentist']
for (const file of htmlFiles) {
  const txt = readFileSync(file, 'utf8')
  for (const b of hardBanned) if (txt.includes(b)) errors.push(`placeholder "${b}" in ${rel(file)}`)
  for (const b of softBanned) if (txt.includes(b)) launchOnly(`${LAUNCH ? 'placeholder' : 'parked placeholder'} "${b}" in ${rel(file)}`)
}

// 2b. Every /treatments/<slug>/ link must resolve to a registered treatment (specific message).
const knownSlugs = new Set(TREATMENT_SLUGS)
const badSlugs = new Set()
for (const file of htmlFiles) {
  const txt = readFileSync(file, 'utf8')
  for (const m of txt.matchAll(/\/treatments\/([a-z0-9-]+)\//g)) {
    if (!knownSlugs.has(m[1])) badSlugs.add(`${m[1]} (in ${rel(file)})`)
  }
}
if (badSlugs.size) errors.push(`unknown treatment slug(s) linked: ${[...badSlugs].join(', ')}`)

// 2c. FULL internal-link + #hash crawler. Catches a prominent CTA (or any <a>) pointing at a route
//     or same-page anchor that does not exist (e.g. /contact/, which the slug-only check above misses).
function routeFile(p) {
  if (p === '/' || p === '') return join(DIST, 'index.html')
  const clean = p.replace(/^\/+/, '')
  if (existsSync(join(DIST, clean, 'index.html'))) return join(DIST, clean, 'index.html')
  if (existsSync(join(DIST, clean)) && statSync(join(DIST, clean)).isFile()) return join(DIST, clean)
  return null
}
const idCache = new Map()
function idsOf(file) {
  if (!idCache.has(file)) {
    const ids = new Set()
    for (const m of readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)) ids.add(m[1])
    idCache.set(file, ids)
  }
  return idCache.get(file)
}
const linkErrors = new Set()
for (const file of htmlFiles) {
  const txt = readFileSync(file, 'utf8')
  for (const m of txt.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1]
    if (/^(https?:|mailto:|tel:|\/\/|data:|javascript:)/i.test(href)) continue
    const hashIx = href.indexOf('#')
    const path = hashIx === -1 ? href : href.slice(0, hashIx)
    const hash = hashIx === -1 ? '' : href.slice(hashIx + 1)
    let target = file // same-page when path is empty (e.g. href="#contact")
    if (path) {
      if (!path.startsWith('/')) continue // ignore unusual relative refs
      target = routeFile(path)
      if (!target) { linkErrors.add(`${href} (in ${rel(file)}) -> no such route or asset`); continue }
    }
    if (hash && !idsOf(target).has(hash)) {
      linkErrors.add(`${href} (in ${rel(file)}) -> #${hash} not present on target page`)
    }
  }
}
if (linkErrors.size) errors.push(`broken internal link(s):\n      - ${[...linkErrors].join('\n      - ')}`)

// 2d. Invalid medical schema @types in built treatment pages. Dentistry is a MedicalSpecialty enum;
//     CosmeticProcedure/Orthodontics are not schema.org types. The procedure node must be a real type.
const BANNED_LD = ['Dentistry', 'Orthodontics', 'CosmeticProcedure']
const schemaBad = new Set()
for (const file of htmlFiles) {
  if (!file.includes('/treatments/')) continue
  const txt = readFileSync(file, 'utf8')
  for (const t of BANNED_LD) if (txt.includes(`"@type":"${t}"`)) schemaBad.add(`${t} (in ${rel(file)})`)
}
if (schemaBad.size) errors.push(`invalid JSON-LD procedure @type(s): ${[...schemaBad].join(', ')}`)

// 2e. JSON-LD must PARSE on every page. Broken JSON-LD is silently ignored by Google, so a stray
//     quote or trailing comma would kill the whole local-SEO strategy without any visible symptom.
//     Parsed roots are kept for the structural checks below (2f-2h).
const LD_RE = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
const ldByFile = new Map() // file -> parsed JSON-LD roots
for (const file of htmlFiles) {
  const txt = readFileSync(file, 'utf8')
  const roots = []
  for (const m of txt.matchAll(LD_RE)) {
    try { roots.push(JSON.parse(m[1])) }
    catch (e) { errors.push(`JSON-LD does not parse in ${rel(file)}: ${e.message}`) }
  }
  if (roots.length) ldByFile.set(file, roots)
}
// Flatten a parsed root (object, array or @graph) into every object node it contains.
function ldNodes(root) {
  const out = []
  const visit = (n) => {
    if (Array.isArray(n)) { n.forEach(visit); return }
    if (n && typeof n === 'object') { out.push(n); Object.values(n).forEach(visit) }
  }
  visit(root)
  return out
}
const typesOf = (n) => [].concat(n['@type'] ?? [])

// 2f. Schema strategy bans, checked on PARSED nodes (site-wide, not just treatments):
//     - "Dentistry"/"Orthodontics" are not valid schema.org @types anywhere.
//     - FAQPage must never be emitted (FAQ rich results are dead for sites like ours; policy).
//     - No aggregateRating/Review markup until PRACTICE.rating holds real review data
//       (fake social proof = ASA/GDC/Google-policy risk).
const ratingAllowed = PRACTICE.rating != null
const invalidTypes = new Set(), faqPages = new Set(), ratingBad = new Set()
for (const [file, roots] of ldByFile) {
  for (const node of roots.flatMap(ldNodes)) {
    for (const t of typesOf(node)) {
      if (t === 'Dentistry' || t === 'Orthodontics') invalidTypes.add(`${t} (in ${rel(file)})`)
      if (t === 'FAQPage') faqPages.add(rel(file))
      if (!ratingAllowed && (t === 'AggregateRating' || t === 'Review')) ratingBad.add(`@type ${t} (in ${rel(file)})`)
    }
    if (!ratingAllowed && ('aggregateRating' in node || 'review' in node)) {
      ratingBad.add(`aggregateRating/review property (in ${rel(file)})`)
    }
  }
}
if (invalidTypes.size) errors.push(`invalid schema @type(s) in JSON-LD: ${[...invalidTypes].join(', ')}`)
if (faqPages.size) errors.push(`banned FAQPage schema emitted (policy: we do not emit it) in: ${[...faqPages].join(', ')}`)
if (ratingBad.size) errors.push(`review/rating markup with no real reviews (PRACTICE.rating is null): ${[...ratingBad].join(', ')}`)

// 2g. Business-hours truth: every #dentist node must declare genuine 24/7 opening hours
//     (all 7 days, opens 00:00, closes 23:59) in its PARSED openingHoursSpecification.
//     The whole positioning is "open day and night, every day", so partial hours = strategy bug.
const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
let dentistNodeSeen = false
for (const [file, roots] of ldByFile) {
  for (const node of roots.flatMap(ldNodes)) {
    if (!String(node['@id'] ?? '').endsWith('#dentist')) continue
    if (Object.keys(node).length === 1) continue // pure {"@id": ...} cross-reference, not the entity
    dentistNodeSeen = true
    const allDay = new Set()
    for (const spec of [].concat(node.openingHoursSpecification ?? [])) {
      if (!spec || typeof spec !== 'object') continue
      if (spec.opens !== '00:00' || spec.closes !== '23:59') continue
      for (const d of [].concat(spec.dayOfWeek ?? [])) allDay.add(String(d).replace(/^https?:\/\/schema\.org\//i, ''))
    }
    const missing = WEEK.filter((d) => !allDay.has(d))
    if (missing.length) errors.push(`#dentist hours not 24/7 in ${rel(file)}: no 00:00-23:59 spec for ${missing.join(', ')}`)
  }
}
if (!dentistNodeSeen) errors.push('no JSON-LD node with @id ending "#dentist" found on any page')

// 2h. Positioning copy: the two money pages must actually say 24/7 (or 24-hour) somewhere.
for (const f of ['index.html', 'treatments/emergency-dentist/index.html']) {
  const p = join(DIST, f)
  if (!existsSync(p)) continue // already reported by the missing-pages check
  if (!/24\/7|24[ -]hour/i.test(readFileSync(p, 'utf8'))) errors.push(`positioning: no 24/7 / 24-hour wording in ${f}`)
}

// 3. Sitemap must use the canonical domain.
const sm = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : ''
if (!sm.includes('https://daynightdental.co.uk/')) errors.push('sitemap.xml missing canonical domain')

// 3b. noindex integrity. Post-submit pages (thank-you/registered) must carry a robots noindex
//     meta, and NOTHING in the sitemap may point at a noindex page (a noindexed sitemap URL is a
//     mixed signal Search Console flags and Google distrusts).
function hasNoindex(txt) {
  for (const m of txt.matchAll(/<meta\b[^>]*>/gi)) {
    if (/name=["']robots["']/i.test(m[0]) && /noindex/i.test(m[0])) return true
  }
  return false
}
for (const f of ['thank-you/index.html', 'registered/index.html']) {
  const p = join(DIST, f)
  if (!existsSync(p)) { errors.push(`noindex page missing: ${f}`); continue }
  if (!hasNoindex(readFileSync(p, 'utf8'))) errors.push(`missing robots noindex meta on ${f}`)
}
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = m[1].trim()
  const target = routeFile(url.replace(/^https?:\/\/[^/]+/i, ''))
  if (!target) { errors.push(`sitemap URL has no built page: ${url}`); continue }
  if (hasNoindex(readFileSync(target, 'utf8'))) errors.push(`sitemap URL points to a noindex page: ${url}`)
}

// 4. OWNER-RULE + hygiene gates (warn in dev, hard-fail at go-live).
// 4a. No gold->blue gradient in any shipped CSS/HTML (the brand rule). Each gradient() call is
//     extracted with balanced parens and flagged only if it contains BOTH a gold and a blue token.
const GOLD = /248\s*,\s*199\s*,\s*96|f8c760|--dn-day\b|--gold\b/i
const BLUE = /69\s*,\s*144\s*,\s*236|4590ec|--dn-night\b|--blue\b/i
function gradientSpans(text) {
  const spans = []
  const re = /(?:linear|radial|conic)-gradient\(/g
  let m
  while ((m = re.exec(text))) {
    let i = m.index + m[0].length, depth = 1
    while (i < text.length && depth > 0) { const c = text[i]; if (c === '(') depth++; else if (c === ')') depth--; i++ }
    spans.push(text.slice(m.index, i))
  }
  return spans
}
const cssFiles = existsSync(join(DIST, 'assets'))
  ? readdirSync(join(DIST, 'assets')).filter((f) => f.endsWith('.css')).map((f) => join(DIST, 'assets', f))
  : []
const gradBad = new Set()
for (const file of [...htmlFiles, ...cssFiles]) {
  for (const g of gradientSpans(readFileSync(file, 'utf8'))) {
    if (GOLD.test(g) && BLUE.test(g)) gradBad.add(rel(file))
  }
}
if (gradBad.size) launchOnly(`gold->blue gradient(s) (owner rule) in: ${[...gradBad].join(', ')}`)

// 4b. NAP single-source must not still carry TODO placeholders once the values are owner-confirmed.
const practiceJs = existsSync('src/data/practice.js') ? readFileSync('src/data/practice.js', 'utf8') : ''
if (/TODO/.test(practiceJs)) launchOnly('TODO placeholder(s) remain in src/data/practice.js')

// 4c. Vite build manifests must not be publicly deployable.
if (existsSync(join(DIST, '.vite'))) launchOnly('public build artifact present: dist/.vite (exclude from deploy)')

if (warnings.length) console.warn(`[check] warnings (not blocking pre-launch):\n  - ${[...new Set(warnings)].join('\n  - ')}`)
if (errors.length) {
  console.error(`[check] FAILED:\n  - ${[...new Set(errors)].join('\n  - ')}`)
  process.exit(1)
}
console.log('[check] OK')

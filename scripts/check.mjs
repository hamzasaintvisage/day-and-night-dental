// Post-build smoke check + launch gate (run via `npm run check`; `npm run check:launch` = go-live mode).
// HARD failures (always): missing pages, FIXED-DATA placeholders, wrong sitemap domain, any BROKEN
// internal link or #anchor, and invalid medical schema @types. Owner-rule + hygiene issues (gold->blue
// gradient, TODO NAP in source, public .vite manifests) and parked name placeholders warn in dev and
// hard-fail at go-live (LAUNCH=1).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { TREATMENT_SLUGS } from '../src/data/treatments.js'

const DIST = 'dist'
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

// Exclude the noindex design-lab mockups under dist/preview/ — they are not real site pages
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

// 3. Sitemap must use the canonical domain.
const sm = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : ''
if (!sm.includes('https://daynightdental.co.uk/')) errors.push('sitemap.xml missing canonical domain')

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

// Post-build smoke check (run via `npm run check`). Exits non-zero if the build
// output is missing key pages, still contains FIXED-DATA placeholders, or the
// sitemap domain is wrong. Parked placeholders (real team names, complaints
// manager) are warned about, not failed, since they await owner data.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { TREATMENT_SLUGS } from '../src/data/treatments.js'

const DIST = 'dist'
const LAUNCH = process.env.LAUNCH === '1' // go-live mode: parked placeholders become hard failures
const errors = []
const warnings = []

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

// 2. No leftover fixed-data placeholders or old domain in any rendered page.
const hardBanned = ['dayandnightdental', '[Practice Street Name]', '[Postcode]', '0000 000 0000']
// Parked placeholders await owner data: warned about pre-launch, hard-failed at go-live (LAUNCH=1).
const softBanned = ['Dr. [', '[Name]', '[Principal', '[Dentist']
for (const file of walk(DIST)) {
  const txt = readFileSync(file, 'utf8')
  const rel = file.replace(DIST + '/', '')
  for (const b of hardBanned) if (txt.includes(b)) errors.push(`placeholder "${b}" in ${rel}`)
  for (const b of softBanned) if (txt.includes(b)) (LAUNCH ? errors : warnings).push(`${LAUNCH ? 'placeholder' : 'parked placeholder'} "${b}" in ${rel}`)
}

// 2b. Every /treatments/<slug>/ link in the built HTML must resolve to a registered treatment
//     (catches a typo'd related/types slug that would render a <Link> to a 404 with no build error).
const knownSlugs = new Set(TREATMENT_SLUGS)
const badLinks = new Set()
for (const file of walk(DIST)) {
  const txt = readFileSync(file, 'utf8')
  for (const m of txt.matchAll(/\/treatments\/([a-z0-9-]+)\//g)) {
    if (!knownSlugs.has(m[1])) badLinks.add(`${m[1]} (in ${file.replace(DIST + '/', '')})`)
  }
}
if (badLinks.size) errors.push(`unknown treatment slug(s) linked: ${[...badLinks].join(', ')}`)

// 3. Sitemap must use the canonical domain.
const sm = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : ''
if (!sm.includes('https://daynightdental.co.uk/')) errors.push('sitemap.xml missing canonical domain')

if (warnings.length) console.warn(`[check] warnings (parked, not blocking):\n  - ${[...new Set(warnings)].join('\n  - ')}`)
if (errors.length) {
  console.error(`[check] FAILED:\n  - ${[...new Set(errors)].join('\n  - ')}`)
  process.exit(1)
}
console.log('[check] OK')

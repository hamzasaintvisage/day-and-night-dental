// Post-build: generate dist/sitemap.xml from the rendered HTML, excluding any
// page marked noindex (thank-you / registered / 404). Run after vite-react-ssg build.
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE } from '../src/data/practice.js'

const DIST = 'dist'
const today = new Date().toISOString().slice(0, 10)

function collect(dir, base = '') {
  let out = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'assets') continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      out = out.concat(collect(full, `${base}/${name}`))
    } else if (name.endsWith('.html')) {
      const html = readFileSync(full, 'utf8')
      if (/name=["']robots["'][^>]*noindex/i.test(html)) continue // skip noindex
      const slug = name.replace(/\.html$/, '')
      // Trailing slash to match Hostinger's served 200 URLs (folder/index.html) + the canonicals.
      const path = slug === 'index' ? `${base}/` : `${base}/${slug}`
      out.push(path)
    }
  }
  return out
}

function priority(path) {
  if (path === '/') return '1.0'
  if (path.includes('emergency-dentist')) return '0.9'
  if (path.startsWith('/treatments/')) return '0.8'
  if (path.startsWith('/blog')) return '0.6'
  return '0.7'
}

const paths = collect(DIST).sort((a, b) => Number(priority(b)) - Number(priority(a)) || a.localeCompare(b))

const body = paths
  .map((p) => `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(p)}</priority>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(join(DIST, 'sitemap.xml'), xml)
console.log(`[sitemap] wrote ${paths.length} urls to dist/sitemap.xml`)

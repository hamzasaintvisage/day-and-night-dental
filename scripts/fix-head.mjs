// Post-build: make <meta charset="utf-8"> the FIRST child of <head> on every page.
// react-helmet injects the page <title>/meta at the top of <head>, which pushes the
// charset declaration past the 1KB mark and trips Lighthouse's "charset too late"
// check. Runs after vite-react-ssg build, before sitemap.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
let fixed = 0

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) { walk(full); continue }
    if (!name.endsWith('.html')) continue
    let html = readFileSync(full, 'utf8')
    const orig = html
    html = html.replace(/<meta[^>]*charset[^>]*>/gi, '')             // remove any existing charset meta
    html = html.replace(/(<head[^>]*>)/i, '$1<meta charset="utf-8">') // re-insert as the first head child
    if (html !== orig) {
      try { writeFileSync(full, html); fixed++ }
      catch (err) { console.error(`[fix-head] failed to write ${full}: ${err.message}`) }
    }
  }
}

walk(DIST)
console.log(`[fix-head] hoisted charset on ${fixed} page(s)`)

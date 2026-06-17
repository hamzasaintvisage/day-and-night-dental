// Post-build fixups on every pre-rendered page. Runs after vite-react-ssg build,
// before sitemap.
//
// 1. charset: make <meta charset="utf-8"> the FIRST child of <head>. react-helmet
//    injects <title>/meta at the top of <head>, pushing charset past the 1KB mark
//    and tripping Lighthouse's "charset too late" check.
//
// 2. non-blocking CSS: beasties (`preload: 'swap'`) inlines the critical CSS but
//    emits the full sheet as a *blocking* <link rel="stylesheet" ... onload="this.rel='stylesheet'">
//    — the onload swap is a no-op because it's already a stylesheet, so the 87KB
//    sheet blocks first paint on every route. Rewrite that link into a real async
//    preload: rel="preload" as="style", which renders without blocking and swaps
//    to a stylesheet once loaded. The <noscript> copy (no onload) stays a plain
//    stylesheet so no-JS users still get styles. Also collapse the duplicate
//    `crossorigin crossorigin` beasties emits.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
let fixed = 0
let cssFixed = 0
let headOpt = 0

// The app entry chunk dynamically imports a second "client" chunk that Vite does NOT add a
// modulepreload for (only the vendor chunk gets one), so it's discovered late, after app.js
// parses — a serial hydration waterfall hurting INP/TBT. Find it once and preload it per page.
const clientChunk = (() => {
  try { return readdirSync(join(DIST, 'assets')).find((f) => /^client-.*\.js$/.test(f)) || null }
  catch { return null }
})()

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) { walk(full); continue }
    if (!name.endsWith('.html')) continue
    let html = readFileSync(full, 'utf8')
    const orig = html
    html = html.replace(/<meta[^>]*charset[^>]*>/gi, '')             // remove any existing charset meta
    html = html.replace(/(<head[^>]*>)/i, '$1<meta charset="utf-8">') // re-insert as the first head child

    // Collapse beasties' duplicate crossorigin attribute, then turn the blocking,
    // onload-swapped stylesheet link into a genuine non-blocking preload.
    html = html.replace(/\scrossorigin(\s+crossorigin)+/gi, ' crossorigin')
    const beforeCss = html
    html = html.replace(
      /<link rel="stylesheet"([^>]*?\sonload="this\.rel='stylesheet'")>/gi,
      '<link rel="preload" as="style"$1>',
    )
    if (html !== beforeCss) cssFixed++

    const beforeHead = html
    // (a) Preload the second hydration chunk so it downloads in parallel with app.js.
    if (clientChunk && !html.includes(`/assets/${clientChunk}"`)) {
      const preload = `<link rel="modulepreload" crossorigin href="/assets/${clientChunk}">`
      if (/<link rel="modulepreload"[^>]*vendor-[^>]*>/.test(html)) {
        html = html.replace(/(<link rel="modulepreload"[^>]*vendor-[^>]*>)/, `$1${preload}`)
      } else {
        html = html.replace(/(<script type="module"[^>]*\bapp-[^>]*><\/script>)/, `${preload}$1`)
      }
    }
    // (b) Font preloads must declare their type or browsers may drop / double-fetch them.
    html = html.replace(/<link rel="preload" as="font" (?!type=)/gi, '<link rel="preload" as="font" type="font/woff2" ')
    // (c) Drop the 45KB logo preload — it isn't the LCP and only steals first-paint bandwidth.
    html = html.replace(/<link rel="preload" as="image" href="\/logo-mark\.(?:png|webp)"\s*\/?>/gi, '')
    if (html !== beforeHead) headOpt++

    if (html !== orig) {
      try { writeFileSync(full, html); fixed++ }
      catch (err) { console.error(`[fix-head] failed to write ${full}: ${err.message}`) }
    }
  }
}

walk(DIST)
console.log(`[fix-head] hoisted charset on ${fixed} page(s); made CSS non-blocking on ${cssFixed} page(s); head perf hints on ${headOpt} page(s)`)

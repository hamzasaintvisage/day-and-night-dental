import { chromium } from './node_modules/playwright/index.mjs'
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const auditRoot = new URL('.', import.meta.url).pathname
const distRoot = join(auditRoot, '..', 'dist')
const screenshotsDir = join(auditRoot, 'screenshots')
const evidenceDir = join(auditRoot, 'evidence')
mkdirSync(screenshotsDir, { recursive: true })
mkdirSync(evidenceDir, { recursive: true })

const baseURL = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const allViewports = [
  ['mobile-320x568', 320, 568],
  ['mobile-390x844', 390, 844],
  ['mobile-430x932', 430, 932],
  ['tablet-820x1180', 820, 1180],
  ['tablet-1180x820', 1180, 820],
  ['desktop-1366x768', 1366, 768],
  ['desktop-1440x900', 1440, 900],
  ['desktop-1920x1080', 1920, 1080],
]
const smokeViewports = [
  ['mobile-390x844', 390, 844],
  ['desktop-1366x768', 1366, 768],
]

function collectRoutes(dir, base = '') {
  let out = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'assets' || name === 'static-loader-data') continue
    const full = join(dir, name)
    const stat = statSync(full)
    if (stat.isDirectory()) out = out.concat(collectRoutes(full, `${base}/${name}`))
    else if (name.endsWith('.html')) {
      if (base === '' && name === '404.html') out.push('/404')
      else if (name === 'index.html') out.push(`${base || ''}/`)
      else out.push(`${base}/${name.replace(/\.html$/, '')}`)
    }
  }
  return [...new Set(out)].sort()
}

function safeName(s) {
  return s.replace(/^\/$/, 'home').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
}

async function pageState(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth
    const scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)
    const overflow = []
    for (const el of document.querySelectorAll('body *')) {
      const rect = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      if (!rect.width || !rect.height || style.display === 'none' || style.visibility === 'hidden') continue
      if (rect.left < -1 || rect.right > vw + 1) {
        overflow.push({
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: typeof el.className === 'string' ? el.className.slice(0, 90) : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
        })
      }
    }
    const anchors = [...document.querySelectorAll('a[href^="#"], a[href*="/#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((href) => {
        const id = href.split('#')[1]
        return id && !document.getElementById(id)
      })
    const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().replace(/\s+/g, ' '))
    return {
      title: document.title,
      url: location.href,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollWidth,
      hasHorizontalOverflow: scrollWidth > window.innerWidth + 1,
      overflow: overflow.slice(0, 20),
      h1s,
      h1Count: h1s.length,
      hasHeader: !!document.querySelector('header'),
      hasFooter: !!document.querySelector('footer'),
      brokenAnchors: anchors,
      unnamedButtons: [...document.querySelectorAll('button')].filter((b) => !(b.innerText || b.getAttribute('aria-label') || b.title || '').trim()).length,
      emptyLinks: [...document.querySelectorAll('a[href]')].filter((a) => !(a.innerText || a.getAttribute('aria-label') || a.querySelector('img[alt]')?.alt || '').trim()).map((a) => a.href).slice(0, 20),
    }
  })
}

async function auditOne(page, route, viewport) {
  const [name, width, height] = viewport
  const consoleMessages = []
  const pageErrors = []
  const failedRequests = []
  const onConsole = (m) => {
    if (['error', 'warning'].includes(m.type())) consoleMessages.push({ type: m.type(), text: m.text().slice(0, 400) })
  }
  const onPageError = (e) => pageErrors.push(String(e.message || e).slice(0, 400))
  const onFailed = (r) => failedRequests.push({ url: r.url(), error: r.failure()?.errorText || '' })
  page.on('console', onConsole)
  page.on('pageerror', onPageError)
  page.on('requestfailed', onFailed)
  await page.setViewportSize({ width, height })
  let status = null
  let navError = null
  let state
  try {
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 })
    status = response?.status() ?? null
    await page.waitForTimeout(500)
    state = await pageState(page)
  } catch (e) {
    navError = String(e.message || e).slice(0, 600)
    state = { title: '', url: page.url(), viewport: `${width}x${height}`, scrollWidth: 0, hasHorizontalOverflow: false, overflow: [], h1s: [], h1Count: 0, hasHeader: false, hasFooter: false, brokenAnchors: [], unnamedButtons: 0, emptyLinks: [] }
  }
  page.off('console', onConsole)
  page.off('pageerror', onPageError)
  page.off('requestfailed', onFailed)
  return { route, viewport: name, status, navError, consoleMessages, pageErrors, failedRequests: failedRequests.filter((r) => !r.url.startsWith('data:')), state }
}

const routes = collectRoutes(distRoot)
const keyRoutes = [
  '/',
  '/our-team/',
  '/register-as-patient/',
  '/treatments/emergency-dentist/',
  '/treatments/general-dentistry/',
  '/treatments/invisalign/',
  '/blog/',
  routes.find((r) => r.startsWith('/blog/') && r !== '/blog/'),
  '/privacy/',
  '/404',
].filter(Boolean)

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const context = await browser.newContext()
await context.addInitScript(() => localStorage.setItem('dnd-consent', 'denied'))
const page = await context.newPage()

const smokeResults = []
for (const route of routes) {
  for (const vp of smokeViewports) smokeResults.push(await auditOne(page, route, vp))
}

const viewportResults = []
for (const route of keyRoutes) {
  for (const vp of allViewports) viewportResults.push(await auditOne(page, route, vp))
}

const interactions = []
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(500)
await page.locator('.dn-burger').click()
await page.waitForTimeout(300)
interactions.push({
  name: 'mobile menu opens',
  pass: await page.locator('.dn-mobile-menu[data-open="true"]').count() === 1,
  state: await pageState(page),
})
await page.screenshot({ path: join(screenshotsDir, 'smart-mobile-menu-open-390x844.png'), fullPage: false })
await page.keyboard.press('Escape')
await page.waitForTimeout(250)
interactions.push({
  name: 'mobile menu closes with Escape',
  pass: await page.locator('.dn-mobile-menu[data-open="false"]').count() === 1,
})

await page.goto(`${baseURL}/#contact`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(500)
await page.locator('.dn-contact-form button[type="submit"]').click()
interactions.push({
  name: 'empty contact form blocked by browser validation',
  pass: await page.locator('.dn-contact-form input:invalid, .dn-contact-form textarea:invalid').count() > 0,
})

const shots = [
  ['/', 'desktop-1440x900', 1440, 900, 'smart-homepage-desktop', true],
  ['/', 'mobile-390x844', 390, 844, 'smart-homepage-mobile', true],
  ['/treatments/emergency-dentist/', 'mobile-390x844', 390, 844, 'smart-emergency-mobile', true],
  ['/register-as-patient/', 'mobile-390x844', 390, 844, 'smart-register-mobile', true],
  ['/our-team/', 'mobile-390x844', 390, 844, 'smart-team-mobile', true],
  ['/blog/', 'mobile-390x844', 390, 844, 'smart-blog-mobile', true],
]
const screenshots = []
for (const [route, vp, width, height, name, fullPage] of shots) {
  await page.setViewportSize({ width, height })
  await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)
  const path = join(screenshotsDir, `${name}-${vp}.png`)
  await page.screenshot({ path, fullPage })
  screenshots.push({ route, viewport: vp, path })
}

await browser.close()

const allResults = [...smokeResults, ...viewportResults]
const failures = allResults.filter((r) =>
  r.navError ||
  (r.status !== 200 && r.route !== '/404') ||
  r.consoleMessages.some((m) => m.type === 'error') ||
  r.pageErrors.length ||
  r.failedRequests.length ||
  r.state.hasHorizontalOverflow ||
  !r.state.hasHeader ||
  !r.state.hasFooter ||
  r.state.h1Count !== 1 ||
  r.state.brokenAnchors.length ||
  r.state.unnamedButtons ||
  r.state.emptyLinks.length
)

const result = {
  baseURL,
  routes,
  keyRoutes,
  smokeViewports: smokeViewports.map((v) => v[0]),
  fullViewportsOnKeyRoutes: allViewports.map((v) => v[0]),
  smokeResults,
  viewportResults,
  interactions,
  screenshots,
  summary: {
    routesDiscovered: routes.length,
    smokeChecks: smokeResults.length,
    viewportChecks: viewportResults.length,
    totalBrowserChecks: allResults.length,
    interactionChecks: interactions.length,
    screenshots: screenshots.length + 1,
    failures: failures.length,
  },
  failures,
}

writeFileSync(join(evidenceDir, 'smart-browser-audit-results.json'), JSON.stringify(result, null, 2))
console.log(JSON.stringify(result.summary, null, 2))
if (failures.length) {
  console.log(JSON.stringify(failures.slice(0, 10), null, 2))
  process.exitCode = 1
}

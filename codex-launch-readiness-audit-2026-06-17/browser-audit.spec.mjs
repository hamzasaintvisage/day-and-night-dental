import { test, expect } from '@playwright/test'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const auditRoot = new URL('.', import.meta.url).pathname
const repoRoot = join(auditRoot, '..')
const distRoot = join(repoRoot, 'dist')
const screenshotsDir = join(auditRoot, 'screenshots')
const evidenceDir = join(auditRoot, 'evidence')
mkdirSync(screenshotsDir, { recursive: true })
mkdirSync(evidenceDir, { recursive: true })

const baseURL = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'

const viewports = [
  { name: 'mobile-320x568', width: 320, height: 568 },
  { name: 'mobile-360x740', width: 360, height: 740 },
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-430x932', width: 430, height: 932 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'tablet-820x1180', width: 820, height: 1180 },
  { name: 'tablet-1024x768', width: 1024, height: 768 },
  { name: 'tablet-1180x820', width: 1180, height: 820 },
  { name: 'desktop-1280x720', width: 1280, height: 720 },
  { name: 'desktop-1366x768', width: 1366, height: 768 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'desktop-1536x864', width: 1536, height: 864 },
  { name: 'desktop-1920x1080', width: 1920, height: 1080 },
  { name: 'large-2560x1440', width: 2560, height: 1440 },
]

function collectHtmlRoutes(dir, base = '') {
  const out = []
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'assets' || name === 'static-loader-data') continue
    const full = join(dir, name)
    if (existsSync(full) && readdirSafe(full)) {
      out.push(...collectHtmlRoutes(full, `${base}/${name}`))
    } else if (name.endsWith('.html')) {
      if (base === '' && name === '404.html') out.push('/404')
      else if (name === 'index.html') out.push(`${base || ''}/`)
      else out.push(`${base}/${name.replace(/\.html$/, '')}`)
    }
  }
  return out
}

function readdirSafe(path) {
  try {
    readdirSync(path)
    return true
  } catch {
    return false
  }
}

function routeFromHtmlPath(file) {
  let rel = relative(distRoot, file)
  if (rel === 'index.html') return '/'
  if (rel === '404.html') return '/404'
  rel = rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
  return `/${rel}`
}

const allRoutes = [...new Set(collectHtmlRoutes(distRoot).sort())]
const articleRoutes = allRoutes.filter((r) => r.startsWith('/blog/') && r !== '/blog/')
const routeSmokeViewports = [
  viewports.find((v) => v.name === 'mobile-390x844'),
  viewports.find((v) => v.name === 'desktop-1366x768'),
]
const keyRoutes = [
  '/',
  '/areas-served/',
  '/our-team/',
  '/register-as-patient/',
  '/treatments/emergency-dentist/',
  '/treatments/general-dentistry/',
  '/treatments/cosmetic-dentistry/',
  '/treatments/dental-implants/',
  '/treatments/invisalign/',
  '/treatments/teeth-whitening/',
  '/blog/',
  articleRoutes[0],
  '/privacy/',
  '/terms/',
  '/complaints/',
  '/accessibility/',
  '/404',
].filter(Boolean)

function fileSafe(s) {
  return s.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'home'
}

async function collectPageState(page) {
  return page.evaluate(() => {
    const body = document.body
    const html = document.documentElement
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scrollWidth = Math.max(body?.scrollWidth || 0, html?.scrollWidth || 0)
    const overflow = []
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      const rect = el.getBoundingClientRect()
      const style = window.getComputedStyle(el)
      if (!rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none') continue
      if (rect.right > viewportWidth + 1 || rect.left < -1) {
        const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)
        overflow.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: typeof el.className === 'string' ? el.className.slice(0, 120) : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text,
        })
      }
    }
    const h1s = Array.from(document.querySelectorAll('h1')).map((el) => el.textContent.trim().replace(/\s+/g, ' '))
    const buttonsWithoutNames = Array.from(document.querySelectorAll('button')).filter((el) => !(el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim()).length
    const emptyLinks = Array.from(document.querySelectorAll('a[href]')).filter((el) => !(el.innerText || el.getAttribute('aria-label') || el.querySelector('img[alt]')?.getAttribute('alt') || '').trim()).map((el) => el.getAttribute('href'))
    const brokenAnchors = Array.from(document.querySelectorAll('a[href^="#"], a[href*="/#"]')).map((el) => {
      const href = el.getAttribute('href')
      const id = href.split('#')[1]
      return id && !document.getElementById(id) ? href : null
    }).filter(Boolean)
    const tapTargets = Array.from(document.querySelectorAll('a[href],button,input,select,textarea')).map((el) => {
      const rect = el.getBoundingClientRect()
      const label = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('name') || el.getAttribute('href') || '').trim().replace(/\s+/g, ' ').slice(0, 80)
      return { label, width: Math.round(rect.width), height: Math.round(rect.height), visible: rect.width > 0 && rect.height > 0 }
    }).filter((x) => x.visible && (x.width < 32 || x.height < 32))
    return {
      title: document.title,
      url: location.href,
      viewportWidth,
      viewportHeight,
      scrollWidth,
      bodyHeight: Math.round(body?.getBoundingClientRect().height || 0),
      hasHeader: !!document.querySelector('header'),
      hasFooter: !!document.querySelector('footer'),
      h1s,
      h1Count: h1s.length,
      overflow,
      brokenAnchors,
      buttonsWithoutNames,
      emptyLinks,
      smallTapTargets: tapTargets.slice(0, 20),
      activeElement: document.activeElement?.tagName,
      cookieVisible: !!document.querySelector('.dn-cookie'),
    }
  })
}

async function auditRouteViewport(page, route, viewport) {
  const errors = []
  const failedRequests = []
  const consoleMessages = []
  const onConsole = (msg) => {
    if (['error', 'warning'].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text().slice(0, 500) })
  }
  const onError = (err) => errors.push(String(err.message || err).slice(0, 500))
  const onFailed = (req) => failedRequests.push({ url: req.url(), failure: req.failure()?.errorText || '' })
  page.on('console', onConsole)
  page.on('pageerror', onError)
  page.on('requestfailed', onFailed)
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  let response = null
  let state = null
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(650)
      state = await collectPageState(page)
      break
    } catch (err) {
      errors.push(`goto attempt ${attempt}: ${String(err.message || err).slice(0, 500)}`)
      await page.waitForTimeout(500)
    }
  }
  if (!state) {
    state = {
      title: '',
      url: page.url(),
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
      scrollWidth: 0,
      bodyHeight: 0,
      hasHeader: false,
      hasFooter: false,
      h1s: [],
      h1Count: 0,
      overflow: [],
      brokenAnchors: [],
      buttonsWithoutNames: 0,
      emptyLinks: [],
      smallTapTargets: [],
      activeElement: null,
      cookieVisible: false,
    }
  }
  page.off('console', onConsole)
  page.off('pageerror', onError)
  page.off('requestfailed', onFailed)
  return {
    route,
    viewport: viewport.name,
    status: response?.status() || null,
    ok: response?.ok() || false,
    consoleMessages,
    errors,
    failedRequests: failedRequests.filter((r) => !r.url.startsWith('data:')),
    state,
  }
}

test('full launch browser audit', async ({ browser }) => {
  test.setTimeout(600000)
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  })
  await context.addInitScript(() => localStorage.setItem('dnd-consent', 'denied'))
  const page = await context.newPage()

  const routeResults = []
  for (const route of allRoutes) {
    for (const viewport of routeSmokeViewports) {
      routeResults.push(await auditRouteViewport(page, route, viewport))
    }
  }

  const matrixResults = []
  for (const route of keyRoutes) {
    for (const viewport of viewports) {
      matrixResults.push(await auditRouteViewport(page, route, viewport))
    }
  }

  const interactionResults = []
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  await page.locator('.dn-burger').click()
  await expect(page.locator('.dn-mobile-menu')).toHaveAttribute('data-open', 'true')
  const menuState = await collectPageState(page)
  await page.screenshot({ path: join(screenshotsDir, 'mobile-menu-open-390x844.png'), fullPage: false })
  await page.keyboard.press('Escape')
  await expect(page.locator('.dn-mobile-menu')).toHaveAttribute('data-open', 'false')
  interactionResults.push({ name: 'mobile menu opens and closes with Escape', pass: true, menuState })

  await page.goto(`${baseURL}/#contact`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  await page.locator('.dn-contact-form button[type="submit"]').click()
  const contactInvalid = await page.locator('.dn-contact-form input:invalid, .dn-contact-form textarea:invalid').count()
  interactionResults.push({ name: 'contact form required validation blocks empty submit', pass: contactInvalid > 0, invalidCount: contactInvalid })

  await page.goto(`${baseURL}/register-as-patient/`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(500)
  const nextDisabled = await page.locator('.dn-register-form button', { hasText: /continue/i }).isDisabled().catch(() => null)
  interactionResults.push({ name: 'register step 1 continue disabled while required fields empty', pass: nextDisabled === true, disabled: nextDisabled })

  const screenshotTargets = [
    { route: '/', viewport: 'desktop-1440x900', name: 'homepage-desktop', fullPage: true },
    { route: '/', viewport: 'mobile-390x844', name: 'homepage-mobile', fullPage: true },
    { route: '/', viewport: 'tablet-820x1180', name: 'homepage-tablet', fullPage: true },
    { route: '/', viewport: 'desktop-1440x900', name: 'header-desktop', fullPage: false },
    { route: '/', viewport: 'mobile-390x844', name: 'header-mobile', fullPage: false },
    { route: '/', viewport: 'desktop-1440x900', name: 'footer-desktop', locator: 'footer' },
    { route: '/', viewport: 'mobile-390x844', name: 'footer-mobile', locator: 'footer' },
    { route: '/', viewport: 'desktop-1440x900', name: 'about-section', text: 'I opened this practice' },
    { route: '/', viewport: 'desktop-1440x900', name: 'why-daynight-section', text: 'Why Glasgow patients choose' },
    { route: '/#contact', viewport: 'desktop-1440x900', name: 'booking-contact-section', locator: '#contact' },
    { route: '/treatments/emergency-dentist/', viewport: 'desktop-1440x900', name: 'emergency-page-desktop', fullPage: true },
    { route: '/treatments/emergency-dentist/', viewport: 'mobile-390x844', name: 'emergency-page-mobile', fullPage: true },
    { route: '/register-as-patient/', viewport: 'desktop-1440x900', name: 'register-page-desktop', fullPage: true },
    { route: '/register-as-patient/', viewport: 'mobile-390x844', name: 'register-page-mobile', fullPage: true },
    { route: '/treatments/invisalign/', viewport: 'desktop-1440x900', name: 'treatment-invisalign-desktop', fullPage: true },
    { route: '/treatments/invisalign/', viewport: 'mobile-390x844', name: 'treatment-invisalign-mobile', fullPage: true },
    { route: '/blog/', viewport: 'mobile-390x844', name: 'blog-index-mobile', fullPage: true },
    { route: articleRoutes[0] || '/blog/', viewport: 'mobile-390x844', name: 'blog-article-mobile', fullPage: true },
    { route: '/our-team/', viewport: 'mobile-390x844', name: 'team-page-mobile', fullPage: true },
    { route: '/404', viewport: 'desktop-1440x900', name: 'not-found-desktop', fullPage: true },
  ]

  const screenshotResults = []
  for (const shot of screenshotTargets) {
    const vp = viewports.find((v) => v.name === shot.viewport)
    if (!vp || !shot.route) continue
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.goto(`${baseURL}${shot.route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(400)
    const path = join(screenshotsDir, `${shot.name}-${shot.viewport}.png`)
    if (shot.locator) {
      await page.locator(shot.locator).first().screenshot({ path })
    } else if (shot.text) {
      const locator = page.locator('section').filter({ hasText: shot.text }).first()
      await locator.screenshot({ path })
    } else {
      await page.screenshot({ path, fullPage: !!shot.fullPage })
    }
    screenshotResults.push({ ...shot, path })
  }

  const fakePage = await context.newPage()
  const fakeResp = await fakePage.goto(`${baseURL}/fake-route-codex-audit/`, { waitUntil: 'domcontentloaded' })
  const fakeState = await collectPageState(fakePage)
  await fakePage.close()

  const result = {
    baseURL,
    allRoutes,
    keyRoutes,
    viewports,
    routeSmokeViewports,
    routeResults,
    matrixResults,
    interactionResults,
    screenshotResults,
    fakeRoute: { status: fakeResp?.status() || null, url: fakeState.url, title: fakeState.title, h1s: fakeState.h1s },
    summary: {
      routesDiscovered: allRoutes.length,
      routeSmokeChecks: routeResults.length,
      matrixChecks: matrixResults.length,
      interactionChecks: interactionResults.length,
      screenshots: screenshotResults.length + 1,
      failures: [...routeResults, ...matrixResults].filter((r) =>
        !r.ok ||
        r.errors.length ||
        r.consoleMessages.some((m) => m.type === 'error') ||
        r.failedRequests.length ||
        r.state.scrollWidth > r.state.viewportWidth + 1 ||
        !r.state.hasHeader ||
        !r.state.hasFooter ||
        r.state.h1Count !== 1 ||
        r.state.brokenAnchors.length ||
        r.state.buttonsWithoutNames ||
        r.state.emptyLinks.length
      ).length,
    },
  }
  writeFileSync(join(evidenceDir, 'browser-audit-results.json'), JSON.stringify(result, null, 2))

  expect(result.summary.failures, JSON.stringify(result.summary, null, 2)).toBe(0)
})

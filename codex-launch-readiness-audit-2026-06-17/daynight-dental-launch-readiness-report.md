# DayNight Dental Launch Readiness Audit

Audit date: 2026-06-17  
Auditor: Codex  
Project folder: `/Users/admin/day-and-night-dental-recovered`  
Mode: audit/report only, no source-code fixes, no deploy, no commit

## Executive Summary

The DayNight Dental website is technically strong for a small static dental practice website. It is not a disposable AI-generated toy site. It has a static Vite/React SSG build, good route coverage, good SEO basics, strong security headers on the live Hostinger deployment, and a serious PHP form endpoint.

The site is launchable from a behind-the-scenes technical perspective, but it is not yet "world-class 10/10". The main remaining gaps are dependency-tree health, Node version mismatch, automated browser QA, performance polish, CSS maintainability, bot hardening, and a few deployment/security refinements.

Important: this report deliberately ignores owner/content placeholders unless they affect technical launch readiness. Team placeholders still exist, but the user specifically asked to focus on code/security/behind-the-scenes quality.

## Final Verdict

Public launch verdict, technical only: **LAUNCH READY WITH WARNINGS**

Internal review verdict: **SAFE TO SHOW INTERNALLY**

Overall score: **86 / 100**

Category scores:

| Area | Score |
|---|---:|
| Code quality | 84 |
| Security readiness | 88 |
| Deployment readiness | 91 |
| Responsive/visual evidence | 82 |
| Form/conversion readiness | 88 |
| Technical SEO | 90 |
| Performance | 86 |
| Accessibility | 95 |
| Maintainability | 82 |

## Environment Snapshot

Current working folder:

`/Users/admin/day-and-night-dental-recovered`

Git branch:

`feat/menu-blog-seo-layout-polish`

Current commit:

`9945c75`

Repo dirty before/following audit:

Yes. The worktree was dirty before this final report. Existing modified source files included:

- `package.json`
- `package-lock.json`
- `src/components/Header.jsx`
- `src/components/TreatmentPage.jsx`
- multiple treatment page files
- `src/sections/SmileGallerySpotlight.jsx`
- `src/styles/modules/hero.css`

These were not reverted or fixed by Codex.

Framework detected:

- Vite 7
- React 19
- React Router 6
- `vite-react-ssg`
- Plain CSS modules imported through `src/styles/index.css`

Hosting/deployment target:

- Hostinger / LiteSpeed
- Static output from `dist/`
- PHP contact endpoint under `hostinger/api/send-enquiry.php`
- Hostinger `.htaccess` handles redirects/security headers/cache rules

Node/npm:

- Node: `v20.18.0`
- npm: `10.8.2`
- Required by project: Node `>=20.19`

Package manager:

- npm, `package-lock.json`

Available scripts:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`
- `npm run deploy:static`
- `npm run deploy:api`
- `npm run deploy:htaccess`
- `npm run deploy:cron`
- `npm run deploy:frontend`
- `npm run lint`
- `npm run lint:css`
- `npm run test`
- `npm run ci`

Old audit reports exist:

Yes. There are several old audit files/folders, including `SEO-AUDIT.md`, `SWARM-REVIEW-PATH-TO-10.md`, `codex-launch-readiness-audit`, `audit-screenshots`, and older Codex audit markdown files. They are useful as stale context only.

## Commands Run

| Command | Result | Notes |
|---|---:|---|
| `npm run lint` | Pass | ESLint clean |
| `npm run lint:css` | Pass | Stylelint clean |
| `npm run test` | Pass | 2 files, 12 tests |
| `npm audit --audit-level=moderate` | Pass | 0 vulnerabilities |
| `npm run check` | Pass with warnings | Build succeeds; parked placeholders warned |
| `npm ls --all --json` | Fail | Invalid React dependency tree reported |
| `npm outdated --json` | Non-zero | Several packages have newer/odd latest values |
| `npm run preview -- --host 127.0.0.1` | Runs with warning | Vite warns Node 20.18 is below 20.19 |
| Lighthouse via `npx lighthouse` | Complete | Scores recorded below |

Command logs are saved in:

`/Users/admin/day-and-night-dental-recovered/codex-launch-readiness-audit-2026-06-17/logs/`

## Build Result

`npm run check` passed.

Build output highlights:

- Rendered pages: 38 through `vite-react-ssg`
- HTML files found in `dist`: 39 including `404.html`
- Sitemap URLs written: 36
- CSS bundle: `88.92 kB raw / 15.66 kB gzip`
- Vendor JS: `73.96 kB raw / 25.27 kB gzip`
- Client JS: `180.77 kB raw / 56.87 kB gzip`
- App JS: `423.43 kB raw / 118.18 kB gzip`

Build warnings:

- parked placeholder `"Dr. ["` in `index.html`
- parked placeholder `"[Principal"` in `index.html`
- parked placeholder `"[Dentist"` in `index.html`
- same parked placeholders in `our-team/index.html`

Because the user asked to ignore placeholders/content, these are not treated as code blockers in this report. For a public final launch with real patients, they still need resolving.

## Lighthouse Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Homepage | 87 | 100 | 100 | 100 |
| Emergency dentist | 91 | 100 | 100 | 100 |
| Register page | 89 | 100 | 100 | 100 |
| Invisalign page | 84 | 97 | 100 | 100 |
| Blog article | 88 | 100 | 100 | 100 |

Main Lighthouse findings:

- LCP around 3.0s-3.6s depending on page.
- Performance is good but not elite.
- `logo-mark.png` is larger than needed for its rendered size.
- Some unused JS/CSS exists, expected from a global SSG React bundle.
- Invisalign accessibility score dropped to 97 due to a link-in-text distinction issue around the cookie/privacy link.

## Routes Discovered

Generated routes include:

- `/`
- `/areas-served/`
- `/our-team/`
- `/register-as-patient/`
- `/privacy/`
- `/terms/`
- `/complaints/`
- `/accessibility/`
- `/thank-you/`
- `/registered/`
- `/blog/`
- six blog article routes
- 21 treatment routes
- `/404`

Core treatment routes:

- `/treatments/emergency-dentist/`
- `/treatments/general-dentistry/`
- `/treatments/cosmetic-dentistry/`
- `/treatments/dental-implants/`
- `/treatments/invisalign/`
- `/treatments/teeth-whitening/`
- plus specific treatment pages such as composite bonding, veneers, crowns, bridges, dentures, hygiene, check-ups, nervous patients, etc.

## Local/Live Route Checks

Local preview:

- Real routes served successfully.
- Local fake route behavior differs from Hostinger because Vite preview can fallback differently.

Live Hostinger:

- `https://daynightdental.co.uk/` returned 200.
- real routes tested returned 200.
- fake route returned 404.
- `https://www.daynightdental.co.uk/` redirects to apex.
- `http://daynightdental.co.uk/` redirects to HTTPS.
- non-trailing slash route redirects to trailing slash.

## Screenshots Captured

Screenshot folder:

`/Users/admin/day-and-night-dental-recovered/codex-launch-readiness-audit-2026-06-17/screenshots/`

Screenshots currently saved:

- `homepage-desktop-desktop-1440x900.png`
- `homepage-mobile-mobile-390x844.png`
- `homepage-tablet-tablet-820x1180.png`
- `header-desktop-desktop-1440x900.png`
- `header-mobile-mobile-390x844.png`
- `mobile-menu-open-390x844.png`
- `footer-desktop-desktop-1440x900.png`
- `footer-mobile-mobile-390x844.png`

The huge all-route/all-viewport browser matrix was started but stopped because it was overkill for this project size. A sane browser pass is still recommended before final go-live:

- all routes at one mobile viewport and one desktop viewport
- important pages across the full viewport list
- menu/form interaction checks
- screenshot capture for key sections

## Security Findings

### Strong Points

The PHP endpoint in `hostinger/api/send-enquiry.php` is unusually serious for a small practice website.

Confirmed controls:

- method restriction
- JSON content-type requirement
- 64KB request body cap
- max field count cap
- form type validation
- strict origin/referer allowlist
- rate limiting
- IPv6 /64 normalisation for rate limiting
- uses real `REMOTE_ADDR`, not spoofable forwarded headers
- honeypot
- client measured time-trap
- required fields
- length caps
- CRLF/header-injection rejection
- email validation
- HTML escaping
- cURL timeout for Resend
- JSON-only responses
- PHP errors hidden from client
- no obvious secrets exposed in source scan

Security headers on live Hostinger are strong:

- CSP present
- HSTS present
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `frame-ancestors 'none'`
- `object-src 'none'`

### Confirmed Security Gaps

#### SEC-01: CSP still allows inline script/style

Severity: P2  
File likely involved: `hostinger/.htaccess`, `src/lib/jsonLd.js`, `index.html`

The current CSP allows `'unsafe-inline'` for scripts/styles. This is common for SSG React sites with inline JSON-LD and boot scripts, but it is not a 10/10 CSP.

Recommended fix:

- Keep current CSP for launch if needed.
- Later move toward nonce/hash-based inline script handling where practical.
- Keep JSON-LD escaping tests.

Blocks launch: no  
Blocks 10/10 security: yes

#### SEC-02: Enquiry backup stores plaintext PII

Severity: P2  
File: `hostinger/api/send-enquiry.php`

The endpoint stores plaintext NDJSON backups above webroot for reliability. This is not public-web exposed, and it is protected by file permissions, but it means the site does store enquiry data for up to 90 days.

Recommended fix:

- Be precise internally: "no database" does not mean "no stored enquiry copy".
- Confirm cron purge runs reliably.
- Consider encryption at rest for the NDJSON backup.
- Document where the backup lives and who can access it.

Blocks launch: no  
Blocks 10/10 security/data posture: yes

#### SEC-03: Turnstile/CAPTCHA not active

Severity: P2  
File: `src/data/config.js`, `hostinger/api/send-enquiry.php`

The site has comments/config hooks for Turnstile but no active site key/secret. Current bot protection is good for launch, but a determined bot can still POST from allowed origins subject to rate limits.

Recommended fix:

- Add Cloudflare Turnstile or equivalent if spam becomes an issue.
- Keep honeypot/time-trap/rate-limit even after adding Turnstile.

Blocks launch: no

## Dependency/Tooling Findings

### DEP-01: Node version mismatch

Severity: P2  
Evidence: Vite preview warning

Project requires Node `>=20.19`. Current machine uses `v20.18.0`.

This does not currently break build, but it means local dev is technically outside the supported Vite version range.

Recommended fix:

- Use `.nvmrc` consistently.
- Run `nvm install && nvm use`.
- Make CI use Node 20.19+ or 22.12+.

Blocks launch: no  
Blocks clean engineering: yes

### DEP-02: `npm ls --all` fails

Severity: P1/P2  
Evidence: `logs/npm-ls-all.stderr`

`npm ls --all` reports invalid React packages:

- `react@19.2.7`
- `react-dom@19.2.7`

The app builds and tests pass, but the dependency tree is not clean. This is the sort of hidden problem that becomes painful later.

Recommended fix:

- Inspect `package.json` vs `package-lock.json`.
- Run clean install under correct Node/npm.
- Confirm `npm ls --all` exits 0.
- Do not paper over this with `legacy-peer-deps` unless absolutely required.

Blocks launch: not if build passes  
Blocks 9/10 dependency health: yes

## Code Quality Findings

### CODE-01: CSS is improved, but not world-class clean

Severity: P2  
Files:

- `src/styles/index.css`
- `src/styles/modules/*.css`

The CSS split is much better than a single giant file, but it is still not fully clean architecture. There are cross-module duplicate concepts, `!important` rules, and overflow clipping used defensively.

Examples:

- `register.css` and `contact.css` both define related form patterns.
- success/form/card patterns appear in more than one module.
- `register.css` includes comments about viewport overflow being masked by `overflow-x: clip`.
- `buttons.css` uses emergency button `!important` rules.

This is not broken. But it is a maintainability risk if future developers edit styles casually.

Recommended fix:

- Do not do a risky visual refactor before launch.
- After launch, centralise shared form/success/card primitives.
- Add Playwright screenshot smoke tests before CSS refactors.
- Keep responsive overrides inside owning modules.

Blocks launch: no

### CODE-02: Treatment data is JS object based, not schema-validated

Severity: P2  
Files:

- `src/pages/treatments/*.jsx`
- `src/components/TreatmentPage.jsx`

The treatment page system is good, but data shape is not enforced. A missing key or bad object can break a page without TypeScript catching it.

Recommended fix:

- Add tests that import every treatment page data object or exported config.
- Validate required fields: title, slug, meta title, meta description, FAQs, related links, CTA labels.
- Consider moving treatment data to a validated data module.

Blocks launch: no

### CODE-03: Some duplicated data/components remain

Severity: P3  
Files:

- `src/sections/SmileGallery.jsx`
- `src/sections/SmileGallerySpotlight.jsx`

Smile gallery data is duplicated across mobile/desktop variants. Not dangerous, but future edits can drift.

Recommended fix:

- Centralise smile gallery data into one data file.

Blocks launch: no

## Deployment/Hostinger Findings

### Strong Points

- Hostinger is now the clear target.
- `AGENTS.md` explicitly says not to use Netlify/Cloudflare legacy files.
- Deployment scripts are Hostinger-specific.
- `.htaccess` is doing useful work for redirects, headers, cache, and gate behavior.
- Live redirects are correct.
- `dist` does not expose obvious private/config/PHP/log/source-map files.

### DEPLOY-01: Legacy Netlify/Cloudflare material still exists

Severity: P3  
Folder: `legacy/`

This is documented and ignored, so it is not dangerous. But it can confuse future maintainers.

Recommended fix:

- Keep `legacy/` only if needed.
- Make it very explicit in README/RUNBOOK that it is dead code.

Blocks launch: no

### DEPLOY-02: Launch gate/check should use `LAUNCH=1`

Severity: P2  
File: `scripts/check.mjs`

Normal `npm run check` warns about parked placeholders. Go-live should run:

`LAUNCH=1 npm run check`

Recommended fix:

- Add a `check:launch` script.
- Use it before public go-live.

Blocks launch: no, if owner is intentionally ignoring placeholders  
Blocks final production discipline: yes

## Form Findings

### Strong Points

- Contact form posts to `/api/send-enquiry.php`.
- Register form also uses the same hardened submission helper.
- Client-side required validation exists.
- Server-side validation exists.
- Double submit guard exists.
- Error states exist.
- Success pages exist.
- Direct thank-you/registered hits are protected from fake conversion tracking.

### FORM-01: Valid form submission not tested

Severity: P2  

I did not submit a real valid lead because it would send a real practice email.

Recommended fix:

- Add a staging/test recipient mode.
- Add a dry-run test mode in PHP protected by server config.
- Or test once manually with owner permission and a clearly marked test lead.

Blocks launch: no, but live form must be manually verified before go-live.

## SEO Technical Findings

### Strong Points

- Titles exist.
- Meta descriptions exist.
- Canonicals point to apex domain.
- Sitemap exists.
- Robots exists.
- H1 count looked sane in generated pages.
- Legal pages accessible.
- 404 exists.
- Blog pages are indexable.
- LocalBusiness/Dentist schema exists.
- No fake aggregate ratings detected in the inspected schema path.

### SEO-01: Sitemap `lastmod` updates every build

Severity: P2  
File: `scripts/sitemap.mjs`

The sitemap sets every route's `lastmod` to the current build date. That is not ideal. It tells Google every page changed every build, even if nothing meaningful changed.

Recommended fix:

- Use source content dates where available.
- Use blog post dates for blog posts.
- Use static fallback dates for stable pages.
- Or omit `lastmod` unless it is meaningful.

Blocks launch: no

## Performance Findings

Performance is good, not elite.

Main reasons scores are not high 90s:

- LCP around 3.0s-3.6s.
- App JS bundle is heavier than a very lean static brochure site.
- Global CSS is loaded broadly.
- `logo-mark.png` is larger than needed for rendered size.
- Homepage uses an external Unsplash image, adding a third-party dependency and potential latency.

Recommended high-90s plan:

1. Identify exact LCP element per page.
2. Self-host and optimise the hero image.
3. Generate exact-size logo assets for header/footer/mobile.
4. Lazy-load below-fold heavy sections.
5. Reduce or split non-critical JS.
6. Keep HTML no-cache but long-cache assets in `.htaccess`.
7. Trim unused CSS only after browser screenshot tests exist.

## Accessibility Findings

Strong overall:

- Lighthouse accessibility is 97-100.
- Forms have labels/required fields.
- Header/mobile menu has ARIA controls.
- Skip link exists.
- Reduced motion CSS exists.

Issues:

### A11Y-01: Cookie/privacy link distinction

Severity: P3  
Files:

- `src/components/CookieConsent.jsx`
- `src/styles/modules/components.css`

Lighthouse flagged a link-in-text distinction issue on the privacy-policy link in the cookie banner. The link is colored, but not visually distinct enough from surrounding text by Lighthouse standards.

Recommended fix:

- Underline the cookie banner privacy link.
- Keep color contrast strong.

Blocks launch: no

### A11Y-02: Header logo accessible name is slightly redundant

Severity: P3  
File: `src/components/Header.jsx`

The logo link has `aria-label="Day Night Dental home"` and the logo image inside it has `alt="Day Night Dental logo"`. This may create redundant naming for assistive tech.

Recommended fix:

- Use empty `alt=""` on decorative logo mark if the parent link already has a clear label.

Blocks launch: no

## Branding/Asset Findings

Strong:

- Favicon files exist.
- Apple touch icon exists.
- OG image exists.
- Header/footer logos present.

Issues:

- Some code and copy still uses `Day Night Dental` while user prefers `DayNight Dental` in brand text. This may be intentional in some visual logo contexts, but brand spelling should be audited deliberately.
- `logo-mark.png` is oversized for some rendered contexts.

## Top Issues Ranked

1. **DEP-02**: `npm ls --all` fails due invalid React dependency tree.
2. **DEP-01**: Node 20.18 used while project requires 20.19+.
3. **SEC-02**: plaintext enquiry backup means data is stored despite "no database".
4. **SEC-01**: CSP still depends on `'unsafe-inline'`.
5. **FORM-01**: valid live form send not tested in this audit.
6. **CODE-01**: CSS still has maintainability risk.
7. **DEPLOY-02**: final launch check should have a hard `LAUNCH=1` mode/script.
8. **PERF-01**: LCP keeps performance out of high 90s.
9. **PERF-02**: oversized logo/image assets.
10. **SEO-01**: sitemap `lastmod` is build-date noisy.
11. **CODE-02**: treatment data lacks schema validation.
12. **QA-01**: no permanent browser smoke test suite in root project.
13. **DEPLOY-01**: legacy platform files remain and can confuse future maintainers.
14. **A11Y-01**: cookie privacy link visual distinction.
15. **A11Y-02**: redundant logo accessible naming.
16. **CODE-03**: duplicated smile gallery data.
17. **PERF-03**: homepage external Unsplash dependency.
18. **SEO-02**: placeholders still warned by check script.
19. **OPS-01**: analytics/conversion tracking currently disabled.
20. **OPS-02**: no documented form dry-run/staging mode.

## Must Fix Before Public Launch

Technical-only:

- Confirm dependency tree health or consciously accept it.
- Use correct Node version.
- Manually test one real form submission or add dry-run mode.
- Run `LAUNCH=1 npm run check` if placeholders/content are meant to be final.

## Should Fix Soon

- Add a root Playwright smoke test suite.
- Improve performance assets.
- Add `check:launch` script.
- Add treatment/blog data validation tests.
- Fix sitemap `lastmod`.
- Decide whether to encrypt enquiry backups.
- Add Turnstile if spam risk rises.

## Nice To Fix

- Underline cookie banner privacy link.
- Clean up redundant logo alt text.
- Centralise smile gallery data.
- Remove or further quarantine old legacy platform material.
- Audit brand spelling consistency.

## Final CTO Judgement

This website is technically much better than the average small dental website. It has proper SSG, good SEO fundamentals, serious security headers, a hardened PHP form endpoint, and clean enough routing/build logic.

But it is not 10/10 yet. The hidden risks are not "AI websites get hacked easily"; that is too vague. The real risks are normal engineering risks: dependency tree not clean, Node mismatch, no permanent browser QA suite, CSS that still needs discipline, and backend form storage that must be understood honestly.

Launchable? Yes, technically.

World-class? Not yet.

Path to 9/10: fix dependency health, pin Node, add Playwright smoke tests, optimise LCP/assets, add launch gate, validate data files, and tighten form/security operations.

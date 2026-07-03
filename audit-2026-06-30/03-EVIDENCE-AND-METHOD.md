# Evidence and method

Audit date: 30 June 2026

## Scope consumed

The audit followed the two owner-provided scopes:

1. Full technical, backend, performance, security, operations and launch-readiness scope.
2. Full Google SEO, local SEO, structured data, content, measurement and post-launch scope.
3. Added follow-up whole-code quality scope after owner challenge: active source architecture, contracts, test depth, CSS discipline, frontend and backend coupling, scripts, deploy code and future-backfire risk.

## Read-only methods

1. Repository and generated-build inspection.
2. Package, script, route, schema, metadata and server configuration review.
3. Existing test and quality-gate execution.
4. Local static preview of `dist`.
5. Chrome and Lighthouse checks.
6. Route and viewport browser automation.
7. No-JavaScript rendering checks.
8. Live HTTP, DNS, TLS, redirect, header, 404 and protected-path probes.
9. Public search research.
10. Official Google, Google Business Profile, Schema.org, OWASP, W3C, web.dev and ICO guidance.
11. Active-code inventory, static pattern scans and targeted file-by-file inspection across `src/`, `scripts/`, `hostinger/`, tests, CI and production public files.

No live form submission was made. No email was sent. No production data was changed.

## Commands and outcomes

### Build and quality

1. `npm run lint`: pass.
2. `npm run lint:css`: fail with two unknown CSS properties in `team.css`.
3. `npm test`: pass, 12 tests.
4. `npm run check`: pass.
5. `npm run check:launch`: pass.
6. `npm run ci`: fail at CSS lint.
7. `npm audit --omit=dev`: zero known vulnerabilities.
8. `bash -n hostinger/deploy-local.sh`: pass.
9. `python3 -m py_compile hostinger/deploy.py`: pass.
10. PHP syntax: not run because PHP was not installed in the audit environment.

### Build inventory

1. `dist`: 7.3 MB.
2. Total files: 267.
3. Real prerendered routes: 39.
4. Intended indexable URLs in sitemap: 37.
5. Total HTML including preview lab: 156.
6. Homepage HTML: 193,334 bytes.
7. Homepage inline CSS: 102,241 bytes.
8. Homepage app JavaScript: 144,322 raw, 42,407 gzip.
9. Shared client JavaScript: 180,767 raw, 56,833 gzip.
10. Vendor JavaScript: 73,963 raw, 25,251 gzip.
11. App CSS: 154,833 raw, 27,619 gzip.

### Active code-quality inventory

1. Active source lines counted: 14,320.
2. JSX files: 65.
3. CSS files: 22.
4. JS files: 10.
5. MJS files: 4.
6. CJS files: 2.
7. PHP files: 4.
8. Python deploy helper: 1.
9. Shell deploy wrapper: 1.
10. `.htaccess` files: 3.
11. Largest stylesheet: `src/styles/modules/treatments.css`, 1,039 lines.
12. Largest React component: `src/components/TreatmentPage.jsx`, 494 lines.
13. Main PHP endpoint: `hostinger/api/send-enquiry.php`, 392 lines.
14. CSS metrics: about 744 selector openings, 93 media rules, 18 keyframe blocks, 29 `!important` lines, 100 gradient lines and 82 `color-mix()` lines.
15. Static scan found 35 inline style blocks, 27 index-key usages and one ESLint suppression.
16. Treatment data scan found 21 treatment pages, 11 invalid `procedureType` values and zero reviewer fields.

### Route browser run

1. Routes: 39.
2. Viewports: 320 by 568, 390 by 844, 820 by 1180, 1440 by 900.
3. Total checks: 156.
4. Non-200 local responses: 0.
5. Page exceptions: 0.
6. Console warnings or errors: 0.
7. Failed requests: 0.
8. Body horizontal overflow: 0.
9. Duplicate IDs: 0.
10. Unnamed buttons or links: 0.
11. Broken same-route hash targets: 0.

### Lighthouse

| Template | Device | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 93 | 93 | 100 | 100 | 3.0 s | 0 ms | 0 |
| Home | Desktop | 100 | 93 | 100 | 100 | 0.6 s | 0 ms | 0 |
| Emergency | Mobile | 93 | 100 | 100 | 100 | 3.0 s | 0 ms | 0 |
| Registration | Mobile | 94 | 100 | 100 | 100 | 2.9 s | 0 ms | 0 |
| Blog index | Mobile | 94 | 100 | 100 | 100 | 2.9 s | 0 ms | 0 |
| Treatments index | Mobile | 94 | 100 | 100 | 100 | 2.9 s | 0 ms | 0 |

These are lab measurements. No CrUX or Search Console field dataset was available.

### Generated SEO inventory

1. Real HTML documents including 404: 40.
2. Indexable: 37.
3. Noindex real documents: 3.
4. Unique titles: 40.
5. Descriptions: 37, one for every indexable page.
6. Duplicate titles: 0.
7. Duplicate descriptions: 0.
8. Real documents without exactly one H1: 0.
9. JSON-LD parse errors: 0.
10. Semantically invalid treatment `@type` values: 11.

### Live probes

Observed before Hostinger temporarily challenged the audit burst:

1. Homepage HTTP 200.
2. `/contact/` HTTP 404.
3. `/.vite/manifest.json` HTTP 200.
4. `/api/_config.php` HTTP 403.
5. `/.well-known/security.txt` HTTP 404.
6. Strong baseline security headers.
7. HTTP/2 and HTTP/3 advertisement.
8. Fast sampled origin or edge response.
9. Repeated requests triggered a Hostinger HTTP 403 challenge.

## Raw files

1. `evidence/browser-audit.json`
2. `evidence/lighthouse/home-mobile.json`
3. `evidence/lighthouse/home-desktop.json`
4. `evidence/lighthouse/emergency-mobile.json`
5. `evidence/lighthouse/register-mobile.json`
6. `evidence/lighthouse/blog-mobile.json`
7. `evidence/lighthouse/treatments-mobile.json`
8. `evidence/npm-audit-production.json`
9. `04-CODE-QUALITY-WORLD-CLASS-AUDIT.md`
10. `05-CLAUDE-FULL-DEEP-CODE-PROMPT.md`

## Audit limitations

1. No Search Console access.
2. No Google Business Profile access.
3. No GA4 or Meta account access.
4. No Hostinger panel, cron, backup, WAF or mailbox access.
5. No production form submission.
6. No PHP runtime in the local environment.
7. No authenticated penetration test.
8. No load or capacity test.
9. No formal legal review.
10. No clinical review.
11. No direct GDC register verification for every clinician.
12. No proof of image licence or consent was available.

Findings that depend on owner or platform evidence are labelled as unverified rather than asserted as fact.

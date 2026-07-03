# Day Night Dental code-quality and world-class readiness audit

Audit date: 30 June 2026

Repository audited: `/Users/admin/day-and-night-dental-recovered`

Mode: read only. No production source was changed by this code-quality pass.

## 1. Direct verdict

The active codebase is **not world-class yet**.

It is not garbage. It has several strong engineering decisions:

1. Static prerendering gives Google and no-JavaScript users real HTML.
2. Route-level code splitting is present.
3. NAP data is centralized in `src/data/practice.js`.
4. JSON-LD serialization escapes script-breaking characters.
5. The form submit helper has an abort timeout.
6. Browser APIs are mostly kept inside effects, handlers or client helpers.
7. There is a real CI workflow and some tests.
8. The PHP endpoint contains several good defensive controls.

But "world-class code" means predictable contracts, typed or validated data, strong automated regression coverage, accessible interaction primitives, disciplined CSS, safe deploys, backend tests, observability and hard launch gates.

This codebase does not meet that bar today. It is a good pre-launch marketing-site codebase with strong bones and several high-risk gaps.

## 2. Scope of this pass

Included active code:

1. `src/`
2. `scripts/`
3. `hostinger/`
4. `.github/workflows/ci.yml`
5. package, Vite, ESLint and Stylelint config
6. production public files such as `public/404.html`

Excluded from code-quality scoring:

1. `legacy/`
2. `node_modules/`
3. generated `dist/`
4. noindex design-lab preview mockups, except where build/deploy leakage matters
5. older audit folders, except as evidence that this repo has accumulated audit artifacts

## 3. Active code inventory

Measured active files:

| Area | Count |
| --- | ---: |
| JSX | 65 |
| CSS | 22 |
| JS | 10 |
| MJS | 4 |
| CJS | 2 |
| PHP | 4 |
| Python | 1 |
| Shell | 1 |
| `.htaccess` | 3 |

Measured active lines:

1. Total active source inspected: 14,320 lines.
2. CSS: 6,249 lines.
3. Largest stylesheet: `src/styles/modules/treatments.css`, 1,039 lines.
4. Largest React component: `src/components/TreatmentPage.jsx`, 494 lines.
5. Form endpoint: `hostinger/api/send-enquiry.php`, 392 lines.
6. Registration section: `src/sections/Register.jsx`, 360 lines.
7. Homepage treatment selector: `src/sections/Treatments.jsx`, 329 lines.

## 4. Code-quality severity model

1. **CQ-P0:** Code-quality issue that is already causing a launch blocker or can break conversion, security or patient-data safety.
2. **CQ-P1:** High future-risk issue that can silently regress the site or make fixes fragile.
3. **CQ-P2:** Maintainability, testability or architecture debt.
4. **CQ-P3:** Hygiene.
5. **Pass:** Strong pattern found.

Count from this code-quality pass:

1. CQ-P0: 3
2. CQ-P1: 8
3. CQ-P2: 7
4. CQ-P3: 4

## 4A. Current scorecard and target scorecard

These numbers are judgement scores, not automated measurements. They summarize the findings in this report and give Claude a clear target.

| Area | Current score | Launch target | Why it is not a 9 yet |
| --- | ---: | ---: | --- |
| Architecture | 6.5/10 | 9/10 | Strong SSG and route splitting, but route, nav, treatment and content truth are duplicated across too many files. Treatment pages have no enforced data contract. |
| Code quality | 6.5/10 | 9/10 | Good foundations and readable code, but too much critical business and content behavior depends on convention instead of validation. |
| Testing | 3/10 | 9/10 | Tests cover small helpers and NAP basics, not route rendering, internal links, schema semantics, accessibility flows, PHP endpoint behavior or deploy risk. |
| CSS discipline | 5/10 | 9/10 | Visually ambitious, but large, gradient-heavy, currently failing lint, and not automatically enforcing owner color, contrast and no-gradient rules. |
| Backend and form safety | 5.5/10 | 9/10 | Endpoint has good defensive checks, but Turnstile is not deployable, validation is too loose, frontend and PHP field contracts drifted, PHP tests are missing and backup behavior needs hardening. |
| Deployment safety | 4/10 | 9/10 | Deploy uploads files but is not atomic, does not delete stale files, lacks rollback, uploads can leave a mixed release and post-deploy smoke checks are not strong enough. |
| Accessibility engineering | 5.5/10 | 9/10 | Good intent and some focus handling, but custom widgets are under-tested and the homepage currently has invalid ARIA and nested interactive controls. |
| Technical SEO foundation | 8/10 | 9/10 | Static rendering, metadata, sitemap and canonicals are strong, but broken links and invalid schema types keep it below 9. |
| Local SEO and Google trust | 4.5/10 | 9/10 | NAP and entity truth are not proven, Google Business Profile is not confirmed, and public search signals conflict with the new brand. |
| Observability and operations | 3.5/10 | 9/10 | There is no real frontend error reporting, RUM, field Core Web Vitals evidence, uptime monitoring or structured form pipeline telemetry. |

Overall current state: **polished pre-launch codebase with strong bones, not world-class yet.**

Required target state: **every core category at 9/10 or explicitly accepted by the owner with written risk ownership.**

## 5. CQ-P0 code-quality blockers

### CQ-01 CI is not green, so the code cannot be called launch-quality

Severity: **CQ-P0**

Evidence:

1. `npm run lint:css` fails.
2. The failing file is `src/styles/modules/team.css`.
3. The failing properties are `text-stroke` and `text-stroke-color`.
4. `.github/workflows/ci.yml` runs `npm run ci`, so the configured pipeline is red.

Why this is a code-quality blocker:

A world-class codebase does not ship from a red pipeline. It also does not keep a "known failing" lint command inside CI unless that failure is explicitly and temporarily tracked.

Required fix:

1. Replace invalid declarations with supported prefixed declarations, or add a narrow documented Stylelint exception.
2. Make `npm run ci` green on Node 20.19.
3. Keep `npm run check:launch` as an extra gate, not a substitute for CI.

### CQ-02 The active route graph has a broken internal link that the code checks missed

Severity: **CQ-P0**

Evidence:

1. `src/sections/ConcernsBento.jsx:172` links to `/contact/`.
2. `src/routes.jsx` has no `/contact/` route.
3. Existing `scripts/check.mjs:51-61` checks only `/treatments/<slug>/` links.
4. The previous technical audit confirmed `/contact/` is a real 404.

Why this is a code-quality blocker:

The bug itself is simple. The deeper problem is that a prominent conversion bug escaped every local test and launch check.

Required fix:

1. Fix the URL.
2. Add a generated-site internal-link crawler that checks every local URL and same-page hash.
3. Fail launch checks on any internal 404.

### CQ-03 Frontend and backend form contracts are split and already drifted

Severity: **CQ-P0**

Evidence:

1. Contact form sends `preference` from `src/sections/Contact.jsx:225`.
2. Register form sends `careType`, `dentistPreference` and `referral` from `src/sections/Register.jsx:297`, `src/sections/Register.jsx:311` and `src/sections/Register.jsx:316`.
3. PHP backup allowlist at `hostinger/api/send-enquiry.php:325-328` stores `preferredTime`, `preferredDay` and `preferredContact`, but not `preference`, `careType`, `dentistPreference` or `referral`.
4. The email includes all rows, but the fail-safe backup can lose useful triage fields if Resend fails.

Why this is a code-quality blocker:

This is exactly what happens when two runtimes implement one form contract by hand. A failure path can silently store incomplete data.

Required fix:

1. Define an explicit contact and registration payload schema.
2. Use the same canonical field names in React, PHP, backups, monitoring and tests.
3. Add a test that submits representative payloads and verifies the stored backup includes every intended field.
4. Decide whether unknown fields should be rejected, ignored or stored separately.

## 6. CQ-P1 high-severity code-quality findings

### CQ-04 Treatment pages have no enforced data contract

Severity: **CQ-P1**

Evidence:

1. There are 21 treatment pages under `src/pages/treatments/`.
2. Each page defines a large `data` object and passes it to `TreatmentPage`.
3. `TreatmentPage` assumes fields such as `seo`, `faqs`, `meta`, `facts`, `benefits`, `related` and optional nested sections.
4. No TypeScript, PropTypes, Zod, JSON Schema or custom validator enforces this shape.
5. Eleven pages already shipped invalid `procedureType` values.
6. All 21 treatment pages have `lastReviewed`, but none has a `reviewer`.

Treatment procedure scan:

| Page | Slug | `procedureType` | Reviewer |
| --- | --- | --- | --- |
| `ChildrensDentistry.jsx` | `childrens-dentistry` | `Dentistry` | no |
| `CompositeBonding.jsx` | `composite-bonding` | `Dentistry` | no |
| `CosmeticDentistry.jsx` | `cosmetic-dentistry` | `CosmeticProcedure` | no |
| `DentalBridges.jsx` | `dental-bridges` | `MedicalProcedure` | no |
| `DentalCheckUps.jsx` | `dental-check-ups` | `Dentistry` | no |
| `DentalCrowns.jsx` | `dental-crowns` | `MedicalProcedure` | no |
| `DentalHygiene.jsx` | `dental-hygiene` | `Dentistry` | no |
| `DentalImplants.jsx` | `dental-implants` | `SurgicalProcedure` | no |
| `Dentures.jsx` | `dentures` | `Dentistry` | no |
| `EmergencyDentist.jsx` | `emergency-dentist` | `Dentistry` | no |
| `GeneralDentistry.jsx` | `general-dentistry` | `Dentistry` | no |
| `GumDiseaseTreatment.jsx` | `gum-disease-treatment` | `MedicalProcedure` | no |
| `InlaysOnlays.jsx` | `inlays-onlays` | `MedicalProcedure` | no |
| `Invisalign.jsx` | `invisalign` | `Orthodontics` | no |
| `NervousPatients.jsx` | `nervous-patients` | `Dentistry` | no |
| `PorcelainVeneers.jsx` | `porcelain-veneers` | `Dentistry` | no |
| `RootCanalTreatment.jsx` | `root-canal-treatment` | `MedicalProcedure` | no |
| `SmileMakeover.jsx` | `smile-makeover` | `Dentistry` | no |
| `TeethWhitening.jsx` | `teeth-whitening` | `CosmeticProcedure` | no |
| `ToothExtraction.jsx` | `tooth-extraction` | `MedicalProcedure` | no |
| `WhiteFillings.jsx` | `white-fillings` | `MedicalProcedure` | no |

Required fix:

1. Add a build-time treatment-data validator.
2. Validate slug, title, `h1Plain`, SEO, meta, facts, FAQs, related slugs, procedure type, reviewer policy, date format and price/finance fields.
3. Fail CI on invalid schema types or missing required clinical metadata.
4. Prefer TypeScript or a runtime schema library if the project is willing to add tooling.

### CQ-05 Business route truth is duplicated in too many places

Severity: **CQ-P1**

Evidence:

1. `src/data/treatments.js:8-30` defines 21 treatment slugs.
2. `src/routes.jsx:23-43` repeats every treatment route manually.
3. `src/sections/Treatments.jsx:10-17` defines a separate `slugMap`.
4. `src/sections/Treatments.jsx:21-86` defines a separate homepage treatment list.
5. `src/components/MobileMenu.jsx:7-14` hardcodes six treatment links.
6. `src/components/Footer.jsx` hardcodes treatment links.
7. `src/sections/ConcernsBento.jsx` hardcodes concern to treatment URLs.

Why this matters:

The code already tries to centralize treatment titles, but the route and navigation systems are still partially duplicated. This creates drift risk as soon as a treatment is renamed, removed, noindexed or added.

Required fix:

1. Use the treatment registry to generate route imports, nav lists, footer links, homepage cards and related treatment checks where practical.
2. If lazy imports prevent full generation, add a route registry that maps slug to component import and metadata in one place.
3. Add CI checks proving every treatment slug has:
   1. a page component,
   2. a route,
   3. a sitemap URL,
   4. a canonical,
   5. no broken links.

### CQ-06 The automated test suite is far too shallow for the risk profile

Severity: **CQ-P1**

Evidence:

1. Only two test files exist: `src/__tests__/data.test.js` and `src/__tests__/lib.test.js`.
2. They cover NAP basics, `buildEnquiryExtras`, `jsonLd` escaping and `submitEnquiry` request shape.
3. No tests cover:
   1. route rendering,
   2. treatment page data shape,
   3. internal links,
   4. structured data semantics,
   5. accessibility interactions,
   6. form validation,
   7. PHP endpoint validation,
   8. deploy ordering,
   9. owner rules,
   10. CSS launch rules.

Required fix:

1. Add unit tests for validators and pure data helpers.
2. Add route-level render tests for every template.
3. Add Playwright tests for homepage, menu, treatments, contact, register and no-JavaScript routes.
4. Add PHP endpoint tests with representative payloads, malformed payloads and abuse cases.
5. Add a generated-build crawl as a CI step.

### CQ-07 Custom accessibility primitives are hand-rolled without enough protection

Severity: **CQ-P1**

Evidence:

1. `Dropdown.jsx` implements a custom listbox.
2. `MobileMenu.jsx` implements its own dialog, focus trap and scroll lock.
3. `HomeFaq.jsx` implements custom keyboard behavior.
4. `Treatments.jsx` implements a custom tablist and mobile accordion hybrid.
5. `SmileGallerySpotlight.jsx` implements a tablist-like gallery.
6. The homepage treatment selector already has invalid nested interactive content and invalid tablist children.

Why this matters:

Hand-rolled accessibility can be fine, but only with tests. Without tests, one future design tweak can break keyboard navigation, names, roles, focus and screen-reader behavior.

Required fix:

1. Either simplify to native HTML patterns, or create a tested local primitive library.
2. Add keyboard tests for Tab, Shift+Tab, Escape, Enter, Space, arrow keys, Home and End where relevant.
3. Add axe checks to representative templates.
4. Add manual screen-reader notes to the release checklist.

### CQ-08 CSS architecture is not world-class

Severity: **CQ-P1**

Evidence:

1. 22 CSS files.
2. 6,249 CSS lines.
3. About 744 selector openings.
4. 93 media rules.
5. 18 keyframe blocks.
6. 29 `!important` lines.
7. 100 gradient lines.
8. 82 `color-mix()` lines.
9. Stylelint config disables several useful strictness rules.
10. CSS lint currently fails.

Why this matters:

This CSS can produce a polished look, but it is not controlled enough for a strict brand and accessibility launch. The owner has a no-gradient rule, yet gradients are widespread. Contrast failures also prove that the token system is not enforcing accessible color combinations.

Required fix:

1. Decide whether the owner means no gold-to-blue gradients only, or no gradients at all.
2. Encode the rule in Stylelint or a custom CSS audit.
3. Add color contrast checks for exposed text tokens.
4. Reduce `!important`.
5. Split or refactor the largest files once behavior is stable.
6. Add design-token documentation for allowed colors, states, shadows, motion and focus rings.

### CQ-09 The PHP endpoint is one large mixed-concern file

Severity: **CQ-P1**

Evidence:

1. `hostinger/api/send-enquiry.php` is 392 lines.
2. It handles headers, config loading, request parsing, origin checks, Turnstile, rate limiting, validation, email formatting, backup storage, Resend delivery and failure tracking.
3. There are no PHP unit tests.
4. PHP syntax was not verified in the audit environment because PHP was unavailable.

Why this matters:

For a tiny endpoint, one file is acceptable. For patient enquiry data and registration fields, this is now business-critical infrastructure. Mixed concerns make it harder to test edge cases without making live requests.

Required fix:

1. Split validators, storage, rate limiter and Resend sender into testable functions or files.
2. Add PHP 8 syntax check to CI.
3. Add endpoint tests for every accepted and rejected payload.
4. Add request IDs and structured logs.

### CQ-10 Content is embedded as code without an editorial contract

Severity: **CQ-P1**

Evidence:

1. Treatment content lives in large JS object literals inside page components.
2. Blog content lives in `src/data/blog.js`.
3. Clinical review status, source references, author, reviewer, claim evidence and owner approval are not enforced fields.
4. Content changes require a code deployment.

Why this matters:

For a dental site, content is not just marketing text. It contains medical, legal, finance and availability claims. World-class code would treat that content as structured, reviewable, validated data.

Required fix:

1. Add editorial metadata fields:
   1. author,
   2. reviewer,
   3. clinical review date,
   4. source list,
   5. claim owner,
   6. approval status.
2. Fail launch checks if clinical pages lack required metadata.
3. Consider moving content into typed data files, MDX with frontmatter, or a CMS only if governance exists.

### CQ-11 Operational values are scattered and partly hardcoded

Severity: **CQ-P1**

Evidence:

1. `src/sections/Register.jsx:17` hardcodes `DOB_CURRENT_YEAR = 2026`.
2. `src/components/Footer.jsx` server-renders 2026 before client update.
3. `hostinger/cron/monitor.php:22` hardcodes the Resend domain ID.
4. `hostinger/deploy.py:67-69` hardcodes sender, recipient and site in generated PHP config.
5. `public/404.html` hardcodes phone and brand values outside `src/data/practice.js`.

Why this matters:

Some hardcoding is deliberate for SSR determinism, but world-class code centralizes operational truth or validates exceptions. January 2027 should not create stale DOB options because someone forgot a constant.

Required fix:

1. Move deploy-time operational values into environment variables with validation.
2. Add a launch check for stale years and hardcoded NAP outside approved files.
3. Generate the static 404 from the same practice data, or add it to the NAP drift check.

## 7. CQ-P2 maintainability findings

### CQ-12 Inline styles weaken design-system control

Severity: **CQ-P2**

Evidence:

1. Static scan found 35 inline style blocks in active source.
2. Examples include `TreatmentPage.jsx`, `Register.jsx`, `Contact.jsx`, `Footer.jsx` and `ErrorBoundary.jsx`.

Impact:

Inline styles make theme, responsive and accessibility auditing harder. They also hide design decisions from CSS lint rules.

Required fix:

Move repeated inline styles into classes or tokenized utility classes. Keep inline styles only for genuinely dynamic values that are validated.

### CQ-13 Index keys are widely used in rendered lists

Severity: **CQ-P2**

Evidence:

Static scan found 27 index-key usages, including `TreatmentPage.jsx`, `ArticleLayout.jsx`, `LegalPage.jsx` and gallery areas.

Impact:

Index keys are acceptable for static immutable content, but they become fragile if content is reordered, filtered or edited. This project is content-heavy, so stable IDs are safer.

Required fix:

Add stable IDs to content arrays and use them as keys. The data validator should require unique IDs where list items are rendered.

### CQ-14 Error reporting is local-only

Severity: **CQ-P2**

Evidence:

1. `ErrorBoundary.jsx` logs to `console.error`.
2. There is no Sentry, log drain, browser error reporting, request ID or RUM.
3. Form failures return generic UI messages and logs are only server-side.

Impact:

After launch, the owner will not know whether users hit render errors, failed submissions, hydration problems or slow mobile LCP unless someone complains.

Required fix:

Add privacy-safe frontend error reporting, form submission telemetry, uptime checks and Web Vitals field collection.

### CQ-15 Analytics consent has a same-session re-accept edge case

Severity: **CQ-P2**

Evidence:

1. `src/lib/analytics.js` keeps `loaded` as a module variable.
2. `disableAnalytics()` can set the GA disable flag and replace `fbq`.
3. `loadAnalytics()` returns early if `loaded` is already true.

Impact:

If a user accepts, withdraws and then accepts again in the same session, tracking may not fully resume until reload. That is not a launch blocker, but it is a consent-state correctness issue.

Required fix:

Model analytics state explicitly: `unloaded`, `loaded`, `disabled`. Clear GA disable flags on reaccept and rebuild the Meta pixel path predictably.

### CQ-16 Build scripts are useful but string-rewrite heavy

Severity: **CQ-P2**

Evidence:

1. `scripts/fix-head.mjs` rewrites HTML with regex.
2. `scripts/sitemap.mjs` infers page dates from JSON-LD text.
3. `scripts/check.mjs` scans generated strings.

Impact:

String post-processing is pragmatic for a static build, but it can silently fail when upstream HTML output changes.

Required fix:

1. Add snapshot tests or fixtures for `fix-head`.
2. Verify post-build HTML invariants explicitly.
3. Prefer DOM parsing for structural edits if the regex surface grows.

### CQ-17 Dependency lifecycle is under-controlled

Severity: **CQ-P2**

Evidence:

1. No Dependabot or Renovate config was found.
2. `vite-react-ssg@0.9.0` depends on nested `react-helmet-async@1.3.0`.
3. That nested `react-helmet-async` package declares React peer support only for React 16, 17 and 18, while the app uses React 19.
4. Build works today, but the dependency graph is not fully aligned.

Required fix:

1. Add dependency update automation.
2. Track the React 19 compatibility risk around the SSG/head stack.
3. Keep a monthly dependency health check.

### CQ-18 Source hygiene is not clean enough

Severity: **CQ-P2**

Evidence:

1. `src/.DS_Store` exists.
2. The repo contains multiple old audit artifact folders.
3. No Prettier config was found.
4. The active worktree is dirty.

Impact:

This does not break the website, but world-class repositories keep source trees intentional and reproducible.

Required fix:

1. Remove accidental OS files.
2. Add `.gitignore` coverage if missing.
3. Decide what audit artifacts should be kept, archived or moved outside the app repo.
4. Add formatting if the team wants consistent code style.

## 8. CQ-P3 hygiene findings

### CQ-19 Public 404 is outside the normal app/data system

Severity: **CQ-P3**

Evidence:

`public/404.html` hardcodes brand colors, phone number and a gold-to-blue text gradient.

Required fix:

Generate it from shared data or include it in owner-rule checks.

### CQ-20 Some comments overclaim safety

Severity: **CQ-P3**

Evidence:

Examples:

1. Comments say the rate limiter is "FAIL-LOUD," but `send-enquiry.php:234-238` logs and allows the request when no limiter store is available.
2. Comments in `Team.jsx` reference placeholder gating, but current team data has real names and `check:launch` is not broad enough to protect every owner data issue.

Required fix:

Make comments match runtime behavior exactly. Comments are part of code quality when future developers rely on them.

### CQ-21 Lab scripts use `innerHTML`, which is acceptable only because preview is excluded

Severity: **CQ-P3**

Evidence:

1. `scripts/lab-nav.cjs` uses `innerHTML`.
2. Preview files are noindex and not treated as the live site.

Required fix:

No urgent production fix if preview remains noindex and isolated. If preview ever becomes public tooling, sanitize or build DOM nodes directly.

### CQ-22 Local audit runtime was not on the declared Node version

Severity: **CQ-P3**

Evidence:

1. `.nvmrc` requires Node 20.19.0.
2. The audit shell reported Node 20.18.0.
3. Vite warns on Node versions below its requirement.

Required fix:

Use Node 20.19 before making implementation decisions or CI parity claims.

## 9. Good code patterns worth preserving

1. `src/data/practice.js` centralizes NAP.
2. `src/lib/jsonLd.js` safely escapes JSON-LD.
3. `src/routes.jsx` uses lazy route loading and keeps the homepage path lean.
4. `vite.config.js` keeps vendor code in a stable chunk.
5. `src/lib/submitEnquiry.js` uses an abort timeout.
6. `Contact.jsx` and `Register.jsx` use synchronous refs to prevent rapid double-submit.
7. `MobileMenu.jsx` has a real focus-trap attempt and scroll lock.
8. `Layout.jsx` handles hash scrolling and focus after route changes.
9. `CookieConsent.jsx` gates analytics before consent.
10. `send-enquiry.php` rejects non-JSON, caps body size, caps field count, rejects bad origin, rejects CRLF in single-line fields, escapes email HTML and avoids trusting forwarded IP headers.

These are good foundations. They should be hardened, not thrown away.

## 10. World-class remediation path

### Phase 1: Make current code safe and green

1. Fix CSS lint.
2. Fix `/contact/`.
3. Fix the form backup allowlist drift.
4. Fix invalid ARIA/nested controls.
5. Fix invalid schema types.
6. Add internal link crawl.
7. Add owner-rule checks.
8. Add public `.vite` manifest check.

### Phase 2: Add contracts

1. Add treatment data validation.
2. Add blog data validation.
3. Add form payload validation for frontend and backend.
4. Add route registry validation.
5. Add CSS owner-rule validation.

### Phase 3: Add tests that match the business risk

1. React route rendering tests.
2. Playwright E2E for main flows.
3. Accessibility regression tests.
4. PHP endpoint unit and integration tests.
5. Build artifact tests.
6. Deploy dry-run and interrupted-deploy tests.

### Phase 4: Refactor for maintainability

1. Centralize navigation, treatment and route metadata.
2. Reduce CSS duplication and `!important`.
3. Move inline styles into classes.
4. Add stable IDs to content arrays.
5. Split the PHP endpoint into testable units.
6. Move operational constants into environment or shared config.

### Phase 5: Operate it like a real launch

1. Add frontend error reporting.
2. Add uptime checks.
3. Add Web Vitals field measurement.
4. Add form pipeline monitoring with request IDs.
5. Add dependency update automation.
6. Add rollback-capable deployment.

## 11. Definition of "world-class enough to launch"

Do not call the code world-class until:

1. CI is green on a clean checkout using Node 20.19.
2. All production route links are crawled and valid.
3. Treatment and blog data contracts are validated at build time.
4. Schema types are semantically valid.
5. Accessibility tests cover every custom interactive pattern.
6. Form frontend, server validation, backups and emails share one contract.
7. PHP endpoint tests run in CI.
8. CSS owner rules are enforced automatically.
9. Launch checks fail on known placeholders, TODO NAP, prohibited gradients and public build artifacts.
10. Deploy is ordered, verifiable and reversible.
11. Runtime monitoring exists.
12. Content claims, clinical review and owner approvals are represented in structured data or validated metadata.

Current state: **good foundations, not world-class, not launch-ready.**

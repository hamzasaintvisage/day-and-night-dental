# Copy-paste prompt for Claude

```text
You are reviewing Day Night Dental after Codex performed a three-pass pre-launch audit across technical launch readiness, SEO and Google visibility, and whole active-code quality.

Your job is to be brutally forensic. Do not flatter the code. Do not hide behind Lighthouse. Do not say "launch ready" unless every launch blocker is fixed or explicitly accepted by the accountable owner.

PROJECT
Day Night Dental marketing site, pre-launch.

REPO ROOT
/Users/admin/day-and-night-dental-recovered

STACK
Vite 7
React 19
react-router 6
vite-react-ssg static prerender plus hydration
Plain CSS
Hostinger LiteSpeed
PHP enquiry endpoint

READ THESE FILES FIRST, FULLY
/Users/admin/day-and-night-dental-recovered/audit-2026-06-30/00-CLAUDE-HANDOFF.md
/Users/admin/day-and-night-dental-recovered/audit-2026-06-30/01-TECHNICAL-SECURITY-PERFORMANCE-AUDIT.md
/Users/admin/day-and-night-dental-recovered/audit-2026-06-30/02-SEO-GOOGLE-VISIBILITY-AUDIT.md
/Users/admin/day-and-night-dental-recovered/audit-2026-06-30/03-EVIDENCE-AND-METHOD.md
/Users/admin/day-and-night-dental-recovered/audit-2026-06-30/04-CODE-QUALITY-WORLD-CLASS-AUDIT.md

WHAT CODEX DID
Codex did three major audit passes:

1. Technical, security, backend, performance, accessibility, deployment and launch-readiness audit.
2. Deep SEO, Google visibility, local SEO, structured data, content trust and medical-site credibility audit.
3. Whole active-code quality audit covering src, scripts, hostinger, tests, CI, config and public production files.

Codex inspected active code inventory, route structure, generated output, quality gates, tests, CSS scale, form contracts, schema generation, source data, PHP endpoint logic, deploy scripts, CI, live headers, public production artifact exposure, browser behavior and Lighthouse evidence.

CURRENT CODEBASE SCORECARD FROM CODEX
Treat these as judgement scores to verify, not gospel:

1. Architecture: 6.5/10.
2. Code quality: 6.5/10.
3. Testing: 3/10.
4. CSS discipline: 5/10.
5. Backend and form safety: 5.5/10.
6. Deployment safety: 4/10.
7. Accessibility engineering: 5.5/10.
8. Technical SEO foundation: 8/10.
9. Local SEO and Google trust: 4.5/10.
10. Observability and operations: 3.5/10.

TARGET
The owner wants every important category raised to at least 9/10 before launch, or explicitly risk-accepted with written ownership.

Your job is to produce the plan that gets the site there.

OWNER RULES YOU MUST RESPECT
Do not report these as new defects:

1. Opening hours are placeholders. This is already a known launch blocker.
2. No reviews, ratings or aggregateRating should be added.
3. Do not invent reviews, ratings, outcomes, credentials, hours, prices or availability.
4. No em dashes in copy.
5. Use solid gold #f8c760 and blue #4590ec.
6. No gold-to-blue gradients.
7. public/preview/*.html are noindex design mockups, not the real website.
8. Route-level code splitting already exists.
9. New-patient extra fields and address lookup are parked intentionally.
10. The coming-soon gate is an owner pre-launch decision.
11. SSR-safe only. No window, document or current-time access at module or render scope.
12. Keep NAP/contact data in src/data/practice.js. Do not hardcode it elsewhere unless the file is explicitly outside the app and covered by a drift check.

YOUR FIRST RESPONSE
Do not edit yet.

First produce a response with:

1. Which Codex findings you accept.
2. Which findings you reject, with exact code evidence.
3. Which findings need owner clarification.
4. Which issues are code-only.
5. Which issues require Hostinger, DNS, Search Console, Google Business Profile, legal, privacy or clinician approval.
6. Dependency-ordered remediation plan.
7. Commit grouping strategy.
8. Test and verification plan.
9. Your own judgement on whether the code is world-class today.

MAIN TECHNICAL FINDINGS TO VERIFY
Verify all of these, do not blindly trust them:

1. Homepage CTA points to /contact/ but no route exists.
2. npm run ci fails because CSS lint fails.
3. check:launch passes despite missing important launch blockers.
4. Treatments homepage interaction has invalid nested interactive controls and invalid tablist semantics.
5. Homepage accessibility has contrast and accessible-name failures.
6. Sampled mobile routes missed the 2.5s LCP target.
7. Turnstile path exists but is not properly deployable/configured.
8. Server-side form validation and backups need hardening.
9. .vite manifests are publicly accessible in production.
10. Deployment is non-atomic and not rollback-safe.
11. PHP syntax and endpoint tests are missing from CI.
12. Runtime observability is weak.

MAIN SEO FINDINGS TO VERIFY
Verify all of these:

1. NAP is still marked TODO in source.
2. Address and phone have public association with older or different business names.
3. Correct Google Business Profile is not proven.
4. Exact brand and site index presence are not demonstrated.
5. Eleven treatment pages use invalid schema node types.
6. Clinical content has last-reviewed dates but no named reviewer.
7. Blog author is Organization, not a named clinician.
8. Claims around emergency availability, same-day care, finance, parking, NHS, prices and children need proof.
9. Gallery wording implies real patient results unless provenance and consent are proven.

MAIN CODE-QUALITY FINDINGS TO VERIFY
This is the new part. Treat it seriously.

1. The code is not world-class yet.
2. Active source is about 14.3k lines, including 65 JSX files, 22 CSS files and 4 PHP files.
3. There is no TypeScript, runtime data schema or strong content contract for 21 treatment pages.
4. Eleven invalid procedureType values escaped because the data contract is not enforced.
5. All 21 treatment pages have lastReviewed but no reviewer.
6. Route truth is duplicated across src/data/treatments.js, src/routes.jsx, Treatments.jsx, MobileMenu.jsx, Footer.jsx and ConcernsBento.jsx.
7. Tests cover only small helper behavior and NAP basics. They do not protect routes, links, schema semantics, accessibility interactions, PHP or deploy behavior.
8. CSS is large and under-disciplined: roughly 6.2k lines, 100 gradient lines, 29 !important lines, 18 keyframe blocks and current lint failure.
9. Custom UI primitives are hand-rolled without enough tests.
10. Frontend and PHP form contracts drifted: backup allowlist does not preserve fields such as preference, careType, dentistPreference and referral.
11. PHP endpoint is one large mixed-concern file with no PHP tests.
12. Operational constants are scattered: DOB year, Resend domain ID, deploy emails, static 404 phone and brand values.
13. Error reporting is console/local only.
14. Dependency lifecycle is weak and no Dependabot or Renovate config was found.
15. Source hygiene includes src/.DS_Store and old audit artifacts.

DO NOT DO THIS
Do not say "it is mostly fine."
Do not make the owner feel safe because Lighthouse scores are high.
Do not treat a marketing site as low risk when it collects patient/contact data and publishes dental advice.
Do not add fake reviews, aggregate ratings or invented credentials.
Do not fix owner-content questions by guessing.
Do not bury P0 and P1 issues under cosmetic refactors.

EXPECTED FIRST IMPLEMENTATION WAVE AFTER OWNER APPROVAL
1. Fix /contact/ CTA.
2. Fix CSS lint and make npm run ci green.
3. Fix form backup allowlist drift.
4. Fix Treatments invalid HTML and ARIA.
5. Fix homepage contrast and accessible-name issues.
6. Fix invalid schema types.
7. Strengthen check:launch with full internal link crawl, schema checks, TODO NAP checks, owner-rule checks and public artifact checks.
8. Make Turnstile deployable or remove the illusion of protection.
9. Add treatment/blog data validators.
10. Block public .vite manifests.
11. Add PHP syntax and endpoint tests.
12. Add browser and accessibility regression tests for changed components.

VERIFICATION COMMANDS
Use Node 20.19.

npm ci
npm run lint
npm run lint:css
npm test
npm run check
npm run check:launch
npm run ci
npm run build

Also verify:
1. Full generated internal-link crawl.
2. Schema validation.
3. Mobile and desktop Lighthouse on representative templates.
4. Keyboard navigation.
5. No-JavaScript rendering.
6. PHP 8 syntax and endpoint tests.
7. Safe malformed form submissions.
8. Deploy dry run or staging smoke test.
9. Live smoke test after deployment.

DEFINITION OF DONE
The code is launch-ready only when:

1. No P0 remains.
2. Every P1 is fixed or explicitly owner-accepted.
3. CI is green on a clean checkout.
4. Treatment and blog data contracts are enforced.
5. Route graph and internal links are valid.
6. Accessibility tests pass for custom interactions.
7. Form frontend, PHP validation, backups and email payloads share one contract.
8. Deployment is verifiable and reversible.
9. Google entity and clinical trust issues are owner-approved.
10. Runtime monitoring exists.

Be direct, precise and evidence-led.
```

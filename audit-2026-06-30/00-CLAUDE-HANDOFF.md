# Claude handoff

## Read this first

You are receiving two independent, read-only audits of Day Night Dental:

1. `01-TECHNICAL-SECURITY-PERFORMANCE-AUDIT.md`
2. `02-SEO-GOOGLE-VISIBILITY-AUDIT.md`
3. `04-CODE-QUALITY-WORLD-CLASS-AUDIT.md`

Repository root:

`/Users/admin/day-and-night-dental-recovered`

Stack:

Vite 7, React 19, React Router 6, vite-react-ssg, static prerender plus hydration, plain CSS, Hostinger LiteSpeed and a PHP enquiry endpoint.

## Your immediate task

Do not edit anything yet.

First:

1. Read both reports fully.
2. Read the code-quality report fully.
3. Inspect the cited source lines and raw evidence.
4. Challenge any conclusion you think is wrong with exact code or runtime evidence.
5. Produce a remediation plan in dependency order.
6. Separate:
   1. Owner decisions.
   2. Code changes.
   3. Hostinger or DNS changes.
   4. Search Console or Business Profile actions.
   5. Legal, privacy or clinician approvals.
7. Estimate which fixes can be grouped safely into separate commits.
8. Tell the owner which P0 and P1 items you accept, reject or need clarified.
9. Give your own direct verdict on whether the code is world-class today.

Wait for owner approval before implementation.

## Non-negotiable repository rules

1. Work in `/Users/admin/day-and-night-dental-recovered`.
2. Do not use `legacy/`.
3. Treat `src/` as source and `dist/` as generated.
4. Preserve the existing dirty worktree and unrelated user changes.
5. SSR-safe only. No `window`, `document` or current-time access at module or render scope.
6. Do not use an em dash in copy.
7. Use approved solid gold `#f8c760` and blue `#4590ec`.
8. Do not add a gold-to-blue gradient.
9. Do not invent reviews, ratings, outcomes, credentials, hours, prices or availability.
10. Keep NAP in `src/data/practice.js`.
11. Do not work on `public/preview/` as if it were the real site.
12. Route-level code splitting already exists. Do not undo it.
13. The new-patient extra fields and address lookup are parked.
14. Opening hours are a known owner blocker.
15. The absence of reviews and aggregate ratings is intentional.
16. The coming-soon gate decision belongs to the owner.

## First remediation wave after approval

The expected first wave is:

1. Fix the broken `/contact/` CTA.
2. Make CSS lint and the full CI pipeline green.
3. Fix the form backup allowlist drift between React field names and PHP stored fields.
4. Repair the homepage treatment selector semantics and nested controls.
5. Fix the documented contrast and accessible-name failures.
6. Correct the eleven invalid schema types.
7. Replace the false launch-check confidence with executable checks.
8. Add active content/data validators for treatment pages, blog posts, routes and owner rules.
9. Complete or remove the dormant Turnstile path and make abuse protection deployable.
10. Enforce strict form schemas and preserve all registration fields in failure backups.
11. Design an idempotency and duplicate-submission strategy.
12. Replace the non-atomic deploy with an ordered, verifiable, rollback-capable process.

Do not combine owner-content decisions with mechanical code fixes in one unreviewable commit.

## Owner decisions required before Google launch

1. Canonical trading name, legal entity, address and phone.
2. Relationship to the previous names associated with the address and phone.
3. Correct Google Business Profile.
4. Real hours and emergency availability.
5. Prices, NHS, finance, free-care, response-time and parking claims.
6. Clinician names, roles, GDC records and content-review responsibility.
7. Gallery image provenance and treatment attribution.
8. ICO registration claim and number.
9. Sensitive-data collection, backup, retention and processor approvals.
10. Exact go-live moment and gate removal.

## Required verification after each implementation wave

1. `npm ci`
2. `npm run lint`
3. `npm run lint:css`
4. `npm test`
5. `npm run check`
6. `npm run check:launch`
7. Internal link and asset crawl.
8. Schema validation.
9. Mobile and desktop browser tests.
10. Keyboard and screen-reader checks for changed interactions.
11. Lighthouse budgets for representative routes.
12. PHP syntax, unit and integration tests in PHP 8.
13. Safe API abuse and malformed-input tests.
14. Interrupted-deploy and rollback test.
15. Live post-deploy smoke checks.

## Evidence

Raw evidence is under `audit-2026-06-30/evidence/`.

The browser evidence contains:

1. 39 routes.
2. Four viewport sizes.
3. 156 page checks.
4. No runtime page exception.
5. No captured console error or warning.
6. No failed local request.
7. No duplicate ID.
8. No body-level horizontal overflow.
9. Representative no-JavaScript checks.
10. Interaction checks for menu focus, registration progression and native form validation.

The Lighthouse evidence contains the complete JSON reports for home mobile and desktop plus emergency, registration, blog and treatment mobile templates.

The code-quality evidence contains:

1. Active code inventory across `src`, `scripts`, `hostinger`, tests, CI and production public files.
2. File counts and line counts.
3. CSS scale metrics.
4. Treatment data scan.
5. Static pattern scans for inline styles, index keys, browser APIs, unsafe HTML APIs, TODOs, owner claims and hardcoded operational values.
6. Contract-drift evidence between React form fields and PHP backup allowlist.

## Definition of done

Do not say "launch ready" because Lighthouse is green or the build completes.

Launch ready means:

1. No P0 remains.
2. Every P1 is fixed or explicitly accepted by its accountable owner.
3. CI is green on a clean checkout.
4. The full route graph is valid.
5. Accessibility and mobile performance meet the agreed budgets.
6. The form pipeline is abuse-resistant, recoverable and monitored.
7. Deployment is verifiable and reversible.
8. NAP, claims, clinical authorship and image provenance are approved.
9. Search Console and the correct Business Profile are operational.
10. Live post-deploy evidence is recorded.

# Day Night Dental technical, security, performance and launch audit

Audit date: 30 June 2026

Repository audited: `/Users/admin/day-and-night-dental-recovered`

Live site sampled: `https://daynightdental.co.uk/`

Mode: read only. No website source, configuration, content, PHP, CSS, package, build or deployment file was changed.

## 1. Executive verdict

Verdict: **NO-GO for launch in the audited state.**

The build is fundamentally viable. Static rendering works, route-level code splitting exists, the indexable pages have clean metadata, the live server has a strong baseline header set, the production dependency audit returned zero known vulnerabilities, and 156 route and viewport checks completed without a runtime exception.

That does not make the site launch-ready. The current branch has two immediate release failures:

1. A prominent homepage consultation CTA points to a real 404.
2. The configured CI pipeline is red because CSS lint fails.

There are also high-risk defects in accessibility, form abuse protection, server-side validation, backup completeness, sensitive-data operations, deployment atomicity, rollback, observability and launch-gate coverage. Mobile Lighthouse scores look respectable, but every sampled mobile page missed the 2.5 second LCP target in the lab.

This was a code and black-box audit, not a formal penetration test, legal opinion, clinical review or infrastructure audit with Hostinger and Search Console access. No honest audit can certify that security is "fully good." It can identify evidence, residual risk and required verification. That is what this report does.

## 2. Severity model

1. **P0, blocker:** Do not launch until fixed or explicitly accepted by the accountable owner.
2. **P1, high:** Material security, patient, conversion, accessibility, operational or release risk.
3. **P2, medium:** Important hardening, maintainability or performance work.
4. **P3, low:** Hygiene or future-risk item.
5. **Pass:** Tested and no material defect found in the audited scope.

Count excluding the owner's known and intentional items:

1. P0: 2
2. P1: 11
3. P2: 10
4. P3: 2

## 3. Known and intentional items, confirmed and excluded from defect counts

### K-01 Placeholder opening hours

Status: **Confirmed known blocker, excluded from the defect count.**

Placeholder hours are rendered in visible copy and LocalBusiness JSON-LD. They must not survive launch, but this is already owned and was not treated as a new finding.

### K-02 No reviews, ratings or aggregateRating

Status: **Confirmed intentional and compliant with the stated rule.**

No fake rating or `aggregateRating` was found. The homepage explicitly says genuine patient reviews are not yet available. This audit does not recommend manufacturing or adding ratings.

### K-03 No em dashes in public website copy

Status: **Public `src/` copy passes.**

No em dash was found in the public website source. Three generated admin-email strings in `hostinger/api/send-enquiry.php` use em dashes and are reported separately as a low-priority owner-rule breach.

### K-04 Solid gold and blue, no gold-to-blue gradients

Status: **Rule tested and failed in two production locations.**

The two exact violations are findings T-19 and are not confused with neutral shadow, mask or fade gradients.

### K-05 Preview design lab

Status: **Confirmed intentional and excluded.**

The 116 preview HTML files were checked and contain `noindex`. They are absent from the sitemap. Their presence in `dist` was not counted as a defect.

### K-06 Route-level code splitting

Status: **Confirmed.**

Route chunks are emitted and the homepage app entry is about 42.4 KB gzip. This audit does not claim the site lacks code splitting.

### K-07 Parked registration extras and address lookup

Status: **Acknowledged and excluded.**

The absence of additional new-patient fields and an address lookup was not treated as a defect.

### K-08 Coming-soon gate

Status: **Intent acknowledged, but not confirmed in the audited file or live response.**

The checked `hostinger/.htaccess` says the holding gate has been removed, and the live homepage returned the full site with HTTP 200. This discrepancy is recorded here but excluded from the defect count at the owner's request.

### K-09 SSR safety

Status: **Pass in the tested build.**

The SSG build completed. Browser-only APIs observed in the source are inside effects, handlers or client helpers. No render-scope hydration crash occurred in 156 route checks.

## 4. P0 launch blockers

### T-01 Prominent homepage CTA links to a nonexistent route

Severity: **P0**

Evidence:

1. `src/sections/ConcernsBento.jsx:172` links to `/contact/`.
2. The route table has no `/contact/` route.
3. The live request to `https://daynightdental.co.uk/contact/` returned HTTP 404.
4. Other contact links correctly use `/#contact`.

Impact:

1. A primary conversion path loses users.
2. Googlebot and other crawlers discover a broken internal URL.
3. The current build checker misses it because it validates only treatment slugs, not all internal links.

Required action for Claude:

1. Point the CTA at `/#contact`, or create a real prerendered contact route if that is the product decision.
2. Add a build-time internal-link crawler covering every generated HTML file, route, hash and static asset.
3. Verify the live URL after deployment, not only the React router locally.

Acceptance test:

1. Every internal `href` and React Router destination resolves to a 200 route or an existing same-page ID.
2. The consultation CTA reaches the form with keyboard focus and history behaviour intact.

### T-02 The configured CI pipeline is red

Severity: **P0**

Evidence:

1. `npm run lint` passed.
2. `npm test` passed 12 tests.
3. `npm run check` passed.
4. `npm run check:launch` passed.
5. `npm run lint:css` failed:
   1. `src/styles/modules/team.css:459:11`, unknown property `text-stroke`.
   2. `src/styles/modules/team.css:518:11`, unknown property `text-stroke-color`.
6. `.github/workflows/ci.yml` runs `npm run ci`, which includes CSS lint.

Impact:

1. A release from this branch cannot honestly be called green.
2. If branch protection requires CI, the release is blocked.
3. If branch protection does not require CI, broken checks can be ignored and lose their safety value.

Required action for Claude:

1. Use supported prefixed properties where intended, or configure a narrow documented Stylelint exception only if the browser-specific declaration is necessary.
2. Run the exact GitHub Actions command under Node 20.19.
3. Require the CI check before merge and deployment.

Acceptance test:

`npm ci && npm run ci && npm run check:launch` exits zero on a clean checkout using `.nvmrc`.

## 5. P1 high-severity findings

### T-03 Invalid nested interactive controls and broken tab semantics on the homepage

Severity: **P1**

Evidence:

1. `src/sections/Treatments.jsx:251-293` renders a telephone `<a>` inside a `<button role="tab">`.
2. Interactive content inside a button is invalid HTML and creates ambiguous click and keyboard behaviour.
3. The mobile accordion inserts `<article>` siblings directly inside the element marked `role="tablist"`.
4. Lighthouse failed `aria-required-children` because the tablist contains children that are not tabs.
5. The tab implementation does not implement the expected arrow-key model for a tablist.

Impact:

1. Assistive technology can receive an invalid accessibility tree.
2. Clicks on the phone link can also activate the parent tab.
3. Browser behaviour for nested interactive elements is not reliable.

Required action for Claude:

1. Do not nest the telephone link inside the tab button.
2. Use one valid pattern at each breakpoint:
   1. A real tablist with only tabs as owned children and matching tabpanels.
   2. A disclosure or accordion using buttons with `aria-expanded` and controlled regions.
3. Implement keyboard behaviour for the chosen pattern.

Acceptance test:

1. No interactive element contains another interactive element.
2. Axe and Lighthouse report no ARIA relationship failure.
3. Arrow keys, Enter, Space, Tab and screen-reader announcements work.

### T-04 Homepage does not meet the claimed accessibility target

Severity: **P1**

Evidence:

1. Homepage Lighthouse accessibility score: 93 on mobile and 93 on desktop.
2. Failed automated audits:
   1. Invalid required ARIA children.
   2. Insufficient colour contrast.
   3. Visible label and accessible-name mismatch.
   4. Desktop also reported an allowed-role issue and link distinguishability issue.
3. Measured contrast examples:
   1. `#6b6b6b` on black, 3.94:1 for small text.
   2. `#666666` on black, 3.65:1 for small text.
   3. FAQ numbers `#2a2a35` on black, 1.48:1.
4. Moving-word buttons have visible text not represented in their accessible names.
5. Emergency telephone links have visible text not represented in their accessible names.
6. The accessibility statement says the site is working toward WCAG 2.1 AA while the audit brief requires WCAG 2.2 and known automated AA failures remain.

Impact:

1. Some users cannot perceive or operate important homepage controls reliably.
2. The public accessibility statement is incomplete relative to the observed limitations.
3. Dental services are high-impact services, so this is not cosmetic polish.

Required action for Claude:

1. Fix semantic structure first.
2. Raise contrast to WCAG 2.2 AA, including decorative text that is still exposed as meaningful content.
3. Make accessible names contain the visible label.
4. Update the accessibility statement with the actual conformance target, test date, scope and known limitations.
5. Run automated and manual keyboard, zoom, reflow and screen-reader checks.

Acceptance test:

1. Lighthouse and axe have no critical or serious accessibility failures on all route templates.
2. 200% and 400% zoom do not lose content or controls.
3. Manual checks pass with VoiceOver plus Safari and NVDA plus Chrome or Firefox.

### T-05 All sampled mobile routes missed the good LCP threshold

Severity: **P1**

Evidence:

| Route template | Performance | LCP | FCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home, mobile | 93 | 3.0 s | 1.9 s | 0 ms | 0 |
| Emergency, mobile | 93 | 3.0 s | 2.0 s | 0 ms | 0 |
| Registration, mobile | 94 | 2.9 s | 1.8 s | 0 ms | 0 |
| Blog index, mobile | 94 | 2.9 s | 1.8 s | 0 ms | 0 |
| Treatments index, mobile | 94 | 2.9 s | 1.8 s | 0 ms | 0 |
| Home, desktop | 100 | 0.6 s | 0.4 s | 0 ms | 0 |

Google's good LCP target is at most 2.5 seconds at the 75th percentile. These are lab results, not field data.

Homepage LCP evidence:

1. The LCP element was the hero word `Night`.
2. About 2.506 seconds, or 85 percent of its LCP, was render delay.
3. The page had zero TBT and zero CLS, so JavaScript blocking and layout instability were not the primary causes in this run.
4. The final webfont render is a likely contributor and must be proven with a trace before changing typography.

Impact:

1. The mobile experience does not yet meet the stated performance goal in controlled lab tests.
2. No CrUX or Search Console field data was available, so there is no evidence that real users pass LCP, INP and CLS.

Required action for Claude:

1. Profile font discovery, preload, fallback metrics and final font swap.
2. Set performance budgets for LCP, CSS, JS, HTML, fonts and image bytes per route class.
3. Add real-user Web Vitals collection once consent and measurement are configured.
4. Validate on mid-tier Android hardware and throttled mobile networks.

Acceptance test:

1. Lab LCP is at most 2.5 seconds on all representative mobile templates.
2. Field LCP, INP and CLS pass at the 75th percentile once enough data exists.

Reference: https://web.dev/articles/vitals

### T-06 Turnstile is not wired and the rate limiter can fail open

Severity: **P1**

Evidence:

1. `TURNSTILE_SITE_KEY` is empty in `src/data/config.js`.
2. No Turnstile widget, token acquisition or client integration exists in `src/`.
3. `hostinger/deploy.py` renders only the Resend key, sender, recipient and site. It cannot render `DND_TURNSTILE_SECRET`.
4. The PHP endpoint verifies Turnstile only if a secret happens to be defined.
5. If neither private file storage nor APCu is available, `send-enquiry.php:234-238` logs a warning and allows the request.
6. The honeypot and elapsed-time field are optional from an attacker's perspective. Omitting them bypasses both signals.
7. Origin checking is useful browser defence but a non-browser client can send the allowed Origin header.

Impact:

1. Automated spam can drive Resend cost, flood reception and poison backups.
2. The controls described in comments are stronger than the deployable controls.
3. Protection depends on an unverified shared-host storage or APCu configuration.

Required action for Claude:

1. Complete the Turnstile client and server flow, or remove the dormant configuration and choose an equivalent supported control.
2. Add the secret to the deploy renderer without exposing it to the frontend.
3. Fail closed or degrade to a safe low-volume queue if the primary rate-limit store is unavailable.
4. Add an edge or Hostinger-level rate limit where available.
5. Monitor rejected and accepted request rates without logging raw patient data.

Acceptance test:

1. A missing, expired, replayed or invalid bot token is rejected.
2. Rate limiting still operates after a PHP process restart and on every production instance.
3. A scripted client omitting honeypot and elapsed fields cannot send unlimited messages.

### T-07 Server validation does not enforce the business schema and backup recovery loses fields

Severity: **P1**

Evidence:

1. The endpoint validates required names, contact fields, consent and email syntax.
2. It does not validate:
   1. Phone format.
   2. Date-of-birth syntax, validity, future dates or sensible range.
   3. Postcode syntax.
   4. Enum values for preference, care type, dentist preference or referral.
3. `postcode` is capped at 200 characters.
4. Unknown scalar fields are accepted, labelled and included in the reception email.
5. The fail-safe backup allowlist omits current registration fields `careType`, `dentistPreference` and `referral`.
6. The backup is written before the email call. If email fails, the UI reports failure and a retry creates another record.
7. There is no submission ID or idempotency key.

Impact:

1. Direct API calls can bypass all client-side business rules.
2. Recovery from a Resend outage does not reconstruct the full registration the team expected to receive.
3. Retries can create duplicate patient enquiries.

Required action for Claude:

1. Define strict server-side request schemas per form type.
2. Reject unknown keys.
3. Validate and normalise phone, DOB, postcode and every enum.
4. Keep the email and backup field models in one shared documented schema.
5. Generate and enforce a short-lived idempotency key or submission ID.
6. Return a generic user-safe error and an internal correlation ID.

Acceptance test:

1. Property-based and table-driven tests reject malformed, future and out-of-range values.
2. A failed email preserves every required operational field exactly once.
3. Replaying the same submission does not generate duplicate emails or records.

### T-08 Sensitive registration data has no demonstrated end-to-end operational security

Severity: **P1**

Evidence:

1. Registration can collect full name, date of birth, phone, email, street address, postcode and care preference.
2. Enquiries can reveal symptoms, pain or treatment interest and may therefore contain health information.
3. The endpoint emails this data through Resend.
4. It also stores plaintext NDJSON above the web root for up to 90 days with file permissions set to 0600.
5. There is no application-level encryption at rest, key-rotation procedure, staff access model, restore test or deletion evidence in the repository.
6. The privacy page accurately discloses the email provider and backup, which is good, but the technical and organisational controls cannot be verified from code.

Impact:

1. A compromised hosting account, support account, mailbox or backup can expose sensitive patient information.
2. A 90-day duplicate store expands the breach surface.
3. File permissions protect against some local users but are not equivalent to encryption, access governance or auditability.

Required action for Claude and the owner:

1. Run a data-protection impact assessment with the actual data controller.
2. Minimise data collected before a patient relationship exists.
3. Decide whether full DOB and address are necessary at this stage.
4. Document Resend and Hostinger DPAs, storage region, access roles, MFA, retention, deletion and incident response.
5. Encrypt backups with keys separated from the web account, or move to an appropriately managed patient-enquiry store.
6. Test purge and recovery jobs with evidence.

Acceptance test:

1. The owner can demonstrate who can access each copy, why it exists and when it is deleted.
2. A restore and a deletion test are recorded.
3. Legal and clinical owners approve the data flow.

Reference: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/

### T-09 Deployment is non-atomic, does not sync deletions and has no rollback

Severity: **P1**

Evidence from `hostinger/deploy.py`:

1. `deploy_dist` walks local files and uploads them but never lists or deletes stale remote files.
2. It is described as a sync even though it is upload-only.
3. `os.walk` can upload root `index.html` before the new hashed assets it references.
4. A failure midway leaves a mixed release.
5. There is no staging directory, release pointer, checksum verification, remote manifest check, smoke test or rollback.
6. The API target uploads the endpoint, generated config and root `.htaccess` but omits `hostinger/api/.htaccess`.
7. Frontend and API are separate deployment targets, so a frontend depending on an endpoint change can be released alone.

Impact:

1. New HTML can reference assets that do not exist yet.
2. Removed pages and assets can persist indefinitely.
3. A partial upload can break the live site with no one-command recovery.
4. Security hardening in the API directory is not guaranteed to reach production.

Required action for Claude:

1. Upload immutable assets first.
2. Upload route HTML after all dependencies exist.
3. Use a versioned release directory plus an atomic switch if Hostinger permits it.
4. Otherwise use a manifest-driven ordered deploy with checksums, explicit stale deletion and automatic rollback.
5. Include all required `.htaccess` files.
6. Run live smoke checks before declaring success.
7. Retain the previous known-good release and document rollback.

Acceptance test:

1. An intentionally interrupted deploy leaves the old site fully usable.
2. A deleted route disappears remotely.
3. Every uploaded file matches the local checksum.
4. Rollback is tested, timed and documented.

### T-10 The launch checker gives false confidence

Severity: **P1**

Evidence:

1. `npm run check:launch` passed in the audited state.
2. It did not detect:
   1. The broken `/contact/` link.
   2. The failing CSS lint.
   3. Invalid structured data types.
   4. Missing Turnstile wiring.
   5. Disabled analytics.
   6. Missing clinician reviewers.
   7. Owner design-rule violations.
   8. NAP values still labelled TODO in the source.
3. The checker examines selected files and placeholder strings, not the actual launch contract.
4. `LAUNCH_CHECKLIST.md` describes failures that the current script does not enforce, creating documentation drift.

Impact:

The command named `check:launch` can pass while the release remains a no-go.

Required action for Claude:

1. Convert the actual launch checklist into executable assertions.
2. Run lint, CSS lint, tests, build, link checking, schema validation, noindex rules, placeholder checks, configuration presence and browser smoke tests in one gate.
3. Fail if a required external verification is missing from a signed launch manifest.

Acceptance test:

Each known blocker causes a deliberately seeded CI failure.

### T-11 Frontend and form operations lack production-grade observability

Severity: **P1**

Evidence:

1. GA4 and Meta IDs are empty, so no product or conversion measurement runs.
2. No real-user Web Vitals collection exists.
3. No frontend exception service is configured.
4. React errors are visible in the console but are not sent to operations.
5. PHP uses server logs and a daily monitor, but there is no evidence the Hostinger cron jobs are scheduled and succeeding.
6. There is no external dead-man check for the monitor itself.
7. The monitor uses the same Resend service it is partly intended to monitor, with `mail()` as a fallback.
8. There is no synthetic end-to-end enquiry that confirms browser to endpoint to inbox delivery.

Impact:

1. A broken form can silently lose conversions.
2. A JavaScript or hydration regression can persist without an alert.
3. Core Web Vitals and route-specific failures cannot be prioritised from real users.

Required action for Claude:

1. Add privacy-aware error monitoring and release identifiers.
2. Add uptime checks for representative HTML, assets and API method behaviour.
3. Add an external cron heartbeat.
4. Add a safe synthetic form pipeline using a dedicated test recipient and automatic cleanup.
5. Instrument consented conversions and Web Vitals.

Acceptance test:

An intentionally failed frontend release, cron, API call and email delivery each triggers a timely alert with no sensitive payload.

### T-12 Privacy and accessibility statements contradict observable behaviour

Severity: **P1**

Evidence:

1. Contact form copy says, "We'll never share your details."
2. The privacy policy correctly says details are processed by an email provider, stored by the host and may be shared with providers involved in care.
3. The absolute "never share" statement is therefore false.
4. The privacy policy claims ICO registration but provides no registration number and this audit did not verify the claim.
5. The policy says essential cookies are used, while the audited code primarily uses localStorage and consent-gated third-party services. The exact essential-cookie inventory is not documented.
6. The accessibility statement does not list the automated homepage failures.

Impact:

1. Users receive conflicting information at the point of data collection.
2. Legal claims may be inaccurate or impossible to substantiate.
3. Trust is damaged if published policies overstate compliance.

Required action for Claude and legal owner:

1. Replace absolute promises with precise processor and purpose language.
2. Add the controller's full legal identity, ICO number if applicable and actual processor inventory.
3. Inventory cookies and storage by name, purpose, provider and lifetime.
4. Update the accessibility statement after remediation and manual testing.

Acceptance test:

Every public policy statement maps to an implemented control and owner-held evidence.

### T-13 The "real results" gallery needs provenance and consent evidence

Severity: **P1**

Evidence:

1. The homepage labels six polished portraits as "Real smiles, real results."
2. Captions attribute them to named treatments such as implants, Invisalign, bonding and veneers.
3. They are not before-and-after clinical images and contain no visible case context.
4. No provenance, patient consent, image licence or treatment-result evidence is present in the repository.
5. Visual inspection alone cannot determine whether they are patients, models, licensed stock or generated images.

Impact:

1. Visitors can reasonably interpret each portrait as a real patient result produced by this practice.
2. If that cannot be proved, the claim creates advertising, consent and reputation risk.

Required action for Claude and owner:

1. Obtain and archive provenance, model release, patient consent and treatment attribution for every image.
2. If they are illustrative, label them clearly and remove outcome attribution.
3. Do not imply that a treatment produced a pictured result without case evidence.

Acceptance test:

Every image has an owner-approved provenance record and public wording that matches it exactly.

## 6. P2 medium-severity findings

### T-14 Homepage payload and critical CSS are too large

Severity: **P2**

Evidence:

1. `dist/index.html`: 193,334 bytes.
2. Inline critical CSS on the homepage: 102,241 bytes.
3. Inline scripts on the homepage: 5,049 bytes.
4. Full app CSS: 154,833 raw, 27,619 gzip.
5. Lighthouse estimates about 12 KB compressed unused CSS on the homepage.
6. Homepage DOM: 1,431 elements.
7. Main-thread work: about 2.4 seconds in the mobile run.

Impact:

1. Large HTML delays parsing on slower devices.
2. Critical CSS duplicates rules later loaded from the full stylesheet.
3. The DOM raises style, layout and accessibility traversal cost.

Required action for Claude:

1. Measure which inline rules are actually required above the fold.
2. Reduce duplicate component variants and decorative nodes.
3. Split route CSS where it materially reduces critical transfer without causing flashes.
4. Set budgets in CI.

### T-15 A small header logo wastes most transferred bytes

Severity: **P2**

Evidence:

1. `/logo-mark.webp` is 15,658 bytes.
2. It displays at roughly 54 by 54 pixels in the mobile header.
3. Lighthouse estimated about 13.5 KB wasted for that use.

Required action:

Provide a correctly sized responsive source while retaining a larger asset where it is actually displayed larger.

### T-16 Unused client JavaScript remains on the homepage

Severity: **P2**

Evidence:

1. Route-level splitting is present and is not the issue.
2. Lighthouse estimated about 24.7 KB compressed unused code in `client-CncE1UQS.js`, around 43 percent of that resource in the audited trace.

Required action:

Profile the shared client entry, hydration helpers and site-wide components. Do not blindly split tiny components. Move code only where the trace shows first-load benefit.

### T-17 Consent withdrawal cannot cleanly reverse in the same session

Severity: **P2**

Evidence:

1. `loaded` is module state and stays `true` after analytics loads.
2. Withdrawal sets GA's disable flag and replaces `window.fbq` with a no-op.
3. Accepting again calls `loadAnalytics`, which exits because `loaded` is still true.
4. The GA disable flag is not cleared and the Meta function is not restored.

Impact:

The user's new choice is stored, but measurement may remain disabled until reload. Consent state and runtime state diverge.

Required action:

Use an explicit consent state machine that supports accept, withdraw and re-accept without duplicate script injection or stale globals.

### T-18 Public Vite manifests disclose source module paths

Severity: **P2**

Evidence:

1. `dist/.vite/manifest.json` and `dist/.vite/ssr-manifest.json` are deployed.
2. The live manifest returned HTTP 200.
3. The files expose source names and the client module graph.

Impact:

This is not a direct compromise, but it gives attackers unnecessary implementation detail and expands production artefacts.

Required action:

Exclude both manifests from the public upload unless a production runtime actually consumes them. If needed server-side, store them outside the public document root.

### T-19 Two production gold-to-blue gradients violate the owner rule

Severity: **P2**

Evidence:

1. `src/styles/modules/hero.css:187` blends gold through transparent to blue.
2. `public/404.html:16` blends `var(--gold)` directly to `var(--blue)`.

Required action:

Replace with separate solid overlays or a single approved solid accent. Audit the remaining gradients against the literal design rule, because many neutral and single-colour fades also exist.

### T-20 CSP still permits inline scripts and styles

Severity: **P2**

Evidence:

The live CSP has strong directives, including `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`. It also permits `'unsafe-inline'` for both scripts and styles.

Impact:

If an HTML injection path is introduced later, the script policy provides less protection than a nonce or hash policy.

Required action:

1. Inventory inline executable scripts.
2. Move stable scripts to hashed external assets or generate CSP hashes.
3. Keep JSON-LD separate from executable-script decisions.
4. Add CSP reporting in report-only mode before enforcing a stricter policy.

### T-21 Dependency compatibility is not completely clean

Severity: **P2**

Evidence:

1. `npm audit --omit=dev` reported zero known vulnerabilities across seven production dependencies.
2. `vite-react-ssg@0.9.0` installs `react-helmet-async@1.3.0`.
3. That package declares React peer support only through React 18, while the application uses React 19.2.7.
4. The build currently works, but `npm ls` reports the peer mismatch.

Impact:

An unsupported transitive peer can fail after a package, React or rendering change even when the present build passes.

Required action:

Track the upstream issue, pin a verified combination and add an SSG hydration regression test before any dependency upgrade.

### T-22 Hard-coded calendar years will age

Severity: **P2**

Evidence:

1. Registration DOB options use `DOB_CURRENT_YEAR = 2026`.
2. Footer initially renders 2026 and changes only on the client.
3. Static and no-JavaScript output becomes stale in 2027.

Required action:

Generate the build year during the build or pass it into SSG data without using render-scope time. Validate it in CI after New Year.

### T-23 Rate-limit bucket creation can be used for storage pressure

Severity: **P2**

Evidence:

1. A new file can be created for each normalised client IP before honeypot rejection.
2. A distributed IPv4 source can create many bucket files.
3. Purge is scheduled, not guaranteed.

Required action:

Prefer a bounded shared store or edge rate limit, cap bucket storage, and monitor file count and disk or inode pressure.

## 7. P3 low-severity findings

### T-24 Internal enquiry emails violate the em-dash owner rule

Severity: **P3**

Evidence:

`hostinger/api/send-enquiry.php` uses em dashes in generated subjects and the plain-text footer.

Required action:

Use a colon, comma or hyphen if the rule applies to all copy, including internal messages.

### T-25 Security contact and email-authentication hardening are incomplete

Severity: **P3**

Evidence:

1. `/.well-known/security.txt` returned 404.
2. SPF uses soft-fail `~all`.
3. DMARC is published with `p=none`.
4. No CAA record was returned.

Impact:

These are defence and operations improvements, not evidence of a current application exploit.

Required action:

1. Add a monitored `security.txt`.
2. Move DMARC from monitoring to enforcement only after analysing legitimate mail flows.
3. Tighten SPF only after all senders are inventoried.
4. Consider CAA based on the chosen certificate providers.

## 8. Positive controls and passes

### Build and route integrity

1. The SSG build generated the expected route set.
2. `npm run check` completed.
3. 39 real routes were tested at 320, 390, 820 and 1440 pixel widths.
4. All 156 checks returned 200 locally.
5. No body-level horizontal overflow occurred at any tested viewport.
6. No duplicate IDs, unnamed buttons, unnamed links or broken same-page hash links were detected.
7. Four representative routes retained meaningful no-JavaScript content.
8. Mobile menu focus entered the menu and returned to the burger after Escape.
9. Registration keyboard selection and step progression worked in the tested flow.
10. Empty contact submission was blocked by native required-field validation.

### Runtime stability

1. No browser console warning or error was captured in the 156-route run.
2. No uncaught page exception was captured.
3. No failed network request was captured against the local built site.
4. TBT was 0 ms and CLS was 0 in all sampled Lighthouse runs.

### Server and transport baseline

1. HTTPS, HTTP/2 and HTTP/3 advertisement are present.
2. HTTP to HTTPS and www to apex redirects were observed earlier in the audit.
3. Unknown routes return a true 404.
4. Live responses include HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP and CORP.
5. The secret config path returned 403.
6. PHP version disclosure is suppressed in the audited response.
7. Live TTFB samples were fast, around 0.04 to 0.12 seconds, but a few samples are not a capacity test.
8. Repeated automated requests triggered Hostinger 403 bot protection. This is a useful outer control, although it prevented a clean asset-cache header sample and must not replace application controls.

### Form-code strengths

1. Strict POST and JSON content type.
2. Request size and field-count caps.
3. Exact allowed-origin check.
4. Direct peer IP used rather than spoofable forwarded headers.
5. IPv6 rate keys normalised to a `/64`.
6. Output escaped for HTML email.
7. CRLF and tab rejection on single-line values.
8. Secrets kept outside committed source.
9. Private files created with restrictive permissions.
10. Resend response bodies are not logged.
11. Browser requests have a 15-second abort.
12. A synchronous client guard reduces accidental rapid double submission.

### Supply chain

1. Production npm audit: zero known vulnerabilities on the audit date.
2. Lockfile and pinned SSG package exist.
3. CI uses `.nvmrc`.

## 9. Test coverage assessment

Current automated coverage is not proportional to launch risk.

Present:

1. 12 Vitest tests across two files.
2. Tests for practice data, enquiry extras, JSON-LD helpers and request shape.
3. ESLint and Stylelint configuration.
4. Build smoke checker.

Missing or materially incomplete:

1. Route component tests.
2. Accessibility tests.
3. Link and hash crawler.
4. Form browser tests in CI.
5. PHP unit and integration tests.
6. Malformed request and abuse tests.
7. Resend failure, timeout and replay tests.
8. Backup and purge tests.
9. Deployment tests.
10. Rollback tests.
11. Live post-deploy smoke tests.
12. Visual regression at target breakpoints.
13. Performance budgets.
14. Schema semantic validation.

PHP was not installed in the audit environment, so the three PHP files could not be syntax-checked locally. Bash syntax and Python byte-compilation passed.

## 10. Required remediation order

### Stage 0, freeze launch

1. Fix T-01 and T-02.
2. Resolve all owner-known blockers, including verified hours and the actual launch gate decision.
3. Verify NAP and clinical or commercial claims with accountable owners.

### Stage 1, patient and conversion safety

1. Fix T-03 and T-04.
2. Complete T-06 and T-07.
3. Approve T-08 and T-12 with privacy and legal owners.
4. Resolve T-13 image provenance.

### Stage 2, release engineering

1. Replace the deployment path in T-09.
2. Turn the launch checker into a real gate under T-10.
3. Add observability under T-11.

### Stage 3, performance and hardening

1. Fix mobile LCP under T-05.
2. Reduce payload and waste under T-14 to T-16.
3. Address CSP, manifests, dependencies and calendar ageing.

## 11. Final technical acceptance gate

Do not declare launch-ready until all of the following are true:

1. Zero P0 findings open.
2. Every P1 is fixed or accepted in writing by the accountable owner with an expiry date.
3. Clean checkout passes install, lint, CSS lint, tests, build and strict launch check under Node 20.19.
4. All generated internal links and assets resolve.
5. All real routes pass mobile and desktop smoke tests.
6. Homepage has no serious automated accessibility failure and passes manual keyboard and screen-reader tests.
7. Mobile LCP meets budget in the lab and real-user monitoring is ready.
8. Form abuse controls work in production.
9. Server validation rejects direct malformed submissions.
10. Backup, purge, email failure and replay behaviour are tested.
11. Sensitive-data controls have owner evidence.
12. Deployment interruption and rollback are tested.
13. Alerts fire for frontend, API, cron and email-pipeline failures.
14. Live headers, redirects, 404s, caching, compression and secret denial are rechecked after the final deploy.

## 12. Evidence files

1. `evidence/browser-audit.json`
2. `evidence/lighthouse/home-mobile.json`
3. `evidence/lighthouse/home-desktop.json`
4. `evidence/lighthouse/emergency-mobile.json`
5. `evidence/lighthouse/register-mobile.json`
6. `evidence/lighthouse/blog-mobile.json`
7. `evidence/lighthouse/treatments-mobile.json`
8. `evidence/npm-audit-production.json`

Security baseline reference: https://owasp.org/www-project-application-security-verification-standard/

Accessibility reference: https://www.w3.org/TR/WCAG22/

Core Web Vitals reference: https://web.dev/articles/vitals

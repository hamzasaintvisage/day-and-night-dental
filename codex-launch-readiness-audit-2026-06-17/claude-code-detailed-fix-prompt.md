# Prompt For Claude Code

You are Claude Code working on the DayNight Dental website.

Project folder:

`/Users/admin/day-and-night-dental-recovered`

Important: do **not** use `/Users/admin/Downloads/day-and-night-dental/`. That is stale.

This is a technical hardening and launch-readiness task. Do not redesign the site. Do not rewrite owner copy. Do not change brand strategy. Do not touch placeholders unless explicitly asked. Focus behind the scenes: code health, dependency health, build reliability, deployment safety, performance, CSS maintainability, security, and QA automation.

Read first:

- `AGENTS.md`
- `RUNBOOK.md`
- `LAUNCH_CHECKLIST.md`
- `codex-launch-readiness-audit-2026-06-17/daynight-dental-launch-readiness-report.md`
- logs under `codex-launch-readiness-audit-2026-06-17/logs/`

## Current Project Context

The website is a static React site:

- Vite 7
- React 19
- React Router 6
- `vite-react-ssg`
- static output to `dist/`
- hosted on Hostinger/LiteSpeed
- contact/register forms post to `hostinger/api/send-enquiry.php`
- old Netlify/Cloudflare material is in `legacy/` and must not be used

The owner wants the site to be world-class behind the scenes: reliable, secure, maintainable, and not easy to break.

Do not deploy unless explicitly asked.

Do not commit unless explicitly asked.

Before making changes, check current git status. The worktree may already be dirty from prior edits. Do not revert user/owner changes.

## High-Level Audit Verdict

Codex verdict:

The site is technically launchable with warnings. It is much stronger than the average small dental website. It is not yet 10/10.

Main weaknesses:

1. dependency tree health
2. Node version mismatch
3. missing permanent browser QA
4. performance/LCP not high-90s
5. CSS maintainability still fragile in places
6. no active Turnstile/CAPTCHA
7. plaintext enquiry backup needs explicit security/data-retention handling
8. sitemap `lastmod` is build-date noisy
9. launch checks need a hard final mode

## Fix Order

Please work in this order. Do not jump straight into CSS refactors.

### Phase 1: Tooling And Dependency Health

Goal: make the project install/build/test cleanly on the correct Node version.

Findings:

- Project requires Node `>=20.19`.
- Current audit machine used Node `20.18.0`.
- Vite preview warns that Node 20.18 is unsupported.
- `npm ls --all` failed with invalid React package tree:
  - `react@19.2.7`
  - `react-dom@19.2.7`

Tasks:

1. Inspect `package.json`, `.nvmrc`, `.npmrc`, and `package-lock.json`.
2. Confirm the intended React version.
3. Run under Node 20.19+.
4. Cleanly resolve the dependency-tree issue so `npm ls --all` exits 0.
5. Do not use dependency hacks unless truly necessary.
6. Preserve the Vite 7 + `@vitejs/plugin-react` v5 constraint from `AGENTS.md`.

Required verification:

- `node -v` must satisfy `>=20.19`.
- `npm run lint`
- `npm run lint:css`
- `npm run test`
- `npm run check`
- `npm audit --audit-level=moderate`
- `npm ls --all`

Acceptance:

- All pass.
- No source behavior changed except dependency/tooling corrections.

### Phase 2: Add A Real Launch Check Script

Finding:

`npm run check` allows parked placeholders as warnings. That is fine during pre-launch, but the final go-live needs a hard gate.

Task:

Add a script such as:

`"check:launch": "LAUNCH=1 npm run check"`

If cross-platform support is needed, use a small Node wrapper instead of shell-only syntax.

Required verification:

- `npm run check` still works.
- `npm run check:launch` hard-fails if parked placeholders remain.

Do not remove placeholder behavior unless the owner approves.

### Phase 3: Permanent Browser Smoke Tests

Finding:

Codex started browser auditing and captured screenshots, but the project itself does not have a permanent browser QA suite. For a site that the owner wants to be "nothing breaks", this is the biggest missing safety net.

Do not add a giant every-route/every-viewport matrix. That is overkill.

Add a pragmatic Playwright suite to the project.

Suggested coverage:

All routes:

- load at mobile `390x844`
- load at desktop `1366x768`
- no page crash
- no console errors
- no failed critical assets
- exactly one H1
- header exists
- footer exists
- no horizontal overflow
- no broken same-page anchors

Key pages across additional viewports:

- `/`
- `/our-team/`
- `/register-as-patient/`
- `/treatments/emergency-dentist/`
- `/treatments/general-dentistry/`
- `/treatments/invisalign/`
- `/blog/`
- one blog article
- `/privacy/`
- `/404`

Important interactions:

- mobile menu opens
- mobile menu closes by Escape
- mobile menu treatment accordion opens
- contact empty submit is blocked by validation
- register first step button disabled until required fields exist
- contact route/hash links land correctly

Suggested scripts:

- `test:browser`
- `test:browser:headed` if useful

Be careful:

- Do not make screenshot-diff testing mandatory yet.
- Do not create flaky baselines.
- Start with smoke tests and overflow checks.

### Phase 4: Performance To High 90s

Current Lighthouse:

- Homepage performance: 87
- Emergency page: 91
- Register: 89
- Invisalign: 84
- Blog article: 88

Why not higher:

- LCP around 3.0s-3.6s.
- app JS around 423 KB raw / 118 KB gzip.
- client JS around 181 KB raw / 57 KB gzip.
- CSS around 89 KB raw / 16 KB gzip.
- some image waste.
- homepage uses an external Unsplash image.

Tasks:

1. Run Lighthouse locally and identify exact LCP element per tested page.
2. Self-host the homepage hero image or replace it with an optimised local image.
3. Create proper responsive image sizes where needed.
4. Optimise `logo-mark.png` usage:
   - header size
   - footer size
   - mobile size
   - do not serve a large image where a tiny one is displayed
5. Lazy-load below-fold heavy/visual sections where this does not break layout.
6. Keep above-the-fold CSS/JS minimal.
7. Do not blindly split JS if it creates worse reliability.
8. Confirm Hostinger `.htaccess` has long caching for hashed assets and no-cache for HTML.

Target:

- Performance above 90 consistently.
- High 90s if possible without making the code fragile.
- LCP under 2.5s, ideally near 2.0s.

Do not sacrifice design quality blindly to chase Lighthouse.

### Phase 5: CSS Maintainability, Carefully

Finding:

The CSS split is better than the old giant file, but Codex still found maintainability risk:

- shared form/success/card patterns appear across multiple modules
- `!important` is used in places
- `overflow-x: clip` masks some layout risk
- `register.css` contains a comment about viewport overflow being masked
- stylelint passes, but `no-descending-specificity` remains disabled

Do not perform a risky CSS rewrite before browser tests exist.

Safe sequence:

1. Add browser smoke tests first.
2. Identify true duplicate selectors vs intentional responsive overrides.
3. Centralise only genuinely shared primitives:
   - form labels
   - form radios
   - success cards
   - repeated card primitives
4. Keep page-specific CSS in page modules.
5. After each CSS move:
   - run build
   - run browser smoke tests
   - inspect homepage/register/contact/team on mobile and desktop

Do not:

- alphabetise imports unless proven safe
- remove `!important` blindly
- remove `overflow-x: clip` until overflow tests are passing
- refactor all CSS in one large change

### Phase 6: Forms And Security Hardening

Finding:

`hostinger/api/send-enquiry.php` is strong. Keep it.

Confirmed good:

- origin allowlist
- referer/origin checks
- honeypot
- time-trap
- field count cap
- request body cap
- per-IP rate limit
- IPv6 /64 normalization
- uses real `REMOTE_ADDR`
- validates required fields
- rejects CRLF/header injection
- escapes HTML
- Resend timeout
- no public PHP errors

Do not rewrite the PHP endpoint casually.

Improvements:

1. Add documented dry-run/test mode for form submission if safe.
2. Verify one real live form submission with owner permission.
3. Confirm cron purge for enquiry backups is deployed and running.
4. Consider encryption-at-rest for NDJSON enquiry backups.
5. Consider Turnstile:
   - keep current anti-spam controls
   - add Turnstile only as another layer
   - do not make the form unusable if Turnstile fails unless security policy demands it

Important wording:

Do not claim "no patient data stored" if enquiry backups are stored. Correct claim is no database, email-primary, temporary host backup retained/purged.

### Phase 7: Sitemap And SEO Technical Cleanup

Finding:

`scripts/sitemap.mjs` uses current build date as `lastmod` for every page.

Task:

Make `lastmod` meaningful or remove it.

Options:

- blog posts use their post date/updated date
- stable pages use fixed dates
- treatment pages use a data field
- omit lastmod for pages where there is no reliable modified date

Do not rewrite SEO copy unless asked.

Keep:

- canonical apex domain
- no fake reviews/rating schema
- no accidental noindex on main pages

### Phase 8: Accessibility Polish

Findings:

1. Cookie banner privacy link has insufficient visual distinction in Lighthouse.
2. Header logo accessible name may be redundant.

Tasks:

- Underline cookie banner privacy link.
- Consider `alt=""` for logo image inside an already-labelled home link.

Do not redesign the header.

### Phase 9: Cleanup And Documentation

Tasks:

- Keep `legacy/` clearly marked as dead/archived.
- Update RUNBOOK if scripts change.
- Add a short "pre-launch command list":
  - correct Node
  - `npm ci`
  - `npm run ci`
  - `npm run check:launch`
  - browser tests
  - manual form test
  - deploy

## Things Not To Do

Do not:

- migrate to Next.js
- move to Netlify/Vercel
- replace PHP endpoint with Node unless owner explicitly changes hosting decision
- rewrite copy
- redesign the site
- remove the emergency-led strategy
- chase Lighthouse by destroying the visual design
- claim "unhackable"
- remove form backup reliability without owner approval
- refactor all CSS in one risky PR
- run auto-fix commands without checking diffs
- deploy unless asked

## Expected Final Report From Claude

When done, report:

- files changed
- exact problems fixed
- commands run
- whether each command passed
- remaining risks
- whether `npm ls --all` is clean
- whether Node version is correct
- whether browser tests exist and pass
- whether performance improved
- whether any behavior changed
- whether deploy was not performed

Be specific. Do not say "all good" without evidence.

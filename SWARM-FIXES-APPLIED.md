# Day Night Dental — Fixes Applied (from the Path-to-10/10 swarm review)

Companion to `SWARM-REVIEW-PATH-TO-10.md` (the 115-agent review, 572 verified findings, baseline 78/100).
This logs what was **fixed**, what's **waiting on owner content**, and the **two open decisions**.
Everything below was applied in `/Users/admin/day-and-night-dental-recovered`, committed in eight
verified batches, each gated on `build` + `lint` + `lint:css` + `test` + `check` all green.

## Fixed (no owner data needed) — committed

**Top-10 blockers cleared**
- Garbled `", , , …"` eyebrow mojibake removed from all treatment pages + /our-team (top-10 #2, critical).
- Placeholder dentist names no longer leak into Person JSON-LD (suppressed until real names land) (#1).
- Render-blocking CSS fixed: `fix-head.mjs` now turns the 87KB sheet into a real async preload on all 23 pages (#3). Verified the link swaps to `stylesheet` on load; no FOUC (critical CSS still inlined).
- £95 price removed (no-price pattern) (#4); unattributed "Clinically reviewed" byline now gated on a real `reviewer` (#4).
- Emergency page is **call-first** (red `tel:` CTA + pulse) instead of routing urgent patients to a form (#5).
- /thank-you + /registered gate on an explicit `submitted` flag — no more false confirmations or phantom conversion events on direct hits/refreshes (#6).
- `<noscript>` fallback added to both forms (phone + email) so no-JS visitors aren't stuck (#7).
- Header logo + route nav + emergency CTA use `<Link>` (SPA nav, no full reload); `tel:` stays a raw anchor (#8).
- Emergency button now AA-contrast (`#dc2626`, 4.83:1); burger is a 44px tap target (#9).

**Funnel / correctness**
- Treatments: clicking the active item no longer collapses + snaps the desktop panel to General Dentistry.
- Contact + Register surface the server's specific error (rate limit, validation) with the call-us fallback.
- Top-level `ErrorBoundary` around `<Outlet>` keeps the page + 24/7 phone alive if a route throws; resets per route.
- `scroll-padding-top` so in-page `#anchor` targets clear the fixed header.
- Contact form no longer defaults the preference to "emergency".

**Security / schema**
- JSON-LD escaped before embedding (`src/lib/jsonLd.js`) so editable go-live data can't break out of `<script>`.
- `hostinger/api/.htaccess` denies `_config.php` + data/dotfiles (defense in depth for the Resend key).
- `send-enquiry.php` only trusts localhost origin when `DND_ALLOW_LOCALHOST` is defined (dev only); production rejects spoofed `Origin: http://localhost`.
- `addressLocality` corrected to the post town (Glasgow).

**Accessibility**
- HomeFaq rebuilt as a proper WAI-ARIA tablist (roving tabindex, arrow/Home/End keys, `aria-controls`/`tabpanel`); dropped the hover-to-select.
- `forced-colors` block so gradient-clipped headings don't vanish in Windows High Contrast.
- Burger `type="button"`.

**Perf / cleanup / consistency**
- Deleted 4 dead section components (Concerns, EmergencyBand, TeamSpotlight, TeamWall) + orphaned `emergency-band.css`; extracted the still-used `Icon` to `src/components/ConcernIcon.jsx`.
- Removed the font-trial artifacts (~440KB) from `public/`; `check.mjs` now fails the build if any reach `dist`.
- Added the missing `.dn-section-lead` rule (6 sections used the class with no styles).
- Journey joins the site-wide scroll-reveal; every live number badge confirmed on the gold→blue gradient.
- em-dashes: **0** across `src/` and `dist/` (incl. the static `404.html` and `coming-soon.html` the earlier sweep missed).

**Infra / launch safety**
- `coming-soon.html` moved into `public/` so the `dist` deploy always ships it (it 404'd on a fresh server before).
- `check.mjs` gains `LAUNCH=1` mode that hard-fails on `[placeholder]` content, and fails on dev/trial artifacts in `dist`.
- Emergency blog post gained the "never reinsert a baby tooth" caveat + an NHS 24 / 111 out-of-hours signpost.
- `RUNBOOK.md` go-live checklist updated (LAUNCH check, gate-file removal, font step).

## Waiting on owner content (the real go-live blockers)
These can't be invented. `LAUNCH=1 npm run check` will block go-live until the placeholders are gone.
- **Clinician names + GDC registration numbers** → `src/sections/Team.jsx` (add `gdc` per member; schema + page light up automatically).
- **Real opening hours** → confirm, then drive everything from one `PRACTICE.openingHours` (hero strip, FAQ, schema currently hold placeholder Sat/Sun hours).
- **Consented practice photography** → team portraits + smile gallery (currently generic avatars + hot-linked Unsplash; self-host at go-live and drop the Unsplash preconnect + CSP `img-src` token).
- **Complaints Manager name** (optional — line now reads without it), **per-treatment `reviewer`**, the **whitening system** name, whether **All-on-4** is the protocol, **finance/FCA** wording, **legal entity + ICO** number, and whether the **24-hour line is genuinely answered** (vs triage).

## Two open decisions (yours)
1. **Voice — "we" vs "I".** The brand note says first-person "I", but the site describes a multi-dentist team, so the copy is pervasively "we". This is one decision, not many bugs. Tell me which and I'll align the human/editorial copy (hero first).
2. **Display font.** Trial built + screenshotted (Bricolage Grotesque / Fraunces / keep Plus Jakarta Sans); you chose to decide at the end. Say the word and I'll wire it (artifacts were removed but regenerate in seconds).

## Deliberately deferred (documented, not silently dropped)
- **`pruneSource: true`** (perf #2): drop only after measuring the async-CSS change with Lighthouse — it risks FOUC if the critical extraction is too tight.
- **Rate-limiter fail-open** (security #4): the `rl/` GC + an APCu fallback want a live PHP test before changing the working endpoint's behaviour; the disk-exhaustion vector is the bigger half and is a cron one-liner. Left for a tested pass.
- **Treatments desktop `aria-hidden` on the detail panel** (a11y): correct fix is viewport-aware and needs real-device AT testing — risky to do blind.
- **The long tail** (~500 low/nit items): apostrophe normalisation, breakpoint snapping, dead-CSS sweep, per-page OG on legal pages, trailing-slash link helper, blog read-time-from-word-count, etc. All catalogued by category in `SWARM-REVIEW-PATH-TO-10.md`.

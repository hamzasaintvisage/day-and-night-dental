# Day Night Dental — Path to 10/10 Engineering Report

**Project root:** `/Users/admin/day-and-night-dental-recovered`
**Stack:** Vite 7 + React 19 + react-router 6 + vite-react-ssg (SSG → hydrate). Self-hosted fonts, hardened PHP enquiry endpoint, Hostinger LiteSpeed, FTP deploy. Currently behind a committed coming-soon gate; not yet public.

This site is in good shape. The architecture is correct for what it is, the test/check tooling exists, the a11y baseline is real (working skip link, named landmarks, reduced-motion guards, a properly-built honeypot), and the copy is genuinely clean British English that mostly respects GDC/ASA limits. What holds it back from a launch-grade 10/10 is a tight cluster of high-leverage defects: **placeholder identities and garbled text shipping into production HTML and structured data on YMYL pages**, a **render-blocking CSS regression on every route**, an **emergency funnel that sends urgent patients to a form**, and **confirmation/analytics pages that lie about submissions that never happened**. Almost all of it is small or trivial to fix. The single largest non-engineering dependency is the owner supplying real content (clinician names + GDC numbers, photos, confirmed opening hours), which several blockers are gated on.

I verified the load-bearing claims directly against source: the `£95` price (`Register.jsx:161`), the `", , , Is This You?, , ,"` mojibake (`TreatmentPage.jsx:194`, `OurTeam.jsx:59`), the `Dr. [Principal Name]` placeholders (`Team.jsx:6-8`), the em-dash (`About.jsx:16`), the broken CSS `onload` swap in `dist/index.html`, the `#ef4444` emergency button, the un-purged `rl/` rate-limit dir, the unconditional conversion fire in `ThankYou.jsx`, and the missing `scroll-padding-top`. All confirmed.

## Score: 78/100

The codebase is structurally sound, tested, and largely compliant — that is most of the score. It loses points for: (1) **production HTML leaking placeholders/garbled text into user-visible copy and machine-readable Person/Procedure JSON-LD on a YMYL medical site** (the single worst risk here), (2) **a published specific price + unattributed clinical-review claims** that become live GDC/ASA exposure the instant the gate drops, (3) **a render-blocking-CSS regression** that the build's own async-swap intent silently no-ops on all 24 pages, and (4) **funnel correctness bugs** (emergency-to-form, false-success pages, phantom conversions). What blocks 100 is finishing those four clusters and the owner supplying real content; nothing requires a rewrite, and the long tail is mostly trivial sweeps.

## Top 10 priorities

| Rank | Issue | Category | Severity | Fix | Effort |
|------|-------|----------|----------|-----|--------|
| 1 | Placeholder dentist names ship into Person JSON-LD **and** render as `<h3>` on /our-team (YMYL) | seo / schema / compliance | high | Suppress Person nodes whose name matches `/\[.*\]/`; add build-time assert that no `[` reaches `dist`; add per-member `gdc` field; hard-gate go-live on real names | small |
| 2 | Garbled `", , , Is This You?, , ,"` / `", , , Become a Patient, , ,"` renders to users on 4 treatment pages + /our-team | copy / bug / content | critical | Replace with plain `Is This You?` / `Become a Patient`; add a build guard rejecting repeated `, , ` | trivial |
| 3 | Broken async-CSS swap: 87KB stylesheet is render-blocking on all 23 pages (`rel="stylesheet"` not `preload`) | perf | high | In `fix-head.mjs`, rewrite the primary CSS link to `rel="preload" as="style" onload="this.rel='stylesheet'"`, collapse the duplicate `crossorigin`, keep `<noscript>` | medium |
| 4 | Specific price "First visit from £95" + unattributed "Clinically reviewed" byline (GDC/ASA, YMYL) | compliance / content | high | Remove the figure (use no-price pattern); supply a real GDC `reviewer` per treatment file or gate the review clause on `data.reviewer` | small |
| 5 | Emergency page primary CTA sends time-critical patients to a form, not a `tel:` call | forms | high | Add a `data.emergency` flag so `TreatmentPage` renders a call-first hero/bottom CTA (`tel:` + red `.dn-btn-emergency`), demoting the form | small |
| 6 | `/thank-you` + `/registered` show false confirmation **and** fire conversion events on any no-submission visit | bug / forms | medium | Pass an explicit `submitted` flag in navigate state; gate copy + `generate_lead`/`Lead`/`sign_up` on it; redirect/soften when absent | medium |
| 7 | No-JS / pre-hydration form funnel is a dead end (no `action`, JSON-only endpoint, no `<noscript>`) | a11y / forms | high | Add a `<noscript>` near each form telling visitors to call `PRACTICE.phoneDisplay`; surface phone/email | medium |
| 8 | Desktop Header uses raw `<a href>` for real SPA routes → full reload on the busiest nav | bug / code-quality / perf | medium | Use `<Link to>` for logo + real-page nav (`/our-team`, `/register-as-patient`); keep `<a>` only for `tel:` | small |
| 9 | Emergency red CTA fails AA contrast (`#fff` on `#ef4444` = 3.76:1) site-wide | a11y | high | Darken bg/border to `#dc2626` (4.83:1) and fix the hover gradient end-state | trivial |
| 10 | Invented opening hours + placeholder names publish as fact in copy **and** FAQPage/openingHours JSON-LD | compliance / content | high | Source hours from one `PRACTICE.openingHours`; do not publish concrete hours/names in copy or schema until owner-confirmed; gate "GDC-registered" wording | small |

Highest impact-per-effort first: items 1, 2, 9 are near-trivial and remove the worst risks immediately; 3, 5, 6, 8 are the structural correctness wins; 4, 7, 10 are gated partly on owner content but cheap once supplied.

---

## Accessibility (a11y)

Solid baseline (working skip link + named main landmark, reduced-motion guards, honeypot, dynamic burger label), but three structural defects block a clean launch: the new-patient funnel is inert without JS, SPA confirmations never announce, and the Treatments + FAQ widgets ship broken ARIA contracts.

**High severity**
- **No-JS / pre-hydration form funnel is a dead end** — `src/sections/Register.jsx:173-176`. Prerendered `<form>` has no `action`/`method`; submit is JS-only `fetch` to a JSON-only endpoint (`send-enquiry.php:127` rejects non-`application/json`), and step-1 Continue is `type="button"` **and** `disabled`. No `<noscript>`. **Fix:** add a `<noscript>` pointing to `PRACTICE.phoneDisplay`. *Medium.*
- **No focus management or live region on SPA confirmation/step changes** — `src/components/FormSuccess.jsx:6-61` (used by ThankYou/Registered), Register step swap (`Register.jsx:61-62,196-323`), error alerts (`Contact.jsx:224-229`, `Register.jsx:308-313`). Focus stays on an unmounted button; nothing announced; error `<p role="alert">` never focused; inputs lack `aria-invalid`/`aria-describedby`. **Fix:** `tabIndex={-1}` + `.focus()` on the heading in a mount effect; move focus to the new step `<h3>`; `aria-current="step"`; ref+focus the error `<p>`. *Small.*
- **Desktop Treatments: visible content is `aria-hidden`; collapsed bodies stay focusable; ARIA points at hidden region** — `Treatments.jsx:169-205` + `treatments.css:91-98,193`. `.dn-tx-detail` carries `aria-hidden="true"` while holding two focusable links (axe `aria-hidden-focus`, WCAG 4.1.2); `aria-expanded`/`aria-controls` target a `display:none` body. **Fix:** drop `aria-hidden`, point `aria-controls` at the visible panel, `inert={!isActive}` on closed mobile bodies. *Small.*
- **Homepage FAQ is a half-built ARIA tablist** — `HomeFaq.jsx:53-77`. `role="tablist"`/`tab`+`aria-selected` with no `tabpanel`, no `aria-controls`/roving tabindex/arrow keys; selection fires on click **and** mouseenter **and** focus. **Fix:** ship the native `<details>/<summary>` accordion already used at `TreatmentPage.jsx:260`; remove hover/focus activation and the duplicate `<h3>`. *Small/medium.*
- **Emergency red CTA fails AA contrast** — `buttons.css:68-81`. `#fff` on `#ef4444` = 3.76:1. **Fix:** `#dc2626` (4.83:1, already in `components.css:17`); fix hover end-state. *Trivial.*
- **Burger tap target is 30×22px** — `header.css:107-117`, below WCAG 2.2 SC 2.5.8's 24px. **Fix:** `min-width:44px; min-height:44px`, re-center bars. *Trivial.*

**Medium severity**
- Legal pages render contact details as inert plain text (`LegalPage.jsx:32`) — make `tel:`/`mailto:`/external, render `<ul>` for enumerated routes. *Small–medium.*
- Required fields have no visible or programmatic "required" marker (`Contact.jsx:158,165,169`, Register) — add `aria-required`, visible marker, one note. *Small.*
- DOB group label is a bare `<span>` not tied to its three selects (`Register.jsx:212-219`) — `role="group" aria-labelledby`. *Trivial.*
- About emits no heading; landmark anonymous; `<blockquote>` misused for first-party copy (`About.jsx`) — promote eyebrow to `h2`, swap to `<p>`. *Small.*
- Testimonials use figure/blockquote/figcaption for non-quotes (`Testimonials.jsx:45-51`); un-hidden quote glyph. *Small.*
- Mobile menu: focusable elements inside `aria-hidden` during 450ms fade; collapsed submenu links stay focusable (`MobileMenu.jsx:99,113-127`) — drive `el.inert` via ref effect. *Small.*
- No non-colour active-nav cue; desktop nav unlabeled and has no `aria-current` (`header.css:222-227`, `Header.jsx:56-60`). *Small.*
- Custom Dropdown doesn't `scrollIntoView` the active option; listbox unnamed; `ariaLabel` has no default (`Dropdown.jsx`). *Small.*
- Spotlight thumbnails don't expose selected state; image swap not announced (`SmileGallerySpotlight.jsx:42-59`). *Small.*
- Mobile smile filmstrip not keyboard-operable (`SmileGallery.jsx:62-85`) — add `tabindex/role/aria-label` to the track. *Small.*
- Gradient-clipped text disappears in forced-colors mode (`hero.css:193-199`, `journey.css:18-22`, ~9 modules) — add one shared `@media (forced-colors: active)` block. *Small.*

**Low / nit (batch):** decorative-glyph & icon sweep (arrows baked into link names, un-hidden quote mark, decorative SVGs missing `aria-hidden`/`focusable="false"`); area chips/footer links lack list semantics; footer logo double-announces brand (set `alt=""`); breadcrumb current crumb missing `aria-current="page"` (×4); stock smile alt misrepresents images as this practice's patients; missing `twitter:image:alt`; map iframe no sandbox/text alternative; cookie banner `role="dialog"` with no focus move; reduced-motion gaps (concerns-bento hover, journey step lift, checkmark draw); "Scroll" label below AA contrast; article byline not `<time datetime>`; latent contract guards.

---

## Compliance (GDC / ASA / GDPR)

Most are go-live blockers rather than live breaches (the site is gated), but several would publish unverifiable or non-compliant claims the instant the gate drops.

1. **Specific price "First visit from £95"** [high] — `Register.jsx:160-163` (renders on homepage via `Home.jsx:142` and `/register-as-patient`). The only numeric price in the tree. **Fix:** remove; use the no-price pattern. *Trivial.*
2. **Unattributed "Clinically reviewed" byline on all 6 treatment pages** [high] — `TreatmentPage.jsx:136-140`; no `reviewer` set anywhere. **Fix:** supply a real GDC-registered `reviewer` per file, or gate the clause on `data.reviewer`. *Small.*
3. **Stock Unsplash models captioned as named treatment "Results"** [high] — `SmileGallery.jsx:4-11`, `SmileGallerySpotlight.jsx:4-11`, hero backdrop `Hero.jsx:21` (hot-links third party, leaks IP). **Fix:** self-host consented photography; drop treatment names from alt/caption meanwhile. *Medium.*
4. **No way to withdraw cookie consent (PECR / UK GDPR Art 7(3))** [high] — `CookieConsent.jsx:10-21`; banner never returns after a decision. **Fix:** persistent footer "Cookie settings" link that clears `dnd-consent` and re-opens the banner. *Small.*
5. **Privacy "Cookies" section omits the actual trackers (GA4 + Meta Pixel)** [high] — `Privacy.jsx:32`; `analytics.js` loads both (consent-gated). Live breach the instant IDs are populated. **Fix:** add a tracking subsection (provider, data, purpose, withdrawal, links); reconsider the Meta pixel on a YMYL site. *Medium.*
6. **Placeholder clinician names + invented opening hours ship as machine-readable fact** [high/medium] — `OurTeam.jsx:13-19` serialises `Dr. [Principal Name]` into Person JSON-LD; `HomeFaq.jsx:5-23` + `Home.jsx:58-62` publish invented hours in FAQ copy, FAQPage JSON-LD, and `openingHoursSpecification`; `Team.jsx:40` asserts "GDC-registered" against a placeholder roster. **Fix:** guard Person `@graph` to emit nothing while names match `/\[.+\]/`; do not publish concrete hours until confirmed; gate "GDC-registered" on real numbers. *Small.*
7. **Legal pages miss mandatory identity/controller detail** [medium] — `Privacy.jsx:13` (no legal entity, ICO number, full address, postal SAR route); `Terms.jsx:11-18` has no `PRACTICE` import or on-page contact. **Fix:** add a "Who we are" block reusing `PRACTICE`. *Small.*
8. **Consent checkbox names "their privacy policy" but never links it** [high] — `Register.jsx:301-305`, on the form collecting the most personal data. **Fix:** wrap in `<Link to="/privacy">`; fix pronoun. *Trivial.*
9. **Liability disclaimer lacks the non-excludable carve-out** [medium] — `Terms.jsx:16` (CRA 2015 / UCTA 1977). **Fix:** add the death/personal-injury/fraud carve-out sentence. *Small.*
10. **Accessibility statement makes itemised WCAG 2.1 AA claims with no audit/dates** [medium] — `Accessibility.jsx:11-15`. **Fix:** soften to "working towards"; add prepared/last-tested dates and an EASS line. *Small.*
11. **"Within one working hour" callback promised 5× and inconsistently qualified** [medium] — `Register.jsx:113`, `Contact.jsx:100`, `ThankYou.jsx:29`, `Registered.jsx:27,29`; a 2am submission gets an unmeetable SLA. **Fix:** "same working day" or apply "during opening hours" consistently. *Small.*
12. **Cards read as patient reviews; nav labels them "Reviews"** [medium] — `Testimonials.jsx:30-53`, `Footer.jsx:48`, `Header.jsx:40`, `MobileMenu.jsx:151`, for a not-yet-open practice. **Fix:** rename to "Our promise"; drop review styling/quote-marks. *Small.*
13. **"Clinically proven" whitening claim with no named system** [medium] — `TeethWhitening.jsx:22,25`. **Fix:** soften or name the system + hold evidence. *Trivial.*
14. **Under-18 whitening legality line reads ambiguously** [medium] — `blog.js:114`. **Fix:** scope to cosmetic use. *Trivial.*
15. **Google Maps iframe loads a third party before consent** [low] — `Contact.jsx:114-117`. **Fix:** click-to-activate placeholder. *Small.*
16. **Em-dash in About copy violates the zero-em-dash brand rule** [medium] — `About.jsx:16` (`&mdash;`, the only one site-wide; confirmed). **Fix:** split the sentence. *Trivial.*
17. **Unqualified absolute availability claims** [low/medium] — `Testimonials.jsx:7,22`, `WhyChooseUs.jsx:40`, `EmergencyDentist.jsx:13,20,24`, `blog.js:154`. **Fix:** soften absolutes; owner to confirm true same-day capacity. *Small.*
18. **Unqualified "24-hour dentist" / "Glasgow's 24/7" framing** [low] — `Hero.jsx:39`, `AreasServed.jsx:62`, `sections/AreasServed.jsx:11`; only the helpline is 24h. **Fix:** "A 24-hour emergency line in Glasgow"; confirm it's genuinely answered. *Trivial.*
19. **"All-on-4" used unmarked while Invisalign® is marked** [low] — `DentalImplants.jsx:19,23,29`. **Fix:** confirm the system; attribute `All-on-4®` or use "full-arch implant treatment". *Small.*
20. **Soft outcome/superlative/track-record claims on YMYL copy** [low] — "teeth that last a lifetime", "Built to last", "Near-invisible", "Check-ups are usually pain-free", "Trusted dental care", "Begin your transformation". **Fix:** soften per location. *Trivial each.*
21. **Privacy-policy gaps** [low] — processors unnamed, rights list incomplete (no withdraw-consent/portability), "free under-18 exam"/"finance available" under-qualified (`Privacy.jsx:20,24-28`, `Register.jsx:164-166`, `blog.js:79,92`). **Fix:** name processors + transfers clause; complete rights; FCA-qualify finance. *Small.*

**Track, don't block:** dead `priceFrom` → Offer schema path; dead `TeamSpotlight.jsx:8` GDC-restricted titles; identical hardcoded "Last updated: June 2026" across four legal pages mismatching sitemap lastmod.

---

## SEO

The structured-data layer is the real liability.

**Go-live blockers**
1. **Placeholder dentist names leak into Person JSON-LD (and render on two pages)** [high] — `Team.jsx:5-9` → `OurTeam.jsx:11-20,42`; confirmed in `dist/our-team/index.html`. **Fix:** skip JSON-LD when any name contains `[`; build-time assert; add per-member `gdc`. *Small.*
2. **`font-trial.html` dev artefact is indexable and in the sitemap** [medium] — `public/font-trial.html`, listed in `dist/sitemap.xml` at priority 0.7. **Fix:** delete before go-live (or `noindex`); rebuild. *Trivial.*
3. **Search Console / Bing verification meta still placeholder** [low] — `index.html:21-22`. **Fix:** add real verification at go-live. *Trivial.*

**Structured-data gaps**
4. Article `publisher` is a dangling `@id` that doesn't resolve on blog pages [medium] — `ArticleLayout.jsx:28`; `#dentist` node lives only on the homepage. **Fix:** inline a minimal Organization node. *Small.*
5. Areas-served page emits only BreadcrumbList — no Dentist entity with `areaServed` [high] — `AreasServed.jsx`. **Fix:** add a `Dentist` block with `areaServed: AREAS_SERVED.map(...)`. *Small.*
6. Three blog posts ship with no FAQ block / FAQPage schema their siblings have [high] — `blog.js` (`emergency-dentist-glasgow-at-night`, `invisalign-vs-braces`, `dental-implants-cost-glasgow`). **Fix:** add 4-6 GDC/ASA-safe `faqs` each. *Small.*
7. Cost-of-implants post is thin (188 words) on a money keyword [high] — `blog.js:171-181`. **Fix:** expand to ~600-800 words + `faqs`. *Medium.*
8. Pages with visible breadcrumbs but no BreadcrumbList JSON-LD [medium] — `OurTeam.jsx:45`, `Blog.jsx`, `RegisterAsPatient.jsx`, all four legal pages. **Fix:** mirror the `TreatmentPage.jsx:48-54` pattern. *Small.*
9. Legal pages render no page-specific OG/Twitter card and no `og:url` [medium] — `LegalPage.jsx:10-14`. **Fix:** add OG/Twitter/`og:url`. *Small.*

**Title / meta coherence**
10. Areas-served `<title>` never names the page topic and diverges from og/twitter [medium] — `AreasServed.jsx:30,34,42,62`. **Fix:** align `<title>` to "Areas We Serve…". *Trivial.*
11. Blog "Blog"/"Advice"/"Advice & Guides" label inconsistency [low] — standardise on "Advice & Guides". *Trivial.*
12. JSON-LD `addressLocality` is "Merchant City" (a district), not post town "Glasgow" [medium] — `Home.jsx:43-50`; `PRACTICE.city` exists but is unused. **Fix:** set `addressLocality` to `PRACTICE.city`. *Trivial.*
13. NAP street name inconsistent ("80 Hutcheson St" vs "Street") [low] — `practice.js:12,32`. **Fix:** use exact GBP spelling everywhere. *Trivial.*

**Crawlability & freshness**
14. Site-wide trailing-slash mismatch: every internal link 301s against its own canonical [medium] — canonicals/sitemap use directory form, every `<Link>`/`href` is slash-less; no `.htaccess` normalization. **Fix:** render all internal links with the slash (or add a 301), via a shared URL helper. *Small.*
15. `dateModified` hard-locked to `datePublished` across all posts [low] — `ArticleLayout.jsx:24-26`. **Fix:** add optional `updatedISO`. *Small.*
16. Sitemap `lastmod` is the build date for every URL [nit] — `scripts/sitemap.mjs:8,40`. **Fix:** use real content date where available. *Small.*
17. Treatment "Treatments" crumb resolves to a homepage fragment; visible link is a non-router `<a>` [low] — `TreatmentPage.jsx:51,122`. **Fix:** 2-level crumb or a real `/treatments/` hub. *Small.*
18. Smile gallery markup (incl. "Modern dentistry" H2) rendered twice into homepage HTML [low] — `Home.jsx:140-141`. **Fix:** one responsive gallery. *Medium.*
19. Six treatment bodies + CTAs emitted 7× into homepage HTML [low] — `Treatments.jsx:189,202`. **Fix:** render the desktop panel CTA once. *Medium.*
20. Register step-2 (care/consent) not server-rendered [low] — `Register.jsx:254`. **Fix:** render both steps, toggle with CSS/`hidden`. *Medium.*

**Polish:** dead `procedureType` field (`TreatmentPage.jsx:41,56-65`); success pages inherit marketing OG and omit `og:url`; near-verbatim FAQ cost boilerplate across cross-linked posts.

**Conventions, not defects:** missing `twitter:image:alt` / single generic OG image; `og:type="website"` everywhere; FAQPage rich-result eligibility is gone for non-gov/health domains (keep valid markup, expect no rich result); the `index,follow` + live canonical in dist is safe **only while the gate holds** — verify the gate returns non-200/noindex to crawlers and flip to index only at go-live; suppress/hold `robots.txt`/`sitemap.xml` during the gate.

---

## Copy

Fundamentally clean (British English, GDC/ASA-safe, no banned AI filler), but two defects are launch-blocking.

1. **Corrupted eyebrow `", , , …, , ,"` renders literally** [critical] — `TreatmentPage.jsx:194` (all 4 concern pages) and `OurTeam.jsx:59`; confirmed in `dist/`. The only two `, , ,` hits site-wide — genuine mojibake from a botched separator find-replace. **Fix:** plain labels `Is This You?` / `Become a Patient`; add a build guard rejecting repeated `, , `. *Trivial.*
2. **Site-wide corporate "we/our/us" vs the mandated first-person owner "I"** [medium] — pervasive (`Hero.jsx:61`, `About.jsx:8,14`, all six treatment pages, all six blog posts, success pages…). Zero owner "I" in body copy. **One decision, not many bugs:** rewrite the human/editorial moments to "I" (highest-impact spot is the hero), reserving "we" for clinic operations — OR amend the brief to accept clinic "we". *Decision small; rewrite large.*
3. **Em-dash in the About manifesto** [high] — `About.jsx:16`; exactly one hit site-wide (confirmed). **Fix:** split into two sentences, re-grep to confirm zero. *Trivial.*
4. Inconsistent apostrophe typography (straight vs curly), sometimes within one file [low] — worst in `TeethWhitening.jsx` (1 curly + 13 straight) and `Contact.jsx`. **Fix:** scripted normalise to curly. *Small.*
5. Meta descriptions exceed ~155-160 chars and truncate [low] — `blog.js` (veneers 169, dental-emergency 163, whitening 159), `RegisterAsPatient.jsx:14` (164). **Fix:** trim to ≤155. *Small.*
6. Several blog titles exceed ~60 chars; brand suffix dropped in search [nit] — `blog.js`. *Small.*
7. Vague outcome-promising gallery CTA "Begin your transformation" [low] — `SmileGallery.jsx:89`, `SmileGallerySpotlight.jsx:65`. **Fix:** "Book a cosmetic consultation". *Trivial.*
8. Dead duplicate `Concerns.jsx` + precious "Your concerns, our craft" heading [low] — delete unused file; reword. *Small.*
9. Awkward "Same day, typically" + run-on area list on emergency page [nit] — `EmergencyDentist.jsx:15,17`. **Fix:** "Often same day"; parenthesise the area list. *Trivial.*
10. Vague FAQ price filler "priced for you" [low] — `Invisalign.jsx:62`. **Fix:** explain the variable without a figure. *Trivial.*
11. Minor heading/eyebrow polish nits [nit] — Testimonials eyebrow vs heading mismatch; HomeFaq "Emergency & dental questions"; literal "…" glyph; doubled "here in Glasgow". *Trivial each.*

Note: legal-page "we/us" is defensible for Privacy (which defines the term) but Complaints/Accessibility drift without that definition — fold into the item-2 voice decision.

---

## Code quality

Sound but carrying launch debt.

1. **Three dead section components + a dead Concerns default, with an icon library trapped inside the dead file** [high] — `TeamSpotlight.jsx`, `TeamWall.jsx`, `EmergencyBand.jsx`, `Concerns.jsx`. `Concerns()` is dead but the file survives only to export `Icon()` (used by `ConcernsBento.jsx:2`, `Treatments.jsx:3`). `TeamSpotlight.jsx:5-18` also carries a divergent **6-member** team[] vs the canonical **3-member** `Team.jsx:5-9` — a name-drift trap. **Fix:** extract `Icon()` into `src/components/ConcernIcon.jsx`, repoint importers, delete the four. *Small.*
2. **Shared `.dn-section-head` heading styles trapped in `concerns.css`** [high] — `concerns.css:3-20`, consumed by ~7 live sections; `base.css .dn-display` has no font-size, so heads are sized entirely by concerns.css loading first. The `h2 em` copy has already drifted. **Fix:** hoist generic rules into `shared.css`/`base.css`. *Small.*
3. **No React error boundary anywhere** [medium] — `Layout.jsx`, `main.jsx`. Any hydration throw blanks the tree and hides the emergency CTA. **Fix:** wrap `<Outlet/>` in a top-level ErrorBoundary keeping `tel:` visible. *Small.*
4. **Navigation + treatment data duplicated across 5 files** [medium] — `Header.jsx:36-42`, `MobileMenu.jsx:7-14`, `Footer.jsx:32-53`, `Treatments.jsx:6-12`, `routes.jsx:32-37`. **Fix:** extract `NAV_ITEMS`/`TREATMENTS` modules. *Small.*
5. **Contact and Register duplicate the entire submit/anti-bot/error pipeline** [medium] — `Contact.jsx:14-55`, `Register.jsx:23-85`. **Fix:** extract a `useEnquiryForm(formType, onSuccess)` hook. *Medium.*
6. **Installed lint plugins never wired in** [medium] — `eslint.config.js:10-13`; `jsx-a11y` and `react` are devDeps but not in `extends`/`plugins`, so `npm run lint` runs no React/a11y rules. **Fix:** add the recommended flat configs or remove the packages. *Small.*
7. **Stray per-component CSS imports bypass the load-bearing ordered cascade** [medium] — `concerns-bento.css` (from `ConcernsBento.jsx:3`), `journey.css` (from `Journey.jsx:2`). **Fix:** move into `src/styles/modules/` with `@import` at the intended position. *Small.*
8. **Hero clock values + DOB year are hardcoded literals divorced from a single source** [medium] — `Hero.jsx:85,90,95` duplicate hours `Home.jsx:58-61` holds canonically; `Register.jsx:17-18` pins `DOB_CURRENT_YEAR = 2026`. **Fix:** drive hero from `PRACTICE.openingHours`; move the year to `config.js` with a floor assertion. *Small.*
9. **Internal route navigation uses plain `<a href>` forcing full reloads** [medium] — `Header.jsx:48,57-59` (whole desktop nav, incl. pure routes), `About.jsx:24`; Footer/MobileMenu already use `<Link>`. **Fix:** `<Link to>` for pure routes. *Small.*
10. **Smile-gallery data + copy duplicated across two components, both DOM trees shipped** [medium] — `SmileGallery.jsx:4-11`, `SmileGallerySpotlight.jsx:4-11`. **Fix:** hoist to `src/data/smiles.js`. *Small.*
11. **`concerns.css` naming trap** [medium] — titled "Concerns" but its only live rules are the generic section-head; the real styling is `concerns-bento.css`. **Fix (after #2):** delete `concerns.css`, rename `concerns-bento.css` → `concerns.css`. *Small.*

**Low / nit:** unguarded required-prop maps crash the whole SSG build on one bad data entry (`LegalPage.jsx:32`, `ArticleLayout.jsx:91`, `TreatmentPage.jsx:80,277` — default the arrays); hash-scroll effect can no-op on cross-route `#hash`; bare `href="#contact"` CTAs aren't route-portable; duplicated `.dn-success-mark` ×3 + `.dn-form-error` margin fork; mobile call-bar height hardcoded in 3 places; burger/header rules split across two modules at 1100px; ~120 lines of dead "About" CSS still shipping; stale "Netlify" comments + dead hidden inputs on the PHP path; CtaBand inline style vs a module class; `journey.css` duplicates `.dn-container` + orphan anchor; array-index keys on a stateful gallery rail; schema fields set but never consumed; no formatter (mixed semicolons / curly apostrophes). Plus a single-sweep cleanup of orphaned dead CSS rules and scattered responsive breakpoints (~12 values; snap to 1100/900/640/480).

---

## Content

Mostly launch-ready but with two visible placeholder leaks, a YMYL trust gap, and thin/duplicated copy.

1. **Literal `[Name]` placeholder ships into the live Complaints Manager line** [high] — `Complaints.jsx:14`, confirmed in `dist/complaints/index.html`. A GDC-facing page rendering an unfinished token. **Fix:** add `PRACTICE.complaintsManager`; if none ready, drop the token + comma. *Trivial.*
2. **Garbage `", , , Become a Patient, , ,"` on live /our-team** [low, user-visible] — `OurTeam.jsx:59`. *Trivial.*
3. **Unattributed "Clinically reviewed" byline + no `reviewedBy` schema across all treatment pages** [medium] — `TreatmentPage.jsx:136-139,63-64`; no file sets `reviewer`. **Fix:** real GDC `reviewer` or drop the wording. *Small.*
4. **All three team portraits are identical generic avatar SVGs** [medium] — `Team.jsx:11-28`. On a "meet the team" page the portraits are the content. **Fix:** real `<img>` with descriptive alt; keep `AvatarSvg` as fallback. *Medium (go-live handoff).*
5. **No signpost to NHS 24 / 111 for out-of-hours dental care** [medium] — `blog.js:154`; zero "NHS 24"/"111" matches. **Fix:** one neutral sentence. *Trivial.*
6. **Knocked-out-tooth advice omits the "never reinsert a baby tooth" caveat** [medium] — `blog.js:157` vs sibling line 21. **Fix:** add a one-line caveat. *Trivial.*
7. **Read-time labels inflated and inconsistent across the blog** [medium] — `blog.js` (188-word post → "5 min", 219-word → "4 min"). **Fix:** derive from word count at build. *Small.*
8. **Two thin/cannibalising commercial posts** [medium] — `blog.js:148-159` (emergency-at-night, ~188 words) and `:193-203` (invisalign-vs-braces, ~170 words). **Fix:** differentiate + expand to 600-900 words. *Medium.*
9. **Implants cost post sets a hook it never pays off** [medium] — `blog.js:170` promises "why the cheapest quote is not always the one to trust"; none of the sections deliver it. **Fix:** add that section + sibling trust framing. *Small.*
10. **One-sided Invisalign comparison omits the wear-time compliance caveat** [medium] — `blog.js:195,198,201`. **Fix:** one balanced line on ~20-22 hrs/day. *Trivial.*
11. **Hero meta strip presents weekday-only hours (07:00/23:00) as universal** [medium] — `Hero.jsx:84-95`, contradicting `Home.jsx:58-61` (Sat/Sun) and `HomeFaq.jsx:22`. **Fix:** label the figures or show an everyday-true value, tied to `PRACTICE`. *Small.*
12. **Opening hours / phone details drift within Contact** [low] — `Contact.jsx:129-131` table vs `:88` hint; identical "Day Line"/"Night & Emergency" blocks link the same number. **Fix:** one `PRACTICE.openingHours`; collapse to a single 24/7 block. *Small.*
13. Duplicated/diverging concern-card data [low] — `Concerns.jsx:3-16` vs `ConcernsBento.jsx:8-21`; only bento ships. **Fix:** delete dead array. *Trivial.*
14. Repetitive treatment-page sections restate the same content [low] — `TreatmentPage.jsx:188-210`, `TeethWhitening.jsx`, `CosmeticDentistry.jsx`. **Fix:** distinct problem-framed angles. *Medium.*
15. Treatment-time meta strips conflict with body copy [low] — `CosmeticDentistry.jsx:20` ("1 to 6 weeks" vs "single appointment"), `Invisalign.jsx:28` vs `:63`. **Fix:** soften to match. *Trivial.*
16. Duplicated blog FAQ vs body section; unanchored "we" in extracted schema answers [low/nit] — `blog.js:84-89,49`. *Small.*
17. Blog articles lack the visible "Last reviewed" line; posts not sorted by date [low] — `ArticleLayout.jsx:86`, `Blog.jsx:43` (SSR-safe sort on `dateISO`). *Small.*
18. Legal "Last updated: June 2026" hardcoded, month-only, duplicated across four pages [low] — hoist to one `LEGAL_UPDATED` (keep manual — do NOT derive from `new Date()`), render via `<time datetime>`. *Trivial.*
19. Legal pages describe a non-existent online booking provider [low] — `Terms.jsx:15`, `Privacy.jsx:15`, `Accessibility.jsx:14`; no booking URL/CSP frame-src exists. **Fix:** remove the references (or wire a real provider + CSP); align footer "Terms" label. *Small.*

---

## Visual / design system

The system has drifted; nothing breaks the page, but together it reads as slightly inconsistent.

1. **Old pre-refresh brand colours still used in 28 places** [high] — `{hero,about,gallery,team,treatments,emergency-band,register,contact}.css`. Old gold `rgba(212,164,83)` ×14 + old blue `rgba(91,143,191)` ×14 vs refreshed `rgb(244,194,74)`/`rgb(74,149,229)`; both appear on the same page (`.dn-glow` bright vs `hero.css:38-39` dull). **Fix:** find-replace old→new across 8 modules; expose `--dn-day-rgb`/`--dn-night-rgb`. *Small.*
2. **`.dn-section-lead` has ZERO CSS anywhere — degrades 6 sections** [medium] — used in `{SmileGallery,SmileGallerySpotlight,TeamWall,TeamSpotlight,Register,Team}.jsx`, no rule exists. Ships on the homepage (`<Team/>`). **Fix:** one shared rule (`max-width:~560px; margin:0.75rem auto 0; color:var(--dn-bone-dim)`). *Trivial.*
3. **Journey omits `dn-section`, skipping site-wide scroll-reveal + spacing token** [medium] — `Journey.jsx:9`; `Layout.jsx:29` observes only `.dn-section`. Also hard-codes `padding:4rem 0` vs `--space-section`. **Fix:** add `dn-section`, drop the padding. *Trivial.*
4. **Card border-radius inconsistent (0/10/12/16px) across cards sharing one hover ring** [medium] — only `.dn-concern-card`=12px has a radius; the shared ring uses `border-radius:inherit`, so it traces rounded corners on concern cards and hard corners everywhere else. **Fix:** one `--dn-radius-card`. *Small.*
5. **`.dn-pillar-num` is the only numbered element off the unified 135deg gradient** [medium] — `about.css:157-164`. **Fix:** move to the gradient block. *Trivial.*
6. Desktop hover gradient ring wraps the borderless team column, not the portrait [low] — `Team.jsx:47-54` + `components.css:182`. **Fix:** drop `.dn-team-card` from the ring list. *Small.*
7. `.dn-blog-card`/`.tp-related-card` get a double hover with mismatched accent colours [low] — `components.css:155`, `treatment-pages.css:105`. **Fix:** remove per-card `:hover`. *Trivial.*
8. Hover-only success card is flat on touch devices [low] — `components.css:80`. **Fix:** always-on `1px var(--dn-mist)` border. *Small.*
9. Hero H1 gradient-fill `<em>` has no `@supports` fallback [low] — `base.css:62-69`. **Fix:** `@supports not (background-clip:text)` restoring `color`. *Small.*
10. Manual `<br/>` (+ stray leading `&nbsp;`) forces awkward breaks [low] — `CosmeticDentistry.jsx:31`, `TeethWhitening.jsx:31`, `Hero.jsx:61`, `Treatments.jsx:151`. **Fix:** drop the manual break. *Trivial.*
11. Two-column fr-ratio grids lack `min-width:0` except Register [low] — `{about,treatment-pages,contact}.css`. *Small.*
12. Testimonials/team single-column breakpoint diverges (800px vs 768px) [low] — align to 768px. *Trivial.*
13. FAQ answer panel `min-height:200px` + per-swap fade causes a layout jump [low] — `treatments.css:276-284`. *Small.*
14. WhyIcon stroke weight/size contradicts its own "same as concern icons" comment [low] — `WhyChooseUs.jsx:1-6`. *Trivial.*
15. Eyebrow/label letter-spacing is ad-hoc (0.1-0.34em) instead of the `.dn-eyebrow` token [low] — standardise on 2-3 sizes. *Medium.*
16. Registered-trademark ® in the Invisalign H1 isn't superscripted [low] — `Invisalign.jsx:18`. *Trivial.*
17. Concerns icons authored at 36×36 but force-resized to 26px, thinning the stroke [nit] — `treatments.css:57`; add `vector-effect:non-scaling-stroke`. *Trivial.*
18. Interactive radii diverge (button 2px / inputs 0 / callbar+cookie 4px) [nit] — define `--dn-radius-control`. *Trivial.*
19. Mobile cookie banner ignores safe-area inset, can crowd the call bar [nit] — `components.css:116`; `bottom:calc(5.3rem + env(safe-area-inset-bottom,0px))`. *Trivial.*

---

## Schema (JSON-LD)

Broadly well-structured; a YMYL blocker plus cross-page `@id` references that dangle per-URL.

1. **Person schema ships placeholder dentist names to Google, no GDC identifier** [high] — `Team.jsx:5-9` → `OurTeam.jsx:13-19`; confirmed in dist. **Fix:** hard-block go-live on real names + GDC numbers (add `gdc` per member); meanwhile suppress Person nodes matching `/\[.*\]/`. *Small.*
2. **`provider @id` points to a `#dentist` node that doesn't exist on the treatment page** [medium] — `TreatmentPage.jsx:5,62,71`; the Dentist node lives only on the homepage, but JSON-LD parses per-URL. **Fix:** emit a minimal Dentist/Organization node into each treatment `<Head>`. *Small.*
3. **`procedureType` data field is dead; CosmeticProcedure typing silently dropped** [medium] — declared on every treatment file, consumed nowhere; `TreatmentPage.jsx:58` hardcodes `MedicalProcedure`. **Fix:** consume it (validated) or delete the keys. *Small.*
4. **Treatments breadcrumb item 2 points to a homepage fragment (`/#treatments`)** [medium] — `TreatmentPage.jsx:51`; Google strips the fragment. **Fix:** real `/treatments/` hub or drop the intermediate crumb. *Medium.*
5. BreadcrumbList "Blog" item uses `/blog` while canonical/sitemap use `/blog/` [low] — `ArticleLayout.jsx:37,77`. *Trivial.*
6. BlogPosting `author` is an unanchored name-only Organization [low] — `ArticleLayout.jsx:27`; point at `{'@id': SITE/#dentist}`. *Small.*
7. `dateModified` hardcoded equal to `datePublished` [low] — `ArticleLayout.jsx:25-26`; add optional `dateModifiedISO`. *Trivial.*
8. Homepage `availableService` provider `@id` URLs are slash-less, mismatching canonicals [low] — `Home.jsx:25`. *Trivial.*
9. `lastReviewed` ISO date decoupled from the visible label, no single source [low] — `CosmeticDentistry.jsx:10-11` etc. *Small.*
10. `lastReviewed` emits with no `reviewedBy` [low] — `TreatmentPage.jsx:63-64`; gate both on a real `reviewer` (resolves with #1). *Small.*
11. MedicalProcedure + same-name Service are both thin and partly redundant [low] — `TreatmentPage.jsx:56-76`; add `name` to Service, enrich or drop one. *Small.*
12. BlogPosting `image` is a bare URL string, generic across every post [low] — `ArticleLayout.jsx:30`; use an ImageObject with dimensions. *Trivial.*
13. WebSite schema lacks `inLanguage`; entities linked only by bare `@id` [low] — `Home.jsx:85-92`; add `inLanguage:'en-GB'`. *Trivial.*

---

## Bugs (functional correctness)

1. **Placeholder eyebrow renders literal commas `", , , Is This You?, , ,"` on every concern page** [high] — `TreatmentPage.jsx:194` (shipped in dist) + `OurTeam.jsx:59`. `.dn-eyebrow` has no `content`, so commas render verbatim and a screen reader announces them as pauses above a YMYL heading. **Fix:** clean labels; rebuild. *Trivial.*
2. **Desktop Header uses raw `<a href>` for real SPA routes — full reload on every primary-nav click** [medium] — `Header.jsx:48,57-59,63,67` (confirmed: logo, phone, Emergency are plain anchors); `MobileMenu.jsx:130-148` uses `<Link>`. **Fix:** `<Link to>` for routes; `<a>` only for `tel:`. *Small.*
3. **`FormSuccess` hash links trigger full reloads (and drop the arrow on primary links)** [medium] — `FormSuccess.jsx:45-55`; `ThankYou.jsx:35`/`Registered.jsx:36` pass `/#treatments` into the raw `<a>` branch. **Fix:** `<Link>` for in-app hashes; move arrow rendering to both branches. *Trivial.*
4. **`/thank-you` and `/registered` show a false confirmation on any no-submission visit** [medium] — `ThankYou.jsx:8-9,27`, `Registered.jsx:8-9`. `firstName` comes only from `useLocation().state`; on direct hit/refresh/back/shared link the success copy still renders, and `dist/registered/index.html` is a crawlable "success" page. **Fix:** explicit `submitted` flag; redirect/soften when absent. *Medium.*
5. **Analytics conversion events fire on every visit** [medium] — `ThankYou.jsx:11-15`, `Registered.jsx:11-15` (confirmed: mount effect fires `generate_lead`/`Lead` unconditionally, `state?.firstName` read but unused). Corrupts cost-per-lead once IDs are live. **Fix:** gate on `submitted`/`state?.firstName`; guard refire on refresh. *Small.*
6. **Clicking an already-active treatment collapses the panel and snaps to General Dentistry on desktop** [medium] — `Treatments.jsx:142-143,171`; `setActive(active===t.id ? null : t.id)` then `|| treatments[0]`. **Fix:** keep desktop `active` real; track mobile open/closed separately. *Small.*
7. On a non-OK response the user gets generic "try again" and the server error JSON is discarded [low] — `Register.jsx:75-85`, `Contact.jsx`; `submitEnquiry` returns the raw Response, body never read. **Fix:** parse JSON, surface `res.error`. *Small.*
8. `firstName` rendered into the H1 untrimmed and uncapped, breaking layout [low] — `ThankYou.jsx:26`, `Registered.jsx:26`; no `overflow-wrap` on `.dn-formsuccess h1`. **Fix:** sanitise at submit; add `overflow-wrap:anywhere` + `maxLength`. *Small.*
9. GA4 + Meta Pixel double-count the page view on every full load [low] — `analytics.js:28-51` + `Analytics.jsx:9-11`. Dormant until IDs filled. **Fix:** `{ send_page_view:false }`, drop the manual `fbq PageView`. *Small.*
10. **In-page `#concern` (and all hash) anchors scroll under the fixed header** [low/high-impact] — `components.css:22` has only `scroll-padding-bottom`, no `scroll-padding-top` (confirmed). Cards deep-link to `/treatments/dental-implants#concern`. **Fix:** `html { scroll-padding-top: 6rem; }`. *Trivial.*
11. DOB year ceiling hardcoded to 2026 and goes stale [low] — `Register.jsx:17-18`. **Fix:** top up `YEARS` on the client after mount. *Small.*
12. Conversion events can no-op for not-yet-consented visitors on /registered [low] — `Registered.jsx:11-15`; optional hardening to queue + flush on consent. *Small.*
13. `TREATMENT_TITLES` hardcoded duplicate map; unmapped related slug → blank broken link [low] — `ArticleLayout.jsx:6-13,111-114` (no guard vs the guarded posts block). **Fix:** guard + derive from one source. *Small.*
14. Duplicate React key from identical placeholder member names [nit] — `Team.jsx:7-8` share `'Dr. [Dentist Name]'` with `key={member.name}`. **Fix:** add a stable `id`. *Trivial.*
15. Smile gallery arrows scroll a magic 360px vs the real 356px card+gap [low] — `SmileGallery.jsx:62,80`. **Fix:** compute the step from `offsetWidth` + gap. *Trivial.*

**Latent:** burger `<button>` has no `type` (defaults to `submit`); breadcrumb "Treatments" is a plain `<a>` while "Home" is a `<Link>`; `Blog.jsx:42-51` no empty-state guard; `EmergencyBand.jsx:5`/`emergency-band.css:36` reference an undefined `--dn-night-deep` token (latent while unmounted).

---

## Performance

The render path is bottlenecked by a broken async-CSS swap compounded by uncacheable inline CSS on all 24 pages.

1. **Render-blocking external stylesheet — beasties `preload: swap` produced `rel="stylesheet"`, not `rel="preload"`** [high] — confirmed the literal `rel="stylesheet" crossorigin crossorigin … onload="this.rel='stylesheet'"` in `dist/index.html`, so the swap is a no-op and the 87KB/15KB-gz sheet fully blocks paint on all 23 pages. **Fix:** in `fix-head.mjs`, rewrite the link to `rel="preload" as="style" onload`, collapse the duplicate `crossorigin`, keep `<noscript>`; verify with Lighthouse. *Medium.*
2. **Critical CSS duplicated and re-inlined uncacheably on every page (`pruneSource: false`)** [high] — `vite.config.js:14` (confirmed). The 56KB inline block is also kept verbatim in the external sheet and re-downloaded on every route. **Fix:** set `pruneSource: true` (only after #1 lands) and tighten the critical extraction. *Small–medium.*
3. **All content imagery hot-linked from images.unsplash.com** [high] — `Hero.jsx:21`, both galleries (15 on homepage, 37 site-wide); uncacheable third-party requests that leak visitor IP/referrer (GDPR) on a YMYL site. **Fix:** self-host final consented imagery in `public/` with explicit dimensions; keep hero `fetchPriority="low"`. *Medium.*
4. **Trial display fonts (~432KB woff2) ship to production but are never referenced** [medium] — `public/fonts/trial-*.woff2` (6 files, confirmed present + copied to dist). Only consumer is dev-only `font-trial.html`. **Fix:** delete the six + `font-trial.html`. *Trivial.*
5. No route-level code-splitting — all 17+ routes in one app chunk [medium] — `routes.jsx` (zero `lazy(`). **Fix:** convert pages to `lazy()`. *Medium.*
6. Dead section components + their CSS bundled and shipped [medium] — `EmergencyBand.jsx`, `TeamSpotlight.jsx`, `TeamWall.jsx` + `emergency-band.css`/`concerns.css` (~6KB). **Fix:** delete + extract `Icon`. *Small.*
7. Inline Google Maps embed loads Google's payload for every scrolling visitor [low] — `Contact.jsx:113-119`. **Fix:** static-image facade with click-to-load. *Medium.*
8. `logo.png` is a 235KB 512×512 PNG referenced only by JSON-LD [low] — `Home.jsx:38`. **Fix:** point at `icon-512.png` or compress. *Trivial.*
9. `logo-mark.png` preloaded high-priority is 45KB for a 280×243 mark [low] — pngquant/WebP. *Trivial.*
10. Two variable woff2 preloaded with broad axes/unicode-range likely carry unused glyphs [low] — `tokens.css:2-3`; subset to rendered glyphs, trim axes. *Small.*
11. Cross-route hash CTAs use raw `<a>` forcing full reload (effectively the site convention) [low] — `TreatmentPage.jsx:122,143,297`, `AreasServed.jsx:69`. *Small.*
12. Build artifacts + near-empty loader-data shipped in deployable `dist/` [nit] — `dist/.vite/`, `font-trial.html`, `static-loader-data/` (~92KB of `{"0":null}`); scope Unsplash preconnect to homepage. *Trivial–small.*

---

## Forms

The two enquiry forms work but leak real leads.

1. **Emergency page primary CTA sends users to a form, not a phone call** [high] — `EmergencyDentist.jsx:4`, `TreatmentPage.jsx:143-144,296-299`; contradicts the tel-first pattern in `Hero.jsx:67`/`EmergencyBand.jsx:23`. **Fix:** `data.emergency` flag → call-first hero/bottom CTA. *Small.*
2. **Specific server errors discarded; user always sees the same generic failure** [high] — `Contact.jsx:45-54`, `Register.jsx:75-85`; 429/400/"Consent required"/"too long" all collapse to one message. **Fix:** `await res.json().catch(()=>null)`, surface `data?.error`. *Small.*
3. `submitEnquiry` returns the raw Response; callers never check JSON body shape [low, compounds #2] — `submitEnquiry.js:30-45`. A 200 HTML error page / WAF challenge reads as success. **Fix:** parse + branch on `data.ok === true`. *Small.*
4. **Time-trap and honeypot silently navigate to success while sending NO email** [medium] — `send-enquiry.php:177-188` returns before backup write + Resend; password-manager autofill can trip the 600ms time-trap. **Fix:** still write to backup on time-trap, measure from first keystroke, log drops. *Medium.*
5. **Contact form defaults preference to 'emergency'** [medium] — `Contact.jsx:21`; routine bookings auto-tagged as emergencies. **Fix:** default to `''` or `'day'`; apply red styling only after active selection. *Small.*
6. **Per-IP rate limit increments BEFORE validation** [medium] — `send-enquiry.php:154-175` runs before required-field/email checks; eight corrections in a minute → 429 even after the form is correct. **Fix:** increment just before Resend, or exclude 4xx-validation. *Small.*
7. **Conversion events fire on every visit to /thank-you and /registered** [medium] — (same as bug #5). **Fix:** gate on `state?.firstName`, clear history state. *Trivial.*
8. **DOB accepts impossible and future dates with no validation** [medium] — `Register.jsx:51-58,213-219`; `2026-02-31` passes, endpoint never validates `dob`. **Fix:** validate the assembled date (in an effect), require all-three-or-none, inline hint. *Small–medium.*
9. No phone-format validation client or server [low] — `Contact.jsx:165`, `Register.jsx:89-90`, `send-enquiry.php:190-215`; "asdf" passes a callback-promise practice. **Fix:** permissive digit check both sides. *Small.*
10. Contact form has no client-side email-format check; the two forms are inconsistent [low] — `Contact.jsx:34-55` vs `Register.jsx:90`. **Fix:** same regex pre-check. *Trivial.*
11. Capped inputs have no `maxLength`; JS-only forms have no no-script fallback [low–medium] — `Contact.jsx:143-146,214-220`; no `<noscript>` anywhere. **Fix:** add `maxLength` mirroring server CAPS; add a no-JS path or at minimum a `<noscript>` surfacing phone/email. *Trivial + medium.*

**Cleanup:** the consent checkbox's native `required` is dead under `preventDefault` (real gate is the disabled button); disabled step-2 submit gives no inline reason when consent is unticked.

---

## Infrastructure (build / deploy / hosting)

Functional but full of launch foot-guns.

1. **Coming-soon gate target (coming-soon.html) and preview.php are not shipped by any deploy script** [high] — `deploy.py` TARGETS = api/dist/htaccess/cron only; `.htaccess:83` rewrites every page to `/coming-soon.html`, which 404s on a fresh server. **Fix:** add a `gate` target (or move `coming-soon.html` into `public/`); ship `preview.php` separately. *Small.*
2. **Six gallery images hot-link from Unsplash** [high] — (see perf #3 / compliance #3); also `index.html:33` preconnect + CSP `img-src` allow it. **Fix:** self-host, then remove the preconnect + CSP token. *Medium.*
3. **Font-trial artifacts (~440KB) built into dist/ and publicly fetchable** [high] — `.htaccess:82` exempts woff2/html from the gate. **Fix:** delete + add a `check.mjs` guard failing the build if any reach `dist`. *Trivial.*
4. **FTP-only deploy transmits the Resend key + FTP creds in cleartext** [medium] — `deploy.py:27` plain `FTP()` on port 21; `api` target uploads the live key over it. **Fix:** `FTP_TLS` + `prot_p()` (or SFTP); rotate key + password. *Small.*
5. **deploy.py dist sync never deletes stale remote files** [medium] — `deploy.py:87-100` STORs each file with no prune; hashed assets + removed pages stay live/crawlable. **Fix:** mirror with `DELE` of anything outside the intended set. *Medium.*
6. **During coming-soon, robots.txt (Allow: /) and the full sitemap are served via the xml|txt bypass** [medium] — `.htaccess:82`. Pre-announces the whole unlaunched structure. **Fix:** holding `robots.txt` (`Disallow: /`); gate/omit sitemap; toggle at go-live. *Small.*
7. `scripts/fetch-fonts.mjs` is stale — emits weight-suffixed filenames that don't match the live variable fonts [medium] — `fetch-fonts.mjs:23-28`. **Fix:** delete or rewrite; mark one-shot. *Small.*
8. `deploy:all` silently omits the API [medium] — `package.json:15`; `send-enquiry.php:34-39` hard-fails without `_config.php`, so forms send nothing. **Fix:** rename/include `deploy:api`; add a launch curl guard. *Small.*
9. `render_config` builds PHP via unescaped `%s` interpolation of the Resend key [low] — `deploy.py:59-67`. **Fix:** validate `^re_[A-Za-z0-9]+$` before rendering. *Trivial.*
10. FTP uploads have no integrity/verify step, no atomic swap [low] — `deploy.py:44,50`. **Fix:** SIZE-compare + retry, or temp-then-rename; upload entry HTML last. *Medium.*
11. `check.mjs` validates dist content but not gate/launch files, robots state, or API config [low] — extend it to fail on `font-trial.html`/`trial-*` and assert robots phase. *Small.*
12. `LAUNCH_CHECKLIST.md` is stale — still describes a Netlify deploy [low] — rewrite to the Hostinger/PHP/FTP reality or fold into RUNBOOK.md. *Small.*
13. No engine/version guard at build or deploy [low] — `engines.node` set but unenforced; `vite-react-ssg` hard-pinned on Vite 7. **Fix:** `prebuild` node check, `engine-strict=true`, pin Vite, minimal CI. *Small.*
14. `sitemap.mjs` stamps the build date as lastmod on every URL each build [low] — derive per-route from git/content date. *Small.*
15. `AGENTS.md` and `CLAUDE.md` are byte-identical duplicates (confirmed) [low] — make one a pointer or add a `check.mjs` identity assertion. *Trivial.*
16. FTP host/username hard-coded in gitignored `deploy-local.sh` — a clean clone cannot deploy [low] — commit a `.sample.sh`. *Small.*
17. Forms can't be exercised in local dev (no Vite `/api` proxy, no mock) [nit] — `submitEnquiry.js:36` posts to relative `/api/...`. **Fix:** dev-only mock returning `{ok:true}`. *Small.*
18. Build emits a duplicated `crossorigin` attribute on the stylesheet link across all pages [nit] — harmless but invalid markup; dedupe in the SSG transform. *Small.*

---

## Links

Broadly sound (no dead links), but a few href/canonical mismatches and a mislabelled link dilute signals.

1. **Footer "Fees & first visit" link points to the registration form, not a fees page** [low] — `Footer.jsx:52`; no fees page exists. **Fix:** build a real fees page/`#fees` anchor and retarget, or rename the link. *Small.*
2. Internal treatment/blog links omit the trailing slash canonical+sitemap enforce [low] — `TreatmentPage.jsx:278`, `ArticleLayout.jsx:77,112,123`, `Footer.jsx`, `Blog.jsx:44`; hard loads 301 to the slash form. **Fix:** standardise to trailing-slash targets. *Small.* (Same root cause as SEO #14.)
3. Treatments breadcrumb (link + JSON-LD) resolves to a homepage fragment [low] — `TreatmentPage.jsx:122`. **Fix:** point at a real index or the bare homepage URL; make the crumb a `<Link>`. *Small.*
4. Duplicate "Emergency Care" link in two footer columns [low] — `Footer.jsx:38,50`. **Fix:** drop one. *Trivial.*
5. No in-body contextual links from blog articles to their service pages [low] — `blog.js` sections are plain strings; only the bottom "Related" chips link out. **Fix:** support link tokens in the paragraph model; add inline links. *Small.*
6. External regulator references are bare domains, not clickable, no https [nit] — `Complaints.jsx:24,26`. **Fix:** real `https://` anchors. *Trivial.*

---

## Security

The form/email path is the only attack surface; server-side defences are real but brittle. No user-data exposure today; all items are pre-launch-hardenable.

1. **Preview-gate bypass cookie value committed in git-tracked `.htaccess`** [medium] — `.htaccess:79` hard-codes `dnd_preview=13ae86f0...` (confirmed). Anyone with repo/history access defeats the gate. **Fix:** rotate now; inject at deploy time from env (like `_config.php`). *Small.*
2. **No `api/.htaccess` — Resend secret has only one protection layer** [medium] — `api/` has no `.htaccess`; the live key in `_config.php` is denied solely by the root `FilesMatch`. **Fix:** dedicated `api/.htaccess` denying `_config.php`; better, move the secret above web root. *Small.*
3. **Rate-limit bucket dir (`/rl`) is never purged — unbounded disk/inode growth** [medium] — `send-enquiry.php:157-159` writes one file per IP-bucket; `purge-enquiries.php:57` only iterates the three NDJSON/log files (confirmed — `rl/` absent). Slow resource-exhaustion DoS on shared hosting. **Fix:** extend the daily cron to GC `rl/*.json` older than the window. *Small.*
4. **Rate limiter fails open when private storage is unavailable** [medium] — `send-enquiry.php:155-173`; nested `if` with silent fallthrough, so a disk-full/inode-exhausted state (exactly what #3 produces under attack) disables the only server-side abuse control. **Fix:** fail closed (503) or fall back to APCu; `error_log` the skip. *Small.*
5. **Origin allowlist trusts localhost in production and falls back to spoofable Referer** [medium] — `send-enquiry.php:77,148`. A scripted client sends `Origin: http://localhost` to pass the guard. **Fix:** gate localhost behind a deploy flag (default OFF in prod); prefer `Origin`, fall back to `Referer` only when absent. *Small.*
6. **Enquiry API is reachable during coming-soon** [low] — `.htaccess:80` excludes `/api/`; combined with #5, a bot can drive Resend sends to reception pre-launch. **Fix:** gate `/api/` behind the preview cookie unless the form is exercised in preview; disable localhost origin. *Small.*
7. **JSON-LD injected into `<script>` via `JSON.stringify` without `</script>` escaping** [low] — `Home.jsx:117-118`, `ArticleLayout.jsx:68-70`, `HomeFaq.jsx:41`. Static today, but `faqLd`/`HomeFaq` come from editable arrays arriving at go-live; with CSP `script-src 'unsafe-inline'`, a breakout would execute. **Fix:** one shared serializer escaping `<`/`>`/`&`. *Trivial.*
8. Anti-bot controls (honeypot + time-trap) are entirely client-advisory [low] — `submitEnquiry.js:19`, `send-enquiry.php:183-188`; `turnstileToken` never verified. Acceptable for launch; document. If spam appears, server-verify Turnstile or use a signed nonce. *Medium.*
9. Live Resend domain UUID committed in `monitor.php` [nit] — `cron/monitor.php:22`; an account-scoped identifier, not a credential. Optional: move to `_config.php`. *Trivial.*

---

## Coverage & honest gaps

This was an **offline source review** of `/Users/admin/day-and-night-dental-recovered`. I verified the highest-severity findings directly against the source (the £95 price, the `, , ,` mojibake on both files, the placeholder names in `Team.jsx`, the em-dash, the broken CSS `onload` swap in dist, the `#ef4444` emergency button, `pruneSource: false`, the trial fonts in public/dist, the committed preview cookie, the un-GC'd `rl/` dir, the unconditional conversion fire, and the missing `scroll-padding-top`) — all confirmed. The following were **not** verified and need the owner or a human:

- **Real content is the biggest dependency.** Clinician names, roles, and **GDC registration numbers**; confirmed **opening hours** (multiple findings are gated on one authoritative `PRACTICE.openingHours`); consented **practice photography** (galleries + team portraits); the **Complaints Manager** name; whether the **24-hour line is genuinely answered** (vs triage/callback); true **same-day capacity**; the **whitening system** name + held evidence; whether **All-on-4** is the protocol used; **finance/FCA** specifics; legal **entity + ICO registration number**. None of this can be confirmed from source.
- **Live-site / runtime checks not performed.** No Lighthouse/axe run, no real-device a11y testing, no actual contrast measurement beyond the cited ratios, no live HTTP behaviour of the gate (whether it returns non-200/noindex to crawlers), no FTP/deploy dry-run, no confirmation the PHP endpoint behaves as read. The render-blocking-CSS impact is inferred from the markup, not measured — confirm with Lighthouse before/after the `fix-head.mjs` change.
- **Legal sign-off.** The GDC/ASA/GDPR items are an engineer's read of the rules, not legal advice. Privacy policy, accessibility statement, terms liability carve-out, and consent/withdrawal mechanics should get a UK-qualified review before go-live, especially the YMYL medical claims and the cookie/tracker disclosures (which become live the instant GA4/Meta IDs are populated).
- **Third-party/SEO outcomes are not guaranteed.** Whether Google honours the structured-data fixes, FAQPage eligibility (gone for non-gov/health domains since 2023), and whether the trailing-slash 301s materially split equity are dependent on crawler behaviour I cannot observe offline.
- **Word counts and read-times** cited from the section authors were not independently recounted; treat the specific numbers as indicative.

No silent caps: every category section above is reproduced in full. The fastest path to launch is the Top 10, in order, plus the owner-content handoff that unblocks items 1, 4, 7, and 10.
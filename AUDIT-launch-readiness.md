# Day Night Dental - Launch Readiness Audit

The site ships fabricated and unverified claims as fact, and one primary CTA 404s. Severity counts after dedupe: **5 P0**, **13 P1**, **15 P2**, **~30 P3**. **Verdict: NO-GO.** Do not launch until every P0 and the regulated-claim P1s are resolved. The single most urgent item is the homepage "Real smiles, real results" gallery: it presents stock model headshots as the practice's own patient outcomes on a pre-launch GDC-regulated practice, which is a clear ASA/CAP and GDC advertising breach and is on production now. Note: the audit found the live site currently returns HTTP 403 behind a password gate, so nothing is publicly indexable yet, but the misleading content is built and ready to ship.

## P0 - Launch blockers

**Stock/model headshots presented as the practice's own "real results" patient gallery**
Homepage. `src/sections/SmileGallerySpotlight.jsx` + 6 assets in `public/smiles/` (verified present). Eyebrow "The Results", H2 "Real smiles, real results", alt text "Composite bonding, Day Night Dental, Glasgow". The practice is pre-launch with zero patients (its own Testimonials section says reviews will appear "as they come in"), so none of these can be genuine outcomes. This is fabricated visual results evidence: an ASA/CAP rule 3.1/3.7/12 and GDC advertising breach, the same class of risk as the banned fake reviews. **Fix:** remove the gallery, or strip all results framing (drop "The Results"/"real results"/"the portfolio"/"*-patient" naming and provenance alt text) and add a visible "illustrative images, not actual patients" disclosure. Rebuild and redeploy.

**Primary homepage CTA "Book a consultation" links to /contact/, which 404s**
Homepage. `src/sections/ConcernsBento.jsx:172` (verified `to="/contact/"`). No `contact` route exists in `routes.jsx` (verified), no `dist/contact/` is built. The main conversion button on the top page leads to the 404 page. The homepage's own contact section is `id="contact"` and the 404 page itself uses `/#contact`. **Fix:** change `to="/contact/"` to `to="/#contact"`. Also add a dead-internal-link check to `scripts/check.mjs` so a missing route fails the build.

**Unconfirmed/invented opening hours published as fact in JSON-LD and visible copy site-wide**
Affects ~32 routes via the single shared Dentist node. `src/lib/schemas.js:60-62` (verified: Mon-Fri 07:00-23:00, Sat 08:00-22:00, Sun 09:00-21:00), `src/sections/HomeFaq.jsx`, `src/sections/Contact.jsx:107,162-164`. The hours (especially Sat/Sun) are owner-unconfirmed placeholders per the HomeFaq source comment, yet ship as machine-readable fact Google ingests into the knowledge panel and "open now" results. Wrong hours send a patient in pain to a closed door. Compounding: there is also an internal contradiction (Contact.jsx hint "Mon to Sun, 7am to 11pm" vs the table below it; and the finite hours vs the 24/7 emergency `contactPoint` at schemas.js:70). `scripts/check.mjs` has no hours assertion, so the launch guard cannot catch this. **Fix:** introduce a single hours field in `src/data/practice.js` (it currently has none) and drive schemas.js + HomeFaq + Contact from it. Until owner-confirmed, remove `openingHoursSpecification` and the specific times entirely (safer than publishing invented ones); keep only the genuinely-staffed 24/7 emergency line if it is real. Add a check.mjs assertion that fails launch unless hours are confirmed.

**Always-on "Open now - 24 hours" live badge that cannot be true**
Homepage. `src/sections/AreasServed.jsx:110` (verified static string with a pulsing "live" dot). The site is statically prerendered with no runtime clock, so this asserts the practice is open right now at every moment, including overnight when its own schema says it is closed. Misleading-availability under ASA/CAP, and literally false for part of each day. **Fix:** remove the permanent "Open now" assertion, or replace with a defensible static statement (e.g. "24-hour emergency line" only if genuinely staffed), or compute it client-side in `useEffect` from owner-confirmed hours.

**Invalid schema.org @type on the #procedure node across 13 treatment pages**
`src/components/TreatmentPage.jsx:71` reads `data.procedureType`. Verified: 10 pages set `"Dentistry"`, 2 set `"CosmeticProcedure"` (cosmetic-dentistry, teeth-whitening), 1 sets `"Orthodontics"` (invisalign). None are instantiable schema.org procedure types (Dentistry is a MedicalSpecialty enum value; CosmeticProcedure and Orthodontics do not exist as types). Google discards the entire node (name, description, provider, areaServed, lastReviewed), silently killing structured-data signal on the most commercially important pages. The layout's own fallback `MedicalProcedure` is correct. This is rated P0 because for an SEO-first launch it is a template-level fix that nullifies the procedure entity on the majority of conversion pages, and is one of the cheapest high-value fixes available. **Fix:** set `procedureType: 'MedicalProcedure'` (or delete the line to use the default) on all 13 pages; express the cosmetic/ortho specialty via name/medicalSpecialty, never @type. Rebuild and re-validate in Google Rich Results Test.

## P1 - Fix before launch

**Three dentist names + GDC numbers published as fact; source comment is stale**
`src/sections/Team.jsx:8-10` (Dr Willie Chang GDC 296929; Dr Pei Hsin Chiang 333443; Dr Chia-Hsuan Lee 310152), emitted as visible text and Person schema. The Team.jsx:2-6 comment still claims the principal is a bracketed placeholder auto-filtered from schema and blocked by check.mjs, but all three are now fully populated, so that safety net no longer applies. Publishing an incorrect GDC number or a non-practising dentist is a serious GDC Standard 9 / ASA exposure. **Fix:** manually verify each name + GDC number on the live GDC register (olr.gdc-uk.org), confirm each consents and practises at this address, display names exactly as registered, and update the stale comment. Consider extending check.mjs softBanned to flag any GDC value not on an allowlist.

**"NHS care is available... children under 18 examined free" + "First visit from £95" stated as fact**
Homepage register block and `/register-as-patient`. `src/sections/Register.jsx:180-184,290`. Nothing else on the site indicates an NHS contract; the rest reads private-only. If private-only, "NHS care is available" is materially misleading (CAP 3.1). The under-18 free-exam framing is also wrong for NHS Scotland (registered NHS exams are free for all ages). The £95 and free-exam claims are unverifiable from code. **Fix:** get explicit owner sign-off on the £95 price, NHS availability and free under-18 exam. If private-only, remove the NHS option and NHS copy; if NHS, correct the entitlement wording.

**Privacy policy asserts "registered with the ICO" with no registration number or named legal entity**
`/privacy/`. `src/pages/legal/Privacy.jsx:13`. The controller is named only "Day Night Dental, Merchant City, Glasgow" with no legal entity, company number, registered office, or ICO reference. UK GDPR Art 13/14 expects an identifiable controller and the ICO reference; a dental practice processing special-category health data must be ICO-registered. Stating it as fact pre-launch when other core facts are placeholders is an accuracy risk. **Fix:** confirm the ICO data-protection-fee registration is live; add the registration number and full legal entity (company number + registered office if incorporated), sourced from practice.js. If not yet registered, register first and soften the wording until the reference exists.

**Complaints page omits Healthcare Improvement Scotland and advertises an NHS route on a seemingly private practice**
`/complaints/`. `src/pages/legal/Complaints.jsx:24-26`. HIS is the statutory regulator/inspector of private dental clinics in Scotland and is absent entirely (verified zero matches in src). The page also splits escalation into private (DCS) and NHS (NHS Board) routes while the rest of the site reads private-only. **Fix:** add HIS as the independent escalation route for private care, and resolve the NHS-vs-private status with the owner so the complaints routes match the practice's actual model.

**"Interest-free finance, subject to status" promoted on 5 treatment pages with no FCA disclosure**
`src/pages/treatments/{DentalImplants,Invisalign,PorcelainVeneers,CompositeBonding,TeethWhitening}.jsx`. "Interest-free finance, subject to status" is a specific consumer-credit financial promotion. Introducing patients to a credit provider is credit broking, generally requiring FCA authorisation or appointed-representative status, with named lender/broker and (where rates are implied) a representative example. No provider, status, or APR disclosure exists anywhere (verified no "FCA"/"authorised"/"representative" in src). **Fix:** confirm the practice's FCA status. If not in place, remove the finance claims; if in place, add the named provider, broker-permission status and required disclosures.

**Same finance promotions appear in 2 blog posts with no qualifier at all**
`src/data/blog.js` (dental-implants-cost-glasgow, veneers-glasgow-cost-types). Same FCA financial-promotion exposure as above, and these drop even the "subject to status" qualifier the treatment pages carry, so the site is internally inconsistent. **Fix:** align with the treatment-page wording or remove finance promotion from article copy, pending the same FCA confirmation.

**Hero "Glasgow's 24/7 Emergency Dentist" / "A 24-hour dentist" imply an always-open clinic**
`src/sections/Hero.jsx:14`, `src/sections/AreasServed.jsx:42`. These imply the clinic itself is open 24h, contradicting the stated overnight-closed hours; "Glasgow's ... Dentist" is also an unsubstantiated possessive/superlative. The schema honestly models the 24/7 line as a separate `contactPoint`, so the problem is the visible copy. The Team lead "experienced across emergency, restorative and cosmetic dentistry" (Team.jsx:53-54) is also a blanket experience claim that may not hold for a recently registered dentist. **Fix:** confirm the emergency line is genuinely staffed 24/7 (not voicemail); reword Hero/Areas to "24-hour emergency line" not "24-hour clinic", drop/substantiate the possessive, and soften the Team claim to a services statement.

**"Mouth-cancer screening as standard" overstates a routine opportunistic check**
`/treatments/dental-check-ups/`. `src/pages/treatments/DentalCheckUps.jsx:24,26,28`. There is no national mouth-cancer screening programme in the UK; a routine exam includes an opportunistic soft-tissue check, not a "screening". Calling it "screening as standard" overstates sensitivity and creates false reassurance, a GDC/ASA accuracy risk. The page is also internally inconsistent (some entries already say "mouth-cancer check"). **Fix:** standardise on "mouth-cancer check" / "soft-tissue examination for early warning signs"; drop "screening" and "as standard".

**Unsubstantiated comparative claim "far more comfortable than fixed braces"**
`/treatments/invisalign/`. `src/pages/treatments/Invisalign.jsx:95`. An unqualified comparative clinical claim about a medical device, duplicated into FAQPage JSON-LD so it can surface in rich results. **Fix:** soften to "Most people find the smooth, custom-fitted aligners more comfortable than fixed braces." Editing the FAQ data updates copy and schema together.

**Present-tense patient-volume claims on a practice with no patients**
`/treatments/nervous-patients/` (overview, concern, FAQ) and the homepage Testimonials promise ("We treat a lot of anxious patients"). "We see nervous and anxious patients every week" and "we can show you a 3D simulation" (blog.js:209, claims an existing patient base + in-practice capability) are objective claims that cannot be substantiated pre-launch. **Fix:** reword to capability/intent ("We care for nervous patients with a calm, unhurried approach"); drop "every week"/"a lot of"/"patients come from across Glasgow" framing. Confirm the 3D simulation capability is genuinely available at launch or soften it.

**Night-emergency article omits the A&E / 999 red-flag escalation**
`/blog/emergency-dentist-glasgow-at-night/`. `src/data/blog.js` (no "999"/"A&E" in the sections, verified absent in dist). This page is read mid-emergency yet never tells the reader when a dental problem is a medical emergency (spreading facial swelling, breathing/swallowing difficulty, high temperature with swelling) needing 999/A&E. The sibling guide carries this repeatedly. Duty-of-care gap for a GDC practice. **Fix:** add a red-flag paragraph mirroring the sibling post, placed before the "what to do while you wait" advice.

**6 routes render visible breadcrumbs with no BreadcrumbList JSON-LD**
`/register-as-patient/`, `/our-team/`, and all 4 legal pages via `src/components/LegalPage.jsx`. The 4 legal pages emit zero JSON-LD; register-as-patient is the highest-intent conversion route and ships zero structured data; 35 other pages do carry BreadcrumbList. They forfeit breadcrumb rich results and are inconsistent. The helper already exists (`src/lib/jsonLd.js`, pattern in `Blog.jsx`). **Fix:** add a BreadcrumbList block to LegalPage.jsx (fixes all 4 at once), RegisterAsPatient.jsx, and OurTeam.jsx. While at OurTeam, also emit the shared `dentistLd` node so the Person `worksFor` `#dentist` @id resolves locally (it currently dangles).

**ConcernsBento custom radiogroup is not keyboard-operable**
Homepage. `src/sections/ConcernsBento.jsx:122-139`. A `role="radiogroup"` of `role="radio"` buttons with no `onKeyDown` and no roving tabindex: every radio is a separate Tab stop and arrow keys do nothing, breaking the ARIA radio pattern on a prominent conversion widget (WCAG 2.1.1/4.1.2). The correct pattern already exists in `HomeFaq.jsx`. Note: the Contact/Register radiogroups are native `<input type=radio>` and are fine, do not touch them. **Fix:** add roving tabindex + an arrow-key onKeyDown handler mirroring HomeFaq.jsx.

## P2 - Soon after launch

**Form fields fail WCAG non-text contrast (1.29-1.40:1, need 3:1) on the registration form**
`/register-as-patient`, the primary conversion page. Token `--dn-mist` (#2a2a35) borders on #0a0a0c / #14141a backgrounds, computed below the 3:1 SC 1.4.11 minimum, affecting every input, the 3 DOB dropdowns, 4 radio cards and the consent box. Low-vision users cannot perceive field boundaries at rest. **Fix:** raise the resting border to a token clearing ~3:1 against both backgrounds (about #5a5a68). Single shared change.

**Privacy notice does not self-identify the controller (no postal address, no DP contact)**
`/privacy/`. `src/pages/legal/Privacy.jsx:11,13,31`. Body gives only "Merchant City, Glasgow" and the generic reception inbox; never states the full registered address (80 Hutcheson St, G1 1SH, already in practice.js) or a named data-protection contact. **Fix:** add the full postal address (from PRACTICE) and a named DP contact route; confirm whether a DPO is required.

**Treatment <-> blog internal linking is one-directional**
Affects all 21 treatment pages. Blog posts link down to treatments, but no treatment page links to any in-depth blog guide (verified zero `/blog/` body links on dental-implants and invisalign). This breaks the pillar/cluster topical-authority loop, and leaves `dental-implants-cost-glasgow` near-orphaned (only inbound link is the blog index). **Fix:** add a "Related guides" block to `TreatmentPage.jsx` driven by a new `data.relatedArticles` field; populate high-intent pairs. Add reciprocal `relatedPosts` so the cost post gets >=2 contextual inbound links.

**Thin commercial blog posts under-serve high-intent local queries**
`dental-implants-cost-glasgow` (~246 words, no price figures, no FAQ block, mislabelled "5 min read"), `invisalign-vs-braces` (~224 words, no FAQ, never compares cost/duration/comfort), `emergency-dentist-glasgow-at-night` (~339 words). `src/data/blog.js`. These cannot rank against established competitors or satisfy intent. **Fix:** expand each to ~600-900 words with the decision factors searchers want; add `faqs` arrays (emits FAQPage schema); add honest indicative "from" price bands with a "confirmed in writing after consultation" caveat (coordinate with the FCA finance fix). Compute readTime from word count in ArticleLayout so it cannot drift.

**Team page is thin (~116 words): no bios, qualifications or photos**
`/our-team/`. `src/sections/Team.jsx`. For a GDC practice this is a primary E-E-A-T surface, yet it has only names, GDC numbers, and monogram discs. **Fix:** add a short bio per clinician (qualifications, GDC registration year, special interests, languages) and real headshots with descriptive alt; mirror into Person schema.

**Every treatment-page conversion CTA deep-links to the homepage form (/#contact) with no treatment context**
All 21 treatment pages. `src/components/TreatmentPage.jsx:165,169,481,485`; mobile callbar `MobileCallBar.jsx:14`. High-intent readers are bounced to the homepage and must re-scroll to the form, which has an empty hidden `treatment` field, so leads are not attributable. Not broken, but friction plus lost lead intelligence. **Fix:** pass the treatment slug via the anchor/query param (`/#contact?treatment=<slug>`) and pre-fill the hidden field; verify the hash-scroll lands reliably after cross-page nav.

**Header "Emergency Booking" CTA routes to the routine callback form, not an immediate call**
Site-wide. `src/components/Header.jsx:67`; destination `Contact.jsx` ("We reply within 1 working hour"). For an acute emergency the correct action is to phone the 24/7 line; the loud emergency-styled button leads to a callback form, undercutting the 24/7 promise. A separate header tel: link exists. **Fix:** make "Emergency Booking" a tel: link to the 24/7 line, or relabel it "Book appointment" and add a distinct prominent emergency tel: action.

**Fail-safe NDJSON backup allowlist has drifted from the form fields**
`hostinger/api/send-enquiry.php:325-328`. The backup (which exists so an enquiry is never lost if email fails) omits the contact form's `preference` and the register form's `careType`, `dentistPreference`, `referral`, and includes three never-sent keys (`preferredTime`/`preferredDay`/`preferredContact`). The emergency flag and NHS-vs-private choice are silently dropped from the only retained record in the exact failure scenario the backup is for. CLAUDE.md explicitly requires keeping PHP fields in sync with the form. **Fix:** add the four real fields, remove the three dead keys, and add a test diffing form-state keys against the allowlist.

**24/7 emergency claim contradicts the page's own clinic hours in schema**
All treatment pages, `src/components/TreatmentPage.jsx`. The same node carries a `contactPoint` `hoursAvailable` 00:00-23:59 every day alongside `openingHoursSpecification` that closes at 23:00/22:00/21:00, and copy never clarifies that 24/7 means an after-hours line. **Fix:** resolve together with the hours blocker: decide the real model and make contactPoint, openingHoursSpecification and visible branding agree; if 24/7 is a phone line only, qualify it in copy.

**Cookie banner claims role="dialog" but has no focus management, aria-modal, or Escape**
Site-wide. `src/components/CookieConsent.jsx:40`. Announced as a dialog while behaving as inline content; reopening from the footer leaves focus on the trigger. Unfulfilled ARIA contract (WCAG 4.1.2). **Fix:** change `role="dialog"` to `role="region"` (keep aria-label) to match the non-modal behaviour.

**Homepage Treatments tablist breaks the ARIA tabs pattern and nests a link inside a tab button**
Homepage. `src/sections/Treatments.jsx:245-291`. No roving tabindex, no arrow-key handler, `onFocus` mutates the active panel just by Tabbing, and a focusable `<a>` "Call now" is nested inside a `role="tab"` `<button>` (invalid ARIA and invalid HTML). **Fix:** implement the full tabs pattern or drop the tab roles for disclosure buttons; move the tel link out of the tab element regardless.

**Comparison-table scroll container is not keyboard-focusable or announced**
5 treatment pages. `src/components/TreatmentPage.jsx:300`. The `overflow-x:auto` wrapper around a min-width:640px table has no tabindex/role/aria-label, so keyboard-only users cannot scroll to off-screen columns (WCAG 2.1.1). **Fix:** add `tabindex="0"`, `role="region"` and a data-driven aria-label to the wrapper. Shared fix covers all 5.

**SPA success page gives screen-reader users no confirmation feedback**
`/registered/` and `/thank-you/`. `src/components/FormSuccess.jsx`, `src/pages/Registered.jsx`. On the client-side route change after submit, focus is not moved and nothing is announced (no aria-live, no focus). A keyboard/SR user gets no signal that registration succeeded (WCAG 4.1.3). **Fix:** move focus to the `<h1>` on mount (ref + tabIndex=-1 + .focus() in useEffect) or wrap the heading/lead in `role="status"`. Fixes both pages.

**Accessibility help-section phone and email are plain text, not tappable links**
`/accessibility/`. `src/pages/legal/Accessibility.jsx:15` via `LegalPage.jsx:38`. This section exists so a user who cannot use the site can reach a human, yet the number and email are inert text while every other instance on the site is a proper link. The complaints page has the same problem (DCS, GDC, practice contacts all plain text). **Fix:** add a rich-content escape hatch to LegalPage (or supply these sections as JSX) and render real tel:/mailto:/https links sourced from practice.js.

**CSP allows 'unsafe-inline' for script-src on a PII-collecting site**
Site-wide. `hostinger/.htaccess:23`. Any injected inline `<script>` executes freely, so the CSP gives little real XSS protection on the page that collects patient PII. **Fix:** replace script-src 'unsafe-inline' with per-build hashes or a server-injected nonce (applied to GTM and any inline bootstrap). style-src 'unsafe-inline' may stay for now.

**Cron scripts keep a world-readable temp-dir PII fallback the endpoint deliberately removed**
`hostinger/cron/purge-enquiries.php:22`, `hostinger/cron/monitor.php:29`. `send-enquiry.php` deliberately omits `sys_get_temp_dir()` because shared-hosting temp dirs are commonly world-readable and the store holds enquiry PII, but both cron scripts still list it, risking reading/purging PII from a world-readable path or diverging from the endpoint so the 90-day GDPR purge misses the real file. **Fix:** remove the `sys_get_temp_dir()` candidate from `private_dir()` in both cron scripts; exit loudly if the canonical above-webroot path is unresolved.

**3.1MB of design-prototype HTML/JS (preview/) is built into dist and deployed every time**
`public/preview/**` -> `dist/preview/**`. noindex,nofollow but not disallowed in robots.txt or stripped by `deploy-local.sh`, so it is publicly fetchable dead weight roughly tripling the static upload. **Fix:** strip preview/ from the production build/deploy, or at minimum add a Disallow + .htaccess block before go-live.

**Blog hub page has no Blog/CollectionPage/ItemList schema**
`/blog/`. `src/pages/Blog.jsx`. Only a BreadcrumbList is emitted; nothing describes the page as a blog or itemises the 6 posts, despite each post emitting full BlogPosting. **Fix:** add a `Blog`/`CollectionPage` JSON-LD with a `blogPost` array mapping over posts.

**Implant healing time stated three different ways on one page**
`/treatments/dental-implants/`. `src/pages/treatments/DentalImplants.jsx:23,74,112`: "3 to 6 months" (facts), "three to six months" (FAQ), "roughly three to four months" (aftercare). Internally contradictory clinical timeframe on YMYL content. **Fix:** standardise on "three to six months"; edit the aftercare phase-2 item.

**Blog posts (YMYL health) have no named GDC-registered author or reviewer**
All blog posts. `src/components/ArticleLayout.jsx:22` (author = Organization). Several posts make medical/regulatory claims; Google's YMYL guidance rewards demonstrable named authorship. **Fix:** attribute posts to a named GDC-registered dentist (author @type Person, sameAs to GDC/team profile) with a visible byline. Blocked on a real clinician being confirmed; do not invent one. Same gap applies to all 21 treatment pages whose `lastReviewed` byline names no reviewer (the template supports `data.reviewer`, simply unpopulated): either populate it or drop the bare "Last updated" line until genuine review exists.

**Accessibility statement is too vague and targets the wrong WCAG version**
`/accessibility/`. `src/pages/legal/Accessibility.jsx:11`. Claims WCAG 2.1 AA, but the codebase already implements 2.2 criteria (Target Size 2.5.8 is referenced throughout the CSS). It also omits testing basis, a real dated review, a response-time commitment, and an external escalation route (EHRC/EASS). **Fix:** change to WCAG 2.2 AA; add testing method + date, a response-time commitment, the Equality Act reasonable-adjustments framing, and EHRC/EASS as the escalation route.

**Terms name no legal entity and lack a consumer-rights/negligence carve-out**
`/terms/`. `src/pages/legal/Terms.jsx`. No trading/legal entity is identified (inconsistent with Privacy, which describes a controller), and the blanket liability exclusion has no carve-out for death/personal injury caused by negligence or for fraud, which UK consumer law can deem unfair. **Fix:** add a "Who we are" clause naming the entity (sourced from practice.js) and add "Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded under applicable law."

**Bleeding-control FAQ is ungrammatical ("without keep checking it")**
`/treatments/emergency-dentist/`. `src/pages/treatments/EmergencyDentist.jsx:47`. Mirrored into FAQPage JSON-LD, so it can surface in rich results. **Fix:** reword to "without checking it" (or "without removing it to check").

**Dental check-ups page has no fee/cost or "how to become a patient" signal in the body**
`/treatments/dental-check-ups/`. The most price-sensitive, comparison-shopped treatment offers no cost guidance or surfaced "fees & first visit" pointer near the CTA. **Fix:** add a brief fees/first-visit line or fact-row linking to /register-as-patient/ without stating an unconfirmed price.

## P3 - Polish

**"Reviews" nav/footer/mobile label points to a section with no reviews.** Header.jsx:41, Footer.jsx:47, MobileMenu.jsx:152. The destination is honest ("reviews will appear as they come in") but the label over-promises. Rename to "Our Promise"/"Why us" in all three until real reviews exist. The section's testimonial-style presentation (quote marks, blockquotes, `dn-review` cards in Testimonials.jsx) also mimics patient quotes; drop the blockquote/quote-mark treatment and rename `review-*` hooks to `promise-*`.

**Breadcrumb a11y, site-wide (4 shared templates).** TreatmentPage/ArticleLayout/LegalPage/Blog: add `aria-current="page"` to the current crumb and `aria-hidden="true"` to the `/` separator spans (currently announced as "slash" noise). Pattern already used in mobile sublinks.

**Decorative "->"/"→" arrows not aria-hidden in CTAs/related links/cards.** TreatmentPage.jsx (4 `.arrow` + 15 "View treatment" spans), Contact/Journey/Hero/Register/SmileGallery/CtaBand/FormSuccess, ArticleLayout related links. About.jsx:113 already does it correctly. Add `aria-hidden="true"` (or CSS ::after) consistently.

**Tap targets below 44px on breadcrumb links, hero "Or call" ghost links, FAQ summary, related-article links.** treatment-pages.css. The AA 24px minimum is met but inconsistent with the footer's 44px standard; the in-hero "Or call" tel link is a high-intent action that should be comfortably tappable. Add min-height/vertical padding. On `/areas-served/` the hero ghost call link specifically misses the 44px `.dn-areas` pill rule because the hero is inside `.tp-hero` not `.dn-areas`; give it the pill treatment.

**Dentist names render as transparent outline text by default, solid fill is hover-only with no touch fallback.** `/our-team/` (and homepage Team). Make the solid fill the default and the outline an optional hover flourish, or add `@media (hover: none)`. The Team.jsx comment also describes a useEffect tap affordance that was never implemented; remove the misleading comment or deliver it. Each role label is also printed twice per card (Team.jsx:72 and :76); show it once.

**Curly apostrophe in the shared schema slogan** ("Pain doesn't wait") at `schemas.js:25`, plus stray curly apostrophes across DentalImplants/TeethWhitening/CosmeticDentistry/Invisalign and Privacy.jsx:35. Violates the plain-punctuation rule; normalise to straight ASCII site-wide and add U+2019/U+2026 to the no-em-dash lint guard.

**H1/lead near-duplicate on white-fillings, root-canal, inlays-onlays.** WhiteFillings.jsx:17-18, RootCanalTreatment.jsx:17-18, InlaysOnlays.jsx:12-13. The lead repeats the H1 with "in Glasgow" inserted. Rewrite the leads to add benefit/reassurance, keeping a natural locality mention.

**Emergency CTA uses red #dc2626 + a linear-gradient, off the solid gold/blue no-gradients brand rule.** `.dn-btn-emergency`, `.dn-callbar-btn.call`, site-wide. Red as an emergency affordance is defensible but should be an explicit owner sign-off, not a silent deviation.

**Orphaned/oversized assets.** Delete `public/fonts/plus-jakarta-sans.woff2` (27KB, no @font-face, never used; fix the stale tokens.css:39 comment to Fraunces/Inter Tight), `public/icons/concerns/*.png` + `public/icons.svg` (icons migrated to inline SVG), and the 20KB base64-PNG-in-SVG `favicon.svg` (use a real vector or the existing PNGs). Confirm the coming-soon gate does not use them first.

**Img width/height attributes do not match intrinsic files** (logo-mark.webp declares 160x139 for a 256x256 square; smile images declare 900x1100 for 800x1200). No visible shift thanks to CSS aspect-ratio/object-fit, but the metadata is wrong and 900 exceeds the 800px source. Correct the attributes and provide source files at least as wide as the largest @2x render.

**Continuous blur(120px) glow layers have no mobile gating.** layout.css:71-86. Sustained GPU cost on low-end Android; can hurt INP/battery. Profile on a throttled device; if costly, lower the blur radius or pause the loop below ~768px. Brand-signature, so tuning only.

**noindex utility pages emit a self-referencing canonical.** Registered.jsx and ThankYou.jsx combine `noindex` with a self-canonical (conflicting hint). Drop the canonical, leave noindex,follow alone.

**Numbered "what happens next" steps render as divs, not an `<ol>`** (FormSuccess.jsx); DOB dropdown group lacks a fieldset/legend (Register.jsx:239); comparison table lacks a `<caption>` and has an empty first `<th>` (TreatmentPage.jsx:301); blog cards are one long concatenated link (Blog.jsx); "Related treatments/reading" labels are styled spans not headings (ArticleLayout.jsx). Minor WCAG 1.3.1/2.4.4 polish across shared templates.

**Static "Live now / 24/7 emergency line" banner uses role="status"** (Treatments.jsx:121,222) for content that never changes, announced as noise on load. Remove role="status". The static `.dn-success-card` is also bundled into the clickable-card hover-lift group (components.css), falsely implying clickability; remove it from that group.

**Visible dates are plain strings, not `<time>` elements,** and all four legal pages hardcode an identical "June 2026" last-updated literal. Wrap blog/legal dates in `<time dateTime>`; set real day-level dates at go-live and bump them when content changes.

**Decorative `<em>` used as a styling hook in treatment headings** conveys unintended stress emphasis to AT. Swap for `<span class="hl">`/the existing `dn-hl-gold` class, reserving `<em>` for genuine emphasis.

**Several meta descriptions off the ~150-160 band** (accessibility 74, terms 60, complaints 104, implants-cost 117, invisalign-vs-braces 120 too short; porcelain-veneers 164, treatments hub 165, veneers 169 will truncate) and the blog hub og:title drops "Glasgow" with a 43-char og:description. Right-size each with a natural locality reference; trim the porcelain-veneers "7 days a week" tail alongside the hours fix.

**Various schema/IA tidy-ups.** Dentist `availableService` lists only 6 of 21 treatments and emits two different `areaServed` lists for the same `#dentist` @id (home 4 vs areas-served 12); generate both from the registry/one canonical list. `availableLanguage` is "en-GB" in one place and "English" in another; standardise. The bare `#service` node duplicates `#procedure` when no price exists; only emit it when `data.priceFrom` is set. Treatment pages declare `og:type="website"` for dated editorial; use "article". Blog index crumb says "Advice" vs schema "Advice & Guides"; align. Sitemap `/blog/` entry is missing `<lastmod>`. `sameAs`/`hasMap` use a generic name+coords Maps URL with no CID; `priceRange '££'` and geo coords (asymmetric precision) are unverified; confirm all against the real Google Business Profile pre-launch. Unused `PRACTICE.region` field is a latent drift trap; delete it or comment it.

**Minor copy/consistency nits.** Conflicting nearby-station references on the homepage (Argyle Street in the FAQ vs Buchanan Street in the Areas section); inconsistent Invisalign vs Invisalign® usage; dead `ctaPrimaryLabel` on the emergency page and `id="concern"` orphan anchor on 19 pages; dental-hygiene hero says "Book a Consultation" while the page sells no-consultation-needed; repeated "General" tag on 12 treatment cards; London postcode placeholder "SW1A 1AA" on a Glasgow form; "Speak and laugh freely" benefit on the implants page is an ungrammatical fragment in the wrong voice; emergency-page `mail()` fallback uses a same-domain From likely to fail SPF/DMARC. Fix opportunistically.

## Suggested order of work

1. **Remove or relabel the "real results" smile gallery** (P0, live regulatory risk).
2. **Fix the /contact/ 404 CTA** (P0, one-line change to /#contact) and add a dead-link check to check.mjs.
3. **Resolve opening hours once** in practice.js -> schemas.js + copy, remove the "Open now" badge, reconcile the 24/7-vs-finite contradiction, and add a check.mjs hours assertion (P0, three findings collapse here).
4. **Fix the invalid procedure @type** on 13 treatment pages and re-validate in Rich Results Test (P0, template-level SEO).
5. **Resolve the regulated-claim verification pack with the owner:** GDC names/numbers, NHS-vs-private status (drives Register, Complaints, NHS copy), FCA finance status (drives treatment + blog finance copy), ICO registration + Privacy controller details, mouth-cancer "screening" wording, and the 3D-simulation/patient-volume claims (P1, mostly content + owner sign-off, not code).
6. **Add the missing red-flag emergency escalation** to the night article and soften the Invisalign comfort claim (P1, quick copy).
7. **Add BreadcrumbList JSON-LD to the 6 missing routes and fix the ConcernsBento keyboard a11y** (P1).
8. Work the P2 list, starting with form-border contrast, the PHP backup allowlist, the preview/ deploy bloat, the CSP/cron PII items, and internal-linking/content depth.
9. Batch the P3 polish (breadcrumb aria, arrow aria-hidden, apostrophes, orphan assets, schema tidy-ups, copy nits) in shared-component passes.

# Day Night Dental - Independent Verification of Codex's Audit + the Remediation Plan

Reviewed 68 finding-instances across codex's 3 audits, each re-checked against the real code by independent agents, then the plan was audited for coverage/risk.

Raw verdict counts: CONFIRMED 55 · PARTIAL 8 · REFUTED 0 · OWNER_FACT 4 · ALREADY_RESOLVED 1.

---

## Verdict summary

| Verdict | Count |
|---|---|
| CONFIRMED | 38 |
| PARTIAL | 6 |
| OWNER_FACT | 4 |
| ALREADY_RESOLVED | 1 |
| REFUTED | 0 |

Totals: 25 technical (T), 21 SEO (S), 22 code-quality (CQ) = 49 findings reviewed.

Codex's audit was **highly trustworthy on facts and over-eager on severity.** I independently reproduced every concrete code claim I spot-checked: the `/contact/` link (ConcernsBento.jsx:172, no route, no dist folder), the two stylelint errors (team.css:459/518, unprefixed `text-stroke`/`text-stroke-color` alongside valid `-webkit-` siblings), the procedureType distribution, the PHP backup allowlist drift, the hero/404 gradients, `dist/.vite/` manifests, the "never share" / ICO claims, and the invented `openingHoursSpecification`. Nothing was fabricated and there were zero outright REFUTED findings. The weaknesses are all calibration: codex over-rated several SEO items as P0/P1 that are now resolved by the verified Google Business Profile or are owner-dependent, and a handful of severities are 0.5 notch high.

## Codex findings REFUTED or corrected

No finding was fully REFUTED (none was wrong or unreproducible). The following are PARTIAL — real but over- or under-stated:

- **S-03 / CQ-04 (invalid schema @types) — the count is wrong, understated.** Codex says "eleven" invalid (10 `Dentistry` + 1 `Orthodontics`). Ground truth: `grep` returns 10 `Dentistry` + 2 `CosmeticProcedure` + 1 `Orthodontics` = **13 invalid** as a MedicalProcedure node @type (`CosmeticProcedure` is not a real schema.org type; the 7 `MedicalProcedure` and 1 `SurgicalProcedure` are valid). Correction: 13 files need fixing, not 11. CQ-04 itself notes the 13 vs 11 discrepancy; S-03 does not. Impact muted because these medical-procedure types are not a Google rich-result feature.
- **T-15 (logo waste) — geometry overstated.** File size (15,658 bytes) and Lighthouse waste (~13.5 KB) are exact, but "54 by 54 px" is wrong: header.css:32 sets `height:54px; width:auto` on a 160x139 intrinsic image, so rendered ~62x54. The same asset is reused in the footer at 52px, so codex's remediation ("retain a larger asset where displayed larger") has no qualifying use. Core finding (small logo wastes bytes) holds.
- **T-23 (rate-limit bucket storage pressure) — credit omitted.** The pre-honeypot bucket creation is real, but codex ignored that `hostinger/cron/purge-enquiries.php:74-81` already sweeps `rl/*.json` older than 86,400s and its comment explicitly anticipates this exact flood attack. Exposure is a <=24h window contingent on the cron running (which T-11 flags as unverified). P2 defensible; finding should have credited the existing sweep.
- **S-05 (medical/legal claims need sourcing) — over-stated as a defect.** No claim was shown to be wrong; the cited "whitening by non-dentists is illegal" claims (TeethWhitening.jsx:46/66, blog.js:117) are substantively correct under UK law, and the audit itself says it "did not assess clinical correctness." This is a process/sourcing recommendation overlapping S-04, effectively P2 not P1.
- **S-08 (smile gallery) — accurate but owner-resolved.** No provenance/consent/case evidence exists in-repo (confirmed: 6 portraits in SmileGallerySpotlight.jsx, zero consent/before-after hits in dist). Factually correct but the owner has decided to KEEP the gallery, so the P1 launch-blocker framing is downgraded to an owner-accepted decision.
- **S-13 (sameAs ambiguity) — over-stated post-GBP.** The constructed Maps URL (practice.js:29, no CID/place_id) is real, but the entity-ambiguity worry that motivates it is resolved by the verified GBP. Residual is a P3 cleanup (swap in the canonical profile URL), not P2.
- **CQ-08 (CSS not world-class) — design-rule framing misleading.** Structural metrics (29 `!important`, 93 `@media`, 100 `color-mix`, real lint failure) are accurate, but the "gradients widespread / no-gradient rule violated" headline is wrong: most of the ~88 gradient lines are single-colour continuous-glow washes the owner intentionally keeps, and only **one** true gold-to-blue blend exists in live CSS (hero.css:187). The "contrast failures prove the token system fails" sub-claim has no file:line evidence inside CQ-08. Realistic severity for the architecture concern: P2.
- **CQ-18 (source hygiene) — `.DS_Store` over-stated.** `src/.DS_Store` exists on disk but is gitignored and untracked, so it can never ship. The other three sub-claims (audit-folder sprawl, no Prettier, dirty worktree) are accurate; the dirty worktree was pre-existing session state, not caused by the audit.

## Confirmed launch blockers

These are CONFIRMED and genuinely block go-live (or a green pipeline):

1. **T-01 / S-06 / CQ-02 — broken homepage conversion CTA.** ConcernsBento.jsx:172 `<Link to="/contact/">` ("Book a consultation") points at a route that does not exist; no `dist/contact/` folder; `.htaccess` has no SPA catch-all, so it is a hard 404. Every other contact link uses `/#contact`. One-line fix. The build checker cannot catch it (only validates `/treatments/<slug>/`).
2. **T-02 / CQ-01 — CI is red.** `npm run lint:css` exits 2 on team.css:459 (`text-stroke`) and :518 (`text-stroke-color`); `npm run ci` (run by ci.yml) includes lint:css. Confirmed the `-webkit-` prefixed siblings already provide the effect, so deleting the two unprefixed lines is zero-visual-risk. CI cannot be green until fixed.
3. **T-03 / T-07 / CQ-03 / CQ-07 — Treatments a11y + PHP form-contract data loss.**
   - Treatments.jsx:251-293 nests an `<a href="tel:...">` (276-286) inside a `role="tab"` button, and the tablist (245) owns a non-tab `<div>` accordion child — invalid HTML/ARIA; Lighthouse mobile `aria-required-children` = 0. No roving-tabindex/arrow-key model.
   - PHP backup allowlist (send-enquiry.php:325-328) stores dead keys `preferredTime`/`preferredDay`/`preferredContact`/`message` and is **missing** `preference` (Contact sends it), `careType`/`dentistPreference`/`referral` (Register sends them). On a Resend outage the fail-safe NDJSON backup silently drops patient triage fields. Verified against both form states.
4. **S-03 / CQ-04 — 13 invalid medical schema @types ship to Google** (see correction above). Not rich-result-affecting but a real E-E-A-T/semantic defect, machine-verifiable.
5. **T-12 / S-15 — privacy/contact contradiction + missing legal identity.** Contact.jsx:277 "We'll never share your details" directly contradicts Privacy.jsx:26 (shares with processors/labs/regulator). Privacy.jsx:13 claims ICO registration with **no number**; footer/schema carry no legal entity name or company number. Legal/trust risk at the point of data collection; GBP does not resolve it.

Strongly recommended pre-launch (CONFIRMED, high but not strictly blocking): **T-06** (Turnstile dead, fail-open rate limiter), **T-09** (non-atomic deploy with no rollback, os.walk uploads root index.html before hashed assets), **T-18** (`dist/.vite/` manifests deploy publicly, exposing source paths + absolute dev home dir), **T-10** (`check:launch` gives false confidence — LAUNCH_CHECKLIST.md promises hard-fails the script does not enforce), **S-04 / CQ-10** (zero of 21 treatment pages have a `reviewer` field on a YMYL medical site).

## Plan coverage

The plan has **strong coverage of every CONFIRMED code-bug finding** with a code fix, and the file/line references were verified accurate. The Wave 5 "guardrails, not rewrites" decision (no CSS reduction, no list-registry migration, no index-key rewrite) is the correct low-risk call for a pre-launch site whose hand-built look is the product. **As written, executing the plan would fix the code-level launch blockers but would NOT make the site fully launch-ready**, because of content/E-E-A-T gaps and a few sequencing/over-reach problems.

**CONFIRMED items the plan misses or under-schedules:**
- **S-04 / CQ-04 reviewer field (P1) — easy miss.** All 21 treatment files are already edited in Wave 1 for procedureType, but no step adds a named `reviewer` / emits `reviewedBy`. TreatmentPage.jsx:79/157 already supports it; only owner-supplied names are needed. Blog author=Organization (6 posts) and team bios (S-12) are also unaddressed.
- **S-10 thin blogs (P2):** three posts (~224/246/339 words) with hardcoded, non-content-derived read-times — no step fixes content or read-time computation.
- **S-11 / S-12 / S-16 content depth (P2):** no step adds original imagery, pricing detail, clinician commentary, team headshots/qualifications, or premises/accessibility/parking proof.
- **S-15 legal-entity name (P2):** plan touches the ICO-number owner ask but not adding the company/legal-entity name and aligning Organization schema + footer + privacy across the four surfaces.
- **T-25 / S-21 (P3):** no `security.txt`, and SPF `~all` / DMARC `p=none` / missing CAA email-auth hardening appear in no wave. Stale GSC verification comment (index.html:21) unaddressed.
- **T-08 (P1, partly owner):** at-rest encryption / restore test / deletion evidence have no concrete step (3C adds rollback/staging only).

**Risky / over-reach / mis-ordered plan steps (from the plan reviews, all verified):**
- **Sequencing is the biggest problem.** The riskiest UI change (1E Treatments tablist refactor) and the first live deploy ride on the **un-hardened** deploy.py and land **before** the axe/link/route-render guardrails (Waves 2/5F) and deploy-safety (3C) exist. Pull guardrails + 3C forward, or forbid deploying Wave 1 until 3C lands.
- **1F.1 hero gradient is mis-filed as "code bug, no owner input."** hero.css:187 is an 18%/28%-opacity photo wash (gold→transparent 42%→blue), not a brand UI gradient. Changing it alters the single most important above-the-fold pixel and is a 3-stop gradient where a naive two-overlay replacement would create a visible band. Reclassify as a deferred owner-sign-off design decision, not Wave 1.
- **1I.2 (delete invented openingHoursSpecification) is superseded.** Confirmed schemas.js:59-62 has invented in-practice hours (Mon-Fri 07:00-23:00 etc.). Since the GBP now has real hours, **sync the real hours** rather than delete the spec and regress to "call us." Keep the honest 24/7 emergency `contactPoint` hoursAvailable (schemas.js:70).
- **1C verify command is broken — would falsely pass.** Confirmed: a single-quote grep matches **only Invisalign**; the 10 double-quoted `Dentistry` and 2 `CosmeticProcedure` files use double quotes and would not show as needing fixes. The verify regex must match both quote styles.
- **1E mislabel:** the offending tablist child is a `<div class="txg-acc">`, not the `<article>` (the article is the outer wrapper at line 114). An agent told to "move the article" may edit the wrong element. Also confirm the owner accepts arrow-key automatic activation (onFocus→setActive live-swaps the stage).
- **Anchor on strings, not line numbers** — the working tree is dirty (133 entries); 404 gradient is on `.code` (~line 17), plan cites line 16.
- **OWNER_FACT gap:** the plan does not route S-08/T-13 gallery image **consent/licence/provenance** to the owner track even though the gallery is "kept." That is the most important owner-facing legal exposure (GDPR/ASA/GDC) and must be added.

**Deferrable, not blockers:** 1G hardcoded year (footer self-heals via useEffect; DOB cap cosmetic) and 1F.2 404 text gradient (noindex page).

## Owner-facts / already-resolved

- **S-01 (entity not trusted) — ALREADY_RESOLVED.** Resolved by the now-verified GBP (5.0/30 reviews, matching 80 Hutcheson St / G1 1SH / 0141 548 6548) plus the owner-confirmed Westerwood rebrand. Residual is cleanup only: stale TODO comments in practice.js:4,11 and the non-canonical `sameAs` URL (overlaps S-13). Downgrade to P3.
- **S-02 (no index presence) — OWNER_FACT.** In-repo signals are clean (robots.txt `Allow:/`, 37-loc sitemap on canonical apex). Absence from index is the expected state of a gated pre-launch site; verification depends on external DNS/Search Console the owner controls. Not a code defect.
- **S-09 (commercial claims) — OWNER_FACT.** All claims (£95 first visit, under-18 free exams, NHS when space, 1-hour confirmation, same-day/7-day, 24/7, parking, finance) are present and prominent in rendered copy (verified in dist). Their operational truth is owner-held; if not true on launch they mislead (ASA risk).
- **S-17 (domain age / brand collision) — OWNER_FACT.** 28 Apr 2026 registration and SERP brand-collision are external/WHOIS facts not in the repo. Advisory guidance is sound; no code action.
- **T-13 (gallery provenance) — OWNER_FACT.** No consent/licence/provenance in-repo (confirmed). Gallery is owner-KEPT; legitimacy depends on owner-held records. Must still go to the owner track for consent/licence confirmation.
- **T-08 (data-protection TOMs), S-12/S-04 GDC reviewer names** depend on owner/clinician input; the code-side controls present (above-webroot 0600 NDJSON, hashed IP, 90-day purge) are reasonable for shared hosting.

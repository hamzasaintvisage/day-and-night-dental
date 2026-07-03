# Day Night Dental deep SEO and Google visibility audit

Audit date: 30 June 2026

Repository: `/Users/admin/day-and-night-dental-recovered`

Canonical domain: `https://daynightdental.co.uk/`

Mode: read only. No SEO, content, schema, server or analytics change was made.

## 1. Executive verdict

SEO verdict: **The technical crawl foundation is good, but the site is not ready for a serious Google launch.**

The strong part is unusually clean for a pre-launch site:

1. Static prerendering exposes meaningful HTML without JavaScript.
2. The 37 intended indexable URLs are in the sitemap.
3. Canonicals, titles, descriptions and H1s are clean.
4. Utility success pages and the 404 are excluded from indexing.
5. Internal treatment routes are extensive and crawlable.
6. HTTPS, host redirects and true 404 behaviour are in place.
7. Search Console domain verification appears to exist at DNS level.

The weak part is not a missing keyword tag. It is entity truth, medical trust and operational Google setup:

1. The central NAP source still labels the address and phone as TODO owner data.
2. Public search results associate the same phone and address with prior business names.
3. The current site did not surface for the exact brand or `site:` checks available to this audit.
4. The Google Maps URL in `sameAs` is not evidence of a claimed and verified Business Profile.
5. Eleven treatment pages emit an enumeration member as an `@type`, which is semantically wrong.
6. Clinical pages have bulk "last reviewed" dates but no named reviewer.
7. Blog posts use the organisation as author, not a real accountable clinician.
8. Several posts are too thin for their displayed reading time and the seriousness of the advice.
9. There is no active analytics or conversion measurement.
10. A homepage consultation CTA sends users and crawlers to a 404.

This is a new domain registered on 28 April 2026. There is no honest switch that makes a new dental domain rank immediately. Google visibility will depend on accurate entity consolidation, a verified Business Profile, crawl and indexing confirmation, credible clinician-led content, technically sound pages, and sustained evidence over time.

## 2. Severity model and counts

1. **P0, blocker:** Entity or launch truth must be resolved before Google is invited to index the site.
2. **P1, high:** Material indexing, trust, conversion or structured-data issue.
3. **P2, medium:** Content quality, measurement or optimisation gap.
4. **P3, low:** Cleanup or future-proofing.
5. **Pass:** Audited and materially correct.

Count excluding known and intentional owner decisions:

1. P0: 1
2. P1: 8
3. P2: 9
4. P3: 3

## 3. Known and intentional decisions, excluded

### S-K01 Placeholder opening hours

Known blocker, excluded from the findings count. They are visible and present in schema, so they must be replaced before indexation, but this is not presented as a discovery.

### S-K02 No reviews, ratings or aggregateRating

Confirmed intentional. No fake ratings were found. This report does not recommend adding ratings to the website.

### S-K03 Preview design lab

Confirmed `noindex`, excluded from the sitemap and excluded from the SEO defect count.

### S-K04 Code splitting and SSR

Confirmed. The site is statically prerendered and the indexable content is not dependent on client-side JavaScript.

## 4. P0 blocker

### S-01 The business entity cannot yet be trusted as canonical

Severity: **P0**

Evidence:

1. `src/data/practice.js:5` says values marked TODO are placeholders.
2. The NAP section at `src/data/practice.js:11` is still labelled `TODO: real values from the owner`.
3. The current values are:
   1. Day Night Dental.
   2. 80 Hutcheson St, Merchant City, Glasgow, G1 1SH.
   3. 0141 548 6548.
4. Public search results associate the same phone and address with names including Westerwood Merchant City, Westerwood Health and Fergus & Glover.
5. The current `sameAs` URL is a constructed Google Maps search or place URL, not a stable profile identifier proven by this audit.
6. No authoritative public result for the exact Day Night Dental brand, address and phone surfaced in the search checks available here.
7. Nominet reports that it could not match the domain registrant name or address against a third-party source on 28 April 2026.

What this does and does not prove:

1. It does not prove the NAP is false. This could be a legitimate rebrand, acquisition or shared premises.
2. It proves Google and citation sources currently have conflicting entity signals.
3. It proves the repository itself still describes the values as awaiting owner confirmation.

Impact:

1. Google can merge the new practice with an old entity, show stale names or hours, or fail to trust the new brand.
2. Patients can call or navigate using inconsistent listings.
3. Local search depends heavily on complete and accurate Business Profile information.

Required owner decision before launch:

1. Confirm the exact trading name, legal entity, address format, primary phone, website, emergency phone, service model and opening date in writing.
2. Confirm whether Day Night Dental is a rebrand of an existing practice or a separate entity.
3. Identify the authoritative Google Business Profile and its stable share or Place URL.
4. Decide how legacy profiles and directory listings will be updated, merged or marked closed without losing valid history.
5. Remove every TODO marker only after the values are signed off.

Acceptance test:

1. Website, Business Profile, Nominet account, regulator records and priority directories show the approved identity.
2. Exact brand plus phone and exact brand plus address searches return the intended entity.
3. Search Console and Business Profile ownership are documented.

Google local ranking guidance: https://support.google.com/business/answer/7091

## 5. P1 high-severity findings

### S-02 The site has no demonstrated Google index presence

Severity: **P1**

Evidence:

1. A public `site:daynightdental.co.uk` search through the available search index returned no site pages.
2. Exact-brand searches did not surface the UK site in the returned results.
3. A Google verification TXT record exists:
   `google-site-verification=4niTeq7UhpyGcEhqAgd1UPvyU0IfjUOh_Fcq5U0UVto`
4. DNS verification suggests a Search Console domain property may be verified, but this audit had no Search Console account access.

Important limitation:

Public `site:` searches are not a complete index report. Search Console URL Inspection and Page Indexing are the authoritative tools for this site.

Impact:

The site may simply be new or intentionally gated, but there is no evidence yet that Google's canonical index has accepted the pages.

Required action:

1. Open the verified domain property in Search Console.
2. Confirm ownership users and remove obsolete owners.
3. Submit `https://daynightdental.co.uk/sitemap.xml`.
4. Inspect:
   1. Homepage.
   2. Treatments index.
   3. Emergency dentist.
   4. Dental implants.
   5. Invisalign.
   6. Blog index.
   7. One article.
5. Check live rendered HTML, selected canonical, indexing allowed status and crawl result.
6. Request indexing only after blockers and the intended pre-launch gate are resolved.

Google notes that recrawling can take days to weeks: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

### S-03 Eleven procedure schemas use invalid semantic types

Severity: **P1**

Evidence:

1. Ten pages emit `@type: "Dentistry"`.
2. Invisalign emits `@type: "Orthodontics"`.
3. Schema.org defines `Dentistry` as an enumeration member of `MedicalSpecialty`, not a type for a treatment node.
4. The affected pages are:
   1. Children's dentistry.
   2. Composite bonding.
   3. Dental check-ups.
   4. Dental hygiene.
   5. Dentures.
   6. Emergency dentist.
   7. General dentistry.
   8. Invisalign.
   9. Nervous patients.
   10. Porcelain veneers.
   11. Smile makeover.
5. The JSON is syntactically valid, so a simple JSON parser does not catch the semantic error.

Impact:

1. Search engines receive an incorrect class graph.
2. Rich Results Test may not report this because these medical procedure types are not a dedicated Google rich-result feature.
3. The code looks sophisticated while silently weakening machine interpretation.

Required action for Claude:

1. Use a valid treatment node type, such as `MedicalProcedure`, `TherapeuticProcedure`, `SurgicalProcedure`, `Service` or another genuinely applicable Schema.org type.
2. Express dentistry as `medicalSpecialty` or `relevantSpecialty`, not as the node's `@type`.
3. Do not add fields merely because Schema.org permits them. Mark up only visible, accurate content.
4. Validate both Schema.org semantics and Google's supported feature rules.

References:

1. https://schema.org/Dentistry
2. https://schema.org/MedicalSpecialty
3. https://schema.org/MedicalProcedure
4. https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

### S-04 Clinical content lacks accountable human authorship and review

Severity: **P1**

Evidence:

1. Twenty-one treatment pages display a June 2026 last-reviewed date.
2. None of the treatment page data supplies a named `reviewer`.
3. Therefore no `reviewedBy` person is emitted.
4. Six blog articles use `Organization` as their schema author.
5. The visible article layouts do not identify a human author or clinical reviewer.
6. The team page has names, roles and GDC numbers but no substantive biography, qualifications, treatment interests, experience, professional memberships, author archive or direct regulator link.

Impact:

1. A reader cannot tell who stands behind health advice.
2. Bulk review dates without a reviewer can look procedural rather than accountable.
3. Google explicitly encourages clear sourcing, author background and expert review for high-impact health content.

Required action:

1. Assign a real author and a clinically accountable reviewer to every health article and treatment guide.
2. Show byline, reviewer, review date and update date visibly.
3. Link each person to a detailed profile with qualifications, GDC number, areas of practice and official GDC register link.
4. Add `Person` author and reviewer nodes only when the visible page supports them.
5. Record the editorial and clinical-review workflow outside the page.

Google's people-first guidance says trust is especially important for health topics and strongly encourages accurate authorship information:
https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### S-05 Medical and legal claims need source and clinician verification

Severity: **P1**

Evidence:

1. Treatment pages and articles provide detailed advice about emergencies, extraction aftercare, antibiotics, whitening legality, treatment longevity, implant risk and other health topics.
2. No external clinical sources are cited in the article or treatment layouts.
3. No named clinician has approved the content in the rendered pages.
4. Several claims are absolute or strong, for example legal claims around whitening and clinical claims around enamel, reversibility, longevity and treatment suitability.
5. This audit did not assess clinical correctness.

Impact:

1. Accurate-looking content can still be unsafe, outdated or too absolute for a specific patient.
2. Unsupported health content is a trust problem for both users and search quality systems.

Required action:

1. Have an appropriately qualified clinician review every page line by line.
2. Cite primary or authoritative UK sources where advice depends on a clinical, legal or regulatory fact.
3. Prefer current NHS, GDC, Scottish Dental Clinical Effectiveness Programme, Medicines and Healthcare products Regulatory Agency, British Orthodontic Society and equivalent authoritative guidance.
4. Add limitations and emergency escalation wording where clinically required.
5. Keep a source register and scheduled review date.

### S-06 The homepage has an indexable broken conversion link

Severity: **P1**

Evidence:

1. `/contact/` is linked from a prominent homepage consultation CTA.
2. It is not a route.
3. The live URL returns 404.

SEO impact:

1. Crawl waste and an avoidable broken internal edge.
2. Lost conversion intent from an important commercial page.
3. Reduced confidence in site maintenance.

Required action:

Use the existing `/#contact` destination or create a full contact page. Add an all-route internal link validator to CI.

### S-07 Search and conversion measurement are disabled

Severity: **P1**

Evidence:

1. `GA4_ID` is empty.
2. `META_PIXEL_ID` is empty.
3. Search Console verification exists at DNS, but no property data was available.
4. No consented Web Vitals reporting exists.
5. No documented conversion event test exists for telephone clicks, booking requests or registration completion.

Impact:

1. The owner cannot separate impressions, clicks, calls, registrations and failures.
2. Ranking work cannot be evaluated by query, page, device or geography.
3. Form defects can remain invisible.

Required action:

1. Configure GA4 only after the consent and privacy flow is approved.
2. Link GA4 and Search Console.
3. Track:
   1. Click to call.
   2. Contact submit success.
   3. Patient registration success.
   4. Emergency CTA.
   5. Directions and map interaction.
4. Never treat a client-side thank-you page view alone as proof that an email reached reception.
5. Build a weekly Search Console dashboard for impressions, clicks, CTR, average position, indexed URLs, crawl issues and Core Web Vitals.

### S-08 The "real results" gallery creates an unverified experience signal

Severity: **P1**

Evidence:

1. Six portraits are presented as "Real smiles, real results."
2. They are assigned to treatments.
3. No case page, before image, treatment description, clinician, date, consent statement or provenance is available.
4. The images may be patients, models, licensed stock or generated assets. Visual inspection cannot establish this.

SEO and trust impact:

Google's people-first guidance asks whether content demonstrates first-hand experience and original evidence. If the gallery is not real treatment work, it sends the opposite signal.

Required action:

1. Prove every image and treatment attribution.
2. If illustrative, label it as illustrative and remove "real results."
3. If genuine, create consented case pages with non-identifying context, treating clinician and appropriate caveats.
4. Do not use fake before-and-after narratives.

### S-09 Commercial and operational claims require owner evidence

Severity: **P1**

Evidence includes:

1. First visit from £95.
2. Children under 18 examined free.
3. NHS care when space is available.
4. Confirmation within one working hour.
5. Same-day slots and seven-day access.
6. 24/7 emergency line.
7. Free parking nearby.
8. Specific scan, X-ray, hygiene and treatment inclusions.
9. Finance availability across content.

The placeholder hours are excluded as a known blocker. The other claims are not covered by that exception.

Impact:

If any claim is not operationally true on launch day, organic traffic lands on misleading commercial information.

Required action:

Create a signed claims register with owner, evidence, expiry and page locations. Remove or qualify anything not operationally guaranteed.

## 6. P2 medium-severity findings

### S-10 Three blog posts are materially thin for their displayed reading times

Severity: **P2**

Main-content word counts from prerendered HTML:

| Article | Main words | Displayed read time |
| --- | ---: | ---: |
| Invisalign vs braces | 216 | 4 min |
| Dental implants cost Glasgow | 237 | 5 min |
| Emergency dentist Glasgow at night | 329 | 4 min |
| Veneers Glasgow cost and types | 736 | 6 min |
| Professional vs home whitening | 769 | 6 min |
| Dental emergency step-by-step | 1,106 | 7 min |

Impact:

1. The first three do not meet the expectation created by their titles and read times.
2. Cost pages that avoid actual price ranges or decision detail can leave the user needing another search.
3. A new medical site needs evidence and usefulness, not a high count of shallow pages.

Required action:

1. Correct read times automatically from visible main content.
2. Expand only where the practice has real expertise, data or answers.
3. Add clinician bylines, sources, decision factors, contraindications, alternatives, next steps and review dates.
4. Merge a weak page into a stronger guide if there is no distinct search intent.

Google explicitly says it has no preferred word count. The issue is completeness and value, not hitting a number:
https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### S-11 Treatment pages are extensive but visibly templated

Severity: **P2**

Evidence:

1. Twenty-one treatment pages contain about 1,519 to 1,981 main-content words each.
2. They share a common structure and many recurring commercial phrases.
3. Most pages have no original imagery, named clinician commentary, local case evidence, pricing detail or references.
4. Similar length and bulk June review dates can signal production by template.

Impact:

Templates are not a penalty. The risk is that many pages look comprehensive by length while lacking unique experience and proof.

Required action:

1. Keep the reusable design.
2. Make the substance treatment-specific.
3. Add only truthful differentiators:
   1. Who provides it.
   2. Equipment and technique actually used.
   3. What the first consultation includes.
   4. Eligibility and alternatives.
   5. Price logic and written estimate process.
   6. Real case evidence if consented.
   7. Recovery, red flags and follow-up.
4. Remove repeated filler.

### S-12 Team profiles are too thin for a healthcare site

Severity: **P2**

Evidence:

1. Three dentists are listed with names, generic roles and GDC numbers.
2. The site provides no headshots, qualifications, career history, treatment focus, languages, memberships, publications or profile routes.
3. Search checks corroborated one listed dentist through another practice result, but this audit could not independently verify all three through the official GDC register interface.

Required action:

1. Verify every name, role and GDC number directly with GDC.
2. Build substantive profile pages from owner-approved facts.
3. Link the visible GDC number to the correct official register result where stable linking permits it.
4. Connect author and reviewer markup to those profiles.

### S-13 `sameAs` does not unambiguously establish the entity

Severity: **P2**

Evidence:

1. `sameAs` contains only a maps URL built from the brand and coordinates.
2. There is no verified Business Profile identifier or other authoritative profile.
3. Schema.org describes `sameAs` as a URL that unambiguously indicates identity.

Required action:

Use only verified, canonical entity URLs. Do not fill `sameAs` with generic directories or search URLs.

Reference: https://schema.org/sameAs

### S-14 FAQPage markup no longer creates a Google FAQ rich-result opportunity

Severity: **P2**

Evidence:

1. Twenty-five generated pages emit `FAQPage`.
2. Google's current supported structured-data gallery, updated in June 2026, no longer lists FAQ as a supported rich-result feature.
3. The FAQ search appearance stopped showing in May 2026 and associated test and reporting support was retired in June.

Impact:

1. The visible FAQs may still help users.
2. The Schema.org markup may still be consumed outside Google's rich results.
3. It should not be counted as a Google rich-result strategy or used to justify bloated FAQ content.

Required action:

1. Keep useful visible FAQs.
2. Keep or remove the markup based on actual multi-platform need and maintenance cost.
3. Do not report FAQ rich-result eligibility as an SEO win.
4. Focus Google-supported markup on LocalBusiness, Organization, Article and Breadcrumb where accurate.

Current Google structured-data gallery:
https://developers.google.com/search/docs/appearance/structured-data/search-gallery

### S-15 The legal and organisation identity is incomplete

Severity: **P2**

Evidence:

1. Footer and legal pages identify the trading name and contact details.
2. They do not show a legal entity name, company number or ICO registration number.
3. The privacy page claims ICO registration.
4. The entity at the address and its relationship to prior practice names are not explained.

Required action:

Add only verified legal identity details required by the owner and legal adviser. Align Organization schema, footer, privacy policy and Business Profile.

### S-16 Local relevance is broad but lacks original local proof

Severity: **P2**

Evidence:

1. The site lists Merchant City and many Glasgow neighbourhoods.
2. There are no doorway pages for every neighbourhood, which is good.
3. The areas page has travel-time and convenience copy but little original evidence about the actual premises, accessibility, transport, entrance, parking or nearby landmarks.

Required action:

1. Keep one strong location page unless there is a real physical or service distinction.
2. Add original practice photography, entrance guidance, accessibility facts, transport and verified parking information.
3. Avoid mass-generating area pages with swapped place names.

### S-17 The domain has no age or authority history

Severity: **P2**

Evidence:

1. Domain registered 28 April 2026.
2. Audit date 30 June 2026.
3. Exact-brand results are crowded by unrelated "Day & Night Dental" businesses and similarly named dental services.

Impact:

The site should expect a discovery and trust-building period. A technically perfect launch does not create prominence immediately.

Required action:

1. Consolidate the brand entity first.
2. Earn legitimate local citations and links through actual professional, community and supplier relationships.
3. Publish clinician-led resources worth citing.
4. Do not buy links, mass-submit to junk directories or create keyword doorway sites.

### S-18 Mobile lab LCP is above Google's good threshold

Severity: **P2 for SEO, P1 in the technical audit**

Every sampled mobile template measured 2.9 to 3.0 seconds LCP in Lighthouse. Page experience is broader than one metric, but field Core Web Vitals should be monitored in Search Console.

Reference: https://web.dev/articles/vitals

## 7. P3 findings

### S-19 Sitemap priority values have little practical Google value

Severity: **P3**

The sitemap is valid and useful. Do not spend meaningful time tuning `priority`; focus on canonical URLs, accurate `lastmod`, internal linking and content.

### S-20 Geo meta tags are not a meaningful Google ranking lever

Severity: **P3**

The `geo.region`, `geo.placename`, `geo.position` and `ICBM` tags do not fix local entity inconsistency. They are harmless, but Business Profile and consistent real-world identity matter more.

### S-21 Google Search Console instructions in source comments are stale

Severity: **P3**

The DNS TXT record already contains a Google verification token. Comments implying that verification still needs to be pasted into page metadata should be reconciled with the actual ownership method.

## 8. Technical SEO passes

### Indexable route inventory

1. 39 real prerendered routes were tested.
2. 37 are intended to be indexable and appear in the sitemap.
3. Thank-you and registered pages are noindex.
4. The 404 is noindex and returns a true 404 live.

### Metadata

Across the 40 real generated HTML documents including 404:

1. 40 titles.
2. 40 unique titles.
3. 37 descriptions for the 37 indexable pages.
4. No duplicate descriptions.
5. Exactly one H1 on every real document.
6. Exactly one canonical on every intended route.
7. No canonical on 404, which is appropriate.
8. Open Graph and Twitter metadata are present on indexable templates.

### Crawl and rendering

1. `robots.txt` allows crawling and names the sitemap.
2. The sitemap uses the canonical HTTPS apex domain.
3. Static HTML contains the main page content.
4. Four representative pages retained H1 and substantive text with JavaScript disabled.
5. Mobile and desktop use the same responsive URL and HTML model.
6. Googlebot does not need to click tabs to discover the treatment copy because it is prerendered in the HTML.

### URLs and redirects

1. Lowercase, descriptive, trailing-slash URLs are used consistently.
2. HTTP redirects to HTTPS.
3. www redirects to the apex domain.
4. Unknown routes return 404 rather than soft 200.
5. No duplicate title or canonical problem was found.

### Structured data

1. All JSON-LD parsed as valid JSON.
2. Types present include Dentist, EmergencyService, BreadcrumbList, Service, MedicalProcedure, SurgicalProcedure, CosmeticProcedure, BlogPosting, ItemList and WebSite.
3. Breadcrumb markup is present on route templates.
4. No fake review or aggregate rating markup exists.

### Images

1. Local image references in generated HTML resolve in `dist`.
2. Width and height are generally provided.
3. Modern WebP assets are used.
4. The primary concern is provenance and responsive sizing, not missing files.

## 9. How to launch on Google, exact execution plan

### Phase 0, establish truth before indexing

Owner tasks:

1. Approve canonical NAP and legal identity.
2. Approve real hours and emergency availability.
3. Approve every price, NHS, finance, free-care, response-time, parking and availability claim.
4. Approve clinician names, GDC numbers, roles and content-review responsibility.
5. Resolve gallery provenance.
6. Decide whether the site remains gated or becomes public.

Do not request indexing before this phase is complete.

### Phase 1, repair release blockers

Claude tasks:

1. Fix `/contact/`.
2. Fix CI.
3. Correct schema types.
4. Fix serious accessibility failures.
5. Fix mobile LCP regressions.
6. Complete the form and deploy hardening from the technical audit.
7. Run the final production build.

Verification:

1. Crawl every generated route.
2. Validate all internal links.
3. Run Rich Results Test on each schema template.
4. Run Schema.org validator on treatment nodes.
5. Check live status, canonical, robots and rendered HTML.

### Phase 2, establish Google ownership

Search Console:

1. Use the domain property already verified by DNS if the token belongs to the owner.
2. Audit all users and owners.
3. Submit `https://daynightdental.co.uk/sitemap.xml`.
4. Inspect the seven representative URLs listed in S-02.
5. Check:
   1. URL is available to Google.
   2. Indexing is allowed.
   3. User-declared and Google-selected canonical match.
   4. Rendered screenshot and HTML contain the main content.
   5. Page resources load.
6. Request indexing for representative high-value pages.
7. Let sitemap discovery handle the remainder.

Business Profile:

1. Claim or create the one correct profile.
2. Use the exact approved real-world name.
3. Use the exact approved address and primary phone.
4. Choose the most accurate primary category and only real secondary categories.
5. Add the canonical website and appointment URL.
6. Add verified hours only.
7. Add real exterior, interior, team and accessibility photos.
8. Resolve duplicate or legacy profiles through Google's supported process.
9. Do not stuff the name with "emergency dentist Glasgow" or other keywords.

Google explains that complete and accurate information improves eligibility for relevant local results:
https://support.google.com/business/answer/7091

### Phase 3, connect measurement

1. Configure consent-approved GA4.
2. Link GA4 to Search Console.
3. Verify conversion events in DebugView and production.
4. Record form success only after the API returns success.
5. Track click-to-call separately from answered calls.
6. Use call reporting only with an owner-approved privacy and NAP strategy.
7. Collect Web Vitals without sensitive form content.

Baseline dashboard:

1. Indexed pages.
2. Excluded pages by reason.
3. Crawl errors.
4. Brand and non-brand impressions.
5. Query, page, country and device.
6. Click-through rate.
7. Conversion rate by landing page.
8. Core Web Vitals.
9. Business Profile discovery and action data where available.

### Phase 4, build medical trust

1. Publish full clinician profiles.
2. Assign authors and reviewers.
3. Cite current UK clinical sources.
4. Add an editorial policy explaining creation, clinical review and update cadence.
5. Correct bulk dates so they reflect actual review activity.
6. Remove thin content that cannot be made genuinely useful.
7. Add real practice and team photography.
8. Add original cases only with consent and evidence.

### Phase 5, build the local entity

Priority sources:

1. Google Business Profile.
2. GDC records for clinicians.
3. The appropriate Scottish healthcare and business records.
4. Apple Business Connect and Bing Places.
5. High-quality local and professional directories where the practice genuinely belongs.
6. Suppliers, professional associations and local organisations with a real relationship.

Rules:

1. One approved NAP string.
2. No bulk junk-directory submission.
3. No paid link schemes.
4. No location doorway pages.
5. No fake local addresses or virtual-office profiles.
6. No fake patient stories.

### Phase 6, query and page map

The page map should be based on Search Console data after launch. Initial intent mapping:

| Intent | Primary page |
| --- | --- |
| Brand and general dentist | Homepage |
| Emergency dentist Glasgow | Emergency dentist |
| Dental implants Glasgow | Dental implants |
| Invisalign Glasgow | Invisalign |
| Composite bonding Glasgow | Composite bonding |
| Teeth whitening Glasgow | Teeth whitening |
| Veneers Glasgow | Porcelain veneers |
| Nervous dentist Glasgow | Nervous patients |
| Family or child dentist Glasgow | Children's dentistry |
| Routine dentist Glasgow | General dentistry or check-ups |
| Merchant City dentist | Homepage and areas served |
| Emergency advice | Dental emergency article |

Rules:

1. One clear primary intent per page.
2. Avoid creating two pages for the same query merely by changing wording.
3. Use internal links where they help the patient decide.
4. Write titles for clarity and click value, not keyword repetition.
5. Do not treat word count as a ranking target.

### Phase 7, post-launch operating rhythm

First 72 hours:

1. Check live status, canonical, robots, sitemap and schema.
2. Check Search Console crawl and indexing.
3. Confirm conversions reach reception.
4. Watch server, frontend and email alerts.

Weekly for first two months:

1. Page Indexing changes.
2. Crawl errors and 404s.
3. Query and landing-page impressions.
4. Brand ambiguity.
5. Business Profile accuracy.
6. Core Web Vitals.
7. Form conversion and failure rate.

Monthly:

1. Content accuracy and source review.
2. Competitor SERP changes.
3. Internal linking.
4. Local entity consistency.
5. Thin or cannibalising pages.
6. Spam and manual-action reports.
7. Backlink quality.

Quarterly:

1. Full clinical content review.
2. Technical crawl.
3. Accessibility regression test.
4. Schema revalidation against current Google documentation.
5. Disaster recovery and rollback test.

## 10. Competitor reality

The public search landscape shows established Glasgow practices with:

1. Detailed location and opening information.
2. Named clinicians with credentials.
3. Real practice photography.
4. Procedure-specific pricing or clear price logic.
5. Finance details.
6. Detailed implant and aligner pages.
7. Strong exact-match emergency propositions.

There is also a particularly close naming collision with "Night and Day Dentist Glasgow" in emergency search results, plus unrelated "Day & Night Dental" businesses outside the UK. The new brand cannot rely on its name alone to disambiguate itself.

The correct response is not more keyword repetition. It is a stronger verified entity, named expertise, original local evidence and a measurably better patient answer.

## 11. What not to do

1. Do not request indexing while truth fields remain unresolved.
2. Do not create fake ratings or treatment outcomes.
3. Do not keyword-stuff the Business Profile name.
4. Do not create dozens of neighbourhood doorway pages.
5. Do not buy links.
6. Do not mass-publish AI-rewritten dental articles.
7. Do not change dates without a real content review.
8. Do not mark up invisible or inaccurate content.
9. Do not add every possible Schema.org property.
10. Do not promise ranking dates or positions.
11. Do not treat Lighthouse SEO 100 as evidence that the site will rank.
12. Do not treat a submitted sitemap as proof of indexing.

## 12. Final Google go-live acceptance gate

The Google launch is ready only when:

1. Canonical NAP and legal identity are approved.
2. The correct Business Profile is owned and complete.
3. Legacy entity conflicts have a documented resolution plan.
4. Search Console ownership is confirmed.
5. Sitemap is submitted successfully.
6. Representative URL inspections pass.
7. The intended gate is removed at the approved moment.
8. All indexable routes return 200 and correct canonical.
9. No internal link returns 404.
10. Invalid schema types are fixed.
11. Visible medical content has real authors and reviewers.
12. High-impact claims have owner or clinician evidence.
13. Gallery claims match image provenance.
14. Analytics and conversions are tested under consent.
15. Mobile performance and accessibility meet launch budgets.
16. Form delivery and monitoring are proven.
17. No manual action, security issue or accidental noindex is present.

## 13. Primary research sources

1. Google SEO Starter Guide:
   https://developers.google.com/search/docs/fundamentals/seo-starter-guide
2. Google people-first content and health trust:
   https://developers.google.com/search/docs/fundamentals/creating-helpful-content
3. Google mobile-first indexing:
   https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
4. Google LocalBusiness structured data:
   https://developers.google.com/search/docs/appearance/structured-data/local-business
5. Google supported structured-data gallery:
   https://developers.google.com/search/docs/appearance/structured-data/search-gallery
6. Google structured-data introduction:
   https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
7. Google recrawl guidance:
   https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
8. Google Business Profile local ranking guidance:
   https://support.google.com/business/answer/7091
9. Core Web Vitals:
   https://web.dev/articles/vitals
10. Schema.org Dentistry:
    https://schema.org/Dentistry
11. Schema.org MedicalSpecialty:
    https://schema.org/MedicalSpecialty
12. Schema.org MedicalProcedure:
    https://schema.org/MedicalProcedure

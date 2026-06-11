Both critique corrections confirmed: areas-served is ~688 words (not 150 — the defect is orphaning, not thinness), the static `index,follow` robots tag is baked into every page including the homepage at line 17, placeholders ship in 3 built files, zero GDC numbers, zero aggregateRating, sameAs is a generic Maps URL, and areas-served has exactly 1 inbound link. The synthesis is accurate where it matters; I'll fold in the critique's reframings (GBP-first, robots tag as integrity issue not polish, areas-served orphaning not thinness, hours numbers named explicitly).

---

# Day Night Dental — Your SEO Action Plan

## The bottom line

You have a genuinely well-built website — fast, technically clean, properly structured, with a consistent address and phone number on every page. That's the hard part, and it's largely done. What's holding it back is **not** the code; it's a short list of **credibility gaps that must be filled before you go live** (placeholder dentist names, no GDC numbers, stock photos presented as your real practice) and a **missing "local" layer** that decides who ranks in Glasgow (your Google Business Profile, real patient reviews, pricing). Close those and this site should out-rank most Glasgow dental competitors. Until then, none of the good work can even be seen — the site is currently hidden behind a "coming soon" page that tells Google not to look.

---

## Do these first

These are launch-blockers and the highest-impact moves. Roughly ordered by impact.

| # | Action | Why it matters | Effort |
|---|--------|----------------|--------|
| 1 | **Set up and optimise your Google Business Profile (GBP), then start collecting reviews** | This is the single biggest lever for ranking in Glasgow's "map pack" — more than anything on the website itself. A competitor shows 380+ reviews; you have none. The profile + review count is what wins, not website code. | Owner-led, ongoing |
| 2 | **Replace placeholder dentist names + add GDC registration numbers** | Your site literally ships the text "Dr. [Principal Name]" and "Dr. [Dentist Name]" on the homepage and team page, and has **zero** GDC numbers despite claiming "GDC-registered." For a medical site, this destroys trust and is a hard launch blocker. | Owner provides info; ~½ day to apply |
| 3 | **Fix the "[Name]" placeholder on the Complaints page** | Your complaints page tells patients to contact "our Complaints Manager, [Name]." This is a compliance and credibility problem. | 5 minutes once you give the name |
| 4 | **Replace or relabel the stock photos** | Every photo is pulled from a stock site (Unsplash), but the captions claim they're your real Merchant City practice and your real patient cases. That's a misleading-advertising risk (ASA/GDC). Use real photos, or relabel as "illustrative." | Owner-led (real photos); relabel ~1 hr |
| 5 | **Reconcile your "24/7" messaging** | The site says "24/7" 18 times, but your own structured hours say the practice is open Mon–Fri 07:00–23:00 (less at weekends) with only the **phone line** running 24 hours. Google may show the schema hours and send people to a closed door. State two separate facts: practice hours, and a 24-hour emergency line. | ½ day |
| 6 | **At go-live: remove the "coming soon" gate cleanly** | Right now every page redirects to a holding page that tells Google "do not index." Until this is removed, none of your SEO counts. Keep the site unlinked and out of Search Console while gated, then remove the gate, confirm pages load, and request indexing — as one clean launch step. | Developer, ~1 hr |
| 7 | **Remove the duplicate "index" tag baked into every page** | Every page carries two conflicting instructions to Google — one correct, one a hardcoded "index this." Your private pages stay hidden today only by luck of ordering; a small change could flip them visible. This is a correctness issue, not polish. | Developer, 1 template edit |
| 8 | **Build the local layer: rescue the Areas page + add per-area pages** | Your "Areas Served" page is an orphan — only **one** link points to it and it's missing from your menu. Add it to the navigation, link the neighbourhoods, and create a few "[service] in [area]" pages (e.g. emergency dentist in Merchant City). This is how you win "near me" searches. | Developer + content, 1–2 weeks |

---

## Crawl & indexing (does Google see the site at all)

- **Coming-soon gate (critical, go-live blocker):** every request is redirected to a "do not index" holding page. Remove at launch, then confirm in Google Search Console that each key page returns a normal "200 / index" status and request re-indexing. Treat removal + a clean first crawl as one step.
- **Duplicate robots tag (high — integrity, not polish):** a hardcoded "index, follow" tag sits on every page (line 17) alongside the correct per-page tag. Your private pages (thank-you, registered) stay hidden only by precedence. Delete the hardcoded tag so each page has exactly one instruction.
- **Search Console verification (low):** the verification codes are still placeholder comments. Add the real Google (and Bing) verification before launch so you have data from day one.
- **Already solid:** clean URLs, a valid sitemap (21 pages) and robots.txt, and a proper "not found" page.

---

## On-page (titles & headings)

- **Hidden main headings (high):** on the homepage, team, and register pages, the keyword heading is *invisible* to visitors (hidden in code) while the visible heading is decorative. Make the visible, prominent line the real heading — e.g. surface "Glasgow's 24/7 Emergency Dentist."
- **Two blog titles miss "Glasgow" (medium):** the Invisalign-vs-braces and teeth-whitening posts. Add the city.
- **Over-long titles/descriptions (medium/low):** four blog titles run 73–87 characters and get cut off in search results; the Invisalign treatment description is 187 characters (aim for ~155).
- **Footer labels are coded as headings (medium):** "Treatments / Practice / Visit Us" are marked as page headings site-wide, muddying the structure. One shared-footer fix corrects every page.
- **Already solid:** one clear main heading per page, unique titles, correct UK-English language tag, mobile-friendly setup.

---

## Local SEO (the main ranking lever for Glasgow)

- **No reviews / no rating data (critical):** testimonials are placeholders ("Genuine patient reviews will appear here"). Reviews on your Google profile are the #1 driver. Add star-rating data to the site *only once real reviews exist* — never invent them (GDC/ASA rules + Google penalties).
- **Areas page is orphaned (high):** contrary to a "too thin" reading, the page is ~688 words — the real problem is that only **one** link points to it and it's absent from the menu and footer. Add it to navigation (gets it ~22 internal links), make the 6 neighbourhoods clickable links, and add local business + "areas served" structured data.
- **No per-area pages (high):** create 3–4 high-value pages like "Emergency Dentist in Merchant City / City Centre / West End," each with genuinely local copy, directions and parking.
- **Business details only on the homepage (high):** your full practice "identity card" (in code) appears only on the homepage; every other page points to it but it isn't there. Have your developer output it on all pages.
- **No profile/social links (high):** the site's "same as" links point only to a generic Maps search, not your real Google Business Profile or social accounts. Add the canonical profile link + real socials.
- **Map embed uses the wrong street spelling (low):** "Hutcheson Street" vs your standard "Hutcheson St." Embed by location/Place ID so it matches exactly.
- **Already solid (and genuinely strong):** your name, address and phone are byte-for-byte identical on all 25 pages, with click-to-call and a sticky mobile call bar everywhere. Don't touch the address text — only the map embed needs aligning.

---

## Structured data (the hidden info Google reads)

- **Team page ships placeholder names (critical):** real names, "Dentist" type, GDC number, photo and bio for each clinician — in both the visible page and the code.
- **Blog "publisher" and treatment breadcrumbs point at things that aren't there (high/medium):** fixed automatically once the business identity card is on every page; point breadcrumbs to a real treatments page.
- **Blog and Register pages have no structured data (medium/high):** add the appropriate types.
- **Legal pages and blog posts have no social-share cards (high/medium):** add them via the shared template so shared links show a proper preview.
- **Already solid:** treatment pages have a complete, correct, valid data stack; you correctly have **no** fake rating data while reviews don't exist.

---

## Speed & performance

- **Hero and all photos load from a third-party stock site (high):** this both slows the most important part of the page and creates the misleading-imagery problem. Self-hosting real, optimised photos fixes both at once.
- **Fonts loaded twice per page (high):** remove the duplicates.
- **Minor (medium/low):** move the mobile-viewport tag higher in the code; trim the unused 230KB logo file; tighten the inlined styling.
- **Already solid:** no slow third-party trackers, fonts are efficient, images don't cause layout jumps. The fundamentals are excellent.

---

## Content & trust (matters extra for a medical site)

- **No GDC numbers anywhere (critical):** add each dentist's number by name, linked to the GDC register — a core UK dental trust signal competitors often miss.
- **"Clinically reviewed" with no named reviewer (high):** name the reviewing clinician (with GDC number) on treatment pages.
- **Thin team and a few thin blog posts (high/medium):** expand team bios to 600+ words; grow three short blog posts (currently ~250 words but labelled "4–5 min read") to 600–900 words with Glasgow specifics.
- **Already solid:** treatment pages are genuinely strong (950–1,200 words, locally relevant); your honest, no-fabrication stance on reviews is exactly right.

---

## Conversion & competitor gaps

- **No pricing (high):** treatment pages contain **no "£" figures** at all, yet the homepage promises "honest pricing." Add "from £…" anchors and a fees page — high-value patients filter on this.
- **No finance/payment plans shown (high):** add a 0%-finance block to implants, cosmetic, Invisalign and whitening pages — near-universal among competitors.
- **No "review us on Google" prompt (medium):** add one to the thank-you page, the registered page and the footer to feed your review programme.
- **Thin FAQs (medium):** expand to 8–10 questions covering cost, "open now," NHS-vs-private, "seen today."
- **NHS-vs-private message is inconsistent (low):** pick one clear stance.

---

## What's already strong (keep it)

- **Genuinely fast, clean, server-rendered pages** — Google can read everything without running scripts.
- **Address & phone identical on all 25 pages**, with click-to-call and a sticky mobile call button everywhere.
- **Clean web addresses, a valid sitemap, and proper handling of utility pages.**
- **Valid, well-structured data on treatment pages**, plus a comprehensive business profile in code.
- **Excellent performance and accessibility fundamentals** — no slow trackers, no layout jumps, mobile-first, UK-English throughout.
- **Honest trust posture** — no fake reviews, no invented ratings, careful wording on 24-hour claims.
- **A real Glasgow-focused blog cluster already exists** (implant cost, emergency-at-night, veneers, Invisalign) linking down to treatment pages.

*(One technical cleanup for the developer: every internal link is missing its trailing slash while every official URL has one — causing a needless redirect on essentially every click. Render internal links with the trailing slash. High impact, invisible to patients.)*

---

## Needs the owner (only you can supply these)

These are the things no developer or AI can invent — and most of your "first" list depends on them:

1. **Google Business Profile:** claim/verify it at 80 Hutcheson St, set the primary category (Emergency dental service + Dentist), exact address/phone, true hours, the 24-hour line, and real photos. *This is your #1 local-ranking asset.*
2. **A review programme:** ask every patient for a Google review (QR code at reception, SMS or email after each appointment). Volume and recency matter most.
3. **Real dentist details:** full names, bios, headshots, and each clinician's **GDC registration number**.
4. **The Complaints Manager's real name.**
5. **Real, consented photos** of the practice, the team and (with consent) actual case results — to replace the stock images.
6. **Pricing** ("from £…" per treatment) and any **finance/payment-plan** offer.
7. **Equipment / technology claims** — only state these once they're genuinely true of your practice; don't let placeholder marketing copy assert capabilities you don't have.

---

**Files reviewed (read-only, nothing changed):** `/Users/admin/day-and-night-dental-recovered/dist/index.html`, `/Users/admin/day-and-night-dental-recovered/dist/our-team/index.html`, `/Users/admin/day-and-night-dental-recovered/dist/complaints/index.html`, `/Users/admin/day-and-night-dental-recovered/dist/areas-served/index.html`, `/Users/admin/day-and-night-dental-recovered/dist/thank-you/index.html`, and the coming-soon `.htaccess` gate referenced in the audit. Key disputed claims independently verified: areas-served is ~688 words (orphaning, not thinness, is the defect — 1 inbound link); the hardcoded `index, follow` robots tag is present on every page including the homepage at line 17; placeholder names ship in 3 built files; zero GDC numbers and zero `aggregateRating` site-wide; `sameAs` is a generic Maps URL.
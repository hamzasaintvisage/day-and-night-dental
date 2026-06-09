# Local SEO Guide for Day & Night Dental

A practical, step-by-step guide for getting found by people in Glasgow searching for an
emergency dentist. No technical knowledge needed. Follow the steps in order.

The website is already built to high SEO standards. The single biggest thing still missing
is a **Google Business Profile (GBP)** — and the real practice contact details that go with it.
This guide walks you through both.

---

## 1. Why a Google Business Profile matters most

When someone in Glasgow types **"emergency dentist near me"**, **"24 hour dentist Glasgow"**,
or **"dentist Merchant City"** into Google, the results that appear at the very top — the little
map with three businesses pinned on it — are called the **map pack** (or "local pack").

- The map pack appears **above** the normal blue-link results. It gets the most clicks by far,
  especially on phones and especially for urgent searches like emergency dental pain.
- You can **only** appear in the map pack if you have a Google Business Profile. No profile
  means you are invisible for the searches that matter most to an emergency practice.
- For a 24/7 emergency dentist, this is the highest-value thing you can do for the business.
  Everything else in this guide supports it.

**Bottom line:** create the Google Business Profile first. Nothing else comes close in impact.

---

## 2. Create and verify your Google Business Profile

1. Go to **google.com/business** and sign in with a Google account you control (use a practice
   email you will keep long-term, not a personal one).
2. Enter the **business name** exactly as you want it to appear: **Day & Night Dental**.
3. Enter the **real street address** of the practice in Merchant City, Glasgow.
4. Enter the **real phone number** that patients should call.
5. Choose your business categories (see section 4 below).
6. **Verify the profile.** Google needs to confirm you are really at that address. Depending on
   the business, Google will offer one or more of:
   - **Postcard by post** — a code is mailed to the practice address; you type it in to verify.
   - **Phone or text** — a code is sent to the business phone number.
   - **Video verification** — you record a short video showing the premises, signage, and that
     you have access (increasingly the default; follow Google's on-screen prompts).
7. The profile is not live in the map pack until verification is complete, so do this promptly.

---

## 3. NAP consistency — get this exactly right

**NAP** stands for **Name, Address, Phone**. Google trusts a business more when its NAP is
**identical everywhere** it appears online. Even small differences (e.g. "Street" vs "St",
a different phone format, or a missing suite number) can confuse Google and weaken your ranking.

Your Name, Address, and Phone must match **character for character** across:

- Your Google Business Profile
- Your website
- Every directory and listing (see section 7)

**Important — the website currently has placeholder contact details.**
The site pulls all its contact details from one file: **`src/data/practice.js`**. Right now that
file contains placeholders that MUST be replaced with the real, GBP-matching details:

- `streetAddress` is currently `'[Practice Street Name]'` — replace with the real street.
- `postcode` is currently `'[Postcode]'` — replace with the real Glasgow postcode.
- `phoneDisplay` is currently `'0000 000 0000'` — replace with the real phone number.
- (`phoneE164` in the same file is the same number in international format, e.g. `+44141...`.)

Whatever you enter on the Google Business Profile must be **exactly** what goes into these fields.
Decide on the one correct version of each detail, then use that everywhere. Ask your developer to
update `practice.js` once you have confirmed the final details with the GBP.

---

## 4. Categories, hours, services and photos

**Categories** tell Google what you do. You pick one **primary** category and several **secondary**.

- **Primary category:** choose the most specific fit. For an emergency-led practice,
  **"Emergency dental service"** is ideal; otherwise **"Dentist"**.
- **Secondary categories** (add the ones that apply): Dental clinic, Cosmetic dentist,
  Dental implants periodontist, Teeth whitening service, Orthodontist, Emergency dental service
  (if not used as primary).

**Hours:** if you genuinely operate 24/7, set the profile to **open 24 hours**. If emergency
cover differs from routine appointment hours, set accurate regular hours and clearly describe
the 24-hour emergency line in your description and services. Always keep hours truthful and
up to date (including holidays) — wrong hours frustrate patients and hurt trust.

**Services:** list the treatments you offer (emergency dentistry, general dentistry, dental
implants, cosmetic dentistry, Invisalign, teeth whitening). This helps you show up for
treatment-specific searches.

**Photos:** add good-quality photos — the exterior and signage (so people recognise you when
they arrive), reception, treatment rooms, and the team. Profiles with real photos get more clicks.

---

## 5. Getting reviews — the ethical way (and the hard rules)

Reviews are a major ranking and trust signal, especially for the map pack. But dentistry in the
UK is regulated, and the rules are strict:

- **NEVER buy fake reviews, write your own, or post reviews as if you were a patient.**
- **NEVER offer money, discounts, free treatment, prize draws, or any other incentive in
  exchange for a review.** This breaches **General Dental Council (GDC)** standards and
  **Advertising Standards Authority (ASA)** rules, and it can also breach Google's policies.
- Only ever ask **real patients** about their **genuine** experience.

How to do it properly:

- Ask satisfied patients, in person or by a simple follow-up message, to leave an honest review.
- Make it easy — share the direct link to your Google review page (available from the profile
  once it is set up).
- Reply to every review, positive or negative, politely and professionally. Never share patient
  details in a public reply (confidentiality still applies).
- Aim for a steady, natural flow of reviews over time rather than a sudden burst.

---

## 6. Keep it honest and compliant throughout

Everything you publish — profile description, services, claims, and review replies — should be
accurate and not misleading, in line with GDC and ASA guidance. Avoid superlatives you cannot
back up and never imply guaranteed outcomes.

---

## 7. Citations and directory listings

A **citation** is any other website that lists your business. The more reputable sites that list
you with the **exact same NAP**, the more Google trusts that your details are correct.

Get listed on (with identical Name, Address, Phone):

- **NHS.uk** — the find-a-dentist service; important for a UK dental practice.
- **Yell.com**
- Scotland and Glasgow business directories (local chambers, Glasgow business listings,
  Scottish healthcare directories).
- Any dental or healthcare directories relevant to Scotland.

Use **copy and paste** for the NAP every time so there are zero differences.

---

## 8. After the Google Business Profile exists — finish the website links

Once the profile and your social accounts are live, ask your developer to update
**`src/data/practice.js`** so the website's structured data can point Google at them:

- Add your **Google Business Profile, Facebook, Instagram, and NHS.uk** URLs to the `sameAs` list.
  These tell search engines these profiles all belong to the same business.
- Set **`googleMapsUrl`** to your Google Business Profile / Maps place URL (the site uses this to
  add a "map" link to its structured data).
- Once you have accumulated **real** reviews, set **`rating`** (the average score and the number of
  reviews) so the website can display an aggregate rating in search results. Only ever use the real,
  current figures from your verified profile.

---

## Quick checklist

- [ ] Create Google Business Profile at google.com/business with the real Name, Address, Phone.
- [ ] Complete verification (post / phone / video) so the profile goes live.
- [ ] Decide the one correct version of Name, Address, and Phone (NAP).
- [ ] Replace the placeholders in `src/data/practice.js`: `streetAddress`, `postcode`,
      `phoneDisplay` (and matching `phoneE164`) with the real, GBP-matching details.
- [ ] Set the primary category ("Emergency dental service" or "Dentist") and relevant secondaries.
- [ ] Set accurate hours (24 hours / emergency cover) and add all your services.
- [ ] Add real photos: exterior/signage, reception, treatment rooms, team.
- [ ] Ask real patients for honest reviews — NO fake or incentivised reviews. Reply to all.
- [ ] List the practice on NHS.uk, Yell, and Scotland/Glasgow directories with identical NAP.
- [ ] Add GBP / Facebook / Instagram / NHS URLs to `sameAs` and set `googleMapsUrl` in practice.js.
- [ ] Once real reviews accrue, set `rating` in practice.js.

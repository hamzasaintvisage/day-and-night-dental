// Single source of truth: treatment slug -> canonical display title + tag.
// routes.jsx, ArticleLayout "related treatments", schemas.js availableService and the
// per-page related[] cards all DERIVE their titles from here, so a rename happens in one
// place and the slug->title mapping can never drift (it previously had: the page title
// "Emergency Dentist" vs the homepage label "Emergency Care").
//
// Order = the order treatments are surfaced (hubs + headline treatments first).
export const TREATMENTS = [
  { slug: 'emergency-dentist', title: 'Emergency Dentist', tag: 'Emergency' },
  { slug: 'invisalign', title: 'Invisalign', tag: 'Clear Aligners' },
  { slug: 'dental-implants', title: 'Dental Implants', tag: 'Permanent Solutions' },
  { slug: 'teeth-whitening', title: 'Teeth Whitening', tag: 'Brighter Smile' },
  { slug: 'cosmetic-dentistry', title: 'Cosmetic Dentistry', tag: 'Smile Design' },
  { slug: 'general-dentistry', title: 'General Dentistry', tag: 'Foundation Care' },
  { slug: 'composite-bonding', title: 'Composite Bonding', tag: 'Cosmetic' },
  { slug: 'porcelain-veneers', title: 'Porcelain Veneers', tag: 'Cosmetic' },
  { slug: 'smile-makeover', title: 'Smile Makeover', tag: 'Cosmetic' },
  { slug: 'white-fillings', title: 'White Fillings', tag: 'General' },
  { slug: 'root-canal-treatment', title: 'Root Canal Treatment', tag: 'General' },
  { slug: 'dental-hygiene', title: 'Dental Hygiene', tag: 'General' },
  { slug: 'tooth-extraction', title: 'Tooth Extraction', tag: 'General' },
  { slug: 'dental-crowns', title: 'Dental Crowns', tag: 'General' },
  { slug: 'dental-bridges', title: 'Dental Bridges', tag: 'General' },
  { slug: 'dentures', title: 'Dentures', tag: 'General' },
  { slug: 'childrens-dentistry', title: "Children's Dentistry", tag: 'General' },
  { slug: 'gum-disease-treatment', title: 'Gum Disease Treatment', tag: 'General' },
  { slug: 'dental-check-ups', title: 'Dental Check-Ups', tag: 'General' },
  { slug: 'inlays-onlays', title: 'Inlays & Onlays', tag: 'General' },
  { slug: 'nervous-patients', title: 'Nervous Patients', tag: 'General' },
]

export const TREATMENT_SLUGS = TREATMENTS.map((t) => t.slug)

const BY_SLUG = Object.fromEntries(TREATMENTS.map((t) => [t.slug, t]))

export const treatmentBySlug = (slug) => BY_SLUG[slug]
export const treatmentTitle = (slug) => (BY_SLUG[slug] ? BY_SLUG[slug].title : undefined)
export const treatmentTag = (slug) => (BY_SLUG[slug] ? BY_SLUG[slug].tag : undefined)

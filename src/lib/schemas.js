// Shared structured-data nodes (single source of truth).
// The Dentist node carries @id `${SITE}/#dentist`; treatment + blog pages
// reference it as provider/publisher, so it must be emitted on every page that
// references it (Google does not resolve @id across documents). Importing it
// here keeps the business entity identical everywhere it appears.
import { SITE, PRACTICE } from '../data/practice'
import { treatmentTitle } from '../data/treatments'

export const DENTIST_ID = `${SITE}/#dentist`
const OG_IMAGE = `${SITE}/og-image.jpg`

// Title comes from the treatment registry (no drift); trailing slash keeps the URL canonical.
const svc = (slug) => ({ '@type': 'MedicalProcedure', name: treatmentTitle(slug), url: `${SITE}/treatments/${slug}/` })

// One connected business entity (linked by @id), with full local-business signals.
export const dentistLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  '@id': DENTIST_ID,
  name: PRACTICE.name,
  description: '24/7 emergency, cosmetic and general dental practice in Merchant City, Glasgow.',
  url: `${SITE}/`,
  telephone: PRACTICE.phoneE164,
  email: PRACTICE.email,
  image: [OG_IMAGE],
  logo: `${SITE}/logo.png`,
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  medicalSpecialty: 'Dentistry',
  address: {
    '@type': 'PostalAddress',
    streetAddress: PRACTICE.streetAddress,
    // Mirror the visible NAP ("Merchant City, Glasgow") so the machine-readable address agrees
    // with the printed one and keeps the strongest hyperlocal term (Merchant City) in the entity.
    addressLocality: PRACTICE.locality,
    addressRegion: PRACTICE.city,
    postalCode: PRACTICE.postcode,
    addressCountry: PRACTICE.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: PRACTICE.geo.lat, longitude: PRACTICE.geo.lng },
  areaServed: [
    { '@type': 'City', name: 'Glasgow' },
    { '@type': 'Place', name: 'Merchant City' },
    { '@type': 'Place', name: 'Glasgow City Centre' },
    { '@type': 'Place', name: 'Glasgow West End' },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '21:00' },
  ],
  // 24/7 emergency helpline modelled honestly as a contact point (separate from in-practice hours).
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PRACTICE.phoneE164,
    contactType: 'emergency',
    availableLanguage: 'English',
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  },
  availableService: [
    svc('emergency-dentist'),
    svc('invisalign'),
    svc('dental-implants'),
    svc('teeth-whitening'),
    svc('cosmetic-dentistry'),
    svc('general-dentistry'),
  ],
  ...(PRACTICE.sameAs.length ? { sameAs: PRACTICE.sameAs } : {}),
  ...(PRACTICE.googleMapsUrl ? { hasMap: PRACTICE.googleMapsUrl } : {}),
  ...(PRACTICE.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: PRACTICE.rating.value, reviewCount: PRACTICE.rating.count, bestRating: '5' } } : {}),
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: PRACTICE.name,
  publisher: { '@id': DENTIST_ID },
}

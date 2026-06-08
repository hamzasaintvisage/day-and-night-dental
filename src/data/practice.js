// SINGLE SOURCE OF TRUTH for NAP (Name/Address/Phone) + brand constants.
// Imported by Home, TreatmentPage, Footer, Contact, Header, Layout so the
// business details can NEVER drift across the site (a core local-SEO signal).
// Values marked TODO are placeholders — replace with the real practice data.

export const SITE = 'https://www.dayandnightdental.co.uk'

export const PRACTICE = {
  name: 'Day & Night Dental',

  // --- NAP (TODO: real values from the owner) ---
  streetAddress: '[Practice Street Name]', // TODO real street
  locality: 'Merchant City',
  city: 'Glasgow',
  region: 'Glasgow City',
  postcode: '[Postcode]',                  // TODO real G1/G2 postcode
  country: 'GB',

  // Phone — ONE canonical format. tel:/schema use E.164 (no spaces); UI shows display.
  phoneDisplay: '0000 000 0000',           // TODO real, e.g. '0141 management 000'
  phoneE164: '+440000000000',              // TODO real E.164, no spaces e.g. '+441410000000'

  email: 'reception@daynightdental.co.uk',

  // Approx Merchant City centroid. TODO replace with rooftop coords from the verified GBP pin.
  geo: { lat: 55.8588, lng: -4.2456 },

  // Filled once the owner creates GBP + social profiles (feeds schema sameAs).
  // TODO add: Google Business Profile, Facebook, Instagram, NHS.uk listing URLs.
  sameAs: [],

  // Google Maps "place" embed URL — set once the GBP exists. Empty = generic area map.
  mapEmbed: '',
  googleMapsUrl: '', // GBP place URL -> schema hasMap
  rating: null,      // { value: '4.9', count: '120' } once real reviews exist -> aggregateRating
}

// Neighbourhoods/areas for local-relevance copy + structured data.
export const AREAS_SERVED = [
  'Merchant City',
  'Glasgow City Centre',
  'Glasgow West End',
  'Finnieston',
  'Dennistoun',
  'The Southside',
]

export const fullAddressLine = () =>
  `${PRACTICE.locality}, ${PRACTICE.city} ${PRACTICE.postcode}`

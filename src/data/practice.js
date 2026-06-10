// SINGLE SOURCE OF TRUTH for NAP (Name/Address/Phone) + brand constants.
// Imported by Home, TreatmentPage, Footer, Contact, Header, Layout so the
// business details can NEVER drift across the site (a core local-SEO signal).
// Values marked TODO are placeholders — replace with the real practice data.

export const SITE = 'https://www.daynightdental.co.uk'

export const PRACTICE = {
  name: 'Day Night Dental',

  // --- NAP (TODO: real values from the owner) ---
  streetAddress: '80 Hutcheson St',
  locality: 'Merchant City',
  city: 'Glasgow',
  region: 'Glasgow City',
  postcode: 'G1 1SH',
  country: 'GB',

  // Phone — ONE canonical format. tel:/schema use E.164 (no spaces); UI shows display.
  phoneDisplay: '0141 548 6548',
  phoneE164: '+441415486548',

  email: 'reception@daynightdental.co.uk',

  // Exact coords from the Google Business Profile pin.
  geo: { lat: 55.8592, lng: -4.2474899 },

  // Google Business Profile (feeds schema sameAs). Add Facebook/Instagram/NHS.uk when live.
  sameAs: ['https://www.google.com/maps/place/Day+Night+Dental/@55.8592,-4.2474899,17z'],

  // Live business map for the contact section (no API key; labelled pin via name + address).
  mapEmbed: 'https://www.google.com/maps?q=Day+Night+Dental,+80+Hutcheson+Street,+Glasgow+G1+1SH&output=embed',
  googleMapsUrl: 'https://www.google.com/maps/place/Day+Night+Dental/@55.8592,-4.2474899,17z', // schema hasMap
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

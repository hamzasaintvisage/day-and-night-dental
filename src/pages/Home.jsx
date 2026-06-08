import { Head } from 'vite-react-ssg'
import { SITE, PRACTICE } from '../data/practice'
import Hero from '../sections/Hero'
import EmergencyBand from '../sections/EmergencyBand'
import Concerns from '../sections/Concerns'
import About from '../sections/About'
import WhyChooseUs from '../sections/WhyChooseUs'
import Treatments from '../sections/Treatments'
import SmileGallery from '../sections/SmileGallery'
import Register from '../sections/Register'
import Testimonials from '../sections/Testimonials'
import Team from '../sections/Team'
import AreasServed from '../sections/AreasServed'
import HomeFaq from '../sections/HomeFaq'
import Contact from '../sections/Contact'
import CtaBand from '../components/CtaBand'

const DENTIST_ID = `${SITE}/#dentist`
const OG_IMAGE = `${SITE}/og-image.jpg`
const TITLE = 'Emergency & Cosmetic Dentist in Glasgow | Day & Night Dental'
const DESCRIPTION =
  '24/7 emergency dentist in Glasgow. Day & Night Dental offers same-day emergency care, Invisalign, implants and cosmetic dentistry. Open 7 days a week.'

const svc = (name, slug) => ({ '@type': 'MedicalProcedure', name, url: `${SITE}/treatments/${slug}` })

// One connected business entity (linked by @id), with full local-business signals.
const dentistLd = {
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
    addressLocality: PRACTICE.locality,
    addressRegion: PRACTICE.region,
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
    svc('Emergency Dentist', 'emergency-dentist'),
    svc('Invisalign', 'invisalign'),
    svc('Dental Implants', 'dental-implants'),
    svc('Teeth Whitening', 'teeth-whitening'),
    svc('Cosmetic Dentistry', 'cosmetic-dentistry'),
    svc('General Dentistry', 'general-dentistry'),
  ],
  // TODO: add Google Business Profile, Facebook, Instagram, NHS.uk URLs once live.
  ...(PRACTICE.sameAs.length ? { sameAs: PRACTICE.sameAs } : {}),
  ...(PRACTICE.googleMapsUrl ? { hasMap: PRACTICE.googleMapsUrl } : {}),
  ...(PRACTICE.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: PRACTICE.rating.value, reviewCount: PRACTICE.rating.count, bestRating: '5' } } : {}),
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: PRACTICE.name,
  publisher: { '@id': DENTIST_ID },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:site_name" content="Day & Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Day & Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />

      <Hero />
      <EmergencyBand />
      <Concerns />
      <About />
      <WhyChooseUs />
      <Treatments />
      <CtaBand
        eyebrow="Don't Wait Until Morning"
        heading="In pain right now? A clinician is on call, every hour."
        sub="Whether it's the middle of the night or the middle of the week, you can speak to a real dentist in Glasgow straight away."
        callLabel="Call our 24/7 line"
      />
      <SmileGallery />
      <Register />
      <Testimonials />
      <Team />
      <CtaBand
        eyebrow="Day, Evening, Overnight"
        heading="We're open when you need us, not just office hours."
        sub="Register as a new patient, or call us straight away if it can't wait."
      />
      <AreasServed />
      <HomeFaq />
      <Contact />
    </>
  )
}

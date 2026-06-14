import { Head } from 'vite-react-ssg'
import { SITE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd, websiteLd } from '../lib/schemas'
import Hero from '../sections/Hero'
import Journey from '../sections/Journey'
import ConcernsBento from '../sections/ConcernsBento'
import About from '../sections/About'
import WhyChooseUs from '../sections/WhyChooseUs'
import Treatments from '../sections/Treatments'
import SmileGallery from '../sections/SmileGallery'
import SmileGallerySpotlight from '../sections/SmileGallerySpotlight'
import Register from '../sections/Register'
import Testimonials from '../sections/Testimonials'
import Team from '../sections/Team'
import AreasServed from '../sections/AreasServed'
import HomeFaq from '../sections/HomeFaq'
import Contact from '../sections/Contact'
import CtaBand from '../components/CtaBand'

const OG_IMAGE = `${SITE}/og-image.jpg`
const TITLE = 'Emergency & Cosmetic Dentist in Glasgow | Day Night Dental'
const DESCRIPTION =
  '24/7 emergency dentist in Glasgow. Day Night Dental offers same-day emergency care, Invisalign, implants and cosmetic dentistry. Open 7 days a week.'

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
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Day Night Dental, 24/7 emergency and cosmetic dentist in Glasgow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(dentistLd)}</script>
        <script type="application/ld+json">{jsonLd(websiteLd)}</script>
      </Head>

      <Hero />
      <Journey />
      <ConcernsBento />
      <About />
      <WhyChooseUs />
      <CtaBand
        eyebrow="Open When You Need Us"
        heading={<>A dentist in Glasgow, <em>day or night</em>.</>}
        sub="Routine care by day, emergencies around the clock. Call us now or book an appointment online."
      />
      <Treatments />
      <CtaBand
        eyebrow="Don't Wait Until Morning"
        heading={<>In pain right now? Help is on hand, <em>every hour</em>.</>}
        sub="Whether it's the middle of the night or the middle of the week, you can call us in Glasgow straight away for urgent help."
        callLabel="Call our 24/7 line"
      />
      {/* Results / smile gallery, same content, laid out per device:
          filmstrip on mobile, spotlight on desktop. */}
      <div className="dn-hide-desktop"><SmileGallery /></div>
      <div className="dn-hide-mobile"><SmileGallerySpotlight /></div>
      <Register />
      <Testimonials />
      <CtaBand
        eyebrow="Day, Evening, Overnight"
        heading={<>We're open <em>when you need us</em>, not just office hours.</>}
        sub="Register as a new patient, or call us straight away if it can't wait."
      />
      <Team />
      <AreasServed />
      <HomeFaq />
      <Contact />
    </>
  )
}

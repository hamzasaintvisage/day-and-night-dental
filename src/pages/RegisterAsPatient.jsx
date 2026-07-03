import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import Register from '../sections/Register'
import { SITE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'
import { dentistLd } from '../lib/schemas'

const url = `${SITE}/register-as-patient/`
const OG_IMAGE = `${SITE}/og-image.jpg?v=2`

export default function RegisterAsPatient() {
  return (
    <>
      <Head>
        <title>Register as a Patient | Day Night Dental, Glasgow</title>
        <meta name="description" content="Register as a new patient at Day Night Dental in Merchant City, Glasgow. Now welcoming new patients for every treatment, with day, evening and weekend appointments." />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Register as a Patient | Day Night Dental, Glasgow" />
        <meta property="og:description" content="Become a new patient at Day Night Dental in Merchant City, Glasgow. New patients welcome for every treatment." />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Day Night Dental" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:title" content="Register as a Patient | Day Night Dental, Glasgow" />
        <meta name="twitter:description" content="Become a new patient at Day Night Dental in Merchant City, Glasgow. New patients welcome for every treatment." />
      </Head>
      <Head>
        <script type="application/ld+json">{jsonLd(dentistLd)}</script>
      </Head>

      <nav className="tp-breadcrumb" aria-label="Breadcrumb">
        <div className="dn-container">
          <Link to="/">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Register as a Patient</span>
        </div>
      </nav>

      <h1 className="dn-visually-hidden">Register as a new patient at Day Night Dental, Glasgow</h1>
      <Register />
    </>
  )
}

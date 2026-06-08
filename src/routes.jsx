import Layout from './components/Layout'
import Home from './pages/Home'
import AreasServed from './pages/AreasServed'
import Invisalign from './pages/treatments/Invisalign'
import GeneralDentistry from './pages/treatments/GeneralDentistry'
import CosmeticDentistry from './pages/treatments/CosmeticDentistry'
import DentalImplants from './pages/treatments/DentalImplants'
import TeethWhitening from './pages/treatments/TeethWhitening'
import EmergencyDentist from './pages/treatments/EmergencyDentist'
import Privacy from './pages/legal/Privacy'
import Complaints from './pages/legal/Complaints'
import Terms from './pages/legal/Terms'
import Accessibility from './pages/legal/Accessibility'
import ThankYou from './pages/ThankYou'
import Registered from './pages/Registered'
import OurTeam from './pages/OurTeam'
import RegisterAsPatient from './pages/RegisterAsPatient'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import { posts } from './data/blog'

// Static routes — every path here is pre-rendered to HTML by vite-react-ssg.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'areas-served', element: <AreasServed /> },
      { path: 'our-team', element: <OurTeam /> },
      { path: 'register-as-patient', element: <RegisterAsPatient /> },
      { path: 'treatments/invisalign', element: <Invisalign /> },
      { path: 'treatments/general-dentistry', element: <GeneralDentistry /> },
      { path: 'treatments/cosmetic-dentistry', element: <CosmeticDentistry /> },
      { path: 'treatments/dental-implants', element: <DentalImplants /> },
      { path: 'treatments/teeth-whitening', element: <TeethWhitening /> },
      { path: 'treatments/emergency-dentist', element: <EmergencyDentist /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'complaints', element: <Complaints /> },
      { path: 'terms', element: <Terms /> },
      { path: 'accessibility', element: <Accessibility /> },
      { path: 'thank-you', element: <ThankYou /> },
      { path: 'registered', element: <Registered /> },
      { path: 'blog', element: <Blog /> },
      ...posts.map((p) => ({ path: `blog/${p.slug}`, element: <BlogPost slug={p.slug} /> })),
    ],
  },
]

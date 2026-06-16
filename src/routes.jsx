import Layout from './components/Layout'
import Home from './pages/Home'
import AreasServed from './pages/AreasServed'
import Invisalign from './pages/treatments/Invisalign'
import GeneralDentistry from './pages/treatments/GeneralDentistry'
import CosmeticDentistry from './pages/treatments/CosmeticDentistry'
import DentalImplants from './pages/treatments/DentalImplants'
import TeethWhitening from './pages/treatments/TeethWhitening'
import EmergencyDentist from './pages/treatments/EmergencyDentist'
import CompositeBonding from './pages/treatments/CompositeBonding'
import PorcelainVeneers from './pages/treatments/PorcelainVeneers'
import SmileMakeover from './pages/treatments/SmileMakeover'
import WhiteFillings from './pages/treatments/WhiteFillings'
import RootCanalTreatment from './pages/treatments/RootCanalTreatment'
import DentalHygiene from './pages/treatments/DentalHygiene'
import ToothExtraction from './pages/treatments/ToothExtraction'
import DentalCrowns from './pages/treatments/DentalCrowns'
import DentalBridges from './pages/treatments/DentalBridges'
import Dentures from './pages/treatments/Dentures'
import ChildrensDentistry from './pages/treatments/ChildrensDentistry'
import GumDiseaseTreatment from './pages/treatments/GumDiseaseTreatment'
import DentalCheckUps from './pages/treatments/DentalCheckUps'
import InlaysOnlays from './pages/treatments/InlaysOnlays'
import NervousPatients from './pages/treatments/NervousPatients'
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

// Static routes, every path here is pre-rendered to HTML by vite-react-ssg.
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
      { path: 'treatments/composite-bonding', element: <CompositeBonding /> },
      { path: 'treatments/porcelain-veneers', element: <PorcelainVeneers /> },
      { path: 'treatments/smile-makeover', element: <SmileMakeover /> },
      { path: 'treatments/white-fillings', element: <WhiteFillings /> },
      { path: 'treatments/root-canal-treatment', element: <RootCanalTreatment /> },
      { path: 'treatments/dental-hygiene', element: <DentalHygiene /> },
      { path: 'treatments/tooth-extraction', element: <ToothExtraction /> },
      { path: 'treatments/dental-crowns', element: <DentalCrowns /> },
      { path: 'treatments/dental-bridges', element: <DentalBridges /> },
      { path: 'treatments/dentures', element: <Dentures /> },
      { path: 'treatments/childrens-dentistry', element: <ChildrensDentistry /> },
      { path: 'treatments/gum-disease-treatment', element: <GumDiseaseTreatment /> },
      { path: 'treatments/dental-check-ups', element: <DentalCheckUps /> },
      { path: 'treatments/inlays-onlays', element: <InlaysOnlays /> },
      { path: 'treatments/nervous-patients', element: <NervousPatients /> },
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

import Layout from './components/Layout'
import Home from './pages/Home'
import { posts } from './data/blog'

// vite-react-ssg pre-renders every path below to static HTML for SEO, then hydrates.
// Only Layout + Home load eagerly (the homepage's critical render path). Every other
// route is code-split into its own chunk via `lazy`, so the homepage no longer ships
// the JavaScript for 40+ pages. The static prerender still emits full HTML + per-page
// <Head> for each lazy route (verified in the build output).
const page = (loader) => () => loader().then((m) => ({ Component: m.default }))

// Static routes, every path here is pre-rendered to HTML by vite-react-ssg.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'areas-served', lazy: page(() => import('./pages/AreasServed')) },
      { path: 'our-team', lazy: page(() => import('./pages/OurTeam')) },
      { path: 'register-as-patient', lazy: page(() => import('./pages/RegisterAsPatient')) },
      { path: 'treatments', lazy: page(() => import('./pages/TreatmentsIndex')) },
      { path: 'treatments/invisalign', lazy: page(() => import('./pages/treatments/Invisalign')) },
      { path: 'treatments/general-dentistry', lazy: page(() => import('./pages/treatments/GeneralDentistry')) },
      { path: 'treatments/cosmetic-dentistry', lazy: page(() => import('./pages/treatments/CosmeticDentistry')) },
      { path: 'treatments/dental-implants', lazy: page(() => import('./pages/treatments/DentalImplants')) },
      { path: 'treatments/teeth-whitening', lazy: page(() => import('./pages/treatments/TeethWhitening')) },
      { path: 'treatments/emergency-dentist', lazy: page(() => import('./pages/treatments/EmergencyDentist')) },
      { path: 'treatments/composite-bonding', lazy: page(() => import('./pages/treatments/CompositeBonding')) },
      { path: 'treatments/porcelain-veneers', lazy: page(() => import('./pages/treatments/PorcelainVeneers')) },
      { path: 'treatments/smile-makeover', lazy: page(() => import('./pages/treatments/SmileMakeover')) },
      { path: 'treatments/white-fillings', lazy: page(() => import('./pages/treatments/WhiteFillings')) },
      { path: 'treatments/root-canal-treatment', lazy: page(() => import('./pages/treatments/RootCanalTreatment')) },
      { path: 'treatments/dental-hygiene', lazy: page(() => import('./pages/treatments/DentalHygiene')) },
      { path: 'treatments/tooth-extraction', lazy: page(() => import('./pages/treatments/ToothExtraction')) },
      { path: 'treatments/dental-crowns', lazy: page(() => import('./pages/treatments/DentalCrowns')) },
      { path: 'treatments/dental-bridges', lazy: page(() => import('./pages/treatments/DentalBridges')) },
      { path: 'treatments/dentures', lazy: page(() => import('./pages/treatments/Dentures')) },
      { path: 'treatments/childrens-dentistry', lazy: page(() => import('./pages/treatments/ChildrensDentistry')) },
      { path: 'treatments/gum-disease-treatment', lazy: page(() => import('./pages/treatments/GumDiseaseTreatment')) },
      { path: 'treatments/dental-check-ups', lazy: page(() => import('./pages/treatments/DentalCheckUps')) },
      { path: 'treatments/inlays-onlays', lazy: page(() => import('./pages/treatments/InlaysOnlays')) },
      { path: 'treatments/nervous-patients', lazy: page(() => import('./pages/treatments/NervousPatients')) },
      { path: 'privacy', lazy: page(() => import('./pages/legal/Privacy')) },
      { path: 'complaints', lazy: page(() => import('./pages/legal/Complaints')) },
      { path: 'terms', lazy: page(() => import('./pages/legal/Terms')) },
      { path: 'accessibility', lazy: page(() => import('./pages/legal/Accessibility')) },
      { path: 'thank-you', lazy: page(() => import('./pages/ThankYou')) },
      { path: 'registered', lazy: page(() => import('./pages/Registered')) },
      { path: 'blog', lazy: page(() => import('./pages/Blog')) },
      ...posts.map((p) => ({
        path: `blog/${p.slug}`,
        lazy: () => import('./pages/BlogPost').then((m) => {
          const Post = m.default
          return { Component: () => <Post slug={p.slug} /> }
        }),
      })),
    ],
  },
]

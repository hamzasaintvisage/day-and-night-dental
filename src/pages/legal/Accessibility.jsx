import LegalPage from '../../components/LegalPage'
import { PRACTICE } from '../../data/practice'

export default function Accessibility() {
  return (
    <LegalPage
      slug="accessibility"
      title="Accessibility Statement"
      description="Our commitment to making the Day & Night Dental website usable for everyone."
      updated="June 2026"
      intro="We want everyone to be able to use this website, including people who rely on assistive technology. We are working to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA."
      sections={[
        { h: 'What we do', body: ['We aim to provide good colour contrast, clear text, keyboard-accessible navigation, descriptive links and labels, and to respect reduced-motion preferences for animations.'] },
        { h: 'Known limitations', body: ['Some areas may not yet fully meet AA, for example certain embedded third-party content (such as maps or online booking). We are working to improve these.'] },
        { h: 'Getting help or reporting a problem', body: [`If you have trouble using any part of this site, or need information in a different format, please contact us on ${PRACTICE.phoneDisplay} or at ${PRACTICE.email} and we will do our best to help.`] },
      ]}
    />
  )
}

import LegalPage from '../../components/LegalPage'

export default function Terms() {
  return (
    <LegalPage
      slug="terms"
      title="Terms of Use"
      description="The terms on which you may use the Day & Night Dental website."
      updated="June 2026"
      intro="These terms govern your use of this website. By using the site you accept them. If you do not accept them, please do not use the site."
      sections={[
        { h: 'Not a substitute for clinical advice', body: ['The information on this site is general and is not a substitute for a consultation with a dentist. It must not be relied on as medical advice. If you have a dental emergency, call us or seek urgent care.'] },
        { h: 'Using our site', body: ['You may use this site for your own personal, non-commercial use. You must not misuse it, attempt to gain unauthorised access, or use it in any unlawful way.'] },
        { h: 'Intellectual property', body: ['The content, branding and design of this site belong to Day & Night Dental unless stated otherwise, and may not be copied or reused without permission.'] },
        { h: 'Links to other sites', body: ['Where we link to third-party websites (for example our online booking provider), we are not responsible for their content or their handling of your data.'] },
        { h: 'Liability', body: ['We take care to keep the site accurate and available, but we do not guarantee it will be error-free or uninterrupted. To the extent permitted by law, we are not liable for any loss arising from use of the site.'] },
        { h: 'Governing law', body: ['These terms are governed by the law of Scotland, and any disputes will be subject to the courts of Scotland.'] },
      ]}
    />
  )
}

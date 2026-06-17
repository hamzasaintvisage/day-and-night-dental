import LegalPage from '../../components/LegalPage'
import { PRACTICE } from '../../data/practice'

export default function Privacy() {
  return (
    <LegalPage
      slug="privacy"
      title="Privacy Policy"
      description="How Day Night Dental in Glasgow collects, uses and protects your personal and health information."
      updated="June 2026"
      intro={`Day Night Dental ("we", "us") is committed to protecting your privacy. This policy explains what information we collect, why, and your rights under UK data protection law (UK GDPR and the Data Protection Act 2018). For any privacy question, contact us at ${PRACTICE.email}.`}
      sections={[
        { h: 'Who we are', body: [`Day Night Dental, ${PRACTICE.locality}, ${PRACTICE.city}. We are the data controller for the information we hold about you. We are registered with the Information Commissioner's Office (ICO).`] },
        { h: 'Information we collect', body: [
          'When you contact us or register as a patient we may collect your name, contact details, date of birth and address.',
          'As a dental practice we also hold health information necessary for your care, such as your medical history, medications, clinical records, X-rays and treatment notes. This is "special category" data and is handled with additional care.',
          'If you mention symptoms, choose a treatment of interest, or select an option such as "Emergency / pain" in our website forms, that information can indicate something about your health. We treat the contents of website enquiries with the same care as other personal data, and we ask you not to include detailed medical information in the free-text box.',
        ] },
        { h: 'Why we use it and our lawful basis', body: [
          'We use your information to provide dental care, manage appointments, contact you about your treatment, process payments, and meet our legal and regulatory duties.',
          'Our lawful bases are: the provision of healthcare (Article 9(2)(h) UK GDPR) for clinical records; legitimate interests and your consent for enquiries and marketing; and legal obligation where the law requires us to keep records.',
        ] },
        { h: 'How we store and share it', body: [
          'Your records are stored securely in our practice management system. We do not sell your data.',
          'When you send an enquiry or registration through our website, it is delivered to us by email through a third-party email provider acting as our processor. A copy is also held in a secure backup on our website host so that no enquiry is lost if email delivery fails. This backup is not used for any other purpose and is not accessible from the public website.',
          'We share information only where necessary: for example with other healthcare providers involved in your care, laboratories, our regulator, or where required by law. Any processors we use are bound by data protection agreements.',
        ] },
        { h: 'How long we keep it', body: ['We keep dental records in line with NHS and professional guidance (generally at least 11 years for adults, or until age 25 for children, whichever is longer). Enquiry data is kept only as long as needed to deal with your enquiry. The secure backup copy of website form submissions is held separately from your clinical records and is automatically deleted after 90 days.'] },
        { h: 'Your rights', body: [
          'You have the right to access your records, correct inaccuracies, object to certain processing, and request erasure where it applies. To exercise any right, contact us using the details below.',
          `If you are unhappy with how we handle your data you can complain to the ICO at ico.org.uk. We would ask that you raise it with us first at ${PRACTICE.email}.`,
        ] },
        { h: 'Cookies and analytics', body: [
          'Our website uses a small number of essential cookies to make the site work. With your consent, we also use analytics cookies to understand how the site is used.',
          'Where enabled, and only after you consent, these analytics are provided by Google Analytics 4 (Google Ireland Ltd) and the Meta (Facebook) Pixel (Meta Platforms Ireland Ltd) acting as our processors. They set cookies and may transfer data outside the UK/EEA under the providers’ approved safeguards. You can decline, or withdraw consent at any time, using the cookie notice shown on your first visit or the "Cookie settings" link in the footer.',
          'Our embedded Google map loads only after you choose to display it, so Google map cookies are not set before then.',
        ] },
      ]}
    />
  )
}

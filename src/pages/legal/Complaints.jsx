import LegalPage from '../../components/LegalPage'
import { PRACTICE } from '../../data/practice'

export default function Complaints() {
  return (
    <LegalPage
      slug="complaints"
      title="Complaints Procedure"
      description="How to raise a concern or complaint about your care at Day Night Dental, Glasgow, and what happens next."
      updated="June 2026"
      intro="We aim to give every patient excellent care and a friendly, professional service. If something has not met your expectations, please tell us. We take all concerns seriously and use them to improve."
      sections={[
        { h: 'How to raise a complaint', body: [
          `You can speak to any member of the team, or contact our Complaints Manager, [Name], by phone on ${PRACTICE.phoneDisplay} or by email at ${PRACTICE.email}. You can also write to us at ${PRACTICE.streetAddress}, ${PRACTICE.locality}, ${PRACTICE.city}, ${PRACTICE.postcode}.`,
          'You can raise a concern on behalf of someone else with their consent.',
        ] },
        { h: 'What happens next', body: [
          'We will acknowledge your complaint within three working days and explain how we will look into it.',
          'We aim to give you a full response within ten working days. If we need longer (for example, to speak to a clinician who is away), we will let you know and keep you updated.',
        ] },
        { h: 'How we handle it', body: ['We will investigate fairly, keep a record, and respond clearly. We will explain what happened, say sorry where we have got something wrong, and set out any changes we will make. Raising a complaint will never affect the care you receive.'] },
        { h: 'If you are not satisfied', body: [
          'If you are not happy with our response, you can ask for it to be reviewed. You can also contact an independent body:',
          'For private dental care: the Dental Complaints Service, 0345 612 0540, dentalcomplaints.org.uk.',
          'For NHS dental care in Scotland: your local NHS Board feedback and complaints team.',
          'You may also contact the General Dental Council, our regulator, at gdc-uk.org.',
        ] },
      ]}
    />
  )
}

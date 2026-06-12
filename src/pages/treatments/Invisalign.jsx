import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<><em>Crowded, crooked, or gappy</em> teeth getting you down?</>),
    body: ["Crooked and crowded teeth aren’t just about looks. They’re harder to clean, which can mean more decay and gum trouble down the line, and gaps can affect how you bite and speak. Many adults assume it’s too late to do anything about it. It isn’t.", "Invisalign straightens teeth discreetly with clear, removable aligners, and we show you the finished result in 3D before you start. Patients come to our Merchant City practice from right across Glasgow to straighten up without anyone noticing."],
    symptoms: ["Crowded or overlapping teeth", "Gaps you’d rather not have", "Teeth that have shifted over the years", "Food forever getting stuck", "Wanting straighter teeth without metal braces"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: 'invisalign',
  side: 'day',
  tag: 'Clear Aligners',
  h1Plain: 'Invisalign',
  procedureType: 'Orthodontics',
  title: (
    <>Invisalign<span style={{ color: 'var(--dn-day)' }}>®</span>, a straighter smile, <em>almost invisibly</em></>
  ),
  lead:
    'A discreet, removable way to straighten your teeth. We plan every case with a 3D digital simulation, so you can see your finished smile before you ever pop in a single aligner.',
  seo: {
    title: 'Invisalign in Glasgow | Clear Aligners, Day Night Dental',
    description:
      'Straighten your teeth discreetly with Invisalign clear aligners at Day Night Dental in Glasgow. 3D digital preview, day and evening appointments.',
  },
  meta: [
    { k: 'Treatment time', v: '6 to 18 months', tone: 'day' },
    { k: 'Visibility', v: 'Near-invisible' },
    { k: 'Finance', v: 'Options available', tone: 'night' },
  ],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Straightening <em>without the wires</em></>),
  overview: [
    'Invisalign uses a series of custom-made, clear aligners that fit snugly over your teeth and nudge them into place a fraction of a millimetre at a time. You move to a new set roughly every one to two weeks, and because they pop out you eat, brush and floss just as you do now.',
    'Most people won’t even notice you’re wearing them. That’s a big part of why Invisalign has become so popular with professionals, couples getting married, and anyone who fancies a straighter smile without a mouthful of metal.',
    'At our Merchant City practice in central Glasgow, every Invisalign plan starts with a consultation and digital scan. We map out the full journey of your teeth on screen, so you can see the end result before you decide anything. Patients come to us from all over Glasgow, from the West End to the Southside, for treatment that fits around a busy life.',
  ],
  facts: [
    { dt: 'Best for', dd: 'Crowding, gaps, mild to moderate bite issues' },
    { dt: 'Appointments', dd: 'Every 6 to 8 weeks, day or evening' },
    { dt: 'Wear time', dd: '20 to 22 hours per day' },
    { dt: 'Aligners', dd: 'Custom-made, clear and removable' },
    { dt: 'Consultation', dd: 'Includes a 3D digital preview' },
  ],
  benefitsHeading: (<>What to expect from <em>your plan</em></>),
  benefits: [
    { title: 'A clear assessment', body: 'A full assessment, photographs and a digital scan, so you can decide with all the facts in front of you.' },
    { title: '3D outcome simulation', body: 'Using a 3D digital plan, you see a preview of your finished smile and a clear timeline before treatment begins.' },
    { title: 'Removable and discreet', body: 'Clear aligners you take out to eat, brush and floss, so treatment fits around your day.' },
    { title: 'Retainers to finish', body: 'We fit retainers at the end to protect all that work and help keep your new smile in place.' },
  ],
  stepsHeading: (<>Your Invisalign journey, <em>step by step</em></>),
  steps: [
    { title: 'Consultation & scan', body: 'We assess your smile and take a quick, comfortable digital 3D scan. No messy impressions.' },
    { title: 'See your new smile', body: 'We walk you through your 3D digital plan and confirm your timeline and fee.' },
    { title: 'Wear your aligners', body: 'Collect your custom aligners and work through each set, with a brief check-in every 6 to 8 weeks.' },
    { title: 'Reveal & protect', body: 'Finish your treatment and we fit retainers to keep your straighter smile right where it should be.' },
  ],
  faqHeading: (<>Invisalign questions, <em>answered</em></>),
  faqs: [
    { q: 'How much does Invisalign cost?', a: 'Invisalign at Day Night Dental is priced for you, with the exact fee confirmed after your consultation. Finance options are available to help spread the cost.' },
    { q: 'How long does treatment take?', a: 'Most cases finish in 6 to 18 months, depending on how much movement is needed. Minor corrections can be done in as little as 3 to 4 months, and your treatment plan gives you a clear timeline before you begin.' },
    { q: 'Is Invisalign painful?', a: 'The aligners are smooth and custom-fitted, so they are far more comfortable than fixed braces. You might feel a little pressure for a day or two each time you move to a new set, which just means the treatment is doing its job.' },
    { q: 'Can I see my results before I commit?', a: 'Yes. Using a 3D digital plan, we show you a preview of your finished smile at your consultation, before you commit to anything.' },
  ],
  related: [
    { slug: 'teeth-whitening', title: 'Teeth Whitening', tag: 'Brighter Smile' },
    { slug: 'cosmetic-dentistry', title: 'Cosmetic Dentistry', tag: 'Smile Design' },
    { slug: 'general-dentistry', title: 'General Dentistry', tag: 'Foundation Care' },
  ],
  cta: {
    heading: (<>Book your<br /><em>Invisalign consultation</em></>),
    sub: 'See your new smile in 3D before you decide. Day and evening appointments, seven days a week.',
  },
}

export default function Invisalign() {
  return <TreatmentPage data={data} />
}

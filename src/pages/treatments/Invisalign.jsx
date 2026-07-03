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
  procedureType: 'MedicalProcedure',
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
    { k: 'Finance', v: 'Finance available', tone: 'night' },
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
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Getting the <em>most from your aligners</em></>),
    intro: 'Invisalign works because you wear it. Here is what to expect day to day and how to keep things on track between visits.',
    phases: [
      { title: 'Wearing your aligners', items: ['Wear each set 20 to 22 hours a day, every day. The result depends on this more than anything else.', 'Move to a new set roughly each week, as we direct.', 'Take them out only to eat and to drink anything other than water.', 'Brush your teeth before popping the aligners back in.', 'Mild pressure for a day or two with each new set is normal and means they are working.', 'A brief lisp at first is common and settles within a few days.'] },
      { title: 'Keeping them clean', items: ['Rinse the aligners whenever you take them out.', 'Clean them with a soft brush and cool water, never hot water, which can warp them.', 'Only water passes your lips while they are in. Tea, coffee and fizzy drinks can stain and damage them.', 'Keep brushing and flossing as normal, so nothing gets trapped against your teeth.'] },
      { title: 'After treatment', items: ['Retainers are worn nightly over the long term to hold your new smile in place.', 'Teeth naturally drift over a lifetime, so retainers are part of keeping the result.', 'A fixed bonded retainer behind the teeth is an option we can talk through if you would rather not rely on a removable one.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to weigh up <em>before you start</em></>),
    body: [
      'The result depends on you wearing the aligners most of the day, every day. If they sit in a drawer, the teeth do not move.',
      'Small tooth-coloured attachments may be bonded onto some teeth to help them move. They are faintly visible up close and are removed at the end of treatment.',
      'Where space is tight, a tiny, conservative amount of enamel may be smoothed between some teeth to let them sit properly. This is known as interproximal reduction, or IPR.',
      'Mild discomfort with each new set and a brief lisp at the start are both normal and settle quickly.',
      'The most complex bite or jaw cases may be better suited to fixed braces. If that is the honest answer for you, we will say so at the consultation.',
      'Retainers are a long-term commitment. Keeping a straight smile means wearing them nightly for the long run.',
    ],
  },
  fees: {
    eyebrow: 'Fees & Finance',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Invisalign is priced for your case, because the cost depends on how much your teeth need to move. We do not quote a one-size figure up front.",
      "After your consultation you get a clear, written treatment plan with the full cost set out, and no obligation to go ahead.",
      "To spread the cost, interest-free finance is available, subject to status, and our team will talk you through it.",
    ],
  },
  faqHeading: (<>Invisalign questions, <em>answered</em></>),
  faqs: [
    { q: 'How much does Invisalign cost?', a: 'Invisalign at Day Night Dental is priced for you, with the exact fee confirmed after your consultation. Finance options are available to help spread the cost.' },
    { q: 'How long does treatment take?', a: 'Most cases finish in 6 to 18 months, depending on how much movement is needed. Minor corrections can be done in as little as 3 to 4 months, and your treatment plan gives you a clear timeline before you begin.' },
    { q: 'Is Invisalign painful?', a: 'The aligners are smooth and custom-fitted, so they are far more comfortable than fixed braces. You might feel a little pressure for a day or two each time you move to a new set, which just means the treatment is doing its job.' },
    { q: 'Can I see my results before I commit?', a: 'Yes. Using a 3D digital plan, we show you a preview of your finished smile at your consultation, before you commit to anything.' },
    { q: 'Am I a suitable candidate for Invisalign?', a: 'Many adults are, especially for crowding, gaps and mild to moderate bite issues. The best way to know is a consultation and scan at our Merchant City clinic, where we assess your teeth and gums and show you on screen what is realistic. If something else would suit you better, we will tell you honestly.' },
    { q: 'How does Invisalign compare with fixed braces?', a: 'Invisalign is clear and removable, so most people will not notice you are wearing it and you take it out to eat, brush and floss. Fixed braces are stuck on for the duration. Aligners suit a lot of cases, but the most complex bite or jaw problems can sometimes be handled better with braces. We will give you a straight answer about which fits your teeth.' },
    { q: 'Will I have to wear a retainer forever?', a: 'In effect, yes, but only at night. Teeth drift over a lifetime, so a nightly retainer is what holds your straighter smile in place long after treatment finishes. A fixed bonded retainer behind the teeth is also an option if you would prefer not to rely on a removable one.' },
    { q: 'Can I eat and drink with the aligners in?', a: 'Take them out to eat, and to drink anything other than water. Tea, coffee and fizzy drinks can stain or damage the aligners and trap sugar against your teeth. Plain water is fine while they are in. Always brush before you put them back.' },
    { q: 'Will Invisalign affect my speech?', a: 'Some people notice a slight lisp for the first day or two while the tongue gets used to the aligners. It settles quickly for almost everyone, and most patients are talking normally well before their next check-in.' },
    { q: 'What are the attachments, and will people see them?', a: 'Attachments are small tooth-coloured bumps bonded onto some teeth to give the aligners something to grip, which helps certain movements. They are shaded to blend in and are only faintly visible up close. They are removed at the end of treatment.' },
    { q: 'Can I whiten my teeth after Invisalign?', a: 'Yes, and a lot of patients do exactly that. With the teeth freshly straightened, whitening is a natural next step to finish things off. We can talk through your options at the practice once your aligners are done.' },
    { q: 'What happens if I lose or break an aligner?', a: 'Let us know as soon as you can. Depending on where you are in the series, we will usually have you wear your previous set or move to the next one while we sort a replacement, so your progress is not lost. With day and evening appointments seven days a week, it is usually easy to get seen quickly.' },
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

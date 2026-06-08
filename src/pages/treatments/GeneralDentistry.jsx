import TreatmentPage from '../../components/TreatmentPage'

const data = {
  ctaPrimaryLabel: 'Book Free Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "general-dentistry",
  side: "day",
  tag: "Foundation Care",
  h1Plain: "General Dentistry",
  procedureType: "Dentistry",
  title: (<>General dentistry, <em>everyday care for teeth that last a lifetime</em></>),
  lead: "Routine check-ups, gentle hygiene visits and natural-looking white fillings. Our general dentistry keeps your whole family's smiles healthy and comfortable, day or night.",
  seo: { title: "General Dentistry in Glasgow | Day & Night Dental", description: "General dentistry at Day & Night Dental in Glasgow: check-ups, hygiene visits, white fillings and children's care. Day and evening appointments, 7 days a week." },
  meta: [{"k": "Check-up time", "v": "30 to 45 minutes", "tone": "day"}, {"k": "Recommended", "v": "Every 6 to 12 months", "tone": ""}, {"k": "All ages", "v": "Children welcome", "tone": "night"}],
  overviewHeading: "The everyday care that keeps smiles healthy",
  overview: ["General dentistry is the foundation of a healthy mouth. It's the regular, preventative work that catches small problems before they turn painful or costly. At Day & Night Dental we pair thorough examinations with a genuinely gentle approach, so every visit feels calm rather than clinical.", "Most patients see us once or twice a year for a check-up and a hygiene appointment, and we're here whenever something doesn't feel right. Your dentist examines your teeth, gums and soft tissues, looks for early signs of decay, and explains anything they find in plain language.", "We're open across the day and into the evening, seven days a week, so fitting routine care around work, school and family life is easy. Need a quick filling, a professional clean or a first dental visit for your child? You'll find a friendly, GDC-regulated team here in Glasgow."],
  facts: [{"dt": "Best for", "dd": "Routine care, prevention and spotting problems early"}, {"dt": "Includes", "dd": "Check-ups, hygiene, fillings, children's dentistry"}, {"dt": "How often", "dd": "Most patients every 6 to 12 months, as advised"}, {"dt": "Pain", "dd": "Check-ups are usually pain-free; fillings done under local anaesthetic"}, {"dt": "Suitable for", "dd": "Adults and children of all ages"}],
  benefitsHeading: "Why patients choose us for everyday care",
  benefits: [{"title": "Prevention first", "body": "Catching decay and gum issues early means most patients avoid bigger, more expensive treatment down the line. Regular check-ups and hygiene visits do the heavy lifting here."}, {"title": "Natural-looking fillings", "body": "We use tooth-coloured white composite fillings that bond to your tooth and blend in. Your repairs stay discreet instead of showing dark metal."}, {"title": "A practice the whole family can use", "body": "From a child's first check-up to lifelong adult care, we look after every age group under one roof here in Glasgow."}, {"title": "Appointments that fit real life", "body": "With day and evening slots across seven days, routine care rarely means time off work or pulling the kids out of school."}],
  stepsHeading: "What to expect at your visit",
  steps: [{"title": "Comprehensive check-up", "body": "Your dentist examines your teeth, gums and soft tissues, takes X-rays where needed, and talks you through any findings honestly."}, {"title": "Hygiene appointment", "body": "Our hygienist removes plaque and tartar, polishes your teeth and shows you simple ways to keep your gums healthy at home."}, {"title": "Any treatment needed", "body": "If you need a filling or other care, we explain your options and costs upfront, then carry out treatment gently under local anaesthetic."}, {"title": "A plan for the future", "body": "We let you know when to come back, usually every six to twelve months, so your care stays preventative rather than reactive."}],
  faqHeading: "General dentistry questions, answered",
  faqs: [{"q": "How much does a check-up or filling cost?", "a": "A routine examination at Day & Night Dental starts from [£X], and white composite fillings from [£X], depending on size and complexity. We always confirm the exact cost before any treatment begins, so there are no surprises. Ask our team for a current price list when you book."}, {"q": "Does a filling hurt?", "a": "For most patients, fillings are comfortable. We numb the area with local anaesthetic first, so you should feel pressure but not pain during treatment. If you're anxious about dental work, just tell us. We're used to nervous patients and we'll take things at your pace."}, {"q": "How often should I have a check-up?", "a": "Most patients benefit from a check-up every six to twelve months, though your dentist will suggest an interval based on your own oral health. Regular visits help catch problems like decay and gum disease early, when they're simpler and cheaper to treat."}, {"q": "Is general dentistry available on the NHS here?", "a": "Day & Night Dental is a private, GDC-regulated practice, so our general dentistry is provided privately rather than on the NHS. That means longer appointments, a wide choice of times across seven days, and care that isn't rushed. Our reception team is happy to explain our fees and any membership options."}, {"q": "Do you see children?", "a": "Yes, we welcome children of all ages and we work hard to make early visits positive and reassuring. Bringing your child along from a young age helps them feel at ease and builds healthy habits for life. We'll keep an eye on developing teeth and advise on prevention as they grow."}],
  related: [{"slug": "cosmetic-dentistry", "title": "Cosmetic Dentistry", "tag": "Smile Design"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your next<br /> <em>check-up or hygiene visit</em></>), sub: "Day and evening appointments, seven days a week in Glasgow." },
}

export default function GeneralDentistry() {
  return <TreatmentPage data={data} />
}

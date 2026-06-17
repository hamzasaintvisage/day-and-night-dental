import TreatmentPage from '../../components/TreatmentPage'

const data = {
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "general-dentistry",
  side: "day",
  tag: "Foundation Care",
  h1Plain: "General Dentistry",
  procedureType: "Dentistry",
  title: (<>General dentistry, <em>everyday care for teeth that last a lifetime</em></>),
  lead: "Routine check-ups, gentle hygiene visits and natural-looking white fillings. Our general dentistry keeps your whole family's smiles healthy and comfortable, day or night.",
  seo: { title: "General Dentistry in Glasgow | Day Night Dental", description: "General dentistry at Day Night Dental in Glasgow: check-ups, hygiene visits, white fillings and children's care. Day and evening appointments, 7 days a week." },
  meta: [{"k": "Check-up time", "v": "30 to 45 minutes", "tone": "day"}, {"k": "Recommended", "v": "Every 6 to 12 months", "tone": ""}, {"k": "All ages", "v": "Children welcome", "tone": "night"}],
  overviewHeading: (<>The everyday care that <em>keeps smiles healthy</em></>),
  overview: ["General dentistry is the foundation of a healthy mouth. It's the regular, preventative work that catches small problems before they turn painful or costly. At Day Night Dental we pair thorough examinations with a genuinely gentle approach, so every visit feels calm rather than clinical.", "Most patients see us once or twice a year for a check-up and a hygiene appointment, and we're here whenever something doesn't feel right. Your dentist examines your teeth, gums and soft tissues, looks for early signs of decay, and explains anything they find in plain language.", "We're open across the day and into the evening, seven days a week, so fitting routine care around work, school and family life is easy. Need a quick filling, a professional clean or a first dental visit for your child? You'll find a friendly, GDC-regulated team here in Glasgow."],
  facts: [{"dt": "Best for", "dd": "Routine care, prevention and spotting problems early"}, {"dt": "Includes", "dd": "Check-ups, hygiene, fillings, children's dentistry"}, {"dt": "How often", "dd": "Most patients every 6 to 12 months, as advised"}, {"dt": "Pain", "dd": "Check-ups are usually pain-free; fillings done under local anaesthetic"}, {"dt": "Suitable for", "dd": "Adults and children of all ages"}],
  benefitsHeading: (<>Why patients choose us for <em>everyday care</em></>),
  benefits: [{"title": "Prevention first", "body": "Catching decay and gum issues early means most patients avoid bigger, more expensive treatment down the line. Regular check-ups and hygiene visits do the heavy lifting here."}, {"title": "Natural-looking fillings", "body": "We use tooth-coloured white composite fillings that bond to your tooth and blend in. Your repairs stay discreet instead of showing dark metal."}, {"title": "A practice the whole family can use", "body": "From a child's first check-up to lifelong adult care, we look after every age group under one roof here in Glasgow."}, {"title": "Appointments that fit real life", "body": "With day and evening slots across seven days, routine care rarely means time off work or pulling the kids out of school."}],
  stepsHeading: (<>What to <em>expect</em> at your visit</>),
  steps: [{"title": "Comprehensive check-up", "body": "Your dentist examines your teeth, gums and soft tissues, takes X-rays where needed, and talks you through any findings honestly."}, {"title": "Hygiene appointment", "body": "Our hygienist removes plaque and tartar, polishes your teeth and shows you simple ways to keep your gums healthy at home."}, {"title": "Any treatment needed", "body": "If you need a filling or other care, we explain your options and costs upfront, then carry out treatment gently under local anaesthetic."}, {"title": "A plan for the future", "body": "We let you know when to come back, usually every six to twelve months, so your care stays preventative rather than reactive."}],
  types: {
    eyebrow: 'Our Treatments',
    heading: (<>Everything we do, <em>under one roof</em></>),
    intro: "Explore our general dentistry treatments. Tap any card for the full details. Day and evening appointments, seven days a week, in Merchant City, central Glasgow.",
    items: [
      { icon: 'tooth', title: 'White fillings', body: 'Tooth-coloured fillings that repair decay, chips and cracks, or replace old dark amalgam. Bonded, shade-matched and usually done in one visit.', slug: 'white-fillings' },
      { icon: 'shield', title: 'Root canal treatment', body: 'A painful, infected tooth does not always have to come out. Root canal removes the damaged nerve, cleans and seals the tooth, and saves it.', slug: 'root-canal-treatment' },
      { icon: 'sparkle', title: 'Dental hygiene', body: 'Professional cleaning to keep your gums healthy and your smile fresh. Scale and polish and stain removal, with home-care advice.', slug: 'dental-hygiene' },
      { icon: 'bolt', title: 'Tooth extraction', body: 'When a tooth cannot be saved, taking it out relieves the pain and removes the infection. Simple or surgical, under local anaesthetic, with clear aftercare.', slug: 'tooth-extraction' },
      { icon: 'smile', title: 'Dental crowns', body: 'A custom cap that covers and protects a damaged, weak or root-treated tooth, bringing back its shape and strength.', slug: 'dental-crowns' },
      { icon: 'gap', title: 'Dental bridges', body: 'Replace one or a few missing teeth with a fixed bridge anchored to the teeth either side, or a gentler bonded wing. Weighed honestly against an implant or denture.', slug: 'dental-bridges' },
      { icon: 'denture', title: 'Dentures', body: 'Removable replacements for missing teeth, full or partial, custom made for eating, speech and confidence.', slug: 'dentures' },
      { icon: 'rise', title: "Children's dentistry", body: 'Gentle, unhurried dental care for children. From first visits and check-ups to fluoride, sealants and friendly prevention advice.', slug: 'childrens-dentistry' },
      { icon: 'pulse', title: 'Gum disease treatment', body: 'Bleeding or sore gums? Gum disease is common and treatable when caught in time. We clean below the gumline and sort out your home routine.', slug: 'gum-disease-treatment' },
      { icon: 'clipboard', title: 'Dental check-ups', body: 'Routine check-ups to keep your teeth and gums healthy and catch problems early, including a mouth-cancer check and a clear plan.', slug: 'dental-check-ups' },
      { icon: 'align', title: 'Inlays and onlays', body: 'A strong, tooth-coloured repair for a back tooth that is too damaged for a filling but does not need a full crown. Made to fit and bonded in place.', slug: 'inlays-onlays' },
      { icon: 'heart', title: 'Nervous patients', body: 'Scared of the dentist? You will not be judged. We go at your pace, explain every step, and agree a signal to stop whenever you need.', slug: 'nervous-patients' },
    ],
  },
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Everyday care <em>between your visits</em></>),
    intro: "Most of what keeps your mouth healthy happens at home, in the gaps between appointments. Here is the simple version of what helps.",
    phases: [
      { title: 'Between your visits', items: ['Brush twice a day, last thing at night and one other time.', 'Clean between your teeth daily with floss or little interdental brushes.', 'Use a fluoride toothpaste and spit, do not rinse, so it keeps working.', 'Go easy on sugary snacking through the day, it is the frequency that does the damage as much as the amount.'] },
      { title: 'After a filling or treatment', items: ['Let any numbness wear off fully before you eat, so you do not bite your cheek or tongue.', 'A little sensitivity to hot and cold afterwards is normal and usually settles within a few days.', 'If your bite feels high or the tooth catches when you close together, call us so we can ease it.'] },
      { title: 'Keeping problems away', items: ['Regular check-ups and hygiene visits catch issues early, while they are still small and simple to sort.', 'The hygienist removes the hardened plaque that brushing at home simply cannot shift.', 'Booking your next visit before you leave is the easiest way to stay on top of it.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>A few things worth <em>knowing</em></>),
    body: [
      "Skipping check-ups lets small, simple-to-fix problems quietly grow into bigger ones that need more involved treatment.",
      "Gum disease is often painless in its early stages, which is exactly why regular visits matter, so we can spot it before you would notice anything yourself.",
      "Prevention is almost always simpler and more comfortable than repair, and it tends to mean fewer appointments over the years, not more.",
      "If you are nervous about coming in, that is genuinely common and you are welcome here. We go at your pace, explain each step, and there is no judgement about how long it has been.",
    ],
  },
  faqHeading: (<>General dentistry questions, <em>answered</em></>),
  faqs: [{"q": "What actually happens at a check-up?", "a": "Your dentist examines your teeth, gums and the soft tissues of your mouth, takes X-rays where they are needed, and checks for early signs of decay, gum disease and anything else worth keeping an eye on. They will talk you through what they find in plain language and agree a simple plan with you. A routine check-up is usually pain-free and takes around thirty to forty-five minutes."}, {"q": "Does a filling hurt?", "a": "For most patients, fillings are comfortable. We numb the area with local anaesthetic first, so you should feel pressure but not pain during treatment. If you're anxious about dental work, just tell us. We're used to nervous patients and we'll take things at your pace."}, {"q": "How often should I come in?", "a": "Most patients benefit from a check-up every six to twelve months, though your dentist will suggest an interval that suits your own mouth. Some people need closer monitoring, others can stretch the gap out. Regular visits help us catch problems like decay and gum disease early, while they are still simple to treat."}, {"q": "Do I need X-rays?", "a": "Not at every visit. X-rays show us things we cannot see by looking, like decay between the teeth or under old fillings and the health of the bone around them. Your dentist will only take them when there is a reason to, and they will explain why before they do."}, {"q": "My gums bleed when I brush, is that serious?", "a": "Bleeding gums are common and they are worth taking seriously, because they are usually an early sign of gum inflammation rather than something to ignore. The good news is that caught early it is very treatable, often with better cleaning at home and a hygiene visit. Come in and let us take a look, and we will sort out a routine that settles it."}, {"q": "I'm nervous about the dentist, can you help?", "a": "Yes, and you are far from alone in feeling that way. Plenty of our patients in Glasgow have put off coming in for years. There is no judgement here about how long it has been. We go slowly, explain every step before we do it, and agree a signal so you can pause things whenever you need to. Many people tell us the first visit back was far easier than they feared."}, {"q": "Do you see children?", "a": "Yes, we welcome children of all ages and we work hard to make early visits positive and reassuring. Bringing your child along from a young age helps them feel at ease and builds healthy habits for life. We'll keep an eye on developing teeth and advise on prevention as they grow."}, {"q": "Can I book a hygiene visit without seeing a dentist first?", "a": "Yes, you can book in with our hygienist directly for a clean and home-care advice. That said, if it has been a while since a dentist looked at your teeth, we would gently suggest a check-up alongside it, so nothing underneath gets missed. Our team can arrange both around the same time if that is easier."}, {"q": "What does preventative care actually mean?", "a": "It means looking after your teeth and gums so that problems are spotted and dealt with early, or stopped from starting at all, rather than waiting until something hurts. In practice that is regular check-ups, hygiene visits, and a good routine at home. It tends to be simpler and more comfortable than fixing things once they have grown."}, {"q": "How do I book around work or family?", "a": "We run day and evening appointments seven days a week from our Merchant City clinic in central Glasgow, so routine care rarely means taking time off or pulling the kids out of school. Get in touch and we will find a slot that fits, whether that is first thing, a lunch break or an evening after work."}],
  related: [{"slug": "cosmetic-dentistry", "title": "Cosmetic Dentistry", "tag": "Smile Design"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your next<br /> <em>check-up or hygiene visit</em></>), sub: "Day and evening appointments, seven days a week in Glasgow." },
}

export default function GeneralDentistry() {
  return <TreatmentPage data={data} />
}

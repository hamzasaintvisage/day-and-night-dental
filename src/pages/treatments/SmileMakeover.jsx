import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Want to change your smile, <em>but not sure where to start</em>?</>),
    body: ["It is fine to come in unsure. Most people who want a smile makeover cannot name the treatment they need, only the things that bother them when they look in the mirror or see a photo. That is our job, not yours.", "We look at your whole face, your teeth, your gums and your bite, then work out the right steps in the right order. You do not need to arrive with a plan. You just need to tell us what you would like to be different."],
    symptoms: ["Teeth that look stained, dull or uneven in photos", "Small chips, gaps or worn edges that catch your eye", "Crowding or crooked teeth you have learned to hide", "Past dental work that no longer matches the rest", "A feeling that your smile does not look like you"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "smile-makeover",
  side: "night",
  tag: "Smile Design",
  h1Plain: "Smile Makeover",
  procedureType: "Dentistry",
  title: (<>A smile makeover is <em>a plan, not a single treatment</em></>),
  lead: "A smile makeover is a plan, not a single treatment. We look at your whole face, work out what is bothering you, and put the right steps in the right order. You see a digital preview before anything starts, so you know roughly where you are heading.",
  seo: { title: "Smile Makeover in Glasgow | Day Night Dental", description: "Plan your smile makeover in Glasgow with a digital preview before we start. Cosmetic and general dentistry, day and evening appointments, seven days a week." },
  meta: [{"k": "What it is", "v": "A combination plan", "tone": "day"}, {"k": "Preview", "v": "Digital mock-up first", "tone": ""}, {"k": "Health", "v": "Treated before cosmetic work", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Designed <em>around you</em>, step by step</>),
  overview: ["A smile makeover combines two or more cosmetic treatments into one plan built around your face and your goals. For some people that is whitening and a little bonding. For others it is straightening first with clear aligners, then whitening, then veneers. There is no fixed recipe. We design it around you.", "We are based in Merchant City in central Glasgow, a short walk from the main shopping streets and easy to reach from across the city. People come to us from all over Glasgow because the planning matters more than the postcode. A good makeover starts with a proper look at your teeth, your gums, your bite and how your smile sits with your lips and face. We do that before we talk about any treatment.", "We also know that 'I want to change my smile' can feel like a big, vague thing to say out loud. It is fine to come in unsure. You do not need to know what you want. That is our job. We see you, listen, take some records, and show you options. Because we run day and evening appointments seven days a week, you can plan the whole thing around work and life rather than the other way round."],
  facts: [{"dt": "What it is", "dd": "A combination plan, sequenced over time. It is not one appointment."}, {"dt": "Usual order", "dd": "When straightening is needed: align first, then whiten, then bond or veneer."}, {"dt": "Digital preview", "dd": "You see a mock-up before we commit to any permanent work."}, {"dt": "Timelines", "dd": "They vary by case, from shorter whitening or bonding plans to longer aligner-led ones. We discuss yours individually at planning."}, {"dt": "Health first", "dd": "Any decay or gum problems are treated before cosmetic work begins."}, {"dt": "Reversible or not", "dd": "Some steps are reversible, like whitening and bonding. Some prepare the tooth, like porcelain veneers. We flag which is which."}, {"dt": "Appointments", "dd": "Day and evening, seven days a week, in Merchant City, central Glasgow."}],
  benefitsHeading: (<>Why a planned <em>makeover</em> works</>),
  benefits: [
    { title: 'A plan built around your face', body: 'We design the makeover around your teeth, gums, bite and how your smile sits with your lips. Two people wanting a nicer smile can end up with very different steps. Yours is tailored to you.' },
    { title: 'See it before we start', body: 'We create a digital preview of the proposed result so you can see the shape and proportions before any permanent work. You can ask us to adjust it until you are happy.' },
    { title: 'Honest about trade-offs', body: 'We tell you which steps are reversible and which prepare the tooth. We are straight about what each option can and cannot do, and where one would be the wrong call.' },
    { title: 'Health comes first', body: 'If there is decay or gum disease, we treat that before cosmetic work. Cosmetic work on an unhealthy mouth does not last, so we sort the foundation first.' },
    { title: 'Planned around your life', body: 'Day and evening appointments seven days a week at our Merchant City practice mean you can fit the steps around work rather than the other way round.' },
  ],
  stepsHeading: (<>Your <em>makeover</em> journey</>),
  steps: [{"title": "Consultation", "body": "We talk about what bothers you and what you are hoping for. No pressure, and no jargon you do not ask for."}, {"title": "Assessment and records", "body": "Photos, scans and a look at your teeth, gums and bite. This tells us what is realistic and what needs sorting first."}, {"title": "Digital preview", "body": "We design a mock-up of the proposed result so you can see the shape and proportions before any permanent work. You can ask us to change it."}, {"title": "Foundation first", "body": "Any decay, gum issues or bite problems are treated before cosmetic steps begin."}, {"title": "Treatment in sequence", "body": "Usually straighten, then whiten, then bond or veneer. Each step is timed so the next one lands on a solid base."}, {"title": "Final result and review", "body": "We check the finish, sort any adjustments, and book follow-ups to keep things settled."}],
  comparison: {
    eyebrow: "Bonding vs veneers",
    heading: (<>Which step <em>suits you</em></>),
    intro: "A common question once people see their preview. Here is the honest version. Neither is better than the other. They do different jobs, and we will tell you which fits your case and why.",
    attribute: "Feature",
    columns: [
      { name: "Composite bonding", feat: false },
      { name: "Porcelain veneers", feat: false },
    ],
    rows: [
      { label: "What it is", values: ["Tooth-coloured material shaped onto the tooth", "Thin porcelain shells made in a lab and fitted to the tooth"] },
      { label: "Tooth preparation", values: ["Little to none in most cases", "Some enamel usually removed"] },
      { label: "Reversible", values: ["Often yes", "No"] },
      { label: "Best for", values: ["Small chips, gaps and reshaping", "Larger changes to shape and shade"] },
      { label: "Visits", values: ["Often one", "Usually two or more"] },
      { label: "Staining over time", values: ["Can stain and may need refreshing", "Resists staining, though results vary"] },
      { label: "Longevity", values: ["Several years with care, may need touch-ups", "Hard-wearing with care, but the preparation is permanent"] },
    ],
    note: "We will tell you which fits your case and why, and where one would be the wrong call.",
  },
  aftercare: {
    eyebrow: "Aftercare",
    heading: (<>Caring for your smile, <em>phase by phase</em></>),
    intro: "Looking after the result is part of the plan. Here is what to expect at each stage.",
    phases: [
      { title: "First days and weeks", items: ["Some treatments cause mild, short-lived sensitivity. It settles.", "Stick to the specific care advice for whatever you had done.", "Go easy on very hot, very cold and heavily staining things at first."] },
      { title: "Ongoing", items: ["Brush twice a day and clean between your teeth. Restorations need the same care as natural teeth, sometimes more.", "Keep up check-ups and hygienist visits so small issues are caught early.", "Limiting staining foods and drinks such as tea, coffee and red wine helps keep results bright, and avoiding smoking makes a noticeable difference to staining.", "Do not bite nails, pens or packaging. If you grind your teeth, ask us about a night guard."] },
      { title: "Longer term", items: ["Whitening can be topped up over time.", "Composite bonding may need refreshing as it ages or picks up stain.", "How long results last depends on your hygiene, your habits and the treatments chosen. We are straight with you about this at planning, not after."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: (<>What to <em>weigh up</em> before you start</>),
    body: [
      "A makeover is a tailored plan. Two people wanting a nicer smile can end up with very different timelines and steps.",
      "Health comes before looks. If there is decay or gum disease, that is treated first. Cosmetic work on an unhealthy mouth does not last.",
      "Not everyone is a candidate for every option. We assess this at the consultation and tell you plainly.",
      "Some steps are permanent. Porcelain veneers involve preparing the tooth, which cannot be undone. The digital preview exists so you decide before that point.",
      "Timelines vary by case. We discuss yours individually at planning so you know what to expect.",
      "Most steps are minimally invasive and comfortable, usually with local anaesthetic where needed. Whitening, bonding and reshaping are generally pain-free.",
      "We aim for results that suit your face, not over-white or over-bulky teeth, which tend to look obvious. Natural is the goal.",
    ],
  },
  faqHeading: (<>Smile makeover questions, <em>answered</em></>),
  faqs: [{"q": "What exactly is a smile makeover?", "a": "It is a personalised plan that combines two or more cosmetic treatments to change how your smile looks and often how it works. It is not a single procedure. We design it around your teeth, your bite and your face."}, {"q": "What treatments are included?", "a": "Whatever fits your case. Commonly some mix of clear aligners, whitening, composite bonding and porcelain veneers. Many plans use two or three of these, not all."}, {"q": "Can I see what my new smile will look like first?", "a": "Yes. We create a digital preview so you can see the proposed shape and proportions before any permanent work starts. You can ask us to adjust it until you are happy."}, {"q": "How long does it take?", "a": "It depends on the steps in your plan. Some plans are shorter, and ones that involve straightening teeth first take longer. Timelines vary by case, so we give you a realistic, individual timeline at planning."}, {"q": "Is it painful?", "a": "Most of it is comfortable. Whitening, bonding and reshaping are generally pain-free. Where we do anything that could be sensitive, we use local anaesthetic. Mild sensitivity afterwards is common and short-lived."}, {"q": "Who is suitable?", "a": "Most people, as long as the underlying teeth and gums are healthy or can be made healthy first. We check this at the consultation. If something needs treating before cosmetic work, we will say so."}, {"q": "How long do the results last?", "a": "It varies by treatment and by lifestyle. Whitening fades and can be topped up. Bonding may need refreshing. Porcelain is more hard-wearing. Hygiene, diet and habits all matter, and we talk this through at planning."}, {"q": "Can it be done quickly for a wedding or event?", "a": "Sometimes, if the plan is whitening or bonding led. If straightening is part of the plan, that needs more time, so come in early. Tell us the date at the consultation and we will be honest about what is realistic."}],
  related: [{"slug": "composite-bonding", "title": "Composite Bonding", "tag": "Smile Design"}, {"slug": "porcelain-veneers", "title": "Porcelain Veneers", "tag": "Smile Design"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}],
  cta: { heading: (<>Plan your<br /> <em>smile makeover</em></>), sub: "See a digital preview before any permanent work begins. Day and evening appointments, seven days a week." },
}

export default function SmileMakeover() {
  return <TreatmentPage data={data} />
}

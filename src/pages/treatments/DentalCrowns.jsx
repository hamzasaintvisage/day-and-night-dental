import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>A tooth that is <em>cracked or crumbling</em>?</>),
    body: ["A heavily filled, worn or cracked tooth can feel fragile every time you bite. You start chewing on the other side, wince at hot or cold, and worry it will give way at the wrong moment. A crown caps the whole tooth so it can take the load again.", "From our Merchant City practice in central Glasgow, we check the tooth, talk through what it needs and tell you honestly whether a crown is right or whether something smaller would do the same job while keeping more of your own tooth."],
    symptoms: ["A tooth that is cracked or has broken away", "A large old filling you keep favouring", "A tooth that has had root canal treatment", "Avoiding chewing on one side", "A worn-down tooth that has lost its shape"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "dental-crowns",
  side: "day",
  tag: "Tooth Repair",
  h1Plain: "Dental Crowns",
  procedureType: "MedicalProcedure",
  title: (<>Dental crowns, to cover and <em>rebuild a tooth</em></>),
  lead: "A dental crown is a custom cap that fits over a tooth to cover it, protect it and bring back its shape and strength. If you have a tooth that is cracked, heavily filled, worn down or has had root canal treatment, a crown can hold it together and let you use it normally again.",
  seo: { title: "Dental Crowns in Glasgow | Day Night Dental", description: "Dental crowns in Glasgow to protect and rebuild damaged or root-treated teeth. Day Night Dental offers day and evening appointments, seven days a week." },
  meta: [{"k": "Covers", "v": "Whole visible tooth", "tone": "day"}, {"k": "Visits", "v": "Usually two", "tone": ""}, {"k": "Materials", "v": "Ceramic or metal", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>A tailored cover for a <em>weak tooth</em></>),
  overview: ["Think of a crown as a tailored cover that sits over the whole visible part of your tooth. Once it is bonded in place, it takes the load when you bite and chew, so a weak or broken tooth is less likely to split further. A well-made crown also matches the look of your other teeth, so it does its job quietly without standing out.", "At Day Night Dental in Merchant City, central Glasgow, we fit crowns for people across the city, from those who have cracked a back tooth on something hard to those finishing off root canal treatment. We will check the tooth, talk through what it needs and be straight with you about whether a crown is the right call or whether something smaller, like a filling or onlay, would do the same work while keeping more of your own tooth.", "We know dental visits put a lot of people on edge. That is partly why we run day and evening appointments seven days a week. If you work long hours, have a busy week, or simply want to come in outside the usual nine-to-five, there is room to be seen at a time that suits you, somewhere central and easy to reach in Glasgow."],
  facts: [{"dt": "What a crown covers", "dd": "A crown covers the entire visible part of a tooth, unlike a filling, which fills a hole, or a veneer, which covers only the front face."}, {"dt": "Materials", "dd": "Crowns are made from materials such as all-ceramic (porcelain or zirconia), porcelain-fused-to-metal, and metal, each with its own balance of strength and appearance."}, {"dt": "Number of visits", "dd": "Crowns are usually fitted over a series of visits: one to shape the tooth and take a scan or impression, and another to fit the finished crown made by a dental laboratory."}, {"dt": "Temporary crown", "dd": "You wear a temporary crown between visits while the lab makes the permanent one."}, {"dt": "Still needs cleaning", "dd": "A crown protects the tooth, but the natural tooth and gum underneath still need cleaning and can still decay if neglected."}, {"dt": "Where crowns are used", "dd": "Crowns are used on natural teeth, on top of dental implants, and as the anchors that hold a bridge in place."}],
  benefitsHeading: (<>Why patients choose a <em>crown</em></>),
  benefits: [{"title": "Holds a weak tooth together", "body": "Holds a cracked, weak or heavily filled tooth together so you can bite and chew without worrying it will break."}, {"title": "Protects a root-treated tooth", "body": "Protects a root-treated tooth, which tends to be more brittle and prone to fracture."}, {"title": "Restores shape and size", "body": "Restores the natural shape and size of a tooth that has worn down or broken away."}, {"title": "Blends with your smile", "body": "Can be colour-matched to blend in with the teeth around it, especially on front teeth."}, {"title": "Helps you keep the tooth", "body": "Often lets you keep a tooth that might otherwise be lost."}],
  stepsHeading: (<>Your <em>crown</em> journey</>),
  steps: [{"title": "Assessment", "body": "We examine the tooth, usually take an X-ray, and check there is enough healthy tooth to support a crown. If the tooth is badly broken or root-treated, it may first need a build-up, sometimes with a post, to give the crown a solid base."}, {"title": "Shaping the tooth", "body": "Under local anaesthetic, the tooth is reshaped to make room for the crown. This step removes some healthy tooth structure and cannot be undone, so we only do it once we have agreed it is the right plan."}, {"title": "Scan or impression", "body": "We take a digital scan or a mould of the prepared tooth and the teeth around it. This is what the laboratory uses to make a crown that fits your bite."}, {"title": "Temporary crown", "body": "A temporary crown is fitted to protect the tooth and keep things comfortable while the permanent one is being made."}, {"title": "Fitting and bonding", "body": "At the next visit, we remove the temporary, check the new crown for fit, bite and colour, then bond it firmly in place. We will make small adjustments so it feels right when you bite together."}],
  aftercare: {
    eyebrow: "Caring for your crown",
    heading: (<>Looking after your <em>crown</em></>),
    intro: "A little care, especially in the first few days, helps your crown settle in and last as long as possible.",
    phases: [
      { title: "First 24 hours", items: ["Go easy on the tooth while the cement reaches full strength. Where you can, chew on the other side at first.", "Avoid hard, sticky and chewy foods such as toffee, hard sweets and ice."] },
      { title: "First few days", items: ["Ease back to your normal diet as the tooth settles.", "A little sensitivity or an odd feeling when you bite is normal and usually fades. If it lingers, the bite feels high, or anything hurts, get in touch so we can check it."] },
      { title: "Long term", items: ["Brush twice a day with a soft brush and fluoride toothpaste, paying attention to the gum line around the crown.", "Clean between your teeth daily with floss or interdental brushes. The margin where the crown meets the tooth still needs cleaning to keep decay away.", "If you grind or clench your teeth, ask us about a nightguard to protect the crown.", "Do not use your teeth to bite pens, nails or ice, and keep up with regular check-ups."] },
      { title: "With a temporary crown", items: ["Treat it gently, as it is more fragile than the final crown.", "When flossing, slide the floss out sideways rather than pulling straight up, so you do not lift the temporary off."] },
    ],
  },
  risks: {
    eyebrow: "Worth knowing",
    heading: (<>Honest about the <em>trade-offs</em></>),
    body: [
      "Fitting a crown means removing some healthy tooth, and that cannot be reversed. For smaller damage, a filling, inlay or onlay may protect the tooth while keeping more of it. We will tell you if one of those is a better fit for your situation.",
      "A crown is not permanent. Over the years it can wear, chip, loosen or need replacing, and the tooth underneath can still decay if it is not kept clean.",
      "Material choice is a trade-off. Porcelain and zirconia tend to suit front teeth where appearance matters most, while stronger options can be a sensible choice for back teeth that take heavy chewing. We will talk you through what makes sense for the tooth in question.",
      "A crown cannot be whitened later. If you are thinking about whitening your other teeth, it is best to do that first so the crown can be matched to the brighter shade.",
      "Some teeth are not ready for a crown straight away. Active gum disease, a lot of untreated decay, or heavy grinding may need sorting out first so the crown lasts.",
    ],
  },
  faqHeading: (<>Dental crown questions, <em>answered</em></>),
  faqs: [{"q": "Does getting a crown hurt?", "a": "The tooth is numbed with local anaesthetic while it is shaped, so you should not feel pain during the appointment. Afterwards the tooth may be a little tender or sensitive for a few days. That usually settles, and over-the-counter pain relief is enough if you need it."}, {"q": "How long does it take to get a crown?", "a": "A crown is usually fitted over more than one visit, with time in between while the laboratory makes the permanent crown. Each appointment generally takes around an hour, though this depends on the tooth."}, {"q": "Will my crown look natural?", "a": "On front teeth especially, we match the crown to the colour, shape and translucency of the teeth around it, so it blends in. We check the look with you before it is bonded so you are happy with it."}, {"q": "How long do dental crowns last?", "a": "It varies from person to person and depends on the tooth, the material and how well it is cared for. Good cleaning and regular check-ups help a crown last. Grinding, biting hard objects and poor cleaning around the margin all shorten its life."}, {"q": "Is a crown better than a large filling?", "a": "It depends on how much tooth is left. When a tooth is heavily filled or cracked, a big filling can leave it weak and likely to break, and a crown holds it together better. For smaller damage, a filling or onlay may be the more conservative choice. We will be honest about which suits your tooth."}, {"q": "Can I have a crown after root canal treatment?", "a": "Yes, and it is often a good idea. A root-treated tooth tends to be more brittle, so a crown protects it and lowers the chance of it fracturing. The tooth may need a build-up first to give the crown a firm base."}, {"q": "What should I do if my crown feels loose or comes off?", "a": "Keep the crown if it comes off, avoid chewing on that side, and contact us so we can see you. Do not try to glue it back yourself. With our day and evening appointments seven days a week, we can usually get you in quickly to sort it out."}],
  related: [{"slug": "root-canal-treatment", "title": "Root Canal Treatment", "tag": "Saving Teeth"}, {"slug": "dental-bridges", "title": "Dental Bridges", "tag": "Replacing Teeth"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}],
  cta: { heading: (<>Book your<br /> <em>dental crown consultation</em></>), sub: "We will check the tooth and be straight about what it needs. Day and evening appointments, seven days a week." },
}

export default function DentalCrowns() {
  return <TreatmentPage data={data} />
}

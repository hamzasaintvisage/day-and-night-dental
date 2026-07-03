import { Link } from 'react-router-dom'
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
  procedureType: "MedicalProcedure",
  title: (<>A smile makeover is <em>a plan, not a single treatment</em></>),
  lead: "Rather than one procedure, a smile makeover is a sequence. We look at your whole face, listen to what actually bothers you, then put the right steps in the right order, so the finished smile suits you rather than a template.",
  seo: { title: "Smile Makeover in Glasgow | Day Night Dental", description: "Plan your smile makeover in Glasgow. Aligners, whitening, bonding, veneers, implants or bridges combined into one plan, in the right order, built around your face." },
  meta: [{"k": "What it is", "v": "A combination plan", "tone": "day"}, {"k": "Plan", "v": "Written and agreed up front", "tone": ""}, {"k": "Health", "v": "Treated before cosmetic work", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Designed <em>around you</em>, step by step</>),
  overview: [(<>A smile makeover combines two or more cosmetic treatments into one plan built around your face and your goals. For some people that is whitening and a little bonding. For others it is straightening first with <Link to="/treatments/invisalign/">clear aligners like Invisalign</Link>, then whitening, then veneers. And if a missing tooth is part of the picture, an <Link to="/treatments/dental-implants/">implant</Link> or a <Link to="/treatments/dental-bridges/">bridge</Link> can be sequenced into the same plan, so the gap is dealt with rather than designed around. There is no fixed recipe. We design it around you.</>), "The planning happens at 80 Hutcheson St in Merchant City, and with Argyle Street and Queen Street stations and the St Enoch subway all a few minutes away on foot, the run of visits a makeover involves is easy to keep up alongside work. People come to us from all over Glasgow because the planning matters more than the postcode. A good makeover starts with a proper look at your teeth, your gums, your bite and how your smile sits with your lips and face. We do that before we talk about any treatment.", "We also know that 'I want to change my smile' can feel like a big, vague thing to say out loud. Plenty of people arrive without a clear ask, and that is a perfectly good starting point. We listen, take some records and show you options, then you decide at your own pace, with appointments arranged around work and life rather than the other way round."],
  facts: [{"dt": "What it is", "dd": "A combination plan, sequenced over time. It is not one appointment."}, {"dt": "Usual order", "dd": "When straightening is needed: align first, then whiten, then bond or veneer."}, {"dt": "Missing teeth", "dd": "Implants or bridges can be woven into the same plan as the cosmetic steps."}, {"dt": "Timelines", "dd": "Shorter for whitening or bonding led plans, longer when straightening comes first. Yours is mapped out at the consultation."}, {"dt": "Health first", "dd": "Any decay or gum problems are treated before cosmetic work begins."}, {"dt": "Reversible or not", "dd": "Some steps are reversible, like whitening and bonding. Some prepare the tooth, like porcelain veneers. We flag which is which."}, {"dt": "NHS or private", "dd": "Purely cosmetic treatment, including smile makeovers, is private-only. NHS cover applies to dental health treatment."}],
  benefitsHeading: (<>Why a planned <em>makeover</em> works</>),
  benefits: [
    { title: 'A plan built around your face', body: 'We design the makeover around your teeth, gums, bite and how your smile sits with your lips. Two people wanting a nicer smile can end up with very different steps. Yours is tailored to you.' },
    { title: 'One plan, agreed up front', body: 'Everything is set out in writing before treatment starts: the steps, the order, and what each involves. You know exactly what you are signing up to from day one.' },
    { title: 'Clear about trade-offs', body: 'We tell you which steps are reversible and which permanently prepare the tooth, and what each option can and cannot do, so you choose with the full picture in front of you.' },
    { title: 'Health comes first', body: (<>If there is decay or <Link to="/treatments/gum-disease-treatment/">gum disease</Link>, we treat that before cosmetic work. Cosmetic work on an unhealthy mouth does not last, so we sort the foundation first.</>) },
    { title: 'Planned around your life', body: 'The steps in a makeover are spread over weeks or months, so we book them at a pace that suits your diary. The plan should slot into your routine, not take it over.' },
  ],
  stepsHeading: (<>Your <em>makeover</em> journey</>),
  steps: [{"title": "Consultation", "body": "We talk about what bothers you and what you are hoping for. No pressure, and no jargon you do not ask for."}, {"title": "Assessment and records", "body": "Photos, scans and a look at your teeth, gums and bite. This tells us what is realistic and what needs sorting first."}, {"title": "Preview and plan", "body": "In many cases we can produce a digital preview, a simulation of your expected result, so you can react to the proposed shape before committing to any permanent work. Where a preview is less useful, we walk you through the plan tooth by tooth instead."}, {"title": "Foundation first", "body": "Any decay, gum issues or bite problems are treated before cosmetic steps begin."}, {"title": "Treatment in sequence", "body": "Usually straighten, then whiten, then bond or veneer. Each step is timed so the next one lands on a solid base."}, {"title": "Final result and review", "body": "We check the finish, sort any adjustments, and book follow-ups to keep things settled."}],
  comparison: {
    eyebrow: "Bonding vs veneers",
    heading: (<>Which step <em>suits you</em></>),
    intro: "A question that comes up in almost every planning conversation. Neither is better than the other. They do different jobs, and we will tell you which fits your case, and where one would be the wrong call.",
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
      { label: "Longevity", values: ["Commonly around 3 to 5 years with care, often longer, though touch-ups may be needed", "Often around 10 years with care, but the preparation is permanent"] },
    ],
    note: "Many plans use both, bonding on some teeth and veneers on others, depending on what each tooth needs.",
  },
  aftercare: {
    eyebrow: "Aftercare",
    heading: (<>Caring for your smile, <em>phase by phase</em></>),
    intro: "Looking after the result is part of the plan. Here is what to expect at each stage.",
    phases: [
      { title: "First days and weeks", items: ["Some treatments cause mild, short-lived sensitivity. It settles.", "Stick to the specific care advice for whatever you had done.", "Go easy on very hot, very cold and heavily staining things at first."] },
      { title: "Ongoing", items: ["Brush twice a day and clean between your teeth. Restorations need the same care as natural teeth, sometimes more.", (<>Keep up check-ups and <Link to="/treatments/dental-hygiene/">hygienist visits</Link> so small issues are caught early.</>), "Limiting staining foods and drinks such as tea, coffee and red wine helps keep results bright, and avoiding smoking makes a noticeable difference to staining.", "Do not bite nails, pens or packaging. If you grind your teeth, ask us about a night guard.", (<>If bonding or a veneer ever chips further down the line, keep any piece that comes off and get in touch. Our <Link to="/treatments/emergency-dentist/">emergency dentist</Link> service exists so repairs get done, not lived with.</>)] },
      { title: "Longer term", items: ["Whitening can be topped up over time.", "Composite bonding may need refreshing as it ages or picks up stain.", "How long results last depends on your hygiene, your habits and the treatments chosen. We set those expectations at planning, not after the work is done."] },
    ],
  },
  risks: {
    eyebrow: "Considerations",
    heading: (<>What to <em>weigh up</em> before you start</>),
    body: [
      "A makeover is a tailored plan, so your steps and timeline may look nothing like someone else's, even for a similar wish list.",
      "Health comes before looks. Decay or gum disease is treated first, because cosmetic work only lasts on a sound foundation.",
      "Not everyone is a candidate for every option. We assess this at the consultation and explain why if an option is off the table.",
      "Some steps are permanent. Porcelain veneers involve preparing the tooth, which cannot be undone. Nothing like that happens until you have seen the plan and agreed to it.",
      "Whitening within a makeover is adult-only treatment. Tooth whitening is not permitted for under-18s.",
      "Most steps are minimally invasive and comfortable, usually with local anaesthetic where needed. Whitening, bonding and reshaping are generally pain-free.",
      "We aim for results that suit your face, not over-white or over-bulky teeth, which tend to look obvious. Natural is the goal.",
    ],
  },
  faqHeading: (<>Smile makeover questions, <em>answered</em></>),
  faqs: [{"q": "What exactly is a smile makeover?", "a": "It is a personalised plan that combines two or more cosmetic treatments to change how your smile looks and often how it works. It is not a single procedure. We design it around your teeth, your bite and your face."}, {"q": "What treatments are included?", "a": "Whatever fits your case. Commonly some mix of clear aligners, whitening, composite bonding and porcelain veneers, and where a tooth is missing, an implant or a bridge can be built into the plan too. Most plans use two or three of these, not all of them."}, {"q": "Can I see what my new smile will look like first?", "a": "In many cases, yes. We can often produce a digital preview of the proposed shape and proportions before any permanent work starts, and you can ask for adjustments until it looks right. It is a guide to shape and proportion rather than a photograph of the final result, and not every plan needs one."}, {"q": "How long does it take?", "a": "It depends on the steps in your plan. Some plans are shorter, and ones that involve straightening teeth first take longer. Timelines vary by case, so we give you a realistic, individual timeline at planning."}, {"q": "Is it painful?", "a": "Most of it is comfortable. Whitening, bonding and reshaping are generally pain-free. Where we do anything that could be sensitive, we use local anaesthetic. Mild sensitivity afterwards is common and short-lived."}, {"q": "Who is suitable?", "a": "Most people, as long as the underlying teeth and gums are healthy or can be made healthy first. We check this at the consultation. If something needs treating before cosmetic work, we will say so."}, {"q": "How long do the results last?", "a": "It varies by treatment. Composite bonding commonly lasts around 3 to 5 years and often longer with care, though it may need refreshing as it picks up stain. Porcelain veneers often last around 10 years. Whitening fades gradually and can be topped up. Hygiene, diet and habits such as grinding all shift those numbers, and we talk them through at planning."}, {"q": "How much does a smile makeover cost?", "a": "Every mouth is different, so the honest answer is that it depends on you: how many teeth are involved, which treatments the plan combines, whether straightening comes first, and the materials used. At your consultation the dentist will go through your options and the cost of each, and you will get a written, itemised quote before anything is agreed. Nothing goes ahead until you are happy."}, {"q": "Can I get a smile makeover on the NHS?", "a": "No. Purely cosmetic treatment, which includes bonding, veneers, whitening and smile makeovers, is private-only. NHS dental examinations are free for everyone in Scotland, and NHS dental treatment is free if you are under 26, pregnant or have given birth in the last 12 months, or qualify for a low-income exemption, but that cover applies to treatment your dental health needs rather than cosmetic work."}, {"q": "Can it be done quickly for a wedding or event?", "a": "Sometimes, if the plan is whitening or bonding led. If straightening is part of the plan, that needs more time, so come in early. Tell us the date at the consultation and we will give you a realistic answer rather than a hopeful one."}, {"q": "What if bonding or a veneer chips during my makeover, out of hours?", "a": "Keep any piece that has come off, avoid chewing on that side, and if a sharp edge is catching your tongue or cheek, a little sugar-free chewing gum or orthodontic wax over it will protect you until you are seen. Then call us. We are open day and night, every day, so you can speak to us and be seen whenever it happens rather than waiting for the morning."}],
  related: [{"slug": "invisalign", "title": "Invisalign", "tag": "Clear Aligners"}, {"slug": "composite-bonding", "title": "Composite Bonding", "tag": "Smile Design"}, {"slug": "porcelain-veneers", "title": "Porcelain Veneers", "tag": "Smile Design"}],
  cta: { heading: (<>Plan your<br /> <em>smile makeover</em></>), sub: "One written plan, agreed before anything starts. Open day and night, every day." },
}

export default function SmileMakeover() {
  return <TreatmentPage data={data} />
}

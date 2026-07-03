import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Chips, gaps or <em>worn front teeth</em> getting you down?</>),
    body: ["Small flaws on the teeth that show when you smile have a way of catching your eye every time you look in the mirror. A chipped edge, a little gap, a tooth that has worn shorter than its neighbours, none of it is serious, but it can chip away at how confident you feel.", "Composite bonding adds tooth-coloured resin to reshape those teeth by hand, often with no drilling and usually in a single visit. From our Merchant City practice in central Glasgow, we talk you through whether it is the right tool for what is bothering you before we start."],
    symptoms: ["A chipped or jagged edge on a front tooth", "A small gap between your front teeth", "A tooth that has worn shorter over time", "An uneven or slightly irregular smile", "Front teeth that look tired and want freshening up"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "composite-bonding",
  side: "night",
  tag: "Smile Design",
  h1Plain: "Composite Bonding",
  procedureType: "MedicalProcedure",
  title: (<>Composite bonding, reshaping teeth <em>without drilling them down</em></>),
  lead: "Tooth-coloured resin, sculpted by hand to help with chips, gaps, worn edges and tired-looking front teeth. Often no drilling, usually done in a single visit, and largely reversible. Day and evening appointments, seven days a week in Merchant City.",
  seo: { title: "Composite Bonding in Glasgow | Day Night Dental", description: "Composite bonding in Glasgow to help with chips, gaps and worn edges. Tooth-coloured, often no drilling, usually one visit. Day and evening, seven days a week." },
  meta: [{"k": "Visits", "v": "Usually one", "tone": "day"}, {"k": "Drilling", "v": "Often none", "tone": ""}, {"k": "Best for", "v": "Front teeth", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Reshaping a tooth by <em>adding to it</em></>),
  overview: ["Composite bonding is a way of reshaping a tooth without grinding it down. Your dentist applies a soft, tooth-coloured resin, builds it up in thin layers, shapes it by hand and sets it hard with a curing light. It is the same family of material used for white fillings, used here for looks rather than repair. The point is to smooth a chipped edge, close a small gap, lengthen a worn tooth or even out an uneven smile.", "The big draw is how little it asks of your teeth. In most cases there is little or no drilling, often no injection, and very little natural enamel is removed. Because we are adding to the tooth rather than cutting into it, bonding is usually reversible. That matters if you want to test the water before committing to anything more permanent. Most people are in and out in a single appointment, so it suits busy lives. Our Merchant City practice sits in the centre of Glasgow with day and evening slots seven days a week, which helps if you cannot easily take time off.", "Bonding is mainly a front-teeth treatment. It works well for the teeth that show when you smile and talk. It is not built for the heavy grinding load of your back molars. It is also honest about its limits: composite is softer than porcelain, it can stain over time, and edges can chip. We would rather you knew that before you started than felt let down later. We see patients from across Glasgow, from the West End and Southside to the East End and beyond, and the right plan depends on your teeth, your bite and what you actually want to change."],
  facts: [{"dt": "What it is", "dd": "Tooth-coloured resin added to teeth and shaped by hand, then set hard with a light."}, {"dt": "Drilling", "dd": "Often no drilling and frequently no injection needed."}, {"dt": "Visits", "dd": "Usually completed in one visit. Roughly 30 to 60 minutes per tooth."}, {"dt": "Approach", "dd": "Minimally invasive and largely reversible because little or no enamel is removed."}, {"dt": "Best for", "dd": "A cosmetic treatment for front teeth, not for load-bearing back teeth."}, {"dt": "Order matters", "dd": "If you want whiter teeth, the dentist whitens first. Resin will not lighten later."}, {"dt": "Upkeep", "dd": "A maintenance treatment, not a permanent fix. Expect care, the odd polish and occasional repairs."}],
  benefitsHeading: (<>Why patients choose <em>bonding</em></>),
  benefits: [
    { title: 'Gentle on your teeth', body: 'Little or no enamel is removed, so we keep as much of your natural tooth as possible.' },
    { title: 'Often no needles', body: 'Many people have it done with no anaesthetic at all, which suits nervous patients.' },
    { title: 'One visit in most cases', body: 'You can often walk out the same day with the change made.' },
    { title: 'Largely reversible', body: 'Because we add rather than cut, your dentist can usually remove it and return close to where you started.' },
    { title: 'Natural finish', body: 'Layered and polished to blend with the colour and translucency of your own teeth.' },
    { title: 'Fixable', body: 'If an edge chips down the line, it can usually be patched without redoing the whole thing.' }
  ],
  stepsHeading: (<>Your <em>bonding</em> journey</>),
  steps: [{"title": "Consultation and assessment", "body": "We check your teeth and gums, talk through what is bothering you and what you want to change, and give you an honest view of whether bonding is the right tool. If there is decay or gum trouble, we sort the health first."}, {"title": "Whitening first, if your dentist recommends it", "body": "If you want whiter teeth overall and your dentist whitens them first, that happens before any bonding. The resin is matched to your final shade and will not lighten afterwards, so the order matters."}, {"title": "Shade and shape planning", "body": "We pick a colour to match your teeth and agree the shape, length and how many teeth to treat for a balanced look."}, {"title": "Preparing the surface", "body": "The tooth is cleaned and lightly etched so the resin grips well. This usually needs no drilling."}, {"title": "Bonding and layering", "body": "A bonding agent goes on, then the resin is built up in thin layers and sculpted by hand to the agreed shape."}, {"title": "Curing", "body": "Each layer is set hard with a curing light."}, {"title": "Polishing and final tweaks", "body": "We shape, smooth and polish so it blends in, then check your bite and adjust until it feels right."}],
  comparison: {
    eyebrow: 'Compare your options',
    heading: (<>Composite bonding vs <em>porcelain veneers</em></>),
    intro: "Two routes to a similar look. Here is how they differ, and where each one fits.",
    attribute: 'Feature',
    columns: [
      { name: 'Composite bonding', feat: true },
      { name: 'Porcelain veneers' },
    ],
    rows: [
      { label: 'What it is', values: ['Resin added and shaped on the tooth', 'Thin porcelain shells made in a lab and bonded on'] },
      { label: 'Tooth preparation', values: ['Little or no enamel removed', 'Some enamel usually removed'] },
      { label: 'Reversible', values: ['Largely yes', 'Usually not'] },
      { label: 'Visits', values: ['Often one', 'Usually two or more'] },
      { label: 'Anaesthetic', values: ['Often none', 'Often needed'] },
      { label: 'Staining', values: ['More prone to staining over time', 'More stain resistant'] },
      { label: 'Longevity', values: ['Shorter lived, repairable', 'Longer lived, harder to repair'] },
      { label: 'Repairs', values: ['Usually patched chairside', 'Often a full remake'] },
    ],
    note: 'Bonding is the gentler, quicker, more reversible option that you can adjust over time. Porcelain tends to last longer and resist stains better, at the cost of removing more tooth and committing to it. We will tell you which fits your case rather than push one or the other.',
  },
  aftercare: {
    eyebrow: 'Looking after your bonding',
    heading: (<>Looking after your bonding, <em>day one onwards</em></>),
    intro: "A little care keeps bonding looking fresh. Here is what helps, from the first couple of days onward.",
    phases: [
      { title: 'First 48 hours', items: ['Go easy on staining foods and drinks while the surface settles. Coffee, tea, red wine, curry, beetroot and soy sauce are the usual culprits.', 'Avoid smoking, which marks the resin quickly.'] },
      { title: 'Day to day', items: ['Brush twice a day with a soft or electric brush and a non-abrasive toothpaste.', 'Clean between your teeth once a day to keep the edges of the bonding healthy.', 'Do not use your teeth as tools. No biting pen lids, ice, hard sweets or fingernails.', 'After acidic food or drink, wait about 30 minutes before brushing.', 'If you grind or clench at night, wear a night guard. It protects the bonding from a lot of wear.'] },
      { title: 'Over the years', items: ['Keep up regular check-ups and hygiene visits so we can clean, polish and catch small issues early.', 'Expect the odd re-polish or top-up to keep things looking fresh.', 'If an edge chips, come in. It can usually be repaired without starting over.'] },
    ],
  },
  risks: {
    eyebrow: 'The honest bit',
    heading: (<>Honest about the <em>considerations</em></>),
    body: [
      "It does not last forever. Composite is softer than porcelain. With good care many people get several years out of it, sometimes longer, but it is a maintenance treatment rather than a one-off fix.",
      "It can stain. Resin is more porous than porcelain, so heavy coffee, tea, red wine or smoking will dull it over time.",
      "It can chip. Edges take wear and may need repairing. The upside is that repairs are usually straightforward.",
      "Not for everyone. Heavy grinders, persistent nail-biters, and teeth that are very crooked, badly broken or heavily discoloured often do better with a different approach.",
      "Health comes first. Decay and gum problems are treated before any cosmetic bonding.",
      "Straighten first if needed. If your teeth are noticeably out of line, aligners or braces first usually give a better and longer-lasting result than trying to mask the problem with resin.",
      "Front teeth, not back teeth. The chewing forces on molars are too much for bonding to take well.",
      "Order matters with whitening. If your dentist whitens your teeth, that comes before bonding, because the resin shade is fixed once it is set.",
    ],
  },
  fees: {
    eyebrow: 'Fees & Finance',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Composite bonding is priced per tooth, so the cost depends on how many teeth you are having treated. We do not work from a single flat figure.",
      "After your consultation you get a clear, written quote with the full cost set out, and no obligation to proceed.",
      "To spread the cost, interest-free finance is available, subject to status, and our team will explain your options.",
    ],
  },
  faqHeading: (<>Composite bonding questions, <em>answered</em></>),
  faqs: [{"q": "Does composite bonding hurt? Will I need an injection or drilling?", "a": "For most people it is painless and needs no injection, because we are adding to the tooth rather than drilling into it. Occasionally a small amount of shaping is needed, and we will talk you through it first. It is a comfortable treatment for nervous patients."}, {"q": "How long does composite bonding last?", "a": "There is no fixed number. With good care many people get several years from it, and sometimes longer. How long depends on your habits: grinding, nail-biting, smoking and lots of staining drinks all shorten its life. Regular check-ups and the odd polish help it last."}, {"q": "Is composite bonding reversible?", "a": "Largely, yes. Because little or no natural enamel is removed, your dentist can usually take the resin off and return close to your starting point. That is one of its main advantages over veneers and crowns."}, {"q": "Should my teeth be whitened before bonding?", "a": "If you want whiter teeth overall, your dentist will usually whiten them first. The resin is matched to your tooth colour at the time of treatment and will not lighten with whitening afterwards. So whitening comes first, the shade is left to settle, then the bonding is matched to it."}, {"q": "Can composite bonding close gaps between my teeth?", "a": "It can close small gaps well, usually in the region of one to four millimetres. Larger gaps, or gaps caused by the way your teeth are positioned, may be better closed with aligners first. We will measure and tell you honestly which suits you."}, {"q": "Can it help with crooked teeth, or do I need braces or aligners first?", "a": "Bonding can mask small irregularities. If your teeth are noticeably crooked, straightening them first with aligners or braces usually gives a better, longer-lasting result than trying to disguise the problem with resin. We are happy to map out both options."}, {"q": "Does composite bonding stain, and can it be whitened later?", "a": "It can stain over time, more so than porcelain, especially with coffee, tea, red wine and smoking. The resin cannot be whitened once it is set. Good cleaning, a sensible approach to staining drinks and the occasional professional polish keep it looking its best."}, {"q": "Can composite bonding be done on my back teeth?", "a": "It is really a front-teeth treatment. Back teeth take heavy chewing forces that bonding is not built for, so it tends not to last there. For back teeth we would look at sturdier options."}, {"q": "What is the difference between edge bonding and full composite bonding?", "a": "Edge bonding is the lighter touch. We add a little resin to the biting edges of the front teeth to smooth a chip, even up a worn or jagged edge, or add a touch of length. Full composite bonding, sometimes called composite veneers, covers more of the visible face of the tooth to change colour, shape and width more noticeably. It takes longer per tooth and gives a bigger change. Many people only need edge bonding once they see what it can do."}],
  related: [{"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "porcelain-veneers", "title": "Porcelain Veneers", "tag": "Smile Design"}, {"slug": "smile-makeover", "title": "Smile Makeover", "tag": "Smile Design"}],
  cta: { heading: (<>Book your<br /> <em>composite bonding consultation</em></>), sub: "An honest look at whether bonding suits your teeth. Day and evening appointments, seven days a week." },
}

export default function CompositeBonding() {
  return <TreatmentPage data={data} />
}

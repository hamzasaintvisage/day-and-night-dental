import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Front teeth that <em>bother you</em> in photos?</>),
    body: ["Maybe it's a chip that catches the light, a small gap you cover when you laugh, or a colour that no amount of whitening seems to shift. Day to day it's easy to ignore, but it has a way of showing up in every photo and making you hold back when you smile.", "Veneers can deal with several of those things at once, covering the front of the teeth that show. They're not right for everyone or every problem, and at our Merchant City clinic in Glasgow we'll tell you honestly whether they suit your teeth or whether something else would serve you better."],
    symptoms: ["A chipped or worn-down front tooth", "Small gaps between the front teeth", "A colour that won't whiten", "Teeth that sit slightly uneven", "Holding back when you smile in photos"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "porcelain-veneers",
  side: "day",
  tag: "Smile Design",
  h1Plain: "Porcelain Veneers",
  procedureType: "Dentistry",
  title: (<>Porcelain veneers, a way to <em>reshape and even out</em> your smile</>),
  lead: "Thin, custom porcelain shells bonded to the front of your teeth to change their shape, shade and symmetry. A way to even out a smile, hide chips and gaps, and lift the colour of teeth that won't whiten.",
  seo: { title: "Porcelain Veneers in Glasgow | Day Night Dental", description: "Porcelain veneers in Glasgow to reshape, brighten and even out your smile. Day and evening appointments, 7 days a week. Honest advice from our Merchant City clinic." },
  meta: [{"k": "What they change", "v": "Shape, shade, symmetry", "tone": "day"}, {"k": "Visits", "v": "Two or three", "tone": ""}, {"k": "Staining", "v": "Holds its colour", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Custom shells that look like <em>natural teeth</em></>),
  overview: ["Porcelain veneers are slim ceramic shells, made to fit the front of your teeth. Each one is shaped and shaded for you, then bonded into place. The idea is simple. Cover what bothers you and keep the result looking like teeth, not like a fake smile. The aim is a result that looks like natural teeth rather than something obviously altered. People just notice the smile looks tidier.", "People come to our Merchant City clinic for veneers for all sorts of reasons. Teeth that are chipped, worn short, or a colour they can't shift. Small gaps between the front teeth. Teeth that sit slightly uneven and bother them in photos. Veneers can deal with several of these at once, which is one reason people consider them. They're not a fix for everything though, and we'll be straight with you about that at the consultation.", "We are based in Merchant City, central Glasgow, and we run day and evening appointments seven days a week. That matters with veneers, because the treatment takes a few visits and you'll want appointments that fit around work without a fuss. Whether you're coming in from the West End, the south side or somewhere further out across Glasgow, you can usually find a time that works."],
  facts: [{"dt": "What they are", "dd": "Very thin shells of dental porcelain, bonded to the front of a tooth."}, {"dt": "What they change", "dd": "Shape, shade, size and symmetry. They can close small gaps and hide chips, wear and stubborn discolouration."}, {"dt": "Staining", "dd": "Porcelain has good resistance to staining and holds its colour better than composite bonding."}, {"dt": "Reversibility", "dd": "Getting veneers usually means removing a small amount of enamel first. Because enamel doesn't grow back, this part is not reversible."}, {"dt": "Number of visits", "dd": "Treatment is normally spread over two or three visits across a few weeks, with temporary veneers in between while the lab makes the real ones."}, {"dt": "What you need first", "dd": "Healthy teeth and gums and enough enamel to bond to. Any decay or gum problems are sorted before veneers go on."}, {"dt": "How long they last", "dd": "This varies from person to person and depends on your bite, habits and how well they are cared for. They are long lasting, not permanent. We'll talk through what is realistic for you at the consultation."}],
  benefitsHeading: (<>Why patients choose <em>porcelain veneers</em></>),
  benefits: [
    { title: 'Several issues in one go', body: 'Shape, colour, gaps and minor unevenness can all be addressed together, rather than as separate fixes.' },
    { title: 'The colour holds', body: 'Porcelain tends to resist staining from things like coffee, tea and red wine, so the shade stays steadier over time than composite.' },
    { title: 'Made to look like teeth', body: 'Porcelain can be shaded and finished to catch the light like enamel, with the aim of a natural rather than glaringly white look.' },
    { title: 'Hard wearing', body: 'Day to day, a well-made veneer is intended to cope with normal eating and drinking.' },
    { title: 'Less tooth removed than a crown', body: 'A veneer only covers the front surface, so less of the tooth is prepared than for a full crown.' },
    { title: 'Preview before committing', body: 'You get to react to the proposed look before anything is bonded for good, so there are fewer surprises.' },
  ],
  stepsHeading: (<>Your <em>veneer</em> journey</>),
  steps: [{"title": "Consultation and assessment", "body": "We look at your teeth and gums, take photos and X-rays where needed, and talk through what's bothering you and what you'd like to change. This is also where we tell you honestly if veneers are the right call or if something else would suit you better."}, {"title": "Smile design and preview", "body": "We plan the shape, size and shade with you. In many cases you can see a preview of the proposed smile, either as a mock-up trialled in your mouth or a digital design, so you can react to it before committing."}, {"title": "Minimal tooth preparation", "body": "A small amount of enamel is gently removed from the front of the teeth so the veneers sit flush and look natural. This is usually done with local anaesthetic so you're comfortable. We then take impressions or a scan."}, {"title": "Temporaries", "body": "You go home with temporary veneers to protect the prepared teeth and give you a feel for the new shape while the lab makes your final set."}, {"title": "Final fit", "body": "When the veneers are ready, we try them in, check the fit, colour and bite with you, and bond them into place once you're happy. Small adjustments are normal at this stage."}],
  comparison: {
    eyebrow: 'Compare',
    heading: (<>Porcelain veneers vs <em>composite bonding</em></>),
    intro: "Both can improve the look of front teeth. They suit different situations, and it's worth understanding the trade-off before you decide.",
    attribute: 'Feature',
    columns: [
      { name: 'Porcelain veneers' },
      { name: 'Composite bonding' },
    ],
    rows: [
      { label: 'What it is', values: ['Custom ceramic shells made in a lab and bonded on', 'Tooth-coloured resin shaped onto the tooth in the chair'] },
      { label: 'Tooth preparation', values: ['Usually some enamel removed', 'Often little or no enamel removed'] },
      { label: 'Reversible', values: ['No', 'More conservative, sometimes reversible'] },
      { label: 'Stain resistance', values: ['Holds its colour well', 'Picks up stains more over time'] },
      { label: 'Durability', values: ['Hard wearing', 'Less hard wearing, more prone to chipping'] },
      { label: 'Visits', values: ['Two or three over a few weeks', 'Often done in a single visit'] },
      { label: 'If it chips', values: ['Usually means remaking the veneer', 'Can often be repaired or added to'] },
      { label: 'Best for', values: ['Lasting change to shape, shade and symmetry', 'Smaller fixes, lower commitment, faster results'] },
    ],
    note: "The short version. Veneers are more durable and hold their colour better, but they're more involved, they remove some tooth, and a chip usually means a remake rather than a quick patch. Bonding is faster and gentler on the tooth, but it tends not to last as long or stay as clean looking. We'll talk you through which fits your teeth and what you want.",
  },
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Looking after your <em>veneers</em></>),
    intro: "Veneers are easy to live with, but a little care helps them last. Here is what to expect and what to do.",
    phases: [
      { title: 'First day or two', items: ['Your teeth and gums may feel sensitive for the first day or so.', 'Keep food soft and go easy on very hot and very cold things.', 'A sensitive toothpaste helps, and mild discomfort settles quickly.'] },
      { title: 'First couple of weeks', items: ['Your bite and speech might feel slightly different at first.', 'This is normal and your mouth adjusts fast.', 'If anything feels properly off when you bite together, tell us so we can adjust it.'] },
      { title: 'Day to day, long term', items: ['Treat veneers like natural teeth. Brush twice a day with a soft brush and floss gently around the edges.', 'Look after your gums, not just the veneers.', "Don't bite hard objects like ice, pens or fingernails, and don't use your teeth as tools.", 'If you grind or clench, wear a night guard to protect them.', 'Keep up your check-ups and hygienist visits so we can keep an eye on the margins and gums.', 'If a veneer ever feels loose or chips, come in and let us look at it sooner rather than later.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to weigh up before <em>you decide</em></>),
    body: [
      "Preparing the teeth usually removes a small amount of enamel, and enamel doesn't grow back. That's why veneers are not reversible. Take your time deciding.",
      "Veneers are long lasting but they don't last forever. At some point they will need replacing.",
      "A chipped porcelain veneer usually can't be patched. It normally means making a new one.",
      "Your teeth and gums need to be healthy first. Any decay or gum disease is treated before veneers go on, because the bond relies on healthy enamel.",
      "If teeth are quite crooked or rotated, straightening them first often gives a better, healthier result than masking them with veneers. We'll be honest if that's the case.",
      "Grinding and clenching shorten the life of veneers. A night guard helps, but it's worth knowing going in.",
      "Gums can recede over the years, which may expose an edge and mean a veneer needs redoing down the line.",
    ],
  },
  fees: {
    eyebrow: 'Fees & Finance',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Porcelain veneers are priced by the case, because the cost depends on how many teeth you are treating and the detail involved. We do not work from a fixed one-size figure.",
      "After your consultation you get a clear, written plan with the full cost set out, and no obligation to proceed.",
      "To spread the cost, 0% interest-free finance is available over manageable monthly payments, subject to status, and we will talk you through it.",
    ],
  },
  faqHeading: (<>Porcelain veneer questions, <em>answered</em></>),
  faqs: [{"q": "What are porcelain veneers made of?", "a": "They're made from dental porcelain, a hard ceramic that's shaped and shaded to look like natural enamel. Each one is custom made for your tooth, then bonded to the front surface."}, {"q": "Does getting veneers hurt?", "a": "The preparation and fitting are usually done with local anaesthetic, so you shouldn't feel pain at the time. Afterwards some tooth and gum sensitivity for a day or two is normal and settles on its own."}, {"q": "Are veneers reversible?", "a": "No, not once a tooth has been prepared. Because a small amount of enamel is removed and enamel doesn't grow back, the tooth will always need something covering it from then on. It's worth being sure before you start."}, {"q": "How long do porcelain veneers last?", "a": "It varies with your bite, habits and how well they are cared for. Looking after your gums, avoiding biting hard objects and wearing a night guard if you grind all help. We'll give you a realistic picture at your consultation."}, {"q": "Can I see what my smile will look like first?", "a": "Usually, yes. We design the smile with you and in many cases you can preview it, as a mock-up in your mouth or a digital design, before any teeth are prepared. It means fewer surprises at the end."}, {"q": "How many veneers will I need?", "a": "It depends on how many teeth show when you smile and what you want to change. Some people only need a couple, others want the whole smile line done so the colour and shape match across the front. We'll work this out with you at the consultation."}, {"q": "Will my veneers stain like normal teeth?", "a": "Porcelain tends to resist staining, so it holds its colour well. The bonding edges and your own teeth can still pick up stains over time, so coffee, tea, red wine and smoking still take a toll. Regular cleaning keeps things looking even."}, {"q": "Can I have veneers if I grind my teeth?", "a": "Often, yes, but grinding wears veneers faster and can chip them. We'd usually fit you with a night guard to protect them while you sleep, and talk through whether veneers are the right choice for you."}, {"q": "How do I book a consultation?", "a": "Get in touch with our Merchant City clinic and we'll find you a time, day or evening, seven days a week. We start with an honest assessment and talk you through whether veneers suit you before anything is decided."}],
  related: [{"slug": "composite-bonding", "title": "Composite Bonding", "tag": "Smile Design"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "smile-makeover", "title": "Smile Makeover", "tag": "Smile Design"}],
  cta: { heading: (<>Book your<br /> <em>veneer consultation</em></>), sub: "An honest assessment of whether veneers suit your teeth. Day and evening appointments, seven days a week." },
}

export default function PorcelainVeneers() {
  return <TreatmentPage data={data} />
}

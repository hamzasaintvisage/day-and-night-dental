import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Worried a dental visit will be a <em>battle</em>?</>),
    body: ["Plenty of parents put off a first dental visit because they expect tears, a struggle, or a child who clings to the chair. A bad early experience can stick, and it is hard to undo.", "We keep children's appointments short, gentle and low-pressure, and we never use fear language. Often a first visit is just a look, a count of the teeth and a friendly chat, so the dentist becomes a normal part of growing up rather than something to dread."],
    symptoms: ["A child who is anxious or upset about the dentist", "A toddler who has never been seen and is due a first visit", "Brushing battles at home you would like advice on", "Spots of decay or staining you have noticed", "A knocked or broken tooth after a fall"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "childrens-dentistry",
  side: "night",
  tag: "Family Care",
  h1Plain: "Children's Dentistry",
  procedureType: "MedicalProcedure",
  title: (<>Children's dentistry, gentle care <em>without the fear</em></>),
  lead: "Calm, gentle dental care for children, from a first wobbly visit to everyday check-ups and prevention. No rushing. No fear language. Just a friendly team helping your child feel at ease.",
  seo: { title: "Children's Dentistry in Glasgow | Day Night Dental", description: "Gentle children's dentistry in Merchant City, Glasgow. Check-ups, fluoride, sealants and calm care for kids. Day and evening appointments, 7 days a week." },
  meta: [{"k": "First visit", "v": "By first birthday", "tone": "day"}, {"k": "Approach", "v": "Tell, show, do", "tone": ""}, {"k": "Appointments", "v": "Seven days a week", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>An easy, unhurried <em>first visit</em></>),
  overview: ["Bringing a child to the dentist should be easy and unhurried. At Day Night Dental in Merchant City, central Glasgow, we keep children's appointments short, gentle and low-pressure. The aim of an early visit is simple: get your child used to the chair, the lights and the team, so the dentist feels like a normal part of growing up rather than something to worry about.", "Early visits matter for three plain reasons. They build good habits while teeth are still coming through. They let us spot small problems before they grow. And they help children feel relaxed, which makes every future visit easier. We focus on prevention first: gentle check-ups, fluoride, fissure sealants when they help, and clear advice on brushing and diet. Restorative treatment is there if it is ever needed, but the goal is to keep your child away from the drill in the first place.", "We see families from across Glasgow, from the city centre and Merchant City to the West End and the wider suburbs. With day and evening appointments seven days a week, you can book around the school run, after work, or at the weekend. If your child has had an accident and knocked or broken a tooth, we are open round the clock for emergencies too."],
  facts: [{"dt": "First visit", "dd": "We welcome children from their very first tooth. A good rule of thumb is a first visit by your child's first birthday."}, {"dt": "Teething", "dd": "First teeth usually appear from around six months. Teething can make babies fretful, and a clean chilled (not frozen) teething ring or gentle gum rubbing can help. Start brushing as soon as the first tooth comes through."}, {"dt": "Short and gentle", "dd": "First appointments are short and gentle. Often it is just a look, a count of the teeth, and a chat. Very young children can sit on a parent's lap."}, {"dt": "Tell, show, do", "dd": "We use a calm, \"tell, show, do\" approach so your child knows what is happening at each step before anything is done."}, {"dt": "Fluoride varnish", "dd": "Fluoride varnish is usually offered from around age two and applied a couple of times a year to help protect the enamel and lower the risk of decay."}, {"dt": "Fissure sealants", "dd": "Fissure sealants go on the chewing surfaces of the back adult molars, usually once those teeth have come through, to protect the deep grooves where decay tends to start."}, {"dt": "Recall intervals", "dd": "Children's recall intervals vary. Some children need a check-up every few months, others every six months to a year. We set the gap to suit your child, not a fixed rule."}],
  benefitsHeading: (<>Why families choose <em>our team</em></>),
  benefits: [{"title": "Gentle and unrushed", "body": "A calm approach that puts nervous children and worried parents at ease, with no pressure to climb straight into the chair."}, {"title": "Prevention-led care", "body": "We focus on prevention to support your child's dental health and avoid treatment where we can."}, {"title": "Early detection", "body": "We catch decay, bite and alignment issues early, so small things are dealt with while they are still small."}, {"title": "Habits that stick", "body": "Good brushing and eating habits built early tend to stay with your child for life."}, {"title": "Appointments that fit", "body": "Day and evening appointments seven days a week, so visits fit around school, work and weekends."}, {"title": "Round-the-clock emergency cover", "body": "We are open at all hours if your child has a knock, fall or sudden toothache."}],
  stepsHeading: (<>What a <em>check-up</em> looks like</>),
  steps: [{"title": "A friendly welcome", "body": "We meet your child, keep the language simple and let them settle. There is no pressure to climb straight into the chair."}, {"title": "A gentle look", "body": "The dentist counts the teeth and checks the gums, the bite and how the jaw is developing. For little ones, this can happen on your lap."}, {"title": "A decay and development check", "body": "We look for any early signs of decay and keep an eye on how adult teeth are coming through."}, {"title": "Prevention", "body": "Where it helps, we apply fluoride varnish or talk through fissure sealants. We will always explain what we are doing first."}, {"title": "Brushing and diet advice", "body": "We show you and your child what good brushing looks like and talk through everyday food and drink, in plain terms you can actually use at home."}, {"title": "A plan and a next date", "body": "We agree a recall interval that suits your child and answer any questions before you leave."}],
  aftercare: {
    eyebrow: "At home",
    heading: "Aftercare and home care",
    intro: "A few simple habits at home do most of the work in keeping your child's teeth healthy.",
    phases: [
      { title: "Every day", items: ["Brush twice a day, last thing at night and at one other time, for a couple of minutes, using a fluoride toothpaste.", "For children under three, use a small smear of fluoride toothpaste. From age three, use a pea-sized amount. Our team will confirm the right toothpaste and amount for your child.", "Supervise brushing until your child can brush well on their own, usually around the early school years.", "Encourage spitting out rather than rinsing, so the fluoride stays on the teeth and keeps working."] },
      { title: "Food and drink", items: ["Keep sugary foods and drinks to mealtimes and avoid frequent snacking through the day.", "Offer water or plain milk between meals. Avoid fizzy and sugary drinks, and avoid leaving a child with a bottle of anything sugary.", "Watch the hidden sugars in things like dried fruit and fruit juice between meals."] },
      { title: "After fluoride varnish", items: ["Leave brushing until the next day, and follow any eating and drinking guidance we give you, so the varnish has time to work.", "A little temporary staining can show on the teeth. It is harmless and brushes off."] },
      { title: "Fissure sealants", items: ["Sealants need no special care at home. We simply check them at routine visits and top them up if needed."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: (<>What to <em>keep in mind</em></>),
    body: [
      "Prevention is not a guarantee. Fluoride and sealants lower the risk of decay, but they do not remove it. Daily brushing and sensible eating still do most of the work.",
      "Sealants can wear or chip. They are not permanent. We check them at each visit and top them up if part has come away, so they keep protecting the grooves.",
      "Some children need a little longer. If your child is anxious, we go at their pace and may spread things over more than one visit. Building trust early is more useful than pushing through in one go.",
      "Baby teeth still need looking after. They hold space for adult teeth, help with eating and speech, and decay in them can be painful. Looking after them now makes the adult teeth easier later.",
      "Thumb-sucking and dummy use are normal in early childhood. If they continue past the early years they can affect how the teeth and bite develop, so we will mention it gently at a check-up if needed.",
      "A few children need more support than a check-up can give. If we ever see something that needs a different setting or extra help, we will tell you honestly and talk through the options.",
    ],
  },
  faqHeading: (<>Children's dentistry questions, <em>answered</em></>),
  faqs: [{"q": "When should my child first visit the dentist?", "a": "As soon as their first tooth appears, and by their first birthday at the latest. Early visits are mostly about getting your child comfortable. The sooner the dentist feels normal, the easier every later visit tends to be."}, {"q": "How often should my child have a check-up?", "a": "It depends on the child. Some need a check every few months, others are fine at six months to a year. We will suggest an interval based on your child's teeth and risk of decay, rather than applying one rule to everyone."}, {"q": "Are baby teeth really that important if they fall out anyway?", "a": "Yes. Baby teeth help your child eat and speak, and they hold space for the adult teeth coming behind them. Decay in a baby tooth can still cause pain and infection, so they are well worth looking after."}, {"q": "My child is nervous about the dentist. How can you help?", "a": "We keep things calm, gentle and unrushed. We use simple, friendly language and a \"tell, show, do\" approach, so your child knows what is happening before anything is done. We are happy to go slowly and build trust over a few visits if that is what your child needs."}, {"q": "What are fissure sealants and does my child need them?", "a": "A fissure sealant is a thin protective coating painted onto the grooves of the back adult molars, where decay often starts. Applying it is quick and does not hurt. Whether your child needs them depends on their teeth, and we will talk it through with you at a check-up."}, {"q": "Does fluoride varnish hurt?", "a": "No. It is simply painted onto the teeth and takes moments. There are no injections and nothing to be afraid of. We just ask you to hold off brushing until the next day so it can do its job."}, {"q": "What should I do if my child knocks out or breaks a tooth?", "a": "Contact us straight away. We are open round the clock for emergencies. If an adult tooth has been knocked out, time matters, so call us as soon as you can for advice on what to do in the meantime."}],
  related: [{"slug": "dental-check-ups", "title": "Dental Check-ups", "tag": "Prevention"}, {"slug": "nervous-patients", "title": "Nervous Patients", "tag": "Gentle Care"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your child's<br /> <em>first visit</em></>), sub: "A calm, gentle welcome with no rushing. Day and evening appointments, seven days a week." },
}

export default function ChildrensDentistry() {
  return <TreatmentPage data={data} />
}

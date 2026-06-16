import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Gums that <em>bleed when you brush</em>, or a clean that is long overdue?</>),
    body: ["Plaque builds up every day, and once it hardens into tartar a toothbrush will not shift it. Left to sit, it irritates the gums and is one of the things that lets gum disease and decay take hold. Bleeding gums can be an early sign that something needs attention.", "A hygiene appointment removes that build-up above and below the gumline, lifts everyday staining, and catches small problems while they are still simple to deal with. Wherever you are on the scale, from years between cleans to clockwork visits, there is no lecture, just an honest look at how your gums are doing."],
    symptoms: ["Gums that bleed when you brush", "A build-up of tartar you cannot shift at home", "Coffee, tea, red wine or tobacco staining", "Bad breath that will not go away", "It has been a long time since your last clean"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "dental-hygiene",
  side: "day",
  tag: "Prevention",
  h1Plain: "Dental Hygiene",
  procedureType: "Dentistry",
  title: (<>A professional clean to keep your <em>gums healthy</em></>),
  lead: "A professional clean helps keep your gums healthy, lifts everyday stains, and catches small problems before they grow. At Day Night Dental in Merchant City, in Glasgow city centre, you can book a hygiene appointment that fits around your life, day or evening, seven days a week.",
  seo: { title: "Dental Hygiene in Glasgow | Day Night Dental", description: "Professional dental hygiene in Glasgow. A thorough scale and polish to lift plaque, tartar and stains and support healthy gums. Day and evening, 7 days." },
  meta: [{"k": "What it includes", "v": "Scale, polish and stain removal", "tone": "day"}, {"k": "How often", "v": "Often around six months", "tone": ""}, {"k": "Booking", "v": "No dentist visit needed first", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>The clean your <em>toothbrush</em> cannot manage</>),
  overview: ["Dental hygiene is the routine cleaning your teeth cannot get at home, no matter how well you brush. Plaque builds up every day. When it hardens into tartar, a toothbrush will not shift it. A hygienist removes that build-up above and below the gumline, polishes the teeth, and shows you how to keep things clean between visits. It is a key part of helping to keep gum disease and decay at bay.", "We see patients from across Glasgow at our Merchant City practice, from people who have not had a clean in years to those who come in like clockwork. Wherever you sit on that scale, there is no lecture. We tell you honestly what your gums look like, what is working, and what could be better. If your gums bleed when you brush, that is worth a visit. Bleeding gums can be an early sign of gum disease and are worth getting checked.", "This is preventive care, not a diagnosis. A hygiene appointment keeps healthy mouths healthy and stops early problems getting worse. It works best alongside a regular dental check-up, and if we spot something that needs a dentist's eye, we will tell you. For anyone with established gum disease, a routine scale and polish may not be enough, and you may need deeper periodontal treatment instead."],
  facts: [{"dt": "What it includes", "dd": "A full scale and polish plus stain removal where it suits you."}, {"dt": "How deep it cleans", "dd": "Above and below the gumline, where brushing cannot reach."}, {"dt": "How often", "dd": "Many people are seen around every six months, while those at higher risk may be advised to attend more often. We recommend an interval based on your mouth."}, {"dt": "Booking", "dd": "You can usually book a hygiene appointment without seeing a dentist first."}, {"dt": "Stains", "dd": "Helps lift coffee, tea, red wine and tobacco staining, but does not chemically whiten teeth."}, {"dt": "Availability", "dd": "Day and evening appointments, seven days a week, in Merchant City."}],
  benefitsHeading: (<>Why a regular <em>clean</em> matters</>),
  benefits: [{"title": "Healthier gums", "body": "A clean helps support healthier gums and can reduce bleeding when you brush."}, {"title": "Lower risk", "body": "Can help lower the risk of gum disease and decay over time."}, {"title": "Fresher breath", "body": "Trapped bacteria and tartar are a common cause of bad breath, so removing the build-up can help."}, {"title": "Cleaner-looking teeth", "body": "Teeth that can look and feel cleaner as surface stains are lifted."}, {"title": "Advice for home", "body": "Personalised home-care advice to support your day-to-day routine between visits."}, {"title": "Early warning", "body": "A chance to spot problems while they are still small and simple to deal with."}],
  stepsHeading: (<>What happens at your <em>appointment</em></>),
  steps: [{"title": "A quick look first", "body": "We check your gums and teeth, note any tender or bleeding spots, and ask about your routine at home. This tells us where to focus."}, {"title": "Scaling", "body": "Using an ultrasonic scaler and fine hand instruments, we remove plaque and hardened tartar from the teeth, including just below the gumline where it does the most harm."}, {"title": "Stain removal, where it helps", "body": "A gentle jet of water, air and a fine powder lifts stubborn staining from coffee, tea, tobacco and the like. The powder is fine-grained and designed to be kind to enamel, and it reaches grooves and gaps a normal polish can miss."}, {"title": "Polish", "body": "A smooth polish finishes the surfaces, which leaves teeth feeling clean and makes it harder for plaque to cling on."}, {"title": "Tailored advice", "body": "We show you what is working and what to change, including brushing technique and which interdental brushes or floss suit the gaps between your teeth. Good home care between visits helps keep your mouth healthier for longer."}],
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Looking after your <em>teeth</em> afterwards</>),
    intro: "A little tenderness is normal, especially if it has been a while. Here is what to expect and how to keep the results going.",
    phases: [
      { title: 'The first day or two', items: ["Your gums may feel a little tender, and you might notice slight bleeding if they were inflamed before treatment. This settles quickly.", "If your teeth feel sensitive, ease off very hot, cold or acidic food and drink for a short while.", "Many people eat and drink as normal straight after."] },
      { title: 'Every day from here', items: ["Brush twice a day for two minutes with a fluoride toothpaste.", "Clean between your teeth daily with floss or interdental brushes, which is where most gum problems start.", "An antibacterial or fluoride mouthwash can help, though it is best used at a different time from brushing so it does not rinse away the fluoride in your toothpaste.", "Cutting back on sugary food and drink protects both gums and teeth."] },
      { title: 'Keeping it up', items: ["Good home care between visits helps keep your mouth healthier for longer.", "Stick to the routine we set out for you, and come back at the interval we advise for your gums.", "For some that is around six months, for others sooner."] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to <em>keep in mind</em></>),
    body: [
      "This is maintenance, not a substitute for a full dental examination. If something needs investigating, you will still need a check-up.",
      "If you already have gum disease, a standard scale and polish may not be enough. Established periodontitis usually needs a deeper clean of the root surfaces below the gum, sometimes over more than one visit.",
      "A clean lifts surface stains and can make teeth look brighter, but it does not change the natural colour of your teeth. That is whitening, which is a different treatment.",
      "Some short-term sensitivity and gum tenderness is normal, especially if it has been a while. It is a sign the gums were inflamed, not a sign anything went wrong.",
      "Smokers, people with diabetes, those wearing braces, and anyone with existing gum trouble tend to need more frequent visits to stay on top of things.",
      "If you have implants, veneers or certain fillings, tell us, so we can confirm that stain removal is suitable around them before we use it.",
    ],
  },
  faqHeading: (<>Dental hygiene questions, <em>answered</em></>),
  faqs: [{"q": "Does a scale and polish hurt?", "a": "For most people it is uncomfortable at worst, not painful. If your gums are inflamed or your teeth are sensitive, parts of it can twinge. Tell us and we will work gently and pause whenever you need. Nervous patients are welcome."}, {"q": "How often should I see a hygienist in Glasgow?", "a": "Around every six months suits many people. If you smoke, have diabetes, wear braces or have a history of gum disease, every three to four months may be better. We recommend an interval based on what we actually see in your mouth, not a one-size-fits-all rule."}, {"q": "Can I book a hygienist without seeing a dentist first?", "a": "Yes, in most cases you can come straight to the hygienist. If we notice anything during your clean that needs a dentist's attention, we will let you know and help you arrange it."}, {"q": "Will it whiten my teeth?", "a": "It lifts surface stains from things like coffee, tea, red wine and tobacco, so teeth often look brighter and cleaner afterwards. It does not change the underlying shade of your teeth. If you want a genuine colour change, that is whitening, which is a separate treatment."}, {"q": "Can it help with bad breath?", "a": "Often, yes. Persistent bad breath can come from bacteria and tartar around the gumline and between the teeth. Removing that build-up, plus a better daily routine, can help reduce it for many people."}, {"q": "Will my gums bleed after the appointment?", "a": "A little bleeding or tenderness for a day or two is common, particularly if your gums were already inflamed. It should settle on its own. Keep brushing gently and cleaning between your teeth. If bleeding carries on beyond a few days, get in touch."}, {"q": "Is a scale and polish the same as a deep clean?", "a": "No. A scale and polish is routine maintenance for gums that are largely healthy. A deep clean, or periodontal treatment, goes further beneath the gumline to clean the root surfaces and treat established gum disease, and usually takes more time and more than one visit. We will tell you honestly which one your gums need."}],
  related: [{"slug": "gum-disease-treatment", "title": "Gum Disease Treatment", "tag": "Gum Health"}, {"slug": "dental-check-ups", "title": "Dental Check-ups", "tag": "Prevention"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your<br /> <em>hygiene appointment</em></>), sub: "Healthy gums, fresher breath and honest advice. Day and evening appointments, seven days a week." },
}

export default function DentalHygiene() {
  return <TreatmentPage data={data} />
}

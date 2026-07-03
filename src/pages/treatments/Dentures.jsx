import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Gaps, or a denture that <em>no longer fits</em>?</>),
    body: ["Losing teeth changes more than your smile. It changes how you chew, how you talk and often how you feel in company. An old denture that has loosened over the years brings its own daily worries, from sore spots to chewing on one side.", "From our Merchant City practice in central Glasgow, we make full and partial dentures, custom built to fit your mouth. We are honest about the settling-in period and stay with you until the fit feels right."],
    symptoms: ["Gaps from missing or extracted teeth", "A denture that has loosened over time", "Avoiding hard or chewy foods", "Cheeks or lips that look thin and sunken", "A lower denture that will not stay put"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "dentures",
  side: "day",
  tag: "Replacing Teeth",
  h1Plain: "Dentures",
  procedureType: "MedicalProcedure",
  title: (<>Dentures, custom made <em>to fit your mouth</em></>),
  lead: "Dentures are removable replacements for missing teeth. They can replace a few teeth or a whole arch, and they are custom made to fit your mouth. A well-fitting set can help you eat more comfortably, speak more clearly and feel more confident smiling.",
  seo: { title: "Dentures in Glasgow | Day Night Dental", description: "Full and partial dentures in Glasgow. Custom made to help with eating, speech and confidence. Day and evening appointments, 7 days." },
  meta: [{"k": "Type", "v": "Full or partial", "tone": "day"}, {"k": "Made for you", "v": "Built in a dental lab", "tone": ""}, {"k": "Appointments", "v": "Over a few weeks", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>A straightforward way to <em>replace teeth</em></>),
  overview: ["At Day Night Dental in Merchant City, central Glasgow, we make full and partial dentures, custom built to fit your mouth. Losing teeth changes more than your smile. It changes how you chew, how you talk and often how you feel in company. Dentures are one of the most straightforward ways to get those things back.", "We see patients from across Glasgow, and we run day and evening appointments seven days a week, so denture work can fit around your job and your week. Dentures take a bit of getting used to and they usually need a few small adjustments early on. We are honest about that from the start, and we stay with you through the settling-in period until the fit feels right."],
  facts: [{"dt": "Full or partial", "dd": "Dentures can be full (replacing a whole upper or lower arch) or partial (filling gaps while your natural teeth stay)."}, {"dt": "Made for you", "dd": "They are made in a dental lab from impressions or a digital scan of your mouth, so each set is built for you."}, {"dt": "Material choices", "dd": "Partial dentures can be made from acrylic, a slim cobalt-chrome metal framework, or flexible clasp-free nylon. Each has trade-offs."}, {"dt": "Several appointments", "dd": "Getting dentures usually takes several appointments over a few weeks, because the lab needs time and you get a try-in before the final set."}, {"dt": "Settling-in period", "dd": "New dentures take a little getting used to, and most people need one or two small adjustments in the first few weeks as they bed in."}, {"dt": "Mouths keep changing", "dd": "Your mouth keeps changing after tooth loss, so dentures normally need relining or replacing over time to keep fitting well."}],
  benefitsHeading: (<>Why patients choose <em>dentures</em></>),
  benefits: [
    { title: 'Eat a wider range of foods', body: 'Chew a wider range of foods again instead of avoiding the hard or chewy ones.' },
    { title: 'Clearer speech', body: 'Speak more clearly, once you have had a short time to adjust.' },
    { title: 'Support for cheeks and lips', body: 'Support the cheeks and lips, which can look thin and sunken when teeth are missing.' },
    { title: 'Keep teeth from drifting', body: 'Fill gaps so the remaining teeth are less likely to drift out of place.' },
    { title: 'Non-surgical option', body: 'A removable, non-surgical option for replacing teeth, suitable for many people who are not keen on surgery.' },
    { title: 'Adjustable over time', body: 'Because they are removable, dentures can be relined and adjusted as your mouth changes, so the fit can be kept comfortable.' }
  ],
  stepsHeading: (<>Your <em>denture</em> journey</>),
  steps: [{"title": "Consultation", "body": "We check your gums, any remaining teeth and the bone underneath, and talk through whether full or partial dentures suit you best. This is also where we discuss honest trade-offs and any alternatives."}, {"title": "Impressions or a scan", "body": "We take a detailed mould or digital scan of your mouth. This is what the lab builds your denture on, so it is worth getting right."}, {"title": "Bite and shade", "body": "We record how your teeth meet and choose a tooth shape and shade that looks natural for your face, not too white and not too uniform."}, {"title": "Try-in", "body": "You see a trial version, usually set in wax, before anything is finished. You check the look, we check the fit and bite, and we change things at this stage if needed."}, {"title": "Fit", "body": "Once you are happy, the lab finishes the denture and we fit it. We show you how to put it in and take it out, and how to clean it."}, {"title": "Adjustments", "body": "Most people need one or two small tweaks in the first few weeks as the denture beds in. These are normal and quick, not a sign anything has gone wrong. Come back if a spot feels sore rather than trying to ease it yourself, and we will get the fit settled."}],
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Looking after <em>your dentures</em></>),
    intro: "A little care keeps your dentures comfortable and your mouth healthy. Here is what to expect early on, and how to look after them day to day.",
    phases: [
      { title: 'First few weeks', items: ['Expect a settling-in period. Your mouth may feel full and you may produce more saliva at first. This usually eases within a week or so.', 'Speech can feel odd to begin with. Reading aloud at home helps your tongue and lips adjust, and most people sound normal again within a few weeks.', 'Start with soft foods cut small, and chew evenly on both sides. Build back up to your normal diet over several weeks rather than all at once.', 'Come back for adjustments if a spot feels sore. Do not push through pain or try to file the denture yourself.'] },
      { title: 'Every day, long term', items: ['Clean your dentures daily over a folded towel or a basin of water, so they are not damaged if you drop them. Use a soft denture brush and a denture cleaner, not regular toothpaste, which is abrasive and scratches them.', 'Rinse them after meals to clear food debris.', 'Take your dentures out at night. This lets your gums rest and lowers the risk of fungal infection. Keep them in water or a cleaning solution overnight so they do not dry out and warp.', 'Keep brushing any natural teeth, your gums and your tongue, and look after the rest of your mouth as normal.', 'Come for regular reviews. We check the fit, your gums and the denture itself, and reline or remake it as your mouth changes over time.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to <em>weigh up</em></>),
    body: [
      "Dentures take time to get used to. The first weeks can feel strange, and it is normal to need a few adjustments before they are comfortable.",
      "Your jawbone slowly changes shape after teeth are lost. That means even a well-made denture will loosen over time and will need relining or replacing to keep fitting. How often a reline or replacement is needed varies from person to person, and your dentist will advise based on how your mouth changes.",
      "Material choice is a trade-off. Acrylic is a sound, simpler option but bulkier. A cobalt-chrome metal framework is slimmer and strong but a bigger piece of work. Flexible nylon is light and clasp-free and suits people with metal or acrylic sensitivities, but it is harder to reline and repair.",
      "Lower full dentures in particular can feel less stable than uppers, because there is less ridge to hold onto. It can take a little longer to get used to eating and speaking with a lower denture, and we will talk you through what helps.",
      "Eating and speech take practice at first. Starting with soft foods and reading aloud at home both help, and most people work back to a normal diet and clear speech over several weeks.",
      "We will always talk through other ways to replace teeth, such as implants and bridges, so you can make a properly informed choice rather than defaulting to dentures.",
    ],
  },
  faqHeading: (<>Denture questions, <em>answered</em></>),
  faqs: [{"q": "What is the difference between full and partial dentures?", "a": "A full denture replaces a whole upper or lower arch when there are no natural teeth left there. A partial denture fills one or more gaps and fits around the natural teeth you still have, often clipping onto them gently to stay in place."}, {"q": "How long does it take to get dentures?", "a": "Usually a few weeks across several appointments. The lab needs time to build each stage, and the try-in step means nothing is finished until you have seen and approved how it looks and feels."}, {"q": "Will I have to go without teeth while they are being made?", "a": "Not necessarily. In many cases an immediate denture can be made in advance and fitted on the day any teeth are removed, so you are not left with gaps. We will tell you honestly whether that works for your situation, as it depends on healing and on how the gums settle afterwards."}, {"q": "Will dentures look natural?", "a": "That is the aim, and it is why the try-in stage matters. We choose a tooth shape and shade to suit your face and age rather than a single bright white, and you approve the look before the denture is finished."}, {"q": "Are dentures comfortable, and can I eat normally?", "a": "There is an adjustment period. Early on they can feel bulky and eating takes practice, so we suggest soft foods to begin with. Most people work back up to a normal diet over several weeks. If a particular spot stays sore, that is what the adjustment appointments are for."}, {"q": "Should I take my dentures out at night?", "a": "Yes. Leaving them out overnight gives your gums a rest and reduces the risk of infection. Keep them soaking in water or a denture solution so they do not dry out and lose their shape."}, {"q": "Will my denture need adjusting after it is fitted?", "a": "Most likely, yes, and that is normal. New dentures settle in over the first few weeks, and a small tweak or two is often needed to ease a sore spot or fine-tune the bite. Over the longer term your mouth keeps changing shape, so a denture is usually relined now and then to keep the fit snug. Come back rather than adjusting it yourself."}, {"q": "How long do dentures last?", "a": "With good care a set can last several years, though how long varies from person to person because your mouth keeps changing. Expect relines along the way to keep the fit right, and a remake in time. Regular reviews catch fit problems early."}],
  related: [{"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}, {"slug": "dental-bridges", "title": "Dental Bridges", "tag": "Replacing Teeth"}, {"slug": "general-dentistry", "title": "General Dentistry", "tag": "Foundation Care"}],
  cta: { heading: (<>Book your<br /> <em>denture consultation</em></>), sub: "Custom-made full and partial dentures. Day and evening appointments, seven days a week." },
}

export default function Dentures() {
  return <TreatmentPage data={data} />
}

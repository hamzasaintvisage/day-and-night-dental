import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>A tooth that <em>keeps you up</em> at night?</>),
    body: ["When the soft pulp inside a tooth becomes infected or inflamed, it can throb, ache and steal your sleep. The pain often builds over days or weeks, then peaks at the worst possible moment. It is the kind of toothache that no longer settles on its own.", "Root canal treatment is what ends that pain at its source. It removes the damaged pulp and saves the tooth, so you keep your own tooth rather than losing it. Because we are open day and evening, you do not have to suffer through a weekend waiting for an appointment."],
    symptoms: ["A lasting or severe toothache", "Pain when you bite or press on the tooth", "Sensitivity to hot or cold that lingers", "A tooth darkening in colour", "Swollen or tender gums near the tooth"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "root-canal-treatment",
  side: "night",
  tag: "Saving Teeth",
  h1Plain: "Root Canal Treatment",
  procedureType: "MedicalProcedure",
  title: (<>Root canal treatment to <em>save your tooth</em> and stop the pain</>),
  lead: "Root canal treatment in Glasgow to save your tooth and stop the pain",
  seo: { title: "Root Canal Treatment in Glasgow | Day Night Dental", description: "Root canal treatment in Glasgow to save a painful, infected tooth and stop the ache. Day Night Dental, Merchant City. Day and evening, 7 days a week." },
  meta: [{"k": "Anaesthetic", "v": "Fully numbed", "tone": "day"}, {"k": "Visits", "v": "Usually one or two", "tone": ""}, {"k": "Aim", "v": "Save the tooth", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Saving the tooth, <em>ending the ache</em></>),
  overview: ["A root canal sounds frightening. In reality it is the treatment that ends the pain you are already in. When the soft tissue inside a tooth, called the pulp, becomes infected or inflamed, it can throb, ache and keep you awake. Root canal treatment removes that damaged pulp, cleans out the inside of the tooth, then fills and seals it. The tooth stays in your mouth. You keep your own natural tooth instead of losing it.", "At Day Night Dental in Merchant City, central Glasgow, we treat people from across the city who turn up with a tooth that has finally had enough. Often the pain has built up over days or weeks. Sometimes it arrives overnight. Because we are open day and evening, seven days a week, you do not have to suffer through a weekend or wait for a Monday morning slot. If you are in Glasgow and a tooth is keeping you up, we can see you.", "The aim is simple and honest. A root canal is about saving a tooth that would otherwise need to come out. The alternative is extraction, and once a tooth is gone, the only way back is an implant, bridge or denture. Where it can be saved, keeping your own tooth is often preferable to losing it. We will always tell you straight whether the tooth can be saved or not."],
  facts: [{"dt": "What it treats", "dd": "The pulp inside the tooth, the soft core of nerves and blood vessels, when it is infected or inflamed."}, {"dt": "Anaesthetic", "dd": "Carried out under local anaesthetic, so the tooth and the area around it are fully numb."}, {"dt": "Visits", "dd": "Usually done in one or two visits, depending on the tooth and how many canals it has."}, {"dt": "Front vs back teeth", "dd": "Front teeth often have a single canal and are quicker. Back molars have several canals and take longer."}, {"dt": "Crown afterwards", "dd": "The tooth is usually crowned afterwards, because a root-treated tooth becomes more brittle over time."}, {"dt": "Longevity", "dd": "A well-restored, root-treated tooth can last for many years when it is looked after."}],
  benefitsHeading: (<>Why a root canal can be <em>worth it</em></>),
  benefits: [{"title": "Stops the toothache at its source", "body": "Removing the infected nerve ends the pain the tooth has been causing."}, {"title": "Saves your natural tooth", "body": "The tooth stays in your mouth rather than being taken out."}, {"title": "Keeps you biting and chewing", "body": "You carry on using your own tooth instead of working around a gap."}, {"title": "Avoids the gap left by an extraction", "body": "No missing tooth to fill later with an implant, bridge or denture."}, {"title": "Done with the area fully numbed", "body": "Local anaesthetic means the treatment itself is not the painful part."}, {"title": "Available day and evening, seven days a week", "body": "A flaring tooth does not have to wait for a weekday appointment."}],
  stepsHeading: (<>Your root canal, <em>step by step</em></>),
  steps: [{"title": "Numbing the tooth", "body": "We give a local anaesthetic so the tooth and surrounding gum are completely numb. You will feel pressure and movement, but not pain."}, {"title": "Isolating the tooth", "body": "A thin rubber sheet, called a rubber dam, is placed around the tooth. It keeps the area clean and dry and stops anything reaching the back of your mouth."}, {"title": "Removing the pulp", "body": "We open the top of the tooth and clear out the infected or inflamed pulp from inside."}, {"title": "Cleaning and shaping the canals", "body": "Each canal inside the root is cleaned, shaped and disinfected one by one. Back teeth take longer here because they have more canals."}, {"title": "Filling and sealing", "body": "The cleaned canals are filled with a rubber-like material that seals them off. If the work spans two visits, a temporary dressing goes in between."}, {"title": "The permanent restoration", "body": "Once the tooth is settled, it gets a permanent filling and, in most cases, a crown to protect it and bring back its strength."}],
  aftercare: {
    eyebrow: "After your treatment",
    heading: "Looking after the tooth",
    intro: "A root-treated tooth needs a little care while it settles and until it is fully restored. Here is what to expect.",
    phases: [
      { title: "The first few hours", items: ["Your mouth stays numb for a while after the anaesthetic.", "Do not eat until the feeling has fully come back, or you risk biting your cheek, lip or tongue without knowing."] },
      { title: "The first few days", items: ["It is normal for the tooth and jaw to feel tender, especially when you bite. This usually settles within a few days.", "Over-the-counter painkillers such as ibuprofen or paracetamol help if you need them.", "Some minor swelling or bruising near the tooth can happen and will calm down."] },
      { title: "Eating and brushing", items: ["Stick to soft, lukewarm food at first and go easy on very hot or very cold things for a day or two.", "Avoid hard biting or heavy chewing on the treated tooth until it has its permanent filling or crown, because it is fragile until then.", "Keep brushing and flossing as normal, just gently around the area."] },
      { title: "Coming back for the crown", items: ["If you have a temporary filling or are waiting on a crown, do not put it off.", "A root-treated tooth is vulnerable until it is properly restored, and delaying raises the risk of it fracturing or the treatment failing."] },
      { title: "When to call us", items: ["Get in touch if the pain is severe, does not respond to painkillers, or the swelling gets worse rather than better."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: "The trade-offs, straight",
    body: [
      "A root canal is a safe, routine treatment. Despite an old myth, there is no good evidence that root canals are harmful to your wider health. That said, we will be straight with you about the trade-offs.",
      "A root-treated tooth has lost its nerve and blood supply. Over time that makes it more brittle and more likely to crack, which is exactly why a crown is so often recommended. The crown is not an upsell. It is what protects the tooth you have just spent time saving.",
      "No treatment works every time. Root canal treatment is well-established and routine, but a small number do not heal fully, sometimes because a canal is curved, narrow or blocked. If that happens, the tooth can often be retreated, or further options can be discussed with you. Occasionally a flare-up needs antibiotics.",
      "The honest alternative to a root canal is taking the tooth out. Extraction is sometimes the right call if the tooth is too far gone. But replacing a missing tooth with an implant, bridge or denture is more involved than saving the one you already have. We will tell you plainly which option makes more sense for your tooth.",
    ],
  },
  faqHeading: (<>Root canal questions, <em>answered</em></>),
  faqs: [{"q": "What is root canal treatment and what does it treat?", "a": "It treats the pulp, the soft tissue of nerves and blood vessels in the centre of your tooth. When the pulp gets infected or inflamed, it is removed, the inside of the tooth is cleaned and sealed, and the tooth is saved rather than taken out."}, {"q": "How do I know if I need a root canal? What are the warning signs?", "a": "Common signs include a lasting or severe toothache, pain when you bite or press on the tooth, sensitivity to hot or cold that lingers after the source is gone, the tooth darkening in colour, swollen or tender gums, or a small boil or pimple on the gum near the tooth. If any of these sound familiar, get it checked."}, {"q": "Does root canal treatment hurt?", "a": "The treatment itself should not. The tooth and surrounding area are fully numbed with local anaesthetic, so you feel pressure and movement rather than pain. Many find the treatment itself far more comfortable than they expected."}, {"q": "Why does root canal have such a painful reputation then?", "a": "Because the pain people remember usually came before the treatment, from the infection itself. By the time someone reaches the chair they are often already in a lot of pain. The root canal is what relieves it, not what causes it."}, {"q": "How long does it take and how many visits will I need?", "a": "Usually one or two visits. A front tooth with a single canal is quicker. A back molar with several canals takes longer and may be split across appointments. We will give you a clear idea once we have seen the tooth."}, {"q": "Will I need a crown afterwards, and why?", "a": "In most cases, yes. Without its nerve and blood supply, a root-treated tooth becomes more brittle and can discolour. A crown protects it from cracking and restores its strength so you can chew on it normally."}, {"q": "Do you offer emergency or same-day root canal treatment in Glasgow?", "a": "We are open day and evening, seven days a week, for people in pain across Glasgow. If you have severe toothache, swelling or a suspected abscess, contact us and we will get you seen and start sorting the pain."}],
  related: [{"slug": "dental-crowns", "title": "Dental Crowns", "tag": "Tooth Repair"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}, {"slug": "tooth-extraction", "title": "Tooth Extraction", "tag": "Oral Surgery"}],
  cta: { heading: (<>Book your<br /> <em>root canal consultation</em></>), sub: "We will tell you straight whether the tooth can be saved. Day and evening appointments, seven days a week." },
}

export default function RootCanalTreatment() {
  return <TreatmentPage data={data} />
}

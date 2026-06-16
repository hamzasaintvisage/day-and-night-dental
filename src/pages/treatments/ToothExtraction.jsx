import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Is a damaged tooth <em>causing you grief</em>?</>),
    body: ["No one wants a tooth taken out, and plenty of people put it off for years because they dread it. But when a tooth is too damaged or infected to keep, leaving it alone tends to make things worse, not better.", "Taking the tooth out deals with the source of the problem, can relieve the pain and helps stop it spreading. If you are nervous, say so when you book, and we will work at your pace."],
    symptoms: ["A tooth that is too damaged or infected to save", "Ongoing pain that will not settle", "A tooth that has broken at the gum line", "An abscess or sudden flare-up", "A wisdom tooth that is buried or impacted"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "tooth-extraction",
  side: "night",
  tag: "Oral Surgery",
  h1Plain: "Tooth Extraction",
  procedureType: "MedicalProcedure",
  title: (<>When a tooth cannot be saved, <em>a gentle way out</em></>),
  lead: "No one wants a tooth taken out. But sometimes it is the right call, and putting it off only makes things worse. If a tooth is too damaged or infected to keep, removing it deals with the source of the problem and can relieve the pain and help stop it spreading.",
  seo: { title: "Tooth Extraction in Glasgow | Day Night Dental", description: "Tooth extraction in Glasgow, simple or surgical, under local anaesthetic. Honest aftercare and replacement advice. Day and evening appointments, 7 days a week." },
  meta: [{"k": "Anaesthetic", "v": "Local, fully numb", "tone": "day"}, {"k": "Type", "v": "Simple or surgical", "tone": ""}, {"k": "Gum healing", "v": "About 1 to 2 weeks", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Removing a tooth that <em>cannot be saved</em></>),
  overview: ["A tooth extraction means removing a tooth that cannot be saved. We always try to keep your own teeth first, with a filling, a crown or root canal treatment. When none of those will work, taking the tooth out is the sensible step. It is a common procedure done under local anaesthetic, so the area is fully numb before we start.", "Our practice is in Merchant City in central Glasgow, easy to reach from across the city and the wider area. We see people for planned extractions and for urgent ones, including teeth that have broken, abscessed or flared up out of nowhere. Because we are open day and evening, 7 days a week, you do not have to sit with the pain until a standard weekday slot comes free.", "If you are nervous, say so when you book. Plenty of people put off having a tooth out for years because they dread it. We will talk you through what is happening at each step, work at your pace, and keep the surprises to a minimum. For most people the worst part is the worry beforehand, not the procedure itself."],
  facts: [{"dt": "Local anaesthetic", "dd": "Done under local anaesthetic, so the tooth and gum are numb. You feel pressure and hear some noise, but not sharp pain."}, {"dt": "Simple or surgical", "dd": "A simple extraction is for a tooth we can grip and lift out. A surgical extraction is for a tooth that is broken at the gum line, buried or impacted, including some wisdom teeth."}, {"dt": "X-ray first", "dd": "We take an X-ray first to see the shape and length of the roots and what sits around them."}, {"dt": "How long it takes", "dd": "A simple extraction often takes only a few minutes once you are numb. Surgical cases take longer."}, {"dt": "Healing time", "dd": "The gum surface usually closes over in about one to two weeks. The bone underneath keeps healing for several months."}, {"dt": "Driving", "dd": "Local anaesthetic does not stop you driving. Only drive if you feel well and steady. If you feel shaky or unwell, arrange a lift home."}, {"dt": "Antibiotics", "dd": "Antibiotics are not routine. They are only needed if there is a spreading infection, and we will tell you if that applies to you."}, {"dt": "Your medical history", "dd": "Tell us your medical history and any medicines you take, especially blood thinners. It changes how we plan the day."}],
  benefitsHeading: (<>Why an extraction can be the <em>right call</em></>),
  benefits: [
    { title: 'Deals with a tooth that cannot be saved', body: 'Aims to relieve the pain and remove the source of infection from a tooth that cannot be saved.' },
    { title: 'Protects the teeth around it', body: 'Helps protect the surrounding teeth and gum from a tooth that cannot be saved.' },
    { title: 'A clear plan for the gap', body: 'You know your replacement options before the tooth comes out, so nothing is a surprise afterwards.' },
    { title: 'Help when it is urgent', body: 'Same-day and out-of-hours help for sudden, severe problems, rather than a long wait.' },
    { title: 'Fully numb before we start', body: 'Local anaesthetic as standard, with the area fully numb before any work begins.' },
    { title: 'A calm approach', body: 'A step-by-step approach for nervous patients, working at your pace.' }
  ],
  stepsHeading: (<>What happens on <em>the day</em></>),
  steps: [{"title": "We check and explain", "body": "We check your X-ray and your medical history, then explain what we are going to do."}, {"title": "We numb the area", "body": "We numb the area with local anaesthetic. We wait until it has fully taken hold before starting."}, {"title": "A simple extraction", "body": "For a simple extraction, we loosen the tooth and ease it out. You feel firm pressure and some movement, not sharp pain."}, {"title": "A surgical extraction", "body": "For a surgical extraction, we make a small opening in the gum and sometimes remove the tooth in sections. You may need a stitch or two afterwards."}, {"title": "We control the bleeding", "body": "We place a gauze pad over the socket and ask you to bite down firmly to control the bleeding."}, {"title": "We go through aftercare", "body": "Before you leave, we go through your aftercare and tell you what is normal and what is not. You can arrange a follow-up if you need one, and you can always contact us if something is not settling."}],
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Looking after the <em>socket</em></>),
    intro: "The first 24 hours matter most. A blood clot forms in the socket and acts like a plaster over the wound. Looking after that clot really matters.",
    phases: [
      { title: 'The first few hours', items: ['Bite firmly on the gauze pad for about 30 to 45 minutes to help the clot form.', 'Wait until the numbness wears off before you eat, and stick to soft food for the rest of the day.', 'You can sip cool water to stay hydrated, but avoid hot drinks for the first 24 hours.', 'Rest. Avoid heavy lifting, bending and hard exercise for the rest of the day.', 'An ice pack against the cheek, roughly 10 to 20 minutes on and then off, helps with swelling.', 'For pain, ordinary over-the-counter painkillers usually do the job. Avoid aspirin, as it can make bleeding worse.'] },
      { title: 'The first 24 hours', items: ['Do not rinse, spit, or swish anything around your mouth.', 'Do not poke the socket with your tongue or finger.', 'No straws, no smoking and no vaping. The suction and the heat can pull the clot loose.', 'No alcohol.', 'Eat soft food and chew on the other side of your mouth.', 'You can brush your teeth gently that evening, but keep the brush away from the socket.'] },
      { title: 'From the next day', items: ['Start rinsing very gently with warm salt water, about a teaspoon of salt in a mug of warm water, two or three times a day. Do this after meals for several days.', 'Keep eating soft food until chewing feels comfortable.', 'Hold off on smoking and vaping for as long as you can. The longer you wait, the lower your risk of problems.', 'If the socket starts bleeding again at home, do not panic. Roll up a clean piece of gauze or cotton wool, place it over the socket, and bite down firmly for about 30 minutes while sitting quietly. If heavy bleeding will not stop, call us.', 'If anything is not settling, contact us. You can arrange a follow-up if you need one.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest points and risks',
    heading: (<>What to expect, and <em>what to watch for</em></>),
    body: [
      "For many people, any discomfort eases over the following days. If it does flare up before it settles, that is not unusual and not a sign something has gone wrong.",
      "Some swelling and bruising around the cheek and jaw is common, especially after a surgical extraction. It settles over a few days.",
      "Dry socket is the main thing to watch for. It happens when the clot does not form or gets dislodged, leaving the bone exposed. It causes a deep, throbbing ache a few days after the extraction, often with a bad taste. The risk is higher with lower wisdom teeth and higher if you smoke. If you think you have it, contact us so we can help settle it.",
      "Infection and prolonged bleeding are less common but possible.",
      "With lower wisdom teeth, there is a small risk of temporary numbness or tingling in the lip or tongue if a tooth sits close to a nerve. In most cases any numbness is temporary, and we will discuss the specific risk with you and check your X-ray beforehand.",
      "Stitches, if you need them, are usually the dissolving kind and gone within about one to two weeks.",
    ],
  },
  faqHeading: (<>Tooth extraction questions, <em>answered</em></>),
  faqs: [{"q": "Does having a tooth taken out hurt?", "a": "The area is fully numb under local anaesthetic, so you should not feel sharp pain. You will feel pressure and some pushing, and hear a bit of noise. If you feel anything sharp, tell us and we will add more anaesthetic."}, {"q": "How long does it take?", "a": "A simple extraction often takes only a few minutes once you are numb. A surgical extraction, or a difficult wisdom tooth, takes longer. We will give you a realistic idea on the day."}, {"q": "What is the difference between a simple and a surgical extraction?", "a": "A simple extraction is for a tooth we can grip above the gum and ease out. A surgical extraction is for a tooth that is broken at the gum line, buried or impacted. It involves a small opening in the gum and sometimes removing the tooth in pieces."}, {"q": "What is dry socket and how do I avoid it?", "a": "Dry socket is when the protective blood clot in the socket does not form or comes loose, leaving the bone exposed and very sore a few days later. You lower your risk by leaving the clot alone for 24 hours: no rinsing, spitting, straws, smoking or vaping. The risk is higher if you smoke, so the longer you can hold off, the better."}, {"q": "What can I eat and drink afterwards?", "a": "Wait until the numbness wears off before you eat, then stick to soft food such as soup, yoghurt, mashed potato, pasta or scrambled egg. You can sip cool water to stay hydrated, but avoid hot drinks, alcohol and anything through a straw for the first 24 hours. Chew on the opposite side and avoid anything crunchy or small enough to lodge in the socket until it has healed."}, {"q": "Will I be able to drive afterwards?", "a": "Local anaesthetic does not stop you driving. Only drive if you feel well and steady. If you feel shaky or unwell after the appointment, arrange a lift home rather than driving yourself."}, {"q": "Will I need antibiotics?", "a": "Not usually. Antibiotics are only needed if there is a spreading infection, not as a routine part of an extraction. If you do need them, we will explain why and what to take."}, {"q": "When can I go back to work and normal activity?", "a": "Many people are fine the next day after a simple extraction. Rest on the day itself and avoid hard exercise, heavy lifting and bending for the first 24 hours. After a surgical extraction or wisdom tooth, give yourself a little longer."}, {"q": "Can I be seen the same day if I am in a lot of pain?", "a": "Yes. We keep time for urgent dental problems and we are open day and evening, 7 days a week. Call us and we will get you seen and help settle the pain as soon as we can."}, {"q": "Are there alternatives to taking the tooth out?", "a": "Sometimes. If the tooth can be saved, a filling, a crown or root canal treatment may be a better route. We only recommend removing a tooth when keeping it is not realistic, and we will talk you through which is the better route for you."}],
  related: [{"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}, {"slug": "general-dentistry", "title": "General Dentistry", "tag": "Foundation Care"}],
  cta: { heading: (<>Book your<br /> <em>tooth extraction consultation</em></>), sub: "Honest advice on saving the tooth or filling the gap. Day and evening appointments, seven days a week." },
}

export default function ToothExtraction() {
  return <TreatmentPage data={data} />
}

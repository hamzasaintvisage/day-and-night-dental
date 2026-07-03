import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Pink in the sink, or <em>sore, swollen gums</em>?</>),
    body: ["Bleeding gums are easy to brush off, but they are usually the first sign of gum disease. In the early stage it rarely hurts, so a little pink in the sink when you brush, or breath that is not as fresh as it should be, is often the only warning you get.", "Caught early, gingivitis can usually be reversed. Left alone, gum disease can quietly damage the bone that holds your teeth in place. If any of this sounds familiar, it is worth getting your gums checked."],
    symptoms: ["Bleeding when you brush or clean between your teeth", "Red, swollen or sore gums", "Persistent bad breath", "Gums that look like they are shrinking back", "Teeth that feel loose or have shifted"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "gum-disease-treatment",
  side: "day",
  tag: "Gum Health",
  h1Plain: "Gum Disease Treatment",
  procedureType: "MedicalProcedure",
  title: (<>Gum disease treatment, because bleeding gums are <em>not normal</em></>),
  lead: "Bleeding gums are not normal. They are usually the first sign of gum disease, and the early stage can usually be reversed. We treat gum disease at Day Night Dental in central Glasgow, with day and evening appointments seven days a week.",
  seo: { title: "Gum Disease Treatment in Glasgow | Day Night Dental", description: "Gum disease treatment in Glasgow to stop bleeding gums and protect your teeth. Day and evening appointments, 7 days a week, in Merchant City." },
  meta: [{"k": "Two stages", "v": "Gingivitis and periodontitis", "tone": "day"}, {"k": "Early stage", "v": "Often painless", "tone": ""}, {"k": "Treatment", "v": "Usually no surgery", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>Catching gum disease <em>before it spreads</em></>),
  overview: ["Gum disease is common, and it often goes unnoticed because the early stage rarely causes symptoms. In the early stage it rarely hurts. You might notice a little pink in the sink when you brush, or that your breath is not as fresh as it should be. It is easy to ignore. Left untreated, it can quietly damage the bone that holds your teeth in place, which can lead to tooth loss in adults.", "There are two stages worth knowing. The first is gingivitis, where the gums are inflamed but the bone is still intact. This stage can often be reversed with a good clean and better habits at home. The second is periodontitis, where the disease has reached the bone and started to break it down. Periodontitis cannot be undone, but treatment aims to stop it progressing and keep it stable. We will explain which stage you are at and what that means for you.", "If you live or work in Glasgow and you have noticed bleeding, soreness or a change in how your teeth feel, it is worth getting checked. Our practice is in Merchant City in the city centre, easy to reach from across Glasgow, and our extended hours mean you do not have to take a day off work to be seen. Some research has also explored possible links between gum health and general health, so looking after your gums may matter for more than just your mouth."],
  facts: [{"dt": "Two stages", "dd": "Gum disease comes in two stages: gingivitis, which can often be reversed, and periodontitis, which is managed rather than cured."}, {"dt": "Often painless", "dd": "The early stage is usually painless, so bleeding when you brush is often the only warning sign."}, {"dt": "Risk to teeth", "dd": "Untreated gum disease can lead to tooth loss in adults."}, {"dt": "Usually no surgery", "dd": "Most cases are treated without surgery, using a clean below the gumline and tailored advice."}, {"dt": "Main cause", "dd": "Plaque is the main cause, but smoking, diabetes, certain medicines, pregnancy and family history all raise the risk."}, {"dt": "Wider health", "dd": "Some research has explored possible links between gum health and general health."}],
  benefitsHeading: (<>Why treating it <em>early matters</em></>),
  benefits: [
    { title: 'Stops the symptoms', body: 'Eases the bleeding, soreness and swelling that come with inflamed gums.' },
    { title: 'Protects your teeth', body: 'Helps protect the bone and the teeth you still have, reducing the risk of losing them.' },
    { title: 'Tackles bad breath', body: 'Addresses the bad breath that often comes from bacteria under the gumline.' },
    { title: 'A clear routine', body: 'Gives you a home routine that helps keep the problem under control between visits.' },
    { title: 'Caught early', body: 'Catching problems early means they are usually simpler and gentler to treat.' },
    { title: 'Supports wider health', body: 'Looking after your gums may support your wider health, given the possible links researchers are exploring.' }
  ],
  stepsHeading: (<>How we <em>treat your gums</em></>),
  steps: [{"title": "Assessment", "body": "We examine your gums and measure the small spaces, called pockets, between each tooth and the gum. We may take X-rays to check the bone below the gumline. This tells us where you stand and how far the disease has gone."}, {"title": "Cleaning above the gumline", "body": "We remove the plaque and hardened tartar you cannot shift with a toothbrush. For mild gingivitis, this plus better home care is often enough."}, {"title": "Root surface debridement", "body": "For deeper pockets, we clean below the gumline along the roots of the teeth, where bacteria collect out of reach. This is the core of treatment for periodontitis. We can use local anaesthetic to numb the area before cleaning below the gumline."}, {"title": "Tailored home routine", "body": "We show you how to clean the specific spots that are letting you down, usually with interdental brushes or floss alongside normal brushing. This part matters as much as anything we do in the chair."}, {"title": "Review", "body": "We see you again to re-measure the pockets and check the gums are settling down. This tells us whether the treatment has worked and what needs to happen next."}, {"title": "Ongoing maintenance", "body": "Some people stay healthy on a normal recall. Others need more frequent cleans, often every three to four months, to help keep things stable."}],
  aftercare: {
    eyebrow: "Aftercare",
    heading: (<>Aftercare and <em>maintenance</em></>),
    intro: "How your gums respond depends a lot on what happens after treatment. Here is what to expect and what your part looks like.",
    phases: [
      { title: "The first few days", items: ["Your gums may feel tender and your teeth a little sensitive, especially to hot and cold. This is normal and settles within a few days.", "Keep brushing gently.", "If you have had a deeper clean, take it easy and avoid hard exercise for the first 24 hours."] },
      { title: "The first few weeks", items: ["Stick to the home routine we give you. Brush twice a day and clean between your teeth every day.", "If we recommend a mouthwash, use it exactly as directed and only for as long as advised.", "This is when the gums do most of their healing, and your habits decide how well they recover."] },
      { title: "Long term", items: ["This is the most important phase. Gum disease does not stay away on its own.", "It is held in check by consistent home care and regular professional cleans.", "Coming back for maintenance on the schedule we agree is what helps keep your gums stable for the long run. Miss it, and the disease can quietly creep back."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: (<>What to <em>weigh up</em> before you start</>),
    body: [
      "Gingivitis, the early stage, can often be reversed. Periodontitis, the advanced stage, cannot. Once bone is lost it does not grow back. Treatment aims to stop the disease progressing and keep it stable, but we cannot cure advanced gum disease.",
      "Treatment is a journey, not a one-off fix. The deep clean is just the start. Without ongoing maintenance and good home care, the problem tends to come back.",
      "Smoking makes gum disease worse and slows healing. We will be honest about this. Cutting down or stopping makes a real difference to how your gums respond.",
      "Most people are treated without surgery. In advanced cases, gum surgery may occasionally be needed. A small number with advanced disease may also need additional specialist care, which we will explain.",
      "Results depend partly on you. The work we do in the chair only lasts if it is backed up by daily cleaning at home.",
    ],
  },
  faqHeading: (<>Gum disease questions, <em>answered</em></>),
  faqs: [{"q": "What is gum disease and what causes it?", "a": "Gum disease is inflammation of the gums caused mainly by plaque, the sticky film of bacteria that builds up on teeth. If plaque is not cleaned away it irritates the gums and, over time, can spread to the bone holding the teeth. Smoking, diabetes, certain medicines, pregnancy and family history can all make it more likely."}, {"q": "What are the signs I should watch for?", "a": "The most common sign is bleeding when you brush or clean between your teeth. Others include red, swollen or sore gums, persistent bad breath, gums that look like they are shrinking back from the teeth, and in later stages teeth that feel loose or have shifted. Early gum disease is often painless, so do not wait for pain before getting checked."}, {"q": "What is the difference between gingivitis and periodontitis?", "a": "Gingivitis is the early stage. The gums are inflamed but the bone is still healthy, and it can often be reversed. Periodontitis is the advanced stage, where the disease has reached the bone and started to break it down. Periodontitis cannot be reversed, but it can be managed and kept stable."}, {"q": "Is gum disease curable?", "a": "The early stage, gingivitis, can often be cleared up completely. The advanced stage, periodontitis, cannot be cured, but it can be controlled. With treatment and good ongoing care, we aim to stop it getting worse and keep your gums and teeth stable."}, {"q": "Does the treatment hurt?", "a": "Most people find it more comfortable than they expect. For cleaning below the gumline we can use local anaesthetic to numb the area while we work. Afterwards your gums may feel tender for a few days, which usually eases quickly."}, {"q": "How often will I need to come back?", "a": "After treatment we will agree a maintenance plan with you. Some people are fine on a normal recall. Many with a history of gum disease do better coming back every three to four months for a professional clean, so problems can be caught before they take hold again."}, {"q": "Can I stop gum disease coming back?", "a": "You can help keep it under control. The key is daily cleaning at home, brushing twice a day and cleaning between your teeth, plus regular maintenance visits. If you smoke, cutting down or stopping helps a great deal. Well-managed gum disease is far less likely to lead to tooth loss, though outcomes vary from person to person."}],
  related: [{"slug": "dental-hygiene", "title": "Dental Hygiene", "tag": "Prevention"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Get your gums<br /> <em>checked and treated</em></>), sub: "Honest advice and a clear plan for keeping your gums healthy. Day and evening appointments, seven days a week." },
}

export default function GumDiseaseTreatment() {
  return <TreatmentPage data={data} />
}

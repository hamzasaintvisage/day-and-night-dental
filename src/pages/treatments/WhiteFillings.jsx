import { Link } from 'react-router-dom'
import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>A <em>chipped or aching tooth</em>, or old dark fillings you have tired of?</>),
    body: ["A new cavity, a chipped edge or a worn front tooth tends to nag at you, and it rarely fixes itself. The other thing we hear a lot is people who have grown tired of looking at silver-grey amalgam and want something that simply blends in.", "A white filling sorts both. It repairs the damage with a tooth-coloured material picked to disappear into your smile, so nobody needs to know the filling is there at all."],
    symptoms: ["A new cavity or area of decay", "A chipped or cracked edge on a tooth", "A worn or uneven front tooth", "Old silver-grey fillings you would rather not see", "A filling that has fallen out or broken"],
  },
  ctaPrimaryLabel: 'Book a Filling Appointment',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "white-fillings",
  side: "day",
  tag: "Tooth Repair",
  h1Plain: "White Fillings",
  procedureType: "MedicalProcedure",
  title: (<>White fillings that match your tooth, <em>usually in one visit</em></>),
  lead: "Shade-matched composite repairs in Glasgow for decay, chips and old amalgam, usually finished in a single visit",
  seo: { title: "White Fillings in Glasgow | Day Night Dental", description: "Tooth-coloured composite fillings in Glasgow to repair decay, chips and old amalgam. Shade-matched, usually one visit. Same-day emergency slots held every day." },
  meta: [{"k": "Best for", "v": "Decay, chips and cracks", "tone": "day"}, {"k": "Usually", "v": "One appointment", "tone": ""}, {"k": "Material", "v": "Shade-matched composite", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>A repair that <em>blends in</em></>),
  overview: [
    "A white filling repairs a tooth that has decay, a chip or a crack, and it does it without leaving dark metal behind. We use a tooth-coloured composite resin that bonds straight to the tooth and is matched to your natural shade. In most cases the whole thing is done in a single appointment under local anaesthetic, so the tooth is fixed before you leave.",
    (<>A white filling suits small to medium repairs well, such as a cavity, a chipped edge or a worn front tooth. If the tooth is healthy and you simply want to change how it looks, <Link to="/treatments/composite-bonding/">composite bonding</Link> uses the same material for shape rather than repair. And if a lot of tooth is missing, an <Link to="/treatments/inlays-onlays/">inlay or onlay</Link> or a <Link to="/treatments/dental-crowns/">crown</Link> can be the steadier choice, and we will tell you which makes sense for your tooth before anything starts.</>),
    "We are at 80 Hutcheson Street in Merchant City, with Argyle Street and Queen Street stations and the St Enoch subway all within a few minutes on foot, so a lunchtime or after-work filling is genuinely doable. Some people arrive with a new cavity or a broken bit of tooth. Others have older silver-grey amalgam they would rather see the back of and want it swapped for something that blends in. Both are everyday work for us, and we see patients from across Glasgow for it.",
    (<>We are open day and night, every day, so you do not have to take a morning off work to get a filling done. If a tooth has broken or a filling has fallen out, that often <Link to="/treatments/emergency-dentist/">counts as an emergency</Link>, and we hold same-day emergency slots every day and aim to see you quickly.</>),
  ],
  facts: [{"dt": "What they are made of", "dd": "A composite of dental resin and fine glass particles, shaded to match your tooth. No mercury and no metal."}, {"dt": "How they hold in place", "dd": "They bond directly to the tooth structure rather than being wedged in like metal."}, {"dt": "Usually one visit", "dd": "Most fillings are placed, set and polished in a single appointment under local anaesthetic."}, {"dt": "Set straight away", "dd": "The composite is hardened with a curing light as we go, so there is no waiting around for it to set."}, {"dt": "Not permanent", "dd": "A filling can be replaced when it eventually wears, and it does not stop you having a crown or onlay later if the tooth needs one."}],
  benefitsHeading: (<>Why patients choose <em>white fillings</em></>),
  benefits: [
    { title: 'It blends in', body: 'It is shade-matched to your tooth, so the repair does not show when you talk or smile.' },
    { title: 'Keeps more of your tooth', body: 'Because it bonds to the tooth, we can often keep more of the healthy structure than a metal filling would need.' },
    { title: 'Handles small jobs well', body: 'It can fix things metal does not do well, like a chipped edge or a worn front tooth.' },
    { title: 'Swaps out old amalgam', body: 'If you would rather not see dark metal when you smile, old amalgam can be replaced with shade-matched composite. Sound amalgam is safe to leave, so this is an appearance choice rather than a health need.' },
    { title: 'Usable straight away', body: 'The tooth is ready to use the moment the numbness wears off.' },
    { title: 'Repairable', body: 'If it ever chips or stains, it can be repaired or replaced without starting over.' }
  ],
  stepsHeading: (<>Your <em>filling</em> appointment</>),
  steps: [{"title": "Check and numb", "body": (<>We look at the tooth, take an X-ray if we need one, and give you local anaesthetic so you should feel pressure but not pain. If you are a <Link to="/treatments/nervous-patients/">nervous patient</Link>, say so when you book and we will go at your pace. If any area is still sensitive, tell us and we will top it up before we start.</>)}, {"title": "Remove the decay", "body": "We clean out the decay or the damaged part of the tooth and tidy up the edges so the filling has a sound surface to bond to."}, {"title": "Keep it dry", "body": "Composite only bonds well to a dry tooth, so we keep the area free of saliva while we work. Keeping it dry is a big part of how well the filling bonds and how long it holds up."}, {"title": "Layer and cure", "body": "We build the composite up in thin layers, shade-matched to your tooth, and harden each layer with a curing light."}, {"title": "Shape and polish", "body": "We shape the filling to fit your bite, check it with you, and polish it smooth so it feels like the rest of the tooth. Most single fillings are done within one appointment; larger or multiple fillings can take a little longer."}],
  aftercare: {
    eyebrow: "Looking after your filling",
    heading: (<>What to expect <em>afterwards</em></>),
    intro: "A white filling is set hard before you leave, so most of this is about comfort while the numbness fades and keeping the tooth healthy long term.",
    phases: [
      { title: "The first few hours", items: ["The numbness usually wears off after a few hours.", "Wait until full feeling has come back before eating, so you do not bite your cheek, lip or tongue by accident.", "The filling itself is already set hard, so you can use the tooth straight away once you can feel it."] },
      { title: "The first week or two", items: ["Some sensitivity to cold is normal, especially if the decay was deep. It usually settles within a few days.", "If your bite feels high, or one tooth hits first when you close, give us a call. That is a quick adjustment and worth sorting early."] },
      { title: "Ongoing", items: ["Brush twice a day and clean between your teeth daily.", (<>Keep up your <Link to="/treatments/dental-check-ups/">regular check-ups</Link> so we can keep an eye on the filling and catch any wear before it becomes a problem.</>), "Cutting down on sugary food and drink lowers the chance of new decay forming around the edge."] },
      { title: "When to get in touch", items: ["Contact us if pain lingers beyond a couple of weeks, if sensitivity does not settle, or if the filling feels rough, sharp or chipped.", "None of these are dramas, but they are easier to fix sooner rather than later."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: (<>The <em>trade-offs</em>, up front</>),
    body: [
      "They do not last forever. How long a filling lasts varies from person to person and depends on its size, position and how it is cared for. When it wears down, it can be replaced.",
      "Cold sensitivity can linger. For most people it fades in days. After a deep filling it can take longer to fully settle.",
      "They can stain over the years. Coffee, red wine and smoking can darken composite over time, much like they stain a natural tooth. Cutting back helps.",
      "Very large cavities may need more. If too much tooth is gone, a filling will not hold well. In that case an inlay, onlay or a crown is the more sensible repair, and we will say so before you commit to anything.",
      "Heavy grinding is hard on them. If you clench or grind, composite on the back teeth can wear or chip faster. A nightguard can help protect it.",
    ],
  },
  faqHeading: (<>White filling questions, <em>answered</em></>),
  faqs: [{"q": "What are white fillings made of?", "a": "A composite of tooth-coloured dental resin mixed with very fine glass particles. There is no metal and no mercury in it. We pick a shade to match your existing tooth."}, {"q": "Do white fillings hurt?", "a": "The treatment is done under local anaesthetic, so you should feel pressure and movement but not pain. If any area is still sensitive, tell us and we will top up the anaesthetic. If a nervous patient needs us to go slowly and explain each step, that is completely fine. Some mild sensitivity afterwards is normal and settles down."}, {"q": "Can it be done in one visit?", "a": "Usually, yes. A routine filling takes somewhere around 30 to 60 minutes and is placed, set and polished in a single appointment. Very large or multiple fillings may take longer, but they can often still be done in one sitting."}, {"q": "How long do white fillings last?", "a": "Most composite fillings last somewhere between five and ten years, and plenty go well beyond that with good care. The size of the filling, where it sits in the mouth, your bite and how well it is cleaned all play a part, and back teeth take more chewing force than front ones. We will give you a realistic idea for your own tooth at your appointment, and when a filling does eventually wear, it can be replaced."}, {"q": "What is the difference between a white filling and composite bonding?", "a": "The material is much the same; the job is different. A white filling repairs a tooth that has decay, a chip or a crack, so it is treatment for damage. Composite bonding uses the same tooth-coloured resin to reshape a healthy tooth purely for the way it looks, such as smoothing an edge or closing a small gap. If your tooth is sound and the change you want is about appearance, bonding is usually the better fit, and the dentist will point you to the right one at your appointment."}, {"q": "Can I replace my old dark metal fillings with white ones?", "a": "Yes, if that is what you want. Worth knowing first: sound amalgam fillings are safe to leave and do not need replacing for health reasons, so swapping them is an appearance choice rather than a medical one. Before anything comes out we check the tooth underneath is sound, and we will talk you through what we find."}, {"q": "Will a white filling stain?", "a": "It can over the years, mostly from coffee, red wine and smoking, much like a natural tooth picks up stain. It is not stain-proof. Good cleaning and cutting back on the main culprits slows it down."}, {"q": "Is a white filling as strong as a metal one on a back tooth?", "a": "On most teeth it copes well with normal biting. On a back tooth taking heavy force, or if you grind, a very large composite filling can wear faster, and sometimes a crown or onlay is the steadier choice. We will say which option we would pick for your own tooth, and why."}, {"q": "How much does a white filling cost?", "a": "Every mouth is different, so the honest answer is that it depends on you: the size of the cavity, how many surfaces of the tooth are involved, which tooth it is and whether a filling is enough or the tooth would be better served by an inlay, onlay or crown. At your consultation the dentist will go through your options and the cost of each, and you will get a written, itemised quote before anything is agreed. Nothing goes ahead until you are happy."}, {"q": "Are white fillings free on the NHS in Scotland?", "a": "NHS dental examinations are free for everyone in Scotland. NHS dental treatment is free if you are under 26, pregnant or have given birth in the last 12 months, or qualify for a low-income exemption. A filling that treats decay or damage is health treatment, but replacing sound amalgam purely because of how it looks counts as cosmetic, and purely cosmetic treatment is private only. If you are not sure where you stand, ask when you book and we will talk it through."}, {"q": "My filling has just fallen out. What should I do right now?", "a": "Keep the area clean, rinse gently with warm salt water, and avoid chewing on that side. Do not try to glue anything back in with household adhesive. A temporary filling kit from a pharmacy can cover the hole for a short while, and over-the-counter pain relief helps in the meantime. Then call us, whatever the hour. We are open day and night, every day, we hold emergency slots each day and we aim to get you seen quickly."}],
  related: [{"slug": "dental-check-ups", "title": "Dental Check-ups", "tag": "Prevention"}, {"slug": "inlays-onlays", "title": "Inlays & Onlays", "tag": "Tooth Repair"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your<br /> <em>white filling appointment</em></>), sub: "Shade-matched and usually done in one visit. Book a time that works around your day." },
}

export default function WhiteFillings() {
  return <TreatmentPage data={data} />
}

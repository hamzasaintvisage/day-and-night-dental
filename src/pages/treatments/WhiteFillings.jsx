import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>A <em>chipped or aching tooth</em>, or old dark fillings you have tired of?</>),
    body: ["A new cavity, a chipped edge or a worn front tooth tends to nag at you, and it rarely fixes itself. The other thing we hear a lot is people who have grown tired of looking at silver-grey amalgam and want something that simply blends in.", "A white filling sorts both. It bonds straight to the tooth, is matched to your natural shade, and in most cases is done in a single appointment so you walk out the same day with the tooth fixed."],
    symptoms: ["A new cavity or area of decay", "A chipped or cracked edge on a tooth", "A worn or uneven front tooth", "Old silver-grey fillings you would rather not see", "A filling that has fallen out or broken"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "white-fillings",
  side: "day",
  tag: "Tooth Repair",
  h1Plain: "White Fillings",
  procedureType: "MedicalProcedure",
  title: (<>White fillings that match your tooth, <em>usually in one visit</em></>),
  lead: "White fillings in Glasgow that match your tooth, usually in one visit",
  seo: { title: "White Fillings in Glasgow | Day Night Dental", description: "Tooth-coloured composite fillings in Glasgow to repair decay, chips and old amalgam. Shade-matched, usually one visit. Day and evening, 7 days a week." },
  meta: [{"k": "Best for", "v": "Decay, chips and cracks", "tone": "day"}, {"k": "Usually", "v": "One appointment", "tone": ""}, {"k": "Material", "v": "Shade-matched composite", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>A repair that <em>blends in</em></>),
  overview: ["A white filling repairs a tooth that has decay, a chip or a crack, and it does it without leaving dark metal behind. We use a tooth-coloured composite resin that bonds straight to the tooth and is matched to your natural shade. In most cases the whole thing is done in a single appointment under local anaesthetic, so you walk out the same day with the tooth fixed.", "A white filling suits small to medium repairs well, such as a cavity, a chipped edge or a worn front tooth. If a lot of tooth is missing, an inlay, onlay or crown can be the steadier choice, and we will tell you honestly which makes sense for your tooth.", "People come to us at our Merchant City practice in central Glasgow for two main reasons. Some have a new cavity or a broken bit of tooth that needs sorting. Others have older silver-grey amalgam fillings they have grown tired of looking at and want swapped for something that blends in. Both are everyday work for us, and we see patients from across Glasgow for it.", "We are open day and evening, seven days a week, so you do not have to take a morning off work to get a filling done. If a tooth has broken or a filling has fallen out, that often counts as an emergency and we can usually see you quickly. Book a time that suits you, including evenings and weekends."],
  facts: [{"dt": "What they are made of", "dd": "A composite of dental resin and fine glass particles, shaded to match your tooth. No mercury and no metal."}, {"dt": "How they hold in place", "dd": "They bond directly to the tooth structure rather than being wedged in like metal."}, {"dt": "Usually one visit", "dd": "Most fillings are placed, set and polished in a single appointment under local anaesthetic."}, {"dt": "Set straight away", "dd": "The composite is hardened with a curing light as we go, so there is no waiting around for it to set."}, {"dt": "Not permanent", "dd": "A filling can be replaced when it eventually wears, and it does not stop you having a crown or onlay later if the tooth needs one."}],
  benefitsHeading: (<>Why patients choose <em>white fillings</em></>),
  benefits: [
    { title: 'It blends in', body: 'It is shade-matched to your tooth, so the repair does not show when you talk or smile.' },
    { title: 'Keeps more of your tooth', body: 'Because it bonds to the tooth, we can often keep more of the healthy structure than a metal filling would need.' },
    { title: 'Handles small jobs well', body: 'It can fix things metal does not do well, like a chipped edge or a worn front tooth.' },
    { title: 'Swaps out old amalgam', body: 'Old dark fillings can be taken out and replaced with composite if you want them gone.' },
    { title: 'Usable straight away', body: 'The tooth is ready to use the moment the numbness wears off.' },
    { title: 'Repairable', body: 'If it ever chips or stains, it can be repaired or replaced without starting over.' }
  ],
  stepsHeading: (<>Your <em>filling</em> appointment</>),
  steps: [{"title": "Check and numb", "body": "We look at the tooth, take an X-ray if we need one, and give you local anaesthetic so you should feel pressure but not pain. If any area is still sensitive, tell us and we will top it up before we start."}, {"title": "Remove the decay", "body": "We clean out the decay or the damaged part of the tooth and tidy up the edges so the filling has a sound surface to bond to."}, {"title": "Keep it dry", "body": "Composite only bonds well to a dry tooth, so we keep the area free of saliva while we work. Keeping it dry is a big part of how well the filling bonds and how long it holds up."}, {"title": "Layer and cure", "body": "We build the composite up in thin layers, shade-matched to your tooth, and harden each layer with a curing light."}, {"title": "Shape and polish", "body": "We shape the filling to fit your bite, check it with you, and polish it smooth so it feels like the rest of the tooth. Most single fillings are done within one appointment; larger or multiple fillings can take a little longer."}],
  aftercare: {
    eyebrow: "Looking after your filling",
    heading: (<>What to expect <em>afterwards</em></>),
    intro: "A white filling is set hard before you leave, so most of this is about comfort while the numbness fades and keeping the tooth healthy long term.",
    phases: [
      { title: "The first few hours", items: ["The numbness usually wears off after a few hours.", "Wait until full feeling has come back before eating, so you do not bite your cheek, lip or tongue by accident.", "The filling itself is already set hard, so you can use the tooth straight away once you can feel it."] },
      { title: "The first week or two", items: ["Some sensitivity to cold is normal, especially if the decay was deep. It usually settles within a few days.", "If your bite feels high, or one tooth hits first when you close, give us a call. That is a quick adjustment and worth sorting early."] },
      { title: "Ongoing", items: ["Brush twice a day and clean between your teeth daily.", "Keep up your regular check-ups so we can keep an eye on the filling and catch any wear before it becomes a problem.", "Cutting down on sugary food and drink lowers the chance of new decay forming around the edge."] },
      { title: "When to get in touch", items: ["Contact us if pain lingers beyond a couple of weeks, if sensitivity does not settle, or if the filling feels rough, sharp or chipped.", "None of these are dramas, but they are easier to fix sooner rather than later."] },
    ],
  },
  risks: {
    eyebrow: "Honest considerations",
    heading: (<>The <em>straight version</em></>),
    body: [
      "They do not last forever. How long a filling lasts varies from person to person and depends on its size, position and how it is cared for. When it wears down, it can be replaced.",
      "Cold sensitivity can linger. For most people it fades in days. After a deep filling it can take longer to fully settle.",
      "They can stain over the years. Coffee, red wine and smoking can darken composite over time, much like they stain a natural tooth. Cutting back helps.",
      "Very large cavities may need more. If too much tooth is gone, a filling will not hold well. In that case an inlay, onlay or a crown is the more sensible repair, and we will tell you honestly if that is the case.",
      "Heavy grinding is hard on them. If you clench or grind, composite on the back teeth can wear or chip faster. A nightguard can help protect it.",
    ],
  },
  faqHeading: (<>White filling questions, <em>answered</em></>),
  faqs: [{"q": "What are white fillings made of?", "a": "A composite of tooth-coloured dental resin mixed with very fine glass particles. There is no metal and no mercury in it. We pick a shade to match your existing tooth."}, {"q": "Do white fillings hurt?", "a": "The treatment is done under local anaesthetic, so you should feel pressure and movement but not pain. If any area is still sensitive, tell us and we will top up the anaesthetic. If a nervous patient needs us to go slowly and explain each step, that is completely fine. Some mild sensitivity afterwards is normal and settles down."}, {"q": "Can it be done in one visit?", "a": "Usually, yes. A standard filling is placed, set and polished in a single appointment. Very large or multiple fillings may take longer, but they can often still be done in one sitting."}, {"q": "How long do white fillings last?", "a": "It varies with the size of the filling, where it sits in the mouth and how it is cared for. We will give you a realistic idea for your own tooth at your appointment. They are replaceable when they wear."}, {"q": "Can I replace my old dark metal fillings with white ones?", "a": "Yes. We can remove old amalgam fillings and replace them with shade-matched composite. It is worth a quick look first to check the tooth underneath is sound, and we will talk you through what we find."}, {"q": "Will a white filling stain?", "a": "It can over the years, mostly from coffee, red wine and smoking, much like a natural tooth picks up stain. It is not stain-proof. Good cleaning and cutting back on the main culprits slows it down."}, {"q": "Is a white filling as strong as a metal one on a back tooth?", "a": "On most teeth it copes well with normal biting. On a back tooth taking heavy force, or if you grind, a very large composite filling can wear faster, and sometimes a crown or onlay is the steadier choice. We will give you an honest steer for your tooth."}],
  related: [{"slug": "dental-check-ups", "title": "Dental Check-ups", "tag": "Prevention"}, {"slug": "inlays-onlays", "title": "Inlays & Onlays", "tag": "Tooth Repair"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your<br /> <em>white filling appointment</em></>), sub: "Shade-matched and usually done in one visit. Day and evening appointments, seven days a week." },
}

export default function WhiteFillings() {
  return <TreatmentPage data={data} />
}

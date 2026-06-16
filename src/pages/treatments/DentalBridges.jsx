import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>A <em>gap</em> where a tooth used to be?</>),
    body: ["Losing a tooth is rarely just about the gap. The teeth either side start to tilt or drift into the space, your bite can change, and chewing on that side gets harder over time. For a lot of people it is also the look of it that bothers them.", "A bridge fills the gap with a fixed false tooth that anchors to the teeth around it, so you can get back to eating and talking without working around a space. From our Merchant City practice in central Glasgow, we will talk you through whether a bridge is the right fit for you before anything is agreed."],
    symptoms: ["A gap from a lost or extracted tooth", "Teeth either side starting to tilt or drift", "Avoiding certain foods on one side", "Feeling self-conscious about the gap", "Chewing that has got harder over time"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-16',
  lastReviewedLabel: 'June 2026',
  slug: "dental-bridges",
  side: "night",
  tag: "Replacing Teeth",
  h1Plain: "Dental Bridges",
  procedureType: "MedicalProcedure",
  title: (<>A dental bridge fills the gap, <em>fixed in place</em></>),
  lead: "A dental bridge fills the gap left by one or a few missing teeth. The replacement tooth is fixed in place, so it does not come out like a denture. You clean it, eat with it, and forget about it.",
  seo: { title: "Dental Bridges in Glasgow | Day Night Dental", description: "Dental bridges in Glasgow to replace missing teeth with a fixed bridge, shade-matched in the lab. Day and evening appointments, 7 days a week in Merchant City." },
  meta: [{"k": "Type", "v": "Fixed, not removable", "tone": "day"}, {"k": "Replaces", "v": "One or a few teeth", "tone": ""}, {"k": "Usual timeline", "v": "Around two visits", "tone": "night"}],
  overviewEyebrow: 'The Treatment',
  overviewHeading: (<>A <em>fixed</em> way to fill the gap</>),
  overview: ["A bridge is a false tooth (the dentist calls it a pontic) held in place by the teeth either side of the gap, or by a single bonded wing. It stays put. Once it is fitted, you do not take it out at night, and most people stop noticing it is there.", "People come to us for bridges for all sorts of reasons. A tooth knocked out in an accident. One lost to decay or a long-standing problem. A gap that has been there for years and has started to bother you, either because of how it looks or because the teeth around it are drifting. We see all of these at our Merchant City practice in central Glasgow, and we treat patients from across the whole city.", "A bridge is one option among a few for replacing missing teeth. It is not always the right one. We will talk you through how it compares to an implant and to a denture, and we will be straight with you about the trade-offs, because every option has them. If you are nervous, tell us. Plenty of our patients are, and we are used to taking things slowly. We have day and evening appointments seven days a week, so you can come in at a time that actually suits you."],
  facts: [{"dt": "Fixed, not removable", "dd": "A bridge is fixed in place. You do not remove it to clean it, unlike a denture."}, {"dt": "What it replaces", "dd": "It replaces one or a few missing teeth in a row, not gaps scattered all over your mouth."}, {"dt": "How it anchors", "dd": "The false tooth sits between or beside crowns, or is held by a bonded wing, that anchor it to your own teeth."}, {"dt": "Types of bridge", "dd": "There are three main types: conventional, cantilever, and adhesive (also called a Maryland bridge). An adhesive bridge usually bonds to one neighbouring tooth, though it can bond to a tooth on each side."}, {"dt": "Usual timeline", "dd": "A conventional bridge usually takes two visits, with a temporary bridge in between."}, {"dt": "Effect on the bone", "dd": "A bridge does not replace the tooth root, so it does not help preserve the bone under the gap the way an implant can."}],
  benefitsHeading: (<>Why patients choose a <em>bridge</em></>),
  benefits: [
    { title: 'Chew and speak normally again', body: 'It fills the gap so you can get back to eating and talking without working around a space.' },
    { title: 'Nothing to take out', body: 'It is fixed in place, so there is nothing to remove, soak, or worry about slipping.' },
    { title: 'Less room for drifting', body: 'Because it fills the space, the neighbouring teeth have less room to tilt or drift into the gap over time.' },
    { title: 'Shade-matched in the lab', body: 'The false tooth is shade-matched in the lab to blend with the surrounding teeth as closely as possible.' },
    { title: 'Gentle on neighbouring teeth', body: 'An adhesive bridge needs only minimal reshaping of the neighbouring tooth, so most of the healthy enamel is kept.' },
    { title: 'No surgery', body: 'Treatment is usually quicker and simpler than an implant, with no surgery involved.' }
  ],
  stepsHeading: (<>Your <em>bridge</em> journey</>),
  steps: [{"title": "Assessment", "body": "We check the gap and the teeth either side, take X-rays or a scan, and talk through which type of bridge suits your situation. If the anchor teeth are not healthy enough, we will say so."}, {"title": "Preparing the teeth", "body": "For a conventional bridge, we numb the area and reshape the teeth either side of the gap so crowns can fit over them. For an adhesive bridge, this step is much smaller or skipped, because the wing bonds to a neighbouring tooth with little reshaping."}, {"title": "Impressions or a scan", "body": "We take a digital scan or an impression of the prepared teeth and send it to the lab, where your bridge is made and shade-matched."}, {"title": "Temporary bridge", "body": "You usually leave with a temporary bridge protecting the prepared teeth while the lab works. It is not as strong as the final one, so go easy on it."}, {"title": "Fitting", "body": "At the next visit, we try in the finished bridge, check the bite and the look, make any adjustments, and cement it in place."}, {"title": "Settling in", "body": "We give it a final check, explain how to clean it, and you are good to go."}],
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Looking after your <em>bridge</em></>),
    intro: "A bridge is not fit-and-forget. The teeth holding it up still need looking after, and the area under the false tooth traps food in a way your own teeth do not.",
    phases: [
      { title: 'First few days', items: ['Stick to softer foods while things settle.', 'A little sensitivity to hot and cold is normal at first, and usually eases over the following weeks. If it gets worse or does not settle, get in touch with us.', 'Over-the-counter painkillers are fine if you need them.'] },
      { title: 'Every day, long term', items: ['Brush twice a day with a soft brush and fluoride toothpaste, just like the rest of your teeth.', 'The important extra step is cleaning underneath the false tooth, where a normal brush cannot reach. Use a floss threader, superfloss, or interdental brushes to clean under and around it daily. A water flosser helps too.', 'This is the single biggest thing that decides how long your bridge lasts.'] },
      { title: 'Ongoing', items: ['Keep up your regular check-ups and hygiene visits so we can keep an eye on the bridge, the anchor teeth, and your gums.', 'Try to avoid biting very hard or sticky things, and chewing ice, as these can loosen or chip a bridge over time.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>The <em>trade-offs</em>, before you decide</>),
    body: [
      "A conventional bridge means reshaping the teeth either side of the gap. That is permanent, and we are removing healthy enamel from teeth that may be perfectly fine. If those teeth already need crowns, that matters less. If they are untouched and healthy, it is a real downside.",
      "An implant avoids touching the neighbours altogether, because it stands on its own in the bone. A bridge leans on the teeth beside it. Each route suits different situations, and we will talk it through with you.",
      "A denture is the removable option. It touches nothing, but it comes out to be cleaned and many people find it less stable. A bridge is fixed, which most people prefer if they are suitable for one.",
      "An adhesive bridge is the gentlest on your other teeth, but the bonded wing can come unstuck under heavy biting forces, so it is not ideal for back teeth that take a lot of load.",
      "A cantilever bridge is supported on one side only. That puts more load on the single anchor tooth, so it is used in lower-stress positions.",
      "If you clench or grind your teeth, tell us. Heavy grinding adds load that can loosen or damage a bridge, and it matters most for an adhesive bridge.",
      "Bridges can be made from different materials, such as porcelain bonded to metal or all-ceramic. We will talk through which suits the position, the bite, and how it needs to look.",
      "Cleaning under any bridge takes more effort and the right tools. If you would not keep that up, a bridge may struggle.",
      "A bridge does not last forever. How long it lasts varies and depends heavily on cleaning and regular check-ups. Plan for it to need replacing eventually.",
      "The anchor teeth have to stay healthy. If decay or gum problems set in under a crown, the whole bridge is affected. Active gum disease usually needs treating first.",
      "Leaving a gap is also a choice, but it has knock-on effects. The teeth around it can tilt or drift, your bite can change, and chewing can get harder over time.",
    ],
  },
  faqHeading: (<>Dental bridge questions, <em>answered</em></>),
  faqs: [{"q": "What is a dental bridge?", "a": "It is a false tooth, fixed in place, that fills the gap left by one or a few missing teeth. It is held by the teeth either side of the gap, or by a bonded wing fixed to a neighbouring tooth, so it does not come out like a denture."}, {"q": "What types of dental bridge are there?", "a": "Three main ones. A conventional bridge anchors a false tooth between two crowns on the teeth either side. A cantilever bridge anchors to a tooth on one side only and puts more load on that tooth, so it is used in lower-pressure spots. An adhesive bridge (a Maryland bridge) bonds a wing to the back of a neighbouring tooth with very little reshaping; it usually bonds to one tooth, but can bond to a tooth on each side. We will recommend the one that suits the position and the forces in that part of your mouth."}, {"q": "Does getting a bridge hurt?", "a": "The preparation is done under local anaesthetic, so you should not feel pain during it. Some sensitivity afterwards is normal and usually eases over the following weeks. If it gets worse or does not settle, get in touch with us. If you are anxious about it, tell us and we will go at your pace."}, {"q": "How long does a bridge last?", "a": "It varies a lot, and depends heavily on cleaning and regular check-ups. Cleaning under the false tooth is the thing that makes the biggest difference. A bridge is not permanent, though, so plan for it to need replacing eventually."}, {"q": "Bridge or implant, which is better for me?", "a": "Neither is better across the board. An implant stands on its own and leaves the neighbouring teeth untouched, but it involves surgery and takes longer. A bridge is usually quicker and simpler, but a conventional one means reshaping the teeth either side. The right choice depends on your gap, the teeth around it, and your bone and gum health. We will go through both with you honestly."}, {"q": "Am I suitable for a bridge?", "a": "Usually yes if the teeth either side of the gap are healthy and strong enough to take the load, and your gums are in good shape. If those anchor teeth are weak, your gums need treating first, or the gap is large, a bridge may not be the best fit, and we will tell you that at your assessment."}, {"q": "How do I clean under a bridge?", "a": "With the right tools, daily. A floss threader, superfloss, or interdental brushes get under the false tooth where a normal brush cannot. A water flosser helps flush out trapped food. Brush and floss the rest of your mouth as usual. Keeping this area clean is what protects the anchor teeth and your gums."}],
  related: [{"slug": "dental-crowns", "title": "Dental Crowns", "tag": "Tooth Repair"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}, {"slug": "dentures", "title": "Dentures", "tag": "Replacing Teeth"}],
  cta: { heading: (<>Book your<br /> <em>dental bridge consultation</em></>), sub: "An honest look at whether a bridge suits you, weighed against an implant or a denture. Day and evening appointments, seven days a week." },
}

export default function DentalBridges() {
  return <TreatmentPage data={data} />
}

import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<><em>Missing teeth</em>, or dentures that have had their day?</>),
    body: ["Losing a tooth is never just cosmetic. The teeth either side start to drift, the bone beneath the gap slowly shrinks, and chewing on that side gets harder. Loose dentures bring their own daily frustrations, from sore spots to worrying they’ll slip at the worst moment.", "Implants put a stable, permanent tooth back where the gap is, or anchor a denture so it stops moving. From our Merchant City practice in Glasgow, we plan every case carefully, so you know exactly what is involved before you decide."],
    symptoms: ["A gap from a lost or extracted tooth", "A denture that clicks, slips or rubs", "Avoiding certain foods on one side", "Feeling self-conscious when you smile", "An old bridge that has seen better days"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "dental-implants",
  side: "night",
  tag: "Permanent Solutions",
  h1Plain: "Dental Implants",
  procedureType: "SurgicalProcedure",
  title: (<>Dental implants, the closest thing <em>to a natural tooth</em></>),
  lead: "Losing a tooth affects more than how your smile looks. Dental implants at Day Night Dental replace the whole tooth, root and crown, so you can get back to eating, talking and smiling without thinking twice.",
  seo: { title: "Dental Implants in Glasgow | Day Night Dental", description: "Replace missing teeth with dental implants at Day Night Dental in Glasgow. Single implants, bridges and All-on-4. Day and evening appointments, 7 days a week." },
  meta: [{"k": "Suitable for", "v": "1 tooth to full arch", "tone": "night"}, {"k": "Implant lifespan", "v": "Designed to last", "tone": ""}, {"k": "Finance", "v": "0% finance available", "tone": "day"}],
  overviewHeading: (<>A <em>permanent</em> foundation for missing teeth</>),
  overview: ["A dental implant is a small titanium post that takes the place of a missing tooth root. Over a few months it fuses with your jawbone in a natural healing process called osseointegration. Once it has, it gives a really solid base for a crown, a bridge or a full set of replacement teeth that look and feel a lot like your own.", "Because the implant joins with the bone, it also helps protect the jaw, which tends to shrink once a tooth is gone. The result is built to last, with nothing slipping or clicking, and we never have to touch the healthy teeth on either side of the gap.", "Every implant treatment here starts with detailed planning, so your clinician can work out exactly where the implant goes around your nerves, sinuses and the bone you have. A single tooth, an implant-supported bridge or a full-arch restoration, it’s all planned around you, and we talk you through it properly before we start."],
  facts: [{"dt": "Best for", "dd": "Single, multiple or all missing teeth"}, {"dt": "Planning", "dd": "Detailed assessment and written plan"}, {"dt": "Options", "dd": "Single implants, bridges, All-on-4"}, {"dt": "Healing time", "dd": "Usually 3 to 6 months to integrate"}, {"dt": "Anaesthetic", "dd": "Local; sedation available in suitable cases"}],
  benefitsHeading: (<>Why patients choose <em>implants</em></>),
  benefits: [
    { title: 'Enjoy your favourite foods', body: 'Feel confident while enjoying a steak. Implants restore full bite strength so you can eat without pain or hesitation.' },
    { title: 'A 30+ year solution', body: 'With good maintenance, your new smile can last 30+ years, making dental implants one of the most cost-effective long-term dental solutions.' },
    { title: 'Speak and laugh freely', body: 'Replaces loose and ill-fitting dentures causing you discomfort and inconvenience, so you can smile and speak with confidence once again.' },
    { title: 'Protects your facial structure', body: 'Prevents bone loss by stimulating natural bone growth, reducing the risk of facial collapse (puckering).' },
    { title: 'Keeps other teeth in line', body: 'Stops your remaining natural teeth from migrating into the empty gaps and becoming misaligned.' },
    { title: 'Looks completely natural', body: 'Topped with custom-crafted zirconia or porcelain crowns that look and feel exactly like a real tooth.' }
  ],
  stepsHeading: (<>Your <em>implant</em> journey</>),
  steps: [{"title": "Consultation and planning", "body": "We check your mouth, carry out a detailed assessment and talk through what you want. You leave with a clear written plan, a timeline and the costs, all before any treatment starts."}, {"title": "Implant placement", "body": "With the area numbed under local anaesthetic, your clinician places the titanium implant into the jawbone. Most patients are surprised by how comfortable and quick the appointment turns out to be."}, {"title": "Healing and integration", "body": "Over the next few months the implant fuses with the bone. We can fit a temporary tooth so you’re never left with a visible gap while you heal."}, {"title": "Fitting your new tooth", "body": "Once the implant has integrated, we attach your custom-made crown, bridge or full-arch restoration. We check the fit, the bite and the finish before you go."}],
  types: {
    eyebrow: 'Your Options',
    heading: (<>One type of implant doesn’t fit <em>everyone</em></>),
    intro: "The right approach depends on how many teeth you’re replacing, the health of your gums and how much jawbone you have. We work that out together at your consultation. Broadly, there are four routes.",
    items: [
      { icon: 'tooth', title: 'Single tooth implant', body: 'One titanium post topped with a crown, to replace a single missing tooth without touching the healthy teeth either side.' },
      { icon: 'gap', title: 'Implant bridge', body: 'Two or more teeth held by a small number of implants, for when you’re missing several teeth in a row.' },
      { icon: 'denture', title: 'Full-arch (All-on-4)', body: 'A fixed set of teeth secured on four or more implants, to replace a whole upper or lower jaw without a removable plate.' },
      { icon: 'smile', title: 'Denture stabilisation', body: 'Implants that anchor a new or existing denture so it clips firmly in place and stops slipping or rubbing.' },
    ],
  },
  comparison: {
    eyebrow: 'Your Smile, Your Choice',
    heading: (<>How implants compare to a <em>bridge or denture</em></>),
    intro: "Implants aren’t the only way to replace missing teeth. Here’s an honest, side-by-side look at the three main options so you can weigh up what suits you.",
    attribute: 'At a glance',
    columns: [
      { name: 'Dental implant', feat: true },
      { name: 'Conventional bridge' },
      { name: 'Denture' },
    ],
    rows: [
      { label: 'Replaces the tooth root', values: ['Yes', 'No', 'No'] },
      { label: 'Surgery involved', values: ['Minor surgery', 'No surgery', 'No surgery'] },
      { label: 'Affects neighbouring teeth', values: ['No', 'Yes, they’re reshaped', 'No'] },
      { label: 'Helps protect the jawbone', values: ['Yes', 'No', 'No'] },
      { label: 'Stays fixed in place', values: ['Fixed', 'Fixed', 'Removable'] },
      { label: 'Feels closest to a natural tooth', values: ['Closest', 'Close', 'Less so'] },
      { label: 'Longevity with good care', values: ['Longest-lasting', 'Many years', 'Shorter; may need remaking'] },
      { label: 'Up-front cost', values: ['Higher', 'Mid-range', 'Lower'] },
    ],
    note: 'A guide only. The right choice depends on your mouth, your health and what matters to you, which we’ll talk through at your consultation.',
  },
  aftercare: {
    eyebrow: 'Recovery & Aftercare',
    heading: (<>Looking after your implant, <em>day one onwards</em></>),
    intro: "Implants have a high success rate, and good aftercare is a big part of that. Here’s what to expect and how to help things heal.",
    phases: [
      { title: 'The first 72 hours', items: ['Some swelling, bruising or tenderness is normal and usually peaks around day two or three', 'Take your usual paracetamol or ibuprofen, and any antibiotics we prescribe', 'Stick to soft foods and keep clear of the area', 'A cold pack against the cheek helps, never put ice directly on the skin', 'Gentle saltwater rinses after the first 48 hours keep things clean'] },
      { title: 'The first few months', items: ['The implant fuses with the bone over roughly three to four months', 'We can fit a temporary tooth so you’re never left with a visible gap', 'Keep up your check-ups so we can monitor the healing', 'Go easy on hard or sticky foods on that side while it settles'] },
      { title: 'For the long term', items: ['Brush twice a day and clean between the teeth with interdental brushes or a water flosser', 'See the hygienist regularly, just as you would for natural teeth', 'Smoking and vaping markedly raise the risk of failure, so cutting down really helps', 'Call us if you notice numbness, a loose feeling, or swelling that worsens rather than settles'] },
    ],
  },
  boneLoss: {
    eyebrow: 'Not Enough Bone?',
    heading: (<>Lost bone in your jaw? <em>Often still possible</em></>),
    body: [
      "When a tooth has been missing for a while, the bone that used to support it slowly shrinks. That can leave less to anchor an implant, but it rarely rules treatment out on its own.",
      "At your consultation we take a detailed 3D scan to see exactly how much bone you have and where. If it’s limited, there are well-established ways to build it up or work around it, and we’ll talk you through what’s realistic for you before anything is agreed.",
    ],
    optionsTitle: 'Options we may discuss',
    options: [
      { dt: 'Bone graft', dd: 'Builds up a thin area before placement; adds time to treatment' },
      { dt: 'Sinus lift', dd: 'Creates room for an implant in the upper back jaw' },
      { dt: 'Careful planning', dd: 'Sometimes the implant is angled to use the bone you already have' },
      { dt: 'Honest referral', dd: 'If a case is very complex, we’ll say so and point you to the right specialist' },
    ],
  },
  risks: {
    eyebrow: 'Understanding the Risks',
    heading: (<>Honest about the <em>risks</em></>),
    body: [
      "Dental implants have a high success rate, but no treatment is risk-free and we’d rather you hear that from us up front. The most common issue is an implant not fusing properly, which is more likely with smoking, gum disease or an uncontrolled health condition such as diabetes.",
      "Less commonly, an implant placed near a nerve can cause numbness or tingling in the lip, tongue or jaw. Careful 3D planning before surgery is exactly how we keep that risk low. If an implant does fail, it can usually be removed and replaced once the area has healed.",
      "Whatever happens, you’re not on your own with it. If something doesn’t feel right after your surgery, our 24/7 line means there’s always someone in Glasgow to call, day or night.",
    ],
  },
  fees: {
    eyebrow: 'Fees & Finance',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Dental implants are priced individually, because the cost depends on how many teeth you are replacing and any preparatory work such as a bone graft. We do not quote a one-size figure.",
      "After your consultation you get a clear, written treatment plan with the full cost set out, and no obligation to go ahead.",
      "To spread the cost, 0% interest-free finance is available over manageable monthly payments, subject to status, and our team will talk you through what suits you.",
    ],
  },
  faqHeading: (<>Dental implant questions, <em>answered</em></>),
  faqs: [{"q": "How much do dental implants cost?", "a": "A single dental implant, implant-supported bridges and full-arch options like All-on-4 are each priced case by case. The final figure comes down to how many implants you need and any preparatory work, and we put it all in writing after your consultation. Finance options are available if you’d rather spread the cost."}, {"q": "Does getting a dental implant hurt?", "a": "Placement is done under local anaesthetic, so you shouldn’t feel pain at the time. Most patients tell us it was more comfortable than they’d feared. A bit of swelling or tenderness afterwards is normal and usually settles in a few days with ordinary pain relief. If you feel anxious, we can offer sedation in suitable cases."}, {"q": "How long does the whole process take?", "a": "From placement to your final tooth, treatment usually takes three to six months, because the implant needs time to fuse with the bone. Some cases can go quicker, and we often fit a temporary tooth so you’re not left with a gap. Detailed planning lets us give you a realistic timeline from the very first visit."}, {"q": "Am I suitable for dental implants?", "a": "Plenty of adults with one or more missing teeth are suitable. It comes down to your gum health, your general health and how much jawbone you have. A thorough assessment lets us check this properly, and if bone is limited we can talk through options like grafting. The surest way to find out is a consultation."}, {"q": "How long do dental implants last?", "a": "Well looked-after implants can last many years, and for a lot of people they last decades. The implant post itself is designed to be permanent; the crown or bridge on top may eventually need refreshing. Longevity really comes down to keeping your gums healthy, seeing the hygienist, and not smoking, which is the single biggest thing that shortens an implant's life."}, {"q": "Can I have implants if I smoke?", "a": "You can, but smoking and vaping noticeably raise the risk of an implant failing to heal. We'd usually ask you to stop, or at least pause, for a stretch before and after surgery to give it the best chance. We'll talk it through honestly with you rather than turn you away, and we can point you to support if you want to cut down."}, {"q": "Is there an age limit for dental implants?", "a": "There's no upper age limit, it's about health, not your birthday. We treat patients well into later life. The deciding factors are your gum health, general health and how much jawbone you have, all of which we check at the consultation. Implants aren't placed in under-18s, as the jaw is still growing."}, {"q": "Will a dental implant look natural?", "a": "That's the whole point. The crown or bridge is custom-made to match the shape, size and shade of your own teeth, so it blends in. Because the implant comes up through the gum like a natural tooth root, it looks and feels far more natural than a denture sitting on top of the gum."}],
  related: [{"slug": "cosmetic-dentistry", "title": "Cosmetic Dentistry", "tag": "Smile Design"}, {"slug": "general-dentistry", "title": "General Dentistry", "tag": "Foundation Care"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your<br /> <em>dental implant consultation</em></>), sub: "Detailed planning and clear written quotes. Day and evening appointments, 7 days a week." },
}

export default function DentalImplants() {
  return <TreatmentPage data={data} />
}

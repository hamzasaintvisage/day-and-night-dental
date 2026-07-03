import { Link } from 'react-router-dom'
import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<><em>Missing teeth</em>, or dentures that have had their day?</>),
    body: ["Losing a tooth is never just cosmetic. The teeth either side start to drift, the bone beneath the gap slowly shrinks, and chewing on that side gets harder. Loose dentures bring their own daily frustrations, from sore spots to worrying they’ll slip at the worst moment.", (<>Implants put a stable, long-term replacement tooth back where the gap is, or anchor a <Link to="/treatments/dentures/">denture</Link> so it stops moving. We plan every case carefully, so you know exactly what is involved before you decide.</>)],
    symptoms: ["A gap from a lost or extracted tooth", "A denture that clicks, slips or rubs", "Avoiding certain foods on one side", "Feeling self-conscious when you smile", "An old bridge that has seen better days"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "dental-implants",
  side: "night",
  tag: "Replacing Missing Teeth",
  h1Plain: "Dental Implants",
  procedureType: "SurgicalProcedure",
  title: (<>Dental implants, the closest thing <em>to a natural tooth</em></>),
  lead: "Losing a tooth affects more than how your smile looks. Dental implants at Day Night Dental replace the whole tooth, root and crown, so you can get back to eating, talking and smiling without thinking twice.",
  seo: { title: "Dental Implants in Glasgow | Day Night Dental", description: "Replace missing teeth with dental implants at Day Night Dental in Glasgow. Single implants, bridges and All-on-4, planned in detail with a clear written quote." },
  meta: [{"k": "Suitable for", "v": "1 tooth to full arch", "tone": "night"}, {"k": "Implant lifespan", "v": "Can last decades with care", "tone": ""}, {"k": "Fees", "v": "Written quote, no obligation", "tone": "day"}],
  overviewHeading: (<>A stable, <em>long-term</em> foundation for missing teeth</>),
  overview: ["A dental implant is a small titanium post that takes the place of a missing tooth root. Over a few months it fuses with your jawbone in a natural healing process called osseointegration. Once it has, it gives a really solid base for a crown, a bridge or a full set of replacement teeth that look and feel a lot like your own.", "Because the implant joins with the bone, it also helps protect the jaw, which tends to shrink once a tooth is gone. The result is built to last, with nothing slipping or clicking, and we never have to touch the healthy teeth on either side of the gap.", "Every implant treatment here starts with detailed planning, so your clinician can work out exactly where the implant goes around your nerves, sinuses and the bone you have. A single tooth, an implant-supported bridge or a full-arch restoration, it’s all planned around you, and we talk you through it properly before we start."],
  facts: [{"dt": "Best for", "dd": "Single, multiple or all missing teeth"}, {"dt": "Planning", "dd": "Detailed assessment and written plan"}, {"dt": "Options", "dd": "Single implants, bridges, All-on-4"}, {"dt": "Healing time", "dd": "Usually 3 to 6 months to integrate"}, {"dt": "Anaesthetic", "dd": "Local; sedation available in suitable cases"}],
  benefitsHeading: (<>Why patients choose <em>implants</em></>),
  benefits: [
    { title: 'Enjoy your favourite foods', body: 'Feel confident at mealtimes again. Implants restore much of your natural bite, so you can eat more comfortably and with far less worry about slipping or soreness.' },
    { title: 'Built to last', body: 'With good care, implants can last many years, and for many people decades. The titanium post is designed to go the distance; the crown on top may need refreshing over time.' },
    { title: 'Speak and laugh freely', body: 'Nothing slips mid-sentence and nothing needs holding in place. An implant tooth is fixed, so you can talk, laugh and smile without giving it a second thought.' },
    { title: 'Helps protect your facial structure', body: 'An implant keeps the jawbone stimulated the way a natural root does, which helps preserve the bone and the facial support that an empty gap can let shrink over time.' },
    { title: 'Keeps other teeth in line', body: 'Stops your remaining natural teeth from migrating into the empty gaps and becoming misaligned.' },
    { title: 'Looks and feels natural', body: 'Topped with a custom-made zirconia or porcelain crown, shaped and shaded to blend in closely with your own teeth.' }
  ],
  stepsHeading: (<>Your <em>implant</em> journey</>),
  steps: [{"title": "Consultation and planning", "body": "We check your mouth, take a 3D scan of your jaw and talk through what you want. You leave with a clear written plan, a timeline and the costs, all before any treatment starts."}, {"title": "Implant placement", "body": (<>With the area numbed under local anaesthetic, your clinician places the titanium implant into the jawbone. If the thought makes you anxious, <Link to="/treatments/nervous-patients/">sedation</Link> is an option in suitable cases, and most patients are surprised by how comfortable and quick the appointment turns out to be.</>)}, {"title": "Healing and integration", "body": "Over the next few months the implant fuses with the bone. We can fit a temporary tooth so you’re never left with a visible gap while you heal."}, {"title": "Fitting your new tooth", "body": "Once the implant has integrated, we attach your custom-made crown, bridge or full-arch restoration. We check the fit, the bite and the finish before you go."}],
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
    intro: (<>Implants aren’t the only way to replace missing teeth, a conventional <Link to="/treatments/dental-bridges/">bridge</Link> or a denture can also do the job. Here’s a plain, side-by-side look at the three main options so you can weigh up what suits you.</>),
    attribute: 'At a glance',
    columns: [
      { name: 'Dental implant', feat: true },
      { name: 'Conventional bridge' },
      { name: 'Denture' },
    ],
    rows: [
      { label: 'Replaces the tooth root', values: ['Yes', 'No', 'No'] },
      { label: 'Surgery involved', values: ['Minor surgery', 'No surgery', 'No surgery'] },
      { label: 'Affects neighbouring teeth', values: ['No', 'Yes, they’re reshaped', 'Can do'] },
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
    intro: "Most implants heal without a hitch, and good aftercare is a big part of why. Here’s what to expect at each stage and how to help things settle.",
    phases: [
      { title: 'The first 72 hours', items: ['Some swelling, bruising or tenderness is normal and usually peaks around day two or three', 'Take your usual paracetamol or ibuprofen, and any antibiotics we prescribe', 'Stick to soft foods and keep clear of the area', 'A cold pack against the cheek helps, never put ice directly on the skin', 'Gentle saltwater rinses after the first 48 hours keep things clean'] },
      { title: 'The first few months', items: ['The implant fuses with the bone over roughly three to six months', 'A temporary tooth can cover the space while everything integrates', 'Keep up your check-ups so we can monitor the healing', 'Go easy on hard or sticky foods on that side while it settles'] },
      { title: 'For the long term', items: ['Brush twice a day and clean between the teeth with interdental brushes or a water flosser', (<>See the <Link to="/treatments/dental-hygiene/">hygienist</Link> regularly; gum problems around an implant, known as peri-implantitis, are one of the main reasons implants fail later on</>), 'Smoking markedly raises the risk of failure, and vaping may do the same, so cutting down really helps', 'Call us if you notice numbness, a loose feeling, or swelling that worsens rather than settles'] },
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
      { dt: 'Specialist referral', dd: 'If a case is very complex, we’ll say so and point you to the right specialist' },
    ],
  },
  risks: {
    eyebrow: 'Understanding the Risks',
    heading: (<>Honest about the <em>risks</em></>),
    body: [
      (<>Dental implants have a high success rate, with implant studies typically reporting around 95 percent or higher survival at ten years, but no treatment is risk-free and we’d rather you hear that from us up front. The most common issue is an implant not fusing properly, which is more likely with smoking, <Link to="/treatments/gum-disease-treatment/">gum disease</Link> or a poorly-controlled condition such as diabetes. Active gum disease always needs treating first, before any implant is placed.</>),
      "Less commonly, an implant placed near a nerve can cause numbness or tingling in the lip, tongue or jaw. Careful 3D planning before surgery is exactly how we keep that risk low. If an implant does fail, it can usually be removed and replaced once the area has healed.",
      (<>Whatever happens, you’re not on your own with it. If something doesn’t feel right after your surgery, our <Link to="/treatments/emergency-dentist/">24/7 emergency line</Link> means there’s always someone in Glasgow to call, day or night.</>),
    ],
  },
  fees: {
    eyebrow: 'Fees',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Dental implants are priced individually, because the cost depends on how many teeth you are replacing and any preparatory work such as a bone graft. We do not quote a one-size figure.",
      "After your consultation you get a clear, written treatment plan with the full cost set out, and no obligation to go ahead.",
      "Implant treatment also means a handful of visits spread over several months, so it helps that we are easy to reach: 80 Hutcheson St sits in Merchant City, a couple of minutes from Argyle Street and Queen Street stations and the St Enoch subway, right in the middle of Glasgow.",
    ],
  },
  faqHeading: (<>Dental implant questions, <em>answered</em></>),
  faqs: [{"q": "How much do dental implants cost?", "a": "A single dental implant, implant-supported bridges and full-arch options like All-on-4 are each priced case by case, because the final figure comes down to how many implants you need and any preparatory work such as a bone graft. At your consultation the dentist will examine your mouth, take a 3D scan, go through your options and the cost of each, and you will get a written, itemised quote before you decide anything. Nothing goes ahead until you are happy."}, {"q": "Does getting a dental implant hurt?", "a": "Placement is done under local anaesthetic, so you shouldn’t feel pain at the time. Most patients tell us it was more comfortable than they’d feared. A bit of swelling or tenderness afterwards is normal and usually settles in a few days with ordinary pain relief. If you feel anxious, we can offer sedation in suitable cases."}, {"q": "How long does the whole process take?", "a": "From placement to your final tooth, treatment usually takes three to six months, because the implant needs time to fuse with the bone. Some cases can go quicker, and we often fit a temporary tooth so you’re not left with a gap. Detailed planning lets us give you a realistic timeline from the very first visit."}, {"q": "Can an implant be placed the same day as an extraction?", "a": "Sometimes. In carefully selected cases an implant can go straight into the socket when the tooth comes out, and occasionally a temporary tooth is fitted at the same visit, which is what teeth-in-a-day adverts usually describe. It depends on the bone, the gums and whether there is any infection, and even then the implant still needs three to six months to fuse before the final tooth is fitted. If a tooth has been missing for years and the bone has shrunk, it may need building up first. Your dentist will tell you at the consultation which timeline is realistic for you."}, {"q": "Am I suitable for dental implants?", "a": "Plenty of adults with one or more missing teeth are suitable. It comes down to your gum health, your general health and the amount of bone in your jaw. One thing is non-negotiable: active gum disease has to be brought under control before an implant is placed, because it puts the healing at risk. A thorough assessment lets us check all of this properly, and if bone is limited we can talk through options like grafting. The surest way to find out is a consultation."}, {"q": "How long do dental implants last?", "a": "Well looked-after implants can last many years, and for a lot of people they last decades. Implant studies typically report around 95 percent or higher survival at ten years. The implant post itself is designed to be permanent; the crown or bridge on top may eventually need refreshing. Longevity really comes down to keeping your gums healthy, seeing the hygienist, and not smoking, which is one of the biggest things that shortens an implant's life."}, {"q": "Can I have implants if I smoke?", "a": "You can, but smoking noticeably raises the risk of an implant failing to heal, and vaping may do the same. We'd usually ask you to stop, or at least pause, for a stretch before and after surgery to give it the best chance. We'd rather talk it through with you than turn you away, and we can point you to support if you want to cut down."}, {"q": "Is there an age limit for dental implants?", "a": "There's no upper age limit, it's about health, not your birthday. We treat patients well into later life. The deciding factors are your gum health, general health and the condition of your jawbone, all of which we check at the consultation. Implants aren't placed in under-18s, as the jaw is still growing."}, {"q": "Will a dental implant look natural?", "a": "That's the whole point. The crown or bridge is custom-made to match the shape, size and shade of your own teeth, so it blends in. Because the implant comes up through the gum like a natural tooth root, it looks and feels far more natural than a denture sitting on top of the gum."}, {"q": "What should I do if something goes wrong with my implant at night?", "a": "Do not sit worrying until morning. If the area is bleeding, press a clean, folded piece of gauze or cloth gently on the spot for twenty minutes and stay sitting upright. For swelling, hold a cold pack against your cheek, never ice straight on the skin, and take your usual paracetamol or ibuprofen. If a crown, healing cap or the implant itself feels loose or comes away, keep it safe, keep the area clean and avoid chewing on that side. Then call us. We are open day and night, every day, we hold same-day emergency slots and we aim to see you quickly."}],
  related: [{"slug": "dentures", "title": "Dentures", "tag": "Replacing Teeth"}, {"slug": "dental-bridges", "title": "Dental Bridges", "tag": "Fixed Replacement"}, {"slug": "emergency-dentist", "title": "Emergency Care", "tag": "24/7 Available"}],
  cta: { heading: (<>Book your<br /> <em>dental implant consultation</em></>), sub: "A thorough assessment, a clear written quote and a realistic timeline, with no pressure to go ahead." },
}

export default function DentalImplants() {
  return <TreatmentPage data={data} />
}

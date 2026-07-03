import { Link } from 'react-router-dom'
import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Worn-down teeth, or a smile you’ve <em>stopped showing</em>?</>),
    body: [
      "Teeth wear, chip and discolour over the years, from grinding, acidic foods, old fillings or simply time. Bit by bit, a lot of people stop smiling in photos without ever really deciding to. It creeps up on you.",
      (<>Cosmetic dentistry is about getting that confidence back. Whether it’s gentle <Link to="/treatments/composite-bonding/">composite bonding</Link>, <Link to="/treatments/porcelain-veneers/">porcelain veneers</Link> or a full <Link to="/treatments/smile-makeover/">smile makeover</Link>, we plan the result around what you want to change, and show you a preview before any work begins.</>),
      (<>One thing first: if a tooth has just chipped or broken and it hurts, that is today’s job rather than a cosmetic one. Start with our <Link to="/treatments/emergency-dentist/">emergency dentist</Link> page, and once you are comfortable we can make the repair disappear.</>),
    ],
    symptoms: ["Teeth that look short, worn or flat", "Chips, cracks or uneven edges", "Old discoloured fillings on show", "Staining that whitening alone won’t fix", "Hiding your teeth in photos"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "cosmetic-dentistry",
  side: "night",
  tag: "Smile Design",
  h1Plain: "Cosmetic Dentistry",
  procedureType: "MedicalProcedure",
  title: (<>Cosmetic dentistry, <em>a smile designed around your face</em></>),
  lead: "From porcelain veneers to subtle composite bonding, we build your cosmetic plan around your goals, your teeth and the way you want to feel when you smile.",
  seo: { title: "Cosmetic Dentist in Glasgow | Day Night Dental", description: "Cosmetic dentist in Glasgow. Porcelain veneers, composite bonding and smile makeovers at Day Night Dental, with a digital smile preview before you commit." },
  meta: [{"k": "Treatment time", "v": "1 to 6 weeks", "tone": "day"}, {"k": "See it first", "v": "Digital smile preview", "tone": ""}, {"k": "Clinicians", "v": "GDC-registered", "tone": "night"}],
  overviewHeading: (<>A smile makeover, <em>designed just for you</em></>),
  overview: [
    "If you are looking for a cosmetic dentist in Glasgow, it helps to know that cosmetic dentistry is about more than whiter, straighter teeth. It is about creating a smile that suits your face and feels like you. We start with a proper look at your teeth, gums and bite, then design a plan that puts your dental health first and the look second.",
    (<>Every smile is different, so no two makeovers are the same. Maybe you want to close a small gap, tidy up a chipped edge, or change several teeth at once. Whatever it is, we match the shade, shape and proportions so the result looks natural and not obvious. For a lot of people, a few small changes make the biggest difference, and if old darkened fillings are part of what bothers you, tooth-coloured <Link to="/treatments/white-fillings/">white fillings</Link> can be swapped in as part of the same plan.</>),
    "We want you to feel sure before anything begins, so we use a digital smile preview wherever we can. That way you get to see where things are heading before you decide. All treatment here is carried out by GDC-registered clinicians, and that is worth checking wherever you go, because anyone practising dentistry legally in the UK must be on the GDC register. We will always give you a clear picture of your options, the likely result and anything it cannot do.",
  ],
  facts: [{"dt": "Best for", "dd": "Chips, gaps, discolouration, worn or uneven teeth"}, {"dt": "Options", "dd": "Porcelain veneers, composite bonding, full smile makeovers"}, {"dt": "Anaesthetic", "dd": "Often none needed; local anaesthetic in suitable cases"}, {"dt": "Longevity", "dd": "Veneers often last around 10 years with good care"}, {"dt": "Preview", "dd": "Digital smile design before you commit"}],
  benefitsHeading: (<>Why patients choose our <em>cosmetic care</em></>),
  benefits: [{"title": "Designed around your face", "body": "We plan the shade, shape and proportion of every change so your new smile looks balanced and natural and never too uniform or too bright."}, {"title": "Minimally invasive options", "body": "Composite bonding can often reshape teeth with little or no drilling. In the right cases it is a gentle way to sort out chips, gaps and small imperfections."}, {"title": "See it before you decide", "body": "A digital smile preview shows you where things are likely to end up early on. You can tweak the look and feel sure of yourself before any permanent work starts."}, {"title": "Care that fits your life", "body": "We are open day and night, every day, so you can fit your smile makeover around work and family without the usual scheduling headache."}],
  stepsHeading: (<>Your <em>smile makeover</em> journey</>),
  steps: [{"title": "Consultation and smile assessment", "body": "We listen to what you would like to change, check your teeth, gums and bite, and talk through which options realistically suit your goals and your budget."}, {"title": "Digital smile preview", "body": "Using photos and digital design, we show you a picture of where your new smile could go, then adjust the shape and shade together until it feels right."}, {"title": "Bespoke treatment", "body": "We carry out the treatment you have chosen, whether that is veneers, bonding or a mix of both, taking care over the detail and keeping you comfortable and in the loop at every visit."}, {"title": "Reveal and aftercare", "body": "We fine-tune the final result, check your bite and finish, and give you advice on cleaning and care that is tailored to you, so your smile keeps looking its best."}],
  types: {
    eyebrow: 'Our Cosmetic Treatments',
    heading: (<>Ways we can <em>refresh your smile</em></>),
    intro: "Pick the treatment that fits your teeth and your goal, or start with a smile makeover if you are not sure where to begin.",
    items: [
      { icon: 'sparkle', title: 'Composite bonding', body: 'Help with chips, gaps and worn edges using tooth-coloured resin, sculpted by hand. Often no drilling, usually one visit, and largely reversible.', slug: 'composite-bonding' },
      { icon: 'smile', title: 'Porcelain veneers', body: 'Thin porcelain shells, custom made and bonded to your front teeth to change shape, shade and symmetry. A lasting way to even out a smile and lift stubborn colour.', slug: 'porcelain-veneers' },
      { icon: 'gap', title: 'Smile makeover', body: 'A combined plan sequenced step by step, with a digital preview before we start. Straighten, whiten, then bond or veneer where it helps.', slug: 'smile-makeover' },
      { icon: 'rise', title: 'Teeth whitening', body: 'Dentist-led whitening shaped to your teeth, lifting everyday staining from coffee, tea and time. Often the first step before any bonding or veneers.', slug: 'teeth-whitening' },
      { icon: 'align', title: 'Invisalign', body: 'Clear, removable aligners to gently straighten crowding, gaps and a crooked smile, often the first step in a makeover.', slug: 'invisalign' },
    ],
  },
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Caring for your <em>new smile</em></>),
    intro: "Cosmetic work looks after itself for the most part, but a few good habits keep it looking its best. Here is what helps, whatever you have had done.",
    phases: [
      { title: 'Everyday habits', items: ['Brush twice a day and floss as normal, paying attention to the edges where bonding or veneers meet your own teeth.', (<>Keep up your regular <Link to="/treatments/dental-hygiene/">hygienist visits</Link> so the gums and margins stay healthy.</>), "Don't bite your nails or hard objects, and don't use your teeth to open things.", 'If you grind or clench, wear a night guard to protect the work while you sleep.'] },
      { title: 'Protecting the result', items: ['Go easy on staining foods and drinks like coffee, tea and red wine, especially in the first day or two after composite bonding.', 'Rinse with water after anything acidic or strongly coloured.', 'Keep up your reviews so we can spot any small issues early and keep everything looking even.'] },
      { title: 'Over time', items: ['Composite bonding can usually be polished, topped up or repaired if it dulls or chips.', 'Porcelain veneers are cared for just like natural teeth and replaced down the line when needed.', 'Whitening can be topped up now and then to keep the shade where you like it.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to weigh up <em>before you decide</em></>),
    body: [
      "Health comes first. Any decay or gum disease is treated before cosmetic work begins, because a healthy mouth is what makes the result last.",
      "We aim for natural, not over-white or bulky. The goal is a smile that still looks like yours, only tidier, never one that looks obviously done.",
      "Some options involve a small irreversible step. Porcelain veneers, for example, usually mean preparing a little tooth, and enamel doesn't grow back, so it is worth being sure first.",
      "Cosmetic work is a long-term commitment. It needs upkeep and, in time, some of it will need refreshing or replacing.",
      "If teeth are crooked, straightening them first usually gives a better and healthier result than masking them. We will say so if that is the case.",
      "Not everyone is a candidate for every option. If something would not suit you or your teeth, we will tell you before you spend anything.",
    ],
  },
  faqHeading: (<>Cosmetic dentistry, your questions <em>answered</em></>),
  faqs: [{"q": "How much does cosmetic dentistry cost?", "a": "Every mouth is different, so the honest answer is that it depends on you: how many teeth we are treating, whether composite bonding, porcelain veneers or a mix of the two suits you best, and whether whitening or straightening comes first. At your consultation the dentist will go through your options and the cost of each, and you will get a written, itemised quote before anything is agreed. Nothing goes ahead until you are happy."}, {"q": "Is cosmetic dentistry available on the NHS?", "a": "Purely cosmetic treatment, such as bonding, veneers, whitening and smile makeovers, is private-only. NHS dental examinations are free for everyone in Scotland. NHS dental treatment is free if you are under 26, pregnant or have given birth in the last 12 months, or qualify for a low-income exemption, but that cover is for dental health rather than appearance. Worth knowing too: tooth whitening is not permitted for under-18s. At your consultation we will be clear about which parts of your plan are health-driven and which are cosmetic."}, {"q": "Which cosmetic treatment is right for me?", "a": "That is exactly what the consultation is for. Some people only need a little composite bonding to tidy a chip or gap, others want whitening first, and some are better suited to veneers or straightening before anything else. We look at your teeth, listen to what you would like to change, and talk you through the options clearly so you can pick what fits."}, {"q": "Do I have to decide everything at the first visit?", "a": "Not at all. The first visit is for looking, listening and talking through your options. You go away with a clear plan and a quote, and you decide in your own time. There is no pressure to commit on the day."}, {"q": "Can I see my new smile before I commit?", "a": "Usually, yes. Wherever we can, we use a digital smile preview so you can see where things are heading and tweak the shape and shade with us before any permanent work starts. It means fewer surprises and a result you have already had a say in."}, {"q": "Will it look natural rather than fake?", "a": "That is the whole idea. We blend any new work with the rest of your smile so the result looks like you, just tidier. We steer away from over-white or bulky, because a natural smile tends to be the one people are happiest with long term."}, {"q": "I'm nervous about the dentist, can you help?", "a": "Yes. Tell us you are nervous and we will go at your pace, explain each step before it happens and agree a signal so you can pause things at any point. A lot of cosmetic work is gentler than people expect, and plenty of anxious patients get through it more easily than they feared."}, {"q": "Does cosmetic dental treatment hurt?", "a": "Most cosmetic treatment is comfortable. Composite bonding is often done with no anaesthetic at all, and veneers may need a little local anaesthetic while the teeth are prepared. Any sensitivity afterwards tends to settle within a few days, and we will tell you what to expect before each visit."}, {"q": "How long does a smile makeover take?", "a": "It depends on the treatment. Composite bonding can often be done in a single appointment. Porcelain veneers usually take a couple of visits over a few weeks while your veneers are made for you. We will give you a realistic timeline at your consultation."}, {"q": "How long do cosmetic results last?", "a": "It varies by treatment and by how you care for them. Porcelain veneers often last around 10 years, and sometimes well beyond, with good care. Composite bonding commonly lasts around 3 to 5 years and often longer, and it can usually be polished or repaired rather than replaced. Whitening can be topped up as needed. Good cleaning, regular check-ups, not biting hard objects and a night guard if you grind all help your results last longer."}, {"q": "Can I combine treatments?", "a": "Often, yes, and a lot of smile makeovers do exactly that. A common path is to straighten first, then whiten, then bond or veneer where it helps, all sequenced into one plan. We work out the order with you so each step builds on the last. You will find us at 80 Hutcheson Street, a couple of minutes from Argyle Street and Queen Street stations and the St Enoch subway, which makes it easy to slot a series of visits in before or after work in the city centre."}, {"q": "I've chipped a front tooth out of hours, what should I do right now?", "a": "Keep any broken piece if you can find it, rinse your mouth gently with warm water, and cover a sharp edge with sugar-free chewing gum to protect your lip and tongue. If the tooth is sensitive, avoid very hot or cold drinks and take your usual pain relief if you need it. Then call us, any time, day or night. We hold same-day emergency slots every day and aim to see you quickly, and once the tooth is settled we can plan how to make the repair blend in."}],
  related: [{"slug": "invisalign", "title": "Invisalign®", "tag": "Clear Aligners"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}],
  cta: { heading: (<>Book your<br /> <em>smile design consultation</em></>), sub: "See your new smile before you commit, at a consultation that fits around your life." },
}

export default function CosmeticDentistry() {
  return <TreatmentPage data={data} />
}

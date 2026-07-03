import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Worn-down teeth, or a smile you’ve <em>stopped showing</em>?</>),
    body: ["Teeth wear, chip and discolour over the years, from grinding, acidic foods, old fillings or simply time. Bit by bit, a lot of people stop smiling in photos without ever really deciding to. It creeps up on you.", "Cosmetic dentistry is about getting that confidence back. Whether it’s gentle composite bonding, porcelain veneers or a full smile makeover, we design the result around your face here in Glasgow, and show you a preview before any work begins."],
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
  lead: "From porcelain veneers to subtle composite bonding, we build your cosmetic plan around your features, your goals and the way you want to feel when you smile.",
  seo: { title: "Cosmetic Dentistry in Glasgow | Day Night Dental", description: "Cosmetic dentistry in Glasgow. Porcelain veneers, composite bonding and smile makeovers at Day Night Dental, with a digital smile preview, 7 days a week." },
  meta: [{"k": "Treatment time", "v": "1 to 6 weeks", "tone": "day"}, {"k": "See it first", "v": "Digital smile preview", "tone": ""}, {"k": "Finance", "v": "Options available", "tone": "night"}],
  overviewHeading: (<>A smile makeover, <em>designed just for you</em></>),
  overview: ["Cosmetic dentistry is about more than whiter, straighter teeth. It is about creating a smile that suits your face and feels like you. We start with a proper look at your teeth, gums and bite, then design a plan that puts your dental health first and the look second.", "Every face is different, so no two smile makeovers are the same. Maybe you want to close a small gap, tidy up a chipped edge with composite bonding, or change several teeth with porcelain veneers. Whatever it is, we match the shade, shape and proportions so the result looks natural and not obvious. For a lot of people, a few small changes make the biggest difference.", "We want you to feel sure before anything begins, so we use a digital smile preview wherever we can. That way you get to see where things are heading before you decide. All treatment is carried out by GDC-registered clinicians, and we will always be honest with you about your options, the likely result and anything it cannot do."],
  facts: [{"dt": "Best for", "dd": "Chips, gaps, discolouration, worn or uneven teeth"}, {"dt": "Options", "dd": "Porcelain veneers, composite bonding, full smile makeovers"}, {"dt": "Anaesthetic", "dd": "Often none needed; local anaesthetic in suitable cases"}, {"dt": "Longevity", "dd": "Veneers typically last many years with good care"}, {"dt": "Preview", "dd": "Digital smile design before you commit"}],
  benefitsHeading: (<>Why patients choose our <em>cosmetic care</em></>),
  benefits: [{"title": "Designed around your face", "body": "We plan the shade, shape and proportion to suit your features, so your new smile looks balanced and natural and never too uniform or too bright."}, {"title": "Minimally invasive options", "body": "Composite bonding can often reshape teeth with little or no drilling. In the right cases it is a gentle way to sort out chips, gaps and small imperfections."}, {"title": "See it before you decide", "body": "A digital smile preview shows you where things are likely to end up early on. You can tweak the look and feel sure of yourself before any permanent work starts."}, {"title": "Care that fits your life", "body": "We open day and evening, seven days a week, so you can fit your smile makeover around work and family without the usual scheduling headache."}],
  stepsHeading: (<>Your <em>smile makeover</em> journey</>),
  steps: [{"title": "Consultation and smile assessment", "body": "We listen to what you would like to change, check your teeth, gums and bite, and talk through which options realistically suit your goals and your budget."}, {"title": "Digital smile preview", "body": "Using photos and digital design, we show you a picture of where your new smile could go, then adjust the shape and shade together until it feels right."}, {"title": "Bespoke treatment", "body": "We carry out the treatment you have chosen, whether that is veneers, bonding or a mix of both, taking care over the detail and keeping you comfortable and in the loop at every visit."}, {"title": "Reveal and aftercare", "body": "We fine-tune the final result, check your bite and finish, and give you advice on cleaning and care that is tailored to you, so your smile keeps looking its best."}],
  types: {
    eyebrow: 'Our Cosmetic Treatments',
    heading: (<>Ways we can <em>refresh your smile</em></>),
    intro: "Pick the treatment that fits your teeth and your goal, or start with a smile makeover if you are not sure where to begin. All carried out at our Merchant City practice in central Glasgow.",
    items: [
      { icon: 'sparkle', title: 'Composite bonding', body: 'Help with chips, gaps and worn edges using tooth-coloured resin, sculpted by hand. Often no drilling, usually one visit, and largely reversible.', slug: 'composite-bonding' },
      { icon: 'smile', title: 'Porcelain veneers', body: 'Thin porcelain shells, custom made and bonded to your front teeth to change shape, shade and symmetry. A lasting way to even out a smile and lift stubborn colour.', slug: 'porcelain-veneers' },
      { icon: 'gap', title: 'Smile makeover', body: 'A combined plan built around your face, sequenced step by step, with a digital preview before we start. Straighten, whiten, then bond or veneer where it helps.', slug: 'smile-makeover' },
      { icon: 'rise', title: 'Teeth whitening', body: 'Dentist-led whitening shaped to your teeth, lifting everyday staining from coffee, tea and time. Often the first step before any bonding or veneers.', slug: 'teeth-whitening' },
      { icon: 'align', title: 'Invisalign', body: 'Clear, removable aligners to gently straighten crowding, gaps and a crooked smile, often the first step in a makeover.', slug: 'invisalign' },
    ],
  },
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Caring for your <em>new smile</em></>),
    intro: "Cosmetic work looks after itself for the most part, but a few good habits keep it looking its best. Here is what helps, whatever you have had done.",
    phases: [
      { title: 'Caring for your new smile', items: ['Brush twice a day and floss as normal, paying attention to the edges where bonding or veneers meet your own teeth.', 'Keep up your regular hygienist visits so the gums and margins stay healthy.', "Don't bite your nails or hard objects, and don't use your teeth to open things.", 'If you grind or clench, wear a night guard to protect the work while you sleep.'] },
      { title: 'Protecting the result', items: ['Go easy on staining foods and drinks like coffee, tea and red wine, especially in the first day or two after composite bonding.', 'Rinse with water after anything acidic or strongly coloured.', 'Keep up your reviews so we can spot any small issues early and keep everything looking even.'] },
      { title: 'Over time', items: ['Composite bonding can usually be polished, topped up or repaired if it dulls or chips.', 'Porcelain veneers are cared for just like natural teeth and replaced down the line when needed.', 'Whitening can be topped up now and then to keep the shade where you like it.'] },
    ],
  },
  risks: {
    eyebrow: 'Honest considerations',
    heading: (<>What to weigh up <em>before you decide</em></>),
    body: [
      "Health comes first. Any decay or gum disease is treated before cosmetic work begins, because a healthy mouth is what makes the result last.",
      "We aim for natural, not over-white or bulky. The goal is a smile that suits your face, not one that looks obviously done.",
      "Some options involve a small irreversible step. Porcelain veneers, for example, usually mean preparing a little tooth, and enamel doesn't grow back, so it is worth being sure first.",
      "Cosmetic work is a long-term commitment. It needs upkeep and, in time, some of it will need refreshing or replacing.",
      "If teeth are crooked, straightening them first usually gives a better and healthier result than masking them. We will say so if that is the case.",
      "Not everyone is a candidate for every option, and we will tell you honestly if something would not suit you or your teeth.",
    ],
  },
  faqHeading: (<>Cosmetic dentistry, your questions <em>answered</em></>),
  faqs: [{"q": "How much does cosmetic dentistry cost?", "a": "Costs vary because every plan is built around you. Composite bonding is priced per tooth, and porcelain veneers and full smile makeovers are priced for you after your assessment. You will get a clear written quote before any treatment, and finance options are available."}, {"q": "Which cosmetic treatment is right for me?", "a": "That is exactly what the consultation is for. Some people only need a little composite bonding to tidy a chip or gap, others want whitening first, and some are better suited to veneers or straightening before anything else. We look at your teeth, listen to what you would like to change, and talk you through the options honestly so you can pick what fits."}, {"q": "Do I have to decide everything at the first visit?", "a": "Not at all. The first visit is for looking, listening and talking through your options. You go away with a clear plan and a quote, and you decide in your own time. There is no pressure to commit on the day."}, {"q": "Can I see my new smile before I commit?", "a": "Usually, yes. Wherever we can, we use a digital smile preview so you can see where things are heading and tweak the shape and shade with us before any permanent work starts. It means fewer surprises and a result you have already had a say in."}, {"q": "Will it look natural rather than fake?", "a": "That is the whole idea. We match the shade, shape and proportions to your face so the result looks like you, just tidier. We steer away from over-white or bulky, because a natural smile tends to be the one people are happiest with long term."}, {"q": "I'm nervous about the dentist, can you help?", "a": "Yes. A lot of cosmetic work, like composite bonding, is gentle and often needs no anaesthetic at all. Tell us you are nervous and we will go at your pace, explain each step and check you are comfortable as we go. Plenty of anxious patients get through it more easily than they expected."}, {"q": "Does cosmetic dental treatment hurt?", "a": "Most cosmetic treatment is comfortable. Composite bonding is often done with no anaesthetic at all, and veneers may need a little local anaesthetic in some cases. Most people find the whole thing straightforward, and we will always check you are comfortable as we go."}, {"q": "How long does a smile makeover take?", "a": "It depends on the treatment. Composite bonding can often be done in a single appointment. Porcelain veneers usually take a couple of visits over a few weeks while your veneers are made for you. We will give you a realistic timeline at your consultation."}, {"q": "How long do cosmetic results last?", "a": "It varies by treatment and by how you care for them. With good cleaning and regular check-ups, porcelain veneers usually last many years, composite bonding often lasts several years before it needs a refresh, and whitening can be topped up as needed. Steering clear of biting hard objects and wearing a guard at night if you grind both help your results last longer."}, {"q": "Can I combine treatments?", "a": "Often, yes, and a lot of smile makeovers do exactly that. A common path is to straighten first, then whiten, then bond or veneer where it helps, all sequenced into one plan. We work out the order with you so each step builds on the last. Our Merchant City clinic runs day and evening appointments seven days a week, so it is easier to fit a few visits around work."}],
  related: [{"slug": "invisalign", "title": "Invisalign®", "tag": "Clear Aligners"}, {"slug": "teeth-whitening", "title": "Teeth Whitening", "tag": "Brighter Smile"}, {"slug": "dental-implants", "title": "Dental Implants", "tag": "Permanent Solutions"}],
  cta: { heading: (<>Book your<br /> <em>smile design consultation</em></>), sub: "Day and evening appointments, 7 days a week. See your new smile before you commit." },
}

export default function CosmeticDentistry() {
  return <TreatmentPage data={data} />
}

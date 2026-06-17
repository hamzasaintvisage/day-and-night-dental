import TreatmentPage from '../../components/TreatmentPage'

const data = {
  concern: {
    heading: (<>Teeth looking <em>yellow, dull or stained</em>?</>),
    body: ["Tea, coffee, red wine and time all leave their mark, and over-the-counter kits rarely make much difference. It’s one of the first things people notice, and one of the easiest to put right safely.", "Professional whitening at our Glasgow practice is dentist-led and far stronger than anything you can buy on the high street, with your comfort and any sensitivity carefully managed throughout."],
    symptoms: ["Yellowing or dull-looking teeth", "Stains from tea, coffee or red wine", "High-street kits that did nothing", "Wanting a brighter smile for an event", "Worry about sensitivity from whitening"],
  },
  ctaPrimaryLabel: 'Book a Consultation',
  lastReviewed: '2026-06-08',
  lastReviewedLabel: 'June 2026',
  slug: "teeth-whitening",
  side: "day",
  tag: "Brighter Smile",
  h1Plain: "Teeth Whitening",
  procedureType: "CosmeticProcedure",
  title: (<>Teeth whitening, done properly. <em>Brighter and even</em></>),
  lead: "A dentist-led whitening plan that lifts years of staining and brings back a naturally brighter smile. We keep a close eye on sensitivity the whole way through.",
  seo: { title: "Teeth Whitening in Glasgow | Day Night Dental", description: "Professional teeth whitening at Day Night Dental in Glasgow. Dentist-led, sensitivity managed, day and evening appointments, 7 days a week." },
  meta: [{"k": "Treatment time", "v": "2 to 3 weeks", "tone": "day"}, {"k": "Results", "v": "Noticeably brighter", "tone": ""}, {"k": "Take-home trays", "v": "Custom-made", "tone": "night"}],
  overviewHeading: (<>Whitening that's <em>measured, not guessed</em></>),
  overview: ["Coffee, tea, red wine, certain foods and simply getting older all leave their mark on enamel over time. Shop-bought strips and high-street kits work at a fixed, low concentration, so they can't be tailored to your teeth. That's usually why the results look patchy and don't last. Professional whitening at Day Night Dental starts with an examination, so we know your teeth and gums are healthy enough to whiten and we can plan the right approach for you.", "We use a professional, clinically proven whitening system with custom take-home trays you use at home. We take impressions to make trays that fit precisely, which keeps the whitening gel on your teeth and off your gums. You wear the trays at home over a couple of weeks, with the whole process supervised by your dentist.", "Because a dentist leads the whole thing, we can adjust the gel strength, wear time and pacing to suit you, and step in quickly if any sensitivity shows up. Whitening lightens natural tooth structure. It won't change the colour of fillings, crowns or veneers, so if you have visible restorations we'll talk you through what to expect before you start."],
  facts: [{"dt": "Best for", "dd": "Yellowing, age-related and dietary staining on natural teeth"}, {"dt": "Approach", "dd": "Dentist-led, supervised whitening tailored to you"}, {"dt": "Treatment types", "dd": "Custom take-home trays, supervised by your dentist"}, {"dt": "Sensitivity", "dd": "Managed throughout; most patients find it temporary and mild"}, {"dt": "Not suitable for", "dd": "Matching crowns, veneers or fillings to a new shade"}, {"dt": "Longevity", "dd": "Typically lasts well with occasional top-ups using your trays"}],
  benefitsHeading: (<>Why choose <em>dentist-led</em> whitening</>),
  benefits: [{"title": "Clinically proven systems", "body": "We use established, professional whitening systems, applied at concentrations only a regulated practice can provide. That gives you more even, reliable results than any kit."}, {"title": "Custom-fitted trays", "body": "Trays are made from impressions of your own teeth, so the gel sits exactly where it should. That means better whitening and far less contact with your gums."}, {"title": "Sensitivity managed", "body": "Whitening can bring on some temporary sensitivity. We plan for it, adjust your treatment and suggest desensitising products, so most patients stay comfortable throughout."}, {"title": "Top-up trays to keep", "body": "Your custom trays are yours to keep. A short refresher every so often keeps your smile bright over the long term, without starting from scratch."}],
  stepsHeading: (<>Your <em>whitening</em> journey</>),
  steps: [{"title": "Consultation and check-up", "body": "We examine your teeth and gums, discuss your goals and record your current shade. This confirms whitening is suitable and lets us recommend the right approach for you."}, {"title": "Custom trays made", "body": "We take impressions or scans and craft bespoke whitening trays. At your fitting we check they sit comfortably and show you exactly how to apply the gel."}, {"title": "Whitening at home", "body": "You wear your trays as directed over roughly two weeks, usually overnight or for set daytime periods. We stay in touch to monitor progress and manage any sensitivity."}, {"title": "Review and aftercare", "body": "Once you have worked through your trays, we review your results together and give you guidance on maintaining your brighter smile, including how to top up using your trays."}],
  comparison: {
    eyebrow: 'How it compares',
    heading: (<>Dentist-led whitening vs <em>high-street kits</em></>),
    intro: "The shelves are full of whitening products, and the internet is full of more. Some are harmless but weak. Some are neither. Here is a straight comparison so you can judge for yourself.",
    attribute: '',
    columns: [
      { name: 'Dentist-led whitening', feat: true },
      { name: 'High-street kits, strips and "whitening" toothpaste' },
    ],
    rows: [
      { label: 'Who supplies it', values: ['A registered dental professional, after checking your mouth', 'Anyone. No assessment, no supervision'] },
      { label: 'Gel strength', values: ['Stronger gels that, by law, only a registered dental professional can supply and apply', 'Limited by law to a strength too low to do much, or no real bleaching agent at all'] },
      { label: 'Fit', values: ['Trays moulded to your teeth, so gel stays put and off the gums', 'One-size strips or boil-and-bite trays that leak gel onto the gums'] },
      { label: 'Assessment first', values: ['Yes. Decay, gum problems and existing crowns or fillings are checked first', 'None. Problems go unnoticed'] },
      { label: 'What toothpaste does', values: ['Not applicable', 'Mostly scrubs off surface stain. It does not change the colour inside the tooth'] },
      { label: 'Risk of harm', values: ['Managed and supervised', 'Gum burns and uneven results are a known risk with stronger online or salon products'] },
      { label: 'Top-ups', values: ['Reuse your trays under guidance', 'Buy another kit each time'] },
    ],
    note: "One legal point worth knowing. In the UK, teeth whitening can only be carried out by a registered dental professional. Whitening offered by beauty salons or other non-dental settings is against the law, and some gels sold online exceed the legal strength for products bought without a dentist. Stronger is not safer. It is how people end up with chemical burns to the gums.",
  },
  aftercare: {
    eyebrow: 'Aftercare',
    heading: (<>Getting the most from <em>your result</em></>),
    intro: "What you do in the first day or two does a lot of the heavy lifting. After that it is about maintenance.",
    phases: [
      { title: 'The first 24 to 48 hours: the white diet', items: ["Freshly whitened teeth pick up colour more easily, so this is when you protect the work you have just done.", "Stick to pale foods and drinks: water, milk, plain chicken or fish, rice, pasta, potatoes, white cheese.", "Avoid the obvious stainers for now: coffee, tea, red wine, cola, curries, tomato sauces, berries and anything strongly coloured.", "If you smoke or vape, this is when it does the most damage to your result, so hold off if you possibly can."] },
      { title: 'Managing sensitivity', items: ["Some sensitivity during or just after whitening is common and usually mild, often short, sharp twinges to cold that settle within a few days.", "If you get it, use a desensitising gel and switch to a sensitive-formula toothpaste.", "If you are using trays, ease off for a night. Lukewarm rather than icy drinks help too.", "If sensitivity is sharp, lasting or one-sided, tell us rather than pushing through."] },
      { title: 'Keeping the shade: top-ups', items: ["Whitening is not permanent. The shade slowly relapses with everyday life, and how fast depends largely on your diet and whether you smoke.", "Your custom trays are reusable, so a short top-up every so often keeps things where you want them.", "Top up with gel we have supplied and to our guidance, not by guessing.", "Regular check-ups and hygiene visits also lift everyday surface stain and stretch the result further."] },
    ],
  },
  risks: {
    eyebrow: 'Before you start',
    heading: (<>Honest <em>considerations</em></>),
    body: [
      "Sensitivity is common and temporary. Many people get some during or just after whitening. For most it is mild and passes within days. We plan for it, but we cannot promise you will avoid it entirely.",
      "Whitening only works on natural teeth. Crowns, veneers, bridges and fillings do not change colour. If you have any in your smile line, they will stay their shade while the teeth around them lighten, and you may decide to replace one later to match. We flag this at your assessment so there are no surprises.",
      "We treat problems first. If you have decay or gum disease, those come first. Whitening an unhealthy mouth can be painful and is not sensible, and an assessment sorts this out before any gel goes near your teeth.",
      "Results vary, and some stains are stubborn. Yellowish, age-related and lifestyle staining tends to respond well. Greyish staining, marks from certain childhood antibiotics, and the dark colour of a single dead tooth respond more slowly or need a different approach.",
      "Be wary of unregulated kits. Whitening sold by salons or non-dental sources is illegal in the UK, and some online gels exceed the legal strength, with a real risk of burns and uneven colour. If you have used something like that, just tell us.",
      "Not during pregnancy or breastfeeding. As a precaution, we hold off on whitening then.",
    ],
  },
  fees: {
    eyebrow: 'Fees & Finance',
    heading: (<>Clear on cost, <em>before you commit</em></>),
    body: [
      "Whitening is priced for your case, and we confirm the exact cost after your assessment rather than quoting a one-size figure up front.",
      "You get a clear, written plan with the cost set out, and there is no obligation to go ahead.",
      "If you would rather not pay in one go, interest-free finance is available, subject to status.",
    ],
  },
  faqHeading: (<>Teeth whitening: <em>common questions</em></>),
  faqs: [{"q": "How much does teeth whitening cost?", "a": "The cost of professional whitening at Day Night Dental depends on the approach we agree at your consultation. We'll confirm the exact price after your consultation, and there's no obligation to go ahead. Ask our team about payment options when you book."}, {"q": "Does teeth whitening hurt?", "a": "Whitening itself isn't painful, though some people notice short-lived sensitivity to cold during or just after treatment. Because a dentist leads it, we adjust the gel strength and timing and suggest desensitising products. Most patients find any sensitivity mild and temporary."}, {"q": "How long does whitening take and how long do results last?", "a": "Most home plans run over roughly two to three weeks, with your dentist supervising throughout. Results vary from person to person, but with care and the occasional top-up using your trays, a brighter shade tends to last well. Going easy on coffee, tea, red wine and smoking helps it last longer."}, {"q": "Will whitening work on crowns, veneers or fillings?", "a": "Whitening lightens natural tooth enamel but won't change the colour of crowns, veneers or fillings. If you have visible restorations, we'll talk it through at your consultation, as you may want them reviewed or replaced afterwards so everything matches your new shade."}, {"q": "Does teeth whitening damage your enamel?", "a": "No. Dentist-led whitening lightens the colour inside the tooth and does not remove or thin enamel. The gel works by releasing oxygen that lifts stain, not by scraping anything away. The risk people worry about comes mostly from misusing strong, unregulated kits without supervision, which is exactly what proper assessment and dentist-supplied gel avoids."}, {"q": "How many shades lighter will my teeth go?", "a": "That depends on where you start and what caused the staining, so we will not throw a number at you before we have seen your teeth. Lifestyle and age-related staining usually lifts well, while deeper or greyish staining moves more slowly. At your assessment we check your starting shade and give you an honest idea of where whitening can realistically take you."}, {"q": "Can I whiten just one dark tooth?", "a": "Sometimes, yes. A single tooth that has gone dark, often after the nerve has died or following a root canal, can sometimes be lightened from the inside with a different technique rather than trays. It is a separate conversation from whitening a whole smile, and we will assess whether it suits your case."}, {"q": "I had whitening before and it faded. Can I just top up?", "a": "Often, yes, especially if you still have your custom trays from us. We would check your teeth and gums first, then supply fresh gel for a short top-up. If your trays are from an old or online kit, or do not fit well, we may make new ones so the gel sits properly."}, {"q": "Will whitening fix stains from medication or a knock to the tooth?", "a": "It depends on the cause. Some intrinsic staining, such as marks from certain childhood antibiotics, responds slowly and may not lift fully. A tooth darkened by past trauma may need internal whitening rather than trays. Sometimes bonding or a veneer suits the situation better, and we will talk you through the options honestly."}, {"q": "Is it normal for my teeth to look patchy partway through?", "a": "Yes, this is common and usually temporary. Teeth often whiten unevenly at first, with the tips or edges lagging or white spots looking more obvious for a while. It generally evens out as treatment continues. If it does not settle, let us know and we will take a look."}],
  related: [{"slug": "cosmetic-dentistry", "title": "Cosmetic Dentistry", "tag": "Smile Design"}, {"slug": "invisalign", "title": "Invisalign®", "tag": "Clear Aligners"}, {"slug": "general-dentistry", "title": "General Dentistry", "tag": "Foundation Care"}],
  cta: { heading: (<>Book your professional<br /> <em>teeth whitening consultation</em></>), sub: "Day and evening appointments in Glasgow, 7 days a week." },
}

export default function TeethWhitening() {
  return <TreatmentPage data={data} />
}

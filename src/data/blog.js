// Blog posts. Each entry becomes a pre-rendered /blog/<slug> page automatically
// via routes.jsx. Newest posts first. Optional fields: `faqs` (renders an FAQ
// block + FAQPage schema) and `relatedPosts` (blog-to-blog "Related reading" links).
export const posts = [
  {
    slug: 'dental-emergency-what-to-do-glasgow',
    title: 'What to do in a dental emergency: a step-by-step Glasgow guide',
    description: 'Knocked-out tooth, dental abscess, broken filling or severe toothache? Here is exactly what to do in the first hour, what can wait, and when to be seen in Glasgow.',
    date: '9 June 2026',
    dateISO: '2026-06-09',
    readTime: '7 min read',
    intro: 'A dental emergency is frightening, and it usually arrives at the worst possible time, late at night or over a weekend. The reassuring part is that what you do in the first hour often decides the outcome. This is a clear, calm guide to the most common dental emergencies, what to do at home, and how to be seen quickly in Glasgow.',
    sections: [
      { heading: 'Is it actually a dental emergency?', paragraphs: [
        'The clearest signs that you need urgent care are severe or worsening toothache, facial swelling or a dental abscess, a knocked-out adult tooth, a badly broken tooth, bleeding that will not stop, and a lost crown or filling that is causing pain. A knocked-out adult tooth is the most time-critical of all, so do not wait until morning.',
        'Some symptoms point to something more serious than a tooth. If you have swelling that is spreading towards your eye or down into your neck, swelling alongside a high temperature, or any difficulty breathing or swallowing, treat it as a medical emergency and go to A&E or call 999. When in doubt, a quick phone call to a dentist will tell you how urgently you need to be seen.',
      ] },
      { heading: 'A knocked-out tooth (act within the hour)', paragraphs: [
        'For an adult tooth, time is everything. Pick the tooth up by the white crown and never touch the root. If it is dirty, rinse it gently in milk or clean water for a second or two, but do not scrub it or wipe it dry.',
        'If you can, place it straight back into the socket the right way round and bite gently on a clean cloth to hold it there. If you cannot reinsert it, keep it in a small container of milk, or tucked inside your cheek, until you reach us. Plain water is a last resort because it damages the delicate cells on the root. Aim to be seen within sixty minutes.',
        'A knocked-out baby tooth should not be put back in, as that can harm the adult tooth forming underneath. Keep your child calm and call us for advice.',
      ] },
      { heading: 'Severe toothache', paragraphs: [
        'A painkiller that you normally tolerate, taken as directed on the packet, is the safest first step. A cold compress held against the cheek can ease both pain and swelling. Try to avoid very hot, cold or sweet foods, which often make things worse.',
        'Do not place an aspirin tablet directly against the gum, as it burns the soft tissue rather than helping. Pain that throbs, keeps you awake, or comes with swelling usually points to infection, and that needs a dentist promptly rather than another night of painkillers.',
      ] },
      { heading: 'Swelling or a dental abscess', paragraphs: [
        'An abscess is a pocket of infection, often felt as a painful swelling in the gum or face, sometimes with a bad taste. It will not clear on its own and should never be ignored. Rinse gently with warm salt water and do not try to burst it.',
        'An abscess needs a dentist, who will treat the source of the infection and may prescribe antibiotics if appropriate. As above, if swelling is spreading towards the eye or neck, or you feel unwell with a high temperature or any trouble breathing or swallowing, go straight to A&E.',
      ] },
      { heading: 'A broken, chipped or cracked tooth', paragraphs: [
        'Save any pieces you can find and rinse your mouth with warm water. If there is a sharp edge catching your tongue or cheek, a piece of sugar-free chewing gum or some dental wax from a pharmacy can cover it temporarily. Avoid chewing on that side and book to be seen, as a cracked tooth can worsen quickly if it is left.',
      ] },
      { heading: 'A lost filling or crown', paragraphs: [
        'Keep the crown safe, as it can often be re-cemented. Temporary dental cement from a pharmacy can protect the tooth in the meantime, and a little clove oil on a cotton bud may calm sensitivity. Never use household superglue, which is toxic and makes a proper repair much harder. Avoid chewing on that side until we have seen you.',
      ] },
      { heading: 'Bleeding that will not stop', paragraphs: [
        'After an extraction or a knock, fold a piece of clean gauze or a cotton handkerchief into a pad, place it over the area, and bite firmly for fifteen to twenty minutes without checking it. Avoid rinsing, spitting or hot drinks, which dislodge the clot that needs to form. If heavy bleeding will not settle, seek urgent care, and for severe uncontrolled bleeding go to A&E.',
      ] },
      { heading: 'Being seen quickly in Glasgow', paragraphs: [
        'Day Night Dental runs a 24-hour emergency line from our Merchant City practice, and we hold back same-day appointments every day for exactly these situations. Rather than waiting for an out-of-hours slot that could be miles away, you can call for urgent help straight away and get clear advice on what to do next. Call as early as you can, as the first appointments go quickly.',
      ] },
      { heading: 'A small home kit worth keeping', paragraphs: [
        'A few inexpensive items make a real difference in the moment: a painkiller you tolerate, some dental wax, a tube of temporary filling cement, sugar-free gum, and a small clean container for a knocked-out tooth. Save our number in your phone now, so you are not searching for it in pain at 2am.',
      ] },
    ],
    faqs: [
      { q: 'Should I go to A&E or a dentist for a dental emergency?', a: 'For problems with teeth and gums, an emergency dentist is the right place and can treat the cause. Go to A&E or call 999 for swelling that is spreading to the eye or neck, a high temperature alongside facial swelling, difficulty breathing or swallowing, or serious facial trauma.' },
      { q: 'Can I be seen on the same day in Glasgow?', a: 'Yes. We hold back same-day emergency appointments every day at our Merchant City practice and run a 24-hour helpline, so call as early as you can.' },
      { q: 'What can I do for the pain until I am seen?', a: 'Take a painkiller you normally tolerate as directed on the packet, hold a cold compress to your cheek, and avoid very hot, cold or sweet foods. Do not place aspirin directly on the gum.' },
      { q: 'Is a knocked-out tooth always lost?', a: 'No. An adult tooth that is reimplanted within about an hour, kept in milk or saliva in the meantime and handled only by the crown, has a good chance of being saved.' },
      { q: 'Will I definitely need antibiotics?', a: 'Not always. Only a dentist can decide, and antibiotics do not fix the underlying problem on their own. The tooth itself still needs treatment.' },
    ],
    related: ['emergency-dentist', 'general-dentistry'],
    relatedPosts: ['emergency-dentist-glasgow-at-night'],
  },
  {
    slug: 'veneers-glasgow-cost-types',
    title: 'Veneers in Glasgow: composite vs porcelain, costs and what to expect',
    description: 'Thinking about veneers? Here is how composite and porcelain compare, what affects the cost in Glasgow, how long they last, and whether they are the right choice for you.',
    date: '9 June 2026',
    dateISO: '2026-06-09',
    readTime: '6 min read',
    intro: 'Veneers can transform a smile that is chipped, stained, gappy or uneven, but composite and porcelain are very different routes to the same goal. Here is an honest comparison from our Merchant City team, including what drives the cost and how to decide which is right for you.',
    sections: [
      { heading: 'What veneers actually are', paragraphs: [
        'A veneer is a thin facing bonded to the front of a tooth. Veneers are used to cover chips, stains that will not respond to whitening, small gaps, worn edges and slightly crooked teeth, giving a smile a cleaner, more even look. They are not the answer to everything, and a good dentist will sometimes suggest whitening or clear aligners first if that gives you a better and more conservative result.',
      ] },
      { heading: 'Composite veneers', paragraphs: [
        'Composite veneers are built up directly on the tooth from a tooth-coloured resin, usually in a single visit. They involve little or no removal of natural tooth, cost less than porcelain, and can be repaired if they chip. The trade-off is that they pick up stains over time and typically last a few years before they need refreshing.',
      ] },
      { heading: 'Porcelain veneers', paragraphs: [
        'Porcelain veneers are custom-made in a dental laboratory and bonded on at a later visit. They look highly natural, resist staining, and often last ten to fifteen years with good care. The trade-offs are a higher cost, usually two or more appointments, and the removal of a small amount of enamel to make room for them, which cannot be undone.',
      ] },
      { heading: 'Which is right for you', paragraphs: [
        'The best choice depends on your budget, how many teeth you are treating, how long you want the result to last, and the current condition of your teeth. Some patients have a mix, for example porcelain on the most visible teeth and composite elsewhere. At a consultation we will look at your teeth, listen to what you want, and tell you honestly which option fits.',
      ] },
      { heading: 'What veneers cost in Glasgow', paragraphs: [
        'Veneers are priced per tooth, and the total depends on whether you choose composite or porcelain and how many teeth you are treating. We give you a clear quote and confirm it in writing after your consultation, so you know the cost before you decide. Where it helps, finance options can spread the cost over manageable monthly payments.',
      ] },
      { heading: 'Looking after veneers', paragraphs: [
        'Veneers are cared for much like natural teeth: brush and floss well, keep up regular check-ups, and avoid using your teeth as tools or biting nails and ice. If you grind your teeth at night, a simple guard protects your investment. With that care, composite tends to last a few years and porcelain considerably longer.',
      ] },
      { heading: 'Are veneers reversible?', paragraphs: [
        'Composite veneers are often minimal-prep and more easily changed. Porcelain usually involves removing a little enamel, which is permanent, so it is a decision worth taking time over. We will always explain exactly what is involved for your teeth before anything is done, and we can show you a preview of the planned result first.',
      ] },
    ],
    faqs: [
      { q: 'Do veneers ruin your teeth?', a: 'Porcelain veneers involve removing a small amount of enamel, which is permanent, while composite veneers often need little or no removal. Done well and looked after, veneers protect and improve the look of a tooth. We explain the trade-offs for your specific case before you decide.' },
      { q: 'How long do veneers last?', a: 'Composite veneers typically last a few years, while porcelain veneers often last ten to fifteen years with good oral hygiene and regular check-ups.' },
      { q: 'Are veneers better than whitening?', a: 'They do different jobs. Whitening lightens natural teeth, while veneers cover shape, chips and stains that will not whiten. Sometimes the best plan is to whiten first, then treat individual teeth.' },
      { q: 'How much do veneers cost in Glasgow?', a: 'Cost is per tooth and depends on the material and the number of teeth. We provide a clear quote confirmed in writing at your consultation, and finance options are available to spread it.' },
      { q: 'Will veneers look natural?', a: 'Yes, when they are matched to your face and your other teeth. Porcelain in particular looks very natural, and we can show you a preview of the design before you commit.' },
    ],
    related: ['cosmetic-dentistry', 'teeth-whitening'],
    relatedPosts: ['teeth-whitening-professional-vs-home-glasgow', 'invisalign-vs-braces'],
  },
  {
    slug: 'teeth-whitening-professional-vs-home-glasgow',
    title: 'Professional teeth whitening vs home kits: what actually works',
    description: 'Whitening strips, charcoal, dentist treatments. Here is what really lightens teeth safely, what is a waste of money, and what teeth whitening costs in Glasgow.',
    date: '9 June 2026',
    dateISO: '2026-06-09',
    readTime: '6 min read',
    intro: 'A brighter smile is one of the most common things our patients ask for, and the shelves are full of products promising it overnight. Here is an honest, dentist-led look at what genuinely works, what is a waste of money, and what is actually safe for your teeth and gums.',
    sections: [
      { heading: 'Why teeth go yellow or dull', paragraphs: [
        'Teeth darken for two main reasons. Surface stains come from coffee, tea, red wine and smoking and sit on the outside of the enamel. Deeper discolouration comes with age or from inside the tooth and is harder to shift. Whitening works well on the first kind, while the second sometimes needs a different approach such as bonding or a veneer, which we can talk through with you.',
      ] },
      { heading: 'Professional whitening through a dentist', paragraphs: [
        'Whitening carried out by or through a dentist uses stronger, regulated gels applied safely, usually with custom-made trays moulded to your teeth for even results and easy top-ups at home. Because we check your teeth and gums first, we catch anything that would make whitening uncomfortable or pointless, and the result is faster and more predictable than a supermarket kit.',
      ] },
      { heading: 'The legal bit worth knowing', paragraphs: [
        'In the UK, tooth whitening can only legally be carried out by a GDC-registered dental professional, or under their prescription. Whitening offered in beauty salons by non-dentists, or to anyone under eighteen for cosmetic reasons, is illegal and can be genuinely harmful. If an offer looks cheap and is not run by a dentist, that is exactly the reason to walk away.',
      ] },
      { heading: 'Home kits and whitening strips', paragraphs: [
        'Over-the-counter strips and kits contain much lower levels of active ingredient, so they work slowly and often unevenly. One-size trays rarely fit well, which lets the gel leak onto the gums and cause irritation. They can lift light surface staining, but the result is modest compared with a dentist-supplied system.',
      ] },
      { heading: 'Charcoal, natural hacks and viral trends', paragraphs: [
        'Charcoal toothpastes and home mixes such as lemon juice or baking soda do not whiten teeth in any real sense. They are abrasive and acidic, and over time they wear away the very enamel that keeps teeth looking healthy, which can leave them looking more yellow, not less. These are best avoided altogether.',
      ] },
      { heading: 'What whitening costs in Glasgow', paragraphs: [
        'The cost depends on the system, whether that is in-practice whitening, a dentist-supplied take-home kit with custom trays, or a combination of both. We give you a clear price at your consultation, and whitening is often combined with other cosmetic work for a complete result. As always, the quote is confirmed in writing before you decide.',
      ] },
      { heading: 'A realistic word on results', paragraphs: [
        'How white your teeth can go depends on your starting shade and the type of staining, and whitening does not change the colour of crowns, veneers or fillings. We set honest expectations at your consultation rather than promise a single shade, so you know exactly what to expect before you start. Good habits afterwards, such as using a straw, rinsing with water and keeping up hygiene visits, help the result last for years.',
      ] },
    ],
    faqs: [
      { q: 'Is teeth whitening safe?', a: 'Yes, when it is carried out by or through a dentist who checks your teeth and gums first. Some temporary sensitivity is normal. The risky kind is unregulated whitening done by non-dentists, which is also illegal in the UK.' },
      { q: 'Do whitening strips actually work?', a: 'They can lift light surface stains, but they work slowly and often unevenly, and poorly fitting ones can irritate the gums. A dentist-supplied system with custom trays gives a far more reliable result.' },
      { q: 'Does charcoal toothpaste whiten teeth?', a: 'No. Charcoal is abrasive and can wear away enamel over time, which can make teeth look more yellow rather than whiter. It is best avoided.' },
      { q: 'How white will my teeth get?', a: 'It depends on your starting shade and the type of staining. We set realistic expectations at your consultation. Whitening also will not change the colour of crowns, veneers or fillings.' },
      { q: 'Is salon teeth whitening legal in the UK?', a: 'Only a GDC-registered dental professional can legally whiten teeth, or prescribe it. Be cautious of whitening offered by non-dentists in salons, as it is both illegal and potentially harmful.' },
      { q: 'How much is teeth whitening in Glasgow?', a: 'It depends on the system you choose. We give a clear price at your consultation and confirm it in writing before you go ahead.' },
    ],
    related: ['teeth-whitening', 'cosmetic-dentistry'],
    relatedPosts: ['veneers-glasgow-cost-types', 'invisalign-vs-braces'],
  },
  {
    slug: 'emergency-dentist-glasgow-at-night',
    title: 'Where to find an emergency dentist in Glasgow at night',
    description: 'In dental pain after hours in Glasgow? Here is what counts as an emergency, what to do while you wait, and how to be seen tonight.',
    date: '8 June 2026',
    dateISO: '2026-06-08',
    readTime: '4 min read',
    intro: 'Toothache has a habit of flaring up at the worst possible time, usually late at night when every dentist in Glasgow seems to be closed. Here is how to get help quickly, and what you can do in the meantime.',
    sections: [
      { heading: 'What counts as a dental emergency?', paragraphs: [
        'Severe or worsening toothache, facial swelling or an abscess, a knocked-out or badly broken tooth, uncontrolled bleeding, and a lost crown or filling that is causing pain are all good reasons to seek urgent care. A knocked-out adult tooth in particular is time-critical, so do not wait until morning.',
        'If you are unsure, it is always worth a phone call. We can talk you through how urgently you need to be seen.',
      ] },
      { heading: 'Being seen tonight in Glasgow', paragraphs: [
        'Day Night Dental runs a 24-hour emergency helpline from our Merchant City practice, with same-day appointments held back every day for exactly these moments. Rather than waiting for an NHS out-of-hours slot that may be miles away, you can call for urgent help straight away.',
      ] },
      { heading: 'What to do while you wait', paragraphs: [
        'For pain, an over-the-counter painkiller you normally tolerate can help, and a cold compress against the cheek may ease swelling. For a knocked-out adult tooth, hold it by the crown, avoid touching the root, and keep it in milk or saliva until you reach us.',
      ] },
    ],
    related: ['emergency-dentist', 'general-dentistry'],
    relatedPosts: ['dental-emergency-what-to-do-glasgow'],
  },
  {
    slug: 'dental-implants-cost-glasgow',
    title: 'How much do dental implants cost in Glasgow?',
    description: 'A plain-English guide to what dental implants cost in Glasgow, what affects the price, and how finance can spread it.',
    date: '8 June 2026',
    dateISO: '2026-06-08',
    readTime: '5 min read',
    intro: 'Cost is the first question almost everyone asks about dental implants, and it is a fair one. Here is an honest look at what goes into the price, and why the cheapest quote is not always the one to trust.',
    sections: [
      { heading: 'What you are actually paying for', paragraphs: [
        'An implant is not a single item, it is a treatment. The price covers the planning, the titanium implant itself, the surgery to place it, and the custom crown that goes on top. A single implant at Day Night Dental is quoted for you and confirmed in writing after your consultation.',
      ] },
      { heading: 'What changes the price', paragraphs: [
        'How many teeth you are replacing is the biggest factor. A single implant costs far less than an implant-supported bridge or a full-arch option like All-on-4. Any preparatory work, such as a bone graft, also adds to the total. We set all of this out clearly before you commit.',
      ] },
      { heading: 'Spreading the cost', paragraphs: [
        'You do not have to pay it all at once. Finance options are available so you can spread implant treatment over manageable monthly payments. We are happy to talk through the options at your consultation.',
      ] },
    ],
    related: ['dental-implants', 'cosmetic-dentistry'],
    relatedPosts: ['veneers-glasgow-cost-types'],
  },
  {
    slug: 'invisalign-vs-braces',
    title: 'Invisalign vs braces: which is right for you?',
    description: 'Clear aligners or fixed braces? A straightforward comparison to help you choose how to straighten your teeth in Glasgow.',
    date: '8 June 2026',
    dateISO: '2026-06-08',
    readTime: '4 min read',
    intro: 'Both straighten teeth, but they get there in very different ways. Here is how Invisalign and traditional braces compare, so you can decide what suits your life.',
    sections: [
      { heading: 'How they differ', paragraphs: [
        'Invisalign uses a series of clear, removable aligners that are very discreet and come out for eating and brushing. Fixed braces use brackets and wires bonded to your teeth, which stay put for the whole treatment.',
      ] },
      { heading: 'Which tends to suit who', paragraphs: [
        'Invisalign is popular with adults and older teens who want to straighten their teeth discreetly. Fixed braces can have the edge for very complex movements. At a consultation we will tell you honestly which is the better fit for your case.',
      ] },
      { heading: 'Seeing the result first', paragraphs: [
        'One real advantage of Invisalign is that we can show you a 3D simulation of your finished smile before you start. Patients come to our Merchant City practice from across Glasgow to straighten their teeth this way.',
      ] },
    ],
    related: ['invisalign', 'teeth-whitening'],
    relatedPosts: ['veneers-glasgow-cost-types', 'teeth-whitening-professional-vs-home-glasgow'],
  },
]

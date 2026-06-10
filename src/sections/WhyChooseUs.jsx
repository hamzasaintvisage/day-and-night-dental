const points = [
  { h: 'Around-the-clock emergency access', p: 'Call anytime for urgent toothache, swelling, broken teeth or dental pain that cannot wait.' },
  { h: 'Seen fast, treated properly', p: 'Urgent cases are prioritised for same-day assessment and emergency treatment.' },
  { h: 'No judgement, just care', p: 'Nervous, embarrassed or overdue? We keep things calm, clear and focused on getting you treated.' },
  { h: 'Precision-led dentistry', p: 'State-of-the-art digital technology supports clearer diagnosis, careful planning and more precise treatment.' },
  { h: 'Costs explained first', p: 'Your options, fees and next steps are explained clearly before treatment begins.' },
  { h: 'Merchant City, central Glasgow', p: 'A central Glasgow practice for emergency, general and cosmetic dentistry.' },
]

export default function WhyChooseUs() {
  return (
    <section className="dn-section">
      <div className="dn-container">
        <div className="tp-section-head">
          <span className="dn-eyebrow">Why Day Night</span>
          <h2 className="dn-display">Why <em>Glasgow</em> patients choose Day Night Dental</h2>
        </div>
        <div className="dn-why-grid">
          {points.map((pt) => (
            <div className="dn-why-item" key={pt.h}>
              <h3>{pt.h}</h3>
              <p>{pt.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

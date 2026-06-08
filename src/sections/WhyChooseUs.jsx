const points = [
  { h: '24/7 emergency cover', p: 'When you ring us in pain, a real clinician answers. There is no answering machine, day or night.' },
  { h: 'GDC-registered clinicians', p: 'Every treatment is carried out by dental professionals registered with, and regulated by, the General Dental Council.' },
  { h: 'Same-day appointments', p: 'We hold back urgent slots every day, so patients across Glasgow in pain get seen quickly rather than next week.' },
  { h: 'On-site digital technology', p: 'We have CBCT 3D scanning and intraoral scanners on site, so your treatment is more precise and a good bit more comfortable.' },
  { h: '0% finance available', p: 'Spread the cost of implants, Invisalign and cosmetic treatment with interest-free payment plans.' },
  { h: 'In the heart of Merchant City', p: 'We are easy to reach from across Glasgow city centre, with parking nearby and good transport links on the doorstep.' },
]

export default function WhyChooseUs() {
  return (
    <section className="dn-section">
      <div className="dn-container">
        <div className="tp-section-head">
          <span className="dn-eyebrow">Why Day &amp; Night</span>
          <h2 className="dn-display">Why patients across <em>Glasgow</em> choose Day &amp; Night Dental</h2>
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

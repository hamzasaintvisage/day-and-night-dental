import { Icon } from '../components/ConcernIcon'

const points = [
  { icon: 'clock', side: 'night', h: 'Around-the-clock emergency access', p: 'Call anytime for urgent toothache, swelling, broken teeth or dental pain that cannot wait.' },
  { icon: 'bolt', side: 'day', h: 'Seen fast, treated properly', p: 'Urgent cases are prioritised for same-day assessment and emergency treatment.' },
  { icon: 'heart', side: 'night', h: 'No judgement, just care', p: 'Nervous, embarrassed or overdue? We keep things calm, clear and focused on getting you treated.' },
  { icon: 'rise', side: 'day', h: 'Always investing in better care', p: 'We are continually investing in modern equipment and techniques, so your care keeps getting better, safer and more comfortable.' },
  { icon: 'tag', side: 'night', h: 'Costs explained first', p: 'Your options, fees and next steps are explained clearly before any treatment begins.' },
  { icon: 'pin', side: 'day', h: 'Merchant City, central Glasgow', p: 'A central Glasgow practice for emergency, general and cosmetic dentistry.' },
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
            <div className={`dn-why-item ${pt.side}`} key={pt.h}>
              <span className="dn-why-icon"><Icon type={pt.icon} /></span>
              <h3>{pt.h}</h3>
              <p>{pt.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

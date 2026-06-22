import { Icon } from '../components/ConcernIcon'
import './why.css'

const points = [
  { icon: 'clock', side: 'day', h: 'Around-the-clock emergency access', p: 'Call anytime for urgent toothache, swelling, broken teeth or dental pain that cannot wait.' },
  { icon: 'bolt', side: 'night', h: 'Seen fast, treated properly', p: 'Urgent cases are prioritised for same-day assessment and emergency treatment.' },
  { icon: 'heart', side: 'day', h: 'No judgement, just care', p: 'Nervous, embarrassed or overdue? We keep things calm, clear and focused on getting you treated.' },
  { icon: 'rise', side: 'night', h: 'Always investing in better care', p: 'We are continually investing in modern equipment and techniques, so your care keeps getting better, safer and more comfortable.' },
  { icon: 'tag', side: 'day', h: 'Costs explained first', p: 'Your options, fees and next steps are explained clearly before any treatment begins.' },
  { icon: 'pin', side: 'night', h: 'Merchant City, central Glasgow', p: 'A central Glasgow practice for emergency, general and cosmetic dentistry.' },
]

// "Why Day Night" - aurora treatment: a soft sunrise-to-night sky glow + faint
// horizon and stars behind frosted, numbered cards. Day cards glow gold, night
// cards glow blue - the brand's day/night split, all solid colour.
export default function WhyChooseUs() {
  return (
    <section className="dn-section dn-why2">
      <div className="dn-why2-atmos" aria-hidden="true">
        <span className="dn-why2-orb" />
        <span className="dn-why2-horizon" />
        <span className="dn-why2-stars" />
      </div>
      <div className="dn-container">
        <div className="dn-why2-head dn-center-head">
          <span className="dn-eyebrow dn-pill day">Why Day Night</span>
          <h2 className="dn-display">Why <em className="dn-hl-gold">Glasgow</em> patients choose Day Night Dental</h2>
          <p className="dn-why2-sub">
            From the first urgent call to the calm of a finished treatment, care that holds the line, day or night.
          </p>
        </div>
        <div className="dn-why2-grid">
          {points.map((pt, i) => (
            <div className={`dn-why2-card ${pt.side}`} key={pt.h}>
              <span className="dn-why2-ico"><Icon type={pt.icon} /></span>
              <h3>{pt.h}</h3>
              <p>{pt.p}</p>
              <span className="dn-why2-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

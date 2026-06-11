// Bespoke hand-drawn line icons for the "Why" reasons (same style as the
// treatment/concern icons, but tailored to these points rather than teeth).
function WhyIcon({ type }) {
  const c = {
    width: 34, height: 34, viewBox: '0 0 36 36', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  switch (type) {
    case 'clock': // around-the-clock
      return (
        <svg {...c}><circle cx="18" cy="18" r="11" /><path d="M18 11.5 L18 18 L22.5 20.5" /></svg>
      )
    case 'bolt': // seen fast
      return (
        <svg {...c}><path d="M21 5 L11 19.5 L17 19.5 L15.5 31 L26 15 L19.5 15 Z" /></svg>
      )
    case 'heart': // no judgement, just care
      return (
        <svg {...c}><path d="M18 28 C18 28 8 21.5 8 14.5 C8 11 11 9.5 13.5 10.5 C15.5 11.3 18 14 18 14 C18 14 20.5 11.3 22.5 10.5 C25 9.5 28 11 28 14.5 C28 21.5 18 28 18 28 Z" /></svg>
      )
    case 'rise': // always investing / getting better
      return (
        <svg {...c}><path d="M7 25 L15 17 L20 22 L29 11" /><path d="M23 11 L29 11 L29 17" /></svg>
      )
    case 'tag': // costs explained
      return (
        <svg {...c}><path d="M19 6 L30 6 L30 17 L17 30 L6 19 Z" /><circle cx="24" cy="12" r="1.8" /></svg>
      )
    case 'pin': // location
      return (
        <svg {...c}><path d="M18 30 C18 30 27 22 27 14.5 A9 9 0 1 0 9 14.5 C9 22 18 30 18 30 Z" /><circle cx="18" cy="14.5" r="3.4" /></svg>
      )
    default:
      return null
  }
}

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
              <span className="dn-why-icon"><WhyIcon type={pt.icon} /></span>
              <h3>{pt.h}</h3>
              <p>{pt.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

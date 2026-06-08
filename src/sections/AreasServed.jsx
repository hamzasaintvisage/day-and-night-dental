import { Link } from 'react-router-dom'
import { AREAS_SERVED } from '../data/practice'

export default function AreasServed() {
  return (
    <section id="areas" className="dn-section dn-areas">
      <div className="dn-container">
        <div className="tp-section-head">
          <span className="dn-eyebrow night">Where We Are</span>
          <h2 className="dn-display">A 24-hour dentist in the heart of <em>Merchant City</em></h2>
        </div>
        <p className="dn-areas-lead">
          You will find Day &amp; Night Dental in Merchant City, central Glasgow. We are a short walk from Queen
          Street station, Buchanan Street and George Square, and there is parking close by. Patients come to us
          from all over the city. That includes Glasgow city centre, the Merchant City and Trongate, the West End,
          Finnieston, Dennistoun, the East End and the Southside.
        </p>
        <div className="dn-areas-grid">
          {AREAS_SERVED.map((a) => (
            <span className="dn-area-chip" key={a}>{a}</span>
          ))}
        </div>
        <p style={{ marginTop: '2rem' }}>
          <Link to="/areas-served" className="tp-hero-ghost">See the areas we serve across Glasgow<span aria-hidden="true"> →</span></Link>
        </p>
      </div>
    </section>
  )
}

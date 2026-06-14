import { Link } from 'react-router-dom'
import { PRACTICE, AREAS_SERVED } from '../data/practice'

export default function AreasServed() {
  return (
    <section id="areas" className="dn-section dn-areas">
      <div className="dn-container">
        <div className="tp-section-head">
          <span className="dn-eyebrow night">Where We Are</span>
          <h2 className="dn-display">
            A 24-hour dentist in the heart of <span className="dn-mani-grad">Merchant City</span>
          </h2>
        </div>

        <div className="dn-areas-map">
          <div className="dn-areas-col">
            <p className="dn-areas-lead">
              Patients come to us from right across Glasgow. The practice sits in Merchant City,
              minutes from the stations and easy to reach by car.
            </p>
            <div className="dn-areas-grid">
              {AREAS_SERVED.map((a) => (
                <span className="dn-area-chip" key={a}>{a}</span>
              ))}
            </div>
            <p style={{ marginTop: '1.75rem' }}>
              <Link to="/areas-served/" className="tp-hero-ghost">
                See the areas we serve across Glasgow<span aria-hidden="true"> →</span>
              </Link>
            </p>
          </div>

          <aside className="dn-areas-panel">
            <div className="dn-areas-pin">
              <span className="dot" />
              <span className="nm">{PRACTICE.name}</span>
            </div>
            <p className="dn-areas-addr">
              {PRACTICE.streetAddress}<br />
              {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
            </p>
            <ul className="dn-areas-land">
              <li><span className="b" />3 min from Queen Street station</li>
              <li><span className="b" />5 min from Buchanan Street</li>
              <li><span className="b" />Parking on Hutcheson St &amp; Albion St</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { PRACTICE, AREAS_SERVED } from '../data/practice'

// "Nightfall Over Merchant City" - the finalised Where We Are section: an immersive
// night-map vista with a cartographer's dossier, a luminous frosted locator, and a
// marquee of the areas we serve. All motion is CSS-only, so this stays SSR-safe.
function Star() {
  return (
    <svg className="star" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M6 0l1.3 4.7L12 6l-4.7 1.3L6 12l-1.3-4.7L0 6l4.7-1.3z" fill="currentColor" />
    </svg>
  )
}

export default function AreasServed() {
  return (
    <section id="areas" className="dn-section dn-areas" aria-labelledby="areas-head">
      {/* brand gold hairline framing the band, top and bottom */}
      <div className="dn-areas-edge top" aria-hidden="true" />
      <div className="dn-areas-edge bottom" aria-hidden="true" />
      {/* abstract dark street-grid backdrop */}
      <svg className="dn-mapgrid" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="nm-grid" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
            <path d="M0 0H120M0 0V120" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
            <path d="M0 40H120M0 80H120M40 0V120M80 0V120" fill="none" stroke="rgba(255,255,255,.035)" strokeWidth="1" />
          </pattern>
          <pattern id="nm-grid2" width="260" height="260" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
            <path d="M0 0H260M0 0V260" fill="none" stroke="rgba(248,199,96,.06)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="1200" height="700" fill="url(#nm-grid)" />
        <rect width="1200" height="700" fill="url(#nm-grid2)" />
        <path d="M-60 470 C 240 410, 420 540, 700 470 S 1120 360, 1280 430" fill="none" stroke="rgba(69,144,236,.12)" strokeWidth="6" strokeLinecap="round" />
        <path d="M-60 230 C 300 300, 560 180, 820 250 S 1180 320, 1280 270" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div className="dn-container">
        <div className="tp-section-head dn-center-head">
          <span className="dn-eyebrow dn-pill day">Where We Are</span>
          <h2 className="dn-display" id="areas-head">
            A 24-hour dentist in the heart of <em className="dn-hl-gold">Merchant City</em>
          </h2>
          <span className="dn-coordstrip">
            <span className="tick" aria-hidden="true" />
            <span className="crd">55.8592&deg;N</span>
            <span className="tick" aria-hidden="true" />
            <span className="crd">4.2475&deg;W</span>
            <span className="tick" aria-hidden="true" />
          </span>
        </div>

        <div className="dn-areas-stage">
          {/* LEFT: cartographer's note + transit ledger */}
          <div className="dn-dossier">
            <p className="lead-rule"><span className="pin-dot" aria-hidden="true" />The fix at the centre</p>
            <p className="dn-dossier-lead">
              Patients reach us from right across Glasgow, and the practice sits dead centre of it
              all in <em>Merchant City</em>.
            </p>
            <p className="dn-dossier-sub">
              Minutes from the main stations, a short walk off Buchanan Street, and simple to reach
              by car at any hour of the night.
            </p>

            <div className="dn-hairline" aria-hidden="true" />

            <p className="dn-ledger-label">Getting here</p>
            <ul className="dn-ledger">
              <li>
                <span className="node" aria-hidden="true">1</span>
                <span className="fact"><span className="k">By rail</span><span className="v"><b>3 min</b> walk from Queen Street station</span></span>
              </li>
              <li>
                <span className="node" aria-hidden="true">2</span>
                <span className="fact"><span className="k">On foot</span><span className="v"><b>5 min</b> from Buchanan Street</span></span>
              </li>
              <li>
                <span className="node" aria-hidden="true">3</span>
                <span className="fact"><span className="k">By car</span><span className="v">Parking on <b>Hutcheson St</b> &amp; <b>Albion St</b></span></span>
              </li>
            </ul>

            <p className="dn-dossier-cta">
              <Link to="/areas-served/" className="tp-hero-ghost">
                See the areas we serve across Glasgow<span aria-hidden="true"> →</span>
              </Link>
            </p>
          </div>

          {/* RIGHT: luminous frosted locator, pinned over the night map */}
          <div className="dn-locator">
            <div className="dn-pinmark">
              <span className="pin-rings" aria-hidden="true"><span /><span /></span>
              <span className="dot" aria-hidden="true" />
              <span className="pin-label">You are here</span>
            </div>

            <aside className="dn-areas-panel" aria-label="Practice location">
              <p className="dn-panel-mono">The practice</p>
              <div className="dn-areas-pin">
                <span className="dot" aria-hidden="true" />
                <span className="nm">{PRACTICE.name}</span>
              </div>
              <p className="dn-areas-addr">
                {PRACTICE.streetAddress}<br />
                {PRACTICE.locality}, {PRACTICE.city} {PRACTICE.postcode}
              </p>
              <div className="dn-panel-rule" aria-hidden="true" />
              <span className="dn-areas-status"><span className="live" aria-hidden="true" />Open now &middot; 24 hours</span>
            </aside>
          </div>
        </div>

        {/* areas-served marquee band */}
        <div className="dn-areas-orbit">
          <p className="dn-orbit-head">
            <span className="ln" aria-hidden="true" />
            <span className="dn-orbit-label">Patients reach us from right across Glasgow</span>
            <span className="ln r" aria-hidden="true" />
          </p>
          <div className="dn-areas-marquee">
            <div className="dn-marquee-track">
              <div className="dn-areas-grid" role="list">
                {AREAS_SERVED.map((a) => (
                  <span className="dn-area-chip" role="listitem" key={a}><Star />{a}</span>
                ))}
              </div>
              {/* duplicate set for a seamless marquee loop (hidden on mobile) */}
              <div className="dn-areas-grid dn-marquee-dup" aria-hidden="true">
                {AREAS_SERVED.map((a) => (
                  <span className="dn-area-chip" key={`dup-${a}`}><Star />{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

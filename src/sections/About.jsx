// "Why we're different" — editorial statement paired with a sunrise-to-midnight arc.
// The day is drawn as a path: sun rising, the three real-life moments along it, moon at midnight.
export default function About() {
  return (
    <section id="about" className="dn-section dn-arc">
      <div className="dn-container">
        <div className="dn-arc-grid">
          <div className="dn-arc-lede">
            <span className="dn-eyebrow">WHY WE&rsquo;RE DIFFERENT</span>
            <blockquote className="dn-arc-quote">
              Built for real life, not <span className="dn-arc-gold">office</span> hours.
            </blockquote>
            <p className="dn-arc-lead">
              <span className="dn-arc-gold">Daytime</span> dentistry.{' '}
              <span className="dn-arc-blue">Night-time</span> emergencies.
            </p>
            <p className="dn-arc-body">
              We&rsquo;re a Merchant City practice in the heart of Glasgow, open mornings, evenings and
              weekends, with a 24-hour line for emergencies. Whether it&rsquo;s a routine check-up, a cosmetic
              consultation, or urgent help when you need it, you shouldn&rsquo;t have to book time off work just
              to look after your teeth.
            </p>
            <div className="dn-arc-by">Day Night Dental &middot; Merchant City, Glasgow</div>
            <a href="/our-team/" className="dn-arc-link">
              Meet our team <span className="arrow">&rarr;</span>
            </a>
          </div>

          <div className="dn-arc-vis">
            <svg viewBox="0 0 400 250" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="dnArcGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#F4C24A" />
                  <stop offset="0.5" stopColor="#7DB5F0" />
                  <stop offset="1" stopColor="#4A95E5" />
                </linearGradient>
              </defs>
              <path d="M20 222 Q 200 -8 380 222" stroke="url(#dnArcGrad)" strokeWidth="2" opacity="0.75" />
              {/* sun, rising at the start */}
              <circle cx="20" cy="222" r="9" fill="#F4C24A" />
              <g stroke="#F4C24A" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
                <path d="M20 205v-6M20 245v-6M37 222h6M-3 222h6M32 210l4-4M8 234l-4 4M32 234l4 4M8 210l-4-4" />
              </g>
              {/* moon, setting at midnight */}
              <path d="M380 213a9 9 0 1 0 0 18a7 7 0 0 1 0-18z" fill="#4A95E5" />
              {/* the three real-life moments along the day */}
              <circle cx="92" cy="147" r="7" fill="#F4C24A" />
              <circle cx="92" cy="147" r="12" fill="none" stroke="#F4C24A" strokeOpacity="0.4" />
              <circle cx="200" cy="105" r="7" fill="#F4C24A" />
              <circle cx="200" cy="105" r="12" fill="none" stroke="#F4C24A" strokeOpacity="0.4" />
              <circle cx="308" cy="147" r="7" fill="#4A95E5" />
              <circle cx="308" cy="147" r="12" fill="none" stroke="#4A95E5" strokeOpacity="0.4" />
            </svg>
            <div className="dn-arc-ends">
              <span className="sun">Sunrise</span>
              <span className="moon">Midnight</span>
            </div>
            <ul className="dn-arc-legend">
              <li className="dn-arc-lg day">
                <span className="dot" />
                <span className="t">Before the school run</span>
                <span className="s">Early mornings</span>
              </li>
              <li className="dn-arc-lg day">
                <span className="dot" />
                <span className="t">On your lunch break</span>
                <span className="s">Daytime and evenings</span>
              </li>
              <li className="dn-arc-lg night">
                <span className="dot" />
                <span className="t">Or at midnight</span>
                <span className="s">24-hour emergency line</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

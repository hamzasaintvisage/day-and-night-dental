// Manifesto About, editorial "why we exist" statement (no photo by design).
export default function About() {
  return (
    <section id="about" className="dn-section dn-mani">
      <div className="dn-container">
        <span className="dn-eyebrow">WHY WE&rsquo;RE DIFFERENT</span>
        <blockquote className="dn-mani-quote">
          Built for real life, not office hours.<br />
          <span className="dn-mani-mut">Daytime dentistry. Night-time emergencies.</span>
        </blockquote>
        <div className="dn-mani-by">Day Night Dental &middot; Merchant City, Glasgow</div>
        <p className="dn-mani-body">
          We&rsquo;re a Merchant City practice in the heart of Glasgow, open mornings, evenings and
          weekends, with a 24-hour line for emergencies. Whether it&rsquo;s a routine check-up, a cosmetic
          consultation, or urgent help when you need it, you shouldn&rsquo;t have to book time off work just
          to look after your teeth.
        </p>
        <div className="dn-mani-pills">
          <span className="dn-mani-pill"><span className="dot day" />Before the school run</span>
          <span className="dn-mani-pill"><span className="dot night" />On your lunch break</span>
          <span className="dn-mani-pill"><span className="dot night" />Or at midnight</span>
        </div>
        <a href="/our-team/" className="dn-mani-link">
          Meet our team <span className="arrow">&rarr;</span>
        </a>
      </div>
    </section>
  )
}

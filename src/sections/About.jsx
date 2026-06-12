// Manifesto About, editorial "why we exist" statement (no photo by design).
export default function About() {
  return (
    <section id="about" className="dn-section dn-mani">
      <div className="dn-container">
        <span className="dn-eyebrow">Why I do this</span>
        <blockquote className="dn-mani-quote">
          I opened this practice for <span className="dn-mani-grad">one reason</span>. Toothache doesn&rsquo;t keep
          office hours,{' '}
          <span className="dn-mani-mut">and the people living with it shouldn&rsquo;t have to either.</span>
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
        <a href="/our-team" className="dn-mani-link">
          Meet our team <span className="arrow">&rarr;</span>
        </a>
      </div>
    </section>
  )
}

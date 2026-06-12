
// Pre-launch: the practice is not open yet, so there are no real reviews.
// This section states honest commitments instead. Swap to real patient reviews
// (with consent) once they exist, then a genuine rating can be shown.
const promises = [
  {
    statement: "When you are in pain at 2am, you are not left waiting until morning. We aim to see you the same day.",
    label: "Open day and night",
    side: "night",
  },
  {
    statement: "No surprises on cost. You get a written plan with the price of everything set out before any treatment starts.",
    label: "Honest pricing",
    side: "day",
  },
  {
    statement: "Nervous? Take all the time you need. We treat a lot of anxious patients, and we never rush you.",
    label: "Gentle care",
    side: "day",
  },
  {
    statement: "Same-day appointments held back every single day, so an emergency never has to wait until Monday.",
    label: "Seen today",
    side: "night",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="dn-section dn-testimonials">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow">Our Promise</span>
          <h2 className="dn-display">
            Care worth <em>talking about</em>
          </h2>
          <p className="dn-testimonials-note">
            We are a new practice in Merchant City, now welcoming patients from across Glasgow.
            Genuine patient reviews will appear here as they come in.
          </p>
        </div>

        <div className="dn-reviews-grid">
          {promises.map((p, i) => (
            <figure key={i} className={`dn-review ${p.side}`}>
              <span className="dn-review-quote-mark">&ldquo;</span>
              <blockquote>{p.statement}</blockquote>
              <figcaption>
                <span className="dn-review-label">{p.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

    </section>
  );
}

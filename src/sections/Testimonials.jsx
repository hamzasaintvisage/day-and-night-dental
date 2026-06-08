import React from 'react';

// Pre-launch: the practice is not open yet, so there are no real reviews.
// This section states honest commitments instead. Swap to real patient reviews
// (with consent) once they exist — then a genuine rating can be shown.
const promises = [
  {
    statement: "When you are in pain at 2am, you won't reach an answering machine. You will speak to a real dentist who can see you.",
    label: "Open day & night",
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

      <style>{`
        .dn-testimonials { position: relative; }
        .dn-testimonials-note {
          margin-top: 1.25rem;
          max-width: 560px;
          color: var(--dn-bone-dim);
          font-size: 0.98rem;
        }
        .dn-reviews-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 4rem;
        }
        .dn-review {
          position: relative;
          padding: 3rem 2.5rem 2.5rem;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          margin: 0;
          transition: all 0.5s ease;
          overflow: hidden;
        }
        .dn-review::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
        }
        .dn-review.day::before { background: var(--dn-day); }
        .dn-review.night::before { background: var(--dn-night); }
        .dn-review:hover {
          background: var(--dn-charcoal);
          transform: translateY(-2px);
        }
        .dn-review-quote-mark {
          position: absolute;
          top: 0.5rem;
          left: 1.5rem;
          font-family: var(--font-display);
          font-size: 5rem;
          opacity: 0.4;
          line-height: 1;
        }
        .dn-review.day .dn-review-quote-mark { color: var(--dn-day); }
        .dn-review.night .dn-review-quote-mark { color: var(--dn-night); }
        .dn-review blockquote {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.6;
          color: var(--dn-bone);
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          letter-spacing: -0.005em;
        }
        .dn-review figcaption {
          padding-top: 1.5rem;
          border-top: 1px solid var(--dn-mist);
        }
        .dn-review-label {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--dn-bone-dim);
        }
        .dn-review.day .dn-review-label { color: var(--dn-day); }
        .dn-review.night .dn-review-label { color: var(--dn-night-soft); }

        @media (max-width: 800px) {
          .dn-reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

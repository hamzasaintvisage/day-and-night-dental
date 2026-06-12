import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import { PRACTICE } from '../data/practice'

// NOTE: opening hours below are PLACEHOLDERS (Sat/Sun invented), confirm the real
// hours with the owner before go-live.
const faqs = [
  {
    q: 'Is there an emergency dentist open now in Glasgow?',
    a: 'Yes. Day Night Dental runs a 24-hour emergency helpline and keeps same-day appointments open every day. You can call any time, including evenings and weekends, so there’s no need to sit in pain until Monday.',
  },
  {
    q: 'Do you take NHS patients?',
    a: 'We’re a private practice, so we can offer same-day access and longer appointments that don’t feel rushed. Give us a call to talk through what you need, and if NHS care would suit you better we’ll happily point you the right way.',
  },
  {
    q: 'Where is the practice and where can I park?',
    a: 'You’ll find us in Merchant City in central Glasgow, a short walk from Queen Street and Argyle Street stations. There are a few car parks nearby and on-street parking close to the door.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We’re open in the practice Monday to Friday 7am to 11pm, Saturday 8am to 10pm and Sunday 9am to 9pm. Outside those hours our 24-hour emergency line is there for urgent dental problems.',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomeFaq() {
  const [active, setActive] = useState(0)
  return (
    <section className="dn-section tp-faq dn-faq">
      <Head>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>
      <div className="dn-container">
        <div className="tp-section-head">
          <span className="dn-eyebrow">Common Questions</span>
          <h2 className="dn-display"><em>Emergency</em> &amp; dental questions, answered</h2>
        </div>

        {/* d3 side-nav: questions left (narrow), answer card right. Reflows on
            mobile to a wrapped row of questions + the card below. All answers are
            rendered (only the active shown) so search engines read every Q&A. */}
        <div className="dn-faq-side">
          <div className="dn-faq-nav" role="tablist" aria-label="Common questions">
            {faqs.map((f, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`dn-faq-q ${active === i ? 'on' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {f.q}
              </button>
            ))}
          </div>
          <div className="dn-faq-panel">
            {faqs.map((f, i) => (
              <div key={i} className={`dn-faq-a ${active === i ? 'on' : ''}`}>
                <h3 className="q">{f.q}</h3>
                <p className="a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="dn-faq-foot">
          Still not sure? <a href={`tel:${PRACTICE.phoneE164}`}>Call us on {PRACTICE.phoneDisplay}</a>, we will talk through your options, 24/7.
        </p>
      </div>
    </section>
  )
}

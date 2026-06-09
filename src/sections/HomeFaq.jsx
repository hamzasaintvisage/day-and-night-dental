import { Head } from 'vite-react-ssg'
import { PRACTICE } from '../data/practice'

const faqs = [
  {
    q: 'Is there an emergency dentist open now in Glasgow?',
    a: 'Yes. Day & Night Dental runs a 24-hour emergency helpline and keeps same-day appointments open every day. You can speak to a clinician any time, including evenings and weekends, so there’s no need to sit in pain until Monday.',
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
  return (
    <section className="dn-section tp-faq">
      <Head>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>
      <div className="dn-container">
        <div className="tp-section-head" style={{ textAlign: 'center' }}>
          <span className="dn-eyebrow">Common Questions</span>
          <h2 className="dn-display" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Emergency &amp; dental questions, answered
          </h2>
        </div>
        <div className="tp-faq-list">
          {faqs.map((f, i) => (
            <details key={i}>
              <summary>{f.q}<span className="icon" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--dn-bone-dim)', fontSize: '0.95rem' }}>
          Still not sure? <a href={`tel:${PRACTICE.phoneE164}`} style={{ color: 'var(--dn-night-soft)', fontWeight: 600 }}>Call us on {PRACTICE.phoneDisplay}</a> — a real dentist will talk it through, 24/7.
        </p>
      </div>
    </section>
  )
}

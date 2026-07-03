import { useRef, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { PRACTICE } from '../data/practice'
import { jsonLd } from '../lib/jsonLd'

// NOTE: opening hours below are PLACEHOLDERS (Sat/Sun invented), confirm the real
// hours with the owner before go-live.
const faqs = [
  {
    q: 'Is there an emergency dentist open now in Glasgow?',
    a: 'Yes. Day Night Dental runs a 24-hour emergency helpline and keeps same-day appointments open every day. You can call any time, including evenings and weekends, so there’s no need to sit in pain until Monday.',
    cap: 'Emergency',
  },
  {
    q: 'Are you taking on new patients?',
    a: 'Yes, we’re welcoming new patients. The quickest way to start is to put your name down through our registration form, and we’ll be in touch to arrange your first visit. If we’re especially busy there can be a short wait for a routine appointment, but urgent and emergency care is always available, day or night.',
    cap: 'New patients',
  },
  {
    q: 'Where is the practice and where can I park?',
    a: 'You’ll find us in Merchant City in central Glasgow, a short walk from Queen Street and Argyle Street stations. There are a few car parks nearby and on-street parking close to the door.',
    cap: 'Finding us',
  },
  {
    q: 'What are your opening hours?',
    a: 'We’re open in the practice Monday to Friday 7am to 11pm, Saturday 8am to 10pm and Sunday 9am to 9pm. Outside those hours our 24-hour emergency line is there for urgent dental problems.',
    cap: 'Opening hours',
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

// Inline accordion: an oversized gold numeral beside each question; clicking a
// question opens its answer in a gold-edged box directly beneath it. Disclosure
// pattern (button aria-expanded -> the answer region right below). First entry
// open by default; EVERY answer is rendered in the DOM (only the open ones shown)
// for SEO. Static + SSR-safe; mobile-light (no backdrop-filter, no infinite
// animation, no blur).
export default function HomeFaq() {
  const [open, setOpen] = useState(0)
  const btnRefs = useRef([])

  // Roving focus across the question buttons (arrows move focus; Enter/Space toggles).
  const onKeyDown = (e, i) => {
    const last = faqs.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next !== null) {
      e.preventDefault()
      btnRefs.current[next]?.focus()
    }
  }

  return (
    <section className="dn-section tp-faq dn-faq" aria-labelledby="faq-heading">
      <Head>
        <script type="application/ld+json">{jsonLd(faqLd)}</script>
      </Head>
      <div className="dn-container">
        <div className="tp-section-head dn-center-head">
          <span className="dn-eyebrow dn-pill day">Common Questions</span>
          <h2 className="dn-display" id="faq-heading">
            <em className="dn-hl-gold">Emergency</em> &amp; dental questions, answered
          </h2>
          <div className="dn-head-rule" aria-hidden="true" />
        </div>

        {/* inline accordion: each question opens its own answer directly beneath it.
            Every answer is in the DOM (hidden when closed) so search engines read all four. */}
        <ul className="dn-faq-acc">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const num = String(i + 1).padStart(2, '0')
            return (
              <li className="dn-faq-item" key={i}>
                <h3 className="dn-faq-h">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="dn-faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-ans-${i}`}
                    ref={(el) => { btnRefs.current[i] = el }}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span className="dn-faq-num" aria-hidden="true">{num}</span>
                    <span className="dn-faq-qtext">{f.q}</span>
                    <span className="dn-faq-caret" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-ans-${i}`}
                  className={`dn-faq-ans ${isOpen ? 'on' : ''}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                >
                  <div className="dn-faq-ans-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="dn-faq-foot">
          Still not sure? <a href={`tel:${PRACTICE.phoneE164}`}>Call us on {PRACTICE.phoneDisplay}</a>, we will talk through your options, 24/7.
        </p>
      </div>
    </section>
  )
}

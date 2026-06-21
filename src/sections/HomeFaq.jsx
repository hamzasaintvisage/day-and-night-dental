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
  },
  {
    q: 'Are you taking on new patients?',
    a: 'Yes, we’re welcoming new patients. The quickest way to start is to put your name down through our registration form, and we’ll be in touch to arrange your first visit. If we’re especially busy there can be a short wait for a routine appointment, but urgent and emergency care is always available, day or night.',
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
  const tabRefs = useRef([])

  // Roving-tabindex keyboard support for the vertical tablist (WAI-ARIA tabs,
  // automatic activation). Arrow keys move + select; Home/End jump to ends.
  const onKeyDown = (e) => {
    const last = faqs.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section className="dn-section tp-faq dn-faq">
      <Head>
        <script type="application/ld+json">{jsonLd(faqLd)}</script>
      </Head>
      <div className="dn-container">
        <div className="tp-section-head dn-center-head">
          <span className="dn-eyebrow dn-pill night">Common Questions</span>
          <h2 className="dn-display"><em className="dn-hl-blue">Emergency</em> &amp; dental questions, answered</h2>
        </div>

        {/* d3 side-nav: questions left (narrow), answer card right. Reflows on
            mobile to a wrapped row of questions + the card below. All answers are
            rendered (only the active shown) so search engines read every Q&A. */}
        <div className="dn-faq-side">
          <div className="dn-faq-nav" role="tablist" aria-label="Common questions" aria-orientation="vertical">
            {faqs.map((f, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                id={`faq-tab-${i}`}
                ref={(el) => { tabRefs.current[i] = el }}
                aria-selected={active === i}
                aria-controls={`faq-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                className={`dn-faq-q ${active === i ? 'on' : ''}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                {f.q}
              </button>
            ))}
          </div>
          <div className="dn-faq-panel">
            {faqs.map((f, i) => (
              <div
                key={i}
                role="tabpanel"
                id={`faq-panel-${i}`}
                aria-labelledby={`faq-tab-${i}`}
                tabIndex={0}
                className={`dn-faq-a ${active === i ? 'on' : ''}`}
              >
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

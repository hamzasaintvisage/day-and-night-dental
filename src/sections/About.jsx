import { useState } from 'react'

// "Why we're different" - "The Marquee".
// Two slow kinetic bands repeat the day/night words (Daytime gold, Night-time blue)
// above and below a static, fully-legible editorial statement. The marquees are pure
// decoration: the CSS keyframe drifts them with no JS, and each band's pace/direction
// is set via an inline CSS variable so the default state renders correctly server-side.
// A tap toggles a pause for legibility on demand. prefers-reduced-motion disables motion.

const TOP_WORDS = [
  { t: 'Daytime', c: 'day' },
  { t: 'dentistry', c: 'ghost' },
  { t: 'Night-time', c: 'night' },
  { t: 'emergencies', c: 'ghost' },
  { t: '24-7', c: 'day' },
  { t: 'Real life', c: 'ghost' },
]

const BOTTOM_WORDS = [
  { t: 'Night-time', c: 'night' },
  { t: 'emergencies', c: 'ghost' },
  { t: 'Daytime', c: 'day' },
  { t: 'dentistry', c: 'ghost' },
  { t: '24-7', c: 'night' },
  { t: 'Real life', c: 'ghost' },
]

function sepClass(word) {
  if (word.c === 'day') return 'dn-mq-sep day'
  if (word.c === 'night') return 'dn-mq-sep night'
  return 'dn-mq-sep'
}

function Segment({ words, ariaHidden }) {
  return (
    <span className="seg" aria-hidden={ariaHidden ? 'true' : undefined}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          <span className={`dn-mq-word ${w.c}`}>{w.t}</span>
          <span className={sepClass(w)} />
        </span>
      ))}
    </span>
  )
}

function Band({ words, dur, dir }) {
  return (
    <div className="dn-marquee" aria-hidden="true">
      <div className="dn-marquee-track" style={{ '--dur': `${dur}s`, '--dir': dir }}>
        <Segment words={words} />
        <Segment words={words} ariaHidden />
      </div>
    </div>
  )
}

export default function About() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="about"
      className={`dn-section dn-about${paused ? ' dn-paused' : ''}`}
      aria-labelledby="about-heading"
    >
      <button
        type="button"
        className="dn-mq-band-btn"
        aria-label={paused ? 'Resume the moving words' : 'Pause the moving words'}
        onClick={() => setPaused((p) => !p)}
      >
        <Band words={TOP_WORDS} dur={48} dir="normal" />
      </button>

      <div className="dn-container">
        <div className="dn-stage">
          <span className="dn-eyebrow dn-pill day">WHY WE&rsquo;RE DIFFERENT</span>

          <h2 className="dn-headline" id="about-heading">
            Built for real life, not <span className="gold">office</span> hours.
          </h2>

          <p className="dn-lead">
            <span className="day">Daytime</span> dentistry.{' '}
            <span className="night">Night-time</span> emergencies.
          </p>

          <p className="dn-body">
            We&rsquo;re a Merchant City practice in the heart of Glasgow, open mornings, evenings and
            weekends, with a 24-hour line for emergencies. Whether it&rsquo;s a routine check-up, a cosmetic
            consultation, or urgent help when you need it, you shouldn&rsquo;t have to book time off work just
            to look after your teeth.
          </p>

          <ul className="dn-moments">
            <li className="dn-moment day">
              <span className="when">Early mornings</span>
              <span className="what">Before the school run</span>
            </li>
            <li className="dn-moment day">
              <span className="when">Daytime and evenings</span>
              <span className="what">On your lunch break</span>
            </li>
            <li className="dn-moment night">
              <span className="when">24-hour emergency line</span>
              <span className="what">Or at midnight</span>
            </li>
          </ul>

          <div className="dn-by">Day Night Dental, Merchant City, Glasgow</div>
          <a href="/our-team/" className="dn-link">
            Meet our team <span className="arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <button
        type="button"
        className="dn-mq-band-btn"
        aria-label={paused ? 'Resume the moving words' : 'Pause the moving words'}
        onClick={() => setPaused((p) => !p)}
      >
        <Band words={BOTTOM_WORDS} dur={54} dir="reverse" />
      </button>
    </section>
  )
}

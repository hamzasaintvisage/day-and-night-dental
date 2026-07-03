
// Two real GDC-registered dentists + the principal (name/GDC pending - kept as a placeholder card
// per owner). Photos pending: cards use a styled avatar until headshots arrive. The `gdc` value is
// emitted into the Person schema by OurTeam.jsx; the bracketed principal name is auto-filtered out
// of the schema until real, and `npm run check:launch` refuses go-live while a "[...]" placeholder
// remains - so it can't accidentally ship unfinished.
export const team = [
  { id: 'principal', name: 'Dr Willie Chang', role: 'Principal Dentist', gdc: '296929', side: 'day' },
  { id: 'chiang', name: 'Dr Pei Hsin Chiang', role: 'Dentist', gdc: '333443', side: 'night' },
  { id: 'lee', name: 'Dr Chia-Hsuan Lee', role: 'Dentist', gdc: '310152', side: 'day' },
]

export function AvatarSvg() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="32" cy="25" r="11" />
      <path d="M13 52 C13 41, 22 36.5, 32 36.5 C42 36.5, 51 41, 51 52" />
    </svg>
  )
}

// Build a 2-letter monogram from the real name: first letter of the first
// real word after "Dr" + first letter of the surname. Pure, deterministic and
// SSR-safe (no Date/random/window). Falls back gracefully if a name is short.
function monogram(name) {
  const words = name
    .replace(/^Dr\.?\s+/i, '')
    .split(/[\s-]+/)
    .filter(Boolean)
  if (words.length === 0) return ''
  const first = words[0][0] || ''
  const last = words.length > 1 ? words[words.length - 1][0] || '' : ''
  return (first + last).toUpperCase()
}

// "Gold Masthead" team section (statement lens, lab pick): an editorial printed
// masthead - a nameplate header, an "issue" rule, then a hairline-ruled register
// of practitioners. Each name is set in outline-stroke display type that fills
// solid in its single side-accent on hover/focus; a leading accent spine and a
// monogram disc carry the day/night colour. A small touch affordance (useEffect
// only) lets the fill also fire on tap. Every practitioner renders server-side
// for SEO - full default state with no client JS required.
export default function Team() {
  return (
    <section id="team" className="dn-section dn-team dn-team-gm">
      <div className="dn-container">
        <header className="dn-gm-head">
          <span className="dn-eyebrow dn-pill day">The Practitioners</span>
          <h2 className="dn-display">
            The people behind your <em className="dn-hl-gold">smile</em>
          </h2>
          <p className="dn-section-lead">
            Our dentists are GDC-registered and experienced across emergency, restorative
            and cosmetic dentistry. You'll get an honest opinion and a clear plan, every visit.
          </p>
        </header>

        <div className="dn-gm-rule">
          <span className="dn-gm-folio">GDC-registered <b>·</b> 0{team.length} practitioners</span>
          <span className="dn-gm-line" aria-hidden="true" />
          <span className="dn-gm-vol">The Register</span>
        </div>

        <ol className="dn-gm-roster">
          {team.map((m, i) => (
            <li key={m.id} className={`dn-gm-row ${m.side}`}>
              <span className="dn-gm-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="dn-gm-disc" aria-hidden="true">
                <span className="dn-gm-mono">{monogram(m.name)}</span>
              </span>
              <span className="dn-gm-body">
                <span className="dn-gm-kicker">{m.role}</span>
                <span className="dn-gm-name">{m.name}</span>
              </span>
              <span className="dn-gm-reg">
                <span className="dn-gm-role">{m.role}</span>
                {m.gdc && <span className="dn-gm-gdc">GDC No.<b>{m.gdc}</b></span>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

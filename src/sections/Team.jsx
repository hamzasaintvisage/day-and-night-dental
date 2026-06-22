
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

// "The Masthead" team section (editorial lens, panel pick): a sticky header column
// beside a numbered editorial list of practitioners (number · avatar · role/name · GDC).
// Day/night accent per row; hover/focus lifts + glows in that row's single colour.
// Static markup - every practitioner renders server-side for SEO; no client JS needed.
export default function Team() {
  return (
    <section id="team" className="dn-section dn-team dn-team-masthead">
      <div className="dn-container dn-masthead">
        <header className="dn-mast-head">
          <span className="dn-eyebrow dn-pill day">The Practitioners</span>
          <h2 className="dn-display">
            The people behind your <em className="dn-hl-gold">smile</em>
          </h2>
          <p className="dn-section-lead">
            Our dentists are GDC-registered and experienced across emergency, restorative
            and cosmetic dentistry. You'll get an honest opinion and a clear plan, every visit.
          </p>
          <p className="dn-mast-meta">GDC-registered · 0{team.length} practitioners</p>
        </header>

        <ol className="dn-mast-list">
          {team.map((m, i) => (
            <li key={m.id} className={`dn-mast-row ${m.side}`}>
              <span className="dn-mast-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dn-mast-avatar"><AvatarSvg /></span>
              <span className="dn-mast-id">
                <span className="dn-mast-role">{m.role}</span>
                <span className="dn-mast-name">{m.name}</span>
              </span>
              {m.gdc && <span className="dn-mast-gdc">GDC No.<b>{m.gdc}</b></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

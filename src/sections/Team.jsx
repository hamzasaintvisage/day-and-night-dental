
// Two real GDC-registered dentists + the principal (name/GDC pending — kept as a placeholder card
// per owner). Photos pending: cards use a styled avatar until headshots arrive. The `gdc` value is
// emitted into the Person schema by OurTeam.jsx; the bracketed principal name is auto-filtered out
// of the schema until real, and `npm run check:launch` refuses go-live while a "[...]" placeholder
// remains — so it can't accidentally ship unfinished.
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

function Portrait({ side }) {
  return (
    <div className={`dn-portrait ${side}`}>
      <div className={`dn-avatar ${side}`}><AvatarSvg /></div>
      <div className="dn-portrait-overlay" />
      <div className="dn-portrait-frame" />
    </div>
  )
}

export default function Team() {
  return (
    <section id="team" className="dn-section dn-team">
      <div className="dn-container">
        <div className="dn-section-head">
          <span className="dn-eyebrow dn-pill day">The Practitioners</span>
          <h2 className="dn-display">
            The people behind your <em className="dn-hl-gold">smile</em>
          </h2>
          <p className="dn-section-lead">
            Our dentists are GDC-registered and experienced across emergency, restorative
            and cosmetic dentistry. You'll get an honest opinion and a clear plan, every visit.
          </p>
        </div>

        <div className="dn-team-grid">
          {team.map((member) => (
            <article key={member.id} className="dn-team-card">
              <Portrait side={member.side} />
              <div className="dn-team-info">
                <span className={`dn-eyebrow ${member.side}`}>{member.role}</span>
                <h3>{member.name}</h3>
                {member.gdc && <span className="dn-team-specialty">GDC No. {member.gdc}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

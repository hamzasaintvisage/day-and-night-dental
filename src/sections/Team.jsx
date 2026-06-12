
// Placeholders. Replace names + add real photos once available.
// Three dentists max (owner). Replace bracketed names/roles + add real photos and
// GDC numbers before go-live, these are placeholders.
export const team = [
  { name: 'Dr. [Principal Name]', role: 'Principal Dentist', specialty: 'BDS, MFDS RCS', side: 'day' },
  { name: 'Dr. [Dentist Name]', role: 'Dentist', specialty: 'BDS', side: 'night' },
  { name: 'Dr. [Dentist Name]', role: 'Dentist', specialty: 'BDS', side: 'day' },
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
          <span className="dn-eyebrow">The Practitioners</span>
          <h2 className="dn-display">
            The people behind your <em>smile</em>
          </h2>
          <p className="dn-section-lead">
            Our dentists are GDC-registered and experienced across emergency, restorative
            and cosmetic dentistry. You'll get an honest opinion and a clear plan, every visit.
          </p>
        </div>

        <div className="dn-team-grid">
          {team.map((member) => (
            <article key={member.name} className="dn-team-card">
              <Portrait side={member.side} />
              <div className="dn-team-info">
                <span className={`dn-eyebrow ${member.side}`}>{member.role}</span>
                <h3>{member.name}</h3>
                <span className="dn-team-specialty">{member.specialty}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

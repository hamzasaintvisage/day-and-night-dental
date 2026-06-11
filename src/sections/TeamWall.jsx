import { team, AvatarSvg } from './Team'

export default function TeamWall() {
  return (
    <section className="dn-section dn-team dn-team-wall-section">
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

        <div className="dn-team-wall">
          {team.map((member) => (
            <article key={member.name} className={`dn-wall-card ${member.side}`}>
              <div className={`dn-wall-avwrap ${member.side}`}>
                <div className={`dn-avatar ${member.side}`}><AvatarSvg /></div>
                <span className="dn-wall-ring" />
              </div>
              <span className={`dn-eyebrow ${member.side}`}>{member.role}</span>
              <h3 className="dn-wall-name">{member.name}</h3>
              <span className="dn-team-specialty">{member.specialty}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

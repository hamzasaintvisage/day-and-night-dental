import { useState } from 'react'
import { AvatarSvg } from './Team'

// Bios kept in general terms — no CBCT / 3D scanner / free / 0% APR claims.
const team = [
  { name: 'Dr. [Principal Name]', role: 'Principal Dentist', specialty: 'BDS, MFDS RCS', side: 'day',
    bio: 'Founded Day Night Dental on one belief: dental pain should never wait for morning. Leads emergency and restorative care.' },
  { name: 'Dr. [Implant Specialist]', role: 'Implantologist', specialty: 'BDS, MSc Implant Dentistry', side: 'night',
    bio: 'Plans and places single implants, bridges and full-arch restoration.' },
  { name: 'Dr. [Cosmetic Lead]', role: 'Cosmetic Lead', specialty: 'BDS, PG Cert Aesthetic', side: 'day',
    bio: 'Designs veneers, bonding and full smile makeovers around your own face, never a template.' },
  { name: 'Dr. [Orthodontist]', role: 'Orthodontist', specialty: 'BDS, MOrth RCS', side: 'night',
    bio: 'Straightens teeth with Invisalign and fixed braces, so you can see the plan before starting.' },
  { name: '[Hygienist Name]', role: 'Dental Hygienist', specialty: 'GDC Registered', side: 'day',
    bio: 'Keeps gums healthy and smiles bright, and looks after our most anxious patients with real patience.' },
  { name: '[Practice Manager]', role: 'Practice Manager', specialty: 'Patient Coordinator', side: 'night',
    bio: 'The voice on the end of the phone at 2am, and the person who makes your visit run smoothly.' },
]

export default function TeamSpotlight() {
  const [active, setActive] = useState(0)
  const m = team[active]

  return (
    <section className="dn-section dn-team dn-team-spot-section">
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

        <div className="dn-team-spotlight">
          <div className={`dn-ts-feature ${m.side}`}>
            <div className={`dn-ts-feature-avatar dn-avatar ${m.side}`}><AvatarSvg /></div>
            <span className={`dn-eyebrow ${m.side}`}>{m.role}</span>
            <h3 className="dn-ts-feature-name">{m.name}</h3>
            <span className="dn-team-specialty">{m.specialty}</span>
            <p className="dn-ts-feature-bio">{m.bio}</p>
          </div>

          <div className="dn-ts-mini">
            {team.map((mm, i) => (
              <button
                type="button"
                key={mm.name}
                className={`dn-ts-mc ${mm.side} ${i === active ? 'on' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`Show ${mm.name}`}
              >
                <div className={`dn-avatar ${mm.side}`}><AvatarSvg /></div>
                <div className="dn-ts-mc-text">
                  <span className={`dn-eyebrow ${mm.side}`}>{mm.role}</span>
                  <span className="dn-ts-mc-name">{mm.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SEO-only content — keeps all bios in the static HTML for crawlers. */}
        <div className="dn-visually-hidden">
          {team.map((mm) => (
            <article key={mm.name}>
              <h3>{mm.name}</h3>
              <p>{mm.role}, {mm.specialty}. {mm.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

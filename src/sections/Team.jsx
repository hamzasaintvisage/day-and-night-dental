import React from 'react';

// Placeholder portraits pulled from Unsplash (free, no attribution required for use,
// but credit appreciated). Swap each `image` for the dentist's actual photo when ready.
export const team = [
  {
    name: 'Dr. [Principal Name]',
    role: 'Principal Dentist',
    specialty: 'BDS, MFDS RCS',
    side: 'day',
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&h=840&fit=crop&q=80&fm=webp',
  },
  {
    name: 'Dr. [Implant Specialist]',
    role: 'Implantologist',
    specialty: 'BDS, MSc Implant Dentistry',
    side: 'night',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=840&fit=crop&q=80&fm=webp',
  },
  {
    name: 'Dr. [Cosmetic Lead]',
    role: 'Cosmetic Lead',
    specialty: 'BDS, PG Cert Aesthetic',
    side: 'day',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=840&fit=crop&q=80&fm=webp',
  },
  {
    name: 'Dr. [Orthodontist]',
    role: 'Orthodontist',
    specialty: 'BDS, MOrth RCS',
    side: 'night',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=840&fit=crop&q=80&fm=webp',
  },
  {
    name: '[Hygienist Name]',
    role: 'Dental Hygienist',
    specialty: 'GDC Registered',
    side: 'day',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=840&fit=crop&q=80&fm=webp',
  },
  {
    name: '[Practice Manager]',
    role: 'Practice Manager',
    specialty: 'Patient Coordinator',
    side: 'night',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=840&fit=crop&q=80&fm=webp',
  },
];

function Portrait({ image, name, side }) {
  return (
    <div className={`dn-portrait ${side}`}>
      <img src={image} alt={`${name}, dentist at Day & Night Dental, Glasgow`} width={600} height={840} loading="lazy" decoding="async" />
      <div className="dn-portrait-overlay" />
      <div className="dn-portrait-frame" />
    </div>
  );
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
              <Portrait image={member.image} name={member.name} side={member.side} />
              <div className="dn-team-info">
                <span className={`dn-eyebrow ${member.side}`}>{member.role}</span>
                <h4>{member.name}</h4>
                <span className="dn-team-specialty">{member.specialty}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="dn-team-note">
          <span className="dn-eyebrow">Note</span>
          <p>
            These portraits are stock photos standing in for now. We'll swap them for proper
            photographs of the team before launch. The names and credentials are placeholders too.
          </p>
        </div>
      </div>

    </section>
  );
}

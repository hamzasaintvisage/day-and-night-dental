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

      <style>{`
        .dn-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }
        .dn-team-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.5s ease;
        }
        .dn-team-card:hover { transform: translateY(-4px); }
        .dn-portrait {
          position: relative;
          aspect-ratio: 5/7;
          background: var(--dn-near-black);
          border: 1px solid var(--dn-mist);
          overflow: hidden;
        }
        .dn-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) brightness(0.85) contrast(1.1);
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dn-team-card:hover .dn-portrait img {
          filter: grayscale(0%) brightness(1) contrast(1);
          transform: scale(1.03);
        }
        .dn-portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 100%);
          pointer-events: none;
        }
        .dn-portrait.day .dn-portrait-overlay {
          background: linear-gradient(180deg,
            transparent 0%,
            transparent 40%,
            rgba(212, 164, 83, 0.08) 70%,
            rgba(0, 0, 0, 0.7) 100%);
        }
        .dn-portrait.night .dn-portrait-overlay {
          background: linear-gradient(180deg,
            transparent 0%,
            transparent 40%,
            rgba(91, 143, 191, 0.08) 70%,
            rgba(0, 0, 0, 0.7) 100%);
        }
        .dn-portrait-frame {
          position: absolute;
          inset: 8px;
          border: 1px solid transparent;
          pointer-events: none;
          transition: border-color 0.5s;
        }
        .dn-portrait.day .dn-portrait-frame { border-color: rgba(212, 164, 83, 0); }
        .dn-portrait.night .dn-portrait-frame { border-color: rgba(91, 143, 191, 0); }
        .dn-team-card:hover .dn-portrait.day .dn-portrait-frame { border-color: rgba(212, 164, 83, 0.4); }
        .dn-team-card:hover .dn-portrait.night .dn-portrait-frame { border-color: rgba(91, 143, 191, 0.4); }
        .dn-team-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dn-team-info h4 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.25rem 0;
        }
        .dn-team-specialty {
          font-size: 0.85rem;
          color: var(--dn-bone-dim);
          font-style: normal;
        }
        .dn-team-note {
          margin-top: 4rem;
          padding: 1.5rem 2rem;
          border: 1px dashed var(--dn-mist);
          text-align: center;
        }
        .dn-team-note p {
          margin-top: 0.5rem;
          color: var(--dn-bone-dim);
          font-size: 0.9rem;
          font-style: normal;
        }
        @media (max-width: 800px) {
          .dn-team-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
        @media (max-width: 500px) {
          .dn-team-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

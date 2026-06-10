import { PRACTICE } from '../data/practice';

export default function EmergencyBand() {
  return (
    <section id="emergency" className="dn-emergency">
      <div className="dn-emergency-inner">
        <div className="dn-emergency-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" />
            <path d="M16 8 V16 L21 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="pulse" />
        </div>

        <div className="dn-emergency-content">
          <div className="dn-eyebrow night">Dental Emergency?</div>
          <h2 className="dn-display">
            A <em>24-hour emergency dentist</em> in Glasgow. We aim to see you the same day, every day.
          </h2>
        </div>

        <div className="dn-emergency-actions">
          <a href={`tel:${PRACTICE.phoneE164}`} className="dn-emergency-phone">
            <span className="label">Emergency Line</span>
            <span className="number">{PRACTICE.phoneDisplay}</span>
          </a>
          <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call now
          </a>
        </div>
      </div>

    </section>
  );
}

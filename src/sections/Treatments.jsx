import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/ConcernIcon';
import { PRACTICE } from '../data/practice';

// Single source of truth for the phone (NAP lives in practice.js, never hardcoded).
const { phoneE164, phoneDisplay } = PRACTICE;

// Maps the homepage treatment ids to their dedicated treatment-page slugs.
const slugMap = {
  general: 'general-dentistry',
  cosmetic: 'cosmetic-dentistry',
  invisalign: 'invisalign',
  implants: 'dental-implants',
  whitening: 'teeth-whitening',
  emergency: 'emergency-dentist',
};

// Emergency Care is FIRST (01) and the default selection. The rest follow.
// `side` drives the gold (day) / blue (night) accent rhythm of the design.
const treatments = [
  {
    id: 'emergency',
    title: 'Emergency Care',
    tag: '24/7 Available',
    side: 'day',
    icon: 'clock',
    sub: 'Urgent dental help, around the clock',
    teaser: 'Toothache, broken crown or knocked-out tooth. Urgent help, around the clock.',
    description: 'Toothache, a broken crown, a knocked-out tooth, an abscess. Urgent dental help, around the clock.',
    points: ['24-hour helpline', 'Same-day appointments', 'Out-of-hours care', 'Pain relief first'],
    highlight: true,
  },
  {
    id: 'general',
    title: 'General Dentistry',
    tag: 'Foundation Care',
    side: 'night',
    icon: 'tooth',
    sub: 'The everyday care that keeps teeth well',
    teaser: 'Check-ups, hygiene and fillings to keep teeth healthy for all ages.',
    description: 'Check-ups, hygiene visits, fillings and the everyday preventative care that keeps your teeth healthy.',
    points: ['Routine check-ups', 'Hygiene visits', 'Tooth-coloured fillings', 'Care for all ages'],
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    tag: 'Smile Design',
    side: 'night',
    icon: 'smile',
    sub: 'Planned around your own face',
    teaser: 'Veneers, bonding and makeovers planned around your own face.',
    description: 'Veneers, bonding and smile makeovers, planned around your own face rather than a one-size-fits-all template.',
    points: ['Porcelain veneers', 'Composite bonding', 'Smile makeovers', 'Tailored treatment plans'],
  },
  {
    id: 'invisalign',
    title: 'Invisalign®',
    tag: 'Clear Aligners',
    side: 'day',
    icon: 'align',
    sub: 'Straighten teeth, discreetly',
    teaser: 'A nearly invisible, removable way to straighten your teeth.',
    description: 'A nearly invisible way to straighten your teeth, a discreet alternative to traditional fixed braces.',
    points: ['Clear, removable aligners', 'A discreet alternative to braces', 'Suitable for many cases', 'Consultation to start'],
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    tag: 'Replacing Missing Teeth',
    side: 'night',
    icon: 'implant',
    sub: 'Look, feel and work like natural',
    teaser: 'Replacements that look, feel and work like a natural tooth.',
    description: 'Designed to look, feel and work like a natural tooth, for replacing a single tooth or several.',
    points: ['Single tooth implants', 'Implant-supported bridges', 'Full-arch solutions', 'Replacing missing teeth'],
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    tag: 'Brighter Smile',
    side: 'day',
    icon: 'sparkle',
    sub: 'Clinician-led, not high-street',
    teaser: 'Clinician-led whitening, a world away from high-street kits.',
    description: 'Professional whitening carried out by trained clinicians. A world away from the kits you find on the high street.',
    points: ['Clinician-led treatment', 'In-chair and at-home options', 'Custom-made trays', 'A brighter, natural look'],
  },
];

// Small inline check used inside each point row.
function Check() {
  return (
    <svg className="txg-check" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// The featured card body. Rendered once per treatment so every treatment's
// copy + links live in the HTML for SEO, even when not the active panel.
function Panel({ t, num, isActive }) {
  return (
    <article
      className={`txg-panel ${t.side} ${isActive ? 'is-active' : ''}`}
      id={`txg-panel-${t.id}`}
      role="tabpanel"
      aria-labelledby={`txg-opt-${t.id}`}
      aria-hidden={isActive ? undefined : 'true'}
    >
      <span className="txg-pnum" aria-hidden="true">{num}</span>

      <span className={`txg-ptag ${t.highlight ? 'is-emergency' : ''}`}>
        <span className="txg-pdot" aria-hidden="true" />
        {t.tag}
      </span>

      <h3 className="txg-ptitle">{t.title}</h3>
      <p className="txg-psub">{t.sub}</p>
      <p className="txg-pdesc">{t.description}</p>

      <ul className="txg-points">
        {t.points.map((p, i) => (
          <li key={i}><Check />{p}</li>
        ))}
      </ul>

      <div className="txg-cta">
        {t.highlight ? (
          <a
            className="txg-btn txg-btn-primary txg-btn-call"
            href={`tel:${phoneE164}`}
            aria-label={`Call the 24/7 emergency dental line now on ${phoneDisplay}`}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />
            </svg>
            Call the 24/7 line now
          </a>
        ) : (
          <a className="txg-btn txg-btn-primary" href="#contact">
            Book Consultation
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        )}

        {t.highlight ? (
          <a className="txg-btn txg-btn-ghost" href="#contact">Book Consultation</a>
        ) : null}

        <Link className="txg-link-quiet" to={`/treatments/${slugMap[t.id]}/`}>
          Read full guide
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Trust strip, used in both the header and the stage footer.
function TrustStrip({ className }) {
  return (
    <p className={className}>
      <span className="txg-ti">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        GDC-registered clinicians
      </span>
      <span className="txg-sep" aria-hidden="true" />
      <span className="txg-ti">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Merchant City, Glasgow
      </span>
      <span className="txg-sep" aria-hidden="true" />
      <span className="txg-ti">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
        24/7 emergency line
      </span>
    </p>
  );
}

export default function Treatments() {
  const [active, setActive] = useState(treatments[0].id);

  return (
    <section id="treatments" className="txg-root" aria-label="Our treatments">
      <div className="txg-wrap">

        <header className="txg-head">
          <span className="txg-eyebrow">
            <span className="txg-eyebrow-dot" aria-hidden="true" />
            Our Treatments
          </span>
          <h2 className="txg-h2">
            Every aspect of <em>modern</em> dentistry, under one roof
          </h2>
          <TrustStrip className="txg-head-trust" />
        </header>

        <div className="txg-split">

          {/* ===== SELECTOR LIST (left on desktop, first on mobile) ===== */}
          <div className="txg-list-col">
            <p className="txg-list-label" id="txg-list-label">Select a treatment</p>
            <div className="txg-list" role="tablist" aria-labelledby="txg-list-label">
              {treatments.map((t, i) => {
                const isActive = active === t.id;
                const num = `0${i + 1}`;
                return (
                  <button
                    key={t.id}
                    type="button"
                    id={`txg-opt-${t.id}`}
                    className={`txg-option ${t.side} ${isActive ? 'is-active' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`txg-panel-${t.id}`}
                    onClick={() => setActive(t.id)}
                    onMouseEnter={() => setActive(t.id)}
                    onFocus={() => setActive(t.id)}
                  >
                    <span className="txg-option-row">
                      <span className="txg-option-num" aria-hidden="true">{num}</span>
                      <span className="txg-option-ico" aria-hidden="true"><Icon type={t.icon} /></span>
                      <span className="txg-option-body">
                        <span className="txg-option-head">
                          <span className="txg-option-name">{t.title}</span>
                          <span className="txg-option-cat">
                            {t.highlight
                              ? <span className="txg-live">24/7 Available</span>
                              : t.tag}
                          </span>
                        </span>
                        <span className="txg-option-teaser">{t.teaser}</span>
                        {t.highlight && (
                          <a
                            className="txg-option-call"
                            href={`tel:${phoneE164}`}
                            aria-label={`Call the 24/7 emergency dental line now on ${phoneDisplay}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                              <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L17 12l4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />
                            </svg>
                            Call now · 24/7
                          </a>
                        )}
                      </span>
                      <svg className="txg-option-arrow" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== FEATURED STAGE (right on desktop, after list on mobile) ===== */}
          <div className="txg-stage-col">
            <div className="txg-stage">
              <div className="txg-stage-inner">
                {treatments.map((t, i) => (
                  <Panel
                    key={t.id}
                    t={t}
                    num={`0${i + 1}`}
                    isActive={active === t.id}
                  />
                ))}
              </div>
              <TrustStrip className="txg-stage-foot" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

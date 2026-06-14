// Brand icon set. Dental-specific icons (tooth, gap, align, sparkle, denture,
// smile, implant) are original hand-drawn line art in the logo's minimal style.
// General UI icons (clock, calendar, phone, pin, shield, heart, pulse, chat,
// clipboard) are from Lucide (ISC licence, github.com/lucide-icons/lucide),
// thinned to 1.5 to sit beside the hand-drawn ones. Used across the site via <Icon type=…/>.
export function Icon({ type }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: '0 0 36 36',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  // General UI icons are sourced from Lucide (ISC licence, github.com/lucide-icons/lucide),
  // thinned to 1.5 and rendered in currentColor so they sit beside the custom dental icons.
  const lucide = {
    width: 36, height: 36, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
  };

  switch (type) {
    case 'tooth':
      return (
        <svg {...common}>
          <path d="M18 8 Q11 8, 9 14 Q8 22, 11 28 Q13 30, 14 26 Q15 22, 18 22 Q21 22, 22 26 Q23 30, 25 28 Q28 22, 27 14 Q25 8, 18 8 Z" />
          <path d="M14 14 Q14 17, 16 18" opacity="0.5" />
        </svg>
      );
    case 'gap':
      return (
        <svg {...common}>
          <path d="M8 12 Q8 8, 12 8 Q15 8, 15 14 L15 22 Q15 26, 12 26 Q8 26, 8 22 Z" />
          <path d="M28 12 Q28 8, 24 8 Q21 8, 21 14 L21 22 Q21 26, 24 26 Q28 26, 28 22 Z" />
          <line x1="17" y1="18" x2="19" y2="18" strokeDasharray="1 2" />
        </svg>
      );
    case 'align':
      return (
        <svg {...common}>
          <path d="M8 14 L8 22 M12 12 L12 22 M16 14 L16 22 M20 12 L20 22 M24 14 L24 22 M28 12 L28 22" />
          <line x1="6" y1="26" x2="30" y2="26" />
          <path d="M9 10 L29 8" opacity="0.5" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M10 18 Q10 10, 18 10 Q26 10, 26 18 Q26 26, 18 26 Q10 26, 10 18 Z" />
          <path d="M18 6 L18 9 M18 27 L18 30 M6 18 L9 18 M27 18 L30 18" opacity="0.6" />
          <path d="M15 15 Q17 17, 19 16" />
        </svg>
      );
    case 'denture':
      return (
        <svg {...common}>
          <path d="M6 14 Q6 22, 18 24 Q30 22, 30 14 Q30 12, 28 12 Q24 12, 22 14 Q18 16, 14 14 Q12 12, 8 12 Q6 12, 6 14 Z" />
        </svg>
      );
    case 'smile':
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="11" />
          <path d="M12 20 Q18 26, 24 20" />
          <circle cx="14" cy="14" r="0.8" fill="currentColor" />
          <circle cx="22" cy="14" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...lucide}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...lucide}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...lucide}>
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...lucide}>
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...lucide}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...lucide}>
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      );
    case 'pulse':
      return (
        <svg {...lucide}>
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...lucide}>
          <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...lucide}>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11h4" />
          <path d="M12 16h4" />
          <path d="M8 11h.01" />
          <path d="M8 16h.01" />
        </svg>
      );
    case 'implant':
      return (
        <svg {...common}>
          <path d="M13 12 Q13 8 18 8 Q23 8 23 12 Q23 15 21 16 L15 16 Q13 15 13 12 Z" />
          <path d="M15.5 16 L20.5 16 L19 28 Q18 30.5 17 28 Z" />
          <line x1="15.7" y1="20" x2="20.3" y2="20" />
          <line x1="16" y1="23.5" x2="20" y2="23.5" />
        </svg>
      );
    default:
      return null;
  }
}

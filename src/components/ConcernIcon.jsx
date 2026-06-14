// Hand-drawn line icons in the same minimal style as the logo. Used by the
// homepage concerns bento and the treatments list. (Extracted from the old
// Concerns section so that section could be removed without losing the icons.)
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
        <svg {...common}>
          <circle cx="18" cy="18" r="11" />
          <path d="M18 12 L18 18 L22.5 21" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="8" y="11" width="20" height="17" rx="2.5" />
          <line x1="8" y1="16" x2="28" y2="16" />
          <line x1="13" y1="8" x2="13" y2="12" />
          <line x1="23" y1="8" x2="23" y2="12" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M13 9 Q11 8 10 11 Q9 14 11 18 Q14 24 20 27 Q24 29 26 27 Q28 25 26.5 23 L23 21.5 Q22 23 21 22.5 Q17 20.5 15 16.5 Q14.5 15.5 16 15 L17 12 Q17.5 10 13 9 Z" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path d="M18 7 C13 7 9 11 9 16 C9 22 18 29 18 29 C18 29 27 22 27 16 C27 11 23 7 18 7 Z" />
          <circle cx="18" cy="15.5" r="3" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M18 7 L27 11 V17 C27 23 23 27 18 30 C13 27 9 23 9 17 V11 Z" />
          <path d="M14 18 L17 21 L23 14.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M18 28 C9 22 8 14 13.5 12 C16 11 18 13 18 15 C18 13 20 11 22.5 12 C28 14 27 22 18 28 Z" />
        </svg>
      );
    case 'pulse':
      return (
        <svg {...common}>
          <path d="M7 18 H13 L16 11 L20 25 L23 18 H29" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path d="M9 11 Q9 9 11 9 H25 Q27 9 27 11 V20 Q27 22 25 22 H16 L11 27 V22 Q9 22 9 20 Z" />
          <circle cx="14" cy="15.5" r="0.9" fill="currentColor" />
          <circle cx="18" cy="15.5" r="0.9" fill="currentColor" />
          <circle cx="22" cy="15.5" r="0.9" fill="currentColor" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="10" y="9" width="16" height="21" rx="2.5" />
          <rect x="14" y="6" width="8" height="5" rx="1.5" />
          <line x1="13.5" y1="18" x2="22.5" y2="18" />
          <line x1="13.5" y1="22" x2="22.5" y2="22" />
          <line x1="13.5" y1="26" x2="19" y2="26" />
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

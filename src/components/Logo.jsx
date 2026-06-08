import React from 'react';

// Recreation of the revised Day & Night Dental logo mark in SVG.
// Updated with thicker strokes and brighter palette to match the bolder brand.
export default function Logo({ size = 60, showText = false }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Day & Night Dental"
      >
        {/* Sun rays — left side */}
        <g stroke="#F4C24A" strokeWidth="3" strokeLinecap="round">
          <line x1="100" y1="20" x2="100" y2="36" />
          <line x1="55" y1="40" x2="65" y2="52" />
          <line x1="30" y1="75" x2="46" y2="80" />
          <line x1="25" y1="100" x2="41" y2="100" />
          <line x1="30" y1="125" x2="46" y2="120" />
          <line x1="55" y1="160" x2="65" y2="148" />
          <line x1="100" y1="180" x2="100" y2="164" />
        </g>

        {/* Sun arc — left half */}
        <path
          d="M 100 35 A 65 65 0 0 0 100 165"
          stroke="#F4C24A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Moon crescent — right side, two arcs */}
        <path
          d="M 100 35 A 65 65 0 0 1 100 165"
          stroke="#4A95E5"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 100 50 A 50 50 0 0 1 100 150"
          stroke="#4A95E5"
          strokeWidth="2.5"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
        />

        {/* Tooth — centered, split between gold and blue */}
        <g strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path
            d="M 100 78 Q 86 76, 80 88 Q 76 102, 78 118 Q 80 132, 84 138 Q 88 144, 91 134 Q 94 124, 99 121 L 100 121 Z"
            stroke="#F4C24A"
          />
          <path
            d="M 100 78 Q 114 76, 120 88 Q 124 102, 122 118 Q 120 132, 116 138 Q 112 144, 109 134 Q 106 124, 101 121 L 100 121 Z"
            stroke="#4A95E5"
          />
        </g>
      </svg>

      {showText && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            letterSpacing: '0.04em',
            fontWeight: 800,
            lineHeight: 1,
          }}>
            <span style={{ color: 'var(--dn-day)' }}>DAY</span>
            <span style={{ color: 'var(--dn-bone)', margin: '0 0.25em' }}>&</span>
            <span style={{ color: 'var(--dn-night)' }}>NIGHT</span>
          </div>
          <div style={{
            fontSize: '0.72rem',
            letterSpacing: '0.32em',
            color: 'var(--dn-bone)',
            marginTop: '0.45rem',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ width: '20px', height: '2px', background: 'var(--dn-day)' }} />
            DENTAL
            <span style={{ width: '20px', height: '2px', background: 'var(--dn-night)' }} />
          </div>
        </div>
      )}
    </div>
  );
}

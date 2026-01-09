import React from 'react';

export type IconName =
  // Core
  | 'spine'
  | 'lens'
  | 'altitude'
  | 'trace'
  | 'receipt'
  // Loop / system behavior
  | 'sense'
  | 'route'
  | 'deliver'
  | 'seal'
  | 'review'
  | 'continuity'
  | 'orchestrate'
  // Trust
  | 'consentMap'
  | 'quietHours'
  | 'escalation'
  | 'governance'
  | 'integrityLog'
  // Utility
  | 'play'
  | 'pause'
  | 'next'
  | 'back'
  | 'close'
  | 'info'
  | 'external'
  | 'chevronDown'
  // Pillars
  | 'pillarER'
  | 'pillarSR'
  | 'pillarSC'
  | 'pillarCR'
  | 'pillarII'
  | 'pillarDM';

type GlyphProps = {
  sw: number; // strokeWidth
};

export const GLYPHS: Record<IconName, (p: GlyphProps) => React.ReactNode> = {
  // =========================
  // CORE
  // =========================
  spine: ({ sw }) => (
    <>
      <path d="M12 4v16" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="17.5" r="1.6" fill="currentColor" />
      <path d="M12 6.5h6" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.55" />
      <path d="M12 12h6" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.35" />
      <path d="M12 17.5h6" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.25" />
    </>
  ),

  lens: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
      <path d="M16.8 7.2l2.2-2.2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.55" />
      <circle cx="19.2" cy="4.8" r="1" fill="currentColor" opacity="0.9" />
    </>
  ),

  altitude: ({ sw }) => (
    <>
      <path d="M5 7h14" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M7 12h12" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.75" />
      <path d="M9 17h10" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.55" />
      <circle cx="5" cy="7" r="1.4" fill="currentColor" />
    </>
  ),

  trace: ({ sw }) => (
    <>
      <path
        d="M5 16c2.6-6 6.2-2.2 8.2-6.8 1.1-2.6 3-3.2 5.8-2.2"
        stroke="currentColor"
        strokeWidth={sw}
        fill="none"
        strokeDasharray="3.2 3.2"
      />
      <circle cx="5" cy="16" r="1.4" fill="currentColor" />
      <circle cx="19" cy="7" r="1.4" fill="currentColor" opacity="0.8" />
    </>
  ),

  receipt: ({ sw }) => (
    <>
      <path
        d="M7 6.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V18l-2-1-2 1-2-1-2 1-2-1-2 1V6.5z"
        stroke="currentColor"
        strokeWidth={sw}
        fill="none"
      />
      <path d="M9.5 8.7h5" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <path d="M9.5 11.2h7" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.45" />
      <path d="M9.5 13.7h6.2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.35" />
    </>
  ),

  // =========================
  // LOOP / BEHAVIOR
  // =========================
  sense: ({ sw }) => (
    <>
      <path d="M5 14a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M7 14a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <path d="M12 14l4.6-3.6" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" />
    </>
  ),

  route: ({ sw }) => (
    <>
      <path d="M7 6v4c0 1.1.9 2 2 2h6c1.1 0 2 .9 2 2v2" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path
        d="M17 6v4c0 1.1-.9 2-2 2H9c-1.1 0-2 .9-2 2v2"
        stroke="currentColor"
        strokeWidth={sw}
        fill="none"
        opacity="0.55"
      />
      <circle cx="7" cy="6" r="1.4" fill="currentColor" />
      <circle cx="17" cy="6" r="1.4" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.75" />
      <circle cx="12" cy="18" r="1.4" fill="currentColor" />
    </>
  ),

  deliver: ({ sw }) => (
    <>
      <path d="M6 12h8" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M12 8l4 4-4 4" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M16.5 7.5h2.5v9h-2.5" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
    </>
  ),

  seal: ({ sw }) => (
    <>
      <path d="M12 4.8a7.2 7.2 0 1 1-5.1 2.1" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M6.9 6.9l-1.6-1.6" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <circle cx="18.2" cy="12" r="1.2" fill="currentColor" opacity="0.95" />
      <path d="M9 12.8l2 2 4-5.2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
    </>
  ),

  review: ({ sw }) => (
    <>
      <path d="M7.2 10.2A5.8 5.8 0 0 1 18 12a5.8 5.8 0 0 1-10.8 1.8" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M7.2 10.2l-2.2.4.4 2.2" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.8" />
    </>
  ),

  continuity: ({ sw }) => (
    <>
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" opacity="0.8" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" opacity="0.6" />
      <path d="M7.6 12h2.8" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.5" />
      <path d="M13.6 12h2.8" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.35" />
    </>
  ),

  orchestrate: ({ sw }) => (
    <>
      <path d="M12 5v14" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.4" />
      <path d="M7 9l5 3-5 3" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M17 9l-5 3 5 3" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </>
  ),

  // =========================
  // TRUST
  // =========================
  consentMap: ({ sw }) => (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M5 9h14M5 13h14M9 5v14M13 5v14" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.3" />
      <circle cx="15" cy="11" r="1.4" fill="currentColor" />
    </>
  ),

  quietHours: ({ sw }) => (
    <>
      <path d="M12 4a8 8 0 0 0 0 16 8 8 0 0 1 0-16z" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
    </>
  ),

  escalation: ({ sw }) => (
    <>
      <path d="M6 18l3-4 3 2 3-4 3 2" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M6 14h12" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.4" />
      <path d="M6 10h12" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.25" />
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
      <circle cx="18" cy="14" r="1.2" fill="currentColor" opacity="0.8" />
    </>
  ),

  governance: ({ sw }) => (
    <>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="6" cy="16" r="2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <circle cx="18" cy="16" r="2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <path d="M12 11v5M10 14l-2.5 1M14 14l2.5 1" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.5" />
    </>
  ),

  integrityLog: ({ sw }) => (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M9 8h6M9 11h6M9 14h4" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.5" />
      <circle cx="16" cy="17" r="1.2" fill="currentColor" />
    </>
  ),

  // =========================
  // UTILITY
  // =========================
  play: ({ sw }) => (
    <>
      <path d="M8 6l10 6-10 6V6z" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  pause: ({ sw }) => (
    <>
      <rect x="7" y="6" width="3" height="12" rx="1" stroke="currentColor" strokeWidth={sw} fill="none" />
      <rect x="14" y="6" width="3" height="12" rx="1" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  next: ({ sw }) => (
    <>
      <path d="M8 6l6 6-6 6" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M16 6v12" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  back: ({ sw }) => (
    <>
      <path d="M16 6l-6 6 6 6" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M8 6v12" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  close: ({ sw }) => (
    <>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  info: ({ sw }) => (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M12 16v-4" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="12" cy="8.5" r="0.8" fill="currentColor" />
    </>
  ),

  external: ({ sw }) => (
    <>
      <path d="M14 6h4v4M18 6l-8 8" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M16 14v4H6V8h4" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
    </>
  ),

  chevronDown: ({ sw }) => (
    <>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={sw} fill="none" />
    </>
  ),

  // =========================
  // PILLARS
  // =========================
  pillarER: ({ sw }) => (
    <>
      <path d="M12 4v16" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M8 8a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.7" />
      <circle cx="12" cy="17" r="1.4" fill="currentColor" />
    </>
  ),

  pillarSR: ({ sw }) => (
    <>
      <path d="M12 4v6" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M12 14v6" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M8 10a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
      <circle cx="12" cy="10" r="1.2" fill="currentColor" opacity="0.8" />
    </>
  ),

  pillarSC: ({ sw }) => (
    <>
      <path d="M12 4v16" stroke="currentColor" strokeWidth={sw} fill="none" />
      <circle cx="8" cy="12" r="1.4" fill="currentColor" opacity="0.7" />
      <circle cx="16" cy="12" r="1.4" fill="currentColor" opacity="0.7" />
      <path d="M9.4 12h5.2" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.5" />
    </>
  ),

  pillarCR: ({ sw }) => (
    <>
      <path d="M12 4v8" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M12 12l-4 4M12 12l4 4M8 16v4M16 16v4" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </>
  ),

  pillarII: ({ sw }) => (
    <>
      <path d="M12 4v16" stroke="currentColor" strokeWidth={sw} fill="none" />
      <rect x="9" y="10" width="6" height="4" rx="1" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.6" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),

  pillarDM: ({ sw }) => (
    <>
      <path d="M12 4v16" stroke="currentColor" strokeWidth={sw} fill="none" />
      <path d="M6 10a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth={sw} fill="none" opacity="0.5" />
      <circle cx="9" cy="12" r="0.8" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" opacity="0.6" />
      <circle cx="15" cy="12" r="0.8" fill="currentColor" opacity="0.8" />
    </>
  ),
};

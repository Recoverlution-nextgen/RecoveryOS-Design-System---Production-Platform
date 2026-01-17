/**
 * UNIVERSAL SECTION STYLES
 * Companion to HERO_STYLES for body sections
 * 
 * Based on:
 * - /CLEAR-GLASS-TEXT-STANDARD.md
 * - /utils/heroStyles.tsx
 * - /utils/mobileResponsive.tsx
 * 
 * Created: November 5, 2025
 */

export const SECTION_STYLES = {
  // Section Headline (Centralized + Border variants)
  headline: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(1.5rem, 6vw, 4rem)', // 24px → 64px
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  
  // Section Eyebrow
  eyebrow: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(0.6875rem, 2vw, 0.8125rem)', // 11px → 13px
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
  },
  
  // Section Subheadline
  subheadline: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)', // 16px → 20px
    lineHeight: 1.6,
    fontWeight: 500,
  },
  
  // Glass Card Headline (From CLEAR-GLASS-TEXT-STANDARD.md)
  glassHeadline: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.5rem', // 24px
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    color: '#FFFFFF',
  },
  
  // Glass Card Body Copy (From CLEAR-GLASS-TEXT-STANDARD.md)
  glassBody: {
    fontSize: '0.9375rem', // 15px
    lineHeight: 1.6,
    fontWeight: 500,
    color: '#FFFFFF',
  },
  
  // Glass Card Detail Copy
  glassDetail: {
    fontSize: '0.8125rem', // 13px
    lineHeight: 1.5,
    fontWeight: 500,
    color: '#FFFFFF',
  },
  
  // Glass Card Label (From CLEAR-GLASS-TEXT-STANDARD.md)
  glassLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.6875rem', // 11px
    letterSpacing: '0.12em',
    color: '#FFFFFF',
    opacity: 0.85,
  },
  
  // Glass Card Eyebrow
  glassEyebrow: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.625rem', // 10px
    letterSpacing: '0.12em',
    color: '#FFFFFF',
  },
  
  // Button Nav Item (Homepage sections)
  navButton: {
    padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
    borderRadius: '0px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * GLASS CARD STANDARD
 * From /CLEAR-GLASS-TEXT-STANDARD.md
 * Universal glass card styling for exhibition-grade quality
 */
export const GLASS_CARD_STANDARD = {
  // Main glass container
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0px',
    backdropFilter: 'blur(32px) saturate(180%)',
    WebkitBackdropFilter: 'blur(32px) saturate(180%)',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.5)
    `,
  },
  
  // Badge/Eyebrow container
  badge: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '0px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  
  // Narrative paragraph with left border (2nd paragraph)
  narrativeBorder: {
    borderLeft: '2px solid rgba(255, 255, 255, 0.4)',
    paddingLeft: '1rem',
  },
};

/**
 * UNIVERSAL SHADOW STANDARD
 * From /UNIVERSAL-SHADOW-STANDARD-NOV4.md
 * Exhibition-grade elevation for all large assets
 */
export const UNIVERSAL_SHADOW = '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)';

/**
 * BRAND COLORS
 * Use these instead of const BRAND = {...} in components
 */
export const BRAND_COLORS = {
  dark: '#3E2BB8',
  mid: '#5739FB',
  cyan: '#40E0D0',
  green: '#2C99AF', // TEAL - Strategic emphasis color
  purple: '#3E2BB8', // Same as dark for backwards compatibility
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  lightPurple: '#F5F3FF',
};

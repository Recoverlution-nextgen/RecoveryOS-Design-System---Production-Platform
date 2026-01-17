/**
 * UNIVERSAL HERO & FINAL CTA STYLES
 * 
 * Single source of truth for all Hero and Final CTA styling
 * Only copy and assets should differ between pages
 * 
 * Apple-Grade Typography System - Updated: November 6, 2025
 * TIER 1: HERO MOMENTS (H1 - 88px max)
 */

export const HERO_STYLES = {
  // Eyebrow styles (NO SHADOW)
  eyebrow: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.75rem', // 12px - FIXED
    letterSpacing: '0.12em',
  },
  
  // H1 Headline styles (NO SHADOW)
  headline: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(2.75rem, 7vw, 5.5rem)', // 44px → 88px - PERFECT
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
  },
  
  // Subheadline/paragraph styles (NO SHADOW) - LARGE BODY TEXT
  subheadline: {
    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', // 18px → 22px - INCREASED for emphasis
    lineHeight: 1.55,
    fontWeight: 500,
  },
  
  // CTA Button styles
  button: {
    background: 'rgba(64, 224, 208, 0.08)',
    borderRadius: '0px',
    padding: 'clamp(0.875rem, 2vw, 1rem) clamp(2rem, 4vw, 2.5rem)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    cursor: 'pointer',
  },
  
  buttonText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1rem', // 16px - INCREASED from 15px for better readability
    letterSpacing: '0.08em',
    color: '#FFFFFF',
  },
};

export const FINAL_CTA_STYLES = {
  // Eyebrow styles (NO SHADOW)
  eyebrow: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)', // 11px → 12px - TIGHTENED to match system
    letterSpacing: '0.15em',
  },
  
  // H1 Headline styles (NO SHADOW) - MATCHES HERO TIER
  headline: {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(2.75rem, 7vw, 5.5rem)', // 44px → 88px - MATCHES HERO for consistency
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
  },
  
  // Subtext/paragraph styles (NO SHADOW) - LARGE BODY TEXT
  subtext: {
    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', // 18px → 22px - MATCHES HERO subheadline
    lineHeight: 1.6,
    fontWeight: 500,
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  
  // CTA Button styles
  button: {
    background: 'rgba(64, 224, 208, 0.08)',
    borderRadius: '0px',
    padding: 'clamp(0.875rem, 2vw, 1rem) clamp(2rem, 4vw, 2.5rem)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    cursor: 'pointer',
  },
  
  buttonText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1rem', // 16px - MATCHES HERO button for consistency
    letterSpacing: '0.08em',
    color: '#FFFFFF',
  },
};

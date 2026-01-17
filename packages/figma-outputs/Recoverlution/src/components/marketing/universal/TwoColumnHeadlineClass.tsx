/**
 * TWO-COLUMN HEADLINE CLASS - UNIVERSAL COMPONENT
 * 
 * Used for exhibition-grade section headlines with two-column layout:
 * - Left/Right: Large display headline with accent word
 * - Right/Left: Descriptive tagline
 * - Center: Stacked headline + tagline (centered)
 * 
 * Used on:
 * - Science Page: "The Architecture" section
 * - Story Page: "The Insight" and "The Mission" sections
 * - Multiple other sections requiring this elegant headline pattern
 * 
 * Apple-Grade Typography System - Updated: November 6, 2025
 * TIER 2: EXHIBITION DISPLAY (H2 Large Format - 88px max)
 * 
 * Created: November 5, 2025 - Phase 6: Universal Component Consolidation
 */

import { ReactNode } from 'react';

interface TwoColumnHeadlineClassProps {
  /** Main headline text (e.g., "The Architecture", "The Insight") */
  headline: string | ReactNode;
  
  /** Word or phrase within headline to accent with color */
  headlineAccent?: string;
  
  /** Accent color for the highlighted word */
  accentColor?: string;
  
  /** Tagline/subheadline (e.g., "The infrastructure for recovery that scales") */
  tagline?: string | ReactNode;
  
  /** Layout: 'left' = headline left, tagline right; 'right' = tagline left, headline right; 'center' = stacked */
  layout?: 'left' | 'right' | 'center';
  
  /** Bottom margin (default: mb-16) */
  marginBottom?: string;
  
  /** Custom className */
  className?: string;
  
  /** Theme: 'light' (default) or 'dark' for white text on dark backgrounds */
  theme?: 'light' | 'dark';
}

export function TwoColumnHeadlineClass({
  headline,
  headlineAccent,
  accentColor = '#40E0D0',
  tagline,
  layout = 'left',
  marginBottom = 'mb-16',
  className = '',
  theme = 'light'
}: TwoColumnHeadlineClassProps) {
  
  const headlineColor = theme === 'dark' ? '#FFFFFF' : '#111827';
  const taglineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#6B7280';
  const headlineTextShadow = theme === 'dark' ? '0 2px 12px rgba(0, 0, 0, 0.3)' : 'none';
  const taglineTextShadow = theme === 'dark' ? '0 1px 4px rgba(0, 0, 0, 0.2)' : 'none';
  
  // Helper to render headline with optional accent
  const renderHeadline = () => {
    if (typeof headline === 'string' && headlineAccent && headline.includes(headlineAccent)) {
      const parts = headline.split(headlineAccent);
      return (
        <>
          {parts[0]}
          <span style={{ 
            color: accentColor,
            textShadow: `0 0 40px ${accentColor}40`
          }}>
            {headlineAccent}
          </span>
          {parts[1]}
        </>
      );
    }
    
    return headline;
  };
  
  // Center layout - title and tagline stacked
  if (layout === 'center') {
    return (
      <div className={`max-w-4xl mx-auto text-center ${marginBottom} ${className}`}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', // TIER 2: 56px → 88px (matches Hero max)
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: headlineColor,
            marginBottom: tagline ? '1.5rem' : '0',
            textShadow: headlineTextShadow
          }}
        >
          {renderHeadline()}
        </h2>
        {tagline && (
          <p 
            style={{ 
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', // LARGE: 18px → 22px (matches Hero subheadline)
              lineHeight: 1.5,
              fontWeight: 500,
              color: taglineColor,
              textShadow: taglineTextShadow
            }}
          >
            {tagline}
          </p>
        )}
      </div>
    );
  }
  
  // Left/Right layout - 2-column grid
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end ${marginBottom} ${className}`}>
      {layout === 'left' ? (
        <>
          {/* LEFT: Headline */}
          <div>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 800, 
                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', // TIER 2: 56px → 88px (matches Hero max)
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: headlineColor,
                textShadow: headlineTextShadow
              }}
            >
              {renderHeadline()}
            </h2>
          </div>
          {/* RIGHT: Tagline */}
          <div>
            {tagline && (
              <p 
                style={{ 
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', // LARGE: 18px → 22px (matches Hero subheadline)
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: taglineColor,
                  textShadow: taglineTextShadow
                }}
              >
                {tagline}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* LEFT: Tagline */}
          <div>
            {tagline && (
              <p 
                style={{ 
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', // LARGE: 18px → 22px (matches Hero subheadline)
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: taglineColor,
                  textShadow: taglineTextShadow
                }}
              >
                {tagline}
              </p>
            )}
          </div>
          {/* RIGHT: Headline */}
          <div className="lg:text-right">
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 800, 
                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', // TIER 2: 56px → 88px (matches Hero max)
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: headlineColor,
                textShadow: headlineTextShadow
              }}
            >
              {renderHeadline()}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * BORDER HEADLINE CLASS (Side Headline) - UNIVERSAL COMPONENT
 * Used on: Platform sections 3-6, Science, Story, Pricing
 * 
 * Components:
 * (a) Eyebrow
 * (b) Headline
 * (c) Subheadline
 * 
 * Features left border accent
 */

import { ReactNode } from 'react';

interface BorderHeadlineClassProps {
  eyebrow?: string;
  eyebrowColor?: string; // Default: #5739FB (purple)
  headline: string | ReactNode;
  subheadline?: string | ReactNode;
  textColor?: string; // Default: #1a1a1a
  borderColor?: string; // Default: #5739FB (purple)
  className?: string;
}

export function BorderHeadlineClass({
  eyebrow,
  eyebrowColor = '#5739FB',
  headline,
  subheadline,
  textColor = '#1a1a1a',
  borderColor = '#5739FB',
  className = '',
}: BorderHeadlineClassProps) {
  return (
    <div className={`${className}`}>
      <div 
        className="pl-6"
        style={{
          borderLeft: `4px solid ${borderColor}`,
        }}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <div 
            className="mb-3"
            style={{ color: eyebrowColor }}
          >
            <span className="text-sm tracking-[0.2em] uppercase">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Headline */}
        <h2
          className="mb-4"
          style={{
            color: textColor,
            fontSize: '40px',
            lineHeight: '1.2',
            letterSpacing: '-0.01em',
          }}
        >
          {headline}
        </h2>

        {/* Subheadline */}
        {subheadline && (
          <p
            style={{
              color: textColor,
              fontSize: '18px',
              lineHeight: '1.6',
              opacity: 0.8,
            }}
          >
            {subheadline}
          </p>
        )}
      </div>
    </div>
  );
}

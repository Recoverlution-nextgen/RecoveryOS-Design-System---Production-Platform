/**
 * INFO SECTION COMPONENT
 * infiniteK Design System
 * 
 * Replaces basic bullet points with structured, designed content blocks
 * that preserve headings, provide visual hierarchy, and add depth
 * 
 * NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 */

import { CheckCircle2 } from 'lucide-react';

interface InfoSectionProps {
  items: Array<{
    heading: string;
    points: string[];
  }>;
  variant?: 'default' | 'comparison';
}

export function InfoSection({ items, variant = 'default' }: InfoSectionProps) {
  if (variant === 'comparison') {
    return (
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-10)'
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              paddingLeft: 'var(--spacing-5)',
              borderLeft: '3px solid #5739FB',
              paddingTop: 'var(--spacing-2)',
              paddingBottom: 'var(--spacing-2)'
            }}
          >
            {/* Heading */}
            <h4 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: 1.4,
                color: '#1A1A1A',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              {item.heading}
            </h4>

            {/* Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {item.points.map((point, pointIndex) => (
                <div
                  key={pointIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-3)'
                  }}
                >
                  <CheckCircle2 
                    size={18}
                    style={{
                      color: '#5739FB',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  />
                  <span 
                    className="copy-primary"
                    style={{
                      color: '#4B5563',
                      flex: 1
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default variant: single column with clear sections
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-8)',
        marginBottom: 'var(--spacing-10)'
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            paddingLeft: 'var(--spacing-5)',
            borderLeft: '3px solid #5739FB'
          }}
        >
          {/* Heading */}
          <h4 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: 600,
              lineHeight: 1.4,
              color: '#1A1A1A',
              marginBottom: 'var(--spacing-4)'
            }}
          >
            {item.heading}
          </h4>

          {/* Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            {item.points.map((point, pointIndex) => (
              <div
                key={pointIndex}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--spacing-3)'
                }}
              >
                <CheckCircle2 
                  size={18}
                  style={{
                    color: '#5739FB',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                />
                <span 
                  className="copy-primary"
                  style={{
                    color: '#4B5563',
                    flex: 1
                  }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

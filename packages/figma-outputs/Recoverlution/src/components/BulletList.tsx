/**
 * BulletList Component - infiniteK Design System
 * 
 * A structured list component with visual hierarchy and brand styling.
 * Used for article content sections that need organized, scannable lists.
 */

import { CheckCircle } from 'lucide-react';

interface BulletListProps {
  items: string[];
  variant?: 'default' | 'checklist' | 'structured';
  className?: string;
}

export function BulletList({ items, variant = 'default', className = '' }: BulletListProps) {
  if (variant === 'checklist') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 group"
            style={{
              paddingLeft: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              flexShrink: 0,
              marginTop: '0.125rem'
            }}>
              <CheckCircle 
                size={18} 
                style={{ 
                  color: '#3E2BB8',
                  strokeWidth: 2
                }} 
              />
            </div>
            <p className="copy-primary text-gray-800 m-0" style={{ flex: 1 }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'structured') {
    return (
      <div 
        className={className}
        style={{
          background: 'linear-gradient(to right, rgba(62, 43, 184, 0.02), transparent)',
          borderLeft: '3px solid #3E2BB8',
          paddingLeft: 'var(--spacing-6)',
          paddingTop: 'var(--spacing-4)',
          paddingBottom: 'var(--spacing-4)'
        }}
      >
        <ul style={{ 
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-3)'
        }}>
          {items.map((item, index) => (
            <li 
              key={index}
              className="copy-primary text-gray-800"
              style={{
                position: 'relative',
                paddingLeft: '1.75rem'
              }}
            >
              <span style={{
                position: 'absolute',
                left: 0,
                top: '0.5rem',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3E2BB8, #5739FB)',
                boxShadow: '0 1px 3px rgba(62, 43, 184, 0.3)'
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Default variant - clean, minimal
  return (
    <ul 
      className={className}
      style={{ 
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-2)'
      }}
    >
      {items.map((item, index) => (
        <li 
          key={index}
          className="copy-primary text-gray-800"
          style={{
            position: 'relative',
            paddingLeft: '1.5rem'
          }}
        >
          <span style={{
            position: 'absolute',
            left: 0,
            color: '#3E2BB8',
            fontWeight: 600,
            fontSize: '1.1em'
          }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

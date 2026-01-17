/**
 * TAG SYSTEM — EXHIBITION-GRADE APPLE PRECISION
 * 
 * Design Philosophy:
 * - Square corners (infiniteK DNA: borderRadius 0px)
 * - Color-coded to context (inherits from parent or explicit)
 * - Subtle, sophisticated, never loud
 * - Typography honors the user's effort (no minimizing)
 * 
 * Usage:
 * <Tag>experiential learning</Tag>
 * <Tag variant="glass" accentColor="#40E0D0">Neural Rewiring</Tag>
 * <Tag size="small" variant="outlined">Premium</Tag>
 */

import React from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type TagSize = 'small' | 'medium' | 'large';
export type TagVariant = 'glass' | 'outlined' | 'filled' | 'minimal';

export interface TagProps {
  children: React.ReactNode;
  size?: TagSize;
  variant?: TagVariant;
  accentColor?: string; // Hex color for context (e.g., '#40E0D0', '#5739FB')
  className?: string;
  onClick?: () => void;
}

// ============================================================================
// SIZE SPECIFICATIONS
// ============================================================================

const sizeStyles = {
  small: {
    fontSize: '0.75rem',      // 12px
    padding: '0.25rem 0.625rem', // py-1 px-2.5
    letterSpacing: '0.01em'
  },
  medium: {
    fontSize: '0.8125rem',    // 13px
    padding: '0.375rem 0.75rem', // py-1.5 px-3
    letterSpacing: '0.01em'
  },
  large: {
    fontSize: '0.875rem',     // 14px
    padding: '0.5rem 0.875rem', // py-2 px-3.5
    letterSpacing: '0.005em'
  }
};

// ============================================================================
// VARIANT GENERATORS
// ============================================================================

const getVariantStyles = (variant: TagVariant, accentColor: string) => {
  const accent = accentColor || '#6B7280'; // Default to gray-500
  
  switch (variant) {
    case 'glass':
      return {
        background: `linear-gradient(135deg, ${accent}08, rgba(255, 255, 255, 0.4))`,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `${accent}25`,
        color: '#6B7280',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      };
    
    case 'outlined':
      return {
        background: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `${accent}30`,
        color: accent
      };
    
    case 'filled':
      return {
        background: `${accent}15`,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `${accent}25`,
        color: accent
      };
    
    case 'minimal':
      return {
        background: 'transparent',
        borderWidth: '0',
        borderStyle: 'none',
        borderColor: 'transparent',
        color: '#6B7280',
        textDecoration: 'underline',
        textDecorationColor: `${accent}40`,
        textUnderlineOffset: '2px',
        textDecorationThickness: '1px'
      };
    
    default:
      return {};
  }
};

// ============================================================================
// TAG COMPONENT
// ============================================================================

export function Tag({
  children,
  size = 'medium',
  variant = 'glass',
  accentColor = '#6B7280',
  className = '',
  onClick
}: TagProps) {
  const sizeStyle = sizeStyles[size];
  const variantStyle = getVariantStyles(variant, accentColor);
  
  const isClickable = !!onClick;
  
  return (
    <span
      onClick={onClick}
      className={`inline-block transition-all duration-200 ${isClickable ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: sizeStyle.fontSize,
        padding: sizeStyle.padding,
        letterSpacing: sizeStyle.letterSpacing,
        borderRadius: '0px', // infiniteK DNA: ALWAYS SQUARE
        whiteSpace: 'nowrap',
        ...variantStyle
      }}
    >
      {children}
    </span>
  );
}

// ============================================================================
// TAG GROUP COMPONENT — For managing multiple tags
// ============================================================================

export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function TagGroup({ children, className = '' }: TagGroupProps) {
  return (
    <div 
      className={`flex flex-wrap gap-2 ${className}`}
      style={{
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// PRESET CONTEXTS — Common accent colors
// ============================================================================

export const TAG_CONTEXTS = {
  // Story Colors (Section 2)
  science: '#40E0D0',    // Cyan
  signals: '#5739FB',    // Purple
  trust: '#FFA500',      // Orange
  
  // Brand Colors
  brand: '#3E2BB8',      // Dark purple
  brandMid: '#5739FB',   // Mid purple
  
  // Pillar Colors (from color wheel)
  journey: '#8B5CF6',    // Purple
  navigate: '#3B82F6',   // Blue
  wellbeing: '#10B981',  // Green
  toolkit: '#F59E0B',    // Amber
  state: '#EC4899',      // Pink
  momentum: '#6366F1',   // Indigo
  
  // Semantic Colors
  success: '#10B981',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  info: '#3B82F6',       // Blue
  
  // Neutral
  neutral: '#6B7280'     // Gray
};

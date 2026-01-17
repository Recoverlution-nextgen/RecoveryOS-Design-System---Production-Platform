/**
 * COMMAND CENTER LAYOUT
 * 
 * Universal layout framework for all Command Center control rooms.
 * Defines structure, style, navigation, and connection points.
 * 
 * Philosophy: Everything connects. Nothing is built in isolation.
 * 
 * Created: December 26, 2025
 * Status: Foundation for 6 Control Rooms
 * Updated: CSS Variable Migration - Dec 26, 2025
 */

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// LAYOUT PROPS
// ============================================================================

export interface CommandCenterLayoutProps {
  // Identity
  title: string;
  subtitle: string;
  icon?: string;
  
  // Navigation
  currentView: string;
  views: CommandCenterView[];
  onViewChange: (viewId: string) => void;
  onNavigate?: (page: string) => void;
  
  // Content
  children: ReactNode;
  
  // Stats (optional - shown in top right)
  stats?: {
    label: string;
    value: string | number;
    status?: 'success' | 'warning' | 'error' | 'neutral';
  }[];
  
  // Action bar (optional - shown below header)
  actions?: ReactNode;
}

export interface CommandCenterView {
  id: string;
  label: string;
  icon: string;
  badge?: string | number; // Optional badge (e.g., count, status)
}

// ============================================================================
// DESIGN TOKENS (Now using CSS variables from globals.css)
// ============================================================================

export const CC_TOKENS = {
  // Colors - Now reference CSS variables
  colors: {
    bg: {
      primary: 'var(--cc-bg-primary)',
      secondary: 'var(--cc-bg-secondary)',
      card: 'var(--cc-bg-card)',
      cardHover: 'var(--cc-bg-card-hover)',
    },
    brand: {
      primary: 'var(--cc-brand-primary)',
      secondary: 'var(--cc-brand-secondary)',
    },
    text: {
      primary: 'var(--cc-text-primary)',
      secondary: 'var(--cc-text-secondary)',
      tertiary: 'var(--cc-text-tertiary)',
    },
    border: {
      subtle: 'var(--cc-border-subtle)',
      medium: 'var(--cc-border-medium)',
      strong: 'var(--cc-border-strong)',
    },
    status: {
      success: 'var(--cc-status-success)',
      warning: 'var(--cc-status-warning)',
      error: 'var(--cc-status-error)',
      neutral: 'var(--cc-status-neutral)',
    },
  },
  
  // Spacing (matches infiniteK grid)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: '2rem',      // 32px
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '1.5rem',    // 24px
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '1.25rem',   // 20px
      lineHeight: '1.4',
    },
    body: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.5',
    },
    small: {
      fontSize: '0.75rem',   // 12px
      lineHeight: '1.5',
    },
  },
  
  // Borders (NO ROUNDED CORNERS - infiniteK rule)
  borders: {
    none: '0',
    thin: '1px solid',
    medium: '2px solid',
    thick: '3px solid',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease',
    medium: '300ms ease',
    slow: '500ms ease',
  },
};

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

export function CommandCenterLayout({
  title,
  subtitle,
  icon,
  currentView,
  views,
  onViewChange,
  onNavigate,
  children,
  stats,
  actions,
}: CommandCenterLayoutProps) {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: CC_TOKENS.colors.bg.primary,
        background: `linear-gradient(to bottom right, ${CC_TOKENS.colors.bg.primary}, ${CC_TOKENS.colors.bg.secondary}, ${CC_TOKENS.colors.bg.primary})`,
      }}
    >
      {/* HEADER */}
      <header 
        className="border-b backdrop-blur-xl"
        style={{ 
          borderColor: CC_TOKENS.colors.border.medium,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            {/* Title + Subtitle */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {icon && <span className="text-3xl">{icon}</span>}
                <h1 
                  style={{ 
                    color: CC_TOKENS.colors.text.primary,
                    fontSize: CC_TOKENS.typography.h1.fontSize,
                    lineHeight: CC_TOKENS.typography.h1.lineHeight,
                  }}
                >
                  {title}
                </h1>
              </div>
              <p 
                style={{ 
                  color: CC_TOKENS.colors.text.secondary,
                  fontSize: CC_TOKENS.typography.body.fontSize,
                }}
              >
                {subtitle}
              </p>
            </div>
            
            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex items-center gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 border"
                    style={{
                      backgroundColor: CC_TOKENS.colors.bg.card,
                      borderColor: getStatusColor(stat.status),
                    }}
                  >
                    <div 
                      style={{ 
                        color: getStatusColor(stat.status),
                        fontSize: CC_TOKENS.typography.h2.fontSize,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      style={{ 
                        color: CC_TOKENS.colors.text.tertiary,
                        fontSize: CC_TOKENS.typography.small.fontSize,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* View Selector */}
          <div className="flex flex-wrap gap-2">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className="px-4 py-2 transition-all relative"
                style={{
                  backgroundColor: currentView === view.id 
                    ? CC_TOKENS.colors.brand.primary 
                    : CC_TOKENS.colors.bg.card,
                  color: currentView === view.id 
                    ? CC_TOKENS.colors.text.primary 
                    : CC_TOKENS.colors.text.secondary,
                  fontSize: CC_TOKENS.typography.body.fontSize,
                  border: `1px solid ${currentView === view.id 
                    ? CC_TOKENS.colors.brand.secondary 
                    : CC_TOKENS.colors.border.subtle}`,
                }}
              >
                <span className="mr-2">{view.icon}</span>
                {view.label}
                {view.badge && (
                  <span 
                    className="ml-2 px-1.5 py-0.5"
                    style={{
                      backgroundColor: CC_TOKENS.colors.brand.secondary,
                      color: CC_TOKENS.colors.text.primary,
                      fontSize: CC_TOKENS.typography.small.fontSize,
                    }}
                  >
                    {view.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* Action Bar */}
          {actions && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: CC_TOKENS.colors.border.subtle }}>
              {actions}
            </div>
          )}
        </div>
      </header>
      
      {/* CONTENT */}
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// COMMON CARD COMPONENT (NO ROUNDED CORNERS)
// ============================================================================

interface CommandCenterCardProps {
  children: ReactNode;
  hover?: boolean;
  border?: 'subtle' | 'medium' | 'strong';
  className?: string;
  onClick?: () => void;
}

export function CommandCenterCard({ 
  children, 
  hover = false, 
  border = 'subtle',
  className = '',
  onClick,
}: CommandCenterCardProps) {
  return (
    <div
      className={`p-6 transition-all ${hover ? 'cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: CC_TOKENS.colors.bg.card,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: CC_TOKENS.colors.border[border],
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.backgroundColor = CC_TOKENS.colors.bg.cardHover;
          e.currentTarget.style.borderColor = CC_TOKENS.colors.border.medium;
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.backgroundColor = CC_TOKENS.colors.bg.card;
          e.currentTarget.style.borderColor = CC_TOKENS.colors.border[border];
        }
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, icon, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.h2.fontSize,
            }}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p 
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.body.fontSize,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'neutral';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span 
      className="px-2 py-1"
      style={{
        backgroundColor: `${CC_TOKENS.colors.status[status]}20`,
        color: CC_TOKENS.colors.status[status],
        fontSize: CC_TOKENS.typography.small.fontSize,
        border: `1px solid ${CC_TOKENS.colors.status[status]}40`,
      }}
    >
      {label}
    </span>
  );
}

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <CommandCenterCard>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 
          className="mb-2"
          style={{ 
            color: CC_TOKENS.colors.text.primary,
            fontSize: CC_TOKENS.typography.h3.fontSize,
          }}
        >
          {title}
        </h3>
        <p 
          className="mb-6"
          style={{ 
            color: CC_TOKENS.colors.text.secondary,
            fontSize: CC_TOKENS.typography.body.fontSize,
          }}
        >
          {description}
        </p>
        {action && <div>{action}</div>}
      </div>
    </CommandCenterCard>
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getStatusColor(status?: 'success' | 'warning' | 'error' | 'neutral'): string {
  if (!status) return CC_TOKENS.colors.brand.secondary;
  return CC_TOKENS.colors.status[status];
}
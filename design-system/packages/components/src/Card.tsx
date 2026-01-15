import React from 'react';
import { colors, spacing, borderRadius, boxShadow } from '@design-system/tokens';

interface CardProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
  shadow?: keyof typeof boxShadow;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 6,
  shadow = 'DEFAULT',
  className = '',
  onClick,
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'white',
        borderRadius: borderRadius.lg,
        padding: spacing[padding],
        boxShadow: boxShadow[shadow],
        border: `1px solid ${colors.neutral[200]}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = boxShadow.lg;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = boxShadow[shadow];
        }
      }}
    >
      {children}
    </div>
  );
};
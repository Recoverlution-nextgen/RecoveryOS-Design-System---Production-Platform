import React from 'react';
import { colors } from '@design-system/tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
}) => {
  const baseStyles: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary[500],
      color: 'white',
    },
    secondary: {
      backgroundColor: colors.neutral[50],
      color: colors.neutral[900],
      border: `1px solid ${colors.neutral[500]}`,
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
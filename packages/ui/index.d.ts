import * as React from 'react';

export interface PlaceholderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Placeholder: React.FC<PlaceholderProps>;
export const Button: React.FC<ButtonProps>;

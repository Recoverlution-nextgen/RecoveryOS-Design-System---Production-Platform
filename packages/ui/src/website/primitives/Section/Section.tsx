import React from 'react';
import './Section.css';

export interface SectionProps {
  variant?: 'default' | 'hero' | 'feature' | 'dark' | 'ambient';
  ambient?: boolean;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({
  variant = 'default',
  ambient = false,
  children,
  id,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`ro-section ro-section--${variant} ${ambient ? 'ro-section--ambient' : ''} ${className}`}
      data-variant={variant}
    >
      {children}
    </section>
  );
}

import React from 'react';
import './Grid.css';

export interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Grid({
  columns = 2,
  gap = 'md',
  responsive = true,
  children,
  className = '',
}: GridProps) {
  return (
    <div
      className={`ro-grid ro-grid--${columns}col ro-grid--gap-${gap} ${responsive ? 'ro-grid--responsive' : ''} ${className}`}
      data-columns={columns}
    >
      {children}
    </div>
  );
}

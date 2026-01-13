import React from 'react';
import './Container.css';

export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  className?: string;
}

export function Container({ size = 'lg', children, className = '' }: ContainerProps) {
  return <div className={`ro-container ro-container--${size} ${className}`}>{children}</div>;
}

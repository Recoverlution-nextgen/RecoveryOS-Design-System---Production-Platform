import React from 'react';
import './ThreadLine.css';

export interface ThreadLineProps {
  variant?: 'default' | 'pulse' | 'dim';
  animated?: boolean;
  className?: string;
}

export function ThreadLine({ variant = 'default', animated = true, className = '' }: ThreadLineProps) {
  return (
    <svg
      className={`ro-thread-line ro-thread-line--${variant} ${animated ? 'ro-thread-line--animated' : ''} ${className}`}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--thread-line)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--thread-pulse)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--thread-line)" stopOpacity="0" />
        </linearGradient>
        
        <filter id="thread-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main thread line with curve */}
      <path
        className="ro-thread-line__path"
        d="M 50 300 Q 200 250, 400 300 T 750 300"
        stroke="url(#thread-gradient)"
        strokeWidth="2"
        filter="url(#thread-glow)"
      />
      
      {/* Pulse indicator (optional animated dot) */}
      {animated && (
        <circle className="ro-thread-line__pulse" cx="400" cy="300" r="4" fill="var(--thread-pulse)" />
      )}
    </svg>
  );
}

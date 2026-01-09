import React from 'react';
import './SealPulse.css';

export interface SealPulseProps {
  variant?: 'default' | 'active' | 'sealed';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function SealPulse({ variant = 'default', size = 'md', animated = true, className = '' }: SealPulseProps) {
  return (
    <svg
      className={`ro-seal-pulse ro-seal-pulse--${variant} ro-seal-pulse--${size} ${animated ? 'ro-seal-pulse--animated' : ''} ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="seal-gradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--trace-seal)" stopOpacity="0.8" />
          <stop offset="70%" stopColor="var(--trace-seal)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--trace-seal)" stopOpacity="0" />
        </radialGradient>
        
        <filter id="seal-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer pulse ring */}
      <circle
        className="ro-seal-pulse__outer"
        cx="60"
        cy="60"
        r="50"
        stroke="var(--trace-seal)"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
      
      {/* Middle pulse ring */}
      <circle
        className="ro-seal-pulse__middle"
        cx="60"
        cy="60"
        r="35"
        stroke="var(--trace-seal)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      
      {/* Inner seal core */}
      <circle
        className="ro-seal-pulse__core"
        cx="60"
        cy="60"
        r="20"
        fill="url(#seal-gradient)"
        filter="url(#seal-glow)"
      />
      
      {/* Center mark (checkmark for sealed state) */}
      {variant === 'sealed' && (
        <path
          className="ro-seal-pulse__check"
          d="M 50 60 L 57 67 L 70 50"
          stroke="var(--trace-seal)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </svg>
  );
}

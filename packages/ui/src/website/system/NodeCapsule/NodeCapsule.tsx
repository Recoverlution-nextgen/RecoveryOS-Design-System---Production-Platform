import React from 'react';
import './NodeCapsule.css';

export interface NodeCapsuleProps {
  variant?: 'default' | 'active' | 'complete';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function NodeCapsule({
  variant = 'default',
  size = 'md',
  label,
  className = '',
  children
}: NodeCapsuleProps) {
  return (
    <div className={`ro-node-capsule ro-node-capsule--${variant} ro-node-capsule--${size} ${className}`}>
      <div className="ro-node-capsule__border" />
      <div className="ro-node-capsule__content">
        {label && <span className="ro-node-capsule__label">{label}</span>}
        {children}
      </div>
    </div>
  );
}

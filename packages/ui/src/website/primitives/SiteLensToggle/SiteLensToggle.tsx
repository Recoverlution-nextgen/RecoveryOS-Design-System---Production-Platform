import React from 'react';
import './SiteLensToggle.css';

export type Lens = 'individual' | 'professional' | 'organisation';

export interface SiteLensToggleProps {
  value: Lens;
  onChange: (lens: Lens) => void;
  variant?: 'chrome' | 'inline' | 'hero';
  className?: string;
}

const LENS_OPTIONS: Array<{ id: Lens; label: string; short: string }> = [
  { id: 'individual', label: 'Individual', short: 'Me' },
  { id: 'professional', label: 'Professional', short: 'Care' },
  { id: 'organisation', label: 'Organisation', short: 'System' },
];

export function SiteLensToggle({ value, onChange, variant = 'chrome', className = '' }: SiteLensToggleProps) {
  return (
    <div className={`ro-site-lens ro-site-lens--${variant} ${className}`} role="group" aria-label="Lens selector">
      {LENS_OPTIONS.map((lens) => (
        <button
          key={lens.id}
          type="button"
          className={`ro-site-lens__btn ${value === lens.id ? 'ro-site-lens__btn--active' : ''}`}
          onClick={() => onChange(lens.id)}
          aria-pressed={value === lens.id}
          data-lens={lens.id}
        >
          <span className="ro-site-lens__label">{lens.label}</span>
          <span className="ro-site-lens__short">{lens.short}</span>
        </button>
      ))}
      <div
        className="ro-site-lens__indicator"
        data-active={value}
        style={{
          '--lens-index': LENS_OPTIONS.findIndex((l) => l.id === value),
        } as React.CSSProperties}
      />
    </div>
  );
}

import React from 'react';
import './CTACluster.css';

export interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CTAClusterProps {
  primary: CTAButton;
  secondary?: CTAButton;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function CTACluster({ primary, secondary, align = 'center', className = '' }: CTAClusterProps) {
  const renderButton = (button: CTAButton, variant: 'primary' | 'secondary') => {
    const classes = `ro-cta-btn ro-cta-btn--${variant}`;
    
    if (button.href) {
      return (
        <a href={button.href} className={classes}>
          {button.label}
        </a>
      );
    }
    
    return (
      <button type="button" onClick={button.onClick} className={classes}>
        {button.label}
      </button>
    );
  };

  return (
    <div className={`ro-cta-cluster ro-cta-cluster--${align} ${className}`}>
      {renderButton(primary, 'primary')}
      {secondary && renderButton(secondary, 'secondary')}
    </div>
  );
}

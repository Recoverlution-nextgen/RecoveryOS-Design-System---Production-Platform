import { ReactNode } from 'react';

interface SubheadProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Subhead({ 
  children, 
  className = '',
  align = 'center'
}: SubheadProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <p 
      className={`
        text-xl md:text-2xl
        text-white/70
        font-medium
        leading-relaxed
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </p>
  );
}

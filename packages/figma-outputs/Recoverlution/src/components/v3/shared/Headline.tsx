import { ReactNode } from 'react';

interface HeadlineProps {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Headline({ 
  children, 
  level = 1, 
  className = '',
  align = 'center'
}: HeadlineProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseClasses = 'font-display font-bold text-white';
  
  const sizeClasses = {
    1: 'text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight',
    2: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
    3: 'text-3xl md:text-4xl lg:text-5xl leading-snug'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <Component 
      className={`
        ${baseClasses}
        ${sizeClasses[level]}
        ${alignClasses[align]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

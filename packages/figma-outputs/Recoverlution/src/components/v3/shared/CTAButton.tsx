import { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CTAButton({ 
  children, 
  href, 
  variant = 'primary',
  size = 'md',
  className = ''
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white hover:opacity-90 hover:scale-105',
    secondary: 'bg-white text-[#3E2BB8] hover:bg-white/90 hover:scale-105',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-[#3E2BB8]'
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  // Convert href to hash route if it doesn't already start with #
  const finalHref = href.startsWith('#') ? href : `#${href}`;

  return (
    <a
      href={finalHref}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </a>
  );
}

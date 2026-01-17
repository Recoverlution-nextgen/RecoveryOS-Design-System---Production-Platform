import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: 'dark' | 'darker' | 'gradient' | 'transparent';
  id?: string;
}

export function SectionWrapper({ 
  children, 
  className = '', 
  background = 'transparent',
  id 
}: SectionWrapperProps) {
  const bgClasses = {
    dark: 'bg-[#0A0B0F]',
    darker: 'bg-black',
    gradient: 'bg-gradient-to-b from-[#0A0B0F] to-[#1A1B2E]',
    transparent: 'bg-transparent'
  };

  return (
    <section 
      id={id}
      className={`
        py-32 px-6
        md:px-12
        ${bgClasses[background]}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

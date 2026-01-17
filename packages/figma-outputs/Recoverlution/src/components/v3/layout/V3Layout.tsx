import { ReactNode } from 'react';
import { V3Header } from './V3Header';
import { V3Footer } from './V3Footer';

interface V3LayoutProps {
  children: ReactNode;
}

export function V3Layout({ children }: V3LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <V3Header />
      <main className="pt-16">
        {children}
      </main>
      <V3Footer />
    </div>
  );
}

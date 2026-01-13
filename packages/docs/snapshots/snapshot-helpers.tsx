import React from 'react';

export function parseLens(lens: string | string[]): string {
  return Array.isArray(lens) ? lens[0] : lens;
}

export function parseBand(band: string | string[]): string {
  return Array.isArray(band) ? band[0] : band;
}

export function Center({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      {children}
    </div>
  );
}

export function useAutoFocus(selector: string, enabled: boolean = true) {
  React.useEffect(() => {
    if (!enabled) return;

    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, [selector, enabled]);
}

export function AutoFocus({ selector, enabled = true, children }: {
  selector: string;
  enabled?: boolean;
  children: React.ReactNode;
}) {
  useAutoFocus(selector, enabled);
  return <>{children}</>;
}
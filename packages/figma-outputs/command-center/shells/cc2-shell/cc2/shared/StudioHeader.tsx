/**
 * STUDIO HEADER - Universal Header Component
 * Used by ALL CC2 studios for consistent navigation
 * Same, Same But Different: Desktop/Mobile responsive
 */

import { ArrowLeft, X } from 'lucide-react';

interface StudioHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose?: () => void;
  actions?: React.ReactNode;
}

export function StudioHeader({ title, subtitle, onBack, onClose, actions }: StudioHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#0A0B0F]/80 backdrop-blur-xl border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back/Close button + Title */}
          <div className="flex items-center gap-4">
            {(onBack || onClose) && (
              <button
                onClick={onBack || onClose}
                className="p-2 hover:bg-white/5 transition-colors"
                aria-label={onBack ? "Go back" : "Close"}
              >
                {onBack ? (
                  <ArrowLeft className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
            )}
            
            <div>
              <h1 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm opacity-70 mt-1" style={{ fontFamily: 'var(--font-sans)' }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

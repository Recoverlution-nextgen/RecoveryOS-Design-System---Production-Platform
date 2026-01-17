/**
 * CC2 NAVIGATION
 * Mode selector + breadcrumbs + back button
 */

import { ArrowLeft, Home, Wrench, Shield, Zap, BarChart, FlaskConical } from 'lucide-react';

type CC2Mode = 'home' | 'build' | 'govern' | 'simulate' | 'prove' | 'playground';

interface CC2NavProps {
  currentMode: CC2Mode;
  activeStudio: string | null;
  onModeChange: (mode: CC2Mode) => void;
  onBack?: () => void;
  onNavigate: (page: string) => void;
}

export function CC2Nav({ currentMode, activeStudio, onModeChange, onBack, onNavigate }: CC2NavProps) {
  const modes: { key: CC2Mode; label: string; icon: any; color: string }[] = [
    { key: 'home', label: 'Home', icon: Home, color: '#3E2BB8' },
    { key: 'build', label: 'Build', icon: Wrench, color: '#10b981' },
    { key: 'govern', label: 'Govern', icon: Shield, color: '#f59e0b' },
    { key: 'simulate', label: 'Simulate', icon: Zap, color: '#8b5cf6' },
    { key: 'prove', label: 'Prove', icon: BarChart, color: '#06b6d4' },
    { key: 'playground', label: 'Playground', icon: FlaskConical, color: '#40E0D0' },
  ];

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Breadcrumb */}
          <div className="flex items-center gap-6">
            {onBack && activeStudio && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]" />
              <div>
                <h1 className="font-bold text-white">Command Center 2</h1>
                {activeStudio && (
                  <p className="text-xs text-zinc-500">{activeStudio.replace(/[-_]/g, ' ').toUpperCase()}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Mode Tabs */}
          {!activeStudio && (
            <div className="flex gap-1">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.key;
                return (
                  <button
                    key={mode.key}
                    onClick={() => onModeChange(mode.key)}
                    className={`
                      px-4 py-2 flex items-center gap-2 transition-all text-sm
                      ${isActive
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? mode.color : undefined }} />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
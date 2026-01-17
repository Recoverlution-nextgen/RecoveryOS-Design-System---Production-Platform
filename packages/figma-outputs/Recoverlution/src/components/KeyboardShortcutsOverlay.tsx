/**
 * Keyboard Shortcuts Overlay
 * 
 * Shows helpful keyboard shortcuts throughout the platform.
 * Activated with `?` key or from settings.
 * 
 * infiniteK Design: Square overlays, clean typography
 */

import { useState, useEffect } from "react";
import { X, Command, Navigation, Sparkles, Heart, Activity, BookOpen, Users, TrendingUp, Search } from "lucide-react";

interface KeyboardShortcut {
  keys: string[];
  description: string;
  category: "navigation" | "actions" | "general";
}

const SHORTCUTS: KeyboardShortcut[] = [
  // Navigation
  { keys: ["G", "D"], description: "Go to Dashboard", category: "navigation" },
  { keys: ["G", "J"], description: "Go to Journey", category: "navigation" },
  { keys: ["G", "N"], description: "Go to Navicues", category: "navigation" },
  { keys: ["G", "S"], description: "Go to State", category: "navigation" },
  { keys: ["G", "W"], description: "Go to Wellbeing", category: "navigation" },
  { keys: ["G", "T"], description: "Go to Toolkit", category: "navigation" },
  { keys: ["G", "V"], description: "Go to Navigate", category: "navigation" },
  { keys: ["G", "M"], description: "Go to Momentum", category: "navigation" },
  
  // Actions
  { keys: ["/"], description: "Search", category: "actions" },
  { keys: ["?"], description: "Show keyboard shortcuts", category: "actions" },
  { keys: ["Esc"], description: "Close overlay/modal", category: "actions" },
  
  // General
  { keys: ["←", "→"], description: "Navigate between items", category: "general" },
  { keys: ["Space"], description: "Play/Pause video", category: "general" },
];

export function KeyboardShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with ?
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const navShortcuts = SHORTCUTS.filter(s => s.category === "navigation");
  const actionShortcuts = SHORTCUTS.filter(s => s.category === "actions");
  const generalShortcuts = SHORTCUTS.filter(s => s.category === "general");

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl"
        style={{ borderRadius: '0px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 bg-white/20 flex items-center justify-center"
              style={{ borderRadius: '0px' }}
            >
              <Command className="w-6 h-6" />
            </div>
            <h2 
              className="text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
            >
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 transition-all"
            style={{ borderRadius: '0px' }}
            aria-label="Close shortcuts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Navigation Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5 text-[#3E2BB8]" />
              <h3 
                className="text-gray-900"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
              >
                Navigation
              </h3>
            </div>
            <div className="space-y-3">
              {navShortcuts.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#FAFAFA] hover:bg-[#F5F3FF] transition-all"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-gray-700"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                  >
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={i}>
                        <kbd 
                          className="px-2 py-1 bg-white text-gray-800 border border-gray-300 shadow-sm"
                          style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.75rem',
                            borderRadius: '0px'
                          }}
                        >
                          {key}
                        </kbd>
                        {i < shortcut.keys.length - 1 && (
                          <span className="mx-1 text-gray-400">then</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#3E2BB8]" />
              <h3 
                className="text-gray-900"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
              >
                Actions
              </h3>
            </div>
            <div className="space-y-3">
              {actionShortcuts.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#FAFAFA] hover:bg-[#F5F3FF] transition-all"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-gray-700"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                  >
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd 
                        key={i}
                        className="px-2 py-1 bg-white text-gray-800 border border-gray-300 shadow-sm"
                        style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.75rem',
                          borderRadius: '0px'
                        }}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* General Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#3E2BB8]" />
              <h3 
                className="text-gray-900"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
              >
                General
              </h3>
            </div>
            <div className="space-y-3">
              {generalShortcuts.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#FAFAFA] hover:bg-[#F5F3FF] transition-all"
                  style={{ borderRadius: '0px' }}
                >
                  <span 
                    className="text-gray-700"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                  >
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd 
                        key={i}
                        className="px-2 py-1 bg-white text-gray-800 border border-gray-300 shadow-sm"
                        style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.75rem',
                          borderRadius: '0px'
                        }}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tip */}
          <div 
            className="bg-[#F5F3FF] p-6 border-l-4"
            style={{ borderRadius: '0px', borderColor: '#3E2BB8' }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 bg-[#3E2BB8]/10 flex items-center justify-center flex-shrink-0"
                style={{ borderRadius: '0px' }}
              >
                <Sparkles className="w-4 h-4 text-[#3E2BB8]" />
              </div>
              <div>
                <h4 
                  className="text-gray-900 mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
                >
                  Pro Tip
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 mx-1" style={{ borderRadius: '0px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>?</kbd> anytime to see these shortcuts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

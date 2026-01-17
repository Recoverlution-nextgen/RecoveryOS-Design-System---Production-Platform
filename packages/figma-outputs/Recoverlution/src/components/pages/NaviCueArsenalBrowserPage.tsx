/**
 * NAVICUE ARSENAL BROWSER PAGE
 * Full visual explorer for all 74 NaviCues
 */

import React from 'react';
import NaviCueArsenalBrowser from '../navicues/NaviCueArsenalBrowser';

interface NaviCueArsenalBrowserPageProps {
  onNavigate?: (page: string) => void;
}

export function NaviCueArsenalBrowserPage({ onNavigate }: NaviCueArsenalBrowserPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {onNavigate && (
        <div className="p-6 border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
          <button
            onClick={() => onNavigate('navicue-arsenal')}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to NaviCue Arsenal
          </button>
        </div>
      )}
      <NaviCueArsenalBrowser />
    </div>
  );
}

export default NaviCueArsenalBrowserPage;

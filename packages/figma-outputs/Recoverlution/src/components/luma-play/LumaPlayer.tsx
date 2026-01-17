/**
 * LUMA PLAYER - Universal Floating Player
 * Apple Music pattern: collapsed bar + full-screen expanded view
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PlayerCollapsed } from './PlayerCollapsed';
import { PlayerExpanded } from './PlayerExpanded';

export function LumaPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Fixed player bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[10000] pointer-events-none">
        <div className="mx-4 mb-4 pointer-events-auto">
          <PlayerCollapsed onExpand={() => setIsExpanded(true)} />
        </div>
      </div>

      {/* Expanded full-screen player */}
      <AnimatePresence>
        {isExpanded && (
          <PlayerExpanded onCollapse={() => setIsExpanded(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

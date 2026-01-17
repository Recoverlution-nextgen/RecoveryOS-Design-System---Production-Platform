/**
 * CC2PAGE - COMMAND CENTER 2 (FULL SYSTEM)
 * The complete control plane for Recoverlution OS
 * 
 * Four Modes: BUILD · GOVERN · SIMULATE · PROVE
 * Full integration with registry, telemetry, events, proofs
 */

import { useState } from 'react';
import { CC2Layout } from '../cc2/CC2Layout';

export function CC2Page({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <CC2Layout onNavigate={onNavigate} />
  );
}

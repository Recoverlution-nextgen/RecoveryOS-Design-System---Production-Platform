import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * NAVICUE MASTER INDEX
 * Central hub for all NaviCue batches
 * 200+ NaviCues organized in 20 batches
 */

interface NaviCueMasterIndexProps {
  onNavigate?: (page: string) => void;
}

interface BatchInfo {
  id: number;
  name: string;
  theme: string;
  count: number;
  status: 'live' | 'building' | 'planned';
  route?: string;
}

export function NaviCueMasterIndex({ onNavigate }: NaviCueMasterIndexProps) {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const batches: BatchInfo[] = [
    { id: 1, name: 'Basic Interactions', theme: 'Tap, hold, choose, feel', count: 10, status: 'live', route: 'navicue-batch-1-viewer' },
    { id: 2, name: 'Time Paradoxes', theme: 'Now, then, when, never', count: 10, status: 'live', route: 'navicue-batch-2-viewer' },
    { id: 3, name: 'Color & Emotion', theme: 'Hue, intensity, visibility', count: 10, status: 'live', route: 'navicue-batch-3-viewer' },
    { id: 4, name: 'Rhythm & Sound', theme: 'Pulse, beat, silence, voice', count: 10, status: 'live', route: 'navicue-batch-4-viewer' },
    { id: 5, name: 'Body Awareness', theme: 'Weight, space, tension, breath', count: 10, status: 'live', route: 'navicue-batch-5-viewer' },
    { id: 6, name: 'Contradiction & Paradox', theme: 'Both, neither, inverse, loop', count: 10, status: 'live', route: 'navicue-batch-6-viewer' },
    { id: 7, name: 'Memory & Forgetting', theme: 'Remember, fade, rewrite, clarity', count: 10, status: 'live', route: 'navicue-batch-7-viewer' },
    { id: 8, name: 'Speed & Slowness', theme: 'Fast, slow, pause, tempo', count: 10, status: 'live', route: 'navicue-batch-8-viewer' },
    { id: 9, name: 'Empty Space & Nothing', theme: 'Void, absence, gap, nothing', count: 10, status: 'live', route: 'navicue-batch-9-viewer' },
    { id: 10, name: 'Relationships', theme: 'Connection, distance, mirror, threads', count: 10, status: 'live', route: 'navicue-batch-10-viewer' },
    { id: 11, name: 'Identity Fragments', theme: 'Self, essence, dissolve, who?', count: 10, status: 'live', route: 'navicue-batch-11-viewer' },
    { id: 12, name: 'Choice Without Meaning', theme: 'A/B, yes/no, more/less, random', count: 10, status: 'live', route: 'navicue-batch-12-viewer' },
    { id: 13, name: 'Pattern Breaking', theme: 'Interrupt, shatter, unexpected', count: 10, status: 'live', route: 'navicue-batch-13-viewer' },
    { id: 14, name: 'Surrender Mechanics', theme: 'Release, allow, flow, let go', count: 10, status: 'live', route: 'navicue-batch-14-viewer' },
    { id: 15, name: 'Mirror & Reflection', theme: 'See, reflect, project, shadow', count: 10, status: 'live', route: 'navicue-batch-15-viewer' },
    { id: 16, name: 'Edge Cases & Extremes', theme: 'Maximum, minimum, beyond, absolute', count: 10, status: 'live', route: 'navicue-batch-16-viewer' },
    { id: 17, name: 'Recursive & Meta', theme: 'Loop, self-reference, infinite', count: 10, status: 'live', route: 'navicue-batch-17-viewer' },
    { id: 18, name: 'Sensory', theme: 'Taste, texture, smell, feel, sense', count: 10, status: 'live', route: 'navicue-batch-18-viewer' },
    { id: 19, name: 'Quantum & Uncertainty', theme: 'Both/and, superposition, collapse', count: 10, status: 'live', route: 'navicue-batch-19-viewer' },
    { id: 20, name: 'Void & Absence', theme: 'Missing, lack, negative, anti', count: 10, status: 'live', route: 'navicue-batch-20-viewer' },
  ];

  const liveBatches = batches.filter(b => b.status === 'live');
  const plannedBatches = batches.filter(b => b.status === 'planned');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#5739FB';
      case 'building': return '#7B68EE';
      case 'planned': return 'rgba(87, 57, 251, 0.3)';
      default: return 'rgba(87, 57, 251, 0.1)';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-6">
          <button
            onClick={() => onNavigate?.('navicue-arsenal')}
            className="mb-4 text-sm px-4 py-2"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            ← Back to Arsenal
          </button>

          <h1 className="text-4xl mb-2" style={{ color: '#FFFFFF' }}>
            NaviCue Master Index
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            200 NaviCues across 20 experimental batches
          </p>

          {/* Stats */}
          <div className="mt-6 flex gap-6">
            <div className="px-6 py-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-2xl" style={{ color: '#5739FB' }}>200</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Live NaviCues</div>
            </div>
            <div className="px-6 py-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-2xl" style={{ color: '#5739FB' }}>20</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Batches deployed</div>
            </div>
            <div className="px-6 py-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-2xl" style={{ color: '#5739FB' }}>∞</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Possibilities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Live Batches */}
        <div>
          <h2 className="text-2xl mb-6" style={{ color: '#FFFFFF' }}>
            Live Batches (Ready to experience)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {liveBatches.map((batch) => (
              <motion.button
                key={batch.id}
                onClick={() => batch.route && onNavigate?.(batch.route)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 text-left transition-all duration-200"
                style={{
                  backgroundColor: selectedBatch === batch.id ? 'rgba(87, 57, 251, 0.3)' : 'rgba(87, 57, 251, 0.1)',
                  border: `2px solid ${selectedBatch === batch.id ? '#5739FB' : 'rgba(87, 57, 251, 0.3)'}`,
                }}
                onMouseEnter={() => setSelectedBatch(batch.id)}
                onMouseLeave={() => setSelectedBatch(null)}
              >
                {/* Batch number */}
                <div className="text-4xl mb-3" style={{ color: '#5739FB' }}>
                  {batch.id}
                </div>

                {/* Batch name */}
                <div className="text-sm mb-2" style={{ color: '#FFFFFF' }}>
                  {batch.name}
                </div>

                {/* Theme */}
                <div className="text-xs mb-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {batch.theme}
                </div>

                {/* Count */}
                <div className="text-xs px-2 py-1 inline-block" style={{
                  backgroundColor: getStatusColor(batch.status),
                  color: '#FFFFFF',
                }}>
                  {batch.count} NaviCues
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Planned Batches */}
        <div>
          <h2 className="text-2xl mb-6" style={{ color: '#FFFFFF' }}>
            Planned Batches (Coming soon)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 opacity-50">
            {plannedBatches.map((batch) => (
              <div
                key={batch.id}
                className="p-6 text-left"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.05)',
                  border: '1px solid rgba(87, 57, 251, 0.2)',
                }}
              >
                {/* Batch number */}
                <div className="text-4xl mb-3" style={{ color: 'rgba(87, 57, 251, 0.5)' }}>
                  {batch.id}
                </div>

                {/* Batch name */}
                <div className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {batch.name}
                </div>

                {/* Theme */}
                <div className="text-xs mb-3" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {batch.theme}
                </div>

                {/* Count */}
                <div className="text-xs px-2 py-1 inline-block" style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  {batch.count} planned
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-8 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
          <p className="text-lg mb-2" style={{ color: '#FFFFFF' }}>
            Each batch explores a different dimension of experience
          </p>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            No explanations. No hand-holding. Pure micro-moments of attention capture.
          </p>
        </div>
      </div>
    </div>
  );
}
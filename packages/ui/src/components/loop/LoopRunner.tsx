/**
 * LoopRunner — Demonstrate OS loop without teaching it
 * 
 * Story Job: Show Sense → Route → Deliver → Seal as felt experience
 * 
 * Maps to: The OS runs as a loop (Sense → Route → Deliver → Seal)
 * 
 * Flow:
 * 1. Sense (120ms) — Input signals fade in
 * 2. Route (300ms) — Conductor animation shows "why this move"
 * 3. Deliver (variable) — Move executes (breath, orient, etc.)
 * 4. Seal (600ms) — Receipt forge → TraceTile appears
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject, TraceObjectProps } from '../trace/TraceObject';
import './LoopRunner.css';

export interface LoopConfig {
  intent: 'anchor' | 'clarity' | 'connection' | 'direction';
  duration: 10 | 30 | 120; // seconds
  tempo: 'moment' | 'week';
  depth: 'glance' | 'seed' | 'thread' | 'journey';
}

export interface LoopRunnerProps {
  config: LoopConfig;
  lens?: 'individual' | 'professional' | 'organisation';
  onReceiptCreate?: (trace: TraceObjectProps) => void;
  onComplete?: () => void;
}

type LoopPhase = 'sensing' | 'routing' | 'delivering' | 'sealing' | 'sealed';

export const LoopRunner: React.FC<LoopRunnerProps> = ({
  config,
  lens = 'individual',
  onReceiptCreate,
  onComplete,
}) => {
  const [phase, setPhase] = useState<LoopPhase>('sensing');
  const [progress, setProgress] = useState(0);
  const [generatedTrace, setGeneratedTrace] = useState<TraceObjectProps | null>(null);

  // Phase timing
  const phaseDurations = {
    sensing: 120,
    routing: 300,
    delivering: config.duration * 1000,
    sealing: 600,
    sealed: 0,
  };

  // Start loop sequence
  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Sensing
      await wait(phaseDurations.sensing);
      setPhase('routing');

      // Phase 2: Routing
      await wait(phaseDurations.routing);
      setPhase('delivering');

      // Phase 3: Delivering (with progress)
      await waitWithProgress(phaseDurations.delivering, (p) => setProgress(p));
      setPhase('sealing');

      // Phase 4: Sealing
      await wait(phaseDurations.sealing);
      
      // Generate trace
      const trace = generateTrace(config, lens);
      setGeneratedTrace(trace);
      onReceiptCreate?.(trace);
      
      setPhase('sealed');
      
      await wait(1000);
      onComplete?.();
    };

    sequence();
  }, []);

  return (
    <div className={`loop-runner loop-runner--${lens}`}>
      {/* 4-beat ring (subtle, peripheral) */}
      <div className="loop-runner__ring">
        <motion.div
          className={`loop-runner__beat loop-runner__beat--sense ${phase === 'sensing' ? 'loop-runner__beat--active' : ''}`}
          animate={{ opacity: phase === 'sensing' ? 1 : 0.3 }}
        >
          <span className="loop-runner__beat-label">Sense</span>
        </motion.div>
        <motion.div
          className={`loop-runner__beat loop-runner__beat--route ${phase === 'routing' ? 'loop-runner__beat--active' : ''}`}
          animate={{ opacity: phase === 'routing' ? 1 : 0.3 }}
        >
          <span className="loop-runner__beat-label">Route</span>
        </motion.div>
        <motion.div
          className={`loop-runner__beat loop-runner__beat--deliver ${phase === 'delivering' ? 'loop-runner__beat--active' : ''}`}
          animate={{ opacity: phase === 'delivering' ? 1 : 0.3 }}
        >
          <span className="loop-runner__beat-label">Deliver</span>
        </motion.div>
        <motion.div
          className={`loop-runner__beat loop-runner__beat--seal ${phase === 'sealing' || phase === 'sealed' ? 'loop-runner__beat--active' : ''}`}
          animate={{ opacity: phase === 'sealing' || phase === 'sealed' ? 1 : 0.3 }}
        >
          <span className="loop-runner__beat-label">Seal</span>
        </motion.div>
      </div>

      {/* Center: Move execution */}
      <div className="loop-runner__center">
        <AnimatePresence mode="wait">
          {phase === 'sensing' && (
            <motion.div
              key="sensing"
              className="loop-runner__phase loop-runner__phase--sensing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.12 }}
            >
              <div className="loop-runner__icon">👁️</div>
              <p className="loop-runner__status">
                {lens === 'individual' && 'Noticing...'}
                {lens === 'professional' && 'Sensing state...'}
                {lens === 'organisation' && 'Signal acquisition...'}
              </p>
            </motion.div>
          )}

          {phase === 'routing' && (
            <motion.div
              key="routing"
              className="loop-runner__phase loop-runner__phase--routing"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="loop-runner__icon">🧭</div>
              <p className="loop-runner__status">
                {lens === 'individual' && 'Finding what helps...'}
                {lens === 'professional' && 'Routing intervention...'}
                {lens === 'organisation' && 'Protocol selection...'}
              </p>
              <div className="loop-runner__contract">
                <span className="loop-runner__contract-label">
                  {getIntentLabel(config.intent, lens)}
                </span>
                <span className="loop-runner__contract-duration">
                  {config.duration < 60 ? `${config.duration}s` : `${Math.floor(config.duration / 60)}m`}
                </span>
              </div>
            </motion.div>
          )}

          {phase === 'delivering' && (
            <motion.div
              key="delivering"
              className="loop-runner__phase loop-runner__phase--delivering"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="loop-runner__player">
                <motion.div
                  className="loop-runner__breath-circle"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <p className="loop-runner__move-label">
                  {getMoveLabel(config.intent, lens)}
                </p>
                <div className="loop-runner__progress">
                  <motion.div
                    className="loop-runner__progress-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'sealing' && (
            <motion.div
              key="sealing"
              className="loop-runner__phase loop-runner__phase--sealing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="loop-runner__seal-icon"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                ⭐
              </motion.div>
              <p className="loop-runner__status">
                {lens === 'individual' && 'Sealing this moment...'}
                {lens === 'professional' && 'Creating receipt...'}
                {lens === 'organisation' && 'Logging proof...'}
              </p>
            </motion.div>
          )}

          {phase === 'sealed' && generatedTrace && (
            <motion.div
              key="sealed"
              className="loop-runner__phase loop-runner__phase--sealed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TraceObject {...generatedTrace} lens={lens} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Utilities
function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitWithProgress(
  ms: number,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise(resolve => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / ms) * 100, 100);
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

function getIntentLabel(
  intent: LoopConfig['intent'],
  lens: 'individual' | 'professional' | 'organisation'
): string {
  const labels = {
    anchor: {
      individual: 'Settle the wave',
      professional: 'Arousal regulation',
      organisation: 'Grounding protocol',
    },
    clarity: {
      individual: 'Steady your mind',
      professional: 'Cognitive stabilization',
      organisation: 'Focus restoration',
    },
    connection: {
      individual: 'Repair/relate',
      professional: 'Attachment repair',
      organisation: 'Relational protocol',
    },
    direction: {
      individual: 'Find your way',
      professional: 'Values alignment',
      organisation: 'Direction protocol',
    },
  };
  return labels[intent][lens];
}

function getMoveLabel(
  intent: LoopConfig['intent'],
  lens: 'individual' | 'professional' | 'organisation'
): string {
  const moves = {
    anchor: {
      individual: 'Breathe with the rhythm',
      professional: 'Box breathing protocol',
      organisation: 'BREATH_4X4_PROTOCOL',
    },
    clarity: {
      individual: 'Notice without holding',
      professional: 'Mindful observation',
      organisation: 'OBSERVE_PROTOCOL',
    },
    connection: {
      individual: 'Remember someone who holds you',
      professional: 'Secure base visualization',
      organisation: 'ATTACHMENT_RECALL',
    },
    direction: {
      individual: 'What matters most right now?',
      professional: 'Values clarification',
      organisation: 'VALUES_PROTOCOL',
    },
  };
  return moves[intent][lens];
}

function generateTrace(
  config: LoopConfig,
  lens: 'individual' | 'professional' | 'organisation'
): TraceObjectProps {
  const copies = {
    anchor: {
      individual: 'Found my footing again.',
      professional: 'Arousal regulation maintained under load.',
      organisation: 'Grounding protocol executed. State: stable.',
    },
    clarity: {
      individual: 'Mind settled. Present now.',
      professional: 'Cognitive stabilization achieved.',
      organisation: 'Focus restoration protocol completed.',
    },
    connection: {
      individual: 'Felt held. Not alone.',
      professional: 'Attachment repair sequence completed.',
      organisation: 'Relational protocol executed.',
    },
    direction: {
      individual: 'Know what matters. Moving toward it.',
      professional: 'Values alignment confirmed.',
      organisation: 'Direction protocol completed.',
    },
  };

  return {
    id: `trace-${Date.now()}`,
    state: 'sealed',
    copy: copies[config.intent][lens],
    timestamp: new Date().toISOString(),
    metadata: {
      gripType: config.intent === 'anchor' ? 'anchor' : 
                config.intent === 'direction' ? 'compass' : 'handrail',
      duration: config.duration,
      driftLevel: 'low',
    },
  };
}

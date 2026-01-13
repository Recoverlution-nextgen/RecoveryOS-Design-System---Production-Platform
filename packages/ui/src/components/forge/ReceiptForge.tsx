import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject, type TraceObjectProps } from '../trace/TraceObject';
import type { Lens } from '../../types/theme';
import './ReceiptForge.css';

export type ForgeState = 'draft' | 'sealing' | 'sealed' | 'carried';

export interface ReceiptForgeProps {
  /** Optional pre-state snapshot (before the move) */
  preState?: string;
  
  /** Optional post-state snapshot (after the move) */
  postState?: string;
  
  /** One-line note (max 60 chars) */
  note?: string;
  
  /** Target metadata (hidden by default, shown in Professional/Organisation) */
  targetMeta?: {
    target?: string;
    mechanism?: string;
    primitive?: string;
    dose?: string;
  };
  
  /** Grip type */
  grip?: 'anchor' | 'compass' | 'handrail' | 'drift' | 'lens';
  
  /** Duration in seconds */
  duration?: number;
  
  /** Current lens */
  lens?: Lens;
  
  /** Callback when receipt is sealed */
  onSeal?: (trace: TraceObjectProps) => void;
  
  /** Callback when receipt is dismissed */
  onDismiss?: () => void;
}

export const ReceiptForge: React.FC<ReceiptForgeProps> = ({
  preState,
  postState,
  note,
  targetMeta,
  grip = 'anchor',
  duration = 10,
  lens = 'individual',
  onSeal,
  onDismiss,
}) => {
  const [state, setState] = useState<ForgeState>('draft');
  const [sealedTrace, setSealedTrace] = useState<TraceObjectProps | null>(null);

  const handleSeal = async () => {
    setState('sealing');
    
    // Seal animation duration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate trace
    const trace = generateTrace({
      preState,
      postState,
      note,
      targetMeta,
      grip,
      duration,
      lens,
    });
    
    setSealedTrace(trace);
    setState('sealed');
    
    onSeal?.(trace);
  };

  const handleDismiss = () => {
    onDismiss?.();
  };

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Save as Trace?',
          subtitle: 'Optional — one tap to seal this moment.',
          sealButton: 'Seal',
          skipButton: 'Skip',
          sealing: 'Sealing...',
          sealed: 'Sealed.',
          note: note || 'Breathed through it.',
        };
      case 'professional':
        return {
          title: 'Create Receipt?',
          subtitle: 'Forge proof object for clinical continuity.',
          sealButton: 'Forge Receipt',
          skipButton: 'Skip',
          sealing: 'Forging receipt...',
          sealed: 'Receipt created.',
          note: note || 'Arousal regulation maintained.',
        };
      case 'organisation':
        return {
          title: 'Log Execution?',
          subtitle: 'Generate integrity proof for audit trail.',
          sealButton: 'Generate Proof',
          skipButton: 'Skip',
          sealing: 'Generating proof...',
          sealed: 'Proof logged.',
          note: note || 'Protocol executed.',
        };
    }
  };

  const copy = getCopy();

  return (
    <div className={`receipt-forge receipt-forge--${state} receipt-forge--${lens}`}>
      <AnimatePresence mode="wait">
        {state === 'draft' && (
          <motion.div
            key="draft"
            className="receipt-forge__draft"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="receipt-forge__draft-card">
              <div className="receipt-forge__draft-header">
                <motion.div
                  className="receipt-forge__draft-icon"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </motion.div>
                <div className="receipt-forge__draft-text">
                  <h3 className="receipt-forge__title">{copy.title}</h3>
                  <p className="receipt-forge__subtitle">{copy.subtitle}</p>
                </div>
              </div>

              {note && (
                <div className="receipt-forge__note">
                  <span className="receipt-forge__note-text">{copy.note}</span>
                </div>
              )}

              {(preState || postState) && (
                <div className="receipt-forge__states">
                  {preState && <div className="receipt-forge__state receipt-forge__state--pre">{preState}</div>}
                  {preState && postState && <div className="receipt-forge__arrow">→</div>}
                  {postState && <div className="receipt-forge__state receipt-forge__state--post">{postState}</div>}
                </div>
              )}

              {targetMeta && lens !== 'individual' && (
                <div className="receipt-forge__meta">
                  {targetMeta.target && <span className="receipt-forge__meta-item">Target: {targetMeta.target}</span>}
                  {targetMeta.mechanism && <span className="receipt-forge__meta-item">Mechanism: {targetMeta.mechanism}</span>}
                  {targetMeta.dose && <span className="receipt-forge__meta-item">Dose: {targetMeta.dose}</span>}
                </div>
              )}

              <div className="receipt-forge__actions">
                <button
                  className="receipt-forge__button receipt-forge__button--seal"
                  onClick={handleSeal}
                >
                  {copy.sealButton}
                </button>
                <button
                  className="receipt-forge__button receipt-forge__button--skip"
                  onClick={handleDismiss}
                >
                  {copy.skipButton}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {state === 'sealing' && (
          <motion.div
            key="sealing"
            className="receipt-forge__sealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="receipt-forge__seal-icon"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 0.8, ease: 'easeInOut' },
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8l2.5 4.5L19 13l-3.5 3.5L16 21l-4-2.5L8 21l.5-4.5L5 13l4.5-.5L12 8z" fill="currentColor" />
              </svg>
            </motion.div>
            <p className="receipt-forge__sealing-text">{copy.sealing}</p>
          </motion.div>
        )}

        {state === 'sealed' && sealedTrace && (
          <motion.div
            key="sealed"
            className="receipt-forge__sealed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="receipt-forge__sealed-header">
              <motion.div
                className="receipt-forge__sealed-stamp"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.5 4.5L19 7l-3.5 3.5L16 15l-4-2.5L8 15l.5-4.5L5 7l4.5-.5L12 2z" fill="currentColor" />
                </svg>
              </motion.div>
              <span className="receipt-forge__sealed-text">{copy.sealed}</span>
            </div>

            <TraceObject {...sealedTrace} />

            <button
              className="receipt-forge__button receipt-forge__button--done"
              onClick={handleDismiss}
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper to generate trace from forge data
function generateTrace({
  preState,
  postState,
  note,
  targetMeta,
  grip,
  duration,
  lens,
}: {
  preState?: string;
  postState?: string;
  note?: string;
  targetMeta?: ReceiptForgeProps['targetMeta'];
  grip: string;
  duration: number;
  lens: Lens;
}): TraceObjectProps {
  const now = new Date();
  const traceId = `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return note || 'Breathed through the wave. Found my footing.';
      case 'professional':
        if (targetMeta?.target) {
          return `Target: ${targetMeta.target} • Dose: ${duration}s • ${preState && postState ? `${preState} → ${postState}` : 'Protocol executed'}`;
        }
        return `Arousal regulation maintained • ${duration}s • ${note || 'Baseline restored'}`;
      case 'organisation':
        return `ID: ${traceId} | Consent: Granted | Protocol: ${grip.toUpperCase()} | Duration: ${duration}s | Logged: ${now.toISOString()}`;
    }
  };

  return {
    traceId,
    copy: getCopy(),
    grip: grip as TraceObjectProps['grip'],
    duration,
    timestamp: now.toISOString(),
    lens,
  };
}

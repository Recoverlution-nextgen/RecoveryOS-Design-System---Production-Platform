import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './ConductorView.css';

export type ConductorState = 'listening' | 'routing' | 'delivering' | 'logged';

export type InputSignal = 'energy' | 'clarity' | 'anchorage' | 'connection';

export interface ConductorViewProps {
  /** Input signals detected */
  signals?: InputSignal[];
  
  /** Show input signals in minimal or expanded form */
  inputsVisible?: 'minimal' | 'expanded';
  
  /** Show "Why this?" drawer */
  whyDrawer?: boolean;
  
  /** Show governance overlay */
  governanceOverlay?: boolean;
  
  /** Current lens */
  lens?: Lens;
  
  /** Current conductor state */
  state?: ConductorState;
  
  /** Routed move details */
  routedMove?: {
    target: string;
    mechanism: string;
    primitive: string;
    dose: string;
  };
  
  /** Governance constraints */
  governance?: {
    consentBoundaries?: string[];
    quietHours?: boolean;
    escalationReady?: boolean;
  };
}

export const ConductorView: React.FC<ConductorViewProps> = ({
  signals = ['energy', 'clarity'],
  inputsVisible = 'minimal',
  whyDrawer = false,
  governanceOverlay = false,
  lens = 'individual',
  state = 'routing',
  routedMove = {
    target: 'Arousal regulation',
    mechanism: 'Parasympathetic activation',
    primitive: 'Breathwork',
    dose: '10s',
  },
  governance = {
    consentBoundaries: ['Breathwork', 'Reflection', 'Movement'],
    quietHours: false,
    escalationReady: true,
  },
}) => {
  const [whyDrawerOpen, setWhyDrawerOpen] = useState(whyDrawer);

  const getSignalLabel = (signal: InputSignal): string => {
    switch (lens) {
      case 'individual':
        return {
          energy: '⚡ Energy',
          clarity: '🧭 Clarity',
          anchorage: '⚓ Anchorage',
          connection: '🔗 Connection',
        }[signal];
      case 'professional':
        return {
          energy: 'Arousal',
          clarity: 'Cognitive load',
          anchorage: 'Baseline stability',
          connection: 'Social engagement',
        }[signal];
      case 'organisation':
        return {
          energy: 'AROUSAL_STATE',
          clarity: 'COGNITIVE_LOAD',
          anchorage: 'BASELINE_STABILITY',
          connection: 'SOCIAL_ENGAGEMENT',
        }[signal];
    }
  };

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Finding what helps...',
          routedLabel: 'Suggested',
          whyButton: 'Why this?',
          governanceLabel: 'Your preferences',
        };
      case 'professional':
        return {
          title: 'Routing intervention...',
          routedLabel: 'Protocol selected',
          whyButton: 'Routing logic',
          governanceLabel: 'Consent boundaries',
        };
      case 'organisation':
        return {
          title: 'PROTOCOL SELECTION',
          routedLabel: 'Executed protocol',
          whyButton: 'Audit trail',
          governanceLabel: 'Governance constraints',
        };
    }
  };

  const copy = getCopy();

  return (
    <div className={`conductor-view conductor-view--${lens} conductor-view--${state}`}>
      {/* Header */}
      <div className="conductor-view__header">
        <motion.div
          className="conductor-view__title-container"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {state === 'routing' && (
            <motion.div
              className="conductor-view__routing-icon"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 12M12 12L22 12M12 12L12 22M12 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </motion.div>
          )}
          <h3 className="conductor-view__title">{copy.title}</h3>
        </motion.div>
      </div>

      {/* Input Signals */}
      {inputsVisible && (
        <motion.div
          className={`conductor-view__signals conductor-view__signals--${inputsVisible}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="conductor-view__signals-label">Inputs</div>
          <div className="conductor-view__signals-list">
            {signals.map((signal, i) => (
              <motion.div
                key={signal}
                className="conductor-view__signal-chip"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {getSignalLabel(signal)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Governance Rails */}
      {governanceOverlay && governance && (
        <motion.div
          className="conductor-view__governance"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="conductor-view__governance-label">{copy.governanceLabel}</div>
          <div className="conductor-view__governance-items">
            {governance.consentBoundaries && (
              <div className="conductor-view__governance-item">
                <span className="conductor-view__governance-icon">✓</span>
                <span className="conductor-view__governance-text">
                  Consent: {governance.consentBoundaries.join(', ')}
                </span>
              </div>
            )}
            {governance.quietHours !== undefined && (
              <div className="conductor-view__governance-item">
                <span className="conductor-view__governance-icon">
                  {governance.quietHours ? '🌙' : '☀️'}
                </span>
                <span className="conductor-view__governance-text">
                  {governance.quietHours ? 'Quiet hours active' : 'Active hours'}
                </span>
              </div>
            )}
            {governance.escalationReady !== undefined && (
              <div className="conductor-view__governance-item">
                <span className="conductor-view__governance-icon">
                  {governance.escalationReady ? '✓' : '○'}
                </span>
                <span className="conductor-view__governance-text">
                  Escalation: {governance.escalationReady ? 'Ready' : 'Not configured'}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Routed Move */}
      <motion.div
        className="conductor-view__routed"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', bounce: 0.2 }}
      >
        <div className="conductor-view__routed-header">
          <span className="conductor-view__routed-label">{copy.routedLabel}</span>
          {state === 'routing' && (
            <motion.div
              className="conductor-view__routed-pulse"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        <div className="conductor-view__routed-card">
          <div className="conductor-view__routed-row">
            <span className="conductor-view__routed-key">Target:</span>
            <span className="conductor-view__routed-value">{routedMove.target}</span>
          </div>
          <div className="conductor-view__routed-row">
            <span className="conductor-view__routed-key">Mechanism:</span>
            <span className="conductor-view__routed-value">{routedMove.mechanism}</span>
          </div>
          <div className="conductor-view__routed-row">
            <span className="conductor-view__routed-key">Primitive:</span>
            <span className="conductor-view__routed-value conductor-view__routed-value--primary">
              {routedMove.primitive}
            </span>
          </div>
          <div className="conductor-view__routed-row">
            <span className="conductor-view__routed-key">Dose:</span>
            <span className="conductor-view__routed-value">{routedMove.dose}</span>
          </div>
        </div>

        {/* Why Drawer Toggle */}
        <button
          className="conductor-view__why-button"
          onClick={() => setWhyDrawerOpen(!whyDrawerOpen)}
        >
          {copy.whyButton}
          <motion.span
            className="conductor-view__why-arrow"
            animate={{ rotate: whyDrawerOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
      </motion.div>

      {/* Why Drawer */}
      <AnimatePresence>
        {whyDrawerOpen && (
          <motion.div
            className="conductor-view__why-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="conductor-view__why-content">
              <h4 className="conductor-view__why-title">Routing logic</h4>
              <div className="conductor-view__why-steps">
                <div className="conductor-view__why-step">
                  <span className="conductor-view__why-number">1</span>
                  <span className="conductor-view__why-text">
                    Detected signals: {signals.map(s => getSignalLabel(s)).join(', ')}
                  </span>
                </div>
                <div className="conductor-view__why-step">
                  <span className="conductor-view__why-number">2</span>
                  <span className="conductor-view__why-text">
                    Matched target: {routedMove.target}
                  </span>
                </div>
                <div className="conductor-view__why-step">
                  <span className="conductor-view__why-number">3</span>
                  <span className="conductor-view__why-text">
                    Selected primitive: {routedMove.primitive} (within consent boundaries)
                  </span>
                </div>
                <div className="conductor-view__why-step">
                  <span className="conductor-view__why-number">4</span>
                  <span className="conductor-view__why-text">
                    Calculated dose: {routedMove.dose} (based on baseline + drift)
                  </span>
                </div>
              </div>
              {lens === 'organisation' && (
                <div className="conductor-view__why-audit">
                  <span className="conductor-view__why-audit-label">Audit ID:</span>
                  <span className="conductor-view__why-audit-id">
                    route-{Date.now()}-{Math.random().toString(36).substr(2, 9)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

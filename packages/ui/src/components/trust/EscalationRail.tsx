import React from 'react';
import { motion } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './EscalationRail.css';

export type EscalationLevel = 'self' | 'tighten' | 'switch' | 'handoff';
export type HandoffType = 'peer' | 'clinician' | 'crisis';

export interface EscalationRailProps {
  /** Current escalation level */
  currentLevel?: EscalationLevel;
  
  /** Available handoff types */
  handoffTypes?: HandoffType[];
  
  /** Show support graph */
  supportGraphEnabled?: boolean;
  
  /** Consent gate required for handoff */
  consentGate?: boolean;
  
  /** Current lens */
  lens?: Lens;
  
  /** Callback when escalation level changes */
  onEscalate?: (level: EscalationLevel) => void;
  
  /** Callback when handoff is triggered */
  onHandoff?: (type: HandoffType) => void;
}

export const EscalationRail: React.FC<EscalationRailProps> = ({
  currentLevel = 'self',
  handoffTypes = ['peer', 'clinician', 'crisis'],
  supportGraphEnabled = true,
  consentGate = true,
  lens = 'individual',
  onEscalate,
  onHandoff,
}) => {
  const levels: EscalationLevel[] = ['self', 'tighten', 'switch', 'handoff'];

  const getLevelCopy = (level: EscalationLevel) => {
    switch (lens) {
      case 'individual':
        return {
          self: { label: 'Self-route', description: 'You choose the move' },
          tighten: { label: 'Tighten dose', description: 'More of the same' },
          switch: { label: 'Switch approach', description: 'Try something different' },
          handoff: { label: 'Bring in support', description: 'Connect with someone' },
        }[level];
      case 'professional':
        return {
          self: { label: 'Self-route', description: 'Patient-directed intervention' },
          tighten: { label: 'Tighten dose', description: 'Increase duration/frequency' },
          switch: { label: 'Switch primitive', description: 'Alternative mechanism' },
          handoff: { label: 'Escalate to human', description: 'Supervised handoff' },
        }[level];
      case 'organisation':
        return {
          self: { label: 'SELF_ROUTE', description: 'Autonomous protocol selection' },
          tighten: { label: 'TIGHTEN_DOSE', description: 'Parameter adjustment' },
          switch: { label: 'SWITCH_PRIMITIVE', description: 'Mechanism substitution' },
          handoff: { label: 'HUMAN_HANDOFF', description: 'Supervised escalation' },
        }[level];
    }
  };

  const getHandoffLabel = (type: HandoffType): string => {
    switch (lens) {
      case 'individual':
        return {
          peer: 'Friend/Family',
          clinician: 'Therapist/Clinician',
          crisis: 'Crisis Support',
        }[type];
      case 'professional':
        return {
          peer: 'Peer support',
          clinician: 'Clinical escalation',
          crisis: 'Crisis protocol',
        }[type];
      case 'organisation':
        return {
          peer: 'PEER_SUPPORT',
          clinician: 'CLINICAL_ESCALATION',
          crisis: 'CRISIS_PROTOCOL',
        }[type];
    }
  };

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Escalation Path',
          subtitle: 'Clean handoff under drift, by protocol.',
          consentNote: 'You control when to bring in others.',
          handoffTitle: 'Connect with support',
        };
      case 'professional':
        return {
          title: 'Escalation Protocol',
          subtitle: 'Structured handoff by consent and drift threshold.',
          consentNote: 'Consent-gated escalation pathways.',
          handoffTitle: 'Available handoff types',
        };
      case 'organisation':
        return {
          title: 'Escalation Infrastructure',
          subtitle: 'Governed handoff protocols with audit trail.',
          consentNote: 'Consent gate: ENABLED',
          handoffTitle: 'Handoff protocols',
        };
    }
  };

  const copy = getCopy();
  const currentIndex = levels.indexOf(currentLevel);

  return (
    <div className={`escalation-rail escalation-rail--${lens}`}>
      <div className="escalation-rail__header">
        <h3 className="escalation-rail__title">{copy.title}</h3>
        <p className="escalation-rail__subtitle">{copy.subtitle}</p>
      </div>

      {/* Escalation Levels */}
      <div className="escalation-rail__levels">
        {levels.map((level, i) => {
          const levelCopy = getLevelCopy(level);
          const isActive = i === currentIndex;
          const isPassed = i < currentIndex;
          const isAvailable = i <= currentIndex + 1;

          return (
            <motion.button
              key={level}
              className={`escalation-rail__level ${isActive ? 'escalation-rail__level--active' : ''} ${isPassed ? 'escalation-rail__level--passed' : ''} ${!isAvailable ? 'escalation-rail__level--disabled' : ''}`}
              onClick={() => isAvailable && onEscalate?.(level)}
              disabled={!isAvailable}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="escalation-rail__level-indicator">
                <span className="escalation-rail__level-number">{i + 1}</span>
                {isActive && (
                  <motion.div
                    className="escalation-rail__level-pulse"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>
              <div className="escalation-rail__level-content">
                <h4 className="escalation-rail__level-label">{levelCopy.label}</h4>
                <p className="escalation-rail__level-description">{levelCopy.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Handoff Options (shown when at handoff level) */}
      {currentLevel === 'handoff' && (
        <motion.div
          className="escalation-rail__handoff"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="escalation-rail__handoff-header">
            <h4 className="escalation-rail__handoff-title">{copy.handoffTitle}</h4>
            {consentGate && (
              <span className="escalation-rail__consent-badge">{copy.consentNote}</span>
            )}
          </div>
          <div className="escalation-rail__handoff-options">
            {handoffTypes.map((type, i) => (
              <motion.button
                key={type}
                className="escalation-rail__handoff-button"
                onClick={() => onHandoff?.(type)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <span className="escalation-rail__handoff-icon">
                  {type === 'peer' && '👥'}
                  {type === 'clinician' && '🩺'}
                  {type === 'crisis' && '🚨'}
                </span>
                <span className="escalation-rail__handoff-label">
                  {getHandoffLabel(type)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Support Graph (optional) */}
      {supportGraphEnabled && (
        <div className="escalation-rail__graph">
          <div className="escalation-rail__graph-label">Escalation readiness</div>
          <div className="escalation-rail__graph-bar">
            {levels.map((level, i) => (
              <motion.div
                key={level}
                className={`escalation-rail__graph-segment ${i <= currentIndex ? 'escalation-rail__graph-segment--active' : ''}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                style={{ flex: 1 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

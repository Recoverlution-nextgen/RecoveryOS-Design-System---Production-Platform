import React from 'react';
import { motion } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './GovernanceLockMap.css';

export type LockLevel = 'locked' | 'controlled' | 'expandable';

export interface LockItem {
  id: string;
  level: LockLevel;
  label: string;
  description?: string;
}

export interface GovernanceLockMapProps {
  /** Show examples for each ring */
  showExamples?: boolean;
  
  /** Show ID stability principle */
  showIdStability?: boolean;
  
  /** Current lens */
  lens?: Lens;
}

const lockedItems: LockItem[] = [
  { id: 'loop-structure', level: 'locked', label: 'Loop structure', description: 'Sense → Route → Deliver → Seal' },
  { id: 'consent-model', level: 'locked', label: 'Consent model', description: 'First-class UI, not compliance' },
  { id: 'escalation', level: 'locked', label: 'Escalation protocols', description: 'Clean handoff by protocol' },
  { id: 'proof-ids', level: 'locked', label: 'Proof object IDs', description: 'Permanent trace identifiers' },
];

const controlledItems: LockItem[] = [
  { id: 'primitives', level: 'controlled', label: 'Primitives', description: 'Breathwork, Reflection, Movement' },
  { id: 'targeting', level: 'controlled', label: 'Targeting logic', description: 'Evidence-based mechanisms' },
  { id: 'routing', level: 'controlled', label: 'Routing rules', description: 'LUMA orchestration' },
  { id: 'dosing', level: 'controlled', label: 'Dose calculation', description: 'Duration + frequency' },
];

const expandableItems: LockItem[] = [
  { id: 'labels', level: 'expandable', label: 'Labels & copy', description: 'Lens-specific language' },
  { id: 'ui-themes', level: 'expandable', label: 'UI themes', description: 'Calm/Heat visual modes' },
  { id: 'integrations', level: 'expandable', label: 'Integrations', description: 'External APIs' },
  { id: 'extensions', level: 'expandable', label: 'Extensions', description: 'Custom modules' },
];

export const GovernanceLockMap: React.FC<GovernanceLockMapProps> = ({
  showExamples = true,
  showIdStability = true,
  lens = 'individual',
}) => {
  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Stability Promise',
          subtitle: 'What stays the same, what can change.',
          lockedLabel: 'Never changes',
          controlledLabel: 'Evidence-guided',
          expandableLabel: 'Customizable',
          stabilityNote: 'Your proof IDs never change, even as labels evolve.',
        };
      case 'professional':
        return {
          title: 'Governance Contract',
          subtitle: 'Stability zones: LOCKED / CONTROLLED / EXPANDABLE.',
          lockedLabel: 'LOCKED (core)',
          controlledLabel: 'CONTROLLED (evidence)',
          expandableLabel: 'EXPANDABLE (custom)',
          stabilityNote: 'Labels evolve, IDs don\'t — audit trail integrity guaranteed.',
        };
      case 'organisation':
        return {
          title: 'Governance Architecture',
          subtitle: 'Three-tier stability contract with ID permanence.',
          lockedLabel: 'LOCKED (regulatory)',
          controlledLabel: 'CONTROLLED (clinical)',
          expandableLabel: 'EXPANDABLE (operational)',
          stabilityNote: 'PRINCIPLE: Labels evolve, IDs don\'t. Trace permanence = audit defensibility.',
        };
    }
  };

  const copy = getCopy();

  return (
    <div className={`governance-lock-map governance-lock-map--${lens}`}>
      <div className="governance-lock-map__header">
        <h3 className="governance-lock-map__title">{copy.title}</h3>
        <p className="governance-lock-map__subtitle">{copy.subtitle}</p>
      </div>

      <div className="governance-lock-map__rings">
        {/* Locked (Core) */}
        <motion.div
          className="governance-lock-map__ring governance-lock-map__ring--locked"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="governance-lock-map__ring-header">
            <span className="governance-lock-map__ring-icon">🔒</span>
            <h4 className="governance-lock-map__ring-title">{copy.lockedLabel}</h4>
          </div>
          {showExamples && (
            <div className="governance-lock-map__items">
              {lockedItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="governance-lock-map__item"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <span className="governance-lock-map__item-label">{item.label}</span>
                  {item.description && (
                    <span className="governance-lock-map__item-description">{item.description}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Controlled (Middle) */}
        <motion.div
          className="governance-lock-map__ring governance-lock-map__ring--controlled"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="governance-lock-map__ring-header">
            <span className="governance-lock-map__ring-icon">🔐</span>
            <h4 className="governance-lock-map__ring-title">{copy.controlledLabel}</h4>
          </div>
          {showExamples && (
            <div className="governance-lock-map__items">
              {controlledItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="governance-lock-map__item"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <span className="governance-lock-map__item-label">{item.label}</span>
                  {item.description && (
                    <span className="governance-lock-map__item-description">{item.description}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Expandable (Edge) */}
        <motion.div
          className="governance-lock-map__ring governance-lock-map__ring--expandable"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="governance-lock-map__ring-header">
            <span className="governance-lock-map__ring-icon">🔓</span>
            <h4 className="governance-lock-map__ring-title">{copy.expandableLabel}</h4>
          </div>
          {showExamples && (
            <div className="governance-lock-map__items">
              {expandableItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="governance-lock-map__item"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <span className="governance-lock-map__item-label">{item.label}</span>
                  {item.description && (
                    <span className="governance-lock-map__item-description">{item.description}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ID Stability Principle */}
      {showIdStability && (
        <motion.div
          className="governance-lock-map__principle"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="governance-lock-map__principle-icon">💎</div>
          <p className="governance-lock-map__principle-text">{copy.stabilityNote}</p>
        </motion.div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './ConsentMap.css';

export type ConsentCategory = 'see' | 'do' | 'ask';

export interface ConsentItem {
  id: string;
  category: ConsentCategory;
  label: string;
  description?: string;
  granted: boolean;
  locked?: boolean;
}

export interface ConsentMapProps {
  /** Visibility levels the system can access */
  visibilityLevels?: ConsentItem[];
  
  /** Actions the system can take */
  sharingOptions?: ConsentItem[];
  
  /** Questions the system can ask */
  askPermissions?: ConsentItem[];
  
  /** Current lens */
  lens?: Lens;
  
  /** Callback when consent changes */
  onConsentChange?: (itemId: string, granted: boolean) => void;
  
  /** Show detailed descriptions */
  showDetails?: boolean;
}

const defaultVisibility: ConsentItem[] = [
  { id: 'energy-state', category: 'see', label: 'Energy patterns', granted: true },
  { id: 'clarity-state', category: 'see', label: 'Clarity signals', granted: true },
  { id: 'baseline', category: 'see', label: 'Baseline data', granted: true },
  { id: 'location', category: 'see', label: 'Location data', granted: false },
];

const defaultSharing: ConsentItem[] = [
  { id: 'suggest-moves', category: 'do', label: 'Suggest interventions', granted: true },
  { id: 'auto-log', category: 'do', label: 'Auto-log receipts', granted: true },
  { id: 'share-clinician', category: 'do', label: 'Share with clinician', granted: false },
  { id: 'share-research', category: 'do', label: 'Share anonymized data', granted: false },
];

const defaultAsk: ConsentItem[] = [
  { id: 'check-in', category: 'ask', label: 'Daily check-ins', granted: true },
  { id: 'drift-alert', category: 'ask', label: 'Drift notifications', granted: true },
  { id: 'escalation', category: 'ask', label: 'Escalation prompts', granted: true, locked: true },
  { id: 'feedback', category: 'ask', label: 'Feedback requests', granted: false },
];

export const ConsentMap: React.FC<ConsentMapProps> = ({
  visibilityLevels = defaultVisibility,
  sharingOptions = defaultSharing,
  askPermissions = defaultAsk,
  lens = 'individual',
  onConsentChange,
  showDetails = false,
}) => {
  const [items, setItems] = useState<ConsentItem[]>([
    ...visibilityLevels,
    ...sharingOptions,
    ...askPermissions,
  ]);

  const handleToggle = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item?.locked) return;

    setItems(prev =>
      prev.map(i =>
        i.id === itemId ? { ...i, granted: !i.granted } : i
      )
    );

    const updatedItem = items.find(i => i.id === itemId);
    if (updatedItem) {
      onConsentChange?.(itemId, !updatedItem.granted);
    }
  };

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Your Preferences',
          subtitle: 'What RecoveryOS can see, do, and ask.',
          seeLabel: 'System can see',
          doLabel: 'System can do',
          askLabel: 'System can ask',
          lockedHint: 'Required for safety',
        };
      case 'professional':
        return {
          title: 'Consent Boundaries',
          subtitle: 'First-class UI, not compliance theater.',
          seeLabel: 'Observable signals',
          doLabel: 'Permitted actions',
          askLabel: 'Notification triggers',
          lockedHint: 'Safety protocol',
        };
      case 'organisation':
        return {
          title: 'Consent Configuration',
          subtitle: 'Governance-first architecture.',
          seeLabel: 'Data visibility scope',
          doLabel: 'Permitted operations',
          askLabel: 'Notification protocols',
          lockedHint: 'LOCKED (regulatory)',
        };
    }
  };

  const copy = getCopy();

  const getItemsByCategory = (category: ConsentCategory) =>
    items.filter(item => item.category === category);

  return (
    <div className={`consent-map consent-map--${lens}`}>
      <div className="consent-map__header">
        <h3 className="consent-map__title">{copy.title}</h3>
        <p className="consent-map__subtitle">{copy.subtitle}</p>
      </div>

      <div className="consent-map__grid">
        {/* What System Can See */}
        <div className="consent-map__section">
          <h4 className="consent-map__section-title">
            <span className="consent-map__section-icon">👁</span>
            {copy.seeLabel}
          </h4>
          <div className="consent-map__items">
            {getItemsByCategory('see').map((item, i) => (
              <motion.div
                key={item.id}
                className={`consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  className="consent-map__toggle"
                  onClick={() => handleToggle(item.id)}
                  disabled={item.locked}
                  aria-label={`${item.granted ? 'Revoke' : 'Grant'} ${item.label}`}
                >
                  <span className="consent-map__checkbox">
                    {item.granted ? '✓' : '○'}
                  </span>
                  <span className="consent-map__label">{item.label}</span>
                  {item.locked && (
                    <span className="consent-map__lock" title={copy.lockedHint}>
                      🔒
                    </span>
                  )}
                </button>
                {showDetails && item.description && (
                  <p className="consent-map__description">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* What System Can Do */}
        <div className="consent-map__section">
          <h4 className="consent-map__section-title">
            <span className="consent-map__section-icon">⚡</span>
            {copy.doLabel}
          </h4>
          <div className="consent-map__items">
            {getItemsByCategory('do').map((item, i) => (
              <motion.div
                key={item.id}
                className={`consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <button
                  className="consent-map__toggle"
                  onClick={() => handleToggle(item.id)}
                  disabled={item.locked}
                  aria-label={`${item.granted ? 'Revoke' : 'Grant'} ${item.label}`}
                >
                  <span className="consent-map__checkbox">
                    {item.granted ? '✓' : '○'}
                  </span>
                  <span className="consent-map__label">{item.label}</span>
                  {item.locked && (
                    <span className="consent-map__lock" title={copy.lockedHint}>
                      🔒
                    </span>
                  )}
                </button>
                {showDetails && item.description && (
                  <p className="consent-map__description">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* When System Can Ask */}
        <div className="consent-map__section">
          <h4 className="consent-map__section-title">
            <span className="consent-map__section-icon">💬</span>
            {copy.askLabel}
          </h4>
          <div className="consent-map__items">
            {getItemsByCategory('ask').map((item, i) => (
              <motion.div
                key={item.id}
                className={`consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <button
                  className="consent-map__toggle"
                  onClick={() => handleToggle(item.id)}
                  disabled={item.locked}
                  aria-label={`${item.granted ? 'Revoke' : 'Grant'} ${item.label}`}
                >
                  <span className="consent-map__checkbox">
                    {item.granted ? '✓' : '○'}
                  </span>
                  <span className="consent-map__label">{item.label}</span>
                  {item.locked && (
                    <span className="consent-map__lock" title={copy.lockedHint}>
                      🔒
                    </span>
                  )}
                </button>
                {showDetails && item.description && (
                  <p className="consent-map__description">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Handrail.css';

export type SafetyLevel = 'stable' | 'concerned' | 'urgent' | 'crisis';
export type Lens = 'individual' | 'professional' | 'organisation';

export interface SafetyContact {
  id: string;
  name: string;
  type: 'crisis' | 'clinician' | 'support' | 'emergency';
  phone?: string;
  available: string;
  description: string;
}

export interface HandrailProps {
  currentLevel?: SafetyLevel;
  lens?: Lens;
  contacts?: SafetyContact[];
  onContactSelect?: (contactId: string) => void;
  onLevelChange?: (level: SafetyLevel) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

const DEFAULT_CONTACTS: SafetyContact[] = [
  {
    id: 'crisis-line',
    name: '988 Suicide & Crisis Lifeline',
    type: 'crisis',
    phone: '988',
    available: '24/7',
    description: 'Free, confidential support for people in distress',
  },
  {
    id: 'crisis-text',
    name: 'Crisis Text Line',
    type: 'crisis',
    phone: 'Text HOME to 741741',
    available: '24/7',
    description: 'Free, 24/7 support via text message',
  },
  {
    id: 'emergency',
    name: 'Emergency Services',
    type: 'emergency',
    phone: '911',
    available: '24/7',
    description: 'For immediate life-threatening emergencies',
  },
  {
    id: 'warmline',
    name: 'Warmline',
    type: 'support',
    phone: '1-877-910-9276',
    available: 'Varies by state',
    description: 'Peer support for non-crisis emotional support',
  },
];

const SAFETY_LEVELS = [
  {
    value: 'stable' as SafetyLevel,
    label: 'Stable',
    icon: '🟢',
    description: {
      individual: "I'm okay right now",
      professional: 'Client reports stability',
      organisation: 'System operating normally',
    },
  },
  {
    value: 'concerned' as SafetyLevel,
    label: 'Concerned',
    icon: '🟡',
    description: {
      individual: 'Starting to struggle',
      professional: 'Client showing early warning signs',
      organisation: 'Elevated risk indicators',
    },
  },
  {
    value: 'urgent' as SafetyLevel,
    label: 'Urgent',
    icon: '🟠',
    description: {
      individual: 'Need help soon',
      professional: 'Client needs immediate support',
      organisation: 'Critical intervention needed',
    },
  },
  {
    value: 'crisis' as SafetyLevel,
    label: 'Crisis',
    icon: '🔴',
    description: {
      individual: 'In crisis right now',
      professional: 'Client in active crisis',
      organisation: 'Emergency response required',
    },
  },
];

export const Handrail: React.FC<HandrailProps> = ({
  currentLevel = 'stable',
  lens = 'individual',
  contacts = DEFAULT_CONTACTS,
  onContactSelect,
  onLevelChange,
  isExpanded: controlledExpanded,
  onToggle,
  className = '',
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const handleLevelSelect = (level: SafetyLevel) => {
    if (onLevelChange) {
      onLevelChange(level);
    }
  };

  const handleContactClick = (contactId: string) => {
    if (onContactSelect) {
      onContactSelect(contactId);
    }
  };

  const currentLevelData = SAFETY_LEVELS.find(l => l.value === currentLevel);
  const crisisContacts = contacts.filter(c => c.type === 'crisis' || c.type === 'emergency');
  const supportContacts = contacts.filter(c => c.type === 'support' || c.type === 'clinician');

  return (
    <div className={`handrail ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}>
      {/* Collapsed State - Always Visible Tab */}
      {!isExpanded && (
        <button
          className="handrail__tab"
          onClick={handleToggle}
          aria-label="Open safety resources"
        >
          <span className="handrail__tab-icon">🛟</span>
          <span className="handrail__tab-label">Safety</span>
        </button>
      )}

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="handrail__panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div className="handrail__header">
              <div className="handrail__title-group">
                <span className="handrail__icon">🛟</span>
                <h2 className="handrail__title">Safety Resources</h2>
              </div>
              <button
                className="handrail__close"
                onClick={handleToggle}
                aria-label="Close safety panel"
              >
                ✕
              </button>
            </div>

            {/* Current Level */}
            <div className="handrail__current-level">
              <div className="current-level__header">
                <span className="current-level__label">Current status:</span>
                <span className="current-level__value">
                  <span className="current-level__icon">{currentLevelData?.icon}</span>
                  {currentLevelData?.label}
                </span>
              </div>
              <p className="current-level__description">
                {currentLevelData?.description[lens]}
              </p>
            </div>

            {/* Crisis Contacts */}
            <div className="handrail__section">
              <h3 className="handrail__section-title">
                {currentLevel === 'crisis' || currentLevel === 'urgent' 
                  ? 'Get Help Now'
                  : 'Crisis Support (24/7)'}
              </h3>
              <div className="handrail__contacts">
                {crisisContacts.map(contact => (
                  <button
                    key={contact.id}
                    className={`contact-card ${contact.type === 'emergency' ? 'emergency' : 'crisis'}`}
                    onClick={() => handleContactClick(contact.id)}
                  >
                    <div className="contact-card__header">
                      <span className="contact-card__name">{contact.name}</span>
                      <span className="contact-card__badge">{contact.available}</span>
                    </div>
                    {contact.phone && (
                      <div className="contact-card__phone">{contact.phone}</div>
                    )}
                    <p className="contact-card__description">
                      {contact.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Check Your Status */}
            <div className="handrail__section">
              <h3 className="handrail__section-title">Check Your Status</h3>
              <div className="handrail__levels">
                {SAFETY_LEVELS.map(level => (
                  <button
                    key={level.value}
                    className={`level-button ${currentLevel === level.value ? 'active' : ''}`}
                    onClick={() => handleLevelSelect(level.value)}
                  >
                    <span className="level-button__icon">{level.icon}</span>
                    <div className="level-button__content">
                      <span className="level-button__label">{level.label}</span>
                      <span className="level-button__description">
                        {level.description[lens]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Contacts */}
            {supportContacts.length > 0 && (
              <div className="handrail__section">
                <h3 className="handrail__section-title">Additional Support</h3>
                <div className="handrail__contacts">
                  {supportContacts.map(contact => (
                    <button
                      key={contact.id}
                      className="contact-card support"
                      onClick={() => handleContactClick(contact.id)}
                    >
                      <div className="contact-card__header">
                        <span className="contact-card__name">{contact.name}</span>
                        <span className="contact-card__badge">{contact.available}</span>
                      </div>
                      {contact.phone && (
                        <div className="contact-card__phone">{contact.phone}</div>
                      )}
                      <p className="contact-card__description">
                        {contact.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="handrail__footer">
              <p className="handrail__note">
                {lens === 'individual' && 'Your safety matters. These resources are always here when you need them.'}
                {lens === 'professional' && 'Clinical safety protocols. Document all crisis interventions.'}
                {lens === 'organisation' && 'System-wide safety infrastructure. All contacts verified and monitored.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

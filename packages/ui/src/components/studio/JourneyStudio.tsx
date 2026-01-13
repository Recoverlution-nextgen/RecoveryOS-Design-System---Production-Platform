import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './JourneyStudio.css';

export type ERAPhase = 'experience' | 'recognize' | 'align';
export type Lens = 'individual' | 'professional' | 'organisation';

export interface JourneyConfig {
  name: string;
  duration: string;
  focusArea: string;
  checkInFrequency: string;
  navicues: string[];
}

export interface JourneyStudioProps {
  currentPhase?: ERAPhase;
  lens?: Lens;
  onInstall?: (config: JourneyConfig) => void;
  onPhaseChange?: (phase: ERAPhase) => void;
  className?: string;
}

const ERA_PHASES = [
  {
    id: 'experience' as ERAPhase,
    label: 'Experience',
    icon: '🌱',
    description: {
      individual: 'Start with where you are now',
      professional: 'Begin with client baseline',
      organisation: 'Establish current state',
    },
    details: {
      individual: "We'll capture your current patterns through light daily check-ins. No judgment, just data.",
      professional: 'Client establishes baseline through structured self-reporting. Creates recoverable evidence.',
      organisation: 'Users complete initial assessment period. Aggregated baseline established.',
    },
  },
  {
    id: 'recognize' as ERAPhase,
    label: 'Recognize',
    icon: '👁️',
    description: {
      individual: 'See what the data shows',
      professional: 'Review patterns with client',
      organisation: 'Analyze baseline insights',
    },
    details: {
      individual: "After a week, you'll see your patterns clearly. What repeats? What helps? What doesn't?",
      professional: 'Mid-week review session. Client sees their own data, notices patterns, validates insights.',
      organisation: 'Analytics surface common patterns, outliers, intervention opportunities across cohort.',
    },
  },
  {
    id: 'align' as ERAPhase,
    label: 'Align',
    icon: '🎯',
    description: {
      individual: 'Choose one move to try',
      professional: 'Co-create intervention plan',
      organisation: 'Deploy targeted protocols',
    },
    details: {
      individual: "Pick one small thing to shift. Install it into your week. That's the whole game.",
      professional: 'Collaborative goal-setting based on evidence. One clear target, tracked progress.',
      organisation: 'Evidence-based interventions deployed to identified segments. Measure outcomes.',
    },
  },
];

const EXAMPLE_JOURNEYS = {
  individual: [
    { name: 'Morning Routine', focusArea: 'Sleep & Energy', duration: '1 week' },
    { name: 'Stress Management', focusArea: 'Emotional Regulation', duration: '2 weeks' },
    { name: 'Connection Building', focusArea: 'Social Support', duration: '1 week' },
  ],
  professional: [
    { name: 'Anxiety Protocol', focusArea: 'Symptom Management', duration: '4 weeks' },
    { name: 'Sleep Hygiene', focusArea: 'Behavioral Change', duration: '2 weeks' },
    { name: 'Thought Patterns', focusArea: 'Cognitive Work', duration: '3 weeks' },
  ],
  organisation: [
    { name: 'Onboarding Flow', focusArea: 'New User Experience', duration: '1 week' },
    { name: 'Crisis Prevention', focusArea: 'Early Warning', duration: 'Ongoing' },
    { name: 'Outcome Tracking', focusArea: 'Service Metrics', duration: 'Ongoing' },
  ],
};

export const JourneyStudio: React.FC<JourneyStudioProps> = ({
  currentPhase = 'experience',
  lens = 'individual',
  onInstall,
  onPhaseChange,
  className = '',
}) => {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [showInstaller, setShowInstaller] = useState(false);

  const handlePhaseClick = (phase: ERAPhase) => {
    if (onPhaseChange) {
      onPhaseChange(phase);
    }
  };

  const handleInstallJourney = () => {
    if (selectedJourney && onInstall) {
      const journey = EXAMPLE_JOURNEYS[lens].find(j => j.name === selectedJourney);
      if (journey) {
        onInstall({
          name: journey.name,
          duration: journey.duration,
          focusArea: journey.focusArea,
          checkInFrequency: 'Daily',
          navicues: ['Mood Check', 'Gratitude Note', 'Body Scan'],
        });
      }
    }
    setShowInstaller(false);
    setSelectedJourney(null);
  };

  const currentPhaseData = ERA_PHASES.find(p => p.id === currentPhase);
  const exampleJourneys = EXAMPLE_JOURNEYS[lens];

  return (
    <div className={`journey-studio ${className}`}>
      <div className="journey-studio__header">
        <h2 className="journey-studio__title">Journey Studio</h2>
        <p className="journey-studio__subtitle">
          {lens === 'individual' && 'Build your weekly baseline'}
          {lens === 'professional' && 'Create client journey'}
          {lens === 'organisation' && 'Design service pathway'}
        </p>
      </div>

      {/* ERA Timeline */}
      <div className="journey-studio__timeline">
        <div className="timeline-label">The ERA Cadence</div>
        <div className="timeline-track">
          {ERA_PHASES.map((phase, index) => {
            const isActive = phase.id === currentPhase;
            const isPast = ERA_PHASES.findIndex(p => p.id === currentPhase) > index;

            return (
              <React.Fragment key={phase.id}>
                <button
                  className={`timeline-phase ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => handlePhaseClick(phase.id)}
                >
                  <div className="timeline-phase__icon">{phase.icon}</div>
                  <div className="timeline-phase__label">{phase.label}</div>
                  {isActive && (
                    <motion.div
                      className="timeline-phase__indicator"
                      layoutId="activePhaseIndicator"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  )}
                </button>
                {index < ERA_PHASES.length - 1 && (
                  <div className={`timeline-connector ${isPast ? 'completed' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Current Phase Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          className="journey-studio__phase-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="phase-details__header">
            <span className="phase-details__icon">{currentPhaseData?.icon}</span>
            <h3 className="phase-details__title">{currentPhaseData?.label}</h3>
          </div>
          <p className="phase-details__description">
            {currentPhaseData?.description[lens]}
          </p>
          <div className="phase-details__explanation">
            {currentPhaseData?.details[lens]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Example Journeys */}
      <div className="journey-studio__examples">
        <h3 className="examples-title">
          {lens === 'individual' && 'Start a Journey'}
          {lens === 'professional' && 'Common Protocols'}
          {lens === 'organisation' && 'Service Pathways'}
        </h3>
        <div className="examples-grid">
          {exampleJourneys.map(journey => (
            <button
              key={journey.name}
              className={`journey-card ${selectedJourney === journey.name ? 'selected' : ''}`}
              onClick={() => setSelectedJourney(journey.name)}
            >
              <div className="journey-card__header">
                <h4 className="journey-card__name">{journey.name}</h4>
                <span className="journey-card__duration">{journey.duration}</span>
              </div>
              <div className="journey-card__focus">
                <span className="focus-label">Focus:</span>
                <span className="focus-value">{journey.focusArea}</span>
              </div>
              {selectedJourney === journey.name && (
                <motion.div
                  className="journey-card__checkmark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ✓
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Install Button */}
      {selectedJourney && (
        <motion.div
          className="journey-studio__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="install-button"
            onClick={() => setShowInstaller(true)}
          >
            <span className="install-button__icon">📦</span>
            <span className="install-button__label">
              {lens === 'individual' && 'Install This Journey'}
              {lens === 'professional' && 'Assign to Client'}
              {lens === 'organisation' && 'Deploy Pathway'}
            </span>
          </button>
        </motion.div>
      )}

      {/* Installer Modal */}
      <AnimatePresence>
        {showInstaller && (
          <motion.div
            className="installer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowInstaller(false)}
          >
            <motion.div
              className="installer-modal__content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="installer-modal__title">
                {lens === 'individual' && 'Ready to begin?'}
                {lens === 'professional' && 'Confirm assignment'}
                {lens === 'organisation' && 'Deploy pathway'}
              </h3>
              
              <div className="installer-modal__journey-info">
                <div className="info-row">
                  <span className="info-label">Journey:</span>
                  <span className="info-value">{selectedJourney}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">
                    {exampleJourneys.find(j => j.name === selectedJourney)?.duration}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Check-ins:</span>
                  <span className="info-value">Daily (takes 2-3 min)</span>
                </div>
              </div>

              <div className="installer-modal__commitment">
                <p className="commitment-text">
                  {lens === 'individual' && "You'll get daily reminders to check in. Skip days if you need to—this is about building awareness, not perfection."}
                  {lens === 'professional' && 'Client receives daily prompts. Mid-week review scheduled. Progress tracked automatically.'}
                  {lens === 'organisation' && 'Automated deployment with daily engagement prompts. Analytics dashboard updates in real-time.'}
                </p>
              </div>

              <div className="installer-modal__actions">
                <button
                  className="installer-action installer-action--secondary"
                  onClick={() => setShowInstaller(false)}
                >
                  Cancel
                </button>
                <button
                  className="installer-action installer-action--primary"
                  onClick={handleInstallJourney}
                >
                  {lens === 'individual' && "Let's Go"}
                  {lens === 'professional' && 'Assign Journey'}
                  {lens === 'organisation' && 'Deploy Now'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

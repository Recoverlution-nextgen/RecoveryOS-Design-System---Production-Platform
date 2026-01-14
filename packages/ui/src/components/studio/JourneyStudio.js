import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './JourneyStudio.css';
const ERA_PHASES = [
    {
        id: 'experience',
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
        id: 'recognize',
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
        id: 'align',
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
export const JourneyStudio = ({ currentPhase = 'experience', lens = 'individual', onInstall, onPhaseChange, className = '', }) => {
    const [selectedJourney, setSelectedJourney] = useState(null);
    const [showInstaller, setShowInstaller] = useState(false);
    const handlePhaseClick = (phase) => {
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
    return (_jsxs("div", { className: `journey-studio ${className}`, children: [_jsxs("div", { className: "journey-studio__header", children: [_jsx("h2", { className: "journey-studio__title", children: "Journey Studio" }), _jsxs("p", { className: "journey-studio__subtitle", children: [lens === 'individual' && 'Build your weekly baseline', lens === 'professional' && 'Create client journey', lens === 'organisation' && 'Design service pathway'] })] }), _jsxs("div", { className: "journey-studio__timeline", children: [_jsx("div", { className: "timeline-label", children: "The ERA Cadence" }), _jsx("div", { className: "timeline-track", children: ERA_PHASES.map((phase, index) => {
                            const isActive = phase.id === currentPhase;
                            const isPast = ERA_PHASES.findIndex(p => p.id === currentPhase) > index;
                            return (_jsxs(React.Fragment, { children: [_jsxs("button", { className: `timeline-phase ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`, onClick: () => handlePhaseClick(phase.id), children: [_jsx("div", { className: "timeline-phase__icon", children: phase.icon }), _jsx("div", { className: "timeline-phase__label", children: phase.label }), isActive && (_jsx(motion.div, { className: "timeline-phase__indicator", layoutId: "activePhaseIndicator", transition: { duration: 0.3, ease: 'easeInOut' } }))] }), index < ERA_PHASES.length - 1 && (_jsx("div", { className: `timeline-connector ${isPast ? 'completed' : ''}` }))] }, phase.id));
                        }) })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { className: "journey-studio__phase-details", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "phase-details__header", children: [_jsx("span", { className: "phase-details__icon", children: currentPhaseData?.icon }), _jsx("h3", { className: "phase-details__title", children: currentPhaseData?.label })] }), _jsx("p", { className: "phase-details__description", children: currentPhaseData?.description[lens] }), _jsx("div", { className: "phase-details__explanation", children: currentPhaseData?.details[lens] })] }, currentPhase) }), _jsxs("div", { className: "journey-studio__examples", children: [_jsxs("h3", { className: "examples-title", children: [lens === 'individual' && 'Start a Journey', lens === 'professional' && 'Common Protocols', lens === 'organisation' && 'Service Pathways'] }), _jsx("div", { className: "examples-grid", children: exampleJourneys.map(journey => (_jsxs("button", { className: `journey-card ${selectedJourney === journey.name ? 'selected' : ''}`, onClick: () => setSelectedJourney(journey.name), children: [_jsxs("div", { className: "journey-card__header", children: [_jsx("h4", { className: "journey-card__name", children: journey.name }), _jsx("span", { className: "journey-card__duration", children: journey.duration })] }), _jsxs("div", { className: "journey-card__focus", children: [_jsx("span", { className: "focus-label", children: "Focus:" }), _jsx("span", { className: "focus-value", children: journey.focusArea })] }), selectedJourney === journey.name && (_jsx(motion.div, { className: "journey-card__checkmark", initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.2 }, children: "\u2713" }))] }, journey.name))) })] }), selectedJourney && (_jsx(motion.div, { className: "journey-studio__actions", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsxs("button", { className: "install-button", onClick: () => setShowInstaller(true), children: [_jsx("span", { className: "install-button__icon", children: "\uD83D\uDCE6" }), _jsxs("span", { className: "install-button__label", children: [lens === 'individual' && 'Install This Journey', lens === 'professional' && 'Assign to Client', lens === 'organisation' && 'Deploy Pathway'] })] }) })), _jsx(AnimatePresence, { children: showInstaller && (_jsx(motion.div, { className: "installer-modal", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, onClick: () => setShowInstaller(false), children: _jsxs(motion.div, { className: "installer-modal__content", initial: { scale: 0.9, y: 20 }, animate: { scale: 1, y: 0 }, exit: { scale: 0.9, y: 20 }, transition: { duration: 0.2 }, onClick: (e) => e.stopPropagation(), children: [_jsxs("h3", { className: "installer-modal__title", children: [lens === 'individual' && 'Ready to begin?', lens === 'professional' && 'Confirm assignment', lens === 'organisation' && 'Deploy pathway'] }), _jsxs("div", { className: "installer-modal__journey-info", children: [_jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Journey:" }), _jsx("span", { className: "info-value", children: selectedJourney })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Duration:" }), _jsx("span", { className: "info-value", children: exampleJourneys.find(j => j.name === selectedJourney)?.duration })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-label", children: "Check-ins:" }), _jsx("span", { className: "info-value", children: "Daily (takes 2-3 min)" })] })] }), _jsx("div", { className: "installer-modal__commitment", children: _jsxs("p", { className: "commitment-text", children: [lens === 'individual' && "You'll get daily reminders to check in. Skip days if you need to—this is about building awareness, not perfection.", lens === 'professional' && 'Client receives daily prompts. Mid-week review scheduled. Progress tracked automatically.', lens === 'organisation' && 'Automated deployment with daily engagement prompts. Analytics dashboard updates in real-time.'] }) }), _jsxs("div", { className: "installer-modal__actions", children: [_jsx("button", { className: "installer-action installer-action--secondary", onClick: () => setShowInstaller(false), children: "Cancel" }), _jsxs("button", { className: "installer-action installer-action--primary", onClick: handleInstallJourney, children: [lens === 'individual' && "Let's Go", lens === 'professional' && 'Assign Journey', lens === 'organisation' && 'Deploy Now'] })] })] }) })) })] }));
};

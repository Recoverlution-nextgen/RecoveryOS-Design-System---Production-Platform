import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NaviCueGallery.css';
const DEFAULT_CUES = [
    {
        id: 'breathe-now',
        name: 'Breathe Now',
        category: 'grounding',
        description: {
            individual: 'Quick breathing exercise to center yourself',
            professional: 'Guided breathing for client stabilization',
            organisation: 'Standardized grounding protocol',
        },
        contract: {
            individual: '2 minutes → calmer state',
            professional: 'Assign to client → tracked completion',
            organisation: 'Deploy to cohort → usage metrics',
        },
        duration: '2 min',
        icon: '🫁',
        color: '#3b82f6',
        featured: true,
    },
    {
        id: 'mood-check',
        name: 'Mood Check',
        category: 'moment',
        description: {
            individual: 'Quick emotional temperature reading',
            professional: 'Client self-report capture',
            organisation: 'Standardized mood tracking',
        },
        contract: {
            individual: '30 seconds → logged state',
            professional: 'Assign check-in → timestamped data',
            organisation: 'Deploy pulse → aggregated insights',
        },
        duration: '30 sec',
        icon: '🎭',
        color: '#8b5cf6',
        featured: true,
    },
    {
        id: 'gratitude-note',
        name: 'Gratitude Note',
        category: 'reflection',
        description: {
            individual: 'Capture something good from today',
            professional: 'Positive psychology micro-intervention',
            organisation: 'Evidence-based gratitude practice',
        },
        contract: {
            individual: '1 minute → saved moment',
            professional: 'Assign practice → completed proof',
            organisation: 'Deploy intervention → completion rate',
        },
        duration: '1 min',
        icon: '✨',
        color: '#f59e0b',
    },
    {
        id: 'five-senses',
        name: 'Five Senses',
        category: 'grounding',
        description: {
            individual: 'Ground through what you can sense right now',
            professional: 'Sensory grounding for dissociation',
            organisation: 'Evidence-based grounding technique',
        },
        contract: {
            individual: '3 minutes → grounded state',
            professional: 'Assign technique → tracked use',
            organisation: 'Deploy protocol → efficacy data',
        },
        duration: '3 min',
        icon: '👁️',
        color: '#10b981',
    },
    {
        id: 'worry-box',
        name: 'Worry Box',
        category: 'reflection',
        description: {
            individual: 'Set aside a worry for later review',
            professional: 'Anxiety management micro-tool',
            organisation: 'Standardized worry postponement',
        },
        contract: {
            individual: '2 minutes → contained worry',
            professional: 'Assign technique → logged concern',
            organisation: 'Deploy tool → usage patterns',
        },
        duration: '2 min',
        icon: '📦',
        color: '#ef4444',
    },
    {
        id: 'safe-person',
        name: 'Safe Person',
        category: 'connection',
        description: {
            individual: 'Quick message to someone you trust',
            professional: 'Support network activation',
            organisation: 'Crisis prevention via connection',
        },
        contract: {
            individual: '1 minute → sent message',
            professional: 'Assign outreach → contact logged',
            organisation: 'Deploy connection → engagement rate',
        },
        duration: '1 min',
        icon: '🤝',
        color: '#ec4899',
    },
    {
        id: 'values-compass',
        name: 'Values Compass',
        category: 'reflection',
        description: {
            individual: 'Check if current action aligns with your values',
            professional: 'Values clarification micro-exercise',
            organisation: 'Values-based decision support',
        },
        contract: {
            individual: '2 minutes → clarity check',
            professional: 'Assign reflection → values data',
            organisation: 'Deploy exercise → alignment metrics',
        },
        duration: '2 min',
        icon: '🧭',
        color: '#06b6d4',
    },
    {
        id: 'body-scan',
        name: 'Body Scan',
        category: 'grounding',
        description: {
            individual: 'Quick check-in with physical sensations',
            professional: 'Somatic awareness building',
            organisation: 'Mindfulness-based intervention',
        },
        contract: {
            individual: '3 minutes → body awareness',
            professional: 'Assign practice → completion proof',
            organisation: 'Deploy protocol → adherence data',
        },
        duration: '3 min',
        icon: '🧘',
        color: '#14b8a6',
    },
];
const CATEGORIES = [
    { id: 'all', label: 'All NaviCues', icon: '⭐' },
    { id: 'moment', label: 'Moment Checks', icon: '⚡' },
    { id: 'grounding', label: 'Grounding', icon: '🌱' },
    { id: 'reflection', label: 'Reflection', icon: '💭' },
    { id: 'connection', label: 'Connection', icon: '🔗' },
    { id: 'toolkit', label: 'Toolkit', icon: '🛠️' },
];
export const NaviCueGallery = ({ cues = DEFAULT_CUES, selectedCategory = 'all', lens = 'individual', onLaunch, onCategoryChange, className = '', }) => {
    const [expandedCue, setExpandedCue] = useState(null);
    const filteredCues = selectedCategory === 'all'
        ? cues
        : cues.filter(cue => cue.category === selectedCategory);
    const featuredCues = filteredCues.filter(cue => cue.featured);
    const regularCues = filteredCues.filter(cue => !cue.featured);
    const handleLaunch = (cueId) => {
        if (onLaunch) {
            onLaunch(cueId);
        }
    };
    const handleCategoryClick = (categoryId) => {
        if (onCategoryChange) {
            onCategoryChange(categoryId);
        }
    };
    const renderCueCard = (cue, featured = false) => {
        const isExpanded = expandedCue === cue.id;
        return (_jsxs(motion.div, { className: `navicue-card ${featured ? 'featured' : ''} ${isExpanded ? 'expanded' : ''}`, layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [_jsx("div", { className: "navicue-card__accent", style: { backgroundColor: cue.color } }), _jsxs("div", { className: "navicue-card__header", children: [_jsx("div", { className: "navicue-card__icon", children: cue.icon }), _jsxs("div", { className: "navicue-card__title-group", children: [_jsx("h3", { className: "navicue-card__title", children: cue.name }), _jsx("span", { className: "navicue-card__duration", children: cue.duration })] })] }), _jsx("p", { className: "navicue-card__description", children: cue.description[lens] }), _jsxs("div", { className: "navicue-card__contract", children: [_jsx("div", { className: "contract-label", children: "One-move contract:" }), _jsx("div", { className: "contract-value", children: cue.contract[lens] })] }), _jsx("button", { className: "navicue-card__details-toggle", onClick: () => setExpandedCue(isExpanded ? null : cue.id), children: isExpanded ? 'Less info' : 'More info' }), _jsx(AnimatePresence, { children: isExpanded && (_jsxs(motion.div, { className: "navicue-card__details", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, children: [_jsxs("div", { className: "details-section", children: [_jsx("h4", { className: "details-heading", children: "What happens" }), _jsx("p", { className: "details-text", children: "This NaviCue provides a structured micro-intervention designed for immediate use. No setup required\u2014just launch and complete." })] }), _jsxs("div", { className: "details-section", children: [_jsx("h4", { className: "details-heading", children: "What you get" }), _jsx("p", { className: "details-text", children: "A timestamped proof of completion, logged in your integrity trail. This becomes part of your recoverable evidence." })] })] })) }), _jsxs("button", { className: "navicue-card__launch", onClick: () => handleLaunch(cue.id), style: { borderColor: cue.color }, children: [_jsx("span", { className: "launch-icon", children: "\u25B6" }), _jsx("span", { className: "launch-label", children: lens === 'individual' ? 'Launch Now' : lens === 'professional' ? 'Assign' : 'Deploy' })] })] }, cue.id));
    };
    return (_jsxs("div", { className: `navicue-gallery ${className}`, children: [_jsxs("div", { className: "navicue-gallery__header", children: [_jsx("h2", { className: "navicue-gallery__title", children: "NaviCue Gallery" }), _jsxs("p", { className: "navicue-gallery__subtitle", children: [lens === 'individual' && 'Quick moves when you need them', lens === 'professional' && 'Micro-interventions you can assign', lens === 'organisation' && 'Available mini-apps for deployment'] })] }), _jsx("div", { className: "navicue-gallery__categories", children: CATEGORIES.map(category => (_jsxs("button", { className: `category-button ${selectedCategory === category.id ? 'active' : ''}`, onClick: () => handleCategoryClick(category.id), children: [_jsx("span", { className: "category-icon", children: category.icon }), _jsx("span", { className: "category-label", children: category.label })] }, category.id))) }), featuredCues.length > 0 && selectedCategory === 'all' && (_jsxs("div", { className: "navicue-gallery__section", children: [_jsx("h3", { className: "section-title", children: "Featured" }), _jsx("div", { className: "navicue-gallery__grid navicue-gallery__grid--featured", children: _jsx(AnimatePresence, { mode: "popLayout", children: featuredCues.map(cue => renderCueCard(cue, true)) }) })] })), _jsxs("div", { className: "navicue-gallery__section", children: [featuredCues.length > 0 && selectedCategory === 'all' && (_jsx("h3", { className: "section-title", children: "All NaviCues" })), _jsx("div", { className: "navicue-gallery__grid", children: _jsx(AnimatePresence, { mode: "popLayout", children: regularCues.map(cue => renderCueCard(cue, false)) }) })] }), filteredCues.length === 0 && (_jsx("div", { className: "navicue-gallery__empty", children: _jsx("p", { children: "No NaviCues available in this category." }) }))] }));
};

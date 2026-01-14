import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Handrail.css';
const DEFAULT_CONTACTS = [
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
        value: 'stable',
        label: 'Stable',
        icon: '🟢',
        description: {
            individual: "I'm okay right now",
            professional: 'Client reports stability',
            organisation: 'System operating normally',
        },
    },
    {
        value: 'concerned',
        label: 'Concerned',
        icon: '🟡',
        description: {
            individual: 'Starting to struggle',
            professional: 'Client showing early warning signs',
            organisation: 'Elevated risk indicators',
        },
    },
    {
        value: 'urgent',
        label: 'Urgent',
        icon: '🟠',
        description: {
            individual: 'Need help soon',
            professional: 'Client needs immediate support',
            organisation: 'Critical intervention needed',
        },
    },
    {
        value: 'crisis',
        label: 'Crisis',
        icon: '🔴',
        description: {
            individual: 'In crisis right now',
            professional: 'Client in active crisis',
            organisation: 'Emergency response required',
        },
    },
];
export const Handrail = ({ currentLevel = 'stable', lens = 'individual', contacts = DEFAULT_CONTACTS, onContactSelect, onLevelChange, isExpanded: controlledExpanded, onToggle, className = '', }) => {
    const [internalExpanded, setInternalExpanded] = useState(false);
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        }
        else {
            setInternalExpanded(!internalExpanded);
        }
    };
    const handleLevelSelect = (level) => {
        if (onLevelChange) {
            onLevelChange(level);
        }
    };
    const handleContactClick = (contactId) => {
        if (onContactSelect) {
            onContactSelect(contactId);
        }
    };
    const currentLevelData = SAFETY_LEVELS.find(l => l.value === currentLevel);
    const crisisContacts = contacts.filter(c => c.type === 'crisis' || c.type === 'emergency');
    const supportContacts = contacts.filter(c => c.type === 'support' || c.type === 'clinician');
    return (_jsxs("div", { className: `handrail ${isExpanded ? 'expanded' : 'collapsed'} ${className}`, children: [!isExpanded && (_jsxs("button", { className: "handrail__tab", onClick: handleToggle, "aria-label": "Open safety resources", children: [_jsx("span", { className: "handrail__tab-icon", children: "\uD83D\uDEDF" }), _jsx("span", { className: "handrail__tab-label", children: "Safety" })] })), _jsx(AnimatePresence, { children: isExpanded && (_jsxs(motion.div, { className: "handrail__panel", initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { duration: 0.3, ease: 'easeInOut' }, children: [_jsxs("div", { className: "handrail__header", children: [_jsxs("div", { className: "handrail__title-group", children: [_jsx("span", { className: "handrail__icon", children: "\uD83D\uDEDF" }), _jsx("h2", { className: "handrail__title", children: "Safety Resources" })] }), _jsx("button", { className: "handrail__close", onClick: handleToggle, "aria-label": "Close safety panel", children: "\u2715" })] }), _jsxs("div", { className: "handrail__current-level", children: [_jsxs("div", { className: "current-level__header", children: [_jsx("span", { className: "current-level__label", children: "Current status:" }), _jsxs("span", { className: "current-level__value", children: [_jsx("span", { className: "current-level__icon", children: currentLevelData?.icon }), currentLevelData?.label] })] }), _jsx("p", { className: "current-level__description", children: currentLevelData?.description[lens] })] }), _jsxs("div", { className: "handrail__section", children: [_jsx("h3", { className: "handrail__section-title", children: currentLevel === 'crisis' || currentLevel === 'urgent'
                                        ? 'Get Help Now'
                                        : 'Crisis Support (24/7)' }), _jsx("div", { className: "handrail__contacts", children: crisisContacts.map(contact => (_jsxs("button", { className: `contact-card ${contact.type === 'emergency' ? 'emergency' : 'crisis'}`, onClick: () => handleContactClick(contact.id), children: [_jsxs("div", { className: "contact-card__header", children: [_jsx("span", { className: "contact-card__name", children: contact.name }), _jsx("span", { className: "contact-card__badge", children: contact.available })] }), contact.phone && (_jsx("div", { className: "contact-card__phone", children: contact.phone })), _jsx("p", { className: "contact-card__description", children: contact.description })] }, contact.id))) })] }), _jsxs("div", { className: "handrail__section", children: [_jsx("h3", { className: "handrail__section-title", children: "Check Your Status" }), _jsx("div", { className: "handrail__levels", children: SAFETY_LEVELS.map(level => (_jsxs("button", { className: `level-button ${currentLevel === level.value ? 'active' : ''}`, onClick: () => handleLevelSelect(level.value), children: [_jsx("span", { className: "level-button__icon", children: level.icon }), _jsxs("div", { className: "level-button__content", children: [_jsx("span", { className: "level-button__label", children: level.label }), _jsx("span", { className: "level-button__description", children: level.description[lens] })] })] }, level.value))) })] }), supportContacts.length > 0 && (_jsxs("div", { className: "handrail__section", children: [_jsx("h3", { className: "handrail__section-title", children: "Additional Support" }), _jsx("div", { className: "handrail__contacts", children: supportContacts.map(contact => (_jsxs("button", { className: "contact-card support", onClick: () => handleContactClick(contact.id), children: [_jsxs("div", { className: "contact-card__header", children: [_jsx("span", { className: "contact-card__name", children: contact.name }), _jsx("span", { className: "contact-card__badge", children: contact.available })] }), contact.phone && (_jsx("div", { className: "contact-card__phone", children: contact.phone })), _jsx("p", { className: "contact-card__description", children: contact.description })] }, contact.id))) })] })), _jsx("div", { className: "handrail__footer", children: _jsxs("p", { className: "handrail__note", children: [lens === 'individual' && 'Your safety matters. These resources are always here when you need them.', lens === 'professional' && 'Clinical safety protocols. Document all crisis interventions.', lens === 'organisation' && 'System-wide safety infrastructure. All contacts verified and monitored.'] }) })] })) })] }));
};

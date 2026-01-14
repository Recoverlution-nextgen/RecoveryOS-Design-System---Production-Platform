import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import './ConsentMap.css';
const defaultVisibility = [
    { id: 'energy-state', category: 'see', label: 'Energy patterns', granted: true },
    { id: 'clarity-state', category: 'see', label: 'Clarity signals', granted: true },
    { id: 'baseline', category: 'see', label: 'Baseline data', granted: true },
    { id: 'location', category: 'see', label: 'Location data', granted: false },
];
const defaultSharing = [
    { id: 'suggest-moves', category: 'do', label: 'Suggest interventions', granted: true },
    { id: 'auto-log', category: 'do', label: 'Auto-log receipts', granted: true },
    { id: 'share-clinician', category: 'do', label: 'Share with clinician', granted: false },
    { id: 'share-research', category: 'do', label: 'Share anonymized data', granted: false },
];
const defaultAsk = [
    { id: 'check-in', category: 'ask', label: 'Daily check-ins', granted: true },
    { id: 'drift-alert', category: 'ask', label: 'Drift notifications', granted: true },
    { id: 'escalation', category: 'ask', label: 'Escalation prompts', granted: true, locked: true },
    { id: 'feedback', category: 'ask', label: 'Feedback requests', granted: false },
];
export const ConsentMap = ({ visibilityLevels = defaultVisibility, sharingOptions = defaultSharing, askPermissions = defaultAsk, lens = 'individual', onConsentChange, showDetails = false, }) => {
    const [items, setItems] = useState([
        ...visibilityLevels,
        ...sharingOptions,
        ...askPermissions,
    ]);
    const handleToggle = (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (item?.locked)
            return;
        setItems(prev => prev.map(i => i.id === itemId ? { ...i, granted: !i.granted } : i));
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
    const getItemsByCategory = (category) => items.filter(item => item.category === category);
    return (_jsxs("div", { className: `consent-map consent-map--${lens}`, children: [_jsxs("div", { className: "consent-map__header", children: [_jsx("h3", { className: "consent-map__title", children: copy.title }), _jsx("p", { className: "consent-map__subtitle", children: copy.subtitle })] }), _jsxs("div", { className: "consent-map__grid", children: [_jsxs("div", { className: "consent-map__section", children: [_jsxs("h4", { className: "consent-map__section-title", children: [_jsx("span", { className: "consent-map__section-icon", children: "\uD83D\uDC41" }), copy.seeLabel] }), _jsx("div", { className: "consent-map__items", children: getItemsByCategory('see').map((item, i) => (_jsxs(motion.div, { className: `consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`, initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: i * 0.05 }, children: [_jsxs("button", { className: "consent-map__toggle", onClick: () => handleToggle(item.id), disabled: item.locked, "aria-label": `${item.granted ? 'Revoke' : 'Grant'} ${item.label}`, children: [_jsx("span", { className: "consent-map__checkbox", children: item.granted ? '✓' : '○' }), _jsx("span", { className: "consent-map__label", children: item.label }), item.locked && (_jsx("span", { className: "consent-map__lock", title: copy.lockedHint, children: "\uD83D\uDD12" }))] }), showDetails && item.description && (_jsx("p", { className: "consent-map__description", children: item.description }))] }, item.id))) })] }), _jsxs("div", { className: "consent-map__section", children: [_jsxs("h4", { className: "consent-map__section-title", children: [_jsx("span", { className: "consent-map__section-icon", children: "\u26A1" }), copy.doLabel] }), _jsx("div", { className: "consent-map__items", children: getItemsByCategory('do').map((item, i) => (_jsxs(motion.div, { className: `consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`, initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + i * 0.05 }, children: [_jsxs("button", { className: "consent-map__toggle", onClick: () => handleToggle(item.id), disabled: item.locked, "aria-label": `${item.granted ? 'Revoke' : 'Grant'} ${item.label}`, children: [_jsx("span", { className: "consent-map__checkbox", children: item.granted ? '✓' : '○' }), _jsx("span", { className: "consent-map__label", children: item.label }), item.locked && (_jsx("span", { className: "consent-map__lock", title: copy.lockedHint, children: "\uD83D\uDD12" }))] }), showDetails && item.description && (_jsx("p", { className: "consent-map__description", children: item.description }))] }, item.id))) })] }), _jsxs("div", { className: "consent-map__section", children: [_jsxs("h4", { className: "consent-map__section-title", children: [_jsx("span", { className: "consent-map__section-icon", children: "\uD83D\uDCAC" }), copy.askLabel] }), _jsx("div", { className: "consent-map__items", children: getItemsByCategory('ask').map((item, i) => (_jsxs(motion.div, { className: `consent-map__item ${item.granted ? 'consent-map__item--granted' : ''} ${item.locked ? 'consent-map__item--locked' : ''}`, initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + i * 0.05 }, children: [_jsxs("button", { className: "consent-map__toggle", onClick: () => handleToggle(item.id), disabled: item.locked, "aria-label": `${item.granted ? 'Revoke' : 'Grant'} ${item.label}`, children: [_jsx("span", { className: "consent-map__checkbox", children: item.granted ? '✓' : '○' }), _jsx("span", { className: "consent-map__label", children: item.label }), item.locked && (_jsx("span", { className: "consent-map__lock", title: copy.lockedHint, children: "\uD83D\uDD12" }))] }), showDetails && item.description && (_jsx("p", { className: "consent-map__description", children: item.description }))] }, item.id))) })] })] })] }));
};

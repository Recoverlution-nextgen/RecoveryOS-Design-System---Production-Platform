import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConductorView.css';
export const ConductorView = ({ signals = ['energy', 'clarity'], inputsVisible = 'minimal', whyDrawer = false, governanceOverlay = false, lens = 'individual', state = 'routing', routedMove = {
    target: 'Arousal regulation',
    mechanism: 'Parasympathetic activation',
    primitive: 'Breathwork',
    dose: '10s',
}, governance = {
    consentBoundaries: ['Breathwork', 'Reflection', 'Movement'],
    quietHours: false,
    escalationReady: true,
}, }) => {
    const [whyDrawerOpen, setWhyDrawerOpen] = useState(whyDrawer);
    const getSignalLabel = (signal) => {
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
    return (_jsxs("div", { className: `conductor-view conductor-view--${lens} conductor-view--${state}`, children: [_jsx("div", { className: "conductor-view__header", children: _jsxs(motion.div, { className: "conductor-view__title-container", initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, children: [state === 'routing' && (_jsx(motion.div, { className: "conductor-view__routing-icon", animate: {
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }, transition: {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }, children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: [_jsx("path", { d: "M12 2L12 12M12 12L22 12M12 12L12 22M12 12L2 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "12", r: "3", fill: "currentColor" })] }) })), _jsx("h3", { className: "conductor-view__title", children: copy.title })] }) }), inputsVisible && (_jsxs(motion.div, { className: `conductor-view__signals conductor-view__signals--${inputsVisible}`, initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: [_jsx("div", { className: "conductor-view__signals-label", children: "Inputs" }), _jsx("div", { className: "conductor-view__signals-list", children: signals.map((signal, i) => (_jsx(motion.div, { className: "conductor-view__signal-chip", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.1 + i * 0.05 }, children: getSignalLabel(signal) }, signal))) })] })), governanceOverlay && governance && (_jsxs(motion.div, { className: "conductor-view__governance", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, children: [_jsx("div", { className: "conductor-view__governance-label", children: copy.governanceLabel }), _jsxs("div", { className: "conductor-view__governance-items", children: [governance.consentBoundaries && (_jsxs("div", { className: "conductor-view__governance-item", children: [_jsx("span", { className: "conductor-view__governance-icon", children: "\u2713" }), _jsxs("span", { className: "conductor-view__governance-text", children: ["Consent: ", governance.consentBoundaries.join(', ')] })] })), governance.quietHours !== undefined && (_jsxs("div", { className: "conductor-view__governance-item", children: [_jsx("span", { className: "conductor-view__governance-icon", children: governance.quietHours ? '🌙' : '☀️' }), _jsx("span", { className: "conductor-view__governance-text", children: governance.quietHours ? 'Quiet hours active' : 'Active hours' })] })), governance.escalationReady !== undefined && (_jsxs("div", { className: "conductor-view__governance-item", children: [_jsx("span", { className: "conductor-view__governance-icon", children: governance.escalationReady ? '✓' : '○' }), _jsxs("span", { className: "conductor-view__governance-text", children: ["Escalation: ", governance.escalationReady ? 'Ready' : 'Not configured'] })] }))] })] })), _jsxs(motion.div, { className: "conductor-view__routed", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3, type: 'spring', bounce: 0.2 }, children: [_jsxs("div", { className: "conductor-view__routed-header", children: [_jsx("span", { className: "conductor-view__routed-label", children: copy.routedLabel }), state === 'routing' && (_jsx(motion.div, { className: "conductor-view__routed-pulse", animate: {
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.05, 1],
                                }, transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                } }))] }), _jsxs("div", { className: "conductor-view__routed-card", children: [_jsxs("div", { className: "conductor-view__routed-row", children: [_jsx("span", { className: "conductor-view__routed-key", children: "Target:" }), _jsx("span", { className: "conductor-view__routed-value", children: routedMove.target })] }), _jsxs("div", { className: "conductor-view__routed-row", children: [_jsx("span", { className: "conductor-view__routed-key", children: "Mechanism:" }), _jsx("span", { className: "conductor-view__routed-value", children: routedMove.mechanism })] }), _jsxs("div", { className: "conductor-view__routed-row", children: [_jsx("span", { className: "conductor-view__routed-key", children: "Primitive:" }), _jsx("span", { className: "conductor-view__routed-value conductor-view__routed-value--primary", children: routedMove.primitive })] }), _jsxs("div", { className: "conductor-view__routed-row", children: [_jsx("span", { className: "conductor-view__routed-key", children: "Dose:" }), _jsx("span", { className: "conductor-view__routed-value", children: routedMove.dose })] })] }), _jsxs("button", { className: "conductor-view__why-button", onClick: () => setWhyDrawerOpen(!whyDrawerOpen), children: [copy.whyButton, _jsx(motion.span, { className: "conductor-view__why-arrow", animate: { rotate: whyDrawerOpen ? 180 : 0 }, transition: { duration: 0.2 }, children: "\u25BC" })] })] }), _jsx(AnimatePresence, { children: whyDrawerOpen && (_jsx(motion.div, { className: "conductor-view__why-drawer", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "conductor-view__why-content", children: [_jsx("h4", { className: "conductor-view__why-title", children: "Routing logic" }), _jsxs("div", { className: "conductor-view__why-steps", children: [_jsxs("div", { className: "conductor-view__why-step", children: [_jsx("span", { className: "conductor-view__why-number", children: "1" }), _jsxs("span", { className: "conductor-view__why-text", children: ["Detected signals: ", signals.map(s => getSignalLabel(s)).join(', ')] })] }), _jsxs("div", { className: "conductor-view__why-step", children: [_jsx("span", { className: "conductor-view__why-number", children: "2" }), _jsxs("span", { className: "conductor-view__why-text", children: ["Matched target: ", routedMove.target] })] }), _jsxs("div", { className: "conductor-view__why-step", children: [_jsx("span", { className: "conductor-view__why-number", children: "3" }), _jsxs("span", { className: "conductor-view__why-text", children: ["Selected primitive: ", routedMove.primitive, " (within consent boundaries)"] })] }), _jsxs("div", { className: "conductor-view__why-step", children: [_jsx("span", { className: "conductor-view__why-number", children: "4" }), _jsxs("span", { className: "conductor-view__why-text", children: ["Calculated dose: ", routedMove.dose, " (based on baseline + drift)"] })] })] }), lens === 'organisation' && (_jsxs("div", { className: "conductor-view__why-audit", children: [_jsx("span", { className: "conductor-view__why-audit-label", children: "Audit ID:" }), _jsxs("span", { className: "conductor-view__why-audit-id", children: ["route-", Date.now(), "-", Math.random().toString(36).substr(2, 9)] })] }))] }) })) })] }));
};

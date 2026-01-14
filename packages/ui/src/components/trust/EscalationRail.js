import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import './EscalationRail.css';
export const EscalationRail = ({ currentLevel = 'self', handoffTypes = ['peer', 'clinician', 'crisis'], supportGraphEnabled = true, consentGate = true, lens = 'individual', onEscalate, onHandoff, }) => {
    const levels = ['self', 'tighten', 'switch', 'handoff'];
    const getLevelCopy = (level) => {
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
    const getHandoffLabel = (type) => {
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
    return (_jsxs("div", { className: `escalation-rail escalation-rail--${lens}`, children: [_jsxs("div", { className: "escalation-rail__header", children: [_jsx("h3", { className: "escalation-rail__title", children: copy.title }), _jsx("p", { className: "escalation-rail__subtitle", children: copy.subtitle })] }), _jsx("div", { className: "escalation-rail__levels", children: levels.map((level, i) => {
                    const levelCopy = getLevelCopy(level);
                    const isActive = i === currentIndex;
                    const isPassed = i < currentIndex;
                    const isAvailable = i <= currentIndex + 1;
                    return (_jsxs(motion.button, { className: `escalation-rail__level ${isActive ? 'escalation-rail__level--active' : ''} ${isPassed ? 'escalation-rail__level--passed' : ''} ${!isAvailable ? 'escalation-rail__level--disabled' : ''}`, onClick: () => isAvailable && onEscalate?.(level), disabled: !isAvailable, initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, children: [_jsxs("div", { className: "escalation-rail__level-indicator", children: [_jsx("span", { className: "escalation-rail__level-number", children: i + 1 }), isActive && (_jsx(motion.div, { className: "escalation-rail__level-pulse", animate: {
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        } }))] }), _jsxs("div", { className: "escalation-rail__level-content", children: [_jsx("h4", { className: "escalation-rail__level-label", children: levelCopy.label }), _jsx("p", { className: "escalation-rail__level-description", children: levelCopy.description })] })] }, level));
                }) }), currentLevel === 'handoff' && (_jsxs(motion.div, { className: "escalation-rail__handoff", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "escalation-rail__handoff-header", children: [_jsx("h4", { className: "escalation-rail__handoff-title", children: copy.handoffTitle }), consentGate && (_jsx("span", { className: "escalation-rail__consent-badge", children: copy.consentNote }))] }), _jsx("div", { className: "escalation-rail__handoff-options", children: handoffTypes.map((type, i) => (_jsxs(motion.button, { className: "escalation-rail__handoff-button", onClick: () => onHandoff?.(type), initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + i * 0.05 }, children: [_jsxs("span", { className: "escalation-rail__handoff-icon", children: [type === 'peer' && '👥', type === 'clinician' && '🩺', type === 'crisis' && '🚨'] }), _jsx("span", { className: "escalation-rail__handoff-label", children: getHandoffLabel(type) })] }, type))) })] })), supportGraphEnabled && (_jsxs("div", { className: "escalation-rail__graph", children: [_jsx("div", { className: "escalation-rail__graph-label", children: "Escalation readiness" }), _jsx("div", { className: "escalation-rail__graph-bar", children: levels.map((level, i) => (_jsx(motion.div, { className: `escalation-rail__graph-segment ${i <= currentIndex ? 'escalation-rail__graph-segment--active' : ''}`, initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: 0.2 + i * 0.1, duration: 0.3 }, style: { flex: 1 } }, level))) })] }))] }));
};

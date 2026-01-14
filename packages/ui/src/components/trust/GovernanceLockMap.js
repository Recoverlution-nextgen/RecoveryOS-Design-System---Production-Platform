import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import './GovernanceLockMap.css';
const lockedItems = [
    { id: 'loop-structure', level: 'locked', label: 'Loop structure', description: 'Sense → Route → Deliver → Seal' },
    { id: 'consent-model', level: 'locked', label: 'Consent model', description: 'First-class UI, not compliance' },
    { id: 'escalation', level: 'locked', label: 'Escalation protocols', description: 'Clean handoff by protocol' },
    { id: 'proof-ids', level: 'locked', label: 'Proof object IDs', description: 'Permanent trace identifiers' },
];
const controlledItems = [
    { id: 'primitives', level: 'controlled', label: 'Primitives', description: 'Breathwork, Reflection, Movement' },
    { id: 'targeting', level: 'controlled', label: 'Targeting logic', description: 'Evidence-based mechanisms' },
    { id: 'routing', level: 'controlled', label: 'Routing rules', description: 'LUMA orchestration' },
    { id: 'dosing', level: 'controlled', label: 'Dose calculation', description: 'Duration + frequency' },
];
const expandableItems = [
    { id: 'labels', level: 'expandable', label: 'Labels & copy', description: 'Lens-specific language' },
    { id: 'ui-themes', level: 'expandable', label: 'UI themes', description: 'Calm/Heat visual modes' },
    { id: 'integrations', level: 'expandable', label: 'Integrations', description: 'External APIs' },
    { id: 'extensions', level: 'expandable', label: 'Extensions', description: 'Custom modules' },
];
export const GovernanceLockMap = ({ showExamples = true, showIdStability = true, lens = 'individual', }) => {
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
    return (_jsxs("div", { className: `governance-lock-map governance-lock-map--${lens}`, children: [_jsxs("div", { className: "governance-lock-map__header", children: [_jsx("h3", { className: "governance-lock-map__title", children: copy.title }), _jsx("p", { className: "governance-lock-map__subtitle", children: copy.subtitle })] }), _jsxs("div", { className: "governance-lock-map__rings", children: [_jsxs(motion.div, { className: "governance-lock-map__ring governance-lock-map__ring--locked", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.1 }, children: [_jsxs("div", { className: "governance-lock-map__ring-header", children: [_jsx("span", { className: "governance-lock-map__ring-icon", children: "\uD83D\uDD12" }), _jsx("h4", { className: "governance-lock-map__ring-title", children: copy.lockedLabel })] }), showExamples && (_jsx("div", { className: "governance-lock-map__items", children: lockedItems.map((item, i) => (_jsxs(motion.div, { className: "governance-lock-map__item", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + i * 0.05 }, children: [_jsx("span", { className: "governance-lock-map__item-label", children: item.label }), item.description && (_jsx("span", { className: "governance-lock-map__item-description", children: item.description }))] }, item.id))) }))] }), _jsxs(motion.div, { className: "governance-lock-map__ring governance-lock-map__ring--controlled", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, children: [_jsxs("div", { className: "governance-lock-map__ring-header", children: [_jsx("span", { className: "governance-lock-map__ring-icon", children: "\uD83D\uDD10" }), _jsx("h4", { className: "governance-lock-map__ring-title", children: copy.controlledLabel })] }), showExamples && (_jsx("div", { className: "governance-lock-map__items", children: controlledItems.map((item, i) => (_jsxs(motion.div, { className: "governance-lock-map__item", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + i * 0.05 }, children: [_jsx("span", { className: "governance-lock-map__item-label", children: item.label }), item.description && (_jsx("span", { className: "governance-lock-map__item-description", children: item.description }))] }, item.id))) }))] }), _jsxs(motion.div, { className: "governance-lock-map__ring governance-lock-map__ring--expandable", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 }, children: [_jsxs("div", { className: "governance-lock-map__ring-header", children: [_jsx("span", { className: "governance-lock-map__ring-icon", children: "\uD83D\uDD13" }), _jsx("h4", { className: "governance-lock-map__ring-title", children: copy.expandableLabel })] }), showExamples && (_jsx("div", { className: "governance-lock-map__items", children: expandableItems.map((item, i) => (_jsxs(motion.div, { className: "governance-lock-map__item", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + i * 0.05 }, children: [_jsx("span", { className: "governance-lock-map__item-label", children: item.label }), item.description && (_jsx("span", { className: "governance-lock-map__item-description", children: item.description }))] }, item.id))) }))] })] }), showIdStability && (_jsxs(motion.div, { className: "governance-lock-map__principle", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: [_jsx("div", { className: "governance-lock-map__principle-icon", children: "\uD83D\uDC8E" }), _jsx("p", { className: "governance-lock-map__principle-text", children: copy.stabilityNote })] }))] }));
};

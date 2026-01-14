import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject } from '../trace/TraceObject';
import './ReceiptForge.css';
export const ReceiptForge = ({ preState, postState, note, targetMeta, grip = 'anchor', duration = 10, lens = 'individual', onSeal, onDismiss, }) => {
    const [state, setState] = useState('draft');
    const [sealedTrace, setSealedTrace] = useState(null);
    const handleSeal = async () => {
        setState('sealing');
        // Seal animation duration
        await new Promise(resolve => setTimeout(resolve, 800));
        // Generate trace
        const trace = generateTrace({
            preState,
            postState,
            note,
            targetMeta,
            grip,
            duration,
            lens,
        });
        setSealedTrace(trace);
        setState('sealed');
        onSeal?.(trace);
    };
    const handleDismiss = () => {
        onDismiss?.();
    };
    const getCopy = () => {
        switch (lens) {
            case 'individual':
                return {
                    title: 'Save as Trace?',
                    subtitle: 'Optional — one tap to seal this moment.',
                    sealButton: 'Seal',
                    skipButton: 'Skip',
                    sealing: 'Sealing...',
                    sealed: 'Sealed.',
                    note: note || 'Breathed through it.',
                };
            case 'professional':
                return {
                    title: 'Create Receipt?',
                    subtitle: 'Forge proof object for clinical continuity.',
                    sealButton: 'Forge Receipt',
                    skipButton: 'Skip',
                    sealing: 'Forging receipt...',
                    sealed: 'Receipt created.',
                    note: note || 'Arousal regulation maintained.',
                };
            case 'organisation':
                return {
                    title: 'Log Execution?',
                    subtitle: 'Generate integrity proof for audit trail.',
                    sealButton: 'Generate Proof',
                    skipButton: 'Skip',
                    sealing: 'Generating proof...',
                    sealed: 'Proof logged.',
                    note: note || 'Protocol executed.',
                };
        }
    };
    const copy = getCopy();
    return (_jsx("div", { className: `receipt-forge receipt-forge--${state} receipt-forge--${lens}`, children: _jsxs(AnimatePresence, { mode: "wait", children: [state === 'draft' && (_jsx(motion.div, { className: "receipt-forge__draft", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "receipt-forge__draft-card", children: [_jsxs("div", { className: "receipt-forge__draft-header", children: [_jsx(motion.div, { className: "receipt-forge__draft-icon", animate: {
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1],
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [_jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5", strokeDasharray: "4 4" }), _jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.5" })] }) }), _jsxs("div", { className: "receipt-forge__draft-text", children: [_jsx("h3", { className: "receipt-forge__title", children: copy.title }), _jsx("p", { className: "receipt-forge__subtitle", children: copy.subtitle })] })] }), note && (_jsx("div", { className: "receipt-forge__note", children: _jsx("span", { className: "receipt-forge__note-text", children: copy.note }) })), (preState || postState) && (_jsxs("div", { className: "receipt-forge__states", children: [preState && _jsx("div", { className: "receipt-forge__state receipt-forge__state--pre", children: preState }), preState && postState && _jsx("div", { className: "receipt-forge__arrow", children: "\u2192" }), postState && _jsx("div", { className: "receipt-forge__state receipt-forge__state--post", children: postState })] })), targetMeta && lens !== 'individual' && (_jsxs("div", { className: "receipt-forge__meta", children: [targetMeta.target && _jsxs("span", { className: "receipt-forge__meta-item", children: ["Target: ", targetMeta.target] }), targetMeta.mechanism && _jsxs("span", { className: "receipt-forge__meta-item", children: ["Mechanism: ", targetMeta.mechanism] }), targetMeta.dose && _jsxs("span", { className: "receipt-forge__meta-item", children: ["Dose: ", targetMeta.dose] })] })), _jsxs("div", { className: "receipt-forge__actions", children: [_jsx("button", { className: "receipt-forge__button receipt-forge__button--seal", onClick: handleSeal, children: copy.sealButton }), _jsx("button", { className: "receipt-forge__button receipt-forge__button--skip", onClick: handleDismiss, children: copy.skipButton })] })] }) }, "draft")), state === 'sealing' && (_jsxs(motion.div, { className: "receipt-forge__sealing", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(motion.div, { className: "receipt-forge__seal-icon", animate: {
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }, transition: {
                                rotate: { duration: 0.8, ease: 'easeInOut' },
                                scale: { duration: 0.8, ease: 'easeInOut' },
                            }, children: _jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { cx: "12", cy: "12", r: "8", stroke: "currentColor", strokeWidth: "2" }), _jsx("path", { d: "M12 8l2.5 4.5L19 13l-3.5 3.5L16 21l-4-2.5L8 21l.5-4.5L5 13l4.5-.5L12 8z", fill: "currentColor" })] }) }), _jsx("p", { className: "receipt-forge__sealing-text", children: copy.sealing })] }, "sealing")), state === 'sealed' && sealedTrace && (_jsxs(motion.div, { className: "receipt-forge__sealed", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 }, children: [_jsxs("div", { className: "receipt-forge__sealed-header", children: [_jsx(motion.div, { className: "receipt-forge__sealed-stamp", initial: { scale: 0, rotate: -30 }, animate: { scale: 1, rotate: 0 }, transition: { duration: 0.5, type: 'spring', bounce: 0.4 }, children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M12 2l2.5 4.5L19 7l-3.5 3.5L16 15l-4-2.5L8 15l.5-4.5L5 7l4.5-.5L12 2z", fill: "currentColor" }) }) }), _jsx("span", { className: "receipt-forge__sealed-text", children: copy.sealed })] }), _jsx(TraceObject, { ...sealedTrace }), _jsx("button", { className: "receipt-forge__button receipt-forge__button--done", onClick: handleDismiss, children: "Done" })] }, "sealed"))] }) }));
};
// Helper to generate trace from forge data
function generateTrace({ preState, postState, note, targetMeta, grip, duration, lens, }) {
    const now = new Date();
    const traceId = `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const getCopy = () => {
        switch (lens) {
            case 'individual':
                return note || 'Breathed through the wave. Found my footing.';
            case 'professional':
                if (targetMeta?.target) {
                    return `Target: ${targetMeta.target} • Dose: ${duration}s • ${preState && postState ? `${preState} → ${postState}` : 'Protocol executed'}`;
                }
                return `Arousal regulation maintained • ${duration}s • ${note || 'Baseline restored'}`;
            case 'organisation':
                return `ID: ${traceId} | Consent: Granted | Protocol: ${grip.toUpperCase()} | Duration: ${duration}s | Logged: ${now.toISOString()}`;
        }
    };
    return {
        traceId,
        copy: getCopy(),
        grip: grip,
        duration,
        timestamp: now.toISOString(),
        lens,
    };
}

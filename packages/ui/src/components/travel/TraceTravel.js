import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TraceTravel — Same Trace → Three Altitudes
 *
 * Story Job: Show "receipt travels up the spine"
 *
 * Maps to: Same receipt, three meanings, one spine
 *          Individual (identity) → Professional (signal) → Organisation (integrity)
 *
 * Interaction:
 * - Toggle: LensControl switches view
 * - Scroll: Scroll position triggers transformation
 * - Auto: Animates through all three views
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject } from '../trace/TraceObject';
import './TraceTravel.css';
export const TraceTravel = ({ trace, trigger = 'toggle', defaultViewByLens = false, lens = 'individual', autoInterval = 3000, }) => {
    const [currentView, setCurrentView] = useState(() => {
        if (defaultViewByLens) {
            return lens === 'individual' ? 'me' : lens === 'professional' ? 'care' : 'system';
        }
        return 'me';
    });
    // Auto-cycle through views
    useEffect(() => {
        if (trigger === 'auto') {
            const views = ['me', 'care', 'system'];
            let index = 0;
            const interval = setInterval(() => {
                index = (index + 1) % views.length;
                setCurrentView(views[index]);
            }, autoInterval);
            return () => clearInterval(interval);
        }
    }, [trigger, autoInterval]);
    // Update view when lens changes (if controlled externally)
    useEffect(() => {
        if (trigger === 'toggle' && defaultViewByLens) {
            setCurrentView(lens === 'individual' ? 'me' : lens === 'professional' ? 'care' : 'system');
        }
    }, [lens, trigger, defaultViewByLens]);
    // Transform trace data per altitude
    const getTransformedTrace = (view) => {
        const base = { ...trace };
        switch (view) {
            case 'me':
                // Individual view: identity reinforcement
                return {
                    ...base,
                    copy: trace.copy, // Original felt language
                    metadata: {
                        ...trace.metadata,
                        // Hide technical details
                    },
                };
            case 'care':
                // Professional view: signal (what happened / what held / what next)
                return {
                    ...base,
                    copy: transformToCareSignal(trace),
                    metadata: {
                        ...trace.metadata,
                        // Add clinical context
                    },
                };
            case 'system':
                // Organisation view: integrity (consent + reliability)
                return {
                    ...base,
                    copy: transformToSystemIntegrity(trace),
                    metadata: {
                        ...trace.metadata,
                        // Add governance metadata
                    },
                };
        }
    };
    const handleViewToggle = (view) => {
        if (trigger === 'toggle') {
            setCurrentView(view);
        }
    };
    return (_jsxs("div", { className: "trace-travel", children: [trigger === 'toggle' && (_jsxs("div", { className: "trace-travel__selector", children: [_jsxs("button", { className: `trace-travel__view-button ${currentView === 'me' ? 'trace-travel__view-button--active' : ''}`, onClick: () => handleViewToggle('me'), children: [_jsx("span", { className: "trace-travel__view-icon", children: "\u25CF" }), _jsx("span", { className: "trace-travel__view-label", children: "Me" })] }), _jsxs("button", { className: `trace-travel__view-button ${currentView === 'care' ? 'trace-travel__view-button--active' : ''}`, onClick: () => handleViewToggle('care'), children: [_jsx("span", { className: "trace-travel__view-icon", children: "\u25C6" }), _jsx("span", { className: "trace-travel__view-label", children: "Care" })] }), _jsxs("button", { className: `trace-travel__view-button ${currentView === 'system' ? 'trace-travel__view-button--active' : ''}`, onClick: () => handleViewToggle('system'), children: [_jsx("span", { className: "trace-travel__view-icon", children: "\u25A0" }), _jsx("span", { className: "trace-travel__view-label", children: "System" })] })] })), _jsx("div", { className: "trace-travel__container", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { className: "trace-travel__trace", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                        }, children: _jsx(TraceObject, { ...getTransformedTrace(currentView), lens: currentView === 'me' ? 'individual' : currentView === 'care' ? 'professional' : 'organisation' }) }, currentView) }) }), _jsxs("div", { className: "trace-travel__spine", children: [_jsx(motion.div, { className: "trace-travel__spine-line", initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { duration: 0.6, delay: 0.2 } }), _jsx("div", { className: `trace-travel__spine-node trace-travel__spine-node--me ${currentView === 'me' ? 'trace-travel__spine-node--active' : ''}` }), _jsx("div", { className: `trace-travel__spine-node trace-travel__spine-node--care ${currentView === 'care' ? 'trace-travel__spine-node--active' : ''}` }), _jsx("div", { className: `trace-travel__spine-node trace-travel__spine-node--system ${currentView === 'system' ? 'trace-travel__spine-node--active' : ''}` })] }), trigger === 'auto' && (_jsxs("div", { className: "trace-travel__principle", children: [_jsxs("p", { className: "trace-travel__principle-text", children: ["Same ID: ", _jsx("code", { children: trace.id })] }), _jsx("p", { className: "trace-travel__principle-text", children: "Three interpretations" })] }))] }));
};
// Transform trace to Care signal
function transformToCareSignal(trace) {
    const { metadata } = trace;
    const signals = [];
    if (metadata?.gripType) {
        const gripLabels = {
            anchor: 'Arousal regulation',
            compass: 'Direction-finding',
            handrail: 'Sustained support',
        };
        signals.push(`Target: ${gripLabels[metadata.gripType]}`);
    }
    if (metadata?.duration) {
        signals.push(`Dose: ${metadata.duration < 60 ? `${metadata.duration}s` : `${Math.floor(metadata.duration / 60)}m`}`);
    }
    if (metadata?.driftLevel) {
        const driftLabels = {
            low: 'Stable',
            medium: 'Elevated',
            high: 'Critical',
        };
        signals.push(`Drift: ${driftLabels[metadata.driftLevel]}`);
    }
    return signals.join(' • ');
}
// Transform trace to System integrity
function transformToSystemIntegrity(trace) {
    const integrity = [];
    integrity.push(`ID: ${trace.id}`);
    integrity.push('Consent: Granted');
    integrity.push('Escalation: None');
    integrity.push('Reliability: 100%');
    integrity.push(`Logged: ${new Date(trace.timestamp).toISOString()}`);
    return integrity.join(' | ');
}

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * ContinuityDemo — Showcase of public language components
 * ReturnButton → GripGenerator → TraceObject → ThreadView → LensControl
 */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReturnButton } from '../components/return/ReturnButton';
import { GripGenerator } from '../components/grip/GripGenerator';
import { ThreadView } from '../components/thread/ThreadView';
import { LensControl } from '../components/lens/LensControl';
import './ContinuityDemo.css';
export const ContinuityDemo = () => {
    const [lens, setLens] = useState('individual');
    const [showGripGenerator, setShowGripGenerator] = useState(false);
    const [traces, setTraces] = useState([
        {
            id: '1',
            state: 'sealed',
            copy: 'Noticed the pattern. Breathed through it.',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            metadata: {
                gripType: 'anchor',
                duration: 10,
                driftLevel: 'low',
            },
        },
        {
            id: '2',
            state: 'sealed',
            copy: 'Felt the pull. Chose to stay present.',
            timestamp: new Date(Date.now() - 43200000).toISOString(),
            metadata: {
                gripType: 'compass',
                duration: 30,
                driftLevel: 'medium',
            },
        },
    ]);
    const handleReturnTap = () => {
        // Quick grip (default: Anchor 10s)
        handleGripComplete({
            direction: 'anchor',
            duration: 10,
        });
    };
    const handleReturnLongPress = () => {
        setShowGripGenerator(true);
    };
    const handleGripConfirm = (config) => {
        setShowGripGenerator(false);
        handleGripComplete(config);
    };
    const handleGripComplete = (config) => {
        // Simulate grip completion → save as Trace
        const newTrace = {
            id: String(Date.now()),
            state: 'sealed',
            copy: generateTraceCopy(config),
            timestamp: new Date().toISOString(),
            metadata: {
                gripType: config.direction,
                duration: config.duration,
                driftLevel: 'low',
            },
        };
        setTraces([newTrace, ...traces]);
    };
    const generateTraceCopy = (config) => {
        const copies = {
            anchor: [
                'Found my footing again.',
                'Settled into the moment.',
                'Grounded. Present. Here.',
            ],
            compass: [
                'Checked my bearing.',
                'Oriented toward what matters.',
                'Found my direction.',
            ],
            handrail: [
                'Held steady through it.',
                'Stayed with the discomfort.',
                'Made it through.',
            ],
        };
        const options = copies[config.direction];
        return options[Math.floor(Math.random() * options.length)];
    };
    return (_jsxs("div", { className: "continuity-demo", children: [_jsx("div", { className: "continuity-demo__lens", children: _jsx(LensControl, { value: lens, onChange: setLens }) }), _jsxs("section", { className: "continuity-demo__hero", children: [_jsxs("h1", { className: "continuity-demo__title", children: [lens === 'individual' && 'Your continuity layer', lens === 'professional' && 'Clinical continuity interface', lens === 'organisation' && 'Infrastructure dashboard'] }), _jsxs("p", { className: "continuity-demo__description", children: [lens === 'individual' && 'Small help, always there. Return when you need it.', lens === 'professional' && 'Evidence-based micro-intervention architecture supporting person-centered recovery.', lens === 'organisation' && 'Regulatory-grade delivery infrastructure with proof-of-care audit trail.'] })] }), _jsxs("div", { className: "continuity-demo__return", children: [_jsx(ReturnButton, { lens: lens, drift: "low", attention: "calm", onTap: handleReturnTap, onLongPress: handleReturnLongPress }), _jsxs("p", { className: "continuity-demo__hint", children: [lens === 'individual' && 'Tap for 10 seconds. Hold to choose.', lens === 'professional' && 'Quick tap: default grip. Long press: configure.', lens === 'organisation' && 'TAP=default sequence | HOLD=configuration'] })] }), _jsx(AnimatePresence, { children: showGripGenerator && (_jsxs(_Fragment, { children: [_jsx("div", { className: "continuity-demo__overlay", onClick: () => setShowGripGenerator(false) }), _jsx("div", { className: "continuity-demo__modal", children: _jsx(GripGenerator, { lens: lens, onConfirm: handleGripConfirm, onCancel: () => setShowGripGenerator(false) }) })] })) }), _jsx("div", { className: "continuity-demo__thread", children: _jsx(ThreadView, { traces: traces, state: "growing", lens: lens, week: "12" }) })] }));
};

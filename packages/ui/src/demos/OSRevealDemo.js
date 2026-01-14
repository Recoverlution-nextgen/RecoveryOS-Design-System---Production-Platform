import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * OSRevealDemo — "Feel → Understand → Trust → Scale"
 *
 * Demonstrates the four realities:
 * 1. It runs as a loop (LoopRunner)
 * 2. It has rooms and tempos (moment/week)
 * 3. It produces proof as objects (TraceTravel)
 * 4. It is safe at scale (trust surfaces preview)
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoopRunner } from '../components/loop/LoopRunner';
import { TraceTravel } from '../components/travel/TraceTravel';
import { LensControl } from '../components/lens/LensControl';
import './OSRevealDemo.css';
export const OSRevealDemo = () => {
    const [scene, setScene] = useState('intro');
    const [lens, setLens] = useState('individual');
    const [generatedTrace, setGeneratedTrace] = useState(null);
    const [isRunningLoop, setIsRunningLoop] = useState(false);
    const loopConfig = {
        intent: 'anchor',
        duration: 10,
        tempo: 'moment',
        depth: 'glance',
    };
    const handleRunLoop = () => {
        setIsRunningLoop(true);
        setScene('loop');
    };
    const handleLoopComplete = () => {
        setIsRunningLoop(false);
        setScene('proof');
    };
    const handleTraceCreated = (trace) => {
        setGeneratedTrace(trace);
    };
    const handleExploreTravel = () => {
        if (generatedTrace) {
            setScene('travel');
        }
    };
    return (_jsxs("div", { className: "os-reveal-demo", children: [_jsx("div", { className: "os-reveal-demo__lens", children: _jsx(LensControl, { value: lens, onChange: setLens, size: "comfortable" }) }), _jsx("div", { className: "os-reveal-demo__nav", children: ['intro', 'loop', 'proof', 'travel', 'trust'].map((s) => (_jsxs("button", { className: `os-reveal-demo__nav-button ${scene === s ? 'os-reveal-demo__nav-button--active' : ''}`, onClick: () => setScene(s), children: [s === 'intro' && '1. Feel', s === 'loop' && '2. Loop', s === 'proof' && '3. Proof', s === 'travel' && '4. Travel', s === 'trust' && '5. Trust'] }, s))) }), _jsx("div", { className: "os-reveal-demo__content", children: _jsxs(AnimatePresence, { mode: "wait", children: [scene === 'intro' && (_jsxs(motion.div, { className: "os-reveal-demo__scene os-reveal-demo__scene--intro", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsxs("h1", { className: "os-reveal-demo__title", children: [lens === 'individual' && 'RecoveryOS', lens === 'professional' && 'Clinical Delivery Infrastructure', lens === 'organisation' && 'Governed Recovery Platform'] }), _jsxs("p", { className: "os-reveal-demo__description", children: [lens === 'individual' && 'Small help, always there. Return when you need it.', lens === 'professional' && 'Evidence-based micro-intervention architecture supporting person-centered recovery.', lens === 'organisation' && 'Regulatory-grade delivery infrastructure with proof-of-care audit trail.'] }), _jsxs("button", { className: "os-reveal-demo__cta", onClick: handleRunLoop, children: [lens === 'individual' && 'See how it works', lens === 'professional' && 'Demonstrate loop', lens === 'organisation' && 'Execute protocol'] })] }, "intro")), scene === 'loop' && (_jsxs(motion.div, { className: "os-reveal-demo__scene os-reveal-demo__scene--loop", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, children: [_jsxs("div", { className: "os-reveal-demo__scene-header", children: [_jsxs("h2", { className: "os-reveal-demo__scene-title", children: [lens === 'individual' && 'The Loop', lens === 'professional' && 'OS Loop (Sense → Route → Deliver → Seal)', lens === 'organisation' && 'DELIVERY_LOOP_PROTOCOL'] }), _jsxs("p", { className: "os-reveal-demo__scene-subtitle", children: [lens === 'individual' && 'Watch what happens when you return', lens === 'professional' && 'Four-beat orchestration cycle', lens === 'organisation' && 'Governed micro-intervention sequence'] })] }), isRunningLoop && (_jsx(LoopRunner, { config: loopConfig, lens: lens, onReceiptCreate: handleTraceCreated, onComplete: handleLoopComplete })), !isRunningLoop && (_jsx("button", { className: "os-reveal-demo__cta", onClick: handleRunLoop, children: "Run again" }))] }, "loop")), scene === 'proof' && generatedTrace && (_jsxs(motion.div, { className: "os-reveal-demo__scene os-reveal-demo__scene--proof", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, children: [_jsxs("div", { className: "os-reveal-demo__scene-header", children: [_jsxs("h2", { className: "os-reveal-demo__scene-title", children: [lens === 'individual' && 'Proof, Made Tangible', lens === 'professional' && 'Receipt Object (TraceTile)', lens === 'organisation' && 'AUDIT_ARTIFACT'] }), _jsxs("p", { className: "os-reveal-demo__scene-subtitle", children: [lens === 'individual' && 'This moment is now part of your continuity', lens === 'professional' && 'Sealed receipt with metadata', lens === 'organisation' && 'Immutable proof object created'] })] }), _jsx("div", { className: "os-reveal-demo__trace-preview", children: _jsx(TraceObject, { ...generatedTrace, lens: lens }) }), _jsxs("button", { className: "os-reveal-demo__cta", onClick: handleExploreTravel, children: [lens === 'individual' && 'See how it travels', lens === 'professional' && 'Explore altitude transformation', lens === 'organisation' && 'View multi-level rendering'] })] }, "proof")), scene === 'travel' && generatedTrace && (_jsxs(motion.div, { className: "os-reveal-demo__scene os-reveal-demo__scene--travel", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, children: [_jsxs("div", { className: "os-reveal-demo__scene-header", children: [_jsxs("h2", { className: "os-reveal-demo__scene-title", children: [lens === 'individual' && 'Three Worlds, One Spine', lens === 'professional' && 'Receipt Travel (Altitude Transformation)', lens === 'organisation' && 'MULTI_ALTITUDE_RENDERING'] }), _jsxs("p", { className: "os-reveal-demo__scene-subtitle", children: [lens === 'individual' && 'Same moment, seen from three heights', lens === 'professional' && 'Same ID, three interpretations', lens === 'organisation' && 'Labels evolve. IDs don\'t.'] })] }), _jsx(TraceTravel, { trace: generatedTrace, trigger: "toggle", defaultViewByLens: false, lens: lens }), _jsxs("button", { className: "os-reveal-demo__cta", onClick: () => setScene('trust'), children: [lens === 'individual' && 'Explore trust & safety', lens === 'professional' && 'Review governance', lens === 'organisation' && 'Audit infrastructure'] })] }, "travel")), scene === 'trust' && (_jsxs(motion.div, { className: "os-reveal-demo__scene os-reveal-demo__scene--trust", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, children: [_jsxs("div", { className: "os-reveal-demo__scene-header", children: [_jsxs("h2", { className: "os-reveal-demo__scene-title", children: [lens === 'individual' && 'Safe at Scale', lens === 'professional' && 'Trust Infrastructure', lens === 'organisation' && 'GOVERNANCE_LAYER'] }), _jsxs("p", { className: "os-reveal-demo__scene-subtitle", children: [lens === 'individual' && 'Your boundaries, always respected', lens === 'professional' && 'Consent by design, escalation protocols', lens === 'organisation' && 'LOCKED / CONTROLLED / EXPANDABLE'] })] }), _jsxs("div", { className: "os-reveal-demo__trust-preview", children: [_jsxs("div", { className: "os-reveal-demo__trust-card", children: [_jsx("h3", { children: "Consent" }), _jsx("p", { children: "First-class UI, not compliance theater" })] }), _jsxs("div", { className: "os-reveal-demo__trust-card", children: [_jsx("h3", { children: "Escalation" }), _jsx("p", { children: "Clean handoff under drift, by protocol" })] }), _jsxs("div", { className: "os-reveal-demo__trust-card", children: [_jsx("h3", { children: "Integrity" }), _jsx("p", { children: "Auditable logs, defensibility metrics" })] }), _jsxs("div", { className: "os-reveal-demo__trust-card", children: [_jsx("h3", { children: "Governance" }), _jsx("p", { children: "Labels evolve. IDs don't." })] })] }), _jsx("button", { className: "os-reveal-demo__cta", onClick: () => setScene('intro'), children: "Start over" })] }, "trust"))] }) })] }));
};
// Re-import TraceObject to use in proof scene
import { TraceObject } from '../components/trace/TraceObject';

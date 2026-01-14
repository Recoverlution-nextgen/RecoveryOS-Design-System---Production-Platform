import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * LoopRunner — Demonstrate OS loop without teaching it
 *
 * Story Job: Show Sense → Route → Deliver → Seal as felt experience
 *
 * Maps to: The OS runs as a loop (Sense → Route → Deliver → Seal)
 *
 * Flow:
 * 1. Sense (120ms) — Input signals fade in
 * 2. Route (300ms) — Conductor animation shows "why this move"
 * 3. Deliver (variable) — Move executes (breath, orient, etc.)
 * 4. Seal (600ms) — Receipt forge → TraceTile appears
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject } from '../trace/TraceObject';
import './LoopRunner.css';
export const LoopRunner = ({ config, lens = 'individual', onReceiptCreate, onComplete, }) => {
    const [phase, setPhase] = useState('sensing');
    const [progress, setProgress] = useState(0);
    const [generatedTrace, setGeneratedTrace] = useState(null);
    // Phase timing
    const phaseDurations = {
        sensing: 120,
        routing: 300,
        delivering: config.duration * 1000,
        sealing: 600,
        sealed: 0,
    };
    // Start loop sequence
    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Sensing
            await wait(phaseDurations.sensing);
            setPhase('routing');
            // Phase 2: Routing
            await wait(phaseDurations.routing);
            setPhase('delivering');
            // Phase 3: Delivering (with progress)
            await waitWithProgress(phaseDurations.delivering, (p) => setProgress(p));
            setPhase('sealing');
            // Phase 4: Sealing
            await wait(phaseDurations.sealing);
            // Generate trace
            const trace = generateTrace(config, lens);
            setGeneratedTrace(trace);
            onReceiptCreate?.(trace);
            setPhase('sealed');
            await wait(1000);
            onComplete?.();
        };
        sequence();
    }, []);
    return (_jsxs("div", { className: `loop-runner loop-runner--${lens}`, children: [_jsxs("div", { className: "loop-runner__ring", children: [_jsx(motion.div, { className: `loop-runner__beat loop-runner__beat--sense ${phase === 'sensing' ? 'loop-runner__beat--active' : ''}`, animate: { opacity: phase === 'sensing' ? 1 : 0.3 }, children: _jsx("span", { className: "loop-runner__beat-label", children: "Sense" }) }), _jsx(motion.div, { className: `loop-runner__beat loop-runner__beat--route ${phase === 'routing' ? 'loop-runner__beat--active' : ''}`, animate: { opacity: phase === 'routing' ? 1 : 0.3 }, children: _jsx("span", { className: "loop-runner__beat-label", children: "Route" }) }), _jsx(motion.div, { className: `loop-runner__beat loop-runner__beat--deliver ${phase === 'delivering' ? 'loop-runner__beat--active' : ''}`, animate: { opacity: phase === 'delivering' ? 1 : 0.3 }, children: _jsx("span", { className: "loop-runner__beat-label", children: "Deliver" }) }), _jsx(motion.div, { className: `loop-runner__beat loop-runner__beat--seal ${phase === 'sealing' || phase === 'sealed' ? 'loop-runner__beat--active' : ''}`, animate: { opacity: phase === 'sealing' || phase === 'sealed' ? 1 : 0.3 }, children: _jsx("span", { className: "loop-runner__beat-label", children: "Seal" }) })] }), _jsx("div", { className: "loop-runner__center", children: _jsxs(AnimatePresence, { mode: "wait", children: [phase === 'sensing' && (_jsxs(motion.div, { className: "loop-runner__phase loop-runner__phase--sensing", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.1 }, transition: { duration: 0.12 }, children: [_jsx("div", { className: "loop-runner__icon", children: "\uD83D\uDC41\uFE0F" }), _jsxs("p", { className: "loop-runner__status", children: [lens === 'individual' && 'Noticing...', lens === 'professional' && 'Sensing state...', lens === 'organisation' && 'Signal acquisition...'] })] }, "sensing")), phase === 'routing' && (_jsxs(motion.div, { className: "loop-runner__phase loop-runner__phase--routing", initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.3 }, children: [_jsx("div", { className: "loop-runner__icon", children: "\uD83E\uDDED" }), _jsxs("p", { className: "loop-runner__status", children: [lens === 'individual' && 'Finding what helps...', lens === 'professional' && 'Routing intervention...', lens === 'organisation' && 'Protocol selection...'] }), _jsxs("div", { className: "loop-runner__contract", children: [_jsx("span", { className: "loop-runner__contract-label", children: getIntentLabel(config.intent, lens) }), _jsx("span", { className: "loop-runner__contract-duration", children: config.duration < 60 ? `${config.duration}s` : `${Math.floor(config.duration / 60)}m` })] })] }, "routing")), phase === 'delivering' && (_jsx(motion.div, { className: "loop-runner__phase loop-runner__phase--delivering", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, children: _jsxs("div", { className: "loop-runner__player", children: [_jsx(motion.div, { className: "loop-runner__breath-circle", animate: {
                                            scale: [1, 1.2, 1],
                                        }, transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        } }), _jsx("p", { className: "loop-runner__move-label", children: getMoveLabel(config.intent, lens) }), _jsx("div", { className: "loop-runner__progress", children: _jsx(motion.div, { className: "loop-runner__progress-bar", initial: { scaleX: 0 }, animate: { scaleX: progress / 100 }, transition: { duration: 0.1 } }) })] }) }, "delivering")), phase === 'sealing' && (_jsxs(motion.div, { className: "loop-runner__phase loop-runner__phase--sealing", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0.6 }, children: [_jsx(motion.div, { className: "loop-runner__seal-icon", initial: { rotate: 0, scale: 0 }, animate: { rotate: 360, scale: 1 }, transition: { duration: 0.6, ease: 'easeOut' }, children: "\u2B50" }), _jsxs("p", { className: "loop-runner__status", children: [lens === 'individual' && 'Sealing this moment...', lens === 'professional' && 'Creating receipt...', lens === 'organisation' && 'Logging proof...'] })] }, "sealing")), phase === 'sealed' && generatedTrace && (_jsx(motion.div, { className: "loop-runner__phase loop-runner__phase--sealed", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 }, children: _jsx(TraceObject, { ...generatedTrace, lens: lens }) }, "sealed"))] }) })] }));
};
// Utilities
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function waitWithProgress(ms, onProgress) {
    return new Promise(resolve => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / ms) * 100, 100);
            onProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}
function getIntentLabel(intent, lens) {
    const labels = {
        anchor: {
            individual: 'Settle the wave',
            professional: 'Arousal regulation',
            organisation: 'Grounding protocol',
        },
        clarity: {
            individual: 'Steady your mind',
            professional: 'Cognitive stabilization',
            organisation: 'Focus restoration',
        },
        connection: {
            individual: 'Repair/relate',
            professional: 'Attachment repair',
            organisation: 'Relational protocol',
        },
        direction: {
            individual: 'Find your way',
            professional: 'Values alignment',
            organisation: 'Direction protocol',
        },
    };
    return labels[intent][lens];
}
function getMoveLabel(intent, lens) {
    const moves = {
        anchor: {
            individual: 'Breathe with the rhythm',
            professional: 'Box breathing protocol',
            organisation: 'BREATH_4X4_PROTOCOL',
        },
        clarity: {
            individual: 'Notice without holding',
            professional: 'Mindful observation',
            organisation: 'OBSERVE_PROTOCOL',
        },
        connection: {
            individual: 'Remember someone who holds you',
            professional: 'Secure base visualization',
            organisation: 'ATTACHMENT_RECALL',
        },
        direction: {
            individual: 'What matters most right now?',
            professional: 'Values clarification',
            organisation: 'VALUES_PROTOCOL',
        },
    };
    return moves[intent][lens];
}
function generateTrace(config, lens) {
    const copies = {
        anchor: {
            individual: 'Found my footing again.',
            professional: 'Arousal regulation maintained under load.',
            organisation: 'Grounding protocol executed. State: stable.',
        },
        clarity: {
            individual: 'Mind settled. Present now.',
            professional: 'Cognitive stabilization achieved.',
            organisation: 'Focus restoration protocol completed.',
        },
        connection: {
            individual: 'Felt held. Not alone.',
            professional: 'Attachment repair sequence completed.',
            organisation: 'Relational protocol executed.',
        },
        direction: {
            individual: 'Know what matters. Moving toward it.',
            professional: 'Values alignment confirmed.',
            organisation: 'Direction protocol completed.',
        },
    };
    return {
        id: `trace-${Date.now()}`,
        state: 'sealed',
        copy: copies[config.intent][lens],
        timestamp: new Date().toISOString(),
        metadata: {
            gripType: config.intent === 'anchor' ? 'anchor' :
                config.intent === 'direction' ? 'compass' : 'handrail',
            duration: config.duration,
            driftLevel: 'low',
        },
    };
}

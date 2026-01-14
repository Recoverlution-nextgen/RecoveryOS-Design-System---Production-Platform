import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LensControl } from '../lens/LensControl';
import { LoopRunner } from '../loop/LoopRunner';
import { TraceTravel } from '../travel/TraceTravel';
import { ConductorView } from '../conductor/ConductorView';
import { ConsentMap } from '../trust/ConsentMap';
import { EscalationRail } from '../trust/EscalationRail';
import { IntegrityLogPreview } from '../trust/IntegrityLogPreview';
import { GovernanceLockMap } from '../trust/GovernanceLockMap';
import './RecoveryOSPortal.css';
export const RecoveryOSPortal = ({ initialRoom = 'moment', spineRailVisible = true, artifactRailVisible = true, skipEnabled = true, lens = 'individual', onLensChange, }) => {
    const [currentRoom, setCurrentRoom] = useState(initialRoom);
    const [portalState, setPortalState] = useState('idle');
    const [spineOpen, setSpineOpen] = useState(spineRailVisible);
    const [artifactOpen, setArtifactOpen] = useState(artifactRailVisible);
    const [artifacts, setArtifacts] = useState([]);
    const [currentLens, setCurrentLens] = useState(lens);
    const handleLensChange = (newLens) => {
        setCurrentLens(newLens);
        onLensChange?.(newLens);
    };
    const handleArtifactCreate = (trace) => {
        setArtifacts(prev => [trace, ...prev]);
    };
    const getCopy = () => {
        switch (currentLens) {
            case 'individual':
                return {
                    title: 'RecoveryOS',
                    subtitle: 'Small help, always there.',
                    skipLabel: 'Skip experience',
                    spineLabel: 'Framework',
                    artifactLabel: 'Your traces',
                };
            case 'professional':
                return {
                    title: 'Clinical Delivery Infrastructure',
                    subtitle: 'Evidence-based micro-intervention architecture.',
                    skipLabel: 'Skip demo',
                    spineLabel: 'Clinical spine',
                    artifactLabel: 'Delivery log',
                };
            case 'organisation':
                return {
                    title: 'RecoveryOS Platform',
                    subtitle: 'Regulatory-grade delivery infrastructure.',
                    skipLabel: 'Skip',
                    spineLabel: 'Architecture',
                    artifactLabel: 'Integrity log',
                };
        }
    };
    const copy = getCopy();
    const rooms = [
        {
            id: 'moment',
            label: currentLens === 'individual' ? 'Run a Moment' : currentLens === 'professional' ? 'NaviCue Simulator' : 'MOMENT_RUNNER',
            icon: '⚡',
            description: currentLens === 'individual' ? 'Feel the OS loop in 10 seconds' : currentLens === 'professional' ? 'Experience single-move intervention' : 'Execute protocol simulation',
        },
        {
            id: 'week',
            label: currentLens === 'individual' ? 'Install a Week' : currentLens === 'professional' ? 'Journey Simulator' : 'WEEKLY_INSTALL',
            icon: '📅',
            description: currentLens === 'individual' ? 'See baseline rhythms take root' : currentLens === 'professional' ? 'ERA cadence preview' : 'Baseline installation protocol',
        },
        {
            id: 'explore',
            label: currentLens === 'individual' ? 'Explore the Spine' : currentLens === 'professional' ? 'Framework Atlas' : 'SPINE_EXPLORER',
            icon: '🗺',
            description: currentLens === 'individual' ? 'Journey through the framework' : currentLens === 'professional' ? 'Pillars → Mindblocks navigation' : 'Architecture documentation',
        },
        {
            id: 'orchestration',
            label: currentLens === 'individual' ? 'See Orchestration' : currentLens === 'professional' ? 'LUMA Conductor' : 'ORCHESTRATION_VIEW',
            icon: '🎼',
            description: currentLens === 'individual' ? 'Watch routing happen, not AI' : currentLens === 'professional' ? 'Signal-driven routing logic' : 'Governance-first orchestration',
        },
        {
            id: 'trust',
            label: currentLens === 'individual' ? 'Trust & Safety' : currentLens === 'professional' ? 'Trust Surfaces' : 'TRUST_RAILS',
            icon: '🛡',
            description: currentLens === 'individual' ? 'Your consent, your boundaries' : currentLens === 'professional' ? 'Consent, escalation, integrity' : 'Governance infrastructure',
        },
    ];
    return (_jsxs("div", { className: `recovery-portal recovery-portal--${currentLens} recovery-portal--${portalState}`, children: [_jsx("div", { className: "recovery-portal__field", children: _jsx(motion.div, { className: "recovery-portal__field-gradient", animate: {
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.05, 1],
                    }, transition: {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    } }) }), _jsxs("div", { className: "recovery-portal__header", children: [_jsxs("div", { className: "recovery-portal__brand", children: [_jsx("h1", { className: "recovery-portal__title", children: copy.title }), _jsx("p", { className: "recovery-portal__subtitle", children: copy.subtitle })] }), _jsxs("div", { className: "recovery-portal__controls", children: [_jsx(LensControl, { lens: currentLens, onChange: handleLensChange }), skipEnabled && (_jsx("button", { className: "recovery-portal__skip", children: copy.skipLabel }))] })] }), _jsxs("div", { className: "recovery-portal__layout", children: [spineRailVisible && (_jsxs(motion.div, { className: `recovery-portal__spine-rail ${spineOpen ? 'recovery-portal__spine-rail--open' : ''}`, initial: false, animate: { width: spineOpen ? 280 : 48 }, transition: { duration: 0.3 }, children: [_jsx("button", { className: "recovery-portal__spine-toggle", onClick: () => setSpineOpen(!spineOpen), "aria-label": spineOpen ? 'Collapse spine' : 'Expand spine', children: spineOpen ? '◀' : '▶' }), _jsx(AnimatePresence, { children: spineOpen && (_jsxs(motion.div, { className: "recovery-portal__spine-content", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx("h3", { className: "recovery-portal__spine-title", children: copy.spineLabel }), _jsxs("div", { className: "recovery-portal__spine-tree", children: [_jsx("div", { className: "recovery-portal__spine-node", children: _jsx("span", { className: "recovery-portal__spine-node-label", children: "Pillars" }) }), _jsx("div", { className: "recovery-portal__spine-node recovery-portal__spine-node--indent", children: _jsx("span", { className: "recovery-portal__spine-node-label", children: "Concepts" }) }), _jsx("div", { className: "recovery-portal__spine-node recovery-portal__spine-node--indent-2", children: _jsx("span", { className: "recovery-portal__spine-node-label", children: "Mindblocks" }) })] })] })) })] })), _jsxs("div", { className: "recovery-portal__corridor", children: [_jsx("div", { className: "recovery-portal__room-nav", children: rooms.map((room) => (_jsxs("button", { className: `recovery-portal__room-button ${currentRoom === room.id ? 'recovery-portal__room-button--active' : ''}`, onClick: () => setCurrentRoom(room.id), children: [_jsx("span", { className: "recovery-portal__room-icon", children: room.icon }), _jsxs("div", { className: "recovery-portal__room-info", children: [_jsx("span", { className: "recovery-portal__room-label", children: room.label }), _jsx("span", { className: "recovery-portal__room-description", children: room.description })] })] }, room.id))) }), _jsx("div", { className: "recovery-portal__room-content", children: _jsxs(AnimatePresence, { mode: "wait", children: [currentRoom === 'moment' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "recovery-portal__room", children: [_jsx("h2", { className: "recovery-portal__room-title", children: rooms.find(r => r.id === 'moment')?.label }), _jsx(LoopRunner, { config: {
                                                        intent: 'anchor',
                                                        duration: 10,
                                                        tempo: 'moment',
                                                        depth: 'glance',
                                                    }, lens: currentLens, onReceiptCreate: handleArtifactCreate })] }, "moment")), currentRoom === 'week' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "recovery-portal__room", children: [_jsx("h2", { className: "recovery-portal__room-title", children: rooms.find(r => r.id === 'week')?.label }), _jsx("div", { className: "recovery-portal__placeholder", children: _jsxs("p", { children: [currentLens === 'individual' && 'ERA cadence: Experience → Recognize → Align. Weekly installs build baseline.', currentLens === 'professional' && 'Journey simulator showing ERA cycle installation pattern.', currentLens === 'organisation' && 'BASELINE_INSTALLATION protocol preview.'] }) })] }, "week")), currentRoom === 'explore' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "recovery-portal__room", children: [_jsx("h2", { className: "recovery-portal__room-title", children: rooms.find(r => r.id === 'explore')?.label }), artifacts.length > 0 && (_jsx(TraceTravel, { trace: artifacts[0], trigger: "toggle", lens: currentLens })), artifacts.length === 0 && (_jsx("div", { className: "recovery-portal__placeholder", children: _jsx("p", { children: "Run a moment first to see proof travel across altitudes." }) }))] }, "explore")), currentRoom === 'orchestration' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "recovery-portal__room", children: [_jsx("h2", { className: "recovery-portal__room-title", children: rooms.find(r => r.id === 'orchestration')?.label }), _jsx(ConductorView, { signals: ['energy', 'clarity'], inputsVisible: "minimal", whyDrawer: false, governanceOverlay: currentLens !== 'individual', lens: currentLens, state: "routing" })] }, "orchestration")), currentRoom === 'trust' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, className: "recovery-portal__room", children: [_jsx("h2", { className: "recovery-portal__room-title", children: rooms.find(r => r.id === 'trust')?.label }), _jsxs("div", { className: "recovery-portal__trust-grid", children: [_jsx(ConsentMap, { lens: currentLens, showDetails: false }), _jsx(EscalationRail, { currentLevel: "self", lens: currentLens, supportGraphEnabled: false }), artifacts.length > 0 && (_jsx(IntegrityLogPreview, { detail: "summary", lens: currentLens, maxEntries: 3 })), _jsx(GovernanceLockMap, { showExamples: false, showIdStability: true, lens: currentLens })] })] }, "trust"))] }) })] }), artifactRailVisible && (_jsxs(motion.div, { className: `recovery-portal__artifact-rail ${artifactOpen ? 'recovery-portal__artifact-rail--open' : ''}`, initial: false, animate: { width: artifactOpen ? 320 : 48 }, transition: { duration: 0.3 }, children: [_jsx("button", { className: "recovery-portal__artifact-toggle", onClick: () => setArtifactOpen(!artifactOpen), "aria-label": artifactOpen ? 'Collapse artifacts' : 'Expand artifacts', children: artifactOpen ? '▶' : '◀' }), _jsx(AnimatePresence, { children: artifactOpen && (_jsxs(motion.div, { className: "recovery-portal__artifact-content", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsxs("h3", { className: "recovery-portal__artifact-title", children: [copy.artifactLabel, " (", artifacts.length, ")"] }), artifacts.length === 0 ? (_jsx("p", { className: "recovery-portal__artifact-empty", children: "Run a moment to generate traces" })) : (_jsx("div", { className: "recovery-portal__artifact-list", children: artifacts.map((artifact) => (_jsxs("div", { className: "recovery-portal__artifact-item", children: [_jsx("div", { className: "recovery-portal__artifact-grip", children: artifact.grip }), _jsxs("div", { className: "recovery-portal__artifact-meta", children: [_jsxs("span", { className: "recovery-portal__artifact-duration", children: [artifact.duration, "s"] }), _jsx("span", { className: "recovery-portal__artifact-time", children: new Date(artifact.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] })] }, artifact.traceId))) }))] })) })] }))] })] }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SpineAtlas.css';
// Simplified spine structure
const spineData = [
    // Pillars
    {
        id: 'pillar-continuity',
        label: 'Continuity',
        description: 'The spine that holds everything together',
        level: 'pillars',
        children: ['concept-return', 'concept-thread', 'concept-trace'],
        whatItChanges: 'Builds trust through consistency',
        howItRuns: 'Every action generates proof that stacks',
        proofExample: 'TraceTiles show up, ThreadView shows patterns',
    },
    {
        id: 'pillar-dignity',
        label: 'Dignity',
        description: 'No celebration, no shame, only seal',
        level: 'pillars',
        children: ['concept-consent', 'concept-escalation'],
        whatItChanges: 'Makes safety first-class, not compliance',
        howItRuns: 'Consent gates actions, escalation protects people',
        proofExample: 'ConsentMap shows boundaries, EscalationRail shows handoff',
    },
    {
        id: 'pillar-orchestration',
        label: 'Orchestration',
        description: 'Feed with spine, not black box AI',
        level: 'pillars',
        children: ['concept-routing', 'concept-luma'],
        whatItChanges: 'Makes "why this?" always available',
        howItRuns: 'Signal → Target → Primitive → Dose, governed',
        proofExample: 'ConductorView shows routing logic transparently',
    },
    // Concepts
    {
        id: 'concept-return',
        label: 'Return',
        description: 'Universal action — always there when you need it',
        level: 'concepts',
        parentId: 'pillar-continuity',
        children: ['mindblock-return-button'],
        whatItChanges: 'One-tap access to grounding moves',
        howItRuns: 'Tap for quick grip, hold for intent chooser',
        proofExample: 'ReturnButton appears everywhere, consistent behavior',
    },
    {
        id: 'concept-thread',
        label: 'Thread',
        description: 'Continuity line showing pattern over time',
        level: 'concepts',
        parentId: 'pillar-continuity',
        children: ['mindblock-thread-view'],
        whatItChanges: 'Transforms isolated moments into coherent narrative',
        howItRuns: 'Traces stack vertically, clusters show weekly patterns',
        proofExample: 'ThreadView shows 30 days of receipts',
    },
    {
        id: 'concept-trace',
        label: 'Trace',
        description: 'Proof made tangible — sealed receipts',
        level: 'concepts',
        parentId: 'pillar-continuity',
        children: ['mindblock-trace-object'],
        whatItChanges: 'Makes invisible work visible and defensible',
        howItRuns: 'Every move generates trace with ID that never changes',
        proofExample: 'TraceTile shows grip, duration, timestamp',
    },
    {
        id: 'concept-consent',
        label: 'Consent',
        description: 'First-class UI, not compliance theater',
        level: 'concepts',
        parentId: 'pillar-dignity',
        children: ['mindblock-consent-map'],
        whatItChanges: 'Makes boundaries visible and controllable',
        howItRuns: 'What system can see/do/ask, with toggles',
        proofExample: 'ConsentMap shows all permissions clearly',
    },
    {
        id: 'concept-escalation',
        label: 'Escalation',
        description: 'Clean handoff under drift, by protocol',
        level: 'concepts',
        parentId: 'pillar-dignity',
        children: ['mindblock-escalation-rail'],
        whatItChanges: 'Makes asking for help infrastructure, not failure',
        howItRuns: 'Self-route → Tighten → Switch → Handoff',
        proofExample: 'EscalationRail shows path and handoff options',
    },
    // Mindblocks (components)
    {
        id: 'mindblock-return-button',
        label: 'ReturnButton',
        description: 'Tier A: Iconic OS Object',
        level: 'mindblocks',
        parentId: 'concept-return',
        whatItChanges: 'Provides always-available grounding access',
        howItRuns: 'Tap triggers quick grip, hold shows intent chooser',
        proofExample: 'Used in every view, consistent interaction pattern',
    },
    {
        id: 'mindblock-thread-view',
        label: 'ThreadView',
        description: 'Tier A: Iconic OS Object',
        level: 'mindblocks',
        parentId: 'concept-thread',
        whatItChanges: 'Shows proof stacking over time',
        howItRuns: 'Vertical timeline with optional weekly clusters',
        proofExample: 'Shows 7d/30d/90d ranges with grouping',
    },
    {
        id: 'mindblock-trace-object',
        label: 'TraceObject',
        description: 'Tier A: Iconic OS Object',
        level: 'mindblocks',
        parentId: 'concept-trace',
        whatItChanges: 'Makes single receipt tangible',
        howItRuns: 'Glass card with grip badge, duration, timestamp',
        proofExample: 'Can transform across altitudes (me/care/system)',
    },
];
export const SpineAtlas = ({ level = 'pillars', nodeId, depth = 'thread', showRunThis = true, lens = 'individual', onNodeSelect, onRunMoment, }) => {
    const [currentLevel, setCurrentLevel] = useState(level);
    const [selectedNode, setSelectedNode] = useState(nodeId ? spineData.find(n => n.id === nodeId) || null : null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const handleNodeClick = (node) => {
        setSelectedNode(node);
        onNodeSelect?.(node);
        // Auto-navigate to children level if available
        if (node.children && node.children.length > 0) {
            const childLevel = spineData.find(n => n.id === node.children[0])?.level;
            if (childLevel) {
                setCurrentLevel(childLevel);
            }
        }
    };
    const handleToggleExpand = (nodeId) => {
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            }
            else {
                next.add(nodeId);
            }
            return next;
        });
    };
    const getNodesForLevel = () => {
        if (selectedNode && currentLevel !== 'pillars') {
            // Show children of selected node
            return spineData.filter(n => n.level === currentLevel &&
                (n.parentId === selectedNode.id || selectedNode.children?.includes(n.id)));
        }
        return spineData.filter(n => n.level === currentLevel);
    };
    const getCopy = () => {
        switch (lens) {
            case 'individual':
                return {
                    title: 'Explore the Spine',
                    subtitle: 'Journey through the framework',
                    zoomIn: 'Zoom in',
                    zoomOut: 'Zoom out',
                    runMoment: 'Run a moment',
                    installWeek: 'Install a week',
                    seeProof: 'See proof',
                };
            case 'professional':
                return {
                    title: 'Framework Atlas',
                    subtitle: 'Pillars → Concepts → Themes → Mindblocks',
                    zoomIn: 'Deeper',
                    zoomOut: 'Higher',
                    runMoment: 'Run intervention',
                    installWeek: 'Install journey',
                    seeProof: 'View evidence',
                };
            case 'organisation':
                return {
                    title: 'Architecture Navigator',
                    subtitle: 'PILLARS → CONCEPTS → THEMES → MINDBLOCKS',
                    zoomIn: 'DRILL_DOWN',
                    zoomOut: 'ZOOM_OUT',
                    runMoment: 'EXECUTE_PROTOCOL',
                    installWeek: 'INSTALL_BASELINE',
                    seeProof: 'AUDIT_TRAIL',
                };
        }
    };
    const copy = getCopy();
    const nodes = getNodesForLevel();
    const levelLabels = {
        pillars: lens === 'organisation' ? 'PILLARS' : 'Pillars',
        concepts: lens === 'organisation' ? 'CONCEPTS' : 'Concepts',
        themes: lens === 'organisation' ? 'THEMES' : 'Themes',
        mindblocks: lens === 'organisation' ? 'MINDBLOCKS' : 'Mindblocks',
    };
    return (_jsxs("div", { className: `spine-atlas spine-atlas--${lens} spine-atlas--${depth}`, children: [_jsxs("div", { className: "spine-atlas__header", children: [_jsxs("div", { children: [_jsx("h3", { className: "spine-atlas__title", children: copy.title }), _jsx("p", { className: "spine-atlas__subtitle", children: copy.subtitle })] }), _jsx("div", { className: "spine-atlas__level-nav", children: ['pillars', 'concepts', 'mindblocks'].map((lvl) => (_jsx("button", { className: `spine-atlas__level-button ${currentLevel === lvl ? 'spine-atlas__level-button--active' : ''}`, onClick: () => setCurrentLevel(lvl), children: levelLabels[lvl] }, lvl))) })] }), selectedNode && (_jsxs("div", { className: "spine-atlas__breadcrumb", children: [_jsxs("button", { className: "spine-atlas__breadcrumb-button", onClick: () => {
                            setSelectedNode(null);
                            setCurrentLevel('pillars');
                        }, children: ["\u2190 ", copy.zoomOut] }), _jsx("span", { className: "spine-atlas__breadcrumb-path", children: selectedNode.label })] })), _jsx("div", { className: "spine-atlas__grid", children: nodes.map((node, i) => {
                    const isExpanded = expandedNodes.has(node.id);
                    const hasChildren = node.children && node.children.length > 0;
                    return (_jsxs(motion.div, { className: `spine-atlas__node ${selectedNode?.id === node.id ? 'spine-atlas__node--selected' : ''}`, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: i * 0.05 }, onClick: () => handleNodeClick(node), children: [_jsxs("div", { className: "spine-atlas__node-header", children: [_jsx("h4", { className: "spine-atlas__node-label", children: node.label }), hasChildren && (_jsx("button", { className: "spine-atlas__node-expand", onClick: (e) => {
                                            e.stopPropagation();
                                            handleToggleExpand(node.id);
                                        }, children: isExpanded ? '−' : '+' }))] }), _jsx("p", { className: "spine-atlas__node-description", children: node.description }), _jsx(AnimatePresence, { children: isExpanded && depth !== 'glance' && (_jsxs(motion.div, { className: "spine-atlas__node-details", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, children: [node.whatItChanges && (_jsxs("div", { className: "spine-atlas__node-detail", children: [_jsx("span", { className: "spine-atlas__node-detail-label", children: "What it changes:" }), _jsx("span", { className: "spine-atlas__node-detail-value", children: node.whatItChanges })] })), node.howItRuns && (_jsxs("div", { className: "spine-atlas__node-detail", children: [_jsx("span", { className: "spine-atlas__node-detail-label", children: "How it runs:" }), _jsx("span", { className: "spine-atlas__node-detail-value", children: node.howItRuns })] })), node.proofExample && (_jsxs("div", { className: "spine-atlas__node-detail", children: [_jsx("span", { className: "spine-atlas__node-detail-label", children: "Proof:" }), _jsx("span", { className: "spine-atlas__node-detail-value", children: node.proofExample })] })), showRunThis && node.level === 'mindblocks' && (_jsx("div", { className: "spine-atlas__node-actions", children: _jsx("button", { className: "spine-atlas__node-action", onClick: (e) => {
                                                    e.stopPropagation();
                                                    onRunMoment?.(node.id);
                                                }, children: copy.runMoment }) }))] })) })] }, node.id));
                }) }), nodes.length === 0 && (_jsx("div", { className: "spine-atlas__empty", children: "No nodes at this level. Zoom out to explore." }))] }));
};

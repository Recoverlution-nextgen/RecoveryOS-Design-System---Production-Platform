import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './SpineAtlas.css';

export type SpineLevel = 'pillars' | 'concepts' | 'themes' | 'mindblocks';

export interface SpineNode {
  id: string;
  label: string;
  description: string;
  level: SpineLevel;
  parentId?: string;
  children?: string[];
  whatItChanges?: string;
  howItRuns?: string;
  proofExample?: string;
}

export interface SpineAtlasProps {
  /** Starting level */
  level?: SpineLevel;
  
  /** Starting node ID */
  nodeId?: string;
  
  /** Depth display mode */
  depth?: 'glance' | 'seed' | 'thread' | 'journey';
  
  /** Show "Run this" actions */
  showRunThis?: boolean;
  
  /** Current lens */
  lens?: Lens;
  
  /** Callback when node is selected */
  onNodeSelect?: (node: SpineNode) => void;
  
  /** Callback when "Run a Moment" is triggered */
  onRunMoment?: (nodeId: string) => void;
}

// Simplified spine structure
const spineData: SpineNode[] = [
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

export const SpineAtlas: React.FC<SpineAtlasProps> = ({
  level = 'pillars',
  nodeId,
  depth = 'thread',
  showRunThis = true,
  lens = 'individual',
  onNodeSelect,
  onRunMoment,
}) => {
  const [currentLevel, setCurrentLevel] = useState<SpineLevel>(level);
  const [selectedNode, setSelectedNode] = useState<SpineNode | null>(
    nodeId ? spineData.find(n => n.id === nodeId) || null : null
  );
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: SpineNode) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
    
    // Auto-navigate to children level if available
    if (node.children && node.children.length > 0) {
      const childLevel = spineData.find(n => n.id === node.children![0])?.level;
      if (childLevel) {
        setCurrentLevel(childLevel);
      }
    }
  };

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const getNodesForLevel = () => {
    if (selectedNode && currentLevel !== 'pillars') {
      // Show children of selected node
      return spineData.filter(n => 
        n.level === currentLevel && 
        (n.parentId === selectedNode.id || selectedNode.children?.includes(n.id))
      );
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

  const levelLabels: Record<SpineLevel, string> = {
    pillars: lens === 'organisation' ? 'PILLARS' : 'Pillars',
    concepts: lens === 'organisation' ? 'CONCEPTS' : 'Concepts',
    themes: lens === 'organisation' ? 'THEMES' : 'Themes',
    mindblocks: lens === 'organisation' ? 'MINDBLOCKS' : 'Mindblocks',
  };

  return (
    <div className={`spine-atlas spine-atlas--${lens} spine-atlas--${depth}`}>
      <div className="spine-atlas__header">
        <div>
          <h3 className="spine-atlas__title">{copy.title}</h3>
          <p className="spine-atlas__subtitle">{copy.subtitle}</p>
        </div>
        
        {/* Level Navigator */}
        <div className="spine-atlas__level-nav">
          {(['pillars', 'concepts', 'mindblocks'] as SpineLevel[]).map((lvl) => (
            <button
              key={lvl}
              className={`spine-atlas__level-button ${currentLevel === lvl ? 'spine-atlas__level-button--active' : ''}`}
              onClick={() => setCurrentLevel(lvl)}
            >
              {levelLabels[lvl]}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedNode && (
        <div className="spine-atlas__breadcrumb">
          <button
            className="spine-atlas__breadcrumb-button"
            onClick={() => {
              setSelectedNode(null);
              setCurrentLevel('pillars');
            }}
          >
            ← {copy.zoomOut}
          </button>
          <span className="spine-atlas__breadcrumb-path">
            {selectedNode.label}
          </span>
        </div>
      )}

      {/* Node Grid */}
      <div className="spine-atlas__grid">
        {nodes.map((node, i) => {
          const isExpanded = expandedNodes.has(node.id);
          const hasChildren = node.children && node.children.length > 0;

          return (
            <motion.div
              key={node.id}
              className={`spine-atlas__node ${selectedNode?.id === node.id ? 'spine-atlas__node--selected' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleNodeClick(node)}
            >
              <div className="spine-atlas__node-header">
                <h4 className="spine-atlas__node-label">{node.label}</h4>
                {hasChildren && (
                  <button
                    className="spine-atlas__node-expand"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleExpand(node.id);
                    }}
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                )}
              </div>
              
              <p className="spine-atlas__node-description">{node.description}</p>

              {/* Expanded Details */}
              <AnimatePresence>
                {isExpanded && depth !== 'glance' && (
                  <motion.div
                    className="spine-atlas__node-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {node.whatItChanges && (
                      <div className="spine-atlas__node-detail">
                        <span className="spine-atlas__node-detail-label">What it changes:</span>
                        <span className="spine-atlas__node-detail-value">{node.whatItChanges}</span>
                      </div>
                    )}
                    {node.howItRuns && (
                      <div className="spine-atlas__node-detail">
                        <span className="spine-atlas__node-detail-label">How it runs:</span>
                        <span className="spine-atlas__node-detail-value">{node.howItRuns}</span>
                      </div>
                    )}
                    {node.proofExample && (
                      <div className="spine-atlas__node-detail">
                        <span className="spine-atlas__node-detail-label">Proof:</span>
                        <span className="spine-atlas__node-detail-value">{node.proofExample}</span>
                      </div>
                    )}

                    {/* Run This Actions */}
                    {showRunThis && node.level === 'mindblocks' && (
                      <div className="spine-atlas__node-actions">
                        <button
                          className="spine-atlas__node-action"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRunMoment?.(node.id);
                          }}
                        >
                          {copy.runMoment}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {nodes.length === 0 && (
        <div className="spine-atlas__empty">
          No nodes at this level. Zoom out to explore.
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LensControl } from '../lens/LensControl';
import { LoopRunner } from '../loop/LoopRunner';
import { TraceTravel } from '../travel/TraceTravel';
import { ConductorView } from '../conductor/ConductorView';
import { ConsentMap } from '../trust/ConsentMap';
import { EscalationRail } from '../trust/EscalationRail';
import { IntegrityLogPreview } from '../trust/IntegrityLogPreview';
import { GovernanceLockMap } from '../trust/GovernanceLockMap';
import type { Lens } from '../../types/theme';
import type { TraceObjectProps } from '../trace/TraceObject';
import './RecoveryOSPortal.css';

export type PortalRoom = 'moment' | 'week' | 'explore' | 'orchestration' | 'trust';
export type PortalState = 'idle' | 'prompting' | 'routing' | 'running' | 'sealing' | 'elevating';
export type Tempo = 'moment' | 'week';
export type Depth = 'glance' | 'seed' | 'thread' | 'journey';

export interface RecoveryOSPortalProps {
  /** Initial room to show */
  initialRoom?: PortalRoom;
  
  /** Show spine rail (collapsible) */
  spineRailVisible?: boolean;
  
  /** Show artifact rail (traces/receipts/logs) */
  artifactRailVisible?: boolean;
  
  /** Enable skip option */
  skipEnabled?: boolean;
  
  /** Current lens */
  lens?: Lens;
  
  /** Callback when lens changes */
  onLensChange?: (lens: Lens) => void;
}

export const RecoveryOSPortal: React.FC<RecoveryOSPortalProps> = ({
  initialRoom = 'moment',
  spineRailVisible = true,
  artifactRailVisible = true,
  skipEnabled = true,
  lens = 'individual',
  onLensChange,
}) => {
  const [currentRoom, setCurrentRoom] = useState<PortalRoom>(initialRoom);
  const [portalState, setPortalState] = useState<PortalState>('idle');
  const [spineOpen, setSpineOpen] = useState(spineRailVisible);
  const [artifactOpen, setArtifactOpen] = useState(artifactRailVisible);
  const [artifacts, setArtifacts] = useState<TraceObjectProps[]>([]);
  const [currentLens, setCurrentLens] = useState<Lens>(lens);

  const handleLensChange = (newLens: Lens) => {
    setCurrentLens(newLens);
    onLensChange?.(newLens);
  };

  const handleArtifactCreate = (trace: TraceObjectProps) => {
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

  const rooms: Array<{ id: PortalRoom; label: string; icon: string; description: string }> = [
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

  return (
    <div className={`recovery-portal recovery-portal--${currentLens} recovery-portal--${portalState}`}>
      {/* Abstract Field Background */}
      <div className="recovery-portal__field">
        <motion.div
          className="recovery-portal__field-gradient"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Header */}
      <div className="recovery-portal__header">
        <div className="recovery-portal__brand">
          <h1 className="recovery-portal__title">{copy.title}</h1>
          <p className="recovery-portal__subtitle">{copy.subtitle}</p>
        </div>
        <div className="recovery-portal__controls">
          <LensControl lens={currentLens} onChange={handleLensChange} />
          {skipEnabled && (
            <button className="recovery-portal__skip">{copy.skipLabel}</button>
          )}
        </div>
      </div>

      <div className="recovery-portal__layout">
        {/* Spine Rail (Left) */}
        {spineRailVisible && (
          <motion.div
            className={`recovery-portal__spine-rail ${spineOpen ? 'recovery-portal__spine-rail--open' : ''}`}
            initial={false}
            animate={{ width: spineOpen ? 280 : 48 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="recovery-portal__spine-toggle"
              onClick={() => setSpineOpen(!spineOpen)}
              aria-label={spineOpen ? 'Collapse spine' : 'Expand spine'}
            >
              {spineOpen ? '◀' : '▶'}
            </button>
            <AnimatePresence>
              {spineOpen && (
                <motion.div
                  className="recovery-portal__spine-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="recovery-portal__spine-title">{copy.spineLabel}</h3>
                  <div className="recovery-portal__spine-tree">
                    {/* Simplified spine visualization */}
                    <div className="recovery-portal__spine-node">
                      <span className="recovery-portal__spine-node-label">Pillars</span>
                    </div>
                    <div className="recovery-portal__spine-node recovery-portal__spine-node--indent">
                      <span className="recovery-portal__spine-node-label">Concepts</span>
                    </div>
                    <div className="recovery-portal__spine-node recovery-portal__spine-node--indent-2">
                      <span className="recovery-portal__spine-node-label">Mindblocks</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Center Corridor (Room Navigation + Content) */}
        <div className="recovery-portal__corridor">
          {/* Room Navigation */}
          <div className="recovery-portal__room-nav">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`recovery-portal__room-button ${currentRoom === room.id ? 'recovery-portal__room-button--active' : ''}`}
                onClick={() => setCurrentRoom(room.id)}
              >
                <span className="recovery-portal__room-icon">{room.icon}</span>
                <div className="recovery-portal__room-info">
                  <span className="recovery-portal__room-label">{room.label}</span>
                  <span className="recovery-portal__room-description">{room.description}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Room Content */}
          <div className="recovery-portal__room-content">
            <AnimatePresence mode="wait">
              {currentRoom === 'moment' && (
                <motion.div
                  key="moment"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="recovery-portal__room"
                >
                  <h2 className="recovery-portal__room-title">
                    {rooms.find(r => r.id === 'moment')?.label}
                  </h2>
                  <LoopRunner
                    config={{
                      intent: 'anchor',
                      duration: 10,
                      tempo: 'moment',
                      depth: 'glance',
                    }}
                    lens={currentLens}
                    onReceiptCreate={handleArtifactCreate}
                  />
                </motion.div>
              )}

              {currentRoom === 'week' && (
                <motion.div
                  key="week"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="recovery-portal__room"
                >
                  <h2 className="recovery-portal__room-title">
                    {rooms.find(r => r.id === 'week')?.label}
                  </h2>
                  <div className="recovery-portal__placeholder">
                    <p>
                      {currentLens === 'individual' && 'ERA cadence: Experience → Recognize → Align. Weekly installs build baseline.'}
                      {currentLens === 'professional' && 'Journey simulator showing ERA cycle installation pattern.'}
                      {currentLens === 'organisation' && 'BASELINE_INSTALLATION protocol preview.'}
                    </p>
                  </div>
                </motion.div>
              )}

              {currentRoom === 'explore' && (
                <motion.div
                  key="explore"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="recovery-portal__room"
                >
                  <h2 className="recovery-portal__room-title">
                    {rooms.find(r => r.id === 'explore')?.label}
                  </h2>
                  {artifacts.length > 0 && (
                    <TraceTravel
                      trace={artifacts[0]}
                      trigger="toggle"
                      lens={currentLens}
                    />
                  )}
                  {artifacts.length === 0 && (
                    <div className="recovery-portal__placeholder">
                      <p>Run a moment first to see proof travel across altitudes.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {currentRoom === 'orchestration' && (
                <motion.div
                  key="orchestration"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="recovery-portal__room"
                >
                  <h2 className="recovery-portal__room-title">
                    {rooms.find(r => r.id === 'orchestration')?.label}
                  </h2>
                  <ConductorView
                    signals={['energy', 'clarity']}
                    inputsVisible="minimal"
                    whyDrawer={false}
                    governanceOverlay={currentLens !== 'individual'}
                    lens={currentLens}
                    state="routing"
                  />
                </motion.div>
              )}

              {currentRoom === 'trust' && (
                <motion.div
                  key="trust"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="recovery-portal__room"
                >
                  <h2 className="recovery-portal__room-title">
                    {rooms.find(r => r.id === 'trust')?.label}
                  </h2>
                  <div className="recovery-portal__trust-grid">
                    <ConsentMap lens={currentLens} showDetails={false} />
                    <EscalationRail
                      currentLevel="self"
                      lens={currentLens}
                      supportGraphEnabled={false}
                    />
                    {artifacts.length > 0 && (
                      <IntegrityLogPreview
                        detail="summary"
                        lens={currentLens}
                        maxEntries={3}
                      />
                    )}
                    <GovernanceLockMap
                      showExamples={false}
                      showIdStability={true}
                      lens={currentLens}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Artifact Rail (Right) */}
        {artifactRailVisible && (
          <motion.div
            className={`recovery-portal__artifact-rail ${artifactOpen ? 'recovery-portal__artifact-rail--open' : ''}`}
            initial={false}
            animate={{ width: artifactOpen ? 320 : 48 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="recovery-portal__artifact-toggle"
              onClick={() => setArtifactOpen(!artifactOpen)}
              aria-label={artifactOpen ? 'Collapse artifacts' : 'Expand artifacts'}
            >
              {artifactOpen ? '▶' : '◀'}
            </button>
            <AnimatePresence>
              {artifactOpen && (
                <motion.div
                  className="recovery-portal__artifact-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="recovery-portal__artifact-title">
                    {copy.artifactLabel} ({artifacts.length})
                  </h3>
                  {artifacts.length === 0 ? (
                    <p className="recovery-portal__artifact-empty">
                      Run a moment to generate traces
                    </p>
                  ) : (
                    <div className="recovery-portal__artifact-list">
                      {artifacts.map((artifact) => (
                        <div key={artifact.traceId} className="recovery-portal__artifact-item">
                          <div className="recovery-portal__artifact-grip">{artifact.grip}</div>
                          <div className="recovery-portal__artifact-meta">
                            <span className="recovery-portal__artifact-duration">{artifact.duration}s</span>
                            <span className="recovery-portal__artifact-time">
                              {new Date(artifact.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

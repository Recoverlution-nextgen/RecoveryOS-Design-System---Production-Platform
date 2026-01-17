import React from 'react';
import { motion } from 'motion/react';

/**
 * BELIEF PROGRESS TRACKER
 * 
 * Purpose: Visualize KNOWING → BELIEVING → EMBODYING progression
 * Philosophy: Belief change is measurable through implicit signals
 * 
 * Stages:
 * - KNOWING: Awareness of the belief (probes, reaction times)
 * - BELIEVING: Evidence collection (predictions, experiments)
 * - EMBODYING: Automaticity + transfer (receipts, new contexts)
 */

export type BeliefStage = 'knowing' | 'believing' | 'embodying' | 'integrated';

export interface BeliefProgressData {
  mindblockId: string;
  limitingBelief: string;
  newTruth: string;
  currentStage: BeliefStage;
  
  // KNOWING metrics
  probesCompleted: number;
  reactionTimeMs: number | null; // Faster = more automatic
  awarenessScore: number; // 0-100
  
  // BELIEVING metrics
  predictionsRecorded: number;
  experimentsRun: number;
  predictionAccuracy: number; // 0-100 (how often old belief was wrong)
  evidenceCount: number;
  
  // EMBODYING metrics
  receiptsCollected: number;
  transferContexts: number; // How many different contexts has new belief shown up?
  automaticityScore: number; // 0-100 (based on latency, consistency)
  
  // Timeline
  firstEngaged: string;
  lastEngaged: string;
  daysActive: number;
}

interface BeliefProgressTrackerProps {
  progress: BeliefProgressData;
  showDetails?: boolean;
}

export function BeliefProgressTracker({ progress, showDetails = true }: BeliefProgressTrackerProps) {
  const stages: Array<{ id: BeliefStage; label: string; color: string }> = [
    { id: 'knowing', label: 'KNOWING', color: '#E67E22' },
    { id: 'believing', label: 'BELIEVING', color: '#5739FB' },
    { id: 'embodying', label: 'EMBODYING', color: '#27AE60' },
    { id: 'integrated', label: 'INTEGRATED', color: '#F39C12' },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === progress.currentStage);

  return (
    <div className="w-full space-y-6">
      {/* Belief pair */}
      <div className="space-y-3">
        <div className="p-4" style={{
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderLeft: '3px solid #E74C3C',
        }}>
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#E74C3C' }}>
            Limiting belief
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {progress.limitingBelief}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <svg width="24" height="24" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        <div className="p-4" style={{
          backgroundColor: 'rgba(39, 174, 96, 0.1)',
          borderLeft: '3px solid #27AE60',
        }}>
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#27AE60' }}>
            New truth
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {progress.newTruth}
          </div>
        </div>
      </div>

      {/* Stage progression */}
      <div className="space-y-4">
        <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Progress
        </div>

        {/* Stage indicators */}
        <div className="flex items-center gap-2">
          {stages.map((stage, index) => {
            const isActive = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <React.Fragment key={stage.id}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    opacity: isActive ? 1 : 0.3,
                  }}
                  className="flex-1 p-3 text-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? `${stage.color}20` : 'rgba(255, 255, 255, 0.05)',
                    border: isCurrent ? `2px solid ${stage.color}` : '2px solid transparent',
                  }}
                >
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: isActive ? stage.color : 'rgba(255, 255, 255, 0.3)' }}
                  >
                    {stage.label}
                  </div>
                </motion.div>
                {index < stages.length - 1 && (
                  <div
                    className="w-4 h-0.5"
                    style={{
                      backgroundColor: isActive ? stages[index + 1].color : 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed metrics */}
      {showDetails && (
        <div className="space-y-4">
          {/* KNOWING metrics */}
          <MetricSection
            title="KNOWING"
            color="#E67E22"
            isActive={currentStageIndex >= 0}
            metrics={[
              { label: 'Probes completed', value: progress.probesCompleted },
              { label: 'Awareness score', value: `${progress.awarenessScore}%` },
              {
                label: 'Reaction time',
                value: progress.reactionTimeMs ? `${progress.reactionTimeMs}ms` : 'Not measured',
                hint: 'Faster = more automatic',
              },
            ]}
          />

          {/* BELIEVING metrics */}
          <MetricSection
            title="BELIEVING"
            color="#5739FB"
            isActive={currentStageIndex >= 1}
            metrics={[
              { label: 'Predictions recorded', value: progress.predictionsRecorded },
              { label: 'Experiments run', value: progress.experimentsRun },
              { label: 'Evidence pieces', value: progress.evidenceCount },
              {
                label: 'Prediction accuracy',
                value: `${progress.predictionAccuracy}%`,
                hint: 'How often old belief was wrong',
              },
            ]}
          />

          {/* EMBODYING metrics */}
          <MetricSection
            title="EMBODYING"
            color="#27AE60"
            isActive={currentStageIndex >= 2}
            metrics={[
              { label: 'Identity receipts', value: progress.receiptsCollected },
              { label: 'Transfer contexts', value: progress.transferContexts },
              {
                label: 'Automaticity score',
                value: `${progress.automaticityScore}%`,
                hint: 'How automatic new belief is',
              },
            ]}
          />
        </div>
      )}

      {/* Timeline */}
      <div className="pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          <span>Started {new Date(progress.firstEngaged).toLocaleDateString()}</span>
          <span>{progress.daysActive} days active</span>
          <span>Updated {new Date(progress.lastEngaged).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

interface MetricSectionProps {
  title: string;
  color: string;
  isActive: boolean;
  metrics: Array<{
    label: string;
    value: string | number;
    hint?: string;
  }>;
}

function MetricSection({ title, color, isActive, metrics }: MetricSectionProps) {
  return (
    <div
      className="p-4 space-y-3 transition-all duration-300"
      style={{
        backgroundColor: isActive ? `${color}10` : 'rgba(255, 255, 255, 0.03)',
        borderLeft: `3px solid ${isActive ? color : 'rgba(255, 255, 255, 0.1)'}`,
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <div className="text-xs uppercase tracking-wider" style={{ color: isActive ? color : 'rgba(255, 255, 255, 0.3)' }}>
        {title}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="text-2xl mb-1" style={{ color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)' }}>
              {metric.value}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {metric.label}
            </div>
            {metric.hint && (
              <div className="text-xs mt-1 italic" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                {metric.hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * BELIEF LADDER VISUALIZATION
 * 
 * Shows per-schema progression through multiple mindblocks
 */

export interface BeliefLadderData {
  schema: string;
  schemaDescription: string;
  totalMindblocks: number;
  completedMindblocks: number;
  mindblocks: Array<{
    id: string;
    limitingBelief: string;
    newTruth: string;
    stage: BeliefStage;
    progress: number; // 0-100
  }>;
}

interface BeliefLadderProps {
  ladder: BeliefLadderData;
}

export function BeliefLadder({ ladder }: BeliefLadderProps) {
  const overallProgress = (ladder.completedMindblocks / ladder.totalMindblocks) * 100;

  return (
    <div className="w-full space-y-6">
      {/* Schema header */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl" style={{ color: '#FFFFFF' }}>
          {ladder.schema}
        </h3>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {ladder.schemaDescription}
        </p>
      </div>

      {/* Overall progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Schema shift progress</span>
          <span style={{ color: '#5739FB' }}>{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full h-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
      </div>

      {/* Ladder rungs */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Mindblocks ({ladder.completedMindblocks} of {ladder.totalMindblocks} shifted)
        </div>

        {ladder.mindblocks.map((block, index) => {
          const stageColors = {
            knowing: '#E67E22',
            believing: '#5739FB',
            embodying: '#27AE60',
            integrated: '#F39C12',
          };

          return (
            <div
              key={block.id}
              className="p-4 border-l-4 space-y-2"
              style={{
                backgroundColor: `${stageColors[block.stage]}10`,
                borderColor: stageColors[block.stage],
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {block.limitingBelief}
                  </div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    → {block.newTruth}
                  </div>
                </div>
                <div
                  className="text-xs uppercase px-2 py-1"
                  style={{
                    backgroundColor: stageColors[block.stage],
                    color: '#FFFFFF',
                  }}
                >
                  {block.stage}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${block.progress}%`,
                    backgroundColor: stageColors[block.stage],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

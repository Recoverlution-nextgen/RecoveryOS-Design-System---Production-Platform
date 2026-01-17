/**
 * JOURNEY LAB - Command Center Room
 * 
 * Build 12 journey sprints with LUMA VOICE integration
 * 
 * Features:
 * - Sprint selector (1-12)
 * - Scene editor with ERA phase mapper
 * - Schema targeter (pillar → theme → mindblock)
 * - Content embedder (NaviCue, Practice, Article, LUMA Voice)
 * - Preview in Universal Player
 * - Deploy to platform
 */

import React, { useState } from 'react';

interface JourneyLabRoomProps {
  onNavigate: (page: string) => void;
}

type SprintStatus = 'draft' | 'testing' | 'production';

export default function JourneyLabRoom({ onNavigate }: JourneyLabRoomProps) {
  const [selectedSprint, setSelectedSprint] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'overview' | 'editor' | 'preview'>('overview');

  // 12 Sprint templates (placeholders - you have these in mind)
  const sprints = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    title: `Sprint ${i + 1}`,
    pillar: getPillarForSprint(i + 1),
    status: (i === 0 ? 'testing' : 'draft') as SprintStatus,
    sceneCount: 13,
    completionRate: i === 0 ? 85 : 0,
  }));

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      {/* Header */}
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button
          onClick={() => onNavigate('/command-center-execution')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>🌅</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Journey Lab</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          From state to self — 12 sprints with ERA framework + LUMA VOICE integration
        </p>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {(['overview', 'editor', 'preview'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                background: viewMode === mode ? 'rgba(87, 57, 251, 0.12)' : 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              {mode === 'overview' && '📊 Overview'}
              {mode === 'editor' && '✏️ Scene Editor'}
              {mode === 'preview' && '👁️ Preview'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'overview' && (
        <SprintOverview sprints={sprints} onSelectSprint={setSelectedSprint} selectedSprint={selectedSprint} />
      )}
      {viewMode === 'editor' && (
        <SceneEditor sprintNumber={selectedSprint} />
      )}
      {viewMode === 'preview' && (
        <SprintPreview sprintNumber={selectedSprint} />
      )}
    </div>
  );
}

// ============================================================================
// SPRINT OVERVIEW
// ============================================================================

function SprintOverview({ sprints, onSelectSprint, selectedSprint }: {
  sprints: any[];
  onSelectSprint: (num: number) => void;
  selectedSprint: number;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
      {sprints.map(sprint => (
        <div
          key={sprint.number}
          className="glass-secondary"
          style={{
            padding: 'var(--spacing-5)',
            cursor: 'pointer',
            border: selectedSprint === sprint.number ? '2px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'all 0.3s ease',
          }}
          onClick={() => onSelectSprint(sprint.number)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)' }}>Sprint {sprint.number}</h3>
            <StatusBadge status={sprint.status} />
          </div>

          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
            Pillar: {sprint.pillar}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            {sprint.sceneCount} scenes · {sprint.completionRate}% complete
          </div>

          {sprint.completionRate > 0 && (
            <div style={{ marginTop: 'var(--spacing-3)', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-none)' }}>
              <div style={{ width: `${sprint.completionRate}%`, height: '100%', background: 'var(--color-accent)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// SCENE EDITOR
// ============================================================================

function SceneEditor({ sprintNumber }: { sprintNumber: number }) {
  const [selectedScene, setSelectedScene] = useState(1);

  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        Sprint {sprintNumber} - Scene Editor
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--spacing-5)' }}>
        {/* Scene Selector */}
        <div>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Scenes</h3>
          {Array.from({ length: 13 }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setSelectedScene(num)}
              style={{
                width: '100%',
                padding: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-1)',
                background: selectedScene === num ? 'rgba(87, 57, 251, 0.12)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Scene {num}
            </button>
          ))}
        </div>

        {/* Scene Form */}
        <div>
          <SceneForm sceneNumber={selectedScene} sprintNumber={sprintNumber} />
        </div>
      </div>
    </div>
  );
}

function SceneForm({ sceneNumber, sprintNumber }: { sceneNumber: number; sprintNumber: number }) {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
      <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-4)' }}>
        Scene {sceneNumber} Configuration
      </h3>

      {/* Scene Type */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
          Scene Type
        </label>
        <select style={{
          width: '100%',
          padding: 'var(--spacing-2)',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-text-primary)',
        }}>
          <option>intro</option>
          <option>teaching</option>
          <option>practice</option>
          <option>reflection</option>
          <option>bridge</option>
          <option>integration</option>
        </select>
      </div>

      {/* ERA Phase */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
          ERA Phase
        </label>
        <select style={{
          width: '100%',
          padding: 'var(--spacing-2)',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-text-primary)',
        }}>
          <option>context</option>
          <option>experience</option>
          <option>recognize</option>
          <option>align</option>
          <option>reflection</option>
        </select>
      </div>

      {/* LUMA Voice Prompt */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
          LUMA Voice Prompt (for introspection)
        </label>
        <textarea
          placeholder="Enter LUMA TALK prompt for deep introspection..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: 'var(--spacing-2)',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Schema Targeting */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
          Schema Targeting
        </label>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
          {['shame', 'control', 'perfectionism', 'worthlessness'].map(schema => (
            <button
              key={schema}
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                background: 'rgba(87, 57, 251, 0.08)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-accent)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {schema}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-5)' }}>
        <button style={{
          flex: 1,
          padding: 'var(--spacing-2)',
          background: 'rgba(87, 57, 251, 0.15)',
          border: '1px solid rgba(87, 57, 251, 0.4)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-accent)',
          cursor: 'pointer',
        }}>
          Save Scene
        </button>
        <button style={{
          padding: 'var(--spacing-2) var(--spacing-3)',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
        }}>
          Preview in Universal Player
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SPRINT PREVIEW
// ============================================================================

function SprintPreview({ sprintNumber }: { sprintNumber: number }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        Sprint {sprintNumber} Preview
      </h2>

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.03)', 
        padding: 'var(--spacing-6)', 
        borderRadius: 'var(--radius-none)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-3)' }}>📱</div>
        <div style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          Universal Player Preview
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>
          Sprint {sprintNumber} will render here with all 13 scenes in the Universal Player
        </div>
        
        <button style={{
          marginTop: 'var(--spacing-5)',
          padding: 'var(--spacing-2) var(--spacing-4)',
          background: 'rgba(87, 57, 251, 0.15)',
          border: '1px solid rgba(87, 57, 251, 0.4)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-accent)',
          cursor: 'pointer',
        }}>
          Launch Player
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// UTILITIES
// ============================================================================

function StatusBadge({ status }: { status: SprintStatus }) {
  const colors = {
    draft: '#666',
    testing: '#FFB800',
    production: '#00D9A3',
  };

  return (
    <div style={{
      padding: 'var(--spacing-1) var(--spacing-2)',
      background: `${colors[status]}22`,
      border: `1px solid ${colors[status]}`,
      borderRadius: 'var(--radius-none)',
      fontSize: '11px',
      color: colors[status],
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }}>
      {status}
    </div>
  );
}

function getPillarForSprint(num: number): string {
  const pillars = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'];
  return pillars[(num - 1) % 6];
}

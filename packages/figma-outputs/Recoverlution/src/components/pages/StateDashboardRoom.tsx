/**
 * STATE DASHBOARD - Command Center Room
 * 
 * Right now is the only moment you can change
 * Universal INPUT to LUMA - 3D check-ins + arousal compute
 * 
 * Features:
 * - State trends visualizer (arousal timeline, dimension graphs)
 * - State check-in configurator (timing rules, triggers)
 * - NaviCue delivery settings
 * - User state browser (filter by arousal)
 */

import React, { useState } from 'react';

interface StateDashboardRoomProps {
  onNavigate: (page: string) => void;
}

type ViewMode = 'trends' | 'configurator' | 'browser';

export default function StateDashboardRoom({ onNavigate }: StateDashboardRoomProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('trends');

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
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>📊</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>State Dashboard</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Universal INPUT to LUMA — Tempo · Flow · Sync → Red/Amber/Green arousal compute
        </p>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {(['trends', 'configurator', 'browser'] as ViewMode[]).map(mode => (
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
              {mode === 'trends' && '📈 Trends Visualizer'}
              {mode === 'configurator' && '⚙️ Configurator'}
              {mode === 'browser' && '🔍 State Browser'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'trends' && <TrendsVisualizer />}
      {viewMode === 'configurator' && <StateConfigurator />}
      {viewMode === 'browser' && <StateBrowser />}
    </div>
  );
}

// ============================================================================
// TRENDS VISUALIZER
// ============================================================================

function TrendsVisualizer() {
  return (
    <div>
      {/* Arousal Timeline */}
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-5)' }}>
        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-4)' }}>
          Arousal Timeline (Last 30 Days)
        </h2>

        <div style={{
          height: '200px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-none)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'var(--spacing-4)',
          gap: '4px',
        }}>
          {Array.from({ length: 30 }, (_, i) => {
            const height = Math.random();
            const color = height < 0.33 ? '#FF4444' : height < 0.66 ? '#FFB800' : '#00D9A3';
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${height * 100}%`,
                  background: color,
                  opacity: 0.7,
                  borderRadius: 'var(--radius-none)',
                }}
              />
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-3)', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div style={{ width: '12px', height: '12px', background: '#FF4444', borderRadius: 'var(--radius-none)' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Red (Dysregulated)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div style={{ width: '12px', height: '12px', background: '#FFB800', borderRadius: 'var(--radius-none)' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Amber (Moderate)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div style={{ width: '12px', height: '12px', background: '#00D9A3', borderRadius: 'var(--radius-none)' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Green (Regulated)</span>
          </div>
        </div>
      </div>

      {/* Dimension Trends */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-4)' }}>
        {['Tempo (Energy)', 'Flow (Clarity)', 'Sync (Connection)'].map((dimension, idx) => (
          <div key={dimension} className="glass-secondary" style={{ padding: 'var(--spacing-5)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>
              {dimension}
            </h3>

            <div style={{
              height: '120px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'var(--spacing-2)',
              gap: '2px',
            }}>
              {Array.from({ length: 14 }, (_, i) => {
                const value = 40 + Math.random() * 50;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${value}%`,
                      background: 'rgba(87, 57, 251, 0.5)',
                      borderRadius: 'var(--radius-none)',
                    }}
                  />
                );
              })}
            </div>

            <div style={{ marginTop: 'var(--spacing-3)', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                {Math.floor(40 + Math.random() * 50)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Average (Last 14 days)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// STATE CONFIGURATOR
// ============================================================================

function StateConfigurator() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        State Check-in Configurator
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        {/* Timing Rules */}
        <div>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>
            Timing Rules
          </h3>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>Morning Check-in</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              09:00 AM daily
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>Evening Check-in</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              21:00 PM daily
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>Post-Intervention</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              After practices, wellness videos, Journey scenes
            </div>
          </div>
        </div>

        {/* Trigger Conditions */}
        <div>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-4)' }}>
            Trigger Conditions
          </h3>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-3)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              After Journey Scene
            </label>
            <select style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-text-primary)',
            }}>
              <option>Always</option>
              <option>Only reflection scenes</option>
              <option>Never</option>
            </select>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-3)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              After Wellness Video
            </label>
            <select style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-text-primary)',
            }}>
              <option>Always</option>
              <option>Only vigorous intensity</option>
              <option>Never</option>
            </select>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              After Practice
            </label>
            <select style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-text-primary)',
            }}>
              <option>Always</option>
              <option>Only somatic practices</option>
              <option>Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* NaviCue Delivery */}
      <div style={{ marginTop: 'var(--spacing-6)', background: 'rgba(87, 57, 251, 0.08)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>
          NaviCue Delivery Settings
        </h3>

        <div style={{ marginBottom: 'var(--spacing-3)' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
            NaviCue ID
          </label>
          <input
            type="text"
            value="STATE-check-in-01"
            readOnly
            style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-text-tertiary)',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--spacing-3)' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
            Delivery Mechanism
          </label>
          <select style={{
            width: '100%',
            padding: 'var(--spacing-2)',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-text-primary)',
          }}>
            <option>state_checkin (3D sliders)</option>
            <option>voice_prompt</option>
          </select>
        </div>

        <button style={{
          width: '100%',
          padding: 'var(--spacing-3)',
          background: 'rgba(87, 57, 251, 0.15)',
          border: '1px solid rgba(87, 57, 251, 0.4)',
          borderRadius: 'var(--radius-none)',
          color: 'var(--color-accent)',
          cursor: 'pointer',
        }}>
          Save Configuration
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// STATE BROWSER
// ============================================================================

function StateBrowser() {
  const mockCheckins = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    timestamp: new Date(Date.now() - i * 3600000 * 8).toLocaleString(),
    tempo: Math.floor(Math.random() * 100),
    flow: Math.floor(Math.random() * 100),
    sync: Math.floor(Math.random() * 100),
    arousal: ['red', 'amber', 'green'][Math.floor(Math.random() * 3)],
    trigger: ['proactive', 'luma_prompted', 'user_initiated'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-5)' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>
          State Check-ins Browser
        </h2>

        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {['all', 'red', 'amber', 'green'].map(filter => (
            <button
              key={filter}
              style={{
                padding: 'var(--spacing-1) var(--spacing-3)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'capitalize',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Timestamp</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Tempo</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Flow</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Sync</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Arousal</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Trigger</th>
            </tr>
          </thead>
          <tbody>
            {mockCheckins.map(checkin => (
              <tr key={checkin.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-tertiary)' }}>{checkin.timestamp}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{checkin.tempo}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{checkin.flow}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{checkin.sync}</td>
                <td style={{ padding: 'var(--spacing-2)' }}>
                  <span style={{
                    padding: 'var(--spacing-1) var(--spacing-2)',
                    background: checkin.arousal === 'red' ? 'rgba(255, 0, 0, 0.15)' : checkin.arousal === 'amber' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(0, 217, 163, 0.15)',
                    border: `1px solid ${checkin.arousal === 'red' ? '#FF4444' : checkin.arousal === 'amber' ? '#FFB800' : '#00D9A3'}`,
                    borderRadius: 'var(--radius-none)',
                    fontSize: '11px',
                    color: checkin.arousal === 'red' ? '#FF4444' : checkin.arousal === 'amber' ? '#FFB800' : '#00D9A3',
                  }}>
                    {checkin.arousal}
                  </span>
                </td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-tertiary)', fontSize: '11px' }}>
                  {checkin.trigger}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

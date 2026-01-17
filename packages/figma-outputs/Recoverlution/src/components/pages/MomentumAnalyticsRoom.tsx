/**
 * MOMENTUM ANALYTICS - Command Center Room
 * 
 * Progress made visible — LUMA telemetry dashboard
 * 
 * NOTE: Builds AFTER LUMA telemetry is live
 */

import React, { useState } from 'react';

interface MomentumAnalyticsRoomProps {
  onNavigate: (page: string) => void;
}

export default function MomentumAnalyticsRoom({ onNavigate }: MomentumAnalyticsRoomProps) {
  const [viewMode, setViewMode] = useState<'schema' | 'kbe' | 'arousal' | 'proof'>('schema');

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button onClick={() => onNavigate('/command-center-execution')} style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', padding: 'var(--spacing-2) var(--spacing-3)', color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 'var(--spacing-4)' }}>
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>📈</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Momentum Analytics</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Progress made visible — Schema heat · KBE · Durability · Transfer success
        </p>

        <div style={{ background: 'rgba(255, 184, 0, 0.08)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-4)' }}>
          <strong style={{ color: '#FFB800' }}>⚠️ Note:</strong> This room builds AFTER LUMA telemetry is live. Mock data shown below.
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {['schema', 'kbe', 'arousal', 'proof'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode as any)} style={{ padding: 'var(--spacing-2) var(--spacing-3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', background: viewMode === mode ? 'rgba(87, 57, 251, 0.12)' : 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: '13px' }}>
              {mode === 'schema' && '🔥 Schema Heat'}
              {mode === 'kbe' && '📚 KBE Progression'}
              {mode === 'arousal' && '🎯 Arousal Regulation'}
              {mode === 'proof' && '✅ Proof & Durability'}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'schema' && <SchemaHeat />}
      {viewMode === 'kbe' && <KBEProgression />}
      {viewMode === 'arousal' && <ArousalRegulation />}
      {viewMode === 'proof' && <ProofDurability />}
    </div>
  );
}

function SchemaHeat() {
  const schemas = ['shame', 'control', 'perfectionism', 'worthlessness', 'abandonment', 'mistrust'];
  
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Schema Heat Timeline</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>Which mindblocks are active over time?</p>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Schema</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Engagement</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Resistance</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Fusion</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {schemas.map(schema => {
              const engagement = Math.floor(Math.random() * 50) + 20;
              const resistance = Math.floor(Math.random() * 10);
              const fusion = Math.floor(Math.random() * 10);
              return (
                <tr key={schema} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>{schema}</td>
                  <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{engagement}</td>
                  <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{resistance.toFixed(1)}</td>
                  <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{fusion.toFixed(1)}</td>
                  <td style={{ padding: 'var(--spacing-2)' }}>
                    <span style={{ color: Math.random() > 0.5 ? '#00D9A3' : '#FFB800' }}>
                      {Math.random() > 0.5 ? '↗️ Improving' : '→ Stable'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KBEProgression() {
  const pillars = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'];
  
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>KBE Progression</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>Movement from knowing → believing → embodying</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-4)' }}>
        {pillars.map(pillar => (
          <div key={pillar} className="glass-secondary" style={{ padding: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>{pillar}</h3>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-1)' }}>Knowing</div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-none)' }}>
                <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#5739FB', borderRadius: 'var(--radius-none)' }} />
              </div>
            </div>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-1)' }}>Believing</div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-none)' }}>
                <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#FFB800', borderRadius: 'var(--radius-none)' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-1)' }}>Embodying</div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-none)' }}>
                <div style={{ width: `${Math.random() * 100}%`, height: '100%', background: '#00D9A3', borderRadius: 'var(--radius-none)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArousalRegulation() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Arousal Regulation Dashboard</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>Is regulation improving?</p>
      
      <div style={{ height: '200px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-none)', display: 'flex', alignItems: 'flex-end', padding: 'var(--spacing-4)', gap: '4px' }}>
        {Array.from({ length: 30 }, (_, i) => {
          const height = 0.3 + (i / 30) * 0.5; // Improving trend
          const color = height < 0.4 ? '#FF4444' : height < 0.7 ? '#FFB800' : '#00D9A3';
          return <div key={i} style={{ flex: 1, height: `${height * 100}%`, background: color, opacity: 0.7, borderRadius: 'var(--radius-none)' }} />;
        })}
      </div>
      
      <div style={{ marginTop: 'var(--spacing-5)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: '#00D9A3', marginBottom: 'var(--spacing-2)' }}>↗️ Improving</div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Green states increased by 40% over last 30 days</div>
      </div>
    </div>
  );
}

function ProofDurability() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Proof & Durability Tracker</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-5)' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Proof Density</h3>
          <div style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-2)' }}>8.3</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Micro-proofs per week</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Transfer Success</h3>
          <div style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: '#00D9A3', marginBottom: 'var(--spacing-2)' }}>73%</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Change happening outside app</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Durability Score</h3>
          <div style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: '#FFB800', marginBottom: 'var(--spacing-2)' }}>6.2</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Average weeks change lasts</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Prediction Errors</h3>
          <div style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-2)' }}>12</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Learning events this month</div>
        </div>
      </div>
    </div>
  );
}

/**
 * NAVIGATE ORCHESTRATOR - Command Center Room
 * 
 * The people and places that hold you
 * Next-gen feed: Calendar + Meetup + Alumni integration
 */

import React, { useState } from 'react';

interface NavigateOrchestratorRoomProps {
  onNavigate: (page: string) => void;
}

export default function NavigateOrchestratorRoom({ onNavigate }: NavigateOrchestratorRoomProps) {
  const [viewMode, setViewMode] = useState<'integrations' | 'events' | 'alumni'>('integrations');

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button onClick={() => onNavigate('/command-center-execution')} style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', padding: 'var(--spacing-2) var(--spacing-3)', color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 'var(--spacing-4)' }}>
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>🗺️</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Navigate Orchestrator</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Next-gen feed — Calendar · AA/NA/SMART · Meetup · Alumni integration
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {['integrations', 'events', 'alumni'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode as any)} style={{ padding: 'var(--spacing-2) var(--spacing-4)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', background: viewMode === mode ? 'rgba(87, 57, 251, 0.12)' : 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
              {mode === 'integrations' && '🔌 Integrations'}
              {mode === 'events' && '📅 Event Tagger'}
              {mode === 'alumni' && '💬 Alumni Analyzer'}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'integrations' && <IntegrationsView />}
      {viewMode === 'events' && <EventTagger />}
      {viewMode === 'alumni' && <AlumniAnalyzer />}
    </div>
  );
}

function IntegrationsView() {
  const integrations = [
    { id: 'google', name: 'Google Calendar', status: 'pending', icon: '📅' },
    { id: 'apple', name: 'Apple Calendar', status: 'pending', icon: '🍎' },
    { id: 'outlook', name: 'Outlook Calendar', status: 'pending', icon: '📧' },
    { id: 'aa', name: 'AA Meeting Finder', status: 'pending', icon: '🤝' },
    { id: 'na', name: 'NA Meeting Finder', status: 'pending', icon: '🌟' },
    { id: 'smart', name: 'SMART Recovery', status: 'pending', icon: '🧠' },
    { id: 'meetup', name: 'Meetup.com', status: 'pending', icon: '👥' },
    { id: 'alumni', name: 'Alumni Stream Chat', status: 'active', icon: '💬' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
      {integrations.map(integration => (
        <div key={integration.id} className="glass-secondary" style={{ padding: 'var(--spacing-5)' }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-3)' }}>{integration.icon}</div>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-2)' }}>{integration.name}</h3>
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <span style={{ padding: 'var(--spacing-1) var(--spacing-2)', background: integration.status === 'active' ? 'rgba(0, 217, 163, 0.15)' : 'rgba(255, 184, 0, 0.15)', border: `1px solid ${integration.status === 'active' ? '#00D9A3' : '#FFB800'}`, borderRadius: 'var(--radius-none)', fontSize: '11px', color: integration.status === 'active' ? '#00D9A3' : '#FFB800', textTransform: 'uppercase' }}>
              {integration.status}
            </span>
          </div>
          <button style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(87, 57, 251, 0.12)', border: '1px solid rgba(87, 57, 251, 0.3)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer' }}>
            {integration.status === 'active' ? 'Configure' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  );
}

function EventTagger() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Event Tagger</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>Tag external events with pillar_ids and social_connectivity_value for LUMA recommendations</p>
      
      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Event Type</label>
          <select style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)' }}>
            <option>AA Meeting</option>
            <option>NA Meeting</option>
            <option>SMART Recovery</option>
            <option>Therapy Session</option>
            <option>Social Event</option>
          </select>
        </div>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Social Connectivity Value (1-10)</label>
          <input type="range" min="1" max="10" defaultValue="7" style={{ width: '100%' }} />
        </div>

        <button style={{ width: '100%', padding: 'var(--spacing-3)', background: 'rgba(87, 57, 251, 0.15)', border: '1px solid rgba(87, 57, 251, 0.4)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer' }}>
          Save Event Tags
        </button>
      </div>
    </div>
  );
}

function AlumniAnalyzer() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Alumni Post Analyzer</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>AI-powered schema/pillar auto-tagger for community posts</p>
      
      <div style={{ background: 'rgba(255, 184, 0, 0.08)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-5)' }}>
        <strong style={{ color: '#FFB800' }}>Auto-Tagging Strategy:</strong>
        <ul style={{ marginTop: 'var(--spacing-2)', paddingLeft: 'var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
          <li>AI analyzes post content for schema keywords</li>
          <li>Suggests pillar_ids based on themes</li>
          <li>LUMA surfaces relevant posts to users working on matching schemas</li>
          <li>Community stays connected through intelligent content discovery</li>
        </ul>
      </div>

      <button style={{ width: '100%', padding: 'var(--spacing-3)', background: 'rgba(87, 57, 251, 0.15)', border: '1px solid rgba(87, 57, 251, 0.4)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer' }}>
        Run AI Auto-Tagger
      </button>
    </div>
  );
}

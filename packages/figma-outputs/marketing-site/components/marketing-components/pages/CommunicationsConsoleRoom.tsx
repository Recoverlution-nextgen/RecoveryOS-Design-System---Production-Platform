/**
 * COMMUNICATIONS CONSOLE - Command Center Room
 * 
 * Notification flow & intent — When do we send? What's the purpose?
 */

import React, { useState } from 'react';

interface CommunicationsConsoleRoomProps {
  onNavigate: (page: string) => void;
}

export default function CommunicationsConsoleRoom({ onNavigate }: CommunicationsConsoleRoomProps) {
  const [viewMode, setViewMode] = useState<'rules' | 'editor' | 'analytics'>('rules');

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button onClick={() => onNavigate('/command-center-execution')} style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', padding: 'var(--spacing-2) var(--spacing-3)', color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 'var(--spacing-4)' }}>
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>📢</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Communications Console</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Notification flow & intent — Timing rules · Arousal filtering · Analytics
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {['rules', 'editor', 'analytics'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode as any)} style={{ padding: 'var(--spacing-2) var(--spacing-4)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', background: viewMode === mode ? 'rgba(87, 57, 251, 0.12)' : 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
              {mode === 'rules' && '📋 Rules Manager'}
              {mode === 'editor' && '✏️ Rule Editor'}
              {mode === 'analytics' && '📊 Analytics'}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'rules' && <RulesManager />}
      {viewMode === 'editor' && <RuleEditor />}
      {viewMode === 'analytics' && <NotificationAnalytics />}
    </div>
  );
}

function RulesManager() {
  const rules = [
    { id: 1, name: 'Morning State Check-in', type: 'state_checkin', trigger: 'time_based', time: '09:00', status: 'active' },
    { id: 2, name: 'Evening State Check-in', type: 'state_checkin', trigger: 'time_based', time: '21:00', status: 'active' },
    { id: 3, name: 'Journey Scene Due', type: 'journey_reminder', trigger: 'event_based', status: 'active' },
    { id: 4, name: 'Proof Capture Reminder', type: 'proof_reminder', trigger: 'event_based', status: 'active' },
    { id: 5, name: 'Alumni Activity', type: 'alumni_notification', trigger: 'luma_orchestrated', status: 'active' },
    { id: 6, name: 'Wellness Suggestion', type: 'wellness_prompt', trigger: 'time_based', time: '18:00', status: 'draft' },
  ];

  return (
    <div>
      <div className="glass-primary" style={{ padding: 'var(--spacing-5)', marginBottom: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Notification Rules</h2>
          <button style={{ padding: 'var(--spacing-2) var(--spacing-4)', background: 'rgba(87, 57, 251, 0.15)', border: '1px solid rgba(87, 57, 251, 0.4)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer' }}>
            + Create Rule
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-4)' }}>
        {rules.map(rule => (
          <div key={rule.id} className="glass-secondary" style={{ padding: 'var(--spacing-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)' }}>{rule.name}</h3>
              <span style={{ padding: 'var(--spacing-1) var(--spacing-2)', background: rule.status === 'active' ? 'rgba(0, 217, 163, 0.15)' : 'rgba(255, 184, 0, 0.15)', border: `1px solid ${rule.status === 'active' ? '#00D9A3' : '#FFB800'}`, borderRadius: 'var(--radius-none)', fontSize: '10px', color: rule.status === 'active' ? '#00D9A3' : '#FFB800', textTransform: 'uppercase' }}>
                {rule.status}
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-2)' }}>
              Type: {rule.type}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-4)' }}>
              Trigger: {rule.trigger} {rule.time && `@ ${rule.time}`}
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <button style={{ flex: 1, padding: 'var(--spacing-2)', background: 'rgba(87, 57, 251, 0.08)', border: '1px solid rgba(87, 57, 251, 0.3)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer', fontSize: '12px' }}>
                Edit
              </button>
              <button style={{ padding: 'var(--spacing-2) var(--spacing-3)', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '12px' }}>
                Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RuleEditor() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Rule Editor</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-5)' }}>
        <div>
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Rule Name</label>
            <input type="text" placeholder="Morning State Check-in" style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)' }} />
          </div>

          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Notification Type</label>
            <select style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)' }}>
              <option>state_checkin</option>
              <option>journey_reminder</option>
              <option>proof_reminder</option>
              <option>wellness_prompt</option>
              <option>alumni_notification</option>
            </select>
          </div>

          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Notification Title</label>
            <input type="text" placeholder="How are you feeling right now?" style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)' }} />
          </div>

          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>Notification Body</label>
            <textarea placeholder="Take a moment to check in with yourself..." style={{ width: '100%', minHeight: '80px', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)', resize: 'vertical' }} />
          </div>
        </div>

        <div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Trigger Settings</h3>
            
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Trigger Event</label>
              <select style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)', marginTop: 'var(--spacing-1)' }}>
                <option>time_based</option>
                <option>event_based</option>
                <option>luma_orchestrated</option>
              </select>
            </div>

            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Time</label>
              <input type="time" defaultValue="09:00" style={{ width: '100%', padding: 'var(--spacing-2)', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-primary)', marginTop: 'var(--spacing-1)' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Timing Rules</h3>
            
            <div style={{ marginBottom: 'var(--spacing-2)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Quiet Hours: 22:00 - 08:00
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Max per day: 3
            </div>
          </div>

          <button style={{ width: '100%', padding: 'var(--spacing-3)', background: 'rgba(87, 57, 251, 0.15)', border: '1px solid rgba(87, 57, 251, 0.4)', borderRadius: 'var(--radius-none)', color: 'var(--color-accent)', cursor: 'pointer', marginBottom: 'var(--spacing-2)' }}>
            Save Rule
          </button>

          <button style={{ width: '100%', padding: 'var(--spacing-2)', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 'var(--radius-none)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            Send Test Notification
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationAnalytics() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>Notification Analytics</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-1)' }}>1,247</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Sent (Last 30 days)</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: '#00D9A3', marginBottom: 'var(--spacing-1)' }}>68%</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Open Rate</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: '#FFB800', marginBottom: 'var(--spacing-1)' }}>42%</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Action Rate</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-1)' }}>2.1</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Avg per day</div>
        </div>
      </div>

      <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Performance by Type</h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Type</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Sent</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Opened</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Action Taken</th>
              <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {['State Check-in', 'Journey Reminder', 'Proof Reminder', 'Alumni Activity', 'Wellness Prompt'].map(type => (
              <tr key={type} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{type}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{Math.floor(Math.random() * 300)}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{Math.floor(Math.random() * 200)}</td>
                <td style={{ padding: 'var(--spacing-2)', color: 'var(--color-text-primary)' }}>{Math.floor(Math.random() * 100)}</td>
                <td style={{ padding: 'var(--spacing-2)', color: '#00D9A3' }}>{Math.floor(Math.random() * 30 + 50)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

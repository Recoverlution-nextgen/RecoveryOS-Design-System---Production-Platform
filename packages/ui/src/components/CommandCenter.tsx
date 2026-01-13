import React from 'react';
import { IntegrityLog } from '../types/events';

interface CommandCenterProps {
  logs: IntegrityLog[];
  organizationName?: string;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ logs, organizationName = 'RecoveryOS' }) => {
  const quietHoursOk = logs.filter((l) => l.quiet_hours_adherence).length;
  const consentOk = logs.filter((l) => l.consent_adherence).length;
  const deliveryOk = logs.filter((l) => l.delivery_success).length;

  const compliance = logs.length > 0 ? {
    quiet_hours: Math.round((quietHoursOk / logs.length) * 100),
    consent: Math.round((consentOk / logs.length) * 100),
    delivery: Math.round((deliveryOk / logs.length) * 100),
  } : { quiet_hours: 0, consent: 0, delivery: 0 };

  const escalations = logs.filter((l) => l.escalation_protocol_used).length;

  return (
    <div className="card" role="region" aria-label="Command center">
      <div className="stack" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 className="title" style={{ margin: 0 }}>
            Command Center
          </h2>
          <span className="label">{organizationName}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Deliveries</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{logs.length}</p>
          </div>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Compliance</p>
            <div className="progress" style={{ marginTop: 4 }}>
              <span className={`dot ${compliance.quiet_hours > 90 ? 'active' : ''}`} />
              <span style={{ fontSize: 12 }}>{compliance.quiet_hours}%</span>
            </div>
          </div>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Consent OK</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{compliance.consent}%</p>
          </div>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Escalations</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{escalations}</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="stack" style={{ gap: 8 }}>
          <p className="label">Continuity audit trail</p>
          <div className="kv" style={{ fontSize: 12 }}>
            <span className="label">Quiet hours</span>
            <span>Adherence: {compliance.quiet_hours}%</span>
            <span className="label">Consent</span>
            <span>Adherence: {compliance.consent}%</span>
            <span className="label">Delivery</span>
            <span>Success: {compliance.delivery}%</span>
            <span className="label">Last update</span>
            <span>{logs.length > 0 ? new Date(logs[logs.length - 1].timestamp).toLocaleString() : '—'}</span>
          </div>
        </div>

        <hr className="divider" />

        <div className="stack" style={{ gap: 6 }}>
          <p className="label">Escalation protocols used</p>
          {logs.filter((l) => l.escalation_protocol_used).length === 0 ? (
            <span className="subtitle" style={{ margin: 0 }}>No escalations recorded.</span>
          ) : (
            <div className="list">
              {Array.from(new Set(logs.filter((l) => l.escalation_protocol_used).map((l) => l.escalation_protocol_used))).map(
                (proto) => (
                  <div key={proto} className="chip">
                    {proto}
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <hr className="divider" />

        <div className="row" style={{ gap: 8, justifyContent: 'center' }}>
          <span className="label">Defensible continuity: moment → clinician → org</span>
        </div>
      </div>
    </div>
  );
};

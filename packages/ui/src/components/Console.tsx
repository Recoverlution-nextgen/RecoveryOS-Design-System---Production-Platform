import React from 'react';
import { RecoveryOSEvent } from '../types/events';

interface ConsoleProps {
  events: RecoveryOSEvent[];
  personName?: string;
}

export const Console: React.FC<ConsoleProps> = ({ events, personName = 'Patient' }) => {
  const heatTrend = events.slice(-5).reduce((acc, e) => {
    const bands = { safe: 1, caution: 2, alert: 3 };
    return [...acc, bands[e.contract.heatBand]];
  }, [] as number[]);

  const avgHeat = heatTrend.length > 0 ? (heatTrend.reduce((a, b) => a + b) / heatTrend.length).toFixed(1) : '—';

  const successRate = events.length > 0
    ? (((events.filter((e) => e.status === 'captured').length / events.length) * 100).toFixed(0) + '%')
    : '—';

  return (
    <div className="card" role="region" aria-label="Clinician console">
      <div className="stack" style={{ gap: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 className="title" style={{ margin: 0 }}>
            Console · {personName}
          </h2>
          <span className="label">Live signal</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Events</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{events.length}</p>
          </div>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Success rate</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{successRate}</p>
          </div>
          <div className="panel" style={{ padding: '10px 12px' }}>
            <p className="label" style={{ margin: 0 }}>Avg heat</p>
            <p className="title" style={{ margin: '4px 0 0 0', fontSize: 24 }}>{avgHeat}</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="stack" style={{ gap: 8 }}>
          <p className="label">Event signal stream</p>
          <div style={{ maxHeight: 240, overflowY: 'auto' }} className="list">
            {events.length === 0 ? (
              <p className="subtitle" style={{ margin: 0 }}>No events yet. Awaiting first proof capture.</p>
            ) : (
              events
                .slice()
                .reverse()
                .map((e) => (
                  <div
                    key={e.delivery_id}
                    className="list-row"
                    style={{ paddingTop: 8, paddingBottom: 8 }}
                    role="listitem"
                  >
                    <div className={`badge ${e.contract.heatBand}`}>{e.status}</div>
                    <div className="stack" style={{ gap: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{e.contract.primitive}</span>
                      <span className="subtitle" style={{ margin: 0, fontSize: 11 }}>
                        {e.contract.aim} · {e.contract.target}
                      </span>
                      <span className="label" style={{ margin: 0 }}>
                        {new Date(e.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <hr className="divider" />

        <div className="stack" style={{ gap: 6 }}>
          <p className="label">Consent adherence</p>
          <div className="row" style={{ gap: 8 }}>
            {events.length > 0 ? (
              <>
                <span className="chip">State signals {events[0].consent_scope.state_signals ? '✓' : '✗'}</span>
                <span className="chip">Notifications {events[0].consent_scope.notifications ? '✓' : '✗'}</span>
                <span className="chip">Escalation {events[0].consent_scope.escalation_contact ? '✓' : '✗'}</span>
              </>
            ) : (
              <span className="subtitle" style={{ margin: 0 }}>No consent data.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

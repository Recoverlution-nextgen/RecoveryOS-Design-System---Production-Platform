import React from 'react';

export interface QuietHoursPickerProps {
  start: string; // HH:MM
  end: string; // HH:MM
  onChange?: (value: { start: string; end: string }) => void;
}

export const QuietHoursPicker: React.FC<QuietHoursPickerProps> = ({ start, end, onChange }) => {
  const update = (key: 'start' | 'end', value: string) => {
    onChange?.({ start: key === 'start' ? value : start, end: key === 'end' ? value : end });
  };

  return (
    <div className="panel" aria-label="Quiet hours">
      <h3 className="panel-title">Quiet hours</h3>
      <p className="panel-subtitle">Set when the system stays silent unless escalation is required.</p>
      <div className="row" style={{ gap: 12 }}>
        <div className="stack" style={{ gap: 6 }}>
          <label className="label" htmlFor="qh-start">Start</label>
          <input
            id="qh-start"
            type="time"
            value={start}
            onChange={(e) => update('start', e.target.value)}
            className="panel"
            style={{ padding: '8px 10px', width: 140, borderRadius: 'var(--radius-sm)' }}
          />
        </div>
        <div className="stack" style={{ gap: 6 }}>
          <label className="label" htmlFor="qh-end">End</label>
          <input
            id="qh-end"
            type="time"
            value={end}
            onChange={(e) => update('end', e.target.value)}
            className="panel"
            style={{ padding: '8px 10px', width: 140, borderRadius: 'var(--radius-sm)' }}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10, gap: 10 }}>
        <span className="chip">Quiet unless escalated</span>
        <span className="subtitle" style={{ margin: 0 }}>
          Escalations bypass quiet hours only by consent and protocol.
        </span>
      </div>
    </div>
  );
};

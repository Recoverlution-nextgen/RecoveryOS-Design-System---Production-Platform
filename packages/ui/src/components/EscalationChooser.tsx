import React from 'react';

export interface EscalationOption {
  id: string;
  label: string;
  description: string;
  contact?: string;
  protocol?: string;
}

interface EscalationChooserProps {
  options: EscalationOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export const EscalationChooser: React.FC<EscalationChooserProps> = ({ options, selectedId, onSelect }) => {
  return (
    <div className="panel" role="radiogroup" aria-label="Escalation options">
      <h3 className="panel-title">Escalation path</h3>
      <p className="panel-subtitle">Choose who to bring in, by protocol and consent.</p>
      <div className="list">
        {options.map((opt) => {
          const active = selectedId === opt.id;
          return (
            <div key={opt.id} className="list-row" role="radio" aria-checked={active} tabIndex={0}
              onClick={() => onSelect?.(opt.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect?.(opt.id);
                }
              }}
            >
              <div className={`badge ${active ? 'safe' : 'caution'}`}>{active ? 'Selected' : 'Available'}</div>
              <div className="stack" style={{ gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{opt.label}</span>
                <span className="subtitle" style={{ margin: 0 }}>{opt.description}</span>
                <div className="row" style={{ gap: 8 }}>
                  {opt.contact ? <span className="chip">Contact: {opt.contact}</span> : null}
                  {opt.protocol ? <span className="chip">Protocol: {opt.protocol}</span> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

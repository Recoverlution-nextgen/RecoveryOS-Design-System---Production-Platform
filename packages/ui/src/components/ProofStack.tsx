import React from 'react';
import { ProofPill, ProofStatus } from './ProofPill';

export interface ProofEntry {
  id: string;
  label: string;
  intent?: string;
  timestamp?: string;
  status: ProofStatus;
  target?: string;
  dose?: string;
}

interface ProofStackProps {
  title?: string;
  entries: ProofEntry[];
}

export const ProofStack: React.FC<ProofStackProps> = ({ title = 'Proof stack', entries }) => {
  return (
    <div className="card" role="list" aria-label="Proof stack">
      <div className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 className="title" style={{ margin: 0 }}>{title}</h3>
          <span className="label">Receipts</span>
        </div>
        <div className="list">
          {entries.map((entry) => (
            <div key={entry.id} className="row" role="listitem" style={{ gap: 12 }}>
              <ProofPill
                label={entry.label}
                status={entry.status}
                timestamp={entry.timestamp}
                intent={entry.intent}
              />
              <div className="stack" style={{ gap: 4 }}>
                {entry.target ? (
                  <span className="label">Target · {entry.target}</span>
                ) : null}
                {entry.dose ? <span className="subtitle">Dose · {entry.dose}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

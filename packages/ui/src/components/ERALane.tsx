import React from 'react';

export type ERAStepStatus = 'pending' | 'active' | 'done';

export interface ERAStep {
  id: string;
  label: string;
  description?: string;
  status: ERAStepStatus;
}

interface ERALaneProps {
  steps?: ERAStep[];
}

const defaultSteps: ERAStep[] = [
  { id: 'experience', label: 'Experience', description: 'Felt shift, body-first', status: 'active' },
  { id: 'recognise', label: 'Recognise', description: 'Name it while it happens', status: 'pending' },
  { id: 'align', label: 'Align', description: 'Place one real-world move', status: 'pending' },
];

const statusTone: Record<ERAStepStatus, string> = {
  done: 'safe',
  active: 'caution',
  pending: 'alert',
};

export const ERALane: React.FC<ERALaneProps> = ({ steps = defaultSteps }) => {
  return (
    <div className="card" aria-label="ERA lane">
      <div className="stack" style={{ gap: 10 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="stack" style={{ gap: 4 }}>
            <p className="label">WEEKLY LOOP · ERA</p>
            <h3 className="title" style={{ margin: 0 }}>Experience → Recognise → Align</h3>
          </div>
          <span className="label">Baselines</span>
        </div>
        <div className="timeline">
          {steps.map((step) => (
            <div key={step.id} className="timeline-step">
              <div className="step-head">
                <span className={`badge ${statusTone[step.status]}`}>{step.status}</span>
                <span className="label">{step.id}</span>
              </div>
              <h4 className="title" style={{ fontSize: 16, lineHeight: '22px', margin: '4px 0' }}>
                {step.label}
              </h4>
              {step.description ? (
                <p className="subtitle" style={{ margin: 0 }}>{step.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

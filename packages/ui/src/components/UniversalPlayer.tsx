import React from 'react';
import { ProofPill, ProofStatus } from './ProofPill';

export interface PlayerContract {
  target: string;
  mechanism: string;
  primitive: string;
  heatBand: 'safe' | 'caution' | 'alert';
  proofRequest: string;
  duration?: string;
}

interface UniversalPlayerProps {
  title: string;
  description?: string;
  contract: PlayerContract;
  status?: ProofStatus;
  onStart?: () => void;
  onSeal?: () => void;
  onLater?: () => void;
}

export const UniversalPlayer: React.FC<UniversalPlayerProps> = ({
  title,
  description,
  contract,
  status = 'pending',
  onStart,
  onSeal,
  onLater,
}) => {
  return (
    <div className="card" role="article" aria-label={title}>
      <div className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="stack" style={{ gap: 6 }}>
            <p className="label">UNIVERSAL PLAYER</p>
            <h3 className="title" style={{ margin: 0 }}>{title}</h3>
            {description ? <p className="subtitle">{description}</p> : null}
          </div>
          <div className={`badge ${contract.heatBand}`}>Heat: {contract.heatBand}</div>
        </div>

        <div className="kv">
          <span className="label">Target</span>
          <span>{contract.target}</span>
          <span className="label">Mechanism</span>
          <span>{contract.mechanism}</span>
          <span className="label">Primitive</span>
          <span>{contract.primitive}</span>
          <span className="label">Proof request</span>
          <span>{contract.proofRequest}</span>
          {contract.duration ? (
            <>
              <span className="label">Duration</span>
              <span>{contract.duration}</span>
            </>
          ) : null}
        </div>

        <div className="progress" aria-label="Sequence">
          {['Sense', 'Route', 'Deliver', 'Seal'].map((step, idx) => (
            <React.Fragment key={step}>
              <span className={`dot ${idx <= 2 ? 'active' : ''}`} />
              <span>{step}</span>
            </React.Fragment>
          ))}
        </div>

        <ProofPill label="Receipt" status={status} intent={contract.proofRequest} />

        <div className="row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <button className="button secondary" onClick={onLater}>
            Later
          </button>
          <button className="button secondary" onClick={onStart}>
            Start
          </button>
          <button className="button" onClick={onSeal}>
            Seal proof
          </button>
        </div>
      </div>
    </div>
  );
};

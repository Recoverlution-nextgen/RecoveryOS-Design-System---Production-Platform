import React from 'react';
import { ProofPill, ProofStatus } from './ProofPill';

export interface NaviCueCardProps {
  title: string;
  intent: string;
  suitability: 'safe' | 'caution' | 'alert';
  primitive: string;
  proofRequest: string;
  status?: ProofStatus;
  onPlace?: () => void;
  onLater?: () => void;
}

export const NaviCueCard: React.FC<NaviCueCardProps> = ({
  title,
  intent,
  suitability,
  primitive,
  proofRequest,
  status = 'pending',
  onPlace,
  onLater,
}) => {
  return (
    <div className="card" role="article" aria-label={title}>
      <div className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="stack" style={{ gap: 4 }}>
            <p className="label">NAVICUE · RIGHT NOW</p>
            <h3 className="title">{title}</h3>
            <p className="subtitle">Intent: {intent}</p>
          </div>
          <div className={`badge ${suitability}`}>Heat band: {suitability}</div>
        </div>

        <hr className="divider" />

        <div className="kv">
          <span className="label">Primitive</span>
          <span>{primitive}</span>
          <span className="label">Proof request</span>
          <span>{proofRequest}</span>
        </div>

        <ProofPill label="Receipt" status={status} intent={intent} />

        <div className="row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <button className="button secondary" onClick={onLater}>
            Later
          </button>
          <button className="button" onClick={onPlace}>
            Place move
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export type ProofStatus = 'captured' | 'pending' | 'missed';

interface ProofPillProps {
  label: string;
  status: ProofStatus;
  timestamp?: string;
  intent?: string;
}

const statusTone: Record<ProofStatus, string> = {
  captured: 'safe',
  pending: 'caution',
  missed: 'alert',
};

const statusCopy: Record<ProofStatus, string> = {
  captured: 'Proof captured',
  pending: 'Proof requested',
  missed: 'Proof missed',
};

export const ProofPill: React.FC<ProofPillProps> = ({ label, status, timestamp, intent }) => {
  const tone = statusTone[status];
  return (
    <div className={`badge ${tone}`} aria-live="polite">
      <div className="stack" style={{ gap: 2 }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {statusCopy[status]}
          {intent ? ` · ${intent}` : ''}
          {timestamp ? ` · ${timestamp}` : ''}
        </span>
      </div>
    </div>
  );
};

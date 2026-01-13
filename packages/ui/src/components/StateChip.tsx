import React from 'react';

export type Tone = 'safe' | 'caution' | 'alert';

interface StateChipProps {
  label: string;
  value: string;
  tone?: Tone;
}

export const StateChip: React.FC<StateChipProps> = ({ label, value, tone = 'safe' }) => {
  return (
    <div className={`badge ${tone}`} aria-label={`${label} ${value}`}>
      <span className="label">{label}</span>
      <span>{value}</span>
    </div>
  );
};

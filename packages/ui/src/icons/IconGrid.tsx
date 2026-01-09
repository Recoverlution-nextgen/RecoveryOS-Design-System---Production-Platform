import React, { useMemo, useState } from 'react';
import { Icon } from './Icon';
import type { IconName, IconTone } from './Icon';

const ALL: IconName[] = [
  // core
  'spine',
  'lens',
  'altitude',
  'trace',
  'receipt',
  // loop
  'sense',
  'route',
  'deliver',
  'seal',
  'review',
  'continuity',
  'orchestrate',
  // trust
  'consentMap',
  'quietHours',
  'escalation',
  'governance',
  'integrityLog',
  // utility
  'play',
  'pause',
  'next',
  'back',
  'close',
  'info',
  'external',
  'chevronDown',
  // pillars
  'pillarER',
  'pillarSR',
  'pillarSC',
  'pillarCR',
  'pillarII',
  'pillarDM',
];

const SIZES = [16, 20, 24, 32] as const;
const TONES: IconTone[] = ['ink', 'muted', 'cyan', 'pillar'];

export function IconGrid() {
  const [tone, setTone] = useState<IconTone>('ink');
  const [pulse, setPulse] = useState(false);

  const rows = useMemo(() => ALL, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
        <label htmlFor="tone-select" style={{ fontSize: 12, opacity: 0.75 }}>
          Tone
        </label>
        <select id="tone-select" value={tone} onChange={(e) => setTone(e.target.value as IconTone)}>
          {TONES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label htmlFor="pulse-checkbox" style={{ fontSize: 12, opacity: 0.75, marginLeft: 12 }}>
          <input
            id="pulse-checkbox"
            type="checkbox"
            checked={pulse}
            onChange={(e) => setPulse(e.target.checked)}
          />
          <span style={{ marginLeft: 6 }}>Pulse</span>
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px repeat(4, 120px)', gap: 10 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Name</div>
        {SIZES.map((s) => (
          <div key={s} style={{ fontSize: 12, opacity: 0.7 }}>
            {s}px
          </div>
        ))}

        {rows.map((name) => (
          <React.Fragment key={name}>
            <div style={{ fontFamily: 'Inter, system-ui', fontSize: 12, opacity: 0.85 }}>{name}</div>
            {SIZES.map((size) => (
              <div
                key={`${name}-${size}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: 44,
                  borderRadius: 12,
                  border: '1px solid rgba(233,231,255,0.12)',
                  paddingLeft: 12,
                  background: 'rgba(21,20,42,0.35)',
                }}
              >
                <Icon name={name} size={size} tone={tone} pulse={pulse && name === 'seal'} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

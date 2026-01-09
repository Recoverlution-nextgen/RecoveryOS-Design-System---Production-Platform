import React from 'react';

export interface ConsentScope {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  enabled: boolean;
}

interface ConsentSheetProps {
  title?: string;
  subtitle?: string;
  scopes: ConsentScope[];
  onToggle?: (id: string, next: boolean) => void;
}

export const ConsentSheet: React.FC<ConsentSheetProps> = ({
  title = 'Consent preferences',
  subtitle = 'Choose what the system can see and when it can speak.',
  scopes,
  onToggle,
}) => {
  return (
    <div className="panel" role="group" aria-label={title}>
      <h3 className="panel-title">{title}</h3>
      <p className="panel-subtitle">{subtitle}</p>
      <div className="list">
        {scopes.map((scope) => (
          <div key={scope.id} className="list-row">
            <div className={`toggle ${scope.enabled ? 'on' : ''}`}>
              <div
                className="toggle-thumb"
                role="switch"
                aria-checked={scope.enabled}
                tabIndex={0}
                onClick={() => onToggle?.(scope.id, !scope.enabled)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle?.(scope.id, !scope.enabled);
                  }
                }}
              />
            </div>
            <div className="stack" style={{ gap: 4 }}>
              <div className="row" style={{ gap: 6 }}>
                <span style={{ fontWeight: 600 }}>{scope.label}</span>
                {scope.required ? <span className="chip">Required</span> : null}
              </div>
              <span className="subtitle" style={{ margin: 0 }}>{scope.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

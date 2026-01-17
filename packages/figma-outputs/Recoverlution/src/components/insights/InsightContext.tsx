import React from 'react';

interface InsightContextProps {
  whyItMatters: string;
  contextPath: string;
}

export function InsightContext({ whyItMatters, contextPath }: InsightContextProps) {
  return (
    <div className="glass-panel p-6">
      <div className="mb-3">
        <span className="text-sm text-muted-foreground">{contextPath}</span>
      </div>
      <p className="text-lg">{whyItMatters}</p>
    </div>
  );
}

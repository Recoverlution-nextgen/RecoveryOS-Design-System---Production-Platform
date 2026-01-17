import React from 'react';
import { Zap } from 'lucide-react';

interface InsightApplicationProps {
  instruction: string;
  example: string;
  outcome: string;
}

export function InsightApplication({ instruction, example, outcome }: InsightApplicationProps) {
  return (
    <div className="glass-panel p-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-emerald-600">The Application</span>
      </div>

      <div className="mb-6">
        <h3 className="mb-3">The Move</h3>
        <p className="text-lg">{instruction}</p>
      </div>

      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mb-2">Example Scenario</div>
        <p className="text-sm italic">{example}</p>
      </div>

      <div className="p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 rounded-lg">
        <div className="flex gap-3">
          <Zap className="size-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-emerald-700 mb-1">Expected Outcome</div>
            <p className="text-sm text-emerald-900">{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

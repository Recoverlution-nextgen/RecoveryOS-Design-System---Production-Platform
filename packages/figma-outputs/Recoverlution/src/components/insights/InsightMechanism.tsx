import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InsightMechanismProps {
  content: string;
  keyTakeaway: string;
  visual?: React.ReactNode;
}

export function InsightMechanism({ content, keyTakeaway, visual }: InsightMechanismProps) {
  return (
    <div className="glass-panel p-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-muted-foreground">The Science</span>
      </div>

      <div className="prose prose-slate max-w-none mb-6">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {visual && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          {visual}
        </div>
      )}

      <div className="p-4 bg-primary/5 border-l-4 border-l-primary rounded-lg">
        <div className="flex gap-3">
          <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-primary mb-1">Key Takeaway</div>
            <p className="text-sm">{keyTakeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

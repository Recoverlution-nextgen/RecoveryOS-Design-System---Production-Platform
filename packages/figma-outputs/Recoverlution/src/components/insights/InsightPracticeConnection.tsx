import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface InsightPracticeConnectionProps {
  practiceId: string;
  practiceName: string;
  previewText: string;
  duration?: string;
  onStartPractice: (practiceId: string) => void;
  onLearnMore: (practiceId: string) => void;
}

export function InsightPracticeConnection({
  practiceId,
  practiceName,
  previewText,
  duration = '2-5 min',
  onStartPractice,
  onLearnMore
}: InsightPracticeConnectionProps) {
  return (
    <div className="glass-panel p-6 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary">Try It Now</span>
      </div>

      <h3 className="mb-2">{practiceName}</h3>
      <p className="text-muted-foreground mb-1">{previewText}</p>
      <span className="text-sm text-muted-foreground">{duration}</span>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={() => onStartPractice(practiceId)}
          className="flex-1"
        >
          <Play className="size-4 mr-2" />
          Start Practice
        </Button>
        <Button
          onClick={() => onLearnMore(practiceId)}
          variant="outline"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

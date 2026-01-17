import React, { useState } from 'react';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface RelatedContent {
  id: string;
  type: 'insight' | 'article' | 'practice';
  title: string;
}

interface InsightCompletionProps {
  insightId: string;
  relatedContent: RelatedContent[];
  onComplete: (rating: number) => void;
  onNavigate: (contentId: string, type: string) => void;
}

export function InsightCompletion({
  insightId,
  relatedContent,
  onComplete,
  onNavigate
}: InsightCompletionProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (rating !== null) {
      onComplete(rating);
      setCompleted(true);
    }
  };

  const contentTypeLabels = {
    insight: 'Insight',
    article: 'Article',
    practice: 'Practice'
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h3 className="mb-4">How clear was this insight?</h3>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              disabled={completed}
              className={`
                flex-1 p-4 rounded-lg border-2 transition-all
                ${rating === value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
                }
                ${completed ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <Star
                  className={`size-6 ${rating && rating >= value ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
                <span className="text-sm">{value}</span>
              </div>
            </button>
          ))}
        </div>

        {!completed && (
          <Button
            onClick={handleComplete}
            disabled={rating === null}
            className="w-full"
          >
            <CheckCircle2 className="size-4 mr-2" />
            Mark Complete
          </Button>
        )}

        {completed && (
          <div className="p-4 bg-green-500/10 text-green-700 rounded-lg text-center">
            <CheckCircle2 className="size-6 mx-auto mb-2" />
            <p>Insight completed! Your progress has been recorded.</p>
          </div>
        )}
      </div>

      {relatedContent.length > 0 && (
        <div className="glass-panel p-6">
          <h3 className="mb-4">Continue Learning</h3>
          
          <div className="space-y-3">
            {relatedContent.map((content) => (
              <button
                key={content.id}
                onClick={() => onNavigate(content.id, content.type)}
                className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all group"
              >
                <div className="text-left">
                  <div className="text-sm text-muted-foreground mb-1">
                    {contentTypeLabels[content.type]}
                  </div>
                  <div className="font-medium">{content.title}</div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

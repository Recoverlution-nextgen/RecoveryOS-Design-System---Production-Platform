import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../ui/button';

export type CheckpointType = 'before' | 'comprehension' | 'intent' | 'reflection';

interface InsightCheckpointProps {
  type: CheckpointType;
  question: string;
  options: string[];
  correctAnswer?: number; // For comprehension checks
  onResponse: (response: { answer: string; answerIndex: number }) => void;
}

export function InsightCheckpoint({
  type,
  question,
  options,
  correctAnswer,
  onResponse
}: InsightCheckpointProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const typeLabels = {
    before: 'Before We Begin',
    comprehension: 'Quick Check',
    intent: 'Planning Ahead',
    reflection: 'Reflection'
  };

  const typeColors = {
    before: 'text-blue-600',
    comprehension: 'text-violet-600',
    intent: 'text-emerald-600',
    reflection: 'text-amber-600'
  };

  const handleSelect = (index: number) => {
    if (!submitted) {
      setSelectedIndex(index);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onResponse({
        answer: options[selectedIndex],
        answerIndex: selectedIndex
      });
      setSubmitted(true);
    }
  };

  const showFeedback = submitted && type === 'comprehension' && correctAnswer !== undefined;
  const isCorrect = selectedIndex === correctAnswer;

  return (
    <div className="glass-panel p-6 border-l-4 border-l-primary/20">
      <div className="mb-4">
        <span className={`text-sm font-medium ${typeColors[type]}`}>
          {typeLabels[type]}
        </span>
      </div>

      <h3 className="mb-4">{question}</h3>

      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={submitted}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all
              ${selectedIndex === index
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }
              ${submitted ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
              ${showFeedback && index === correctAnswer ? 'border-green-500 bg-green-500/10' : ''}
              ${showFeedback && selectedIndex === index && !isCorrect ? 'border-red-500 bg-red-500/10' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              {selectedIndex === index ? (
                <CheckCircle2 className="size-5 text-primary shrink-0" />
              ) : (
                <Circle className="size-5 text-muted-foreground shrink-0" />
              )}
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={selectedIndex === null}
          className="w-full"
        >
          Continue
        </Button>
      )}

      {showFeedback && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-500/10 text-green-700' : 'bg-amber-500/10 text-amber-700'}`}>
          {isCorrect ? (
            <p>Great! Let's continue.</p>
          ) : (
            <p>Not quite, but that's okay. The key point is: {options[correctAnswer!]}</p>
          )}
        </div>
      )}

      {submitted && type !== 'comprehension' && (
        <div className="mt-4 p-4 rounded-lg bg-primary/10">
          <p className="text-sm text-muted-foreground">Response recorded. Let's continue.</p>
        </div>
      )}
    </div>
  );
}

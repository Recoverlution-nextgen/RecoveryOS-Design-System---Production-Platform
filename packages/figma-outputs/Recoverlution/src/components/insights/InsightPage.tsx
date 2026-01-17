import React, { useState } from 'react';
import { InsightHeader } from './InsightHeader';
import { InsightContext } from './InsightContext';
import { InsightCheckpoint, CheckpointType } from './InsightCheckpoint';
import { InsightMechanism } from './InsightMechanism';
import { InsightApplication } from './InsightApplication';
import { InsightPracticeConnection } from './InsightPracticeConnection';
import { InsightCompletion } from './InsightCompletion';

export interface CheckpointData {
  type: CheckpointType;
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface PracticeConnectionData {
  practiceId: string;
  practiceName: string;
  previewText: string;
  duration?: string;
}

export interface RelatedContentData {
  id: string;
  type: 'insight' | 'article' | 'practice';
  title: string;
}

export interface InsightData {
  id: string;
  title: string;
  subtitle?: string; // Optional subheadline
  pillarName: string;
  pillarId: string;
  conceptName: string;
  themeName: string;
  themeAssetUrl?: string; // Optional visual asset URL for the theme
  blockName: string;
  blockStatus?: 'red' | 'orange' | 'green';
  estimatedMinutes: number;
  whyItMatters: string;
  contextPath: string;
  mechanismContent: string;
  keyTakeaway: string;
  mechanismVisual?: React.ReactNode;
  applicationInstruction: string;
  applicationExample: string;
  applicationOutcome: string;
  checkpoints: CheckpointData[];
  practiceConnection?: PracticeConnectionData;
  relatedContent: RelatedContentData[];
  keywords?: { // Discovery tags for finding content
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
}

interface InsightPageProps {
  insight: InsightData;
  onBack?: () => void;
  onStartPractice: (practiceId: string) => void;
  onLearnMore: (practiceId: string) => void;
  onNavigate: (contentId: string, type: string) => void;
  onComplete: (insightId: string, data: {
    responses: Array<{ type: string; answer: string; answerIndex: number }>;
    rating: number;
  }) => void;
}

export function InsightPage({
  insight,
  onBack,
  onStartPractice,
  onLearnMore,
  onNavigate,
  onComplete
}: InsightPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [checkpointResponses, setCheckpointResponses] = useState<
    Array<{ type: string; answer: string; answerIndex: number }>
  >([]);

  // Build section order
  const sections: Array<{ type: string; data: any }> = [];
  
  // Always start with header and context
  sections.push({ type: 'header', data: null });
  sections.push({ type: 'context', data: null });

  // Add checkpoints and content in order
  const beforeCheckpoint = insight.checkpoints.find(c => c.type === 'before');
  if (beforeCheckpoint) {
    sections.push({ type: 'checkpoint', data: beforeCheckpoint });
  }

  sections.push({ type: 'mechanism', data: null });

  const comprehensionCheckpoint = insight.checkpoints.find(c => c.type === 'comprehension');
  if (comprehensionCheckpoint) {
    sections.push({ type: 'checkpoint', data: comprehensionCheckpoint });
  }

  sections.push({ type: 'application', data: null });

  if (insight.practiceConnection) {
    sections.push({ type: 'practice', data: insight.practiceConnection });
  }

  const intentCheckpoint = insight.checkpoints.find(c => c.type === 'intent');
  if (intentCheckpoint) {
    sections.push({ type: 'checkpoint', data: intentCheckpoint });
  }

  sections.push({ type: 'completion', data: null });

  const handleCheckpointResponse = (response: { answer: string; answerIndex: number }, checkpointType: string) => {
    const newResponses = [...checkpointResponses, { type: checkpointType, ...response }];
    setCheckpointResponses(newResponses);
    
    // Auto-scroll to next section after a brief delay
    setTimeout(() => {
      const nextSection = document.getElementById(`section-${currentSection + 1}`);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleComplete = (rating: number) => {
    onComplete(insight.id, {
      responses: checkpointResponses,
      rating
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} id={`section-${index}`}>
              {section.type === 'header' && (
                <InsightHeader
                  title={insight.title}
                  pillarName={insight.pillarName}
                  pillarId={insight.pillarId}
                  conceptName={insight.conceptName}
                  themeName={insight.themeName}
                  blockName={insight.blockName}
                  blockStatus={insight.blockStatus}
                  estimatedMinutes={insight.estimatedMinutes}
                  onBack={onBack}
                />
              )}

              {section.type === 'context' && (
                <InsightContext
                  whyItMatters={insight.whyItMatters}
                  contextPath={insight.contextPath}
                />
              )}

              {section.type === 'checkpoint' && (
                <InsightCheckpoint
                  type={section.data.type}
                  question={section.data.question}
                  options={section.data.options}
                  correctAnswer={section.data.correctAnswer}
                  onResponse={(response) => handleCheckpointResponse(response, section.data.type)}
                />
              )}

              {section.type === 'mechanism' && (
                <InsightMechanism
                  content={insight.mechanismContent}
                  keyTakeaway={insight.keyTakeaway}
                  visual={insight.mechanismVisual}
                />
              )}

              {section.type === 'application' && (
                <InsightApplication
                  instruction={insight.applicationInstruction}
                  example={insight.applicationExample}
                  outcome={insight.applicationOutcome}
                />
              )}

              {section.type === 'practice' && section.data && (
                <InsightPracticeConnection
                  practiceId={section.data.practiceId}
                  practiceName={section.data.practiceName}
                  previewText={section.data.previewText}
                  duration={section.data.duration}
                  onStartPractice={onStartPractice}
                  onLearnMore={onLearnMore}
                />
              )}

              {section.type === 'completion' && (
                <InsightCompletion
                  insightId={insight.id}
                  relatedContent={insight.relatedContent}
                  onComplete={handleComplete}
                  onNavigate={onNavigate}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
/**
 * Enhanced Insight Page - infiniteK Design
 * 
 * Full-page insight experience with glassmorphism overlay on hero asset
 * Matches the Wellbeing video player pattern
 */

import { useState } from 'react';
import { ArrowLeft, Clock, X, CheckCircle2, Circle } from 'lucide-react';
import { insights } from '../../utils/insightLibrary';
import type { InsightData, CheckpointData } from '../insights/InsightPage';

interface EnhancedInsightPageProps {
  insightId: string;
  onBack?: () => void;
  onNavigateToInsight?: (insightId: string) => void;
}

export function EnhancedInsightPage({ insightId, onBack, onNavigateToInsight }: EnhancedInsightPageProps) {
  const insight = insights.find(i => i.id === insightId) as InsightData | undefined;
  const [currentSection, setCurrentSection] = useState(0);
  const [checkpointResponses, setCheckpointResponses] = useState<
    Array<{ type: string; answer: string; answerIndex: number }>
  >([]);
  const [completionRating, setCompletionRating] = useState(0);

  if (!insight) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-primary)',
        background: 'var(--background)'
      }}>
        <h1 className="text-display">Insight Not Found</h1>
        <p className="text-body" style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-4)' }}>
          The insight "{insightId}" could not be found.
        </p>
        {onBack && (
          <button
            onClick={onBack}
            className="glass-button"
            style={{
              marginTop: 'var(--spacing-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </button>
        )}
      </div>
    );
  }

  // Get the hero asset - use themeAssetUrl or fallback
  const heroAsset = insight.themeAssetUrl || 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/TOOLKIT_MICROBLOCK_TILE.webp';

  // Build sections
  const sections: Array<{ type: string; data: any }> = [];
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
  const intentCheckpoint = insight.checkpoints.find(c => c.type === 'intent');
  if (intentCheckpoint) {
    sections.push({ type: 'checkpoint', data: intentCheckpoint });
  }
  sections.push({ type: 'completion', data: null });

  const handleCheckpointResponse = (answer: string, answerIndex: number, checkpointType: string) => {
    const newResponses = [...checkpointResponses, { type: checkpointType, answer, answerIndex }];
    setCheckpointResponses(newResponses);
    
    // Auto-advance to next section
    setTimeout(() => {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  const handleComplete = () => {
    console.log('Insight completed:', insightId, {
      responses: checkpointResponses,
      rating: completionRating
    });
    onBack?.();
  };

  const currentSectionData = sections[currentSection];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      background: 'var(--background)'
    }}>
      {/* Background Asset */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <img
          src={heroAsset}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>

      {/* Close Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--glass-bg-medium)',
            backdropFilter: 'var(--glass-blur-default)',
            WebkitBackdropFilter: 'var(--glass-blur-default)',
            border: 'var(--glass-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10000,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--glass-bg-light)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--glass-bg-medium)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X className="w-6 h-6" style={{ color: '#FFFFFF' }} />
        </button>
      )}

      {/* Content - Scrollable */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 40px 60px 40px',
        gap: '40px',
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Section - Always visible */}
        <div style={{
          width: '100%',
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          border: 'var(--glass-border-strong)',
          padding: 'var(--spacing-8)',
          borderRadius: 'var(--radius-none)'
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            marginBottom: 'var(--spacing-4)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500
          }}>
            <span style={{ 
              padding: '4px 10px', 
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-none)'
            }}>
              {insight.pillarName}
            </span>
            <span>→</span>
            <span>{insight.themeName}</span>
          </div>

          {/* Title */}
          <h1 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-3) 0' }}>
            {insight.title}
          </h1>

          {/* Subtitle if present */}
          {insight.subtitle && (
            <p className="text-subheadline text-white-80" style={{ marginBottom: 'var(--spacing-4)' }}>
              {insight.subtitle}
            </p>
          )}

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Clock className="w-4 h-4" />
              <span>{insight.estimatedMinutes} min</span>
            </div>
            <span>•</span>
            <span>{insight.checkpoints.length} checkpoints</span>
          </div>

          {/* Progress Dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: 'var(--spacing-6)'
          }}>
            {sections.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === currentSection ? '32px' : '8px',
                  height: '8px',
                  background: index === currentSection 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : index < currentSection 
                    ? 'rgba(255, 255, 255, 0.5)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-none)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Current Section Content */}
        <div style={{
          width: '100%',
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          border: 'var(--glass-border-strong)',
          padding: 'var(--spacing-8)',
          borderRadius: 'var(--radius-none)'
        }}>
          {currentSectionData.type === 'checkpoint' && (
            <CheckpointSection
              checkpoint={currentSectionData.data}
              onResponse={(answer, answerIndex) => handleCheckpointResponse(answer, answerIndex, currentSectionData.data.type)}
            />
          )}

          {currentSectionData.type === 'mechanism' && (
            <MechanismSection insight={insight} />
          )}

          {currentSectionData.type === 'application' && (
            <ApplicationSection insight={insight} />
          )}

          {currentSectionData.type === 'completion' && (
            <CompletionSection
              insight={insight}
              rating={completionRating}
              onRatingChange={setCompletionRating}
              onComplete={handleComplete}
            />
          )}

          {/* Navigation */}
          {currentSectionData.type !== 'checkpoint' && currentSectionData.type !== 'completion' && (
            <button
              onClick={() => {
                if (currentSection < sections.length - 1) {
                  setCurrentSection(currentSection + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                marginTop: 'var(--spacing-6)',
                padding: 'var(--spacing-4) var(--spacing-6)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Checkpoint Section Component
function CheckpointSection({ checkpoint, onResponse }: { checkpoint: CheckpointData; onResponse: (answer: string, answerIndex: number) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      <p className="text-eyebrow text-white-60" style={{ marginBottom: 'var(--spacing-3)' }}>
        Checkpoint: {checkpoint.type}
      </p>
      <h2 className="text-section-headline text-white" style={{ marginBottom: 'var(--spacing-6)' }}>
        {checkpoint.question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        {checkpoint.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              setTimeout(() => onResponse(option, index), 300);
            }}
            style={{
              padding: 'var(--spacing-4)',
              background: selectedIndex === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: selectedIndex === index ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-none)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: '#FFFFFF',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-3)'
            }}
            onMouseEnter={(e) => {
              if (selectedIndex !== index) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedIndex !== index) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }
            }}
          >
            {selectedIndex === index ? (
              <CheckCircle2 className="w-5 h-5" style={{ flexShrink: 0 }} />
            ) : (
              <Circle className="w-5 h-5" style={{ flexShrink: 0, opacity: 0.5 }} />
            )}
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Mechanism Section Component
function MechanismSection({ insight }: { insight: InsightData }) {
  return (
    <div>
      <p className="text-eyebrow text-white-60" style={{ marginBottom: 'var(--spacing-3)' }}>
        How It Works
      </p>
      <h2 className="text-section-headline text-white" style={{ marginBottom: 'var(--spacing-4)' }}>
        The Mechanism
      </h2>
      <p className="text-body text-white-80" style={{ lineHeight: 1.8 }}>
        {insight.mechanismContent}
      </p>
      {insight.mechanismVisual && (
        <div style={{ marginTop: 'var(--spacing-6)' }}>
          {insight.mechanismVisual}
        </div>
      )}
      <div style={{
        marginTop: 'var(--spacing-6)',
        padding: 'var(--spacing-4)',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 'var(--radius-none)'
      }}>
        <p className="text-caption text-white-60" style={{ marginBottom: 'var(--spacing-2)' }}>
          Key Takeaway
        </p>
        <p className="text-body text-white" style={{ fontWeight: 600 }}>
          {insight.keyTakeaway}
        </p>
      </div>
    </div>
  );
}

// Application Section Component
function ApplicationSection({ insight }: { insight: InsightData }) {
  return (
    <div>
      <p className="text-eyebrow text-white-60" style={{ marginBottom: 'var(--spacing-3)' }}>
        Apply This
      </p>
      <h2 className="text-section-headline text-white" style={{ marginBottom: 'var(--spacing-6)' }}>
        Put It Into Practice
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <div>
          <p className="text-caption text-white-60" style={{ marginBottom: 'var(--spacing-2)' }}>
            Instruction
          </p>
          <p className="text-body text-white-80" style={{ lineHeight: 1.8 }}>
            {insight.applicationInstruction}
          </p>
        </div>

        <div>
          <p className="text-caption text-white-60" style={{ marginBottom: 'var(--spacing-2)' }}>
            Example
          </p>
          <p className="text-body text-white-80" style={{ lineHeight: 1.8 }}>
            {insight.applicationExample}
          </p>
        </div>

        <div style={{
          padding: 'var(--spacing-4)',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-none)'
        }}>
          <p className="text-caption text-white-60" style={{ marginBottom: 'var(--spacing-2)' }}>
            Expected Outcome
          </p>
          <p className="text-body text-white" style={{ fontWeight: 500 }}>
            {insight.applicationOutcome}
          </p>
        </div>
      </div>
    </div>
  );
}

// Completion Section Component
function CompletionSection({ insight, rating, onRatingChange, onComplete }: { 
  insight: InsightData;
  rating: number;
  onRatingChange: (rating: number) => void;
  onComplete: () => void;
}) {
  return (
    <div>
      <h2 className="text-section-headline text-white" style={{ marginBottom: 'var(--spacing-4)' }}>
        Insight Complete
      </h2>
      <p className="text-body text-white-80" style={{ marginBottom: 'var(--spacing-6)', lineHeight: 1.8 }}>
        You've finished exploring {insight.title}. How valuable was this insight?
      </p>

      {/* Rating */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <p className="text-caption text-white-60" style={{ marginBottom: 'var(--spacing-3)' }}>
          Rate this insight
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              style={{
                width: '48px',
                height: '48px',
                background: rating >= value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: rating >= value ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                fontFamily: 'var(--font-sans)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (rating < value) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (rating < value) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        disabled={rating === 0}
        style={{
          padding: 'var(--spacing-4) var(--spacing-6)',
          background: rating > 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
          border: rating > 0 ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-none)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: rating > 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
          cursor: rating > 0 ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          if (rating > 0) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (rating > 0) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        Complete Insight
      </button>
    </div>
  );
}

/**
 * Enhanced Building Block Page - infiniteK Design
 * 
 * Interactive learning experience with:
 * - Hero image with floating pillar badge
 * - Multiple component blocks (concept, quiz, reflection, application, insight)
 * - Borderless, clinical glass aesthetic
 * - Typography-first reading experience
 * - NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.
 */

import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, XCircle, Sparkles, Quote } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  getBuildingBlockById, 
  getRelatedBuildingBlocks,
  pillarMetadata,
  type ComponentBlock 
} from '../../utils/buildingBlockLibrary';

interface EnhancedBuildingBlockPageProps {
  blockId: number;
  onBack?: () => void;
  onNavigateToBlock?: (blockId: number) => void;
}

export function EnhancedBuildingBlockPage({ blockId, onBack, onNavigateToBlock }: EnhancedBuildingBlockPageProps) {
  const block = getBuildingBlockById(blockId);
  const relatedBlocks = getRelatedBuildingBlocks(blockId);
  
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [reflectionText, setReflectionText] = useState<Record<number, string>>({});

  if (!block) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600">Building Block not found</p>
          <button
            onClick={onBack}
            className="mt-4 text-[#3E2BB8] hover:text-[#5739FB] transition-colors"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Back to Toolkit
          </button>
        </div>
      </div>
    );
  }

  const pillar = pillarMetadata[block.pillar];
  const currentComponent = block.components[currentComponentIndex];
  const progress = ((currentComponentIndex + 1) / block.components.length) * 100;

  const handleNext = () => {
    if (currentComponentIndex < block.components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswerSelect = (componentIndex: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [componentIndex]: optionIndex });
    setShowFeedback({ ...showFeedback, [componentIndex]: true });
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      {/* Sticky Top Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
                Back to Toolkit
              </span>
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <span 
                className="text-gray-500"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
              >
                {currentComponentIndex + 1} of {block.components.length}
              </span>
              <div className="w-24 h-1 bg-gray-200 overflow-hidden" style={{ borderRadius: '0px' }}>
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: pillar.color
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section - Only show on first component */}
      {currentComponentIndex === 0 && (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <ImageWithFallback
            src={block.image}
            alt={block.title}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40" />
          
          {/* Floating pillar badge - bottom left */}
          <div className="absolute bottom-8 left-6 md:left-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '0px'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{pillar.icon}</span>
              <span 
                className="uppercase tracking-wider"
                style={{ 
                  color: pillar.color,
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em'
                }}
              >
                {pillar.name}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header Section - Only show on first component */}
      {currentComponentIndex === 0 && (
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
          {/* Title */}
          <h1 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {block.title}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-gray-600 mb-8"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.6' }}
          >
            {block.subtitle}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500" style={{ fontSize: '0.875rem' }}>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Thought Leader:</span>
              <span style={{ fontFamily: 'var(--font-sans)' }}>{block.thoughtLeader}</span>
            </div>
            <div className="w-1 h-1 bg-gray-300" style={{ borderRadius: '50%' }} />
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Estimated Time:</span>
              <span style={{ fontFamily: 'var(--font-sans)' }}>{block.estimatedTime} min</span>
            </div>
          </div>

          {/* Micro-blocks targeted */}
          <div className="mt-6">
            <p 
              className="text-gray-500 mb-2"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600 }}
            >
              Micro Blocks Targeted:
            </p>
            <div className="flex flex-wrap gap-2">
              {block.microBlocks.map((microBlock, index) => (
                <span
                  key={index}
                  className="px-3 py-1"
                  style={{
                    backgroundColor: `${pillar.color}10`,
                    color: pillar.color,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    borderRadius: '0px'
                  }}
                >
                  {microBlock}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Component Block Content */}
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {renderComponentBlock(currentComponent, currentComponentIndex, {
            pillarColor: pillar.color,
            selectedAnswer: selectedAnswers[currentComponentIndex],
            showFeedback: showFeedback[currentComponentIndex],
            onAnswerSelect: (optionIndex: number) => handleAnswerSelect(currentComponentIndex, optionIndex),
            reflectionText: reflectionText[currentComponentIndex] || '',
            onReflectionChange: (text: string) => 
              setReflectionText({ ...reflectionText, [currentComponentIndex]: text })
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="border-t border-gray-200/60 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentComponentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              currentComponentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: '0px'
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentComponentIndex === block.components.length - 1}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              currentComponentIndex === block.components.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
            }`}
            style={{ 
              backgroundColor: currentComponentIndex === block.components.length - 1 ? undefined : pillar.color,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: '0px'
            }}
          >
            {currentComponentIndex === block.components.length - 1 ? 'Complete' : 'Continue'}
            {currentComponentIndex < block.components.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Related Blocks - Only show on last component */}
      {currentComponentIndex === block.components.length - 1 && relatedBlocks.length > 0 && (
        <div className="border-t border-gray-200/60 bg-[#FAFAFA]">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <h3 
              className="text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Continue Learning
            </h3>
            <div className="grid gap-4">
              {relatedBlocks.map(relatedBlock => {
                const relatedPillar = pillarMetadata[relatedBlock.pillar];
                return (
                  <button
                    key={relatedBlock.id}
                    onClick={() => onNavigateToBlock?.(relatedBlock.id)}
                    className="text-left p-6 bg-white border border-gray-200/60 hover:border-gray-300 transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ fontSize: '0.875rem' }}>{relatedPillar.icon}</span>
                          <span 
                            className="uppercase tracking-wider"
                            style={{ 
                              color: relatedPillar.color,
                              fontFamily: 'var(--font-display)', 
                              fontWeight: 600, 
                              fontSize: '0.75rem'
                            }}
                          >
                            {relatedPillar.name}
                          </span>
                        </div>
                        <h4 
                          className="text-gray-900 mb-1"
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}
                        >
                          {relatedBlock.title}
                        </h4>
                        <p 
                          className="text-gray-600"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                        >
                          {relatedBlock.subtitle}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component Block Renderers
function renderComponentBlock(
  component: ComponentBlock,
  index: number,
  props: {
    pillarColor: string;
    selectedAnswer?: number;
    showFeedback?: boolean;
    onAnswerSelect: (optionIndex: number) => void;
    reflectionText: string;
    onReflectionChange: (text: string) => void;
  }
) {
  switch (component.type) {
    case 'concept-summary':
      return <ConceptSummaryComponent component={component} pillarColor={props.pillarColor} />;
    case 'knowledge-check':
      return <KnowledgeCheckComponent component={component} {...props} />;
    case 'reflection':
      return <ReflectionComponent component={component} {...props} />;
    case 'application':
      return <ApplicationComponent component={component} pillarColor={props.pillarColor} />;
    case 'insight':
      return <InsightComponent component={component} pillarColor={props.pillarColor} />;
    default:
      return null;
  }
}

// Concept Summary Component
function ConceptSummaryComponent({ component, pillarColor }: any) {
  return (
    <div className="space-y-8">
      {component.title && (
        <h2 
          className="text-gray-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {component.title}
        </h2>
      )}

      <div 
        className="text-gray-700 leading-relaxed"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.8' }}
      >
        {component.content}
      </div>

      {component.keyPoints && component.keyPoints.length > 0 && (
        <div className="bg-[#FAFAFA] p-8" style={{ borderRadius: '0px' }}>
          <p 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Key Points:
          </p>
          <div className="space-y-3">
            {component.keyPoints.map((point: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div 
                  className="w-2 h-2 mt-2 flex-shrink-0"
                  style={{ backgroundColor: pillarColor, borderRadius: '0px' }}
                />
                <p 
                  className="text-gray-700 flex-1"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {component.visualMetaphor && (
        <div 
          className="border-l-4 pl-6 py-2"
          style={{ borderColor: `${pillarColor}40` }}
        >
          <p 
            className="text-gray-600 italic"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
          >
            {component.visualMetaphor}
          </p>
        </div>
      )}
    </div>
  );
}

// Knowledge Check Component
function KnowledgeCheckComponent({ component, pillarColor, selectedAnswer, showFeedback, onAnswerSelect }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 mb-8">
        <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: pillarColor }} />
        <h2 
          className="text-gray-900 flex-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {component.question}
        </h2>
      </div>

      <div className="space-y-3">
        {component.options.map((option: any, index: number) => {
          const isSelected = selectedAnswer === index;
          const showResult = isSelected && showFeedback;
          
          return (
            <div key={index}>
              <button
                onClick={() => !showFeedback && onAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-6 transition-all ${
                  isSelected 
                    ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
                    : 'bg-white border border-gray-200/60 hover:border-gray-300'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ 
                  backgroundColor: isSelected ? `${pillarColor}10` : undefined,
                  borderColor: isSelected ? pillarColor : undefined,
                  borderWidth: isSelected ? '2px' : '1px',
                  borderRadius: '0px'
                }}
              >
                <div className="flex items-start gap-3">
                  {showResult && (
                    option.isCorrect 
                      ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: pillarColor }} />
                      : <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: pillarColor }} />
                  )}
                  <span 
                    className="flex-1"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1rem',
                      color: isSelected ? pillarColor : '#374151',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {option.text}
                  </span>
                </div>
              </button>

              {showResult && (
                <div 
                  className="mt-3 p-6 bg-white border-l-4"
                  style={{ 
                    borderColor: pillarColor,
                    borderRadius: '0px'
                  }}
                >
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
                  >
                    {option.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Reflection Component
function ReflectionComponent({ component, pillarColor, reflectionText, onReflectionChange }: any) {
  return (
    <div className="space-y-6">
      <h2 
        className="text-gray-900"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {component.prompt}
      </h2>

      {component.guidingQuestions && component.guidingQuestions.length > 0 && (
        <div 
          className="p-8"
          style={{ backgroundColor: '#F5F3FF', borderRadius: '0px' }}
        >
          <p 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Guiding Questions:
          </p>
          <div className="space-y-3">
            {component.guidingQuestions.map((question: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: pillarColor, fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  {index + 1}.
                </span>
                <p 
                  className="text-gray-700 flex-1"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
                >
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <textarea
          value={reflectionText}
          onChange={(e) => onReflectionChange(e.target.value)}
          placeholder={component.placeholder}
          rows={8}
          className="w-full p-6 bg-white border-b-2 resize-none focus:outline-none transition-colors"
          style={{ 
            borderColor: reflectionText ? pillarColor : '#E5E7EB',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            lineHeight: '1.6',
            borderRadius: '0px',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none'
          }}
        />
      </div>
    </div>
  );
}

// Application Component
function ApplicationComponent({ component, pillarColor }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 
          className="text-gray-900 mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Real World Application
        </h2>
        
        <div 
          className="p-8 bg-[#FAFAFA]"
          style={{ borderRadius: '0px' }}
        >
          <p 
            className="text-gray-700 italic mb-6"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.6' }}
          >
            {component.scenario}
          </p>
          
          <p 
            className="text-gray-900"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            {component.question}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {component.insights.map((insight: string, index: number) => (
          <div key={index} className="flex items-start gap-4">
            <div 
              className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ 
                backgroundColor: `${pillarColor}15`,
                color: pillarColor,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '0px'
              }}
            >
              {index + 1}
            </div>
            <p 
              className="text-gray-700 flex-1"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
            >
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Insight Component
function InsightComponent({ component, pillarColor }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Quote className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: pillarColor }} />
        <h2 
          className="text-gray-900 flex-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {component.title}
        </h2>
      </div>

      <div 
        className="border-l-4 pl-8 py-6"
        style={{ borderColor: pillarColor, borderRadius: '0px' }}
      >
        <p 
          className="text-gray-700 italic mb-4"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.8' }}
        >
          {component.content}
        </p>

        {component.source && (
          <p 
            className="text-gray-500"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
          >
            — {component.source}
          </p>
        )}
      </div>
    </div>
  );
}

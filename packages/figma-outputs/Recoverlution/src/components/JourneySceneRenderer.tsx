/**
 * Journey Scene Renderer - Universal Framework
 * 
 * Renders each scene type in the 13-scene Journey architecture:
 * - Introduction
 * - Teaching (Experience/Recognize/Align)
 * - Cue (quick reinforcement)
 * - Reflection
 * - Bridge (transitions between ERA phases)
 * - Integration (final wrap with assessment)
 */

import React from 'react';
import { Sparkles, Eye, Target, ArrowRight } from 'lucide-react';
import { JourneyNarrator } from './JourneyNarrator';
import { JourneyReflectionInput } from './JourneyReflectionInput';
import type { JourneyScene } from '../utils/journeyV2API';

interface SceneRendererProps {
  scene: JourneyScene;
  block: any;
  showContent: boolean;
  anchor: string;
  pillarName: string;
  conceptName: string;
  phase: string;
  onActionClick: (action: 'return' | 'continue' | 'begin' | 'ready' | 'complete') => void;
  onReflectionSubmit?: (text: string) => void;
  onAssessmentSubmit?: (answers: any[]) => void;
}

// ERA icon helper
const getPhaseIcon = (phase: string) => {
  switch (phase) {
    case 'Experience':
      return <Sparkles className="journey-era-icon" />;
    case 'Recognize':
      return <Eye className="journey-era-icon" />;
    case 'Align':
    case 'Integrate':
      return <Target className="journey-era-icon" />;
    default:
      return <Sparkles className="journey-era-icon" />;
  }
};

export function JourneySceneRenderer({
  scene,
  block,
  showContent,
  anchor,
  pillarName,
  conceptName,
  phase,
  onActionClick,
  onReflectionSubmit,
  onAssessmentSubmit
}: SceneRendererProps) {
  
  // ===========================================================================
  // INTRODUCTION SCENE
  // ===========================================================================
  if (scene.type === 'introduction') {
    // Split context into paragraphs for better pacing
    const contextParagraphs = (scene.context || '').split('\n\n').filter(p => p.trim());
    
    const narrative = contextParagraphs.flatMap((paragraph, i) => {
      const sentences = paragraph
        .split('. ')
        .filter(s => s.trim())
        .map((sentence, j, arr) => ({
          text: j === arr.length - 1 && !sentence.endsWith('.') ? sentence : 
                j === arr.length - 1 ? sentence : sentence + '.',
          pauseAfter: 1600
        }));
      
      // Add longer pause between paragraphs
      if (i < contextParagraphs.length - 1) {
        return [...sentences, { text: '', pauseAfter: 2000 }];
      }
      return sentences;
    });
    
    // Add anchor reveal at the end
    narrative.push({ text: '', pauseAfter: 1200 });
    narrative.push({ text: scene.anchor_reveal || '', pauseAfter: 2000 });

    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        <div style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#FFFFFF',
          marginBottom: '12px'
        }} className="journey-stagger-1">
          {pillarName} · {conceptName}
        </div>
        
        {/* ERA FLOW EYEBROW */}
        <div className="journey-era-badge journey-stagger-1" data-phase="flow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L8 14M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>ERA FLOW</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || 'Welcome'}
        </h1>

        <div className="journey-narrator-wrapper journey-stagger-3">
          <JourneyNarrator
            narrative={narrative}
            sceneKey={`intro-${scene.sequence}`}
            onComplete={() => {}}
            autoPlay={true}
            speed={0.8}
          />
        </div>

        <button
          onClick={() => onActionClick('begin')}
          className="journey-btn journey-btn-primary journey-stagger-4"
          style={{ 
            width: 'auto',
            minWidth: 'clamp(240px, 40vw, 320px)',
            margin: '0 auto'
          }}
        >
          {scene.cta_text || 'Begin Experience'}
        </button>
      </div>
    );
  }

  // ===========================================================================
  // TEACHING SCENE (Experience/Recognize/Align)
  // ===========================================================================
  if (scene.type === 'experience_teaching' || scene.type === 'recognize_teaching' || scene.type === 'align_teaching') {
    const contextSentences = (scene.context || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1800
      }));

    const instructionSentences = (scene.instruction || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1500
      }));

    const anchorIntegrationSentences = (scene.anchor_integration || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1600
      }));

    const fullNarrative = [
      ...contextSentences,
      { text: '', pauseAfter: 800 },
      ...instructionSentences,
      { text: '', pauseAfter: 1000 },
      ...anchorIntegrationSentences
    ];

    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(255, 255, 255, 0.55)',
          marginBottom: '24px'
        }} className="journey-stagger-1">
          {pillarName} · {conceptName}
        </div>

        <div className="journey-era-badge journey-stagger-1" data-phase={phase.toLowerCase()}>
          {getPhaseIcon(phase)}
          <span>{phase}</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || anchor}
        </h1>

        <div className="journey-narrator-wrapper journey-stagger-3">
          <JourneyNarrator
            narrative={fullNarrative}
            sceneKey={`teaching-${scene.sequence}`}
            onComplete={() => {}}
            autoPlay={true}
            speed={0.8}
          />
        </div>

        <button
          onClick={() => onActionClick('continue')}
          className="journey-btn journey-btn-primary journey-stagger-4"
          style={{ 
            width: 'auto',
            minWidth: 'clamp(240px, 40vw, 320px)',
            margin: '0 auto'
          }}
        >
          {scene.cta_text || 'Continue Your Journey'}
        </button>
      </div>
    );
  }

  // ===========================================================================
  // CUE SCENE (quick reinforcement)
  // ===========================================================================
  if (scene.type === 'experience_cue' || scene.type === 'recognize_cue' || scene.type === 'align_cue') {
    const narrative = [
      { text: scene.anchor_guide || '', pauseAfter: 2000 },
      { text: '', pauseAfter: 600 },
      { text: scene.focus_reminder || '', pauseAfter: 1500 }
    ];

    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        <div className="journey-era-badge journey-stagger-1" data-phase={phase.toLowerCase()}>
          {getPhaseIcon(phase)}
          <span>{phase}</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || 'Your Practice Today'}
        </h1>

        <div className="journey-narrator-wrapper journey-stagger-3">
          <JourneyNarrator
            narrative={narrative}
            sceneKey={`cue-${scene.sequence}`}
            onComplete={() => {}}
            autoPlay={true}
            speed={0.8}
          />
        </div>

        <button
          onClick={() => onActionClick('ready')}
          className="journey-btn journey-btn-primary journey-stagger-4"
          style={{ minWidth: '200px' }}
        >
          {scene.cta_text || 'I\'m Ready'}
        </button>
      </div>
    );
  }

  // ===========================================================================
  // REFLECTION SCENE
  // ===========================================================================
  if (scene.type === 'experience_reflection' || scene.type === 'recognize_reflection' || scene.type === 'align_reflection') {
    const [reflectionText, setReflectionText] = React.useState('');
    
    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        <div className="journey-era-badge journey-stagger-1" data-phase={phase.toLowerCase()}>
          {getPhaseIcon(phase)}
          <span>{phase}</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || 'Welcome Back'}
        </h1>

        <div className="journey-stagger-3" style={{ width: '100%' }}>
          <JourneyReflectionInput
            value={reflectionText}
            onChange={setReflectionText}
            prompts={scene.reflection_prompts || ['What did you notice?']}
          />
        </div>
        
        <button
          onClick={() => {
            if (onReflectionSubmit && reflectionText.trim()) {
              onReflectionSubmit(reflectionText);
            }
            onActionClick('continue');
          }}
          disabled={!reflectionText.trim()}
          className="journey-btn journey-btn-primary journey-stagger-4"
          style={{ 
            minWidth: '200px', 
            marginTop: '48px',
            opacity: reflectionText.trim() ? 1 : 0.5,
            cursor: reflectionText.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          {scene.cta_text || 'Continue'}
        </button>
      </div>
    );
  }

  // ===========================================================================
  // BRIDGE SCENE (E→R or R→A)
  // ===========================================================================
  if (scene.type === 'bridge_e_to_r' || scene.type === 'bridge_r_to_a') {
    const transitionSentences = (scene.transition_context || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1800
      }));

    const foundationText = scene.science_foundation || scene.identity_foundation || '';
    const foundationSentences = foundationText
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1600
      }));

    const fullNarrative = [
      ...transitionSentences,
      { text: '', pauseAfter: 1000 },
      ...foundationSentences
    ];

    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        {/* PILLAR · CONCEPT EYEBROW */}
        <div style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#FFFFFF',
          marginBottom: '12px'
        }} className="journey-stagger-1">
          {pillarName} · {conceptName}
        </div>

        {/* ERA FLOW EYEBROW */}
        <div className="journey-era-badge journey-stagger-1" data-phase="flow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L8 14M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>ERA FLOW</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || 'Going Deeper'}
        </h1>

        <div className="journey-narrator-wrapper journey-stagger-3">
          <JourneyNarrator
            narrative={fullNarrative}
            sceneKey={`bridge-${scene.sequence}`}
            onComplete={() => {}}
            autoPlay={true}
            speed={0.8}
          />
        </div>

        <button
          onClick={() => onActionClick('continue')}
          className="journey-btn journey-btn-primary journey-stagger-4"
          style={{ minWidth: '200px' }}
        >
          {scene.cta_text || 'Continue'}
        </button>
      </div>
    );
  }

  // ===========================================================================
  // INTEGRATION SCENE (final wrap with assessment)
  // ===========================================================================
  if (scene.type === 'integration') {
    const [assessmentAnswers, setAssessmentAnswers] = React.useState<any[]>([]);

    const contextSentences = (scene.context || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1800
      }));

    const weavingSentences = (scene.headline_weaving || '')
      .split('. ')
      .filter(s => s.trim())
      .map((sentence, i, arr) => ({
        text: i === arr.length - 1 ? sentence : sentence + '.',
        pauseAfter: 1600
      }));

    const fullNarrative = [
      ...contextSentences,
      { text: '', pauseAfter: 1000 },
      ...weavingSentences
    ];

    return (
      <div className={`journey-card journey-card-context ${showContent ? 'journey-reveal' : ''}`}>
        <div className="journey-era-badge journey-stagger-1" data-phase="integrate">
          <Target className="journey-era-icon" />
          <span>Integrate</span>
        </div>

        <h1 className="journey-title-context journey-stagger-2">
          {scene.headline || 'What You Carry Forward'}
        </h1>

        <div className="journey-narrator-wrapper journey-stagger-3">
          <JourneyNarrator
            narrative={fullNarrative}
            sceneKey={`integration-${scene.sequence}`}
            onComplete={() => {}}
            autoPlay={true}
            speed={0.8}
          />
        </div>

        {/* Micro-Assessment */}
        {scene.assessment_questions && scene.assessment_questions.length > 0 && (
          <div className="journey-stagger-4" style={{ 
            width: '100%',
            marginTop: '32px',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {scene.assessment_questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: idx < scene.assessment_questions!.length - 1 ? '24px' : '0' }}>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '12px',
                  fontSize: '0.95rem'
                }}>
                  {q.question}
                </p>

                {q.type === 'scale' && (
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const newAnswers = [...assessmentAnswers];
                            newAnswers[idx] = i + 1;
                            setAssessmentAnswers(newAnswers);
                          }}
                          style={{
                            flex: 1,
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: assessmentAnswers[idx] === i + 1
                              ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%)'
                              : 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '6px',
                            color: assessmentAnswers[idx] === i + 1 ? '#000000' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      <span>{q.min_label}</span>
                      <span>{q.max_label}</span>
                    </div>
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea
                    placeholder="Share your reflection..."
                    onChange={(e) => {
                      const newAnswers = [...assessmentAnswers];
                      newAnswers[idx] = e.target.value;
                      setAssessmentAnswers(newAnswers);
                    }}
                    style={{
                      width: '100%',
                      minHeight: '80px',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      resize: 'vertical'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            if (onAssessmentSubmit && assessmentAnswers.length > 0) {
              onAssessmentSubmit(assessmentAnswers);
            }
            onActionClick('complete');
          }}
          className="journey-btn journey-btn-primary journey-stagger-5"
          style={{ minWidth: '200px', marginTop: '24px' }}
        >
          {scene.cta_text || 'Add to My Toolkit'}
        </button>
      </div>
    );
  }

  // Fallback for unknown scene types
  return (
    <div className={`journey-card ${showContent ? 'journey-reveal' : ''}`}>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Scene type '{scene.type}' not yet implemented.
      </p>
    </div>
  );
}
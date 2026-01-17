/**
 * UNIVERSAL PLAYER ENGINE
 * 
 * Single rendering engine for ALL content types from ALL rooms
 * 
 * Supported Content Types:
 * - Journey scenes (13 scenes per sprint)
 * - Articles (knowledge layer - knowing)
 * - Insights (belief layer - believing)
 * - Practices (embodiment layer - embodying)
 * - Wellness videos (300 premium videos)
 * - State check-ins (3D sliders)
 * - Alumni posts (community content)
 * - NaviCues (all 100 types)
 */

import React, { useState, useEffect } from 'react';

interface UniversalPlayerEngineProps {
  contentType: 'journey' | 'article' | 'insight' | 'practice' | 'wellness' | 'state' | 'alumni' | 'navicue';
  contentId: string;
  onComplete?: () => void;
  onBack?: () => void;
  patientId?: string;
}

export function UniversalPlayerEngine({
  contentType,
  contentId,
  onComplete,
  onBack,
  patientId,
}: UniversalPlayerEngineProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [contentType, contentId]);

  const loadContent = async () => {
    setLoading(true);
    
    // TODO: Replace with actual Supabase queries
    // For now, mock data based on content type
    
    const mockContent = {
      journey: {
        id: contentId,
        title: 'Journey Scene',
        type: 'teaching',
        vignette: 'This is a vignette that sets the context...',
        prompts: ['What does this mean to you?', 'How does this show up in your life?'],
      },
      article: {
        id: contentId,
        title: 'Understanding Emotional Regulation',
        sections: [
          { heading: 'Introduction', body: 'Emotional regulation is...' },
          { heading: 'The Science', body: 'Research shows...' },
        ],
        readTime: 8,
      },
      insight: {
        id: contentId,
        title: 'Shame vs Guilt',
        coreInsight: 'Shame says "I am bad." Guilt says "I did something bad."',
        explanation: 'This distinction is critical because...',
        application: 'When you notice shame, ask yourself...',
      },
      practice: {
        id: contentId,
        title: 'Box Breathing',
        description: 'A grounding practice for nervous system regulation',
        steps: [
          { stepNumber: 1, instruction: 'Breathe in for 4 counts', durationSec: 4 },
          { stepNumber: 2, instruction: 'Hold for 4 counts', durationSec: 4 },
          { stepNumber: 3, instruction: 'Breathe out for 4 counts', durationSec: 4 },
          { stepNumber: 4, instruction: 'Hold for 4 counts', durationSec: 4 },
        ],
      },
      wellness: {
        id: contentId,
        title: 'Morning Flow Yoga',
        instructor: 'Maya Chen',
        duration: 15,
        videoUrl: 'https://example.com/video.mp4',
        thumbnailUrl: 'https://example.com/thumb.jpg',
      },
      state: {
        id: contentId,
        type: 'check-in',
        prompts: {
          tempo: 'How is your energy?',
          flow: 'How clear is your thinking?',
          sync: 'How connected do you feel?',
        },
      },
    };

    setContent(mockContent[contentType]);
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-3)' }}>⏳</div>
          <div>Loading {contentType}...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 'var(--spacing-6)',
    }}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'fixed',
            top: 'var(--spacing-4)',
            left: 'var(--spacing-4)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius-none)',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          ← Back
        </button>
      )}

      {/* Content Renderer */}
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--spacing-8)' }}>
        {contentType === 'journey' && <JourneyRenderer content={content} onComplete={onComplete} />}
        {contentType === 'article' && <ArticleRenderer content={content} onComplete={onComplete} />}
        {contentType === 'insight' && <InsightRenderer content={content} onComplete={onComplete} />}
        {contentType === 'practice' && <PracticeRenderer content={content} onComplete={onComplete} />}
        {contentType === 'wellness' && <WellnessRenderer content={content} onComplete={onComplete} />}
        {contentType === 'state' && <StateRenderer content={content} onComplete={onComplete} patientId={patientId} />}
      </div>
    </div>
  );
}

// ============================================================================
// JOURNEY RENDERER
// ============================================================================

function JourneyRenderer({ content, onComplete }: { content: any; onComplete?: () => void }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h1 style={{ fontSize: 'var(--font-size-display)', color: 'white', marginBottom: 'var(--spacing-4)' }}>
        {content.title}
      </h1>

      <div style={{ 
        padding: 'var(--spacing-5)', 
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--radius-none)',
        marginBottom: 'var(--spacing-5)',
        color: 'white',
        lineHeight: '1.8',
      }}>
        {content.vignette}
      </div>

      {content.prompts && content.prompts.length > 0 && (
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <h3 style={{ color: 'white', marginBottom: 'var(--spacing-3)' }}>Reflect:</h3>
          {content.prompts.map((prompt: string, idx: number) => (
            <div key={idx} style={{ 
              padding: 'var(--spacing-3)', 
              background: 'rgba(255, 255, 255, 0.05)',
              borderLeft: '3px solid rgba(255, 255, 255, 0.3)',
              marginBottom: 'var(--spacing-2)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}>
              {prompt}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onComplete}
        style={{
          width: '100%',
          padding: 'var(--spacing-3)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-none)',
          color: 'white',
          cursor: 'pointer',
          fontSize: 'var(--font-size-lg)',
        }}
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================================
// ARTICLE RENDERER
// ============================================================================

function ArticleRenderer({ content, onComplete }: { content: any; onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrolled / total) * 100;
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255, 255, 255, 0.2)',
        zIndex: 1000,
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'white',
          transition: 'width 0.2s ease',
        }} />
      </div>

      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', color: 'white' }}>
        <div style={{ marginBottom: 'var(--spacing-2)', fontSize: '13px', opacity: 0.7 }}>
          {content.readTime} min read
        </div>

        <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--spacing-6)' }}>
          {content.title}
        </h1>

        {content.sections.map((section: any, idx: number) => (
          <div key={idx} style={{ marginBottom: 'var(--spacing-6)' }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-3)' }}>
              {section.heading}
            </h2>
            <div style={{ lineHeight: '1.8', opacity: 0.9 }}>
              {section.body}
            </div>
          </div>
        ))}

        <button
          onClick={onComplete}
          style={{
            width: '100%',
            padding: 'var(--spacing-3)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius-none)',
            color: 'white',
            cursor: 'pointer',
            marginTop: 'var(--spacing-6)',
          }}
        >
          Complete Reading
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// INSIGHT RENDERER
// ============================================================================

function InsightRenderer({ content, onComplete }: { content: any; onComplete?: () => void }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)', color: 'white', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-4)' }}>💡</div>

      <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--spacing-6)' }}>
        {content.title}
      </h1>

      <div style={{
        padding: 'var(--spacing-6)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--radius-none)',
        marginBottom: 'var(--spacing-6)',
        fontSize: 'var(--font-size-xl)',
        fontStyle: 'italic',
        lineHeight: '1.6',
      }}>
        {content.coreInsight}
      </div>

      <div style={{ textAlign: 'left', marginBottom: 'var(--spacing-5)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-3)' }}>Why This Matters:</h3>
        <div style={{ lineHeight: '1.8', opacity: 0.9 }}>
          {content.explanation}
        </div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: 'var(--spacing-6)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-3)' }}>How to Apply:</h3>
        <div style={{ lineHeight: '1.8', opacity: 0.9 }}>
          {content.application}
        </div>
      </div>

      <button
        onClick={onComplete}
        style={{
          width: '100%',
          padding: 'var(--spacing-3)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-none)',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Got It
      </button>
    </div>
  );
}

// ============================================================================
// PRACTICE RENDERER
// ============================================================================

function PracticeRenderer({ content, onComplete }: { content: any; onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isActive) {
      // Move to next step
      if (currentStep < content.steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setTimeLeft(content.steps[currentStep + 1].durationSec);
      } else {
        setIsActive(false);
      }
    }
  }, [isActive, timeLeft, currentStep, content.steps]);

  const startPractice = () => {
    setIsActive(true);
    setCurrentStep(0);
    setTimeLeft(content.steps[0].durationSec);
  };

  const step = content.steps[currentStep];

  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--spacing-4)' }}>
        {content.title}
      </h1>

      <div style={{ marginBottom: 'var(--spacing-6)', opacity: 0.8 }}>
        {content.description}
      </div>

      {!isActive ? (
        <button
          onClick={startPractice}
          style={{
            padding: 'var(--spacing-4) var(--spacing-6)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius-none)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 'var(--font-size-xl)',
          }}
        >
          Begin Practice
        </button>
      ) : (
        <div>
          <div style={{
            fontSize: '80px',
            marginBottom: 'var(--spacing-4)',
            fontWeight: 'var(--font-weight-bold)',
          }}>
            {timeLeft}
          </div>

          <div style={{
            fontSize: 'var(--font-size-2xl)',
            marginBottom: 'var(--spacing-6)',
            padding: 'var(--spacing-4)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-none)',
          }}>
            {step.instruction}
          </div>

          <div style={{ opacity: 0.6, fontSize: '14px' }}>
            Step {currentStep + 1} of {content.steps.length}
          </div>
        </div>
      )}

      {!isActive && currentStep > 0 && (
        <button
          onClick={onComplete}
          style={{
            width: '100%',
            padding: 'var(--spacing-3)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius-none)',
            color: 'white',
            cursor: 'pointer',
            marginTop: 'var(--spacing-4)',
          }}
        >
          Complete Practice
        </button>
      )}
    </div>
  );
}

// ============================================================================
// WELLNESS RENDERER
// ============================================================================

function WellnessRenderer({ content, onComplete }: { content: any; onComplete?: () => void }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)', color: 'white' }}>
      <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--spacing-3)' }}>
        {content.title}
      </h1>

      <div style={{ marginBottom: 'var(--spacing-5)', opacity: 0.8 }}>
        {content.instructor} · {content.duration} minutes
      </div>

      {/* Video Player Placeholder */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 'var(--radius-none)',
        marginBottom: 'var(--spacing-5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
      }}>
        ▶️
      </div>

      <button
        onClick={onComplete}
        style={{
          width: '100%',
          padding: 'var(--spacing-3)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-none)',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Complete Video
      </button>
    </div>
  );
}

// ============================================================================
// STATE RENDERER
// ============================================================================

function StateRenderer({ content, onComplete, patientId }: { content: any; onComplete?: () => void; patientId?: string }) {
  const [tempo, setTempo] = useState(50);
  const [flow, setFlow] = useState(50);
  const [sync, setSync] = useState(50);

  const computeArousal = () => {
    // Red: Low on 2+ dimensions
    if ((tempo < 40 && flow < 40) || (tempo < 40 && sync < 40) || (flow < 40 && sync < 40)) {
      return 'red';
    }
    // Green: High on 2+ dimensions
    if ((tempo >= 70 && flow >= 70) || (tempo >= 70 && sync >= 70) || (flow >= 70 && sync >= 70)) {
      return 'green';
    }
    // Amber: Everything else
    return 'amber';
  };

  const arousal = computeArousal();
  const arousalColors = {
    red: '#FF4444',
    amber: '#FFB800',
    green: '#00D9A3',
  };

  const handleSubmit = async () => {
    // TODO: Save to Supabase state_checkins table
    console.log('State check-in:', { tempo, flow, sync, arousal, patientId });
    
    if (onComplete) onComplete();
  };

  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)', color: 'white' }}>
      <h1 style={{ fontSize: 'var(--font-size-display)', marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>
        How are you right now?
      </h1>

      {/* Tempo */}
      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-lg)' }}>
          Tempo (Energy): {tempo}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={tempo}
          onChange={(e) => setTempo(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.6, marginTop: 'var(--spacing-1)' }}>
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Flow */}
      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-lg)' }}>
          Flow (Clarity): {flow}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={flow}
          onChange={(e) => setFlow(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.6, marginTop: 'var(--spacing-1)' }}>
          <span>Foggy</span>
          <span>Clear</span>
        </div>
      </div>

      {/* Sync */}
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-lg)' }}>
          Sync (Connection): {sync}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={sync}
          onChange={(e) => setSync(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.6, marginTop: 'var(--spacing-1)' }}>
          <span>Disconnected</span>
          <span>Connected</span>
        </div>
      </div>

      {/* Arousal State Display */}
      <div style={{
        padding: 'var(--spacing-4)',
        background: `${arousalColors[arousal]}22`,
        border: `2px solid ${arousalColors[arousal]}`,
        borderRadius: 'var(--radius-none)',
        marginBottom: 'var(--spacing-5)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: 'var(--spacing-1)' }}>
          Your State:
        </div>
        <div style={{ fontSize: 'var(--font-size-2xl)', color: arousalColors[arousal], textTransform: 'uppercase', fontWeight: 'var(--font-weight-bold)' }}>
          {arousal}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: 'var(--spacing-3)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-none)',
          color: 'white',
          cursor: 'pointer',
          fontSize: 'var(--font-size-lg)',
        }}
      >
        Submit Check-in
      </button>
    </div>
  );
}

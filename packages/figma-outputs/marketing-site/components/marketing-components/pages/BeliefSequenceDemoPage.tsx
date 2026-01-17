import React, { useState } from 'react';
import { NaviCueSequencePlayer, SequenceStep } from '../navicues/NaviCueSequencePlayer';
import { VoiceWrapper } from '../navicues/VoiceWrapper';
import { BeliefProbe } from '../navicues/arsenal/BeliefProbe';
import { ReactionTimer } from '../navicues/arsenal/ReactionTimer';
import { MicroExperiment } from '../navicues/arsenal/MicroExperiment';
import { IdentityReceipt } from '../navicues/arsenal/IdentityReceipt';
import { PredictionCapture } from '../navicues/arsenal/PredictionCapture';

/**
 * BELIEF SEQUENCE DEMO PAGE
 * 
 * Purpose: Demonstrate a complete belief-change arc
 * Example: "I can't trust people" → "I can discern who is trustworthy"
 * 
 * Architecture:
 * KNOWING → BELIEVING → EMBODYING
 * 
 * Sequence:
 * 1. Belief Probe (reveal implicit belief)
 * 2. Reaction Timer (measure automaticity)
 * 3. Prediction Capture (externalize mental model)
 * 4. Micro-Experiment (field test new belief)
 * 5. Identity Receipt (collect proof)
 */

interface BeliefSequenceDemoPageProps {
  onNavigate?: (page: string) => void;
}

export function BeliefSequenceDemoPage({ onNavigate }: BeliefSequenceDemoPageProps) {
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [sequenceResults, setSequenceResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSequenceComplete = (results: any[]) => {
    setSequenceResults(results);
    setShowResults(true);
  };

  const handleExit = () => {
    setSequenceStarted(false);
    setShowResults(false);
    if (onNavigate) {
      onNavigate('Home');
    }
  };

  // Define the belief-change sequence
  const trustSequence: SequenceStep[] = [
    // Step 1: KNOWING - Reveal implicit belief
    {
      id: 'probe-trust',
      component: (props: any) => (
        <VoiceWrapper archetype="warm-witness" showIntro>
          <BeliefProbe
            scenario="A new colleague invites you for coffee to get to know you better. Your first thought:"
            options={[
              { text: 'They probably want something from me', reveals: 'mistrust-schema' },
              { text: 'This could be nice, but I will keep my guard up', reveals: 'cautious-openness' },
              { text: 'Great, I would love to connect', reveals: 'secure-trust' },
              { text: 'I will say yes but will cancel later', reveals: 'avoidant-pattern' },
            ]}
            onResponse={props.onResponse}
          />
        </VoiceWrapper>
      ),
      props: {},
      onComplete: (data: any) => console.log('Probe complete:', data),
    },

    // Step 2: KNOWING - Measure automaticity of old belief
    {
      id: 'reaction-trust',
      component: (props: any) => (
        <VoiceWrapper archetype="neuro-mechanic" showIntro>
          <ReactionTimer
            statement="People will betray me if I let them in"
            onResponse={props.onResponse}
          />
        </VoiceWrapper>
      ),
      props: {},
      onComplete: (data: any) => console.log('Reaction timer complete:', data),
    },

    // Step 3: BELIEVING - Externalize prediction
    {
      id: 'prediction-trust',
      component: (props: any) => (
        <VoiceWrapper archetype="metacognitive-disruptor" showIntro>
          <PredictionCapture
            situation="If you share something vulnerable with a friend"
            outcomes={[
              "They will use it against me later",
              "They will listen but not really care",
              "They will respond with empathy and support",
              "They will share something vulnerable back",
            ]}
            onPrediction={props.onResponse}
          />
        </VoiceWrapper>
      ),
      props: {},
      onComplete: (data: any) => console.log('Prediction complete:', data),
    },

    // Step 4: BELIEVING - Design field test
    {
      id: 'experiment-trust',
      component: (props: any) => (
        <VoiceWrapper archetype="habit-engineer" showIntro>
          <MicroExperiment
            newBelief="I can discern who is trustworthy"
            suggestedExperiments={[
              {
                id: 'share-small',
                title: 'Share something small',
                description: 'Share a minor preference or opinion with someone you feel neutral about',
                stakes: 'low',
              },
              {
                id: 'ask-help',
                title: 'Ask for small help',
                description: 'Ask someone to help you with a 5-minute task',
                stakes: 'low',
              },
              {
                id: 'share-feeling',
                title: 'Name a feeling',
                description: 'Tell someone how you are actually feeling when they ask',
                stakes: 'medium',
              },
            ]}
            onDesign={props.onResponse}
          />
        </VoiceWrapper>
      ),
      props: {},
      onComplete: (data: any) => console.log('Experiment designed:', data),
    },

    // Step 5: EMBODYING - Collect proof
    {
      id: 'receipt-trust',
      component: (props: any) => (
        <VoiceWrapper archetype="courage-alchemist" showIntro showOutro>
          <IdentityReceipt
            newIdentity="I am someone who can trust wisely"
            existingReceipts={[]}
            onAddReceipt={props.onResponse}
          />
        </VoiceWrapper>
      ),
      props: {},
      onComplete: (data: any) => console.log('Receipt collected:', data),
    },
  ];

  // Results view
  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-3xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
              Sequence complete
            </div>
            <h1 className="text-3xl" style={{ color: '#FFFFFF' }}>
              Trust Belief Shift
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              From "I cannot trust people" → "I can discern who is trustworthy"
            </p>
          </div>

          {/* Journey summary */}
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-wider mb-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Your journey:
            </div>
            
            {sequenceResults.map((result, index) => (
              <div
                key={index}
                className="p-4 border-l-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  borderColor: '#5739FB',
                }}
              >
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
                  Step {index + 1}: {result.stepId}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {JSON.stringify(result.data, null, 2)}
                </div>
              </div>
            ))}
          </div>

          {/* Insight */}
          <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
            <div className="text-sm mb-3" style={{ color: '#5739FB' }}>
              Key insight
            </div>
            <p className="text-lg" style={{ color: '#FFFFFF' }}>
              Belief change is not a moment. It is a sequence.
            </p>
            <p className="text-sm mt-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              You moved through KNOWING (awareness) → BELIEVING (evidence) → EMBODYING (proof)
            </p>
          </div>

          {/* Action */}
          <button
            onClick={handleExit}
            className="w-full p-4 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  // Sequence player
  if (sequenceStarted) {
    return (
      <NaviCueSequencePlayer
        sequenceName="Trust Belief Shift"
        sequenceDescription="From 'I cannot trust people' → 'I can discern who is trustworthy'"
        steps={trustSequence}
        onSequenceComplete={handleSequenceComplete}
        onExit={handleExit}
      />
    );
  }

  // Landing page
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Belief sequence demo
          </div>
          <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
            Trust Belief Shift
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            From "I cannot trust people" → "I can discern who is trustworthy"
          </p>
        </div>

        {/* Philosophy */}
        <div className="space-y-6">
          <div className="p-6 border-l-4" style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            borderColor: '#5739FB',
          }}>
            <div className="text-sm mb-3" style={{ color: '#5739FB' }}>
              The problem with most therapeutic content
            </div>
            <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              It delivers insights. It explains mechanisms. It asks reflective questions.
              <br /><br />
              But it does not change beliefs.
            </p>
          </div>

          <div className="p-6 border-l-4" style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            borderColor: '#5739FB',
          }}>
            <div className="text-sm mb-3" style={{ color: '#5739FB' }}>
              Why belief change requires sequences
            </div>
            <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Beliefs do not shift from reading or understanding. They shift when:
            </p>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <li>1. You become aware of the implicit belief (KNOWING)</li>
              <li>2. You test it against reality (BELIEVING)</li>
              <li>3. You collect evidence that contradicts it (EMBODYING)</li>
              <li>4. The new belief becomes automatic (TRANSFER)</li>
            </ul>
          </div>
        </div>

        {/* Experience description */}
        <div className="space-y-4">
          <div className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            What you will experience
          </div>
          
          <div className="grid gap-3">
            {[
              { step: '1', title: 'Belief Probe', description: 'Reveal your automatic response pattern' },
              { step: '2', title: 'Reaction Timer', description: 'Measure how automatic the old belief is' },
              { step: '3', title: 'Prediction Capture', description: 'Externalize your mental model' },
              { step: '4', title: 'Micro-Experiment', description: 'Design a real-world test' },
              { step: '5', title: 'Identity Receipt', description: 'Collect proof of change' },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 flex items-start gap-4"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.05)',
                }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: '#5739FB',
                    color: '#FFFFFF',
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div className="text-sm mb-1" style={{ color: '#FFFFFF' }}>
                    {item.title}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          Duration: 3-5 minutes · 5 steps
        </div>

        {/* Start button */}
        <button
          onClick={() => setSequenceStarted(true)}
          className="w-full p-5 text-lg transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: '#5739FB',
            color: '#FFFFFF',
          }}
        >
          Start sequence
        </button>

        {/* Back button */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('Home')}
            className="w-full p-3 text-sm transition-opacity hover:opacity-70"
            style={{
              backgroundColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Back to home
          </button>
        )}
      </div>
    </div>
  );
}
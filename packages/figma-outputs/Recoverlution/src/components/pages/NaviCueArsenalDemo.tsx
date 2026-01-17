import React, { useState } from 'react';
import {
  BeliefProbe,
  ReactionTimer,
  PredictionCapture,
  PatternRecognition,
  DecisionLog,
  ImplicitAssociation,
  MicroMomentSnapshot,
  AttentionTracker,
  PredictionLab,
  EvidenceVault,
  MicroExperiment,
  HypothesisBuilder,
  PatternInterrupt,
  AutomaticityTracker,
  IdentityReceipt,
  TransferTrainer,
  IntegrationRitual,
  EmbodimentPractice,
  FutureSelfSimulator,
  BeliefJourneyMap,
  NAVICUE_TYPE_CATALOG,
} from '../navicues/arsenal';

/**
 * NAVICUE ARSENAL DEMO
 * 
 * Interactive showcase of all NaviCue types built tonight
 * Allows browsing by layer (KNOWING/BELIEVING/EMBODYING)
 * Shows purpose, mechanism, and psychology for each type
 * Live demos with sample data
 */

export function NaviCueArsenalDemo() {
  const [selectedLayer, setSelectedLayer] = useState<'ALL' | 'KNOWING' | 'BELIEVING' | 'EMBODYING'>('ALL');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [demoActive, setDemoActive] = useState(false);

  const filteredTypes = selectedLayer === 'ALL' 
    ? NAVICUE_TYPE_CATALOG 
    : NAVICUE_TYPE_CATALOG.filter(t => t.layer === selectedLayer);

  const selectedTypeData = NAVICUE_TYPE_CATALOG.find(t => t.id === selectedType);

  const layerColors = {
    KNOWING: '#7B68EE',
    BELIEVING: '#5739FB',
    EMBODYING: '#3E2BB8',
  };

  // Demo data for each type
  const getDemoComponent = (typeId: string) => {
    switch(typeId) {
      case 'belief_probe':
        return (
          <BeliefProbe
            scenario="A friend cancels plans last minute"
            options={[
              { text: "They don't actually want to spend time with me", reveals: "anxious_attachment" },
              { text: "Something important came up for them", reveals: "secure_attachment" },
              { text: "They always do this to me", reveals: "confirmation_bias" },
            ]}
            onResponse={(text, reveals) => console.log('Response:', text, reveals)}
          />
        );
      
      case 'reaction_timer':
        return (
          <ReactionTimer
            statement="I am lovable"
            onResponse={(answer, time) => console.log('Answer:', answer, 'Time:', time)}
          />
        );
      
      case 'prediction_capture':
        return (
          <PredictionCapture
            situation="If I ask my manager for feedback"
            outcomes={[
              "They will criticize me harshly",
              "They will give me helpful guidance",
              "They will ignore my request",
            ]}
            onPrediction={(pred) => console.log('Predicted:', pred)}
          />
        );
      
      case 'pattern_recognition':
        return (
          <PatternRecognition
            patternName="Catastrophizing"
            frequency={8}
            timeframe="this week"
            examples={[
              "One typo → I'll get fired",
              "Didn't get invited → Nobody likes me",
              "Made a mistake → Everything is ruined",
            ]}
            insight="Your mind jumps to worst-case scenarios automatically, which creates unnecessary anxiety"
            onAcknowledge={() => console.log('Acknowledged')}
          />
        );
      
      case 'prediction_lab':
        return (
          <PredictionLab
            mode="predict"
            experiment="Share a vulnerable feeling with a trusted friend"
            onPrediction={(pred) => console.log('Prediction:', pred)}
          />
        );
      
      case 'evidence_vault':
        return (
          <EvidenceVault
            limitingBelief="I always fail"
            counterEvidence={[
              "Completed project on time last week",
              "Got positive feedback from client",
              "Solved that difficult bug",
            ]}
            onAddEvidence={(evidence) => console.log('Added:', evidence)}
            onReviewVault={() => console.log('Review')}
          />
        );
      
      case 'automaticity_tracker':
        return (
          <AutomaticityTracker
            newPattern="I am capable of handling this"
            onCheck={(effort, time) => console.log('Effort:', effort, 'Time:', time)}
          />
        );
      
      case 'identity_receipt':
        return (
          <IdentityReceipt
            newIdentity="I am someone who sets boundaries"
            existingReceipts={[
              { action: "Said no to extra work today", timestamp: "2 hours ago" },
              { action: "Left a toxic conversation", timestamp: "Yesterday" },
            ]}
            onAddReceipt={(action) => console.log('Receipt:', action)}
          />
        );
      
      case 'future_self_simulator':
        return (
          <FutureSelfSimulator
            newIdentity="I am confident and grounded"
            timeframe="6 months from now"
            onComplete={(viz) => console.log('Visualization:', viz)}
          />
        );
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
            <div className="text-center" style={{ color: '#FFFFFF' }}>
              Demo coming soon for this type
            </div>
          </div>
        );
    }
  };

  if (demoActive && selectedType) {
    return (
      <div className="relative">
        {getDemoComponent(selectedType)}
        <button
          onClick={() => setDemoActive(false)}
          className="fixed top-6 right-6 px-6 py-3 z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#FFFFFF',
            border: '1px solid #5739FB',
          }}
        >
          Close demo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
            NaviCue Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            20 new NaviCue types for belief transformation
          </p>
          <div className="text-sm" style={{ color: '#5739FB' }}>
            Built: December 23, 2024
          </div>
        </div>

        {/* Layer filter */}
        <div className="flex justify-center gap-4">
          {(['ALL', 'KNOWING', 'BELIEVING', 'EMBODYING'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setSelectedLayer(layer)}
              className="px-6 py-3 transition-all duration-200"
              style={{
                backgroundColor: selectedLayer === layer ? '#5739FB' : 'rgba(87, 57, 251, 0.2)',
                color: '#FFFFFF',
              }}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 text-center" style={{ backgroundColor: 'rgba(123, 104, 238, 0.1)' }}>
            <div className="text-3xl mb-2" style={{ color: layerColors.KNOWING }}>
              8
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              KNOWING types
            </div>
          </div>
          <div className="p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-3xl mb-2" style={{ color: layerColors.BELIEVING }}>
              6
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              BELIEVING types
            </div>
          </div>
          <div className="p-6 text-center" style={{ backgroundColor: 'rgba(62, 43, 184, 0.1)' }}>
            <div className="text-3xl mb-2" style={{ color: layerColors.EMBODYING }}>
              6
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              EMBODYING types
            </div>
          </div>
        </div>

        {/* Type catalog */}
        <div className="grid grid-cols-2 gap-6">
          {filteredTypes.map((type) => (
            <div
              key={type.id}
              className="p-6 cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: selectedType === type.id 
                  ? 'rgba(87, 57, 251, 0.2)' 
                  : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${selectedType === type.id ? '#5739FB' : 'transparent'}`,
              }}
              onClick={() => setSelectedType(type.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1" style={{ color: '#FFFFFF' }}>
                    {type.name}
                  </h3>
                  <div 
                    className="text-xs uppercase tracking-wider px-2 py-1 inline-block"
                    style={{
                      backgroundColor: layerColors[type.layer],
                      color: '#FFFFFF',
                    }}
                  >
                    {type.layer}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1" style={{ color: '#5739FB' }}>Purpose:</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{type.purpose}</div>
                </div>
                <div>
                  <div className="mb-1" style={{ color: '#5739FB' }}>Mechanism:</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{type.mechanism}</div>
                </div>
                <div>
                  <div className="mb-1" style={{ color: '#5739FB' }}>Psychology:</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{type.psychologyPrinciple}</div>
                </div>
              </div>

              {/* Demo button */}
              {selectedType === type.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDemoActive(true);
                  }}
                  className="w-full mt-4 p-3 transition-all duration-200"
                  style={{
                    backgroundColor: '#5739FB',
                    color: '#FFFFFF',
                  }}
                >
                  Try live demo
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

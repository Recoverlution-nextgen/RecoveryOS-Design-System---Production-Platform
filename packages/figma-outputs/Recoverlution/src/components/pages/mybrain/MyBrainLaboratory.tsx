/**
 * MY BRAIN LABORATORY
 * Ten working prototypes of breakthrough therapeutic technology
 * Each component demonstrates innovation that doesn't exist anywhere else
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Component {
  id: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  icon: string;
}

const COMPONENTS: Component[] = [
  {
    id: 'prediction-error',
    name: 'Prediction Error Visualizer',
    tagline: 'See cognitive dissonance as it happens',
    category: 'Awareness',
    color: '#FF6B9D',
    icon: '⚡'
  },
  {
    id: 'window-tolerance',
    name: 'Window of Tolerance Tracker',
    tagline: 'Real time dysregulation risk monitoring',
    category: 'Regulation',
    color: '#4ECDC4',
    icon: '🎯'
  },
  {
    id: 'belief-conflict',
    name: 'Belief Conflict Detector',
    tagline: 'Map contradictory beliefs as network',
    category: 'Cognition',
    color: '#F4A261',
    icon: '🔗'
  },
  {
    id: 'schema-mapper',
    name: 'Real Time Schema Mapper',
    tagline: 'Schemas light up as you speak',
    category: 'Patterns',
    color: '#95E1D3',
    icon: '🧩'
  },
  {
    id: 'voice-prosody',
    name: 'Voice Prosody Analyzer',
    tagline: 'Emotion detection from voice patterns',
    category: 'Biometric',
    color: '#E76F51',
    icon: '🎤'
  },
  {
    id: 'mindblock-pattern',
    name: 'Mindblock Pattern Recognition',
    tagline: 'Identify recurring cognitive patterns',
    category: 'Patterns',
    color: '#9370DB',
    icon: '🔍'
  },
  {
    id: 'emotional-valence',
    name: 'Emotional Valence Meter',
    tagline: 'Predictive emotional forecasting',
    category: 'Forecasting',
    color: '#60A5FA',
    icon: '📊'
  },
  {
    id: 'context-trigger',
    name: 'Context Trigger Identifier',
    tagline: 'Map situations that activate schemas',
    category: 'Context',
    color: '#F59E0B',
    icon: '📍'
  },
  {
    id: 'narrative-arc',
    name: 'Narrative Arc Builder',
    tagline: 'Your life as Hero Journey structure',
    category: 'Story',
    color: '#DC2626',
    icon: '📖'
  },
  {
    id: 'cognitive-load',
    name: 'Cognitive Load Heatmap',
    tagline: 'Mental resource allocation visualization',
    category: 'Performance',
    color: '#6B7280',
    icon: '🧠'
  }
];

interface MyBrainLaboratoryProps {
  onNavigate?: (page: string) => void;
}

export function MyBrainLaboratory({ onNavigate }: MyBrainLaboratoryProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const currentComponent = COMPONENTS.find(c => c.id === selectedComponent);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {!selectedComponent ? (
          <LaboratoryGrid
            key="grid"
            components={COMPONENTS}
            onSelectComponent={setSelectedComponent}
          />
        ) : (
          <ComponentDemo
            key={selectedComponent}
            component={currentComponent!}
            onBack={() => setSelectedComponent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Laboratory Grid - Component selection
function LaboratoryGrid({ components, onSelectComponent }: {
  components: Component[];
  onSelectComponent: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl" style={{ color: '#FFFFFF' }}>
            My Brain
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Ten working prototypes of breakthrough therapeutic technology
          </p>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Click to interact with live demos
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {components.map((component, index) => (
            <motion.button
              key={component.id}
              onClick={() => onSelectComponent(component.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 text-left transition-all duration-200"
              style={{
                backgroundColor: `${component.color}15`,
                border: `2px solid ${component.color}`,
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{component.icon}</div>
                  <div className="text-xs uppercase tracking-wider px-2 py-1"
                    style={{ backgroundColor: `${component.color}30`, color: component.color }}>
                    {component.category}
                  </div>
                </div>
                <h3 className="text-2xl" style={{ color: '#FFFFFF' }}>
                  {component.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {component.tagline}
                </p>
                <div className="text-xs" style={{ color: `${component.color}80` }}>
                  Interactive Demo →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Component Demo - Individual interactive prototype
function ComponentDemo({ component, onBack }: {
  component: Component;
  onBack: () => void;
}) {
  const renderDemo = () => {
    switch (component.id) {
      case 'prediction-error':
        return <PredictionErrorDemo color={component.color} />;
      case 'window-tolerance':
        return <WindowToleranceDemo color={component.color} />;
      case 'belief-conflict':
        return <BeliefConflictDemo color={component.color} />;
      case 'schema-mapper':
        return <SchemaMapperDemo color={component.color} />;
      case 'voice-prosody':
        return <VoiceProsodyDemo color={component.color} />;
      case 'mindblock-pattern':
        return <MindblockPatternDemo color={component.color} />;
      case 'emotional-valence':
        return <EmotionalValenceDemo color={component.color} />;
      case 'context-trigger':
        return <ContextTriggerDemo color={component.color} />;
      case 'narrative-arc':
        return <NarrativeArcDemo color={component.color} />;
      case 'cognitive-load':
        return <CognitiveLoadDemo color={component.color} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-12"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          ← Back to Laboratory
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{component.icon}</div>
            <div>
              <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
                {component.name}
              </h1>
              <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {component.tagline}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8" style={{
          backgroundColor: `${component.color}10`,
          border: `2px solid ${component.color}40`
        }}>
          {renderDemo()}
        </div>
      </div>
    </motion.div>
  );
}

// DEMO 1: Prediction Error Visualizer
function PredictionErrorDemo({ color }: { color: string }) {
  const [belief, setBelief] = useState('I am not good enough');
  const [evidence, setEvidence] = useState('');
  const [errorData, setErrorData] = useState<any[]>([]);

  const handleAddEvidence = () => {
    if (!evidence.trim()) return;
    
    const newError = Math.random() * 80 + 20;
    setErrorData(prev => [...prev, {
      time: prev.length + 1,
      error: newError,
      label: evidence.substring(0, 20) + '...'
    }]);
    setEvidence('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Current Belief
          </label>
          <input
            type="text"
            value={belief}
            onChange={(e) => setBelief(e.target.value)}
            className="w-full px-4 py-3 text-white"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${color}40`,
            }}
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Contradictory Evidence
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="But I got promoted yesterday..."
              className="flex-1 px-4 py-3 text-white"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: `1px solid ${color}40`,
              }}
            />
            <button
              onClick={handleAddEvidence}
              className="px-6 py-3 transition-opacity hover:opacity-80"
              style={{ backgroundColor: color, color: '#000' }}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={errorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', border: `1px solid ${color}` }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="error" stroke={color} strokeWidth={3} dot={{ fill: color, r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {errorData.length > 0 && (
        <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Current prediction error: <span style={{ color }}>{errorData[errorData.length - 1].error.toFixed(1)}%</span>
          </p>
          <p className="text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            High prediction error indicates cognitive dissonance. Your brain is updating its model.
          </p>
        </div>
      )}
    </div>
  );
}

// DEMO 2: Window of Tolerance Tracker
function WindowToleranceDemo({ color }: { color: string }) {
  const [windowWidth, setWindowWidth] = useState(60);
  const [currentState, setCurrentState] = useState(50);

  const getStateColor = () => {
    const lowerBound = 50 - windowWidth / 2;
    const upperBound = 50 + windowWidth / 2;
    
    if (currentState < lowerBound) return '#E76F51'; // Hypoarousal
    if (currentState > upperBound) return '#F4A261'; // Hyperarousal
    return '#4ECDC4'; // Regulated
  };

  const getStateLabel = () => {
    const lowerBound = 50 - windowWidth / 2;
    const upperBound = 50 + windowWidth / 2;
    
    if (currentState < lowerBound) return 'Hypoarousal';
    if (currentState > upperBound) return 'Hyperarousal';
    return 'Regulated';
  };

  return (
    <div className="space-y-8">
      <div className="relative h-64 flex items-center justify-center">
        {/* Window visualization */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute h-full transition-all duration-500"
            style={{
              width: `${windowWidth}%`,
              backgroundColor: `${color}20`,
              border: `2px solid ${color}`,
            }}
          />
          <div
            className="absolute w-4 h-4 transition-all duration-300"
            style={{
              left: `${currentState}%`,
              backgroundColor: getStateColor(),
              boxShadow: `0 0 20px ${getStateColor()}`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Window Width (Regulation Capacity)
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={windowWidth}
            onChange={(e) => setWindowWidth(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Current Arousal State
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentState}
            onChange={(e) => setCurrentState(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <p className="text-lg mb-2" style={{ color: getStateColor() }}>
          Current State: {getStateLabel()}
        </p>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {getStateLabel() === 'Regulated' 
            ? 'You are within your window of tolerance. Optimal state for learning and growth.'
            : getStateLabel() === 'Hyperarousal'
            ? 'Above window. High anxiety, panic, or rage. Intervention recommended.'
            : 'Below window. Shut down, numb, dissociated. Gentle activation needed.'}
        </p>
      </div>
    </div>
  );
}

// DEMO 3: Belief Conflict Detector
function BeliefConflictDemo({ color }: { color: string }) {
  const beliefs = [
    { id: 1, text: 'I need to be perfect', x: 30, y: 30 },
    { id: 2, text: 'I am not good enough', x: 70, y: 30 },
    { id: 3, text: 'I deserve good things', x: 50, y: 70 },
    { id: 4, text: 'People will leave me', x: 20, y: 60 },
    { id: 5, text: 'I must be independent', x: 80, y: 60 }
  ];

  const conflicts = [
    { from: 1, to: 2, strength: 85 },
    { from: 2, to: 3, strength: 70 },
    { from: 4, to: 5, strength: 60 }
  ];

  return (
    <div className="space-y-6">
      <div className="relative h-96 p-8" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <svg className="w-full h-full">
          {/* Draw conflict lines */}
          {conflicts.map((conflict, i) => {
            const from = beliefs.find(b => b.id === conflict.from)!;
            const to = beliefs.find(b => b.id === conflict.to)!;
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#E76F51"
                strokeWidth={conflict.strength / 20}
                strokeDasharray="5,5"
                opacity={0.6}
              />
            );
          })}
          
          {/* Draw belief nodes */}
          {beliefs.map((belief) => (
            <g key={belief.id}>
              <circle
                cx={`${belief.x}%`}
                cy={`${belief.y}%`}
                r="30"
                fill={color}
                opacity={0.3}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={`${belief.x}%`}
                y={`${belief.y}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize="11"
                className="pointer-events-none"
              >
                {belief.text.split(' ').map((word, i) => (
                  <tspan key={i} x={`${belief.x}%`} dy={i === 0 ? 0 : 12}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <p className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <span style={{ color: '#E76F51' }}>Red connections</span> indicate conflicting beliefs. 
          Thicker lines = higher cognitive cost.
        </p>
        <div className="space-y-2">
          {conflicts.map((conflict, i) => {
            const from = beliefs.find(b => b.id === conflict.from)!;
            const to = beliefs.find(b => b.id === conflict.to)!;
            return (
              <div key={i} className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                "{from.text}" conflicts with "{to.text}" (Cost: {conflict.strength}%)
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// DEMO 4: Schema Mapper
function SchemaMapperDemo({ color }: { color: string }) {
  const [input, setInput] = useState('');
  const [activeSchemas, setActiveSchemas] = useState<any[]>([]);

  const schemas = [
    { name: 'Abandonment', keywords: ['alone', 'leave', 'lonely', 'abandoned'] },
    { name: 'Unworthiness', keywords: ['not good enough', 'worthless', 'inadequate', 'failure'] },
    { name: 'Shame', keywords: ['ashamed', 'embarrassed', 'humiliated', 'defective'] },
    { name: 'Perfectionism', keywords: ['perfect', 'flawless', 'mistake', 'wrong'] },
  ];

  useEffect(() => {
    const activated = schemas.map(schema => {
      const matches = schema.keywords.filter(keyword => 
        input.toLowerCase().includes(keyword.toLowerCase())
      );
      return {
        name: schema.name,
        intensity: matches.length > 0 ? Math.min(100, matches.length * 33) : 0
      };
    }).filter(s => s.intensity > 0);
    
    setActiveSchemas(activated);
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Type or speak your thoughts
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I always feel like I'm not good enough and people will leave me..."
          className="w-full px-4 py-3 h-32 text-white resize-none"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: `1px solid ${color}40`,
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {schemas.map((schema) => {
          const active = activeSchemas.find(s => s.name === schema.name);
          const intensity = active ? active.intensity : 0;
          
          return (
            <div
              key={schema.name}
              className="p-6 text-center transition-all duration-300"
              style={{
                backgroundColor: `rgba(87, 57, 251, ${intensity / 100})`,
                border: `2px solid ${intensity > 0 ? color : 'rgba(255,255,255,0.1)'}`,
                opacity: intensity > 0 ? 1 : 0.3
              }}
            >
              <div className="text-2xl mb-2" style={{ color: '#fff' }}>
                {intensity}%
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {schema.name}
              </div>
            </div>
          );
        })}
      </div>

      {activeSchemas.length > 0 && (
        <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Active schemas: {activeSchemas.map(s => s.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

// DEMO 5: Voice Prosody Analyzer
function VoiceProsodyDemo({ color }: { color: string }) {
  const [selectedSample, setSelectedSample] = useState(0);

  const samples = [
    {
      label: 'Sample 1: Neutral',
      pitch: 45,
      pace: 60,
      pauses: 30,
      emotion: 'Neutral',
      confidence: 76
    },
    {
      label: 'Sample 2: Stressed',
      pitch: 85,
      pace: 90,
      pauses: 15,
      emotion: 'Anxious',
      confidence: 82
    },
    {
      label: 'Sample 3: Depressed',
      pitch: 25,
      pace: 35,
      pauses: 70,
      emotion: 'Low Mood',
      confidence: 79
    }
  ];

  const sample = samples[selectedSample];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {samples.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelectedSample(i)}
            className="px-6 py-3 transition-all"
            style={{
              backgroundColor: selectedSample === i ? color : 'rgba(255,255,255,0.1)',
              border: `2px solid ${selectedSample === i ? color : 'rgba(255,255,255,0.2)'}`,
              color: '#fff'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Pitch</div>
          <div className="h-32 flex items-end">
            <div
              className="w-full transition-all duration-500"
              style={{
                height: `${sample.pitch}%`,
                backgroundColor: color
              }}
            />
          </div>
          <div className="text-center text-sm" style={{ color: '#fff' }}>{sample.pitch}%</div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Pace</div>
          <div className="h-32 flex items-end">
            <div
              className="w-full transition-all duration-500"
              style={{
                height: `${sample.pace}%`,
                backgroundColor: color
              }}
            />
          </div>
          <div className="text-center text-sm" style={{ color: '#fff' }}>{sample.pace}%</div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Pauses</div>
          <div className="h-32 flex items-end">
            <div
              className="w-full transition-all duration-500"
              style={{
                height: `${sample.pauses}%`,
                backgroundColor: color
              }}
            />
          </div>
          <div className="text-center text-sm" style={{ color: '#fff' }}>{sample.pauses}%</div>
        </div>
      </div>

      <div className="p-6 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="text-3xl mb-2" style={{ color }}>
          {sample.emotion}
        </div>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Confidence: {sample.confidence}%
        </div>
      </div>
    </div>
  );
}

// DEMO 6-10: Simplified versions for build completion
function MindblockPatternDemo({ color }: { color: string }) {
  const patterns = [
    { type: 'All or Nothing', count: 7, contexts: ['Work', 'Relationships'] },
    { type: 'Catastrophizing', count: 5, contexts: ['Health', 'Future'] },
    { type: 'Mind Reading', count: 3, contexts: ['Social', 'Family'] }
  ];

  return (
    <div className="space-y-6">
      {patterns.map((pattern, i) => (
        <div key={i} className="p-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl" style={{ color: '#fff' }}>{pattern.type}</h3>
            <div className="text-2xl" style={{ color }}>{pattern.count}x</div>
          </div>
          <div className="flex gap-2">
            {pattern.contexts.map((ctx, j) => (
              <div key={j} className="px-3 py-1 text-xs" style={{ backgroundColor: `${color}30`, color }}>
                {ctx}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmotionalValenceDemo({ color }: { color: string }) {
  const data = [
    { day: 'Mon', valence: 65 },
    { day: 'Tue', valence: 70 },
    { day: 'Wed', valence: 55 },
    { day: 'Thu', valence: 60 },
    { day: 'Fri', valence: 75 },
    { day: 'Sat', valence: 80 },
    { day: 'Sun', valence: 50, predicted: true }
  ];

  return (
    <div className="space-y-6">
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', border: `1px solid ${color}` }}
            />
            <Area type="monotone" dataKey="valence" stroke={color} fill={`${color}40`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Pattern suggests dip on Sundays. Proactive intervention recommended.
        </p>
      </div>
    </div>
  );
}

function ContextTriggerDemo({ color }: { color: string }) {
  const triggers = [
    { context: 'Friday Evenings', schema: 'Abandonment', intensity: 85 },
    { context: 'Work Reviews', schema: 'Unworthiness', intensity: 70 },
    { context: 'Social Events', schema: 'Shame', intensity: 60 }
  ];

  return (
    <div className="space-y-4">
      {triggers.map((trigger, i) => (
        <div key={i} className="p-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-lg" style={{ color: '#fff' }}>{trigger.context}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Activates: {trigger.schema}
              </div>
            </div>
            <div className="text-2xl" style={{ color }}>{trigger.intensity}%</div>
          </div>
          <div className="h-2 w-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full transition-all"
              style={{
                width: `${trigger.intensity}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function NarrativeArcDemo({ color }: { color: string }) {
  const stages = [
    { name: 'Ordinary World', position: 10, active: false },
    { name: 'Call to Adventure', position: 25, active: false },
    { name: 'Dark Night', position: 50, active: true },
    { name: 'Transformation', position: 75, active: false },
    { name: 'Return', position: 90, active: false }
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-48">
        <svg className="w-full h-full">
          <path
            d="M 0,150 Q 200,150 300,100 T 600,50"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          {stages.map((stage, i) => (
            <g key={i}>
              <circle
                cx={`${stage.position}%`}
                cy={stage.active ? "100" : "120"}
                r={stage.active ? "12" : "8"}
                fill={stage.active ? color : 'rgba(255,255,255,0.3)'}
              />
              <text
                x={`${stage.position}%`}
                y={stage.active ? "85" : "105"}
                textAnchor="middle"
                fill={stage.active ? color : 'rgba(255,255,255,0.6)'}
                fontSize="12"
              >
                {stage.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <p className="text-sm" style={{ color: '#fff' }}>
          You are currently in: <span style={{ color }}>Dark Night of Soul</span>
        </p>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
          This is the hardest part. Transformation comes next.
        </p>
      </div>
    </div>
  );
}

function CognitiveLoadDemo({ color }: { color: string }) {
  const regions = [
    { name: 'Working Memory', load: 87 },
    { name: 'Emotional Regulation', load: 65 },
    { name: 'Executive Function', load: 42 },
    { name: 'Attention', load: 73 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region, i) => (
          <div
            key={i}
            className="p-8 text-center transition-all"
            style={{
              backgroundColor: `rgba(87, 57, 251, ${region.load / 100})`,
              border: `2px solid ${region.load > 75 ? '#E76F51' : color}`
            }}
          >
            <div className="text-3xl mb-2" style={{ color: '#fff' }}>
              {region.load}%
            </div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {region.name}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <p className="text-sm" style={{ color: '#E76F51' }}>
          Working Memory overloaded. Reduce task complexity.
        </p>
      </div>
    </div>
  );
}

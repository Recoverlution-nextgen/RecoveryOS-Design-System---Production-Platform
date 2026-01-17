// components/cc2/studios/SystemIntelligenceStudio.tsx
// System Intelligence Studio - Real-time algorithm and data flow visualization

import React, { useState, useEffect } from 'react';
import { Activity, Brain, GitBranch, Zap, TrendingUp, Database } from 'lucide-react';

interface DataFlowSnapshot {
  active_individuals: number;
  events_last_hour: number;
  decisions_made: number;
  proof_artifacts_created: number;
  realtime_channels: string[];
}

interface AlgorithmState {
  arousal_bands: {
    low: { min: number; max: number; label: string };
    medium: { min: number; max: number; label: string };
    high: { min: number; max: number; label: string };
  };
  kbe_progression: {
    knowing: { threshold: number; color: string };
    believing: { threshold: number; color: string };
    embodying: { threshold: number; color: string };
  };
  mindblock_targeting: {
    total_mindblocks: number;
    pillars: string[];
  };
}

export function SystemIntelligenceStudio() {
  const [dataFlow, setDataFlow] = useState<DataFlowSnapshot | null>(null);
  const [algorithm, setAlgorithm] = useState<AlgorithmState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemData();
    const interval = setInterval(fetchSystemData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchSystemData = async () => {
    try {
      // TODO: Wire to actual endpoints once backend provides them
      const flowRes = await fetch('/make-server-49b28b8a/cc2/system/data-flow-snapshot');
      const algRes = await fetch('/make-server-49b28b8a/cc2/system/algorithm-state');
      
      if (flowRes.ok && algRes.ok) {
        setDataFlow(await flowRes.json());
        setAlgorithm(await algRes.json());
      }
    } catch (error) {
      console.error('[SystemIntelligence] Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#3E2BB8' }} />
          <p style={{ color: '#3E2BB8' }}>Loading System Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-8" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#3E2BB8' }}>
            System Intelligence
          </h1>
          <p className="text-gray-600">
            Real-time view of Recoverlution's adaptive therapeutic AI
          </p>
        </div>

        {/* Live Data Flow */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#3E2BB8' }}>
            <Activity className="w-5 h-5" />
            Live Data Flow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Database className="w-6 h-6" />}
              label="Active Individuals"
              value={dataFlow?.active_individuals || 0}
              color="#3E2BB8"
            />
            <MetricCard
              icon={<Zap className="w-6 h-6" />}
              label="Events (Last Hour)"
              value={dataFlow?.events_last_hour || 0}
              color="#5739FB"
            />
            <MetricCard
              icon={<Brain className="w-6 h-6" />}
              label="Decisions Made"
              value={dataFlow?.decisions_made || 0}
              color="#3E2BB8"
            />
            <MetricCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Proof Artifacts"
              value={dataFlow?.proof_artifacts_created || 0}
              color="#5739FB"
            />
          </div>
        </div>

        {/* Algorithm Configuration */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#3E2BB8' }}>
            <Brain className="w-5 h-5" />
            Algorithm Configuration
          </h2>

          {/* Arousal Bands */}
          <div className="bg-white p-6 mb-4" style={{ border: '2px solid #E0E0E0' }}>
            <h3 className="font-semibold mb-4" style={{ color: '#3E2BB8' }}>
              Arousal State Bands
            </h3>
            <div className="space-y-3">
              {algorithm && Object.entries(algorithm.arousal_bands).map(([band, config]) => (
                <div key={band} className="flex items-center gap-4">
                  <div className="w-24 font-medium capitalize">{band}</div>
                  <div className="flex-1 h-8 relative" style={{ backgroundColor: '#F5F5F5' }}>
                    <div 
                      className="absolute h-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ 
                        backgroundColor: band === 'low' ? '#22C55E' : band === 'medium' ? '#F59E0B' : '#EF4444',
                        left: `${config.min * 10}%`,
                        width: `${(config.max - config.min) * 10}%`
                      }}
                    >
                      {config.min} - {config.max}
                    </div>
                  </div>
                  <div className="w-32 text-sm text-gray-600">{config.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KBE Progression */}
          <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
            <h3 className="font-semibold mb-4" style={{ color: '#3E2BB8' }}>
              KBE Progression (Knowing → Believing → Embodying)
            </h3>
            <div className="flex items-center gap-4">
              {algorithm && Object.entries(algorithm.kbe_progression).map(([stage, config], idx) => (
                <React.Fragment key={stage}>
                  <div className="flex-1 text-center">
                    <div 
                      className="w-full h-16 flex items-center justify-center text-white font-medium capitalize mb-2"
                      style={{ backgroundColor: config.color }}
                    >
                      {stage}
                    </div>
                    <div className="text-sm text-gray-600">
                      Threshold: {config.threshold}%
                    </div>
                  </div>
                  {idx < 2 && (
                    <div className="text-2xl text-gray-400">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Mindblock Targeting */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#3E2BB8' }}>
            <GitBranch className="w-5 h-5" />
            Mindblock Targeting System
          </h2>
          
          <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#3E2BB8' }}>
                  {algorithm?.mindblock_targeting.total_mindblocks || 0}
                </div>
                <div className="text-gray-600">Total Mindblocks Mapped</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Six Pillars:</div>
                <div className="flex flex-wrap gap-2">
                  {algorithm?.mindblock_targeting.pillars.map((pillar) => (
                    <div 
                      key={pillar}
                      className="px-3 py-1 text-sm font-medium text-white"
                      style={{ backgroundColor: '#3E2BB8' }}
                    >
                      {pillar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#3E2BB8' }}>
            <GitBranch className="w-5 h-5" />
            Real-Time Data Flow
          </h2>
          
          <div className="bg-white p-8" style={{ border: '2px solid #E0E0E0' }}>
            <div className="space-y-6">
              <FlowStep 
                label="Individual Interaction"
                description="NaviCue response, practice completion, state check-in"
                color="#3E2BB8"
              />
              <FlowArrow />
              <FlowStep 
                label="Event Spine Write"
                description="Universal timeline + proof artifacts created"
                color="#5739FB"
              />
              <FlowArrow />
              <FlowStep 
                label="LUMA Decision Engine"
                description="Analyzes state, context, proof scores → selects next move"
                color="#3E2BB8"
              />
              <FlowArrow />
              <FlowStep 
                label="Realtime Broadcast"
                description="Push to user:{id}:feed channel"
                color="#5739FB"
              />
              <FlowArrow />
              <FlowStep 
                label="Next Move Delivered"
                description="Adaptive content served with decision trace"
                color="#3E2BB8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-6" style={{ border: '2px solid #E0E0E0' }}>
      <div className="flex items-center gap-3 mb-2">
        <div style={{ color }}>{icon}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function FlowStep({ label, description, color }: { label: string; description: string; color: string }) {
  return (
    <div className="flex items-center gap-4 p-4" style={{ backgroundColor: '#FAFAFA', border: '2px solid #E0E0E0' }}>
      <div className="w-3 h-3" style={{ backgroundColor: color }} />
      <div className="flex-1">
        <div className="font-semibold" style={{ color }}>{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center">
      <div className="text-3xl" style={{ color: '#3E2BB8' }}>↓</div>
    </div>
  );
}

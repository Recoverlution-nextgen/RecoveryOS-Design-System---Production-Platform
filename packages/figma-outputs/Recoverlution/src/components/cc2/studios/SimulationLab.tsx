/**
 * SIMULATION LAB - MAKE LUMA DEBUGGABLE
 * Timeline replay · Decision inspector · Scenario simulator
 * The "one in a million" debugging experience
 */

import { useState } from 'react';
import { Zap, User, Play, Eye } from 'lucide-react';
import { TimelineReplayer } from './TimelineReplayer';
import { DecisionInspector } from './DecisionInspector';

interface SimulationLabProps {
  onBack: () => void;
}

export function SimulationLab({ onBack }: SimulationLabProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'decision' | 'scenario'>('timeline');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedDecisionId, setSelectedDecisionId] = useState('');

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            Simulation Lab
          </h1>
          <p className="text-zinc-400 text-lg">
            Make LUMA debuggable · Replay · Inspect · Simulate
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`
              px-6 py-3 border-b-2 transition-colors
              ${activeTab === 'timeline'
                ? 'border-[#5739FB] text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
              }
            `}
          >
            Timeline Replay
          </button>
          <button
            onClick={() => setActiveTab('decision')}
            className={`
              px-6 py-3 border-b-2 transition-colors
              ${activeTab === 'decision'
                ? 'border-[#5739FB] text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
              }
            `}
          >
            Decision Inspector
          </button>
          <button
            onClick={() => setActiveTab('scenario')}
            className={`
              px-6 py-3 border-b-2 transition-colors
              ${activeTab === 'scenario'
                ? 'border-[#5739FB] text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
              }
            `}
          >
            Scenario Simulator
          </button>
        </div>

        {/* User Selector */}
        <div className="mb-8 bg-zinc-900/50 border border-zinc-800 p-6">
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-zinc-400" />
            <div className="flex-1">
              <label className="block text-sm text-zinc-400 mb-2">Select User to Debug</label>
              <input
                type="text"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                placeholder="Enter user ID or email..."
                className="w-full max-w-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5739FB]"
              />
            </div>
            <button
              onClick={() => console.log('Load user:', selectedUserId)}
              className="px-6 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Load
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'timeline' && (
          <TimelineReplayer userId={selectedUserId} />
        )}

        {activeTab === 'decision' && (
          <DecisionInspector decisionId={selectedDecisionId} />
        )}

        {activeTab === 'scenario' && (
          <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
            <p className="text-zinc-400">Scenario Simulator coming soon</p>
            <p className="text-sm text-zinc-500 mt-2">
              Test "what if" scenarios with different policy versions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * JOURNEY ANALYTICS - Usage stats and outcomes
 */

import { BarChart3, Users, Clock, TrendingUp } from 'lucide-react';

export function JourneyAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-black/40 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-5 h-5 text-[#5739FB]" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-sm text-zinc-400">Active Assignments</div>
        </div>

        <div className="bg-black/40 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-sm text-zinc-400">Completions</div>
        </div>

        <div className="bg-black/40 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-sm text-zinc-400">Avg Minutes</div>
        </div>

        <div className="bg-black/40 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">0%</div>
          <div className="text-sm text-zinc-400">Completion Rate</div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-24 bg-black/40 border border-white/10">
        <BarChart3 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
        <p className="text-zinc-400 max-w-md mx-auto mb-4">
          Track journey usage, completion rates, outcomes, and user progress
        </p>
        <p className="text-zinc-500 text-sm">Coming soon</p>
      </div>
    </div>
  );
}

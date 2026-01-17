// STATE OBSERVATORY (Tab 7) - COMPLETE TAB
import { useState } from 'react';
import { useStateDistribution, useStateTimeline, computeStateBand, STATE_BAND_RULES } from '@/lib/hooks/useStateModel';
import { UserStateBadge } from '../shared/UserStateBadge';
import type { StateBand } from '@/lib/types/constitution';
import { Activity, Users, TrendingUp, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const STATE_COLORS = {
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  shutdown: '#6B7280',
};

export function StateObservatory() {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [tempo, setTempo] = useState(50);
  const [flow, setFlow] = useState(50);
  const [sync, setSync] = useState(50);
  
  const { data: distribution } = useStateDistribution();
  const { data: timeline } = useStateTimeline(selectedUserId || 'demo-user');
  
  const computed = computeStateBand(tempo, flow, sync);
  
  const distributionData = distribution ? [
    { name: 'Green', value: distribution.green, color: STATE_COLORS.green },
    { name: 'Amber', value: distribution.amber, color: STATE_COLORS.amber },
    { name: 'Red', value: distribution.red, color: STATE_COLORS.red },
    { name: 'Shutdown', value: distribution.shutdown, color: STATE_COLORS.shutdown },
  ] : [];
  
  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Top Stats */}
      <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10">
        <div className="grid grid-cols-5 gap-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60">Total Users</span>
            </div>
            <p className="text-2xl font-medium text-white">{distribution?.total_users || 0}</p>
          </div>
          
          {distributionData.map(item => (
            <div key={item.name} className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-white/60">{item.name}</span>
              </div>
              <p className="text-2xl font-medium text-white">{item.value}</p>
              <p className="text-xs text-white/40 mt-1">
                {distribution && distribution.total_users > 0
                  ? Math.round((item.value / distribution.total_users) * 100)
                  : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* State Model Visualizer */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-white/70" />
              <h3 className="text-sm font-medium text-white/90">State Model Simulator</h3>
            </div>
            
            <div className="space-y-4">
              {/* Sliders */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-white/70">Tempo (Energy)</label>
                  <span className="text-sm font-medium text-white">{tempo}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tempo}
                  onChange={e => setTempo(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-white/70">Flow (Clarity)</label>
                  <span className="text-sm font-medium text-white">{flow}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flow}
                  onChange={e => setFlow(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-white/70">Sync (Connection)</label>
                  <span className="text-sm font-medium text-white">{sync}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sync}
                  onChange={e => setSync(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Computed State */}
              <div className="mt-6 p-4 bg-black/30 border border-white/10 rounded">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/70">Computed State:</span>
                  <UserStateBadge
                    stateBand={computed.state_band}
                    arousalContext={computed.arousal_context}
                    size="lg"
                  />
                </div>
                <div className="text-xs text-white/60">
                  <p>Composite: {computed.composite}</p>
                  <p className="mt-1">{STATE_BAND_RULES[computed.state_band].description}</p>
                  <p className="mt-1 text-white/40">Content allowed: {STATE_BAND_RULES[computed.state_band].content_types_allowed}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* State Band Rules */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-white/70" />
              <h3 className="text-sm font-medium text-white/90">State Band Rules</h3>
            </div>
            
            <div className="space-y-3">
              {Object.entries(STATE_BAND_RULES).map(([band, rules]) => (
                <div key={band} className="p-3 bg-black/30 border border-white/10 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATE_COLORS[band as StateBand] }} />
                    <span className="text-sm font-medium text-white/90 uppercase">{band}</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">{rules.description}</p>
                  <div className="text-xs text-white/40">
                    <p>Range: {rules.composite_range[0]}-{rules.composite_range[1]}</p>
                    <p>Content: {rules.content_types_allowed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Distribution Pie Chart */}
          {distribution && distributionData.length > 0 && (
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-white/70" />
                <h3 className="text-sm font-medium text-white/90">Current Distribution</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {/* State Timeline (if user selected) */}
          {timeline && timeline.length > 0 && (
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-white/90 mb-2">State Timeline</h3>
                <input
                  type="text"
                  placeholder="Enter user ID..."
                  value={selectedUserId}
                  onChange={e => setSelectedUserId(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB]"
                />
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeline.slice(-30)}>
                  <XAxis
                    dataKey="captured_at"
                    stroke="#ffffff40"
                    fontSize={10}
                    tickFormatter={val => new Date(val).toLocaleDateString()}
                  />
                  <YAxis stroke="#ffffff40" fontSize={10} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                    labelFormatter={val => new Date(val).toLocaleString()}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="tempo" stroke="#3B82F6" strokeWidth={2} dot={false} name="Tempo" />
                  <Line type="monotone" dataKey="flow" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Flow" />
                  <Line type="monotone" dataKey="sync" stroke="#EC4899" strokeWidth={2} dot={false} name="Sync" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

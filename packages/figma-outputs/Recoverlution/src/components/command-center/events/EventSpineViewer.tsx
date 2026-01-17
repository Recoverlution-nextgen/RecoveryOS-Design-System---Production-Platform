// EVENT SPINE VIEWER (Tab 4) - COMPLETE TAB
import { useState } from 'react';
import { useEventSpine, useEventAnalytics } from '@/lib/hooks/useEvents';
import type { EventSpineFilters, EventType } from '@/lib/types/constitution';
import {
  Activity,
  Filter,
  TrendingUp,
  Eye,
  MousePointerClick,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EVENT_COLORS: Record<EventType, string> = {
  content_exposed: '#3B82F6',
  content_opened: '#8B5CF6',
  content_interacted: '#EC4899',
  content_completed: '#10B981',
  content_abandoned: '#EF4444',
  response_captured: '#F59E0B',
  proof_created: '#F59E0B',
  state_captured: '#06B6D4',
  resistance_detected: '#F97316',
  safety_gate_triggered: '#DC2626',
  rescue_initiated: '#DC2626',
  journey_advanced: '#8B5CF6',
  notification_sent: '#6366F1',
};

export function EventSpineViewer() {
  const [filters, setFilters] = useState<EventSpineFilters>({});
  const { data: events, isLoading } = useEventSpine(filters, { realTime: true });
  const { data: analytics } = useEventAnalytics();
  
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-white/50" />
          
          <select
            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5739FB]"
            onChange={e => setFilters({
              ...filters,
              event_type: e.target.value ? [e.target.value as EventType] : undefined
            })}
          >
            <option value="">All Event Types</option>
            <option value="content_exposed">Exposed</option>
            <option value="content_opened">Opened</option>
            <option value="content_completed">Completed</option>
            <option value="content_abandoned">Abandoned</option>
            <option value="proof_created">Proof Created</option>
            <option value="safety_gate_triggered">Safety Gate</option>
          </select>
          
          <input
            type="text"
            placeholder="Filter by user ID..."
            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB]"
            onChange={e => setFilters({ ...filters, user_id: e.target.value || undefined })}
          />
          
          <span className="text-sm text-white/50">
            {events?.length || 0} events
          </span>
        </div>
      </div>
      
      {/* Analytics Section */}
      {analytics && (
        <div className="flex-shrink-0 p-4 border-b border-white/10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-white/70" />
            <h3 className="text-sm font-medium text-white/90">Analytics</h3>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {/* Completion Funnel */}
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-white/60">Exposed</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.completion_funnel.exposed}</p>
            </div>
            
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-white/60">Opened</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.completion_funnel.opened}</p>
            </div>
            
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-white/60">Interacted</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.completion_funnel.interacted}</p>
            </div>
            
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-white/60">Completed</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.completion_funnel.completed}</p>
            </div>
            
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-xs text-white/60">Abandoned</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.completion_funnel.abandoned}</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            {/* Events by Type */}
            <div className="p-4 bg-white/5 border border-white/10 rounded">
              <h4 className="text-sm font-medium text-white/90 mb-3">Events by Type</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(analytics.events_by_type).map(([type, count]) => ({
                  type: type.replace('content_', ''),
                  count
                }))}>
                  <XAxis dataKey="type" stroke="#ffffff40" fontSize={10} />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="count" fill="#5739FB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Events Over Time */}
            <div className="p-4 bg-white/5 border border-white/10 rounded">
              <h4 className="text-sm font-medium text-white/90 mb-3">Events Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analytics.events_over_time.slice(-20)}>
                  <XAxis
                    dataKey="timestamp"
                    stroke="#ffffff40"
                    fontSize={10}
                    tickFormatter={val => new Date(val).getHours() + ':00'}
                  />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#5739FB" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Live Event Feed */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-white/70 animate-pulse" />
          <h3 className="text-sm font-medium text-white/90">Live Event Stream</h3>
        </div>
        
        {isLoading ? (
          <p className="text-sm text-white/50">Loading events...</p>
        ) : events && events.length > 0 ? (
          <div className="space-y-2">
            {events.map(event => (
              <div
                key={event.event_id}
                className="p-3 bg-white/5 border border-white/10 rounded hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: EVENT_COLORS[event.event_type] }}
                      />
                      <span className="text-sm font-medium text-white/90">
                        {event.event_type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    
                    <div className="text-xs space-y-0.5">
                      <div className="flex gap-2">
                        <span className="text-white/50">User:</span>
                        <span className="text-white/80 font-mono">{event.user_id.slice(0, 8)}...</span>
                      </div>
                      {event.content_ref && (
                        <div className="flex gap-2">
                          <span className="text-white/50">Content:</span>
                          <span className="text-white/80 font-mono">{event.content_ref.slice(0, 8)}...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(event.occurred_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                {event.event_payload && Object.keys(event.event_payload).length > 0 && (
                  <details className="mt-2 pt-2 border-t border-white/10">
                    <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">
                      Payload
                    </summary>
                    <pre className="mt-2 text-xs text-white/70 bg-black/30 p-2 rounded overflow-auto">
                      {JSON.stringify(event.event_payload, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/50">No events found</p>
        )}
      </div>
    </div>
  );
}

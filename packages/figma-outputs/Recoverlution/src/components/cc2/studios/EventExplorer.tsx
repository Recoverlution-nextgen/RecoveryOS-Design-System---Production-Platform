/**
 * EVENT EXPLORER - REAL-TIME EVENT SPINE VIEWER
 * Query and filter events
 * See full event trail for debugging
 */

import { useState, useEffect } from 'react';
import { Activity, Filter } from 'lucide-react';
import { DataTable } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';

interface EventExplorerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function EventExplorer({ onBack, tenantScope }: EventExplorerProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  
  // Filters
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEvents();
  }, [tenantScope]);

  useEffect(() => {
    applyFilters();
  }, [events, eventTypeFilter, searchQuery]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Mock data - replace with real API call
      const mockEvents = [
        {
          id: '1',
          event_type: 'content_exposed',
          user_id: 'user-123',
          content_ref: 'content-1',
          occurred_at: new Date().toISOString(),
          source: 'feed',
        },
        {
          id: '2',
          event_type: 'content_opened',
          user_id: 'user-123',
          content_ref: 'content-1',
          occurred_at: new Date(Date.now() - 60000).toISOString(),
          source: 'feed',
        },
        {
          id: '3',
          event_type: 'content_completed',
          user_id: 'user-123',
          content_ref: 'content-1',
          occurred_at: new Date(Date.now() - 120000).toISOString(),
          source: 'feed',
          resulted_in_proof: true,
        },
        {
          id: '4',
          event_type: 'proof_created',
          user_id: 'user-123',
          content_ref: 'content-1',
          occurred_at: new Date(Date.now() - 125000).toISOString(),
          source: 'system',
        },
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(e => e.event_type === eventTypeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(e => 
        JSON.stringify(e).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#5739FB]" />
            Event Explorer
          </h1>
          <p className="text-zinc-400">
            Real-time event spine · Complete audit trail
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          filters={[
            {
              label: 'Event Type',
              value: eventTypeFilter,
              options: [
                { value: 'all', label: 'All Events' },
                { value: 'content_exposed', label: 'Exposed' },
                { value: 'content_opened', label: 'Opened' },
                { value: 'content_completed', label: 'Completed' },
                { value: 'proof_created', label: 'Proof Created' },
                { value: 'policy_blocked', label: 'Blocked' },
                { value: 'rescue_routed', label: 'Rescued' },
              ],
              onChange: setEventTypeFilter,
            },
          ]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Table */}
        <DataTable
          data={filteredEvents}
          columns={[
            { 
              key: 'event_type', 
              label: 'Event Type',
              render: (val) => (
                <span className={`
                  px-2 py-1 text-xs font-mono
                  ${val.includes('proof') ? 'bg-green-500/20 text-green-400' : ''}
                  ${val.includes('blocked') ? 'bg-red-500/20 text-red-400' : ''}
                  ${val.includes('exposed') ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${val.includes('completed') ? 'bg-purple-500/20 text-purple-400' : ''}
                `}>
                  {val}
                </span>
              )
            },
            { key: 'user_id', label: 'User ID', render: (val) => val?.slice(0, 8) + '...' },
            { key: 'content_ref', label: 'Content Ref', render: (val) => val?.slice(0, 10) + '...' || '-' },
            { key: 'source', label: 'Source' },
            { 
              key: 'resulted_in_proof', 
              label: 'Proof?',
              render: (val) => val ? <span className="text-green-400">✓</span> : '-'
            },
            { 
              key: 'occurred_at', 
              label: 'Time',
              render: (val) => new Date(val).toLocaleTimeString()
            },
          ]}
          onRowClick={handleEventClick}
          loading={loading}
        />

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
            <div className="bg-zinc-900 border border-zinc-700 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <pre className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-300 font-mono overflow-auto">
                  {JSON.stringify(selectedEvent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

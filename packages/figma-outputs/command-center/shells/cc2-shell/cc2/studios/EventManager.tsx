/**
 * EVENT MANAGER STUDIO
 * Alumni events, workshops, community gatherings
 * HIGH VALUE: Strengthen community and long-term engagement
 */

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Plus, Edit } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: 'workshop' | 'alumni_gathering' | 'webinar' | 'support_group';
  start_time: string;
  end_time: string;
  location: string;
  is_virtual: boolean;
  virtual_link?: string;
  capacity: number;
  registered_count: number;
  facilitator: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  tags: string[];
}

interface EventManagerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function EventManager({ onBack, tenantScope }: EventManagerProps) {
  const { organisationId } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, [organisationId]);

  async function loadEvents() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/events`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('[EventManager] Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.event_type === filterType;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return '#3B82F6';
      case 'alumni_gathering': return '#10B981';
      case 'webinar': return '#F59E0B';
      case 'support_group': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'workshop': return 'Workshop';
      case 'alumni_gathering': return 'Alumni Gathering';
      case 'webinar': return 'Webinar';
      case 'support_group': return 'Support Group';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Event Manager" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  const upcomingCount = events.filter(e => e.status === 'upcoming').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Event Manager" 
        subtitle={`${upcomingCount} upcoming events`}
        onBack={onBack}
        actions={
          <button
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        }
      />

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10 flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
        >
          <option value="all">All Types</option>
          <option value="workshop">Workshops</option>
          <option value="alumni_gathering">Alumni Gatherings</option>
          <option value="webinar">Webinars</option>
          <option value="support_group">Support Groups</option>
        </select>
      </div>

      {/* Events List */}
      <div className="p-6">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEvents.map(event => {
              const spotsRemaining = event.capacity - event.registered_count;
              const percentFull = (event.registered_count / event.capacity) * 100;

              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1 text-xs uppercase tracking-wider"
                        style={{
                          backgroundColor: `${getTypeColor(event.event_type)}20`,
                          color: getTypeColor(event.event_type),
                          border: `1px solid ${getTypeColor(event.event_type)}50`
                        }}
                      >
                        {getTypeLabel(event.event_type)}
                      </span>
                      {event.is_virtual && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                          Virtual
                        </span>
                      )}
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs capitalize ${
                        event.status === 'upcoming' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        event.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        event.status === 'completed' ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {event.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-70 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 opacity-70">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.start_time).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 opacity-70">
                      <MapPin className="w-4 h-4" />
                      {event.is_virtual ? 'Virtual Event' : event.location}
                    </div>
                    <div className="flex items-center gap-2 opacity-70">
                      <Users className="w-4 h-4" />
                      {event.registered_count} / {event.capacity} registered
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1 opacity-70">
                      <span>Capacity</span>
                      <span>{spotsRemaining} spots remaining</span>
                    </div>
                    <div className="h-2 bg-white/10">
                      <div 
                        className={`h-full ${percentFull >= 90 ? 'bg-red-500' : percentFull >= 70 ? 'bg-yellow-500' : 'bg-[#5739FB]'}`}
                        style={{ width: `${percentFull}%` }}
                      />
                    </div>
                  </div>

                  {/* Facilitator */}
                  <div className="text-sm opacity-70">
                    Facilitated by {event.facilitator}
                  </div>

                  {/* Tags */}
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {event.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/10 text-xs opacity-70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="px-3 py-1 text-xs uppercase tracking-wider"
                    style={{
                      backgroundColor: `${getTypeColor(selectedEvent.event_type)}20`,
                      color: getTypeColor(selectedEvent.event_type),
                      border: `1px solid ${getTypeColor(selectedEvent.event_type)}50`
                    }}
                  >
                    {getTypeLabel(selectedEvent.event_type)}
                  </span>
                  {selectedEvent.is_virtual && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                      Virtual
                    </span>
                  )}
                </div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedEvent.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm opacity-50 mb-1">Description</p>
                <p className="opacity-80">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-50 mb-1">Start Time</p>
                  <p>{new Date(selectedEvent.start_time).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-1">End Time</p>
                  <p>{new Date(selectedEvent.end_time).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm opacity-50 mb-1">Location</p>
                <p>{selectedEvent.is_virtual ? 'Virtual Event' : selectedEvent.location}</p>
                {selectedEvent.virtual_link && (
                  <a href={selectedEvent.virtual_link} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5739FB] hover:underline">
                    Join Meeting Link
                  </a>
                )}
              </div>

              <div>
                <p className="text-sm opacity-50 mb-1">Facilitator</p>
                <p>{selectedEvent.facilitator}</p>
              </div>

              <div>
                <p className="text-sm opacity-50 mb-2">Registration Status</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-white/10 mb-1">
                      <div 
                        className="h-full bg-[#5739FB]"
                        style={{ width: `${(selectedEvent.registered_count / selectedEvent.capacity) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm opacity-70">
                      {selectedEvent.registered_count} / {selectedEvent.capacity} registered
                    </p>
                  </div>
                </div>
              </div>

              {selectedEvent.tags.length > 0 && (
                <div>
                  <p className="text-sm opacity-50 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t border-white/10">
              <button
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                <Edit className="w-4 h-4" />
                Edit Event
              </button>
              <button
                className="flex-1 px-4 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                View Registrations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

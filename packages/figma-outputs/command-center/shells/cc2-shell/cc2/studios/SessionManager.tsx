/**
 * SESSION MANAGER STUDIO
 * Calendar view, session notes, recordings management
 * HIGH VALUE: Centralized session management for professionals
 */

import { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Mic, Video, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';

interface SessionNote {
  id: string;
  individual_id: string;
  individual_name: string;
  session_date: string;
  duration_minutes: number;
  notes: string;
  recording_url?: string;
  video_url?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface SessionManagerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function SessionManager({ onBack, tenantScope }: SessionManagerProps) {
  const { professionalId } = useUser();
  const [sessions, setSessions] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState<SessionNote | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    loadSessions();
  }, [professionalId, currentDate]);

  async function loadSessions() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) {
        setLoading(false);
        return;
      }

      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/sessions?start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error('[SessionManager] Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveNotes() {
    if (!selectedSession) return;

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/session-notes/${selectedSession.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes: editedNotes }),
        }
      );

      if (response.ok) {
        loadSessions();
        setEditMode(false);
        setSelectedSession({ ...selectedSession, notes: editedNotes });
      }
    } catch (error) {
      console.error('[SessionManager] Error saving notes:', error);
    }
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getSessionsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return sessions.filter(s => {
      const sessionDate = new Date(s.session_date);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Session Manager" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Session Manager" 
        subtitle={`${sessions.length} sessions in ${monthName}`}
        onBack={onBack}
        actions={
          <button
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>
        }
      />

      {/* View Toggle & Month Navigation */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 text-sm transition-colors ${
              view === 'calendar' 
                ? 'bg-[#3E2BB8] text-white' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm transition-colors ${
              view === 'list' 
                ? 'bg-[#3E2BB8] text-white' 
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            List View
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {monthName}
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {view === 'calendar' ? (
          /* Calendar View */
          <div className="bg-white/5 border border-white/10">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-white/10">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {getDaysInMonth().map((day, idx) => (
                <div
                  key={idx}
                  className="min-h-32 p-3 border-r border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  {day && (
                    <>
                      <div className="text-sm opacity-70 mb-2">{day}</div>
                      <div className="space-y-1">
                        {getSessionsForDay(day).map(session => (
                          <button
                            key={session.id}
                            onClick={() => {
                              setSelectedSession(session);
                              setEditedNotes(session.notes);
                            }}
                            className="w-full text-left p-2 bg-[#5739FB]/20 hover:bg-[#5739FB]/30 border border-[#5739FB]/30 text-xs transition-colors"
                          >
                            <div className="truncate">{session.individual_name}</div>
                            <div className="opacity-50">
                              {new Date(session.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 opacity-20 mx-auto mb-4" />
                <p className="opacity-50">No sessions this month</p>
              </div>
            ) : (
              sessions.map(session => (
                <div
                  key={session.id}
                  className="bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedSession(session);
                    setEditedNotes(session.notes);
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {session.individual_name}
                      </h3>
                      <p className="text-sm opacity-50">
                        {new Date(session.session_date).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm opacity-70">
                        <Clock className="w-4 h-4" />
                        {session.duration_minutes} min
                      </div>
                      {session.recording_url && (
                        <div className="p-2 bg-red-500/20 text-red-400">
                          <Mic className="w-4 h-4" />
                        </div>
                      )}
                      {session.video_url && (
                        <div className="p-2 bg-blue-500/20 text-blue-400">
                          <Video className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>

                  {session.notes && (
                    <p className="text-sm opacity-70 line-clamp-2 mb-3">
                      {session.notes}
                    </p>
                  )}

                  {session.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {session.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => {
            setSelectedSession(null);
            setEditMode(false);
          }}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-3xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedSession.individual_name}
                </h2>
                <p className="text-sm opacity-50">
                  {new Date(selectedSession.session_date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSession(null);
                  setEditMode(false);
                }}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 opacity-50" />
                <div>
                  <p className="text-xs opacity-50">Duration</p>
                  <p>{selectedSession.duration_minutes} minutes</p>
                </div>
              </div>
              {selectedSession.recording_url && (
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-xs opacity-50">Recording</p>
                    <a href={selectedSession.recording_url} target="_blank" rel="noopener noreferrer" className="text-[#5739FB] hover:underline">
                      Listen
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  <FileText className="w-5 h-5" />
                  Session Notes
                </h3>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    Edit Notes
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-3">
                  <textarea
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors"
                    rows={12}
                    style={{ fontFamily: 'var(--font-sans)' }}
                    placeholder="Add your session notes here..."
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={saveNotes}
                      className="flex-1 px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                    >
                      Save Notes
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedNotes(selectedSession.notes);
                      }}
                      className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white/5 border border-white/10 whitespace-pre-wrap">
                  {selectedSession.notes || <span className="opacity-50">No notes added yet</span>}
                </div>
              )}
            </div>

            {/* Tags */}
            {selectedSession.tags.length > 0 && (
              <div>
                <h4 className="text-sm opacity-50 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SCHEDULING CALENDAR STUDIO
 * Appointment booking, availability management, calendar sync
 * HIGH VALUE: Simplifies scheduling for professionals and individuals
 */

import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Check, X, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';

interface Appointment {
  id: string;
  individual_id: string;
  individual_name: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  type: 'initial' | 'followup' | 'crisis';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  reminder_sent: boolean;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface SchedulingCalendarProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function SchedulingCalendar({ onBack, tenantScope }: SchedulingCalendarProps) {
  const { professionalId } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    loadAppointments();
  }, [professionalId, currentDate]);

  async function loadAppointments() {
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
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/appointments?start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error('[SchedulingCalendar] Error loading appointments:', error);
    } finally {
      setLoading(false);
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
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getAppointmentsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return appointments.filter(apt => {
      const aptDate = new Date(apt.start_time);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#6B7280';
      case 'confirmed': return '#10B981';
      case 'cancelled': return '#EF4444';
      case 'completed': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'initial': return 'Initial Consultation';
      case 'followup': return 'Follow-up';
      case 'crisis': return 'Crisis Session';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Scheduling Calendar" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const scheduledCount = appointments.filter(a => a.status === 'scheduled').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <StudioHeader 
        title="Scheduling Calendar" 
        subtitle={`${confirmedCount} confirmed, ${scheduledCount} pending`}
        onBack={onBack}
        actions={
          <>
            <button
              className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <Settings className="w-4 h-4" />
              Availability
            </button>
            <button
              onClick={() => setShowNewAppointment(true)}
              className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </>
        }
      />

      {/* Month Navigation */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          {monthName}
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar */}
      <div className="p-6">
        <div className="bg-white/5 border border-white/10">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-white/10">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="p-4 text-center text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((day, idx) => {
              const dayAppointments = day ? getAppointmentsForDay(day) : [];
              const isToday = day && 
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === new Date().toDateString();

              return (
                <div
                  key={idx}
                  className={`min-h-32 p-3 border-r border-b border-white/5 hover:bg-white/5 transition-colors ${
                    isToday ? 'bg-[#5739FB]/10' : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm mb-2 ${isToday ? 'text-[#5739FB] font-bold' : 'opacity-70'}`}>
                        {day}
                        {isToday && <span className="ml-2 text-xs">(Today)</span>}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map(apt => (
                          <button
                            key={apt.id}
                            onClick={() => setSelectedAppointment(apt)}
                            className="w-full text-left p-2 hover:scale-105 transition-all text-xs"
                            style={{
                              backgroundColor: `${getStatusColor(apt.status)}20`,
                              borderLeft: `3px solid ${getStatusColor(apt.status)}`
                            }}
                          >
                            <div className="truncate" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                              {new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="truncate opacity-80">{apt.individual_name}</div>
                          </button>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-xs opacity-50 text-center py-1">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: getStatusColor('scheduled') }} />
            <span className="text-sm opacity-70">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: getStatusColor('confirmed') }} />
            <span className="text-sm opacity-70">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: getStatusColor('completed') }} />
            <span className="text-sm opacity-70">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4" style={{ backgroundColor: getStatusColor('cancelled') }} />
            <span className="text-sm opacity-70">Cancelled</span>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setSelectedAppointment(null)}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedAppointment.individual_name}
                </h2>
                <p className="text-sm" style={{ color: getStatusColor(selectedAppointment.status) }}>
                  {selectedAppointment.status.toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm opacity-50 mb-1">Type</p>
                <p className="text-lg">{getTypeLabel(selectedAppointment.type)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-50 mb-1">Date & Time</p>
                  <p>{new Date(selectedAppointment.start_time).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-50 mb-1">Duration</p>
                  <p>{selectedAppointment.duration_minutes} minutes</p>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm opacity-50 mb-1">Notes</p>
                  <p className="text-sm opacity-80">{selectedAppointment.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm opacity-50 mb-1">Reminder Status</p>
                <p className={selectedAppointment.reminder_sent ? 'text-green-400' : 'text-yellow-400'}>
                  {selectedAppointment.reminder_sent ? 'Reminder sent' : 'Reminder pending'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              {selectedAppointment.status === 'scheduled' && (
                <button
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  <Check className="w-5 h-5" />
                  Confirm Appointment
                </button>
              )}

              {(selectedAppointment.status === 'scheduled' || selectedAppointment.status === 'confirmed') && (
                <>
                  <button
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    Reschedule
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <X className="w-5 h-5" />
                    Cancel Appointment
                  </button>
                </>
              )}

              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

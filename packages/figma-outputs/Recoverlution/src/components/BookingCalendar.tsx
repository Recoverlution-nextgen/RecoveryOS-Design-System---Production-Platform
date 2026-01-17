import { useState } from "react";
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface BookingCalendarProps {
  showLeftColumn?: boolean;
  className?: string;
}

export function BookingCalendar({ showLeftColumn = true, className = "" }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'details' | 'confirmed'>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    notes: ''
  });

  // Generate available dates (next 14 days, excluding weekends)
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    let daysAdded = 0;
    let currentDate = new Date(today);
    
    while (daysAdded < 14) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
        dates.push(new Date(currentDate));
        daysAdded++;
      }
    }
    return dates;
  };

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const availableDates = getAvailableDates();
  const [currentWeekStart, setCurrentWeekStart] = useState(0);
  const datesPerPage = 5;
  const visibleDates = availableDates.slice(currentWeekStart, currentWeekStart + datesPerPage);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            date: selectedDate?.toISOString(),
            time: selectedTime,
            name: formData.name,
            email: formData.email,
            organization: formData.organization,
            role: formData.role,
            notes: formData.notes
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      console.log('Booking created successfully:', data);
      setBookingStep('confirmed');
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatDateLong = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`grid ${showLeftColumn ? 'lg:grid-cols-5' : 'lg:grid-cols-1'} gap-12 items-start ${className}`}>
      {/* Left Column - What We'll Cover */}
      {showLeftColumn && (
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 
              className="text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.875rem', letterSpacing: '-0.01em' }}
            >
              What We'll Cover
            </h2>
            
            <div className="space-y-4">
              {[
                "Live walkthrough of the platform (therapist & patient views)",
                "How the Six Pillars map to micro-blocks in the brain",
                "Red/Orange/Green neural state tracking in action",
                "How facilities customize content while maintaining evidence-based rigor",
                "Seat-based licensing & pricing structure",
                "Your specific questions answered"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F5F3FF] rounded-2xl p-6 border border-[#3E2BB8]/10">
            <h3 
              className="text-[#3E2BB8] mb-3"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
            >
              Who Should Attend?
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              Clinical directors, program managers, therapists, or anyone who believes recovery shouldn't be this hard.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed">
              <strong className="text-[#3E2BB8]">What to bring:</strong> Just curiosity. No preparation needed - we'll share our screen and show you exactly how it works.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Questions before we meet?
            </p>
            <p className="text-[#3E2BB8]" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              support@recoverlution.com
            </p>
          </div>
        </div>
      )}

      {/* Right Column - Custom Booking Interface */}
      <div className={showLeftColumn ? "lg:col-span-3" : "max-w-5xl mx-auto w-full"}>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] px-8 py-5">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-white" />
              <h3 
                className="text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
              >
                {bookingStep === 'confirmed' ? 'Booking Confirmed!' : 'Choose Your Time'}
              </h3>
            </div>
            <p className="text-white/80 text-sm mt-1">
              {bookingStep === 'confirmed' 
                ? 'We\'ll send you a calendar invite and reminder email shortly.'
                : bookingStep === 'date' 
                  ? 'Select a date that works for you'
                  : bookingStep === 'time'
                    ? 'Pick your preferred time slot'
                    : 'Just a few details and you\'re set'
              }
            </p>
          </div>
          
          <div className="p-12 md:p-16 min-h-[500px]">
            {bookingStep === 'confirmed' ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem' }}
                >
                  You're All Set
                </h4>
                <p className="text-gray-600 mb-2 max-w-md" style={{ fontSize: '1.0625rem' }}>
                  Your demo is scheduled for:
                </p>
                <p 
                  className="text-[#3E2BB8] mb-8"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem' }}
                >
                  {selectedDate && formatDateLong(selectedDate)} at {selectedTime}
                </p>
                <p className="text-gray-500 max-w-md mb-10" style={{ fontSize: '0.9375rem' }}>
                  Check your email at <strong>{formData.email}</strong> for calendar invite and meeting details
                </p>
                <Button
                  onClick={() => {
                    setBookingStep('date');
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setFormData({ name: '', email: '', organization: '', role: '', notes: '' });
                  }}
                  className="bg-[#3E2BB8] hover:bg-[#5739FB] px-8 py-6"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1.0625rem' }}
                >
                  Book Another Demo
                </Button>
              </div>
            ) : bookingStep === 'date' ? (
              <div>
                <div className="text-center mb-12">
                  <h4 
                    className="text-gray-900 mb-3"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.875rem' }}
                  >
                    Choose a Date
                  </h4>
                  <p className="text-gray-600" style={{ fontSize: '1.0625rem' }}>
                    Select a day that works for you
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex-1"></div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentWeekStart(Math.max(0, currentWeekStart - datesPerPage))}
                      disabled={currentWeekStart === 0}
                      className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentWeekStart(Math.min(availableDates.length - datesPerPage, currentWeekStart + datesPerPage))}
                      disabled={currentWeekStart + datesPerPage >= availableDates.length}
                      className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {visibleDates.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => handleDateSelect(date)}
                      className="p-6 rounded-2xl border border-gray-200 hover:border-[#3E2BB8] hover:bg-[#F5F3FF]/50 transition-all text-center group"
                    >
                      <div 
                        className="text-gray-500 mb-2 group-hover:text-[#3E2BB8]"
                        style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.875rem' }}
                      >
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div 
                        className="text-gray-900 group-hover:text-[#3E2BB8]"
                        style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}
                      >
                        {date.getDate()}
                      </div>
                      <div className="text-gray-400 mt-1" style={{ fontSize: '0.875rem' }}>
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : bookingStep === 'time' ? (
              <div>
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h4 
                      className="text-gray-900 mb-1"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.875rem' }}
                    >
                      {selectedDate && formatDate(selectedDate)}
                    </h4>
                    <p className="text-gray-500" style={{ fontSize: '0.9375rem' }}>
                      All times in your local timezone
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingStep('date')}
                    className="text-[#3E2BB8] hover:underline"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem' }}
                  >
                    Change Date
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="p-5 rounded-xl border border-gray-200 hover:border-[#3E2BB8] hover:bg-[#F5F3FF]/50 transition-all text-center"
                    >
                      <Clock className="w-4 h-4 text-gray-400 mx-auto mb-2" />
                      <div 
                        className="text-gray-900"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
                      >
                        {time}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <h4 
                    className="text-gray-900 mb-3"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.875rem' }}
                  >
                    Your Details
                  </h4>
                  <p className="text-gray-600" style={{ fontSize: '1.0625rem' }}>
                    Just a few details and you're set
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-800" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
                          Booking Failed
                        </p>
                        <p className="text-red-700" style={{ fontSize: '0.875rem' }}>{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#F5F3FF] rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-2 text-[#3E2BB8] mb-3">
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                        Your Selection
                      </span>
                    </div>
                    <p className="text-gray-700" style={{ fontSize: '1rem' }}>
                      {selectedDate && formatDateLong(selectedDate)} at <strong>{selectedTime}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingStep('date')}
                      className="text-[#3E2BB8] hover:underline mt-3"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}
                    >
                      Change Time
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Sarah Chen"
                      className="border-gray-300 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@recoverycenters.com"
                      className="border-gray-300 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Serenity Recovery Centers"
                      className="border-gray-300 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Clinical Director"
                      className="border-gray-300 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">What are you most curious about? (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us what you'd like to see in the demo..."
                      rows={4}
                      className="border-gray-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3E2BB8] hover:bg-[#5739FB] py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem' }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> Creating Your Booking...
                      </span>
                    ) : (
                      'Confirm Demo Booking'
                    )}
                  </Button>

                  <p className="text-center text-gray-500 pt-4" style={{ fontSize: '0.8125rem' }}>
                    By scheduling a demo, you'll receive calendar invites and reminder emails
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

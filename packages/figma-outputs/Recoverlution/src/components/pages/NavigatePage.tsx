import { useState } from 'react';
import { SAMPLE_MEETINGS } from '@/lib/navigate/SAMPLE_MEETINGS';
import type { Meeting } from '@/lib/types/navigate';
import { Calendar, MapPin, Users, Clock, Search, Filter, ExternalLink } from 'lucide-react';

type View = 'meetings' | 'calendar' | 'alumni';

export function NavigatePage() {
  const [view, setView] = useState<View>('meetings');
  const [filterType, setFilterType] = useState<Meeting['type'] | 'all'>('all');
  const [filterFormat, setFilterFormat] = useState<Meeting['format'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter meetings
  const filteredMeetings = SAMPLE_MEETINGS.filter(meeting => {
    const matchesType = filterType === 'all' || meeting.type === filterType;
    const matchesFormat = filterFormat === 'all' || meeting.format === filterFormat;
    const matchesSearch = searchQuery === '' ||
      meeting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesFormat && matchesSearch;
  });

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-[#3E2BB8] mb-2">Navigate</h1>
          <p className="text-[#3E2BB8]/60">
            Find meetings, connect with community, plan your week
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setView('meetings')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                view === 'meetings'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <MapPin className="size-5" />
              <span>Meeting Finder</span>
            </button>

            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                view === 'calendar'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <Calendar className="size-5" />
              <span>Calendar</span>
            </button>

            <button
              onClick={() => setView('alumni')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                view === 'alumni'
                  ? 'border-[#5739FB] text-[#5739FB]'
                  : 'border-transparent text-[#3E2BB8]/60 hover:text-[#3E2BB8]'
              }`}
            >
              <Users className="size-5" />
              <span>Alumni Feed</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* MEETING FINDER */}
        {view === 'meetings' && (
          <div>
            {/* Filters */}
            <div className="bg-[#3E2BB8]/5 border border-[#3E2BB8]/20 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#3E2BB8]/40" />
                    <input
                      type="text"
                      placeholder="Search meetings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/40 focus:outline-none focus:border-[#5739FB]"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="size-5 text-[#3E2BB8]/60" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as Meeting['type'] | 'all')}
                    className="px-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] focus:outline-none focus:border-[#5739FB]"
                  >
                    <option value="all">All Types</option>
                    <option value="12_step">12-Step</option>
                    <option value="SMART">SMART</option>
                    <option value="Refuge">Refuge</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Format Filter */}
                <div>
                  <select
                    value={filterFormat}
                    onChange={(e) => setFilterFormat(e.target.value as Meeting['format'] | 'all')}
                    className="px-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] focus:outline-none focus:border-[#5739FB]"
                  >
                    <option value="all">All Formats</option>
                    <option value="in_person">In Person</option>
                    <option value="virtual">Virtual</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Meetings List */}
            <div className="space-y-4">
              {filteredMeetings.length === 0 ? (
                <div className="text-center py-12 text-[#3E2BB8]/60">
                  No meetings found. Try adjusting your filters.
                </div>
              ) : (
                filteredMeetings.map(meeting => (
                  <div
                    key={meeting.id}
                    className="border border-[#3E2BB8]/20 bg-white p-6 hover:border-[#3E2BB8] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 text-xs border border-[#3E2BB8] bg-[#3E2BB8]/10 text-[#3E2BB8]">
                            {meeting.type.replace('_', '-').toUpperCase()}
                          </span>
                          <span className="px-3 py-1 text-xs border border-[#5739FB]/20 bg-[#5739FB]/5 text-[#5739FB] capitalize">
                            {meeting.format.replace('_', ' ')}
                          </span>
                        </div>
                        <h3 className="text-[#3E2BB8] mb-2">{meeting.name}</h3>
                        <p className="text-[#3E2BB8]/80 text-sm mb-3">
                          {meeting.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[#3E2BB8]/80 mb-4">
                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <Clock className="size-4" />
                        <span className="capitalize">
                          {meeting.schedule.day}s at {meeting.schedule.time}
                        </span>
                      </div>

                      {/* Location */}
                      {meeting.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          <span>{meeting.address}</span>
                        </div>
                      )}

                      {/* Virtual Link */}
                      {meeting.virtual_link && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="size-4" />
                          <a
                            href={meeting.virtual_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5739FB] hover:underline"
                          >
                            Join virtually
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Accessibility */}
                    {meeting.accessibility.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {meeting.accessibility.map(feature => (
                          <span
                            key={feature}
                            className="px-2 py-1 text-xs bg-[#3E2BB8]/5 text-[#3E2BB8]/60"
                          >
                            {feature.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {view === 'calendar' && (
          <div className="bg-white border border-[#3E2BB8]/20 p-12 text-center">
            <Calendar className="size-16 text-[#3E2BB8]/40 mx-auto mb-4" />
            <h3 className="text-[#3E2BB8] mb-2">Calendar Integration</h3>
            <p className="text-[#3E2BB8]/60 mb-6">
              Connect your Google or Apple Calendar to sync events and get LUMA reminders.
            </p>
            <button className="px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors">
              Connect Calendar
            </button>
          </div>
        )}

        {/* ALUMNI FEED */}
        {view === 'alumni' && (
          <div className="bg-white border border-[#3E2BB8]/20 p-12 text-center">
            <Users className="size-16 text-[#3E2BB8]/40 mx-auto mb-4" />
            <h3 className="text-[#3E2BB8] mb-2">Alumni Community</h3>
            <p className="text-[#3E2BB8]/60 mb-6">
              Connect with others in recovery. Share wins, ask for support, build community.
            </p>
            <div className="space-y-2">
              <button className="w-full px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors">
                Join Community
              </button>
              <p className="text-xs text-[#3E2BB8]/40">
                Moderated for safety. Community guidelines apply.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * RECOVERY MEETING FINDER
 * Find local AA/NA/Smart Recovery meetings with geolocation search
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';

interface Meeting {
  id: string;
  name: string;
  type: 'AA' | 'NA' | 'Smart Recovery' | 'Refuge Recovery' | 'SMART' | 'Al-Anon';
  format: 'in-person' | 'online' | 'hybrid';
  address: string;
  city: string;
  state: string;
  zip: string;
  schedule: Record<string, string>; // { monday: '7:00 PM', wednesday: '6:00 PM' }
  meeting_url: string | null;
  phone: string | null;
  notes: string | null;
  distance_miles?: number;
}

export default function RecoveryMeetingFinderPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchZip, setSearchZip] = useState('');
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadMeetings();
    requestGeolocation();
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [selectedType, selectedFormat, meetings]);

  async function loadMeetings() {
    const { data } = await supabase
      .from('recovery_meetings')
      .select('*')
      .eq('verified', true)
      .order('name');

    setMeetings(data || []);
    setFilteredMeetings(data || []);
    setLoading(false);
  }

  function requestGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
        },
        error => console.log('Geolocation denied:', error)
      );
    }
  }

  function filterMeetings() {
    let filtered = [...meetings];

    if (selectedType !== 'all') {
      filtered = filtered.filter(m => m.type === selectedType);
    }

    if (selectedFormat !== 'all') {
      filtered = filtered.filter(m => m.format === selectedFormat);
    }

    setFilteredMeetings(filtered);
  }

  async function searchByZip() {
    if (!searchZip) return;

    // Filter by ZIP (simple matching)
    const filtered = meetings.filter(m => m.zip.startsWith(searchZip));
    setFilteredMeetings(filtered);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading meetings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <button
          onClick={() => onNavigate('Navigate')}
          className="mb-4 px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back to Navigate
        </button>
        <h1 className="mb-2">Recovery Meetings</h1>
        <p className="text-lg opacity-70">Find local and online support group meetings</p>
      </header>

      {/* Search & Filters */}
      <div className="mb-12 p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* ZIP Search */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm">Search by ZIP Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchZip}
                onChange={e => setSearchZip(e.target.value)}
                placeholder="Enter ZIP code"
                className="flex-1 px-4 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
              <button
                onClick={searchByZip}
                className="px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
              >
                Search
              </button>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block mb-2 text-sm">Meeting Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
            >
              <option value="all">All Types</option>
              <option value="AA">AA</option>
              <option value="NA">NA</option>
              <option value="Smart Recovery">Smart Recovery</option>
              <option value="Refuge Recovery">Refuge Recovery</option>
              <option value="Al-Anon">Al-Anon</option>
            </select>
          </div>

          {/* Format Filter */}
          <div>
            <label className="block mb-2 text-sm">Format</label>
            <select
              value={selectedFormat}
              onChange={e => setSelectedFormat(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
            >
              <option value="all">All Formats</option>
              <option value="in-person">In Person</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm opacity-70">
          Showing {filteredMeetings.length} meetings
        </p>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map(meeting => (
          <div
            key={meeting.id}
            className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 hover:border-opacity-20 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3>{meeting.name}</h3>
                  <span className="px-2 py-1 text-xs bg-[#3E2BB8] bg-opacity-30 rounded">
                    {meeting.type}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    meeting.format === 'online' ? 'bg-blue-500 bg-opacity-30' :
                    meeting.format === 'hybrid' ? 'bg-purple-500 bg-opacity-30' :
                    'bg-green-500 bg-opacity-30'
                  }`}>
                    {meeting.format}
                  </span>
                </div>
                {meeting.format !== 'online' && (
                  <p className="text-sm opacity-70 mb-2">
                    📍 {meeting.address}, {meeting.city}, {meeting.state} {meeting.zip}
                  </p>
                )}
                {meeting.distance_miles && (
                  <p className="text-sm text-green-400 mb-2">
                    {meeting.distance_miles.toFixed(1)} miles away
                  </p>
                )}
              </div>
            </div>

            {/* Schedule */}
            <div className="mb-4">
              <p className="text-sm mb-2 opacity-70">Weekly Schedule:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(meeting.schedule).map(([day, time]) => (
                  <div
                    key={day}
                    className="px-3 py-2 bg-white bg-opacity-10 rounded text-sm"
                  >
                    <span className="capitalize">{day}</span>: {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {meeting.meeting_url && (
                <a
                  href={meeting.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
                >
                  Join Online
                </a>
              )}
              {meeting.phone && (
                <a
                  href={`tel:${meeting.phone}`}
                  className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
                >
                  Call {meeting.phone}
                </a>
              )}
              {meeting.format !== 'online' && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meeting.address + ', ' + meeting.city + ', ' + meeting.state)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
                >
                  Get Directions
                </a>
              )}
            </div>

            {meeting.notes && (
              <p className="mt-4 text-sm opacity-70 p-3 bg-white bg-opacity-5 rounded">
                ℹ️ {meeting.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg opacity-70 mb-4">No meetings found matching your criteria</p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedFormat('all');
              setSearchZip('');
              setFilteredMeetings(meetings);
            }}
            className="px-4 py-2 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

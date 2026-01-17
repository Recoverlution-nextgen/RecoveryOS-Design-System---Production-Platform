/**
 * NAVICUE LIBRARY BROWSER
 * 
 * Database-powered browser for all 1,064 NaviCues
 * Organized by track, pillar, family, and response type
 * Click to practice any NaviCue in Universal Player
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '../../utils/supabase/client';

const supabase = createClient();

interface NaviCue {
  id: string;
  navicue_id: string;
  name: string;
  family: string;
  text_line: string;
  pillar_id: string;
  track: string;
  voice_archetype: string;
  kbe_layer: string;
  response_type: string;
  delivery_mechanism: string;
  intent_primary: string;
  schemas: string[];
  status: string;
}

interface NaviCueLibraryBrowserProps {
  onNavigate?: (page: string) => void;
  onPlayNaviCue?: (navicueId: string) => void;
}

type FilterType = 'all' | 'track' | 'pillar' | 'family' | 'response';

const PILLAR_NAMES: Record<string, string> = {
  'ER': 'Emotional Regulation',
  'SR': 'Self Reliance',
  'CR': 'Cognitive Restructuring',
  'II': 'Identity Integration',
  'DM': 'Decision Making',
  'SC': 'Social Connection'
};

const TRACK_NAMES: Record<string, string> = {
  'clinical': 'Clinical',
  'guru': 'Guru',
  'magic_wand': 'Magic Wand'
};

export function NaviCueLibraryBrowser({ onNavigate, onPlayNaviCue }: NaviCueLibraryBrowserProps) {
  const [navicues, setNavicues] = useState<NaviCue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedResponse, setSelectedResponse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI states
  const [selectedNaviCue, setSelectedNaviCue] = useState<NaviCue | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch all NaviCues from database
  useEffect(() => {
    async function fetchNaviCues() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('navicue_library')
          .select('*')
          .eq('status', 'active')
          .order('track', { ascending: true })
          .order('pillar_id', { ascending: true })
          .order('family', { ascending: true });

        if (fetchError) throw fetchError;

        setNavicues(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching NaviCues:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNaviCues();
  }, []);

  // Filter NaviCues
  const filteredNaviCues = navicues.filter(nc => {
    if (selectedTrack !== 'all' && nc.track !== selectedTrack) return false;
    if (selectedPillar !== 'all' && nc.pillar_id !== selectedPillar) return false;
    if (selectedFamily !== 'all' && nc.family !== selectedFamily) return false;
    if (selectedResponse !== 'all' && nc.response_type !== selectedResponse) return false;
    if (searchQuery && !nc.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !nc.text_line.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Get unique values for filters
  const tracks = ['all', ...Array.from(new Set(navicues.map(nc => nc.track)))];
  const pillars = ['all', ...Array.from(new Set(navicues.map(nc => nc.pillar_id)))];
  const families = ['all', ...Array.from(new Set(navicues.map(nc => nc.family)))];
  const responseTypes = ['all', ...Array.from(new Set(navicues.map(nc => nc.response_type)))];

  // Stats
  const stats = {
    total: navicues.length,
    clinical: navicues.filter(nc => nc.track === 'clinical').length,
    guru: navicues.filter(nc => nc.track === 'guru').length,
    magicWand: navicues.filter(nc => nc.track === 'magic_wand').length,
    filtered: filteredNaviCues.length
  };

  const handlePlayNaviCue = (navicue: NaviCue) => {
    if (onPlayNaviCue) {
      onPlayNaviCue(navicue.id);
    } else {
      // Default: open in modal preview
      setSelectedNaviCue(navicue);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="text-center space-y-4">
          <div className="text-2xl" style={{ color: '#FFFFFF' }}>Loading NaviCue Library...</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Fetching 1,064 NaviCues from database
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="text-center space-y-4">
          <div className="text-2xl" style={{ color: '#FF6B6B' }}>Error Loading NaviCues</div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
                NaviCue Library
              </h1>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {stats.total.toLocaleString()} production NaviCues ready to practice
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('navicue-arsenal')}
                className="px-4 py-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                ← Back to Arsenal
              </button>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>{stats.clinical}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Clinical</div>
            </div>
            <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>{stats.guru}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Guru</div>
            </div>
            <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>{stats.magicWand}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Magic Wand</div>
            </div>
            <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              <div className="text-3xl mb-1" style={{ color: '#5739FB' }}>{stats.filtered}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Filtered</div>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search NaviCues by name or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 text-sm"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.2)',
              color: '#FFFFFF',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {/* Track Filter */}
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Track
              </label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                {tracks.map(track => (
                  <option key={track} value={track}>
                    {track === 'all' ? 'All Tracks' : TRACK_NAMES[track] || track}
                  </option>
                ))}
              </select>
            </div>

            {/* Pillar Filter */}
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Pillar
              </label>
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                className="w-full px-3 py-2 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                {pillars.map(pillar => (
                  <option key={pillar} value={pillar}>
                    {pillar === 'all' ? 'All Pillars' : `${pillar} - ${PILLAR_NAMES[pillar] || ''}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Family Filter */}
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Family
              </label>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="w-full px-3 py-2 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                <option value="all">All Families</option>
                {families.filter(f => f !== 'all').slice(0, 20).map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>
            </div>

            {/* Response Type Filter */}
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Response Type
              </label>
              <select
                value={selectedResponse}
                onChange={(e) => setSelectedResponse(e.target.value)}
                className="w-full px-3 py-2 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.2)',
                  color: '#FFFFFF'
                }}
              >
                {responseTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* NaviCue Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredNaviCues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              No NaviCues match your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNaviCues.map((navicue) => (
              <motion.div
                key={navicue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 cursor-pointer transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '1px solid rgba(87, 57, 251, 0.2)'
                }}
                onClick={() => handlePlayNaviCue(navicue)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      {navicue.navicue_id}
                    </div>
                    <h3 className="text-lg mb-1" style={{ color: '#FFFFFF' }}>
                      {navicue.name}
                    </h3>
                  </div>
                </div>

                {/* Text */}
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {navicue.text_line}
                </p>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: navicue.track === 'magic_wand' ? 'rgba(255, 107, 157, 0.2)' : 
                                       navicue.track === 'guru' ? 'rgba(255, 193, 7, 0.2)' : 
                                       'rgba(78, 205, 196, 0.2)',
                      color: navicue.track === 'magic_wand' ? '#FF6B9D' : 
                             navicue.track === 'guru' ? '#FFC107' : 
                             '#4ECDC4'
                    }}
                  >
                    {TRACK_NAMES[navicue.track] || navicue.track}
                  </span>
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)', color: '#5739FB' }}
                  >
                    {navicue.pillar_id}
                  </span>
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    {navicue.response_type}
                  </span>
                </div>

                {/* Family */}
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {navicue.family}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* NaviCue Preview Modal */}
      <AnimatePresence>
        {selectedNaviCue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)'
            }}
            onClick={() => setSelectedNaviCue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full p-8"
              style={{
                backgroundColor: '#0A0B0F',
                border: '1px solid rgba(87, 57, 251, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {selectedNaviCue.navicue_id}
                </div>
                <h2 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
                  {selectedNaviCue.name}
                </h2>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {selectedNaviCue.family}
                </p>
              </div>

              <div className="mb-6 p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
                <p className="text-lg" style={{ color: '#FFFFFF' }}>
                  {selectedNaviCue.text_line}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Track</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {TRACK_NAMES[selectedNaviCue.track] || selectedNaviCue.track}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Pillar</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {selectedNaviCue.pillar_id} - {PILLAR_NAMES[selectedNaviCue.pillar_id]}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Response</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {selectedNaviCue.response_type}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>KBE Layer</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {selectedNaviCue.kbe_layer}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Voice</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {selectedNaviCue.voice_archetype}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Intent</div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    {selectedNaviCue.intent_primary}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedNaviCue(null)}
                  className="flex-1 px-6 py-3 transition-opacity hover:opacity-70"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (onPlayNaviCue) {
                      onPlayNaviCue(selectedNaviCue.id);
                      setSelectedNaviCue(null);
                    }
                  }}
                  className="flex-1 px-6 py-3 transition-opacity hover:opacity-70"
                  style={{
                    backgroundColor: '#5739FB',
                    color: '#FFFFFF'
                  }}
                >
                  Practice This NaviCue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NaviCueLibraryBrowser;
/**
 * TAB: SWITCH
 * Quick launcher - access all 6 S's without navigating
 */

import React from 'react';
import { Radio, Music, Book, StickyNote, Library, Search, Play } from 'lucide-react';
import { PlayerState, PlayerActions } from '../../../types/lumaPlay';
import { STATIONS, SOUNDTRACKS } from '../../../data/lumaPlayMockData';

interface TabSwitchProps {
  state: PlayerState;
  actions: PlayerActions;
}

export function TabSwitch({ state, actions }: TabSwitchProps) {
  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
      
      {/* Stations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Radio className="w-4 h-4" />
          STATIONS
        </div>
        <div className="grid grid-cols-2 gap-3">
          {STATIONS.map((station) => {
            const isActive = state.source === 'station' && state.sourceId === station.id;
            
            return (
              <button
                key={station.id}
                onClick={() => actions.playStation(station.id)}
                className={`luma-glass p-4 text-left transition-all hover:bg-white/15 ${
                  isActive ? 'ring-2 ring-[#5739FB]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{station.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{station.name}</div>
                    {isActive && (
                      <div className="flex items-center gap-1 text-[#5739FB] text-xs mt-1">
                        <Play className="w-3 h-3" />
                        Playing
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Soundtracks */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Music className="w-4 h-4" />
          SOUNDTRACKS
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SOUNDTRACKS.map((soundtrack) => {
            const isActive = state.source === 'soundtracks' && state.sourceId === soundtrack.id;
            
            return (
              <button
                key={soundtrack.id}
                onClick={() => actions.playSoundtrack(soundtrack.id)}
                className={`luma-glass p-4 text-left transition-all hover:bg-white/15 ${
                  isActive ? 'ring-2 ring-[#5739FB]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center luma-glass">
                    <Music className="w-5 h-5 text-[#5739FB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{soundtrack.name}</div>
                    <div className="text-white/50 text-xs">{soundtrack.tracks.length} tracks</div>
                    {isActive && (
                      <div className="flex items-center gap-1 text-[#5739FB] text-xs mt-1">
                        <Play className="w-3 h-3" />
                        Playing
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

          {/* New Soundtrack button */}
          <button className="luma-glass p-4 text-left transition-all hover:bg-white/15 border-2 border-dashed border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center luma-glass">
                <Music className="w-5 h-5 text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-sm">New Soundtrack</div>
                <div className="text-white/40 text-xs">Create playlist</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Access - Other S's */}
      <div className="space-y-3">
        <div className="text-white/70 text-sm">QUICK ACCESS</div>
        <div className="grid grid-cols-2 gap-3">
          
          {/* Story */}
          <button
            onClick={actions.playStory}
            className={`luma-glass p-4 text-left transition-all hover:bg-white/15 ${
              state.source === 'story' ? 'ring-2 ring-[#5739FB]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center luma-glass">
                <Book className="w-5 h-5 text-[#5739FB]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm">Your Story</div>
                <div className="text-white/50 text-xs">Voice timeline</div>
              </div>
            </div>
          </button>

          {/* Stickynotes */}
          <button
            onClick={actions.playStickynotes}
            className={`luma-glass p-4 text-left transition-all hover:bg-white/15 ${
              state.source === 'stickynotes' ? 'ring-2 ring-[#5739FB]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center luma-glass">
                <StickyNote className="w-5 h-5 text-[#5739FB]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm">Stickynotes</div>
                <div className="text-white/50 text-xs">Support messages</div>
              </div>
            </div>
          </button>

          {/* Browse Shelf */}
          <button
            className="luma-glass p-4 text-left transition-all hover:bg-white/15"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center luma-glass">
                <Library className="w-5 h-5 text-[#5739FB]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm">Browse Shelf</div>
                <div className="text-white/50 text-xs">All content</div>
              </div>
            </div>
          </button>

          {/* Search */}
          <button
            className="luma-glass p-4 text-left transition-all hover:bg-white/15"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center luma-glass">
                <Search className="w-5 h-5 text-[#5739FB]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm">Search</div>
                <div className="text-white/50 text-xs">Find anything</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Empty state hint */}
      {!state.currentTrack && (
        <div className="text-center py-8">
          <div className="text-white/50 text-sm">Tap any source to start playing</div>
        </div>
      )}
    </div>
  );
}

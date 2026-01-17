/**
 * TAB: SETTINGS
 * Contextual settings based on what's playing
 */

import React from 'react';
import { Zap, Flame, Sparkles, Radio, Music, Volume2 } from 'lucide-react';
import { PlayerState, PlayerActions, FrequencySettings } from '../../../types/lumaPlay';
import { STATIONS, SOUNDTRACKS } from '../../../data/lumaPlayMockData';

interface TabSettingsProps {
  state: PlayerState;
  actions: PlayerActions;
  formatDuration: (seconds: number) => string;
}

export function TabSettings({ state, actions, formatDuration }: TabSettingsProps) {
  const { source, sourceId, playlist, volume } = state;

  // No source active
  if (!source) {
    return (
      <div className="flex items-center justify-center h-full px-4">
        <div className="text-center">
          <div className="text-white/50 text-lg mb-2">No settings available</div>
          <div className="text-white/30 text-sm">Start playing to adjust settings</div>
        </div>
      </div>
    );
  }

  // STATION SETTINGS
  if (source === 'station' && sourceId) {
    const station = STATIONS.find(s => s.id === sourceId);
    if (!station) return null;

    const handleFrequencyChange = (updates: Partial<FrequencySettings>) => {
      // In real implementation, this would update the station and regenerate playlist
      console.log('Update station frequency:', updates);
    };

    return (
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
        
        {/* Station Info */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{station.icon}</div>
          <div className="text-white text-2xl mb-1">{station.name}</div>
          <div className="text-white/50 text-sm">Station Frequency</div>
        </div>

        {/* Mode */}
        <div className="space-y-3">
          <div className="text-white/70 text-sm flex items-center gap-2">
            <Radio className="w-4 h-4" />
            MODE
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleFrequencyChange({ mode: 'all' })}
              className={station.frequency.mode === 'all' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              All
            </button>
            <button
              onClick={() => handleFrequencyChange({ mode: 'sparks' })}
              className={station.frequency.mode === 'sparks' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFrequencyChange({ mode: 'flames' })}
              className={station.frequency.mode === 'flames' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              <Flame className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFrequencyChange({ mode: 'embers' })}
              className={station.frequency.mode === 'embers' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tempo */}
        <div className="space-y-3">
          <div className="text-white/70 text-sm">TEMPO</div>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleFrequencyChange({ tempo: 'high' })}
              className={station.frequency.tempo === 'high' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              High
            </button>
            <button
              onClick={() => handleFrequencyChange({ tempo: 'medium' })}
              className={station.frequency.tempo === 'medium' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Med
            </button>
            <button
              onClick={() => handleFrequencyChange({ tempo: 'low' })}
              className={station.frequency.tempo === 'low' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Low
            </button>
            <button
              onClick={() => handleFrequencyChange({ tempo: 'off' })}
              className={station.frequency.tempo === 'off' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Off
            </button>
          </div>
        </div>

        {/* Source */}
        <div className="space-y-3">
          <div className="text-white/70 text-sm">SOURCE</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFrequencyChange({ source: 'library' })}
              className={station.frequency.source === 'library' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Library
            </button>
            <button
              onClick={() => handleFrequencyChange({ source: 'voice' })}
              className={station.frequency.source === 'voice' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Voice
            </button>
            <button
              onClick={() => handleFrequencyChange({ source: 'both' })}
              className={station.frequency.source === 'both' ? 'luma-toggle-active' : 'luma-toggle'}
            >
              Both
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button className="luma-glass p-3 text-white text-sm hover:bg-white/15 transition-all">
            Update Preset
          </button>
          <button className="luma-glass p-3 text-white text-sm hover:bg-white/15 transition-all">
            Save as New
          </button>
        </div>

        {/* Queue Info */}
        <div className="luma-glass p-4 text-center">
          <div className="text-white/50 text-sm">
            Auto-generating infinite queue
          </div>
        </div>
      </div>
    );
  }

  // SOUNDTRACK SETTINGS
  if (source === 'soundtracks' && sourceId) {
    const soundtrack = SOUNDTRACKS.find(s => s.id === sourceId);
    if (!soundtrack) return null;

    return (
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
        
        {/* Soundtrack Info */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto flex items-center justify-center luma-glass mb-3">
            <Music className="w-8 h-8 text-[#5739FB]" />
          </div>
          <div className="text-white text-2xl mb-1">{soundtrack.name}</div>
          <div className="text-white/50 text-sm">{soundtrack.tracks.length} tracks · {formatDuration(soundtrack.tracks.reduce((sum, t) => sum + t.duration, 0))}</div>
        </div>

        {/* Track List */}
        <div className="space-y-3">
          <div className="text-white/70 text-sm">TRACKS</div>
          <div className="space-y-2">
            {soundtrack.tracks.map((track, index) => (
              <div
                key={track.id}
                className="luma-glass p-3 flex items-center gap-3"
              >
                <div className="text-white/50 text-sm w-6">{index + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{track.title}</div>
                  <div className="text-white/50 text-xs">{formatDuration(track.duration)}</div>
                </div>
                <div className="flex items-center gap-1">
                  {track.type === 'spark' && <Zap className="w-3 h-3 text-[#5739FB]" />}
                  {track.type === 'flame' && <Flame className="w-3 h-3 text-[#5739FB]" />}
                  {track.type === 'ember' && <Sparkles className="w-3 h-3 text-[#5739FB]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playback Options */}
        <div className="grid grid-cols-2 gap-3">
          <button className={soundtrack.shuffle ? 'luma-toggle-active' : 'luma-toggle'}>
            Shuffle {soundtrack.shuffle ? 'On' : 'Off'}
          </button>
          <button className={soundtrack.repeat ? 'luma-toggle-active' : 'luma-toggle'}>
            Repeat {soundtrack.repeat ? 'On' : 'Off'}
          </button>
        </div>

        {/* Actions */}
        <button className="w-full luma-glass p-3 text-white text-sm hover:bg-white/15 transition-all">
          Edit Track List
        </button>
      </div>
    );
  }

  // STORY SETTINGS
  if (source === 'story') {
    return (
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-white text-xl mb-2">Your Story</div>
          <div className="text-white/50 text-sm mb-6">Voice notes timeline</div>
        </div>

        <div className="space-y-3">
          <div className="text-white/70 text-sm">PLAYBACK</div>
          <div className="grid grid-cols-2 gap-3">
            <button className="luma-toggle-active">Chronological</button>
            <button className="luma-toggle">Reverse</button>
          </div>
        </div>

        <div className="luma-glass p-4 text-center">
          <div className="text-white/50 text-sm">
            Playing your voice notes from oldest to newest
          </div>
        </div>
      </div>
    );
  }

  // STICKYNOTES SETTINGS
  if (source === 'stickynotes') {
    return (
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="text-white text-xl mb-2">Stickynotes</div>
          <div className="text-white/50 text-sm mb-6">Support messages</div>
        </div>

        <div className="space-y-3">
          <div className="text-white/70 text-sm">AUTO-PLAY</div>
          <div className="grid grid-cols-2 gap-3">
            <button className="luma-toggle-active">Enabled</button>
            <button className="luma-toggle">Manual</button>
          </div>
        </div>

        <div className="luma-glass p-4 text-center">
          <div className="text-white/50 text-sm">
            New stickynotes play automatically when received
          </div>
        </div>
      </div>
    );
  }

  // SHELF/SEARCH - Generic settings
  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
      
      {/* Volume Control */}
      <div className="space-y-3">
        <div className="text-white/70 text-sm flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          VOLUME
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => actions.setVolume(Number(e.target.value) / 100)}
          className="w-full"
        />
      </div>

      <div className="luma-glass p-4 text-center">
        <div className="text-white/50 text-sm">
          Queue: {playlist.length} tracks
        </div>
      </div>
    </div>
  );
}

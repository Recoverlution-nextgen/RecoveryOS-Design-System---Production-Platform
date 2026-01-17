/**
 * WELLBEING VIDEO RENDERER (Video Experience)
 * 
 * Purpose: State-shifters + primers + anchors
 * What it's NOT: "Watch content"
 * What it IS: Guided state intervention with measurable intent
 * 
 * Purpose options: Downshift, Energize, Clarify, Connect, Meaning
 * Required: ≥1 practice (mid-roll or end-roll)
 * 
 * Structure:
 * 1. Arrival (10-20s): "What we're doing + why"
 * 2. Safety cues (10s): Eyes open option / stop anytime
 * 3. Guided main (60-600s): The actual protocol
 * 4. Landing (20-40s): Re-orient to life
 * 5. Receipt (10-20s): "What changed?"
 * 6. Transfer cue (one line): Where to use it today
 */

import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ChevronRight } from 'lucide-react';
import { TruthLayer } from './shared/TruthLayer';

export type VideoPurpose = 'downshift' | 'energize' | 'clarify' | 'connect' | 'meaning';

export interface Chapter {
  timestamp: number; // seconds
  title: string;
  type: 'arrival' | 'safety' | 'main' | 'landing' | 'receipt' | 'transfer';
}

export interface WellbeingVideoContent {
  id: string;
  pillar_id: string;
  title: string;
  subtitle?: string;
  
  // Video
  video_url: string;
  thumbnail_url: string;
  duration_minutes: number;
  chapters: Chapter[];
  
  // Purpose
  primary_purpose: VideoPurpose;
  secondary_purpose?: VideoPurpose;
  
  // Truth Layer
  lineage: {
    people: string[];
    lens?: string;
    framework?: string;
  };
  targeting: {
    pillar: string;
    theme?: string;
    schema?: string;
    also_helps?: string[];
  };
  state_fit: {
    best_when: string;
    not_when: string;
    arousal_constraint?: string;
    contraindications?: string[];
  };
  proof_hooks: {
    pre_post_state: boolean;
    completion_log: boolean;
    reflections: string[];
    transfer_test?: string;
  };
  
  // Practice Injection
  embedded_practice?: {
    id: string;
    title: string;
    trigger_at_timestamp?: number; // If mid-roll, when to pause
  };
  
  // Next Steps
  next_steps: {
    insights: Array<{ id: string; title: string }>;
    practices: Array<{ id: string; title: string }>;
    related_videos: Array<{ id: string; title: string }>;
  };
}

interface WellbeingVideoRendererProps {
  video: WellbeingVideoContent;
  onClose: () => void;
  onComplete: (proof: {
    video_id: string;
    percent_watched: number;
    state_before?: { energy: number; clarity: number; anchorage: number };
    state_after?: { energy: number; clarity: number; anchorage: number };
    did_it_help: boolean;
    reflection?: string;
    practice_completed: boolean;
  }) => void;
  onOpenPractice?: (practiceId: string) => void;
  onOpenInsight?: (insightId: string) => void;
  onOpenVideo?: (videoId: string) => void;
}

export function WellbeingVideoRenderer({ video, onClose, onComplete, onOpenPractice, onOpenInsight, onOpenVideo }: WellbeingVideoRendererProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPreCheck, setShowPreCheck] = useState(true);
  const [showPostCheck, setShowPostCheck] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  
  // State tracking
  const [stateBefore, setStateBefore] = useState<{ energy: number; clarity: number; anchorage: number } | undefined>();
  const [stateAfter, setStateAfter] = useState<{ energy: number; clarity: number; anchorage: number }>({ energy: 5, clarity: 5, anchorage: 5 });
  const [didItHelp, setDidItHelp] = useState<boolean>(false);
  const [reflection, setReflection] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const purposeConfig: Record<VideoPurpose, { label: string; color: string }> = {
    downshift: { label: 'Downshift', color: '#10B981' },
    energize: { label: 'Energize', color: '#F59E0B' },
    clarify: { label: 'Clarify', color: '#3B82F6' },
    connect: { label: 'Connect', color: '#EC4899' },
    meaning: { label: 'Meaning', color: '#9333EA' },
  };

  const currentChapter = video.chapters
    .sort((a, b) => b.timestamp - a.timestamp)
    .find(ch => currentTime >= ch.timestamp);

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowPostCheck(true);
  };

  const seekToChapter = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
    }
  };

  const handleStartVideo = () => {
    setShowPreCheck(false);
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleComplete = () => {
    onComplete({
      video_id: video.id,
      percent_watched: Math.round((currentTime / duration) * 100),
      state_before: stateBefore,
      state_after: stateAfter,
      did_it_help: didItHelp,
      reflection,
      practice_completed: practiceCompleted,
    });
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentWatched = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col">
      {/* Pre-Check Overlay */}
      {showPreCheck && (
        <div className="absolute inset-0 z-10 bg-white flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="px-2.5 py-1 text-xs tracking-wide uppercase text-white"
                  style={{ backgroundColor: purposeConfig[video.primary_purpose].color }}
                >
                  {purposeConfig[video.primary_purpose].label}
                </span>
                <span className="text-sm text-[#3E2BB8]/40">
                  {video.duration_minutes} min protocol
                </span>
              </div>
              <h1 className="text-3xl text-[#3E2BB8] mb-2">{video.title}</h1>
              {video.subtitle && (
                <p className="text-lg text-[#3E2BB8]/60">{video.subtitle}</p>
              )}
            </div>

            {/* Pre-State Check */}
            <div className="mb-8 p-6 bg-[#3E2BB8]/5 border border-[#3E2BB8]/10">
              <h3 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-4">CHECK IN BEFORE WE START</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Energy (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateBefore?.energy || 5}
                    onChange={(e) => setStateBefore({ ...stateBefore, energy: parseInt(e.target.value), clarity: stateBefore?.clarity || 5, anchorage: stateBefore?.anchorage || 5 })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Low</span>
                    <span className="text-[#5739FB]">{stateBefore?.energy || 5}</span>
                    <span>High</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Clarity (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateBefore?.clarity || 5}
                    onChange={(e) => setStateBefore({ ...stateBefore, energy: stateBefore?.energy || 5, clarity: parseInt(e.target.value), anchorage: stateBefore?.anchorage || 5 })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Foggy</span>
                    <span className="text-[#5739FB]">{stateBefore?.clarity || 5}</span>
                    <span>Clear</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Anchorage (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateBefore?.anchorage || 5}
                    onChange={(e) => setStateBefore({ ...stateBefore, energy: stateBefore?.energy || 5, clarity: stateBefore?.clarity || 5, anchorage: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Unmoored</span>
                    <span className="text-[#5739FB]">{stateBefore?.anchorage || 5}</span>
                    <span>Grounded</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartVideo}
              className="w-full px-6 py-4 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors flex items-center justify-center gap-2"
            >
              <Play className="size-5" />
              <span>Start Protocol</span>
            </button>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-[#3E2BB8]/5 transition-colors rounded-full"
              aria-label="Close"
            >
              <X className="size-5 text-[#3E2BB8]/60" />
            </button>
          </div>
        </div>
      )}

      {/* Post-Check Overlay */}
      {showPostCheck && (
        <div className="absolute inset-0 z-10 bg-white flex items-center justify-center p-8 overflow-y-auto">
          <div className="max-w-2xl w-full my-8">
            <h2 className="text-3xl text-[#3E2BB8] mb-8">What changed?</h2>

            {/* Post-State Check */}
            <div className="mb-8 p-6 bg-[#3E2BB8]/5 border border-[#3E2BB8]/10">
              <h3 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-4">CHECK IN AFTER</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Energy (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateAfter.energy}
                    onChange={(e) => setStateAfter({ ...stateAfter, energy: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Low</span>
                    <span className="text-[#5739FB]">{stateAfter.energy}</span>
                    <span>High</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Clarity (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateAfter.clarity}
                    onChange={(e) => setStateAfter({ ...stateAfter, clarity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Foggy</span>
                    <span className="text-[#5739FB]">{stateAfter.clarity}</span>
                    <span>Clear</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#3E2BB8] mb-2">Anchorage (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stateAfter.anchorage}
                    onChange={(e) => setStateAfter({ ...stateAfter, anchorage: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#3E2BB8]/40 mt-1">
                    <span>Unmoored</span>
                    <span className="text-[#5739FB]">{stateAfter.anchorage}</span>
                    <span>Grounded</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Did It Help */}
            <div className="mb-8">
              <h3 className="text-lg text-[#3E2BB8] mb-4">Did this help?</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setDidItHelp(true)}
                  className={`flex-1 px-6 py-3 border ${didItHelp ? 'border-[#5739FB] bg-[#5739FB]/10' : 'border-[#3E2BB8]/20'} transition-colors`}
                >
                  <span className="text-[#3E2BB8]">Yes</span>
                </button>
                <button
                  onClick={() => setDidItHelp(false)}
                  className={`flex-1 px-6 py-3 border ${!didItHelp ? 'border-[#3E2BB8]/20' : 'border-[#3E2BB8]/10'} transition-colors`}
                >
                  <span className="text-[#3E2BB8]">Not yet</span>
                </button>
              </div>
            </div>

            {/* Reflection */}
            <div className="mb-8">
              <h3 className="text-lg text-[#3E2BB8] mb-4">One thing that shifted, even 1%...</h3>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What did you notice?"
                className="w-full px-4 py-3 border border-[#3E2BB8]/20 focus:border-[#5739FB] focus:outline-none resize-none text-[#3E2BB8]"
                rows={3}
              />
            </div>

            {/* Embedded Practice */}
            {video.embedded_practice && (
              <div className="mb-8 p-6 bg-[#5739FB]/5 border border-[#5739FB]/10">
                <h3 className="text-sm tracking-wide uppercase text-[#5739FB] mb-2">PRACTICE THIS TODAY</h3>
                <p className="text-[#3E2BB8] mb-4">{video.embedded_practice.title}</p>
                <button
                  onClick={() => {
                    setPracticeCompleted(true);
                    onOpenPractice?.(video.embedded_practice!.id);
                  }}
                  className="w-full px-4 py-3 border border-[#5739FB] text-[#5739FB] hover:bg-[#5739FB] hover:text-white transition-colors"
                >
                  Open Practice
                </button>
              </div>
            )}

            <button
              onClick={handleComplete}
              className="w-full px-6 py-4 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors"
            >
              Complete & Save to Toolkit
            </button>
          </div>
        </div>
      )}

      {/* Video Player */}
      {!showPreCheck && !showPostCheck && (
        <>
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/50 z-20">
            <div
              className="h-full bg-[#5739FB] transition-all"
              style={{ width: `${percentWatched}%` }}
            />
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            src={video.video_url}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            poster={video.thumbnail_url}
          />

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-20">
            {/* Current Chapter */}
            {currentChapter && (
              <div className="mb-4">
                <span className="px-2 py-1 text-xs uppercase bg-white/20 text-white">
                  {currentChapter.title}
                </span>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                {isPlaying ? (
                  <Pause className="size-6 text-white" />
                ) : (
                  <Play className="size-6 text-white" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                {isMuted ? (
                  <VolumeX className="size-5 text-white" />
                ) : (
                  <Volume2 className="size-5 text-white" />
                )}
              </button>

              <span className="text-sm text-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                <X className="size-5 text-white" />
              </button>
            </div>

            {/* Chapters */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {video.chapters.map((chapter, idx) => (
                <button
                  key={idx}
                  onClick={() => seekToChapter(chapter.timestamp)}
                  className={`px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${
                    currentChapter?.timestamp === chapter.timestamp
                      ? 'bg-white text-black'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

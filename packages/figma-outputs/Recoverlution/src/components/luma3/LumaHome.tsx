/**
 * LUMA_HOME - Foundation LUMA Home Screen
 * 
 * Starting with the beautiful LUMA Home interface that works,
 * we'll incrementally add the new navigation system.
 * 
 * LUMA = Listening, Understanding, Mirroring Antenna
 * 
 * Three zones:
 * 1. Antenna (top) - Warm companion messages
 * 2. Horizon (middle) - 3 content paths
 * 3. Ground (bottom) - Actions and controls
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { Luma3Header } from './Luma3Header';
import { LumaHorizon } from '../luma/LumaHorizon';
import { LumaGround } from '../luma/LumaGround';
import { SoundBiteCapture } from '../thread/SoundBiteCapture';
import { SoundBitesLibrary } from '../thread/SoundBitesLibrary';
import { LumaWisdomResponse, getWisdomResponse } from '../luma/LumaWisdomResponse';
import { LumaTalk } from './LumaTalk';
import { NaviCueEngine, type NaviCue } from '../navicues/NaviCueEngine';
import { LumaNaviCuePlayer } from '../luma/LumaNaviCuePlayer';
import { 
  getInitialSuites, 
  getShuffledSuites, 
  getCuesForSuite,
  suiteToContentPath,
  type NaviCueSuite 
} from '../navicues/NaviCueSuiteData';
import { NaviCueRecommendationCard } from '../luma/NaviCueRecommendationCard';
import { useNaviCueRecommendation } from './hooks/useNaviCueRecommendation';

interface ContentPath {
  id: string;
  contentType: 'navicue' | 'practice' | 'state' | 'journey' | 'reflection';
  contentId: string;
  content: {
    title: string;
    description: string;
    backgroundImage: string;
    pillarName: string;
    pillarColor: string;
    duration?: string;
    instructor?: string;
    concept?: string;
  };
  reason: string; // Why LUMA chose this
  priority: 1 | 2 | 3;
}

interface AntennaMessage {
  text: string;
  type: 'welcome' | 'celebration' | 'reflection' | 'mantra' | 'prompt';
}

interface LumaHomeProps {
  onClose: () => void;
  onNavigateToVoice?: () => void; // Navigate to VOICE screen
  onNavigateToPlay?: () => void; // Navigate to PLAY screen
  onNavigateToTalk?: () => void; // Navigate to TALK screen
  helpMode?: boolean; // When true, show care team connect UI
  onToggleHelpMode?: () => void; // Toggle help mode
}

export function LumaHome({ onClose, onNavigateToVoice, onNavigateToPlay, onNavigateToTalk, helpMode, onToggleHelpMode }: LumaHomeProps) {
  const [mode, setMode] = useState<'navicue' | 'rescue'>('navicue');
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [wisdomResponse, setWisdomResponse] = useState<string | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [showCareTeamModal, setShowCareTeamModal] = useState(false);
  const [careTeamNotificationSent, setCareTeamNotificationSent] = useState(false);
  const [showNaviCue, setShowNaviCue] = useState(false);
  const [naviCueSuite, setNaviCueSuite] = useState<NaviCue[]>([]);
  
  // NEW: Suite management
  const [currentSuites, setCurrentSuites] = useState<NaviCueSuite[]>([]);
  const [completedSuiteIds, setCompletedSuiteIds] = useState<string[]>([]);
  const [paths, setPaths] = useState<ContentPath[]>([]);
  const [playingQueueIndex, setPlayingQueueIndex] = useState<number | null>(null);

  // NEW: NaviCue recommendation from LUMA intelligence
  const naviCueRecommendation = useNaviCueRecommendation({
    userId: 'demo-user', // TODO: Get from auth context
    rehabId: 'demo-rehab', // TODO: Get from auth context
    currentState: undefined // TODO: Get from state tracking
  });

  // Check if recommendation is already in the current paths (avoid duplication)
  const isRecommendationInPaths = naviCueRecommendation.navicue && 
    paths.some(path => path.contentId === naviCueRecommendation.navicue?.id);
  
  const shouldShowRecommendation = naviCueRecommendation.navicue && !isRecommendationInPaths;
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const getAntennaMessage = () => {
    const hour = new Date().getHours();
    
    if (hour < 6) {
      return {
        text: "You are up early. Or maybe you have not been able to sleep. Either way, I am here.",
        type: 'prompt' as const
      };
    } else if (hour < 12) {
      return {
        text: "How are you starting your day? Not how you think you should be. How you actually are.",
        type: 'prompt' as const
      };
    } else if (hour < 17) {
      return {
        text: "You are here in the middle of your day. That takes awareness.",
        type: 'prompt' as const
      };
    } else {
      return {
        text: "End of the day energy. How are you holding up?",
        type: 'prompt' as const
      };
    }
  };

  const [antennaMessage] = useState<AntennaMessage>(getAntennaMessage());

  // Care team data - sync with Navigate
  const careTeamMembers = [
    { name: 'Dr. Sarah Chen', role: 'Primary Therapist', available: true },
    { name: 'Michael Torres', role: 'Recovery Coach', available: true },
    { name: 'Dr. Jessica Martinez', role: 'Psychiatrist', available: false },
    { name: 'Emma Richardson', role: 'Wellness Advisor', available: true },
  ];

  // Initialize with 3 suites on mount
  useEffect(() => {
    const initialSuites = getInitialSuites();
    setCurrentSuites(initialSuites);
    setPaths(initialSuites.map((suite, index) => suiteToContentPath(suite, index)));
  }, []);

  // Wait for paths to load - NOW AFTER ALL HOOKS
  if (paths.length === 0) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
        <div className="text-white">Loading LUMA...</div>
      </div>
    );
  }

  // Current path for easy access
  const currentPath = paths[currentPathIndex];

  const handleVoiceRecord = () => {
    // Navigate to VOICE screen instead of opening overlay
    if (onNavigateToVoice) {
      onNavigateToVoice();
    }
  };

  const handleVoiceComplete = (soundBite: {
    audio_url: string;
    transcript: string;
    context: string;
    duration: number;
    action?: string;
  }) => {
    // Check if user clicked "View All" instead of recording
    if (soundBite.action === 'view_library') {
      setIsRecording(false);
      setShowLibrary(true);
      return;
    }
    
    setIsRecording(false);
    
    console.log('Sound Bite saved:', soundBite);
    
    // In Phase 2, save to backend/Thread
    // For now, show wisdom response based on context
    const response = getWisdomResponse('neutral');
    setWisdomResponse(response);
    
    // In Phase 4, analyze transcript and refine paths
  };

  const handleVoiceCancel = () => {
    setIsRecording(false);
  };

  const handleSelectPath = (path: ContentPath) => {
    const index = paths.indexOf(path);
    if (index !== -1) {
      setCurrentPathIndex(index);
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPathIndex > 0) {
      setCurrentPathIndex(currentPathIndex - 1);
    } else if (direction === 'next' && currentPathIndex < paths.length - 1) {
      setCurrentPathIndex(currentPathIndex + 1);
    }
  };

  const handleBeginPath = () => {
    console.log('🎬 BEGIN CLICKED - Launching Infinite NaviCue Player');
    
    // Launch infinite player (no suites, no limits)
    setShowNaviCue(true);
  };

  const handleNaviCueComplete = () => {
    setShowNaviCue(false);
    
    const completedSuite = currentSuites[playingQueueIndex!];
    console.log('✅ Completed suite:', completedSuite.id);
    
    // Add to completed list
    setCompletedSuiteIds([...completedSuiteIds, completedSuite.id]);
    
    // Show completion message
    const response = getWisdomResponse('celebration');
    setWisdomResponse(response);
    
    // AUTO-PLAY NEXT: If there's a next suite in the queue, play it after 2 seconds
    if (playingQueueIndex !== null && playingQueueIndex < currentSuites.length - 1) {
      const nextIndex = playingQueueIndex + 1;
      console.log('🎬 Auto-playing next suite in queue:', currentSuites[nextIndex].title);
      
      setTimeout(() => {
        setCurrentPathIndex(nextIndex);
        const nextCues = getCuesForSuite(currentSuites[nextIndex].id);
        setNaviCueSuite(nextCues);
        setPlayingQueueIndex(nextIndex);
        setShowNaviCue(true);
        setWisdomResponse(null); // Clear wisdom message
      }, 2000);
    } else {
      setPlayingQueueIndex(null);
    }
  };

  const handleNaviCueExit = () => {
    setShowNaviCue(false);
    setPlayingQueueIndex(null); // Cancel auto-play queue
  };

  const handleShuffle = () => {
    console.log('🔀 Shuffling to 3 new suites...');
    
    // Get current suite IDs
    const currentIds = currentSuites.map(s => s.id);
    
    // Get 3 new suites (excluding current and completed)
    const newSuites = getShuffledSuites(currentIds, completedSuiteIds);
    
    // Update state
    setCurrentSuites(newSuites);
    setPaths(newSuites.map((suite, index) => suiteToContentPath(suite, index)));
    setCurrentPathIndex(0); // Reset to first
    
    console.log('New suites:', newSuites.map(s => s.title));
  };

  const handleRescue = () => {
    setMode('rescue');
    console.log('Switching to Rescue mode');
    // Will fetch rescue-specific content
  };

  const handleOpenDialogue = () => {
    console.log('🎯 Opening dialogue - state before:', showDialogue);
    setShowDialogue(true);
    console.log('🎯 Opening dialogue - state set to true');
  };

  const handleCloseDialogue = () => {
    setShowDialogue(false);
  };

  const handleAnchorPointCreated = (anchorPoint: any) => {
    console.log('Anchor Point created:', anchorPoint);
    // In Phase 2, this will save to backend and appear in Thread
  };

  const handleModeChange = (newMode: 'navicue' | 'rescue') => {
    setMode(newMode);
    console.log('Mode changed to:', newMode);
    // Will fetch mode-specific content
  };

  const handleLoadNextLevel = () => {
    console.log('Loading level:', currentPathIndex + 1);
    // Will fetch next 3 paths from backend
  };

  return (
    <>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-[9999] flex flex-col bg-black"
      >
        {/* Background image layer */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentPath.content.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Content layer */}
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {/* ZONE 1: ANTENNA - Top companion banner */}
          <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-8">
            <Luma3Header 
              title={helpMode ? "CARE" : "LUMA"}
              message={antennaMessage}
              showVoiceByDefault={true}
              showHomeByDefault={true}
              helpMode={helpMode}
              careTeamMembers={careTeamMembers}
              onConnectCareTeam={() => {
                // Send notification to all care team members
                console.log('📢 CONNECT pressed - sending to all care team...');
                setCareTeamNotificationSent(true);
                // In Phase 2, trigger backend notification system
              }}
              onManageCareTeam={() => setShowCareTeamModal(true)}
              onHelp={onToggleHelpMode}
              onPlay={onNavigateToPlay}
              onClose={onClose}
            />
          </div>

          {/* ZONE 2: HORIZON - Content display (carousel for swiping) */}
          <div className="flex-1 overflow-hidden">
            <LumaHorizon
              paths={paths}
              selectedPath={currentPath}
              onSelectPath={handleSelectPath}
              onLoadNextLevel={handleLoadNextLevel}
              mode={mode}
            />
          </div>

          {/* ZONE 3: GROUND - Actions */}
          <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pb-6 relative z-20">
            <LumaGround
              selectedPath={currentPath}
              onBegin={handleBeginPath}
              onVent={handleVoiceRecord}
              onShuffle={handleShuffle}
              onRescue={handleOpenDialogue}
              mode={mode}
              currentIndex={currentPathIndex}
              totalPaths={paths.length}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </motion.div>

      {/* Voice recorder overlay */}
      <AnimatePresence>
        {isRecording && (
          <SoundBiteCapture
            onComplete={handleVoiceComplete}
            onClose={handleVoiceCancel}
            backgroundUrl={currentPath.content.backgroundImage}
          />
        )}
      </AnimatePresence>

      {/* Wisdom response overlay */}
      {wisdomResponse && (
        <LumaWisdomResponse
          message={wisdomResponse}
          onComplete={() => setWisdomResponse(null)}
        />
      )}

      {/* Anchor Point Dialogue overlay */}
      <AnimatePresence mode="wait">
        {showDialogue && (
          <motion.div
            key="dialogue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LumaTalk
              onClose={handleCloseDialogue}
              backgroundUrl={currentPath.content.backgroundImage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound Bites Library overlay */}
      <AnimatePresence>
        {showLibrary && (
          <SoundBitesLibrary
            onClose={() => setShowLibrary(false)}
            backgroundUrl={currentPath.content.backgroundImage}
          />
        )}
      </AnimatePresence>

      {/* Care Team Modal */}
      <AnimatePresence>
        {showCareTeamModal && (
          <CareTeamManager
            onClose={() => setShowCareTeamModal(false)}
            onSendNotification={() => {
              // Send notification to all care team members
              console.log('📢 Sending notification to entire care team...');
              // In Phase 2, this will trigger backend notification system
              setShowCareTeamModal(false);
              setCareTeamNotificationSent(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* NaviCue Infinite Player */}
      <AnimatePresence>
        {showNaviCue && (
          <LumaNaviCuePlayer
            onClose={handleNaviCueExit}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Care Team Manager Component
interface CareTeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  available: boolean;
  nextAvailable?: string;
}

interface CareTeamManagerProps {
  onClose: () => void;
  onSendNotification: () => void;
}

function CareTeamManager({ onClose, onSendNotification }: CareTeamManagerProps) {
  // This data should come from Navigate's care team data
  const [careTeam, setCareTeam] = useState<CareTeamMember[]>([
    { 
      id: '1', 
      name: 'Dr. Sarah Chen', 
      role: 'Primary Therapist', 
      email: 'sarah.chen@example.com',
      phone: '(555) 123-4567',
      available: true 
    },
    { 
      id: '2', 
      name: 'Michael Torres', 
      role: 'Recovery Coach', 
      email: 'michael.torres@example.com',
      phone: '(555) 234-5678',
      available: true 
    },
    { 
      id: '3', 
      name: 'Dr. Jessica Martinez', 
      role: 'Psychiatrist', 
      email: 'jessica.martinez@example.com',
      available: false,
      nextAvailable: 'Next Tuesday'
    },
    { 
      id: '4', 
      name: 'Emma Richardson', 
      role: 'Wellness Advisor', 
      email: 'emma.richardson@example.com',
      phone: '(555) 456-7890',
      available: true 
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<CareTeamMember | null>(null);

  const handleRemoveMember = (id: string) => {
    setCareTeam(careTeam.filter(m => m.id !== id));
  };

  const handleEditMember = (member: CareTeamMember) => {
    setEditingMember(member);
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{
        background: 'rgba(62, 43, 184, 0.15)',
        backdropFilter: 'blur(40px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="luma-glass-dark relative max-w-2xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-white text-xl mb-3">Your Care Team</h2>
            <p className="text-sm text-white/60">
              These are the people who will be notified when you press CONNECT.
            </p>
          </div>

          {/* Care team list */}
          <div className="space-y-3 mb-6">
            {careTeam.map((member) => (
              <div
                key={member.id}
                className="luma-glass-medium p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-white mb-1">{member.name}</div>
                    <div className="text-sm text-white/50 mb-2">{member.role}</div>
                    {member.email && (
                      <div className="text-xs text-white/40 mb-1">{member.email}</div>
                    )}
                    {member.phone && (
                      <div className="text-xs text-white/40">{member.phone}</div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-none)',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-xs text-white/40 hover:text-red-400 transition-colors px-3 py-1.5"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-none)',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add member button */}
          <button
            onClick={() => {
              setEditingMember({
                id: Date.now().toString(),
                name: '',
                role: '',
                email: '',
                phone: '',
                available: true,
              });
              setIsEditing(true);
            }}
            className="luma-glass-medium w-full text-center text-sm text-white/60 hover:text-white transition-colors py-3"
          >
            Add Someone
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
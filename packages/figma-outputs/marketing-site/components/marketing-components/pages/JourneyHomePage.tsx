/**
 * Journey Home Page - ACTIVE ROUTE
 * Entry point for Journey experience
 * 
 * Flow:
 * 1. Journey List - Shows available journeys
 * 2. Journey Welcome - Intro to ERA Sprint (focus, lens, structure)
 * 3. Journey Week View - 7-day ERA experience
 * 
 * Apple-grade simplicity with universal page header
 */

import { useState, useEffect } from 'react';
import { JourneyListPage } from './JourneyListPage';
import { JourneyWelcomePage } from './JourneyWelcomePage';
import { JourneyWeekView } from '../JourneyWeekView';
import { Block } from '../../utils/supabase/api';

interface JourneyHomePageProps {
  patientId?: string;
  onNavigate?: (page: string) => void;
}

type JourneyView = 'list' | 'welcome' | 'week';

export function JourneyHomePage({ patientId, onNavigate }: JourneyHomePageProps) {
  const [currentView, setCurrentView] = useState<JourneyView>('list');
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);

  // Check if user has seen welcome for this journey
  useEffect(() => {
    if (selectedJourneyId === 'era-sprint') {
      const hasSeenWelcome = localStorage.getItem('journey_welcome_seen_era-sprint');
      if (hasSeenWelcome) {
        // Skip welcome if they've seen it before
        loadJourneyBlock();
        setCurrentView('week');
      }
    }
  }, [selectedJourneyId]);

  const loadJourneyBlock = () => {
    // Demo data for ERA Sprint - Buy 2 Seconds block
    const demoBlock: Block = {
      id: 'P-01.C-01.T-01.B-001',
      name: 'Buy 2 Seconds',
      theme_id: 'P-01.C-01.T-01',
      day_type: ['Regulate', 'Act'],
      era: {
        experience: {
          mon_seed: 'Notice the gap between trigger and response. Today, just catch yourself once. When something pushes your buttons, pause before reacting. Feel the space. That space is your power.',
          tue_reflect: 'Yesterday you noticed the gap. Today, reflect on what happened when you paused. What did you feel in your body? What thoughts came up? Did the urge fade, or did it demand more?',
        },
        recognize: {
          wed_cue: 'Spot the moment before the urge takes over. This is your warning system. Your body signals the trigger before your mind catches up. Learn to read these signals: tight chest, clenched jaw, racing heart.',
          thu_deepen: 'Where in your body do you feel the impulse? Is it your throat? Your gut? Your hands? Get specific. The more precise you are, the faster you can catch it next time.',
        },
        align: {
          fri_choice: 'Choose your next move, not your old pattern. You have options now. Name three things you could do instead of the automatic response. Pick the hardest one. Do it.',
          sat_introspect: 'What does freedom from urgency feel like? Sit with this question. Not freedom from feeling, but freedom from being controlled by the feeling. Notice the difference.',
        },
        sun_mirror: {
          identity_line: 'I am someone who can pause before acting. Say it out loud. Write it down. This is who you are becoming.',
        },
      },
      measures: {
        primary: ['Impulse control', 'Self-awareness'],
        secondary: ['Emotional regulation', 'Stress response'],
      },
      context_tags: ['Conversations', 'High stress', 'Cravings'],
      skill_tags: ['Pause', 'Regulate', 'Reframe'],
    };
    
    setCurrentBlock(demoBlock);
  };

  const handleSelectJourney = (journeyId: string) => {
    setSelectedJourneyId(journeyId);
    
    // Check if they've seen the welcome
    const hasSeenWelcome = localStorage.getItem(`journey_welcome_seen_${journeyId}`);
    
    if (hasSeenWelcome) {
      // Skip to week view
      loadJourneyBlock();
      setCurrentView('week');
    } else {
      // Show welcome first
      setCurrentView('welcome');
    }
  };

  const handleContinueFromWelcome = () => {
    // Mark welcome as seen
    if (selectedJourneyId) {
      localStorage.setItem(`journey_welcome_seen_${selectedJourneyId}`, 'true');
    }
    
    // Load the block and show week view
    loadJourneyBlock();
    setCurrentView('week');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedJourneyId(null);
    setCurrentBlock(null);
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
  };

  const handleWeekComplete = (blockId: string) => {
    // Mark block as complete
    const completedBlocks = JSON.parse(
      localStorage.getItem(`completed_blocks_${patientId || 'demo'}`) || '[]'
    );
    completedBlocks.push(blockId);
    localStorage.setItem(
      `completed_blocks_${patientId || 'demo'}`,
      JSON.stringify(completedBlocks)
    );
    
    // Go back to list
    handleBackToList();
  };

  // Render based on current view
  if (currentView === 'list') {
    return <JourneyListPage onSelectJourney={handleSelectJourney} />;
  }

  if (currentView === 'welcome' && selectedJourneyId) {
    return (
      <JourneyWelcomePage
        journeyId={selectedJourneyId}
        onContinue={handleContinueFromWelcome}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'week' && currentBlock) {
    return (
      <JourneyWeekView
        block={currentBlock}
        onBack={handleBackToList}
        onWeekComplete={handleWeekComplete}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#3E2BB8]/20 border-t-[#3E2BB8] rounded-full animate-spin mx-auto mb-4" />
        <div className="text-gray-600">Loading...</div>
      </div>
    </div>
  );
}

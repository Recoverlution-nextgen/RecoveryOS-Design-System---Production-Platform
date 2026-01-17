/**
 * LUMA TALK - AI conversation experience
 * 
 * Pattern: Same structure as PLAY
 * - Luma3Header with "TALK" title, close button only
 * - Navigation: CHAT | TUNE | HISTORY
 * - Content area with conversation interface
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Settings, Clock } from 'lucide-react';
import { Luma3Header } from './Luma3Header';
import { DialogueInterface } from '../dialogue/DialogueInterface';

interface LumaTalkProps {
  onClose: () => void;
  backgroundUrl?: string;
}

const DEFAULT_BACKGROUND = 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Precision%20practices.avif';

type ActiveView = 'chat' | 'tune' | 'history';

export function LumaTalk({ onClose, backgroundUrl }: LumaTalkProps) {
  const [activeView, setActiveView] = useState<ActiveView>('chat');

  // Navigation items
  const navigationItems = [
    { id: 'chat' as const, icon: MessageCircle, label: 'Chat' },
    { id: 'tune' as const, icon: Settings, label: 'Tune' },
    { id: 'history' as const, icon: Clock, label: 'History' },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[10001] flex flex-col bg-black luma-overlay-talk"
      style={{
        backgroundImage: `url(${backgroundUrl || DEFAULT_BACKGROUND})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <Luma3Header 
          title="TALK"
          showPlayByDefault={false}
          showVoiceByDefault={false}
          onClose={onClose}
        />

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-12 h-12 flex items-center justify-center luma-glass transition-all ${
                  activeView === item.id 
                    ? 'bg-[#5739FB]/30 text-white shadow-lg' 
                    : 'text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative z-10">
        {/* CHAT - Full dialogue interface */}
        {activeView === 'chat' && (
          <DialogueInterface 
            onClose={onClose}
            backgroundUrl={backgroundUrl}
            embedded={true}
          />
        )}

        {/* TUNE - Settings/Organizer */}
        {activeView === 'tune' && (
          <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="luma-glass p-6">
                <div className="text-white text-lg mb-4">Conversation Tuning</div>
                <div className="text-white/50 text-sm mb-6">
                  Adjust how LUMA responds to you
                </div>

                {/* Where You Are */}
                <div className="mb-6">
                  <div className="text-white/70 text-xs mb-3 uppercase tracking-wider">Where You Are</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Here', 'Holding', 'Slipping', 'Lost'].map((option) => (
                      <button
                        key={option}
                        className="luma-glass p-3 text-left text-white/90 text-sm hover:bg-white/10 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What You Need */}
                <div className="mb-6">
                  <div className="text-white/70 text-xs mb-3 uppercase tracking-wider">What You Need</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Clarity', 'Space', 'Direction', 'Relief'].map((option) => (
                      <button
                        key={option}
                        className="luma-glass p-3 text-left text-white/90 text-sm hover:bg-white/10 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* How To Talk */}
                <div>
                  <div className="text-white/70 text-xs mb-3 uppercase tracking-wider">How To Talk</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Straight', 'Soft', 'Wandering', 'Reflective'].map((option) => (
                      <button
                        key={option}
                        className="luma-glass p-3 text-left text-white/90 text-sm hover:bg-white/10 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeView === 'history' && (
          <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
            <div className="max-w-4xl mx-auto">
              <div className="luma-glass p-12 text-center">
                <div className="text-white/50 text-lg mb-2">
                  Conversation History
                </div>
                <div className="text-white/30 text-sm">
                  Your past conversations will appear here
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
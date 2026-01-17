/**
 * LUMA3 HEADER - Universal Top Navigation
 * 
 * LEFT: Screen title (LUMA, VOICE, MESSAGE, etc.)
 * RIGHT: Fixed 4 icon navigation (HOME | PLAY | HELP | CLOSE)
 * BOTTOM: Optional voice message layer
 */

import { motion, AnimatePresence } from "motion/react";
import { Home, Play, Heart, X, ChevronDown, ChevronUp } from "lucide-react";
import { Luma3VoiceDropdown } from "./Luma3VoiceDropdown";
import { useState } from "react";

interface AntennaMessage {
  text: string;
  type: 'welcome' | 'celebration' | 'reflection' | 'mantra' | 'prompt';
}

interface Luma3HeaderProps {
  // Screen title
  title?: string; // Defaults to "LUMA"
  
  // Optional voice message
  message?: AntennaMessage;
  showVoiceByDefault?: boolean;
  showHomeByDefault?: boolean; // Highlight HOME button
  showPlayByDefault?: boolean; // Highlight PLAY button
  
  // Help mode - show care team connect UI
  helpMode?: boolean;
  onConnectCareTeam?: () => void;
  onManageCareTeam?: () => void; // Open full management modal
  careTeamMembers?: Array<{ name: string; role: string; available: boolean }>;
  
  // Optional callbacks
  onHome?: () => void; // Navigate back to LUMA home
  onPlay?: () => void;
  onHelp?: () => void;
  onClose?: () => void; // Exit LUMA
}

export function Luma3Header({
  title = "LUMA",
  message,
  showVoiceByDefault = true,
  showHomeByDefault = false,
  showPlayByDefault = false,
  helpMode = false,
  onConnectCareTeam,
  onManageCareTeam,
  careTeamMembers,
  onHome,
  onPlay,
  onHelp,
  onClose,
}: Luma3HeaderProps) {
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="luma-glass-dark"
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Row: LUMA + R Menu */}
      <div className="flex items-center justify-between px-6 py-5">
        
        {/* LEFT: LUMA branding */}
        <div className="flex items-center">
          <div className="text-white tracking-[0.2em] text-lg opacity-90">{title}</div>
        </div>
        
        {/* RIGHT: Fixed 4 icon menu - HOME | PLAY | HELP | CLOSE */}
        <div className="flex items-center gap-2">
          <button
            onClick={onHome}
            className={`luma-icon-button-sm ${showHomeByDefault ? 'luma-icon-button-sm-highlight' : ''}`}
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          
          <button
            onClick={onPlay}
            className={`luma-icon-button-sm ${showPlayByDefault ? 'luma-icon-button-sm-highlight' : ''}`}
            aria-label="Play"
          >
            <Play className="w-4 h-4" />
          </button>
          
          <button
            onClick={onHelp}
            className="luma-icon-button-sm"
            aria-label="Care"
          >
            <Heart className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="luma-icon-button-sm"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice message (optional, elevated presence) */}
      {message && showVoiceByDefault && !helpMode && (
        <div className="luma-voice-message">
          <p className="luma-voice-text">
            {message.text}
          </p>
        </div>
      )}

      {/* Help mode - Care team connect */}
      {helpMode && (
        <div className="luma-voice-message">
          <p className="luma-voice-text mb-4">
            Let us reach the people who care for you.
          </p>
          
          {onConnectCareTeam && (
            <button
              onClick={onConnectCareTeam}
              className="luma-button w-full flex items-center justify-center gap-2 mb-4"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%)',
              }}
            >
              CONNECT
            </button>
          )}
          
          {/* Expandable care team snapshot */}
          <div className="w-full">
            <button
              onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
              className="w-full flex items-center justify-between text-white/60 hover:text-white transition-colors py-2 px-4"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-none)',
              }}
            >
              <span className="text-sm">
                {careTeamMembers ? `${careTeamMembers.length} care team members` : 'View care team'}
              </span>
              {voiceDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {/* Expanded snapshot */}
            <AnimatePresence>
              {voiceDropdownOpen && careTeamMembers && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    {careTeamMembers.slice(0, 4).map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm px-4 py-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 'var(--radius-none)',
                        }}
                      >
                        <div>
                          <div className="text-white">{member.name}</div>
                          <div className="text-white/50 text-xs">{member.role}</div>
                        </div>
                        <div className={member.available ? 'text-green-400 text-xs' : 'text-white/30 text-xs'}>
                          {member.available ? '●' : '○'}
                        </div>
                      </div>
                    ))}
                    
                    {onManageCareTeam && (
                      <button
                        onClick={onManageCareTeam}
                        className="w-full text-center text-sm text-white/60 hover:text-white transition-colors py-2"
                      >
                        Manage Care Team →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
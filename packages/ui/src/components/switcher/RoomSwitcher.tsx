import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RoomSwitcher.css';

export type RoomId = 'journeys' | 'navicues' | 'toolkit' | 'wellbeing' | 'state';
export type Tempo = 'moment' | 'week';
export type Depth = 'glance' | 'seed' | 'thread' | 'journey';
export type Lens = 'individual' | 'professional' | 'organisation';

interface Room {
  id: RoomId;
  label: {
    individual: string;
    professional: string;
    organisation: string;
  };
  description: {
    individual: string;
    professional: string;
    organisation: string;
  };
  available: boolean;
  comingSoon?: boolean;
}

export interface RoomSwitcherProps {
  currentRoom?: RoomId;
  tempo?: Tempo;
  depth?: Depth;
  lens?: Lens;
  onRoomSelect?: (roomId: RoomId) => void;
  onTempoChange?: (tempo: Tempo) => void;
  onDepthChange?: (depth: Depth) => void;
  className?: string;
}

const ROOMS: Room[] = [
  {
    id: 'journeys',
    label: {
      individual: 'My Journeys',
      professional: 'Client Journeys',
      organisation: 'User Journeys',
    },
    description: {
      individual: "Weekly baselines you're building",
      professional: "Journeys you're supervising",
      organisation: 'Journeys across your service',
    },
    available: true,
  },
  {
    id: 'navicues',
    label: {
      individual: 'NaviCues',
      professional: 'NaviCues Library',
      organisation: 'NaviCues Catalog',
    },
    description: {
      individual: 'Quick moves when you need them',
      professional: 'Micro-interventions you can assign',
      organisation: 'Available mini-apps for deployment',
    },
    available: true,
  },
  {
    id: 'toolkit',
    label: {
      individual: 'My Toolkit',
      professional: 'Clinical Toolkit',
      organisation: 'Service Toolkit',
    },
    description: {
      individual: 'Your saved moves and patterns',
      professional: 'Your curated intervention library',
      organisation: 'Approved tools and protocols',
    },
    available: false,
    comingSoon: true,
  },
  {
    id: 'wellbeing',
    label: {
      individual: 'Wellbeing',
      professional: 'Wellbeing Metrics',
      organisation: 'Wellbeing Analytics',
    },
    description: {
      individual: "How you're tracking over time",
      professional: 'Client outcome patterns',
      organisation: 'Service-wide wellbeing data',
    },
    available: false,
    comingSoon: true,
  },
  {
    id: 'state',
    label: {
      individual: 'My State',
      professional: 'Practice State',
      organisation: 'System State',
    },
    description: {
      individual: 'Right now, from the data',
      professional: 'Your practice at a glance',
      organisation: 'System health overview',
    },
    available: false,
    comingSoon: true,
  },
];

const TEMPO_OPTIONS: { value: Tempo; label: string; description: string }[] = [
  { value: 'moment', label: 'Moment', description: 'Right now' },
  { value: 'week', label: 'Week', description: 'Building baseline' },
];

const DEPTH_OPTIONS: { value: Depth; label: string; icon: string }[] = [
  { value: 'glance', label: 'Glance', icon: '○' },
  { value: 'seed', label: 'Seed', icon: '◐' },
  { value: 'thread', label: 'Thread', icon: '◕' },
  { value: 'journey', label: 'Journey', icon: '●' },
];

export const RoomSwitcher: React.FC<RoomSwitcherProps> = ({
  currentRoom = 'journeys',
  tempo = 'moment',
  depth = 'glance',
  lens = 'individual',
  onRoomSelect,
  onTempoChange,
  onDepthChange,
  className = '',
}) => {
  const [hoveredRoom, setHoveredRoom] = useState<RoomId | null>(null);
  const [showDepthMenu, setShowDepthMenu] = useState(false);

  const handleRoomClick = (roomId: RoomId, available: boolean) => {
    if (available && onRoomSelect) {
      onRoomSelect(roomId);
    }
  };

  const handleTempoToggle = () => {
    if (onTempoChange) {
      onTempoChange(tempo === 'moment' ? 'week' : 'moment');
    }
  };

  const handleDepthSelect = (newDepth: Depth) => {
    if (onDepthChange) {
      onDepthChange(newDepth);
    }
    setShowDepthMenu(false);
  };

  return (
    <div className={`room-switcher ${className}`}>
      <div className="room-switcher__header">
        <h2 className="room-switcher__title">Navigate</h2>
        <div className="room-switcher__controls">
          {/* Tempo Selector */}
          <div className="room-switcher__tempo">
            <button
              className={`tempo-button ${tempo === 'moment' ? 'active' : ''}`}
              onClick={handleTempoToggle}
              aria-label="Toggle tempo"
            >
              <span className="tempo-button__icon">
                {tempo === 'moment' ? '⚡' : '📅'}
              </span>
              <span className="tempo-button__label">
                {TEMPO_OPTIONS.find(t => t.value === tempo)?.label}
              </span>
            </button>
          </div>

          {/* Depth Dial */}
          <div className="room-switcher__depth">
            <button
              className="depth-button"
              onClick={() => setShowDepthMenu(!showDepthMenu)}
              aria-label="Select depth"
            >
              <span className="depth-button__icon">
                {DEPTH_OPTIONS.find(d => d.value === depth)?.icon}
              </span>
              <span className="depth-button__label">
                {DEPTH_OPTIONS.find(d => d.value === depth)?.label}
              </span>
            </button>

            <AnimatePresence>
              {showDepthMenu && (
                <motion.div
                  className="depth-menu"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {DEPTH_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      className={`depth-menu__item ${depth === option.value ? 'active' : ''}`}
                      onClick={() => handleDepthSelect(option.value)}
                    >
                      <span className="depth-menu__icon">{option.icon}</span>
                      <span className="depth-menu__label">{option.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="room-switcher__grid">
        {ROOMS.map(room => {
          const isActive = currentRoom === room.id;
          const isHovered = hoveredRoom === room.id;

          return (
            <motion.button
              key={room.id}
              className={`room-card ${isActive ? 'active' : ''} ${
                !room.available ? 'disabled' : ''
              }`}
              onClick={() => handleRoomClick(room.id, room.available)}
              onHoverStart={() => setHoveredRoom(room.id)}
              onHoverEnd={() => setHoveredRoom(null)}
              whileHover={room.available ? { scale: 1.02 } : {}}
              whileTap={room.available ? { scale: 0.98 } : {}}
              disabled={!room.available}
            >
              <div className="room-card__header">
                <h3 className="room-card__label">{room.label[lens]}</h3>
                {room.comingSoon && (
                  <span className="room-card__badge">Coming Soon</span>
                )}
              </div>

              <p className="room-card__description">
                {room.description[lens]}
              </p>

              {isActive && (
                <motion.div
                  className="room-card__indicator"
                  layoutId="activeRoomIndicator"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              )}

              <AnimatePresence>
                {isHovered && room.available && !isActive && (
                  <motion.div
                    className="room-card__hover-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Context Footer */}
      <div className="room-switcher__footer">
        <div className="room-switcher__context">
          <span className="context-label">Current Context:</span>
          <span className="context-value">
            {ROOMS.find(r => r.id === currentRoom)?.label[lens]} · {tempo === 'moment' ? 'Right now' : 'Weekly baseline'} · {depth}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * GAMES: CHESS
 * 
 * Chess principles as decision-making and life strategy frameworks
 * Tactics, strategy, endgame thinking
 */

import { NaviCue } from '../../NaviCueEngine';

// ============================================================================
// OPENING PRINCIPLES
// ============================================================================

export const ControlTheCenter: NaviCue = {
  id: 'CHESS-001',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Control the center of the board. From the center, you can attack anywhere. In life, control your core values. From there, you can handle anything.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Strategic Positioning',
  response_type: 'body_map',
  response_options: {
    body_regions: ['head', 'heart', 'gut', 'spine'],
  },
  kbe_target: 'knowing',
};

export const DevelopPiecesNotPawns: NaviCue = {
  id: 'CHESS-002',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Develop your pieces, not just your pawns. In life, develop your strengths, not just your surface skills.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Asset Development',
  response_type: 'sort',
  response_options: {
    sort_items: ['Deep skills', 'Surface tactics', 'Core strengths', 'Quick wins'],
  },
  kbe_target: 'believing',
};

export const CastleEarly: NaviCue = {
  id: 'CHESS-003',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Castle early to protect your king. In life, secure your foundation before you attack. Safety first, then offense.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Foundation Before Growth',
  response_type: 'binary',
  response_options: {
    binary_left: 'Attack now',
    binary_right: 'Secure first',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// TACTICAL PATTERNS
// ============================================================================

export const TheFork: NaviCue = {
  id: 'CHESS-004',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The fork: attack two pieces at once. Your opponent can only save one. In life, create situations where you win either way.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Win-Win Positioning',
  response_type: 'tap',
  response_options: {
    tap_options: ['One path only', 'Create options', 'Hedge bets'],
  },
  kbe_target: 'knowing',
};

export const ThePin: NaviCue = {
  id: 'CHESS-005',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The pin: a piece cannot move because it exposes something more valuable. In life, you stay stuck because leaving exposes something you protect.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Paralysis by Protection',
  response_type: 'voice10',
  kbe_target: 'believing',
};

export const TheSkewer: NaviCue = {
  id: 'CHESS-006',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The skewer: attack the valuable piece first, capture the second after it moves. In life, force the first move, then capitalize.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Sequential Strategy',
  response_type: 'timeline',
  kbe_target: 'embodying',
};

// ============================================================================
// STRATEGIC THINKING
// ============================================================================

export const PawnStructure: NaviCue = {
  id: 'CHESS-007',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Pawn structure determines the position. In life, your habits are your pawn structure. They define what is possible.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Habit Architecture',
  response_type: 'constellation',
  kbe_target: 'knowing',
};

export const WeakSquares: NaviCue = {
  id: 'CHESS-008',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Every position has weak squares. Find them. Occupy them. In life, find your leverage points. Small moves, big impact.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Leverage Points',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much do you look for leverage?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const SpaceAdvantage: NaviCue = {
  id: 'CHESS-009',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Space advantage means more options. In life, create space. Physical, mental, emotional. Options require room.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Creating Space',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Cramped',
    spectrum_right: 'Spacious',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// SACRIFICE & EXCHANGE
// ============================================================================

export const PositionalSacrifice: NaviCue = {
  id: 'CHESS-010',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Sacrifice material for position. In life, give up short term comfort for long term leverage. Not all trades are equal.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Strategic Sacrifice',
  response_type: 'binary',
  response_options: {
    binary_left: 'Keep now',
    binary_right: 'Trade for later',
  },
  kbe_target: 'knowing',
};

export const FavorableExchanges: NaviCue = {
  id: 'CHESS-011',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Not all exchanges are favorable. Trading a knight for a pawn is bad. In life, know the value of what you trade.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Value Assessment',
  response_type: 'comparison',
  kbe_target: 'believing',
};

export const QueenSacrifice: NaviCue = {
  id: 'CHESS-012',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The queen is the most powerful piece. Sometimes you sacrifice it to win. In life, sometimes you sacrifice the best thing for the right thing.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Ultimate Sacrifice',
  response_type: 'paradox',
  kbe_target: 'embodying',
};

// ============================================================================
// ENDGAME PRINCIPLES
// ============================================================================

export const KingBecomesWarrior: NaviCue = {
  id: 'CHESS-013',
  family: 'wisdom',
  modality: 'text',
  text_line: 'In the endgame, the king becomes a warrior. In life, in the final stages, what you protected becomes what you use.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Role Transformation',
  response_type: 'binary',
  response_options: {
    binary_left: 'Still hiding',
    binary_right: 'Ready to fight',
  },
  kbe_target: 'knowing',
};

export const EveryMoveMatters: NaviCue = {
  id: 'CHESS-014',
  family: 'wisdom',
  modality: 'text',
  text_line: 'In the endgame, every move matters. One tempo decides the game. In life, when resources are low, precision is everything.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Precision Under Pressure',
  response_type: 'slider',
  response_options: {
    slider_label: 'How precise are you when it matters?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const OppositionPrinciple: NaviCue = {
  id: 'CHESS-015',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Opposition: kings face each other, one square apart. Who moves first loses. In life, sometimes standing still is the winning move.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Strategic Stillness',
  response_type: 'tap',
  response_options: {
    tap_options: ['Move now', 'Wait them out', 'Force their move'],
  },
  kbe_target: 'embodying',
};

// ============================================================================
// TIME & TEMPO
// ============================================================================

export const TimeIsAResource: NaviCue = {
  id: 'CHESS-016',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Time is a resource like material. Each move is a tempo. Wasting tempo is wasting the game. In life, time is the only non renewable resource.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Temporal Awareness',
  response_type: 'breath',
  response_options: {
    breath_count: 3,
  },
  kbe_target: 'knowing',
};

export const BlitzVsClassical: NaviCue = {
  id: 'CHESS-017',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Blitz is intuition. Classical is calculation. Both are chess. In life, know when to think fast and when to think slow.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Speed vs Depth',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Fast decisions',
    spectrum_right: 'Deep analysis',
  },
  kbe_target: 'believing',
};

export const ZugzwangPosition: NaviCue = {
  id: 'CHESS-018',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Zugzwang: any move worsens your position. Sometimes the best move is having no obligation to move. In life, exit games you cannot win.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'No Win Scenario',
  response_type: 'binary',
  response_options: {
    binary_left: 'Keep playing',
    binary_right: 'Leave the game',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// PSYCHOLOGY OF PLAY
// ============================================================================

export const BlunderRecovery: NaviCue = {
  id: 'CHESS-019',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Everyone blunders. The game is not lost after a blunder. It is lost after you stop fighting. In life, mistakes are not failure. Giving up is.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mistake Recovery',
  response_type: 'hold',
  response_options: {
    hold_duration: 5,
  },
  kbe_target: 'knowing',
};

export const PsychologicalPressure: NaviCue = {
  id: 'CHESS-020',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The position may be equal, but if your opponent is low on time, pressure wins. In life, timing is as important as position.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Pressure Timing',
  response_type: 'witness',
  kbe_target: 'embodying',
};

// Export collection
export const CHESS_NAVICUES = [
  ControlTheCenter,
  DevelopPiecesNotPawns,
  CastleEarly,
  TheFork,
  ThePin,
  TheSkewer,
  PawnStructure,
  WeakSquares,
  SpaceAdvantage,
  PositionalSacrifice,
  FavorableExchanges,
  QueenSacrifice,
  KingBecomesWarrior,
  EveryMoveMatters,
  OppositionPrinciple,
  TimeIsAResource,
  BlitzVsClassical,
  ZugzwangPosition,
  BlunderRecovery,
  PsychologicalPressure,
];

/**
 * 500 MECHANICAL COMPONENTS - BATCH 7
 * GURU WISDOM: RAM DASS, ALAN WATTS, PEMA CHÖDRÖN, THÍCH NHẤT HẠNH, JACK KORNFIELD
 * 100 NaviCues (20 per teacher)
 */

import { NaviCue } from '../NaviCueEngine';

// ============================================================================
// RAM DASS - 20 NaviCues
// ============================================================================

export const RamDass_BeHereNow: NaviCue = {
  id: 'GURU-RD-001',
  family: 'guru',
  modality: 'text',
  text_line: 'Be here now. Not yesterday. Not tomorrow. Here. Now. This is all there is.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Presence',
  response_type: 'breath',
  response_options: {
    breath_count: 3,
  },
  kbe_target: 'knowing',
};

export const RamDass_WalkingEachOtherHome: NaviCue = {
  id: 'GURU-RD-002',
  family: 'guru',
  modality: 'text',
  text_line: 'We are all just walking each other home. Everyone you meet is on the same journey. Different paths. Same destination.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Connection',
  response_type: 'constellation',
  kbe_target: 'believing',
};

export const RamDass_SoulCurriculum: NaviCue = {
  id: 'GURU-RD-003',
  family: 'guru',
  modality: 'text',
  text_line: 'Everything that happens is part of your soul\'s curriculum. The curriculum was designed for you. By you.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Meaning',
  response_type: 'timeline',
  kbe_target: 'believing',
};

export const RamDass_TreatingYourself: NaviCue = {
  id: 'GURU-RD-004',
  family: 'guru',
  modality: 'text',
  text_line: 'I am loving awareness. You are loving awareness. Treat yourself that way.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Love',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const RamDass_ThinkingMind: NaviCue = {
  id: 'GURU-RD-005',
  family: 'guru',
  modality: 'text',
  text_line: 'The thinking mind is a beautiful servant. But a terrible master. Let it serve. Do not let it rule.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Mind Management',
  response_type: 'binary',
  response_options: {
    binary_left: 'Mind rules me',
    binary_right: 'I rule mind',
  },
  kbe_target: 'believing',
};

export const RamDass_SufferingAwakens: NaviCue = {
  id: 'GURU-RD-006',
  family: 'guru',
  modality: 'text',
  text_line: 'Suffering is the sandpaper of awakening. It rubs off everything that is not essential.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Growth Through Pain',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const RamDass_OpeningHeart: NaviCue = {
  id: 'GURU-RD-007',
  family: 'guru',
  modality: 'text',
  text_line: 'The heart that breaks open can contain the whole universe. Breakage is breakthrough.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Vulnerability',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const RamDass_StillQuiet: NaviCue = {
  id: 'GURU-RD-008',
  family: 'guru',
  modality: 'text',
  text_line: 'Be still. Be quiet. Listen. The soul speaks in whispers.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Silence',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'embodying',
};

export const RamDass_LoveEveryone: NaviCue = {
  id: 'GURU-RD-009',
  family: 'guru',
  modality: 'text',
  text_line: 'Love everyone. Tell the truth. Do not be attached to outcomes. This is the whole path.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Simple Rules',
  response_type: 'tap',
  response_options: {
    tap_options: ['Love everyone', 'Tell truth', 'Detach from outcome'],
  },
  kbe_target: 'embodying',
};

export const RamDass_MeetYouThere: NaviCue = {
  id: 'GURU-RD-010',
  family: 'guru',
  modality: 'text',
  text_line: 'When you go out into the woods and look at trees, you see them all as trees. But look closer. Each one is different. See them. Really see them.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Seeing Others',
  response_type: 'witness',
  kbe_target: 'embodying',
};

export const RamDass_EgoNoise: NaviCue = {
  id: 'GURU-RD-011',
  family: 'guru',
  modality: 'text',
  text_line: 'The ego is like a radio playing too loud. Turn down the volume. Notice the silence underneath.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Ego Transcendence',
  response_type: 'slider',
  response_options: {
    slider_label: 'How loud is your ego?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const RamDass_PerfectlyImperfect: NaviCue = {
  id: 'GURU-RD-012',
  family: 'guru',
  modality: 'text',
  text_line: 'You are perfect exactly as you are. And there is still room to grow. Both are true.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Paradox of Growth',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const RamDass_GraceFindsYou: NaviCue = {
  id: 'GURU-RD-013',
  family: 'guru',
  modality: 'text',
  text_line: 'Grace happens. You do not earn it. You do not deserve it. It just finds you when you are ready.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Surrender',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const RamDass_WitnessConsciousness: NaviCue = {
  id: 'GURU-RD-014',
  family: 'guru',
  modality: 'text',
  text_line: 'You are not your thoughts. You are the awareness behind them. The witness. The observer.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Observer Self',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const RamDass_ThirdEye: NaviCue = {
  id: 'GURU-RD-015',
  family: 'guru',
  modality: 'text',
  text_line: 'See with the third eye. Not the eye of judgment. The eye of compassion.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Compassionate Seeing',
  response_type: 'binary',
  response_options: {
    binary_left: 'Judge',
    binary_right: 'Compassion',
  },
  kbe_target: 'embodying',
};

export const RamDass_NowhereToGo: NaviCue = {
  id: 'GURU-RD-016',
  family: 'guru',
  modality: 'text',
  text_line: 'There is nowhere to go. Nothing to become. You are already home. You just forgot.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Arrival',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'believing',
};

export const RamDass_ServiceIsPath: NaviCue = {
  id: 'GURU-RD-017',
  family: 'guru',
  modality: 'text',
  text_line: 'Service is the path. When you serve others, you serve yourself. There is no separation.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Service',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

export const RamDass_TrustTheProcess: NaviCue = {
  id: 'GURU-RD-018',
  family: 'guru',
  modality: 'text',
  text_line: 'Trust the process. You are exactly where you need to be. The universe does not make mistakes.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Trust',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much do you trust?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const RamDass_LetGoOfSomeone: NaviCue = {
  id: 'GURU-RD-019',
  family: 'guru',
  modality: 'text',
  text_line: 'If you let go a little, you will have a little peace. If you let go a lot, you will have a lot of peace.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Letting Go',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Holding tight',
    spectrum_right: 'Letting go',
  },
  kbe_target: 'embodying',
};

export const RamDass_ConsciousisDrug: NaviCue = {
  id: 'GURU-RD-020',
  family: 'guru',
  modality: 'text',
  text_line: 'Consciousness is the ultimate drug. Get high on awareness. The trip never ends.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Awakening',
  response_type: 'echo',
  kbe_target: 'knowing',
};

// ============================================================================
// ALAN WATTS - 20 NaviCues
// ============================================================================

export const AlanWatts_LifeIsMusic: NaviCue = {
  id: 'GURU-AW-001',
  family: 'guru',
  modality: 'text',
  text_line: 'Life is not a journey to a destination. It is a dance. You do not dance to arrive somewhere. You dance to dance.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Process vs Goal',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const AlanWatts_YouAreTheUniverse: NaviCue = {
  id: 'GURU-AW-002',
  family: 'guru',
  modality: 'text',
  text_line: 'You are not IN the universe. You ARE the universe. An intrinsic part of it. As the wave is to the ocean.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Cosmic Self',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const AlanWatts_ProblemOfControl: NaviCue = {
  id: 'GURU-AW-003',
  family: 'guru',
  modality: 'text',
  text_line: 'The more you try to control, the less control you have. Control is the illusion. Flow is the reality.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Letting Go',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Control everything',
    spectrum_right: 'Flow with everything',
  },
  kbe_target: 'believing',
};

export const AlanWatts_ThinkingAboutIt: NaviCue = {
  id: 'GURU-AW-004',
  family: 'guru',
  modality: 'text',
  text_line: 'Thinking about life is not the same as living life. Stop thinking about the water. Jump in.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Overthinking',
  response_type: 'binary',
  response_options: {
    binary_left: 'Think about it',
    binary_right: 'Do it',
  },
  kbe_target: 'embodying',
};

export const AlanWatts_LetItHappen: NaviCue = {
  id: 'GURU-AW-005',
  family: 'guru',
  modality: 'text',
  text_line: 'This is the real secret of life. To be completely engaged with what you are doing. To let it happen. Not forcing.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Wu Wei',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const AlanWatts_NoSelfToDefend: NaviCue = {
  id: 'GURU-AW-006',
  family: 'guru',
  modality: 'text',
  text_line: 'When you realize there is no separate self to defend, you stop being afraid. Fear protects something that does not exist.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'No Self',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const AlanWatts_PlayingTheGame: NaviCue = {
  id: 'GURU-AW-007',
  family: 'guru',
  modality: 'text',
  text_line: 'Life is a game. Play it. Do not take it seriously. But play it with total engagement.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Lightness',
  response_type: 'tap',
  response_options: {
    tap_options: ['Play', 'Serious', 'Both'],
  },
  kbe_target: 'embodying',
};

export const AlanWatts_FutureNeverComes: NaviCue = {
  id: 'GURU-AW-008',
  family: 'guru',
  modality: 'text',
  text_line: 'The future never comes. It is always now. Tomorrow never arrives. Only today.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Eternal Now',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const AlanWatts_MudAndLotus: NaviCue = {
  id: 'GURU-AW-009',
  family: 'guru',
  modality: 'text',
  text_line: 'No mud, no lotus. The lotus grows from the mud. Your beauty emerges from your pain.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Growth from Pain',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const AlanWatts_CannotStepTwice: NaviCue = {
  id: 'GURU-AW-010',
  family: 'guru',
  modality: 'text',
  text_line: 'You cannot step in the same river twice. Everything changes. Including you. Stop trying to freeze reality.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Impermanence',
  response_type: 'witness',
  kbe_target: 'believing',
};

export const AlanWatts_WantAndNeed: NaviCue = {
  id: 'GURU-AW-011',
  family: 'guru',
  modality: 'text',
  text_line: 'The more you need, the less you have. The less you need, the more you have. Wanting is poverty.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Desire',
  response_type: 'comparison',
  kbe_target: 'believing',
};

export const AlanWatts_WatchingThoughts: NaviCue = {
  id: 'GURU-AW-012',
  family: 'guru',
  modality: 'text',
  text_line: 'Watch your thoughts like clouds passing in the sky. Do not grab them. Do not push them away. Just watch.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Observation',
  response_type: 'witness',
  kbe_target: 'embodying',
};

export const AlanWatts_SenseOfHumor: NaviCue = {
  id: 'GURU-AW-013',
  family: 'guru',
  modality: 'text',
  text_line: 'Angels can fly because they take themselves lightly. Develop a sense of humor about yourself.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Humor',
  response_type: 'binary',
  response_options: {
    binary_left: 'Too serious',
    binary_right: 'Lightening up',
  },
  kbe_target: 'embodying',
};

export const AlanWatts_SilenceIsMusic: NaviCue = {
  id: 'GURU-AW-014',
  family: 'guru',
  modality: 'text',
  text_line: 'Silence is the canvas on which sound is painted. Without silence, there is only noise.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Silence',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'embodying',
};

export const AlanWatts_ArtOfLiving: NaviCue = {
  id: 'GURU-AW-015',
  family: 'guru',
  modality: 'text',
  text_line: 'The art of living is neither careless drifting on the one hand nor fearful clinging on the other. It is being sensitive to each moment.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Middle Way',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Drifting',
    spectrum_right: 'Clinging',
  },
  kbe_target: 'embodying',
};

export const AlanWatts_FearOfDeath: NaviCue = {
  id: 'GURU-AW-016',
  family: 'guru',
  modality: 'text',
  text_line: 'You were nothing before you were born. You will be nothing after you die. And nothing is not something to be afraid of.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Death Acceptance',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const AlanWatts_ResponsibilityMyth: NaviCue = {
  id: 'GURU-AW-017',
  family: 'guru',
  modality: 'text',
  text_line: 'The myth of responsibility: You think you are running the show. But you are not even in charge of your next thought.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Free Will',
  response_type: 'curveball',
  kbe_target: 'believing',
};

export const AlanWatts_EternalNow: NaviCue = {
  id: 'GURU-AW-018',
  family: 'guru',
  modality: 'text',
  text_line: 'There is never anything but the present. And if you cannot live there, you cannot live anywhere.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Presence',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const AlanWatts_TabooAgainstKnowing: NaviCue = {
  id: 'GURU-AW-019',
  family: 'guru',
  modality: 'text',
  text_line: 'The taboo against knowing who you really are. Society tells you that you are just a body. But you are the entire cosmos.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'True Self',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const AlanWatts_EverywhingRelated: NaviCue = {
  id: 'GURU-AW-020',
  family: 'guru',
  modality: 'text',
  text_line: 'Everything is related to everything else. The butterfly flaps its wings and a hurricane forms. You are not separate.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Interconnection',
  response_type: 'constellation',
  kbe_target: 'knowing',
};

// Export collections
export const RAM_DASS_NAVICUES = [
  RamDass_BeHereNow,
  RamDass_WalkingEachOtherHome,
  RamDass_SoulCurriculum,
  RamDass_TreatingYourself,
  RamDass_ThinkingMind,
  RamDass_SufferingAwakens,
  RamDass_OpeningHeart,
  RamDass_StillQuiet,
  RamDass_LoveEveryone,
  RamDass_MeetYouThere,
  RamDass_EgoNoise,
  RamDass_PerfectlyImperfect,
  RamDass_GraceFindsYou,
  RamDass_WitnessConsciousness,
  RamDass_ThirdEye,
  RamDass_NowhereToGo,
  RamDass_ServiceIsPath,
  RamDass_TrustTheProcess,
  RamDass_LetGoOfSomeone,
  RamDass_ConsciousisDrug,
];

export const ALAN_WATTS_NAVICUES = [
  AlanWatts_LifeIsMusic,
  AlanWatts_YouAreTheUniverse,
  AlanWatts_ProblemOfControl,
  AlanWatts_ThinkingAboutIt,
  AlanWatts_LetItHappen,
  AlanWatts_NoSelfToDefend,
  AlanWatts_PlayingTheGame,
  AlanWatts_FutureNeverComes,
  AlanWatts_MudAndLotus,
  AlanWatts_CannotStepTwice,
  AlanWatts_WantAndNeed,
  AlanWatts_WatchingThoughts,
  AlanWatts_SenseOfHumor,
  AlanWatts_SilenceIsMusic,
  AlanWatts_ArtOfLiving,
  AlanWatts_FearOfDeath,
  AlanWatts_ResponsibilityMyth,
  AlanWatts_EternalNow,
  AlanWatts_TabooAgainstKnowing,
  AlanWatts_EverywhingRelated,
];

// Pema, Thích Nhất Hạnh, Jack Kornfield would follow the same pattern (20 each = 60 more)
// Total Guru Wisdom: 100 NaviCues

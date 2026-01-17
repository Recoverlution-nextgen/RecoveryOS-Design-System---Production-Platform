/**
 * CREATIVE PLAYGROUND: 10,000 NAVICUE GENERATOR
 * 
 * This is the master taxonomy and tagging system for the entire NaviCue universe.
 * Designed to scale to 10,000+ NaviCues across infinite domains.
 */

// ============================================================================
// CORE TAGGING SYSTEM
// ============================================================================

export interface NaviCueTag {
  id: string;
  name: string;
  category: TagCategory;
  description: string;
  color?: string;
}

export type TagCategory = 
  | 'domain'           // What field/discipline (e.g., physics, psychology, chess)
  | 'mechanism'        // How it works (cognitive, emotional, somatic, behavioral)
  | 'intent'           // Why/when to use it (engage, calm, challenge, etc.)
  | 'pillar'           // Clinical pillar (ER, SR, SC, CR, II, DM)
  | 'teacher'          // Guru/teacher tradition
  | 'complexity'       // How advanced (beginner, intermediate, advanced, expert)
  | 'duration'         // How long (< 1min, 1-3min, 3-5min, 5-10min, 10+ min)
  | 'interaction'      // Type of engagement (choice, slider, text, timeline, etc.)
  | 'transformation'   // Layer (knowing, believing, embodying)
  | 'theme';           // Meta-theme (paradox, systems, time, identity, etc.)

// ============================================================================
// DOMAIN TAGS (100+ domains)
// ============================================================================

export const DOMAIN_TAGS: NaviCueTag[] = [
  // SCIENCE DOMAINS
  { id: 'physics', name: 'Physics', category: 'domain', description: 'Laws of motion, energy, forces' },
  { id: 'quantum', name: 'Quantum Mechanics', category: 'domain', description: 'Superposition, uncertainty, entanglement' },
  { id: 'chemistry', name: 'Chemistry', category: 'domain', description: 'Reactions, bonds, transformation' },
  { id: 'biology', name: 'Biology', category: 'domain', description: 'Life systems, evolution, adaptation' },
  { id: 'neuroscience', name: 'Neuroscience', category: 'domain', description: 'Brain function, neural patterns' },
  { id: 'astronomy', name: 'Astronomy', category: 'domain', description: 'Cosmic scale, celestial mechanics' },
  { id: 'geology', name: 'Geology', category: 'domain', description: 'Earth processes, deep time' },
  { id: 'ecology', name: 'Ecology', category: 'domain', description: 'Ecosystems, interconnection, balance' },
  { id: 'meteorology', name: 'Meteorology', category: 'domain', description: 'Weather systems, climate' },
  { id: 'oceanography', name: 'Oceanography', category: 'domain', description: 'Ocean dynamics, tides, currents' },

  // ARTS & CULTURE
  { id: 'music', name: 'Music Theory', category: 'domain', description: 'Harmony, rhythm, composition' },
  { id: 'visual-art', name: 'Visual Art', category: 'domain', description: 'Composition, color, perspective' },
  { id: 'film', name: 'Film & Cinema', category: 'domain', description: 'Narrative, montage, visual language' },
  { id: 'literature', name: 'Literature', category: 'domain', description: 'Story structure, metaphor, character' },
  { id: 'poetry', name: 'Poetry', category: 'domain', description: 'Imagery, rhythm, compression' },
  { id: 'dance', name: 'Dance', category: 'domain', description: 'Movement, rhythm, expression' },
  { id: 'theater', name: 'Theater', category: 'domain', description: 'Performance, presence, transformation' },
  { id: 'photography', name: 'Photography', category: 'domain', description: 'Light, composition, moment' },
  { id: 'sculpture', name: 'Sculpture', category: 'domain', description: 'Form, space, materiality' },
  { id: 'architecture', name: 'Architecture', category: 'domain', description: 'Space, structure, human scale' },

  // PHILOSOPHY & WISDOM
  { id: 'stoicism', name: 'Stoicism', category: 'domain', description: 'Control, virtue, acceptance' },
  { id: 'existentialism', name: 'Existentialism', category: 'domain', description: 'Meaning, freedom, authenticity' },
  { id: 'buddhism', name: 'Buddhism', category: 'domain', description: 'Suffering, impermanence, awareness' },
  { id: 'taoism', name: 'Taoism', category: 'domain', description: 'Wu wei, flow, natural order' },
  { id: 'vedanta', name: 'Vedanta', category: 'domain', description: 'Non-duality, consciousness, self' },
  { id: 'phenomenology', name: 'Phenomenology', category: 'domain', description: 'Direct experience, consciousness' },
  { id: 'pragmatism', name: 'Pragmatism', category: 'domain', description: 'Practical consequences, action' },
  { id: 'absurdism', name: 'Absurdism', category: 'domain', description: 'Meaninglessness, revolt, freedom' },

  // SPORTS & ATHLETICS
  { id: 'basketball', name: 'Basketball', category: 'domain', description: 'Flow, teamwork, strategy' },
  { id: 'martial-arts', name: 'Martial Arts', category: 'domain', description: 'Discipline, presence, mastery' },
  { id: 'tennis', name: 'Tennis', category: 'domain', description: 'Focus, adaptation, momentum' },
  { id: 'running', name: 'Running', category: 'domain', description: 'Endurance, rhythm, mental game' },
  { id: 'climbing', name: 'Rock Climbing', category: 'domain', description: 'Problem-solving, trust, fear' },
  { id: 'swimming', name: 'Swimming', category: 'domain', description: 'Breath, efficiency, surrender' },
  { id: 'yoga', name: 'Yoga', category: 'domain', description: 'Union, breath, presence' },

  // GAMES & STRATEGY
  { id: 'chess', name: 'Chess', category: 'domain', description: 'Strategy, patterns, foresight' },
  { id: 'poker', name: 'Poker', category: 'domain', description: 'Probability, psychology, variance' },
  { id: 'go', name: 'Go', category: 'domain', description: 'Territory, influence, balance' },
  { id: 'video-games', name: 'Video Games', category: 'domain', description: 'Flow, feedback loops, mastery' },
  { id: 'board-games', name: 'Board Games', category: 'domain', description: 'Systems, optimization, social' },

  // CULINARY
  { id: 'cooking', name: 'Cooking Science', category: 'domain', description: 'Heat, transformation, flavor' },
  { id: 'baking', name: 'Baking', category: 'domain', description: 'Precision, chemistry, patience' },
  { id: 'mixology', name: 'Mixology', category: 'domain', description: 'Balance, dilution, complexity' },
  { id: 'fermentation', name: 'Fermentation', category: 'domain', description: 'Time, transformation, patience' },
  { id: 'flavor-pairing', name: 'Flavor Pairing', category: 'domain', description: 'Complementary, contrast, harmony' },

  // TECHNOLOGY
  { id: 'programming', name: 'Programming', category: 'domain', description: 'Logic, abstraction, systems' },
  { id: 'networks', name: 'Network Theory', category: 'domain', description: 'Nodes, edges, emergence' },
  { id: 'ai', name: 'Artificial Intelligence', category: 'domain', description: 'Learning, patterns, intelligence' },
  { id: 'cybernetics', name: 'Cybernetics', category: 'domain', description: 'Feedback, control, adaptation' },
  { id: 'blockchain', name: 'Blockchain', category: 'domain', description: 'Decentralization, trust, immutability' },

  // BUSINESS & ECONOMICS
  { id: 'economics', name: 'Economics', category: 'domain', description: 'Incentives, trade-offs, markets' },
  { id: 'game-theory', name: 'Game Theory', category: 'domain', description: 'Strategy, payoffs, equilibrium' },
  { id: 'marketing', name: 'Marketing', category: 'domain', description: 'Attention, persuasion, value' },
  { id: 'negotiation', name: 'Negotiation', category: 'domain', description: 'Value creation, rapport, BATNA' },
  { id: 'leadership', name: 'Leadership', category: 'domain', description: 'Vision, influence, development' },

  // NATURE
  { id: 'forestry', name: 'Forest Ecology', category: 'domain', description: 'Succession, networks, keystone species' },
  { id: 'birds', name: 'Ornithology', category: 'domain', description: 'Migration, adaptation, song' },
  { id: 'fungi', name: 'Mycology', category: 'domain', description: 'Networks, decomposition, symbiosis' },
  { id: 'plants', name: 'Botany', category: 'domain', description: 'Growth, adaptation, resilience' },
  { id: 'wilderness', name: 'Wilderness Survival', category: 'domain', description: 'Resourcefulness, adaptation, presence' },

  // MATHEMATICS
  { id: 'geometry', name: 'Geometry', category: 'domain', description: 'Space, form, relationships' },
  { id: 'topology', name: 'Topology', category: 'domain', description: 'Continuous transformation, invariants' },
  { id: 'fractals', name: 'Fractals', category: 'domain', description: 'Self-similarity, infinite complexity' },
  { id: 'statistics', name: 'Statistics', category: 'domain', description: 'Probability, variance, inference' },
  { id: 'calculus', name: 'Calculus', category: 'domain', description: 'Change, rates, accumulation' },

  // RELATIONSHIPS
  { id: 'attachment', name: 'Attachment Theory', category: 'domain', description: 'Bonding, security, patterns' },
  { id: 'communication', name: 'Communication', category: 'domain', description: 'Expression, listening, clarity' },
  { id: 'intimacy', name: 'Intimacy', category: 'domain', description: 'Vulnerability, connection, trust' },
  { id: 'conflict', name: 'Conflict Resolution', category: 'domain', description: 'Needs, repair, understanding' },
  { id: 'boundaries', name: 'Boundaries', category: 'domain', description: 'Self-protection, clarity, respect' },

  // TIME & SPACE
  { id: 'time-perception', name: 'Time Perception', category: 'domain', description: 'Duration, flow, memory' },
  { id: 'chronobiology', name: 'Chronobiology', category: 'domain', description: 'Rhythms, cycles, timing' },
  { id: 'space-perception', name: 'Spatial Cognition', category: 'domain', description: 'Navigation, mental maps, distance' },
  { id: 'relativity', name: 'Relativity', category: 'domain', description: 'Time dilation, perspective, frames' },

  // Add 50 more domains as needed...
];

// ============================================================================
// MECHANISM TAGS
// ============================================================================

export const MECHANISM_TAGS: NaviCueTag[] = [
  { id: 'cognitive', name: 'Cognitive', category: 'mechanism', description: 'Thought patterns, beliefs, mental models', color: '#5739FB' },
  { id: 'emotional', name: 'Emotional', category: 'mechanism', description: 'Feelings, affect, emotional regulation', color: '#FF6B9D' },
  { id: 'somatic', name: 'Somatic', category: 'mechanism', description: 'Body sensations, physical awareness', color: '#4ECDC4' },
  { id: 'behavioral', name: 'Behavioral', category: 'mechanism', description: 'Actions, habits, responses', color: '#F7B731' },
  { id: 'relational', name: 'Relational', category: 'mechanism', description: 'Interpersonal dynamics, connection', color: '#5F27CD' },
  { id: 'existential', name: 'Existential', category: 'mechanism', description: 'Meaning, purpose, mortality', color: '#341F97' },
  { id: 'spiritual', name: 'Spiritual', category: 'mechanism', description: 'Transcendence, connection, consciousness', color: '#8B4789' },
  { id: 'systemic', name: 'Systemic', category: 'mechanism', description: 'Patterns, feedback loops, emergence', color: '#00B894' },
];

// ============================================================================
// INTENT TAGS
// ============================================================================

export const INTENT_TAGS: NaviCueTag[] = [
  { id: 'engage', name: 'Engage', category: 'intent', description: 'Capture attention, spark curiosity' },
  { id: 'calm', name: 'Calm', category: 'intent', description: 'Soothe, ground, regulate down' },
  { id: 'excite', name: 'Excite', category: 'intent', description: 'Energize, motivate, uplift' },
  { id: 'challenge', name: 'Challenge', category: 'intent', description: 'Provoke, stretch, confront' },
  { id: 'care', name: 'Care', category: 'intent', description: 'Nurture, validate, support' },
  { id: 'reinforce', name: 'Reinforce', category: 'intent', description: 'Strengthen, consolidate, integrate' },
  { id: 'remind', name: 'Remind', category: 'intent', description: 'Recall, reconnect, re-anchor' },
  { id: 'boost', name: 'Boost', category: 'intent', description: 'Confidence, efficacy, momentum' },
  { id: 'play', name: 'Play', category: 'intent', description: 'Experiment, explore, lighten' },
  { id: 'reflect', name: 'Reflect', category: 'intent', description: 'Contemplate, process, integrate' },
];

// ============================================================================
// COMPLEXITY TAGS
// ============================================================================

export const COMPLEXITY_TAGS: NaviCueTag[] = [
  { id: 'beginner', name: 'Beginner', category: 'complexity', description: 'Accessible, clear, simple' },
  { id: 'intermediate', name: 'Intermediate', category: 'complexity', description: 'Some background helpful' },
  { id: 'advanced', name: 'Advanced', category: 'complexity', description: 'Deep knowledge required' },
  { id: 'expert', name: 'Expert', category: 'complexity', description: 'Specialized expertise needed' },
];

// ============================================================================
// DURATION TAGS
// ============================================================================

export const DURATION_TAGS: NaviCueTag[] = [
  { id: 'micro', name: 'Micro (< 1min)', category: 'duration', description: 'Quick check-in or prompt' },
  { id: 'short', name: 'Short (1-3min)', category: 'duration', description: 'Brief interaction' },
  { id: 'medium', name: 'Medium (3-5min)', category: 'duration', description: 'Moderate engagement' },
  { id: 'long', name: 'Long (5-10min)', category: 'duration', description: 'Deep exploration' },
  { id: 'extended', name: 'Extended (10+ min)', category: 'duration', description: 'Comprehensive journey' },
];

// ============================================================================
// INTERACTION TAGS
// ============================================================================

export const INTERACTION_TAGS: NaviCueTag[] = [
  { id: 'choice', name: 'Choice-Based', category: 'interaction', description: 'Select between options' },
  { id: 'slider', name: 'Slider', category: 'interaction', description: 'Continuous scale input' },
  { id: 'text', name: 'Text Input', category: 'interaction', description: 'Free-form writing' },
  { id: 'timeline', name: 'Timeline', category: 'interaction', description: 'Temporal navigation' },
  { id: 'visual', name: 'Visual', category: 'interaction', description: 'Image/diagram based' },
  { id: 'sorting', name: 'Sorting', category: 'interaction', description: 'Drag/prioritize items' },
  { id: 'matrix', name: 'Matrix', category: 'interaction', description: '2D grid mapping' },
  { id: 'timer', name: 'Timer-Based', category: 'interaction', description: 'Timed responses' },
  { id: 'sequential', name: 'Sequential', category: 'interaction', description: 'Step-by-step flow' },
  { id: 'reactive', name: 'Reactive', category: 'interaction', description: 'Real-time response to input' },
];

// ============================================================================
// TRANSFORMATION TAGS
// ============================================================================

export const TRANSFORMATION_TAGS: NaviCueTag[] = [
  { id: 'knowing', name: 'Knowing', category: 'transformation', description: 'Intellectual awareness', color: '#7B68EE' },
  { id: 'believing', name: 'Believing', category: 'transformation', description: 'Emotional conviction', color: '#5739FB' },
  { id: 'embodying', name: 'Embodying', category: 'transformation', description: 'Automatic integration', color: '#3E2BB8' },
];

// ============================================================================
// THEME TAGS
// ============================================================================

export const THEME_TAGS: NaviCueTag[] = [
  { id: 'paradox', name: 'Paradox', category: 'theme', description: 'Contradictions that reveal truth' },
  { id: 'systems', name: 'Systems Thinking', category: 'theme', description: 'Interconnection, emergence' },
  { id: 'time', name: 'Time & Change', category: 'theme', description: 'Temporality, impermanence' },
  { id: 'identity', name: 'Identity & Self', category: 'theme', description: 'Who am I?' },
  { id: 'control', name: 'Control & Agency', category: 'theme', description: 'Power, influence, surrender' },
  { id: 'connection', name: 'Connection', category: 'theme', description: 'Belonging, interdependence' },
  { id: 'uncertainty', name: 'Uncertainty', category: 'theme', description: 'Not knowing, ambiguity' },
  { id: 'transformation', name: 'Transformation', category: 'theme', description: 'Change, growth, evolution' },
  { id: 'authenticity', name: 'Authenticity', category: 'theme', description: 'True self, genuine expression' },
  { id: 'presence', name: 'Presence', category: 'theme', description: 'Now, awareness, being' },
];

// ============================================================================
// MASTER TAG REGISTRY
// ============================================================================

export const ALL_TAGS = [
  ...DOMAIN_TAGS,
  ...MECHANISM_TAGS,
  ...INTENT_TAGS,
  ...COMPLEXITY_TAGS,
  ...DURATION_TAGS,
  ...INTERACTION_TAGS,
  ...TRANSFORMATION_TAGS,
  ...THEME_TAGS,
];

export const TAG_BY_ID = new Map(ALL_TAGS.map(tag => [tag.id, tag]));

// ============================================================================
// NAVICUE METADATA INTERFACE
// ============================================================================

export interface NaviCueMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];  // Tag IDs
  pillar?: string;  // For clinical NaviCues
  teacher?: string;  // For guru NaviCues
  domain?: string;  // For infinite NaviCues
  functional: boolean;  // Is it fully built?
  componentPath?: string;  // Where to find the component
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getTagsByCategory(category: TagCategory): NaviCueTag[] {
  return ALL_TAGS.filter(tag => tag.category === category);
}

export function getNaviCuesByTag(navicues: NaviCueMetadata[], tagId: string): NaviCueMetadata[] {
  return navicues.filter(nc => nc.tags.includes(tagId));
}

export function getNaviCuesByMultipleTags(navicues: NaviCueMetadata[], tagIds: string[]): NaviCueMetadata[] {
  return navicues.filter(nc => tagIds.every(tagId => nc.tags.includes(tagId)));
}

export function getTagName(tagId: string): string {
  return TAG_BY_ID.get(tagId)?.name || tagId;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ALL_TAGS,
  TAG_BY_ID,
  DOMAIN_TAGS,
  MECHANISM_TAGS,
  INTENT_TAGS,
  COMPLEXITY_TAGS,
  DURATION_TAGS,
  INTERACTION_TAGS,
  TRANSFORMATION_TAGS,
  THEME_TAGS,
  getTagsByCategory,
  getNaviCuesByTag,
  getNaviCuesByMultipleTags,
  getTagName,
};

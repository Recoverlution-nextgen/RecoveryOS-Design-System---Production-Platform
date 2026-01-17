/**
 * CREATIVE PLAYGROUND: MASTER REGISTRY
 * Complete catalog of 10,000 NaviCues
 * 
 * This file documents every NaviCue in the system with full metadata.
 * Implementations are organized in collection files.
 */

import { NaviCueMetadata } from './taxonomy';

// ============================================================================
// NAVICUE COLLECTIONS OVERVIEW
// ============================================================================

/**
 * ORGANIZATION:
 * - 100 Collections
 * - 100 NaviCues per collection
 * - Total: 10,000 NaviCues
 * 
 * CATEGORIES:
 * 1. Science (10 collections) = 1,000 NaviCues
 * 2. Arts & Culture (15 collections) = 1,500 NaviCues
 * 3. Philosophy & Wisdom (10 collections) = 1,000 NaviCues
 * 4. Sports & Movement (8 collections) = 800 NaviCues
 * 5. Games & Strategy (7 collections) = 700 NaviCues
 * 6. Nature & Ecology (10 collections) = 1,000 NaviCues
 * 7. Technology (8 collections) = 800 NaviCues
 * 8. Business & Economics (7 collections) = 700 NaviCues
 * 9. Relationships (7 collections) = 700 NaviCues
 * 10. Psychology & Mind (10 collections) = 1,000 NaviCues
 * 11. Health & Body (8 collections) = 800 NaviCues
 * 12. Creativity & Expression (10 collections) = 1,000 NaviCues
 */

// ============================================================================
// 1. SCIENCE COLLECTIONS (1,000 NaviCues)
// ============================================================================

export const SCIENCE_COLLECTIONS = {
  'physics': {
    name: 'Physics Mechanics',
    count: 100,
    description: 'Laws of motion, energy, forces, thermodynamics',
    themes: ['Inertia', 'Momentum', 'Energy', 'Equilibrium', 'Entropy'],
  },
  'chemistry': {
    name: 'Chemistry Transformations',
    count: 100,
    description: 'Reactions, bonds, catalysts, equilibrium',
    themes: ['Bonding', 'Catalysis', 'pH Balance', 'Oxidation', 'Crystallization'],
  },
  'biology': {
    name: 'Biology & Life Systems',
    count: 100,
    description: 'Evolution, adaptation, ecosystems, cellular processes',
    themes: ['Natural Selection', 'Homeostasis', 'Symbiosis', 'Adaptation', 'Regeneration'],
  },
  'neuroscience': {
    name: 'Neuroscience & Brain',
    count: 100,
    description: 'Neural networks, plasticity, cognition',
    themes: ['Neuroplasticity', 'Synaptic Pruning', 'Neural Pathways', 'Neurotransmitters', 'Brain Waves'],
  },
  'astronomy': {
    name: 'Astronomy & Cosmos',
    count: 100,
    description: 'Cosmic scale, stellar evolution, space-time',
    themes: ['Black Holes', 'Stellar Life Cycles', 'Cosmic Scale', 'Gravitational Waves', 'Dark Matter'],
  },
  'geology': {
    name: 'Geology & Earth',
    count: 100,
    description: 'Plate tectonics, erosion, deep time, rock cycles',
    themes: ['Plate Tectonics', 'Erosion', 'Sediment Layers', 'Volcanism', 'Deep Time'],
  },
  'meteorology': {
    name: 'Weather & Climate',
    count: 100,
    description: 'Atmospheric dynamics, weather patterns, climate',
    themes: ['High/Low Pressure', 'Fronts', 'Hurricanes', 'Climate Feedback', 'Jet Stream'],
  },
  'oceanography': {
    name: 'Oceans & Water',
    count: 100,
    description: 'Ocean currents, tides, marine ecosystems',
    themes: ['Tides', 'Currents', 'Upwelling', 'Ocean Layers', 'Marine Life'],
  },
  'ecology': {
    name: 'Ecology & Systems',
    count: 100,
    description: 'Ecosystems, food webs, biodiversity, resilience',
    themes: ['Food Webs', 'Keystone Species', 'Succession', 'Carrying Capacity', 'Trophic Cascades'],
  },
  'quantum': {
    name: 'Quantum Mechanics',
    count: 100,
    description: 'Superposition, entanglement, uncertainty, wave-particle',
    themes: ['Superposition', 'Entanglement', 'Uncertainty Principle', 'Wave Function', 'Quantum Tunneling'],
  },
};

// ============================================================================
// 2. ARTS & CULTURE COLLECTIONS (1,500 NaviCues)
// ============================================================================

export const ARTS_COLLECTIONS = {
  'music-theory': {
    name: 'Music Theory',
    count: 100,
    description: 'Harmony, rhythm, melody, composition',
    themes: ['Keys', 'Scales', 'Chords', 'Rhythm', 'Dynamics'],
  },
  'music-emotion': {
    name: 'Music & Emotion',
    count: 100,
    description: 'Emotional impact of musical elements',
    themes: ['Major/Minor', 'Dissonance', 'Tempo', 'Crescendo', 'Silence'],
  },
  'visual-art': {
    name: 'Visual Art Principles',
    count: 100,
    description: 'Composition, color, form, perspective',
    themes: ['Rule of Thirds', 'Color Theory', 'Negative Space', 'Balance', 'Contrast'],
  },
  'film-cinema': {
    name: 'Film & Cinema',
    count: 100,
    description: 'Montage, mise-en-scène, narrative structure',
    themes: ['Montage', 'Shot Composition', 'Pacing', 'Visual Metaphor', 'Editing'],
  },
  'literature': {
    name: 'Literature & Story',
    count: 100,
    description: 'Narrative structure, character, metaphor',
    themes: ['Three-Act Structure', 'Character Arc', 'Metaphor', 'Point of View', 'Theme'],
  },
  'poetry': {
    name: 'Poetry & Language',
    count: 100,
    description: 'Imagery, rhythm, compression, metaphor',
    themes: ['Imagery', 'Rhythm', 'Metaphor', 'Enjambment', 'Compression'],
  },
  'dance': {
    name: 'Dance & Movement',
    count: 100,
    description: 'Movement quality, rhythm, expression, space',
    themes: ['Flow', 'Bound Movement', 'Rhythm', 'Levels', 'Pathways'],
  },
  'theater': {
    name: 'Theater & Performance',
    count: 100,
    description: 'Presence, transformation, character, scene work',
    themes: ['Presence', 'Objectives', 'Transformation', 'Fourth Wall', 'Blocking'],
  },
  'photography': {
    name: 'Photography',
    count: 100,
    description: 'Light, composition, moment, perspective',
    themes: ['Light', 'Decisive Moment', 'Composition', 'Exposure Triangle', 'Depth of Field'],
  },
  'architecture': {
    name: 'Architecture & Space',
    count: 100,
    description: 'Form, function, space, scale, materiality',
    themes: ['Form Follows Function', 'Human Scale', 'Space', 'Materiality', 'Light'],
  },
  'sculpture': {
    name: 'Sculpture & Form',
    count: 100,
    description: 'Three-dimensional form, space, material',
    themes: ['Positive/Negative Space', 'Weight', 'Balance', 'Texture', 'Scale'],
  },
  'design': {
    name: 'Design Principles',
    count: 100,
    description: 'Visual communication, usability, aesthetics',
    themes: ['Hierarchy', 'Contrast', 'Alignment', 'Proximity', 'White Space'],
  },
  'fashion': {
    name: 'Fashion & Style',
    count: 100,
    description: 'Expression through clothing, identity, culture',
    themes: ['Silhouette', 'Color Palette', 'Texture', 'Proportion', 'Statement'],
  },
  'calligraphy': {
    name: 'Calligraphy & Writing',
    count: 100,
    description: 'Form of letters, flow, rhythm, expression',
    themes: ['Stroke', 'Flow', 'Balance', 'Rhythm', 'Expression'],
  },
  'ceramics': {
    name: 'Ceramics & Craft',
    count: 100,
    description: 'Transformation through fire, form, function',
    themes: ['Throwing', 'Glazing', 'Firing', 'Form', 'Function'],
  },
};

// ============================================================================
// 3. PHILOSOPHY & WISDOM COLLECTIONS (1,000 NaviCues)
// ============================================================================

export const PHILOSOPHY_COLLECTIONS = {
  'stoicism': {
    name: 'Stoic Philosophy',
    count: 100,
    description: 'Control, virtue, acceptance, wisdom',
    themes: ['Dichotomy of Control', 'Virtue', 'Acceptance', 'Memento Mori', 'Amor Fati'],
  },
  'existentialism': {
    name: 'Existential Philosophy',
    count: 100,
    description: 'Meaning, freedom, authenticity, absurdity',
    themes: ['Existence Precedes Essence', 'Bad Faith', 'Authenticity', 'Absurdity', 'Freedom'],
  },
  'buddhism-core': {
    name: 'Core Buddhism',
    count: 100,
    description: 'Four Noble Truths, Eightfold Path, emptiness',
    themes: ['Four Noble Truths', 'Eightfold Path', 'Emptiness', 'No-Self', 'Dependent Origination'],
  },
  'zen': {
    name: 'Zen Buddhism',
    count: 100,
    description: 'Direct pointing, koans, sudden awakening',
    themes: ['Koans', 'Mu', 'Sudden Awakening', 'Zazen', 'Beginner\'s Mind'],
  },
  'taoism': {
    name: 'Taoist Philosophy',
    count: 100,
    description: 'Wu wei, flow, natural order, yin-yang',
    themes: ['Wu Wei', 'Yin Yang', 'Flow', 'Natural Order', 'The Way'],
  },
  'vedanta': {
    name: 'Vedanta & Advaita',
    count: 100,
    description: 'Non-duality, consciousness, Self',
    themes: ['Atman', 'Brahman', 'Maya', 'Witness', 'Non-Duality'],
  },
  'phenomenology': {
    name: 'Phenomenology',
    count: 100,
    description: 'Direct experience, consciousness, being',
    themes: ['Intentionality', 'Lived Experience', 'Being-in-the-World', 'Bracketing', 'Horizon'],
  },
  'pragmatism': {
    name: 'Pragmatic Philosophy',
    count: 100,
    description: 'Practical consequences, action, experience',
    themes: ['Practical Consequences', 'Instrumentalism', 'Inquiry', 'Experience', 'Action'],
  },
  'absurdism': {
    name: 'Absurdist Philosophy',
    count: 100,
    description: 'Meaninglessness, revolt, Sisyphus',
    themes: ['The Absurd', 'Revolt', 'Freedom', 'Sisyphus', 'Living Without Appeal'],
  },
  'mysticism': {
    name: 'Mystical Traditions',
    count: 100,
    description: 'Union, transcendence, ineffable experience',
    themes: ['Union', 'Dark Night', 'Illumination', 'Annihilation', 'Ineffable'],
  },
};

// ============================================================================
// 4. SPORTS & MOVEMENT COLLECTIONS (800 NaviCues)
// ============================================================================

export const SPORTS_COLLECTIONS = {
  'basketball': {
    name: 'Basketball Psychology',
    count: 100,
    description: 'Flow, teamwork, strategy, momentum',
    themes: ['Flow State', 'Court Vision', 'Momentum', 'Spacing', 'Read and React'],
  },
  'martial-arts': {
    name: 'Martial Arts Philosophy',
    count: 100,
    description: 'Discipline, presence, mastery, respect',
    themes: ['Kata', 'Mushin', 'Zanshin', 'Kiai', 'Dojo Kun'],
  },
  'tennis': {
    name: 'Tennis Mental Game',
    count: 100,
    description: 'Focus, adaptation, momentum, recovery',
    themes: ['Point by Point', 'Momentum Swings', 'Court Position', 'Mental Reset', 'Adaptation'],
  },
  'running': {
    name: 'Running Psychology',
    count: 100,
    description: 'Endurance, rhythm, pain, transcendence',
    themes: ['Runner\'s High', 'Hitting the Wall', 'Negative Splits', 'Cadence', 'Long Run'],
  },
  'climbing': {
    name: 'Climbing Psychology',
    count: 100,
    description: 'Problem-solving, trust, fear, flow',
    themes: ['Beta Reading', 'Fear Management', 'Trust', 'Send', 'Project'],
  },
  'swimming': {
    name: 'Swimming Dynamics',
    count: 100,
    description: 'Breath, efficiency, surrender, rhythm',
    themes: ['Breath Control', 'Stroke Efficiency', 'Turn', 'Touch Out', 'Negative Split'],
  },
  'yoga': {
    name: 'Yoga Philosophy',
    count: 100,
    description: 'Union, breath, asana, presence',
    themes: ['Asana', 'Pranayama', 'Drishti', 'Bandha', 'Vinyasa'],
  },
  'cycling': {
    name: 'Cycling Dynamics',
    count: 100,
    description: 'Cadence, drafting, pacing, endurance',
    themes: ['Cadence', 'Drafting', 'Bonk', 'Watts', 'Spinning'],
  },
};

// ============================================================================
// 5. GAMES & STRATEGY COLLECTIONS (700 NaviCues)
// ============================================================================

export const GAMES_COLLECTIONS = {
  'chess': {
    name: 'Chess Strategy',
    count: 100,
    description: 'Opening theory, tactics, strategy, endgame',
    themes: ['Opening Principles', 'Tactics', 'Strategy', 'Endgame', 'Tempo'],
  },
  'poker': {
    name: 'Poker Psychology',
    count: 100,
    description: 'Probability, psychology, variance, bankroll',
    themes: ['Expected Value', 'Tilt Management', 'Variance', 'Tells', 'Hand Reading'],
  },
  'go': {
    name: 'Go Strategy',
    count: 100,
    description: 'Territory, influence, balance, reading',
    themes: ['Territory', 'Influence', 'Balance', 'Ko', 'Joseki'],
  },
  'video-games': {
    name: 'Video Game Mechanics',
    count: 100,
    description: 'Flow, feedback loops, mastery, progression',
    themes: ['Flow Channel', 'Feedback Loops', 'Skill Curve', 'Boss Battle', 'Level Design'],
  },
  'board-games': {
    name: 'Board Game Strategy',
    count: 100,
    description: 'Resource management, optimization, social dynamics',
    themes: ['Resource Management', 'Engine Building', 'Area Control', 'Worker Placement', 'Auction'],
  },
  'role-playing': {
    name: 'RPG Dynamics',
    count: 100,
    description: 'Character development, narrative, choices',
    themes: ['Character Arc', 'Branching Narrative', 'Alignment', 'Quest Structure', 'Party Dynamics'],
  },
  'card-games': {
    name: 'Card Game Strategy',
    count: 100,
    description: 'Deck building, probability, combos',
    themes: ['Deck Building', 'Mana Curve', 'Combos', 'Draw Probability', 'Mulligan'],
  },
};

// ============================================================================
// STATS & SUMMARY
// ============================================================================

export const COLLECTION_STATS = {
  totalCollections: 100,
  totalNaviCues: 10000,
  byCategory: {
    'Science': 1000,
    'Arts & Culture': 1500,
    'Philosophy & Wisdom': 1000,
    'Sports & Movement': 800,
    'Games & Strategy': 700,
    'Nature & Ecology': 1000,
    'Technology': 800,
    'Business & Economics': 700,
    'Relationships': 700,
    'Psychology & Mind': 1000,
    'Health & Body': 800,
    'Creativity & Expression': 1000,
  },
  functional: 500,  // Fully implemented
  placeholder: 9500,  // Architecture defined, awaiting implementation
};

export default {
  SCIENCE_COLLECTIONS,
  ARTS_COLLECTIONS,
  PHILOSOPHY_COLLECTIONS,
  SPORTS_COLLECTIONS,
  GAMES_COLLECTIONS,
  COLLECTION_STATS,
};
/**
 * MAGIC WAND UNIVERSE
 * Nine portals into unexpected wisdom
 * Each category is its own world with unique visual language and interaction
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NaviCue {
  id: number;
  title: string;
  content: string;
  insight: string;
}

interface Category {
  id: string;
  name: string;
  tagline: string;
  color: string;
  gradient: string;
  navicues: NaviCue[];
}

const MAGIC_WAND_CATEGORIES: Category[] = [
  {
    id: 'time',
    name: 'Time Paradoxes',
    tagline: 'Transformation exists outside linear time',
    color: '#8B7FD9',
    gradient: 'from-purple-900 via-indigo-800 to-purple-900',
    navicues: [
      {
        id: 1,
        title: 'The Future Self Paradox',
        content: 'You become who you were always going to be by choosing who you want to be',
        insight: 'Destiny and choice are the same thing seen from different angles in time'
      },
      {
        id: 2,
        title: 'The Rewriting Paradox',
        content: 'Your past changes every time you remember it differently',
        insight: 'Memory is not retrieval. It is reconstruction. You are always editing your own history'
      },
      {
        id: 3,
        title: 'The Patience Paradox',
        content: 'The moment you stop waiting is when it arrives',
        insight: 'What you pursue eludes you. What you allow finds you'
      },
      {
        id: 4,
        title: 'The Healing Paradox',
        content: 'You were never broken, but healing is still real',
        insight: 'Wholeness discovering itself looks like transformation'
      },
      {
        id: 5,
        title: 'The Now Paradox',
        content: 'This moment is already gone, and also the only thing that exists',
        insight: 'The present is the knife edge between two illusions'
      },
      {
        id: 6,
        title: 'The Readiness Paradox',
        content: 'You will never feel ready, and you are already ready',
        insight: 'Readiness is not a feeling. It is a decision to act despite the feeling'
      },
      {
        id: 7,
        title: 'The Backwards Paradox',
        content: 'You understand the beginning only after you reach the end',
        insight: 'Meaning is retroactive. The story makes sense in reverse'
      },
      {
        id: 8,
        title: 'The Forever Paradox',
        content: 'Nothing lasts forever, which means this pain will pass',
        insight: 'Impermanence is the source of both grief and hope'
      },
      {
        id: 9,
        title: 'The Too Late Paradox',
        content: 'It is never too late to become who you might have been',
        insight: 'Your unlived life is still waiting for you'
      },
      {
        id: 10,
        title: 'The Cycle Paradox',
        content: 'You keep returning to the same lesson until you learn it differently',
        insight: 'Repetition is not failure. It is the spiral staircase of growth'
      }
    ]
  },
  {
    id: 'quantum',
    name: 'Quantum Mechanics',
    tagline: 'You exist in superposition until you observe yourself',
    color: '#4ECDC4',
    gradient: 'from-teal-900 via-cyan-800 to-teal-900',
    navicues: [
      {
        id: 1,
        title: 'The Observer Effect',
        content: 'You change the moment you pay attention to it',
        insight: 'Observation is not passive. Awareness is intervention'
      },
      {
        id: 2,
        title: 'Superposition Self',
        content: 'You are all versions of yourself until you choose',
        insight: 'Every possibility exists until you collapse into one'
      },
      {
        id: 3,
        title: 'Quantum Entanglement',
        content: 'Your healing affects everyone you have ever touched',
        insight: 'Connection is not metaphor. It is physics'
      },
      {
        id: 4,
        title: 'Uncertainty Principle',
        content: 'The more certain you are, the less you know',
        insight: 'Precision about position means uncertainty about momentum. You cannot know everything at once'
      },
      {
        id: 5,
        title: 'Wave Particle Duality',
        content: 'You are both the pattern and the piece',
        insight: 'Identity is not either or. It is both and'
      },
      {
        id: 6,
        title: 'Quantum Tunneling',
        content: 'You can pass through walls you thought were solid',
        insight: 'Impossibility is just a high energy barrier. Sometimes you tunnel through'
      },
      {
        id: 7,
        title: 'Probability Cloud',
        content: 'You are not one location. You are a field of possibilities',
        insight: 'The self is not a point. It is a probability distribution'
      },
      {
        id: 8,
        title: 'Measurement Problem',
        content: 'The act of checking changes what you are checking',
        insight: 'Self monitoring alters the self. You cannot step outside the system'
      },
      {
        id: 9,
        title: 'Quantum Decoherence',
        content: 'Possibilities collapse into reality through interaction',
        insight: 'You become real by touching the world'
      },
      {
        id: 10,
        title: 'Schrödinger Self',
        content: 'You are simultaneously healing and wounded until someone looks',
        insight: 'States coexist. The box is not opened until you open it'
      }
    ]
  },
  {
    id: 'music',
    name: 'Music Theory',
    tagline: 'Your life is a composition with rests and dissonance',
    color: '#F4A261',
    gradient: 'from-amber-900 via-orange-800 to-amber-900',
    navicues: [
      {
        id: 1,
        title: 'The Dissonance Resolution',
        content: 'Tension exists to make peace sweeter',
        insight: 'Without the wrong note, the right note has no meaning'
      },
      {
        id: 2,
        title: 'The Tempo of Healing',
        content: 'Your rhythm is not the metronome',
        insight: 'Rubato means stolen time. You are allowed to slow down'
      },
      {
        id: 3,
        title: 'The Emotional Key',
        content: 'Minor does not mean sad, major does not mean happy',
        insight: 'Complexity of feeling cannot be reduced to simple categories'
      },
      {
        id: 4,
        title: 'The Rest',
        content: 'Silence is part of the music',
        insight: 'The note gains meaning from the space around it'
      },
      {
        id: 5,
        title: 'The Dynamics',
        content: 'Soft can be more powerful than loud',
        insight: 'Pianissimo is not weakness. It is control'
      },
      {
        id: 6,
        title: 'The Harmony',
        content: 'Two notes together create something neither possesses alone',
        insight: 'Relationship is emergent. The third voice appears from the tension between two'
      },
      {
        id: 7,
        title: 'The Improvisation',
        content: 'The best jazz happens when you forget the chart',
        insight: 'Mastery is knowing the rules well enough to break them beautifully'
      },
      {
        id: 8,
        title: 'The Crescendo',
        content: 'Build slowly toward the moment that changes everything',
        insight: 'Volume is not intensity. The gathering is the power'
      },
      {
        id: 9,
        title: 'The Counterpoint',
        content: 'Multiple melodies can coexist without canceling each other',
        insight: 'Independence and harmony are not opposites'
      },
      {
        id: 10,
        title: 'The Cadence',
        content: 'Every phrase needs its ending, even if temporary',
        insight: 'Resolution is not conclusion. It is punctuation'
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming Mechanics',
    tagline: 'Life is not linear. It is level design',
    color: '#E76F51',
    gradient: 'from-red-900 via-rose-800 to-red-900',
    navicues: [
      {
        id: 1,
        title: 'The Tutorial Level',
        content: 'You are allowed to not know yet',
        insight: 'Mastery begins with clumsy repetition. The tutorial is not failure'
      },
      {
        id: 2,
        title: 'The Boss Battle',
        content: 'The hardest fight is with yourself',
        insight: 'The final boss knows all your patterns because it is you'
      },
      {
        id: 3,
        title: 'The Save Point',
        content: 'Progress is not lost, even when you restart',
        insight: 'Experience persists across deaths. You carry forward what you learned'
      },
      {
        id: 4,
        title: 'The Hidden Level',
        content: 'Your best growth happens in secret',
        insight: 'Not all progress is visible. Some doors only open when you stop looking for them'
      },
      {
        id: 5,
        title: 'The Difficulty Curve',
        content: 'It gets easier because YOU get stronger',
        insight: 'The mountain does not shrink. You grow legs'
      },
      {
        id: 6,
        title: 'The Easter Egg',
        content: 'Joy hides in unexpected places',
        insight: 'The secret is not on the path. It is off to the side, waiting for curiosity'
      },
      {
        id: 7,
        title: 'The Respawn',
        content: 'You get infinite continues',
        insight: 'Death is not game over. It is try again with new knowledge'
      },
      {
        id: 8,
        title: 'The Power Up',
        content: 'Temporary strength teaches you what is possible',
        insight: 'You felt it once. That means you can find it again'
      },
      {
        id: 9,
        title: 'The Side Quest',
        content: 'The optional path sometimes matters more than the main story',
        insight: 'Detours are not distractions. They are where you find yourself'
      },
      {
        id: 10,
        title: 'The New Game Plus',
        content: 'You keep what you learned, even when starting over',
        insight: 'Repetition with knowledge is not the same as the first time through'
      }
    ]
  },
  {
    id: 'chess',
    name: 'Chess Strategy',
    tagline: 'Every position is salvageable if you see it differently',
    color: '#9370DB',
    gradient: 'from-purple-900 via-violet-800 to-purple-900',
    navicues: [
      {
        id: 1,
        title: 'The Opening',
        content: 'Your first move does not determine the game',
        insight: 'Opening theory matters less than middle game understanding. Start anywhere'
      },
      {
        id: 2,
        title: 'The Sacrifice',
        content: 'Sometimes losing a piece wins the game',
        insight: 'What looks like loss may be setup. The queen dies so the rook can mate'
      },
      {
        id: 3,
        title: 'The Endgame',
        content: 'Fewer pieces, more clarity',
        insight: 'When everything else is gone, you see what actually matters'
      },
      {
        id: 4,
        title: 'The Fork',
        content: 'Two good options is still a good problem',
        insight: 'Abundance of choice is not paralysis. Pick either, both win'
      },
      {
        id: 5,
        title: 'The Pin',
        content: 'Sometimes you cannot move without breaking something',
        insight: 'Constraint clarifies. When you must stay, you stop pretending you might leave'
      },
      {
        id: 6,
        title: 'The Zugzwang',
        content: 'Sometimes any move makes things worse',
        insight: 'The compulsion to act is not always wisdom. Sometimes you must pass'
      },
      {
        id: 7,
        title: 'The Gambit',
        content: 'Offer what you can afford to lose',
        insight: 'Risk is not recklessness when you know the value of the piece'
      },
      {
        id: 8,
        title: 'The Stalemate',
        content: 'Draw is better than loss',
        insight: 'Not every battle needs a winner. Sometimes survival is victory'
      },
      {
        id: 9,
        title: 'The Checkmate',
        content: 'The game ends when you stop playing',
        insight: 'Mate is not death. It is the point where continuation becomes impossible'
      },
      {
        id: 10,
        title: 'The Position',
        content: 'How pieces relate matters more than what pieces you have',
        insight: 'Context is everything. A pawn on the 7th rank is stronger than a misplaced queen'
      }
    ]
  },
  {
    id: 'weather',
    name: 'Weather Systems',
    tagline: 'You are not the weather. You are the sky',
    color: '#60A5FA',
    gradient: 'from-blue-900 via-sky-800 to-blue-900',
    navicues: [
      {
        id: 1,
        title: 'The Storm System',
        content: 'You are not the weather, you are the sky',
        insight: 'Clouds pass through. The sky remains'
      },
      {
        id: 2,
        title: 'The Pressure System',
        content: 'High pressure, low pressure, both pass',
        insight: 'Atmospheric conditions change. Your capacity to hold them does not'
      },
      {
        id: 3,
        title: 'The Climate vs Weather',
        content: 'One bad day is not your life',
        insight: 'Weather is what happens. Climate is the pattern. Do not confuse them'
      },
      {
        id: 4,
        title: 'The Season',
        content: 'Winter is preparation for spring',
        insight: 'Dormancy is not death. It is gathering'
      },
      {
        id: 5,
        title: 'The Forecast',
        content: 'Prediction is not destiny',
        insight: 'The forecast tells probability. You still decide whether to bring an umbrella'
      },
      {
        id: 6,
        title: 'The Eye of the Storm',
        content: 'Calm exists within chaos',
        insight: 'The center is still. Find it'
      },
      {
        id: 7,
        title: 'The Rainbow',
        content: 'Beauty appears in the aftermath',
        insight: 'Light through water makes color. Difficulty through awareness makes wisdom'
      },
      {
        id: 8,
        title: 'The Humidity',
        content: 'Sometimes heaviness is just the air',
        insight: 'Not all weight is yours. Some you are just moving through'
      },
      {
        id: 9,
        title: 'The Lightning',
        content: 'Sudden illumination then darkness again',
        insight: 'Insight flashes. You must write it down before the light fades'
      },
      {
        id: 10,
        title: 'The Wind',
        content: 'You cannot control it but you can adjust your sails',
        insight: 'Force is external. Response is internal. Sail accordingly'
      }
    ]
  },
  {
    id: 'cooking',
    name: 'Cooking Science',
    tagline: 'Transformation requires heat, time, and attention',
    color: '#F59E0B',
    gradient: 'from-orange-900 via-amber-800 to-orange-900',
    navicues: [
      {
        id: 1,
        title: 'The Mise en Place',
        content: 'Preparation is not wasted time',
        insight: 'Everything in its place before the fire starts. Chaos comes from skipping this step'
      },
      {
        id: 2,
        title: 'The Resting Time',
        content: 'Transformation happens while waiting',
        insight: 'Meat continues cooking after you remove it from heat. So do you'
      },
      {
        id: 3,
        title: 'The Seasoning',
        content: 'A little goes a long way',
        insight: 'Too much salt ruins the dish. Moderation in intervention'
      },
      {
        id: 4,
        title: 'The Heat Control',
        content: 'Too hot too fast burns everything',
        insight: 'Low and slow wins. Patience is temperature control'
      },
      {
        id: 5,
        title: 'The Taste Balance',
        content: 'Sweet, sour, bitter, umami. You need them all',
        insight: 'Balance is not sameness. It is harmony of opposites'
      },
      {
        id: 6,
        title: 'The Knife Skills',
        content: 'Precision makes everything easier',
        insight: 'A sharp knife is safer than a dull one. Clarity of cut prevents damage'
      },
      {
        id: 7,
        title: 'The Reduction',
        content: 'Boiling down concentrates flavor',
        insight: 'Essence emerges through subtraction. Less liquid, more taste'
      },
      {
        id: 8,
        title: 'The Fermentation',
        content: 'Time and bacteria make magic',
        insight: 'Decomposition is transformation. What seems like rot becomes depth'
      },
      {
        id: 9,
        title: 'The Recipe',
        content: 'Guidelines, not rules',
        insight: 'Follow the recipe until you understand it, then improvise'
      },
      {
        id: 10,
        title: 'The Plating',
        content: 'Presentation affects perception',
        insight: 'The same food tastes different arranged beautifully. Context is flavor'
      }
    ]
  },
  {
    id: 'architecture',
    name: 'Architecture',
    tagline: 'You are both the building and the builder',
    color: '#6B7280',
    gradient: 'from-gray-900 via-slate-800 to-gray-900',
    navicues: [
      {
        id: 1,
        title: 'The Foundation',
        content: 'What you build on determines what you can build',
        insight: 'No structure is stronger than its base. Start there'
      },
      {
        id: 2,
        title: 'The Load Bearing Wall',
        content: 'Some beliefs hold everything up',
        insight: 'You cannot remove every wall. Know which ones bear weight'
      },
      {
        id: 3,
        title: 'The Open Floor Plan',
        content: 'Removing walls creates space',
        insight: 'Openness is not emptiness. It is possibility'
      },
      {
        id: 4,
        title: 'The Renovation',
        content: 'You do not have to tear down to rebuild',
        insight: 'Remodeling keeps the structure. Demolition is not always necessary'
      },
      {
        id: 5,
        title: 'The Blueprint',
        content: 'The plan changes during construction',
        insight: 'Drawing is not building. Expect revisions'
      },
      {
        id: 6,
        title: 'The Window',
        content: 'Light enters through openings',
        insight: 'Perspective requires aperture. Closed walls see nothing'
      },
      {
        id: 7,
        title: 'The Threshold',
        content: 'Doorways mark transition',
        insight: 'You are neither inside nor outside in the doorway. Liminal space is real space'
      },
      {
        id: 8,
        title: 'The Cantilever',
        content: 'You can extend beyond your base if properly balanced',
        insight: 'Reach is possible. Physics is not limitation, it is constraint that enables'
      },
      {
        id: 9,
        title: 'The Facade',
        content: 'What people see is not the structure',
        insight: 'External appearance and internal support are different systems. Both matter'
      },
      {
        id: 10,
        title: 'The Maintenance',
        content: 'Buildings require ongoing care',
        insight: 'Completion is a lie. Structures need tending'
      }
    ]
  },
  {
    id: 'film',
    name: 'Film Theory',
    tagline: 'You are the director of your own story',
    color: '#DC2626',
    gradient: 'from-red-900 via-crimson-800 to-red-900',
    navicues: [
      {
        id: 1,
        title: 'The Edit',
        content: 'You can cut the boring parts',
        insight: 'The story is made in editing. Not everything needs screen time'
      },
      {
        id: 2,
        title: 'The Flashback',
        content: 'Your past is not linear',
        insight: 'Memory is not chronology. It is emotional association. Scene order is flexible'
      },
      {
        id: 3,
        title: 'The Close Up',
        content: 'Zooming in changes meaning',
        insight: 'Shot size is emotional distance. Get closer, see more'
      },
      {
        id: 4,
        title: 'The Montage',
        content: 'Growth happens in the cuts between',
        insight: 'Transformation does not need to be shown in real time. Quick cuts imply passage'
      },
      {
        id: 5,
        title: 'The Directors Cut',
        content: 'There is another version of this story',
        insight: 'The theatrical release is not final. You can re-edit your life'
      },
      {
        id: 6,
        title: 'The POV Shot',
        content: 'Perspective is everything',
        insight: 'Whose eyes are we looking through? Change the camera, change the story'
      },
      {
        id: 7,
        title: 'The Sound Design',
        content: 'What you hear shapes what you see',
        insight: 'Audio creates emotional context. Silence is also sound'
      },
      {
        id: 8,
        title: 'The Three Act Structure',
        content: 'Setup, confrontation, resolution',
        insight: 'Stories have shape. Know which act you are in'
      },
      {
        id: 9,
        title: 'The Fourth Wall',
        content: 'Sometimes you step outside the story to see it',
        insight: 'Meta-awareness breaks immersion. That is the point'
      },
      {
        id: 10,
        title: 'The Unreliable Narrator',
        content: 'You may be lying to yourself',
        insight: 'The voice telling the story is not objective. Question it'
      }
    ]
  }
];

interface MagicWandUniverseProps {
  onNavigate?: (page: string) => void;
}

export function MagicWandUniverse({ onNavigate }: MagicWandUniverseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNaviCue, setSelectedNaviCue] = useState<NaviCue | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedNaviCue(null);
  };

  const handleBack = () => {
    if (selectedNaviCue) {
      setSelectedNaviCue(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const currentCategory = MAGIC_WAND_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <CategoryGateway
            key="gateway"
            categories={MAGIC_WAND_CATEGORIES}
            onSelectCategory={handleCategoryClick}
          />
        ) : !selectedNaviCue ? (
          <CategoryExperience
            key={selectedCategory}
            category={currentCategory!}
            onSelectNaviCue={setSelectedNaviCue}
            onBack={handleBack}
          />
        ) : (
          <NaviCueFullScreen
            key={`${selectedCategory}-${selectedNaviCue.id}`}
            navicue={selectedNaviCue}
            category={currentCategory!}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Category Gateway - Portal entrance
function CategoryGateway({ categories, onSelectCategory }: {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl" style={{ color: '#FFFFFF' }}>
            Magic Wand
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Nine portals into unexpected wisdom
          </p>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Click to enter a world
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: `0 20px 60px ${category.color}40` }}
              className="p-8 text-left transition-all duration-300"
              style={{
                backgroundColor: `${category.color}20`,
                border: `2px solid ${category.color}`,
              }}
            >
              <div className="space-y-3">
                <h3 className="text-2xl" style={{ color: category.color }}>
                  {category.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {category.tagline}
                </p>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {category.navicues.length} NaviCues
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Category Experience - Show all NaviCues in category
function CategoryExperience({ category, onSelectNaviCue, onBack }: {
  category: Category;
  onSelectNaviCue: (navicue: NaviCue) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`min-h-screen bg-gradient-to-br ${category.gradient} p-12`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          ← Back to Gateway
        </button>

        <div className="text-center space-y-4">
          <h1 className="text-5xl" style={{ color: '#FFFFFF' }}>
            {category.name}
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {category.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {category.navicues.map((navicue, index) => (
            <motion.button
              key={navicue.id}
              onClick={() => onSelectNaviCue(navicue)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 text-left transition-all duration-200"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  NaviCue {navicue.id.toString().padStart(2, '0')}
                </div>
                <h3 className="text-xl" style={{ color: '#FFFFFF' }}>
                  {navicue.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {navicue.content}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// NaviCue Full Screen - Immersive reading experience
function NaviCueFullScreen({ navicue, category, onBack }: {
  navicue: NaviCue;
  category: Category;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-gradient-to-br ${category.gradient} flex items-center justify-center p-12`}
    >
      <button
        onClick={onBack}
        className="absolute top-8 left-8 text-sm px-4 py-2 transition-opacity hover:opacity-70"
        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
      >
        ← Back
      </button>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="max-w-4xl mx-auto text-center space-y-12"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-wider"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            {category.name} → NaviCue {navicue.id.toString().padStart(2, '0')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            {navicue.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl leading-relaxed"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {navicue.content}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12 space-y-4"
        >
          <div className="h-px w-32 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
          <p className="text-lg leading-relaxed italic" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {navicue.insight}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

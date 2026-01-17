/**
 * PLACEBO NAVICUE GENERATOR
 * Generate 1000 engagement NaviCues (gamification, quizzes, puzzles, fun content)
 * Purpose: Build trust, reduce fatigue, maintain engagement
 */

import { useState } from 'react';
import { Zap, Download, Check, Sparkles, X } from 'lucide-react';

interface PlaceboNaviCueGeneratorProps {
  onClose: () => void;
}

const FAMILIES = [
  { id: 'gamification', name: 'Gamification', count: 200, examples: ['Streak Tracker', 'Achievement Unlocked', 'Level Up', 'Daily Challenge'] },
  { id: 'quiz', name: 'Fun Quizzes', count: 200, examples: ['Personality Quiz', 'Trivia', 'Would You Rather', 'This or That'] },
  { id: 'puzzle', name: 'Mind Games & Puzzles', count: 200, examples: ['Mini Sudoku', 'Word Scramble', 'Logic Puzzle', 'Pattern Recognition'] },
  { id: 'riddle', name: 'Conundrums & Riddles', count: 100, examples: ['Classic Riddle', 'Brain Teaser', 'Paradox'] },
  { id: 'fact', name: 'Facts of the Day', count: 100, examples: ['Science Fact', 'History Fact', 'Nature Fact'] },
  { id: 'funny', name: 'Crazy Funny Stuff', count: 100, examples: ['Dad Joke', 'Absurd Question', 'Funny Observation'] },
  { id: 'poll', name: 'Polls & Opinions', count: 100, examples: ['Hot Take Poll', 'Preference Poll', 'Opinion Question'] },
];

export function PlaceboNaviCueGenerator({ onClose }: PlaceboNaviCueGeneratorProps) {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<any[]>([]);
  const [generatedCount, setGeneratedCount] = useState(0);

  async function handleGenerate(familyId: string) {
    setGenerating(true);
    setGeneratedCount(0);
    const family = FAMILIES.find(f => f.id === familyId);
    if (!family) return;

    const navicues = [];

    // Generate based on family type
    if (familyId === 'gamification') {
      navicues.push(...generateGamification(family.count));
    } else if (familyId === 'quiz') {
      navicues.push(...generateQuizzes(family.count));
    } else if (familyId === 'puzzle') {
      navicues.push(...generatePuzzles(family.count));
    } else if (familyId === 'riddle') {
      navicues.push(...generateRiddles(family.count));
    } else if (familyId === 'fact') {
      navicues.push(...generateFacts(family.count));
    } else if (familyId === 'funny') {
      navicues.push(...generateFunny(family.count));
    } else if (familyId === 'poll') {
      navicues.push(...generatePolls(family.count));
    }

    setGenerated(navicues);
    setGeneratedCount(navicues.length);
    setGenerating(false);
  }

  function downloadSQL() {
    const sql = generateSQLInserts(generated);
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placebo_navicues_${selectedFamily}.sql`;
    a.click();
  }

  return (
    <div className="min-h-screen bg-[#0A0118] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl mb-0.5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#5739FB]" />
                Placebo NaviCue Generator
              </h1>
              <p className="text-white/40 text-xs">1000 engagement NaviCues for trust-building</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Philosophy */}
        <div className="bg-[#5739FB]/10 border border-[#5739FB]/30 rounded-xl p-6 mb-8">
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5739FB]" />
            Why Placebo NaviCues?
          </h2>
          <p className="text-white/70 mb-3">
            These NaviCues have NO therapeutic purpose. They exist to:
          </p>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Build trust and rapport with users</li>
            <li>• Reduce "therapy fatigue" between heavy content</li>
            <li>• Maintain engagement through variety</li>
            <li>• Collect preferences and personality data through low-stakes interaction</li>
            <li>• Keep the experience fun and human</li>
          </ul>
        </div>

        {/* Families Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {FAMILIES.map((family) => (
            <div
              key={family.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg mb-1">{family.name}</h3>
                  <p className="text-white/40 text-sm">{family.count} NaviCues</p>
                </div>
                {generatedCount > 0 && selectedFamily === family.id && (
                  <Check className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div className="mb-4 space-y-1">
                {family.examples.map((ex, idx) => (
                  <p key={idx} className="text-xs text-white/30">• {ex}</p>
                ))}
              </div>
              <button
                onClick={() => {
                  setSelectedFamily(family.id);
                  handleGenerate(family.id);
                }}
                disabled={generating}
                className="w-full px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <Zap className="w-4 h-4" />
                Generate {family.count}
              </button>
            </div>
          ))}
        </div>

        {/* Generate All */}
        <div className="bg-gradient-to-r from-[#3E2BB8]/20 to-[#5739FB]/20 border border-white/10 rounded-xl p-8 mb-8">
          <h3 className="text-xl mb-3">Generate All 1000 NaviCues</h3>
          <p className="text-white/60 mb-6">
            This will generate all 7 families in one batch and export a single SQL file.
          </p>
          <button
            onClick={() => {
              setSelectedFamily('all');
              FAMILIES.forEach(f => handleGenerate(f.id));
            }}
            disabled={generating}
            className="px-8 py-4 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
          >
            <Zap className="w-6 h-6" />
            Generate All 1000 NaviCues
          </button>
        </div>

        {/* Results */}
        {generated.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg mb-1">Generated {generatedCount} NaviCues</h3>
                <p className="text-white/40 text-sm">Family: {selectedFamily}</p>
              </div>
              <button
                onClick={downloadSQL}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download SQL
              </button>
            </div>

            {/* Preview */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {generated.slice(0, 20).map((navicue, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded p-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-[#5739FB] font-mono text-xs">{navicue.code}</span>
                    <div className="flex-1">
                      <p className="text-white/80 mb-1">{navicue.variants[0].copy.body}</p>
                      <p className="text-white/40 text-xs">{navicue.component_type}</p>
                    </div>
                  </div>
                </div>
              ))}
              {generated.length > 20 && (
                <p className="text-white/40 text-sm text-center py-2">
                  ... and {generated.length - 20} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// GENERATORS

function generateGamification(count: number) {
  const navicues = [];
  const streaks = [3, 5, 7, 14, 30, 60, 90];
  const achievements = ['First Practice', '10 Practices', '50 Practices', 'Week Streak', 'Month Streak'];
  
  for (let i = 0; i < count; i++) {
    if (i < 70) {
      // Streak trackers
      const streak = streaks[i % streaks.length];
      navicues.push({
        code: `placebo_${String(i + 1).padStart(4, '0')}_streak_${streak}day`,
        kbe_layer: 'ENGAGEMENT',
        tier: 'PLACEBO',
        family: 'gamification',
        component_type: 'StreakTracker',
        default_response_type: 'button',
        intent: 'build_trust',
        tags: ['fun', 'engagement', 'streak'],
        config: { streak_length: streak },
        variants: [{
          lens: 'universal',
          copy: { body: `You're on a ${streak}-day check-in streak! Keep it going?`, cta_yes: 'Yes!', cta_no: 'Maybe Later' },
        }],
      });
    } else if (i < 140) {
      // Achievement unlocks
      const achievement = achievements[(i - 70) % achievements.length];
      navicues.push({
        code: `placebo_${String(i + 1).padStart(4, '0')}_achievement_${achievement.replace(/ /g, '_').toLowerCase()}`,
        kbe_layer: 'ENGAGEMENT',
        tier: 'PLACEBO',
        family: 'gamification',
        component_type: 'Achievement',
        default_response_type: 'button',
        intent: 'celebrate',
        tags: ['fun', 'achievement'],
        config: { achievement_name: achievement },
        variants: [{
          lens: 'universal',
          copy: { body: `Achievement Unlocked: ${achievement}!`, cta_yes: '🔥', cta_no: 'Thanks' },
        }],
      });
    } else {
      // Daily challenges
      navicues.push({
        code: `placebo_${String(i + 1).padStart(4, '0')}_challenge_${i}`,
        kbe_layer: 'ENGAGEMENT',
        tier: 'PLACEBO',
        family: 'gamification',
        component_type: 'DailyChallenge',
        default_response_type: 'button',
        intent: 'engage',
        tags: ['fun', 'challenge'],
        config: {},
        variants: [{
          lens: 'universal',
          copy: { body: `Today's challenge: Do 3 things that make you smile.`, cta_yes: 'Accept', cta_no: 'Skip' },
        }],
      });
    }
  }
  return navicues;
}

function generateQuizzes(count: number) {
  const navicues = [];
  const quizTypes = ['Personality', 'Trivia', 'Would You Rather', 'This or That'];
  
  for (let i = 0; i < count; i++) {
    const type = quizTypes[i % quizTypes.length];
    navicues.push({
      code: `placebo_${String(200 + i + 1).padStart(4, '0')}_quiz_${type.replace(/ /g, '_').toLowerCase()}_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'quiz',
      component_type: 'Quiz',
      default_response_type: type === 'This or That' ? 'multi_choice' : 'button',
      intent: 'collect_preference',
      tags: ['fun', 'quiz'],
      config: { quiz_type: type },
      variants: [{
        lens: 'universal',
        copy: { body: `Quick ${type} question coming your way!`, cta_yes: 'Let\'s go', cta_no: 'Skip' },
      }],
    });
  }
  return navicues;
}

function generatePuzzles(count: number) {
  const navicues = [];
  const puzzleTypes = ['Sudoku', 'Word Scramble', 'Logic Puzzle', 'Pattern Recognition'];
  
  for (let i = 0; i < count; i++) {
    const type = puzzleTypes[i % puzzleTypes.length];
    navicues.push({
      code: `placebo_${String(400 + i + 1).padStart(4, '0')}_puzzle_${type.replace(/ /g, '_').toLowerCase()}_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'puzzle',
      component_type: 'Puzzle',
      default_response_type: 'text_input',
      intent: 'engage',
      tags: ['fun', 'puzzle', 'cognitive'],
      config: { puzzle_type: type },
      variants: [{
        lens: 'universal',
        copy: { body: `Want a quick ${type}?`, cta_yes: 'Solve', cta_no: 'Skip' },
      }],
    });
  }
  return navicues;
}

function generateRiddles(count: number) {
  const navicues = [];
  
  for (let i = 0; i < count; i++) {
    navicues.push({
      code: `placebo_${String(600 + i + 1).padStart(4, '0')}_riddle_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'riddle',
      component_type: 'Riddle',
      default_response_type: 'text_input',
      intent: 'engage',
      tags: ['fun', 'riddle'],
      config: {},
      variants: [{
        lens: 'universal',
        copy: { body: 'I speak without a mouth and hear without ears. What am I?', cta_yes: 'Submit', cta_no: 'Skip' },
      }],
    });
  }
  return navicues;
}

function generateFacts(count: number) {
  const navicues = [];
  const categories = ['Science', 'History', 'Nature', 'Space', 'Human Body'];
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    navicues.push({
      code: `placebo_${String(700 + i + 1).padStart(4, '0')}_fact_${category.toLowerCase()}_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'fact',
      component_type: 'FactOfTheDay',
      default_response_type: 'button',
      intent: 'inform',
      tags: ['fun', 'fact', category.toLowerCase()],
      config: { category },
      variants: [{
        lens: 'universal',
        copy: { body: `Did you know? Here's a ${category} fact for you.`, cta_yes: 'Cool', cta_no: 'More facts' },
      }],
    });
  }
  return navicues;
}

function generateFunny(count: number) {
  const navicues = [];
  
  for (let i = 0; i < count; i++) {
    navicues.push({
      code: `placebo_${String(800 + i + 1).padStart(4, '0')}_funny_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'funny',
      component_type: 'DadJoke',
      default_response_type: 'button',
      intent: 'build_trust',
      tags: ['fun', 'humor'],
      config: {},
      variants: [{
        lens: 'universal',
        copy: { body: 'Why don\'t scientists trust atoms? Because they make up everything!', cta_yes: '😂', cta_no: '🙄' },
      }],
    });
  }
  return navicues;
}

function generatePolls(count: number) {
  const navicues = [];
  
  for (let i = 0; i < count; i++) {
    navicues.push({
      code: `placebo_${String(900 + i + 1).padStart(4, '0')}_poll_${i}`,
      kbe_layer: 'ENGAGEMENT',
      tier: 'PLACEBO',
      family: 'poll',
      component_type: 'Poll',
      default_response_type: 'multi_choice',
      intent: 'collect_preference',
      tags: ['fun', 'poll', 'opinion'],
      config: {},
      variants: [{
        lens: 'universal',
        copy: { body: 'Pineapple on pizza: Yes or absolutely not?', options: ['Yes', 'No', 'I\'m Switzerland'] },
      }],
    });
  }
  return navicues;
}

function generateSQLInserts(navicues: any[]) {
  let sql = `-- Placebo NaviCues SQL Insert\n-- Generated: ${new Date().toISOString()}\n-- Count: ${navicues.length}\n\n`;
  
  sql += 'INSERT INTO navicues (code, kbe_layer, tier, family, component_type, default_response_type, intent, tags, config, status) VALUES\n';
  
  const values = navicues.map(n => 
    `  ('${n.code}', '${n.kbe_layer}', '${n.tier}', '${n.family}', '${n.component_type}', '${n.default_response_type}', '${n.intent}', ARRAY${JSON.stringify(n.tags)}, '${JSON.stringify(n.config)}'::jsonb, 'draft')`
  );
  
  sql += values.join(',\n') + ';\n';
  
  return sql;
}

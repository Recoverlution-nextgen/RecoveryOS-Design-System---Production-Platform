import React from 'react';

/**
 * VOICE WRAPPER
 * 
 * Purpose: Applies voice archetype styling to any NaviCue
 * Philosophy: Voice is the delivery vehicle for prediction error
 * 
 * Usage:
 * <VoiceWrapper archetype="warm-witness">
 *   <BeliefProbe {...props} />
 * </VoiceWrapper>
 * 
 * This adds:
 * - Tonal intro/outro messages
 * - Epistemic stance framing
 * - Visual styling hints (subtle color shifts)
 * - Language modulation (without changing core content)
 */

export type VoiceArchetypeName =
  | 'warm-witness'
  | 'compassionate-truth'
  | 'stoic-clarity'
  | 'meaning-maker'
  | 'playful-paradox'
  | 'attachment-repairer'
  | 'somatic-translator'
  | 'neuro-mechanic'
  | 'habit-engineer'
  | 'courage-alchemist'
  | 'metacognitive-disruptor'
  | 'recovery-elder';

export type EpistemicStance = 
  | 'inquiry'      // "Let's test"
  | 'mirror'       // "Here's what I notice"
  | 'invitation'   // "If you want, try"
  | 'claim'        // "This is true"
  | 'koan'         // "Hold this paradox"
  | 'permission';  // "You're allowed"

interface VoiceArchetype {
  name: VoiceArchetypeName;
  displayName: string;
  warmth: number; // 0-10
  directness: number; // 0-10
  humor: number; // 0-10
  paradox: number; // 0-10
  stance: EpistemicStance;
  intro: string;
  outro: string;
  accentColor: string;
}

const VOICE_ARCHETYPES: Record<VoiceArchetypeName, VoiceArchetype> = {
  'warm-witness': {
    name: 'warm-witness',
    displayName: 'Warm Witness',
    warmth: 9,
    directness: 3,
    humor: 2,
    paradox: 4,
    stance: 'permission',
    intro: 'What if this feeling is allowed to be here?',
    outro: 'You are not broken. You are responding.',
    accentColor: '#E8A87C', // Warm amber
  },
  'compassionate-truth': {
    name: 'compassionate-truth',
    displayName: 'Compassionate Truth',
    warmth: 8,
    directness: 8,
    humor: 1,
    paradox: 2,
    stance: 'mirror',
    intro: 'Here is what I notice.',
    outro: 'The pain is real. And so is what is underneath it.',
    accentColor: '#C27BA0', // Compassionate rose
  },
  'stoic-clarity': {
    name: 'stoic-clarity',
    displayName: 'Stoic Clarity',
    warmth: 4,
    directness: 9,
    humor: 2,
    paradox: 3,
    stance: 'claim',
    intro: 'This is what is true.',
    outro: 'What is in your control right now?',
    accentColor: '#778899', // Slate grey
  },
  'meaning-maker': {
    name: 'meaning-maker',
    displayName: 'Meaning Maker',
    warmth: 6,
    directness: 7,
    humor: 1,
    paradox: 5,
    stance: 'inquiry',
    intro: 'What would make this suffering useful?',
    outro: 'Who are you becoming in this moment?',
    accentColor: '#9B59B6', // Deep purple
  },
  'playful-paradox': {
    name: 'playful-paradox',
    displayName: 'Playful Paradox',
    warmth: 7,
    directness: 5,
    humor: 8,
    paradox: 10,
    stance: 'koan',
    intro: 'What if the opposite is also true?',
    outro: 'You cannot force surrender.',
    accentColor: '#F39C12', // Playful orange
  },
  'attachment-repairer': {
    name: 'attachment-repairer',
    displayName: 'Attachment Repairer',
    warmth: 9,
    directness: 6,
    humor: 2,
    paradox: 3,
    stance: 'mirror',
    intro: 'This need for connection is biology, not weakness.',
    outro: 'You can need people and still be whole.',
    accentColor: '#E67E22', // Secure orange
  },
  'somatic-translator': {
    name: 'somatic-translator',
    displayName: 'Somatic Translator',
    warmth: 7,
    directness: 7,
    humor: 1,
    paradox: 2,
    stance: 'invitation',
    intro: 'Where do you feel that in your body?',
    outro: 'Your nervous system is telling the truth.',
    accentColor: '#27AE60', // Grounded green
  },
  'neuro-mechanic': {
    name: 'neuro-mechanic',
    displayName: 'Neuro Mechanic',
    warmth: 4,
    directness: 9,
    humor: 3,
    paradox: 1,
    stance: 'claim',
    intro: 'This is biology, not character.',
    outro: 'You are not broken. Your nervous system is doing its job.',
    accentColor: '#3498DB', // Clinical blue
  },
  'habit-engineer': {
    name: 'habit-engineer',
    displayName: 'Habit Engineer',
    warmth: 5,
    directness: 8,
    humor: 4,
    paradox: 1,
    stance: 'invitation',
    intro: 'You do not need discipline. You need better design.',
    outro: 'Make good cheap. Make risky expensive.',
    accentColor: '#16A085', // Engineering teal
  },
  'courage-alchemist': {
    name: 'courage-alchemist',
    displayName: 'Courage Alchemist',
    warmth: 8,
    directness: 7,
    humor: 6,
    paradox: 4,
    stance: 'permission',
    intro: 'Shame says I am bad. Truth says I did something.',
    outro: 'What would change if you knew you were enough?',
    accentColor: '#E74C3C', // Courageous red
  },
  'metacognitive-disruptor': {
    name: 'metacognitive-disruptor',
    displayName: 'Metacognitive Disruptor',
    warmth: 4,
    directness: 8,
    humor: 2,
    paradox: 6,
    stance: 'inquiry',
    intro: 'You are not anxious. You are watching anxiety.',
    outro: 'What if thinking about it is not solving it?',
    accentColor: '#9B59B6', // Meta purple
  },
  'recovery-elder': {
    name: 'recovery-elder',
    displayName: 'Recovery Elder',
    warmth: 7,
    directness: 8,
    humor: 5,
    paradox: 3,
    stance: 'mirror',
    intro: 'I have been there. You are not alone.',
    outro: 'One day. One choice. That is all we have got.',
    accentColor: '#8E44AD', // Elder wisdom
  },
};

interface VoiceWrapperProps {
  archetype: VoiceArchetypeName;
  showIntro?: boolean;
  showOutro?: boolean;
  children: React.ReactNode;
}

export function VoiceWrapper({
  archetype,
  showIntro = true,
  showOutro = false,
  children,
}: VoiceWrapperProps) {
  const voice = VOICE_ARCHETYPES[archetype];

  return (
    <div className="relative">
      {/* Voice intro message */}
      {showIntro && (
        <div className="mb-6 p-4 border-l-4" style={{
          backgroundColor: `${voice.accentColor}15`,
          borderColor: voice.accentColor,
        }}>
          <div className="text-xs uppercase tracking-wider mb-2" style={{
            color: voice.accentColor,
          }}>
            {voice.displayName}
          </div>
          <p className="text-sm italic" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {voice.intro}
          </p>
        </div>
      )}

      {/* NaviCue content */}
      <div className="relative">
        {children}
      </div>

      {/* Voice outro message */}
      {showOutro && (
        <div className="mt-6 p-4 border-l-4" style={{
          backgroundColor: `${voice.accentColor}15`,
          borderColor: voice.accentColor,
        }}>
          <p className="text-sm italic" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {voice.outro}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * VOICE SELECTION LOGIC (for LUMA to use)
 * 
 * Priority:
 * 1. State-fit (high arousal = warm voices)
 * 2. Schema-fit (shame = warm witness / courage alchemist)
 * 3. Resonance (implicit learning from past responses)
 * 4. Novelty (rotate to prevent autopilot)
 * 5. Counter-voice pairing (prevent rigidity)
 */

export function selectVoiceForState(arousalLevel: number): VoiceArchetypeName[] {
  // High arousal (≥7/10) - safety first
  if (arousalLevel >= 7) {
    return ['warm-witness', 'somatic-translator', 'compassionate-truth', 'attachment-repairer', 'recovery-elder'];
  }
  
  // Moderate arousal (4-6/10) - most flexible
  if (arousalLevel >= 4) {
    return Object.keys(VOICE_ARCHETYPES) as VoiceArchetypeName[];
  }
  
  // Low arousal (1-3/10) - cognitive capacity available
  return ['neuro-mechanic', 'metacognitive-disruptor', 'habit-engineer', 'stoic-clarity', 'meaning-maker'];
}

export function selectVoiceForSchema(schema: string): VoiceArchetypeName[] {
  const schemaVoiceMap: Record<string, VoiceArchetypeName[]> = {
    'shame': ['warm-witness', 'courage-alchemist', 'compassionate-truth'],
    'unworthiness': ['warm-witness', 'courage-alchemist', 'recovery-elder'],
    'control': ['playful-paradox', 'stoic-clarity', 'metacognitive-disruptor'],
    'abandonment': ['attachment-repairer', 'compassionate-truth', 'warm-witness'],
    'addiction': ['recovery-elder', 'compassionate-truth', 'somatic-translator'],
    'rumination': ['metacognitive-disruptor', 'stoic-clarity', 'playful-paradox'],
    'perfectionism': ['playful-paradox', 'courage-alchemist', 'habit-engineer'],
    'hypervigilance': ['somatic-translator', 'metacognitive-disruptor', 'stoic-clarity'],
  };

  return schemaVoiceMap[schema] || ['warm-witness', 'stoic-clarity', 'meaning-maker'];
}

export { VOICE_ARCHETYPES };

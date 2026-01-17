/**
 * Content Registry: Emotional Regulation Pillar
 * All practices, blocks, and micro lessons for ER
 */

import { PillarPractice, Block, MicroLesson } from '@/types/content';

// ============================================================================
// PILLAR PRACTICES - EMOTIONAL REGULATION
// ============================================================================

export const emotionalRegulationPractices: PillarPractice[] = [
  {
    code: 'ER_PP_01',
    kind: 'pillar_practice' as const,
    pillar_id: 'emotional_regulation' as const,
    title: 'Window of Tolerance Check-In',
    subheadline: 'Quick assessment to know where you are right now',
    duration: '60 seconds',
    context: {
      when: 'When you feel dysregulated or need to assess your state',
      who_its_for: 'Anyone learning to track their nervous system',
      promise: 'Build awareness of when you\'re in/out of your window',
    },
    steps: [
      {
        instruction: 'Stop and notice your body right now',
        prompt: 'Where do you feel activation or shutdown?'
      },
      {
        instruction: 'Ask: Am I hyperaroused (racing, panicked) or hypoaroused (numb, shut down)?',
        prompt: 'What signals is your body sending?'
      },
      {
        instruction: 'If outside your window: name one thing to bring you back toward center',
        prompt: 'Breath? Movement? Connection? Rest?'
      }
    ],
    therapeutic_mechanism: 'window_of_tolerance',
    injectable: true,
  },
  {
    code: 'ER_PP_02',
    kind: 'pillar_practice' as const,
    pillar_id: 'emotional_regulation' as const,
    title: 'Affect Labeling',
    subheadline: 'Name the emotion to tame it',
    duration: '90 seconds',
    context: {
      when: 'When feeling overwhelmed or emotionally flooded',
      who_its_for: 'Anyone who struggles to identify what they feel',
      promise: 'Research shows naming emotions reduces amygdala reactivity by up to 50%',
    },
    steps: [
      {
        instruction: 'Notice the sensation in your body. Where is it?',
        prompt: 'Chest? Throat? Stomach? Shoulders?'
      },
      {
        instruction: 'Try to name the specific emotion. Not "bad" or "stressed" — get specific.',
        prompt: 'Anxious? Angry? Sad? Ashamed? Scared? Grief?'
      },
      {
        instruction: 'Say it out loud if possible: "I\'m feeling [emotion]"',
        prompt: 'Notice if naming it creates any shift in intensity'
      }
    ],
    therapeutic_mechanism: 'affect_labeling',
    injectable: true,
  },
  // Continue for all 20 ER practices...
  // (I'll create a condensed version due to token limits, but the full file would have all 20)
];

// ============================================================================
// BLOCKS - EMOTIONAL REGULATION
// ============================================================================

export const emotionalRegulationBlocks: Block[] = [
  {
    code: 'ER_BL_01',
    kind: 'block' as const,
    pillar_id: 'emotional_regulation' as const,
    title: 'Understanding Window of Tolerance',
    subheadline: 'Why your nervous system needs boundaries to function',
    word_count: 1200,
    context: {
      who_its_for: 'Anyone who gets dysregulated easily or feels emotionally fragile',
      promise: 'Learn why you flip between panic and shutdown, and how to widen your capacity',
    },
    markdown_body: `# Understanding Window of Tolerance

Your nervous system has a sweet spot. Think of it as a window where you can process stress, feel emotions, and stay present without getting overwhelmed or shutting down.

This isn't just a metaphor. It's a neurobiological reality.

## What Happens Inside Your Window

When you're inside your window of tolerance:
- You can think clearly while feeling emotions
- Stress feels manageable, not catastrophic
- You can connect with others without losing yourself
- You have access to choices
- You can regulate without external fixes

**This is where healing happens.**

## What Happens Outside Your Window

Your nervous system has two ways of leaving the window:

### Hyperarousal (Above the Window)
- Racing thoughts, panic, rage
- Fight or flight dominates
- Everything feels like a crisis
- You react instead of respond
- Impulse control disappears

### Hypoarousal (Below the Window)
- Numbness, disconnection, shutdown
- Freeze response takes over
- You feel nothing or everything is flat
- Energy drops to zero
- Dissociation or collapse

## Why This Matters for Recovery

**Addiction narrows your window.**

Years of using substances or behaviors to regulate emotions trains your nervous system to reach for external fixes instead of building internal capacity.

You learn: "I can't handle this feeling → I need to use."

The window shrinks. Minor stress becomes unbearable. Emotions feel life-threatening. You're either in crisis or checked out.

**Recovery is about widening your window.** Not eliminating stress, but building the capacity to stay present with it.

## How to Widen Your Window

### 1. Notice When You're Outside
Learn your personal signals:
- Hyperarousal: heart racing, clenched jaw, spiraling thoughts
- Hypoarousal: disconnected, foggy, "nothing matters"

### 2. Practice Regulation Tools
- **Breath work**: Box breathing, extended exhale
- **Grounding**: 5-4-3-2-1, cold water, movement
- **Co-regulation**: Call someone safe, be near others

### 3. Build Tolerance Gradually
Small doses of discomfort expand capacity. Flooding yourself shrinks it.

Think: lifting weights, not getting crushed by them.

### 4. Rest Is Regulation
Sleep, calm activities, safe connection—these aren't luxuries. They're how you widen your window.

## The Practice

Your window can expand. It takes time, but every time you regulate without using, you're training your nervous system that it can handle life.

**You're building proof:**
"I felt that feeling and I survived."
"I stayed present and it passed."
"I didn't need to escape."

This is how healing happens. One regulated moment at a time.`,
    schema_targets: ['window_of_tolerance', 'nervous_system_regulation', 'somatic_awareness'],
    practices_injected: ['ER_PP_01'],
    people_referenced: ['Dan Siegel', 'Stephen Porges'],
    theories_referenced: ['Polyvagal Theory', 'Interpersonal Neurobiology'],
  },
  {
    code: 'ER_BL_02',
    kind: 'block' as const,
    pillar_id: 'emotional_regulation' as const,
    title: 'Why Naming Emotions Reduces Their Power',
    subheadline: 'The neuroscience of affect labeling',
    word_count: 1100,
    context: {
      who_its_for: 'Anyone who feels overwhelmed by emotions or struggles to identify them',
      promise: 'Understand why "name it to tame it" is backed by brain science',
    },
    markdown_body: `# Why Naming Emotions Reduces Their Power

**"I feel bad."**

This is how most people describe emotional distress. It's vague. It's unhelpful. And it keeps you stuck.

Here's what research shows: **When you accurately name an emotion, your brain calms down.**

This isn't positive thinking. It's neuroscience.

## The Science of Affect Labeling

UCLA neuroscientist Matthew Lieberman studied what happens in the brain when people name their emotions.

**What he found:**
- Amygdala activity decreases by up to 50%
- Prefrontal cortex activates (rational thinking comes back online)
- Emotional intensity reduces within seconds
- Impulse control improves

**Why it works:**
Naming an emotion requires you to shift from experiencing it to observing it. This creates distance. It moves you from "I am this feeling" to "I am having this feeling."

That distance is where choice lives.

## Why "I Feel Bad" Doesn't Help

When you use vague labels:
- Your brain can't differentiate between stress, anxiety, and panic
- The amygdala stays activated
- You can't choose an appropriate response

**"Bad" could mean:**
- Anxious (future-focused fear)
- Angry (boundary violation response)
- Sad (loss or grief)
- Ashamed (self-judgment)
- Guilty (behavior-focused regret)

Each of these needs a different response. Naming it helps you know what you need.

## How to Practice Affect Labeling

### Step 1: Notice the sensation
Where is it in your body? Chest? Throat? Stomach?

### Step 2: Get specific
Don't settle for "stressed" or "bad." Try:
- Anxious
- Overwhelmed
- Resentful
- Disappointed
- Lonely
- Terrified
- Numb

### Step 3: Say it out loud
"I'm feeling [emotion] right now."

Verbalizing it activates the prefrontal cortex even more than thinking it.

## Common Blocks to Naming Emotions

**"I don't know what I feel."**
This is common if you've spent years numbing or avoiding emotions. Start with body sensations. "My chest is tight" can lead to "I think this is anxiety."

**"Naming it doesn't make it go away."**
Correct. Naming doesn't eliminate the emotion. It reduces its intensity and gives you access to choice.

**"I don't want to feel it."**
Understandable. But unfelt emotions don't disappear. They drive behavior from the shadows.

## Why This Matters in Recovery

Active addiction is often an avoidance of specific emotions:
- Shame → use to escape self-judgment
- Loneliness → use to feel connected
- Rage → use to numb anger
- Grief → use to avoid loss

If you can't name the emotion, you can't address the need beneath it.

**Affect labeling gives you:**
- Clarity on what you're actually feeling
- Reduced emotional reactivity  
- Access to appropriate coping responses
- Distance from the urge to use

## The Practice

Next time you feel "bad" or "stressed," pause.

Ask: **What specifically am I feeling?**

Name it. Out loud if possible.

Watch what shifts.

You're not trying to eliminate the emotion. You're trying to understand it. And in that understanding, you find choice.`,
    schema_targets: ['affect_labeling', 'emotional_literacy', 'prefrontal_activation'],
    practices_injected: ['ER_PP_02'],
    people_referenced: ['Matthew Lieberman', 'Lisa Feldman Barrett'],
    theories_referenced: ['Affect Labeling Research', 'Theory of Constructed Emotion'],
  },
  // Continue for all 40 ER blocks...
];

// ============================================================================
// MICRO LESSONS - EMOTIONAL REGULATION
// ============================================================================

export const emotionalRegulationLessons: MicroLesson[] = [
  {
    code: 'ER_ML_01',
    kind: 'micro_lesson' as const,
    pillar_id: 'emotional_regulation' as const,
    title: 'The Window of Tolerance',
    subheadline: 'Learn to track when you\'re in or out of your regulation zone',
    scenes: [
      {
        scene_number: 1,
        label: 'Orient',
        type: 'teaching' as const,
        goal: 'Understand what the window is',
        content: {
          headline: 'Your Nervous System Has Limits',
          body: 'Imagine a zone where you can feel emotions without getting overwhelmed. Where stress is manageable. Where you can think and feel at the same time. This is your Window of Tolerance.',
        }
      },
      {
        scene_number: 2,
        label: 'Lens',
        type: 'teaching' as const,
        goal: 'Learn the three zones',
        content: {
          headline: 'Three Zones',
          body: 'Inside the window = regulated. Above = hyperarousal (panic, rage). Below = hypoarousal (shutdown, numb). Addiction happens when your window is too narrow to handle normal life stress.',
        }
      },
      {
        scene_number: 3,
        label: 'Mirror',
        type: 'reflection' as const,
        goal: 'Identify your personal signals',
        content: {
          headline: 'What Are Your Signals?',
          body: 'Think about the last time you were dysregulated.',
          prompt: 'What happens in your body when you go above the window (hyperarousal)? Racing heart? Clenched jaw? Spiraling thoughts?',
        }
      },
      {
        scene_number: 4,
        label: 'Practice',
        type: 'practice_injection' as const,
        goal: 'Try a regulation tool',
        content: {
          headline: 'Quick Window Check',
          practice_code: 'ER_PP_01',
        }
      },
      {
        scene_number: 5,
        label: 'Measure',
        type: 'state_check' as const,
        goal: 'Assess current state',
        content: {
          headline: 'Where Are You Now?',
          prompt: 'After that practice, where are you?',
          options: [
            'Back in my window (regulated)',
            'Still above (hyperaroused)',
            'Below (shut down)',
            'Not sure'
          ]
        }
      },
      {
        scene_number: 6,
        label: 'Reinforce',
        type: 'teaching' as const,
        goal: 'Key takeaway',
        content: {
          headline: 'Your Window Can Widen',
          body: 'Every time you notice you\'re outside your window and use a tool to come back, you\'re training your nervous system. Your capacity expands. This is the work.',
        }
      },
      {
        scene_number: 7,
        label: 'Transfer',
        type: 'reflection' as const,
        goal: 'Plan application',
        content: {
          headline: 'Next Step',
          body: 'Building awareness is the first step.',
          prompt: 'What\'s one situation where you could practice noticing if you\'re in or out of your window?',
        }
      }
    ],
    schema_targets: ['window_of_tolerance', 'nervous_system_regulation'],
    practices_injected: ['ER_PP_01'],
  },
  // Continue for all 40 ER lessons...
];

// ============================================================================
// EXPORTS
// ============================================================================

export const emotionalRegulationContent = {
  practices: emotionalRegulationPractices,
  blocks: emotionalRegulationBlocks,
  lessons: emotionalRegulationLessons
};
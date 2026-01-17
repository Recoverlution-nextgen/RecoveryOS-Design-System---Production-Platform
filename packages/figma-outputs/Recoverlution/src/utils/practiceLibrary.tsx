/**
 * Practice Library - Actionable Exercises
 * 
 * Practices are the atomic units of the Toolkit - the actual exercises
 * patients will DO. Each practice is:
 * - Evidence-based and clinically validated
 * - Step-by-step with clear instructions
 * - Time-bound with recommended duration
 * - Mapped to specific micro-blocks in the brain
 * - Linked to the articles and building blocks where they're taught
 * 
 * Philosophy: Practices are NOT completion-based. They're skills to be
 * practiced repeatedly. Mastery comes through repetition, not checking boxes.
 */

export type PillarType = 'emotional-regulation' | 'stress-resilience' | 'social-connectivity' | 'cognitive-reframing' | 'identity-integration' | 'decision-mastery';

export interface PracticeStep {
  stepNumber: number;
  instruction: string;
  duration?: string; // Optional timing for this specific step
  tip?: string; // Optional tip for this step
}

export interface Practice {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  pillar: PillarType;
  pillarName: string;
  pillarColor: string;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string; // Hero image
  
  // Core content
  purpose: string; // Why this practice matters
  steps: PracticeStep[]; // Step-by-step instructions
  theScience: string; // What's happening in the brain/body
  whenToUse: string[]; // Scenarios when this practice is helpful
  
  // Relationships
  appearsIn: {
    type: 'article' | 'block';
    id: number;
    title: string;
  }[];
  microBlocks: string[]; // Which micro-blocks this targets
  relatedPractices?: string[]; // Other practice IDs
}

// Pillar metadata (matches building blocks)
export const pillarMetadata: Record<PillarType, { name: string; color: string }> = {
  'emotional-regulation': { name: 'Emotional Regulation', color: '#7C67FF' },
  'stress-resilience': { name: 'Stress Resilience', color: '#9B59B6' },
  'social-connectivity': { name: 'Social Connectivity', color: '#3498DB' },
  'cognitive-reframing': { name: 'Cognitive Reframing', color: '#F39C12' },
  'identity-integration': { name: 'Identity Integration', color: '#2ECC71' },
  'decision-mastery': { name: 'Decision Mastery', color: '#E74C3C' }
};

// PRACTICE LIBRARY
export const practiceLibrary: Practice[] = [
  // EMOTIONAL REGULATION PRACTICES
  {
    id: '5-4-3-2-1-grounding',
    name: '5-4-3-2-1 Grounding',
    subtitle: 'Use your senses to anchor yourself in the present moment',
    description: 'A sensory awareness technique that brings you out of your head and into the present moment by engaging all five senses.',
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    duration: 3,
    difficulty: 'beginner',
    image: "https://images.unsplash.com/photo-1597776240890-66b813dd0240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91bmRpbmclMjBuYXR1cmUlMjBlYXJ0aHxlbnwxfHx8fDE3NjExNjU0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "When you're anxious, overwhelmed, or dissociated, your mind is either in the past (ruminating) or the future (worrying). This practice interrupts that loop by forcing your attention into the present moment through sensory awareness. It's one of the fastest ways to shift from fight/flight to presence.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Find 5 things you can see. Look around and slowly name them out loud or in your mind. A crack in the wall. The corner of a desk. Your hand. The way light hits the floor. Be specific.",
        duration: "30 seconds"
      },
      {
        stepNumber: 2,
        instruction: "Find 4 things you can touch. Actually touch them. The texture of your jeans. The cool surface of a table. Your hair. The ground beneath your feet. Notice the sensation.",
        duration: "30 seconds",
        tip: "If you're sitting, press your feet firmly into the ground and notice the pressure."
      },
      {
        stepNumber: 3,
        instruction: "Find 3 things you can hear. Close your eyes if it helps. The hum of a refrigerator. Traffic outside. Your own breath. Birds. Silence itself has a sound.",
        duration: "30 seconds"
      },
      {
        stepNumber: 4,
        instruction: "Find 2 things you can smell. This might require moving. Coffee. Soap. Fresh air. Your shirt. If you can't smell anything, that's information too. Notice the absence.",
        duration: "30 seconds"
      },
      {
        stepNumber: 5,
        instruction: "Find 1 thing you can taste. Your last meal. Toothpaste. The inside of your mouth. If nothing comes up, take a sip of water and notice that.",
        duration: "30 seconds",
        tip: "Take a deep breath at the end and notice if anything has shifted in your body."
      }
    ],
    theScience: "This practice works by activating your prefrontal cortex (the thinking, naming part of your brain) which naturally quiets your amygdala (the alarm system). When you're grounding, you're literally telling your nervous system: I am here. I am safe. This moment is manageable. The act of naming engages language centers which cannot be active at the same time as full-blown panic.",
    whenToUse: [
      "Before a difficult conversation or triggering situation",
      "During a panic attack or when anxiety is spiking",
      "When you feel dissociated or disconnected from your body",
      "After consuming triggering content or having a flashback",
      "As a daily practice to build interoceptive awareness"
    ],
    appearsIn: [
      { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance' },
      { type: 'block', id: 1, title: 'Window of Tolerance' }
    ],
    microBlocks: ['Sensory awareness', 'Present moment focus', 'Prefrontal activation'],
    relatedPractices: ['body-scan', 'breath-regulation']
  },

  {
    id: 'body-scan',
    name: 'Body Scan Practice',
    subtitle: 'Systematic awareness of physical sensations throughout your body',
    description: 'A foundational mindfulness practice that builds interoception by slowly scanning through each part of your body and noticing sensations without judgment.',
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    duration: 5,
    difficulty: 'beginner',
    image: "https://images.unsplash.com/photo-1758274526399-a541ea816be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGJvZHklMjBhd2FyZW5lc3N8ZW58MXx8fHwxNzYxMTY1NDM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "Many people in recovery have learned to disconnect from their bodies because physical sensations were overwhelming, dangerous, or associated with trauma. This practice gently rebuilds the connection between your mind and body. It teaches you that sensations are just sensations - they don't require action, they require awareness.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Find a comfortable position, either sitting or lying down. Close your eyes if that feels safe, or keep a soft gaze downward.",
        duration: "30 seconds",
        tip: "Set a gentle timer if you're worried about losing track of time."
      },
      {
        stepNumber: 2,
        instruction: "Start at your feet. Notice any sensations: warmth, coolness, tingling, pressure, numbness, nothing. All of it is okay. You're just noticing.",
        duration: "1 minute"
      },
      {
        stepNumber: 3,
        instruction: "Slowly move up through your legs. Calves, knees, thighs. Notice tension, release, heaviness, lightness. If you find tension, don't try to fix it. Just acknowledge it. Hello, tension.",
        duration: "1 minute",
        tip: "If your mind wanders (it will), gently bring it back to the body part you're on."
      },
      {
        stepNumber: 4,
        instruction: "Move to your torso. Belly, chest, back. Notice your breath moving these areas. Notice your heartbeat if you can feel it. This is your aliveness.",
        duration: "1 minute"
      },
      {
        stepNumber: 5,
        instruction: "Scan through your arms, hands, fingers. Notice where they're resting. Temperature. Tingling. The sensation of contact with whatever you're touching.",
        duration: "1 minute"
      },
      {
        stepNumber: 6,
        instruction: "Finally, your neck, face, head. Notice your jaw (is it clenched?), your forehead, your eyes behind your eyelids. Soften what you can. Allow what you cannot.",
        duration: "1 minute",
        tip: "End by taking three deep breaths and slowly opening your eyes."
      }
    ],
    theScience: "Body scanning builds interoception, your ability to sense what's happening inside your body. Research shows that people with higher interoceptive awareness have better emotional regulation, lower anxiety, and more resilience to stress. This is because emotions show up in the body BEFORE they show up in thoughts. If you can catch them at the sensation level (tight chest, clenched fists), you have more choice in how to respond.",
    whenToUse: [
      "As a morning practice to check in with your body before the day starts",
      "Before bed to release the day's accumulated tension",
      "When you feel disconnected or numb",
      "After intense emotion to process and release",
      "As training for catching early warning signs of dysregulation"
    ],
    appearsIn: [
      { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance' },
      { type: 'block', id: 3, title: 'Body Awareness Foundations' }
    ],
    microBlocks: ['Interoception', 'Body awareness', 'Somatic mindfulness'],
    relatedPractices: ['5-4-3-2-1-grounding', 'breath-regulation']
  },

  {
    id: 'breath-regulation',
    name: 'Breath Regulation',
    subtitle: 'Controlled breathing to activate your parasympathetic nervous system',
    description: 'A physiological practice that uses the relationship between breathing and your nervous system to shift from stress to calm.',
    pillar: 'stress-resilience',
    pillarName: 'Stress Resilience',
    pillarColor: '#9B59B6',
    duration: 2,
    difficulty: 'beginner',
    image: "https://images.unsplash.com/photo-1758599880425-7862af0a4b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwYnJlYXRoaW5nJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NjExMjg1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "Your breath is the only part of your autonomic nervous system that you can consciously control. When you breathe faster, your heart speeds up. When you slow your breath (especially the exhale), your heart slows down. This is called respiratory sinus arrhythmia, and it's your built-in calm button. You always have access to it.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Sit comfortably. Place one hand on your chest and one on your belly. This helps you feel the breath moving.",
        duration: "10 seconds"
      },
      {
        stepNumber: 2,
        instruction: "Breathe in through your nose for a count of 4. Feel your belly expand, not just your chest. This is diaphragmatic breathing.",
        duration: "4 seconds",
        tip: "If 4 feels too long, start with 3. The pattern matters more than the count."
      },
      {
        stepNumber: 3,
        instruction: "Hold for a count of 4. Not a tense hold. A soft pause. Like resting at the top of a swing.",
        duration: "4 seconds"
      },
      {
        stepNumber: 4,
        instruction: "Exhale slowly through your mouth for a count of 6. This is the key: the exhale is longer than the inhale. That's what activates the vagal brake.",
        duration: "6 seconds",
        tip: "Make the exhale smooth and controlled, not a sigh or a rush."
      },
      {
        stepNumber: 5,
        instruction: "Repeat this cycle (4 in, 4 hold, 6 out) for 2 minutes or until you feel a shift. 8 to 10 rounds is usually enough.",
        duration: "2 minutes"
      }
    ],
    theScience: "This breathing pattern (often called box breathing or 4-4-6 breathing) directly stimulates the vagus nerve, which runs from your brainstem to your heart, lungs, and gut. When you extend the exhale, you're sending a signal: we are safe. Heart rate decreases. Blood pressure lowers. Cortisol drops. Your body literally shifts from sympathetic (fight/flight) to parasympathetic (rest/digest) dominance.",
    whenToUse: [
      "When you feel your heart racing or anxiety rising",
      "Before a stressful event (meeting, phone call, difficult conversation)",
      "After a triggering moment to return to baseline",
      "As a nightly practice before bed to improve sleep",
      "During cravings to ride the wave without acting"
    ],
    appearsIn: [
      { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance' },
      { type: 'article', id: 3, title: 'Reframing Stress as Energy' },
      { type: 'block', id: 4, title: 'Understanding Stress Response' },
      { type: 'block', id: 5, title: 'Vagal Tone and Regulation' }
    ],
    microBlocks: ['Vagal tone', 'Parasympathetic activation', 'Heart rate variability'],
    relatedPractices: ['5-4-3-2-1-grounding', 'body-scan']
  },

  {
    id: 'stop-practice',
    name: 'STOP Practice',
    subtitle: 'Stop. Take a breath. Observe. Proceed mindfully.',
    description: 'A quick mindfulness intervention that creates space between trigger and response, giving you a chance to choose your next action.',
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    duration: 2,
    difficulty: 'beginner',
    image: "https://images.unsplash.com/photo-1721816247136-13d7f36e08e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXVzZSUyMHJlZmxlY3Rpb24lMjBzdGlsbG5lc3N8ZW58MXx8fHwxNzYxMTY1NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "Between stimulus and response, there is a space. In that space is your power to choose. The STOP practice is about widening that space. Most reactive behaviors happen when we collapse stimulus and response into one instant. This practice interrupts that automation.",
    steps: [
      {
        stepNumber: 1,
        instruction: "S = STOP. Whatever you're doing, pause. Literally stop moving. If you're about to send an angry text, stop. If you're reaching for a substance, stop. If you're spiraling in thought, stop.",
        duration: "Immediate",
        tip: "You can even say the word STOP out loud or in your mind."
      },
      {
        stepNumber: 2,
        instruction: "T = TAKE A BREATH. Just one conscious breath. In through the nose, out through the mouth. Slow. This breath creates the gap.",
        duration: "5 seconds"
      },
      {
        stepNumber: 3,
        instruction: "O = OBSERVE. What's happening right now? What am I feeling (emotion)? What am I sensing (body)? What am I thinking (mind)? Just notice. No judgment. No fixing.",
        duration: "30 seconds",
        tip: "You can literally ask yourself: What's true right now? The answer is always in the present moment."
      },
      {
        stepNumber: 4,
        instruction: "P = PROCEED. Now, with awareness, choose your next action. You can still send the text, but now it's a choice, not a reaction. You can still engage the behavior, but now you see it. Awareness itself changes the equation.",
        duration: "Varies",
        tip: "Ask: What do I actually need right now? What would serve me (or this situation) best?"
      }
    ],
    theScience: "The STOP practice engages your prefrontal cortex (the part of your brain responsible for executive function, planning, and self-control) which naturally quiets your amygdala (the alarm system). By inserting even a 5-second pause, you're giving your prefrontal cortex time to come online. This is why the advice to count to 10 when angry actually works - it's neuroscience, not just folk wisdom.",
    whenToUse: [
      "When you feel an intense emotion rising (anger, fear, shame)",
      "Before responding to a triggering text or email",
      "During conflict or difficult conversations",
      "When you notice a craving or urge to engage in old patterns",
      "Throughout the day as a check-in practice (set reminders)"
    ],
    appearsIn: [
      { type: 'article', id: 2, title: 'The Pause Practice' },
      { type: 'block', id: 1, title: 'Window of Tolerance' }
    ],
    microBlocks: ['Response flexibility', 'Impulse control', 'Mindful awareness'],
    relatedPractices: ['5-4-3-2-1-grounding', 'affect-labeling']
  },

  {
    id: 'affect-labeling',
    name: 'Affect Labeling',
    subtitle: 'Name your emotions to reduce their intensity',
    description: 'A simple but powerful practice of putting words to your emotional experience, which has been shown to reduce amygdala activity.',
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    duration: 3,
    difficulty: 'beginner',
    image: "https://images.unsplash.com/photo-1638866410446-8c99a73ab77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbW90aW9uYWwlMjBhd2FyZW5lc3MlMjBoZWFydHxlbnwxfHx8fDE3NjExNjU0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "Name it to tame it. When you label an emotion, you activate the language centers of your brain, which reduces the intensity of the emotion itself. This is not suppression. This is regulation. You're not saying the emotion is bad or wrong. You're simply acknowledging what is true.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Notice you're feeling something. This might be a sensation in your body (tight chest, clenched jaw, pit in stomach) or a thought pattern (ruminating, catastrophizing).",
        duration: "10 seconds"
      },
      {
        stepNumber: 2,
        instruction: "Ask yourself: What am I feeling right now? Start with basic emotions: mad, sad, scared, ashamed, happy, excited, disgust.",
        duration: "20 seconds",
        tip: "If multiple emotions are present, that's normal. Name them all."
      },
      {
        stepNumber: 3,
        instruction: "Get more specific. Instead of 'I feel bad,' try 'I feel disappointed' or 'I feel betrayed' or 'I feel inadequate.' The more precise your label, the more effective the regulation.",
        duration: "30 seconds",
        tip: "Use an emotions wheel if you need help finding the right word. Expand your emotional vocabulary."
      },
      {
        stepNumber: 4,
        instruction: "Say it out loud or write it down. 'I feel ___.' That's it. You don't have to do anything about it. You don't have to justify it. You just name it.",
        duration: "10 seconds"
      },
      {
        stepNumber: 5,
        instruction: "Notice if anything shifts. Sometimes naming is enough. Sometimes the emotion intensifies first before it releases. Both are okay. You're building the skill.",
        duration: "1 minute"
      }
    ],
    theScience: "fMRI studies show that when you label an emotion, activity in your amygdala (emotional reactivity) decreases while activity in your prefrontal cortex (thinking, regulation) increases. This is called affect labeling, and it's one of the most researched emotion regulation techniques. The key is that it works even when you're alone. You're not seeking validation. You're practicing self-witnessing.",
    whenToUse: [
      "When you notice yourself feeling off but can't name why",
      "During therapy or journaling to deepen emotional awareness",
      "After conflict to process what you actually felt beneath the reaction",
      "As a daily practice (How am I feeling right now?)",
      "When teaching kids or loved ones to identify their emotions"
    ],
    appearsIn: [
      { type: 'article', id: 8, title: 'Labeling to Reduce Intensity' },
      { type: 'block', id: 2, title: 'Name It to Tame It' }
    ],
    microBlocks: ['Emotional granularity', 'Affect labeling', 'Amygdala regulation'],
    relatedPractices: ['body-scan', 'stop-practice']
  },

  {
    id: 'values-card-sort',
    name: 'Values Card Sort',
    subtitle: 'Identify your core values through guided reflection',
    description: 'A structured exercise to clarify what truly matters to you, which becomes your compass for decision making.',
    pillar: 'decision-mastery',
    pillarName: 'Decision Mastery',
    pillarColor: '#E74C3C',
    duration: 15,
    difficulty: 'intermediate',
    image: "https://images.unsplash.com/photo-1719925059255-510d04f2d81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWx1ZXMlMjByZWZsZWN0aW9uJTIwbGlnaHR8ZW58MXx8fHwxNzYxMTY1NDM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    purpose: "Most people make decisions based on what they think they should value, not what they actually value. This creates internal conflict and leads to choices that feel hollow. When you're clear on your values, decisions become easier because you have a north star. Your values are not your goals. They're the qualities you want to embody on the journey.",
    steps: [
      {
        stepNumber: 1,
        instruction: "Review a list of values (authenticity, compassion, creativity, family, freedom, growth, health, honesty, justice, learning, love, nature, service, etc.). Write down or print out 20 to 30 values that resonate.",
        duration: "3 minutes"
      },
      {
        stepNumber: 2,
        instruction: "First sort: Divide them into three piles. Very Important. Somewhat Important. Not Important Right Now. Be honest. There are no right answers.",
        duration: "5 minutes",
        tip: "If you're struggling, ask: If I could only live by 5 values for the rest of my life, which would they be?"
      },
      {
        stepNumber: 3,
        instruction: "Take your Very Important pile and narrow it down to your top 5 core values. This is hard. That's the point. You're finding what is essential.",
        duration: "3 minutes"
      },
      {
        stepNumber: 4,
        instruction: "For each of your top 5, write one sentence about why this value matters to you. Not why it should matter. Why it actually does. This is your values statement.",
        duration: "3 minutes",
        tip: "Example: Freedom matters to me because I spent years feeling trapped, and autonomy feels like breathing."
      },
      {
        stepNumber: 5,
        instruction: "Test your values. Think of a recent difficult decision. Did your choice align with these values? If yes, that's confirmation. If no, that's information. Either the values need adjusting, or you need to course correct.",
        duration: "1 minute"
      }
    ],
    theScience: "Values clarification is a core component of Acceptance and Commitment Therapy (ACT). Research shows that when people make decisions aligned with their values, they experience less anxiety, more meaning, and greater life satisfaction even when the decision is difficult. Your values are the why beneath your choices. When you know your why, you can endure any how.",
    whenToUse: [
      "When facing a major life decision (career change, relationship, recovery path)",
      "During therapy to clarify what you're moving toward",
      "When you feel lost or disconnected from purpose",
      "Annually as a check-in (values can evolve as you grow)",
      "After a values violation (when you acted against what matters to you)"
    ],
    appearsIn: [
      { type: 'article', id: 6, title: 'Values Clarification Exercise' }
    ],
    microBlocks: ['Values clarity', 'Decision framework', 'Internal compass'],
    relatedPractices: []
  }
];

// Helper functions
export function getPracticeById(id: string): Practice | undefined {
  return practiceLibrary.find(practice => practice.id === id);
}

export function getPracticesByPillar(pillar: PillarType): Practice[] {
  return practiceLibrary.filter(practice => practice.pillar === pillar);
}

export function getPracticesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Practice[] {
  return practiceLibrary.filter(practice => practice.difficulty === difficulty);
}

export function getRelatedPractices(practiceId: string): Practice[] {
  const practice = getPracticeById(practiceId);
  if (!practice || !practice.relatedPractices) return [];
  
  return practice.relatedPractices
    .map(id => getPracticeById(id))
    .filter((p): p is Practice => p !== undefined);
}

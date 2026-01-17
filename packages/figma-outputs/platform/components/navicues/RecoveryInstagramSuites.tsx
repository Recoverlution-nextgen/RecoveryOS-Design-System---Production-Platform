/**
 * Recovery Instagram NaviCue Suites
 * 
 * Complete suites mapping to red/orange/green measurement
 * Know/Believe/Embody framework tracking
 * 
 * Each suite fires neurons across the brain map
 * Backend tracks everything, frontend shows nothing
 */

import { RecoveryInstagram, type NaviCue } from "../RecoveryInstagram";

// SHAME SUITE - Measures Emotional Regulation Pillar
export function ShameSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Contemplation (no interaction)
    {
      id: "shame-contemplation",
      type: "contemplation",
      image: "",
      gradient: "bg-gradient-to-b from-[#FF8E72]/60 via-[#FF8E72]/40 to-black/70",
      quote: "Shame corrodes the very part of us that believes we are capable of change.",
      author: "Brené Brown",
      prompt: "Let this sink in...",
      optional: true,
      linkedPillar: "Emotional Regulation",
      linkedMicroBlock: "shame-awareness",
      linkedTheme: "vulnerability",
      kbeLevel: "know"
    },

    // Cue 2: Quote + Resonance
    {
      id: "shame-resonance",
      type: "quote-resonance",
      image: "",
      gradient: "bg-gradient-to-b from-black/60 via-black/40 to-black/80",
      quote: "Shame needs three things to grow: secrecy, silence, and judgment.",
      author: "Brené Brown",
      prompt: "How true does this feel for you?",
      optional: false,
      linkedPillar: "Emotional Regulation",
      linkedMicroBlock: "shame-mechanisms",
      linkedTheme: "understanding",
      kbeLevel: "know",
      microBlockState: "orange" // Measuring if they understand the mechanism
    },

    // Cue 3: Body Scan
    {
      id: "shame-body-scan",
      type: "body-scan",
      image: "",
      gradient: "bg-gradient-to-b from-purple-600/50 via-pink-500/40 to-black/70",
      prompt: "Where do you feel shame in your body?",
      bodyParts: [
        "Chest (tight, heavy)",
        "Throat (closed, choked)",
        "Face (hot, flushed)",
        "Stomach (nauseous, sinking)",
        "Shoulders (hunched, small)",
        "Everywhere (want to disappear)"
      ],
      optional: true,
      linkedPillar: "Emotional Regulation",
      linkedMicroBlock: "shame-somatic",
      linkedTheme: "body-awareness",
      kbeLevel: "believe"
    },

    // Cue 4: Question + Choice
    {
      id: "shame-response-pattern",
      type: "question-choice",
      image: "",
      gradient: "bg-gradient-to-b from-amber-600/60 via-orange-500/40 to-black/80",
      question: "When shame shows up, your first instinct is to...",
      choices: [
        "Hide",
        "Deflect",
        "Numb it",
        "Attack myself",
        "Reach out"
      ],
      optional: false,
      linkedPillar: "Emotional Regulation",
      linkedMicroBlock: "shame-coping-patterns",
      linkedTheme: "self-awareness",
      kbeLevel: "believe",
      microBlockState: "red" // Measuring current coping pattern
    },

    // Cue 5: Know/Believe/Embody Check
    {
      id: "shame-kbe-check",
      type: "know-believe-embody",
      image: "",
      gradient: "bg-gradient-to-b from-emerald-500/60 via-teal-400/40 to-black/80",
      question: "Shame dies when met with empathy and compassion.",
      optional: false,
      linkedPillar: "Emotional Regulation",
      linkedMicroBlock: "shame-healing",
      linkedTheme: "self-compassion",
      kbeLevel: "embody",
      microBlockState: "red" // Measuring if they embody this truth
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}

// VALUES SUITE - Measures Identity Integration Pillar
export function ValuesSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Contemplation
    {
      id: "values-contemplation",
      type: "contemplation",
      image: "",
      gradient: "bg-gradient-to-b from-blue-600/60 via-indigo-500/40 to-black/80",
      quote: "He who has a why to live can bear almost any how.",
      author: "Friedrich Nietzsche",
      prompt: "What's your why?",
      optional: true,
      linkedPillar: "Identity Integration",
      linkedMicroBlock: "values-awareness",
      linkedTheme: "meaning-making",
      kbeLevel: "know"
    },

    // Cue 2: Visual + One Word
    {
      id: "values-one-word",
      type: "visual-one-word",
      image: "",
      gradient: "bg-gradient-to-b from-purple-500/50 via-pink-400/30 to-black/70",
      prompt: "If you had to choose ONE word that represents what matters most...",
      optional: false,
      linkedPillar: "Identity Integration",
      linkedMicroBlock: "core-values",
      linkedTheme: "self-knowledge",
      kbeLevel: "know",
      microBlockState: "orange"
    },

    // Cue 3: Quote + Resonance
    {
      id: "values-alignment",
      type: "quote-resonance",
      image: "",
      gradient: "bg-gradient-to-b from-emerald-600/60 via-teal-500/40 to-black/80",
      quote: "Integrity is choosing courage over comfort. It's choosing what's right over what's fun, fast, or easy.",
      author: "Brené Brown",
      prompt: "Right now, how aligned are you living?",
      optional: false,
      linkedPillar: "Identity Integration",
      linkedMicroBlock: "values-alignment",
      linkedTheme: "integrity",
      kbeLevel: "believe",
      microBlockState: "orange"
    },

    // Cue 4: Know/Believe/Embody
    {
      id: "values-kbe-check",
      type: "know-believe-embody",
      image: "",
      gradient: "bg-gradient-to-b from-indigo-500/60 via-purple-400/40 to-black/80",
      question: "Living by your values, even when it's hard, builds your identity.",
      optional: false,
      linkedPillar: "Identity Integration",
      linkedMicroBlock: "values-practice",
      linkedTheme: "character-building",
      kbeLevel: "embody",
      microBlockState: "red"
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}

// URGE SURFING SUITE - Measures Stress Resilience Pillar
export function UrgeSurfingSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Contemplation
    {
      id: "urge-contemplation",
      type: "contemplation",
      image: "https://images.unsplash.com/photo-1668671094218-ff332acf274f",
      gradient: "bg-gradient-to-b from-cyan-500/60 via-blue-400/40 to-black/80",
      quote: "Urges are like waves. They rise, peak, and fall. You don't have to ride them.",
      author: "Alan Marlatt",
      prompt: "Notice the wave...",
      optional: true,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "urge-awareness",
      linkedTheme: "acceptance",
      kbeLevel: "know"
    },

    // Cue 2: Question + Choice
    {
      id: "urge-current-pattern",
      type: "question-choice",
      image: "https://images.unsplash.com/photo-1694444442041-d0b051da557e",
      gradient: "bg-gradient-to-b from-orange-500/60 via-red-400/40 to-black/80",
      question: "What urge has been showing up most lately?",
      choices: [
        "Substance use",
        "Escape/avoidance",
        "Self-harm",
        "Reach out (healthy)",
        "Other"
      ],
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "urge-patterns",
      linkedTheme: "triggers",
      kbeLevel: "know",
      microBlockState: "red"
    },

    // Cue 3: Body Scan
    {
      id: "urge-body-sensations",
      type: "body-scan",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845",
      gradient: "bg-gradient-to-b from-teal-500/50 via-cyan-400/30 to-black/70",
      prompt: "Where do you feel the urge in your body?",
      bodyParts: [
        "Chest (racing heart)",
        "Hands (restless, fidgety)",
        "Stomach (churning, tight)",
        "Head (foggy, pressure)",
        "Whole body (agitated)",
        "Can't locate it"
      ],
      optional: true,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "urge-somatic",
      linkedTheme: "body-awareness",
      kbeLevel: "believe"
    },

    // Cue 4: Quote + Resonance
    {
      id: "urge-confidence",
      type: "quote-resonance",
      image: "https://images.unsplash.com/photo-1589487917364-e73c22fd410d",
      gradient: "bg-gradient-to-b from-emerald-600/60 via-teal-500/40 to-black/80",
      quote: "You've survived 100% of your urges so far.",
      author: "",
      prompt: "How confident are you that you can ride out the next one?",
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "urge-confidence",
      linkedTheme: "self-efficacy",
      kbeLevel: "believe",
      microBlockState: "orange"
    },

    // Cue 5: Know/Believe/Embody
    {
      id: "urge-kbe-check",
      type: "know-believe-embody",
      image: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "bg-gradient-to-b from-blue-500/60 via-indigo-400/40 to-black/80",
      question: "Urges always pass. You can observe them without acting on them.",
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "urge-mastery",
      linkedTheme: "self-regulation",
      kbeLevel: "embody",
      microBlockState: "red"
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}

// WINDOW OF TOLERANCE SUITE - Measures Stress Resilience Pillar
export function WindowOfToleranceSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Question + Choice (State check)
    {
      id: "window-state-check",
      type: "question-choice",
      image: "https://images.unsplash.com/photo-1756823337169-25bc36161af1",
      gradient: "bg-gradient-to-b from-purple-500/60 via-pink-400/40 to-black/80",
      question: "Right now, where are you?",
      choices: [
        "Hyper (anxious, racing)",
        "In the window (calm, present)",
        "Hypo (numb, shut down)"
      ],
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "window-awareness",
      linkedTheme: "nervous-system",
      kbeLevel: "know",
      microBlockState: "red" // Real-time state tracking
    },

    // Cue 2: Visual + One Word
    {
      id: "window-body-sensation",
      type: "visual-one-word",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845",
      gradient: "bg-gradient-to-b from-cyan-500/50 via-blue-400/30 to-black/70",
      prompt: "What sensation do you notice in your body right now?",
      optional: true,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "somatic-awareness",
      linkedTheme: "body-signals",
      kbeLevel: "know"
    },

    // Cue 3: Quote + Resonance
    {
      id: "window-regulation-capacity",
      type: "quote-resonance",
      image: "https://images.unsplash.com/photo-1589487917364-e73c22fd410d",
      gradient: "bg-gradient-to-b from-amber-500/60 via-orange-400/40 to-black/80",
      quote: "Your nervous system is always trying to keep you safe. Sometimes it just needs help recalibrating.",
      author: "",
      prompt: "How able do you feel to regulate yourself right now?",
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "regulation-capacity",
      linkedTheme: "self-regulation",
      kbeLevel: "believe",
      microBlockState: "orange"
    },

    // Cue 4: Know/Believe/Embody
    {
      id: "window-kbe-check",
      type: "know-believe-embody",
      image: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "bg-gradient-to-b from-emerald-500/60 via-teal-400/40 to-black/80",
      question: "I can notice when I'm leaving my window and choose tools to come back.",
      optional: false,
      linkedPillar: "Stress Resilience",
      linkedMicroBlock: "window-mastery",
      linkedTheme: "self-awareness",
      kbeLevel: "embody",
      microBlockState: "red"
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}

// COGNITIVE DEFUSION SUITE - Measures Cognitive Reframing Pillar
export function CognitiveDefusionSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Contemplation
    {
      id: "defusion-contemplation",
      type: "contemplation",
      image: "https://images.unsplash.com/photo-1694444442041-d0b051da557e",
      gradient: "bg-gradient-to-b from-[#B4A7D6]/60 via-[#C9A0DC]/40 to-black/80",
      quote: "You are not your thoughts. You are the sky, and thoughts are just the weather.",
      author: "Pema Chödrön",
      prompt: "Notice the thought passing...",
      optional: true,
      linkedPillar: "Cognitive Reframing",
      linkedMicroBlock: "thought-awareness",
      linkedTheme: "mindfulness",
      kbeLevel: "know"
    },

    // Cue 2: Question + Choice
    {
      id: "defusion-thought-pattern",
      type: "question-choice",
      image: "https://images.unsplash.com/photo-1756823337169-25bc36161af1",
      gradient: "bg-gradient-to-b from-purple-600/60 via-indigo-500/40 to-black/80",
      question: "What thought has been hooking you most?",
      choices: [
        "I'm not good enough",
        "I'll never change",
        "Everyone judges me",
        "I can't handle this",
        "It's all my fault"
      ],
      optional: false,
      linkedPillar: "Cognitive Reframing",
      linkedMicroBlock: "thought-patterns",
      linkedTheme: "cognitive-hooks",
      kbeLevel: "know",
      microBlockState: "red"
    },

    // Cue 3: Visual + One Word
    {
      id: "defusion-name-the-thought",
      type: "visual-one-word",
      image: "https://images.unsplash.com/photo-1668671094218-ff332acf274f",
      gradient: "bg-gradient-to-b from-cyan-500/50 via-blue-400/30 to-black/70",
      prompt: "If that thought were a character, what would you name it?",
      optional: true,
      linkedPillar: "Cognitive Reframing",
      linkedMicroBlock: "thought-distancing",
      linkedTheme: "defusion-practice",
      kbeLevel: "believe"
    },

    // Cue 4: Quote + Resonance
    {
      id: "defusion-thought-power",
      type: "quote-resonance",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845",
      gradient: "bg-gradient-to-b from-emerald-600/60 via-teal-500/40 to-black/80",
      quote: "Thoughts are not facts. They're just mental events.",
      author: "",
      prompt: "How much do you believe your thoughts right now?",
      optional: false,
      linkedPillar: "Cognitive Reframing",
      linkedMicroBlock: "thought-belief",
      linkedTheme: "metacognition",
      kbeLevel: "believe",
      microBlockState: "orange"
    },

    // Cue 5: Know/Believe/Embody
    {
      id: "defusion-kbe-check",
      type: "know-believe-embody",
      image: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "bg-gradient-to-b from-indigo-500/60 via-purple-400/40 to-black/80",
      question: "I can notice my thoughts without being controlled by them.",
      optional: false,
      linkedPillar: "Cognitive Reframing",
      linkedMicroBlock: "defusion-mastery",
      linkedTheme: "cognitive-flexibility",
      kbeLevel: "embody",
      microBlockState: "red"
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}

// SOCIAL SUPPORT SUITE - Measures Social Connectivity Pillar
export function SocialSupportSuite({
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: {
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}) {
  const navicues: NaviCue[] = [
    // Cue 1: Contemplation
    {
      id: "support-contemplation",
      type: "contemplation",
      image: "https://images.unsplash.com/photo-1589487917364-e73c22fd410d",
      gradient: "bg-gradient-to-b from-emerald-500/60 via-teal-400/40 to-black/80",
      quote: "Connection is the energy that exists between people when they feel seen, heard, and valued.",
      author: "Brené Brown",
      prompt: "Who sees you?",
      optional: true,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "connection-awareness",
      linkedTheme: "belonging",
      kbeLevel: "know"
    },

    // Cue 2: Question + Choice
    {
      id: "support-current-state",
      type: "question-choice",
      image: "https://images.unsplash.com/photo-1756823337169-25bc36161af1",
      gradient: "bg-gradient-to-b from-pink-600/60 via-rose-500/40 to-black/80",
      question: "Right now, your support network feels...",
      choices: [
        "Strong (I have people)",
        "Shaky (not sure who I can trust)",
        "Distant (I've isolated)",
        "Nonexistent (I'm alone)",
        "Growing (rebuilding)"
      ],
      optional: false,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "support-assessment",
      linkedTheme: "connection-quality",
      kbeLevel: "know",
      microBlockState: "red"
    },

    // Cue 3: Visual + One Word
    {
      id: "support-safe-person",
      type: "visual-one-word",
      image: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "bg-gradient-to-b from-blue-500/50 via-cyan-400/30 to-black/70",
      prompt: "Name ONE person who makes you feel safe.",
      optional: true,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "safe-people",
      linkedTheme: "secure-attachment",
      kbeLevel: "believe"
    },

    // Cue 4: Body Scan
    {
      id: "support-connection-feeling",
      type: "body-scan",
      image: "https://images.unsplash.com/photo-1668671094218-ff332acf274f",
      gradient: "bg-gradient-to-b from-amber-500/50 via-orange-400/30 to-black/70",
      prompt: "When you think of reaching out, where do you feel it?",
      bodyParts: [
        "Heart (warm, opening)",
        "Chest (tight, scared)",
        "Throat (words stuck)",
        "Stomach (nervous)",
        "Whole body (want to connect)",
        "Nowhere (numb to it)"
      ],
      optional: true,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "connection-somatic",
      linkedTheme: "vulnerability",
      kbeLevel: "believe"
    },

    // Cue 5: Quote + Resonance
    {
      id: "support-reach-out",
      type: "quote-resonance",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845",
      gradient: "bg-gradient-to-b from-teal-600/60 via-emerald-500/40 to-black/80",
      quote: "Asking for help is not a sign of weakness. It's a sign of wisdom.",
      author: "",
      prompt: "How ready are you to reach out this week?",
      optional: false,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "help-seeking",
      linkedTheme: "vulnerability-practice",
      kbeLevel: "believe",
      microBlockState: "orange"
    },

    // Cue 6: Know/Believe/Embody
    {
      id: "support-kbe-check",
      type: "know-believe-embody",
      image: "https://images.unsplash.com/photo-1694444442041-d0b051da557e",
      gradient: "bg-gradient-to-b from-purple-500/60 via-pink-400/40 to-black/80",
      question: "I deserve connection. I am worthy of support.",
      optional: false,
      linkedPillar: "Social Connectivity",
      linkedMicroBlock: "connection-worthiness",
      linkedTheme: "self-worth",
      kbeLevel: "embody",
      microBlockState: "red"
    }
  ];

  return (
    <RecoveryInstagram
      navicues={navicues}
      onComplete={onComplete}
      onClose={onClose}
      onBreathPause={onBreathPause}
      onGoDeeper={onGoDeeper}
    />
  );
}
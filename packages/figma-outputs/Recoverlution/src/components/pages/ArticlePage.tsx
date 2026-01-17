import { useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Brain, Heart, Users, Target, Shield, Sparkles, CheckCircle2, ArrowRight, Lightbulb, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// The Six Pillars of Recovery
const SIX_PILLARS = {
  emotionalRegulation: { 
    name: "Emotional Regulation", 
    icon: Heart, 
    color: "#7C67FF",
  },
  stressResilience: { 
    name: "Stress Resilience", 
    icon: Shield, 
    color: "#C49DC4",
  },
  socialConnectivity: { 
    name: "Social Connectivity", 
    icon: Users, 
    color: "#9D8FFF",
  },
  cognitiveReframing: { 
    name: "Cognitive Reframing", 
    icon: Brain, 
    color: "#3E2BB8",
  },
  identityIntegration: { 
    name: "Identity Integration", 
    icon: Target, 
    color: "#5739FB",
  },
  decisionMastery: { 
    name: "Decision Mastery", 
    icon: Sparkles, 
    color: "#E1A57E",
  }
};

type PillarKey = keyof typeof SIX_PILLARS;

// Full Article Content Structure
interface Article {
  id: number;
  title: string;
  subtitle: string;
  pillar: PillarKey;
  readTime: string;
  exerciseTime: string;
  image: string;
  microBlocksTargeted: string[];
  introduction: string;
  sections: {
    title: string;
    content: string;
  }[];
  exercise: {
    title: string;
    duration: string;
    steps: {
      step: number;
      instruction: string;
      detail: string;
    }[];
    reflection: string;
  };
  keyTakeaway: string;
  nextArticleId?: number;
}

// Complete Article Database
const ARTICLES: Record<number, Article> = {
  1: {
    id: 1,
    title: "Understanding Your Window of Tolerance",
    subtitle: "Learn to recognize when you're in your optimal zone for regulation",
    pillar: "emotionalRegulation",
    readTime: "5 min",
    exerciseTime: "3 min practice",
    image: "https://images.unsplash.com/photo-1759185408853-45d428437c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGdyYWRpZW50JTIwY2FsbXxlbnwxfHx8fDE3NjAyODQ2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Emotional awareness", "Physiological tracking", "Self-regulation"],
    introduction: "Imagine your nervous system as a river. When you're in your window of tolerance, the water flows steadily - calm enough to navigate, dynamic enough to move forward. But when you move outside this window, you either flood into overwhelm (hyperarousal) or freeze into shutdown (hypoarousal). Understanding this window is the foundation of emotional regulation in recovery.",
    sections: [
      {
        title: "What Is the Window of Tolerance?",
        content: "Developed by Dr. Dan Siegel, the window of tolerance describes the optimal zone where we can process emotions, think clearly, and respond (rather than react) to challenges. Inside this window, you're present, grounded, and capable. Outside it, your survival brain takes over - you might panic, rage, or completely numb out. For those in recovery, this window is often narrower due to past trauma, making it easier to slip into dysregulation."
      },
      {
        title: "Signs You're Outside Your Window",
        content: "Hyperarousal (above the window) looks like: racing thoughts, panic, anger, feeling 'too much.' Hypoarousal (below the window) looks like: numbness, dissociation, shutdown, feeling 'nothing at all.' In active addiction, substances were used to artificially regulate these states. In recovery, we learn to do this organically - by recognizing the signs early and using tools to return to center."
      },
      {
        title: "Why This Matters for Recovery",
        content: "When you're outside your window, your prefrontal cortex (decision-making brain) goes offline. This is why relapse often happens during emotional flooding or complete shutdown - you literally can't access the part of your brain that knows better. Learning to track your window builds the micro-block of emotional awareness, helping you intervene before crisis hits."
      }
    ],
    exercise: {
      title: "Window Tracking Practice",
      duration: "3 minutes",
      steps: [
        {
          step: 1,
          instruction: "Find your baseline",
          detail: "Close your eyes. Notice your breath, heartbeat, body temperature. This is what 'inside the window' feels like for you right now. Memorize it."
        },
        {
          step: 2,
          instruction: "Recall a mild stressor",
          detail: "Think of something mildly annoying (traffic, a messy room). Notice: did your breath quicken? Jaw tighten? Temperature rise? You're observing the edges of your window."
        },
        {
          step: 3,
          instruction: "Return to baseline",
          detail: "Take three slow breaths. Feel your feet on the ground. Notice yourself returning to center. This is regulation in action."
        }
      ],
      reflection: "The goal isn't to never leave your window - it's to notice when you do and know how to return. Every time you practice this, you're strengthening the micro-blocks of physiological tracking and self-regulation."
    },
    keyTakeaway: "Your window of tolerance is not fixed - it expands with practice. Every moment of awareness is a moment of rewiring.",
    nextArticleId: 2
  },
  2: {
    id: 2,
    title: "The Pause Practice",
    subtitle: "Create space between trigger and response",
    pillar: "emotionalRegulation",
    readTime: "4 min",
    exerciseTime: "2 min practice",
    image: "https://images.unsplash.com/photo-1652447385283-817463bd31af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwbGlnaHQlMjBtZWRpdGF0aW9uJTIwY2FsbXxlbnwxfHx8fDE3NjAyODQ2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Impulse control", "Emotional regulation", "Mindful awareness"],
    introduction: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom. - Viktor Frankl. The Pause Practice teaches you to live in that space.",
    sections: [
      {
        title: "The Neuroscience of the Pause",
        content: "When triggered, your amygdala (emotional alarm system) fires faster than your prefrontal cortex (thinking brain) can process. The result? Reactive behavior you later regret. The pause - even just 90 seconds - gives your prefrontal cortex time to catch up. This simple act literally changes which part of your brain is in charge."
      },
      {
        title: "Why This Is Hard in Recovery",
        content: "Addiction rewires your brain for immediacy: feel bad → use substance → feel better NOW. Recovery requires rewiring for delay: feel bad → pause → choose response. This feels unbearable at first because you're fighting years of neural patterning. But every pause weakens the old pathway and strengthens the new one."
      },
      {
        title: "The Micro-Block You're Building",
        content: "Each time you pause before reacting, you're building the micro-block of impulse control. This single skill prevents relapse, improves relationships, and restores self-trust. It's not about never feeling triggered - it's about what you do with that trigger."
      }
    ],
    exercise: {
      title: "The 90-Second Pause",
      duration: "2 minutes",
      steps: [
        {
          step: 1,
          instruction: "Notice the trigger",
          detail: "When you feel anger, craving, or overwhelm rising, name it: 'I'm triggered.' This alone activates your prefrontal cortex."
        },
        {
          step: 2,
          instruction: "Commit to 90 seconds",
          detail: "Tell yourself: 'I will not act on this feeling for 90 seconds.' Set a timer if helpful. Breathe. Walk. Splash water on your face. Just don't act."
        },
        {
          step: 3,
          instruction: "Reassess",
          detail: "After 90 seconds, ask: 'Do I still want to act on this?' Often, the urge has softened. Even if it hasn't, you've proven you can pause - and that's the rewiring."
        }
      ],
      reflection: "The pause isn't about suppressing emotion - it's about creating choice. Every time you choose the pause, you're choosing your future self over your reactive self."
    },
    keyTakeaway: "Recovery is built in the pause. One breath at a time, you reclaim your power.",
    nextArticleId: 3
  },
  3: {
    id: 3,
    title: "Reframing Stress as Energy",
    subtitle: "Transform how your body interprets stress signals",
    pillar: "stressResilience",
    readTime: "6 min",
    exerciseTime: "4 min practice",
    image: "https://images.unsplash.com/photo-1598129202606-e3894fa71cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhc3RlbCUyMGdyb3d0aHxlbnwxfHx8fDE3NjAyODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Stress perception", "Physiological response", "Cognitive reframing"],
    introduction: "What if stress isn't the enemy? What if the same physiological state you call 'anxiety' could be reframed as 'energy' or 'readiness'? Groundbreaking research shows: it's not stress that harms us - it's our belief about stress.",
    sections: [
      {
        title: "The Science of Stress Mindset",
        content: "Dr. Alia Crum's research at Stanford reveals: people who view stress as harmful show increased cortisol, inflammation, and health problems. People who view stress as enhancing show improved performance, focus, and resilience - even with identical stress levels. The difference isn't the stress - it's the story you tell about it."
      },
      {
        title: "Your Body's Stress Response Is Designed to Help",
        content: "Heart racing? That's more blood to your brain and muscles. Breathing faster? More oxygen. Palms sweating? Your body cooling itself for action. These aren't signs of breakdown - they're signs of your body mobilizing resources to meet a challenge. In recovery, learning to reframe these sensations prevents panic spirals."
      },
      {
        title: "From Threat to Challenge",
        content: "Threat mindset: 'This stress will break me.' Challenge mindset: 'This stress is preparing me.' Same physiology, radically different outcomes. When you reframe stress as energy, your nervous system shifts from survival mode to growth mode. This is the micro-block of stress perception - and it's trainable."
      }
    ],
    exercise: {
      title: "Stress Reframing Technique",
      duration: "4 minutes",
      steps: [
        {
          step: 1,
          instruction: "Identify a current stressor",
          detail: "Think of something causing stress in your life right now. Notice the physical sensations: heart rate, breath, tension."
        },
        {
          step: 2,
          instruction: "Reframe the sensations",
          detail: "Instead of 'I'm anxious,' try: 'My body is giving me energy to handle this.' Say it out loud. Notice any shift in how you feel."
        },
        {
          step: 3,
          instruction: "Ask the empowering question",
          detail: "'How is this stress helping me grow?' Even if the answer isn't clear, asking the question changes your brain's relationship to the experience."
        }
      ],
      reflection: "You're not trying to eliminate stress - you're changing your relationship to it. Every reframe strengthens the neural pathway that sees stress as fuel, not threat."
    },
    keyTakeaway: "Stress is not the enemy. Your belief about stress is what determines its impact. Choose empowerment.",
    nextArticleId: 4
  },
  4: {
    id: 4,
    title: "Building Your Support Network",
    subtitle: "Identify and strengthen meaningful connections",
    pillar: "socialConnectivity",
    readTime: "7 min",
    exerciseTime: "10 min exercise",
    image: "https://images.unsplash.com/photo-1752097438325-8e2111875892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW50bGUlMjB3YXZlcyUyMG1pbmltYWx8ZW58MXx8fHwxNzYwMjg0NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Social trust", "Vulnerability", "Connection patterns"],
    introduction: "Addiction thrives in isolation. Recovery thrives in connection. But after years of broken trust and burned bridges, how do you rebuild a support network that feels safe, authentic, and sustainable?",
    sections: [
      {
        title: "The Neuroscience of Connection",
        content: "Humans are wired for belonging. When we feel genuinely connected, our brains release oxytocin (bonding hormone), reduce cortisol (stress hormone), and activate the ventral vagal system (safety and social engagement). Isolation, conversely, triggers the same brain regions as physical pain. This isn't weakness - it's biology."
      },
      {
        title: "Quality Over Quantity",
        content: "You don't need a large network - you need a trustworthy one. Research shows that just 1-3 deeply supportive relationships provide more resilience than 50 superficial ones. In recovery, this means: it's okay to start small. One person who truly sees you is enough to begin rewiring the micro-block of social trust."
      },
      {
        title: "The Vulnerability Paradox",
        content: "To build connection, you must risk vulnerability. But vulnerability feels dangerous when you've been hurt. The key: gradual exposure. Share small truths with safe people. Notice: are they trustworthy with this? If yes, share slightly more. If no, adjust boundaries. You're not looking for perfect people - you're looking for people who can hold your imperfections."
      },
      {
        title: "Types of Support",
        content: "Not all support is the same. You need: Emotional support (someone who listens), Practical support (someone who helps), Accountability support (someone who challenges you), and Celebratory support (someone who cheers you on). Different people can fill different roles. Map your network accordingly."
      }
    ],
    exercise: {
      title: "Support Network Mapping",
      duration: "10 minutes",
      steps: [
        {
          step: 1,
          instruction: "Draw three concentric circles",
          detail: "Inner circle: people you trust deeply. Middle circle: people you're building trust with. Outer circle: people in your life but not close. Write names in each."
        },
        {
          step: 2,
          instruction: "Identify gaps",
          detail: "Which types of support are missing? Emotional? Practical? Accountability? Celebration? Where are the gaps?"
        },
        {
          step: 3,
          instruction: "Take one action",
          detail: "Choose one person to reach out to this week. It can be as simple as: 'I'm working on building better connections. Would you be open to grabbing coffee?' Start small."
        }
      ],
      reflection: "Connection is a practice, not a destination. Every time you show up authentically, you're building the micro-blocks of vulnerability and trust - one conversation at a time."
    },
    keyTakeaway: "You don't have to do this alone. Building a support network is not a sign of weakness - it's a sign of wisdom.",
    nextArticleId: 5
  },
  5: {
    id: 5,
    title: "The Power of Yet",
    subtitle: "Shift from fixed to growth mindset in recovery",
    pillar: "cognitiveReframing",
    readTime: "5 min",
    exerciseTime: "5 min practice",
    image: "https://images.unsplash.com/photo-1700507163265-62a7e5178a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBza3klMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjAyODQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Growth mindset", "Self-belief", "Neuroplasticity"],
    introduction: "One word changes everything. 'I can't do this' becomes 'I can't do this yet.' That tiny addition - yet - shifts your brain from fixed limitation to expansive possibility. Welcome to the power of yet.",
    sections: [
      {
        title: "Fixed vs. Growth Mindset",
        content: "Dr. Carol Dweck's research revolutionized psychology: people with a fixed mindset believe abilities are static ('I'm just not good at this'). People with a growth mindset believe abilities develop through effort ('I'm not good at this yet'). The difference isn't talent - it's belief. And belief shapes reality."
      },
      {
        title: "Why This Matters in Recovery",
        content: "Addiction often comes with a fixed-mindset narrative: 'I'm broken. I'll always be an addict. I'll never change.' This belief becomes a self-fulfilling prophecy. Growth mindset flips it: 'I'm healing. I'm learning. I'm becoming.' Same person, different story - and the story determines the outcome."
      },
      {
        title: "Neuroplasticity: Your Brain's Superpower",
        content: "Your brain is not fixed. Neuroplasticity means your brain physically rewires based on repeated thoughts and behaviors. Every time you practice a growth mindset statement, you strengthen new neural pathways. The micro-block of self-belief isn't wishful thinking - it's neuroscience."
      }
    ],
    exercise: {
      title: "Yet Reframes",
      duration: "5 minutes",
      steps: [
        {
          step: 1,
          instruction: "List three fixed statements",
          detail: "Write down three things you tell yourself you 'can't' do or 'aren't' capable of. Be honest."
        },
        {
          step: 2,
          instruction: "Add 'yet' to each one",
          detail: "'I can't handle cravings' → 'I can't handle cravings yet.' 'I'm not strong enough' → 'I'm not strong enough yet.' Read them aloud."
        },
        {
          step: 3,
          instruction: "Identify one micro-action",
          detail: "For each 'yet' statement, write one tiny action you could take to move toward capability. 'To handle cravings, I could practice the pause.' Make it specific."
        }
      ],
      reflection: "Yet is not denial - it's acknowledgment of where you are and belief in where you're going. Every time you say yet, you're choosing growth over stagnation."
    },
    keyTakeaway: "You are not fixed. Your brain is wired for change. The question is: what story will you tell it?",
    nextArticleId: 6
  },
  6: {
    id: 6,
    title: "Values Clarification Exercise",
    subtitle: "Discover what truly matters to guide your decisions",
    pillar: "decisionMastery",
    readTime: "8 min",
    exerciseTime: "15 min exercise",
    image: "https://images.unsplash.com/photo-1600540984005-c7f3a641fbe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZ2VvbWV0cmljJTIwbGlnaHR8ZW58MXx8fHwxNzYwMjg0NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Values alignment", "Decision clarity", "Internal compass"],
    introduction: "In addiction, decisions were made by the substance. In recovery, decisions must be made by you. But who are you? What do you stand for? Values clarification gives you an internal compass when the path forward is unclear.",
    sections: [
      {
        title: "What Are Values?",
        content: "Values are not goals (external achievements) or feelings (temporary states). Values are enduring principles that guide behavior: integrity, courage, compassion, growth. You can't 'complete' a value - you can only live it, daily, through choices. When your actions align with your values, you feel grounded. When they don't, you feel fractured."
      },
      {
        title: "Why Values Matter in Recovery",
        content: "Addiction disconnects you from your values. You act in ways that violate who you want to be - then shame spirals you deeper. Recovery is the process of realigning. Every decision made from values (rather than impulse or fear) builds the micro-block of decision clarity. Over time, these aligned decisions become your new identity."
      },
      {
        title: "The Compass, Not the Destination",
        content: "Values don't tell you what to do - they tell you how to be while doing it. Facing a tough conversation? Your value of honesty guides you to speak truthfully. Struggling with a craving? Your value of self-respect guides you to honor your commitment. The compass doesn't remove the difficulty - it gives you direction within it."
      }
    ],
    exercise: {
      title: "Your Top 5 Values",
      duration: "15 minutes",
      steps: [
        {
          step: 1,
          instruction: "Review the values list",
          detail: "Common values: Authenticity, Compassion, Courage, Creativity, Family, Freedom, Growth, Health, Honesty, Integrity, Justice, Kindness, Learning, Love, Service. Circle 10 that resonate."
        },
        {
          step: 2,
          instruction: "Narrow to 5",
          detail: "Of your 10, which 5 are non-negotiable? If you had to choose in a crisis, which would guide you? This is hard - good. Clarity requires elimination."
        },
        {
          step: 3,
          instruction: "Define what each means to you",
          detail: "For each of your top 5, write: 'For me, [value] means...' Be specific. 'Integrity' might mean: 'Doing what I say I'll do, even when no one's watching.'"
        },
        {
          step: 4,
          instruction: "Assess alignment",
          detail: "Rate 1-10: How aligned is your current life with each value? Where are the gaps? This isn't for judgment - it's for awareness."
        }
      ],
      reflection: "Your values are your north star. Every decision made in alignment with them strengthens your internal compass. Every decision against them erodes it. Choose wisely, one decision at a time."
    },
    keyTakeaway: "Clarity of values creates clarity of action. When you know what you stand for, decisions become simpler - not easier, but clearer.",
    nextArticleId: 7
  },
  7: {
    id: 7,
    title: "Who Am I Becoming?",
    subtitle: "Integrate past experiences into your evolving identity",
    pillar: "identityIntegration",
    readTime: "6 min",
    exerciseTime: "8 min reflection",
    image: "https://images.unsplash.com/photo-1646444570390-55a6131b8edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbmF0dXJlJTIwcmVmbGVjdGlvbnxlbnwxfHx8fDE3NjAyODQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Identity coherence", "Self-narrative", "Future self"],
    introduction: "You are not who you were in addiction. But you're also not someone entirely new. Recovery is the art of integration: honoring your past while authoring your future. The question isn't 'Who was I?' or 'Who will I be?' - it's 'Who am I becoming?'",
    sections: [
      {
        title: "The Fragmented Self",
        content: "Trauma and addiction fragment identity. You might feel like multiple people: the person you were before addiction, the person you became during it, the person you're trying to be in recovery. These fragments feel contradictory, chaotic. But they're all you - and they all have wisdom to offer."
      },
      {
        title: "Integration, Not Erasure",
        content: "Many people in recovery try to erase their past: 'That wasn't me. I'm different now.' But denial creates internal conflict. True healing integrates: 'That was me, under those circumstances, with those resources. I've grown since then.' Integration builds the micro-block of identity coherence - a sense of continuous self across time."
      },
      {
        title: "Future Self as Guide",
        content: "Dr. Hal Hershfield's research shows: people who vividly imagine their future selves make better decisions in the present. Your future self - the person you're becoming - can guide today's choices. Before making a decision, ask: 'Would my future self thank me for this?' Let that version of you be your North Star."
      }
    ],
    exercise: {
      title: "Three Selves Dialogue",
      duration: "8 minutes",
      steps: [
        {
          step: 1,
          instruction: "Write to your past self",
          detail: "Address the version of you at your lowest point. What would you say to them now? Not with judgment - with compassion. 'I see you. I understand why you did what you did. You got us here. I'll take it from here.'"
        },
        {
          step: 2,
          instruction: "Write from your future self",
          detail: "Imagine yourself 5 years from now, thriving. Write a letter from that version to your current self. What encouragement would they offer? What do they want you to know?"
        },
        {
          step: 3,
          instruction: "Integrate the wisdom",
          detail: "Read both letters. Notice: your past self's pain is valid. Your future self's hope is real. Your current self bridges both. You are all three, becoming one coherent story."
        }
      ],
      reflection: "Your identity is not fixed - it's an ongoing narrative. You get to choose how this story unfolds. Every choice is an authorship decision."
    },
    keyTakeaway: "You are not broken. You are not starting over. You are integrating, evolving, becoming. That is not weakness - it's profound courage.",
    nextArticleId: 8
  },
  8: {
    id: 8,
    title: "Labeling to Reduce Intensity",
    subtitle: "Use neuroscience to calm your emotional brain",
    pillar: "emotionalRegulation",
    readTime: "4 min",
    exerciseTime: "3 min practice",
    image: "https://images.unsplash.com/photo-1759228340616-022eaeaf3786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwemVuJTIwcGVhY2VmdWwlMjB3YXRlcnxlbnwxfHx8fDE3NjAyODQ2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    microBlocksTargeted: ["Amygdala regulation", "Emotional labeling", "Affect labeling"],
    introduction: "'Name it to tame it.' This phrase, coined by Dr. Dan Siegel, captures one of neuroscience's most powerful findings: simply labeling an emotion reduces its intensity. Here's how to use this superpower.",
    sections: [
      {
        title: "The Neuroscience of Affect Labeling",
        content: "UCLA researcher Dr. Matthew Lieberman discovered: when you name an emotion ('I feel angry'), your prefrontal cortex activates and your amygdala (fear/emotion center) calms down. It's measurable on brain scans. Labeling literally shifts activation from your reactive brain to your reflective brain. This isn't positive thinking - it's neurological fact."
      },
      {
        title: "Why Labeling Works When Nothing Else Does",
        content: "In moments of overwhelm, you can't logic your way out. But you can label: 'This is rage.' 'This is grief.' 'This is craving.' The simple act of naming creates distance between you and the emotion. You're no longer consumed by it - you're observing it. That micro-shift is everything."
      },
      {
        title: "Precision Matters",
        content: "Don't just say 'I feel bad.' Get specific: 'I feel disappointed and worried.' The more precise the label, the more your brain calms. Why? Because precision requires your thinking brain to engage - and when your thinking brain engages, your emotional brain settles. This builds the micro-block of emotional labeling."
      }
    ],
    exercise: {
      title: "Emotion Labeling Practice",
      duration: "3 minutes",
      steps: [
        {
          step: 1,
          instruction: "Identify the emotion",
          detail: "Close your eyes. Notice what you're feeling right now. Don't judge it - just observe. What's present? Anxiety? Sadness? Anger? Calm?"
        },
        {
          step: 2,
          instruction: "Get precise",
          detail: "Refine your label. Not just 'sad' - maybe 'disappointed and lonely.' Not just 'anxious' - maybe 'worried and restless.' Precision activates your prefrontal cortex."
        },
        {
          step: 3,
          instruction: "Notice the shift",
          detail: "After labeling precisely, scan your body again. Has the intensity changed? Even a 10% reduction is proof the technique works. Practice this daily - it's a trainable skill."
        }
      ],
      reflection: "You're not suppressing emotions - you're metabolizing them. Every time you label with precision, you strengthen the neural pathway between emotion and regulation."
    },
    keyTakeaway: "Emotions aren't the enemy. Unlabeled emotions are. Name them, and you reclaim power over your internal world.",
    nextArticleId: 1
  }
};

interface ArticlePageProps {
  articleId: number;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function ArticlePage({ articleId, onBack, onNavigate }: ArticlePageProps) {
  const article = ARTICLES[articleId];
  const [isSaved, setIsSaved] = useState(false);
  const [exerciseExpanded, setExerciseExpanded] = useState(false);

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-gray-900 mb-2">Article not found</h2>
          <button
            onClick={onBack}
            className="text-[#3E2BB8] hover:underline"
          >
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  const pillar = SIX_PILLARS[article.pillar];
  const PillarIcon = pillar.icon;
  const nextArticle = article.nextArticleId ? ARTICLES[article.nextArticleId] : null;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#3E2BB8] transition-colors"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[400px]">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Pillar Badge */}
        <div className="absolute bottom-6 left-6 md:left-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: `${pillar.color}20`, border: `1px solid ${pillar.color}` }}
          >
            <PillarIcon className="w-4 h-4" style={{ color: pillar.color }} />
            <span 
              className="text-xs uppercase tracking-wider"
              style={{ color: pillar.color, fontFamily: 'var(--font-sans)', fontWeight: 700 }}
            >
              {pillar.name}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', lineHeight: '1.2' }}
          >
            {article.title}
          </h1>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontSize: '1.25rem', lineHeight: '1.6' }}
          >
            {article.subtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>{article.readTime} read</span>
              <span>•</span>
              <span>{article.exerciseTime}</span>
            </div>
          </div>

          {/* Micro-blocks */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              This strengthens
            </p>
            <div className="flex flex-wrap gap-2">
              {article.microBlocksTargeted.map((block, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#F5F3FF] to-white text-[#3E2BB8] rounded-lg text-sm border border-[#3E2BB8]/20"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                >
                  {block}
                </span>
              ))}
            </div>
          </div>

          {/* Save CTA */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`w-full md:w-auto px-8 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
              isSaved
                ? 'border-[#3E2BB8] bg-[#3E2BB8] text-white shadow-md'
                : 'border-[#3E2BB8] bg-white text-[#3E2BB8] hover:bg-[#F5F3FF]'
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-5 h-5" />
                Saved to Toolkit
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                Save to Toolkit
              </>
            )}
          </button>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
            {article.introduction}
          </p>
        </div>

        {/* Article Sections */}
        {article.sections.map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 
              className="text-gray-900 mb-4"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700, 
                fontSize: '1.75rem',
                color: pillar.color
              }}
            >
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
              {section.content}
            </p>
          </div>
        ))}

        {/* Integrated Practice Section */}
        <div className="my-16 bg-gradient-to-br from-[#F5F3FF] via-white to-[#F9F7FF] rounded-2xl overflow-hidden border-2 border-[#3E2BB8]/20">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: pillar.color }}
              >
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 
                  className="text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                >
                  {article.exercise.title}
                </h3>
                <p className="text-gray-600">{article.exercise.duration} · Practice now</p>
              </div>
            </div>

            {/* Exercise Steps */}
            <div className="space-y-6">
              {article.exercise.steps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: pillar.color, fontFamily: 'var(--font-sans)', fontWeight: 700 }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="text-gray-900 mb-2"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}
                    >
                      {step.instruction}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reflection */}
            <div className="mt-8 pt-8 border-t border-[#3E2BB8]/20">
              <p 
                className="text-gray-700 italic leading-relaxed"
                style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
              >
                {article.exercise.reflection}
              </p>
            </div>

            {/* Mark Complete */}
            <button
              onClick={() => setExerciseExpanded(!exerciseExpanded)}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <CheckCircle2 className="w-5 h-5" />
              I Practiced This
            </button>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="my-12 p-8 bg-white rounded-2xl border-2 border-[#3E2BB8] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#3E2BB8] rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 
                className="text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}
              >
                Key Takeaway
              </h4>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
                {article.keyTakeaway}
              </p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        {nextArticle && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 
              className="text-gray-900 mb-8"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem' }}
            >
              Continue Your Journey
            </h3>
            
            <div className="group bg-white rounded-xl border-2 border-gray-200 hover:border-[#5739FB]/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={nextArticle.image}
                    alt={nextArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 md:p-8">
                  {/* Next Pillar */}
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${SIX_PILLARS[nextArticle.pillar].color}15` }}
                    >
                      {(() => {
                        const NextPillarIcon = SIX_PILLARS[nextArticle.pillar].icon;
                        return <NextPillarIcon className="w-3.5 h-3.5" style={{ color: SIX_PILLARS[nextArticle.pillar].color }} />;
                      })()}
                    </div>
                    <span 
                      className="text-xs uppercase tracking-wider"
                      style={{ color: SIX_PILLARS[nextArticle.pillar].color, fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                    >
                      {SIX_PILLARS[nextArticle.pillar].name}
                    </span>
                  </div>

                  <h4 
                    className="text-gray-900 mb-2 group-hover:text-[#3E2BB8] transition-colors"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                  >
                    {nextArticle.title}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {nextArticle.subtitle}
                  </p>

                  <button 
                    onClick={() => onNavigate(`article-${nextArticle.id}`)}
                    className="flex items-center gap-2 text-[#3E2BB8] hover:gap-3 transition-all"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    Read Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

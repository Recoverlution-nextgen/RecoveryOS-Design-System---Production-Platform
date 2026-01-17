/**
 * Building Block Library - Foundation Concepts
 * 
 * Building Blocks are interactive learning experiences that teach core concepts
 * through multiple learning modalities: concept summaries, knowledge checks,
 * reflections, applications, and insights from thought leaders.
 * 
 * Each block is designed for intense, purpose-driven knowledge infusion.
 */

export type PillarType = 'emotional-regulation' | 'stress-resilience' | 'social-connectivity' | 'cognitive-reframing' | 'identity-integration' | 'decision-mastery';

export type ComponentBlockType = 'concept-summary' | 'knowledge-check' | 'reflection' | 'application' | 'insight';

// Component Block Types
export interface ConceptSummaryBlock {
  type: 'concept-summary';
  title: string;
  content: string;
  keyPoints: string[];
  visualMetaphor?: string;
}

export interface KnowledgeCheckBlock {
  type: 'knowledge-check';
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string; // Valuable feedback regardless of answer
  }[];
}

export interface ReflectionBlock {
  type: 'reflection';
  prompt: string;
  guidingQuestions: string[];
  placeholder: string;
}

export interface ApplicationBlock {
  type: 'application';
  scenario: string;
  question: string;
  insights: string[]; // Multiple valid perspectives/tools
}

export interface InsightBlock {
  type: 'insight';
  title: string;
  content: string;
  source?: string;
}

export type ComponentBlock = ConceptSummaryBlock | KnowledgeCheckBlock | ReflectionBlock | ApplicationBlock | InsightBlock;

// Building Block Interface
export interface BuildingBlock {
  id: number;
  title: string;
  subtitle: string;
  pillar: PillarType;
  pillarName: string;
  pillarColor: string;
  thoughtLeader: string;
  microBlocks: string[];
  estimatedTime: number; // minutes
  image: string; // Hero image
  components: ComponentBlock[];
  relatedBlocks?: number[];
  relatedArticles?: number[];
}

// Pillar metadata
export const pillarMetadata: Record<PillarType, { name: string; color: string; icon: string }> = {
  'emotional-regulation': {
    name: 'Emotional Regulation',
    color: '#7C67FF',
    icon: '❤️'
  },
  'stress-resilience': {
    name: 'Stress Resilience',
    color: '#9B59B6',
    icon: '🌊'
  },
  'social-connectivity': {
    name: 'Social Connectivity',
    color: '#3498DB',
    icon: '🤝'
  },
  'cognitive-reframing': {
    name: 'Cognitive Reframing',
    color: '#F39C12',
    icon: '💭'
  },
  'identity-integration': {
    name: 'Identity Integration',
    color: '#2ECC71',
    icon: '🌱'
  },
  'decision-mastery': {
    name: 'Decision Mastery',
    color: '#E74C3C',
    icon: '⚖️'
  }
};

// BUILDING BLOCKS LIBRARY
export const buildingBlockLibrary: BuildingBlock[] = [
  // EMOTIONAL REGULATION BLOCKS
  {
    id: 1,
    title: "Window of Tolerance",
    subtitle: "Understanding your nervous system's optimal zone",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Dan Siegel',
    microBlocks: ['Window of tolerance', 'Hyper/hypoarousal', 'Nervous system regulation'],
    estimatedTime: 12,
    image: "https://images.unsplash.com/photo-1759086343456-2b49f6c0d148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwd2F0ZXIlMjByZWZsZWN0aW9uJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NjExNjM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "What is the Window of Tolerance?",
        content: "Your nervous system has an optimal zone where you can process information, make decisions, and respond to stress effectively. When you're within this window, your prefrontal cortex (thinking brain) and limbic system (emotional brain) work together in balance.",
        keyPoints: [
          "Everyone has a unique window shaped by their experiences",
          "You can expand your window through practice and safety",
          "Moving outside the window is not failure, it is information"
        ],
        visualMetaphor: "Think of it like a river: too fast (hyperarousal) and you crash into rocks, too slow (hypoarousal) and you get stuck in mud. The window is the flow where you can navigate."
      },
      {
        type: "insight",
        title: "The Neuroscience",
        content: "Dr. Dan Siegel's Window of Tolerance describes the zone where the ventral vagal nerve (social engagement system) is active. Outside this window, your sympathetic (fight/flight) or dorsal vagal (freeze/shutdown) systems take over. These are not conscious choices, they are automatic survival responses.",
        source: "Dr. Dan Siegel, Clinical Professor of Psychiatry, UCLA"
      },
      {
        type: "knowledge-check",
        question: "When you're ABOVE your window (hyperarousal), you might experience:",
        options: [
          {
            text: "Racing thoughts, anxiety, feeling wired",
            isCorrect: true,
            feedback: "Exactly. Hyperarousal feels like your accelerator is stuck. Your sympathetic nervous system is flooding you with cortisol and adrenaline. This evolved to help you escape danger. Your body is trying to protect you, even if the danger is just a difficult conversation."
          },
          {
            text: "Numbness, disconnection, shutting down",
            isCorrect: false,
            feedback: "That's actually hypoarousal (BELOW the window). But recognizing the difference is powerful because it tells you what you need. Hyperarousal needs grounding and discharge (movement, breath). Hypoarousal needs gentle activation and safety signals. Different states need different tools."
          },
          {
            text: "Calm focus and present moment awareness",
            isCorrect: false,
            feedback: "That's actually WITHIN your window, your optimal zone. The fact you're learning to recognize these states means you're building interoception (awareness of internal states). This awareness itself expands your window over time."
          }
        ]
      },
      {
        type: "reflection",
        prompt: "Think about a recent time you went above or below your window",
        guidingQuestions: [
          "What triggered it? (No judgment, just notice)",
          "What did it feel like in your body?",
          "How did you know you were outside your window?",
          "What helped (or might have helped) bring you back?"
        ],
        placeholder: "I noticed I went outside my window when..."
      },
      {
        type: "application",
        scenario: "You're in a meeting and start feeling your heart race, thoughts spiral, and a strong urge to leave. You recognize you're moving above your window.",
        question: "What would actually help in this moment?",
        insights: [
          "Exhale longer than you inhale (activates vagal brake to slow things down)",
          "Excuse yourself briefly because movement helps discharge the activation",
          "Cold water on wrists or face sends immediate safety signal to nervous system",
          "Ground in the room: 5 things you see, 4 you hear, 3 you can touch",
          "Name it: I'm in hyperarousal. This will pass. My body is trying to protect me."
        ]
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Addiction often narrows your window over time. Substances become the only tool that works when you're dysregulated. Recovery is about expanding your window and building new tools. Every time you notice you're outside your window and respond skillfully, you're literally rewiring your nervous system.",
        source: "Polyvagal Theory, Dr. Stephen Porges"
      }
    ],
    relatedBlocks: [2, 3],
    relatedArticles: [1, 2]
  },

  {
    id: 2,
    title: "Name It to Tame It",
    subtitle: "The neuroscience of emotion labeling",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Dan Siegel, Lisa Feldman Barrett',
    microBlocks: ['Affect labeling', 'Emotional granularity', 'Amygdala regulation'],
    estimatedTime: 10,
    image: "https://images.unsplash.com/photo-1761063198766-9df7175dd089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGdyYWRpZW50JTIwZmxvd3xlbnwxfHx8fDE3NjExNjM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "The Power of Naming",
        content: "When you put words to what you're feeling, something remarkable happens in your brain. The act of labeling your emotions reduces activity in your amygdala (emotion center) and increases activity in your prefrontal cortex (thinking center). This is not just psychology, it is measurable neuroscience.",
        keyPoints: [
          "Naming emotions reduces their intensity without suppressing them",
          "The more specific your label, the more effective the regulation",
          "This works even when you're alone, just naming it to yourself"
        ],
        visualMetaphor: "Your amygdala is like a fire alarm. When it goes off, your whole system responds. Labeling is like pressing the button that says 'I see you, false alarm' without turning off the alarm system entirely."
      },
      {
        type: "insight",
        title: "Emotional Granularity",
        content: "Most people use about 5 to 10 emotion words regularly: mad, sad, happy, anxious, stressed. But there are hundreds of nuanced emotions. The more precisely you can name what you feel, the better your brain can regulate it. This precision is called emotional granularity, and it's a skill you can develop.",
        source: "Dr. Lisa Feldman Barrett, How Emotions Are Made"
      },
      {
        type: "knowledge-check",
        question: "Instead of just saying 'I feel bad,' which shows higher emotional granularity?",
        options: [
          {
            text: "I feel disappointed that my effort was not recognized, and underneath that, a bit ashamed that I need recognition",
            isCorrect: true,
            feedback: "Yes. This is high granularity. You've named two distinct emotions (disappointed, ashamed) and connected them to specific triggers. This level of precision helps your brain know what to do. Disappointment might need self validation. Shame might need self compassion. They're different needs."
          },
          {
            text: "I feel really upset and angry",
            isCorrect: false,
            feedback: "This is better than 'I feel bad' because it names specific emotions. But go deeper. What flavor of upset? Frustrated? Betrayed? Helpless? What type of angry? Righteous? Defensive? Rageful? The more precise you get, the more you can regulate. Keep practicing this nuance."
          },
          {
            text: "I'm just in a mood",
            isCorrect: false,
            feedback: "This is low granularity and gives your brain almost nothing to work with. But here's what's interesting: even asking yourself 'What kind of mood?' starts to build the skill. Is it irritable? Melancholic? Restless? Foggy? Every time you push past 'just a mood,' you're training your brain to regulate better."
          }
        ]
      },
      {
        type: "application",
        scenario: "You wake up feeling off. Your chest feels tight. Your thoughts are scattered. You just want to go back to bed.",
        question: "How do you practice affect labeling in this moment?",
        insights: [
          "Start with body: tight chest, scattered thoughts, low energy. Name the sensations first.",
          "Move to basic emotion: anxious? Sad? Overwhelmed? Pick the closest match.",
          "Get more specific: is it dread? Grief? Depletion? Apprehension? What exact flavor?",
          "Notice the trigger: is this about today? Yesterday? The future? An old wound?",
          "Say it out loud or write it: I feel depleted and apprehensive about the unknowns ahead."
        ]
      },
      {
        type: "reflection",
        prompt: "Practice emotional granularity right now",
        guidingQuestions: [
          "What am I feeling in this moment? (Go beyond good or bad)",
          "Where do I feel it in my body?",
          "If I had to pick 3 specific emotion words, what would they be?",
          "What's the most accurate, precise way I can name this state?"
        ],
        placeholder: "Right now, I feel..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "When you can't name what you feel, your brain categorizes it as threat. Threat triggers survival responses, and for many people in recovery, substances were the primary survival response. Learning to name emotions with precision gives your brain the information it needs to respond skillfully instead of reactively.",
        source: "Neuroscience of Emotion Regulation"
      }
    ],
    relatedBlocks: [1, 3],
    relatedArticles: [3]
  },

  {
    id: 3,
    title: "Body Awareness Foundations",
    subtitle: "Learning to listen to what your body is telling you",
    pillar: 'emotional-regulation',
    pillarName: 'Emotional Regulation',
    pillarColor: '#7C67FF',
    thoughtLeader: 'Bessel van der Kolk',
    microBlocks: ['Interoception', 'Somatic awareness', 'Body signals'],
    estimatedTime: 15,
    image: "https://images.unsplash.com/photo-1748183607998-30e288846885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMG1pbmltYWx8ZW58MXx8fHwxNzYxMTE4MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "What is Interoception?",
        content: "Interoception is your ability to sense what's happening inside your body: your heartbeat, your breath, tension in your muscles, sensations in your gut. This is different from the five external senses. This is the sense of your internal landscape. Most people in recovery have learned to disconnect from these signals because they were overwhelming.",
        keyPoints: [
          "Your body sends signals about your emotional state before your mind recognizes it",
          "Trauma and addiction can numb interoceptive awareness",
          "You can rebuild this sense through gentle, consistent practice"
        ],
        visualMetaphor: "Think of your body as a sophisticated instrument panel in a car. Every light, every gauge, every dial is giving you information. But if the car has been in survival mode for years, you've learned to ignore the dashboard. Learning interoception is like slowly turning the lights back on, one gauge at a time."
      },
      {
        type: "insight",
        title: "The Body Keeps the Score",
        content: "Trauma is not just stored in your mind, it is stored in your body. Your muscles remember. Your nervous system remembers. Your gut remembers. You cannot think your way out of what your body is holding. Recovery requires learning to be in your body again, even when it is uncomfortable.",
        source: "Dr. Bessel van der Kolk, The Body Keeps the Score"
      },
      {
        type: "knowledge-check",
        question: "When you feel a sudden tightness in your chest, what's the most helpful response?",
        options: [
          {
            text: "Ignore it and push through because I have things to do",
            isCorrect: false,
            feedback: "This is the survival strategy many of us learned, but it teaches your body that its signals do not matter. Over time, this disconnection makes it harder to regulate emotions because you miss the early warning signs. Your body is trying to tell you something. The question is: are you willing to listen?"
          },
          {
            text: "Immediately try to make it go away with distraction or substances",
            isCorrect: false,
            feedback: "This is the addiction pattern: sensation equals threat equals escape. But here's what's important: you noticed the urge. That noticing is the first step. The next step is learning that not all uncomfortable sensations require action. Some just need acknowledgment. I feel tightness. I am safe. This will pass."
          },
          {
            text: "Pause, place a hand on my chest, and simply notice the sensation without judgment",
            isCorrect: true,
            feedback: "Yes. This is practicing interoception. You are not trying to fix it or fight it. You are simply being with it. Where exactly is the tightness? Does it have a quality? Sharp? Dull? Pulsing? Just naming these things begins to regulate your nervous system. You are training your brain that sensation does not equal danger."
          }
        ]
      },
      {
        type: "application",
        scenario: "You are about to have a difficult conversation. Your stomach is churning. Your shoulders are up by your ears. Your jaw is clenched.",
        question: "How do you use body awareness to prepare?",
        insights: [
          "Body scan: notice each sensation without trying to change it. Stomach churning, shoulders tense, jaw clenched.",
          "Breathe into each area: send breath to your belly, your shoulders, your jaw. Not to fix, just to acknowledge.",
          "Name what the body is communicating: my body is preparing for threat. It is trying to protect me.",
          "Thank your body: thank you for trying to keep me safe. I've got this. You can relax a bit.",
          "Make one small adjustment: drop your shoulders an inch. Unclench your jaw. Let your body know you are in charge."
        ]
      },
      {
        type: "reflection",
        prompt: "Do a 60 second body scan right now",
        guidingQuestions: [
          "What sensations do I notice in my chest? My belly? My shoulders?",
          "Are there areas of tension? Numbness? Warmth? Coolness?",
          "What is my breath doing? Shallow? Deep? Held?",
          "If my body could speak right now, what would it say?"
        ],
        placeholder: "When I tune into my body, I notice..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Every craving, every trigger, every emotional wave shows up in your body first. If you can catch it at the body level (tight chest, clenched fists, hollow stomach), you have a choice. If you wait until it is a full blown thought storm, the choice is much harder. Interoception gives you the early warning system that makes recovery sustainable.",
        source: "Somatic Experiencing, Dr. Peter Levine"
      }
    ],
    relatedBlocks: [1, 2],
    relatedArticles: [1, 2]
  },

  // STRESS RESILIENCE BLOCKS
  {
    id: 4,
    title: "Understanding Stress Response",
    subtitle: "How your body interprets and responds to stress",
    pillar: 'stress-resilience',
    pillarName: 'Stress Resilience',
    pillarColor: '#9B59B6',
    thoughtLeader: 'Kelly McGonigal',
    microBlocks: ['Stress mindset', 'HPA axis', 'Cortisol response'],
    estimatedTime: 14,
    image: "https://images.unsplash.com/photo-1759185408853-45d428437c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMHdhdGVyJTIwY2FsbXxlbnwxfHx8fDE3NjExNjM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "Stress Is Not the Enemy",
        content: "The belief that stress is harmful creates more harm than the stress itself. Research shows that how you think about stress changes how your body responds to it. If you view stress as your body rising to a challenge, your cardiovascular system responds with a pattern that is healthier and more sustainable than if you view stress as a threat.",
        keyPoints: [
          "Stress activates the same physical response as excitement: increased heart rate, faster breathing, energy mobilization",
          "The difference is in how your mind interprets these signals",
          "You can train yourself to view stress as your body helping you perform"
        ],
        visualMetaphor: "Imagine you are about to give a presentation. Your heart is pounding. Is it fear or excitement? Your body does not know the difference. Your mind decides. And that decision changes everything from your blood flow to your performance."
      },
      {
        type: "insight",
        title: "The Stress Paradox",
        content: "Trying to avoid all stress makes you more fragile. Embracing stress makes you more resilient. This does not mean seeking out suffering. It means recognizing that the stress response evolved to help you rise to challenges. When you reframe stress as your body mobilizing energy to meet the moment, your physiology literally shifts to a healthier pattern.",
        source: "Dr. Kelly McGonigal, The Upside of Stress"
      },
      {
        type: "knowledge-check",
        question: "You are feeling stressed before an important meeting. What thought is most helpful?",
        options: [
          {
            text: "This stress is going to ruin everything. I need to calm down.",
            isCorrect: false,
            feedback: "This is stress about stress. It creates a secondary layer of threat. Your body is already responding to the meeting. Now it is also responding to your belief that the stress itself is dangerous. This doubles the load. Instead, what if the stress is just your body getting ready to perform?"
          },
          {
            text: "My body is preparing me for this challenge. This energy is here to help me.",
            isCorrect: true,
            feedback: "Yes. This is stress reappraisal. You are not denying the stress. You are reframing it. Research shows this single shift changes your cardiovascular response, improves your performance, and reduces the harmful effects of stress. The stress does not go away. Your relationship to it transforms."
          },
          {
            text: "I should not be stressed. Other people handle this fine.",
            isCorrect: false,
            feedback: "This is self judgment layered on top of stress. Now you are stressed about the meeting AND about the fact that you are stressed. The truth is, stress is universal. The question is not whether you experience it, but how you interpret it. Your stress response is trying to help you. Can you receive it that way?"
          }
        ]
      },
      {
        type: "application",
        scenario: "You have a high stakes presentation in one hour. Your heart is racing. Your palms are sweaty. Your mind is spinning.",
        question: "How do you reframe this stress?",
        insights: [
          "Notice the sensations: racing heart, sweaty palms, spinning thoughts. Name them without judgment.",
          "Reinterpret the signals: my heart is pumping blood and oxygen to my brain so I can think clearly.",
          "Recognize the purpose: my body is mobilizing energy because this matters to me.",
          "Speak to your body: thank you for preparing me. This energy is here to help me show up fully.",
          "Channel the energy: use the heightened state to be more present, more engaged, more alive in the moment."
        ]
      },
      {
        type: "reflection",
        prompt: "Think about a recent stressful situation",
        guidingQuestions: [
          "How did I interpret the stress? As threat or as challenge?",
          "What if my body was trying to help me, not hurt me?",
          "How might I have approached it differently if I viewed the stress as my ally?",
          "What would change if I welcomed the stress response instead of fighting it?"
        ],
        placeholder: "The last time I felt stressed, I..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Many people in recovery used substances to escape the stress response. But the stress response is not optional. It is part of being human. Recovery is not about eliminating stress. It is about changing your relationship to it. When you can see stress as information and energy instead of enemy, you no longer need to escape it.",
        source: "Stress Mindset Research, Stanford University"
      }
    ],
    relatedBlocks: [5, 6],
    relatedArticles: [3]
  },

  {
    id: 5,
    title: "Vagal Tone and Regulation",
    subtitle: "Strengthening your body's natural calm system",
    pillar: 'stress-resilience',
    pillarName: 'Stress Resilience',
    pillarColor: '#9B59B6',
    thoughtLeader: 'Stephen Porges',
    microBlocks: ['Vagus nerve', 'Parasympathetic activation', 'Polyvagal theory'],
    estimatedTime: 13,
    image: "https://images.unsplash.com/photo-1568305516592-8debcaf101c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwb3JhbmdlJTIwc3Vuc2V0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYxMTYzOTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "The Vagus Nerve: Your Reset Button",
        content: "The vagus nerve is like a superhighway between your brain and your body. It runs from your brainstem through your heart, lungs, and digestive system. When your vagus nerve is activated, it sends a signal that says: you are safe. High vagal tone means your body can shift from stress to calm efficiently. Low vagal tone means you get stuck in fight or flight.",
        keyPoints: [
          "Vagal tone is like muscle tone: it can be strengthened with practice",
          "Simple practices like deep breathing, humming, or cold exposure stimulate the vagus nerve",
          "Higher vagal tone is associated with better emotional regulation, lower inflammation, and improved heart health"
        ],
        visualMetaphor: "Think of your vagus nerve as the brake pedal in your car. Your sympathetic nervous system (stress response) is the gas pedal. You need both. But if your brake pedal is weak, you cannot slow down even when you want to. Strengthening vagal tone is like rebuilding your brake system."
      },
      {
        type: "insight",
        title: "Polyvagal Theory",
        content: "Dr. Stephen Porges' Polyvagal Theory explains that we have three neural circuits: social engagement (ventral vagal), fight or flight (sympathetic), and shutdown (dorsal vagal). Recovery is about strengthening the social engagement system so you can stay connected even under stress. This is not about positive thinking. This is about rewiring your autonomic nervous system.",
        source: "Dr. Stephen Porges, The Polyvagal Theory"
      },
      {
        type: "knowledge-check",
        question: "Which of these practices MOST directly stimulates the vagus nerve?",
        options: [
          {
            text: "Deep, slow breathing with longer exhales than inhales",
            isCorrect: true,
            feedback: "Yes. This is one of the most direct ways to activate the vagus nerve. When you exhale slowly, you are literally sending a signal to your brain that you are safe. The longer exhale activates the vagal brake on your heart rate. You can feel this: your heart rate slows on the exhale. This is vagal tone in action."
          },
          {
            text: "Drinking caffeine to stay alert and focused",
            isCorrect: false,
            feedback: "Caffeine activates your sympathetic nervous system (gas pedal), not your parasympathetic system (brake pedal). This is not inherently bad, but it is the opposite of vagal stimulation. If you are trying to build stress resilience, you need practices that strengthen the brake, not just the gas."
          },
          {
            text: "Scrolling through social media to distract yourself",
            isCorrect: false,
            feedback: "Distraction does not build vagal tone. It bypasses the stress without actually regulating it. The goal is not to avoid feeling, but to build your capacity to feel and regulate at the same time. That capacity comes from practices that directly engage your nervous system: breath, movement, cold exposure, humming, connection."
          }
        ]
      },
      {
        type: "application",
        scenario: "You just received triggering news. Your chest is tight. Your mind is racing. You can feel yourself spiraling.",
        question: "How do you use vagal stimulation to regulate?",
        insights: [
          "Breathe: 4 count inhale, 6 count exhale. Repeat for 2 minutes. The longer exhale activates the vagus nerve.",
          "Hum or sing: the vibration in your throat stimulates the vagus nerve directly. Even 30 seconds helps.",
          "Cold water: splash cold water on your face or hold ice to your wrists. Cold activates the vagal response.",
          "Move: gentle movement like walking or stretching helps discharge sympathetic activation.",
          "Connect: if possible, make eye contact with someone safe. Social connection activates ventral vagal."
        ]
      },
      {
        type: "reflection",
        prompt: "Assess your current vagal tone",
        guidingQuestions: [
          "How quickly do I recover from stress? Minutes? Hours? Days?",
          "Do I have go to practices that help me calm down?",
          "When was the last time I felt genuinely calm and present?",
          "What practices might I commit to for building vagal tone?"
        ],
        placeholder: "When I think about my stress recovery, I notice..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Substances artificially activate the calming response. Recovery is about rebuilding your body's natural ability to calm itself. Every time you practice vagal stimulation, you are strengthening your internal pharmacy. Over time, you need external substances less because your internal system is robust again.",
        source: "Neuroscience of Addiction Recovery"
      }
    ],
    relatedBlocks: [1, 4],
    relatedArticles: [1, 3]
  },

  // Continue with blocks for other pillars...
  // For brevity, I'll create 2 more blocks to demonstrate the pattern

  {
    id: 6,
    title: "Attachment Styles and Connection",
    subtitle: "Understanding how early relationships shape current connections",
    pillar: 'social-connectivity',
    pillarName: 'Social Connectivity',
    pillarColor: '#3498DB',
    thoughtLeader: 'John Bowlby, Mary Ainsworth',
    microBlocks: ['Attachment theory', 'Secure base', 'Relationship patterns'],
    estimatedTime: 16,
    image: "https://images.unsplash.com/photo-1568448798739-8b3c9742fb03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGdyb3d0aCUyMHBsYW50cyUyMG5hdHVyZXxlbnwxfHx8fDE3NjExNjM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "What Are Attachment Styles?",
        content: "Attachment theory describes the patterns we develop in early relationships that shape how we connect throughout life. These are not diagnoses or fixed traits. They are adaptive strategies you learned as a child to get your needs met. Understanding your attachment style is not about blame. It is about awareness and the possibility of change.",
        keyPoints: [
          "Secure attachment: I am worthy of love and others are generally trustworthy",
          "Anxious attachment: I crave closeness but fear abandonment",
          "Avoidant attachment: I value independence and find intimacy uncomfortable",
          "Disorganized attachment: I want connection but associate it with danger"
        ],
        visualMetaphor: "Think of attachment styles as the language you learned about love. If the only language you heard growing up was inconsistent or harsh, that is the language you speak in relationships now. But you can learn a new language. It just takes practice and patience."
      },
      {
        type: "insight",
        title: "Earned Secure Attachment",
        content: "You are not doomed by your early experiences. Research shows that through therapy, healthy relationships, and intentional work, you can develop earned secure attachment. This means even if you did not learn secure attachment as a child, you can learn it as an adult. The brain remains plastic. Relationships can heal.",
        source: "Dr. Mary Main, Attachment Research"
      },
      {
        type: "knowledge-check",
        question: "Someone you care about has not texted you back in 3 hours. What's your first reaction?",
        options: [
          {
            text: "They are probably busy. I will hear from them when they have time.",
            isCorrect: true,
            feedback: "This is secure attachment. You trust that their silence is not about you. You can hold the uncertainty without spiraling. This does not mean you never feel anxious. It means you can regulate the anxiety without it taking over. This capacity is built, not born. Every time you choose this response, you are strengthening secure attachment."
          },
          {
            text: "What did I do wrong? Are they mad at me? Should I send another text?",
            isCorrect: false,
            feedback: "This is anxious attachment. Silence feels like threat. But here's what's important: recognizing the pattern is the first step. The next step is asking yourself: what evidence do I have that their silence means something bad? Usually, the answer is: none. This is old programming. You can choose a different response."
          },
          {
            text: "Whatever. I do not need them anyway. I am fine on my own.",
            isCorrect: false,
            feedback: "This is avoidant attachment. Connection feels risky, so you protect yourself by minimizing its importance. But underneath the independence is often deep longing. The work is not to force yourself to be more vulnerable. It is to slowly build trust that connection can be safe. Small steps. Safe people."
          }
        ]
      },
      {
        type: "application",
        scenario: "A close friend cancels plans last minute. You feel a wave of rejection and anger.",
        question: "How do you respond from a secure attachment place?",
        insights: [
          "Notice the feeling: I feel rejected and angry. This makes sense given my history.",
          "Reality check: is this about today or about old wounds? Probably both.",
          "Communicate: I felt disappointed when plans changed. Can we reschedule?",
          "Hold complexity: they are allowed to cancel. I am allowed to feel disappointed. Both are true.",
          "Self soothe: this one cancellation does not mean I am unimportant. It means they had a conflict."
        ]
      },
      {
        type: "reflection",
        prompt: "Explore your attachment patterns",
        guidingQuestions: [
          "In close relationships, do I tend to move toward people, away from people, or both?",
          "What did I learn about love and safety in my earliest relationships?",
          "Where do I see those patterns showing up now?",
          "What would secure attachment look like for me?"
        ],
        placeholder: "When I think about how I connect with others..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Addiction thrives in isolation. Many people in recovery have attachment wounds that make connection feel unsafe. But humans are wired for connection. Recovery is not just about stopping substances. It is about learning to connect in ways that feel safe and sustainable. Understanding your attachment style is a roadmap for that healing.",
        source: "Attachment and Addiction Research"
      }
    ],
    relatedBlocks: [7],
    relatedArticles: [7]
  },

  {
    id: 7,
    title: "Cognitive Distortions",
    subtitle: "Identifying and challenging unhelpful thought patterns",
    pillar: 'cognitive-reframing',
    pillarName: 'Cognitive Reframing',
    pillarColor: '#F39C12',
    thoughtLeader: 'Aaron Beck, David Burns',
    microBlocks: ['Thought patterns', 'Cognitive restructuring', 'Evidence-based thinking'],
    estimatedTime: 14,
    image: "https://images.unsplash.com/photo-1609740455460-25753b179d1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzdW5zZXQlMjBiYWxhbmNlJTIwY2FsbXxlbnwxfHx8fDE3NjExNjM5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    components: [
      {
        type: "concept-summary",
        title: "What Are Cognitive Distortions?",
        content: "Cognitive distortions are habitual errors in thinking that make reality seem worse than it is. They are not character flaws. They are thinking habits, often learned in childhood or trauma, that your brain defaulted to as a way of protecting you. The problem is, these distortions create suffering. The good news is, they can be identified and changed.",
        keyPoints: [
          "All or nothing thinking: seeing everything in black and white extremes",
          "Catastrophizing: assuming the worst possible outcome will happen",
          "Mind reading: believing you know what others are thinking",
          "Should statements: rigid rules about how you or others should behave"
        ],
        visualMetaphor: "Think of cognitive distortions like wearing tinted glasses. If you are wearing dark gray lenses, everything looks darker. The world has not changed. Your lens has. Learning to identify distortions is like taking off the tinted glasses and seeing what is actually there."
      },
      {
        type: "insight",
        title: "Thoughts Are Not Facts",
        content: "Just because you think something does not make it true. This sounds obvious, but most people treat their thoughts as gospel. Cognitive restructuring teaches you to examine your thoughts like a scientist: what is the evidence for this thought? What is the evidence against it? What is a more balanced way of seeing this situation?",
        source: "Dr. Aaron Beck, Cognitive Therapy and the Emotional Disorders"
      },
      {
        type: "knowledge-check",
        question: "You made a mistake at work. Your thought is: I always mess everything up. This is an example of:",
        options: [
          {
            text: "All or nothing thinking and overgeneralization",
            isCorrect: true,
            feedback: "Yes. 'Always' and 'everything' are the clues. One mistake becomes total failure. This is your brain protecting you by catastrophizing so you will be extra careful. But it creates unnecessary suffering. A more balanced thought: I made a mistake. I can learn from this and do better next time. Same accountability, less shame."
          },
          {
            text: "Accurate self assessment",
            isCorrect: false,
            feedback: "This is not accuracy. This is distortion. Accuracy would sound like: I made a mistake on this task. I have also done many things well. I am human. The distortion takes one data point (this mistake) and makes it your entire identity. That is not truth. That is cognitive distortion."
          },
          {
            text: "Helpful motivation to improve",
            isCorrect: false,
            feedback: "Shame is not motivation. It is paralysis. Research shows that self compassion leads to more learning and growth than self criticism. When you tell yourself you always mess up, you trigger threat response, which shuts down learning. A better motivator: I can learn from this. I am capable of growth."
          }
        ]
      },
      {
        type: "application",
        scenario: "A friend did not respond to your text. Your mind immediately goes to: they are mad at me. I must have said something wrong.",
        question: "How do you challenge this cognitive distortion?",
        insights: [
          "Identify the distortion: this is mind reading. I am assuming I know what they are thinking without evidence.",
          "Check the evidence: what evidence do I have that they are mad? None. What other explanations exist? Many.",
          "Generate alternatives: maybe they are busy. Maybe they did not see it. Maybe they are struggling themselves.",
          "Reality test: if I am really worried, I can ask directly. What I am doing now is making up a story and believing it.",
          "Practice balanced thinking: I sent a text. I have not heard back yet. That is all I know. Everything else is speculation."
        ]
      },
      {
        type: "reflection",
        prompt: "Identify your most common cognitive distortions",
        guidingQuestions: [
          "Do I tend toward all or nothing thinking? Catastrophizing? Mind reading?",
          "Where did I learn these patterns? Who modeled them?",
          "How do these distortions create suffering in my life?",
          "What would it feel like to question these thoughts instead of believing them automatically?"
        ],
        placeholder: "My most common cognitive distortion is..."
      },
      {
        type: "insight",
        title: "Why This Matters for Recovery",
        content: "Cognitive distortions fuel the addiction cycle. I am worthless becomes I might as well use. This is hopeless becomes why bother trying. Everyone hates me becomes I will isolate and numb. Learning to catch and challenge these distortions is like cutting the fuel line to relapse. The thoughts still come, but you do not have to believe them.",
        source: "Cognitive Behavioral Therapy for Addiction"
      }
    ],
    relatedBlocks: [8],
    relatedArticles: [3]
  }
];

// Helper functions
export function getBuildingBlockById(id: number): BuildingBlock | undefined {
  return buildingBlockLibrary.find(block => block.id === id);
}

export function getRelatedBuildingBlocks(blockId: number): BuildingBlock[] {
  const block = getBuildingBlockById(blockId);
  if (!block || !block.relatedBlocks) return [];
  
  return block.relatedBlocks
    .map(id => getBuildingBlockById(id))
    .filter((b): b is BuildingBlock => b !== undefined);
}

export function getBuildingBlocksByPillar(pillar: PillarType): BuildingBlock[] {
  return buildingBlockLibrary.filter(block => block.pillar === pillar);
}

/**
 * COMPLETE INSIGHT LIBRARY
 * 30 total insights (5 per pillar)
 * Micro-learning content pieces: Mechanism → Application
 */

import { InsightData } from '../components/insights/InsightPage';

// ============================================================================
// PILLAR 1: EMOTIONAL REGULATION (5 Insights)
// ============================================================================

const emotionalRegulationInsights: InsightData[] = [
  {
    id: 'ER_WOT_GRD_001',
    title: 'The Vagal Brake: Your Reset Button',
    subtitle: 'How your exhale controls your calm',
    pillarName: 'Emotional Regulation',
    pillarId: 'ER',
    conceptName: 'State → Story',
    themeName: 'Ground the Body',
    blockName: 'Execute Resonant Breathing to increase HRV',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: "The vagus nerve acts as your nervous system's brake pedal. Learning to engage it gives you the power to downshift arousal on demand.",
    contextPath: 'Part of Ground the Body within State → Story',
    keywords: {
      primary: ['grounding', 'breathwork', 'stress'],
      secondary: ['vagal tone', 'parasympathetic', 'HRV'],
      tertiary: ['resonant breathing', 'nervous system', 'calm']
    },
    mechanismContent: `The vagus nerve is the longest nerve in your autonomic nervous system, running from your brainstem down through your heart, lungs, and digestive system. It acts like a brake that slows your system when arousal spikes.

When you take a long, slow exhale, you activate the parasympathetic branch of this nerve, which signals your body to downshift from fight-or-flight mode. This isn't just relaxation—it's a measurable physiological shift.

Training resonant breathing (around 5-6 breaths per minute) strengthens this "vagal brake" over time, ensuring a faster return to baseline after stress hits. The more you practice, the more responsive this system becomes.`,
    keyTakeaway: 'Your exhale is the remote control for your calm.',
    applicationInstruction: 'When you feel your heart racing or your thoughts speeding up, pause and take six slow breaths: breathe in for 4 counts, out for 6 counts. Focus on making the exhale longer and smoother than the inhale.',
    applicationExample: "You're about to walk into a difficult conversation and you feel your chest tightening. Before you enter, you stop for 60 seconds and take six slow breaths, focusing on the long exhale.",
    applicationOutcome: 'Your nervous system downshifts within 60-90 seconds. Your heart rate slows, your thoughts clear, and you have more room to choose how you respond.',
    checkpoints: [
      {
        type: 'before',
        question: 'Before we begin, how familiar are you with the vagal brake?',
        options: [
          'New to me',
          "I've heard of it",
          'I know it well and use it'
        ]
      },
      {
        type: 'comprehension',
        question: 'Which technique activates the vagal brake most directly?',
        options: [
          'Holding your breath for as long as possible',
          'Taking fast, shallow breaths',
          'Taking slow breaths with a longer exhale'
        ],
        correctAnswer: 2
      },
      {
        type: 'intent',
        question: 'When will you try this technique?',
        options: [
          'Right now',
          'Later today',
          'This week',
          'When I notice I need it'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'resonant-breathing-pacer',
      practiceName: 'Resonant Breathing Pacer',
      previewText: 'A 2-minute guided breathing practice that activates your vagal brake with visual pacing.',
      duration: '2 min'
    },
    relatedContent: [
      {
        id: 'article_hrv_science',
        type: 'article',
        title: 'Heart Rate Variability: Your Nervous System Report Card'
      },
      {
        id: 'ER_WOT_AIM_001',
        type: 'insight',
        title: 'Cue-Lock vs. Open Focus'
      },
      {
        id: 'box-breathing',
        type: 'practice',
        title: 'Box Breathing (4-4-4-4)'
      }
    ]
  },

  {
    id: 'ER_WOT_AIM_001',
    title: 'Cue-Lock vs. Open Focus',
    subtitle: 'Breaking attention lock on triggers',
    pillarName: 'Emotional Regulation',
    pillarId: 'ER',
    conceptName: 'State → Story',
    themeName: 'Aim Attention',
    blockName: 'Use 3×3 Sensory Scan to break cue-lock',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'When fear or craving spikes, your attention narrows onto the cue (the trigger). Breaking this lock widens your window of tolerance and restores choice.',
    contextPath: 'Part of Aim Attention within State → Story',
    keywords: {
      primary: ['anxiety', 'grounding', 'awareness'],
      secondary: ['cue-lock', 'sensory scan', 'mindfulness'],
      tertiary: ['window of tolerance', 'attention shift', 'present moment']
    },
    mechanismContent: `When arousal spikes, your brain enters "cue-lock"—attention narrows, collapsing onto the trigger (a face, a place, a substance, a thought). This is your brain trying to protect you by focusing resources, but it eliminates choice.

Neuroscience shows that deliberately shifting attention away from the cue and onto neutral sensory input (sights, sounds, textures) recruits prefrontal control networks. This move—called attentional flexibility—literally widens your window of tolerance.

The 3×3 Sensory Scan is a simple protocol: name 3 things you see, 3 things you hear, 3 things you feel (texture, temperature, pressure). This breaks the lock and brings you into present-moment awareness.`,
    keyTakeaway: 'Move the light. When attention is stuck, shift it deliberately to your senses.',
    applicationInstruction: 'When you feel attention narrowing onto a trigger (craving, worry, person), pause and complete a 3×3 Sensory Scan: 3 sights, 3 sounds, 3 textures.',
    applicationExample: 'You walk past a bar and feel a strong urge rising. Your attention locks onto the door. You stop, take a breath, and scan: "Green sign. Red car. Tree branch. Engine sound. Bird chirping. Wind. Cool air on arms. Feet on ground. Phone in pocket."',
    applicationOutcome: 'Within 60 seconds, the cue loses its grip. Your attention widens, your breathing steadies, and you can choose your next move.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do you notice your attention "locking" onto a trigger?',
        options: [
          'All the time',
          'Sometimes',
          'Rarely',
          "I'm not sure"
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the purpose of the 3×3 Sensory Scan?',
        options: [
          'To distract yourself permanently',
          'To break cue-lock and widen your attention',
          'To make the trigger disappear'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Where will you use this technique first?',
        options: [
          'When cravings hit',
          'When anxiety spikes',
          "When I'm stuck in worry",
          'In any high-stress moment'
        ]
      }
    ],
    practiceConnection: {
      practiceId: '3x3-sensory-scan',
      practiceName: '3×3 Sensory Scan',
      previewText: 'A 90-second practice that breaks cue-lock and brings you into the present moment.',
      duration: '90 sec'
    },
    relatedContent: [
      {
        id: 'ER_WOT_GRD_001',
        type: 'insight',
        title: 'The Vagal Brake: Your Reset Button'
      },
      {
        id: 'article_window_tolerance',
        type: 'article',
        title: 'Window of Tolerance: Your Emotional Bandwidth'
      },
      {
        id: '5-4-3-2-1-grounding',
        type: 'practice',
        title: '5-4-3-2-1 Grounding'
      }
    ]
  },

  {
    id: 'ER_WOT_REC_001',
    title: 'Name It to Tame It: The Labeling Effect',
    subtitle: 'How naming emotions creates space',
    pillarName: 'Emotional Regulation',
    pillarId: 'ER',
    conceptName: 'State → Story',
    themeName: 'Recontextualize Sensation',
    blockName: 'Label emotion without story attachment',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Naming your emotion activates your prefrontal cortex and dampens your amygdala. This simple act creates distance between you and the feeling, restoring your ability to choose.',
    contextPath: 'Part of Recontextualize Sensation within State → Story',
    keywords: {
      primary: ['anger', 'awareness', 'regulation'],
      secondary: ['affect labeling', 'prefrontal cortex', 'amygdala'],
      tertiary: ['emotional naming', 'mindfulness', 'distance']
    },
    mechanismContent: `When you experience a strong emotion, your amygdala (the brain's alarm system) fires intensely. If left unchecked, it hijacks your capacity to think clearly or make intentional choices.

Research by UCLA neuroscientist Matthew Lieberman shows that simply naming an emotion—"I feel angry" or "This is anxiety"—activates the right ventrolateral prefrontal cortex, which dampens amygdala activation. This process, called affect labeling, literally reduces the emotional charge.

The key is to name the emotion without adding a story. "I feel rage" is powerful. "I feel rage because they disrespected me and now I need to..." attaches a narrative that re-amplifies the emotion. Name it. Don't explain it.`,
    keyTakeaway: 'Naming shrinks the emotional charge. The label creates space.',
    applicationInstruction: 'When a strong emotion hits, pause and silently name it with precision: "Anger." "Shame." "Grief." "Fear." Use one or two words. Do not justify or explain. Just name.',
    applicationExample: 'Someone cuts you off in traffic and rage floods your body. Instead of spinning into a story about disrespect, you say internally: "Rage. Heat. Adrenaline." The emotion peaks and begins to subside within 90 seconds.',
    applicationOutcome: 'The emotion still exists, but it no longer controls you. You feel it, name it, and make space to decide what comes next.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do you label your emotions in the moment?',
        options: [
          'Never',
          'Sometimes',
          'Often',
          'Always'
        ]
      },
      {
        type: 'comprehension',
        question: 'What makes affect labeling effective?',
        options: [
          'It makes the emotion disappear',
          'It activates prefrontal areas that dampen the amygdala',
          'It distracts you from the emotion'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Which emotion will you practice naming first?',
        options: [
          'Anger',
          'Anxiety',
          'Shame',
          'Sadness',
          'Whatever shows up next'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'rain-protocol',
      practiceName: 'RAIN: Recognize, Allow, Investigate, Nurture',
      previewText: 'A 5-minute mindfulness practice for working with difficult emotions through labeling and acceptance.',
      duration: '5 min'
    },
    relatedContent: [
      {
        id: 'article_emotion_labeling',
        type: 'article',
        title: 'The Neuroscience of Emotional Labeling'
      },
      {
        id: 'ER_WOT_GRD_001',
        type: 'insight',
        title: 'The Vagal Brake: Your Reset Button'
      },
      {
        id: 'body-scan-basic',
        type: 'practice',
        title: 'Body Scan for Emotional Awareness'
      }
    ]
  },

  {
    id: 'ER_BR_PHY_001',
    title: 'The Double Inhale: Emergency Brake for Panic',
    subtitle: 'The fastest way to interrupt panic',
    pillarName: 'Emotional Regulation',
    pillarId: 'ER',
    conceptName: 'Build → Release',
    themeName: 'Physiological Reset',
    blockName: 'Execute Physiological Sigh for rapid arousal reduction',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'The physiological sigh is the fastest known method for reducing acute stress and panic. Two inhales followed by a long exhale offload CO2 and reset your nervous system in seconds.',
    contextPath: 'Part of Physiological Reset within Build → Release',
    keywords: {
      primary: ['anxiety', 'fear', 'breathwork'],
      secondary: ['panic response', 'physiological sigh', 'CO2'],
      tertiary: ['emergency brake', 'acute stress', 'reset']
    },
    mechanismContent: `During stress or panic, small air sacs in your lungs (alveoli) collapse, trapping CO2 and triggering feelings of suffocation. This feeds the panic loop.

The physiological sigh is a breathing pattern discovered by Stanford neuroscientist Andrew Huberman: two sharp inhales through the nose (the second one "tops off" the lungs), followed by a long, slow exhale through the mouth. The double inhale re-inflates collapsed alveoli, and the extended exhale offloads the trapped CO2.

This isn't a relaxation technique. It's an emergency brake. One or two cycles can interrupt a panic response within 10-30 seconds. It works faster than box breathing or resonant breathing because it targets the physiological root of the panic sensation.`,
    keyTakeaway: 'Two quick inhales, one long exhale. Panic interrupted in seconds.',
    applicationInstruction: 'When you feel panic rising (chest tightness, racing heart, suffocation feeling), execute 2-3 physiological sighs: inhale sharply through the nose, take a second "sip" of air through the nose, then exhale slowly through the mouth.',
    applicationExample: "You're in a crowded room and suddenly your chest tightens and your vision narrows. You step aside and do three physiological sighs. Within 20 seconds, the suffocation feeling lifts.",
    applicationOutcome: 'The panic response breaks. Your breathing normalizes, your vision clears, and you regain the ability to think and move.',
    checkpoints: [
      {
        type: 'before',
        question: 'Have you experienced panic attacks or acute anxiety?',
        options: [
          'Frequently',
          'Sometimes',
          'Rarely',
          'Never'
        ]
      },
      {
        type: 'comprehension',
        question: 'What makes the physiological sigh effective for panic?',
        options: [
          'It calms you down over time',
          'It re-inflates alveoli and offloads CO2',
          'It distracts you from the panic'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you try this the next time panic hits?',
        options: [
          'Yes, immediately',
          'Yes, after I practice it a few times',
          "I'll consider it",
          "I don't experience panic"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'physiological-sigh',
      practiceName: 'Physiological Sigh Protocol',
      previewText: 'A 30-second practice for interrupting panic and acute stress.',
      duration: '30 sec'
    },
    relatedContent: [
      {
        id: 'article_panic_physiology',
        type: 'article',
        title: 'Understanding Panic: What Happens in Your Body'
      },
      {
        id: 'ER_WOT_GRD_001',
        type: 'insight',
        title: 'The Vagal Brake: Your Reset Button'
      },
      {
        id: 'box-breathing',
        type: 'practice',
        title: 'Box Breathing for Baseline Regulation'
      }
    ]
  },

  {
    id: 'ER_BR_SOM_001',
    title: 'Where Emotions Live: The Body Keeps Score',
    subtitle: 'Releasing stored tension and trauma',
    pillarName: 'Emotional Regulation',
    pillarId: 'ER',
    conceptName: 'Build → Release',
    themeName: 'Somatic Awareness',
    blockName: 'Complete body scan to release somatic holding patterns',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Trauma and stress are stored in the body as muscular tension and holding patterns. Scanning your body systematically releases these patterns and restores emotional regulation capacity.',
    contextPath: 'Part of Somatic Awareness within Build → Release',
    keywords: {
      primary: ['stress', 'awareness', 'grounding'],
      secondary: ['body scan', 'somatic', 'interoception'],
      tertiary: ['tension release', 'holding patterns', 'embodiment']
    },
    mechanismContent: `Emotions are not just "in your head." Every emotion has a distinct physiological signature—anger tightens the jaw and shoulders, anxiety clenches the stomach, shame collapses the chest.

When emotions go unexpressed or unprocessed, the body "holds" them as chronic tension. This is why people carry stress in their neck, clench their jaw at night, or feel a heavy weight in their chest. The body is storing what the mind cannot process.

Body scanning—systematically moving attention through each part of your body—activates interoceptive awareness (your ability to sense internal states). Research shows this practice reduces amygdala reactivity and increases your capacity to feel emotions without being overwhelmed by them. You learn to notice tension before it becomes a chronic holding pattern.`,
    keyTakeaway: 'Your body is holding what your mind cannot process. Scan to release.',
    applicationInstruction: 'Set aside 8 minutes. Lie down or sit comfortably. Starting at your feet, slowly move your attention up through your body: feet, calves, thighs, hips, stomach, chest, shoulders, arms, neck, face. Notice any tension without trying to change it.',
    applicationExample: "You've been anxious all day but can't pinpoint why. You do a body scan and notice your jaw is clenched, your shoulders are up near your ears, and your stomach is tight. As you notice each area, the tension begins to soften.",
    applicationOutcome: 'Chronic tension releases. You feel lighter, more present, and more emotionally available. Over time, you develop the ability to catch tension early and release it before it becomes a pattern.',
    checkpoints: [
      {
        type: 'before',
        question: 'Where do you typically hold stress in your body?',
        options: [
          'Jaw, neck, shoulders',
          'Stomach, chest',
          'Back, hips',
          "I'm not sure"
        ]
      },
      {
        type: 'comprehension',
        question: 'Why does body scanning help with emotional regulation?',
        options: [
          'It distracts you from emotions',
          'It releases stored tension and increases interoceptive awareness',
          'It makes emotions disappear'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'When will you try a body scan?',
        options: [
          'Tonight before bed',
          'Tomorrow',
          'This week',
          'When I notice tension building'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'progressive-muscle-relaxation',
      practiceName: 'Progressive Muscle Relaxation (PMR)',
      previewText: 'An 8-minute practice that systematically releases tension from head to toe.',
      duration: '8 min'
    },
    relatedContent: [
      {
        id: 'article_body_trauma',
        type: 'article',
        title: 'Trauma and the Body: Why Emotions Get Stuck'
      },
      {
        id: 'ER_WOT_REC_001',
        type: 'insight',
        title: 'Name It to Tame It: The Labeling Effect'
      },
      {
        id: 'body-scan-basic',
        type: 'practice',
        title: 'Basic Body Scan (5 minutes)'
      }
    ]
  }
];

// ============================================================================
// PILLAR 2: STRESS RESILIENCE (5 Insights)
// ============================================================================

const stressResilienceInsights: InsightData[] = [
  {
    id: 'SR_BRK_CAP_001',
    title: 'HRV: The Capacity Score',
    subtitle: 'Training your nervous system flexibility',
    pillarName: 'Stress Resilience',
    pillarId: 'SR',
    conceptName: 'Brake & Pilot',
    themeName: 'Thicken the Brake',
    blockName: 'Execute Box/Sigh breath sets to raise HRV capacity',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: "Heart Rate Variability (HRV) measures your nervous system's flexibility—the higher it is, the faster you recover from stress and the better you handle pressure.",
    contextPath: 'Part of Thicken the Brake within Brake & Pilot',
    keywords: {
      primary: ['resilience', 'stress', 'breathwork'],
      secondary: ['HRV', 'capacity', 'vagal tone'],
      tertiary: ['nervous system', 'training', 'flexibility']
    },
    mechanismContent: `Heart Rate Variability (HRV) is the variation in time between your heartbeats. Counterintuitively, more variability is better—it means your nervous system is flexible and responsive.

When HRV is high, your "vagal brake" is strong. You recover faster after stress, handle pressure better, and have more room between stimulus and response. When HRV is low, you're running on fumes—rigid, reactive, exhausted.

Research shows you can train HRV higher through consistent breathing practices. Box breathing (4-4-4-4) and resonant breathing (5.5 breaths per minute) directly strengthen your parasympathetic tone. Think of it as weightlifting for your nervous system.`,
    keyTakeaway: 'HRV is trainable capacity. Daily breath practice raises the ceiling.',
    applicationInstruction: 'Set a daily 5-minute breathing practice: Box breathing (inhale 4, hold 4, exhale 4, hold 4) or resonant breathing (inhale 5, exhale 6). Do it at the same time each day.',
    applicationExample: 'Every morning after coffee, you spend 5 minutes doing box breathing. After two weeks, you notice you recover faster from stressful meetings and sleep better at night.',
    applicationOutcome: 'Over 2-4 weeks, your baseline HRV rises. You feel steadier in the morning, less reactive during the day, and recover faster after hard moments.',
    checkpoints: [
      {
        type: 'before',
        question: 'Have you tracked or thought about your HRV before?',
        options: [
          'Yes, I track it regularly',
          "I've heard of it but never tracked it",
          'This is new to me'
        ]
      },
      {
        type: 'comprehension',
        question: 'What does high HRV indicate?',
        options: [
          'Your heart is beating too fast',
          'Your nervous system is flexible and resilient',
          'You need to exercise more'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'When will you start a daily breathing practice?',
        options: [
          'Tomorrow morning',
          'This week',
          'When I feel ready',
          'I already have one'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'box-breathing-hrv',
      practiceName: 'Box Breathing (HRV Builder)',
      previewText: '5-minute daily practice designed to raise your HRV capacity over time.',
      duration: '5 min'
    },
    relatedContent: [
      {
        id: 'article_hrv_training',
        type: 'article',
        title: 'The Science of HRV: Training Your Nervous System'
      },
      {
        id: 'ER_WOT_GRD_001',
        type: 'insight',
        title: 'The Vagal Brake: Your Reset Button'
      },
      {
        id: 'resonant-breathing-pacer',
        type: 'practice',
        title: 'Resonant Breathing Pacer'
      }
    ]
  },

  {
    id: 'SR_BRK_PIL_001',
    title: 'The SUDS Scale: Your Internal Thermometer',
    subtitle: 'Rating distress to regulate it',
    pillarName: 'Stress Resilience',
    pillarId: 'SR',
    conceptName: 'Brake & Pilot',
    themeName: 'Pilot Awareness',
    blockName: 'Track arousal using Subjective Units of Distress (SUDS)',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'You cannot regulate what you cannot measure. Learning to rate your distress in real time gives you the data you need to intervene before you hit the red zone.',
    contextPath: 'Part of Pilot Awareness within Brake & Pilot',
    keywords: {
      primary: ['awareness', 'stress', 'regulation'],
      secondary: ['SUDS', 'interoception', 'arousal tracking'],
      tertiary: ['early warning', 'self-monitoring', 'measurement']
    },
    mechanismContent: `The SUDS scale (Subjective Units of Distress) is a simple 0-10 rating of your current arousal level. 0 is completely calm. 10 is the worst distress you've ever felt. Everything else falls in between.

This tool gives you interoceptive precision—the ability to sense and name your internal state. Research shows that people who can accurately track their arousal levels have better emotional regulation outcomes because they can intervene early.

At 3-4, you still have cognitive control. At 7-8, your prefrontal cortex is offline and you're in survival mode. By tracking your SUDS throughout the day, you learn your patterns, identify early warning signs, and deploy tools before you lose capacity.`,
    keyTakeaway: 'Rate it to regulate it. SUDS gives you early warning.',
    applicationInstruction: 'Three times today, pause and ask: "What\'s my SUDS right now?" Rate yourself 0-10. Notice your body signals at each level. Write down what you feel at 3, 5, and 7.',
    applicationExample: "You\'re in a meeting and someone criticizes your work. You pause internally and notice your SUDS is climbing to a 6. You excuse yourself for 60 seconds, do three physiological sighs, and return at a 4.",
    applicationOutcome: 'You develop the ability to catch arousal early and intervene before you hit the point of no return. Over time, you spend less time in the red zone.',
    checkpoints: [
      {
        type: 'before',
        question: 'How well can you rate your stress level in the moment?',
        options: [
          'Very well',
          'Somewhat well',
          'Not well',
          "I've never tried"
        ]
      },
      {
        type: 'comprehension',
        question: 'Why is tracking SUDS useful for regulation?',
        options: [
          'It makes stress go away',
          'It gives early warning so you can intervene before losing control',
          'It proves how stressed you are'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'How often will you check your SUDS this week?',
        options: [
          '3+ times per day',
          'Once per day',
          'When I notice stress rising',
          "I'm not sure yet"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'suds-check-in',
      practiceName: 'SUDS Body Check-In',
      previewText: 'A 2-minute practice to rate your distress and identify body signals.',
      duration: '2 min'
    },
    relatedContent: [
      {
        id: 'article_interoception',
        type: 'article',
        title: 'Interoception: Learning to Read Your Body'
      },
      {
        id: 'SR_BRK_CAP_001',
        type: 'insight',
        title: 'HRV: The Capacity Score'
      },
      {
        id: 'body-scan-basic',
        type: 'practice',
        title: 'Body Scan for Awareness'
      }
    ]
  },

  {
    id: 'SR_LR_RCV_001',
    title: 'Recovery Is Not Rest: The Active Recovery Principle',
    subtitle: 'Building resilience through strategic rest',
    pillarName: 'Stress Resilience',
    pillarId: 'SR',
    conceptName: 'Load → Recover',
    themeName: 'Active Recovery',
    blockName: 'Schedule deliberate recovery windows after stress exposure',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'True resilience is not built through endless endurance. It is built through strategic cycles of stress and recovery. Without recovery, you adapt to nothing—you just burn out.',
    contextPath: 'Part of Active Recovery within Load → Recover',
    keywords: {
      primary: ['resilience', 'coping', 'stress'],
      secondary: ['recovery', 'hormesis', 'adaptation'],
      tertiary: ['burnout prevention', 'parasympathetic', 'cycles']
    },
    mechanismContent: `Your nervous system does not get stronger from stress alone. It gets stronger from the recovery that follows stress. This is called hormesis—the principle that short bursts of stress, followed by adequate recovery, create adaptation and growth.

Active recovery is not passive rest. It's deliberate engagement of the parasympathetic nervous system through breathwork, gentle movement, or social connection. Research shows that 10-15 minutes of active recovery after a stressor accelerates HRV return to baseline and consolidates learning.

Athletes understand this: you don't grow muscle during the workout. You grow it during recovery. The same is true for your nervous system. If you stack stress on stress without recovery windows, your system stays in a state of chronic activation—inflamed, exhausted, and brittle.`,
    keyTakeaway: 'Growth happens in recovery, not in the grind. Schedule it like training.',
    applicationInstruction: 'After any stressful event (hard conversation, triggering situation, intense work block), take 10 minutes of active recovery: walk, breathe, stretch, or connect with someone safe. Do not check your phone.',
    applicationExample: 'After a difficult therapy session, instead of jumping back into work, you take a 10-minute walk outside. You feel the air, notice the trees, and let your system reset.',
    applicationOutcome: 'You return to baseline faster. Over time, your capacity to handle stress increases because you are actually recovering, not just enduring.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you currently schedule recovery after stressful events?',
        options: [
          'Yes, always',
          'Sometimes',
          'Rarely',
          'Never'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the purpose of active recovery?',
        options: [
          'To avoid all stress',
          'To engage the parasympathetic system and accelerate baseline return',
          'To distract yourself from stress'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'What will be your go-to active recovery practice?',
        options: [
          'Walking',
          'Breathwork',
          'Stretching',
          'Connecting with someone',
          "I'll figure it out"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'recovery-walk',
      practiceName: 'Recovery Walk Protocol',
      previewText: 'A 10-minute walking practice that actively resets your nervous system.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_recovery_science',
        type: 'article',
        title: 'The Science of Recovery: Why Downtime Builds Capacity'
      },
      {
        id: 'SR_BRK_CAP_001',
        type: 'insight',
        title: 'HRV: The Capacity Score'
      },
      {
        id: 'gentle-yoga-flow',
        type: 'practice',
        title: 'Gentle Yoga Flow (Recovery)'
      }
    ]
  },

  {
    id: 'SR_LR_HOR_001',
    title: 'Hormesis: How Stress Makes You Stronger',
    subtitle: 'Using controlled stress to build capacity',
    pillarName: 'Stress Resilience',
    pillarId: 'SR',
    conceptName: 'Load → Recover',
    themeName: 'Hormetic Stressors',
    blockName: 'Expose yourself to brief, controlled stressors for adaptation',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'Avoiding all stress makes you fragile. Embracing controlled doses of stress—cold exposure, breathwork, exercise—builds genuine resilience through biological adaptation.',
    contextPath: 'Part of Hormetic Stressors within Load → Recover',
    keywords: {
      primary: ['resilience', 'stress', 'coping'],
      secondary: ['hormesis', 'adaptation', 'cold exposure'],
      tertiary: ['controlled stress', 'growth', 'capacity building']
    },
    mechanismContent: `Hormesis is the biological principle that exposure to low doses of stress triggers adaptive responses that make you stronger. Cold showers, breath holds, intense exercise, fasting—these are all hormetic stressors.

When you expose yourself to brief, controlled stress, your body activates protective mechanisms: mitochondrial growth, anti-inflammatory pathways, enhanced vagal tone, improved HRV. But the key word is brief. Chronic, uncontrolled stress does the opposite—it degrades your system.

Research shows that people who regularly engage in hormetic practices (like cold exposure or high-intensity interval training) have better stress resilience, lower baseline inflammation, and higher HRV. You are teaching your nervous system that stress is something you can handle and recover from.`,
    keyTakeaway: 'Controlled stress builds capacity. Chronic stress destroys it.',
    applicationInstruction: 'Choose one hormetic stressor to experiment with this week: 30-second cold shower, 2-minute breath hold practice, or 10-minute high-intensity walk. Start small. Recover after.',
    applicationExample: 'Every morning, you end your shower with 30 seconds of cold water. The first week is brutal. By week three, you notice you handle stressful moments during the day with more steadiness.',
    applicationOutcome: 'Your nervous system learns that you can handle hard things and recover. Your confidence grows. Your baseline resilience increases.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you currently use any hormetic stressors?',
        options: [
          'Yes, regularly',
          'Occasionally',
          'Rarely',
          'Never'
        ]
      },
      {
        type: 'comprehension',
        question: 'What makes hormetic stress different from chronic stress?',
        options: [
          'Hormetic stress is longer and more intense',
          'Hormetic stress is brief, controlled, and followed by recovery',
          'Hormetic stress is always pleasant'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Which hormetic stressor will you try first?',
        options: [
          'Cold exposure',
          'Breath holds',
          'High-intensity movement',
          'Fasting',
          "I'm not ready yet"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'wim-hof-breathing',
      practiceName: 'Wim Hof Breathing (Controlled Hypoxia)',
      previewText: 'A 10-minute breathwork practice that trains your system to handle stress.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_hormesis_science',
        type: 'article',
        title: 'Hormesis: The Biological Principle of Growth Through Stress'
      },
      {
        id: 'SR_LR_RCV_001',
        type: 'insight',
        title: 'Recovery Is Not Rest'
      },
      {
        id: 'cold-exposure-protocol',
        type: 'practice',
        title: 'Cold Exposure Protocol (Beginner)'
      }
    ]
  },

  {
    id: 'SR_TNM_SLP_001',
    title: 'Sleep: The Foundation of Everything',
    subtitle: 'Why recovery starts in bed',
    pillarName: 'Stress Resilience',
    pillarId: 'SR',
    conceptName: 'Tank Maintenance',
    themeName: 'Sleep Architecture',
    blockName: 'Optimize sleep hygiene to restore baseline resilience',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Every regulation tool, every practice, every insight relies on a foundation of adequate sleep. Without it, your prefrontal cortex is offline, your HRV is crushed, and you are running on survival mode.',
    contextPath: 'Part of Sleep Architecture within Tank Maintenance',
    keywords: {
      primary: ['stress', 'resilience', 'coping'],
      secondary: ['sleep', 'circadian rhythm', 'recovery'],
      tertiary: ['sleep hygiene', 'HRV', 'restoration']
    },
    mechanismContent: `Sleep is not optional. It is the biological reset that consolidates learning, clears metabolic waste from the brain, restores HRV, and rebuilds prefrontal capacity.

When you sleep poorly, your amygdala becomes hyperactive (more reactive to threats), your prefrontal cortex weakens (less impulse control), and your HRV plummets (less resilience). One night of bad sleep reduces your window of tolerance by 30-40%.

Research shows that consistent sleep hygiene—same bedtime, cool room, no screens 1 hour before bed, morning sunlight exposure—can restore sleep architecture within 2-3 weeks. The improvements cascade: better mood, better focus, better regulation, better HRV.`,
    keyTakeaway: 'Sleep is the master regulator. Everything else depends on it.',
    applicationInstruction: 'This week, commit to three sleep hygiene rules: same bedtime every night, no screens 1 hour before bed, and 10 minutes of morning sunlight within 30 minutes of waking.',
    applicationExample: 'You set a 10pm alarm that signals "screens off." You read for 20 minutes, then sleep. You wake at 6am and step outside for 10 minutes. After one week, you notice your mood is steadier and your reactivity is lower.',
    applicationOutcome: 'Your sleep quality improves. Your HRV rises. Your window of tolerance expands. You have more capacity for everything else.',
    checkpoints: [
      {
        type: 'before',
        question: 'How would you rate your current sleep quality?',
        options: [
          'Excellent',
          'Good',
          'Fair',
          'Poor'
        ]
      },
      {
        type: 'comprehension',
        question: 'What happens to your nervous system when you sleep poorly?',
        options: [
          'Nothing significant',
          'Amygdala hyperactivity, prefrontal weakening, HRV drop',
          'You just feel tired'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Which sleep hygiene practice will you start first?',
        options: [
          'Consistent bedtime',
          'No screens before bed',
          'Morning sunlight',
          'All three',
          "I'm not sure"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'sleep-wind-down',
      practiceName: 'Sleep Wind-Down Routine',
      previewText: 'A 15-minute evening routine that prepares your nervous system for deep sleep.',
      duration: '15 min'
    },
    relatedContent: [
      {
        id: 'article_sleep_science',
        type: 'article',
        title: 'The Neuroscience of Sleep: Why It Matters for Recovery'
      },
      {
        id: 'SR_BRK_CAP_001',
        type: 'insight',
        title: 'HRV: The Capacity Score'
      },
      {
        id: 'progressive-muscle-relaxation',
        type: 'practice',
        title: 'Progressive Muscle Relaxation (PMR) for Sleep'
      }
    ]
  }
];

// ============================================================================
// PILLAR 3: SOCIAL CONNECTIVITY (5 Insights)
// ============================================================================

const socialConnectivityInsights: InsightData[] = [
  {
    id: 'SC_CAL_SCR_001',
    title: 'Co-Regulation: Borrowing Calm from Others',
    subtitle: 'How safe connection regulates your nervous system',
    pillarName: 'Social Connectivity',
    pillarId: 'SC',
    conceptName: 'Calibrate',
    themeName: 'Social Regulation',
    blockName: 'Practice co-regulation through intentional presence',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Humans are not designed to regulate alone. Your nervous system is wired to sync with others. Co-regulation is the foundation of relational healing.',
    contextPath: 'Part of Social Regulation within Calibrate',
    keywords: {
      primary: ['connection', 'relationships', 'support'],
      secondary: ['co-regulation', 'nervous system', 'presence'],
      tertiary: ['social baseline', 'mirror neurons', 'regulation']
    },
    mechanismContent: `Co-regulation is the process by which one nervous system helps regulate another. When you are dysregulated and you spend time with someone who is calm and present, your HRV begins to sync with theirs. This is not metaphor—it is measurable physiology.

Mirror neurons fire when you observe someone else's emotional state. If they are calm, your system receives the signal: "It is safe to calm down." If they are anxious, your system mirrors that too. This is why being around certain people feels grounding and others feel destabilizing.

Research shows that infants and children develop self-regulation capacity through repeated experiences of co-regulation with caregivers. But adults need it too. You cannot always regulate yourself alone, and you should not have to. Seeking co-regulation is not weakness—it is biology.`,
    keyTakeaway: 'You are not meant to regulate alone. Safe connection is medicine.',
    applicationInstruction: 'When you feel dysregulated, identify one person whose presence feels calming. Spend 10-15 minutes with them—in person if possible. You do not need to talk about the problem. Just be near them.',
    applicationExample: "You're anxious after a hard day. Instead of isolating, you call a friend and ask if you can come over. You sit on their couch, drink tea, and just exist in their presence. After 20 minutes, your breathing slows.",
    applicationOutcome: 'Your nervous system borrows calm from theirs. You return to baseline faster than if you had tried to regulate alone.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you tend to isolate when dysregulated?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is co-regulation?',
        options: [
          'Talking through your problems',
          'One nervous system helping to regulate another through presence',
          'Avoiding people when upset'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Who is one person you can seek co-regulation from?',
        options: [
          'I know exactly who',
          'I have a few options',
          "I'm not sure yet",
          'I prefer to regulate alone'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'co-regulation-practice',
      practiceName: 'Co-Regulation Check-In',
      previewText: 'A guided practice for seeking and offering co-regulation.',
      duration: '5 min'
    },
    relatedContent: [
      {
        id: 'article_coregulation_science',
        type: 'article',
        title: 'The Neuroscience of Co-Regulation'
      },
      {
        id: 'SC_CAL_ATT_001',
        type: 'insight',
        title: 'Attunement: Feeling Felt'
      },
      {
        id: 'connection-meditation',
        type: 'practice',
        title: 'Loving-Kindness Meditation'
      }
    ]
  },

  {
    id: 'SC_CAL_ATT_001',
    title: 'Attunement: Feeling Felt',
    subtitle: 'The healing power of being truly seen',
    pillarName: 'Social Connectivity',
    pillarId: 'SC',
    conceptName: 'Calibrate',
    themeName: 'Attunement',
    blockName: 'Practice feeling felt through active listening',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'Being truly seen and understood by another person is one of the most healing experiences available. Attunement is the practice of offering and receiving this presence.',
    contextPath: 'Part of Attunement within Calibrate',
    keywords: {
      primary: ['connection', 'communication', 'relationships'],
      secondary: ['attunement', 'active listening', 'presence'],
      tertiary: ['feeling felt', 'social engagement', 'validation']
    },
    mechanismContent: `Attunement is the process of accurately perceiving and responding to another person's internal state. Daniel Siegel calls it "feeling felt"—the experience of being seen, heard, and understood without judgment or fixing.

When someone attunes to you, your nervous system registers: "I am not alone in this." This activates the ventral vagal pathway (social engagement system) and downregulates threat responses. Conversely, misattunement—being dismissed, misunderstood, or talked over—activates defensive responses.

Attunement is a skill. It requires presence, curiosity, and the temporary suspension of your own agenda. You listen not to respond, but to understand. You reflect back what you sense: "It sounds like you're feeling overwhelmed." This simple act is profoundly regulating.`,
    keyTakeaway: 'Feeling felt is the foundation of healing. Practice offering it.',
    applicationInstruction: 'Next time someone shares something vulnerable, pause before responding. Reflect back what you heard: "It sounds like..." or "I sense you\'re feeling..." Let them know you see them.',
    applicationExample: 'Your friend tells you they are struggling. Instead of offering advice, you say: "It sounds like you are carrying a lot right now and feeling really alone in it." They exhale and say, "Yes. Exactly."',
    applicationOutcome: 'They feel felt. Their nervous system relaxes. The connection deepens. You have offered true presence.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do you feel truly seen and heard?',
        options: [
          'Often',
          'Sometimes',
          'Rarely',
          'Never'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is attunement?',
        options: [
          'Giving advice to help someone',
          'Accurately perceiving and reflecting someone\'s internal state',
          'Agreeing with everything someone says'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you practice attunement this week?',
        options: [
          'Yes, with intention',
          'I\'ll try if the moment arises',
          "I'm not sure how",
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'reflective-listening',
      practiceName: 'Reflective Listening Practice',
      previewText: 'A structured exercise for practicing attunement with a partner.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'SC_CAL_SCR_001',
        type: 'insight',
        title: 'Co-Regulation: Borrowing Calm from Others'
      },
      {
        id: 'article_attunement',
        type: 'article',
        title: 'Attunement: The Art of Feeling Felt'
      },
      {
        id: 'active-listening-protocol',
        type: 'practice',
        title: 'Active Listening Protocol'
      }
    ]
  },

  {
    id: 'SC_EXP_VUL_001',
    title: 'Vulnerability Is Courage, Not Weakness',
    subtitle: 'How sharing shame breaks its power',
    pillarName: 'Social Connectivity',
    pillarId: 'SC',
    conceptName: 'Expand',
    themeName: 'Vulnerability',
    blockName: 'Share one vulnerable truth with a safe person',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Shame thrives in secrecy. Vulnerability—sharing what you have kept hidden—is the antidote. It transforms isolation into connection.',
    contextPath: 'Part of Vulnerability within Expand',
    keywords: {
      primary: ['shame', 'connection', 'trust'],
      secondary: ['vulnerability', 'authenticity', 'exposure'],
      tertiary: ['courage', 'secrecy', 'social engagement']
    },
    mechanismContent: `Brené Brown defines vulnerability as "uncertainty, risk, and emotional exposure." It is the willingness to be seen when you cannot control the outcome. For people in recovery, this is terrifying—you have spent years hiding the parts of yourself you believe are unlovable.

But research shows that vulnerability is the pathway to connection, not the barrier. When you share something true and hard—"I am struggling," "I relapsed," "I feel ashamed"—you give the other person permission to meet you there. If they respond with empathy, shame loses its grip.

Neurologically, vulnerability activates the social engagement system (ventral vagal). Secrecy activates the threat system (sympathetic). You are literally safer in connection than in hiding, even when it feels scarier.`,
    keyTakeaway: 'Shame cannot survive being spoken. Vulnerability is the light.',
    applicationInstruction: 'Identify one thing you have been keeping secret out of shame. Choose one safe person. Say it out loud: "I need to tell you something hard."',
    applicationExample: 'You have been struggling with cravings but hiding it from everyone. You text your sponsor: "I need to talk. I\'m not okay." You meet for coffee and say the truth. They respond: "Thank you for telling me."',
    applicationOutcome: 'The shame shrinks. The secret loses power. The connection deepens. You feel less alone.',
    checkpoints: [
      {
        type: 'before',
        question: 'How comfortable are you with vulnerability?',
        options: [
          'Very comfortable',
          'Somewhat comfortable',
          'Uncomfortable',
          'Terrified'
        ]
      },
      {
        type: 'comprehension',
        question: 'Why is vulnerability powerful?',
        options: [
          'It shows people you are weak',
          'It transforms shame into connection',
          'It guarantees people will like you'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Is there something you have been hiding that you could share?',
        options: [
          'Yes, and I know who to tell',
          'Yes, but I\'m not ready yet',
          'No, I share openly',
          "I'm not sure"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'vulnerability-letter',
      practiceName: 'Vulnerability Letter Exercise',
      previewText: 'Write a letter to someone safe, sharing one vulnerable truth.',
      duration: '15 min'
    },
    relatedContent: [
      {
        id: 'article_shame_resilience',
        type: 'article',
        title: 'Shame Resilience: Why Secrecy Keeps You Sick'
      },
      {
        id: 'SC_CAL_SCR_001',
        type: 'insight',
        title: 'Co-Regulation: Borrowing Calm from Others'
      },
      {
        id: 'self-compassion-break',
        type: 'practice',
        title: 'Self-Compassion Break'
      }
    ]
  },

  {
    id: 'SC_EXP_BND_001',
    title: 'Boundaries: The Architecture of Safe Connection',
    subtitle: 'How limits create intimacy',
    pillarName: 'Social Connectivity',
    pillarId: 'SC',
    conceptName: 'Expand',
    themeName: 'Boundary Setting',
    blockName: 'Identify and communicate one boundary clearly',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'Boundaries are not walls. They are the scaffolding that makes intimacy possible. Without them, connection becomes enmeshment or abandonment.',
    contextPath: 'Part of Boundary Setting within Expand',
    keywords: {
      primary: ['boundaries', 'relationships', 'communication'],
      secondary: ['limits', 'safety', 'enmeshment'],
      tertiary: ['self-protection', 'respect', 'capacity']
    },
    mechanismContent: `A boundary is a limit you set to protect your well-being, capacity, or values. It is not a punishment or rejection—it is a statement of what you need to remain present and healthy in relationship.

People in recovery often struggle with boundaries because their nervous systems are wired for survival, not safety. You learned to abandon your own needs to manage someone else's dysregulation, or you learned to isolate completely to avoid being hurt. Both are trauma responses.

Research shows that clear boundaries activate the social engagement system because they create predictability and safety. When you know where you end and someone else begins, you can relax. Enmeshment (no boundaries) and isolation (walls instead of boundaries) both keep you in threat mode.`,
    keyTakeaway: 'Boundaries are not barriers. They are the foundation of true intimacy.',
    applicationInstruction: 'Identify one relationship where you need a boundary. Use this structure: "I need [X]. If [Y] happens, I will [Z]." Example: "I need our conversations to stay respectful. If yelling starts, I will leave the room."',
    applicationExample: 'Your friend calls you late at night when drunk and emotionally dumps on you. You set a boundary: "I care about you. I cannot take calls after 10pm. If you need support, text me and we will talk tomorrow."',
    applicationOutcome: 'The relationship becomes healthier. You stop resenting them. They learn what you need. Connection becomes sustainable.',
    checkpoints: [
      {
        type: 'before " "I care about you. I cannot take calls after 10pm. If you need support, text me and we will talk tomorrow.""',
        type: 'before',
        question: 'How comfortable are you setting boundaries?',
        options: [
          'Very comfortable',
          'Somewhat comfortable',
          'Uncomfortable',
          'I avoid it completely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the purpose of a boundary?',
        options: [
          'To push people away',
          'To protect your well-being and make intimacy sustainable',
          'To control other people'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Is there one boundary you need to set this week?',
        options: [
          'Yes, I know exactly what it is',
          "Yes, but I'm scared to do it",
          'No, my boundaries are healthy',
          "I'm not sure"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'boundary-script',
      practiceName: 'Boundary Setting Script Builder',
      previewText: 'A guided exercise to craft and practice boundary statements.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_boundaries_connection',
        type: 'article',
        title: 'Boundaries: The Scaffolding of Connection'
      },
      {
        id: 'SC_EXP_VUL_001',
        type: 'insight',
        title: 'Vulnerability Is Courage, Not Weakness'
      },
      {
        id: 'assertiveness-training',
        type: 'practice',
        title: 'Assertiveness Training Exercise'
      }
    ]
  },

  {
    id: 'SC_REP_RPR_001',
    title: 'Rupture and Repair: Conflict Is Not the End',
    subtitle: 'How reconnecting builds trust',
    pillarName: 'Social Connectivity',
    pillarId: 'SC',
    conceptName: 'Repair',
    themeName: 'Conflict Resolution',
    blockName: 'Initiate repair after relational rupture',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Relationships are not defined by the absence of conflict. They are defined by the willingness to repair. Learning to repair ruptures builds trust that connection can survive hard moments.',
    contextPath: 'Part of Conflict Resolution within Repair',
    keywords: {
      primary: ['relationships', 'trust', 'communication'],
      secondary: ['repair', 'rupture', 'conflict'],
      tertiary: ['reconnection', 'accountability', 'resilience']
    },
    mechanismContent: `A rupture is any moment when connection breaks—an argument, a misunderstanding, a moment of reactivity. For people in recovery, ruptures often trigger abandonment fears: "I messed up. They will leave."

But research by attachment theorist Dr. Ed Tronick shows that repair is more important than the rupture. Secure relationships are not conflict-free. They are rupture-and-repair relationships. The nervous system learns: "We can disconnect and come back. Connection is resilient."

Repair requires three elements: acknowledgment ("I see I hurt you"), responsibility ("That was on me"), and reconnection ("Can we try again?"). It does not require perfection. It requires willingness.`,
    keyTakeaway: 'Ruptures are inevitable. Repair is a choice. Choose repair.',
    applicationInstruction: 'Think of a recent rupture. Reach out within 24 hours. Use this structure: "I noticed we disconnected. I see my part in that. Can we talk?"',
    applicationExample: 'You snapped at your partner this morning. Instead of stewing in shame, you text them at lunch: "I was harsh this morning. I\'m sorry. Can we reset tonight?"',
    applicationOutcome: 'The rupture does not define the relationship. The repair does. Trust deepens because you both know connection can be restored.',
    checkpoints: [
      {
        type: 'before',
        question: 'How do you typically respond to conflict?',
        options: [
          'I initiate repair',
          'I wait for the other person to reach out',
          'I avoid it and hope it goes away',
          'I spiral in shame'
        ]
      },
      {
        type: 'comprehension',
        question: 'What makes repair powerful?',
        options: [
          'It erases the conflict',
          'It teaches the nervous system that connection can survive rupture',
          'It proves you were right'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Is there a rupture you need to repair?',
        options: [
          'Yes, and I will do it today',
          'Yes, but I need time first',
          'No, everything is resolved',
          "I'm not sure"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'repair-conversation',
      practiceName: 'Repair Conversation Script',
      previewText: 'A guided framework for initiating repair after conflict.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_rupture_repair',
        type: 'article',
        title: 'Rupture and Repair: The Foundation of Secure Attachment'
      },
      {
        id: 'SC_CAL_ATT_001',
        type: 'insight',
        title: 'Attunement: Feeling Felt'
      },
      {
        id: 'nonviolent-communication',
        type: 'practice',
        title: 'Nonviolent Communication (NVC) Practice'
      }
    ]
  }
];

// ============================================================================
// PILLAR 4: COGNITIVE REFRAMING (5 Insights)
// ============================================================================

const cognitiveReframingInsights: InsightData[] = [
  {
    id: 'CR_CAT_DIS_001',
    title: 'Thought Distortions: Your Brain\'s Faulty Software',
    subtitle: 'Spotting thinking errors that keep you stuck',
    pillarName: 'Cognitive Reframing',
    pillarId: 'CR',
    conceptName: 'Catch',
    themeName: 'Distortion Recognition',
    blockName: 'Identify one cognitive distortion in real time',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Your thoughts are not facts. Learning to spot cognitive distortions gives you the power to question the story your brain is telling.',
    contextPath: 'Part of Distortion Recognition within Catch',
    keywords: {
      primary: ['thoughts', 'anxiety', 'awareness'],
      secondary: ['cognitive distortions', 'thinking errors', 'CBT'],
      tertiary: ['all-or-nothing', 'catastrophizing', 'patterns']
    },
    mechanismContent: `Cognitive distortions are systematic errors in thinking that your brain uses as shortcuts. They evolved to keep you alive (better to assume the shadow is a threat), but in modern life, they keep you stuck in fear, shame, and reactivity.

Common distortions include: All-or-Nothing Thinking ("I used once, so I'm a failure"), Catastrophizing ("This will ruin everything"), Mind Reading ("They think I'm weak"), and Emotional Reasoning ("I feel like a fraud, therefore I am one").

Research by Aaron Beck and David Burns shows that simply learning to name these distortions reduces their power. When you catch yourself catastrophizing, you can say: "That's catastrophizing. What's the evidence?"`,
    keyTakeaway: 'Name the distortion, weaken its grip. Your brain lies to protect you.',
    applicationInstruction: 'When a distressing thought arises, pause and ask: "Is this a distortion?" Check for all-or-nothing thinking, catastrophizing, or mind reading. Name it.',
    applicationExample: 'You make a mistake at work and think: "I\'m going to get fired and lose everything." You pause and name it: "That\'s catastrophizing. What\'s the evidence? I made one mistake. That\'s not the same as getting fired."',
    applicationOutcome: 'The thought loses intensity. You create space to evaluate reality instead of reacting to fear.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do you question your negative thoughts?',
        options: [
          'Always',
          'Sometimes',
          'Rarely',
          'Never'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is a cognitive distortion?',
        options: [
          'A true thought that is painful',
          'A systematic error in thinking that distorts reality',
          'A sign of mental illness'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Which distortion do you recognize in yourself?',
        options: [
          'All-or-nothing thinking',
          'Catastrophizing',
          'Mind reading',
          'Emotional reasoning',
          "I'm not sure"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'thought-record',
      practiceName: 'Thought Record (CBT Tool)',
      previewText: 'A structured practice for catching and reframing distorted thoughts.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_cognitive_distortions',
        type: 'article',
        title: 'The 10 Most Common Cognitive Distortions'
      },
      {
        id: 'CR_CHK_EVI_001',
        type: 'insight',
        title: 'Evidence-Based Thinking'
      },
      {
        id: 'thought-defusion',
        type: 'practice',
        title: 'Thought Defusion Exercise (ACT)'
      }
    ]
  },

  {
    id: 'CR_CHK_EVI_001',
    title: 'Evidence-Based Thinking: Lawyer Mode',
    subtitle: 'Fact-checking your catastrophic thoughts',
    pillarName: 'Cognitive Reframing',
    pillarId: 'CR',
    conceptName: 'Check',
    themeName: 'Evidence Evaluation',
    blockName: 'Evaluate one thought using evidence for and against',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'Your anxious brain presents worst-case scenarios as facts. Treating your thoughts like a lawyer treats evidence restores clarity and reduces reactivity.',
    contextPath: 'Part of Evidence Evaluation within Check',
    keywords: {
      primary: ['thoughts', 'anxiety', 'awareness'],
      secondary: ['evidence-based thinking', 'CBT', 'rational'],
      tertiary: ['fact-checking', 'prefrontal cortex', 'evaluation']
    },
    mechanismContent: `When you are dysregulated, your brain operates in threat mode—it generates catastrophic predictions and presents them as certainties. This is not reality. It is your brain trying to protect you.

Evidence-based thinking is the practice of stepping back and asking: "What is the evidence for this thought? What is the evidence against it?" This activates the prefrontal cortex (rational thinking) and downregulates the amygdala (threat detection).

Research shows that when people systematically evaluate evidence, catastrophic thoughts lose their intensity. You are not suppressing the thought. You are fact-checking it.`,
    keyTakeaway: 'Treat your thoughts like a lawyer, not a believer. Demand evidence.',
    applicationInstruction: 'When a catastrophic thought arises, write it down. Then ask: "What is the evidence FOR this thought? What is the evidence AGAINST it?" Be rigorous.',
    applicationExample: 'Thought: "My friend is mad at me." Evidence FOR: They haven\'t texted back in 3 hours. Evidence AGAINST: They told me they had a busy day. They always respond eventually. Last time this happened, they weren\'t mad.',
    applicationOutcome: 'The catastrophic thought weakens. Reality comes into focus. You respond with less reactivity.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you tend to believe your anxious thoughts immediately?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the purpose of evaluating evidence?',
        options: [
          'To prove you are right',
          'To activate rational thinking and reduce amygdala reactivity',
          'To suppress the thought'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you try evidence evaluation the next time anxiety spikes?',
        options: [
          'Yes, definitely',
          'Yes, but I might forget',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'evidence-evaluation',
      practiceName: 'Evidence Evaluation Worksheet',
      previewText: 'A structured tool for fact-checking catastrophic thoughts.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'CR_CAT_DIS_001',
        type: 'insight',
        title: 'Thought Distortions: Your Brain\'s Faulty Software'
      },
      {
        id: 'article_cbt_basics',
        type: 'article',
        title: 'Cognitive Behavioral Therapy: The Basics'
      },
      {
        id: 'thought-record',
        type: 'practice',
        title: 'Thought Record (CBT)'
      }
    ]
  },

  {
    id: 'CR_CHA_ALT_001',
    title: 'Reframing: The Perspective Shift',
    subtitle: 'Seeing beyond your first interpretation',
    pillarName: 'Cognitive Reframing',
    pillarId: 'CR',
    conceptName: 'Change',
    themeName: 'Alternative Perspectives',
    blockName: 'Generate alternative explanations for a triggering situation',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Your first thought is rarely the full truth. Generating alternative perspectives expands your window of tolerance and restores choice.',
    contextPath: 'Part of Alternative Perspectives within Change',
    keywords: {
      primary: ['thoughts', 'perspective', 'coping'],
      secondary: ['reframing', 'cognitive flexibility', 'alternatives'],
      tertiary: ['interpretations', 'nuance', 'choice']
    },
    mechanismContent: `When something triggering happens, your brain generates a story to explain it. That story is almost always threat-based: "They did this to hurt me," "This is proof I'm failing," "This will never get better."

Reframing is the practice of asking: "What else could be true?" This is not toxic positivity or denial. It is cognitive flexibility—the ability to consider multiple perspectives before reacting.

Research shows that people with higher cognitive flexibility have better emotional regulation and lower rates of depression. You are training your brain to see nuance instead of certainty, which deactivates the threat response and creates space for intentional action.`,
    keyTakeaway: 'What else could be true? The first story is not the only story.',
    applicationInstruction: 'When a triggering event happens, write down your initial interpretation. Then generate three alternative explanations. At least one should be neutral, one should be compassionate.',
    applicationExample: 'Event: Your boss doesn\'t respond to your email. Initial story: "They\'re ignoring me because my work is bad." Alternatives: 1) They\'re overwhelmed and haven\'t seen it yet. 2) They saw it and have no concerns. 3) They are dealing with something personal.',
    applicationOutcome: 'The catastrophic story loses its grip. You see the situation with nuance. You respond with less defensiveness.',
    checkpoints: [
      {
        type: 'before',
        question: 'When something bad happens, do you assume the worst?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the goal of reframing?',
        options: [
          'To convince yourself everything is fine',
          'To generate cognitive flexibility and restore choice',
          'To avoid uncomfortable emotions'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you practice reframing this week?',
        options: [
          'Yes, when something triggers me',
          'Maybe',
          "I'll try but it feels hard",
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'reframing-practice',
      practiceName: 'Reframing Worksheet',
      previewText: 'A structured tool for generating alternative perspectives.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'CR_CHK_EVI_001',
        type: 'insight',
        title: 'Evidence-Based Thinking'
      },
      {
        id: 'article_cognitive_flexibility',
        type: 'article',
        title: 'Cognitive Flexibility: The Antidote to Rigidity'
      },
      {
        id: 'perspective-taking',
        type: 'practice',
        title: 'Perspective-Taking Exercise'
      }
    ]
  },

  {
    id: 'CR_CHA_DEF_001',
    title: 'Thought Defusion: You Are Not Your Thoughts',
    subtitle: 'Creating space from distressing thoughts',
    pillarName: 'Cognitive Reframing',
    pillarId: 'CR',
    conceptName: 'Change',
    themeName: 'Defusion Techniques',
    blockName: 'Practice defusion by adding "I notice I\'m having the thought that..."',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'Thoughts are mental events, not truths. Defusion creates distance between you and the thought, reducing its power.',
    contextPath: 'Part of Defusion Techniques within Change',
    keywords: {
      primary: ['thoughts', 'awareness', 'mindfulness'],
      secondary: ['defusion', 'ACT', 'metacognition'],
      tertiary: ['observer mind', 'distance', 'detachment']
    },
    mechanismContent: `Cognitive fusion is when you believe your thoughts are reality. "I am worthless" becomes an identity, not a passing mental event. This is devastating.

Defusion is a technique from Acceptance and Commitment Therapy (ACT) that creates space between you and the thought. Instead of "I am worthless," you say: "I notice I\'m having the thought that I am worthless."

This linguistic shift activates metacognitive awareness—the ability to observe your thoughts instead of being consumed by them. Research shows defusion reduces the emotional intensity of distressing thoughts without requiring you to argue with them or suppress them.`,
    keyTakeaway: 'Thoughts are visitors, not commanders. Notice them, do not obey them.',
    applicationInstruction: 'When a distressing thought arises, prefix it: "I notice I\'m having the thought that [thought]." Say it out loud if possible. Notice the shift.',
    applicationExample: 'Thought: "I\'m going to fail." Defusion: "I notice I\'m having the thought that I\'m going to fail." The thought is still there, but it feels less solid, less true.',
    applicationOutcome: 'The thought loses intensity. You observe it without being hijacked by it. You have more space to choose your response.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do you believe your thoughts are facts?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What does defusion do?',
        options: [
          'Makes the thought disappear',
          'Creates distance between you and the thought',
          'Proves the thought is wrong'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you try defusion the next time a distressing thought arises?',
        options: [
          'Yes, immediately',
          'Yes, but it feels strange',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'leaves-on-stream',
      practiceName: 'Leaves on a Stream (ACT Visualization)',
      previewText: 'A 5-minute visualization practice for observing thoughts without attachment.',
      duration: '5 min'
    },
    relatedContent: [
      {
        id: 'CR_CAT_DIS_001',
        type: 'insight',
        title: 'Thought Distortions: Your Brain\'s Faulty Software'
      },
      {
        id: 'article_act_basics',
        type: 'article',
        title: 'Acceptance and Commitment Therapy (ACT): An Introduction'
      },
      {
        id: 'thought-defusion',
        type: 'practice',
        title: 'Thought Defusion Exercise'
      }
    ]
  },

  {
    id: 'CR_STR_NRT_001',
    title: 'Self-Narrative: The Story You Tell Yourself',
    subtitle: 'Rewriting the story that shapes your identity',
    pillarName: 'Cognitive Reframing',
    pillarId: 'CR',
    conceptName: 'Story',
    themeName: 'Self-Narrative',
    blockName: 'Identify and revise one core self-limiting belief',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Your self-narrative—the story you tell yourself about who you are—shapes every choice you make. Changing the narrative changes the trajectory.',
    contextPath: 'Part of Self-Narrative within Story',
    keywords: {
      primary: ['identity', 'beliefs', 'perspective'],
      secondary: ['self-narrative', 'story', 'limiting beliefs'],
      tertiary: ['narrative therapy', 'authorship', 'revision']
    },
    mechanismContent: `You carry a narrative about yourself that was written in early childhood, often during moments of pain or neglect. "I am broken." "I am too much." "I am not enough." This story becomes your identity.

Research by narrative therapists shows that self-narratives are not fixed—they are constructed, and they can be revised. The process involves identifying the old story, examining the evidence for and against it, and consciously authoring a new one.

This is not affirmations or fake positivity. It is evidence-based narrative revision: "The story that I am broken came from being told I was too sensitive. But the evidence shows I am empathetic. Empathy is not brokenness. It is a strength I am learning to steward."`,
    keyTakeaway: 'You are not the story you were told. You are the author now.',
    applicationInstruction: 'Identify one core self-limiting belief. Ask: "Where did this story come from? What is the evidence for it? What is the evidence against it? What is a more accurate story?"',
    applicationExample: 'Old story: "I am a failure." Origin: Parents\' disappointment. Evidence FOR: I\'ve made mistakes. Evidence AGAINST: I\'ve also succeeded. I\'m in recovery. I show up. New story: "I am someone who has struggled and is learning to grow."',
    applicationOutcome: 'The old story loses its grip. The new story feels more true. Your choices begin to align with growth, not shame.',
    checkpoints: [
      {
        type: 'before',
        question: 'What is one core belief you hold about yourself?',
        options: [
          '"I am broken"',
          '"I am not enough"',
          '"I am unlovable"',
          '"I am a burden"',
          'Something else'
        ]
      },
      {
        type: 'comprehension',
        question: 'Can self-narratives change?',
        options: [
          'No, they are fixed',
          'Yes, through evidence-based narrative revision',
          'Only through years of therapy'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you revise one self-limiting belief this week?',
        options: [
          'Yes, I\'m ready',
          'Yes, but it feels scary',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'narrative-revision',
      practiceName: 'Self-Narrative Revision Exercise',
      previewText: 'A guided practice for identifying and rewriting core beliefs.',
      duration: '20 min'
    },
    relatedContent: [
      {
        id: 'article_narrative_therapy',
        type: 'article',
        title: 'Narrative Therapy: Rewriting Your Story'
      },
      {
        id: 'CR_CHA_ALT_001',
        type: 'insight',
        title: 'Reframing: The Perspective Shift'
      },
      {
        id: 'self-compassion-letter',
        type: 'practice',
        title: 'Self-Compassion Letter'
      }
    ]
  }
];

// ============================================================================
// PILLAR 5: IDENTITY INTEGRATION (5 Insights)
// ============================================================================

const identityIntegrationInsights: InsightData[] = [
  {
    id: 'II_VAL_CLR_001',
    title: 'Values: The North Star',
    subtitle: 'Finding your compass for recovery',
    pillarName: 'Identity Integration',
    pillarId: 'II',
    conceptName: 'Values',
    themeName: 'Values Clarification',
    blockName: 'Identify your top three core values',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'When you do not know what you value, every decision feels impossible. Clarifying your values gives you a compass for navigating recovery.',
    contextPath: 'Part of Values Clarification within Values',
    keywords: {
      primary: ['values', 'purpose', 'identity'],
      secondary: ['clarification', 'direction', 'ACT'],
      tertiary: ['compass', 'meaning', 'decision-making']
    },
    mechanismContent: `Values are not goals. Goals are destinations ("get sober," "find a job"). Values are directions ("live with integrity," "show up for people I love"). Goals can be completed. Values guide you forever.

Research by Steven Hayes (creator of ACT) shows that people who are clear on their values experience higher life satisfaction and better mental health outcomes. This is because values create coherent decision-making—when faced with a choice, you ask: "Which option moves me toward my values?"

In addiction, values get buried under survival. Recovery is the process of excavating them: What matters to me? Who do I want to be? What kind of life do I want to build? These questions are terrifying and liberating in equal measure.`,
    keyTakeaway: 'Values are your compass. Goals are the destinations. Know the difference.',
    applicationInstruction: 'Write down 10 things that matter to you. Then narrow it to your top three core values. For each, write one sentence explaining why it matters.',
    applicationExample: 'Core values: 1) Integrity (I want to be someone I trust). 2) Connection (I want to feel close to people I love). 3) Growth (I want to keep learning who I am).',
    applicationOutcome: 'You have a compass. When you face a hard choice, you ask: "Which option aligns with integrity, connection, and growth?" The answer becomes clearer.',
    checkpoints: [
      {
        type: 'before',
        question: 'How clear are you on your core values?',
        options: [
          'Very clear',
          'Somewhat clear',
          'Not very clear',
          'I have no idea'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the difference between values and goals?',
        options: [
          'There is no difference',
          'Values are directions, goals are destinations',
          'Goals are more important than values'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you clarify your top three values this week?',
        options: [
          'Yes, today',
          'Yes, this week',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'values-clarification',
      practiceName: 'Values Clarification Exercise',
      previewText: 'A structured practice to identify and articulate your core values.',
      duration: '15 min'
    },
    relatedContent: [
      {
        id: 'article_values_based_living',
        type: 'article',
        title: 'Values-Based Living: The Foundation of Recovery'
      },
      {
        id: 'II_VAL_ACT_001',
        type: 'insight',
        title: 'Values-Aligned Action'
      },
      {
        id: 'values-card-sort',
        type: 'practice',
        title: 'Values Card Sort'
      }
    ]
  },

  {
    id: 'II_VAL_ACT_001',
    title: 'Values-Aligned Action: Closing the Integrity Gap',
    subtitle: 'Living what you believe',
    pillarName: 'Identity Integration',
    pillarId: 'II',
    conceptName: 'Values',
    themeName: 'Values-Aligned Action',
    blockName: 'Take one action aligned with your core values',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'Knowing your values means nothing if you do not act on them. The integrity gap—the distance between what you value and how you live—is the source of deep shame. Closing it is the work.',
    contextPath: 'Part of Values-Aligned Action within Values',
    keywords: {
      primary: ['values', 'integrity', 'action'],
      secondary: ['alignment', 'congruence', 'self-trust'],
      tertiary: ['behavior change', 'commitment', 'direction']
    },
    mechanismContent: `The integrity gap is the space between who you want to be and who you are being. When your actions do not align with your values, you feel it as shame, disconnection, and self-betrayal.

Research shows that values-aligned action—even small acts—reduces the integrity gap and increases self-trust. You do not need to be perfect. You need to be directional. Every choice that moves toward your values is a vote for the person you are becoming.

In recovery, the integrity gap can feel insurmountable. You have spent years acting in ways that betrayed your deepest values. But every moment is a new opportunity to choose alignment. The past does not define the future.`,
    keyTakeaway: 'Close the integrity gap one action at a time. Direction matters more than perfection.',
    applicationInstruction: 'Choose one core value. Take one small action today that aligns with it. It can be tiny: send a text, say no to something, show up five minutes early.',
    applicationExample: 'Value: Connection. Action: You text a friend you\'ve been avoiding and say, "I miss you. Can we catch up this week?" It takes 30 seconds. It closes the gap.',
    applicationOutcome: 'You feel a micro-shift: self-trust increases, shame decreases. Over time, these small acts compound into a life you recognize.',
    checkpoints: [
      {
        type: 'before',
        question: 'How often do your actions align with your values?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the integrity gap?',
        options: [
          'The difference between your values and your actions',
          'The gap between where you are and where you want to be',
          'A sign you have bad values'
        ],
        correctAnswer: 0
      },
      {
        type: 'intent',
        question: 'What is one values-aligned action you will take today?',
        options: [
          'I know exactly what it is',
          "I'll think about it",
          "I'm not sure",
          "I don't think I can"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'values-action-plan',
      practiceName: 'Values Action Plan',
      previewText: 'A daily practice for identifying and taking values-aligned actions.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'II_VAL_CLR_001',
        type: 'insight',
        title: 'Values: The North Star'
      },
      {
        id: 'article_integrity_gap',
        type: 'article',
        title: 'The Integrity Gap: Why You Feel Like a Fraud'
      },
      {
        id: 'daily-values-check',
        type: 'practice',
        title: 'Daily Values Check-In'
      }
    ]
  },

  {
    id: 'II_SLF_CMP_001',
    title: 'Self-Compassion: The Antidote to Shame',
    subtitle: 'Treating yourself like someone you love',
    pillarName: 'Identity Integration',
    pillarId: 'II',
    conceptName: 'Self',
    themeName: 'Self-Compassion',
    blockName: 'Practice self-compassion in a moment of failure',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Shame says: "I am bad." Self-compassion says: "I am human." This shift is the foundation of lasting recovery.',
    contextPath: 'Part of Self-Compassion within Self',
    keywords: {
      primary: ['shame', 'self-acceptance', 'kindness'],
      secondary: ['self-compassion', 'common humanity', 'mindfulness'],
      tertiary: ['self-kindness', 'worthiness', 'recovery']
    },
    mechanismContent: `Self-compassion, as defined by Kristin Neff, has three components: self-kindness (treating yourself with warmth instead of harshness), common humanity (recognizing that suffering is part of being human), and mindfulness (holding your pain without suppressing or exaggerating it).

Research shows that self-compassion is more predictive of long-term recovery than self-esteem. Self-esteem is contingent ("I am good when I succeed"). Self-compassion is unconditional ("I am worthy even when I fail").

For people in recovery, self-compassion is revolutionary. You have spent years in self-attack mode, believing you deserve punishment. Self-compassion says: "You made mistakes. You are not a mistake."`,
    keyTakeaway: 'You would not speak to someone you love the way you speak to yourself. Stop.',
    applicationInstruction: 'When you notice self-criticism, pause. Place a hand on your heart and say: "This is hard. I am doing my best. I am not alone in this."',
    applicationExample: 'You snap at someone you love and spiral into self-hatred: "I\'m a terrible person." You catch yourself, place a hand on your heart, and say: "I made a mistake. I am human. I can repair this."',
    applicationOutcome: 'The shame spiral stops. You feel warmth instead of self-attack. You can move toward repair instead of collapsing.',
    checkpoints: [
      {
        type: 'before',
        question: 'How do you typically respond to your own mistakes?',
        options: [
          'With harsh self-criticism',
          'With some self-kindness',
          'With a lot of self-kindness',
          "I don't notice"
        ]
      },
      {
        type: 'comprehension',
        question: 'What are the three components of self-compassion?',
        options: [
          'Positivity, confidence, success',
          'Self-kindness, common humanity, mindfulness',
          'Forgiveness, acceptance, gratitude'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you practice self-compassion the next time you fail?',
        options: [
          'Yes, I\'m ready to try',
          'Yes, but it feels unnatural',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'self-compassion-break',
      practiceName: 'Self-Compassion Break',
      previewText: 'A 3-minute practice for responding to failure with kindness.',
      duration: '3 min'
    },
    relatedContent: [
      {
        id: 'article_self_compassion',
        type: 'article',
        title: 'Self-Compassion: Why Being Kind to Yourself Is Not Weakness'
      },
      {
        id: 'II_SLF_IMP_001',
        type: 'insight',
        title: 'Imperfection: The Human Condition'
      },
      {
        id: 'loving-kindness-meditation',
        type: 'practice',
        title: 'Loving-Kindness Meditation (Self)'
      }
    ]
  },

  {
    id: 'II_SLF_IMP_001',
    title: 'Imperfection: The Human Condition',
    subtitle: 'Why being flawed makes you whole',
    pillarName: 'Identity Integration',
    pillarId: 'II',
    conceptName: 'Self',
    themeName: 'Imperfection Acceptance',
    blockName: 'Accept one imperfection without fixing it',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'Perfectionism is not high standards. It is a defense against shame. Accepting imperfection is the only way to become whole.',
    contextPath: 'Part of Imperfection Acceptance within Self',
    keywords: {
      primary: ['shame', 'self-acceptance', 'growth'],
      secondary: ['perfectionism', 'imperfection', 'wholeness'],
      tertiary: ['vulnerability', 'humanness', 'freedom']
    },
    mechanismContent: `Perfectionism is the belief that if you are perfect, you will be safe from criticism, rejection, and shame. But perfectionism is a trap—it is impossible to achieve, and the striving leaves you exhausted and disconnected.

Brené Brown defines perfectionism as "a 20-ton shield that we carry around thinking it will protect us, when in fact it is the thing that is really preventing us from being seen." Research shows that perfectionism is correlated with depression, anxiety, and relapse.

Accepting imperfection is not lowering your standards. It is recognizing that you are human, and humans are imperfect. This acceptance creates space for growth, connection, and self-trust.`,
    keyTakeaway: 'Perfectionism is a cage. Imperfection is freedom.',
    applicationInstruction: 'Identify one thing about yourself you have been trying to fix or hide. Instead of fixing it, practice saying: "This is part of me. I do not need to be perfect to be worthy."',
    applicationExample: 'You have been ashamed of your body. Instead of punishing yourself, you stand in front of the mirror and say: "This body has carried me through hell. It is imperfect. It is worthy."',
    applicationOutcome: 'The shame loosens. You stop wasting energy on the impossible task of perfection. You have more capacity for life.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you struggle with perfectionism?',
        options: [
          'Constantly',
          'Often',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is the cost of perfectionism?',
        options: [
          'It makes you better',
          'It prevents connection, exhausts you, and fuels shame',
          'It keeps you safe'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Can you accept one imperfection this week?',
        options: [
          'Yes, I know what it is',
          'Yes, but it feels scary',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'imperfection-practice',
      practiceName: 'Imperfection Acceptance Practice',
      previewText: 'A guided practice for naming and accepting one imperfection.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'II_SLF_CMP_001',
        type: 'insight',
        title: 'Self-Compassion: The Antidote to Shame'
      },
      {
        id: 'article_perfectionism',
        type: 'article',
        title: 'Perfectionism: The 20-Ton Shield'
      },
      {
        id: 'self-acceptance-meditation',
        type: 'practice',
        title: 'Self-Acceptance Meditation'
      }
    ]
  },

  {
    id: 'II_INT_WHO_001',
    title: 'Who Am I Becoming? The Question That Guides Recovery',
    subtitle: 'Defining yourself by the future, not the past',
    pillarName: 'Identity Integration',
    pillarId: 'II',
    conceptName: 'Integration',
    themeName: 'Identity Exploration',
    blockName: 'Articulate who you are becoming, not who you were',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Recovery is not about returning to who you were before addiction. It is about discovering who you are becoming. This question is your north star.',
    contextPath: 'Part of Identity Exploration within Integration',
    keywords: {
      primary: ['identity', 'purpose', 'growth'],
      secondary: ['becoming', 'narrative', 'transformation'],
      tertiary: ['redemption', 'future-focus', 'self-authorship']
    },
    mechanismContent: `Identity is not fixed. It is constructed through the stories you tell about yourself and the choices you make. In active addiction, your identity collapsed into one dimension: "I am an addict." In recovery, you reclaim the complexity of selfhood.

Research by narrative psychologist Dan McAdams shows that people who construct coherent, redemptive life narratives ("I struggled, and I am growing") have better mental health outcomes than those who remain stuck in contamination narratives ("I struggled, and I am broken").

The question "Who am I becoming?" is generative. It is future-oriented, identity-expanding, and values-aligned. It shifts you from shame ("Who I was") to possibility ("Who I am becoming").`,
    keyTakeaway: 'You are not who you were. You are who you are becoming. Name it.',
    applicationInstruction: 'Write a paragraph starting with: "I am becoming someone who..." Name the qualities, values, and behaviors you are growing into. Read it daily.',
    applicationExample: '"I am becoming someone who shows up for the people I love. Someone who can sit with discomfort without running. Someone who values integrity over comfort. Someone who is learning to trust themselves."',
    applicationOutcome: 'Your identity begins to shift. You see yourself as someone in process, not someone defined by the past. Your choices start to align with who you are becoming.',
    checkpoints: [
      {
        type: 'before',
        question: 'How do you currently define yourself?',
        options: [
          'By my past mistakes',
          'By my current struggles',
          'By who I am becoming',
          "I'm not sure"
        ]
      },
      {
        type: 'comprehension',
        question: 'Why is "Who am I becoming?" a powerful question?',
        options: [
          'It keeps you stuck in the past',
          'It is future-oriented, values-aligned, and identity-expanding',
          'It makes you feel better temporarily'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you write your "I am becoming" statement this week?',
        options: [
          'Yes, today',
          'Yes, this week',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'identity-statement',
      practiceName: 'Identity Statement Practice',
      previewText: 'A guided exercise to articulate who you are becoming.',
      duration: '20 min'
    },
    relatedContent: [
      {
        id: 'article_identity_recovery',
        type: 'article',
        title: 'Identity in Recovery: Becoming vs. Returning'
      },
      {
        id: 'II_VAL_CLR_001',
        type: 'insight',
        title: 'Values: The North Star'
      },
      {
        id: 'future-self-visualization',
        type: 'practice',
        title: 'Future Self Visualization'
      }
    ]
  }
];

// ============================================================================
// PILLAR 6: DECISION MASTERY (5 Insights) - PLACEHOLDER
// ============================================================================

const decisionMasteryInsights: InsightData[] = [
  {
    id: 'PS_CRV_URG_001',
    title: 'Urge Surfing: Ride the Wave',
    subtitle: 'Cravings pass if you let them',
    pillarName: 'Decision Mastery',
    pillarId: 'DM',
    conceptName: 'Craving',
    themeName: 'Urge Management',
    blockName: 'Practice urge surfing to ride out cravings',
    blockStatus: 'red',
    estimatedMinutes: 4,
    whyItMatters: 'Cravings feel permanent, but they are waves. They rise, peak, and fall—usually within 20-30 minutes. Learning to surf the wave instead of fighting it is the key to mastery.',
    contextPath: 'Part of Urge Management within Craving',
    keywords: {
      primary: ['cravings', 'urges', 'willpower'],
      secondary: ['urge surfing', 'mindfulness', 'temporary'],
      tertiary: ['waves', 'observation', 'mastery']
    },
    mechanismContent: `When a craving hits, your brain screams: "This will never end unless you give in." But neuroscience shows cravings follow a predictable arc—they rise, peak, and fall, usually within 20-30 minutes, even if you do nothing.

Urge surfing, developed by psychologist Alan Marlatt, is the practice of observing the craving like a wave. You notice where it shows up in your body (chest tightness, restlessness, heat). You name it. You breathe. You ride it without fighting or feeding it.

Research shows that people who practice urge surfing have higher rates of sustained recovery because they learn that cravings are not emergencies. They are temporary neurochemical events that do not require action.`,
    keyTakeaway: 'Cravings are waves. You do not fight them. You ride them.',
    applicationInstruction: 'When a craving hits, set a timer for 20 minutes. Notice where the craving lives in your body. Name the sensation. Breathe. Wait. The wave will pass.',
    applicationExample: 'You feel a strong urge to use. Your chest tightens, your thoughts speed up. You set a timer, sit down, and say: "This is craving. It is in my chest. It is uncomfortable. It will pass." At 18 minutes, the intensity breaks.',
    applicationOutcome: 'The craving passes without you acting on it. You learn that you can survive discomfort. Your confidence grows.',
    checkpoints: [
      {
        type: 'before',
        question: 'When cravings hit, what do you usually do?',
        options: [
          'Give in immediately',
          'Distract myself',
          'Try to surf it',
          "I don't know"
        ]
      },
      {
        type: 'comprehension',
        question: 'How long do most cravings last if you do not act?',
        options: [
          'Forever',
          '20-30 minutes',
          'Hours'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you try urge surfing the next time a craving hits?',
        options: [
          'Yes, I\'m ready',
          'Yes, but I\'m scared',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'urge-surfing',
      practiceName: 'Urge Surfing Practice',
      previewText: 'A guided 20-minute practice for riding out cravings.',
      duration: '20 min'
    },
    relatedContent: [
      {
        id: 'article_craving_neuroscience',
        type: 'article',
        title: 'The Neuroscience of Craving: What Happens in Your Brain'
      },
      {
        id: 'PS_CRV_DLY_001',
        type: 'insight',
        title: 'Delay Tactics: The 10-Minute Rule'
      },
      {
        id: 'body-scan-craving',
        type: 'practice',
        title: 'Body Scan for Cravings'
      }
    ]
  },

  {
    id: 'PS_CRV_DLY_001',
    title: 'Delay Tactics: The 10-Minute Rule',
    subtitle: 'Buying time to restore rational thinking',
    pillarName: 'Decision Mastery',
    pillarId: 'DM',
    conceptName: 'Craving',
    themeName: 'Delay Tactics',
    blockName: 'Use delay tactics to interrupt impulsive decisions',
    blockStatus: 'orange',
    estimatedMinutes: 3,
    whyItMatters: 'You do not need to resist cravings forever. You just need to delay for 10 minutes. That delay is often enough to restore prefrontal control.',
    contextPath: 'Part of Delay Tactics within Craving',
    keywords: {
      primary: ['cravings', 'impulse', 'willpower'],
      secondary: ['delay tactics', '10-minute rule', 'prefrontal cortex'],
      tertiary: ['time', 'interruption', 'space']
    },
    mechanismContent: `When a craving or impulse hits, your prefrontal cortex (rational decision-making) goes offline and your limbic system (reward-seeking) takes over. This is why "just say no" does not work—you have no cognitive capacity to reason with yourself.

Delay tactics work because they buy time for the prefrontal cortex to come back online. Research shows that waiting even 10 minutes reduces impulsive decisions by 50-70%. The craving does not disappear, but your ability to make an intentional choice returns.

Common delay tactics: call someone, take a walk, drink water, change your environment. The action matters less than the time it creates.`,
    keyTakeaway: 'Do not resist forever. Just delay for 10 minutes. Time is your ally.',
    applicationInstruction: 'When an impulse hits, commit to one delay tactic for 10 minutes. Call someone. Walk around the block. Drink a glass of water. After 10 minutes, reassess.',
    applicationExample: 'You feel the urge to use. Instead of fighting it or giving in, you call your sponsor and say: "I need 10 minutes." You talk, walk, breathe. At 12 minutes, the urgency lifts.',
    applicationOutcome: 'The impulse loses intensity. Your prefrontal cortex returns. You make a choice instead of reacting to an urge.',
    checkpoints: [
      {
        type: 'before',
        question: 'When impulses hit, do you act immediately?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'Why do delay tactics work?',
        options: [
          'They distract you permanently',
          'They buy time for the prefrontal cortex to come back online',
          'They make cravings disappear'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'What is your go-to delay tactic?',
        options: [
          'Call someone',
          'Take a walk',
          'Drink water',
          'Change environments',
          "I'll figure it out"
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'delay-protocol',
      practiceName: '10-Minute Delay Protocol',
      previewText: 'A structured practice for delaying impulsive decisions.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'PS_CRV_URG_001',
        type: 'insight',
        title: 'Urge Surfing: Ride the Wave'
      },
      {
        id: 'article_impulse_control',
        type: 'article',
        title: 'Impulse Control: Buying Time for Better Decisions'
      },
      {
        id: 'emergency-contact-card',
        type: 'practice',
        title: 'Emergency Contact Card'
      }
    ]
  },

  {
    id: 'PS_CHC_VAL_001',
    title: 'Values vs. Cravings: The High-Stakes Poker Game',
    subtitle: 'Making decisions that honor who you want to be',
    pillarName: 'Decision Mastery',
    pillarId: 'DM',
    conceptName: 'Choice',
    themeName: 'Values-Based Decisions',
    blockName: 'Make one decision aligned with values instead of cravings',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Every choice is a vote for the person you are becoming. When cravings scream louder than values, you need a system to hear what matters.',
    contextPath: 'Part of Values-Based Decisions within Choice',
    keywords: {
      primary: ['values', 'cravings', 'choice'],
      secondary: ['decision-making', 'integrity', 'prefrontal cortex'],
      tertiary: ['agency', 'self-trust', 'alignment']
    },
    mechanismContent: `Decision-making in recovery is a battle between two systems: the limbic system (immediate reward) and the prefrontal cortex (values-aligned action). Cravings activate the limbic system. Values activate the prefrontal cortex.

Research shows that explicitly naming your values before making a decision shifts neural activity from the limbic system to the prefrontal cortex. You are literally changing which part of your brain is in charge.

The practice is simple: When faced with a choice, ask: "Which option moves me toward my values? Which moves me away?" This question restores agency.`,
    keyTakeaway: 'Cravings are loud. Values are quiet. Learn to listen for the quiet voice.',
    applicationInstruction: 'Before making a decision, name your top value. Ask: "Which choice moves me toward this value?" Let the answer guide you.',
    applicationExample: 'You are invited to a party where there will be drinking. Your craving says: "Go. You can handle it." Your value (integrity) says: "Stay home. You are not ready." You choose integrity.',
    applicationOutcome: 'You make the harder choice. You feel proud instead of regretful. Your self-trust grows.',
    checkpoints: [
      {
        type: 'before',
        question: 'When making decisions, do you consider your values?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What happens when you name your values before deciding?',
        options: [
          'Nothing',
          'Neural activity shifts from limbic to prefrontal cortex',
          'Cravings disappear'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you practice values-based decision-making this week?',
        options: [
          'Yes, starting today',
          'Yes, when a hard choice arises',
          'Maybe',
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'values-decision-tool',
      practiceName: 'Values-Based Decision Tool',
      previewText: 'A structured practice for making values-aligned choices.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'article_decision_neuroscience',
        type: 'article',
        title: 'The Neuroscience of Decision-Making in Recovery'
      },
      {
        id: 'II_VAL_CLR_001',
        type: 'insight',
        title: 'Values: The North Star'
      },
      {
        id: 'values-action-plan',
        type: 'practice',
        title: 'Values Action Plan'
      }
    ]
  },

  {
    id: 'PS_CHC_PLA_001',
    title: 'Playing the Tape Forward: Future Projection',
    subtitle: 'Seeing the full cost before you act',
    pillarName: 'Decision Mastery',
    pillarId: 'DM',
    conceptName: 'Choice',
    themeName: 'Future Projection',
    blockName: 'Visualize the consequences of each choice before acting',
    blockStatus: 'orange',
    estimatedMinutes: 4,
    whyItMatters: 'In the moment, only the immediate reward is visible. Playing the tape forward reveals the full cost of the choice.',
    contextPath: 'Part of Future Projection within Choice',
    keywords: {
      primary: ['consequences', 'awareness', 'prevention'],
      secondary: ['future thinking', 'tape forward', 'temporal myopia'],
      tertiary: ['visualization', 'impulse control', 'projection']
    },
    mechanismContent: `When cravings hit, your brain experiences temporal myopia—you can only see the immediate reward, not the long-term consequences. This is why "just think about the future" does not work. Your prefrontal cortex is offline.

Playing the tape forward is a recovery tool that restores future-oriented thinking. You explicitly visualize: "If I make this choice, what happens in 1 hour? 1 day? 1 week?" This activates the prefrontal cortex and counteracts temporal myopia.

Research shows that people who practice future projection have better impulse control because they restore the ability to see consequences, not just rewards.`,
    keyTakeaway: 'Cravings show you the reward. Playing the tape shows you the cost.',
    applicationInstruction: 'Before making an impulsive choice, pause. Visualize: "If I do this, what happens in 1 hour? 1 day? 1 week? 1 month?" Write it down if you can.',
    applicationExample: 'You feel the urge to text your ex. You play the tape: "If I text, I feel relief for 10 minutes. Then I feel anxious. Then they don\'t respond. Then I spiral. Then I regret it for a week."',
    applicationOutcome: 'The full picture comes into focus. The immediate reward loses its power. You make a choice you will not regret.',
    checkpoints: [
      {
        type: 'before',
        question: 'Do you think about long-term consequences before acting?',
        options: [
          'Always',
          'Usually',
          'Sometimes',
          'Rarely'
        ]
      },
      {
        type: 'comprehension',
        question: 'What is temporal myopia?',
        options: [
          'Being nearsighted',
          'Only seeing immediate rewards, not long-term consequences',
          'Forgetting the past'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'Will you play the tape forward the next time an impulse hits?',
        options: [
          'Yes, I\'ll try',
          'Maybe',
          "I'm not sure it will help",
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'tape-forward',
      practiceName: 'Play the Tape Forward Exercise',
      previewText: 'A visualization practice for seeing the full consequences of choices.',
      duration: '10 min'
    },
    relatedContent: [
      {
        id: 'PS_CHC_VAL_001',
        type: 'insight',
        title: 'Values vs. Cravings'
      },
      {
        id: 'article_temporal_myopia',
        type: 'article',
        title: 'Temporal Myopia: Why You Only See the Reward'
      },
      {
        id: 'consequence-mapping',
        type: 'practice',
        title: 'Consequence Mapping Tool'
      }
    ]
  },

  {
    id: 'PS_REC_RLS_001',
    title: 'Relapse Is Data, Not Destiny',
    subtitle: 'Learning from setbacks without spiraling',
    pillarName: 'Decision Mastery',
    pillarId: 'DM',
    conceptName: 'Recovery',
    themeName: 'Relapse Learning',
    blockName: 'Extract learning from relapse without spiral into shame',
    blockStatus: 'red',
    estimatedMinutes: 5,
    whyItMatters: 'Relapse is part of recovery for many people. What determines your trajectory is not whether you relapse, but whether you learn from it.',
    contextPath: 'Part of Relapse Learning within Recovery',
    keywords: {
      primary: ['relapse', 'shame', 'learning'],
      secondary: ['recovery', 'resilience', 'data'],
      tertiary: ['setbacks', 'agency', 'growth']
    },
    mechanismContent: `Relapse is not moral failure. It is a return to old patterns under specific conditions. Research shows that 40-60% of people in recovery experience at least one relapse. What separates those who sustain recovery from those who spiral is their response to the relapse.

Shame says: "I failed. I am back to square one. I am hopeless." Learning says: "What were the conditions? What were the warning signs? What do I need to do differently?"

The relapse prevention model by Marlatt and Gordon treats relapse as data: What triggered it? What was the chain of decisions? Where could intervention have happened? This approach removes shame and restores agency.`,
    keyTakeaway: 'Relapse is information, not identity. Learn from it, do not drown in it.',
    applicationInstruction: 'If you relapse, write down: 1) What were the warning signs? 2) What was the chain of decisions? 3) Where could I have intervened? 4) What do I need to do differently?',
    applicationExample: 'You used after 6 months sober. Instead of spiraling, you write: "Warning signs: I stopped going to meetings. I isolated. I was overconfident. Intervention point: Call sponsor when isolation starts. Different action: Recommit to meetings."',
    applicationOutcome: 'You extract learning instead of collapsing into shame. You recommit with more clarity. Recovery continues.',
    checkpoints: [
      {
        type: 'before',
        question: 'If you relapse, how do you typically respond?',
        options: [
          'Learn from it and move forward',
          'Feel shame but eventually recover',
          'Spiral into deeper use',
          "I've never relapsed"
        ]
      },
      {
        type: 'comprehension',
        question: 'What makes relapse part of recovery instead of failure?',
        options: [
          'It is not—relapse is failure',
          'When you treat it as data and learn from it',
          'Only if it happens once'
        ],
        correctAnswer: 1
      },
      {
        type: 'intent',
        question: 'If you relapse, will you extract learning instead of spiraling?',
        options: [
          'Yes, I commit to that',
          "I'll try, but shame is powerful",
          "I'm not sure",
          'No'
        ]
      }
    ],
    practiceConnection: {
      practiceId: 'relapse-analysis',
      practiceName: 'Relapse Analysis Tool',
      previewText: 'A structured practice for extracting learning from relapse.',
      duration: '20 min'
    },
    relatedContent: [
      {
        id: 'article_relapse_prevention',
        type: 'article',
        title: 'Relapse Prevention: The Marlatt Model'
      },
      {
        id: 'II_SLF_CMP_001',
        type: 'insight',
        title: 'Self-Compassion: The Antidote to Shame'
      },
      {
        id: 'warning-signs-tracker',
        type: 'practice',
        title: 'Warning Signs Tracker'
      }
    ]
  }
];

// ============================================================================
// EXPORTS
// ============================================================================

import { getThemeAssetUrl } from './themeAssetMapping';

// Automatically enrich insights with theme asset URLs
const enrichedEmotionalRegulationInsights = emotionalRegulationInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

const enrichedStressResilienceInsights = stressResilienceInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

const enrichedSocialConnectivityInsights = socialConnectivityInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

const enrichedCognitiveReframingInsights = cognitiveReframingInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

const enrichedIdentityIntegrationInsights = identityIntegrationInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

const enrichedDecisionMasteryInsights = decisionMasteryInsights.map(insight => ({
  ...insight,
  themeAssetUrl: getThemeAssetUrl(insight.themeName)
}));

export const insightLibrary: InsightData[] = [
  ...enrichedEmotionalRegulationInsights,
  ...enrichedStressResilienceInsights,
  ...enrichedSocialConnectivityInsights,
  ...enrichedCognitiveReframingInsights,
  ...enrichedIdentityIntegrationInsights,
  ...enrichedDecisionMasteryInsights
];

// Helper functions
export function getInsightById(id: string): InsightData | undefined {
  return insightLibrary.find(insight => insight.id === id);
}

export function getInsightsByPillar(pillarId: string): InsightData[] {
  return insightLibrary.filter(insight => insight.pillarId === pillarId);
}

export function getInsightsByStatus(status: 'red' | 'orange' | 'green' | 'unknown'): InsightData[] {
  return insightLibrary.filter(insight => insight.blockStatus === status);
}

export function searchInsights(query: string): InsightData[] {
  const lowerQuery = query.toLowerCase();
  return insightLibrary.filter(insight =>
    insight.title.toLowerCase().includes(lowerQuery) ||
    insight.blockName.toLowerCase().includes(lowerQuery) ||
    insight.themeName.toLowerCase().includes(lowerQuery)
  );
}

// Export alias for backwards compatibility
export const insights = insightLibrary;

// ============================================================================
// ENHANCED BLOCK STRUCTURE: "BUY 2 SECONDS"
// ============================================================================

export const BUY_2_SECONDS_BLOCK_ENHANCED = {
  id: 'buy-2-seconds',
  
  // Hierarchy (unchanged)
  pillar_id: 'emotional-regulation',
  pillar_name: 'Emotional Regulation',
  concept_id: 'impulse-awareness',
  concept_name: 'Impulse Awareness',
  theme_id: 'pause-before-acting',
  theme_name: 'Pause Before Acting',
  
  // THE ANCHOR - Layer 1 (the tool they collect)
  anchor: 'Buy 2 Seconds',
  
  // CONTEXTUAL HEADLINES - Layer 2 (fresh per ERA phase)
  era_headlines: {
    experience: 'Where Urges Live',
    recognize: 'The Source',
    align: 'The Choice'
  },
  
  // ANCHOR GUIDES - Layer 3 (practical daily instructions)
  anchor_guides: {
    experience: 'As you go about your day, feel for the window',
    recognize: 'As you buy your 2 seconds, look for the source',
    align: 'Use your 2 seconds to choose from alignment'
  },
  
  // Supporting (unchanged)
  title: 'Buy 2 Seconds',
  subtitle: 'Create space between urge and action',
  description: 'In recovery, the space between feeling an urge and acting on it is where freedom lives. This block teaches you to pause for just two seconds, creating a gap where choice becomes possible.',
  
  // THE 13-SCENE JOURNEY
  scenes: [
    // ========================================================================
    // SCENE 1: INTRODUCTION
    // ========================================================================
    {
      sequence: 1,
      type: 'introduction',
      headline: 'The Space Between',
      context: 'This week belongs to one tool.\n\nNot complicated. Not new. But when it becomes yours, everything shifts.\n\nYou are going to learn to buy yourself 2 seconds. Two seconds between feeling and acting. Two seconds between the pull and the choice. Two seconds where freedom lives.\n\nRight now, those 2 seconds might not exist. The urge arrives. The action follows. Automatic. Instant. Familiar.\n\nBut this week, you are going to create space where there was none.\n\nBy the time you leave here, those 2 seconds will be yours. Not borrowed. Not imagined. Yours.',
      anchor_reveal: 'This is your anchor: Buy 2 Seconds.',
      duration_minutes: 3,
      toolkit_tags: ['anchor-collection', 'impulse-control', 'pause'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'starting'
    },

    // ========================================================================
    // EXPERIENCE PHASE (3 scenes)
    // ========================================================================
    
    // SCENE 2: EXPERIENCE TEACHING
    {
      sequence: 2,
      type: 'experience_teaching',
      phase: 'Experience',
      headline: 'Where Urges Live',
      context: 'Every urge starts in your body before it reaches your mind. The pull to use. The impulse to run. The need to numb. They do not arrive as thoughts. They arrive as sensations. A tightness. A heat. A hollow ache. Before you can change your relationship with craving, you have to know where it lives.',
      instruction: 'Close your eyes if that feels safe. Take three slow breaths. Now think of something small you want right now. To check your phone. To shift in your seat. To stop reading. Where do you feel it? Your chest? Your throat? Your hands? Stay with it. Ten seconds. Do not act. Just notice. What happens when you watch instead of move? Now notice your breath. Pause it. Hold for two seconds. Feel the pressure build. That pull. That urgency. Now release. Breathe. That building, that holding, that release. This is the shape of every urge. It rises. It peaks. And if you do not feed it, it falls.',
      anchor_integration: 'This is your window. The space between the urge and the action. When you can feel this window, even for 2 seconds, you have found your power. Today, as you move through your world, just notice. Notice when the window opens. You are not trying to change anything yet. Just see it.',
      focus: 'Direct somatic experience of impulse in real time',
      duration_minutes: 5,
      toolkit_tags: ['pause', 'urge-management', 'body-awareness', 'breath', 'craving'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'experiencing'
    },

    // SCENE 3: EXPERIENCE CUE
    {
      sequence: 3,
      type: 'experience_cue',
      phase: 'Experience',
      headline: 'Today, You Notice',
      anchor_guide: 'As you go about your day, feel for the window. The space between wanting and acting. You are not trying to stop anything. Not trying to fix anything. Just notice when it opens.',
      focus_reminder: 'Your only work today: See the window.',
      duration_minutes: 1,
      toolkit_tags: ['cue', 'reminder', 'practice'],
      cta_text: "I'm Ready",
      cta_focus: 'being ready'
    },

    // SCENE 4: EXPERIENCE REFLECTION
    {
      sequence: 4,
      type: 'experience_reflection',
      phase: 'Experience',
      headline: 'Your Reflection',
      reflection_prompts: [
        'What did you notice in your body today?',
        'When did you feel the space between urge and action?',
        'What are you learning about yourself?',
        'What feels different now?'
      ],
      duration_minutes: 3,
      toolkit_tags: ['reflection', 'awareness'],
      cta_text: 'Continue',
      cta_focus: 'reflecting'
    },

    // ========================================================================
    // BRIDGE: EXPERIENCE → RECOGNIZE
    // ========================================================================
    
    // SCENE 5: RECOGNIZE BRIDGE
    {
      sequence: 5,
      type: 'bridge_e_to_r',
      headline: 'From Feeling to Knowing',
      transition_context: 'You have been feeling for the window. The space between urge and action. You know its shape now. You know where it lives in your body. But here is the question: What is driving it? Urges do not appear randomly. They have roots. Patterns. Foundations. Old wiring. Ancient stories about who you are and what you need. This week, you go deeper. You stop asking \"What do I feel?\" and start asking \"Where does this come from?\" The window is still there. You still buy your 2 seconds. But now, inside those 2 seconds, you begin to see the source. Not to judge it. Not to fight it. To name it. And in naming it, to separate from it.',
      next_headline: 'The Source',
      science_foundation: 'Two seconds is long enough for your prefrontal cortex to wake up. Long enough for choice to become possible.',
      duration_minutes: 3,
      toolkit_tags: ['transition', 'cognitive-shift'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'understanding'
    },

    // ========================================================================
    // RECOGNIZE PHASE (3 scenes)
    // ========================================================================
    
    // SCENE 6: RECOGNIZE TEACHING
    {
      sequence: 6,
      type: 'recognize_teaching',
      phase: 'Recognize',
      headline: 'The Source',
      context: 'When you name something, you create distance from it. You are no longer the urge. You are the one noticing the urge. Two seconds does not sound like much. But two seconds is long enough for your prefrontal cortex to come online. Long enough for choice to become possible.',
      instruction: 'Today, when an urge shows up, try saying this out loud or in your mind: I am feeling the urge to _____. Just name it. Watch what happens. Does it shift? Does it get smaller? Does it lose some of its grip? Naming is not about making it go away. Naming is about remembering that you are not it. Today, see if you can pause for two full seconds before responding to someone. Three times. A question. A frustration. An offer. Stop. Breathe. Two seconds. Then respond however you want. You are not trying to change what you say. You are trying to notice what it feels like to have space before you speak.',
      anchor_integration: 'When you buy your 2 seconds, do not just notice the urge. Go deeper. What thought is underneath it? What belief? What story? Is it I cannot handle this? Is it I am not enough? Is it I deserve this? These are the sources. The foundations. And once you can name them, you can question them. Are these thoughts real, or just pre-programmed reactions?',
      focus: 'Creating separation through language and identifying cognitive patterns',
      duration_minutes: 5,
      toolkit_tags: ['naming', 'awareness', 'separation', 'pause', 'response', 'choice', 'cognitive-patterns'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'recognizing'
    },

    // SCENE 7: RECOGNIZE CUE
    {
      sequence: 7,
      type: 'recognize_cue',
      phase: 'Recognize',
      headline: 'Today, You Name',
      anchor_guide: 'As you buy your 2 seconds, look for the source. What thought is underneath? What belief? What old story is running?',
      focus_reminder: 'Your work today: Name the source.',
      duration_minutes: 1,
      toolkit_tags: ['cue', 'reminder', 'practice'],
      cta_text: 'I Understand',
      cta_focus: 'understanding'
    },

    // SCENE 8: RECOGNIZE REFLECTION
    {
      sequence: 8,
      type: 'recognize_reflection',
      phase: 'Recognize',
      headline: 'What Did You Name?',
      reflection_prompts: [
        'What patterns did you notice today?',
        'What thoughts or beliefs were driving your urges?',
        'Did naming them change anything?',
        'What is becoming clear?'
      ],
      duration_minutes: 3,
      toolkit_tags: ['reflection', 'pattern-recognition'],
      cta_text: 'Continue',
      cta_focus: 'reflecting'
    },

    // ========================================================================
    // BRIDGE: RECOGNIZE → ALIGN
    // ========================================================================
    
    // SCENE 9: ALIGN BRIDGE
    {
      sequence: 9,
      type: 'bridge_r_to_a',
      headline: 'From Knowing to Choosing',
      transition_context: 'You have felt the urge. You have named it. You have traced it back to its source. Now comes the hardest part. The most powerful part. What do you do with it? Knowing is not enough. Feeling is not enough. Recovery is not about understanding your impulses. It is about choosing something different. This is where you stop reacting and start claiming. Where you stop being pulled by old patterns and start moving toward who you are becoming. This is not about willpower. This is about alignment. Your 2 seconds are no longer just a pause. They are a doorway. And the question you ask inside that doorway is this: Does this action align with who I am becoming?',
      next_headline: 'The Choice',
      identity_foundation: 'You are not just changing behavior. You are rewiring your brain.',
      duration_minutes: 3,
      toolkit_tags: ['transition', 'behavioral-shift', 'identity'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'shifting'
    },

    // ========================================================================
    // ALIGN PHASE (3 scenes)
    // ========================================================================
    
    // SCENE 10: ALIGN TEACHING
    {
      sequence: 10,
      type: 'align_teaching',
      phase: 'Align',
      headline: 'The Choice',
      context: 'You have been practicing the pause. You know how to feel the window. You know how to name the source. Now you add one question. Not from your head. From your gut. Does this action align with who I am becoming? Let the answer rise from your body. Your gut knows. It always knows.',
      instruction: 'Today, before you act, pause. Buy your 2 seconds. Ask the question: Does this align with who I am becoming? Feel the answer. Then choose. Not perfectly. Not painlessly. But consciously. Notice what it feels like to choose from this place. Not from craving. Not from fear. From alignment. Now try this. Three times today, when you pause before acting, place your hand on your heart. Say this, out loud or silently: I chose this. This is my power. Feel what it is like to witness your own agency. To see yourself choosing. You are not just changing behavior. You are rewiring your brain.',
      anchor_integration: 'Your 2 seconds are no longer just a gap. They are a window of change. Inside that window, you ask. You feel. You choose. And every time you choose from alignment instead of impulse, you lay down new wiring. New pathways. New possibilities.',
      focus: 'Embodied choice. Claiming agency.',
      duration_minutes: 5,
      toolkit_tags: ['choice', 'values', 'alignment', 'reinforcement', 'power', 'neuroplasticity'],
      cta_text: 'Continue Your Journey',
      cta_focus: 'aligning'
    },

    // SCENE 11: ALIGN CUE
    {
      sequence: 11,
      type: 'align_cue',
      phase: 'Align',
      headline: 'Today, You Choose',
      anchor_guide: 'Use your 2 seconds to choose. When you pause, ask: does this align with who I am becoming? Feel the answer. Then move.',
      focus_reminder: 'Your work today: Choose from alignment.',
      duration_minutes: 1,
      toolkit_tags: ['cue', 'reminder', 'practice'],
      cta_text: "I'm Shifting",
      cta_focus: 'shifting'
    },

    // SCENE 12: ALIGN REFLECTION
    {
      sequence: 12,
      type: 'align_reflection',
      phase: 'Align',
      headline: 'What Did You Choose?',
      reflection_prompts: [
        'What choices did you make from alignment today?',
        'What did it feel like to choose consciously?',
        'Where did you struggle? Where did you succeed?',
        'What is shifting?'
      ],
      duration_minutes: 3,
      toolkit_tags: ['reflection', 'behavioral-change'],
      cta_text: 'Continue',
      cta_focus: 'reflecting'
    },

    // ========================================================================
    // SCENE 13: INTEGRATION
    // ========================================================================
    
    {
      sequence: 13,
      type: 'integration',
      phase: 'Integrate',
      headline: 'Your Anchor',
      context: 'Take a moment. Look back at this week. You came here to build one tool. And you did. You learned to feel the window between urge and action. You learned to name the source. You learned to choose from alignment. You bought yourself 2 seconds. And inside those 2 seconds, you found space. Choice. Power.',
      instruction: 'This is not the end. This is just the beginning. The window will always be there. Some days you will see it clearly. Some days it will be harder to find. But now you know it exists. And that changes everything. You do not need to have it all figured out. You just need to know this: The space between urge and action belongs to you.',
      headline_weaving: '',
      assessment_questions: [
        {
          question: 'How confident do you feel in your ability to buy 2 seconds when an urge hits?',
          type: 'scale',
          scale_type: 'confidence',
          min_label: 'Not confident',
          max_label: 'Very confident'
        },
        {
          question: 'How much has your relationship with impulses shifted this week?',
          type: 'scale',
          scale_type: 'shift',
          min_label: 'No shift',
          max_label: 'Major shift'
        },
        {
          question: 'How connected do you feel to who you are becoming?',
          type: 'scale',
          scale_type: 'contentment',
          min_label: 'Disconnected',
          max_label: 'Deeply connected'
        },
        {
          question: 'What surprised you most this week?',
          type: 'text'
        }
      ],
      duration_minutes: 5,
      toolkit_tags: ['integration', 'assessment', 'completion'],
      cta_text: 'Complete Journey',
      cta_focus: 'completing'
    }
  ]
};
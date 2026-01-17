import type { Article } from '../types/toolkit';

export const SAMPLE_ARTICLES: Article[] = [
  // EMOTIONAL REGULATION (ER)
  {
    id: 'art_001_er_window',
    title: 'Understanding Window of Tolerance',
    subtitle: 'Why your nervous system needs boundaries',
    pillar_id: 'ER',
    theme_id: 'regulation',
    body: `# Understanding Window of Tolerance

Your nervous system has a sweet spot. Think of it as a window where you can process stress, feel emotions, and stay present without getting overwhelmed or shutting down.

## What Happens Inside Your Window

When you're inside your window of tolerance:
- You can think clearly while feeling emotions
- Stress feels manageable, not catastrophic
- You can connect with others
- You have access to choices

## What Happens Outside Your Window

**Hyperarousal (Above the Window):**
- Racing thoughts, panic, anger
- Fight or flight kicks in
- Everything feels like a crisis
- You react instead of respond

**Hypoarousal (Below the Window):**
- Numbness, disconnection, shutdown
- Freeze response dominates
- You feel nothing or everything is flat
- Energy drops to nothing

## Why This Matters for Recovery

Addiction narrows your window. Years of using substances or behaviors to regulate emotions trains your nervous system to reach for external fixes instead of building internal capacity.

Recovery is about widening your window. Not eliminating stress, but building the capacity to stay present with it.

## How to Widen Your Window

1. **Notice when you're outside:** Learn your hyperarousal and hypoarousal signals
2. **Practice regulation tools:** Breathing, grounding, movement
3. **Build stress tolerance gradually:** Small doses of discomfort, not flooding
4. **Rest is regulation:** Sleep, calm activities, connection

Your window can expand. It takes practice, but every time you regulate without using, you're training your nervous system that it can handle life.`,
    reading_time_minutes: 8,
    hook: "Your nervous system has a sweet spot. Too much stimulation? You're dysregulated. Too little? You're shut down. Here's how to find your window.",
    schema_targets: ['window_of_tolerance', 'nervous_system_regulation'],
    mindblock_targets: ['all_or_nothing'],
    kbe_layer: 'knowing',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'What brings you to this article?',
      exit_receipt: 'What landed for you?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_001_box_breathing', 'prac_002_grounding'],
    related_insights: ['ins_003_regulation', 'ins_010_nervous'],
    next_article: 'art_002_er_triggers',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },
  {
    id: 'art_002_er_triggers',
    title: 'Understanding Your Trigger Map',
    subtitle: 'Why you react before you think',
    pillar_id: 'ER',
    theme_id: 'triggers',
    body: `# Understanding Your Trigger Map

A trigger isn't weakness. It's your nervous system doing its job, trying to protect you from what hurt you before.

## What Actually Happens

When you encounter a trigger:
1. **Amygdala detects threat** (milliseconds)
2. **Survival response kicks in** (fight, flight, freeze)
3. **Prefrontal cortex goes offline** (rational thinking disappears)
4. **Old patterns activate** (reach for substance/behavior)

You're not choosing to react. Your nervous system is running a program written by past pain.

## Common Trigger Categories

**Sensory Triggers:**
- Smells, sounds, places
- Time of day, season
- Physical sensations

**Emotional Triggers:**
- Rejection, criticism, shame
- Loneliness, boredom
- Success, celebration (yes, really)

**Relational Triggers:**
- Conflict, abandonment fears
- Intimacy, vulnerability
- Boundary violations

**Contextual Triggers:**
- Stress, exhaustion
- Hunger, poor sleep
- Anniversary dates

## Building Your Map

Recovery isn't about eliminating triggers. It's about:
1. **Recognizing them faster** (awareness)
2. **Slowing down the reaction** (pause)
3. **Choosing a different response** (agency)

Your trigger map is personal. What activates your nervous system is based on your history, your wounds, your wiring. No shame in that.

## Working With Triggers

**Before:** Notice patterns. When do you get activated?
**During:** Create space between stimulus and response (even 3 seconds helps)
**After:** Debrief without judgment. What happened? What helped?

Triggers don't disappear. But your relationship to them can transform.`,
    reading_time_minutes: 7,
    hook: 'Triggers aren\'t weakness. They\'re your nervous system trying to protect you. Here\'s how to map yours and build new responses.',
    schema_targets: ['trigger_awareness', 'nervous_system_regulation'],
    mindblock_targets: ['should_statements', 'emotional_reasoning'],
    kbe_layer: 'knowing',
    evidence_level: 'clinical',
    response_contract: {
      entry_cue: 'What triggers are you navigating?',
      exit_receipt: 'What insight emerged?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_002_grounding', 'prac_003_pause'],
    related_insights: ['ins_005_triggers', 'ins_008_reactions'],
    next_article: 'art_003_sr_shame',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },

  // SHAME RESILIENCE (SR)
  {
    id: 'art_003_sr_shame',
    title: 'Shame vs. Guilt: The Critical Difference',
    subtitle: 'Why one heals and one destroys',
    pillar_id: 'SR',
    theme_id: 'shame_awareness',
    body: `# Shame vs. Guilt: The Critical Difference

**Guilt says:** "I did something bad."
**Shame says:** "I am bad."

This distinction isn't semantic. It's survival.

## Why Shame Feeds Addiction

Shame is the belief that you are fundamentally flawed, unworthy, unlovable. It's not about what you did. It's about who you are.

And shame thrives in secrecy.

When you believe you're defective, you hide. You isolate. You reach for anything that numbs the pain of being you. Substances. Behaviors. Anything that creates distance between you and the unbearable feeling of your own existence.

**Shame's message:** "You are the problem. Don't let anyone see."

## Why Guilt Supports Recovery

Guilt is about behavior. "I did something that violated my values." Guilt creates discomfort, yes, but it also creates accountability. It says: "I can do better. I can repair. I can change."

**Guilt's message:** "You made a mistake. You can learn from this."

## The Shame Spiral

1. **Something happens** (relapse, mistake, conflict)
2. **Shame activates** ("I'm worthless")
3. **Isolation follows** (hide from others)
4. **Pain intensifies** (alone with shame)
5. **Relief-seeking emerges** (use to escape)
6. **Shame deepens** ("See? I really am bad")

Breaking the spiral requires speaking shame out loud. To someone safe. Someone who won't confirm the story shame tells.

## Building Shame Resilience

**Name it:** "I'm feeling shame right now"
**Reality-test it:** Is this shame or guilt? What's the evidence?
**Reach out:** Tell someone. Shame dies in connection.
**Self-compassion:** You're human. Mistakes don't define worth.

Shame wants you alone. Recovery happens in connection.`,
    reading_time_minutes: 6,
    hook: 'Shame says you are bad. Guilt says you did something bad. This difference changes everything in recovery.',
    schema_targets: ['shame_spiral', 'self_compassion', 'worthiness'],
    mindblock_targets: ['personalization', 'labeling'],
    kbe_layer: 'knowing',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'What are you carrying today?',
      exit_receipt: 'What shifted in your understanding?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_007_self_compassion', 'prac_009_voicing'],
    related_insights: ['ins_001_shame', 'ins_012_worth'],
    next_article: 'art_004_sr_secrecy',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },
  {
    id: 'art_004_sr_secrecy',
    title: 'Why Secrets Keep You Sick',
    subtitle: 'The neuroscience of hiding',
    pillar_id: 'SR',
    theme_id: 'secrecy',
    body: `# Why Secrets Keep You Sick

"You're only as sick as your secrets."

This isn't a platitude. It's neuroscience.

## What Secrets Do to Your Brain

Keeping secrets requires constant vigilance. Your brain has to:
- Monitor who knows what
- Edit your story in real time
- Suppress authentic expression
- Maintain hypervigilance about exposure

This is exhausting. And it floods your system with stress hormones.

## The Cognitive Load of Hiding

Research shows that keeping secrets:
- Reduces working memory capacity
- Increases rumination
- Elevates cortisol
- Decreases immune function
- Increases shame and isolation

You're not just hiding something. You're diverting massive cognitive resources to maintaining the cover-up.

## Secrets and Addiction

Addiction requires secrecy. You hide:
- How much you're using
- How often you're thinking about using
- How bad it's gotten
- How much pain you're in

And every secret deepens the story: "If they knew the real me, they'd leave."

## The Paradox of Disclosure

What you hide owns you. What you speak loses its power.

When you share a secret:
1. **Shame loses oxygen** (it can't survive in light)
2. **Reality-testing happens** (others don't confirm your worst fears)
3. **Connection deepens** (vulnerability creates intimacy)
4. **Cognitive load decreases** (you stop managing the story)

## What to Share and Where

Not all secrets need to be shared everywhere. Discernment matters:
- **Therapist/sponsor:** Everything
- **Support group:** Patterns, struggles, truth
- **Safe relationships:** What feels aligned
- **Public:** Your choice, your boundary

## The Practice

Start small. One secret. One safe person. Notice what shifts.

Secrets keep you isolated. Truth sets you free.`,
    reading_time_minutes: 6,
    hook: 'Secrets drain your brain, flood you with stress hormones, and feed shame. Here\'s the neuroscience of why hiding keeps you sick.',
    schema_targets: ['secrecy', 'shame_spiral', 'authenticity'],
    mindblock_targets: ['catastrophizing', 'mind_reading'],
    kbe_layer: 'knowing',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'What feels heavy to carry alone?',
      exit_receipt: 'What would sharing look like?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_009_voicing', 'prac_010_writing'],
    related_insights: ['ins_004_secrecy', 'ins_015_truth'],
    next_article: 'art_005_sc_identity',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },

  // SELF CONCEPT (SC)
  {
    id: 'art_005_sc_identity',
    title: 'Identity Beyond Addiction',
    subtitle: 'Who are you when you\'re not using?',
    pillar_id: 'SC',
    theme_id: 'identity',
    body: `# Identity Beyond Addiction

"I'm an addict."

This can be a powerful anchor in early recovery. It names the truth. It connects you to others who get it.

But what happens when your entire identity is defined by what you're NOT doing?

## The Identity Trap

When addiction is your primary identity:
- Every conversation revolves around recovery
- You measure worth by days sober
- Relapse feels like total annihilation
- You don't know who you are without the struggle

Recovery becomes another form of obsession.

## The Multiple Selves

You're not one thing. You're:
- Someone in recovery AND
- Someone with interests, values, creativity
- Someone with relationships, history, dreams
- Someone learning, growing, evolving

Addiction colonized your identity. Recovery is reclaiming the territory.

## Rebuilding Identity

**What you loved before addiction:**
- Music, art, nature, sports
- Curiosity, humor, connection
- Skills, talents, strengths

**What you're discovering now:**
- New interests without substances
- Authentic preferences (not numbed ones)
- Values that guide choices
- Roles beyond "person in recovery"

## The Risk of Rigid Identity

"I'm an addict" can become a cage:
- "I can't trust myself" (forever)
- "I'm broken" (permanently)
- "I'll always struggle" (no growth)

These beliefs might protect you early on. But they can also limit who you become.

## Integration, Not Replacement

You don't have to abandon "I'm in recovery." But you can add:
- "I'm an artist in recovery"
- "I'm a parent learning to stay present"
- "I'm someone who chose life"

Your addiction is part of your story. Not the whole story.

## The Question

Who are you becoming?

Not who were you before. Not who you "should" be. Who are you choosing to become now?

This is the work.`,
    reading_time_minutes: 7,
    hook: 'Recovery isn\'t just quitting substances. It\'s rebuilding identity beyond addiction. Who are you when you\'re not defined by what you\'re NOT doing?',
    schema_targets: ['identity', 'worthiness', 'growth_mindset'],
    mindblock_targets: ['labeling', 'all_or_nothing'],
    kbe_layer: 'believing',
    evidence_level: 'clinical',
    response_contract: {
      entry_cue: 'How do you define yourself today?',
      exit_receipt: 'What part of you wants to emerge?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_004_values', 'prac_010_writing'],
    related_insights: ['ins_006_identity', 'ins_014_becoming'],
    next_article: 'art_006_sc_worth',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },
  {
    id: 'art_006_sc_worth',
    title: 'Worth Is Not Earned',
    subtitle: 'Unlearning the performance trap',
    pillar_id: 'SC',
    theme_id: 'worthiness',
    body: `# Worth Is Not Earned

You don't have to earn your worth.

But if you grew up believing love was conditional, this sounds absurd. Dangerous, even.

## The Performance Trap

Many people in recovery learned early:
- "Be good and you'll be loved"
- "Achieve and you'll matter"
- "Hide your needs and you'll be accepted"

So you performed. You achieved. You hid. And it worked... until it didn't.

Addiction often emerges when the performance becomes unsustainable. When you can't keep up the image anymore. When the gap between who you are and who you think you need to be becomes unbearable.

## The Conditional Love Loop

If worth is earned, then:
- Mistakes = worthlessness
- Failure = abandonment
- Needs = burden
- Vulnerability = rejection

This creates an impossible standard. No one can be perfect forever.

## What Research Shows

Studies on shame and addiction consistently find: **people in active addiction don't lack worth. They lack the belief in their worth.**

You don't need to become worthy. You need to recognize you already are.

## Unlearning the Lie

This isn't about affirmations. You can't think your way into believing you matter.

It's about **corrective experiences:**
- Someone sees your mess and doesn't leave
- You fail and still belong
- You express a need and it's met with care
- You show up as you are and you're enough

## The Practice of Worthiness

1. **Notice the performance:** When are you trying to earn love?
2. **Question the belief:** Where did I learn worth is conditional?
3. **Test reality:** Share something real. See what happens.
4. **Build evidence:** Who has stayed when you weren't perfect?

## The Shift

From: "I'll be worthy when I'm sober/successful/healed"
To: "I'm worthy now, and I'm choosing to grow"

Recovery isn't about finally becoming good enough. It's about recognizing you always were.`,
    reading_time_minutes: 7,
    hook: 'If you learned that worth is earned, addiction makes sense. You\'re trying to perform your way to belonging. Here\'s how to unlearn the lie.',
    schema_targets: ['worthiness', 'self_compassion', 'belonging'],
    mindblock_targets: ['should_statements', 'personalization'],
    kbe_layer: 'believing',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'What do you believe about your worth?',
      exit_receipt: 'What would change if you believed you were enough?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_007_self_compassion', 'prac_008_mirror'],
    related_insights: ['ins_012_worth', 'ins_016_enough'],
    next_article: 'art_007_cr_connection',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },

  // CONNECTION & RELATIONSHIP (CR)
  {
    id: 'art_007_cr_connection',
    title: 'Connection Is the Opposite of Addiction',
    subtitle: 'Why isolation keeps you stuck',
    pillar_id: 'CR',
    theme_id: 'connection',
    body: `# Connection Is the Opposite of Addiction

Johann Hari's research found: "The opposite of addiction isn't sobriety. It's connection."

This isn't poetry. It's biology.

## What Isolation Does

Humans are wired for connection. When you're isolated:
- Stress hormones increase
- Pain sensitivity heightens
- Threat detection amplifies
- Addiction pathways strengthen

Your brain treats social isolation like physical pain. And pain seeks relief.

## The Addiction-Isolation Loop

1. **Pain emerges** (trauma, loss, rejection)
2. **You isolate** (to avoid more pain)
3. **Isolation intensifies pain** (loneliness hurts)
4. **Substance/behavior soothes** (temporary relief)
5. **Shame deepens** (more reason to hide)
6. **Isolation increases** (the loop tightens)

## Why Connection Heals

Connection doesn't just feel good. It:
- Regulates your nervous system
- Reduces stress hormones
- Activates reward pathways (naturally)
- Provides co-regulation
- Creates accountability
- Offers reality-testing

You can't regulate alone. You need other nervous systems to help yours calm down.

## The Vulnerability Requirement

Connection requires vulnerability. Showing up as you are, not as you think you should be.

This is terrifying when you believe:
- "If they knew me, they'd leave"
- "I'm too much/not enough"
- "I don't deserve connection"

But hiding perpetuates the isolation that feeds addiction.

## Building Real Connection

**Not:** Performing, people-pleasing, pretending
**But:** Being seen, being honest, being imperfect

**Start where you are:**
- Support group (people who get it)
- Therapist (safe professional relationship)
- One safe friend (quality over quantity)
- Online community (connection counts even virtually)

## The Practice

Connection isn't about being surrounded by people. It's about being KNOWN by people.

One real relationship beats 100 surface interactions.

## The Risk

Yes, people can hurt you. Connection means risk.

But isolation guarantees pain. Connection offers possibility.

What would you rather risk?`,
    reading_time_minutes: 6,
    hook: 'The opposite of addiction isn\'t sobriety. It\'s connection. Here\'s why isolation keeps you stuck and how to start building real relationships.',
    schema_targets: ['connection', 'belonging', 'vulnerability'],
    mindblock_targets: ['catastrophizing', 'mind_reading'],
    kbe_layer: 'knowing',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'How connected do you feel today?',
      exit_receipt: 'What\'s one step toward connection?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_009_voicing', 'prac_006_reach_out'],
    related_insights: ['ins_002_isolation', 'ins_013_belonging'],
    next_article: 'art_008_cr_boundaries',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },
  {
    id: 'art_008_cr_boundaries',
    title: 'Boundaries Without Guilt',
    subtitle: 'How to protect yourself without shame',
    pillar_id: 'CR',
    theme_id: 'boundaries',
    body: `# Boundaries Without Guilt

"No" feels dangerous when you learned love is conditional.

If worth comes from being helpful, accommodating, self-sacrificing, then boundaries feel like:
- Selfishness
- Rejection
- Failure
- Abandonment

But boundaries aren't walls. They're the foundation of sustainable relationships.

## What Boundaries Actually Are

Boundaries define:
- What you're responsible for (your feelings, behaviors, needs)
- What you're not responsible for (others' feelings, behaviors, needs)

**Without boundaries:**
- You absorb others' emotions
- You fix everyone's problems
- You say yes when you mean no
- You're exhausted and resentful

## The Resentment-Addiction Link

Resentment is a relapse risk. When you constantly override your needs to meet others':
- Resentment builds
- You feel used, unseen, trapped
- Substances/behaviors become the only "self-care"

Boundaries prevent resentment. They protect your recovery.

## Common Boundary Struggles

**"But they'll be hurt/angry/disappointed"**
- You can't control their reaction
- Their feelings are their responsibility
- Boundaries are about you, not them

**"But I'm being selfish"**
- Self-care isn't selfish
- You can't pour from an empty cup
- Boundaries preserve your capacity to give

**"But what if they leave?"**
- If someone leaves because you had a boundary, they weren't safe
- Real relationships survive boundaries
- Better to be alone than lose yourself

## How to Set Boundaries

**1. Get clear on your limits**
What drains you? What behaviors are you unwilling to accept?

**2. Communicate clearly**
"I can't do that" (not "I don't think I can maybe possibly...")

**3. Hold the line**
Boundaries without enforcement are suggestions

**4. Manage your guilt**
Guilt doesn't mean you're wrong. It means you're changing a pattern.

## The Practice

Start small:
- "I need to go" (when you're overwhelmed)
- "I can't take that on" (when you're overextended)
- "That doesn't work for me" (when something violates your values)

Notice the guilt. Feel it. Do it anyway.

## The Truth

Boundaries protect your recovery. They protect your relationships. They protect you.

You don't need permission to take care of yourself.`,
    reading_time_minutes: 7,
    hook: 'Boundaries feel selfish when you learned love is conditional. But they protect your recovery. Here\'s how to set them without shame.',
    schema_targets: ['boundaries', 'self_advocacy', 'worthiness'],
    mindblock_targets: ['should_statements', 'people_pleasing'],
    kbe_layer: 'embodying',
    evidence_level: 'clinical',
    response_contract: {
      entry_cue: 'Where do you need a boundary?',
      exit_receipt: 'What boundary could you practice?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_005_boundary', 'prac_009_voicing'],
    related_insights: ['ins_007_boundaries', 'ins_011_no'],
    next_article: 'art_009_ii_meaning',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },

  // IDENTITY & INTEGRATION (II)
  {
    id: 'art_009_ii_meaning',
    title: 'Finding Meaning Without Manufacturing It',
    subtitle: 'Purpose emerges, it\'s not forced',
    pillar_id: 'II',
    theme_id: 'meaning',
    body: `# Finding Meaning Without Manufacturing It

"What's my purpose?"

This question can be paralyzing in recovery. Especially when you've spent years numbing the question of what matters.

## The Pressure to Find Purpose

Early recovery often comes with this narrative:
- "Turn your pain into purpose"
- "Use your story to help others"
- "Find your why and you'll stay sober"

These can be beautiful. Or they can be another performance trap.

## The Danger of Forcing Meaning

When you try to manufacture purpose:
- It feels hollow (you're performing meaning, not living it)
- It creates pressure (what if I fail at purpose too?)
- It bypasses grief (meaning-making can be a spiritual bypass)

Sometimes the meaning isn't clear yet. Sometimes you need to grieve what you lost before you find what you're building.

## How Meaning Actually Emerges

Meaning isn't found. It's discovered through:
- What captures your attention
- What moves you to tears
- What you can't stop thinking about
- What you'd do even if no one watched

**Not:** "I should help people in recovery because I'm in recovery"
**But:** "I'm drawn to this. It lights something in me."

## Multiple Sources of Meaning

You don't need one grand purpose. Meaning comes from:
- Connection (relationships that matter)
- Creation (building, making, expressing)
- Contribution (helping in ways that feel aligned)
- Growth (becoming who you're meant to be)
- Transcendence (something bigger than yourself)

## The Practice

Instead of asking "What's my purpose?" try:
- What feels alive right now?
- What small thing could I offer today?
- What interests me, even a little?
- What would I do if I wasn't afraid?

Meaning builds slowly. Through experiments. Through curiosity. Through showing up.

## The Permission

You don't have to turn your trauma into inspiration. You don't have to be a beacon of hope. You don't have to have it all figured out.

You're allowed to just live. To discover. To try things. To change your mind.

Purpose will find you if you stay curious and keep showing up.`,
    reading_time_minutes: 7,
    hook: 'Recovery culture says find your purpose. But meaning isn\'t manufactured. It emerges. Here\'s how to let it unfold without forcing it.',
    schema_targets: ['meaning_making', 'authenticity', 'values_clarity'],
    mindblock_targets: ['should_statements', 'all_or_nothing'],
    kbe_layer: 'believing',
    evidence_level: 'experiential',
    response_contract: {
      entry_cue: 'What question are you carrying?',
      exit_receipt: 'What small experiment could you try?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_004_values', 'prac_010_writing'],
    related_insights: ['ins_009_purpose', 'ins_017_becoming'],
    next_article: 'art_010_dm_decisions',
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },

  // DECISION MAKING (DM)
  {
    id: 'art_010_dm_decisions',
    title: 'Choice Access in Crisis',
    subtitle: 'How to decide when your brain is offline',
    pillar_id: 'DM',
    theme_id: 'choice_access',
    body: `# Choice Access in Crisis

When you're dysregulated, your prefrontal cortex goes offline. The part of your brain responsible for:
- Rational decision-making
- Impulse control
- Future-thinking
- Weighing consequences

In crisis, you don't have access to choice. You have access to survival responses.

## The Neurobiological Reality

**Inside your window:**
- Prefrontal cortex online
- You can pause, think, choose
- Multiple options visible
- Consequences feel real

**Outside your window:**
- Amygdala running the show
- Fight, flight, freeze, or use
- One option dominates
- Future consequences invisible

You can't think your way out of a dysregulated nervous system.

## Why "Just Say No" Fails

"Just say no" assumes you have access to choice. But if your nervous system is in survival mode:
- Willpower is irrelevant
- Consequences don't register
- The present moment is unbearable
- Relief is the only option

This isn't weakness. It's biology.

## Building Choice Access

**Before Crisis:**
- Practice regulation tools daily (not just when you need them)
- Build a crisis plan when you're calm
- Identify early warning signs
- Create environmental scaffolding (remove access, add friction)

**During Crisis:**
- Regulate FIRST (breathing, movement, grounding)
- Delay the decision (even 5 minutes changes brain state)
- Call someone (co-regulation)
- Use pre-made decision (your crisis plan)

**After Crisis:**
- Debrief without judgment
- What were the warning signs?
- What helped? What didn't?
- Update your plan

## The Practice: Pre-Decision Making

You don't make decisions in crisis. You EXECUTE decisions made when calm.

**Create your plan now:**
1. Warning signs I'm losing choice access: ___
2. First regulation tool to try: ___
3. Person to call: ___
4. Place to go (or leave): ___
5. Reminder of why I'm choosing differently: ___

## The Truth

You can't always control whether a crisis hits. But you can build the infrastructure that makes recovery possible when it does.

Choice access is a skill. Practice it when you don't need it, so it's there when you do.`,
    reading_time_minutes: 8,
    hook: 'In crisis, your prefrontal cortex goes offline. You can\'t access choice. Here\'s how to build decision-making capacity BEFORE you need it.',
    schema_targets: ['choice_access', 'window_of_tolerance', 'crisis_planning'],
    mindblock_targets: ['all_or_nothing', 'emotional_reasoning'],
    kbe_layer: 'embodying',
    evidence_level: 'research',
    response_contract: {
      entry_cue: 'When do you lose access to choice?',
      exit_receipt: 'What will your crisis plan include?',
      proof_capture_mode: 'receipt',
    },
    related_practices: ['prac_001_box_breathing', 'prac_002_grounding', 'prac_003_pause'],
    related_insights: ['ins_018_crisis', 'ins_019_pause', 'ins_020_choice'],
    next_article: null,
    author: 'Clinical Team',
    created_at: '2024-12-30T00:00:00Z',
    status: 'published',
  },
];
/**
 * NAVICUE 2000 ARSENAL
 * The strategic algorithmic arsenal for true mindset transformation
 * 
 * PHILOSOPHY:
 * - Multiple NaviCues per mindblock for testing, rotation, fine-tuning
 * - Know → Believe → Embody spectrum with intentional progression
 * - Neuroscience (nervous system, adaptation, protection)
 * - Spirit (presence, awareness, vastness)
 * - Poetry (metaphor, natural imagery, rhythm)
 * 
 * STRATEGIC APPROACH:
 * - Test the water with gentle probes
 * - Measure responses and resistance patterns
 * - Rotate NaviCues to approach from different angles
 * - Nudge 1% shifts as real progress
 * - Build new neural pathways through repetition with variation
 * 
 * STRUCTURE: 1000 NaviCues (nc.1001 - nc.2000)
 * - IDs: nc.1001 through nc.2000
 * - 12 Schemas: shame, control, abandonment, perfectionism, victimhood,
 *   emotional-suppression, people-pleasing, scarcity, comparison,
 *   catastrophizing, identity-fusion, safety-seeking
 * - 6 Pillars: P-01 through P-06
 * - 8 Families: statement_mirror, belief_probe, identity_koan, paradox_prompt,
 *   story_shard, reframe_seed, curveball, practice
 * - 3 KBE Layers: knowing, believing, embodying
 * 
 * Generated: December 29, 2024
 * Production Ready: Yes
 * Synced to Universal Player: Yes
 * Clinical Foundation Matrix: Yes
 */

import { NaviCue, PillarId } from './types';

// ============================================================================
// PILLAR DEFINITIONS
// ============================================================================

const PILLARS = {
  'P-01': { id: 'P-01' as PillarId, name: 'PAUSE + GROUND', color: '#3E2BB8' },
  'P-02': { id: 'P-02' as PillarId, name: 'MEET YOUR NEEDS', color: '#2EC4B6' },
  'P-03': { id: 'P-03' as PillarId, name: 'MOVE YOUR BODY', color: '#F4A261' },
  'P-04': { id: 'P-04' as PillarId, name: 'CONNECT', color: '#FFB703' },
  'P-05': { id: 'P-05' as PillarId, name: 'SHOW YOURSELF', color: '#E84855' },
  'P-06': { id: 'P-06' as PillarId, name: 'FIND YOUR PURPOSE', color: '#9B59B6' },
} as const;

// ============================================================================
// SCHEMA DEFINITIONS & CORE BELIEFS
// ============================================================================

const SCHEMA_MAP = {
  'shame': 'I am fundamentally flawed or unlovable',
  'control': 'The world is chaotic and I must manage everything',
  'abandonment': 'People will leave me if I show my true self',
  'perfectionism': 'I am only worthy when I am flawless',
  'victimhood': 'I am powerless and things happen to me',
  'emotional-suppression': 'Feelings are dangerous and must be controlled',
  'people-pleasing': 'Others\' needs matter more than mine',
  'scarcity': 'There is never enough and I must protect what I have',
  'comparison': 'My worth is determined by how I measure against others',
  'catastrophizing': 'The worst outcome is inevitable',
  'identity-fusion': 'I am my roles, achievements, and others\' perceptions',
  'safety-seeking': 'I must avoid all risk to stay safe',
} as const;

const schemas = Object.keys(SCHEMA_MAP) as Array<keyof typeof SCHEMA_MAP>;
const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];

// ============================================================================
// ARSENAL TEMPLATES - NEUROSCIENCE + SPIRIT + POETRY
// ============================================================================

// STATEMENT MIRRORS - Hold up reflection, create recognition
const MIRROR_ARSENAL = {
  shame: [
    'The body knows unworthiness as a learned contraction. Where did it first tighten?',
    'Shame lives in the throat, the chest, the belly. Name where it settles in you.',
    'The voice that says \"not enough\" borrowed its tone from somewhere. Whose voice is beneath it?',
    'Worthiness is not earned through suffering. The nervous system just believes it is.',
    'Before language named it shame, the body felt it as shrinking. Notice the impulse to make yourself small.',
    'The mirror reflects without judgment. Clouds, garbage, beauty. What if your awareness works the same way?',
    'Unworthiness is a sensation first, a story second. Feel it before believing it.',
    'The child who first learned shame is still here, waiting. Can you find them?',
  ],
  control: [
    'The grip that holds control is the hand that once had none. Feel the original powerlessness.',
    'Control is the nervous system\'s response to remembered chaos. The chaos is often in the past.',
    'The muscles that clench to manage outcomes are exhausted. Can you feel the fatigue?',
    'Letting go is terrifying when gripping once meant survival. Your body remembers.',
    'The need to orchestrate everything protects against a danger that may no longer exist.',
    'Uncertainty feels like falling when the nervous system links it to early helplessness.',
    'The illusion of control costs more energy than it saves. The body knows this.',
    'Release begins with noticing the grip, not forcing the release.',
  ],
  abandonment: [
    'The fear of being left lives in the body as a prepared goodbye. Notice how you preemptively withdraw.',
    'Attachment wounds store as readiness to lose. Feel how connection activates bracing.',
    'The nervous system learned to expect leaving. It scans for exits even when people stay.',
    'Closeness and loss became wired together once. Now every bond carries that memory.',
    'The child who was left still believes proximity equals imminent departure.',
    'Reaching out feels dangerous when reaching once led to empty hands.',
    'The heart knows longing and defending as the same motion. Can you separate them?',
    'Trust is rebuilt in small moments. One stayed presence at a time.',
  ],
  perfectionism: [
    'The standard that hovers unreachable once promised safety. It lied.',
    'Flawlessness is the armor chosen when being seen felt dangerous.',
    'The impulse to polish until perfect is the nervous system avoiding exposure.',
    'Mistakes once meant rejection. The body still braces for exile.',
    'Good enough feels reckless when perfection was the price of belonging.',
    'The inner critic speaks in a borrowed voice. Whose standards are these?',
    'Error and worthiness became enemies once. They were never meant to be.',
    'The relentless refining is exhaustion masquerading as excellence.',
  ],
  victimhood: [
    'Powerlessness can become familiar when agency once felt overwhelming or impossible.',
    'The narrative of being done-to protects against the weight of choosing.',
    'Helplessness is sometimes a habituated stance, not a current reality.',
    'The body remembers being small and overpowered. It forgets it grew.',
    'Agency lives as a low hum beneath the story of powerlessness. Can you hear it?',
    'Influence starts smaller than the mind expects. A breath. A boundary. A no.',
    'Victimhood and accountability are not opposites. You can hold both.',
    'The past shaped you without trapping you. The nervous system conflates the two.',
  ],
  'emotional-suppression': [
    'Feelings were once too big for the container of childhood. They are not too big now.',
    'The body learned to swallow emotion when expression met punishment or neglect.',
    'Suppression lives as a held breath, a clenched jaw, a frozen diaphragm.',
    'The nervous system conflates feeling with flooding. They are different.',
    'Emotions are information, not invasion. The system learned otherwise.',
    'The shutdown happens automatically now. Awareness is the first step toward thaw.',
    'What was unsafe to feel then may be safe to feel now. Test it gently.',
    'The cost of not feeling is higher than the risk of feeling. The body knows.',
  ],
  'people-pleasing': [
    'The yes that serves others first learned to speak when your no met danger or disappointment.',
    'Approval-seeking is the nervous system\'s strategy when acceptance felt conditional.',
    'Boundaries once brought consequences. The body still expects them.',
    'The impulse to accommodate is fatigue wearing the mask of kindness.',
    'Your needs learned to quiet themselves. Can you hear them whispering?',
    'The self abandoned for others\' comfort is the self longing to return.',
    'Pleasing and connecting are not the same. The nervous system confuses them.',
    'The no you fear saying holds the yes you need to live.',
  ],
  scarcity: [
    'The body holds scarcity as a clenched fist, even when the hand could open.',
    'Not-enough is a belief formed when resources were truly scarce. The scarcity is often past.',
    'Abundance feels dangerous when loss is what the nervous system learned to anticipate.',
    'The grip on what you have tightens what you can receive.',
    'Generosity feels reckless when deprivation is the stored memory.',
    'Enough is not a quantity. It is a nervous system state.',
    'The fear of running out runs the system even when reserves are full.',
    'Letting go of scarcity starts with noticing the clench.',
  ],
  comparison: [
    'The measuring begins in the body before the mind names it. Feel the contraction.',
    'Worth became relative when love felt conditional. The nervous system still measures.',
    'Comparison is the mechanism that once helped you survive hierarchies. It is outdated now.',
    'The impulse to rank yourself is the child trying to determine safety.',
    'Enough-ness is intrinsic. Comparison makes it contingent.',
    'The body tenses when others shine, as if their light diminishes yours.',
    'You are not in competition with anyone. The nervous system believes you are.',
    'The race you are running is against a ghost of your own making.',
  ],
  catastrophizing: [
    'The mind that predicts disaster is a nervous system trying to prevent past pain.',
    'Worst-case thinking is a protection strategy from when vigilance felt necessary.',
    'The body stays in future threat even when the present is neutral.',
    'Catastrophizing is an exhausted attempt at control. It controls nothing.',
    'The spiral into worst outcomes is the mind trying to brace against shock.',
    'Threat prediction kept you alive once. Now it keeps you anxious.',
    'The future you fear is a projection, not a fact. The body believes it anyway.',
    'Presence interrupts the catastrophe loop. Breath by breath.',
  ],
  'identity-fusion': [
    'The self became what it does when being was not enough.',
    'Roles are worn, not embodied. The body knows the difference.',
    'Achievements are events, not essence. The nervous system confuses them.',
    'You exist beyond what you produce. The system learned otherwise.',
    'Identity without roles feels like annihilation when worth was conditional.',
    'The mask worn long enough starts to feel like skin. It is not.',
    'Beneath the accumulated identities, something wordless remains. Can you sense it?',
    'The vastness of who you are cannot fit into the roles you play.',
  ],
  'safety-seeking': [
    'The body seeks certainty when uncertainty once meant danger. The danger is often gone.',
    'Risk avoidance is the nervous system stuck in a threat that ended.',
    'The perimeter of safety is drawn smaller than necessary. Notice the constriction.',
    'True safety is nervous system regulation, not environmental control.',
    'The danger you avoid by staying small may be less than the cost of staying small.',
    'Grounded is different than guarded. One breathes. One braces.',
    'The window of tolerance is wider than the nervous system believes. Test the edge gently.',
    'Safety is built through experience, not avoidance.',
  ],
};

// BELIEF PROBES - Question the framework
const PROBE_ARSENAL = {
  shame: [
    'If unworthiness is a learned belief, who taught it and when?',
    'What if the flaw is in the measuring stick, not in you?',
    'Where is the evidence that you are fundamentally broken?',
    'Who profits from your shame?',
    'What becomes possible when shame is seen as conditioning, not truth?',
    'If a child believed they were unworthy, what would you tell them?',
    'How much energy does maintaining unworthiness consume?',
    'What would shift if unworthiness was a visitor, not your identity?',
  ],
  control: [
    'What if letting go is not losing control but changing relationship with uncertainty?',
    'When was the last time controlling something actually prevented the unwanted outcome?',
    'What is the cost of the illusion of control?',
    'If you released one thing today, what would happen?',
    'Where does the need to manage everything originate?',
    'What if control is a response to old powerlessness, not current reality?',
    'How would it feel to influence instead of control?',
    'What part of you knows that gripping changes nothing?',
  ],
  abandonment: [
    'What if reaching out is not weakness but the beginning of trust?',
    'Where is the evidence that everyone leaves?',
    'What if some people stay?',
    'If connection equals loss, how did that equivalence form?',
    'What becomes possible if you stay five minutes longer than the urge to flee?',
    'Who taught you that closeness is dangerous?',
    'What if the leaving was about them, not about you?',
    'Where in your body do you brace for departure?',
  ],
  perfectionism: [
    'What if good enough is not failure but wisdom?',
    'Where is the evidence that mistakes equal unworthiness?',
    'Who decided what flawless looks like?',
    'What if the imperfection is the point?',
    'How much life is lost to the pursuit of perfect?',
    'What would happen if you submitted something incomplete?',
    'Where does the voice demanding perfection originate?',
    'What if done is better than flawless?',
  ],
  victimhood: [
    'What is one thing, however small, you can influence today?',
    'Where do you have agency that you are not acknowledging?',
    'What if powerlessness is a habit, not a fact?',
    'How does the narrative of being victimized serve you?',
    'What becomes possible if you own even 1% of the outcome?',
    'Where did you learn that you have no power?',
    'What if things happen and you also have choice?',
    'What would change if you took credit for one good thing today?',
  ],
  'emotional-suppression': [
    'What if feeling something fully only takes 90 seconds?',
    'Where did you learn that emotions are dangerous?',
    'What is the cost of not feeling?',
    'What if the body needs to release what the mind suppresses?',
    'How much energy does emotional control consume?',
    'Where in your body are feelings stored and waiting?',
    'What would happen if you named one emotion out loud right now?',
    'What if expression is safer now than it was then?',
  ],
  'people-pleasing': [
    'What if your no is as valuable as your yes?',
    'Where did you learn that others\' needs outweigh yours?',
    'What is the cost of constant accommodation?',
    'What becomes possible if you disappoint someone small?',
    'Who taught you that your worth depends on their approval?',
    'What if the relationship can hold your boundary?',
    'Where do your actual needs go when you prioritize theirs?',
    'What would change if you chose yourself once today?',
  ],
  scarcity: [
    'What if there is enough and the nervous system just does not believe it?',
    'Where is the evidence of actual scarcity right now?',
    'What would happen if you gave something away today?',
    'How does the belief in not-enough shape your choices?',
    'What if abundance is a nervous system state, not a bank balance?',
    'Where did the fear of running out originate?',
    'What becomes possible when you act as if there is enough?',
    'What is the cost of the perpetual clench around resources?',
  ],
  comparison: [
    'What if your worth is not relative to anyone else?',
    'Where did you learn to measure yourself against others?',
    'What is the cost of constant comparison?',
    'What becomes possible if you remove yourself from the race?',
    'Who taught you that someone else\'s success diminishes yours?',
    'What if enough-ness is intrinsic, not comparative?',
    'Where in your body does comparison live as tension?',
    'What would shift if you stopped measuring?',
  ],
  catastrophizing: [
    'What if the worst outcome you imagine is not the most likely one?',
    'Where is the evidence that disaster is inevitable?',
    'What is the cost of living in perpetual worst-case scenarios?',
    'What becomes possible if you plan for probable instead of catastrophic?',
    'Where did you learn that predicting disaster keeps you safe?',
    'What if vigilance is not protection?',
    'How much of the catastrophe exists only in projection?',
    'What would shift if you stayed in this moment instead of future threat?',
  ],
  'identity-fusion': [
    'What if you are not your job, your role, or your achievements?',
    'Where does the self exist when all roles are removed?',
    'What is the cost of deriving worth from doing instead of being?',
    'What becomes possible if you rest without producing?',
    'Who are you when no one needs you to be anyone?',
    'Where did you learn that being is not enough?',
    'What if the vastness of you cannot fit into a title?',
    'What would shift if you existed without justification?',
  ],
  'safety-seeking': [
    'What if safety is not the absence of risk but the presence of resilience?',
    'Where is the evidence that all uncertainty leads to harm?',
    'What is the cost of avoiding all discomfort?',
    'What becomes possible if you expand your window of tolerance by 1%?',
    'Where did you learn that risk always means danger?',
    'What if the nervous system is responding to a past threat, not a present one?',
    'How much life is lost to the pursuit of guaranteed safety?',
    'What would shift if you tried one small uncertain thing today?',
  ],
};

// IDENTITY KOANS - Point to consciousness itself
const KOAN_ARSENAL = {
  shame: [
    'The wave believes it is separate from the ocean. Is shame the wave or the ocean?',
    'Who is the one aware of unworthiness? Can that one be unworthy?',
    'A mirror reflects everything without becoming anything. Where is your mirror?',
    'Before you learned your name, were you flawed?',
    'The sky does not apologize for clouds. What is your sky?',
    'Shame is weather moving through. Who watches the weather?',
    'The actors plays all the parts. Victim, hero, villain. Who is the actor?',
    'If unworthiness is a thought, who thinks the thought?',
  ],
  control: [
    'The river controls nothing and arrives at the ocean. What are you controlling?',
    'Leaves fall without permission. What in you tries to hold them?',
    'The breath breathes itself. What believes it is in charge?',
    'Clouds move without instruction. What part of you resists this?',
    'The heart beats without your management. What else continues without you?',
    'A tree does not control its growth. Where did you learn to grip?',
    'The planet spins without consulting you. What does your effort change?',
    'If control is illusion, what remains when the illusion drops?',
  ],
  abandonment: [
    'The moon wanes and returns. What in you fears the cycle?',
    'Waves reach shore and recede. Is this leaving or rhythm?',
    'The breath leaves and comes back. Where is the abandonment?',
    'Seasons depart and circle home. What believes departure is permanent?',
    'The sun sets without abandoning the earth. What is your sun?',
    'Birds migrate and return. What in you cannot trust the return?',
    'Day becomes night becomes day. What fears the dark?',
    'The tide goes out. Is the ocean gone?',
  ],
  perfectionism: [
    'A cracked bell still rings true. Where is the flaw that ruins the sound?',
    'Mountains are jagged. Is this imperfection or design?',
    'The moon is scarred with craters. Does it shine less?',
    'Rivers are crooked. Do they fail to reach the sea?',
    'Flowers bloom imperfectly. Does the bee reject them?',
    'Stars are born from chaos. What in you demands order?',
    'The diamond forms under pressure. What if the flaw is the light?',
    'Wabi-sabi honors the crack. Where is your crack?',
  ],
  victimhood: [
    'The mountain does not choose the weather but stands regardless. What is your standing?',
    'A seed breaks open. Is this happening to it or through it?',
    'The river carves the canyon. Is it powerless or powerful?',
    'Gravity pulls. The bird flies anyway. What is your flight?',
    'The wound becomes the teacher. Is this victimhood or transformation?',
    'Rain falls. The flower opens or closes. What is the flower\'s choice?',
    'The past shaped the stone. Does the stone have no agency now?',
    'Life happens. Response happens. Where is the powerlessness?',
  ],
  'emotional-suppression': [
    'A dam holds water until it breaks. What are you holding?',
    'The volcano does not suppress. It erupts when full. What is full in you?',
    'Clouds hold rain until release. What rain are you carrying?',
    'The kettle whistles when pressure builds. Where is your whistle?',
    'Rivers do not contain their currents. What current are you containing?',
    'The earth quakes when pressure accumulates. What pressure lives in you?',
    'Music is silence and sound. What are you silencing?',
    'The body speaks what the mouth will not. What is your body saying?',
  ],
  'people-pleasing': [
    'The tree does not bend for every wind. What is your root?',
    'The mountain says no to the river. The river finds another way. What is your no?',
    'The ocean does not ask permission to be vast. What permission are you seeking?',
    'A boundary is a riverbank. Without it, flood. Where is your bank?',
    'The sun shines on all and withholds nothing. Does it owe explanation?',
    'A flower closes at night. Is this selfishness or wisdom?',
    'The bird flies its own migration. What route are you flying?',
    'The drum sets the rhythm. Does it follow or lead?',
  ],
  scarcity: [
    'The ocean loses nothing when the wave crashes. Where is your ocean?',
    'The sun gives light endlessly. Does it diminish?',
    'Air is everywhere and enough. What convinces you otherwise?',
    'The tree gives fruit and remains. What are you protecting?',
    'The well refills from the source. What is your source?',
    'Birds share the sky without scarcity. What sky are you hoarding?',
    'Breath comes and goes infinitely. What feels finite?',
    'The river flows without counting its water. What are you counting?',
  ],
  comparison: [
    'Each mountain has its own height. Do they compete?',
    'Every river takes its course. Is one more worthy?',
    'Stars shine without dimming each other. What in you believes otherwise?',
    'Trees grow at different rates. Does the oak envy the willow?',
    'Flowers bloom in their season. Is the late rose inferior?',
    'The moon does not compare itself to the sun. What are you comparing?',
    'Waves are all unique and all ocean. What is your ocean?',
    'The bird sings its song. Does it measure it against another?',
  ],
  catastrophizing: [
    'The seed holds the future. Does it predict disaster?',
    'Clouds gather. Does the earth catastrophize the storm?',
    'Winter comes. Does the tree imagine it will never end?',
    'The wave rises. Does it know it will crash?',
    'The day darkens. Does the world fear it is final?',
    'The storm approaches. Does the mountain brace or stand?',
    'The future is unwritten. What story are you telling?',
    'The present moment holds no disaster. Where are you?',
  ],
  'identity-fusion': [
    'The wave forgets it is ocean. What have you forgotten?',
    'The actor forgets the stage. What role do you believe is real?',
    'The mask worn long becomes the face. What is beneath the mask?',
    'The river believes it is separate from the source. What is your source?',
    'You are not the car you drive. What vehicle do you think you are?',
    'The costume is not the person. What costume are you wearing?',
    'Roles are played, not lived. What are you playing?',
    'Before you were anyone, you were. What is the you before roles?',
  ],
  'safety-seeking': [
    'The bird risks the flight. Does it guarantee the landing?',
    'The seed breaks open in darkness. Is this safe?',
    'The ocean has no edges. What edge are you seeking?',
    'The tightrope walker falls into the net. What is your net?',
    'Certainty is a story. What story are you demanding?',
    'The ship stays safe in harbor. But that is not what ships are for. What are you for?',
    'The mountain climber holds the rope but trusts the step. What step are you avoiding?',
    'Life is risk. Breath by breath. What breath are you holding?',
  ],
};

// PARADOX PROMPTS - Hold contradictions
const PARADOX_ARSENAL = {
  shame: [
    'You are fundamentally whole AND carry wounding. Both are true.',
    'Shame feels real AND is not the truth of you. Both exist.',
    'You are lovable exactly as you are AND growth is possible. No contradiction.',
    'The flaw exists AND does not define you. Both true.',
    'Unworthiness is felt AND is learned. Sensation and conditioning coexist.',
    'You are broken in places AND entirely intact. Paradox, not problem.',
    'The shame is real AND the shame is not you. Both statements hold.',
    'You need to heal AND there is nothing wrong with you. Both.',
  ],
  control: [
    'You are powerless over outcomes AND responsible for choices. Both true.',
    'Letting go is terrifying AND necessary. The paradox is the path.',
    'Control is impossible AND the illusion persists. Both real.',
    'You cannot manage everything AND you influence more than you think. Both.',
    'Surrender feels like losing AND is actually gaining. Paradox.',
    'Uncertainty is unbearable AND is the only honest ground. Both true.',
    'You want control AND control exhausts you. Hold both.',
    'Gripping changes nothing AND releasing feels dangerous. Both are true.',
  ],
  abandonment: [
    'Closeness is terrifying AND necessary. Both true.',
    'People leave AND people stay. Both happen.',
    'You are afraid of being left AND staying is a choice. Both.',
    'Connection feels dangerous AND isolation is unbearable. Paradox.',
    'You push people away AND fear being alone. Both real.',
    'Reaching out is risky AND withdrawing guarantees nothing. Both true.',
    'Love feels conditional AND unconditional love exists. Both.',
    'You brace for leaving AND long for staying. Hold both.',
  ],
  perfectionism: [
    'Good enough feels reckless AND perfection is exhausting. Both true.',
    'Mistakes are inevitable AND feel catastrophic. Paradox.',
    'You are worthy as you are AND improvement is possible. Both.',
    'Flawless is the goal AND flawless is impossible. Both true.',
    'Done is better than perfect AND perfect feels necessary. Hold both.',
    'Imperfection is human AND feels like failure. Both real.',
    'You want to let go of perfect AND cannot. Paradox.',
    'Excellence is valuable AND perfectionism is prison. Both.',
  ],
  victimhood: [
    'Things happened to you AND you have agency now. Both true.',
    'You were powerless AND you are not anymore. Both.',
    'The past shaped you AND does not define you. Paradox.',
    'Circumstances are real AND choice exists within them. Both.',
    'You are responsible AND not to blame. Both true.',
    'Powerlessness was real AND is not permanent. Hold both.',
    'Life is unfair AND you still have influence. Both.',
    'You are victim AND agent. Both truths coexist.',
  ],
  'emotional-suppression': [
    'Feelings are overwhelming AND the body can hold them. Both true.',
    'Expression feels dangerous AND suppression is exhausting. Paradox.',
    'Emotions are information AND feel like invasion. Both.',
    'You need to feel AND are afraid to feel. Both true.',
    'The body wants release AND the mind resists. Hold both.',
    'Crying feels weak AND is actually strong. Both.',
    'Suppression protects AND suppression harms. Both true.',
    'Feelings pass AND feel permanent. Paradox.',
  ],
  'people-pleasing': [
    'Your needs matter AND so do others\' needs. Both true.',
    'No feels selfish AND yes feels exhausting. Paradox.',
    'You want approval AND resent the cost. Both.',
    'Boundaries feel cruel AND their absence feels worse. Both true.',
    'Disappointing others is hard AND abandoning yourself is harder. Both.',
    'You can be kind AND say no. No contradiction.',
    'Connection is important AND accommodation is not connection. Both true.',
    'You are responsible for yourself AND not for their reaction. Both.',
  ],
  scarcity: [
    'Resources are finite AND abundance is possible. Both true.',
    'Not-enough feels real AND enough exists. Paradox.',
    'Giving feels risky AND hoarding feels empty. Both.',
    'Scarcity was real AND is not necessarily now. Both true.',
    'You need to protect what you have AND generosity opens flow. Both.',
    'There is never enough AND there is always enough. Hold both.',
    'Accumulation feels necessary AND does not bring peace. Both true.',
    'Fear of lack is real AND blocks abundance. Paradox.',
  ],
  comparison: [
    'You are unique AND not special. Both true.',
    'Others\' success is real AND does not diminish you. Both.',
    'Measuring feels necessary AND is irrelevant. Paradox.',
    'You are enough AND they are enough. Both true.',
    'Competition exists AND collaboration is possible. Both.',
    'You want to stop comparing AND cannot. Hold both.',
    'Your worth is intrinsic AND feels relative. Both true.',
    'The race is real AND you are not in it. Paradox.',
  ],
  catastrophizing: [
    'The worst could happen AND probably will not. Both true.',
    'Vigilance feels protective AND exhausts you. Paradox.',
    'Disaster is possible AND not inevitable. Both.',
    'You need to prepare AND cannot control outcomes. Both true.',
    'Worst-case thinking is logical AND is not reality. Both.',
    'The future is uncertain AND that is bearable. Hold both.',
    'Something bad will happen AND so will something good. Both true.',
    'Catastrophe is imagined AND feels real. Paradox.',
  ],
  'identity-fusion': [
    'You are your roles AND you are beyond your roles. Both true.',
    'Achievement matters AND does not define you. Paradox.',
    'You are what you do AND you are what you are. Both.',
    'Identity is constructed AND essence exists. Both true.',
    'The mask is real AND is not you. Both.',
    'You are somebody AND nobody. Hold both.',
    'Titles are earned AND are not the self. Both true.',
    'You exist in form AND are formless. Paradox.',
  ],
  'safety-seeking': [
    'Risk is dangerous AND avoidance is costlier. Both true.',
    'You need safety AND absolute safety is impossible. Paradox.',
    'Uncertainty is threatening AND is the only certainty. Both.',
    'Comfort is valuable AND growth lives outside it. Both true.',
    'You want guarantees AND life offers none. Both.',
    'The edge is scary AND staying small is scarier. Hold both.',
    'Grounded and guarded are different AND feel the same. Both true.',
    'Safety is necessary AND total safety is prison. Paradox.',
  ],
};

// STORY SHARDS - Excavate the origin
const STORY_ARSENAL = {
  shame: [
    'There was a day unworthiness arrived. A moment when enough became not-enough. Do you remember?',
    'Somewhere, someone taught you that your existence required justification. Who was it?',
    'There was a time before shame. Before measuring. Before not-enough. Can you find it?',
    'The voice that says you are flawed learned its script somewhere. Where?',
    'A younger version of you decided being small was safer than being seen. What happened?',
    'Shame entered through a specific wound. What was said or done or withheld?',
    'There was a moment love felt conditional. When was it?',
    'The belief that you are fundamentally flawed has a birthdate. What is it?',
  ],
  control: [
    'There was a time when chaos was real and control was survival. When was that?',
    'Somewhere, you learned that letting go meant danger. What happened?',
    'The grip that holds everything has a reason. What is it protecting you from?',
    'There was a moment powerlessness was unbearable. When did control become the solution?',
    'Someone or something taught you the world is unmanageable. What was it?',
    'The need to orchestrate outcomes began with one overwhelming event. What was it?',
    'There was a day you decided trust was too risky. What broke?',
    'Uncertainty once meant real threat. When was that?',
  ],
  abandonment: [
    'There was a first leaving. The one that taught the pattern. Who left?',
    'Somewhere, closeness became linked to loss. When did that connection form?',
    'A younger you learned that people go. What was the leaving that burned deepest?',
    'There was a moment you decided it was safer to leave first. What preceded it?',
    'Someone important was supposed to stay and did not. Who was it?',
    'The fear of being left has a memory attached. What is it?',
    'There was a time you reached out and the hand was not there. When?',
    'Abandonment is a learned fear. What was the lesson?',
  ],
  perfectionism: [
    'There was a time a mistake brought consequences too big for a child. What happened?',
    'Somewhere, you learned that flawless was the price of love. Who set the price?',
    'The standard you chase has a face and a voice. Whose is it?',
    'There was a moment good enough was not enough. What was the moment?',
    'Someone taught you that error equals worthlessness. Who?',
    'The relentless refining began as a strategy. What was it solving?',
    'There was a day imperfection met rejection. Do you remember?',
    'Perfectionism has a root. Where is it planted?',
  ],
  victimhood: [
    'There was a time powerlessness was real and total. When was that?',
    'Somewhere, you learned that agency was not available to you. What taught you that?',
    'The narrative of being done-to began with a real experience. What was it?',
    'There was a moment you decided trying was pointless. What preceded it?',
    'Someone or something convinced you that you have no influence. What was it?',
    'The belief in powerlessness has a memory. What is it?',
    'There was a day when standing up brought danger. What happened?',
    'Victimhood is a learned stance. What was the lesson?',
  ],
  'emotional-suppression': [
    'There was a time feeling something brought punishment or neglect. What happened?',
    'Somewhere, you learned that emotion is dangerous. What taught you?',
    'The shutdown began as protection. What was it protecting you from?',
    'There was a moment expression was met with overwhelm or dismissal. What was said?',
    'Someone taught you that feelings are too much. Who?',
    'The habit of swallowing emotion has an origin. Where?',
    'There was a day crying or raging or feeling was unsafe. When?',
    'Suppression is a strategy learned young. What was the threat?',
  ],
  'people-pleasing': [
    'There was a time your no brought consequences. What were they?',
    'Somewhere, you learned that others\' needs outweigh yours. Who taught it?',
    'The impulse to accommodate began as survival. What was at stake?',
    'There was a moment your needs met disapproval or dismissal. What happened?',
    'Someone taught you that your worth is in your service. Who?',
    'The habit of putting others first has a root. Where is it?',
    'There was a day asserting yourself brought danger. What form did it take?',
    'Approval-seeking is learned. What was the lesson?',
  ],
  scarcity: [
    'There was a time scarcity was real. When was that?',
    'Somewhere, you learned that there is never enough. What taught you?',
    'The grip on resources began when loss was actual. What was lost?',
    'There was a moment deprivation became the expectation. When?',
    'Someone or something taught you to hoard. What was it?',
    'The belief in not-enough has a memory. What is it?',
    'There was a day abundance felt unsafe or unfamiliar. Why?',
    'Scarcity is a nervous system imprint. What imprinted it?',
  ],
  comparison: [
    'There was a time your worth was measured against another. When?',
    'Somewhere, you learned that love is earned through ranking. Who taught it?',
    'The habit of measuring began when value felt relative. What happened?',
    'There was a moment someone else\'s success felt like your failure. When?',
    'Someone taught you that enough-ness is comparative. Who?',
    'The belief that you are in competition has a root. Where?',
    'There was a day being less-than brought consequences. What were they?',
    'Comparison is learned. What was the lesson?',
  ],
  catastrophizing: [
    'There was a time the worst happened. When was it?',
    'Somewhere, you learned that disaster is always imminent. What taught you?',
    'The habit of predicting catastrophe began as protection. From what?',
    'There was a moment you were blindsided by pain. What was it?',
    'Someone or something taught you that vigilance prevents harm. What was it?',
    'The belief that the worst is inevitable has a memory. What is it?',
    'There was a day the unthinkable became real. When?',
    'Catastrophizing is a learned defense. What was the wound?',
  ],
  'identity-fusion': [
    'There was a time being was not enough. When did doing become everything?',
    'Somewhere, you learned that your value is in what you produce. Who taught it?',
    'The fusion of self and role began when worth felt conditional. What happened?',
    'There was a moment existence required justification through achievement. When?',
    'Someone taught you that you are what you do. Who?',
    'The belief that identity is earned has a root. Where?',
    'There was a day resting felt like failing. Why?',
    'Identity-fusion is learned. What was the lesson?',
  ],
  'safety-seeking': [
    'There was a time risk meant real danger. When was that?',
    'Somewhere, you learned that uncertainty equals threat. What taught you?',
    'The need for guaranteed safety began when the world felt truly unsafe. When?',
    'There was a moment stepping outside the perimeter brought harm. What happened?',
    'Someone or something taught you that avoidance is protection. What was it?',
    'The belief that all risk is dangerous has a memory. What is it?',
    'There was a day the unknown became terrifying. When?',
    'Safety-seeking is a learned strategy. What was the original threat?',
  ],
};

// REFRAME SEEDS - Neuroscience-informed compassionate reframing
const REFRAME_ARSENAL = {
  shame: [
    'Unworthiness is not truth. It is what the nervous system learned when love felt conditional.',
    'Shame is the emotional residue of unmet developmental needs, not evidence of defect.',
    'The belief that you are flawed is a conclusion drawn by a child who lacked context.',
    'What feels like fundamental brokenness is adaptive wounding from an environment that could not hold you.',
    'Shame is the internalization of relational failure, not personal failure.',
    'The voice that says not-enough is an echo of early attachment disruption, not reality.',
    'Unworthiness is a learned emotional state, not an inherent condition.',
    'What you call shame is the nervous system protecting you from future rejection by preemptively rejecting yourself.',
  ],
  control: [
    'Control is not pathology. It is what a brilliant nervous system does when chaos once felt like annihilation.',
    'The need to manage outcomes is adaptive protection from a time when unpredictability meant danger.',
    'What feels like obsessive control is the legacy of early helplessness.',
    'The grip is not weakness. It is the hands of a child who once had none.',
    'Control-seeking is the nervous system\'s attempt to regulate a threat that may no longer exist.',
    'What you call controlling is the adult managing what the child could not.',
    'The illusion of control is costly, and it made sense when the alternative was overwhelm.',
    'Letting go feels dangerous because it once was. The nervous system is outdated, not wrong.',
  ],
  abandonment: [
    'The fear of being left is not irrational. It is the body remembering when being left actually meant you were not safe.',
    'Abandonment terror is the echo of a time when proximity equaled survival.',
    'What feels like irrational clinginess is the adaptive response to early relational loss.',
    'The expectation that people leave is a pattern formed in real loss, not paranoia.',
    'What you call fear of abandonment is the nervous system bracing based on stored memory.',
    'The impulse to withdraw first is protection against the pain of being left second.',
    'Abandonment wounds are not healed by avoidance but by new experiences of staying.',
    'The fear is real. And the original danger is often past.',
  ],
  perfectionism: [
    'Perfectionism is not excellence. It is the armor worn when being seen felt dangerous.',
    'The pursuit of flawless is the nervous system avoiding the vulnerability of being judged.',
    'What feels like high standards is often the internalized voice of conditional acceptance.',
    'Perfectionism is the strategy of a child who learned that error brings rejection.',
    'The relentless refining is not ambition. It is protection from exposure.',
    'What you call perfectionism is the adult trying to earn what should have been given freely.',
    'Mistakes feel catastrophic because they once brought consequences too big for a child.',
    'Good enough is not mediocrity. It is the wisdom that flawless is a prison.',
  ],
  victimhood: [
    'Powerlessness is sometimes an accurate assessment of past reality that has outlived its accuracy.',
    'What feels like victimhood is often the nervous system stuck in a time when agency was truly unavailable.',
    'The narrative of being done-to can be both true about the past and limiting in the present.',
    'Learned helplessness is real. And learning can be updated.',
    'What you call victimhood may be the unprocessed residue of real trauma.',
    'Agency was not always available. It is now. The system lags behind reality.',
    'Powerlessness was a fact. It does not have to remain the framework.',
    'The belief that you have no influence is outdated data, not current truth.',
  ],
  'emotional-suppression': [
    'Emotional suppression is not strength. It is what you learned to do when feeling met danger.',
    'The shutdown is the nervous system\'s protection from overwhelm that was once real.',
    'What feels like control is actually the accumulated cost of not releasing.',
    'Suppression made sense when expression brought punishment or neglect.',
    'The body holds what the mind will not feel. The cost is carried in the soma.',
    'What you call emotional control is the legacy of an environment that could not hold your feelings.',
    'Feelings are not the enemy. The nervous system learned they were.',
    'The thaw is possible. And it begins with recognizing the freeze.',
  ],
  'people-pleasing': [
    'People-pleasing is not kindness. It is the strategy learned when your no brought consequences.',
    'Accommodation is the nervous system\'s adaptation to a time when boundaries felt dangerous.',
    'What feels like generosity is often the abandonment of self for the approval of other.',
    'Saying yes to everyone is saying no to yourself. The nervous system learned this trade.',
    'The impulse to please is not selflessness. It is the child trying to earn safety.',
    'What you call kindness may be the cost of never having had the right to refuse.',
    'Boundaries are not selfish. They are the structure that makes real connection possible.',
    'The yes that exhausts you is the no you are not allowing yourself.',
  ],
  scarcity: [
    'Scarcity is not always a material reality. It is often a nervous system state formed in real lack.',
    'The belief in not-enough can persist long after enough arrives.',
    'What feels like prudent protection may be the grip of a past that no longer exists.',
    'Scarcity thinking is the legacy of a time when resources were genuinely limited.',
    'The nervous system that learned to hoard does not automatically recognize abundance.',
    'What you call scarcity is often the body bracing against a deprivation that ended.',
    'Generosity feels risky when the memory of not-enough is stored in the body.',
    'Enough is a nervous system recalibration, not just a cognitive shift.',
  ],
  comparison: [
    'Comparison is not vanity. It is the mechanism learned when worth felt conditional and relative.',
    'The habit of measuring yourself against others is the child trying to locate safety in hierarchy.',
    'What feels like competition is the nervous system trying to determine belonging.',
    'Comparison is the strategy learned when value was assigned, not inherent.',
    'The measuring stick is external because it was never internalized.',
    'What you call comparison is the search for enough-ness outside yourself.',
    'Worth is intrinsic. The nervous system learned otherwise.',
    'The race you are running is against an internalized other, not a real competitor.',
  ],
  catastrophizing: [
    'Catastrophizing is not pessimism. It is the nervous system trying to prevent past pain.',
    'Worst-case thinking is the legacy of being blindsided by trauma.',
    'What feels like realism is often hypervigilance to threat that may not be imminent.',
    'The mind that predicts disaster is trying to brace against shock.',
    'Catastrophizing is the adult trying to protect the child who was once unprotected.',
    'What you call anxiety is the nervous system scanning for danger based on old data.',
    'The spiral into worst outcomes is the attempt to control the uncontrollable.',
    'Presence is the antidote to catastrophe. The body just does not believe it yet.',
  ],
  'identity-fusion': [
    'Identity-fusion is not ambition. It is what happens when being was not enough.',
    'The conflation of self and role is the legacy of conditional worth.',
    'What feels like drive is often the compulsion to justify existence through production.',
    'You are not what you do. The nervous system learned otherwise.',
    'The belief that you are your achievements is the child trying to earn the right to exist.',
    'What you call identity is often a collection of roles worn for survival.',
    'Resting feels like annihilation when doing is how you prove worth.',
    'The vastness of who you are cannot be captured in titles or achievements.',
  ],
  'safety-seeking': [
    'Safety-seeking is not cowardice. It is the nervous system responding to a threat that may have ended.',
    'The need for certainty is the legacy of a time when the world was truly unpredictable and dangerous.',
    'What feels like prudence may be the constriction born from past overwhelm.',
    'Risk-avoidance made sense when risk brought real harm.',
    'The window of tolerance is often narrower than necessary. It was set in an earlier time.',
    'What you call safety-seeking is the nervous system stuck in outdated threat detection.',
    'Grounded and guarded are different. One breathes. One braces.',
    'True safety is internal regulation, not external control.',
  ],
};

// CURVEBALLS - Behavioral experiments
const CURVEBALL_ARSENAL = {
  shame: [
    'Take up space today. Physically, energetically, vocally. Notice the resistance and do it anyway.',
    'Ask for what you want without preamble, justification, or apology.',
    'Receive a compliment with only two words: Thank you. Watch the urge to deflect.',
    'Share something imperfect. A typo, a messy room, a half-formed thought. See who stays.',
    'Speak your need out loud without explaining why it matters or why you deserve it.',
    'Exist visibly for ten minutes without producing anything. Just be. Notice the discomfort.',
    'Tell someone you matter. Say it out loud. Feel the confrontation with shame.',
    'Stop apologizing for existing. Count how many times you say sorry today, then halve it tomorrow.',
  ],
  control: [
    'Surrender one decision completely. Let someone else choose. Do not manage the outcome.',
    'Leave something undone. On purpose. Observe the anxiety and let it move through.',
    'Say I don\'t know three times today without following it with I\'ll find out.',
    'Ask for help before you actually need it. Practice receiving without reciprocating.',
    'Let a plan change without intervening. Watch the urge to fix and do nothing.',
    'Release your grip on one thing you are managing. See what happens without your orchestration.',
    'Tolerate uncertainty for five minutes. Set a timer. Breathe. Do not resolve it.',
    'Let someone else be in charge. Fully. Notice the loss of control and stay.',
  ],
  abandonment: [
    'Reach out first. Do not wait to be chosen. Be the one who initiates contact.',
    'Tell someone you miss them before they say it. Risk being the one who cares more.',
    'Stay five minutes longer in a conversation than your body wants to. Practice not fleeing.',
    'Share a fear with someone safe. Not a fact. A fear. See if they can hold it.',
    'Ask for reassurance directly. Do not hint. Do not test. Just ask.',
    'Show up consistently for one week. Do not disappear. Notice the pattern breaking.',
    'Trust one person with one vulnerable thing. Observe the impulse to withdraw and resist it.',
    'Let someone in. Not all the way. Just one step closer. See if they stay.',
  ],
  perfectionism: [
    'Submit something before it is perfect. Hit send while it is still good enough.',
    'Make one intentional mistake today. Leave a typo. Skip the polish. Survive it.',
    'Do something poorly on purpose. Cook badly. Draw badly. Be gloriously mediocre.',
    'Set a timer for ten minutes. Do the thing. Stop when it ends. Done is the goal.',
    'Share unfinished work. Show the draft. Let someone see the mess.',
    'Lower the standard. From A to B. From flawless to functional. Notice the relief.',
    'Complete something without reviewing it. One and done. Feel the resistance.',
    'Celebrate good enough. Out loud. This is good enough. Mean it.',
  ],
  victimhood: [
    'Make one decision today without asking permission or seeking input. Own it.',
    'Say no to something you usually tolerate. Reclaim the boundary. Feel the power.',
    'Take credit for something good. Do not minimize. Do not deflect. Own it.',
    'Change one small thing in your environment. Move a chair. Rearrange. Notice your agency.',
    'Identify one thing you can influence and act on it. However small.',
    'Choose how you respond to one thing today. Own the choice.',
    'Stop waiting for someone to fix it. Fix one small thing yourself.',
    'Say This is my choice and I am making it. Out loud. Feel the shift.',
  ],
  'emotional-suppression': [
    'Feel one emotion fully for 90 seconds. Set a timer. Do not suppress. Do not perform.',
    'Name your feeling out loud. I feel [emotion]. Do not explain. Just name.',
    'Let yourself cry if tears come. Do not stop them. Let the release happen.',
    'Tell someone how you actually feel. Not fine. Not okay. The truth.',
    'Notice where emotion lives in your body. Throat, chest, gut. Place your hand there.',
    'Say I am angry or I am sad without softening it. Feel the rawness.',
    'Express one feeling through movement. Shake, stretch, stomp. Let the body speak.',
    'Write what you feel without editing. Stream of consciousness. Two minutes. Do not censor.',
  ],
  'people-pleasing': [
    'Say no to one request today. No explanation. No justification. Just no.',
    'Disappoint someone small. Skip the optional thing. Observe that you both survive.',
    'Share an opinion someone might disagree with. See if the relationship holds.',
    'Do something you want instead of what they need. Choose yourself for once.',
    'Stop over-explaining. Say it once and stop. Notice the urge to justify.',
    'Let someone be disappointed in you. Do not fix it. Let it exist.',
    'Ask for what you need without considering their convenience first.',
    'Cancel plans if you need to. Without elaborate apology. Practice the boundary.',
  ],
  scarcity: [
    'Give something away today. Money, time, food, attention. Practice generosity.',
    'Spend on something you want but do not need. Notice the guilt and do it anyway.',
    'Share your resources. Lend the book. Give the referral. Open the hand.',
    'Say yes to abundance. Order the thing. Take the opportunity. Expand.',
    'Let go of something you are hoarding. Clear the clutter. Release the grip.',
    'Tip generously. Notice the fear of not having enough and tip anyway.',
    'Trust that more is coming. Act as if there is enough. See what shifts.',
    'Practice the phrase There is enough. Say it five times. Mean it.',
  ],
  comparison: [
    'Celebrate someone else\'s success without measuring yourself against it.',
    'Notice the comparison thought and choose a different thought. Practice the redirect.',
    'Stay off social media for 24 hours. Observe the relief from constant measuring.',
    'Compliment someone without self-deprecation. Pure celebration. No caveat.',
    'Focus on your own lane for one day. No looking left or right. Just your path.',
    'Say I am enough without adding I am not as [X] as [person]. Just I am enough.',
    'Unfollow one account that triggers comparison. Notice the space it creates.',
    'List three things you have that are not measurable. Qualities, not quantities.',
  ],
  catastrophizing: [
    'Notice the catastrophe spiral and name it. This is catastrophizing. Not reality.',
    'Plan for probable instead of worst-case. What is likely? Act from there.',
    'Stay in the present for five minutes. What is actually happening right now?',
    'When the what-if begins, counter with what is. Ground in current reality.',
    'Set a worry window. Ten minutes to catastrophize. Then stop. Move on.',
    'Ask What is the evidence? Challenge the disaster narrative.',
    'Identify one thing that is okay right now. Then another. Build the list.',
    'Say out loud The worst is not happening right now. Repeat until the body hears it.',
  ],
  'identity-fusion': [
    'Spend one hour not producing anything. Just be. Notice the discomfort.',
    'Introduce yourself without mentioning what you do. Who are you beyond that?',
    'Rest without earning it. Take a break before you deserve it.',
    'Do something that has no achievement attached. Play. Wander. Exist.',
    'Say I am worthy without listing accomplishments. I am. Full stop.',
    'Fail at something small. Notice that you still exist.',
    'Separate being from doing. You are. Whether you do or not.',
    'Ask Who am I without my roles? Sit with the question. Do not rush the answer.',
  ],
  'safety-seeking': [
    'Try one small uncertain thing today. Order the unfamiliar dish. Take the new route.',
    'Expand your window of tolerance by 1%. Stay in discomfort ten seconds longer.',
    'Say yes to one thing that feels slightly risky. Manageable risk. Tolerable risk.',
    'Let go of one safety behavior. Do not check twice. Do not over-prepare.',
    'Ask What is the actual risk? versus What does my nervous system believe?',
    'Step to the edge of your comfort zone. Not over it. Just to the edge.',
    'Practice the phrase I can handle this. Say it before you believe it.',
    'Trust one thing to unfold without your constant vigilance. Observe.',
  ],
};

// PRACTICE ARSENAL - Embodied regulation techniques
const PRACTICE_ARSENAL = {
  shame: [
    'Place both hands on your heart. Say aloud: I am worthy exactly as I am. Repeat until breath softens.',
    'Mirror work: Look yourself in the eyes for 60 seconds. Stay. Do not look away. You are safe here.',
    'Body scan: Where does shame live? Throat? Chest? Belly? Place your hand there and breathe.',
    'Mantra practice: I belong. I am enough. I am not too much. Say it 10 times.',
    'Grounding: Name five things you can see. Four you can touch. Three you can hear. Two you can smell. One you can taste.',
    'Self-touch: Gentle hand on your own shoulder. The gesture of I am here for you.',
    'Compassionate letter: Write to yourself as you would to a dear friend carrying shame.',
    'Unworthiness release: Inhale I am whole. Exhale I release shame. Ten rounds.',
  ],
  control: [
    'Box breathing: Inhale 4 counts. Hold 4. Exhale 4. Hold 4. Release control with each exhale.',
    'Progressive muscle release: Clench fists tight. Hold. Release. Notice the grip and the letting go.',
    'Surrender practice: Place one thing you are trying to control on the ground. Physically. Step back.',
    'Uncertainty tolerance: Set timer for 3 minutes. Sit with I do not know. Breathe.',
    'Hand release: Open and close fists slowly. Grip. Release. Grip. Release. Feel the metaphor.',
    'Mantra: I influence, I do not control. Repeat while releasing shoulders from ears.',
    'Trust fall: Lean against a wall. Let it hold you. Practice being held.',
    'Chaos tolerance: Put on music and free move for 2 minutes. No choreography. No control.',
  ],
  abandonment: [
    'Grounding in connection: Text someone I am thinking of you. Send without expecting response.',
    'Self-soothing: Wrap arms around yourself. Rock gently. You are not alone.',
    'Presence practice: I am here. I am not leaving. Say it to yourself 10 times.',
    'Timeline: Imagine past-you, present-you, future-you. They are all here. All staying.',
    'Breathwork: Inhale I am safe. Exhale I am held. Notice where you feel it.',
    'Reach out: Send one vulnerable message to someone safe. Practice being seen.',
    'Internal re-parenting: What does the part that fears abandonment need to hear? Say it.',
    'Mantra: People can stay. I can stay. We can both stay. Repeat until it softens.',
  ],
  perfectionism: [
    'Imperfection exposure: Do one thing badly. Misspell. Create mess. Survive.',
    'Good enough practice: Complete one task at 80%. Stop. Walk away. It is done.',
    'Timed work: Set 10-minute timer. Create. Stop when it rings. Done is the only standard.',
    'Error celebration: Make a mistake on purpose. Observe that you are still whole.',
    'Mantra: I am worthy in my imperfection. Say it while looking at something unfinished.',
    'Breathwork: Inhale I am enough. Exhale I release perfect. Feel the softening.',
    'Comparison release: Name three things you love that are imperfect. Kintsugi. Wabi-sabi.',
    'Completion practice: Finish something without reviewing. Submit. Post. Send. Breathe.',
  ],
  victimhood: [
    'Agency activation: Make one choice right now. Stand. Sit. Move. Own it.',
    'Power pose: Stand tall for 2 minutes. Arms up or wide. Feel the shift in nervous system.',
    'Influence inventory: List five things you can influence today. However small.',
    'Decision practice: Choose something without input. Own the choice. Notice the power.',
    'Mantra: I am responsible. I have agency. I choose. Repeat while grounding feet.',
    'Boundary setting: Say no out loud. Practice the shape of it in your mouth.',
    'Cause and effect: Name one choice you made that led to one outcome. Own the link.',
    'Reclamation: Rearrange one thing in your space. Notice your ability to shape environment.',
  ],
  'emotional-suppression': [
    'Emotional release: Set 90-second timer. Feel the feeling fully. No suppression. No performance.',
    'Somatic tracking: Where is the emotion in your body? Name it. Breathe into it.',
    'Vocal release: Hum, sigh, groan. Let the sound carry the emotion out.',
    'Journaling: Write I feel [emotion] because. Stream for 5 minutes. No editing.',
    'Permission: I give myself permission to feel. Say it out loud. Notice the resistance.',
    'Cry practice: If tears come, let them. Time yourself. See how long emotions actually last.',
    'Naming: I am angry. I am sad. I am scared. Say the truth without softening.',
    'Breathwork: Inhale into the feeling. Exhale the suppression. Feel what remains.',
  ],
  'people-pleasing': [
    'No practice: Say no out loud to your reflection. No explanation. Feel the shape of it.',
    'Boundary breathwork: Inhale my needs matter. Exhale I can disappoint others.',
    'Prioritization: List your need. List their need. Choose yours. Once.',
    'Mantra: I am allowed to choose myself. Repeat until the guilt softens.',
    'Cancel without apology: If you need to cancel, do it. Notice the urge to over-explain. Resist.',
    'Opinion sharing: State a preference without checking if they agree. Notice the discomfort.',
    'Self-attunement: Ask what do I need right now? Listen. Act on it.',
    'Receiving practice: Accept help without reciprocating immediately. Just receive.',
  ],
  scarcity: [
    'Generosity practice: Give something away. Money, time, object. Notice the grip releasing.',
    'Abundance breathwork: Inhale there is enough. Exhale I am enough.',
    'Gratitude inventory: List ten things you have right now. Feel the fullness.',
    'Spending experiment: Buy something you want but do not need. Observe the guilt. Do it anyway.',
    'Open hand practice: Sit with palms up. Physically open. Receive the metaphor.',
    'Mantra: More is coming. There is enough. I am enough. Repeat while releasing jaw.',
    'Letting go: Release something you are hoarding. Clothes, food, information. Notice the space.',
    'Trust building: Act as if abundance is real. Take the opportunity. Order the thing.',
  ],
  comparison: [
    'Celebration practice: Celebrate someone else\'s win. Fully. Notice the resistance.',
    'Self-focus: For one hour, no social media. No measuring. Just your life.',
    'Enough-ness affirmation: I am enough without comparison. Say it 20 times.',
    'Compliment without caveat: Praise someone without self-deprecation. Pure celebration.',
    'Measurement release: Notice the comparison thought. Name it. Let it go.',
    'Intrinsic worth: List five qualities you have that are not measurable.',
    'Mantra: My worth is inherent. Not relative. Repeat while grounding.',
    'Unfollow: Remove one source of comparison from your feed. Feel the relief.',
  ],
  catastrophizing: [
    'Grounding in present: What is happening right now? List only facts. No projections.',
    'Probability check: What is likely? versus What am I imagining? Write both.',
    'Worry window: Ten minutes to spiral. Set timer. When it ends, stop. Move on.',
    'Mantra: The worst is not happening now. Repeat while placing hand on heart.',
    'Evidence gathering: What is the proof of disaster? versus What is the proof of okay?',
    'Breathwork: Inhale I am here now. Exhale The future is not real yet.',
    'Containment: Write the catastrophe. Then close the book. Literally.',
    'Counter-narrative: For every what-if-bad, generate what-if-good. Balance the story.',
  ],
  'identity-fusion': [
    'Being practice: Sit for 5 minutes without doing anything. Just be. Notice the discomfort.',
    'Role removal: Introduce yourself without titles. Who are you beneath the labels?',
    'Rest without earning: Take a break before you deserve it. Notice the resistance.',
    'Mantra: I am worthy of existence without production. Repeat until it softens.',
    'Failure exposure: Fail at something small. Notice you still exist.',
    'Essence inquiry: Who am I without my achievements? Sit with the question.',
    'Play practice: Do something with no goal. Dance. Doodle. Wander. Just for the doing.',
    'Separation: I am not my job. I am not my role. I am. Practice the distinction.',
  ],
  'safety-seeking': [
    'Risk tolerance: Do one small uncertain thing. Notice you survive it.',
    'Window expansion: Stay in discomfort 10 seconds longer. Breathe. Tolerate.',
    'Grounding in resilience: List three hard things you have survived. You are capable.',
    'Mantra: I can handle uncertainty. Repeat before believing it.',
    'Comfort edge: Step to the boundary of comfort. Not over. Just to the edge.',
    'Safety behavior release: Skip one checking behavior. Notice the anxiety. Let it pass.',
    'Trust practice: Let one thing unfold without vigilance. Observe the outcome.',
    'Breathwork: Inhale I am safe enough. Exhale I do not need guaranteed.',
  ],
};

// ============================================================================
// GENERATE ALL 1000 NAVICUES (nc.1001 - nc.2000)
// ============================================================================

export const NAVICUE_2000_ARSENAL: NaviCue[] = [];

// DISTRIBUTION:
// - 125 Statement Mirrors (nc.1001-1125)
// - 125 Belief Probes (nc.1126-1250)
// - 125 Identity Koans (nc.1251-1375)
// - 125 Paradox Prompts (nc.1376-1500)
// - 125 Story Shards (nc.1501-1625)
// - 125 Reframe Seeds (nc.1626-1750)
// - 125 Curveballs (nc.1751-1875)
// - 125 Practices (nc.1876-2000)

let currentId = 1001;

// STATEMENT MIRRORS (1001-1125)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 10 === 7 ? 'guru' : i % 10 === 8 ? 'infinite' : 'clinical';
  const templates = MIRROR_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Mirror: ${schema} ${currentId}`,
    family: 'statement_mirror',
    modality: i % 5 === 0 ? 'audio' : i % 5 === 1 ? 'soundbite' : i % 5 === 2 ? 'video' : i % 5 === 3 ? 'interactive' : 'text',
    response_type: i % 7 === 0 ? 'breath' : i % 7 === 1 ? 'body_map' : i % 7 === 2 ? 'dial' : i % 7 === 3 ? 'slider' : i % 7 === 4 ? 'witness' : i % 7 === 5 ? 'hold' : 'tap',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 3 + (i % 5),
    duration_minutes: 2 + (i % 3),
    tags: ['statement_mirror', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// BELIEF PROBES (1126-1250)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 10 === 7 ? 'guru' : i % 10 === 8 ? 'infinite' : 'clinical';
  const templates = PROBE_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Probe: ${schema} ${currentId}`,
    family: 'belief_probe',
    modality: i % 4 === 0 ? 'audio' : i % 4 === 1 ? 'soundbite' : i % 4 === 2 ? 'interactive' : 'text',
    response_type: i % 6 === 0 ? 'voice10' : i % 6 === 1 ? 'voice' : i % 6 === 2 ? 'binary' : i % 6 === 3 ? 'one_word' : i % 6 === 4 ? 'slider' : 'tap',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 4 + (i % 4),
    duration_minutes: 3 + (i % 2),
    tags: ['belief_probe', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// IDENTITY KOANS (1251-1375)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 2 === 0 ? 'believing' : 'embodying'; // Koans are deeper work
  const track = i % 3 === 0 ? 'infinite' : i % 3 === 1 ? 'guru' : 'clinical';
  const templates = KOAN_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Koan: ${schema} ${currentId}`,
    family: 'identity_koan',
    modality: i % 3 === 0 ? 'audio' : i % 3 === 1 ? 'video' : 'text',
    response_type: i % 4 === 0 ? 'hold' : i % 4 === 1 ? 'breath' : i % 4 === 2 ? 'witness' : 'echo',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 7 + (i % 3),
    duration_minutes: 5 + (i % 2),
    tags: ['identity_koan', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// PARADOX PROMPTS (1376-1500)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 4 === 0 ? 'guru' : i % 4 === 1 ? 'infinite' : 'clinical';
  const templates = PARADOX_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Paradox: ${schema} ${currentId}`,
    family: 'paradox_prompt',
    modality: i % 5 === 0 ? 'audio' : i % 5 === 1 ? 'video' : i % 5 === 2 ? 'soundbite' : i % 5 === 3 ? 'interactive' : 'text',
    response_type: i % 5 === 0 ? 'paradox' : i % 5 === 1 ? 'spectrum' : i % 5 === 2 ? 'echo' : i % 5 === 3 ? 'witness' : 'hold',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 6 + (i % 3),
    duration_minutes: 3 + (i % 2),
    tags: ['paradox_prompt', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// STORY SHARDS (1501-1625)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 10 === 8 ? 'guru' : 'clinical';
  const templates = STORY_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Story: ${schema} ${currentId}`,
    family: 'story_shard',
    modality: i % 4 === 0 ? 'interactive' : i % 4 === 1 ? 'soundbite' : i % 4 === 2 ? 'audio' : 'text',
    response_type: i % 5 === 0 ? 'timeline' : i % 5 === 1 ? 'constellation' : i % 5 === 2 ? 'voice' : i % 5 === 3 ? 'voice10' : 'witness',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 5 + (i % 4),
    duration_minutes: 4 + (i % 3),
    tags: ['story_shard', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// REFRAME SEEDS (1626-1750)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 10 === 7 ? 'guru' : 'clinical';
  const templates = REFRAME_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Reframe: ${schema} ${currentId}`,
    family: 'reframe_seed',
    modality: i % 5 === 0 ? 'audio' : i % 5 === 1 ? 'video' : i % 5 === 2 ? 'soundbite' : i % 5 === 3 ? 'interactive' : 'text',
    response_type: i % 5 === 0 ? 'breath' : i % 5 === 1 ? 'witness' : i % 5 === 2 ? 'hold' : i % 5 === 3 ? 'echo' : 'tap',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 4 + (i % 4),
    duration_minutes: 2 + (i % 2),
    tags: ['reframe_seed', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// CURVEBALLS (1751-1875)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 2 === 0 ? 'embodying' : 'believing'; // Curveballs are action-oriented
  const track = i % 4 === 0 ? 'infinite' : i % 4 === 1 ? 'guru' : 'clinical';
  const templates = CURVEBALL_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Curveball: ${schema} ${currentId}`,
    family: 'curveball',
    modality: i % 4 === 0 ? 'interactive' : i % 4 === 1 ? 'audio' : i % 4 === 2 ? 'video' : 'text',
    response_type: i % 3 === 0 ? 'curveball' : i % 3 === 1 ? 'binary' : 'tap',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 6 + (i % 3),
    duration_minutes: 2 + (i % 2),
    is_curveball: true,
    tags: ['curveball', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// PRACTICES (1876-2000)
for (let i = 0; i < 125; i++) {
  const schema = schemas[i % schemas.length];
  const pillar = pillars[i % pillars.length];
  const pillarData = PILLARS[pillar];
  const kbeTarget = i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying';
  const track = i % 10 === 8 ? 'infinite' : i % 10 === 9 ? 'guru' : 'clinical';
  const templates = PRACTICE_ARSENAL[schema];
  const textLine = templates[i % templates.length];
  
  NAVICUE_2000_ARSENAL.push({
    id: `nc.${String(currentId).padStart(4, '0')}`,
    name: `Practice: ${schema} ${currentId}`,
    family: 'practice',
    modality: i % 4 === 0 ? 'audio' : i % 4 === 1 ? 'interactive' : i % 4 === 2 ? 'video' : 'text',
    response_type: i % 7 === 0 ? 'breath' : i % 7 === 1 ? 'voice' : i % 7 === 2 ? 'body_map' : i % 7 === 3 ? 'mirror' : i % 7 === 4 ? 'hold' : i % 7 === 5 ? 'witness' : 'tap',
    text_line: textLine,
    pillar_id: pillar,
    pillar_name: pillarData.name,
    pillar_color: pillarData.color,
    schema: schema,
    schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    core_belief: SCHEMA_MAP[schema],
    kbe_target: kbeTarget,
    track: track,
    difficulty_level: 3 + (i % 5),
    duration_minutes: 2 + (i % 4),
    tags: ['practice', schema, pillar, kbeTarget, `arsenal-2000`],
  });
  currentId++;
}

// ============================================================================
// STATISTICS & VALIDATION
// ============================================================================

export function getArsenal2000Stats() {
  const stats = {
    total: NAVICUE_2000_ARSENAL.length,
    byFamily: {} as Record<string, number>,
    byPillar: {} as Record<string, number>,
    bySchema: {} as Record<string, number>,
    byModality: {} as Record<string, number>,
    byResponseType: {} as Record<string, number>,
    byTrack: {} as Record<string, number>,
    byKBE: {} as Record<string, number>,
  };

  NAVICUE_2000_ARSENAL.forEach(nc => {
    stats.byFamily[nc.family] = (stats.byFamily[nc.family] || 0) + 1;
    stats.byPillar[nc.pillar_id] = (stats.byPillar[nc.pillar_id] || 0) + 1;
    stats.bySchema[nc.schema || 'none'] = (stats.bySchema[nc.schema || 'none'] || 0) + 1;
    stats.byModality[nc.modality] = (stats.byModality[nc.modality] || 0) + 1;
    stats.byResponseType[nc.response_type] = (stats.byResponseType[nc.response_type] || 0) + 1;
    stats.byTrack[nc.track || 'clinical'] = (stats.byTrack[nc.track || 'clinical'] || 0) + 1;
    stats.byKBE[nc.kbe_target] = (stats.byKBE[nc.kbe_target] || 0) + 1;
  });

  return stats;
}

console.log('✅ NAVICUE 2000 ARSENAL - Generated Successfully');
console.log('📊 Total NaviCues:', NAVICUE_2000_ARSENAL.length);
console.log('🎯 Strategic Arsenal for Know → Believe → Embody transformation');
console.log('🧬 12 Schemas × 6 Pillars × 8 Families = Complete therapeutic coverage');
console.log('🔄 Algorithmic rotation ready for testing, measuring, fine-tuning');

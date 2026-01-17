/**
 * NAVICUE PLAYGROUND
 * 
 * Preview + test generated NaviCues before database import
 * 
 * Features:
 * - Load JSON from batch generator
 * - Filter by KBE, tier, schema, component_type
 * - Simulate user state (heat/fusion/resistance/choice)
 * - Render through Universal Player
 * - Capture responses
 * - Export QA notes
 */

import { useState } from 'react';
import { Upload, Filter, Play, Download, Sliders } from 'lucide-react';
import { GeneratedNavicue, StateSnapshot, NavicuePlayerDTO, ComponentType, Tier, CouncilLens, KbeLayer } from '../../../types/navicue-contract';
import { UniversalPlayer } from '../../navicues/UniversalPlayer';
import { NAVICUE_200_BATTALION } from '../../../lib/navicues/NAVICUE_200_BATTALION';

interface NaviCuePlaygroundProps {
  onClose: () => void;
}

export function NaviCuePlayground({ onClose }: NaviCuePlaygroundProps) {
  const [uploadedCues, setUploadedCues] = useState<GeneratedNavicue[]>([]);
  const [filteredCues, setFilteredCues] = useState<GeneratedNavicue[]>([]);
  const [selectedCue, setSelectedCue] = useState<GeneratedNavicue | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playAllMode, setPlayAllMode] = useState(false);
  
  const [filters, setFilters] = useState({
    kbe: 'all',
    tier: 'all',
    component: 'all',
    schema: 'all',
  });
  
  const [userState, setUserState] = useState<StateSnapshot>({
    heat: 5,
    fusion: 5,
    resistance: 5,
    choice_access: 5,
  });
  
  const applyFilters = () => {
    let filtered = uploadedCues;
    
    if (filters.kbe !== 'all') {
      filtered = filtered.filter(c => c.kbe_layer === filters.kbe);
    }
    if (filters.tier !== 'all') {
      filtered = filtered.filter(c => c.tier === filters.tier);
    }
    if (filters.component !== 'all') {
      filtered = filtered.filter(c => c.component_type === filters.component);
    }
    if (filters.schema !== 'all') {
      filtered = filtered.filter(c => 
        c.targets.some(t => t.schema_id === filters.schema)
      );
    }
    
    setFilteredCues(filtered);
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const cues = json.navicues || json;
        
        if (Array.isArray(cues)) {
          setUploadedCues(cues);
          setFilteredCues(cues);
          console.log(`Loaded ${cues.length} NaviCues`);
        } else {
          alert('Invalid JSON format. Expected array of NaviCues.');
        }
      } catch (error) {
        alert('Failed to parse JSON file.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  
  const handlePlayAll = () => {
    console.log('🎮 Play All button clicked!');
    
    // Create one REAL cue of each component type with actual therapeutic copy
    const playAllCues: GeneratedNavicue[] = [
      // 1. PRACTICE
      {
        code: 'play-all-01',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'practice',
        component_type: 'practice' as ComponentType,
        default_response_type: 'slider_0_10',
        intent: 'Grounding breath practice',
        variants: [{
          lens: 'alan_watts' as CouncilLens,
          copy: {
            headline: 'Five Breaths Home',
            body: 'Sometimes the shortest distance to sanity is through your own lungs. This is not meditation. This is triage.',
            prompt: 'Breathe in slowly through your nose for 4 counts.\n\nHold for 4 counts.\n\nBreathe out through your mouth for 6 counts.\n\nRepeat 5 times.\n\nNotice what changes.',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'emotional_deprivation', weight: 1.0, is_primary: true }],
        tags: ['grounding', 'breath', 'immediate'],
        config: {},
        analytics_config: {},
      },
      // 2. BELIEF PROBE
      {
        code: 'play-all-02',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'belief_probe',
        component_type: 'belief_probe' as ComponentType,
        default_response_type: 'binary',
        intent: 'Surface worthiness belief',
        variants: [{
          lens: 'gabor_mate' as CouncilLens,
          copy: {
            headline: 'Belief Check',
            body: 'The beliefs we carry about ourselves are often not our own. They were handed down like heirlooms we never asked for.',
            prompt: 'I need to earn my right to take up space',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'defectiveness', weight: 1.0, is_primary: true }],
        tags: ['belief', 'core-wound'],
        config: {},
        analytics_config: {},
      },
      // 3. STATEMENT MIRROR
      {
        code: 'play-all-03',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'statement_mirror',
        component_type: 'statement_mirror' as ComponentType,
        default_response_type: 'choice_single',
        intent: 'Reflect pattern back',
        variants: [{
          lens: 'therapist' as CouncilLens,
          copy: {
            headline: 'I heard you say',
            body: 'When people get close, I find ways to push them away before they can leave first',
            prompt: 'Does this land?',
            options: ['Yes, exactly this', 'Close but not quite', 'Not what I meant', 'Need to think about it'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'abandonment', weight: 1.0, is_primary: true }],
        tags: ['mirror', 'recognition'],
        config: {},
        analytics_config: {},
      },
      // 4. REFRAME SEED
      {
        code: 'play-all-04',
        kbe_layer: 'B' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'reframe_seed',
        component_type: 'reframe_seed' as ComponentType,
        default_response_type: 'rank_3',
        intent: 'Plant alternative perspective',
        variants: [{
          lens: 'ram_dass' as CouncilLens,
          copy: {
            headline: 'Three Ways to Look at This',
            body: 'Your perfectionism is not a character flaw. It is an adaptation. Let us explore what it adapted you for.',
            prompt: 'Rank these reframes by how much they resonate (1=most, 3=least)',
            options: [
              'Perfectionism protected me when approval was survival',
              'Perfectionism gave me control when everything felt chaotic',
              'Perfectionism helped me avoid the shame of being seen as flawed'
            ],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'unrelenting_standards', weight: 1.0, is_primary: true }],
        tags: ['reframe', 'perfectionism'],
        config: {},
        analytics_config: {},
      },
      // 5. IDENTITY KOAN
      {
        code: 'play-all-05',
        kbe_layer: 'B' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'identity_koan',
        component_type: 'identity_koan' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Paradoxical self inquiry',
        variants: [{
          lens: 'alan_watts' as CouncilLens,
          copy: {
            headline: 'A Question With No Answer',
            body: 'Who were you before you learned to be acceptable?',
            prompt: 'Let whatever arises come through your fingertips...',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'subjugation', weight: 1.0, is_primary: true }],
        tags: ['koan', 'identity', 'deep'],
        config: {},
        analytics_config: {},
      },
      // 6. PARADOX PROMPT
      {
        code: 'play-all-06',
        kbe_layer: 'B' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'paradox_prompt',
        component_type: 'paradox_prompt' as ComponentType,
        default_response_type: 'choice_multi',
        intent: 'Hold contradictory truths',
        variants: [{
          lens: 'david_hawkins' as CouncilLens,
          copy: {
            headline: 'Both Are True',
            body: 'Recovery is not about choosing between opposites. It is about learning to hold contradiction without collapsing.',
            prompt: 'Which of these paradoxes are alive in you right now?',
            options: [
              'I am terrified of being alone AND terrified of being known',
              'I desperately want help AND refuse to ask for it',
              'I am doing my best AND my best is not enough',
              'I need to change everything AND I am already whole'
            ],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'enmeshment', weight: 1.0, is_primary: true }],
        tags: ['paradox', 'integration'],
        config: {},
        analytics_config: {},
      },
      // 7. STORY SHARD
      {
        code: 'play-all-07',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'story_shard',
        component_type: 'story_shard' as ComponentType,
        default_response_type: 'slider_0_10',
        intent: 'Recognition through narrative',
        variants: [{
          lens: 'bill_wilson' as CouncilLens,
          copy: {
            headline: 'Someone You Know',
            body: 'She kept a list of things she would do when she felt better. The list got longer. She got smaller. One day she realized the list was a hiding place.',
            prompt: 'How much does this resonate?',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'failure', weight: 1.0, is_primary: true }],
        tags: ['story', 'recognition'],
        config: {},
        analytics_config: {},
      },
      // 8. CURVEBALL
      {
        code: 'play-all-08',
        kbe_layer: 'E' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'curveball',
        component_type: 'curveball' as ComponentType,
        default_response_type: 'text_1line',
        intent: 'Pattern interrupt',
        variants: [{
          lens: 'therapist' as CouncilLens,
          copy: {
            headline: 'Quick One',
            body: 'What if your resistance is actually protection trying to do its job?',
            prompt: 'First thought:',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'mistrust', weight: 1.0, is_primary: true }],
        tags: ['interrupt', 'quick'],
        config: {},
        analytics_config: {},
      },
      // 9. GRIP SCAN
      {
        code: 'play-all-09',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'grip_scan',
        component_type: 'grip_scan' as ComponentType,
        default_response_type: 'choice_multi',
        intent: 'Somatic awareness check',
        variants: [{
          lens: 'gabor_mate' as CouncilLens,
          copy: {
            headline: 'Where Are You Holding?',
            body: 'The body keeps the score. It also keeps the receipts. Let us do a quick inventory.',
            prompt: 'Check all areas where you notice tension, tightness, or holding right now:',
            options: ['Jaw / Face', 'Shoulders / Neck', 'Chest / Breath', 'Stomach / Gut', 'Hands / Fists', 'Lower back', 'Nowhere (I feel open)'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'emotional_inhibition', weight: 1.0, is_primary: true }],
        tags: ['somatic', 'body', 'awareness'],
        config: {},
        analytics_config: {},
      },
      // 10. ALLOWING GATE
      {
        code: 'play-all-10',
        kbe_layer: 'E' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'allowing_gate',
        component_type: 'allowing_gate' as ComponentType,
        default_response_type: 'binary',
        intent: 'Permission to feel',
        variants: [{
          lens: 'ram_dass' as CouncilLens,
          copy: {
            headline: 'Permission Slip',
            body: 'This is not about feeling good. This is about feeling real.',
            prompt: 'I allow myself to feel angry without needing to justify it',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'emotional_inhibition', weight: 1.0, is_primary: true }],
        tags: ['permission', 'emotion'],
        config: {},
        analytics_config: {},
      },
      // 11. RELEASE PROMPT
      {
        code: 'play-all-11',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'release_prompt',
        component_type: 'release_prompt' as ComponentType,
        default_response_type: 'slider_0_10',
        intent: 'Readiness to let go',
        variants: [{
          lens: 'alan_watts' as CouncilLens,
          copy: {
            headline: 'The Art of Letting Go',
            body: 'You cannot force release. You can only notice when your hands are no longer clenched.',
            prompt: 'The belief that I have to be useful to deserve love',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'approval_seeking', weight: 1.0, is_primary: true }],
        tags: ['release', 'letting-go'],
        config: {},
        analytics_config: {},
      },
      // 12. STORY DROP
      {
        code: 'play-all-12',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'story_drop',
        component_type: 'story_drop' as ComponentType,
        default_response_type: 'none',
        intent: 'Teaching through story',
        variants: [{
          lens: 'bill_wilson' as CouncilLens,
          copy: {
            headline: 'The Man Who Could Not Stop',
            body: `There was a man who spent twenty years building a bridge to an island he had never visited.\n\nPeople would ask him, "Why do you build this bridge?"\n\nHe would say, "Because when it is finished, I will finally be able to rest."\n\nOne day a child asked him, "What if the island is not what you think it is?"\n\nThe man paused. His hands went still.\n\n"Then I will have wasted my life," he whispered.\n\nThe child said, "Or maybe you will finally put down the hammer."\n\nThe man never finished the bridge.\n\nBut he did learn to rest.`,
            prompt: 'What bridge are you building?',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'unrelenting_standards', weight: 1.0, is_primary: true }],
        tags: ['story', 'teaching', 'wisdom'],
        config: {},
        analytics_config: {},
      },
      // 13. INVENTORY SPARK
      {
        code: 'play-all-13',
        kbe_layer: 'K' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'inventory_spark',
        component_type: 'inventory_spark' as ComponentType,
        default_response_type: 'choice_multi',
        intent: 'Resource check in',
        variants: [{
          lens: 'therapist' as CouncilLens,
          copy: {
            headline: 'What You Have Right Now',
            body: 'Recovery is not about having all the resources. It is about knowing which ones are in reach.',
            prompt: 'What resources are available to you in this moment?',
            options: ['Breath', 'Curiosity', 'Humor', 'Support', 'Time', 'Perspective', 'Willingness', 'Self-compassion'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'vulnerability', weight: 1.0, is_primary: true }],
        tags: ['resources', 'inventory'],
        config: {},
        analytics_config: {},
      },
      // 14. PROOF STAMP
      {
        code: 'play-all-14',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'proof_stamp',
        component_type: 'proof_stamp' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Capture evidence of change',
        variants: [{
          lens: 'david_hawkins' as CouncilLens,
          copy: {
            headline: 'Evidence of Aliveness',
            body: 'You are changing in ways you cannot see yet. Let us collect proof.',
            prompt: 'Name one thing you did differently this week, no matter how small:',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'failure', weight: 1.0, is_primary: true }],
        tags: ['proof', 'progress'],
        config: {},
        analytics_config: {},
      },
      // 15. WITNESS SWITCH
      {
        code: 'play-all-15',
        kbe_layer: 'B' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'witness_switch',
        component_type: 'witness_switch' as ComponentType,
        default_response_type: 'binary',
        intent: 'Toggle perspective modes',
        variants: [{
          lens: 'alan_watts' as CouncilLens,
          copy: {
            headline: 'Two Ways of Seeing',
            body: 'You are reading this sentence. And you are aware that you are reading this sentence. Both are true.',
            prompt: 'Right now, which mode feels more natural?',
            options: ['Inside the experience', 'Watching the experience'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'enmeshment', weight: 1.0, is_primary: true }],
        tags: ['witness', 'perspective'],
        config: {},
        analytics_config: {},
      },
      // 16. TWO COLUMN REALITY
      {
        code: 'play-all-16',
        kbe_layer: 'K' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'two_column_reality',
        component_type: 'two_column_reality' as ComponentType,
        default_response_type: 'text_split',
        intent: 'Surface story vs truth',
        variants: [{
          lens: 'gabor_mate' as CouncilLens,
          copy: {
            headline: 'Two Columns',
            body: 'There is the story you tell yourself. And there is what is actually happening. Often they are not the same.',
            prompt: 'Fill in both sides:',
            options: ['The story I tell myself', 'What is actually true'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'mistrust', weight: 1.0, is_primary: true }],
        tags: ['reality-test', 'cognitive'],
        config: {},
        analytics_config: {},
      },
      // 17. PARTS ROLLCALL
      {
        code: 'play-all-17',
        kbe_layer: 'K' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'parts_rollcall',
        component_type: 'parts_rollcall' as ComponentType,
        default_response_type: 'choice_multi',
        intent: 'IFS parts identification',
        variants: [{
          lens: 'therapist' as CouncilLens,
          copy: {
            headline: 'Who is Here Right Now?',
            body: 'You are not one solid self. You are a family of selves. Let us see who showed up today.',
            prompt: 'Which parts are present and loud right now?',
            options: ['The Critic', 'The Perfectionist', 'The Protector', 'The People Pleaser', 'The Rebel', 'The Wounded Child', 'The Wise One', 'The Numb One'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'punitiveness', weight: 1.0, is_primary: true }],
        tags: ['parts', 'ifs', 'multiplicity'],
        config: {},
        analytics_config: {},
      },
      // 18. VALUES FORK
      {
        code: 'play-all-18',
        kbe_layer: 'B' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'values_fork',
        component_type: 'values_fork' as ComponentType,
        default_response_type: 'choice_single',
        intent: 'Clarify competing values',
        variants: [{
          lens: 'ram_dass' as CouncilLens,
          copy: {
            headline: 'The Fork in the Road',
            body: 'Sometimes growth requires choosing between two things you value. Not because one is wrong, but because you cannot serve both masters.',
            prompt: 'If you had to choose right now, which matters more?',
            options: ['Being liked', 'Being honest', 'Both feel necessary', 'Neither feels true'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'subjugation', weight: 1.0, is_primary: true }],
        tags: ['values', 'choice'],
        config: {},
        analytics_config: {},
      },
      // 19. RECALL CARD CREATE
      {
        code: 'play-all-19',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'recall_card_create',
        component_type: 'recall_card_create' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Capture insight for return',
        variants: [{
          lens: 'david_hawkins' as CouncilLens,
          copy: {
            headline: 'Capture This',
            body: 'Some truths need to be written down before they dissolve back into the noise.',
            prompt: 'Write one thing you want to remember from today:',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'insufficient_self_control', weight: 1.0, is_primary: true }],
        tags: ['capture', 'memory'],
        config: {},
        analytics_config: {},
      },
      // 20. RECALL CARD RETURN
      {
        code: 'play-all-20',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'recall_card_return',
        component_type: 'recall_card_return' as ComponentType,
        default_response_type: 'binary',
        intent: 'Re-surface saved insight',
        variants: [{
          lens: 'therapist' as CouncilLens,
          copy: {
            headline: 'You Wrote This Down',
            body: 'Three days ago you said: "I do not have to fix everything today."',
            prompt: 'Does this still land?',
            options: ['Yes', 'No'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'unrelenting_standards', weight: 1.0, is_primary: true }],
        tags: ['recall', 'memory'],
        config: {},
        analytics_config: {},
      },
      // 21. PROOF STAMP CAPTURE
      {
        code: 'play-all-21',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'proof_stamp_capture',
        component_type: 'proof_stamp_capture' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Capture micro win',
        variants: [{
          lens: 'bill_wilson' as CouncilLens,
          copy: {
            headline: 'Stamp It',
            body: 'Progress is not always dramatic. Sometimes it is just showing up when you did not want to.',
            prompt: 'What is one small win from this week?',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'failure', weight: 1.0, is_primary: true }],
        tags: ['proof', 'win'],
        config: {},
        analytics_config: {},
      },
      // 22. REPAIR DRAFT
      {
        code: 'play-all-22',
        kbe_layer: 'E' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'repair_draft',
        component_type: 'repair_draft' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Draft relational repair',
        variants: [{
          lens: 'gabor_mate' as CouncilLens,
          copy: {
            headline: 'Repair Draft',
            body: 'Ruptures happen. Repairs are how we grow trust. Let us draft what repair might sound like.',
            prompt: 'If you could say what you actually need to say, what would it be?',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'abandonment', weight: 1.0, is_primary: true }],
        tags: ['repair', 'relational'],
        config: {},
        analytics_config: {},
      },
      // 23. SANGHA PING
      {
        code: 'play-all-23',
        kbe_layer: 'E' as KbeLayer,
        tier: 'warm' as Tier,
        family: 'sangha_ping',
        component_type: 'sangha_ping' as ComponentType,
        default_response_type: 'text_1line',
        intent: 'Connect with community',
        variants: [{
          lens: 'ram_dass' as CouncilLens,
          copy: {
            headline: 'Signal to the Circle',
            body: 'You do not have to carry this alone. Send a signal. Someone will catch it.',
            prompt: 'One sentence to your people:',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'social_isolation', weight: 1.0, is_primary: true }],
        tags: ['sangha', 'community'],
        config: {},
        analytics_config: {},
      },
      // 24. STORY SEED
      {
        code: 'play-all-24',
        kbe_layer: 'E' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'story_seed',
        component_type: 'story_seed' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Plant narrative seed',
        variants: [{
          lens: 'alan_watts' as CouncilLens,
          copy: {
            headline: 'The Story You Will Tell',
            body: 'One day you will look back at this moment. What do you want to say about it?',
            prompt: 'Start the sentence: "This was the day I..."',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'negativity', weight: 1.0, is_primary: true }],
        tags: ['story', 'future-self'],
        config: {},
        analytics_config: {},
      },
      // 25. PARADOX KEY SAFE
      {
        code: 'play-all-25',
        kbe_layer: 'B' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'paradox_key_safe',
        component_type: 'paradox_key_safe' as ComponentType,
        default_response_type: 'text_short',
        intent: 'Hold paradoxical wisdom',
        variants: [{
          lens: 'david_hawkins' as CouncilLens,
          copy: {
            headline: 'The Key to the Paradox',
            body: 'Some truths can only be held, not solved. Let us store one here for safekeeping.',
            prompt: 'Name a paradox you are learning to live with:',
            options: [],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'enmeshment', weight: 1.0, is_primary: true }],
        tags: ['paradox', 'wisdom'],
        config: {},
        analytics_config: {},
      },
      // 26. SOMATIC MAP TAP
      {
        code: 'play-all-26',
        kbe_layer: 'K' as KbeLayer,
        tier: 'hot' as Tier,
        family: 'somatic_map_tap',
        component_type: 'somatic_map_tap' as ComponentType,
        default_response_type: 'choice_single',
        intent: 'Body sensation mapping',
        variants: [{
          lens: 'gabor_mate' as CouncilLens,
          copy: {
            headline: 'Tap Into the Body',
            body: 'The body speaks before the mind translates. Let us listen to what it is saying right now.',
            prompt: 'When you think about what is bothering you most, where do you feel it?',
            options: ['Chest (tight, heavy)', 'Throat (choked, closed)', 'Stomach (knotted, nauseous)', 'Head (pressure, fog)', 'Everywhere (flooding)', 'Nowhere (numb)'],
          },
        }],
        targets: [{ scope_type: 'schema' as const, schema_id: 'emotional_inhibition', weight: 1.0, is_primary: true }],
        tags: ['somatic', 'body', 'sensation'],
        config: {},
        analytics_config: {},
      },
    ];

    console.log('✅ Generated', playAllCues.length, 'Play All cues');
    
    setUploadedCues(playAllCues);
    setFilteredCues(playAllCues);
    setSelectedCue(playAllCues[0]);
    setCurrentIndex(0);
    setPlaying(true);
    setPlayAllMode(true);
    
    console.log('✅ Play All mode activated');
  };
  
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredCues.length) {
      setCurrentIndex(nextIndex);
      setSelectedCue(filteredCues[nextIndex]);
    }
  };
  
  const handlePrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setSelectedCue(filteredCues[prevIndex]);
    }
  };
  
  const convertToPlayerDTO = (cue: GeneratedNavicue): NavicuePlayerDTO => {
    return {
      navicue_id: cue.code,
      code: cue.code,
      status: 'draft',
      kbe_layer: cue.kbe_layer,
      tier: cue.tier,
      pattern_key: cue.family,
      component_type: cue.component_type,
      default_response_type: cue.default_response_type,
      intent: cue.intent,
      safety_notes: undefined,
      config: cue.config,
      analytics_config: {},
      tags: cue.tags,
      variants: cue.variants.map((v, idx) => ({
        variant_id: `${cue.code}-${idx}`,
        lens: v.lens,
        language: 'en',
        copy: v.copy,
        is_default: idx === 0,
        version: 1,
      })),
      targets: cue.targets.map(t => ({
        scope_type: t.scope_type,
        schema_id: t.schema_id,
        family_id: undefined,
        mindblock_id: undefined,
        pillar_id: undefined,
        concept_id: undefined,
        theme_id: undefined,
        weight: t.weight,
        is_primary: t.is_primary,
        brain_coordinate: undefined,
      })),
      steps: undefined,
    };
  };
  
  const uniqueComponents = Array.from(new Set(uploadedCues.map(c => c.component_type)));
  const uniqueSchemas = Array.from(new Set(
    uploadedCues.flatMap(c => c.targets.map(t => t.schema_id).filter(Boolean))
  ));
  
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">NaviCue Playground</h1>
          <p className="text-sm opacity-70 mt-1">Preview & test NaviCues before deploying</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log('🚀 Loading 200 Battalion...');
              const battalion = NAVICUE_200_BATTALION;
              setUploadedCues(battalion);
              setFilteredCues(battalion);
              setSelectedCue(battalion[0] || null);
              setCurrentIndex(0);
              setPlayAllMode(true);
              console.log(`✅ Loaded ${battalion.length} NaviCue component types`);
            }}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Load 200 Battalion
          </button>
          <button
            onClick={handlePlayAll}
            className="px-4 py-2 bg-[#5739FB] hover:bg-[#3E2BB8] flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Play All (26 Components)
          </button>
        </div>
      </div>
      
      {/* Main Interface */}
      {uploadedCues.length > 0 && (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Filters + State */}
          <div className="col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs opacity-70 mb-2">KBE Layer</label>
                  <select
                    value={filters.kbe}
                    onChange={(e) => setFilters({ ...filters, kbe: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm"
                  >
                    <option value="all">All</option>
                    <option value="K">K (Knowing)</option>
                    <option value="B">B (Believing)</option>
                    <option value="E">E (Embodying)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Tier</label>
                  <select
                    value={filters.tier}
                    onChange={(e) => setFilters({ ...filters, tier: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm"
                  >
                    <option value="all">All</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cool">Cool</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Component</label>
                  <select
                    value={filters.component}
                    onChange={(e) => setFilters({ ...filters, component: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm"
                  >
                    <option value="all">All</option>
                    {uniqueComponents.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Schema</label>
                  <select
                    value={filters.schema}
                    onChange={(e) => setFilters({ ...filters, schema: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm"
                  >
                    <option value="all">All</option>
                    {uniqueSchemas.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* State Simulator */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                User State
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs opacity-70 mb-2">Heat (0-10)</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={userState.heat || 0}
                    onChange={(e) => setUserState({ ...userState, heat: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-bold text-[#5739FB]">{userState.heat}</div>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Fusion (0-10)</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={userState.fusion || 0}
                    onChange={(e) => setUserState({ ...userState, fusion: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-bold text-[#5739FB]">{userState.fusion}</div>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Resistance (0-10)</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={userState.resistance || 0}
                    onChange={(e) => setUserState({ ...userState, resistance: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-bold text-[#5739FB]">{userState.resistance}</div>
                </div>
                
                <div>
                  <label className="block text-xs opacity-70 mb-2">Choice Access (0-10)</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={userState.choice_access || 0}
                    onChange={(e) => setUserState({ ...userState, choice_access: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-bold text-[#5739FB]">{userState.choice_access}</div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 text-sm">
              <div className="font-bold mb-3">Stats</div>
              <div className="space-y-1 opacity-70">
                <div>Total: {uploadedCues.length}</div>
                <div>Filtered: {filteredCues.length}</div>
                <div>Selected: {selectedCue ? '1' : '0'}</div>
              </div>
            </div>
          </div>
          
          {/* Middle - Cue List */}
          <div className="col-span-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4">
              <h3 className="font-bold mb-4">NaviCues ({filteredCues.length})</h3>
              
              <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto">
                {filteredCues.map(cue => (
                  <button
                    key={cue.code}
                    onClick={() => setSelectedCue(cue)}
                    className={`w-full p-4 border-2 text-left transition-all ${
                      selectedCue?.code === cue.code
                        ? 'border-[#5739FB] bg-[#5739FB]/10'
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <div className="font-mono text-[#5739FB] text-sm mb-1">{cue.code}</div>
                    <div className="text-xs opacity-60 mb-2">
                      {cue.kbe_layer} · {cue.tier} · {cue.component_type}
                    </div>
                    <div className="text-sm truncate">
                      {cue.variants[0]?.copy.headline || 'No headline'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right - Player */}
          <div className="col-span-6">
            {selectedCue ? (
              <div className="bg-zinc-900/50 border border-zinc-800">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Preview {playAllMode && `(${currentIndex + 1}/${filteredCues.length})`}
                  </h3>
                  
                  {playAllMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === filteredCues.length - 1}
                        className="px-3 py-1 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Scrollable player container */}
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <UniversalPlayer
                    navicue={convertToPlayerDTO(selectedCue)}
                    userState={userState}
                    onResponse={(response, statePost) => {
                      console.log('Response:', response);
                      console.log('State Post:', statePost);
                      if (statePost) {
                        setUserState(statePost);
                      }
                      
                      // Auto-advance in Play All mode
                      if (playAllMode && currentIndex < filteredCues.length - 1) {
                        setTimeout(() => {
                          handleNext();
                        }, 500);
                      }
                    }}
                    onRotate={() => console.log('Rotated variant')}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
                <div className="opacity-40 mb-4">
                  <Play className="w-12 h-12 mx-auto" />
                </div>
                <div className="opacity-70">Select a NaviCue to preview</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
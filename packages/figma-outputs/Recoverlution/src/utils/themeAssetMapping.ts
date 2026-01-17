/**
 * THEME-TO-ASSET MAPPING
 * Maps the 30 themes to their corresponding Supabase Storage visual assets
 * Used by Insights and Practices to display thematic visuals
 */

const BASE_URL = 'https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/';

export const THEME_ASSET_MAPPING: Record<string, string> = {
  // ============================================================================
  // PILLAR 1: EMOTIONAL REGULATION (ER) - 5 Themes
  // ============================================================================
  
  // Theme: Ground the Body
  'Ground the Body': `${BASE_URL}Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif`,
  
  // Theme: Aim Attention
  'Aim Attention': `${BASE_URL}Emotional%20Regulation/Window%20of%20Tolerance:%20Your%20Emotional%20Bandwidth.avif`,
  
  // Theme: Recontextualize Sensation
  'Recontextualize Sensation': `${BASE_URL}Emotional%20Regulation/The%20Neuroscience%20of%20Emotional%20Labelling.avif`,
  
  // Theme: Physiological Reset
  'Physiological Reset': `${BASE_URL}Emotional%20Regulation/Understanding%20Panic:%20What%20Happens%20in%20Your%20Body.avif`,
  
  // Theme: Somatic Awareness
  'Somatic Awareness': `${BASE_URL}Emotional%20Regulation/Trauma%20and%20the%20Body:%20Why%20Emotions%20Get%20Stuck.avif`,
  
  // ============================================================================
  // PILLAR 2: STRESS RESILIENCE (SR) - 5 Themes
  // ============================================================================
  
  // Theme: Thicken the Brake
  'Thicken the Brake': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20HRV:%20Training%20Your%20Nervous%20System.avif`,
  
  // Theme: Pilot Awareness
  'Pilot Awareness': `${BASE_URL}Stress%20Resillience/Interoception:%20Learning%20to%20Read%20Your%20Body.avif`,
  
  // Theme: Active Recovery
  'Active Recovery': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20Recovery:%20Why%20Downtime%20Builds%20Capacity.avif`,
  
  // Theme: Hormetic Stressors
  'Hormetic Stressors': `${BASE_URL}Stress%20Resillience/Stress%20Inoculation:%20Growing%20Through%20Challenge.avif`,
  
  // Practice-specific theme aliases
  'Stress Inoculation Hierarchy': `${BASE_URL}Stress%20Resillience/Stress%20Inoculation:%20Growing%20Through%20Challenge.avif`,
  'Exposure Gradient': `${BASE_URL}Stress%20Resillience/Exposure%20Therapy:%20The%20Ladder%20Approach.avif`,
  
  // Theme: Sleep Architecture (Tank Maintenance concept)
  'Sleep Architecture': `${BASE_URL}Stress%20Resillience/Exposure%20Therapy:%20The%20Ladder%20Approach.avif`,
  
  // Legacy name for backward compatibility
  'Tank Maintenance': `${BASE_URL}Stress%20Resillience/Exposure%20Therapy:%20The%20Ladder%20Approach.avif`,
  
  // ============================================================================
  // PILLAR 3: SOCIAL CONNECTIVITY (SC) - 5 Themes
  // ============================================================================
  
  // Theme: Social Regulation
  'Social Regulation': `${BASE_URL}Social%20Connectivity/The%20Neuroscience%20of%20Co-Regulation.avif`,
  
  // Practice-specific theme aliases
  'Neuroception': `${BASE_URL}Social%20Connectivity/Neuroception:%20Your%20Subconscious%20Safety%20Detector.avif`,
  'Co-Regulation': `${BASE_URL}Social%20Connectivity/The%20Neuroscience%20of%20Co-Regulation.avif`,
  'Reciprocity': `${BASE_URL}Social%20Connectivity/Reciprocity:%20The%20Balance%20of%20Give%20and%20Take.avif`,
  'Boundaries': `${BASE_URL}Social%20Connectivity/Boundaries:%20Where%20You%20End%20and%20I%20Begin.avif`,
  
  // Theme: Attunement
  'Attunement': `${BASE_URL}Social%20Connectivity/Attunement:%20The%20Art%20of%20Feeling%20Felt.avif`,
  
  // Theme: Vulnerability
  'Vulnerability': `${BASE_URL}Social%20Connectivity/Neuroception:%20Your%20Subconscious%20Safety%20Detector.avif`,
  
  // Theme: Boundary Setting
  'Boundary Setting': `${BASE_URL}Social%20Connectivity/Boundaries:%20Where%20You%20End%20and%20I%20Begin.avif`,
  
  // Theme: Conflict Resolution
  'Conflict Resolution': `${BASE_URL}Social%20Connectivity/Reciprocity:%20The%20Balance%20of%20Give%20and%20Take.avif`,
  
  // ============================================================================
  // PILLAR 4: COGNITIVE REFRAMING (CR) - 5 Themes
  // ============================================================================
  
  // Theme: Distortion Recognition
  'Distortion Recognition': `${BASE_URL}Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif`,
  
  // Practice-specific theme aliases
  'Distortions': `${BASE_URL}Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif`,
  'Thought Records': `${BASE_URL}Cognitive%20Reframing/Thought%20Records_%20The%20Scientific%20Method%20for%20Your%20Mind-2.avif`,
  'Defusion': `${BASE_URL}Cognitive%20Reframing/Cognitive%20Defusion_%20Unhooking%20from%20Thoughts-2.avif`,
  'Reappraisal': `${BASE_URL}Cognitive%20Reframing/Reappraisal_%20The%20Neuroscience%20of%20Perspective-Taking-2.avif`,
  
  // Theme: Evidence Evaluation
  'Evidence Evaluation': `${BASE_URL}Cognitive%20Reframing/Thought%20Records_%20The%20Scientific%20Method%20for%20Your%20Mind-2.avif`,
  
  // Theme: Alternative Perspectives
  'Alternative Perspectives': `${BASE_URL}Cognitive%20Reframing/Reappraisal_%20The%20Neuroscience%20of%20Perspective-Taking-2.avif`,
  
  // Theme: Defusion Techniques
  'Defusion Techniques': `${BASE_URL}Cognitive%20Reframing/Cognitive%20Defusion_%20Unhooking%20from%20Thoughts-2.avif`,
  
  // Theme: Self-Narrative
  'Self-Narrative': `${BASE_URL}Cognitive%20Reframing/Self-Compassion_%20The%20Antidote%20to%20Shame-2.avif`,
  
  // ============================================================================
  // PILLAR 5: IDENTITY INTEGRATION (II) - 5 Themes
  // ============================================================================
  
  // Theme: Values Clarification
  'Values Clarification': `${BASE_URL}Identity%20Integration/Values%20Clarification_%20What%20Actually%20Matters%20to%20You.avif`,
  
  // Practice-specific theme aliases
  'Narrative Identity': `${BASE_URL}Identity%20Integration/Narrative%20Identity_%20You%20Are%20the%20Story%20You%20Tell.avif`,
  'Story Rewriting': `${BASE_URL}Identity%20Integration/Narrative%20Identity_%20You%20Are%20the%20Story%20You%20Tell.avif`,
  'Values-Based Action': `${BASE_URL}Identity%20Integration/Values-Based%20Action_%20Living%20What%20Matters.avif`,
  'Identity Congruence': `${BASE_URL}Identity%20Integration/Identity%20Congruence_%20When%20Actions%20Match%20Values.avif`,
  
  // Theme: Values-Aligned Action
  'Values-Aligned Action': `${BASE_URL}Identity%20Integration/Values-Based%20Action_%20Living%20What%20Matters.avif`,
  
  // Theme: Self-Compassion
  'Self-Compassion': `${BASE_URL}Cognitive%20Reframing/Self-Compassion_%20The%20Antidote%20to%20Shame-2.avif`,
  
  // Theme: Imperfection Acceptance
  'Imperfection Acceptance': `${BASE_URL}Identity%20Integration/Identity%20Congruence_%20When%20Actions%20Match%20Values.avif`,
  
  // Theme: Identity Exploration
  'Identity Exploration': `${BASE_URL}Identity%20Integration/Narrative%20Identity_%20You%20Are%20the%20Story%20You%20Tell.avif`,
  
  // ============================================================================
  // PILLAR 6: DECISION MASTERY (DM) - 5 Themes
  // ============================================================================
  
  // Theme: Urge Management
  'Urge Management': `${BASE_URL}Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif`,
  
  // Practice-specific theme aliases
  'Prefrontal Function': `${BASE_URL}Decision%20Mastery/The%20Prefrontal%20Cortex_%20Your%20Decision-Making%20Engine.avif`,
  'Decision Fatigue': `${BASE_URL}Decision%20Mastery/Decision%20Fatigue_%20Why%20You%20Run%20Out%20of%20Good%20Choices.avif`,
  'Urge Surfing': `${BASE_URL}Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif`,
  'Delay Strategies': `${BASE_URL}Decision%20Mastery/Delay%20Strategies_%20The%20Space%20Between%20Urge%20and%20Action.avif`,
  'Choice Architecture': `${BASE_URL}Decision%20Mastery/Choice%20Architecture_%20Designing%20Your%20Environment%20for%20Success.avif`,
  
  // Theme: Delay Tactics
  'Delay Tactics': `${BASE_URL}Decision%20Mastery/Delay%20Strategies_%20The%20Space%20Between%20Urge%20and%20Action.avif`,
  
  // Theme: Values-Based Decisions
  'Values-Based Decisions': `${BASE_URL}Decision%20Mastery/Choice%20Architecture_%20Designing%20Your%20Environment%20for%20Success.avif`,
  
  // Theme: Future Projection
  'Future Projection': `${BASE_URL}Decision%20Mastery/The%20Prefrontal%20Cortex_%20Your%20Decision-Making%20Engine.avif`,
  
  // Theme: Relapse Learning
  'Relapse Learning': `${BASE_URL}Decision%20Mastery/Decision%20Fatigue_%20Why%20You%20Run%20Out%20of%20Good%20Choices.avif`,
};

/**
 * Get the visual asset URL for a given theme name
 * @param themeName - The theme name from an insight or practice
 * @returns The Supabase Storage URL for the theme's visual asset
 */
export function getThemeAssetUrl(themeName: string): string {
  return THEME_ASSET_MAPPING[themeName] || '';
}

/**
 * Get all theme names for a given pillar
 * @param pillarName - The pillar name
 * @returns Array of theme names for that pillar
 */
export function getThemesByPillar(pillarName: string): string[] {
  const themesByPillar: Record<string, string[]> = {
    'Emotional Regulation': [
      'Ground the Body',
      'Aim Attention',
      'Recontextualize Sensation',
      'Physiological Reset',
      'Somatic Awareness'
    ],
    'Stress Resilience': [
      'Thicken the Brake',
      'Pilot Awareness',
      'Active Recovery',
      'Hormetic Stressors',
      'Sleep Architecture'
    ],
    'Social Connectivity': [
      'Social Regulation',
      'Attunement',
      'Vulnerability',
      'Boundary Setting',
      'Conflict Resolution'
    ],
    'Cognitive Reframing': [
      'Distortion Recognition',
      'Evidence Evaluation',
      'Alternative Perspectives',
      'Defusion Techniques',
      'Self-Narrative'
    ],
    'Identity Integration': [
      'Values Clarification',
      'Values-Aligned Action',
      'Self-Compassion',
      'Imperfection Acceptance',
      'Identity Exploration'
    ],
    'Decision Mastery': [
      'Urge Management',
      'Delay Tactics',
      'Values-Based Decisions',
      'Future Projection',
      'Relapse Learning'
    ]
  };
  
  return themesByPillar[pillarName] || [];
}
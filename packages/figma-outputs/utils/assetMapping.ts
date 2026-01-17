/**
 * ASSET MAPPING UTILITY
 * Maps content titles to Supabase Storage asset URLs
 * Based on the 30 thematic cluster system
 */

const BASE_URL = 'https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/';

// Asset URL mapping by title pattern matching
export const ASSET_URLS: Record<string, string> = {
  // Emotional Regulation (ER) - 5 assets
  'heart rate variability': `${BASE_URL}Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif`,
  'nervous system report card': `${BASE_URL}Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif`,
  'window of tolerance': `${BASE_URL}Emotional%20Regulation/Window%20of%20Tolerance:%20Your%20Emotional%20Bandwidth.avif`,
  'emotional bandwidth': `${BASE_URL}Emotional%20Regulation/Window%20of%20Tolerance:%20Your%20Emotional%20Bandwidth.avif`,
  'emotional labeling': `${BASE_URL}Emotional%20Regulation/The%20Neuroscience%20of%20Emotional%20Labelling.avif`,
  'emotional labelling': `${BASE_URL}Emotional%20Regulation/The%20Neuroscience%20of%20Emotional%20Labelling.avif`,
  'panic': `${BASE_URL}Emotional%20Regulation/Understanding%20Panic:%20What%20Happens%20in%20Your%20Body.avif`,
  'understanding panic': `${BASE_URL}Emotional%20Regulation/Understanding%20Panic:%20What%20Happens%20in%20Your%20Body.avif`,
  'trauma and the body': `${BASE_URL}Emotional%20Regulation/Trauma%20and%20the%20Body:%20Why%20Emotions%20Get%20Stuck.avif`,
  'emotions get stuck': `${BASE_URL}Emotional%20Regulation/Trauma%20and%20the%20Body:%20Why%20Emotions%20Get%20Stuck.avif`,
  
  // Stress Resilience (SR) - 5 assets
  'stress inoculation': `${BASE_URL}Stress%20Resillience/Stress%20Inoculation:%20Growing%20Through%20Challenge.avif`,
  'growing through challenge': `${BASE_URL}Stress%20Resillience/Stress%20Inoculation:%20Growing%20Through%20Challenge.avif`,
  'science of recovery': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20Recovery:%20Why%20Downtime%20Builds%20Capacity.avif`,
  'downtime builds capacity': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20Recovery:%20Why%20Downtime%20Builds%20Capacity.avif`,
  'science of hrv': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20HRV:%20Training%20Your%20Nervous%20System.avif`,
  'training your nervous system': `${BASE_URL}Stress%20Resillience/The%20Science%20of%20HRV:%20Training%20Your%20Nervous%20System.avif`,
  'interoception': `${BASE_URL}Stress%20Resillience/Interoception:%20Learning%20to%20Read%20Your%20Body.avif`,
  'learning to read your body': `${BASE_URL}Stress%20Resillience/Interoception:%20Learning%20to%20Read%20Your%20Body.avif`,
  'exposure therapy': `${BASE_URL}Stress%20Resillience/Exposure%20Therapy:%20The%20Ladder%20Approach.avif`,
  'ladder approach': `${BASE_URL}Stress%20Resillience/Exposure%20Therapy:%20The%20Ladder%20Approach.avif`,
  
  // Social Connectivity (SC) - 5 assets
  'attunement': `${BASE_URL}Social%20Connectivity/Attunement:%20The%20Art%20of%20Feeling%20Felt.avif`,
  'art of feeling felt': `${BASE_URL}Social%20Connectivity/Attunement:%20The%20Art%20of%20Feeling%20Felt.avif`,
  'neuroception': `${BASE_URL}Social%20Connectivity/Neuroception:%20Your%20Subconscious%20Safety%20Detector.avif`,
  'subconscious safety detector': `${BASE_URL}Social%20Connectivity/Neuroception:%20Your%20Subconscious%20Safety%20Detector.avif`,
  'boundaries': `${BASE_URL}Social%20Connectivity/Boundaries:%20Where%20You%20End%20and%20I%20Begin.avif`,
  'where you end and i begin': `${BASE_URL}Social%20Connectivity/Boundaries:%20Where%20You%20End%20and%20I%20Begin.avif`,
  'co-regulation': `${BASE_URL}Social%20Connectivity/The%20Neuroscience%20of%20Co-Regulation.avif`,
  'neuroscience of co-regulation': `${BASE_URL}Social%20Connectivity/The%20Neuroscience%20of%20Co-Regulation.avif`,
  'reciprocity': `${BASE_URL}Social%20Connectivity/Reciprocity:%20The%20Balance%20of%20Give%20and%20Take.avif`,
  'balance of give and take': `${BASE_URL}Social%20Connectivity/Reciprocity:%20The%20Balance%20of%20Give%20and%20Take.avif`,
  
  // Cognitive Reframing (CR) - 5 assets
  'cognitive distortions': `${BASE_URL}Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif`,
  '10 cognitive distortions': `${BASE_URL}Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif`,
  'distortions that drive relapse': `${BASE_URL}Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif`,
  'thought records': `${BASE_URL}Cognitive%20Reframing/Thought%20Records_%20The%20Scientific%20Method%20for%20Your%20Mind-2.avif`,
  'scientific method for your mind': `${BASE_URL}Cognitive%20Reframing/Thought%20Records_%20The%20Scientific%20Method%20for%20Your%20Mind-2.avif`,
  'reappraisal': `${BASE_URL}Cognitive%20Reframing/Reappraisal_%20The%20Neuroscience%20of%20Perspective-Taking-2.avif`,
  'neuroscience of perspective': `${BASE_URL}Cognitive%20Reframing/Reappraisal_%20The%20Neuroscience%20of%20Perspective-Taking-2.avif`,
  'perspective-taking': `${BASE_URL}Cognitive%20Reframing/Reappraisal_%20The%20Neuroscience%20of%20Perspective-Taking-2.avif`,
  'self-compassion': `${BASE_URL}Cognitive%20Reframing/Self-Compassion_%20The%20Antidote%20to%20Shame-2.avif`,
  'antidote to shame': `${BASE_URL}Cognitive%20Reframing/Self-Compassion_%20The%20Antidote%20to%20Shame-2.avif`,
  'cognitive defusion': `${BASE_URL}Cognitive%20Reframing/Cognitive%20Defusion_%20Unhooking%20from%20Thoughts-2.avif`,
  'unhooking from thoughts': `${BASE_URL}Cognitive%20Reframing/Cognitive%20Defusion_%20Unhooking%20from%20Thoughts-2.avif`,
  
  // Identity Integration (II) - 5 assets
  'values clarification': `${BASE_URL}Identity%20Integration/Values%20Clarification_%20What%20Actually%20Matters%20to%20You.avif`,
  'what actually matters': `${BASE_URL}Identity%20Integration/Values%20Clarification_%20What%20Actually%20Matters%20to%20You.avif`,
  'narrative identity': `${BASE_URL}Identity%20Integration/Narrative%20Identity_%20You%20Are%20the%20Story%20You%20Tell.avif`,
  'story you tell': `${BASE_URL}Identity%20Integration/Narrative%20Identity_%20You%20Are%20the%20Story%20You%20Tell.avif`,
  'identity congruence': `${BASE_URL}Identity%20Integration/Identity%20Congruence_%20When%20Actions%20Match%20Values.avif`,
  'actions match values': `${BASE_URL}Identity%20Integration/Identity%20Congruence_%20When%20Actions%20Match%20Values.avif`,
  'addiction story': `${BASE_URL}Identity%20Integration/Rewriting%20the%20Addiction%20Story.avif`,
  'rewriting the addiction': `${BASE_URL}Identity%20Integration/Rewriting%20the%20Addiction%20Story.avif`,
  'values-based action': `${BASE_URL}Identity%20Integration/Values-Based%20Action_%20Living%20What%20Matters.avif`,
  'living what matters': `${BASE_URL}Identity%20Integration/Values-Based%20Action_%20Living%20What%20Matters.avif`,
  
  // Decision Mastery (DM) - 5 assets
  'urge surfing': `${BASE_URL}Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif`,
  'riding the wave': `${BASE_URL}Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif`,
  'wave without acting': `${BASE_URL}Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif`,
  'delay strategies': `${BASE_URL}Decision%20Mastery/Delay%20Strategies_%20The%20Space%20Between%20Urge%20and%20Action.avif`,
  'space between urge': `${BASE_URL}Decision%20Mastery/Delay%20Strategies_%20The%20Space%20Between%20Urge%20and%20Action.avif`,
  'urge and action': `${BASE_URL}Decision%20Mastery/Delay%20Strategies_%20The%20Space%20Between%20Urge%20and%20Action.avif`,
  'decision fatigue': `${BASE_URL}Decision%20Mastery/Decision%20Fatigue_%20Why%20You%20Run%20Out%20of%20Good%20Choices.avif`,
  'run out of good choices': `${BASE_URL}Decision%20Mastery/Decision%20Fatigue_%20Why%20You%20Run%20Out%20of%20Good%20Choices.avif`,
  'prefrontal cortex': `${BASE_URL}Decision%20Mastery/The%20Prefrontal%20Cortex_%20Your%20Decision-Making%20Engine.avif`,
  'decision-making engine': `${BASE_URL}Decision%20Mastery/The%20Prefrontal%20Cortex_%20Your%20Decision-Making%20Engine.avif`,
  'choice architecture': `${BASE_URL}Decision%20Mastery/Choice%20Architecture_%20Designing%20Your%20Environment%20for%20Success.avif`,
  'designing your environment': `${BASE_URL}Decision%20Mastery/Choice%20Architecture_%20Designing%20Your%20Environment%20for%20Success.avif`,
  'environment for success': `${BASE_URL}Decision%20Mastery/Choice%20Architecture_%20Designing%20Your%20Environment%20for%20Success.avif`,
};

/**
 * Get Supabase asset URL for a given title
 * Falls back to provided URL if no match found
 */
export function getAssetUrl(title: string, fallbackUrl?: string): string {
  // Handle undefined or null title
  if (!title) {
    return fallbackUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800';
  }
  
  const normalizedTitle = title.toLowerCase();
  
  // Try to find a matching key
  for (const [key, url] of Object.entries(ASSET_URLS)) {
    if (normalizedTitle.includes(key)) {
      return url;
    }
  }
  
  // Return fallback or a default placeholder
  return fallbackUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800';
}
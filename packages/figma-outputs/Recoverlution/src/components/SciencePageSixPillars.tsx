/**
 * SCIENCE PAGE - SIX PILLARS SECTION
 * 
 * Universal tile system using TileGridSectionClass + TileClass
 * UNIVERSAL ASSET SYNC: Uses centralized Six Pillars assets from /utils/section5Assets.tsx
 * 
 * ASSET SHARING: Homepage Section 5 "Unbreakable Foundations" ↔ Science Page "Six Pillars"
 * Update pillar assets in ONE place → Automatic sync across BOTH pages!
 * 
 * Updated: November 5, 2025 - Now uses TwoColumnHeadlineClass for consistent headline pattern
 * Updated: November 6, 2025 - Batch 6: Universal Six Pillars asset sync
 * 
 * Created: November 5, 2025 - Phase 6: Universal Tile Consolidation
 */

import { Heart, Brain, Target, Users, Sparkles, Shield } from 'lucide-react';
import { TileClass, TwoColumnHeadlineClass } from './marketing/universal';

// Six Pillars Assets - Centralized Repository (Shared with Homepage Section 5)
// Update assets in /utils/section5Assets.tsx for instant propagation to BOTH pages
import { 
  section5EmotionalOptimized as emotionalAsset,
  section5StressOptimized as stressAsset,
  section5SocialOptimized as socialAsset,
  section5CognitiveOptimized as cognitiveAsset,
  section5IdentityOptimized as identityAsset,
  section5DecisionOptimized as decisionAsset
} from '../utils/section5Assets';

const BRAND = {
  cyan: '#40E0D0',
};

export function SciencePageSixPillars() {
  const tiles = [
        // MAPS TO: Homepage Section 5 - Emotional Regulation ("THE PILOT LIGHT")
        {
          icon: Heart,
          iconColor: BRAND.cyan,
          title: 'Emotional Regulation',
          eyebrowBadge: 'PREFRONTAL CORTEX + AMYGDALA',
          description: 'Strengthen top-down control over emotional reactivity. Build the capacity to observe, pause, and choose response over reaction.',
          buzzTags: ['Self-Awareness', 'Impulse Control', 'Window of Tolerance'],
          backgroundAsset: emotionalAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        },
        // MAPS TO: Homepage Section 5 - Stress Resilience ("THE CAPACITY ENGINE")
        {
          icon: Shield,
          iconColor: BRAND.cyan,
          title: 'Stress Resilience',
          eyebrowBadge: 'HPA AXIS + VAGAL TONE',
          description: 'Build neuroendocrine flexibility. Strengthen parasympathetic activation and reduce chronic cortisol dysregulation.',
          buzzTags: ['Nervous System', 'Vagal Tone', 'Stress Response'],
          backgroundAsset: stressAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        },
        // MAPS TO: Homepage Section 5 - Social Connectivity ("THE ANCHORAGE SYSTEM")
        {
          icon: Users,
          iconColor: BRAND.cyan,
          title: 'Social Connectivity',
          eyebrowBadge: 'MIRROR NEURON SYSTEM',
          description: 'Rebuild trust and healthy attachment. Activate oxytocin pathways and strengthen social engagement circuitry.',
          buzzTags: ['Healthy Boundaries', 'Trust Building', 'Social Support'],
          backgroundAsset: socialAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        },
        // MAPS TO: Homepage Section 5 - Cognitive Reframing ("THE LENS EDITOR")
        {
          icon: Brain,
          iconColor: BRAND.cyan,
          title: 'Cognitive Reframing',
          eyebrowBadge: 'DEFAULT MODE NETWORK',
          description: 'Rewire automatic thought patterns. Interrupt rumination, challenge distortions, and build flexible thinking pathways.',
          buzzTags: ['Thought Patterns', 'Mental Flexibility', 'Perspective Shift'],
          backgroundAsset: cognitiveAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        },
        // MAPS TO: Homepage Section 5 - Identity Integration ("THE PROOF BUILDER")
        {
          icon: Sparkles,
          iconColor: BRAND.cyan,
          title: 'Identity Integration',
          eyebrowBadge: 'MEDIAL PREFRONTAL CORTEX',
          description: 'Consolidate new self-narrative. Integrate recovery identity at the neural level through repeated self-reflection and values alignment.',
          buzzTags: ['Self-Narrative', 'Core Values', 'Recovery Identity'],
          backgroundAsset: identityAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        },
        // MAPS TO: Homepage Section 5 - Decision Mastery ("THE AUTONOMY ENABLER")
        {
          icon: Target,
          iconColor: BRAND.cyan,
          title: 'Decision Mastery',
          eyebrowBadge: 'ANTERIOR CINGULATE CORTEX',
          description: 'Optimize executive function and impulse control. Strengthen neural pathways for delayed gratification and values-aligned choice.',
          buzzTags: ['Executive Function', 'Values Alignment', 'Delayed Gratification'],
          backgroundAsset: decisionAsset,
          gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(64, 224, 208, 0.08) 100%)'
        }
      ];
  
  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Two-Column Headline */}
        <TwoColumnHeadlineClass
          headline="Six Pillars"
          headlineAccent="Pillars"
          accentColor={BRAND.cyan}
          tagline="Six core brain systems that drive lasting recovery"
          layout="left"
          marginBottom="mb-16"
        />
        
        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-[1600px]">
          {tiles.map((tile, index) => (
            <TileClass key={index} {...tile} minHeight="480px" animationDelay={index * 0.1} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

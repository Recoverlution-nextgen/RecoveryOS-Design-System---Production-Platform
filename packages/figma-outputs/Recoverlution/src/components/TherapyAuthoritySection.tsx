/**
 * THERAPY AUTHORITY SECTION
 * 
 * Section 7 in therapy page narrative flow
 * Answers: "WHY TRUST IT?" - Clinical grounding + competitive advantage
 * 
 * The Authority: Six Pillars (clinical proof) + Method as Infrastructure (business model)
 * 
 * Pattern: 2x3 FlipTile grid (6 pillars) + closing statement on business transformation
 * Visual: Pillar-specific assets with flip-to-explore interaction
 * Focus: Prove clinical credibility AND show this becomes THEIR differentiator
 */

import React from 'react';
import { Heart, Shield, Users, Brain, Target, Zap, TrendingUp, Wind, Activity, Waves, Anchor, UserCheck, HandHeart, Lightbulb, Repeat, Glasses, CheckCircle, Footprints, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { FlipTileClassWithFeatures } from './marketing/universal/FlipTileClassWithFeatures';

// Asset imports - Using pillar assets
import { 
  section5EmotionalOptimized, 
  section5StressOptimized,
  section5SocialOptimized,
  section5CognitiveOptimized,
  section5IdentityOptimized,
  section5DecisionOptimized
} from '../utils/section5Assets';

export default function TherapyAuthoritySection() {

  return (
    <>
      {/* PART 1: UNBREAKABLE FOUNDATIONS - SIX PILLARS */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          background: '#FFFFFF'
        }}
      >
        
        <style>{`
          @keyframes pulse-glow-cyan {
            0%, 100% { opacity: 0.08; }
            50% { opacity: 0.15; }
          }
        `}</style>

        {/* Subtle ambient cyan glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[900px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(64, 224, 208, 0.12) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'pulse-glow-cyan 20s ease-in-out infinite'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          
          {/* Section Header - RIGHT ALIGNED PATTERN */}
          <div className="section-header-right">
            <motion.div
              className="subheading-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-subheading">
                Framework as foundation. Every intervention grounded in evidence. Therapeutic architecture built to last.
              </p>
            </motion.div>

            <motion.div
              className="headline-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="section-eyebrow">
                <Shield size={14} style={{ strokeWidth: 2.5 }} />
                <span>THE AUTHORITY</span>
              </div>
              <h2 className="section-headline-therapy">
                Research guides.<br />
                <span className="accent">Foundations hold.</span>
              </h2>
            </motion.div>
          </div>

          {/* Row 1 - First 3 Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <FlipTileClassWithFeatures
              icon={Heart}
              iconColor="#8B5CF6"
              title="Emotional Regulation"
              tagline="Biology first."
              description="Nervous system regulates before any reasoning."
              backIntro="Your clients arrive dysregulated. Traditional talk therapy asks them to think clearly when their biology is screaming. Recoverlution fortifies the nervous system first."
              features={[
                {
                  icon: Wind,
                  label: 'Nervous System First',
                  color: '#8B5CF6',
                  ticks: [
                    'Breathwork and somatic practices calm limbic activation',
                    'Co-regulation exercises create biological readiness',
                    'Regulation builds the foundation for cognitive work to stick'
                  ]
                },
                {
                  icon: Activity,
                  label: 'Biological Conditions',
                  color: '#A78BFA',
                  ticks: [
                    'Therapeutic work lands only when the system is regulated',
                    'Practices delivered precisely when calming is needed',
                    'Creates the biological conditions necessary for everything else'
                  ]
                }
              ]}
              backgroundAsset={section5EmotionalOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(139, 92, 246, 0.75) 0%, rgba(139, 92, 246, 0.60) 100%)"
              animationDelay={0.2}
            />

            <FlipTileClassWithFeatures
              icon={Shield}
              iconColor="#3B82F6"
              title="Stress Resilience"
              tagline="Protection holds."
              description="Prefrontal cortex stays online under pressure."
              backIntro="Early recovery is marked by compromised stress tolerance. Your clients collapse under pressure that would barely register for others. Their rational brain goes offline precisely when they need it most."
              features={[
                {
                  icon: Anchor,
                  label: 'Cognitive Protection',
                  color: '#3B82F6',
                  ticks: [
                    'Stress inoculation builds capacity to stay online during difficulty',
                    'Keeps the thinking brain accessible when life gets hard',
                    'Executive function remains intact under pressure'
                  ]
                },
                {
                  icon: UserCheck,
                  label: 'Capacity Building',
                  color: '#60A5FA',
                  ticks: [
                    'Protects prefrontal cortex from stress-induced shutdown',
                    'Strengthens tolerance to pressure that would trigger collapse',
                    'Prevents system collapse when challenges arrive'
                  ]
                }
              ]}
              backgroundAsset={section5StressOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(59, 130, 246, 0.75) 0%, rgba(59, 130, 246, 0.60) 100%)"
              animationDelay={0.3}
            />

            <FlipTileClassWithFeatures
              icon={Users}
              iconColor="#0891B2"
              title="Social Connectivity"
              tagline="Safety builds."
              description="Belonging enables the most vulnerable work."
              backIntro="Your clients carry years of broken trust, failed relationships, and profound isolation. They cannot do vulnerable identity work without secure attachment. Social Connectivity builds the safety architecture that makes change possible."
              features={[
                {
                  icon: HandHeart,
                  label: 'Relational Foundation',
                  color: '#0891B2',
                  ticks: [
                    'Connection practices and belonging exercises create safety',
                    'Shame resilience work dismantles the silent killer',
                    'Secure attachment makes vulnerable identity work possible'
                  ]
                },
                {
                  icon: Waves,
                  label: 'Structural Bonds',
                  color: '#06B6D4',
                  ticks: [
                    'Strong bonds are not optional, they are structural',
                    'Felt safety and belonging enable the work recovery demands',
                    'Relational safety architecture supports lasting change'
                  ]
                }
              ]}
              backgroundAsset={section5SocialOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(8, 145, 178, 0.75) 0%, rgba(8, 145, 178, 0.60) 100%)"
              animationDelay={0.4}
            />
          </div>

          {/* Row 2 - Last 3 Pillars */}
          <div className="grid md:grid-cols-3 gap-8">
            <FlipTileClassWithFeatures
              icon={Brain}
              iconColor="#6366F1"
              title="Cognitive Reframing"
              tagline="Lens shifts."
              description="Compassion replaces catastrophic thinking patterns completely."
              backIntro="Your clients see the world through a distorted lens. Every setback is proof they are broken. Every difficulty is evidence they will fail. Cognitive Reframing teaches them to see differently."
              features={[
                {
                  icon: Glasses,
                  label: 'Appraisal Flexibility',
                  color: '#6366F1',
                  ticks: [
                    'Kinder thoughts lower physiological arousal',
                    'Truer appraisals calm the body and quiet the mind',
                    'Virtuous cycle where better thinking reduces stress'
                  ]
                },
                {
                  icon: Lightbulb,
                  label: 'Metacognitive Awareness',
                  color: '#818CF8',
                  ticks: [
                    'Breaks catastrophic patterns at the thought level',
                    'Compassionate perspective becomes automatic',
                    'Reduced stress enables even better thinking to emerge'
                  ]
                }
              ]}
              backgroundAsset={section5CognitiveOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(99, 102, 241, 0.75) 0%, rgba(99, 102, 241, 0.60) 100%)"
              animationDelay={0.5}
            />

            <FlipTileClassWithFeatures
              icon={Target}
              iconColor="#5739FB"
              title="Identity Integration"
              tagline="Proof stacks."
              description="Micro-actions build lasting conviction over time."
              backIntro="Your clients do not believe they can change because they have no proof. Stated intentions mean nothing. Identity Integration stacks micro-proofs into lasting conviction."
              features={[
                {
                  icon: CheckCircle,
                  label: 'Micro-Proof Stacking',
                  color: '#5739FB',
                  ticks: [
                    'Every successful regulation practice becomes evidence',
                    'Every wise decision validates who they are becoming',
                    'Every moment of choosing differently builds conviction'
                  ]
                },
                {
                  icon: Footprints,
                  label: 'Aspiration to Embodiment',
                  color: '#7C3AED',
                  ticks: [
                    'Narrative shifts from hope to proof of transformation',
                    'Behavior converts into identity-level belief',
                    'Self-verification replaces aspiration with embodied truth'
                  ]
                }
              ]}
              backgroundAsset={section5IdentityOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
              animationDelay={0.6}
            />

            <FlipTileClassWithFeatures
              icon={Zap}
              iconColor="#14B8A6"
              title="Decision Mastery"
              tagline="Wisdom pauses."
              description="Gap between cue and action creates choice."
              backIntro="Recovery fails at the moment of decision. Your clients know what they should do. They do the opposite anyway. Decision Mastery creates the pause where choice becomes possible."
              features={[
                {
                  icon: Compass,
                  label: 'The Wisdom Gap',
                  color: '#14B8A6',
                  ticks: [
                    'Decision rehearsal and value alignment create the pause',
                    'Choice architecture makes the wise move feel natural',
                    'Gap between cue and action becomes space for autonomy'
                  ]
                },
                {
                  icon: Repeat,
                  label: 'Insight to Action',
                  color: '#5EEAD4',
                  ticks: [
                    'Every successful decision validates the entire framework',
                    'Consistent action replaces inconsistent intention',
                    'True autonomy emerges from practiced wisdom'
                  ]
                }
              ]}
              backgroundAsset={section5DecisionOptimized}
              gradientOverlay="linear-gradient(135deg, rgba(20, 184, 166, 0.75) 0%, rgba(20, 184, 166, 0.60) 100%)"
              animationDelay={0.7}
            />
          </div>

        </div>
      </section>

    </>
  );
}
/**
 * THERAPY VEHICLE SECTION - REDESIGNED FOR AHA MOMENT
 * 
 * Section 6 in therapy page narrative flow
 * THE AHA MOMENT: Everything clicks together into one complete system
 * 
 * PATTERN:
 * - Title: 2-3 words, lowercase (matching sections 1-3)
 * - Tagline: 2-4 words, punchy
 * - Description: 2-4 short sentences on front
 * - Flip: Title becomes eyebrow + 2 feature blocks with 3 ticks each
 * 
 * FEATURE REUSE: Each platform feature used at least once across all 5 tiles
 */

import React from 'react';
import { Layers, Zap, Activity, Link2, Sparkles, Footprints, Compass, Brain, Users, MapPin, Heart, BarChart3, Shield, Gauge, Target, Repeat, TrendingUp, CheckCircle, FileText, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { FlipTileClassWithFeatures, Feature } from './marketing/universal/FlipTileClassWithFeatures';

const BRAND = {
  platformPurple: '#5739FB',
  journeyPurple: '#3E2BB8',
  navigateTeal: '#0891B2',
  intelligenceViolet: '#8B5CF6',
  careSkyBlue: '#06B6D4',
  cyan: '#40E0D0'
};

export default function TherapyVehicleSection() {

  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FAFAFA 0%, #FFFFFF 100%)'
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(64, 224, 208, 0.12) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'pulse-glow-cyan 16s ease-in-out infinite'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header - LEFT ALIGNED PATTERN */}
        <div className="section-header-left">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Layers size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE VEHICLE</span>
            </div>
            <h2 className="section-headline-therapy">
              Clinicians steer.<br />
              <span className="accent">Clients grow.</span>
            </h2>
          </motion.div>

          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subheading">
              Frameworks turn to infrastructure. One platform becomes home. Practice runs continuously.
            </p>
          </motion.div>
        </div>

        {/* Top Row - 2 Larger Tiles */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* TILE 1: PRACTICE INFRASTRUCTURE → Unified Operations + Practitioner Capacity */}
          <FlipTileClassWithFeatures
            icon={Layers}
            iconColor={BRAND.platformPurple}
            title="Practice infrastructure"
            tagline="Whole practice. One system."
            description="Clinical work and operations flow as one organism. Your practice runs while you stay present with clients. Infrastructure that builds capacity instead of draining it."
            backIntro="Sessions, records, scheduling, and billing converge into one operating truth. Infrastructure that cares for you while you care for others."
            features={[
              {
                icon: Layers,
                label: 'Unified Operations',
                color: '#5739FB',
                ticks: [
                  'Clinical and business systems converge into single source of truth',
                  'Sessions flow to records, insights inform care without manual translation',
                  'Mental energy stays with breakthroughs, not administrative friction'
                ]
              },
              {
                icon: Heart,
                label: 'Practitioner Capacity',
                color: '#06B6D4',
                ticks: [
                  'Access the same regulation tools you assign to clients',
                  'Track your own baseline so sustainable care becomes systematic',
                  'Clinical excellence without burnout when the platform protects your capacity'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/thevehicle/THE%20METHOD.avif"
            gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
            animationDelay={0.2}
            minHeight="480px"
          />

          {/* TILE 2: CLINICAL CURATION → Composable Architecture + Non-Linear Capacity */}
          <FlipTileClassWithFeatures
            icon={Target}
            iconColor={BRAND.navigateTeal}
            title="Clinical curation"
            tagline="Method becomes system."
            description="Your therapeutic frameworks become infrastructure clients navigate daily. Build packages combining sessions and continuity. Scale your approach without dilution."
            backIntro="Clinical frameworks become infrastructure. You control the packaging, pricing, and deployment. Scale happens without compromise."
            features={[
              {
                icon: Repeat,
                label: 'Composable Architecture',
                color: '#5739FB',
                ticks: [
                  'Bundle sessions with companion continuity in any configuration',
                  'Structure pricing that honors clinical value and long-term outcomes',
                  'Therapeutic packages create commitment, not transactional appointments'
                ]
              },
              {
                icon: TrendingUp,
                label: 'Non-Linear Capacity',
                color: '#0891B2',
                ticks: [
                  'Your frameworks scale across populations without quality degradation',
                  'Clinical depth maintained as reach expands beyond room capacity',
                  'One therapeutic model generates infinite concurrent impact'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/thevehicle/THE%20OPERATIONS.avif"
            gradientOverlay="linear-gradient(135deg, rgba(8, 145, 178, 0.75) 0%, rgba(8, 145, 178, 0.60) 100%)"
            animationDelay={0.3}
            minHeight="480px"
          />
        </div>

        {/* Bottom Row - 3 Tiles */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* TILE 3: COMPANION CONTINUITY → Structured Progression + Therapeutic Presence */}
          <FlipTileClassWithFeatures
            icon={Link2}
            iconColor={BRAND.careSkyBlue}
            title="Companion continuity"
            tagline="Care carries."
            description="Structured support between sessions. Your therapeutic voice moves with clients daily. Recovery becomes rhythm."
            backIntro="Breakthroughs fade without reinforcement. Companion continuity transforms session insights into daily practice so change becomes reflex."
            features={[
              {
                icon: Footprints,
                label: 'Structured Progression',
                color: '#06B6D4',
                ticks: [
                  'Micro-practices bridge session breakthroughs to everyday moments',
                  'Somatic and cognitive work delivered when biology is ready',
                  'Consistent reinforcement builds neural pathways that persist'
                ]
              },
              {
                icon: Heart,
                label: 'Therapeutic Presence',
                color: '#3E2BB8',
                ticks: [
                  'Your frameworks guide clients between every session',
                  'Felt connection prevents isolation during vulnerable integration',
                  'Care becomes continuous, not episodic appointments'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/thevehicle/THE%20CONTINUITY.avif"
            gradientOverlay="linear-gradient(135deg, rgba(6, 182, 212, 0.75) 0%, rgba(6, 182, 212, 0.60) 100%)"
            animationDelay={0.4}
          />

          {/* TILE 4: INTELLIGENT INSIGHTS → Session Signals + Trend Analysis */}
          <FlipTileClassWithFeatures
            icon={Brain}
            iconColor={BRAND.intelligenceViolet}
            title="Intelligent insights"
            tagline="Insight informs."
            description="Session signals surface what matters. Trends become visible before sessions begin. Measurable impact replaces intuition."
            backIntro="Clinical intelligence that tracks readiness, surfaces patterns, and quantifies change. You see what's working before clients can articulate it."
            features={[
              {
                icon: Activity,
                label: 'Session Signals',
                color: '#8B5CF6',
                ticks: [
                  'Biological readiness tracked at neural level before delivery',
                  'Cognitive load signals tell you when information can actually land',
                  'Real-time indicators replace guesswork with measurable clarity'
                ]
              },
              {
                icon: BarChart3,
                label: 'Trend Analysis',
                color: '#5739FB',
                ticks: [
                  'Patterns emerge across client populations automatically',
                  'Therapeutic impact quantified with longitudinal data',
                  'Clinical decisions informed by aggregate intelligence, not hunches'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/thevehicle/THE%20INTELLIGENCE.avif"
            gradientOverlay="linear-gradient(135deg, rgba(139, 92, 246, 0.75) 0%, rgba(139, 92, 246, 0.60) 100%)"
            animationDelay={0.5}
          />

          {/* TILE 5: DEFENSIBLE ROI → Measurable Outcomes + Auditable Impact */}
          <FlipTileClassWithFeatures
            icon={Shield}
            iconColor={BRAND.journeyPurple}
            title="Defensible ROI"
            tagline="Proof pays."
            description="Therapeutic impact becomes measurable. Commissioners see verifiable outcomes. Insurers fund what's trackable."
            backIntro="Recovery tracked as neurological progress. Data integrity travels with clients across transitions. One operating truth funders can validate."
            features={[
              {
                icon: CheckCircle,
                label: 'Measurable Outcomes',
                color: '#10B981',
                ticks: [
                  'Recovery quantified through validated behavioral markers',
                  'Longitudinal data proves sustained change over time',
                  'Impact becomes defensible to referrers and commissioners'
                ]
              },
              {
                icon: TrendingUp,
                label: 'Auditable Impact',
                color: '#3E2BB8',
                ticks: [
                  'Data integrity maintained across care transitions and providers',
                  'Therapeutic progress documented with clinical rigor',
                  'Funding secured through verifiable, trackable results'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/thevehicle/THE%20TRANSFORMATION.avif"
            gradientOverlay="linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)"
            animationDelay={0.6}
          />
        </div>

      </div>
    </section>
  );
}
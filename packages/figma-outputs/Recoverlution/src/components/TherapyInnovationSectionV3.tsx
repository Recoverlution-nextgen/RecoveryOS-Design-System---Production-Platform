/**
 * THERAPY INNOVATION SECTION V3
 * Therapist-Centric: The Adaptive Core
 * 
 * Pattern: Simple 2x2 grid using FlipTileClass (consistent with sections 1 & 2)
 * Target: Independent therapists who need intelligence that serves THEM first
 * Focus: Putting the THERAPIST on the pedestal - Your method, scaled by intelligence
 * 
 * 4 Core Concepts:
 * 1. Your clinical voice, always on - Presence multiplied
 * 2. Signal before sessions - Walk in knowing
 * 3. Autonomy that scales you - Agency honored
 * 4. Practice that compounds - Success loops
 * 
 * Updated: December 8, 2025 - Reframed to therapist-first adaptive intelligence
 */

import { Brain, Zap, Compass, TrendingUp, Footprints, MapPin, Heart, Activity, BarChart3, Gauge, Shield, Users, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { FlipTileClassWithFeatures } from './marketing/universal/FlipTileClassWithFeatures';

const BRAND = {
  mid: '#5739FB',
  dark: '#3E2BB8',
  cyan: '#40E0D0'
};

export default function TherapyInnovationSectionV3() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header - LEFT ALIGNED PATTERN */}
        <div className="section-header-left">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Brain size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE INNOVATION</span>
            </div>
            <h2 className="section-headline-therapy">
              Your method, <br />
              <span className="accent">scaled by intelligence.</span>
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
              Neuroadaptive systems that extend your clinical voice, surface signal before sessions, and turn your brilliance into infrastructure that works while you sleep.
            </p>
          </motion.div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 1. Your clinical voice, always on - Presence multiplied */}
          <FlipTileClassWithFeatures
            icon={Brain}
            iconColor={BRAND.mid}
            title="Your clinical voice, always on"
            tagline="Presence multiplied."
            description="Your therapeutic method becomes adaptive infrastructure. Your frameworks, your language, your timing."
            backIntro="Your method becomes self-steering software that extends your presence between sessions without depleting you."
            features={[
              {
                icon: Brain,
                label: 'Clinical Translation',
                color: '#5739FB',
                ticks: [
                  'Your method becomes self-steering software clients access anytime',
                  'Therapeutic voice carries forward exactly as you would deliver it',
                  'Intelligence adapts your approach to each client\'s neurobiology'
                ]
              },
              {
                icon: Heart,
                label: 'Extension, Not Replacement',
                color: '#40E0D0',
                ticks: [
                  'You remain the architect, the platform is the builder',
                  'Your presence extends between sessions without depleting you',
                  'Depth maintained across every client without linear time investment'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Clinical%20translation.avif"
            gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
            animationDelay={0.2}
          />

          {/* 2. Signal before sessions - Walk in knowing */}
          <FlipTileClassWithFeatures
            icon={Zap}
            iconColor={BRAND.dark}
            title="Signal before sessions"
            tagline="Walk in knowing."
            description="No more 'how was your week?' Real-time intelligence surfaces where they are before they arrive."
            backIntro="Sessions become application, not reconstruction. You walk in knowing exactly where they are."
            features={[
              {
                icon: Activity,
                label: 'Readiness Intelligence',
                color: '#06B6D4',
                ticks: [
                  'See nervous system patterns and engagement signals pre-session',
                  'Know what they practiced, what landed, what they struggled with',
                  'Same playing field from minute one, no time wasted catching up'
                ]
              },
              {
                icon: Target,
                label: 'Proactive Precision',
                color: '#F59E0B',
                ticks: [
                  'Dysregulation alerts show when they need support between sessions',
                  'Progress patterns reveal what\'s working before they articulate it',
                  'You act with surgical precision instead of compassionate guessing'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Adaptive%20timing.avif"
            gradientOverlay="linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)"
            animationDelay={0.3}
          />

          {/* 3. Autonomy that scales you - Agency honored */}
          <FlipTileClassWithFeatures
            icon={Compass}
            iconColor={BRAND.cyan}
            title="Autonomy that scales you"
            tagline="Agency honored."
            description="Clients take the wheel with your map. Their self-direction becomes your leverage."
            backIntro="Better outcomes without more of your time. Self-regulation capacity reduces crises and scales your impact."
            features={[
              {
                icon: Compass,
                label: 'Client-Led Practice',
                color: '#40E0D0',
                ticks: [
                  'They engage with your frameworks autonomously between sessions',
                  'Snap-in curriculum fills gaps without adding to your workload',
                  'Self-regulation capacity reduces crisis calls and emergency sessions'
                ]
              },
              {
                icon: TrendingUp,
                label: 'Sustainable Impact',
                color: '#10B981',
                ticks: [
                  'You design once, the platform delivers infinitely',
                  'Identity-level change happens in their life, not just your office',
                  'Clinical depth scales without burning you out'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Scalable%20depth.avif"
            gradientOverlay="linear-gradient(135deg, rgba(64, 224, 208, 0.75) 0%, rgba(64, 224, 208, 0.60) 100%)"
            animationDelay={0.4}
          />

          {/* 4. Practice that compounds - Success loops */}
          <FlipTileClassWithFeatures
            icon={TrendingUp}
            iconColor="#10B981"
            title="Practice that compounds"
            tagline="Success loops."
            description="Better outcomes create retention. Retention creates stability. Stability lets you do your best work."
            backIntro="The system reinforces itself. Your success creates conditions for more success."
            features={[
              {
                icon: BarChart3,
                label: 'Symbiotic Economics',
                color: '#10B981',
                ticks: [
                  'Continuous support increases retention and reduces churn',
                  'Data validates your clinical quality for referrals and credibility',
                  'Sustainable revenue model aligns with sustainable practice'
                ]
              },
              {
                icon: CheckCircle2,
                label: 'Professional Elevation',
                color: '#5739FB',
                ticks: [
                  'Your method becomes your differentiator in competitive markets',
                  'Neuroadaptive technology positions you as cutting-edge',
                  'You\'re not just a therapist, you\'re a therapeutic architect'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Between-session%20engine.avif"
            gradientOverlay="linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(16, 185, 129, 0.60) 100%)"
            animationDelay={0.5}
          />

        </div>

      </div>
    </section>
  );
}
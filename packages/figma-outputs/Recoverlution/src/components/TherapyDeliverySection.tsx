/**
 * THERAPY DELIVERY SECTION
 * Section 5 in therapy page narrative flow
 * 
 * Purpose: Show therapists HOW the innovation reaches clients
 * Pattern: RIGHT-aligned header + 2 flip tiles (console vs companion)
 * Target: Time-poor therapists - scannable, bite-sized chunks
 * 
 * Left Tile: Your Console (what you see/control)
 * Right Tile: Their Companion (what clients experience)
 * 
 * This bridges Innovation (S4) → Vehicle (S6)
 */

import { Monitor, Smartphone, ArrowRight, Gauge, BarChart3, Sliders, Bell, Footprints, Heart, Shield, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { FlipTileClassWithFeatures } from './marketing/universal/FlipTileClassWithFeatures';

const BRAND = {
  practitioner: '#5739FB',
  client: '#40E0D0'
};

export default function TherapyDeliverySection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header - RIGHT ALIGNED PATTERN */}
        <div className="section-header-right">
          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subheading">
              You see signals and control. Clients feel support and structure. Two experiences, one system, in real time.
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
              <ArrowRight size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE DELIVERY</span>
            </div>
            <h2 className="section-headline-therapy">
              Signals surface.<br />
              <span className="accent">Care carries.</span>
            </h2>
          </motion.div>
        </div>

        {/* 2 Flip Tiles */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT: Your Console */}
          <FlipTileClassWithFeatures
            icon={Monitor}
            iconColor={BRAND.practitioner}
            title="Your console"
            tagline="Signal. Control."
            description="Clinical intelligence without noise or data overwhelm."
            backIntro="Practice management meets clinical intelligence. Everything you need to scale depth without losing the human thread."
            features={[
              {
                icon: Sliders,
                label: 'Clinical Design',
                color: '#5739FB',
                ticks: [
                  'Assign pathways based on clinical criteria and readiness',
                  'Customize journey content to align with your frameworks',
                  'Set delivery cadence that matches therapeutic goals'
                ]
              },
              {
                icon: BarChart3,
                label: 'Intelligence Signals',
                color: '#3E2BB8',
                ticks: [
                  'Pre-session engagement signals show readiness before they arrive',
                  'Risk indicators surface before clients hit crisis',
                  'Clean interface with signal, not noise or data overwhelm'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Clinical%20translation.avif"
            gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
            animationDelay={0.2}
          />

          {/* RIGHT: Their Companion */}
          <FlipTileClassWithFeatures
            icon={Smartphone}
            iconColor={BRAND.client}
            title="Their companion"
            tagline="Support. Structure."
            description="Practices fit real life without pressure or friction."
            backIntro="Recovery happens in life, not just in sessions. The companion carries your therapeutic presence into everyday moments."
            features={[
              {
                icon: Footprints,
                label: 'Daily Practice',
                color: '#40E0D0',
                ticks: [
                  'Two to five minute practices designed for real life rhythms',
                  'Adaptive timing delivers when nervous system signals readiness',
                  'Micro-interventions build momentum without cognitive overwhelm'
                ]
              },
              {
                icon: Shield,
                label: 'Held Structure',
                color: '#0891B2',
                ticks: [
                  'Progress builds through consistency, not punishing streaks',
                  'Privacy protected with local processing and encrypted signals',
                  'Always available support without replacing therapeutic relationship'
                ]
              }
            ]}
            backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/theinnovation/Adaptive%20timing.avif"
            gradientOverlay="linear-gradient(135deg, rgba(64, 224, 208, 0.75) 0%, rgba(64, 224, 208, 0.60) 100%)"
            animationDelay={0.3}
          />

        </div>

      </div>
    </section>
  );
}
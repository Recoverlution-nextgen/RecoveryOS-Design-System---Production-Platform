/**
 * MARKETING THERAPY PAGE V2
 * 
 * The 7th marketing page for B2B2C offering (independent recovery professionals).
 * 
 * Target Audience: Independent therapists, recovery coaches, counselors, and recovery professionals
 * Goal: Self-discovery → direct signup (no sales theater)
 * Flow: Storytelling approach that walks practitioner through the journey
 * 
 * Structure:
 * 1. Hero - The work holds between sessions
 * 2. Intro Bridge - 3 tiles (Continuity, Neuroadaptive progress, Ethical economics)
 * 3. Authority - Your work is deep, week is noisy + 3 problem cards
 * 4. Bridge Statement - Recoverlution transforms the space between sessions
 * 5. The Innovation - What Recoverlution IS (4 bite-sized concepts in 2x2 grid)
 * 6. The Delivery - How Recoverlution delivers
 * 7. The Vehicle - Complete platform architecture (5-tile deep dive)
 * 8. The Authority - Why trust it (Six Pillars + Method as Infrastructure)
 * 9. Clinical Evidence Bridge - Validated by Science (4 stats proving efficacy)
 * 10. The Architecture - Combined Delivery + Features
 * 11. Getting Started - 3 simple steps
 * 12. Pricing - Two paths
 * 13. Trust & Safety - 3 cards
 * 14. Your Practice - What you keep/lose (3 powerful outcomes)
 * 15. Explore the System - Discovery Component (THE WOW MOMENT)
 * 16. Final CTA - ONE button: Create Your Account
 * 
 * Design System: infiniteK (platform.css patterns, universal components)
 * Created: November 27, 2025
 * Updated: December 4, 2025 - Added Section 6 (The Delivery) bridge
 */

import React from 'react';
import { 
  Heart,
  Activity,
  Link,
  Settings, 
  TrendingUp,
  Clock,
  BarChart3,
  Zap,
  Brain,
  Shield,
  Lock,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
  Radio,
  Signal,
  GitBranch,
  Repeat,
  DollarSign,
  Calendar,
  LineChart,
  FileText,
  TrendingDown,
  Users,
  Target,
  Bell,
  Layers,
  Footprints,
  MapPin,
  Gauge
} from 'lucide-react';
import { motion } from 'motion/react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { HeroClass } from '../marketing/universal/HeroClass';
import TherapyInnovationSectionV3 from '../TherapyInnovationSectionV3';
import TherapyClientExperienceInteractive from '../TherapyClientExperienceInteractive';
import PricingExperience from '../therapy/PricingExperience';
import TherapyVehicleSection from '../TherapyVehicleSection';
import TherapyAuthoritySection from '../TherapyAuthoritySection';
import { FlipTileClassWithFeatures } from '../marketing/universal/FlipTileClassWithFeatures';
import { VisualDiscoveryEngine } from '../discovery/VisualDiscoveryEngine';
import { JourneyStepsFlow } from '../therapy/JourneyStepsFlow';
import { ClinicalEvidenceBridge } from '../therapy/ClinicalEvidenceBridge';
import FinalCTAClean from '../FinalCTAClean';
import { TherapyPlatformLayers } from '../therapy/TherapyPlatformLayers';
import TherapyFeaturesArchitecture from '../therapy/TherapyFeaturesArchitecture';

interface MarketingTherapyPageProps {
  onEnterPlatform?: () => void;
  onNavigate?: (page: string) => void;
  onCreateAccount?: () => void;
}

export default function MarketingTherapyPage({ 
  onEnterPlatform, 
  onNavigate, 
  onCreateAccount 
}: MarketingTherapyPageProps) {

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="For Recovery Professionals | Recoverlution"
        description="Turn see you next week into we're holding you all week. Recoverlution is the continuity layer for independent recovery professionals delivering subscription-based care."
        canonicalUrl="/therapy"
      />

      {/* Header */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onEnterPlatform}
        currentPage="therapy"
      />

      {/* 1. HERO */}
      <HeroClass
        eyebrow="FOR RECOVERY PROFESSIONALS"
        eyebrowIcon={
          <Sparkles 
            size={14}
            style={{ strokeWidth: 2.5 }} 
          />
        }
        headline={
          <>
            Therapeutic<br />
            <span style={{ color: '#40E0D0' }}>
              Continuity.
            </span>
          </>
        }
        subheadline="Transform your therapeutic standard into continuous care. Episodic becomes everlasting."
        ctaText="EXPLORE"
        ctaOnClick={() => onCreateAccount?.()}
        backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/hero/Therapy_Hero-2-2.avif"
        backgroundAssetAlt="Abstract neural network representing continuity and therapeutic connection between sessions"
        backgroundFilter="brightness(0.75) saturate(1.2)"
        overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.4) 0%, rgba(10, 25, 47, 0.2) 50%, rgba(10, 25, 47, 0.4) 100%)"
        contentAlignment="center"
      />

      {/* 2. INTRO BRIDGE */}
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
                <Activity size={14} style={{ strokeWidth: 2.5 }} />
                <span>THE TRANSFORMATION LAYER</span>
              </div>
              <h2 className="section-headline-therapy">
                Sessions end.<br />
                <span className="accent">Support continues.</span>
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
                A private companion for clients. A signal console for you. Sustainable. Symbiotic. Transformative.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FlipTileClassWithFeatures
              icon={Link}
              iconColor="#5739FB"
              title="Therapeutic continuity"
              tagline={<>Therapy<br />holds.</>}
              description="Threads bind between sessions."
              backIntro="Relationship-driven care carrying forward even when you're not in the room. Your presence becomes infrastructure."
              features={[
                {
                  icon: Signal,
                  label: 'Real Time Signal',
                  color: '#5739FB',
                  ticks: [
                    'Clients engage with practices between sessions',
                    'You receive readiness signals before they arrive',
                    'The therapeutic thread never goes slack or silent'
                  ]
                },
                {
                  icon: Radio,
                  label: 'Continuous Presence',
                  color: '#3E2BB8',
                  ticks: [
                    'Care carries forward when you\'re not in the room',
                    'Your therapeutic relationship becomes infrastructure',
                    'Continuity replaces episodic disconnection'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Symbiotic%20Continuity.avif"
              gradientOverlay="linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)"
              animationDelay={0.2}
            />

            <FlipTileClassWithFeatures
              icon={Brain}
              iconColor="#5739FB"
              title="Neuroadaptive progress"
              tagline={<>Pathways<br />connect.</>}
              description="Therapy in the flow of life."
              backIntro="Not talk therapy extended. Recovery through discovery and lived experience. The work happens in life, not just in sessions."
              features={[
                {
                  icon: GitBranch,
                  label: 'Experiential Learning',
                  color: '#5739FB',
                  ticks: [
                    'Patient-driven discovery in real time',
                    'Neural pathways strengthen through repeated experience',
                    'Therapeutic depth through lived practice, not just insight'
                  ]
                },
                {
                  icon: Repeat,
                  label: 'Compounding Progress',
                  color: '#7C3AED',
                  ticks: [
                    'Progress builds on progress, momentum compounds',
                    'Measurable outcomes show therapeutic impact',
                    'Recovery through embodied change, not aspirational hope'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Neuroadaptive%20Progress.avif"
              gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
              animationDelay={0.3}
            />

            <FlipTileClassWithFeatures
              icon={Heart}
              iconColor="#40E0D0"
              title="Ethical economics"
              tagline={<>Outcomes<br />compound.</>}
              description="Lifelong capacity to rely on."
              backIntro="Relationship-driven economics that respect both the work and the client. Predictable revenue meets therapeutic integrity."
              features={[
                {
                  icon: DollarSign,
                  label: 'Sustainable Model',
                  color: '#40E0D0',
                  ticks: [
                    'Monthly commitment creates predictable revenue',
                    'Always-on presence without burnout or 24/7 availability',
                    'Sustainable for you, accessible for them'
                  ]
                },
                {
                  icon: Calendar,
                  label: 'Recurring Relationships',
                  color: '#0891B2',
                  ticks: [
                    'Episodic sessions become ongoing partnerships',
                    'Revenue compounds with relational depth',
                    'Economic model respects both the work and the client'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Ethical%20Economics.avif"
              gradientOverlay="linear-gradient(135deg, rgba(64, 224, 208, 0.75) 0%, rgba(64, 224, 208, 0.60) 100%)"
              animationDelay={0.4}
            />
          </div>

        </div>
      </section>

      {/* 2. AUTHORITY SECTION */}
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
                Your time is finite. Recovery is timeless. You shine the light, we hold it steady between sessions.
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
                <AlertCircle size={14} style={{ strokeWidth: 2.5 }} />
                <span>THE REALITY</span>
              </div>
              <h2 className="section-headline-therapy">
                Clarity lands.<br />
                <span className="accent">Weeks break down.</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FlipTileClassWithFeatures
              icon={Heart}
              iconColor="#E85D75"
              title="Between session fade"
              tagline={<>Insight<br />decays.</>}
              description="Episodic gaps dissolve progress."
              backIntro="Sessions become recap instead of progress. Breakthrough moments dissolve in the gap. The work you both did together unravels without a holding structure."
              features={[
                {
                  icon: TrendingDown,
                  label: 'Insight Decay',
                  color: '#E85D75',
                  ticks: [
                    'Breakthroughs peak in session then fade within hours',
                    'Clients face triggers alone without practiced responses',
                    'Clarity evaporates without reinforcement between meetings'
                  ]
                },
                {
                  icon: FileText,
                  label: 'Method Trapped',
                  color: '#DC2626',
                  ticks: [
                    'Your intellectual property stays in your head',
                    'Clinical method cannot scale without infrastructure',
                    'Recap replaces progress when continuity fails'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Between%20session%20fade.avif"
              gradientOverlay="linear-gradient(135deg, rgba(232, 93, 117, 0.25) 0%, rgba(232, 93, 117, 0.15) 100%)"
              animationDelay={0.2}
            />

            <FlipTileClassWithFeatures
              icon={Clock}
              iconColor="#F59E0B"
              title="Time for money trap"
              tagline={<>Capacity<br />caps.</>}
              description="Revenue locked to hours worked."
              backIntro="Scheduling cannot rely on momentum when every week starts from zero and nothing compounds. Your earning potential stays locked to hours in the day."
              features={[
                {
                  icon: DollarSign,
                  label: 'Episodic Revenue',
                  color: '#F59E0B',
                  ticks: [
                    'You sell sessions, not ongoing partnerships',
                    'Revenue model rewards volume, not depth or outcomes',
                    'Financial sustainability depends on constant bookings'
                  ]
                },
                {
                  icon: Target,
                  label: 'Capacity Ceiling',
                  color: '#D97706',
                  ticks: [
                    'Hours in the week limit earning potential',
                    'Momentum cannot compound when each week resets',
                    'No infrastructure to scale your clinical impact'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/Time%20for%20money%20trap.avif"
              gradientOverlay="linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)"
              animationDelay={0.3}
            />

            <FlipTileClassWithFeatures
              icon={BarChart3}
              iconColor="#8B5CF6"
              title="The evidence gap"
              tagline={<>Impact<br />invisible.</>}
              description="Change confined to anecdote."
              backIntro="Commissioners, insurers, and referrers want measurable outcomes you cannot show. Impact remains invisible without data infrastructure."
              features={[
                {
                  icon: LineChart,
                  label: 'Invisible Impact',
                  color: '#8B5CF6',
                  ticks: [
                    'You know the work changes lives but cannot prove it',
                    'Anecdotal stories do not satisfy outcome requirements',
                    'Stuck reactive instead of proactively demonstrating value'
                  ]
                },
                {
                  icon: Users,
                  label: 'Credibility Barrier',
                  color: '#7C3AED',
                  ticks: [
                    'Commissioners and insurers demand measurable outcomes',
                    'Referrers want proof of effectiveness you cannot provide',
                    'Attendance tracking does not demonstrate therapeutic impact'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section2/The%20evidence%20gap.avif"
              gradientOverlay="linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)"
              animationDelay={0.4}
            />
          </div>

        </div>
      </section>

      {/* 3. THE PLATFORM - Three Layer System */}
      <TherapyPlatformLayers />

      {/* 4. BRIDGE SECTION - THE CONTINUITY LAYER */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/hero/lost_space.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bridge-background-overlay" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          
          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex items-center gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap size={14} className="icon-eyebrow" />
            <span className="bridge-eyebrow">
              THE CONTINUITY LAYER
            </span>
          </motion.div>

          {/* Main Statement */}
          <motion.h2
            className="bridge-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Recoverlution transforms the space between sessions into continuous care.
          </motion.h2>

          {/* Supporting Statement */}
          <motion.p
            className="bridge-subtext"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A continuity layer that carries your method into everyday decisions and sends the signal back.
          </motion.p>

        </div>
      </section>

      {/* 5. THE VEHICLE - Complete platform architecture (5-tile deep dive) */}
      <TherapyVehicleSection />

      {/* 6. THE INNOVATION - What Recoverlution IS */}
      <TherapyInnovationSectionV3 />

      {/* 7. THE AUTHORITY - Why trust it (Six Pillars + Method as Infrastructure) */}
      <TherapyAuthoritySection />

      {/* 8. BRIDGE SECTION - THE IMPLEMENTATION LAYER */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/hero/lost_space.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bridge-background-overlay" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          
          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex items-center gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap size={14} className="icon-eyebrow" />
            <span className="bridge-eyebrow">
              THE IMPLEMENTATION LAYER
            </span>
          </motion.div>

          {/* Main Statement */}
          <motion.h2
            className="bridge-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Understanding becomes action. Method becomes practice.
          </motion.h2>

          {/* Supporting Statement */}
          <motion.p
            className="bridge-subtext"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Setup in minutes. Choose your model. Start transforming sessions into continuous care.
          </motion.p>

        </div>
      </section>

      {/* 9. THE ARCHITECTURE - Combined Delivery + Features */}
      <TherapyFeaturesArchitecture />

      {/* 10. GETTING STARTED - JOURNEY FLOW */}
      <section className="py-20 md:py-32 bg-white">
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
                From signup to first client in under an hour. Clinical depth without operational complexity.
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
                <Zap size={14} style={{ strokeWidth: 2.5 }} />
                <span>GETTING STARTED</span>
              </div>
              <h2 className="section-headline-therapy">
                Setup systemised.<br />
                <span className="accent">Impact compounds.</span>
              </h2>
            </motion.div>
          </div>

          {/* Journey Steps */}
          <JourneyStepsFlow
            steps={[
              {
                number: '01',
                title: 'Sync your flow',
                subtitle: 'Workflow fits you. Not the other way around.',
                details: [
                  'Calendar connects. Google, Outlook, iCal. Bookings sync automatically.',
                  'Video platform. Zoom, Doxy, SimplePractice. Or use ours. HIPAA built in.',
                  'Content library. Import your frameworks or use our six-pillar evidence-based system.',
                  'Client roster. Manual add or secure invite link. Guided intake handles onboarding.'
                ],
                assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section%204/Sync%20your%20flow-2.avif'
              },
              {
                number: '02',
                title: 'Choose your model',
                subtitle: 'Revenue architecture that serves clinical vision.',
                details: [
                  'Add continuity alongside session fees. Clients pay monthly for therapeutic time plus companion access. You earn margin.',
                  'Include continuity inside packages. Four sessions plus three months companion support. You set price. You choose structure.',
                  'Control visibility. Show continuity on your site, in intake, or offer selectively based on clinical fit.',
                  'Switch anytime. Adjust pricing. Pause or activate per client. Total flexibility.'
                ],
                assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section%204/Choose%20your%20model.avif'
              },
              {
                number: '03',
                title: 'Invite your first clients',
                subtitle: 'Relationship extends. Insight surfaces. Impact multiplies.',
                details: [
                  'Send link or QR code. Clients download app, accept terms, start their first journey.',
                  'Assign practices based on clinical need. Two to five minute interventions between sessions. Regulation. Connection. Meaning. Identity.',
                  'See signals before they arrive. Readiness score, activity patterns, risk indicators. Not every message. Just what matters.',
                  'Refine in real time. Adjust journeys. Celebrate momentum. Companion extends therapeutic relationship. Never replaces it.'
                ],
                assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section%204/Invite%20your%20first%20clients.avif'
              }
            ]}
          />

        </div>
      </section>

      {/* 11. PRICING */}
      <PricingExperience />

      {/* 12. CLINICAL EVIDENCE BRIDGE - Validated by Science */}
      <ClinicalEvidenceBridge />

      {/* 13. TRUST & SAFETY */}
      <section className="py-20 md:py-32 bg-white">
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
                Privacy by design. Clinical boundaries honored. Regulatory compliance built in. Architecture that respects vulnerability.
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
                <span>TRUST & SAFETY</span>
              </div>
              <h2 className="section-headline-therapy">
                Privacy sealed.<br />
                <span className="accent">Scrutiny welcomed.</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FlipTileClassWithFeatures
              icon={Lock}
              iconColor="#3E2BB8"
              title="Privacy by default"
              tagline="Signal. Privacy."
              description="You see trends and signals without diary entries."
              backIntro="Architecture designed for trust. Clients own their data. You receive the signal that matters for clinical decisions. Privacy by design, not by promise."
              features={[
                {
                  icon: Shield,
                  label: 'Client Data Sovereignty',
                  color: '#3E2BB8',
                  ticks: [
                    'Detailed client reflections stay encrypted on their device',
                    'You receive high-level signals and readiness scores',
                    'No diary entries exposed unless client chooses to share'
                  ]
                },
                {
                  icon: ShieldCheck,
                  label: 'Sensitive Population Design',
                  color: '#4C1D95',
                  ticks: [
                    'Privacy architecture respects vulnerability of recovery',
                    'Regulatory compliance built in for behavioral health',
                    'Trust maintained through technical design, not policy alone'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Privacy%20by%20default.avif"
              gradientOverlay="linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)"
              animationDelay={0.2}
            />

            <FlipTileClassWithFeatures
              icon={HeartHandshake}
              iconColor="#10B981"
              title="Trauma aware design"
              tagline="Systems regulated."
              description="Calm language and pacing that respects nervous systems."
              backIntro="Every design decision considers nervous system regulation. No red streaks. No shame spirals. No unexpected intensity. The interface itself is therapeutic."
              features={[
                {
                  icon: Heart,
                  label: 'Regulated Experience',
                  color: '#10B981',
                  ticks: [
                    'Calm language throughout the interface',
                    'Clear opt out options at every step',
                    'No surprise escalations or unexpected intensity'
                  ]
                },
                {
                  icon: Activity,
                  label: 'Nervous System First',
                  color: '#059669',
                  ticks: [
                    'Pacing designed to support regulation not overwhelm',
                    'No gamification or guilt-inducing progress metrics',
                    'Every interaction honors the difficulty of recovery work'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Trauma%20aware%20design.avif"
              gradientOverlay="linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(16, 185, 129, 0.60) 100%)"
              animationDelay={0.3}
            />

            <FlipTileClassWithFeatures
              icon={ShieldCheck}
              iconColor="#06B6D4"
              title="Clinical grade security"
              tagline="Scrutiny welcomed."
              description="Encryption and compliance built for behavioral health standards."
              backIntro="Enterprise security infrastructure meets behavioral health compliance requirements. HIPAA ready. SOC 2 certified. Built to pass audits and protect vulnerable populations."
              features={[
                {
                  icon: Lock,
                  label: 'Security Infrastructure',
                  color: '#06B6D4',
                  ticks: [
                    'End-to-end encryption for all client communications',
                    'Role-based access controls and audit trails',
                    'Clear escalation protocols when risk indicators appear'
                  ]
                },
                {
                  icon: CheckCircle2,
                  label: 'Compliance Ready',
                  color: '#0891B2',
                  ticks: [
                    'HIPAA compliant architecture and business associate agreements',
                    'SOC 2 Type II certification for data security',
                    'Built to respect clinical boundaries and regulatory scrutiny'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Clinical%20grade%20security.avif"
              gradientOverlay="linear-gradient(135deg, rgba(6, 182, 212, 0.75) 0%, rgba(6, 182, 212, 0.60) 100%)"
              animationDelay={0.4}
            />
          </div>

        </div>
      </section>

      {/* 16. EXPLORE THE SYSTEM - Discovery Component (THE WOW MOMENT) */}
      <VisualDiscoveryEngine 
        onSignupComplete={(userId, email) => {
          console.log('✅ Therapist signed up:', userId, email);
          // Auto-login and navigate to platform
          setTimeout(() => {
            onEnterPlatform?.();
          }, 2000); // 2 second delay to show success message
        }}
      />

      {/* 17. YOUR PRACTICE */}
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
                <Briefcase size={14} style={{ strokeWidth: 2.5 }} />
                <span>YOUR PRACTICE</span>
              </div>
              <h2 className="section-headline-therapy">
                Standards held.<br />
                <span className="accent">Burden lifted.</span>
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
                Same therapeutic autonomy. Less administrative burden. Better signal before sessions. Stronger outcomes for clients.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FlipTileClassWithFeatures
              icon={TrendingUp}
              iconColor="#10B981"
              title="Deeper clinical impact"
              tagline="Sessions deepen."
              description="Readiness signals transform sessions from recap into application."
              backIntro="Transform from episodic sessions into continuous therapeutic presence. The work you both do together compounds instead of fading between meetings."
              features={[
                {
                  icon: Target,
                  label: 'Preparation Transforms Sessions',
                  color: '#10B981',
                  ticks: [
                    'See readiness signals before they arrive or log on',
                    'Drop straight into application instead of reconstructing the week',
                    'Sessions become about skill building and progress, not recap'
                  ]
                },
                {
                  icon: LineChart,
                  label: 'Measurable Progress',
                  color: '#059669',
                  ticks: [
                    'Track engagement patterns and therapeutic momentum',
                    'Demonstrate outcomes with data that respects privacy',
                    'Your clinical impact becomes visible and provable'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/Pre%20session%20snapshots.avif"
              gradientOverlay="linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(16, 185, 129, 0.60) 100%)"
              animationDelay={0.2}
            />

            <FlipTileClassWithFeatures
              icon={DollarSign}
              iconColor="#5739FB"
              title="Sustainable practice"
              tagline="Revenue recurs."
              description="Monthly partnerships replace episodic sessions without burning out."
              backIntro="Transform from the time-for-money trap into sustainable recurring revenue. Your earning potential is no longer locked to hours in the day."
              features={[
                {
                  icon: Calendar,
                  label: 'Recurring Revenue Model',
                  color: '#5739FB',
                  ticks: [
                    'Monthly commitment creates predictable cash flow',
                    'Continuity subscriptions add margin to your existing model',
                    'Revenue compounds with relational depth and client retention'
                  ]
                },
                {
                  icon: Users,
                  label: 'Capacity Multiplied',
                  color: '#4C1D95',
                  ticks: [
                    'Impact grows without adding more session hours',
                    'Always-on presence without burnout or 24/7 availability',
                    'Scale your clinical reach while maintaining therapeutic depth'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/Less%20recap,%20more%20work.avif"
              gradientOverlay="linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)"
              animationDelay={0.3}
            />

            <FlipTileClassWithFeatures
              icon={Sparkles}
              iconColor="#06B6D4"
              title="Professional evolution"
              tagline="Architect emerges."
              description="Your clinical method becomes infrastructure clients rely on."
              backIntro="Transform from reactive clinician into proactive architect of recovery. The work you've refined over years becomes scalable infrastructure."
              features={[
                {
                  icon: Settings,
                  label: 'Method Becomes Infrastructure',
                  color: '#06B6D4',
                  ticks: [
                    'Your clinical approach scales beyond your hours',
                    'Intellectual property transforms into systematic delivery',
                    'Therapeutic wisdom carries forward through the platform'
                  ]
                },
                {
                  icon: Shield,
                  label: 'Reputation Built on Evidence',
                  color: '#0891B2',
                  ticks: [
                    'Demonstrate therapeutic impact with measurable outcomes',
                    'Attract referrers and commissioners with provable results',
                    'Your practice evolves from anecdotes into evidence'
                  ]
                }
              ]}
              backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/One%20clean%20console.avif"
              gradientOverlay="linear-gradient(135deg, rgba(6, 182, 212, 0.75) 0%, rgba(6, 182, 212, 0.60) 100%)"
              animationDelay={0.4}
            />
          </div>

        </div>
      </section>

      {/* 18. FINAL CTA - Universal Component */}
      <FinalCTAClean 
        backgroundAsset="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/lastsectionhero/Therapy_Last.avif"
        eyebrow="READY WHEN YOU ARE"
        headline="We're holding you"
        accentWord="all week"
        subtext="Create your account. Invite a handful of clients. Let the system carry some of the load. So you can focus on the work only you can do."
        buttonText="CREATE YOUR ACCOUNT"
        onButtonClick={() => onCreateAccount?.()}
      />

      {/* Footer */}
      <MarketingFooter onNavigate={onNavigate} />

    </div>
  );
}
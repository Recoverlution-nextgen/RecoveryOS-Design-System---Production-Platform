/**
 * MARKETING PLATFORM PAGE - EXHIBITION-LEVEL REFINED
 * 
 * Mission: Show the Recoverlution Platform with infiniteK premium DNA
 * Design DNA: Dark gradients, glass overlays, sophisticated animations
 * Philosophy: Apple-grade elegance meets therapeutic depth
 * 
 * Last Refined: November 5, 2025
 */

import { useState } from 'react';
import { ArrowRight, PlayCircle, Compass, Sparkles, Heart, BookOpen, Activity, TrendingUp, Users, Network, Zap, Brain, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import { STRUCTURED_DATA } from '../../utils/structuredData';
import { PLATFORM_MOCKUPS } from '../../utils/assetManifest';
import { HeroClass } from '../marketing/universal/HeroClass';

// Hero Asset - Nov 6, 2025 Optimized
import { heroPlatformOptimized } from '../../utils/heroAssets';
import journeyMockup from 'figma:asset/84ff9ebafa03b3eefabb1e28511b30c01dd18981.png';
import navicueMockup from 'figma:asset/c52155c7db5c8e0c8dd82b160f4ba0bd910c216d.png';
import lumaMockup from 'figma:asset/f58a7d53edb9854bd9ed77000e3d549b7d7e37f4.png';
import navigateMockup from 'figma:asset/07b56dd6094e6e25c3abc68e4175bc9be2c0ecd5.png';
import wellbeingMockup from 'figma:asset/ed4945fe5858fcf7c2780c70f0bf770de6758894.png';
import toolkitMockup from 'figma:asset/012ce7fa6f45bfaaabaf8a10064ecde7cd973034.png';
import stateMockup from 'figma:asset/93682b82cbca6d2997d1e639074882103fded6c3.png'; // Hero mockup (NOT the tile)
import momentumMockup from 'figma:asset/5ae0aa866b809bbc17410fc39c0e73d3540b6baa.png'; // Hero mockup (NOT the tile)
import therapistPortalMockup from 'figma:asset/ce9be134e40aa10909dcad2a9673095571bc2b0d.png';
import connectedCareMockup from 'figma:asset/5abccc4c7d1561e76e7593d9dd10176ea69c97a8.png';

// NEW: On-brand pattern backgrounds for left tiles and right feature views
import journeyPatternLeft from 'figma:asset/82918bfa007b267084aefd5213da9a9cadd5236d.png'; // Journey left tile pattern (flowing blue)
import journeyPatternRight from 'figma:asset/ba6417cb742d37b8c944362d12d7d7ccc9a3913d.png'; // ✅ NEW: Journey right tile - ERA framework interface
import navicuesPatternLeft from 'figma:asset/010ba7580bec464d6abeb3608708f6c153eac4a2.png'; // Navicues left tile pattern (flowing blue waves)
import navicuesPatternRight from 'figma:asset/4403550caddab7839e4e5239cfc0e8c541aa4211.png'; // ✅ NEW: Navicue right tile - Living Your Values focus frame
import lumaPatternLeft from 'figma:asset/6c1e1a2c4955fb203706b530cd13e11059b56af8.png'; // LUMA left tile pattern (blue geometric)
import lumaPatternRight from 'figma:asset/1125bf22f75a4dd2e92b8d6521dcdfec41d4c754.png'; // ✅ NEW: LUMA right tile - Morning Intention Setting interface
import navigatePatternLeft from 'figma:asset/fd636da83753bed0ddfd36379220e7e6c8d0cbc9.png'; // Navigate left tile pattern (teal layered geometric)
import navigatePatternRight from 'figma:asset/be2a0dae261a746b2059a1fb8d5d8f7f2a7b374b.png'; // ✅ NEW: Navigate right tile - People and places interface
import wellbeingPatternLeft from 'figma:asset/c6c65d52f9c5969f1584e65a51bdaa9f0124f0d0.png'; // Wellbeing left tile pattern (teal flowing geometric)
import wellbeingPatternRight from 'figma:asset/b04d646bf2f9c3740c3e0718f653b3d5e819d73e.png'; // ✅ NEW: Wellbeing right tile - Meditation and Breathwork library
import toolkitPatternLeft from 'figma:asset/0b2b2eb6c6510b57ee624c53a60d43f2951c7132.png'; // Toolkit left tile pattern (teal flowing abstract)
import toolkitPatternRight from 'figma:asset/afa59140cab8105c383b7c050fdd8e041a0314eb.png'; // ✅ NEW: Toolkit right tile - 24/7 Recovery Resources hub
import statePatternLeft from 'figma:asset/5b8bbc86c1772fdfb55442b8097202ee64f67517.png'; // State left tile pattern (purple flowing waves)
import statePatternRight from 'figma:asset/408bd8c3f192bdf61d305e91ee139e3f9f597010.png'; // ✅ REFINED: State right tile - Better positioned health metrics (Vitality/Focus/Awareness)
import momentumPatternLeft from 'figma:asset/0c06915a4dad06892d10b0c143b2551c355b2c13.png'; // Momentum left tile pattern (purple flowing waves)
import momentumPatternRight from 'figma:asset/69b299b7ad05f7a9f3e639407b6632407b0dab1f.png'; // ✅ REFINED: Momentum right tile - Better positioned Anchor In dashboard
import therapistPatternLeft from 'figma:asset/0f5c52893f48cb0b7934def06b45a4ce45840c11.png'; // Therapist Portal left tile pattern (cyan flowing waves)
import therapistPatternRight from 'figma:asset/d9d78fba880a1c389dee6c7935a6786773dfd330.png'; // ✅ NEW: Therapist Portal right tile - Dr. Sarah Chen therapist profile card
import connectedCarePatternLeft from 'figma:asset/a2c39dad8d9cf90d50cb37101b2e130b69af2cb4.png'; // Connected Care left tile pattern (cyan flowing)
import connectedCarePatternRight from 'figma:asset/f556f59164e466167a6ba3eebf600ccbd93d08ee.png'; // ✅ NEW: Connected Care right tile - Patient app interface (Journey/Navicues/State)

// MOBILE ASSETS - Section 1: "Built for rehabs. Designed for patients." (3 of 3 complete ✨)
import journeyPatternRightMobile from 'figma:asset/984572780be6c3a16b51c761e586dfd0fa8f57c0.png'; // 📱 MOBILE: Journey - Tablet with "Understanding" content portrait view
import navicuesPatternRightMobile from 'figma:asset/1f6ec51ef29bc64d0f5af82ce15701393c3b5c3b.png'; // 📱 MOBILE: Navicues - Phone with "Living Your Values" closeup
import lumaPatternRightMobile from 'figma:asset/0e9d61bcb485ca605b40ac4915bcec3124e7c551.png'; // 📱 MOBILE: LUMA - Phone with "Begin Process" UI optimized

// MOBILE ASSETS - Section 2: "Wisdom that waits. Support that finds you." (3 of 3 complete ✨)
import navigatePatternRightMobile from 'figma:asset/47d96ae5860648cd16622d4693f6b9a94e8dbd01.png'; // 📱 MOBILE: Navigate - Tablet with scheduling/sessions interface
import wellbeingPatternRightMobile from 'figma:asset/e7149790b9c2fe4be12fc8e6ff192304f7b88c19.png'; // 📱 MOBILE: Wellbeing - Tablet with video library grid
import toolkitPatternRightMobile from 'figma:asset/e146859b5783ee8c8b27cb39a07c4aa6fb7e8577.png'; // 📱 MOBILE: Toolkit - Tablet with articles library

// MOBILE ASSETS - Section 3: "Data that empowers. Patterns that illuminate." (2 of 2 complete ✨)
import statePatternRightMobile from 'figma:asset/b83bd6852eba4c1f0dc8f155e36f7686dfc6ded0.png'; // 📱 MOBILE: State - Phone with health metrics (Vitality/Focus)
import momentumPatternRightMobile from 'figma:asset/4e16fc8e31a06c5ad2ab19528037444baad000d5.png'; // 📱 MOBILE: Momentum - Laptop with dashboard on gradient

// MOBILE ASSETS - Section 4: "Teams stay aligned. Trust stays intact." (2 of 2 complete ✨)
import therapistPatternRightMobile from 'figma:asset/0f5dcf7081007ed0b4f62514a404455286143186.png'; // 📱 MOBILE: Therapist Portal - Phone with Dr. Sarah Chen profile
import connectedCarePatternRightMobile from 'figma:asset/ab0c0e7f6720f14780e6d50b4e0588f69ee5a060.png'; // 📱 MOBILE: Connected Care - Phone with Journey cards

import { FeatureSection } from '../PlatformFeaturesSectionNew';
import { HumanBaselineSection } from '../HumanBaselineSection';
import { MultiDeviceContinuitySection } from '../MultiDeviceContinuitySection';
import FinalCTAClean from '../FinalCTAClean';
import platformFinalCTAAsset from 'figma:asset/811aec4b473de34c3a124a152f7c4f129ce27d83.png'; // Final CTA - Star under dome (FIXED)

// PLATFORM FEATURES DATA - All 10 features
const platformFeatures = [
  {
    id: 'journey',
    name: 'Journey',
    icon: Compass,
    tagline: 'Guided Pathway',
    powerStatement: 'Recovery, orchestrated.',
    // NEW: Snappy follow-up line (works with playful headline)
    teaserDescription: 'Structured weekly programs that build neural pathways through repetition.',
    // Detailed copy for right overlay (unchanged)
    description: 'Structured programs using ERA micro-cycles to convert insight into consistent practice.',
    longDescription: 'Weekly journeys built on the Experience → Reflect → Anchor framework. Each journey delivers targeted therapeutic content mapped to recovery milestones, creating measurable behavior change through repetition and reflection.',
    impact: 'Transforms passive treatment into active practice through structured, repeatable behavioral frameworks',
    mechanism: 'ERA cycle architecture (Experience → Reflect → Anchor) repeated weekly to build neural pathways through consistent therapeutic engagement',
    color: '#3E2BB8', // SECTION 1: Brand Blue (shared across all 3)
    image: journeyMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: journeyPatternLeft,  // Left tile background
    patternRight: journeyPatternRight,  // Right tile background (with mockup)
    patternRightMobile: journeyPatternRightMobile,  // 📱 MOBILE: Tablet "Understanding" portrait
    // NEW: BuzzTags for visual balance
    buzzTags: ['ERA Framework', 'Neural Pathways', 'Behavioral Change']
  },
  {
    id: 'navicues',
    name: 'Navicues',
    icon: Sparkles,
    tagline: 'Navigation Cues',
    powerStatement: 'Guidance, everywhere.',
    teaserDescription: 'Therapeutic micro-interventions that redirect attention at exactly the right moment.',
    description: 'Building blocks integrated into seamless therapeutic flow, delivered when needed most.',
    longDescription: 'Micro-interventions designed to redirect attention and reinforce healthy patterns. Navicues appear contextually throughout the platform, creating a continuous therapeutic presence without overwhelming the patient.',
    impact: 'Creates continuous therapeutic presence through contextual micro-interventions that redirect attention without overwhelming',
    mechanism: 'Adaptive content delivery system serving targeted building blocks based on user state, journey progress, and therapeutic goals',
    color: '#3E2BB8', // SECTION 1: Brand Blue (shared across all 3)
    image: navicueMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: navicuesPatternLeft,  // Left tile background
    patternRight: navicuesPatternRight,  // Right tile background (with mockup)
    patternRightMobile: navicuesPatternRightMobile,  // 📱 MOBILE: Phone "Living Your Values" closeup
    buzzTags: ['Micro-Interventions', 'Adaptive Delivery', 'Contextual Flow']
  },
  {
    id: 'luma',
    name: 'LUMA',
    icon: Sparkles,
    tagline: 'AI Companion',
    powerStatement: 'Intelligence that cares.',
    teaserDescription: 'Your always-on companion that learns, adapts, and delivers support when you need it most.',
    description: 'Emotionally intelligent companion that adapts to patient state and provides contextual guidance.',
    longDescription: 'Your always-on therapeutic companion. LUMA learns your patterns, understands your state, and delivers the right support at the right moment. From daily check-ins to crisis intervention, LUMA scales human care with AI precision.',
    impact: 'Scales clinical care 24/7 through emotionally intelligent responses that adapt to patient state and therapeutic context',
    mechanism: 'Pattern recognition AI trained on recovery trajectories, delivering contextual support from check-ins to crisis intervention',
    color: '#3E2BB8', // SECTION 1: Brand Blue (shared across all 3)
    image: lumaMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: lumaPatternLeft,  // Left tile background
    patternRight: lumaPatternRight,  // Right tile background (with mockup)
    patternRightMobile: lumaPatternRightMobile,  // 📱 MOBILE: Phone "Begin Process" UI optimized
    buzzTags: ['Pattern Recognition', '24/7 Support', 'Emotional Intelligence']
  },
  {
    id: 'navigate',
    name: 'Navigate',
    icon: Compass,
    tagline: 'Connected Network',
    powerStatement: 'Your people, always on.',
    teaserDescription: 'One hub connecting you to therapists, peers, meetings, and every resource you need.',
    description: 'Your support network, always on. Therapists, community, meetings, and resources in one place.',
    longDescription: 'The connection hub. Find meetings, message your therapist, connect with peers, and access your full care team. Navigate breaks down silos and creates a unified support ecosystem around each patient.',
    impact: 'Breaks down care silos by unifying therapists, peers, meetings, and resources into one accessible support ecosystem',
    mechanism: 'Integrated communication platform connecting patients to clinical teams, peer community, meeting networks, and recovery resources',
    color: '#0891B2', // SECTION 2: Teal (shared across all 3)
    image: navigateMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: navigatePatternLeft,  // Left tile background
    patternRight: navigatePatternRight,  // Right tile background (with tablet mockup)
    patternRightMobile: navigatePatternRightMobile,  // 📱 MOBILE: Tablet scheduling/sessions interface
    buzzTags: ['Unified Ecosystem', 'Peer Connection', 'Care Team Access']
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing',
    icon: Heart,
    tagline: 'Mind · Body · Soul',
    powerStatement: 'Peace, practiced daily.',
    teaserDescription: 'Breathwork, movement, and meditation to regulate your nervous system, every single day.',
    description: 'Curated videos with somatic integration. Regulation tools for daily practice and resilience.',
    longDescription: 'Your personal wellness library. From breathwork to movement to meditation, Wellbeing delivers evidence-based practices for nervous system regulation. Each video is tagged to specific states and therapeutic goals.',
    impact: 'Builds nervous system regulation capacity through daily practice of evidence-based somatic and mindfulness techniques',
    mechanism: 'Curated video library of breathwork, movement, and meditation practices tagged to emotional states and therapeutic objectives',
    color: '#0891B2', // SECTION 2: Teal (shared across all 3)
    image: wellbeingMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: wellbeingPatternLeft,  // Left tile background
    patternRight: wellbeingPatternRight,  // Right tile background (with tablet mockup)
    patternRightMobile: wellbeingPatternRightMobile,  // 📱 MOBILE: Tablet video library grid
    buzzTags: ['Somatic Integration', 'Nervous System', 'Daily Practice']
  },
  {
    id: 'toolkit',
    name: 'Toolkit',
    icon: BookOpen,
    tagline: 'Practical Library',
    powerStatement: 'Knowledge, when you need it.',
    teaserDescription: 'Your recovery encyclopedia. Searchable articles and practices delivered exactly when you need them.',
    description: 'Articles, practices, exercises. Evidence-based resources to support every stage of recovery.',
    longDescription: 'Your recovery encyclopedia. Searchable, tagged, and organized by pillar and micro-block. The Toolkit delivers psychoeducation and practical tools exactly when patients need them, building knowledge that compounds over time.',
    impact: 'Delivers contextual psychoeducation and practical tools precisely when needed, building compounding therapeutic knowledge',
    mechanism: 'Searchable resource library organized by pillar and micro-block, surfacing relevant articles and practices based on journey context',
    color: '#0891B2', // SECTION 2: Teal (shared across all 3)
    image: toolkitMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: toolkitPatternLeft,  // Left tile background
    patternRight: toolkitPatternRight,  // Right tile background (with tablet mockup)
    patternRightMobile: toolkitPatternRightMobile,  // 📱 MOBILE: Tablet articles library
    buzzTags: ['Psychoeducation', 'Pillar Mapping', 'Knowledge Base']
  },
  {
    id: 'state',
    name: 'State',
    icon: Activity,
    tagline: 'Daily Check-In',
    powerStatement: 'Your truth, measured.',
    teaserDescription: 'Track Energy, Clarity, and Anchorage daily to build your personal recovery signature.',
    description: 'Track your state across three neural dimensions. Energy, Clarity, Anchorage measured daily.',
    longDescription: 'The heartbeat of your recovery data. State captures three critical dimensions every day: Energy (nervous system activation), Clarity (cognitive function), and Anchorage (emotional stability). This data powers insights, triggers interventions, and builds your personal recovery signature.',
    impact: 'Creates personal recovery signature through daily measurement of Energy, Clarity, and Anchorage states',
    mechanism: 'Three-dimensional daily check-in system tracking nervous system activation, cognitive function, and emotional stability',
    color: '#5739FB', // SECTION 3: Purple (shared across both)
    image: stateMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: statePatternLeft,  // Left tile background
    patternRight: statePatternRight,  // Right tile background (with phone mockup)
    patternRightMobile: statePatternRightMobile,  // 📱 MOBILE: Phone with health metrics (Vitality/Focus)
    buzzTags: ['Three Dimensions', 'Recovery Signature', 'Daily Tracking']
  },
  {
    id: 'momentum',
    name: 'Momentum',
    icon: TrendingUp,
    tagline: 'Data Insights',
    powerStatement: 'Progress, visualized.',
    teaserDescription: 'Beautiful data visualizations that reveal patterns, predict risks, and celebrate every win.',
    description: 'Visualize progress, identify patterns, see stability over time. Your recovery metrics dashboard.',
    longDescription: 'Your recovery story in data. Momentum transforms daily check-ins and engagement metrics into beautiful visualizations that reveal patterns, predict risks, and celebrate wins. See the arc of your recovery unfold over weeks and months.',
    impact: 'Reveals recovery patterns and predicts risks through beautiful visualizations of longitudinal engagement and state data',
    mechanism: 'Data transformation engine converting daily check-ins and engagement metrics into trend analysis, pattern recognition, and predictive insights',
    color: '#5739FB', // SECTION 3: Purple (shared across both)
    image: momentumMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: momentumPatternLeft,  // Left tile background
    patternRight: momentumPatternRight,  // Right tile background (with laptop mockup)
    patternRightMobile: momentumPatternRightMobile,  // 📱 MOBILE: Laptop with dashboard on gradient
    buzzTags: ['Pattern Recognition', 'Risk Prediction', 'Trend Analysis']
  },
  {
    id: 'therapist',
    name: 'Therapist Portal',
    icon: Users,
    tagline: 'Control Center',
    powerStatement: 'Clinical care, amplified.',
    teaserDescription: 'Mission control for clinicians. Build journeys, monitor progress, and customize everything.',
    description: 'Curate sessions, manage events, and customize programming. Your facility. Your platform.',
    longDescription: 'Mission control for clinicians. Build journeys, schedule sessions, monitor patient progress, and customize every aspect of the therapeutic experience. The Therapist Portal puts clinical teams in the driver seat.',
    impact: 'Amplifies clinical effectiveness by giving therapists complete control over journey design, session delivery, and patient monitoring',
    mechanism: 'Comprehensive clinical dashboard for journey curation, session scheduling, progress monitoring, and platform customization',
    color: '#40E0D0', // SECTION 4: Cyan (shared across both)
    image: therapistPortalMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: therapistPatternLeft,  // Left tile background
    patternRight: therapistPatternRight,  // Right tile background (with phone mockup)
    patternRightMobile: therapistPatternRightMobile,  // 📱 MOBILE: Phone with Dr. Sarah Chen profile
    buzzTags: ['Journey Curation', 'Progress Monitoring', 'Platform Control']
  },
  {
    id: 'connected-care',
    name: 'Connected Care',
    icon: Network,
    tagline: 'Ethical Integration',
    powerStatement: 'Integration, done right.',
    teaserDescription: 'Seamless EHR integration with privacy-by-design architecture that puts patients first.',
    description: 'Privacy-first patient management with clinical care integrations. Clinical depth meets ethical design.',
    longDescription: 'The integration layer. Connected Care bridges Recoverlution with your EHR, scheduling systems, and clinical workflows. All the power of integration with privacy-by-design architecture that puts patient data sovereignty first.',
    impact: 'Bridges platform with existing clinical systems while maintaining privacy-by-design architecture and data sovereignty',
    mechanism: 'HIPAA-compliant integration layer connecting EHR, scheduling, and clinical workflows with privacy-first data architecture',
    color: '#40E0D0', // SECTION 4: Cyan (shared across both)
    image: connectedCareMockup,
    isMockup: true,
    // NEW: Pattern backgrounds
    patternLeft: connectedCarePatternRight,  // Left tile background
    patternRight: connectedCarePatternLeft,  // Right tile background (with phone mockup)
    patternRightMobile: connectedCarePatternRightMobile,  // 📱 MOBILE: Phone with Journey cards
    buzzTags: ['Privacy-First', 'EHR Integration', 'Data Sovereignty']
  }
];

// Platform mockups
const dashboardMockupDefault = PLATFORM_MOCKUPS.dashboard.url;
const journeyMockupDefault = PLATFORM_MOCKUPS.journey.url;
const navicuesMockupDefault = PLATFORM_MOCKUPS.navicues.url;
const lumaMockupDefault = PLATFORM_MOCKUPS.luma.url;

interface MarketingPlatformPageProps {
  onBack: () => void;
  onScheduleDemo: () => void;
  onNavigate: (page: string) => void;
  onLogin?: () => void;
  heroDesktopMockup?: string;
  dashboardMockup?: string;
  journeyMockup?: string;
  navicuesMockup?: string;
  lumaMockup?: string;
}

export function MarketingPlatformPage({
  onBack,
  onScheduleDemo,
  onNavigate,
  onLogin,
  heroDesktopMockup,
  dashboardMockup,
  journeyMockup,
  navicuesMockup,
  lumaMockup
}: MarketingPlatformPageProps) {
  const [selectedFeature1, setSelectedFeature1] = useState(platformFeatures[0]); // Journey section
  const [selectedFeature2, setSelectedFeature2] = useState(platformFeatures[3]); // Navigate section
  const [selectedFeature3, setSelectedFeature3] = useState(platformFeatures[6]); // State section
  const [selectedFeature4, setSelectedFeature4] = useState(platformFeatures[8]); // Therapist section
  const seo = getPageSEO('platform');

  const finalHeroDesktop = heroDesktopMockup || dashboardMockupDefault;
  const finalDashboard = dashboardMockup || dashboardMockupDefault;
  const finalJourney = journeyMockup || journeyMockupDefault;
  const finalNavicues = navicuesMockup || navicuesMockupDefault;
  const finalLuma = lumaMockup || lumaMockupDefault;

  return (
    <>
      <SEOHead 
        {...seo}
        structuredData={[
          STRUCTURED_DATA.softwareApplication,
          STRUCTURED_DATA.breadcrumbs([
            { name: 'Home', url: 'https://recoverlution.com' },
            { name: 'Platform', url: 'https://recoverlution.com/platform' }
          ])
        ]}
      />

      {/* Master Marketing Header */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onLogin}
        currentPage="platform"
      />

      {/* 🎨 HERO - Universal Component */}
      <HeroClass
        eyebrow="YOUR RECOVERY OPERATING SYSTEM"
        eyebrowIcon={
          <Zap 
            size={14}
            style={{ strokeWidth: 2.5 }} 
          />
        }
        headline={
          <>
            Transform aftercare<br />
            into{' '}
            <span style={{ color: '#40E0D0' }}>
              continuous care
            </span>
          </>
        }
        subheadline="Bridging inpatient transition to accelerate outcomes and drive sustainable, predictable, real-world results."
        customContent={
          <motion.div
            className="flex items-center justify-center gap-6 md:gap-12 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <div 
                className="text-[#40E0D0] mb-2"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(64, 224, 208, 0.6), 0 4px 16px rgba(0, 0, 0, 0.9)'
                }}
              >
                6
              </div>
              <div 
                className="text-white/90 uppercase tracking-wider"
                style={{
                  fontSize: 'clamp(0.6875rem, 1.5vw, 0.8125rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  whiteSpace: 'nowrap'
                }}
              >
                Pillars
              </div>
            </div>

            <div 
              style={{ 
                width: '1px', 
                height: 'clamp(40px, 8vw, 60px)', 
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
                alignSelf: 'center'
              }} 
            />

            <div className="flex flex-col items-center">
              <div 
                className="text-[#40E0D0] mb-2"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(64, 224, 208, 0.6), 0 4px 16px rgba(0, 0, 0, 0.9)'
                }}
              >
                365
              </div>
              <div 
                className="text-white/90 uppercase tracking-wider"
                style={{
                  fontSize: 'clamp(0.6875rem, 1.5vw, 0.8125rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  whiteSpace: 'nowrap'
                }}
              >
                Days Care
              </div>
            </div>

            <div 
              style={{ 
                width: '1px', 
                height: 'clamp(40px, 8vw, 60px)', 
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
                alignSelf: 'center'
              }} 
            />

            <div className="flex flex-col items-center">
              <div 
                className="text-[#40E0D0] mb-2"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(64, 224, 208, 0.6), 0 4px 16px rgba(0, 0, 0, 0.9)'
                }}
              >
                ∞
              </div>
              <div 
                className="text-white/90 uppercase tracking-wider"
                style={{
                  fontSize: 'clamp(0.6875rem, 1.5vw, 0.8125rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  whiteSpace: 'nowrap'
                }}
              >
                Scale
              </div>
            </div>
          </motion.div>
        }
        ctaText="SCHEDULE DEMO"
        ctaOnClick={onScheduleDemo}
        ctaIcon={<ArrowRight size={24} className="transition-transform group-hover:translate-x-1.5 duration-400" />}
        backgroundAsset={heroPlatformOptimized}
        backgroundAssetAlt="Abstract flowing blue 3D gradient representing seamless recovery platform continuity and therapeutic integration architecture"
        backgroundFilter="brightness(0.85) saturate(1.1)"
        overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
      />

      {/* 🎨 THE HUMAN BASELINE - BOOKEND SECTION (BEFORE FEATURES) */}
      <HumanBaselineSection />

      {/* 🎨 SECTION 1: STRUCTURED PATHWAYS - LEFT LAYOUT */}
      <FeatureSection
        title="STRUCTURED PATHWAYS"
        description="Built for rehabs. Designed for patients."
        features={[platformFeatures[0], platformFeatures[1], platformFeatures[2]]}
        selectedFeature={selectedFeature1}
        onSelectFeature={setSelectedFeature1}
        layout="left"
        sectionColor="#3E2BB8"
      />

      {/* 🎨 SECTION 2: CONTEXTUAL INTELLIGENCE - RIGHT LAYOUT */}
      <FeatureSection
        title="CONTEXTUAL INTELLIGENCE"
        description="Wisdom that waits. Support that finds you."
        features={[platformFeatures[3], platformFeatures[4], platformFeatures[5]]}
        selectedFeature={selectedFeature2}
        onSelectFeature={setSelectedFeature2}
        layout="right"
        sectionColor="#0891B2"
      />

      {/* 🎨 SECTION 3: FOUNDATIONAL ALIGNMENT - LEFT LAYOUT */}
      <FeatureSection
        title="FOUNDATIONAL ALIGNMENT"
        description="Data that empowers. Patterns that illuminate."
        features={[platformFeatures[6], platformFeatures[7]]}
        selectedFeature={selectedFeature3}
        onSelectFeature={setSelectedFeature3}
        layout="left"
        sectionColor="#5739FB"
      />

      {/* 🎨 SECTION 4: COLLABORATIVE CARE - RIGHT LAYOUT */}
      <FeatureSection
        title="COLLABORATIVE CARE"
        description="Teams stay aligned. Trust stays intact."
        features={[platformFeatures[8], platformFeatures[9]]}
        selectedFeature={selectedFeature4}
        onSelectFeature={setSelectedFeature4}
        layout="right"
        sectionColor="#40E0D0"
      />

      {/* 🎨 MULTI-DEVICE CONTINUITY - BOOKEND SECTION (AFTER FEATURES) */}
      <MultiDeviceContinuitySection />

      {/* FINAL CTA - CLEAN */}
      <FinalCTAClean 
        backgroundAsset={platformFinalCTAAsset}
        eyebrow="EXPERIENCE THE PLATFORM"
        headline="Recovery engineered for life"
        accentWord="engineered"
        subtext="See how the Recoverlution Platform transforms treatment delivery. Schedule a personalized demo and discover the power of OS, ORBIT, and PROOF working together."
        buttonText="SCHEDULE DEMO"
        onButtonClick={onScheduleDemo}
      />

      {/* Master Marketing Footer */}
      <MarketingFooter onNavigate={onNavigate} />
    </>
  );
}
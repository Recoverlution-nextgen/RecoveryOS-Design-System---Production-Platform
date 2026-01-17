/**
 * DISCOVERY ENGINE DATA
 * 
 * Complete module library and onwards paths for infinite exploration.
 * Based on comprehensive content audit (60+ modules).
 * 
 * Created: December 10, 2025
 */

import {
  Activity,
  TrendingUp,
  Layers,
  Zap,
  Shield,
  GitBranch,
  Building2,
  Maximize2,
  Target,
  Award,
  Link,
  Brain,
  Heart,
  Clock,
  BarChart3,
  DollarSign,
  Sparkles,
  Lock,
  HeartHandshake,
  ShieldCheck,
  FlaskConical,
  Network,
  Play,
  Sunrise,
  Radio,
  Anchor,
  LifeBuoy,
  Compass,
  BookOpen,
  Lightbulb,
  Backpack,
  LineChart,
  Users,
  AlertCircle,
  Video,
  Calendar,
  CreditCard,
  FileText,
  UserCircle,
  HeartPulse,
  Activity as ActivityPulse,
  PieChart,
  Shield as ShieldAlert
} from 'lucide-react';

// Types
export interface AssetSpecification {
  type: 'device-mockup' | 'screenshot' | 'interface-detail' | 'close-up' | 'workflow' | 'data-viz' | 'split-screen';
  description: string;
  aspectRatio: '16:9' | '9:16' | '4:3' | '1:1' | '21:9';
  composition?: string; // Optional: specific framing notes
  images?: string[]; // Optional: actual image URLs for slider
}

export interface FeatureShowcaseContent {
  overview: {
    headline: string;
    tagline: string;
    assetSpec: AssetSpecification;
  };
  detail: {
    headline: string;
    features: Array<{
      icon: React.ElementType;
      title: string;
      description: string;
    }>;
    assetSpec: AssetSpecification;
  };
}

export interface ExplorationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export interface ExplorationModule {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  type: 'REVEAL_TILE' | 'DEEP_DIVE' | 'JOURNEY_WALKTHROUGH' | 'DUAL_PERSPECTIVE' | 'ORCHESTRATION_VIS' | 'EVIDENCE_SHOWCASE' | 'HELP_US_HELP_YOU' | 'SUBSCRIPTION_FLOW' | 'FEATURE_DEEP_DIVE' | 'FEATURE_SHOWCASE';
  exploreNext?: string[]; // Child modules for hierarchical exploration
  content?: {
    backgroundAsset?: string;
    gradientOverlay?: string;
    features?: Array<{
      icon: React.ElementType;
      title: string;
      description: string;
      color: string;
      deepDive?: string[];
    }>;
    featureShowcase?: FeatureShowcaseContent;
  };
}

export interface OnwardsPath {
  id: string;
  label: string;
  targetModuleId: string;
  context?: string;
}

// CATEGORIES (10 exploration zones - OPTION C)
export const CATEGORIES: ExplorationCategory[] = [
  {
    id: 'features',
    name: 'Features',
    description: 'The tools',
    icon: Sparkles,
    color: '#E85D75'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'The research',
    icon: FlaskConical,
    color: '#5AB9EA'
  },
  {
    id: 'pillars',
    name: 'Pillars',
    description: 'The framework',
    icon: Layers,
    color: '#9B87F5'
  },
  {
    id: 'continuity',
    name: 'Continuity',
    description: 'The thread',
    icon: Activity,
    color: '#F59E42'
  },
  {
    id: 'system',
    name: 'System',
    description: 'The architecture',
    icon: Network,
    color: '#7ED957'
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    description: 'The engine',
    icon: Zap,
    color: '#FF6B9D'
  },
  {
    id: 'practice',
    name: 'Practice',
    description: 'The workflow',
    icon: Building2,
    color: '#4ECDC4'
  },
  {
    id: 'evidence',
    name: 'Evidence',
    description: 'The proof',
    icon: TrendingUp,
    color: '#FFD93D'
  },
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'The trust',
    icon: Shield,
    color: '#6BCF7F'
  },
  {
    id: 'start',
    name: 'Start',
    description: 'The journey',
    icon: Play,
    color: '#5739FB'
  }
];

// MODULES (100+ explorable experiences)
export const MODULES: ExplorationModule[] = [
  // ========================================
  // FEATURES - COMPANION LAYER (11 modules)
  // The client-facing tools that transform recovery
  // ========================================
  {
    id: 'feature-journeys',
    categoryId: 'features',
    title: 'Journeys',
    subtitle: 'Seeds, not courses',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Journeys',
          tagline: 'Seeds that transform you',
          shineThrough: {
            title: 'Seeds, not courses',
            description: 'Weekly experiences designed to ping in real-world moments. Not information to complete, but awareness that transforms.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Journey start screen with seed metaphor visual. Soft, organic interface with "Today\'s Seed" title and ERA framework preview (Experience → Recognize → Anchor). Earthy, growth-oriented color palette.',
            aspectRatio: '9:16',
            composition: 'Device centered, showing full journey interface with visible ERA steps',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/halfscreen/journey1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/halfscreen/journey2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/halfscreen/journey3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/halfscreen/journey4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/halfscreen/journey5.avif'
            ]
          }
        },
        detail: {
          headline: 'How Journeys work',
          features: [
            {
              icon: Sunrise,
              title: 'Experience seeds, not information',
              description: 'Weekly journeys designed to ping in real-world moments. Not courses to complete, but experiences that transform.'
            },
            {
              icon: Brain,
              title: 'Get you out of autopilot',
              description: 'Like the driving journey you don\'t remember. Journeys create moments of awareness where new neural pathways can form.'
            },
            {
              icon: Anchor,
              title: 'The 7-step transformation',
              description: 'Experience → Recognize → Witness → Challenge → Walk Through → Anchor → Embody. Theory becomes felt and believed.'
            },
            {
              icon: Target,
              title: 'Chosen by the Mindcraft Ball',
              description: 'Red/amber/green weighted algorithm. Your journey emerges from the areas needing most attention. Dynamic, never linear.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Journey examples showing ERA framework and transformation steps.',
            aspectRatio: '9:16',
            composition: 'Full device showing Journey interface with visible ERA steps and seed metaphor',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/fullscreen/journey1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/fullscreen/journey2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/fullscreen/journey3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/fullscreen/journey4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/journey/fullscreen/journey5.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-navicues',
    categoryId: 'features',
    title: 'NaviCues',
    subtitle: 'Play, not notifications',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'NaviCues',
          tagline: 'Curve balls that wake you up',
          shineThrough: {
            title: 'Play that transforms you',
            description: 'Playful cognition cues that map the story, break the status quo and spark new neural pathways.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing unexpected NaviCue prompt. Playful, surprising interface that breaks pattern. Question that makes you stop and think. Bright, engaging color with subtle animation suggestion.',
            aspectRatio: '9:16',
            composition: 'Device showing NaviCue in context of daily moment (e.g., afternoon walk notification)',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How NaviCues work',
          features: [
            {
              icon: Radio,
              title: 'Purposeful disruption',
              description: 'Throw curve balls so you stop and think. "That wasn\'t what I expected you to ask." These are THE moments.'
            },
            {
              icon: Brain,
              title: 'Spark multiple neural pathways',
              description: 'Not reinforcement. Acceleration. Playful mind games with no right answer, designed to create awareness.'
            },
            {
              icon: Compass,
              title: 'Proactive, not reactive',
              description: 'NaviCues find you throughout the day. Rescues meet you when struggling. Both map, both transform.'
            },
            {
              icon: Network,
              title: 'Everything is mapped',
              description: 'Every interaction feeds the Mindcraft Ball. Mapping your mind\'s perceptual view, one question at a time.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen NaviCue examples showing the complete interface with readable copy and interactive elements.',
            aspectRatio: '9:16',
            composition: 'Full device showing NaviCue interface with visible text and UI elements',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-wellbeing',
    categoryId: 'features',
    title: 'Wellbeing',
    subtitle: 'Tools, not tasks',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Wellbeing',
          tagline: 'Grounded practices that anchor you',
          shineThrough: {
            title: 'Tools, not tasks',
            description: 'Practical tools that meet you where you are. Not routines to follow, but resources that ground you when you need them most.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Wellbeing tools interface. Clean, accessible design with immediate tools like breathwork, grounding exercises, and body check-ins. Calm, supportive color palette with instant accessibility.',
            aspectRatio: '9:16',
            composition: 'Device centered, showing wellbeing tool selection with clear visual hierarchy',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/halfscreen/wellbeing1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/halfscreen/wellbeing2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/halfscreen/wellbeing3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/halfscreen/wellbeing4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/halfscreen/wellbeing5.avif'
            ]
          }
        },
        detail: {
          headline: 'How Wellbeing works',
          features: [
            {
              icon: Heart,
              title: 'Grounded, not gamified',
              description: 'Practical tools that anchor you in the moment. Breathwork, body scans, grounding techniques. Real support, not points and streaks.'
            },
            {
              icon: Compass,
              title: 'Meet you where you are',
              description: 'Whether dysregulated or just checking in. Tools adapt to your state. Quick rescues or deeper practices, always accessible.'
            },
            {
              icon: Activity,
              title: 'Body-first awareness',
              description: 'Recovery lives in the body. Tools that help you notice, regulate, and ground. Sensations before thoughts, presence before analysis.'
            },
            {
              icon: Anchor,
              title: 'Always there when needed',
              description: 'No prerequisites, no unlocking. Wellbeing tools are available whenever you need them. Your foundation, always accessible.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Wellbeing examples showing various tools in action with clear instructions and interfaces.',
            aspectRatio: '9:16',
            composition: 'Full device showing Wellbeing tool interfaces with visible instructions and calming visuals',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/fullscreen/wellbeing1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/fullscreen/wellbeing2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/fullscreen/wellbeing3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/fullscreen/wellbeing4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/wellbeing/fullscreen/wellbeing5.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-rescues',
    categoryId: 'features',
    title: 'Rescues',
    subtitle: 'Support when you need it',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Rescues',
          tagline: 'Meet you in the mood of the moment',
          shineThrough: {
            title: 'Support when biology takes over',
            description: 'Mood-matched tools that meet you where you are. Anxious, triggered, overwhelmed. Immediate access when you need it most.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Rescue selection screen. Emotionally intelligent interface with mood-based filters (anxious, triggered, overwhelmed, etc.). Calm, grounding color palette.',
            aspectRatio: '9:16',
            composition: 'Device showing Rescue library organized by emotional state',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How Rescues work',
          features: [
            {
              icon: LifeBuoy,
              title: 'Reactive, not proactive',
              description: 'NaviCues find you. Rescues are there when you\'re struggling. Different tools for different moments.'
            },
            {
              icon: Heart,
              title: 'Mood-matched support',
              description: 'Anxious? Triggered? Overwhelmed? Rescues meet you where you are with exactly what you need right now.'
            },
            {
              icon: Clock,
              title: 'Immediate access',
              description: 'No navigation, no friction. When biology takes over, support is one tap away.'
            },
            {
              icon: Network,
              title: 'Feeds the intelligence',
              description: 'Every Rescue used maps your patterns. What you reach for when struggling tells us what you need.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Rescue examples showing the complete interface with mood-based selection and guided practices.',
            aspectRatio: '9:16',
            composition: 'Full device showing Rescue interface with visible emotional state matching',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-state',
    categoryId: 'features',
    title: 'STATE',
    subtitle: 'Morning signal that maps you',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'STATE',
          tagline: 'Three dimensions, one signature',
          shineThrough: {
            title: 'Morning signal that maps you',
            description: 'Energy. Clarity. Anchorage. Not how you feel, where you are. One check-in becomes everything.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing STATE check-in screen. Three-slider interface (Energy, Clarity, Anchorage). Clean, minimal, morning-appropriate color palette. Visual representation of 3D signal.',
            aspectRatio: '9:16',
            composition: 'Device centered showing three sliders with current position marked',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/STATE/STATE_half.avif'
            ]
          }
        },
        detail: {
          headline: 'How STATE works',
          features: [
            {
              icon: Sunrise,
              title: 'Morning signal, not mood tracking',
              description: 'Energy. Clarity. Anchorage. Three dimensions create your signature. Not how you feel, where you are.'
            },
            {
              icon: LineChart,
              title: 'Patterns across time',
              description: 'One check-in means nothing. Weeks of data reveal everything. Baselines, inflection points, trajectories.'
            },
            {
              icon: Zap,
              title: 'Feeds everything',
              description: 'STATE flows to LUMA flows to Momentum. Morning signal becomes evening conversation becomes evidence.'
            },
            {
              icon: Brain,
              title: 'Weights the Mindcraft Ball',
              description: 'Red zones get attention. Green zones get reinforcement. Your journey emerges from your signal.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen STATE examples showing the three-slider interface and pattern visualization over time.',
            aspectRatio: '9:16',
            composition: 'Full device showing STATE interface with visible sliders and data patterns',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/STATE/STATE_full.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-luma',
    categoryId: 'features',
    title: 'LUMA',
    subtitle: 'Newsfeed that knows you',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'LUMA',
          tagline: 'Next-generation aggregation engine',
          shineThrough: {
            title: 'Intelligence that knows you',
            description: 'Journey cues. NaviCues. Rescues. Practices. All filtered by what you need now. Three options, always your choice.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing LUMA feed. Intelligent newsfeed interface showing 3 recommended next steps (Journey cue, NaviCue, Practice). Netflix-style "?" button visible. Evening-appropriate warm colors.',
            aspectRatio: '9:16',
            composition: 'Device showing personalized feed with visible recommendation logic',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How LUMA works',
          features: [
            {
              icon: Sparkles,
              title: 'Aggregates everything for you',
              description: 'Journey cues. NaviCues. Rescues. Practices. Articles. Insights. All filtered by what you need now.'
            },
            {
              icon: Target,
              title: 'Three options, not one prescription',
              description: 'Recommended next step plus two alternatives. "?" button gives you three more. Always your choice.'
            },
            {
              icon: Radio,
              title: 'Ask it anything',
              description: 'Text, video, voice message. "I\'m feeling anxious about my session tomorrow." LUMA reaggregates.'
            },
            {
              icon: Clock,
              title: 'Evening conversation',
              description: 'Morning STATE signals. Evening LUMA responds. Daily rhythm of check-in and support.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen LUMA examples showing the aggregation interface and personalized recommendations.',
            aspectRatio: '9:16',
            composition: 'Full device showing LUMA interface with visible recommendation engine',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-toolkit',
    categoryId: 'features',
    title: 'Toolkit',
    subtitle: 'Your backpack of what works',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Toolkit',
          tagline: 'Library + Insights + Practices + Saved',
          shineThrough: {
            title: 'Your backpack of what works',
            description: 'Searchable psychoeducation. Deep-dive courses. Somatic practices. Everything that works for you in one place.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Toolkit navigation. Four clear sections (Library, Insights, Practices, Saved). Organized, searchable, authoritative interface. Professional purple brand color.',
            aspectRatio: '9:16',
            composition: 'Device showing Toolkit home with four entry points clearly visible',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/halfscreen/toolkit1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/halfscreen/toolkit2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/halfscreen/toolkit3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/halfscreen/toolkit4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/halfscreen/toolkit5.avif'
            ]
          }
        },
        detail: {
          headline: 'How Toolkit works',
          features: [
            {
              icon: BookOpen,
              title: 'Library',
              description: 'Searchable psychoeducation organized by pillar and theme. Knowledge when curiosity opens.'
            },
            {
              icon: Lightbulb,
              title: 'Insights',
              description: 'Linear micro-courses for deep dives. When an article sparks interest and you want to go deeper.'
            },
            {
              icon: HeartPulse,
              title: 'Practices',
              description: 'Somatic and cognitive exercises embedded in articles and insights. Tools to regulate when biology needs it.'
            },
            {
              icon: Backpack,
              title: 'Saved',
              description: 'Your journey backpack. Everything that works for you in one place. Your personalized toolkit.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Toolkit examples showing all four sections in use.',
            aspectRatio: '9:16',
            composition: 'Full device showing Toolkit interface with visible Library, Insights, Practices, and Saved sections',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/fullscreen/toolkit1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/fullscreen/toolkit2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/fullscreen/toolkit3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/fullscreen/toolkit4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/toolkit/fullscreen/toolkit5.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-reflections',
    categoryId: 'features',
    title: 'Reflections',
    subtitle: 'Integration that anchors you',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Reflections',
          tagline: 'End-of-day integration',
          shineThrough: {
            title: 'Integration that anchors you',
            description: 'Open-ended evening prompts. Voice notes or text. Make sense of what happened, anchor what matters.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing evening Reflection prompt. Soft, calming interface with open-ended question. Space for voice note or text. Night-mode appropriate colors.',
            aspectRatio: '9:16',
            composition: 'Device showing Reflection interface with voice/text options visible',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How Reflections work',
          features: [
            {
              icon: Anchor,
              title: 'Anchor the day',
              description: 'Morning STATE signals. Day unfolds. Evening Reflection integrates. What landed? What shifted?'
            },
            {
              icon: Brain,
              title: 'Voice or text',
              description: 'Speak it or write it. Reflections meet you in the mode that works. No friction, just integration.'
            },
            {
              icon: Network,
              title: 'Feeds the story',
              description: 'Every reflection maps your inner world. Story emerges. Patterns surface. Therapist sees what matters.'
            },
            {
              icon: LineChart,
              title: 'Your timeline',
              description: 'Scroll back through weeks. See how perspectives shifted. Evidence of transformation you lived through.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Reflection examples showing the evening prompts and historical timeline.',
            aspectRatio: '9:16',
            composition: 'Full device showing Reflection interface with visible prompts and timeline',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-momentum',
    categoryId: 'features',
    title: 'Momentum',
    subtitle: 'Patterns that prove progress',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Momentum',
          tagline: 'Beautiful data that speaks',
          shineThrough: {
            title: 'Patterns that prove progress',
            description: 'STATE baselines. Journey trajectories. Practice consistency. What single moments cannot reveal, time makes visible.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Momentum dashboard. Data visualization showing STATE trends, Journey completion, Practice streaks. Beautiful, clean, Apple-health style charts. Encouraging color palette.',
            aspectRatio: '9:16',
            composition: 'Device showing personal analytics dashboard with multiple data visualizations',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/momentum/momentum_half.avif'
            ]
          }
        },
        detail: {
          headline: 'How Momentum works',
          features: [
            {
              icon: LineChart,
              title: 'Patterns across time',
              description: 'STATE baselines. Journey trajectories. Practice consistency. What single moments can\'t reveal.'
            },
            {
              icon: TrendingUp,
              title: 'Inflection points',
              description: 'When things shifted. The week anchorage stabilized. The moment clarity returned. Evidence becomes visible.'
            },
            {
              icon: Target,
              title: 'Not engagement metrics',
              description: 'Not streaks or badges. Real change measured. Energy levels. Clarity trends. Emotional range expanding.'
            },
            {
              icon: Heart,
              title: 'For you and your therapist',
              description: 'You see progress. Therapist sees patterns. Same data, different depths. Shared understanding.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Momentum examples showing data visualizations and progress patterns.',
            aspectRatio: '9:16',
            composition: 'Full device showing Momentum dashboard with visible charts and analytics',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/momentum/momentum_full.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-support-network',
    categoryId: 'features',
    title: 'Support Network',
    subtitle: 'Your people when crisis hits',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Support Network',
          tagline: 'Safety net, not feature',
          shineThrough: {
            title: 'Your people when crisis hits',
            description: 'Therapist. Sponsor. Family. Friends. One tap when Rescues are not enough. Safety, not surveillance.',
            position: 'bottom'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Support Network setup screen. Add trusted contacts interface with clear role labels (therapist, sponsor, family, friend). Serious, trustworthy interface.',
            aspectRatio: '9:16',
            composition: 'Device showing network setup with 3-4 contacts already added',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/halfscreen/supportnetwork1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/halfscreen/supportnetwork2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/halfscreen/supportnetwork3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/halfscreen/supportnetwork4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/halfscreen/supportnetwork5.avif'
            ]
          }
        },
        detail: {
          headline: 'How Support Network works',
          features: [
            {
              icon: Users,
              title: 'Your people',
              description: 'Therapist. Sponsor. Family. Friends. Define your support network in settings. Who to reach when struggling.'
            },
            {
              icon: AlertCircle,
              title: 'SOS button',
              description: 'When Rescues aren\'t enough. One tap notifies your network. We can\'t save, but we can notify.'
            },
            {
              icon: ActivityPulse,
              title: 'Cadence detection',
              description: 'Regular activity suddenly drops? Gentle nudge to support network. Check if they\'re okay.'
            },
            {
              icon: Shield,
              title: 'Safety, not surveillance',
              description: 'You control who sees what. Support network sees you need help, not your private data.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Support Network examples showing SOS activation and crisis flow.',
            aspectRatio: '9:16',
            composition: 'Full device showing Support Network interface with visible safety protocols',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/fullscreen/supportnetwork1.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/fullscreen/supportnetwork2.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/fullscreen/supportnetwork3.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/fullscreen/supportnetwork4.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/supportnetwork/fullscreen/supportnetwork5.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-insights',
    categoryId: 'features',
    title: 'Insights',
    subtitle: 'Deep dives when you\'re ready',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Insights',
          tagline: 'Linear micro-courses',
          shineThrough: {
            title: 'Deep dives when you are ready',
            description: 'Structured learning paths. Multi-lesson courses on complex topics. When an article sparks interest and you want to go deeper.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Insight course interface. Multi-lesson structure visible (e.g., "Understanding Fear: 6 lessons"). Progress tracker, structured learning path. Academic but accessible.',
            aspectRatio: '9:16',
            composition: 'Device showing Insight course homepage with lesson structure visible',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How Insights work',
          features: [
            {
              icon: Lightbulb,
              title: 'When curiosity opens',
              description: 'Article sparks interest. Journey touches on concept. You want to go deeper. Insights are there.'
            },
            {
              icon: GitBranch,
              title: 'Linear, not exploratory',
              description: 'Unlike Journeys (which are dynamic), Insights are sequential. Lesson 1 builds to Lesson 6. Structured learning.'
            },
            {
              icon: Brain,
              title: 'Embedded practices',
              description: 'Theory meets application. Insights include practices to try. Knowledge becomes embodied.'
            },
            {
              icon: Backpack,
              title: 'Save what works',
              description: 'Found a practice that helps? Save it to Toolkit. Found a concept that resonates? Bookmark it.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Insights examples showing lesson content and structured learning paths.',
            aspectRatio: '9:16',
            composition: 'Full device showing Insights interface with visible lessons and practices',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-practices',
    categoryId: 'features',
    title: 'Practices',
    subtitle: 'Regulation when biology needs it',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Practices',
          tagline: 'Somatic and cognitive exercises',
          shineThrough: {
            title: 'Regulation when biology needs it',
            description: 'Breathwork. Grounding. Body scans. Cognitive reframes. When prefrontal cortex goes offline, nervous system needs first.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing Practice in progress. Guided breathwork interface with visual timer and calm voice instruction preview. Gentle, regulating color palette.',
            aspectRatio: '9:16',
            composition: 'Device showing active practice (breathwork or grounding) mid-session',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How Practices work',
          features: [
            {
              icon: HeartPulse,
              title: 'When biology takes over',
              description: 'Prefrontal cortex offline. Can\'t process complexity. Need regulation. Practices meet biology where it is.'
            },
            {
              icon: Activity,
              title: 'Somatic and cognitive',
              description: 'Breathwork. Grounding. Body scans. Cognitive reframes. Different tools for different nervous systems.'
            },
            {
              icon: BookOpen,
              title: 'Embedded everywhere',
              description: 'In Journeys. In Insights. In Articles. In Rescues. Practices appear when you need them.'
            },
            {
              icon: Backpack,
              title: 'Build your toolkit',
              description: 'Try everything. Save what works. Your nervous system knows what it needs.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Practice examples showing guided exercises and regulation flow.',
            aspectRatio: '9:16',
            composition: 'Full device showing Practice interface with visible breathwork and grounding exercises',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },
  {
    id: 'feature-biometric',
    categoryId: 'features',
    title: 'Biometric Integration',
    subtitle: 'Body signals that guide',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Biometric Integration',
          tagline: 'Apple Health + Fitbit data',
          shineThrough: {
            title: 'Body signals that guide',
            description: 'Heart rate variability. Sleep quality. Movement patterns. Biology tells stories self-report cannot. Objective data that weights your journey.'
          },
          assetSpec: {
            type: 'device-mockup',
            description: 'iPhone showing biometric sync screen. Apple Health integration visual with heart rate, sleep, movement data flowing in. Clean, health-tech aesthetic.',
            aspectRatio: '9:16',
            composition: 'Device showing connected health data sources and sync status',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/halfscreen1/pain.avif'
            ]
          }
        },
        detail: {
          headline: 'How Biometric Integration works',
          features: [
            {
              icon: HeartPulse,
              title: 'Heart rate variability',
              description: 'Nervous system regulation measured objectively. HRV patterns reveal stress before you notice it.'
            },
            {
              icon: ActivityPulse,
              title: 'Sleep and movement',
              description: 'Sleep quality. Activity levels. Resting heart rate. Biology tells stories self-report can\'t.'
            },
            {
              icon: Brain,
              title: 'Feeds the Mindcraft Ball',
              description: 'Biometric data weights the algorithm. Poor sleep patterns? Journey focuses on regulation.'
            },
            {
              icon: LineChart,
              title: 'Correlates with STATE',
              description: 'Your STATE signal + your biometric data = complete picture. Subjective meets objective.'
            }
          ],
          assetSpec: {
            type: 'device-mockup',
            description: 'Full-screen Biometric Integration examples showing health data sync and correlations.',
            aspectRatio: '9:16',
            composition: 'Full device showing Biometric interface with visible HRV and STATE correlations',
            images: [
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/selfnarrative.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/rest.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/boundaries.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/identity.avif',
              'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/explore/navicues/fullscreen/pain.avif'
            ]
          }
        }
      }
    }
  },

  // ========================================
  // CONTINUITY (8 modules)
  // ========================================
  {
    id: 'continuity-not-there',
    categoryId: 'continuity',
    title: 'What happens when you\'re not there?',
    subtitle: 'The space between sessions. Where insight fades and patterns return.',
    type: 'REVEAL_TILE',
    exploreNext: [
      'continuity-insight-fades',
      'continuity-not-endpoints',
      'continuity-rhythm',
      'continuity-weekly-flow',
      'continuity-bridge',
      'continuity-always-on',
      'continuity-contextual'
    ]
  },
  {
    id: 'continuity-insight-fades',
    categoryId: 'continuity',
    title: 'When insight fades',
    subtitle: 'Tuesday clarity becomes Thursday confusion.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'continuity-not-endpoints',
    categoryId: 'continuity',
    title: 'Sessions as moments, not endpoints',
    subtitle: 'Recovery doesn\'t pause between appointments.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'continuity-rhythm',
    categoryId: 'continuity',
    title: 'The rhythm of recovery',
    subtitle: 'Daily check-ins. Contextual support. Continuous presence.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'continuity-weekly-flow',
    categoryId: 'continuity',
    title: 'What a week looks like',
    subtitle: 'Morning STATE. Evening LUMA. Weekly insights. Continuous thread.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'continuity-bridge',
    categoryId: 'continuity',
    title: 'The bridge between sessions',
    subtitle: 'How presence extends beyond the therapy room.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'continuity-always-on',
    categoryId: 'continuity',
    title: 'The always-on clinician',
    subtitle: 'Not you. The system. Supporting when you cannot.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'continuity-contextual',
    categoryId: 'continuity',
    title: 'Context that travels',
    subtitle: 'Every interaction informed by what came before.',
    type: 'DEEP_DIVE'
  },

  // ========================================
  // EVIDENCE (7 modules)
  // ========================================
  {
    id: 'evidence-visible',
    categoryId: 'evidence',
    title: 'When progress becomes visible',
    subtitle: 'Patterns across time. Stories told through data.',
    type: 'EVIDENCE_SHOWCASE',
    exploreNext: [
      'evidence-patterns',
      'evidence-commissioners',
      'evidence-trajectory',
      'evidence-validated',
      'evidence-outcomes',
      'evidence-before-after'
    ]
  },
  {
    id: 'evidence-patterns',
    categoryId: 'evidence',
    title: 'Patterns across time',
    subtitle: 'What single moments can\'t reveal.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'evidence-commissioners',
    categoryId: 'evidence',
    title: 'What commissioners need to see',
    subtitle: 'Measurable outcomes. Clear trajectories. Validated impact.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'evidence-trajectory',
    categoryId: 'evidence',
    title: 'The trajectory of change',
    subtitle: 'Baselines. Inflection points. Sustained growth.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'evidence-validated',
    categoryId: 'evidence',
    title: 'Clinically validated',
    subtitle: 'Built on CBT, DBT, MI foundations. Not hope, science.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'evidence-outcomes',
    categoryId: 'evidence',
    title: 'Outcomes that matter',
    subtitle: 'Not engagement metrics. Real change measured.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'evidence-before-after',
    categoryId: 'evidence',
    title: 'Before and after',
    subtitle: 'The distance traveled made visible.',
    type: 'EVIDENCE_SHOWCASE'
  },

  // ========================================
  // FEATURES - PRACTICE LAYER (9 modules)
  // The clinician-facing infrastructure
  // ========================================
  {
    id: 'feature-console',
    categoryId: 'features',
    title: 'Console',
    subtitle: 'Your 360 view',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Console',
          tagline: 'See everything that matters',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop/tablet showing therapist Console dashboard. Client roster with intelligent triage (red/amber/green indicators). Pre-session briefing visible. Clean, professional interface.',
            aspectRatio: '16:9',
            composition: 'Wide dashboard view showing multiple clients and status indicators'
          }
        },
        detail: {
          headline: 'How Console works',
          features: [
            {
              icon: Target,
              title: 'Intelligent triage',
              description: 'Who needs attention. Who is stable. Clear at a glance. Red/amber/green weighted by engagement and STATE.'
            },
            {
              icon: Brain,
              title: 'Pre-session briefing',
              description: 'Walk in knowing. Recent STATE patterns. Reflections that matter. Journey progress. What to ask about.'
            },
            {
              icon: Network,
              title: 'Map the inner world',
              description: 'Where they\'re traveling. What they\'re practicing. What they\'re avoiding. Story emerges from data.'
            },
            {
              icon: LineChart,
              title: 'Clinical decision support',
              description: 'Risk indicators. Engagement trends. Outcome measurement. Evidence that guides.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Close-up of single client view in Console showing: STATE trends, recent Reflections, Journey progression, risk indicators, session notes timeline.',
            aspectRatio: '4:3',
            composition: 'Deep dive into one client showing all intelligence layers'
          }
        }
      }
    }
  },
  {
    id: 'feature-video',
    categoryId: 'features',
    title: 'Video Sessions',
    subtitle: 'Therapy anywhere',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Video Sessions',
          tagline: 'Infrastructure that cares for you',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing video session interface. Clean, professional video call layout with session notes sidebar. Client context visible without being intrusive.',
            aspectRatio: '16:9',
            composition: 'Video call interface with contextual information visible'
          }
        },
        detail: {
          headline: 'How Video Sessions work',
          features: [
            {
              icon: Video,
              title: 'Embedded, not bolted on',
              description: 'Video sessions inside Console. No switching apps. Client context right there.'
            },
            {
              icon: FileText,
              title: 'Notes during session',
              description: 'Document while talking. Notes flow into EHR. Client sees what matters in their timeline.'
            },
            {
              icon: Brain,
              title: 'Pre-session briefing visible',
              description: 'Start call with intelligence already loaded. Recent patterns, reflections, concerns.'
            },
            {
              icon: Shield,
              title: 'HIPAA compliant',
              description: 'Encrypted. Secure. Documented. Everything you need, nothing you don\'t.'
            }
          ],
          assetSpec: {
            type: 'split-screen',
            description: 'Split view: Left shows active video call with client. Right shows therapist view with notes, briefing, and client data.',
            aspectRatio: '21:9',
            composition: 'Wide split showing dual perspective of video session'
          }
        }
      }
    }
  },
  {
    id: 'feature-calendar',
    categoryId: 'features',
    title: 'Calendar Sync',
    subtitle: 'Scheduling that flows',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Calendar',
          tagline: 'Automatic scheduling',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop/mobile showing calendar interface. Client booking view with available slots. Automatic sync with Google/Apple calendar visible.',
            aspectRatio: '16:9',
            composition: 'Calendar view showing therapist availability and client bookings'
          }
        },
        detail: {
          headline: 'How Calendar works',
          features: [
            {
              icon: Calendar,
              title: 'Set it once',
              description: 'Define your availability. Clients book within those hours. No back-and-forth.'
            },
            {
              icon: Link,
              title: 'Syncs with your calendar',
              description: 'Google Calendar. Apple Calendar. Outlook. Two-way sync. Never double-book.'
            },
            {
              icon: Clock,
              title: 'Automatic reminders',
              description: 'Clients get session reminders. You get pre-session briefings. Everything on time.'
            },
            {
              icon: Target,
              title: 'Cadence tracking',
              description: 'Weekly sessions become pattern. Missed appointments trigger gentle check-ins.'
            }
          ],
          assetSpec: {
            type: 'workflow',
            description: 'Three-panel flow: (1) Therapist sets availability, (2) Client books session, (3) Auto-reminder sent to both. Show automation.',
            aspectRatio: '16:9',
            composition: 'Horizontal workflow showing scheduling automation'
          }
        }
      }
    }
  },
  {
    id: 'feature-billing',
    categoryId: 'features',
    title: 'Invisible Billing',
    subtitle: 'Revenue that compounds',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Billing',
          tagline: 'From episodic to recurring',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing billing dashboard. MRR tracking, subscription management, automated invoicing. Clean financial interface.',
            aspectRatio: '16:9',
            composition: 'Financial dashboard showing revenue streams and subscription status'
          }
        },
        detail: {
          headline: 'How Billing works',
          features: [
            {
              icon: CreditCard,
              title: 'Automatic payment processing',
              description: 'Clients subscribe. Cards charged automatically. You focus on therapy, not invoicing.'
            },
            {
              icon: DollarSign,
              title: 'Composable packaging',
              description: 'Bundle sessions + companion access. Your model, your pricing. Foundation, Professional, Enterprise.'
            },
            {
              icon: TrendingUp,
              title: 'Recurring revenue',
              description: 'Monthly subscriptions create predictability. MRR replaces transactional uncertainty.'
            },
            {
              icon: PieChart,
              title: 'Revenue analytics',
              description: 'Track MRR, LTV, churn. Know your practice\'s financial health at a glance.'
            }
          ],
          assetSpec: {
            type: 'data-viz',
            description: 'Revenue dashboard showing: MRR trend over 12 months, client LTV breakdown, subscription tier distribution, churn rate tracking.',
            aspectRatio: '16:9',
            composition: 'Financial analytics dashboard with multiple data visualizations'
          }
        }
      }
    }
  },
  {
    id: 'feature-ehr',
    categoryId: 'features',
    title: 'Living Records',
    subtitle: 'Documentation that informs',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'EHR',
          tagline: 'Clinical documentation built in',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing EHR interface. Session notes, treatment plans, assessments. Professional clinical documentation interface.',
            aspectRatio: '16:9',
            composition: 'EHR view showing session notes integrated with client timeline'
          }
        },
        detail: {
          headline: 'How EHR works',
          features: [
            {
              icon: FileText,
              title: 'Session notes that flow',
              description: 'Document during or after sessions. Notes integrate with client timeline. Context always available.'
            },
            {
              icon: Brain,
              title: 'Intelligence informs documentation',
              description: 'STATE patterns visible while writing notes. Reflections inform treatment plans. Data tells story.'
            },
            {
              icon: ShieldCheck,
              title: 'HIPAA compliant storage',
              description: 'Encrypted. Secure. Audit trails. Everything documented, everything protected.'
            },
            {
              icon: Target,
              title: 'Treatment planning integrated',
              description: 'Goals tracked. Interventions measured. Outcomes visible. Clinical rigor built in.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Close-up of session note interface showing: note writing area, client STATE data sidebar, recent Reflections, treatment goals, outcome measures.',
            aspectRatio: '4:3',
            composition: 'Note-taking view with contextual intelligence visible'
          }
        }
      }
    }
  },
  {
    id: 'feature-roster',
    categoryId: 'features',
    title: 'Patient Roster',
    subtitle: 'Clients that engage',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Roster',
          tagline: 'Your practice at a glance',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing patient roster view. List of clients with engagement indicators, recent activity, next session timing. Sortable, filterable.',
            aspectRatio: '16:9',
            composition: 'Roster table view showing multiple clients with status indicators'
          }
        },
        detail: {
          headline: 'How Roster works',
          features: [
            {
              icon: Users,
              title: 'Intelligent triage built in',
              description: 'Red/amber/green status. Who needs attention immediately. Who to check on. Who is stable.'
            },
            {
              icon: ActivityPulse,
              title: 'Engagement visibility',
              description: 'Last STATE check-in. Journey progress. Reflection cadence. Activity patterns at a glance.'
            },
            {
              icon: Target,
              title: 'Invite and onboard',
              description: 'Send invitation. Client onboards. Companion access granted. They start their first Journey.'
            },
            {
              icon: LineChart,
              title: 'Caseload analytics',
              description: 'How many clients. Engagement distribution. Capacity planning. Practice health metrics.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Close-up of roster showing sorting/filtering options, client status indicators explained (what red/amber/green means), engagement metrics visible.',
            aspectRatio: '16:9',
            composition: 'Roster view with annotation showing how triage works'
          }
        }
      }
    }
  },
  {
    id: 'feature-practitioner-wellbeing',
    categoryId: 'features',
    title: 'Practitioner Wellbeing',
    subtitle: 'Care for the caregiver',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Practitioner Wellbeing',
          tagline: 'Mirror practice',
          assetSpec: {
            type: 'device-mockup',
            description: 'Desktop/tablet showing therapist-focused wellbeing dashboard. Compassion fatigue check-ins, supervision reminders, self-care prompts. Gentle, supportive interface.',
            aspectRatio: '16:9',
            composition: 'Dashboard showing therapist self-care features'
          }
        },
        detail: {
          headline: 'How Practitioner Wellbeing works',
          features: [
            {
              icon: HeartHandshake,
              title: 'Compassion fatigue monitoring',
              description: 'You care for clients. Who cares for you? Regular check-ins on your wellbeing.'
            },
            {
              icon: Clock,
              title: 'Caseload balance',
              description: 'Too many red clients? System suggests capacity adjustments. Sustainable practice matters.'
            },
            {
              icon: Users,
              title: 'Supervision reminders',
              description: 'Clinical supervision scheduled. Peer consultation prompted. You don\'t practice in isolation.'
            },
            {
              icon: Heart,
              title: 'Self-care prompts',
              description: 'Same tools you give clients. Practices. Reflections. Recovery architecture works for you too.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Practitioner wellbeing dashboard showing: compassion fatigue indicator, caseload balance visualization, supervision calendar, self-care practice library.',
            aspectRatio: '16:9',
            composition: 'Therapist-focused dashboard with supportive features'
          }
        }
      }
    }
  },
  {
    id: 'feature-pre-session-briefing',
    categoryId: 'features',
    title: 'Pre-Session Briefing',
    subtitle: 'Walk in knowing',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Pre-Session Briefing',
          tagline: 'Intelligence before you start',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop/mobile showing pre-session briefing screen. Key insights, recent STATE patterns, reflection highlights, suggested topics. Clean, scannable format.',
            aspectRatio: '16:9',
            composition: 'Briefing view showing curated intelligence for upcoming session'
          }
        },
        detail: {
          headline: 'How Pre-Session Briefing works',
          features: [
            {
              icon: Brain,
              title: 'Curated intelligence',
              description: 'Not raw data. What matters. STATE trends. Reflections that reveal. Questions to ask.'
            },
            {
              icon: Clock,
              title: 'Delivered before session',
              description: '15 minutes before session starts. Enough time to read. Fresh in mind when you start.'
            },
            {
              icon: Target,
              title: 'Risk indicators surfaced',
              description: 'Engagement drop. STATE decline. Concerning reflections. What to address first.'
            },
            {
              icon: Compass,
              title: 'Journey context included',
              description: 'What journey they\'re on. What landed. What struggled with. Conversation starters.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Close-up of briefing showing: risk alerts (if any), STATE 7-day trend, top 3 reflections, current journey context, suggested discussion topics.',
            aspectRatio: '4:3',
            composition: 'Briefing layout showing prioritized information architecture'
          }
        }
      }
    }
  },
  {
    id: 'feature-risk-prediction',
    categoryId: 'features',
    title: 'Risk Prediction',
    subtitle: 'Intervene before crisis',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Risk Prediction',
          tagline: 'Early warning system',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing risk prediction dashboard. Client at-risk indicators with pattern explanations. Serious, clinical interface with clear action recommendations.',
            aspectRatio: '16:9',
            composition: 'Risk dashboard showing multiple indicators and alerts'
          }
        },
        detail: {
          headline: 'How Risk Prediction works',
          features: [
            {
              icon: AlertCircle,
              title: 'Pattern recognition',
              description: 'STATE decline sustained. Engagement drop. Reflection absence. Patterns that predict crisis.'
            },
            {
              icon: Brain,
              title: 'Multiple data streams',
              description: 'STATE + biometrics + engagement + reflections + cadence. Complete picture, accurate prediction.'
            },
            {
              icon: ShieldAlert,
              title: 'Actionable alerts',
              description: 'Not just "at risk." What changed. When it started. What to do about it.'
            },
            {
              icon: Users,
              title: 'Support network integration',
              description: 'Risk detected. Option to notify support network. Clinical decision support, not automation.'
            }
          ],
          assetSpec: {
            type: 'data-viz',
            description: 'Risk prediction visualization showing: timeline of decline, contributing factors weighted, intervention recommendations, support network notification option.',
            aspectRatio: '16:9',
            composition: 'Clinical dashboard showing risk analysis and action paths'
          }
        }
      }
    }
  },
  {
    id: 'feature-outcome-measurement',
    categoryId: 'features',
    title: 'Outcome Measurement',
    subtitle: 'Prove what works',
    type: 'FEATURE_SHOWCASE',
    content: {
      featureShowcase: {
        overview: {
          headline: 'Outcome Measurement',
          tagline: 'Defensible ROI',
          assetSpec: {
            type: 'screenshot',
            description: 'Desktop showing outcome measurement dashboard. Aggregate client outcomes, treatment effectiveness metrics, commissioner-ready reports. Professional, evidence-based.',
            aspectRatio: '16:9',
            composition: 'Outcomes dashboard showing practice-level analytics'
          }
        },
        detail: {
          headline: 'How Outcome Measurement works',
          features: [
            {
              icon: LineChart,
              title: 'Validated outcome measures',
              description: 'Not engagement metrics. Real clinical outcomes. STATE trajectories. Functional improvement measured.'
            },
            {
              icon: TrendingUp,
              title: 'Individual and aggregate',
              description: 'Track one client. Track your entire practice. Evidence at every level.'
            },
            {
              icon: Award,
              title: 'Commissioner reporting',
              description: 'Generate reports funders need. Measurable outcomes. Clear trajectories. Validated impact.'
            },
            {
              icon: Brain,
              title: 'Treatment effectiveness',
              description: 'Which interventions work. For which clients. Under what conditions. Clinical intelligence.'
            }
          ],
          assetSpec: {
            type: 'data-viz',
            description: 'Outcome dashboard showing: aggregate STATE improvement across caseload, treatment modality effectiveness, client trajectory distribution, commissioner-ready summary stats.',
            aspectRatio: '16:9',
            composition: 'Evidence-based analytics dashboard with multiple visualizations'
          }
        }
      }
    }
  },

  // ========================================
  // FEATURES - SYSTEM ARCHITECTURE (5 modules)
  // How features connect as one system
  // ========================================
  {
    id: 'architecture-complete',
    categoryId: 'features',
    title: 'The complete system',
    subtitle: 'Twenty-seven features across six tiers.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-journeys',
      'feature-navicues',
      'feature-rescues',
      'feature-state',
      'feature-luma',
      'feature-toolkit',
      'feature-reflections',
      'feature-momentum',
      'feature-support-network',
      'feature-insights',
      'feature-practices',
      'feature-biometric'
    ]
  },
  {
    id: 'architecture-console-companion',
    categoryId: 'system',
    title: 'Console and companion',
    subtitle: 'What you see. What they experience.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'architecture-connects',
    categoryId: 'features',
    title: 'How everything connects',
    subtitle: 'STATE flows to LUMA flows to Momentum.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-state',
      'feature-luma',
      'feature-momentum',
      'feature-navicues',
      'feature-journeys',
      'feature-rescues'
    ]
  },
  {
    id: 'architecture-three-layers',
    categoryId: 'system',
    title: 'Three layers, one system',
    subtitle: 'Engagement. Intelligence. Evidence.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-state',
      'feature-luma',
      'feature-navicues',
      'feature-momentum',
      'feature-insights',
      'feature-support-network'
    ]
  },
  {
    id: 'architecture-state-to-luma',
    categoryId: 'features',
    title: 'From STATE to LUMA',
    subtitle: 'Morning signal becomes evening conversation.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'architecture-luma-to-momentum',
    categoryId: 'features',
    title: 'From LUMA to Momentum',
    subtitle: 'Conversations become patterns. Patterns become evidence.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'architecture-all-features',
    categoryId: 'features',
    title: 'All features working as one',
    subtitle: 'Each distinct. Together, transformative.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-journeys',
      'feature-navicues',
      'feature-rescues',
      'feature-state',
      'feature-luma',
      'feature-toolkit',
      'feature-reflections',
      'feature-momentum',
      'feature-support-network',
      'feature-insights',
      'feature-practices',
      'feature-biometric'
    ]
  },
  {
    id: 'architecture-seamless',
    categoryId: 'system',
    title: 'Seamless by design',
    subtitle: 'Clients experience flow. You see the orchestration.',
    type: 'DUAL_PERSPECTIVE'
  },

  // ========================================
  // INTELLIGENCE (7 modules)
  // ========================================
  {
    id: 'intelligence-never-stops',
    categoryId: 'intelligence',
    title: 'The conversation that never stops',
    subtitle: 'LUMA handles check-ins. You handle depth.',
    type: 'DEEP_DIVE',
    exploreNext: [
      'intelligence-patterns',
      'intelligence-augmented',
      'intelligence-luma-works',
      'intelligence-risk-signals',
      'intelligence-themes',
      'intelligence-learns'
    ]
  },
  {
    id: 'intelligence-patterns',
    categoryId: 'intelligence',
    title: 'Patterns you couldn\'t see',
    subtitle: 'Momentum reveals what single moments hide.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'intelligence-augmented',
    categoryId: 'intelligence',
    title: 'Augmented, not replaced',
    subtitle: 'AI extends your reach. Never replaces your role.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'intelligence-luma-works',
    categoryId: 'intelligence',
    title: 'How LUMA works',
    subtitle: 'Conversational. Contextual. Clinically grounded.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'intelligence-risk-signals',
    categoryId: 'intelligence',
    title: 'Risk signals surfaced',
    subtitle: 'Not alarms. Gentle escalation when it matters.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'intelligence-themes',
    categoryId: 'intelligence',
    title: 'Themes across conversations',
    subtitle: 'What clients talk about. What they avoid. What emerges.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'intelligence-learns',
    categoryId: 'intelligence',
    title: 'The system that learns',
    subtitle: 'Every interaction refines understanding.',
    type: 'DEEP_DIVE'
  },

  // ========================================
  // SAFETY → FOUNDATION (6 modules)
  // ========================================
  {
    id: 'safety-ai-stops',
    categoryId: 'foundation',
    title: 'Where AI stops',
    subtitle: 'Clinical judgment remains yours. Always.',
    type: 'REVEAL_TILE',
    exploreNext: [
      'safety-essential',
      'safety-boundaries',
      'safety-privacy',
      'safety-escalation',
      'safety-regulatory'
    ]
  },
  {
    id: 'safety-essential',
    categoryId: 'foundation',
    title: 'You remain essential',
    subtitle: 'LUMA augments. You guide the work.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'safety-boundaries',
    categoryId: 'foundation',
    title: 'Boundaries by design',
    subtitle: 'What LUMA can do. What only you can do.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'safety-privacy',
    categoryId: 'foundation',
    title: 'Privacy sealed',
    subtitle: 'Client data encrypted. You receive signal, not entries.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'safety-escalation',
    categoryId: 'foundation',
    title: 'When to escalate',
    subtitle: 'Risk protocols built in. Clinical oversight maintained.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'safety-regulatory',
    categoryId: 'foundation',
    title: 'Regulatory compliance built in',
    subtitle: 'HIPAA. GDPR. Behavioral health standards met.',
    type: 'DEEP_DIVE'
  },

  // ========================================
  // FLOW → SYSTEM (6 modules)
  // ========================================
  {
    id: 'flow-systems-talk',
    categoryId: 'system',
    title: 'When systems talk',
    subtitle: 'Your EHR. Their companion. Seamless data flow.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'flow-ehr-integration',
      'flow-no-silos',
      'flow-interoperability',
      'flow-data-travels',
      'flow-existing-workflow'
    ]
  },
  {
    id: 'flow-ehr-integration',
    categoryId: 'system',
    title: 'EHR integration',
    subtitle: 'Recoverlution data flows where you work.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'flow-no-silos',
    categoryId: 'system',
    title: 'No silos',
    subtitle: 'Clinical context travels across every touchpoint.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'flow-interoperability',
    categoryId: 'system',
    title: 'True interoperability',
    subtitle: 'Not export/import. Real-time sync.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'flow-data-travels',
    categoryId: 'system',
    title: 'How data travels',
    subtitle: 'Secure. Seamless. Standards-compliant.',
    type: 'ORCHESTRATION_VIS'
  },
  {
    id: 'flow-existing-workflow',
    categoryId: 'system',
    title: 'Built for existing workflow',
    subtitle: 'Enhances what you use. Doesn\'t replace it.',
    type: 'REVEAL_TILE'
  },

  // ========================================
  // PRACTICE (7 modules)
  // ========================================
  {
    id: 'practice-solo',
    categoryId: 'practice',
    title: 'For solo practitioners',
    subtitle: 'Depth without overwhelming administrative load.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'practice-group',
    categoryId: 'practice',
    title: 'For group practices',
    subtitle: 'Consistent methodology across clinicians.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'practice-treatment-centers',
    categoryId: 'practice',
    title: 'For treatment centers',
    subtitle: 'Scale without losing personalization.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'practice-outpatient',
    categoryId: 'practice',
    title: 'Outpatient continuity',
    subtitle: 'The bridge between weekly sessions.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'practice-iop',
    categoryId: 'practice',
    title: 'IOP support',
    subtitle: 'Daily structure meets clinical oversight.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'practice-aftercare',
    categoryId: 'practice',
    title: 'Aftercare that works',
    subtitle: 'Transition without falling through cracks.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'practice-how-you-work',
    categoryId: 'practice',
    title: 'Built for how you work',
    subtitle: 'Not another login. Extension of your practice.',
    type: 'REVEAL_TILE',
    exploreNext: [
      'practice-solo',
      'practice-group',
      'practice-treatment-centers',
      'practice-outpatient',
      'practice-iop',
      'practice-aftercare'
    ]
  },

  // ========================================
  // SCALE → PRACTICE (6 modules)
  // ========================================
  {
    id: 'scale-without-compromise',
    categoryId: 'practice',
    title: 'Scale without compromise',
    subtitle: 'Depth maintained as caseload grows.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'scale-50-clients',
    categoryId: 'practice',
    title: 'What 50 clients looks like',
    subtitle: 'Daily signal. Weekly insights. Manageable oversight.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'scale-100-clients',
    categoryId: 'practice',
    title: 'What 100 clients looks like',
    subtitle: 'System handles volume. You handle clinical decisions.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'scale-dashboard',
    categoryId: 'practice',
    title: 'The dashboard that scales',
    subtitle: 'See what matters. Filter by urgency. Stay focused.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'scale-triage',
    categoryId: 'practice',
    title: 'Intelligent triage',
    subtitle: 'Who needs attention. Who is stable. Clear at a glance.',
    type: 'REVEAL_TILE'
  },
  {
    id: 'scale-leverage',
    categoryId: 'practice',
    title: 'Your clinical leverage',
    subtitle: 'More clients. Same depth. Better outcomes.',
    type: 'EVIDENCE_SHOWCASE'
  },

  // ========================================
  // TRANSFORMATION → EVIDENCE (5 modules)
  // ========================================
  {
    id: 'transformation-what-changes',
    categoryId: 'evidence',
    title: 'What actually changes',
    subtitle: 'Client outcomes. Practice capacity. Your impact.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'transformation-30-days',
    categoryId: 'evidence',
    title: 'First 30 days',
    subtitle: 'Onboarding. Baseline. First patterns emerging.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'transformation-90-days',
    categoryId: 'evidence',
    title: 'First 90 days',
    subtitle: 'Trajectories clear. Interventions validated. Outcomes visible.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'transformation-client-perspective',
    categoryId: 'evidence',
    title: 'From the client perspective',
    subtitle: 'What it feels like when recovery has structure.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'transformation-practice-perspective',
    categoryId: 'evidence',
    title: 'From your perspective',
    subtitle: 'What it feels like to see everything clearly.',
    type: 'DEEP_DIVE'
  },

  // ========================================
  // AUTHORITY → SCIENCE, PILLARS, FOUNDATION (6 modules)
  // ========================================
  {
    id: 'authority-clinical-foundations',
    categoryId: 'science',
    title: 'Clinical foundations',
    subtitle: 'CBT. DBT. MI. Trauma-informed. Evidence-based.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'authority-six-pillars',
    categoryId: 'pillars',
    title: 'Pillar framework',
    subtitle: 'Recovery architecture built on clinical science.',
    type: 'DEEP_DIVE',
    exploreNext: [
      'pillar-emotional-regulation-foundation',
      'pillar-stress-resilience-foundation',
      'pillar-social-connectivity-foundation',
      'pillar-cognitive-reframing-foundation',
      'pillar-identity-integration-foundation',
      'pillar-decision-mastery-foundation'
    ]
  },
  {
    id: 'authority-research-backed',
    categoryId: 'science',
    title: 'Research-backed',
    subtitle: 'Not innovation for its own sake. Validated approaches.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'authority-clinical-team',
    categoryId: 'foundation',
    title: 'Who built this',
    subtitle: 'Clinicians who lived the problem. Technologists who solved it.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'authority-methodology',
    categoryId: 'pillars',
    title: 'The methodology',
    subtitle: 'How structure meets flexibility. How rigor meets compassion.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'authority-validation',
    categoryId: 'science',
    title: 'Clinical validation',
    subtitle: 'Tested. Measured. Proven in real practice.',
    type: 'EVIDENCE_SHOWCASE'
  },

  // ========================================
  // PRICING & SUBSCRIPTION (3 modules)
  // ========================================
  {
    id: 'pricing-foundation',
    categoryId: 'practice',
    title: 'Foundation Plan',
    subtitle: 'Add continuity. Keep your rhythm. £99/month for complete platform access.',
    type: 'SUBSCRIPTION_FLOW'
  },
  {
    id: 'pricing-professional',
    categoryId: 'practice',
    title: 'Professional Plan',
    subtitle: 'Your model. Your rhythm. Complete control. £199/month for transformation.',
    type: 'SUBSCRIPTION_FLOW'
  },
  {
    id: 'pricing-enterprise',
    categoryId: 'practice',
    title: 'Enterprise Plan',
    subtitle: 'Institutional scale. Your infrastructure. Custom pricing for organizations.',
    type: 'SUBSCRIPTION_FLOW'
  },

  // ========================================
  // FEATURE DEEP DIVES (9 modules - Therapy benefits)
  // ========================================
  {
    id: 'feature-therapeutic-continuity',
    categoryId: 'continuity',
    title: 'Therapeutic continuity',
    subtitle: 'Therapy holds. Threads bind between sessions.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Symbiotic%20Continuity.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)',
      features: [
        {
          icon: Link,
          title: 'Between session presence',
          description: 'Your therapeutic voice extends into daily life without depleting your capacity.',
          color: '#5739FB',
          deepDive: [
            'Companion app carries your frameworks between sessions',
            'Clients engage with structured content based on your clinical method',
            'Therapeutic relationship maintains continuity even when you\'re not present'
          ]
        },
        {
          icon: Heart,
          title: 'Relationship infrastructure',
          description: 'Transform episodic contact into continuous therapeutic presence.',
          color: '#E85D75',
          deepDive: [
            'Sessions become moments in ongoing journey, not isolated events',
            'Trust compounds through consistent daily touchpoints',
            'Your presence becomes infrastructure clients rely on'
          ]
        },
        {
          icon: TrendingUp,
          title: 'Engagement compounds',
          description: 'Work done between sessions amplifies what happens in sessions.',
          color: '#5AB9EA',
          deepDive: [
            'Daily engagement data shows readiness before they arrive',
            'Patterns surface that single sessions cannot reveal',
            'Therapeutic momentum builds instead of resetting each week'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-neuroadaptive-progress',
    categoryId: 'intelligence',
    title: 'Neuroadaptive progress',
    subtitle: 'Pathways connect. Therapy in the flow of life.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Neuroadaptive%20Progress.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)',
      features: [
        {
          icon: Brain,
          title: 'Recovery through discovery',
          description: 'Not talk therapy extended. Work happens in life, not just sessions.',
          color: '#9B87F5',
          deepDive: [
            'Structured weekly journeys guide discovery between sessions',
            'Content meets clients where they are, adapting to readiness',
            'Real-world practice builds new neural pathways'
          ]
        },
        {
          icon: Activity,
          title: 'STATE tracking',
          description: 'Red, orange, green nervous system state captured daily.',
          color: '#F59E42',
          deepDive: [
            'Morning check-ins reveal nervous system baseline',
            'Patterns show what activates and what regulates',
            'You walk into sessions knowing their starting state'
          ]
        },
        {
          icon: Sparkles,
          title: 'LUMA companionship',
          description: 'Evening conversations that hold space and offer perspective.',
          color: '#5739FB',
          deepDive: [
            'Contextual support during activation spikes',
            'Not advice. Reflection, validation, gentle reframing',
            'Your clinical voice scales without depleting you'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-ethical-economics',
    categoryId: 'practice',
    title: 'Ethical economics',
    subtitle: 'Outcomes compound. Lifelong capacity to rely on.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/section1/Ethical%20Economics.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.75) 0%, rgba(64, 224, 208, 0.60) 100%)',
      features: [
        {
          icon: DollarSign,
          title: 'Recurring revenue model',
          description: 'Monthly partnerships replace episodic sessions.',
          color: '#4ECDC4',
          deepDive: [
            'Predictable monthly revenue from ongoing client relationships',
            'Escape the time-for-money trap',
            'Earning potential no longer locked to hours in the day'
          ]
        },
        {
          icon: Heart,
          title: 'Therapeutic integrity',
          description: 'Economics that respect both the work and the client.',
          color: '#E85D75',
          deepDive: [
            'Clients invest in their own capacity building',
            'Value aligned with long-term outcomes, not session count',
            'Sustainable practice model that honors therapeutic boundaries'
          ]
        },
        {
          icon: TrendingUp,
          title: 'Impact compounds',
          description: 'Better outcomes. More clients. Sustainable practice.',
          color: '#5AB9EA',
          deepDive: [
            'Depth of care improves as relationships extend',
            'Scale without burning out or compromising quality',
            'Evidence of impact attracts referrals and contracts'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-privacy-default',
    categoryId: 'foundation',
    title: 'Privacy by default',
    subtitle: 'Signal. Privacy. You see trends without diary entries.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Privacy%20by%20default.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(62, 43, 184, 0.75) 0%, rgba(62, 43, 184, 0.60) 100%)',
      features: [
        {
          icon: Lock,
          title: 'Architecture for trust',
          description: 'Privacy by design, not by promise.',
          color: '#3E2BB8',
          deepDive: [
            'Clients own their data completely',
            'You receive signal and patterns, not raw diary content',
            'Encrypted storage meets behavioral health standards'
          ]
        },
        {
          icon: Shield,
          title: 'Clinical signal without intrusion',
          description: 'See what matters for decisions without crossing boundaries.',
          color: '#7ED957',
          deepDive: [
            'STATE signals show readiness and activation',
            'Engagement patterns reveal consistency and struggle',
            'Themes surface without exposing private reflections'
          ]
        },
        {
          icon: ShieldCheck,
          title: 'Compliance built in',
          description: 'HIPAA. GDPR. Behavioral health standards met.',
          color: '#5739FB',
          deepDive: [
            'Enterprise-grade encryption and security',
            'Audit logs and compliance reporting',
            'Regular third-party security assessments'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-trauma-aware',
    categoryId: 'foundation',
    title: 'Trauma aware design',
    subtitle: 'Systems regulated. Calm language and pacing that respects nervous systems.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Trauma%20aware%20design.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(16, 185, 129, 0.60) 100%)',
      features: [
        {
          icon: HeartHandshake,
          title: 'Nervous system respect',
          description: 'Every design decision considers regulation.',
          color: '#10B981',
          deepDive: [
            'No red streaks or shame spirals in design',
            'Calm pacing without unexpected intensity',
            'Language that validates without overwhelming'
          ]
        },
        {
          icon: Shield,
          title: 'Interface as therapeutic',
          description: 'The platform itself supports regulation.',
          color: '#7ED957',
          deepDive: [
            'Visual hierarchy reduces cognitive load',
            'Predictable patterns create safety',
            'Gentle escalation, never alarms'
          ]
        },
        {
          icon: Heart,
          title: 'Compassion embedded',
          description: 'Every interaction designed with care.',
          color: '#E85D75',
          deepDive: [
            'Tone validates struggle without toxic positivity',
            'Progress celebrated without pressure',
            'Setbacks normalized as part of the process'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-clinical-security',
    categoryId: 'foundation',
    title: 'Clinical grade security',
    subtitle: 'Scrutiny welcomed. Encryption and compliance built for behavioral health.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/Trustandsafety/Clinical%20grade%20security.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(6, 182, 212, 0.75) 0%, rgba(6, 182, 212, 0.60) 100%)',
      features: [
        {
          icon: ShieldCheck,
          title: 'Enterprise infrastructure',
          description: 'Security built for vulnerable populations.',
          color: '#06B6D4',
          deepDive: [
            'SOC 2 Type II certified',
            'HIPAA compliant architecture',
            'Regular penetration testing and audits'
          ]
        },
        {
          icon: Lock,
          title: 'Encryption everywhere',
          description: 'Data protected in transit and at rest.',
          color: '#3E2BB8',
          deepDive: [
            'End-to-end encryption for sensitive data',
            'Zero-knowledge architecture where appropriate',
            'Secure key management and rotation'
          ]
        },
        {
          icon: Shield,
          title: 'Audit ready',
          description: 'Built to pass commissioner scrutiny.',
          color: '#7ED957',
          deepDive: [
            'Comprehensive audit logging',
            'Access controls and role-based permissions',
            'Compliance documentation maintained'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-deeper-impact',
    categoryId: 'evidence',
    title: 'Deeper clinical impact',
    subtitle: 'Sessions deepen. Readiness signals transform sessions from recap into application.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/Pre%20session%20snapshots.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(16, 185, 129, 0.75) 0%, rgba(16, 185, 129, 0.60) 100%)',
      features: [
        {
          icon: TrendingUp,
          title: 'Continuous therapeutic presence',
          description: 'From episodic sessions to continuous care.',
          color: '#10B981',
          deepDive: [
            'Work compounds instead of fading between meetings',
            'Therapeutic momentum builds across weeks',
            'Insights deepen through daily engagement'
          ]
        },
        {
          icon: Activity,
          title: 'Pre-session readiness',
          description: 'Walk in knowing. STATE signals show where they are.',
          color: '#F59E42',
          deepDive: [
            'See nervous system state before they arrive',
            'Engagement patterns reveal what\'s working',
            'Sessions start from insight, not recap'
          ]
        },
        {
          icon: BarChart3,
          title: 'Accelerated outcomes',
          description: 'Speed therapeutic impact with continuous engagement.',
          color: '#5AB9EA',
          deepDive: [
            'Daily practice accelerates skill building',
            'Patterns surface faster with consistent data',
            'Risk indicators appear before crisis moments'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-sustainable-practice',
    categoryId: 'practice',
    title: 'Sustainable practice',
    subtitle: 'Revenue recurs. Monthly partnerships replace episodic sessions without burning out.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/Less%20recap,%20more%20work.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(87, 57, 251, 0.75) 0%, rgba(87, 57, 251, 0.60) 100%)',
      features: [
        {
          icon: DollarSign,
          title: 'Recurring revenue model',
          description: 'From time-for-money trap to sustainable income.',
          color: '#5739FB',
          deepDive: [
            'Monthly partnerships create predictable revenue',
            'Earning potential no longer locked to hours worked',
            'Scale income without extending hours'
          ]
        },
        {
          icon: Heart,
          title: 'Capacity protected',
          description: 'Depth without depletion.',
          color: '#E85D75',
          deepDive: [
            'System handles daily check-ins and support',
            'You focus on clinical decisions and depth work',
            'More clients without burnout'
          ]
        },
        {
          icon: TrendingUp,
          title: 'Practice evolution',
          description: 'From reactive clinician to proactive architect.',
          color: '#5AB9EA',
          deepDive: [
            'Your clinical method becomes scalable infrastructure',
            'Relationships compound over months and years',
            'Impact multiplies without depleting capacity'
          ]
        }
      ]
    }
  },
  {
    id: 'feature-professional-evolution',
    categoryId: 'evidence',
    title: 'Professional evolution',
    subtitle: 'Architect emerges. Your clinical method becomes infrastructure clients rely on.',
    type: 'FEATURE_DEEP_DIVE',
    content: {
      backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/yourpractice/Pre%20session%20snapshots.avif',
      gradientOverlay: 'linear-gradient(135deg, rgba(6, 182, 212, 0.75) 0%, rgba(6, 182, 212, 0.60) 100%)',
      features: [
        {
          icon: Sparkles,
          title: 'From clinician to architect',
          description: 'Your method becomes infrastructure.',
          color: '#06B6D4',
          deepDive: [
            'Clinical expertise scaled through platform',
            'Your frameworks become daily client support',
            'Reactive work becomes proactive design'
          ]
        },
        {
          icon: Building2,
          title: 'Infrastructure thinking',
          description: 'Build systems that work while you rest.',
          color: '#4ECDC4',
          deepDive: [
            'Companion app carries your therapeutic voice',
            'LUMA scales your clinical approach 24/7',
            'Relationships compound even when you\'re offline'
          ]
        },
        {
          icon: Award,
          title: 'Professional identity shift',
          description: 'From hour-limited to impact-unlimited.',
          color: '#5739FB',
          deepDive: [
            'Identity evolves from service provider to system designer',
            'Impact measured in trajectories, not sessions',
            'Legacy built through scalable methodology'
          ]
        }
      ]
    }
  },

  // ========================================
  // SCIENCE FOUNDATION (7 modules)
  // The neurobiological WHY behind everything
  // ========================================
  {
    id: 'science-overview',
    categoryId: 'science',
    title: 'Why this works',
    subtitle: 'Neuroplasticity meets lived experience.',
    type: 'DUAL_PERSPECTIVE',
    exploreNext: [
      'science-neuroplasticity',
      'science-mindcraft-algorithm',
      'science-era-framework',
      'science-story-decanting',
      'science-signal-intelligence',
      'science-transformation-philosophy'
    ]
  },
  {
    id: 'science-neuroplasticity',
    categoryId: 'science',
    title: 'How recovery rewires the brain',
    subtitle: 'Repetition accelerates. Experience embeds.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'science-mindcraft-algorithm',
    categoryId: 'science',
    title: 'The Mindcraft Ball',
    subtitle: 'Red zones guide. Green zones reinforce. Your journey emerges.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-journeys',
      'feature-navicues',
      'feature-rescues',
      'science-era-framework'
    ]
  },
  {
    id: 'science-era-framework',
    categoryId: 'science',
    title: 'Experience → Recognize → Anchor',
    subtitle: 'The transformation cycle behind every journey.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'science-story-decanting',
    categoryId: 'science',
    title: 'Mapping the inner world',
    subtitle: 'Reflections reveal patterns you cannot see yourself.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'science-signal-intelligence',
    categoryId: 'science',
    title: 'Multi-modal signal fusion',
    subtitle: 'STATE + biometrics + engagement = readiness.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'feature-state',
      'feature-biometric',
      'feature-momentum',
      'feature-insights'
    ]
  },
  {
    id: 'science-transformation-philosophy',
    categoryId: 'science',
    title: 'Seeds, not solutions',
    subtitle: 'Out of autopilot. Into awareness.',
    type: 'REVEAL_TILE'
  },

  // ========================================
  // PILLAR 1: EMOTIONAL REGULATION
  // "Biology first."
  // ========================================
  {
    id: 'pillar-emotional-regulation-foundation',
    categoryId: 'pillars',
    title: 'Emotional Regulation',
    subtitle: 'Biology first.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-emotional-regulation-delivery',
    categoryId: 'pillars',
    title: 'How we deliver regulation',
    subtitle: 'STATE, Rescues, Practices. Nervous system calms first.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-state',
      'feature-rescues',
      'feature-practices'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Emotional Regulation',
          tagline: 'Biology first.',
          assetSpec: {
            type: 'workflow',
            description: 'Diagram showing nervous system dysregulation → STATE signal → Rescue delivered → regulation restored. Flow from red zone to green zone with clear intervention points.',
            aspectRatio: '16:9',
            composition: 'Left to right flow: dysregulation (red) → signal detection → intervention → regulation (green)'
          }
        },
        detail: {
          headline: 'Features that regulate',
          features: [
            {
              icon: Heart,
              title: 'STATE captures dysregulation',
              description: 'Morning check-in reveals nervous system state. Red zones signal need for regulation before anything else.'
            },
            {
              icon: LifeBuoy,
              title: 'Rescues calm biology',
              description: 'Breathwork, grounding, somatic practices. Delivered precisely when limbic system is activated.'
            },
            {
              icon: Backpack,
              title: 'Practices build capacity',
              description: 'HRV training, window of tolerance expansion. Regulation becomes stronger over time.'
            },
            {
              icon: Brain,
              title: 'Creates biological readiness',
              description: 'Therapeutic work lands only when system is regulated. Everything else builds on this foundation.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Close-up of STATE interface showing 3-slider emotional regulation check (calm/anxious, stable/reactive, grounded/overwhelmed) with clear red/amber/green indicators.',
            aspectRatio: '4:3'
          }
        }
      }
    }
  },

  // ========================================
  // PILLAR 2: STRESS RESILIENCE
  // "Protection holds."
  // ========================================
  {
    id: 'pillar-stress-resilience-foundation',
    categoryId: 'pillars',
    title: 'Stress Resilience',
    subtitle: 'Protection holds.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-stress-resilience-delivery',
    categoryId: 'pillars',
    title: 'How we build resilience',
    subtitle: 'Prefrontal cortex stays online. Executive function persists.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-journeys',
      'feature-practices',
      'feature-toolkit'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Stress Resilience',
          tagline: 'Protection holds.',
          assetSpec: {
            type: 'workflow',
            description: 'Visual showing stress exposure → prefrontal cortex stays online → wise decision made. Contrast with alternative path: stress → PFC offline → reactive choice. Shield metaphor.',
            aspectRatio: '16:9',
            composition: 'Split path diagram showing resilient vs collapsed response to same stressor'
          }
        },
        detail: {
          headline: 'Features that build protection',
          features: [
            {
              icon: Shield,
              title: 'Stress inoculation through Journeys',
              description: 'Gradual exposure to difficult scenarios. Builds capacity to stay online when pressure arrives.'
            },
            {
              icon: Brain,
              title: 'Executive function protection',
              description: 'Practices that strengthen prefrontal cortex. Rational brain stays accessible under stress.'
            },
            {
              icon: Target,
              title: 'Tolerance window expansion',
              description: 'What once caused collapse now feels manageable. Capacity grows through repeated practice.'
            },
            {
              icon: LineChart,
              title: 'Measured capacity building',
              description: 'Insights track stress resilience over time. Evidence that protection is strengthening.'
            }
          ],
          assetSpec: {
            type: 'data-viz',
            description: 'Window of tolerance diagram expanding over time. Shows increased capacity to handle stress without dysregulation.',
            aspectRatio: '16:9'
          }
        }
      }
    }
  },

  // ========================================
  // PILLAR 3: SOCIAL CONNECTIVITY
  // "Safety builds."
  // ========================================
  {
    id: 'pillar-social-connectivity-foundation',
    categoryId: 'pillars',
    title: 'Social Connectivity',
    subtitle: 'Safety builds.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-social-connectivity-delivery',
    categoryId: 'pillars',
    title: 'How we build safety',
    subtitle: 'Belonging enables vulnerable work. Trust architecture.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-support-network',
      'feature-luma',
      'feature-journeys'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Social Connectivity',
          tagline: 'Safety builds.',
          assetSpec: {
            type: 'workflow',
            description: 'Concentric circles showing layers of connection: therapist (core), support network (inner), community (outer). Trust radiating outward from secure center.',
            aspectRatio: '16:9',
            composition: 'Centered circles with connection points, showing relational architecture'
          }
        },
        detail: {
          headline: 'Features that build belonging',
          features: [
            {
              icon: Users,
              title: 'Support Network',
              description: 'Define your people. Therapist, sponsor, family, friends. Structured safety when struggling.'
            },
            {
              icon: Heart,
              title: 'Therapeutic continuity',
              description: 'Connection between sessions. Your therapist sees your story unfolding in real time.'
            },
            {
              icon: Shield,
              title: 'Shame resilience work',
              description: 'Journeys and practices that dismantle isolation. Connection becomes safe, not terrifying.'
            },
            {
              icon: Sparkles,
              title: 'Belonging practices',
              description: 'Not forced connection. Gradual building of relational capacity. Safety emerges from trust.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Support Network interface showing trusted contacts with role labels and quick-access for crisis moments.',
            aspectRatio: '9:16'
          }
        }
      }
    }
  },

  // ========================================
  // PILLAR 4: COGNITIVE REFRAMING
  // "Lens shifts."
  // ========================================
  {
    id: 'pillar-cognitive-reframing-foundation',
    categoryId: 'pillars',
    title: 'Cognitive Reframing',
    subtitle: 'Lens shifts.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-cognitive-reframing-delivery',
    categoryId: 'pillars',
    title: 'How perspective changes',
    subtitle: 'Compassion replaces catastrophizing. Thoughts become kinder.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-navicues',
      'feature-journeys',
      'feature-reflections'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Cognitive Reframing',
          tagline: 'Lens shifts.',
          assetSpec: {
            type: 'workflow',
            description: 'Before/after thought pattern visualization. Distorted thought → NaviCue prompt → reframed perspective. Visual showing lens clarifying.',
            aspectRatio: '16:9',
            composition: 'Side-by-side comparison with thought bubbles and clarity metaphor'
          }
        },
        detail: {
          headline: 'Features that shift the lens',
          features: [
            {
              icon: Brain,
              title: 'NaviCues interrupt patterns',
              description: 'Playful prompts that surface automatic thoughts. No right answer, just awareness.'
            },
            {
              icon: Lightbulb,
              title: 'Journeys practice reframing',
              description: 'Experience scenarios where catastrophic thinking gets questioned. New appraisals become available.'
            },
            {
              icon: Heart,
              title: 'Compassion reduces arousal',
              description: 'Kinder thoughts calm the nervous system. Creates virtuous cycle of better thinking.'
            },
            {
              icon: Sparkles,
              title: 'Metacognitive awareness grows',
              description: 'Insights reveal thought patterns over time. Seeing the lens becomes possible.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'NaviCue prompt showing playful question that reveals cognitive distortion with gentle humor.',
            aspectRatio: '9:16'
          }
        }
      }
    }
  },

  // ========================================
  // PILLAR 5: IDENTITY INTEGRATION
  // "Proof stacks."
  // ========================================
  {
    id: 'pillar-identity-integration-foundation',
    categoryId: 'pillars',
    title: 'Identity Integration',
    subtitle: 'Proof stacks.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-identity-integration-delivery',
    categoryId: 'pillars',
    title: 'How proof builds',
    subtitle: 'Micro-actions become evidence. Conviction replaces hope.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-practices',
      'feature-momentum',
      'feature-insights'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Identity Integration',
          tagline: 'Proof stacks.',
          assetSpec: {
            type: 'data-viz',
            description: 'Building blocks stacking over time. Each successful moment = one block. Tower grows from aspiration to embodied identity.',
            aspectRatio: '16:9',
            composition: 'Vertical stack visualization with timeline, showing micro-proofs accumulating'
          }
        },
        detail: {
          headline: 'Features that build proof',
          features: [
            {
              icon: Target,
              title: 'Every Practice is evidence',
              description: 'Choosing differently validates who you are becoming. Behavior converts to belief.'
            },
            {
              icon: Sparkles,
              title: 'Momentum tracks the stack',
              description: 'Visual record of micro-proofs accumulating. See conviction building in real time.'
            },
            {
              icon: Award,
              title: 'Insights reveal narrative shift',
              description: 'From "I hope I can" to "I am someone who does." Story changes based on evidence.'
            },
            {
              icon: Heart,
              title: 'Therapist validates transformation',
              description: 'Shared view of identity emerging. Professional witness to your becoming.'
            }
          ],
          assetSpec: {
            type: 'data-viz',
            description: 'Momentum calendar showing daily practice completion with streak visualization and identity milestone markers.',
            aspectRatio: '16:9'
          }
        }
      }
    }
  },

  // ========================================
  // PILLAR 6: DECISION MASTERY
  // "Wisdom pauses."
  // ========================================
  {
    id: 'pillar-decision-mastery-foundation',
    categoryId: 'pillars',
    title: 'Decision Mastery',
    subtitle: 'Wisdom pauses.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'pillar-decision-mastery-delivery',
    categoryId: 'pillars',
    title: 'How choice emerges',
    subtitle: 'Gap between cue and action. Pause creates autonomy.',
    type: 'FEATURE_SHOWCASE',
    exploreNext: [
      'feature-journeys',
      'feature-navicues',
      'feature-rescues'
    ],
    content: {
      featureShowcase: {
        overview: {
          headline: 'Decision Mastery',
          tagline: 'Wisdom pauses.',
          assetSpec: {
            type: 'workflow',
            description: 'Timeline showing: Cue → [PAUSE/GAP] → Choice. Visual emphasis on the space where wisdom enters. Before/after comparison: no pause = automatic reaction, pause = autonomous decision.',
            aspectRatio: '16:9',
            composition: 'Horizontal timeline with expanded pause section showing decision rehearsal happening'
          }
        },
        detail: {
          headline: 'Features that create the pause',
          features: [
            {
              icon: Zap,
              title: 'Journeys rehearse decisions',
              description: 'Practice the pause in low-stakes scenarios. Build muscle memory for the gap.'
            },
            {
              icon: Compass,
              title: 'NaviCues surface values',
              description: 'Quick prompts that connect moment to meaning. Choice architecture in real time.'
            },
            {
              icon: Anchor,
              title: 'Rescues interrupt automaticity',
              description: 'When cue is strong, Rescue creates space. Biology calms, choice becomes possible.'
            },
            {
              icon: Award,
              title: 'Insights validate autonomy',
              description: 'Every wise decision proves the framework works. Consistent action replaces intention.'
            }
          ],
          assetSpec: {
            type: 'interface-detail',
            description: 'Journey moment showing decision scenario with value alignment prompt and pause-before-choosing mechanic.',
            aspectRatio: '9:16'
          }
        }
      }
    }
  },

  // ========================================
  // INTEGRATION MODULES (3 modules)
  // How science + pillars + features = transformation
  // ========================================
  {
    id: 'science-pillar-to-feature-map',
    categoryId: 'science',
    title: 'How we deliver the pillars',
    subtitle: 'Every need has a feature. Every feature serves a pillar.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'pillar-emotional-regulation-delivery',
      'pillar-stress-resilience-delivery',
      'pillar-social-connectivity-delivery',
      'pillar-cognitive-reframing-delivery',
      'pillar-identity-integration-delivery',
      'pillar-decision-mastery-delivery'
    ]
  },
  {
    id: 'science-clinical-outcomes',
    categoryId: 'science',
    title: 'What we measure',
    subtitle: 'Engagement, regulation, identity shift. Evidence matters.',
    type: 'EVIDENCE_SHOWCASE'
  },
  {
    id: 'science-why-discovery',
    categoryId: 'science',
    title: 'Why discovery, not diagnosis',
    subtitle: 'They find meaning. We don\'t prescribe it.',
    type: 'REVEAL_TILE'
  },

  // ========================================
  // START: FOR THERAPISTS (5 modules)
  // B2C Professional - Remove all friction
  // ========================================
  {
    id: 'start-therapist-day-one',
    categoryId: 'start',
    title: 'Your first client on Recoverlution',
    subtitle: 'Setup to invitation in under 10 minutes.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'start-therapist-introduce',
    categoryId: 'start',
    title: 'How to introduce this to your clients',
    subtitle: 'Language that works. Positioning that lands.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'start-therapist-first-session',
    categoryId: 'start',
    title: 'The first session after they start',
    subtitle: 'What you will see. How to use it together.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'start-therapist-solo-to-scale',
    categoryId: 'start',
    title: 'From 1 client to 10 clients',
    subtitle: 'Solo practitioner growth path.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'start-therapist-support',
    categoryId: 'start',
    title: 'We train you, we support you',
    subtitle: 'Onboarding, clinical training, community access.',
    type: 'REVEAL_TILE'
  },

  // ========================================
  // START: FOR PATIENTS (5 modules)
  // Companion Walkthrough - Make it feel inevitable
  // ========================================
  {
    id: 'start-patient-welcome',
    categoryId: 'start',
    title: 'Your first 10 minutes',
    subtitle: 'Open app. Check STATE. Start your first Journey.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'start-patient-daily-rhythm',
    categoryId: 'start',
    title: 'What your days look like',
    subtitle: 'Morning signal. Midday awareness. Evening reflection.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'start-patient-week-one',
      'start-patient-support-network',
      'start-patient-with-therapist'
    ]
  },
  {
    id: 'start-patient-week-one',
    categoryId: 'start',
    title: 'Your first week',
    subtitle: 'Day by day. Building momentum from the start.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'start-patient-support-network',
    categoryId: 'start',
    title: 'Adding your people',
    subtitle: 'Therapist. Sponsor. Family. Your safety net.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'start-patient-with-therapist',
    categoryId: 'start',
    title: 'How your therapist sees what you see',
    subtitle: 'Shared view. Full privacy control. Connected care.',
    type: 'DUAL_PERSPECTIVE'
  },

  // ========================================
  // START: FOR FACILITIES (5 modules)
  // B2B Enterprise - Pilot smart, scale with confidence
  // ========================================
  {
    id: 'start-facility-pilot',
    categoryId: 'start',
    title: 'Your first 30 days',
    subtitle: 'Pilot cohort approach. Staff trained. Rollout ready.',
    type: 'JOURNEY_WALKTHROUGH'
  },
  {
    id: 'start-facility-staff-training',
    categoryId: 'start',
    title: 'Preparing your team',
    subtitle: 'Clinical staff onboarding. Timeline. Support materials.',
    type: 'DEEP_DIVE'
  },
  {
    id: 'start-facility-integration',
    categoryId: 'start',
    title: 'Weaving into your program',
    subtitle: 'Fits with groups, therapy, existing structure.',
    type: 'ORCHESTRATION_VIS',
    exploreNext: [
      'start-facility-pilot',
      'start-facility-staff-training',
      'start-facility-scale'
    ]
  },
  {
    id: 'start-facility-scale',
    categoryId: 'start',
    title: 'From 10 patients to 100',
    subtitle: 'Scaling strategy. Facility dashboard. Managing at scale.',
    type: 'DUAL_PERSPECTIVE'
  },
  {
    id: 'start-facility-success-metrics',
    categoryId: 'start',
    title: 'What good looks like in 90 days',
    subtitle: 'Engagement benchmarks. Clinical outcomes. Facility KPIs.',
    type: 'EVIDENCE_SHOWCASE'
  }
];

// ONWARDS PATHS (Every module has 2-3 meaningful next steps)
export const ONWARDS_PATHS: Record<string, OnwardsPath[]> = {
  // CONTINUITY onwards
  'continuity-not-there': [
    { id: 'o1', label: 'See this in practice', targetModuleId: 'intelligence-never-stops' },
    { id: 'o2', label: 'What does this look like over time?', targetModuleId: 'evidence-patterns' },
    { id: 'o3', label: 'How clients experience this', targetModuleId: 'architecture-console-companion' }
  ],
  'continuity-insight-fades': [
    { id: 'o1', label: 'The system that bridges this gap', targetModuleId: 'continuity-bridge' },
    { id: 'o2', label: 'Daily rhythm that maintains insight', targetModuleId: 'continuity-rhythm' },
    { id: 'o3', label: 'How LUMA supports between sessions', targetModuleId: 'intelligence-luma-works' }
  ],
  'continuity-not-endpoints': [
    { id: 'o1', label: 'What continuous presence looks like', targetModuleId: 'continuity-always-on' },
    { id: 'o2', label: 'The weekly flow', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o3', label: 'Evidence of sustained engagement', targetModuleId: 'evidence-trajectory' }
  ],
  'continuity-rhythm': [
    { id: 'o1', label: 'See a full week in action', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o2', label: 'How patterns emerge over time', targetModuleId: 'evidence-patterns' },
    { id: 'o3', label: 'The intelligence layer explained', targetModuleId: 'intelligence-luma-works' }
  ],
  'continuity-weekly-flow': [
    { id: 'o1', label: 'How everything connects', targetModuleId: 'architecture-connects' },
    { id: 'o2', label: 'Client and therapist perspectives', targetModuleId: 'architecture-console-companion' },
    { id: 'o3', label: 'What outcomes look like', targetModuleId: 'transformation-90-days' }
  ],
  'continuity-bridge': [
    { id: 'o1', label: 'The architecture behind it', targetModuleId: 'architecture-complete' },
    { id: 'o2', label: 'Privacy protections', targetModuleId: 'safety-privacy' },
    { id: 'o3', label: 'Scale without losing depth', targetModuleId: 'scale-without-compromise' }
  ],
  'continuity-always-on': [
    { id: 'o1', label: 'Where AI stops', targetModuleId: 'safety-ai-stops' },
    { id: 'o2', label: 'You remain essential', targetModuleId: 'safety-essential' },
    { id: 'o3', label: 'How this scales your practice', targetModuleId: 'scale-leverage' }
  ],
  'continuity-contextual': [
    { id: 'o1', label: 'How data travels', targetModuleId: 'flow-data-travels' },
    { id: 'o2', label: 'Integration with your EHR', targetModuleId: 'flow-ehr-integration' },
    { id: 'o3', label: 'The complete system', targetModuleId: 'architecture-complete' }
  ],

  // EVIDENCE onwards
  'evidence-visible': [
    { id: 'o1', label: 'Patterns across time', targetModuleId: 'evidence-patterns' },
    { id: 'o2', label: 'What commissioners need', targetModuleId: 'evidence-commissioners' },
    { id: 'o3', label: 'Client transformation stories', targetModuleId: 'transformation-client-perspective' }
  ],
  'evidence-patterns': [
    { id: 'o1', label: 'How intelligence reveals this', targetModuleId: 'intelligence-patterns' },
    { id: 'o2', label: 'Trajectory visualization', targetModuleId: 'evidence-trajectory' },
    { id: 'o3', label: '90-day outcomes', targetModuleId: 'transformation-90-days' }
  ],
  'evidence-commissioners': [
    { id: 'o1', label: 'Validated outcomes', targetModuleId: 'evidence-outcomes' },
    { id: 'o2', label: 'Research foundations', targetModuleId: 'authority-research-backed' },
    { id: 'o3', label: 'Clinical validation', targetModuleId: 'authority-validation' }
  ],
  'evidence-trajectory': [
    { id: 'o1', label: 'Before and after', targetModuleId: 'evidence-before-after' },
    { id: 'o2', label: 'What actually changes', targetModuleId: 'transformation-what-changes' },
    { id: 'o3', label: 'Scale with maintained depth', targetModuleId: 'scale-leverage' }
  ],
  'evidence-validated': [
    { id: 'o1', label: 'Clinical foundations', targetModuleId: 'authority-clinical-foundations' },
    { id: 'o2', label: 'The six pillars', targetModuleId: 'authority-six-pillars' },
    { id: 'o3', label: 'Research backing', targetModuleId: 'authority-research-backed' }
  ],
  'evidence-outcomes': [
    { id: 'o1', label: 'Client perspective on change', targetModuleId: 'transformation-client-perspective' },
    { id: 'o2', label: 'Your perspective on impact', targetModuleId: 'transformation-practice-perspective' },
    { id: 'o3', label: 'Scale without compromise', targetModuleId: 'scale-without-compromise' }
  ],
  'evidence-before-after': [
    { id: 'o1', label: 'First 30 days', targetModuleId: 'transformation-30-days' },
    { id: 'o2', label: 'First 90 days', targetModuleId: 'transformation-90-days' },
    { id: 'o3', label: 'Long-term trajectories', targetModuleId: 'evidence-trajectory' }
  ],

  // ARCHITECTURE onwards
  'architecture-complete': [
    { id: 'o1', label: 'Console and companion views', targetModuleId: 'architecture-console-companion' },
    { id: 'o2', label: 'How everything connects', targetModuleId: 'architecture-connects' },
    { id: 'o3', label: 'Three layers explained', targetModuleId: 'architecture-three-layers' }
  ],
  'architecture-console-companion': [
    { id: 'o1', label: 'Client daily experience', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o2', label: 'Your dashboard that scales', targetModuleId: 'scale-dashboard' },
    { id: 'o3', label: 'Privacy by design', targetModuleId: 'safety-privacy' }
  ],
  'architecture-connects': [
    { id: 'o1', label: 'STATE to LUMA flow', targetModuleId: 'architecture-state-to-luma' },
    { id: 'o2', label: 'LUMA to Momentum flow', targetModuleId: 'architecture-luma-to-momentum' },
    { id: 'o3', label: 'Nine features as one', targetModuleId: 'architecture-nine-features' }
  ],
  'architecture-three-layers': [
    { id: 'o1', label: 'Engagement layer', targetModuleId: 'continuity-rhythm' },
    { id: 'o2', label: 'Intelligence layer', targetModuleId: 'intelligence-luma-works' },
    { id: 'o3', label: 'Evidence layer', targetModuleId: 'evidence-patterns' }
  ],
  'architecture-state-to-luma': [
    { id: 'o1', label: 'How LUMA works', targetModuleId: 'intelligence-luma-works' },
    { id: 'o2', label: 'Context that travels', targetModuleId: 'continuity-contextual' },
    { id: 'o3', label: 'Full weekly flow', targetModuleId: 'continuity-weekly-flow' }
  ],
  'architecture-luma-to-momentum': [
    { id: 'o1', label: 'Patterns revealed', targetModuleId: 'intelligence-patterns' },
    { id: 'o2', label: 'Evidence becomes visible', targetModuleId: 'evidence-visible' },
    { id: 'o3', label: 'Themes across time', targetModuleId: 'intelligence-themes' }
  ],
  'architecture-nine-features': [
    { id: 'o1', label: 'The complete system', targetModuleId: 'architecture-complete' },
    { id: 'o2', label: 'Seamless by design', targetModuleId: 'architecture-seamless' },
    { id: 'o3', label: 'How you experience it', targetModuleId: 'practice-how-you-work' }
  ],
  'architecture-seamless': [
    { id: 'o1', label: 'Client experience', targetModuleId: 'transformation-client-perspective' },
    { id: 'o2', label: 'Your experience', targetModuleId: 'transformation-practice-perspective' },
    { id: 'o3', label: 'Console and companion', targetModuleId: 'architecture-console-companion' }
  ],

  // INTELLIGENCE onwards
  'intelligence-never-stops': [
    { id: 'o1', label: 'How LUMA works', targetModuleId: 'intelligence-luma-works' },
    { id: 'o2', label: 'Where AI stops', targetModuleId: 'safety-ai-stops' },
    { id: 'o3', label: 'The complete flow', targetModuleId: 'architecture-connects' }
  ],
  'intelligence-patterns': [
    { id: 'o1', label: 'Evidence visualized', targetModuleId: 'evidence-patterns' },
    { id: 'o2', label: 'Themes across conversations', targetModuleId: 'intelligence-themes' },
    { id: 'o3', label: 'What changes over 90 days', targetModuleId: 'transformation-90-days' }
  ],
  'intelligence-augmented': [
    { id: 'o1', label: 'You remain essential', targetModuleId: 'safety-essential' },
    { id: 'o2', label: 'Clinical boundaries', targetModuleId: 'safety-boundaries' },
    { id: 'o3', label: 'Your clinical leverage', targetModuleId: 'scale-leverage' }
  ],
  'intelligence-luma-works': [
    { id: 'o1', label: 'Daily rhythm in action', targetModuleId: 'continuity-rhythm' },
    { id: 'o2', label: 'Risk signals surfaced', targetModuleId: 'intelligence-risk-signals' },
    { id: 'o3', label: 'Client perspective', targetModuleId: 'architecture-console-companion' }
  ],
  'intelligence-risk-signals': [
    { id: 'o1', label: 'When to escalate', targetModuleId: 'safety-escalation' },
    { id: 'o2', label: 'Intelligent triage', targetModuleId: 'scale-triage' },
    { id: 'o3', label: 'Clinical oversight maintained', targetModuleId: 'safety-boundaries' }
  ],
  'intelligence-themes': [
    { id: 'o1', label: 'Patterns over time', targetModuleId: 'evidence-patterns' },
    { id: 'o2', label: 'The system that learns', targetModuleId: 'intelligence-learns' },
    { id: 'o3', label: 'Outcomes visualized', targetModuleId: 'evidence-outcomes' }
  ],
  'intelligence-learns': [
    { id: 'o1', label: 'Clinical foundations', targetModuleId: 'authority-clinical-foundations' },
    { id: 'o2', label: 'How it improves', targetModuleId: 'transformation-90-days' },
    { id: 'o3', label: 'Privacy protections', targetModuleId: 'safety-privacy' }
  ],

  // SAFETY onwards
  'safety-ai-stops': [
    { id: 'o1', label: 'You remain essential', targetModuleId: 'safety-essential' },
    { id: 'o2', label: 'Clinical boundaries', targetModuleId: 'safety-boundaries' },
    { id: 'o3', label: 'Augmented not replaced', targetModuleId: 'intelligence-augmented' }
  ],
  'safety-essential': [
    { id: 'o1', label: 'Your clinical leverage', targetModuleId: 'scale-leverage' },
    { id: 'o2', label: 'How you remain central', targetModuleId: 'practice-how-you-work' },
    { id: 'o3', label: 'Boundaries by design', targetModuleId: 'safety-boundaries' }
  ],
  'safety-boundaries': [
    { id: 'o1', label: 'When to escalate', targetModuleId: 'safety-escalation' },
    { id: 'o2', label: 'Risk signals', targetModuleId: 'intelligence-risk-signals' },
    { id: 'o3', label: 'Clinical methodology', targetModuleId: 'authority-methodology' }
  ],
  'safety-privacy': [
    { id: 'o1', label: 'Regulatory compliance', targetModuleId: 'safety-regulatory' },
    { id: 'o2', label: 'What you see vs what they share', targetModuleId: 'architecture-console-companion' },
    { id: 'o3', label: 'Data architecture', targetModuleId: 'flow-data-travels' }
  ],
  'safety-escalation': [
    { id: 'o1', label: 'Risk signals explained', targetModuleId: 'intelligence-risk-signals' },
    { id: 'o2', label: 'Intelligent triage', targetModuleId: 'scale-triage' },
    { id: 'o3', label: 'Clinical oversight', targetModuleId: 'safety-boundaries' }
  ],
  'safety-regulatory': [
    { id: 'o1', label: 'Privacy architecture', targetModuleId: 'safety-privacy' },
    { id: 'o2', label: 'Who built this', targetModuleId: 'authority-clinical-team' },
    { id: 'o3', label: 'Clinical validation', targetModuleId: 'authority-validation' }
  ],

  // FLOW onwards
  'flow-systems-talk': [
    { id: 'o1', label: 'EHR integration', targetModuleId: 'flow-ehr-integration' },
    { id: 'o2', label: 'How data travels', targetModuleId: 'flow-data-travels' },
    { id: 'o3', label: 'No silos', targetModuleId: 'flow-no-silos' }
  ],
  'flow-ehr-integration': [
    { id: 'o1', label: 'True interoperability', targetModuleId: 'flow-interoperability' },
    { id: 'o2', label: 'Built for existing workflow', targetModuleId: 'flow-existing-workflow' },
    { id: 'o3', label: 'How you work', targetModuleId: 'practice-how-you-work' }
  ],
  'flow-no-silos': [
    { id: 'o1', label: 'Context that travels', targetModuleId: 'continuity-contextual' },
    { id: 'o2', label: 'Seamless architecture', targetModuleId: 'architecture-seamless' },
    { id: 'o3', label: 'Complete system', targetModuleId: 'architecture-complete' }
  ],
  'flow-interoperability': [
    { id: 'o1', label: 'How data travels', targetModuleId: 'flow-data-travels' },
    { id: 'o2', label: 'Privacy maintained', targetModuleId: 'safety-privacy' },
    { id: 'o3', label: 'Regulatory compliance', targetModuleId: 'safety-regulatory' }
  ],
  'flow-data-travels': [
    { id: 'o1', label: 'System orchestration', targetModuleId: 'architecture-connects' },
    { id: 'o2', label: 'Privacy by design', targetModuleId: 'safety-privacy' },
    { id: 'o3', label: 'When systems talk', targetModuleId: 'flow-systems-talk' }
  ],
  'flow-existing-workflow': [
    { id: 'o1', label: 'Built for how you work', targetModuleId: 'practice-how-you-work' },
    { id: 'o2', label: 'EHR integration', targetModuleId: 'flow-ehr-integration' },
    { id: 'o3', label: 'Solo practice fit', targetModuleId: 'practice-solo' }
  ],

  // PRACTICE onwards
  'practice-solo': [
    { id: 'o1', label: 'Scale without compromise', targetModuleId: 'scale-without-compromise' },
    { id: 'o2', label: 'Your clinical leverage', targetModuleId: 'scale-leverage' },
    { id: 'o3', label: 'Built for your workflow', targetModuleId: 'practice-how-you-work' }
  ],
  'practice-group': [
    { id: 'o1', label: 'Scale across clinicians', targetModuleId: 'scale-100-clients' },
    { id: 'o2', label: 'Consistent methodology', targetModuleId: 'authority-methodology' },
    { id: 'o3', label: 'Evidence across practice', targetModuleId: 'evidence-outcomes' }
  ],
  'practice-treatment-centers': [
    { id: 'o1', label: 'Scale without losing personalization', targetModuleId: 'scale-without-compromise' },
    { id: 'o2', label: 'IOP support', targetModuleId: 'practice-iop' },
    { id: 'o3', label: 'Aftercare transitions', targetModuleId: 'practice-aftercare' }
  ],
  'practice-outpatient': [
    { id: 'o1', label: 'Weekly flow', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o2', label: 'Bridge between sessions', targetModuleId: 'continuity-bridge' },
    { id: 'o3', label: 'Evidence over time', targetModuleId: 'evidence-trajectory' }
  ],
  'practice-iop': [
    { id: 'o1', label: 'Daily structure', targetModuleId: 'continuity-rhythm' },
    { id: 'o2', label: 'Clinical oversight at scale', targetModuleId: 'scale-triage' },
    { id: 'o3', label: 'Transition to aftercare', targetModuleId: 'practice-aftercare' }
  ],
  'practice-aftercare': [
    { id: 'o1', label: 'Continuity maintained', targetModuleId: 'continuity-bridge' },
    { id: 'o2', label: 'Long-term outcomes', targetModuleId: 'transformation-90-days' },
    { id: 'o3', label: 'Evidence of sustained change', targetModuleId: 'evidence-trajectory' }
  ],
  'practice-how-you-work': [
    { id: 'o1', label: 'EHR integration', targetModuleId: 'flow-ehr-integration' },
    { id: 'o2', label: 'Existing workflow', targetModuleId: 'flow-existing-workflow' },
    { id: 'o3', label: 'Your practice type', targetModuleId: 'practice-solo' }
  ],

  // SCALE onwards
  'scale-without-compromise': [
    { id: 'o1', label: 'What 50 clients looks like', targetModuleId: 'scale-50-clients' },
    { id: 'o2', label: 'Your clinical leverage', targetModuleId: 'scale-leverage' },
    { id: 'o3', label: 'Intelligence that helps', targetModuleId: 'intelligence-augmented' }
  ],
  'scale-50-clients': [
    { id: 'o1', label: 'Intelligent triage', targetModuleId: 'scale-triage' },
    { id: 'o2', label: 'Dashboard that scales', targetModuleId: 'scale-dashboard' },
    { id: 'o3', label: 'What 100 looks like', targetModuleId: 'scale-100-clients' }
  ],
  'scale-100-clients': [
    { id: 'o1', label: 'System handles volume', targetModuleId: 'scale-triage' },
    { id: 'o2', label: 'You handle decisions', targetModuleId: 'safety-essential' },
    { id: 'o3', label: 'Evidence at scale', targetModuleId: 'scale-leverage' }
  ],
  'scale-dashboard': [
    { id: 'o1', label: 'Console view', targetModuleId: 'architecture-console-companion' },
    { id: 'o2', label: 'Intelligent triage', targetModuleId: 'scale-triage' },
    { id: 'o3', label: 'What you see', targetModuleId: 'evidence-patterns' }
  ],
  'scale-triage': [
    { id: 'o1', label: 'Risk signals', targetModuleId: 'intelligence-risk-signals' },
    { id: 'o2', label: 'When to escalate', targetModuleId: 'safety-escalation' },
    { id: 'o3', label: 'Dashboard overview', targetModuleId: 'scale-dashboard' }
  ],
  'scale-leverage': [
    { id: 'o1', label: 'Evidence of impact', targetModuleId: 'evidence-outcomes' },
    { id: 'o2', label: 'Scale without compromise', targetModuleId: 'scale-without-compromise' },
    { id: 'o3', label: 'Your role remains central', targetModuleId: 'safety-essential' }
  ],

  // TRANSFORMATION onwards
  'transformation-what-changes': [
    { id: 'o1', label: 'First 30 days', targetModuleId: 'transformation-30-days' },
    { id: 'o2', label: 'First 90 days', targetModuleId: 'transformation-90-days' },
    { id: 'o3', label: 'Evidence over time', targetModuleId: 'evidence-trajectory' }
  ],
  'transformation-30-days': [
    { id: 'o1', label: 'First 90 days', targetModuleId: 'transformation-90-days' },
    { id: 'o2', label: 'Patterns emerging', targetModuleId: 'evidence-patterns' },
    { id: 'o3', label: 'Client experience', targetModuleId: 'transformation-client-perspective' }
  ],
  'transformation-90-days': [
    { id: 'o1', label: 'Long-term trajectories', targetModuleId: 'evidence-trajectory' },
    { id: 'o2', label: 'Before and after', targetModuleId: 'evidence-before-after' },
    { id: 'o3', label: 'What actually changed', targetModuleId: 'transformation-what-changes' }
  ],
  'transformation-client-perspective': [
    { id: 'o1', label: 'What they experience', targetModuleId: 'architecture-console-companion' },
    { id: 'o2', label: 'Daily flow', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o3', label: 'Your perspective', targetModuleId: 'transformation-practice-perspective' }
  ],
  'transformation-practice-perspective': [
    { id: 'o1', label: 'What you see', targetModuleId: 'scale-dashboard' },
    { id: 'o2', label: 'Evidence visualized', targetModuleId: 'evidence-visible' },
    { id: 'o3', label: 'Client perspective', targetModuleId: 'transformation-client-perspective' }
  ],

  // AUTHORITY onwards
  'authority-clinical-foundations': [
    { id: 'o1', label: 'The six pillars', targetModuleId: 'authority-six-pillars' },
    { id: 'o2', label: 'The methodology', targetModuleId: 'authority-methodology' },
    { id: 'o3', label: 'Research backing', targetModuleId: 'authority-research-backed' }
  ],
  'authority-six-pillars': [
    { id: 'o1', label: 'How they manifest', targetModuleId: 'continuity-rhythm' },
    { id: 'o2', label: 'Clinical foundations', targetModuleId: 'authority-clinical-foundations' },
    { id: 'o3', label: 'Evidence validated', targetModuleId: 'evidence-validated' }
  ],
  'authority-research-backed': [
    { id: 'o1', label: 'Clinical validation', targetModuleId: 'authority-validation' },
    { id: 'o2', label: 'Outcomes measured', targetModuleId: 'evidence-outcomes' },
    { id: 'o3', label: 'Who built this', targetModuleId: 'authority-clinical-team' }
  ],
  'authority-clinical-team': [
    { id: 'o1', label: 'The methodology', targetModuleId: 'authority-methodology' },
    { id: 'o2', label: 'Clinical foundations', targetModuleId: 'authority-clinical-foundations' },
    { id: 'o3', label: 'Why this exists', targetModuleId: 'continuity-not-there' }
  ],
  'authority-methodology': [
    { id: 'o1', label: 'Six pillars in practice', targetModuleId: 'authority-six-pillars' },
    { id: 'o2', label: 'How it works daily', targetModuleId: 'continuity-rhythm' },
    { id: 'o3', label: 'Evidence of effectiveness', targetModuleId: 'authority-validation' }
  ],
  'authority-validation': [
    { id: 'o1', label: 'Outcomes measured', targetModuleId: 'evidence-outcomes' },
    { id: 'o2', label: 'Research foundations', targetModuleId: 'authority-research-backed' },
    { id: 'o3', label: 'Real-world results', targetModuleId: 'transformation-what-changes' }
  ],

  // PRICING onwards
  'pricing-foundation': [
    { id: 'o1', label: 'See Professional tier', targetModuleId: 'pricing-professional' },
    { id: 'o2', label: 'How therapeutic continuity works', targetModuleId: 'feature-therapeutic-continuity' },
    { id: 'o3', label: 'What 50 clients looks like', targetModuleId: 'scale-50-clients' }
  ],
  'pricing-professional': [
    { id: 'o1', label: 'See Foundation tier', targetModuleId: 'pricing-foundation' },
    { id: 'o2', label: 'See Enterprise tier', targetModuleId: 'pricing-enterprise' },
    { id: 'o3', label: 'Sustainable practice model', targetModuleId: 'feature-sustainable-practice' }
  ],
  'pricing-enterprise': [
    { id: 'o1', label: 'See Professional tier', targetModuleId: 'pricing-professional' },
    { id: 'o2', label: 'Scale without compromise', targetModuleId: 'scale-without-compromise' },
    { id: 'o3', label: 'For treatment centers', targetModuleId: 'practice-treatment-centers' }
  ],

  // FEATURE DEEP DIVE onwards
  'feature-therapeutic-continuity': [
    { id: 'o1', label: 'How LUMA extends your reach', targetModuleId: 'intelligence-luma-works' },
    { id: 'o2', label: 'Weekly flow in action', targetModuleId: 'continuity-weekly-flow' },
    { id: 'o3', label: 'Subscribe with Foundation', targetModuleId: 'pricing-foundation' }
  ],
  'feature-neuroadaptive-progress': [
    { id: 'o1', label: 'Daily rhythm explained', targetModuleId: 'continuity-rhythm' },
    { id: 'o2', label: 'Intelligence layer', targetModuleId: 'intelligence-patterns' },
    { id: 'o3', label: 'Transform with Professional', targetModuleId: 'pricing-professional' }
  ],
  'feature-ethical-economics': [
    { id: 'o1', label: 'Sustainable practice', targetModuleId: 'feature-sustainable-practice' },
    { id: 'o2', label: 'Professional evolution', targetModuleId: 'feature-professional-evolution' },
    { id: 'o3', label: 'See pricing options', targetModuleId: 'pricing-professional' }
  ],
  'feature-privacy-default': [
    { id: 'o1', label: 'Privacy architecture', targetModuleId: 'safety-privacy' },
    { id: 'o2', label: 'Regulatory compliance', targetModuleId: 'safety-regulatory' },
    { id: 'o3', label: 'Clinical grade security', targetModuleId: 'feature-clinical-security' }
  ],
  'feature-trauma-aware': [
    { id: 'o1', label: 'Nervous system respect', targetModuleId: 'safety-boundaries' },
    { id: 'o2', label: 'Clinical methodology', targetModuleId: 'authority-methodology' },
    { id: 'o3', label: 'Client perspective', targetModuleId: 'transformation-client-perspective' }
  ],
  'feature-clinical-security': [
    { id: 'o1', label: 'Privacy by default', targetModuleId: 'feature-privacy-default' },
    { id: 'o2', label: 'Regulatory compliance', targetModuleId: 'safety-regulatory' },
    { id: 'o3', label: 'Enterprise infrastructure', targetModuleId: 'pricing-enterprise' }
  ],
  'feature-deeper-impact': [
    { id: 'o1', label: 'Evidence of outcomes', targetModuleId: 'evidence-outcomes' },
    { id: 'o2', label: '90-day transformation', targetModuleId: 'transformation-90-days' },
    { id: 'o3', label: 'Transform with Professional', targetModuleId: 'pricing-professional' }
  ],
  'feature-sustainable-practice': [
    { id: 'o1', label: 'Ethical economics', targetModuleId: 'feature-ethical-economics' },
    { id: 'o2', label: 'Professional evolution', targetModuleId: 'feature-professional-evolution' },
    { id: 'o3', label: 'See pricing tiers', targetModuleId: 'pricing-professional' }
  ],
  'feature-professional-evolution': [
    { id: 'o1', label: 'From clinician to architect', targetModuleId: 'transformation-practice-perspective' },
    { id: 'o2', label: 'Scale your impact', targetModuleId: 'scale-leverage' },
    { id: 'o3', label: 'Transform with Professional', targetModuleId: 'pricing-professional' }
  ]
};
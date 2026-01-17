/**
 * DUAL PERSPECTIVE MODULE
 * 
 * Shows the split reality of Recoverlution:
 * - LEFT: What clients experience (mobile companion)
 * - RIGHT: What therapists see (console view)
 * 
 * Interactive toggle between perspectives.
 * Built for the "Console and Companion" hero module.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Monitor, 
  Eye,
  Activity,
  MessageCircle,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface DualPerspectiveModuleProps {
  moduleId: string;
}

export function DualPerspectiveModule({ moduleId }: DualPerspectiveModuleProps) {
  const [activePerspective, setActivePerspective] = useState<'client' | 'therapist'>('client');
  const [activeFeature, setActiveFeature] = useState<number>(0);
  
  // Module-specific titles
  const moduleConfig: Record<string, { title: string; subtitle: string; categoryColor: string }> = {
    'architecture-console-companion': {
      title: 'Console and companion',
      subtitle: 'What you see. What they experience.',
      categoryColor: '#9B87F5'
    },
    'architecture-seamless': {
      title: 'Seamless by design',
      subtitle: 'Clients experience flow. You see the orchestration.',
      categoryColor: '#9B87F5'
    },
    'scale-dashboard': {
      title: 'The dashboard that scales',
      subtitle: 'See what matters. Filter by urgency. Stay focused.',
      categoryColor: '#FFD93D'
    },
    'start-therapist-solo-to-scale': {
      title: 'From 1 client to 10 clients',
      subtitle: 'Solo practitioner growth path.',
      categoryColor: '#6BCF7F'
    },
    'start-patient-with-therapist': {
      title: 'How your therapist sees what you see',
      subtitle: 'Shared view. Full privacy control. Connected care.',
      categoryColor: '#6BCF7F'
    },
    'start-facility-scale': {
      title: 'From 10 patients to 100',
      subtitle: 'Scaling strategy. Facility dashboard. Managing at scale.',
      categoryColor: '#6BCF7F'
    }
  };
  
  const config = moduleConfig[moduleId] || moduleConfig['architecture-console-companion'];

  // The features to showcase
  const features = [
    {
      id: 'daily-checkin',
      name: 'Daily Check-ins',
      client: {
        title: 'Morning STATE',
        subtitle: 'How are you feeling today?',
        description: 'Quick, conversational check-in that feels like journaling, not homework.',
        visual: 'chat-interface'
      },
      therapist: {
        title: 'STATE Dashboard',
        subtitle: 'Client readiness at a glance',
        description: 'See trends across physical, emotional, cognitive, and relational states. No diary entries, just the signal.',
        visual: 'dashboard-trends'
      }
    },
    {
      id: 'luma-support',
      name: 'LUMA Conversations',
      client: {
        title: 'Evening Check-in',
        subtitle: 'LUMA asks about your day',
        description: 'Reflective conversation that surfaces patterns, celebrates wins, offers gentle guidance.',
        visual: 'luma-chat'
      },
      therapist: {
        title: 'LUMA Insights',
        subtitle: 'What patterns emerged',
        description: 'High-level summaries of conversations. Risk signals flagged. Themes tracked over time.',
        visual: 'insights-panel'
      }
    },
    {
      id: 'momentum',
      name: 'Progress Tracking',
      client: {
        title: 'Your Journey',
        subtitle: 'See how far you\'ve come',
        description: 'Beautiful visualizations showing progress across recovery pillars. Wins celebrated, not just struggles tracked.',
        visual: 'client-progress'
      },
      therapist: {
        title: 'Momentum Analytics',
        subtitle: 'Patterns across time',
        description: 'Comprehensive view of client trajectory. Compare baselines, spot inflection points, validate interventions.',
        visual: 'analytics-view'
      }
    }
  ];

  const currentFeature = features[activeFeature];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{
            background: `linear-gradient(135deg, ${config.categoryColor}25, ${config.categoryColor}15)`,
            border: `1px solid ${config.categoryColor}40`
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            {moduleId.startsWith('architecture') ? 'THE ARCHITECTURE' : 'SCALE'}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '-0.02em',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '0.75rem',
            lineHeight: 1.2
          }}
        >
          {config.title}
        </h2>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.70)',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          {config.subtitle}
        </p>
      </div>

      {/* Perspective Toggle */}
      <div 
        className="flex gap-2 p-1 mb-8"
        style={{
          background: 'rgba(0, 0, 0, 0.30)',
          borderRadius: '0px',
          border: '1px solid rgba(255, 255, 255, 0.10)'
        }}
      >
        <button
          onClick={() => setActivePerspective('client')}
          className="flex-1 flex items-center justify-center gap-2 py-3 transition-all relative"
          style={{
            background: activePerspective === 'client' 
              ? 'linear-gradient(135deg, rgba(87, 57, 251, 0.40), rgba(62, 43, 184, 0.30))'
              : 'transparent',
            borderRadius: '0px',
            border: activePerspective === 'client'
              ? '1px solid rgba(87, 57, 251, 0.60)'
              : '1px solid transparent'
          }}
        >
          <Smartphone size={16} style={{ color: activePerspective === 'client' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.50)' }} />
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activePerspective === 'client' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.50)'
            }}
          >
            Client View
          </span>
        </button>

        <button
          onClick={() => setActivePerspective('therapist')}
          className="flex-1 flex items-center justify-center gap-2 py-3 transition-all relative"
          style={{
            background: activePerspective === 'therapist' 
              ? 'linear-gradient(135deg, rgba(87, 57, 251, 0.40), rgba(62, 43, 184, 0.30))'
              : 'transparent',
            borderRadius: '0px',
            border: activePerspective === 'therapist'
              ? '1px solid rgba(87, 57, 251, 0.60)'
              : '1px solid transparent'
          }}
        >
          <Monitor size={16} style={{ color: activePerspective === 'therapist' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.50)' }} />
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activePerspective === 'therapist' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.50)'
            }}
          >
            Therapist Console
          </span>
        </button>
      </div>

      {/* Feature Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {features.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(index)}
            className="px-4 py-2 whitespace-nowrap transition-all"
            style={{
              background: activeFeature === index
                ? 'rgba(255, 255, 255, 0.10)'
                : 'rgba(255, 255, 255, 0.05)',
              border: activeFeature === index
                ? '1px solid rgba(255, 255, 255, 0.20)'
                : '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: '0px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: activeFeature === index
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(255, 255, 255, 0.60)'
            }}
          >
            {feature.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePerspective}-${activeFeature}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activePerspective === 'client' ? (
            <ClientPerspective feature={currentFeature} />
          ) : (
            <TherapistPerspective feature={currentFeature} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Key Insight */}
      <motion.div
        className="mt-8 p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.15), rgba(62, 43, 184, 0.10))',
          border: '1px solid rgba(87, 57, 251, 0.30)',
          borderRadius: '0px'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(87, 57, 251, 0.20)',
              borderRadius: '0px'
            }}
          >
            <Eye size={16} style={{ color: '#FFFFFF' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              The Key
            </div>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'rgba(255, 255, 255, 0.80)',
                lineHeight: 1.6,
                fontWeight: 500
              }}
            >
              They experience support. You receive signal. Privacy protected, relationship deepened, outcomes measured. This is the architecture that makes continuity possible.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Client Perspective Component
function ClientPerspective({ feature }: { feature: typeof features[0] }) {
  const { client } = feature;

  return (
    <div
      className="p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: '0px',
        minHeight: '320px'
      }}
    >
      {/* Mobile Frame Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.30), rgba(62, 43, 184, 0.20))',
            borderRadius: '0px'
          }}
        >
          <Smartphone size={18} style={{ color: '#FFFFFF' }} />
        </div>
        <div>
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.50)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Mobile Experience
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.90)'
            }}
          >
            What your client sees
          </div>
        </div>
      </div>

      {/* Content */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.5rem',
          letterSpacing: '-0.01em',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '0.5rem'
        }}
      >
        {client.title}
      </h3>

      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.70)',
          marginBottom: '1.5rem',
          fontWeight: 500,
          fontStyle: 'italic'
        }}
      >
        {client.subtitle}
      </p>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: '2rem'
        }}
      >
        {client.description}
      </p>

      {/* Visual Placeholder */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.20))',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '0px',
          padding: '2rem',
          minHeight: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="text-center">
          <MessageCircle size={32} style={{ color: 'rgba(255, 255, 255, 0.30)', margin: '0 auto 0.75rem' }} />
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.40)',
              fontWeight: 500,
              fontStyle: 'italic'
            }}
          >
            Interactive {client.visual} will render here
          </div>
        </div>
      </div>
    </div>
  );
}

// Therapist Perspective Component
function TherapistPerspective({ feature }: { feature: typeof features[0] }) {
  const { therapist } = feature;

  return (
    <div
      className="p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: '0px',
        minHeight: '320px'
      }}
    >
      {/* Desktop Frame Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.30), rgba(62, 43, 184, 0.20))',
            borderRadius: '0px'
          }}
        >
          <Monitor size={18} style={{ color: '#FFFFFF' }} />
        </div>
        <div>
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.50)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Console View
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.90)'
            }}
          >
            What you see in your dashboard
          </div>
        </div>
      </div>

      {/* Content */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.5rem',
          letterSpacing: '-0.01em',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '0.5rem'
        }}
      >
        {therapist.title}
      </h3>

      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.70)',
          marginBottom: '1.5rem',
          fontWeight: 500,
          fontStyle: 'italic'
        }}
      >
        {therapist.subtitle}
      </p>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: '2rem'
        }}
      >
        {therapist.description}
      </p>

      {/* Visual Placeholder */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.20))',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '0px',
          padding: '2rem',
          minHeight: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="text-center">
          <TrendingUp size={32} style={{ color: 'rgba(255, 255, 255, 0.30)', margin: '0 auto 0.75rem' }} />
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.40)',
              fontWeight: 500,
              fontStyle: 'italic'
            }}
          >
            Interactive {therapist.visual} will render here
          </div>
        </div>
      </div>
    </div>
  );
}

// Fix the features constant scope
const features = [
  {
    id: 'daily-checkin',
    name: 'Daily Check-ins',
    client: {
      title: 'Morning STATE',
      subtitle: 'How are you feeling today?',
      description: 'Quick, conversational check-in that feels like journaling, not homework.',
      visual: 'chat-interface'
    },
    therapist: {
      title: 'STATE Dashboard',
      subtitle: 'Client readiness at a glance',
      description: 'See trends across physical, emotional, cognitive, and relational states. No diary entries, just the signal.',
      visual: 'dashboard-trends'
    }
  },
  {
    id: 'luma-support',
    name: 'LUMA Conversations',
    client: {
      title: 'Evening Check-in',
      subtitle: 'LUMA asks about your day',
      description: 'Reflective conversation that surfaces patterns, celebrates wins, offers gentle guidance.',
      visual: 'luma-chat'
    },
    therapist: {
      title: 'LUMA Insights',
      subtitle: 'What patterns emerged',
      description: 'High-level summaries of conversations. Risk signals flagged. Themes tracked over time.',
      visual: 'insights-panel'
    }
  },
  {
    id: 'momentum',
    name: 'Progress Tracking',
    client: {
      title: 'Your Journey',
      subtitle: 'See how far you\'ve come',
      description: 'Beautiful visualizations showing progress across recovery pillars. Wins celebrated, not just struggles tracked.',
      visual: 'client-progress'
    },
    therapist: {
      title: 'Momentum Analytics',
      subtitle: 'Patterns across time',
      description: 'Comprehensive view of client trajectory. Compare baselines, spot inflection points, validate interventions.',
      visual: 'analytics-view'
    }
  }
];

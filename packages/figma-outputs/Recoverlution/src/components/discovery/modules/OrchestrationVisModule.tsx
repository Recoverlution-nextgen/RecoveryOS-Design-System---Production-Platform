/**
 * ORCHESTRATION VIS MODULE
 * 
 * Visual system diagrams showing how features connect and flow together.
 * Architecture visualization with interactive elements.
 * 
 * Created: December 10, 2025
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Circle, CheckCircle2 } from 'lucide-react';

interface OrchestrationVisModuleProps {
  moduleId: string;
}

// Module-specific orchestration configurations
const ORCHESTRATION_CONTENT: Record<string, {
  categoryName: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  layers: Array<{
    name: string;
    color: string;
    features: Array<{
      name: string;
      description: string;
    }>;
  }>;
  flows: Array<{
    from: string;
    to: string;
    description: string;
  }>;
}> = {
  'architecture-complete': {
    categoryName: 'ARCHITECTURE',
    categoryColor: '#9B87F5',
    title: 'The complete system',
    subtitle: 'Nine features across three layers.',
    layers: [
      {
        name: 'Engagement Layer',
        color: '#E85D75',
        features: [
          {
            name: 'STATE',
            description: 'Daily check-ins. Quick self-assessment across physical, emotional, cognitive, relational dimensions. 90 seconds. Establishes baseline and tracks shifts.'
          },
          {
            name: 'LUMA',
            description: 'Conversational AI companion. Evening reflections. Crisis support. Skill reinforcement. Available 24/7. Clinically grounded, contextually aware.'
          },
          {
            name: 'NaviCues',
            description: 'Just-in-time interventions. Triggered by STATE signals and behavioral patterns. Delivers coping techniques exactly when dysregulation begins.'
          }
        ]
      },
      {
        name: 'Intelligence Layer',
        color: '#F59E42',
        features: [
          {
            name: 'Momentum',
            description: 'Pattern recognition engine. Analyzes STATE trends, LUMA themes, behavioral signals. Surfaces insights invisible to single moments.'
          },
          {
            name: 'Compass',
            description: 'Clinical dashboard for therapists. Real-time client status. Risk signals. Engagement patterns. Thematic analysis. Triage intelligence.'
          },
          {
            name: 'Ripple',
            description: 'Care coordination hub. Connects clinicians, case managers, family members (with consent). Shared visibility without privacy compromise.'
          }
        ]
      },
      {
        name: 'Evidence Layer',
        color: '#5AB9EA',
        features: [
          {
            name: 'Trajectory',
            description: 'Longitudinal outcome tracking. Baseline to current state visualization. Progress quantified. Setbacks contextualized. Stories told through data.'
          },
          {
            name: 'Resonance',
            description: 'Commissioner-facing analytics. Population health metrics. Treatment effectiveness. ROI demonstration. Regulatory reporting automation.'
          },
          {
            name: 'Echo',
            description: 'Client-facing progress view. Visualizes their own growth. Celebrates milestones. Maintains motivation through visible evidence of change.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'STATE',
        to: 'LUMA',
        description: 'Morning STATE signals inform evening LUMA conversation topics and emotional tone'
      },
      {
        from: 'STATE',
        to: 'NaviCues',
        description: 'Declining STATE scores trigger timely intervention delivery'
      },
      {
        from: 'LUMA',
        to: 'Momentum',
        description: 'Conversation themes feed pattern recognition and clinical insights'
      },
      {
        from: 'Momentum',
        to: 'Compass',
        description: 'Insights surface in therapist dashboard for session preparation'
      },
      {
        from: 'STATE + LUMA + NaviCues',
        to: 'Trajectory',
        description: 'All engagement data flows into longitudinal outcome visualization'
      },
      {
        from: 'Trajectory',
        to: 'Echo',
        description: 'Progress metrics displayed to client for motivation and self-awareness'
      },
      {
        from: 'Compass + Trajectory',
        to: 'Resonance',
        description: 'Clinical and outcome data aggregated for organizational reporting'
      }
    ]
  },
  'architecture-connects': {
    categoryName: 'ARCHITECTURE',
    categoryColor: '#9B87F5',
    title: 'How everything connects',
    subtitle: 'STATE flows to LUMA flows to Momentum.',
    layers: [
      {
        name: 'Daily Rhythm',
        color: '#E85D75',
        features: [
          {
            name: 'Morning STATE',
            description: '8am check-in establishes baseline for the day'
          },
          {
            name: 'Afternoon NaviCue',
            description: 'If STATE shows stress, intervention offered at optimal moment'
          },
          {
            name: 'Evening LUMA',
            description: 'Reflection conversation informed by morning signal and afternoon event'
          }
        ]
      },
      {
        name: 'Weekly Pattern',
        color: '#F59E42',
        features: [
          {
            name: 'Momentum Analysis',
            description: '7 days of data reveal patterns: weekend vulnerability, Monday anxiety, stress accumulation'
          },
          {
            name: 'Compass Alert',
            description: 'Therapist sees pattern before Thursday session. Adjusts approach accordingly.'
          },
          {
            name: 'Session Integration',
            description: 'Conversation starts with data-informed insight, not status-checking guesswork'
          }
        ]
      },
      {
        name: 'Longitudinal Evidence',
        color: '#5AB9EA',
        features: [
          {
            name: 'Trajectory Mapping',
            description: 'Week 1 baseline vs Week 12 current. Change quantified. Progress undeniable.'
          },
          {
            name: 'Echo Reflection',
            description: 'Client sees own growth. Motivation maintained through visible evidence.'
          },
          {
            name: 'Resonance Reporting',
            description: 'Commissioners validate investment. Outcomes demonstrate value. Funding continues.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Morning STATE',
        to: 'Evening LUMA',
        description: 'Context carries across the day. LUMA knows client reported high stress this morning.'
      },
      {
        from: 'Daily Engagement',
        to: 'Weekly Patterns',
        description: 'Seven days of data points reveal what single moments cannot.'
      },
      {
        from: 'Weekly Insights',
        to: 'Therapeutic Sessions',
        description: 'Patterns inform clinical decisions. Sessions build on data, not assumptions.'
      },
      {
        from: 'Session + Data',
        to: 'Longitudinal Outcomes',
        description: 'Evidence accumulates. Trajectories become visible. Change is measured.'
      }
    ]
  },
  'architecture-three-layers': {
    categoryName: 'ARCHITECTURE',
    categoryColor: '#9B87F5',
    title: 'Three layers, one system',
    subtitle: 'Engagement. Intelligence. Evidence.',
    layers: [
      {
        name: 'Engagement Layer',
        color: '#E85D75',
        features: [
          {
            name: 'STATE',
            description: 'Daily 90-second check-ins tracking physical, emotional, cognitive, relational state. Baseline established. Trends visible.'
          },
          {
            name: 'LUMA',
            description: 'Evening conversational AI. Validates, reflects, reinforces skills. Available 24/7 within clinical boundaries.'
          },
          {
            name: 'NaviCues',
            description: 'Just-in-time interventions. Delivers coping techniques when dysregulation detected. Skills accessible when needed.'
          }
        ]
      },
      {
        name: 'Intelligence Layer',
        color: '#F59E42',
        features: [
          {
            name: 'Momentum',
            description: 'Pattern recognition engine. Identifies cycles, triggers, protective factors. Weekly summaries generated.'
          },
          {
            name: 'Compass',
            description: 'Clinician dashboard. Real-time client status. Intelligent triage. Risk signals. Session prep automated.'
          },
          {
            name: 'Ripple',
            description: 'Care coordination. Multiple providers see shared context (with consent). Integrated care actually integrated.'
          }
        ]
      },
      {
        name: 'Evidence Layer',
        color: '#5AB9EA',
        features: [
          {
            name: 'Trajectory',
            description: 'Longitudinal outcomes. Baseline to current. Progress quantified. Change visualized over time.'
          },
          {
            name: 'Resonance',
            description: 'Commissioner analytics. Population health metrics. ROI demonstration. Regulatory reporting automated.'
          },
          {
            name: 'Echo',
            description: 'Client progress view. Their own growth visualized. Motivation maintained through visible evidence.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Engagement Layer',
        to: 'Intelligence Layer',
        description: 'Daily STATE and LUMA data flows into Momentum for pattern analysis and Compass for clinical oversight'
      },
      {
        from: 'Intelligence Layer',
        to: 'Evidence Layer',
        description: 'Patterns and insights become longitudinal evidence tracked in Trajectory and aggregated in Resonance'
      },
      {
        from: 'Engagement Layer',
        to: 'Evidence Layer',
        description: 'Raw engagement data feeds directly into outcome tracking, creating evidence from daily behavior'
      }
    ]
  },
  'architecture-nine-features': {
    categoryName: 'ARCHITECTURE',
    categoryColor: '#9B87F5',
    title: 'Nine features working as one',
    subtitle: 'Each distinct. Together, transformative.',
    layers: [
      {
        name: 'Client-Facing',
        color: '#E85D75',
        features: [
          {
            name: 'STATE',
            description: 'What they do: 90-second daily check-ins'
          },
          {
            name: 'LUMA',
            description: 'What they experience: Evening support conversations'
          },
          {
            name: 'Echo',
            description: 'What they see: Their own progress visualized'
          }
        ]
      },
      {
        name: 'Clinician-Facing',
        color: '#F59E42',
        features: [
          {
            name: 'Compass',
            description: 'What you see: Dashboard with intelligent triage'
          },
          {
            name: 'Momentum',
            description: 'What you learn: Patterns across time revealed'
          },
          {
            name: 'Trajectory',
            description: 'What you demonstrate: Longitudinal outcomes proven'
          }
        ]
      },
      {
        name: 'System-Level',
        color: '#5AB9EA',
        features: [
          {
            name: 'NaviCues',
            description: 'What happens automatically: Just-in-time interventions'
          },
          {
            name: 'Ripple',
            description: 'What enables collaboration: Care coordination hub'
          },
          {
            name: 'Resonance',
            description: 'What proves value: Commissioner analytics'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Client engagement',
        to: 'Clinical intelligence',
        description: 'Everything clients do generates intelligence for clinical decision-making'
      },
      {
        from: 'Clinical intelligence',
        to: 'System interventions',
        description: 'Insights trigger automated interventions and care coordination'
      },
      {
        from: 'All features',
        to: 'Evidence generation',
        description: 'Every interaction contributes to demonstrable outcomes'
      }
    ]
  },
  'flow-systems-talk': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'When systems talk',
    subtitle: 'Your EHR. Their companion. Seamless data flow.',
    layers: [
      {
        name: 'Recoverlution Platform',
        color: '#9B87F5',
        features: [
          {
            name: 'Client App',
            description: 'STATE check-ins. LUMA conversations. Echo progress view. NaviCue delivery.'
          },
          {
            name: 'Clinician Console',
            description: 'Compass dashboard. Momentum insights. Trajectory outcomes. Ripple coordination.'
          },
          {
            name: 'Analytics Engine',
            description: 'Pattern recognition. Risk detection. Outcome tracking. Evidence generation.'
          }
        ]
      },
      {
        name: 'Your EHR',
        color: '#5AB9EA',
        features: [
          {
            name: 'Progress Notes',
            description: 'Recoverlution summaries flow in. Weekly insights auto-populated. Documentation burden reduced.'
          },
          {
            name: 'Outcome Measures',
            description: 'STATE-derived PHQ-9, GAD-7 results. No duplicate entry. Automatically tracked.'
          },
          {
            name: 'Treatment Plans',
            description: 'Recoverlution goals integrated. Progress against plans visible. Adjustments informed by data.'
          }
        ]
      },
      {
        name: 'Other Systems',
        color: '#4ECDC4',
        features: [
          {
            name: 'Billing Systems',
            description: 'Engagement documentation supports claims. Time tracking automated. Denials reduced.'
          },
          {
            name: 'Quality Reporting',
            description: 'CMS quality metrics extracted automatically. Regulatory reporting simplified.'
          },
          {
            name: 'Care Coordination',
            description: 'External providers (with consent) receive relevant updates. Integrated care enabled.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Client App',
        to: 'Analytics Engine',
        description: 'Every STATE check-in and LUMA conversation processed for clinical intelligence'
      },
      {
        from: 'Analytics Engine',
        to: 'Clinician Console',
        description: 'Insights surface in dashboard for session preparation and triage'
      },
      {
        from: 'Clinician Console',
        to: 'Your EHR',
        description: 'Weekly summaries, risk alerts, and outcome data flow into your documentation system'
      },
      {
        from: 'Your EHR',
        to: 'Other Systems',
        description: 'Data continues flowing to billing, quality reporting, and coordination platforms'
      }
    ]
  },
  'flow-data-travels': {
    categoryName: 'FLOW',
    categoryColor: '#FF6B9D',
    title: 'How data travels',
    subtitle: 'Secure. Seamless. Standards-compliant.',
    layers: [
      {
        name: 'Data Capture',
        color: '#E85D75',
        features: [
          {
            name: 'Client Input',
            description: 'STATE sliders moved. LUMA messages typed. Encrypted immediately on device.'
          },
          {
            name: 'Secure Transmission',
            description: 'TLS 1.3 encryption. HTTPS only. Data in transit fully protected.'
          },
          {
            name: 'Server Reception',
            description: 'HIPAA-compliant infrastructure receives data. Validated. Stored encrypted at rest.'
          }
        ]
      },
      {
        name: 'Data Processing',
        color: '#F59E42',
        features: [
          {
            name: 'Analytics Processing',
            description: 'Patterns identified. Themes extracted. Risk signals detected. All server-side, never third-party.'
          },
          {
            name: 'Intelligence Generation',
            description: 'Clinical insights created. Trends calculated. Momentum analytics generated.'
          },
          {
            name: 'Privacy Filtering',
            description: 'Raw conversations stay private. Only clinical intelligence passed to clinicians.'
          }
        ]
      },
      {
        name: 'Data Delivery',
        color: '#5AB9EA',
        features: [
          {
            name: 'Clinician Dashboard',
            description: 'Curated insights displayed. Role-based access enforced. Only what you need to see.'
          },
          {
            name: 'EHR Integration',
            description: 'FHIR-standard data flows to your EHR. Interoperable by design.'
          },
          {
            name: 'Audit Logging',
            description: 'Every data access logged. Complete audit trail for compliance.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Client Device',
        to: 'Secure Servers',
        description: 'Encrypted transmission ensures data security from point of capture'
      },
      {
        from: 'Secure Servers',
        to: 'Analytics Engine',
        description: 'Processing happens in controlled environment, never exposing raw data unnecessarily'
      },
      {
        from: 'Analytics Engine',
        to: 'Multiple Destinations',
        description: 'Intelligence flows to dashboard, EHR, and analytics platforms via secure channels'
      }
    ]
  },

  // ========================================
  // START: PATIENT DAILY RHYTHM
  // ========================================
  'start-patient-daily-rhythm': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'What your days look like',
    subtitle: 'Morning signal. Midday awareness. Evening reflection.',
    layers: [
      {
        name: 'Morning',
        color: '#FF9D66',
        features: [
          {
            name: 'STATE Check-in',
            description: '8am notification. Four quick sliders: Physical, Emotional, Cognitive, Relational. 90 seconds total. Sets baseline for the day.'
          },
          {
            name: 'Morning Intention',
            description: 'After STATE: "What\'s one thing you want to focus on today?" Optional. Brief. Creates mindful start.'
          },
          {
            name: 'Suggested Journey',
            description: 'If STATE shows stress or low energy, app suggests appropriate Journey: grounding, energy, connection.'
          }
        ]
      },
      {
        name: 'Throughout Day',
        color: '#5AB9EA',
        features: [
          {
            name: 'Awareness Moments',
            description: 'Optional midday STATE check: "How are you doing now?" Quick pulse. Reveals shift from morning baseline.'
          },
          {
            name: 'NaviCue Delivery',
            description: 'If STATE shows dysregulation or stress pattern detected, timely intervention delivered: breathwork, grounding, perspective shift.'
          },
          {
            name: 'Passive Tracking',
            description: 'No constant pinging. System learns from your engagement patterns. Intelligence builds without burden.'
          }
        ]
      },
      {
        name: 'Evening',
        color: '#9B87F5',
        features: [
          {
            name: 'LUMA Conversation',
            description: '7pm (adjustable): "How was your day?" Reflective dialogue. Process experiences. Validate feelings. Gentle support.'
          },
          {
            name: 'Day Summary',
            description: 'Brief recap: STATE trend from morning to evening. Journeys completed. Challenges navigated. Progress visible.'
          },
          {
            name: 'Tomorrow Preview',
            description: 'Optional: "What\'s on your mind for tomorrow?" Creates connection across days. Recovery becomes continuous thread.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Morning STATE',
        to: 'Journey Suggestions',
        description: 'Your morning state determines what support is offered throughout the day'
      },
      {
        from: 'Morning Baseline',
        to: 'Midday Check',
        description: 'Afternoon awareness reveals how the day is shifting from your morning starting point'
      },
      {
        from: 'STATE Signals',
        to: 'NaviCue Timing',
        description: 'Dysregulation detected in real-time triggers precisely-timed intervention delivery'
      },
      {
        from: 'All Day Data',
        to: 'Evening LUMA',
        description: 'LUMA conversation informed by your full day: morning state, afternoon shifts, stress moments'
      },
      {
        from: 'Evening Reflection',
        to: 'Next Morning',
        description: 'Today\'s insights carry forward. Patterns build across days. Recovery compounds through rhythm.'
      }
    ]
  },

  // ========================================
  // START: FACILITY INTEGRATION
  // ========================================
  'start-facility-integration': {
    categoryName: 'START',
    categoryColor: '#6BCF7F',
    title: 'Weaving into your program',
    subtitle: 'Fits with groups, therapy, existing structure.',
    layers: [
      {
        name: 'Group Programming',
        color: '#E85D75',
        features: [
          {
            name: 'Morning Process Group',
            description: 'Patients arrive. Facilitator sees overnight STATE data. Knows who struggled. Can gently prompt: "Marcus, rough night? Want to share?" Group goes deeper faster.'
          },
          {
            name: 'Skills Training Group',
            description: 'DBT module taught. NaviCues configured to deliver that skill when needed. Learning doesn\'t end when group ends. Skills accessible in moments of need.'
          },
          {
            name: 'Evening Wrap Group',
            description: 'Day review. Patients share wins and struggles. Facilitator references: "I saw three of you used grounding today. Let\'s celebrate that." Data makes invisible visible.'
          }
        ]
      },
      {
        name: 'Individual Therapy',
        color: '#F59E42',
        features: [
          {
            name: 'Weekly Individual Session',
            description: 'Therapist opens Compass before session. Full week STATE trends. LUMA conversation themes. Risk signals. Session prep takes 3 minutes instead of starting cold.'
          },
          {
            name: 'Treatment Planning',
            description: 'Goals tracked through STATE domains. Progress quantified. Adjustments data-informed. Treatment plans become living documents, not static PDFs.'
          },
          {
            name: 'Crisis Response',
            description: 'If STATE crash detected or LUMA conversation shows acute risk, therapist alerted. Early intervention possible. Crisis often prevented, not just managed.'
          }
        ]
      },
      {
        name: 'Facility Operations',
        color: '#5AB9EA',
        features: [
          {
            name: 'Clinical Dashboard',
            description: 'Program director sees population-level engagement. Who\'s using it. Who\'s struggling. Where additional support needed. Intelligent triage at scale.'
          },
          {
            name: 'Documentation Support',
            description: 'STATE data flows into progress notes. Engagement documented for billing. Quality metrics auto-generated. Administrative burden reduced.'
          },
          {
            name: 'Outcome Tracking',
            description: 'Baseline to discharge trajectories visible. Treatment effectiveness quantified. Regulatory reporting simplified. Commissioners see ROI clearly.'
          }
        ]
      }
    ],
    flows: [
      {
        from: 'Patient Daily Engagement',
        to: 'Group Facilitation',
        description: 'Overnight and morning STATE data informs who needs gentle prompting in process groups'
      },
      {
        from: 'Skills Group Content',
        to: 'NaviCue Delivery',
        description: 'Skills taught in group become accessible through NaviCues when patients need them in real life'
      },
      {
        from: 'Week of Data',
        to: 'Individual Therapy',
        description: 'Therapists arrive to sessions with full context: STATE trends, LUMA themes, engagement patterns'
      },
      {
        from: 'All Clinical Touchpoints',
        to: 'Facility Dashboard',
        description: 'Population-level intelligence surfaces: engagement rates, risk distribution, treatment response'
      },
      {
        from: 'Engagement Data',
        to: 'Documentation & Billing',
        description: 'Daily STATE completion and LUMA conversations support billing requirements and quality metrics'
      }
    ]
  }
};

export function OrchestrationVisModule({ moduleId }: OrchestrationVisModuleProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [highlightedFlow, setHighlightedFlow] = useState<string | null>(null);
  const content = ORCHESTRATION_CONTENT[moduleId];

  if (!content) {
    return <div style={{ color: '#FFFFFF' }}>Orchestration content not found for {moduleId}</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{
            background: `linear-gradient(135deg, ${content.categoryColor}25, ${content.categoryColor}15)`,
            border: `1px solid ${content.categoryColor}40`
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
            {content.categoryName}
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
          {content.title}
        </h2>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.70)',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* System Layers */}
      <div className="space-y-6 mb-8">
        {content.layers.map((layer, layerIndex) => (
          <motion.div
            key={layerIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: layerIndex * 0.15 }}
          >
            {/* Layer Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${layer.color}, ${layer.color}DD)`
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: layer.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {layer.name}
              </h3>
            </div>

            {/* Features in Layer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {layer.features.map((feature, featureIndex) => (
                <button
                  key={featureIndex}
                  onClick={() => setSelectedFeature(selectedFeature === feature.name ? null : feature.name)}
                  onMouseEnter={() => setHighlightedFlow(feature.name)}
                  onMouseLeave={() => setHighlightedFlow(null)}
                  className="text-left p-4 transition-all"
                  style={{
                    background: selectedFeature === feature.name
                      ? `linear-gradient(135deg, ${layer.color}25, ${layer.color}15)`
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedFeature === feature.name
                      ? `2px solid ${layer.color}60`
                      : '1px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: '0px',
                    transform: selectedFeature === feature.name ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {feature.name}
                    </div>
                    {selectedFeature === feature.name && (
                      <CheckCircle2 size={16} style={{ color: layer.color, flexShrink: 0 }} />
                    )}
                  </div>
                  
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(255, 255, 255, 0.70)',
                      lineHeight: 1.5,
                      fontWeight: 500
                    }}
                  >
                    {feature.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Flows */}
      <div className="mt-10 pt-8 border-t border-white/10">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1rem'
          }}
        >
          How Data Flows
        </h3>

        <div className="space-y-3">
          {content.flows.map((flow, flowIndex) => (
            <motion.div
              key={flowIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + flowIndex * 0.1 }}
              className="flex items-start gap-4 p-4"
              style={{
                background: highlightedFlow === flow.from || highlightedFlow === flow.to
                  ? 'rgba(255, 255, 255, 0.10)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderLeft: `3px solid ${content.categoryColor}`,
                borderRadius: '0px',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.85)'
                    }}
                  >
                    {flow.from}
                  </span>
                  
                  <ArrowRight 
                    size={16} 
                    style={{ 
                      color: content.categoryColor,
                      flexShrink: 0
                    }} 
                  />
                  
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.85)'
                    }}
                  >
                    {flow.to}
                  </span>
                </div>
                
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}
                >
                  {flow.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div
        className="mt-8 p-6"
        style={{
          background: `linear-gradient(135deg, ${content.categoryColor}15, ${content.categoryColor}08)`,
          border: `1px solid ${content.categoryColor}30`,
          borderRadius: '0px'
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: content.categoryColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}
        >
          The Key
        </div>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.90)',
            lineHeight: 1.7,
            fontWeight: 500,
            fontStyle: 'italic'
          }}
        >
          {content.layers.length === 3 
            ? 'Each layer serves a purpose. Engagement captures signal. Intelligence reveals patterns. Evidence demonstrates change. Together, they create continuous therapeutic presence.'
            : 'The system is not a collection of features. It\'s a unified architecture where every component enhances every other. Data flows. Context persists. Recovery compounds.'}
        </p>
      </div>
    </div>
  );
}

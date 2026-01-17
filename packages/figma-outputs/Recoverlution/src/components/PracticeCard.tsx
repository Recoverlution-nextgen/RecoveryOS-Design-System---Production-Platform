/**
 * PRACTICE CARD - Modular Component
 * 
 * Philosophy: "Every practice is an invitation, not an obligation"
 * 
 * Design: Floating glass card that works in three contexts:
 * 1. Embedded in Articles (expandable, subtle breathing pause)
 * 2. Embedded in Micro-blocks (expandable, quick access)
 * 3. Standalone in Practices Library (full view, ready to begin)
 * 
 * Innovation:
 * - Practice states (resting → ready → active → complete)
 * - Visual breathing guide when active
 * - Step-by-step progression with pillar color accents
 * - Warm language that honors the user's courage to practice
 * 
 * THE ANCHOR RULE: Glass on white, no card on card
 * infiniteK: Soft therapeutic colors, no emojis, meaningful language
 */

import { useState } from "react";
import { Heart, Shield, Users, Brain, Target, Sparkles, ChevronDown, ChevronUp, Play, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

interface PracticeCardProps {
  id: string;
  title: string;
  description: string;
  pillar: string;
  pillarName: string;
  pillarColor: string;
  type: string; // Breathing, Meditation, Journaling, Movement, Grounding
  duration: number; // minutes
  difficulty: string; // Beginner, Intermediate, Advanced
  steps: string[]; // Step-by-step instructions
  context?: "embedded" | "standalone"; // How it's being used
  defaultExpanded?: boolean;
}

const PILLAR_ICONS = {
  "emotional-regulation": Heart,
  "stress-resilience": Shield,
  "social-connectivity": Users,
  "cognitive-reframing": Brain,
  "identity-integration": Target,
  "decision-mastery": Sparkles,
};

export function PracticeCard({
  id,
  title,
  description,
  pillar,
  pillarName,
  pillarColor,
  type,
  duration,
  difficulty,
  steps,
  context = "standalone",
  defaultExpanded = false
}: PracticeCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isActive, setIsActive] = useState(false);

  const PillarIcon = PILLAR_ICONS[pillar as keyof typeof PILLAR_ICONS] || Heart;

  // Embedded mode: collapsible, subtle
  // Standalone mode: always expanded, full detail
  const isEmbedded = context === "embedded";

  return (
    <div
      style={{
        background: isActive 
          ? 'rgba(87, 57, 251, 0.04)'
          : 'rgba(87, 57, 251, 0.02)',
        border: isActive
          ? `1px solid ${pillarColor}`
          : '1px solid rgba(62, 43, 184, 0.12)',
        padding: 'var(--spacing-8)',
        borderRadius: '0px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pillar Accent Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '3px',
        height: '100%',
        background: pillarColor,
        opacity: isActive ? 1 : 0.6
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--spacing-4)',
        marginBottom: isEmbedded && !isExpanded ? 0 : 'var(--spacing-4)'
      }}>
        <div style={{ flex: 1 }}>
          {/* Practice Type Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            marginBottom: 'var(--spacing-2)'
          }}>
            <div style={{
              background: `${pillarColor}15`,
              border: `1px solid ${pillarColor}30`,
              padding: '2px 8px',
              borderRadius: 'var(--radius-none)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <PillarIcon className="w-3 h-3" style={{ color: pillarColor }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.5625rem',
                color: pillarColor,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 700
              }}>
                {type}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isEmbedded ? '1.125rem' : '1.25rem',
            fontWeight: 600,
            color: '#1A1A1A',
            margin: '0 0 8px 0',
            lineHeight: 1.3
          }}>
            {title}
          </h3>

          {/* Description - Always visible */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            color: '#6B7280',
            margin: 0,
            lineHeight: 1.6
          }}>
            {description}
          </p>
        </div>

        {/* Expand/Collapse Button (embedded only) */}
        {isEmbedded && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'rgba(62, 43, 184, 0.08)',
              border: '1px solid rgba(62, 43, 184, 0.15)',
              padding: '8px',
              borderRadius: 'var(--radius-none)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(62, 43, 184, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(62, 43, 184, 0.08)';
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" style={{ color: '#3E2BB8' }} />
            ) : (
              <ChevronDown className="w-4 h-4" style={{ color: '#3E2BB8' }} />
            )}
          </button>
        )}
      </div>

      {/* Steps - Expandable in embedded mode, always visible in standalone */}
      {(!isEmbedded || isExpanded) && (
        <div style={{
          marginTop: 'var(--spacing-4)',
          paddingTop: 'var(--spacing-4)',
          borderTop: '1px solid rgba(62, 43, 184, 0.1)'
        }}>
          {/* Steps Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-3)'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1A1A1A',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Practice Steps
            </h4>

            {/* Try Now Button */}
            <button
              onClick={() => setIsActive(!isActive)}
              style={{
                background: isActive 
                  ? pillarColor 
                  : `${pillarColor}15`,
                border: `1px solid ${isActive ? pillarColor : pillarColor + '30'}`,
                padding: '6px 14px',
                borderRadius: 'var(--radius-none)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${pillarColor}25`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${pillarColor}15`;
                }
              }}
            >
              <Play className="w-3 h-3" style={{ color: isActive ? '#FFFFFF' : pillarColor }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: isActive ? '#FFFFFF' : pillarColor,
                fontWeight: 600
              }}>
                {isActive ? 'Practicing' : 'Try Now'}
              </span>
            </button>
          </div>

          {/* Steps List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-3)'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-3)',
                  alignItems: 'flex-start'
                }}
              >
                {/* Step Number */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isActive 
                    ? `linear-gradient(135deg, ${pillarColor} 0%, ${pillarColor}CC 100%)`
                    : `${pillarColor}20`,
                  border: `1px solid ${isActive ? pillarColor : pillarColor + '40'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isActive ? '#FFFFFF' : pillarColor
                  }}>
                    {index + 1}
                  </span>
                </div>

                {/* Step Text */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: '#1A1A1A',
                  margin: 0,
                  lineHeight: 1.6,
                  flex: 1
                }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pillar Tag - Bottom */}
      {!isEmbedded && (
        <div style={{
          marginTop: 'var(--spacing-4)',
          paddingTop: 'var(--spacing-4)',
          borderTop: '1px solid rgba(62, 43, 184, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)'
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: '#9CA3AF',
            fontWeight: 500
          }}>
            Part of
          </span>
          <div style={{
            background: `${pillarColor}15`,
            border: `1px solid ${pillarColor}30`,
            padding: '4px 10px',
            borderRadius: 'var(--radius-none)'
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: pillarColor,
              fontWeight: 600
            }}>
              {pillarName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
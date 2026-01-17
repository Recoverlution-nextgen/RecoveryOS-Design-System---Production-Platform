/**
 * PRACTICE CARD (LIBRARY VERSION) - Hands-on Exercise Component
 * 
 * Philosophy: "Every practice is an invitation, not an obligation"
 * 
 * Design Innovation:
 * - 1:1 Square asset with text overlay (eyebrow/headline/subtitle ON asset)
 * - Glass card shows: Purpose + description
 * - "Try Now" language (warm, inviting)
 * - Most tactile/inviting of the three types
 * - No card on card (ANCHOR RULE)
 * - Practice aesthetic: grounded, accessible, encouraging
 * 
 * Visual Distinction:
 * - Glass treatment (welcoming)
 * - Duration badge prominent
 * - Step count indicator
 * - "Try This Practice" CTA (warmest language)
 */

import { Clock, Activity, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getPracticeBuzzTags, formatBuzzTag } from "../utils/buzzTagSchema";

interface PracticeCardLibraryProps {
  id: string;
  name: string;
  subtitle?: string;
  assetUrl: string;
  pillarName: string;
  pillarColor: string;
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  purpose: string;
  stepCount: number; // Backend only - not displayed prominently
  description: string;
  keywords?: { primary: string[]; secondary: string[]; tertiary: string[] };
  onClick?: () => void;
}

const DIFFICULTY_LABELS = {
  beginner: "Everyone",
  intermediate: "Building",
  advanced: "Practiced",
};

export function PracticeCardLibrary({
  id,
  name,
  subtitle,
  assetUrl,
  pillarName,
  pillarColor,
  duration,
  difficulty,
  purpose,
  stepCount,
  description,
  keywords,
  onClick
}: PracticeCardLibraryProps) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* 1:1 Asset with Text Overlay */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: "var(--radius-none)",
          background: "linear-gradient(135deg, rgba(62, 43, 184, 0.05) 0%, rgba(87, 57, 251, 0.05) 100%)",
        }}
      >
        <ImageWithFallback
          src={assetUrl}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />

        {/* Text Content ON Asset */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "var(--spacing-6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top: Eyebrow (Pillar) + Duration */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "6px 12px",
                borderRadius: "var(--radius-none)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Play className="w-3 h-3" style={{ color: "#FFFFFF" }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.5625rem",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                {pillarName}
              </span>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "6px 12px",
                borderRadius: "var(--radius-none)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Clock className="w-3 h-3" style={{ color: "#FFFFFF" }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.5625rem",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                {duration} min
              </span>
            </div>
          </div>

          {/* Bottom: Title + Subtitle + BuzzTags */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 var(--spacing-2) 0",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {name}
            </h3>

            {subtitle && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  margin: "0 0 var(--spacing-3) 0",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </p>
            )}

            {/* BuzzTags - Discovery Tags on Asset */}
            {(() => {
              const buzzTags = getPracticeBuzzTags({ keywords });
              return buzzTags.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  {buzzTags.map((tag, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-none)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.6875rem",
                          color: "#FFFFFF",
                          fontWeight: 500,
                        }}
                      >
                        {formatBuzzTag(tag)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null;
            })()}
          </div>
        </div>
      </div>

      {/* Glass Content Card Below */}
      <div
        style={{
          background: "var(--glass-bg-medium)",
          backdropFilter: "var(--glass-blur-default)",
          WebkitBackdropFilter: "var(--glass-blur-default)",
          border: "var(--glass-border-default)",
          borderTop: `3px solid ${pillarColor}`,
          borderRadius: "var(--radius-none)",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          padding: "var(--spacing-5)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-3)",
        }}
      >
        {/* Description / Purpose */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "rgba(255, 255, 255, 0.85)",
            margin: 0,
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {purpose}
        </p>

        {/* Step count - small reference at bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <CheckCircle2 className="w-3 h-3" style={{ color: "rgba(255, 255, 255, 0.6)" }} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            {stepCount} steps
          </span>
        </div>

        {/* Try This Practice CTA */}
        {onClick && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "var(--spacing-3)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              Try This Practice
            </span>
            <ArrowRight className="w-4 h-4" style={{ color: "#FFFFFF" }} />
          </div>
        )}
      </div>
    </div>
  );
}
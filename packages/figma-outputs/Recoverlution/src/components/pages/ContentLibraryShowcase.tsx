/**
 * CONTENT LIBRARY SHOWCASE
 * 
 * Demonstrates the three elevated card types with real mapped assets
 * - LibraryCard (Articles)
 * - InsightCard (Expert Application)
 * - PracticeCardLibrary (Guided Practices)
 * 
 * Shows how 1:1 assets integrate beautifully with glass cards
 */

import { LibraryCard } from "../LibraryCard";
import { InsightCard } from "../InsightCard";
import { PracticeCardLibrary } from "../PracticeCardLibrary";

export default function ContentLibraryShowcase() {
  const pillarColors = {
    ER: "#7C67FF",
    SR: "#C49DC4",
    SC: "#8AB4D5",
    CR: "#9D8FFF",
    II: "#B8A5D6",
    DM: "#6B5CE8",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #FAFBFC 0%, #FFFFFF 100%)",
        padding: "var(--spacing-12) var(--spacing-6)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: "var(--spacing-12)", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: 800,
              color: "#1A1A1A",
              margin: "0 0 var(--spacing-4) 0",
              letterSpacing: "-0.02em",
            }}
          >
            Content Library Elevation
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.25rem",
              color: "#6B7280",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Three card types, one cohesive library system, beautiful 1:1 assets
          </p>
        </div>

        {/* Library Cards Section */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <div
            style={{
              marginBottom: "var(--spacing-8)",
              paddingBottom: "var(--spacing-4)",
              borderBottom: "2px solid rgba(62, 43, 184, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: "0 0 var(--spacing-2) 0",
              }}
            >
              Library Articles
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "#6B7280",
                margin: 0,
              }}
            >
              Deep-dive science and mechanism. Scholarly, refined, inviting.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--spacing-8)",
            }}
          >
            <LibraryCard
              id="article_hrv_science"
              title="Heart Rate Variability: Your Nervous System Report Card"
              subtitle="Understanding the vagal brake mechanism"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif"
              pillarName="Emotional Regulation"
              pillarColor={pillarColors.ER}
              thoughtLeader="Stephen Porges"
              readTime={12}
              difficulty="Intermediate"
              summary="Discover how HRV measurements reveal your nervous system's capacity for regulation and why this matters more than you think for recovery outcomes."
              keywords={["HRV", "Vagal Tone", "Polyvagal Theory"]}
              onClick={() => console.log("Navigate to article")}
            />

            <LibraryCard
              id="article_cognitive_distortions"
              title="The 10 Cognitive Distortions That Drive Relapse"
              subtitle="Recognizing unhelpful thought patterns"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif"
              pillarName="Cognitive Reframing"
              pillarColor={pillarColors.CR}
              thoughtLeader="Aaron Beck"
              readTime={15}
              difficulty="Beginner"
              summary="Learn to identify the most common thinking traps that undermine recovery and discover evidence-based techniques to catch them early."
              keywords={["CBT", "Thinking Traps", "Cognitive Therapy"]}
              onClick={() => console.log("Navigate to article")}
            />

            <LibraryCard
              id="article_urge_surfing"
              title="Urge Surfing: Riding the Wave Without Acting"
              subtitle="The neuroscience of craving extinction"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif"
              pillarName="Decision Mastery"
              pillarColor={pillarColors.DM}
              thoughtLeader="Alan Marlatt"
              readTime={10}
              difficulty="Advanced"
              summary="Understand the science behind craving waves and why riding them out, rather than fighting them, leads to faster extinction of addictive patterns."
              keywords={["Urges", "Craving", "Mindfulness"]}
              onClick={() => console.log("Navigate to article")}
            />
          </div>
        </section>

        {/* Insight Cards Section */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <div
            style={{
              marginBottom: "var(--spacing-8)",
              paddingBottom: "var(--spacing-4)",
              borderBottom: "2px solid rgba(62, 43, 184, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: "0 0 var(--spacing-2) 0",
              }}
            >
              Expert Insights
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "#6B7280",
                margin: 0,
              }}
            >
              Mechanism → Application with inline checkpoints. Structured, actionable, warm.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--spacing-8)",
            }}
          >
            <InsightCard
              id="ER_WOT_GRD_001"
              title="Activate Your Vagal Brake On Demand"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif"
              pillarName="Emotional Regulation"
              pillarColor={pillarColors.ER}
              estimatedMinutes={8}
              whyItMatters="Learning to downshift arousal in real-time gives you the capacity to make better decisions under stress, breaking the automatic stress-to-use pipeline."
              checkpointCount={3}
              contextPath="Part of Ground the Body within State → Story"
              onClick={() => console.log("Begin insight")}
            />

            <InsightCard
              id="CR_NOT_DIS_001"
              title="Catch Cognitive Distortions Before They Spiral"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Cognitive%20Reframing/The%2010%20Cognitive%20Distortions%20That%20Drive%20Relapse-2.avif"
              pillarName="Cognitive Reframing"
              pillarColor={pillarColors.CR}
              estimatedMinutes={12}
              whyItMatters="Distorted thoughts fuel emotional reactions that drive relapse. Catching them early interrupts the cascade before it gains momentum."
              checkpointCount={4}
              contextPath="Part of Thought Patterns within Notice Distortion"
              onClick={() => console.log("Begin insight")}
            />

            <InsightCard
              id="DM_CRV_URG_001"
              title="Ride the Urge Wave Without Acting"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif"
              pillarName="Decision Mastery"
              pillarColor={pillarColors.DM}
              estimatedMinutes={10}
              whyItMatters="Every urge you ride out without acting weakens the neural pathway. This is active extinction training, not willpower."
              checkpointCount={2}
              contextPath="Part of Urge Management within Craving"
              onClick={() => console.log("Begin insight")}
            />
          </div>
        </section>

        {/* Practice Cards Section */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <div
            style={{
              marginBottom: "var(--spacing-8)",
              paddingBottom: "var(--spacing-4)",
              borderBottom: "2px solid rgba(62, 43, 184, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: "0 0 var(--spacing-2) 0",
              }}
            >
              Guided Practices
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "#6B7280",
                margin: 0,
              }}
            >
              Hands-on exercises. Grounded, accessible, encouraging.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "var(--spacing-8)",
            }}
          >
            <PracticeCardLibrary
              id="resonant-breathing-pacer"
              name="Resonant Breathing Pacer"
              subtitle="5.5 breaths per minute for optimal HRV"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Emotional%20Regulation/Heart%20Rate%20Variability:%20Your%20Nervous%20System%20Report%20Card.avif"
              pillarName="Emotional Regulation"
              pillarColor={pillarColors.ER}
              duration={5}
              difficulty="beginner"
              purpose="Train your nervous system to downshift arousal on demand by practicing resonant frequency breathing, which maximizes heart rate variability."
              stepCount={4}
              description="Follow the visual pacer to breathe at your resonant frequency, strengthening vagal tone and building capacity for emotional regulation."
              onClick={() => console.log("Try practice")}
            />

            <PracticeCardLibrary
              id="thought-record-practice"
              name="Thought Record Exercise"
              subtitle="Test your thoughts against evidence"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Cognitive%20Reframing/Thought%20Records_%20The%20Scientific%20Method%20for%20Your%20Mind-2.avif"
              pillarName="Cognitive Reframing"
              pillarColor={pillarColors.CR}
              duration={10}
              difficulty="intermediate"
              purpose="Learn to identify automatic thoughts, examine evidence for and against them, and generate balanced alternative perspectives."
              stepCount={7}
              description="Use the structured thought record format to challenge distorted thinking patterns and build more accurate, helpful ways of thinking."
              onClick={() => console.log("Try practice")}
            />

            <PracticeCardLibrary
              id="urge-surfing-timer"
              name="10-Minute Urge Surfing"
              subtitle="Ride the wave without acting"
              assetUrl="https://wzeqlkbmqxlsjryidagf.supabase.co/storage/v1/object/public/Assets/Platform/Library/1:1/Decision%20Mastery/Urge%20Surfing_%20Riding%20the%20Wave%20Without%20Acting.avif"
              pillarName="Decision Mastery"
              pillarColor={pillarColors.DM}
              duration={10}
              difficulty="advanced"
              purpose="Practice staying present with uncomfortable urges without acting on them, allowing the craving to peak and naturally subside."
              stepCount={5}
              description="Use guided observation techniques to notice the urge, track its intensity, and watch it pass without acting, building extinction over time."
              onClick={() => console.log("Try practice")}
            />
          </div>
        </section>

        {/* System Notes */}
        <div
          style={{
            background: "rgba(62, 43, 184, 0.05)",
            border: "1px solid rgba(62, 43, 184, 0.1)",
            padding: "var(--spacing-6)",
            borderRadius: "var(--radius-none)",
            marginTop: "var(--spacing-16)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 var(--spacing-4) 0",
            }}
          >
            Design System Notes
          </h3>
          <ul
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              color: "#6B7280",
              margin: 0,
              paddingLeft: "var(--spacing-6)",
              lineHeight: 1.8,
            }}
          >
            <li>1:1 square assets preserve visual quality and create consistent rhythm</li>
            <li>Glass cards below assets honor THE ANCHOR RULE (no card on card)</li>
            <li>Each content type has distinct visual language while remaining cohesive</li>
            <li>Hover states are gentle (8px lift) respecting therapeutic context</li>
            <li>BuzzTags use pillar colors for recognition without overwhelming</li>
            <li>Typography hierarchy guides eye naturally through information</li>
            <li>Language choices reflect content purpose (scholarly / actionable / inviting)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

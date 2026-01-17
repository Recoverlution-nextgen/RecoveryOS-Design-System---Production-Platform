import { useState } from "react";
import { Brain, Compass, Heart, Lightbulb, Zap, Book, Target, Users, Sparkles, Lock, FileText, Palette, Code, MessageSquare, Layers, ChevronRight, TrendingUp, CheckCircle2, AlertCircle, Clock, Terminal, Cpu } from "lucide-react";
import { SixPillarsSection, MicroBlocksSection } from "../SixPillarsFrameworkSection";
import { navigateToPage, type PageType } from "../../utils/router";

/**
 * PRODUCT DNA HUB - INTERNAL LIVING SPECIFICATION
 * 
 * This isn't a brand anchor page. It's the living specification that defines how we build.
 * Hidden from public. Accessible only at /docs/brand-anchor (or /docs/product-dna)
 * 
 * Philosophy:
 * - NOT marketing copy → This is product truth
 * - NOT documentation → This is decision authority
 * - NOT brand guidelines → This is how we build
 * 
 * "You give the truth, I give the rigour" - Raw insights validated with neuroscience,
 * reduced to essentials, shipped Apple-clean.
 * 
 * Sections:
 * 1. System Map - How blocks connect, the architecture that shows the way
 * 2. 6 Pillars Framework - Neuroscience of change, clinical foundation
 * 3. Micro-Block Library - Deep-dives into each pillar
 * 4. Core Features - The 10 functional blocks that define Recoverlution
 * 5. Roadmap - Vision/value board, ChatGPT critique actionable items
 * 6. Stories - Epic product backlog (ST0→ST28), prioritized, commented
 * 7. Theory & Framework - HCP, ERA Flow, Philosophy, "Apple for Addiction"
 * 8. Feature Definitions - What each feature is (and isn't)
 * 9. Messaging Lab - Taglines, power copy, audience-specific messaging
 * 10. Tone & Voice - How we speak, writing principles
 * 11. Ideas - Breakthrough moments, insights archive
 * 12. Analytics - Platform insights, PostHog events
 * 13. Tech Stack - Complete technology architecture, what we ship with
 */

type Section = "how-we-build" | "core-features" | "system-map" | "stories" | "messaging" | "tone" | "pillars" | "micro-blocks" | "theory" | "features" | "roadmap" | "ideas" | "analytics" | "tech-stack";

// CORE FEATURES - The 10 functional blocks that define Recoverlution
// Apple-grade precision. Every feature cross-referenced. Language locked in.
// These are our hymn sheet - everything sings from this.

interface CoreFeature {
  id: string;
  number: number;
  functionalBlock: string;
  headline: string; // Comes AFTER definition
  taglines: string[]; // 3 variations
  whatItIs: string; // Definition (1 sentence)
  whyItMatters: string; // Purpose (1 sentence)
  howItWorks: {
    overview: string;
    mechanics: string[];
    technicalDetails: string[];
  };
  interconnections: {
    feedsInto: string[]; // Which features receive data from this
    receivesFrom: string[]; // Which features send data to this
    synergy: string; // How the connections create value
  };
  keyConcepts: string[]; // continuity, reinforcement, etc.
  experience: {
    patient: string;
    clinician: string;
  };
  appleGradeDetails: string[];
  proofToShow: string;
  demoMoment: string;
  screenshot: string;
}

const coreFeatures: CoreFeature[] = [
  // ========================================
  // FEATURE 1: RECOVER OS (Platform Foundation)
  // ========================================
  {
    id: "platform",
    number: 1,
    functionalBlock: "Recover OS",
    headline: "Neuroadaptive continuous-care OS",
    taglines: [
      "The foundation layer everything runs on",
      "Where clinical rigor meets continuous care",
      "Recovery infrastructure, not recovery content"
    ],
    whatItIs: "The adaptive infrastructure layer that synchronizes clinical protocols, patient daily life, and identity-level change across the full continuum of care.",
    whyItMatters: "Recovery doesn't end at discharge. The OS makes therapeutic standards portable from inpatient structure to 365-day real life.",
    howItWorks: {
      overview: "Recover OS is the neuroadaptive foundation that orchestrates all platform features, maintaining continuity from admission through aftercare by tracking micro-block states, curating interventions through LUMA, and coordinating care teams through Navigate.",
      mechanics: [
        "Central state engine: Tracks patient micro-block states (red/orange/green) based on Inner Compass data, Journey completion, and NaviCue engagement",
        "ERA Flow orchestration: Exposure (NaviCues) → Reflection (Inner Compass) → Adjustment (Journey auto-tuning + LUMA curation)",
        "Continuity spine: FHIR-native data layer ensures seamless handoffs from inpatient → outpatient → aftercare → long-term support",
        "Interoperability layer: Bi-directional sync with EHRs, schedulers, and care management systems",
        "Reinforcement engine: Detects micro-wins, patterns, and risk signals; feeds LUMA decision-making"
      ],
      technicalDetails: [
        "HCP (Human Cognition Platform) algorithm maps activities → 150+ micro-blocks → 6 pillar scores",
        "FHIR resources: CarePlan, Observation, Goal, CareTeam",
        "On-device state calculation for latency-free responsiveness",
        "Multi-tenant architecture with org-level customization (Journey templates, content library, feature flags)",
        "Single sign-on (OIDC), audit trail, export-ready outcomes"
      ]
    },
    interconnections: {
      feedsInto: ["momentum", "navigate", "luma", "journey", "patient-management"],
      receivesFrom: ["inner-compass", "navicues", "journey", "wellbeing", "library"],
      synergy: "The OS receives state data from all patient-facing tools (Inner Compass, NaviCues, Journey) and distributes intelligence to clinician-facing tools (Momentum, Navigate, Patient Management). It's the circulatory system. Data flows in, insights flow out."
    },
    keyConcepts: ["Continuity", "Interoperability", "Neuroadaptivity", "Standards portability", "Reinforcement", "Orchestration"],
    experience: {
      patient: "Invisible infrastructure. Patients never see 'the OS'. They experience seamless transitions (discharge → Journey continues at home) and perfectly-timed interventions (LUMA surfaces ResCue when micro-blocks turn orange).",
      clinician: "Visible intelligence. Clinicians see the OS through Momentum (patient state dashboard) and Navigate (care coordination). One patient record, one plan, one truth across all settings and providers."
    },
    appleGradeDetails: [
      "Background intelligence: State calculations happen silently, continuously, without patient action required",
      "Zero double-entry: EHR sync means clinicians document once, data flows everywhere",
      "Graceful degradation: If integrations fail, manual entry flows remain intuitive",
      "Version control: Journey templates and protocols are versioned; updates don't break existing patient plans",
      "Privacy-first: Data minimization, transparent consent, one-switch pause"
    ],
    proofToShow: "12-week pilot cohort: Continuity metric (% of patients with active Journey 30 days post-discharge) increased from 22% (standard aftercare) to 78% (Recover OS).",
    demoMoment: "Patient discharges at noon. By 2pm, aftercare Journey is live, care team notified, first evening NaviCue lands. No clinician action required. The OS orchestrated it.",
    screenshot: "System architecture diagram: Patient loop ↔ Clinician loop ↔ ERA engine (center)"
  },

  // ========================================
  // FEATURE 2: MOMENTUM (Clinician Dashboard)
  // ========================================
  {
    id: "momentum",
    number: 2,
    functionalBlock: "Momentum Dashboard",
    headline: "Know your patients in 60 seconds",
    taglines: [
      "Clinical intelligence that respects your time",
      "From 30-minute intake to 60-second insight",
      "See who's thriving. See who needs outreach."
    ],
    whatItIs: "Real-time clinician dashboard surfacing patient micro-block states, Sync scores, Journey progress, risk flags, and care team notes, designed for sub-60-second patient assessment.",
    whyItMatters: "Therapists need signal, not noise. Momentum cuts through data overwhelm to surface what actually matters for proactive, personalized care.",
    howItWorks: {
      overview: "Momentum receives micro-block state data from the Platform OS, aggregates it into pillar scores and risk flags, and presents it in a scannable grid view with drill-down detail.",
      mechanics: [
        "Patient grid: Color-coded cards (green = regulated, orange = fragile, red = dysregulated) with Sync score, last activity, and risk indicators",
        "60-second brief: Click a patient → see pillar states, recent Journey steps, Inner Compass trends, care team notes",
        "Proactive alerts: 'Maya hasn't checked in for 3 days' | 'Jordan's emotional regulation micro-blocks trending orange' | 'Alex completed Shame NaviCue and left powerful reflection'",
        "One-tap interventions: Adjust Journey cadence, assign new NaviCue, message care team, schedule check-in",
        "Outcomes view: Cohort-level trends (craving intensity ↓, retention ↑, readmissions ↓)"
      ],
      technicalDetails: [
        "Real-time data pipeline: Patient actions (NaviCue completion, Inner Compass check-in) → Platform OS → Momentum refresh (< 5 seconds)",
        "Aggregation logic: 150+ micro-blocks → 6 pillar scores → overall Sync score (0-100)",
        "Risk scoring: Pattern detection (missed check-ins, declining pillar scores, trigger exposure) → flag priority patients",
        "Filtering: View by risk level, pillar focus, Journey phase, care team assignment",
        "Export: De-identified cohort data for leadership reporting"
      ]
    },
    interconnections: {
      feedsInto: ["journey", "navigate", "patient-management"],
      receivesFrom: ["platform", "inner-compass", "navicues", "journey", "library"],
      synergy: "Momentum translates the invisible work patients do (Inner Compass check-ins, NaviCue completions) into visible clinical intelligence. Clinicians act (adjust Journey, message team) → Platform OS distributes changes → patient experience updates."
    },
    keyConcepts: ["Clinical efficiency", "Signal-rich supervision", "Proactive care", "Pattern visibility", "Capacity without compromise"],
    experience: {
      patient: "Patients never see Momentum, but they feel its impact: their therapist starts sessions with 'I saw you worked through that shame NaviCue. How did it land?' instead of 'So, how have you been?'",
      clinician: "Morning routine: Open Momentum → 60-second scan of 20 patients → identify 3 who need outreach → send messages → proceed with confidence. No spreadsheets. No guesswork."
    },
    appleGradeDetails: [
      "One-screen overview: No tabs, no drilling required for triage-level insight",
      "Smart defaults: Grid auto-sorts by risk (red patients float to top)",
      "Contextual actions: Right-click patient card → Adjust Journey | Send message | View full profile",
      "Offline grace: If sync delays, last-known state displays with timestamp",
      "Mobile-responsive: Clinicians can check in from phones between sessions"
    ],
    proofToShow: "Pilot study: Average clinician prep time per session reduced from 8.5 minutes (manual chart review) to 1.2 minutes (Momentum scan). Proactive outreach increased 3.2x.",
    demoMoment: "Therapist opens Momentum Monday morning. Maya's card is orange. Drill down: emotional regulation pillar trending down, missed 2 Inner Compass check-ins. One tap: lighten this week's Journey, message care coordinator. Total time: 45 seconds.",
    screenshot: "Momentum Dashboard patient grid with color-coded cards and pillar scores"
  },

  // ========================================
  // FEATURE 3: JOURNEY (Structured Therapeutic Paths)
  // ========================================
  {
    id: "journey",
    number: 3,
    functionalBlock: "Journey",
    headline: "Structured therapeutic journeys",
    taglines: [
      "From knowing to becoming. Insight is fragile until it's lived.",
      "Protocols that breathe with the person",
      "One choreography, many realities"
    ],
    whatItIs: "Clinician-curated therapeutic pathways composed of daily/weekly steps (check-ins, NaviCues, rituals, reflections) that adapt to patient state and progress.",
    whyItMatters: "Skills stick when practiced in context. Journeys turn therapeutic insights into daily lived experience until new behaviors become automatic.",
    howItWorks: {
      overview: "Journey defines the arc (goals, skills, cadence). Platform OS executes and adapts that arc in real time based on micro-block states. LUMA curates which steps land when.",
      mechanics: [
        "Template library: Evidence-based paths (12-Week Foundation, DBT Skills, Trauma Recovery, Relapse Prevention, Return-to-Work) with pre-mapped micro-blocks",
        "Custom builder: Clinicians can clone templates, add/remove/reorder steps, set timing rules (daily, weekly, trigger-based)",
        "Auto-progression: Patient completes steps → Journey advances. Micro-blocks turn red → Journey auto-lightens (fewer steps, gentler cadence)",
        "Step types: State check-in (Inner Compass) | Skill practice (NaviCue) | Reflection prompt | Ritual (somatic practice) | Milestone celebration",
        "Transparency: Every step shows 'Why this now?' and which micro-blocks it targets"
      ],
      technicalDetails: [
        "Journey schema: { steps: [], rules: { progression, fallback }, microblocks: [], pillarFocus: [] }",
        "Timing engine: Cron jobs check completion state, trigger next steps, send gentle reminders (no pressure, just invitation)",
        "Adaptation logic: If patient skips 3 days → lighten load (reduce steps). If green streak for 7 days → offer progression.",
        "Version control: Journey templates are versioned; in-progress patient Journeys can migrate or stay on original",
        "Content mapping: Each step links to Library resources (articles, exercises) for deeper exploration"
      ]
    },
    interconnections: {
      feedsInto: ["navicues", "inner-compass", "wellbeing", "platform"],
      receivesFrom: ["momentum", "platform", "luma", "patient-management"],
      synergy: "Journey is the skeleton, LUMA is the muscles, NaviCues are the movements. Clinicians design the path (Momentum), LUMA times the steps (intelligence), patients walk it (NaviCues + Inner Compass). Platform OS ensures the path adapts as terrain changes."
    },
    keyConcepts: ["Structured flexibility", "Practice-based learning", "Neuroplastic reinforcement", "Adaptive protocols", "Micro-block progression"],
    experience: {
      patient: "Every morning: 'Today's Journey step' notification. Tap → see the practice (e.g., 'Urge Surfing NaviCue'), understand why it matters ('Builds distress tolerance micro-blocks'), complete it. Small wins compound into identity shift.",
      clinician: "Assign Journey at intake → monitor progress in Momentum → adjust when life gets heavy → celebrate milestones. Journey does the daily scaffolding; clinician does the relational depth."
    },
    appleGradeDetails: [
      "Gentle reminders: Notifications feel like invitations, not obligations ('Your Journey step is ready' vs. 'Complete your task')",
      "Skip without shame: Missed a step? No streak-breaking anxiety. 'That's okay. Want to try tomorrow or skip to the next one?'",
      "Progress visualization: Timeline shows completed steps, upcoming milestones, and micro-block states improving over time",
      "Favorites, not completion: Patients can favorite steps to revisit anytime, reinforcing 'fluid and forever' philosophy",
      "Family visibility (opt-in): Loved ones can see Journey progress (not content) to offer informed support"
    ],
    proofToShow: "Pilot cohort: Journey adherence 68% (vs. 23% for traditional homework). Micro-block improvement correlation: patients who complete 70%+ of Journey steps show 2.4x greater pillar score gains.",
    demoMoment: "Patient completes Week 4 of 12-Week Foundation Journey. Emotional regulation micro-blocks have been orange for 3 days. Journey auto-lightens: skips one cognitive NaviCue, adds a somatic Wellbeing practice, extends timeline by 2 days. No clinician intervention needed.",
    screenshot: "Journey timeline view with completed steps (green), current step (highlighted), and upcoming milestones"
  },

  // ========================================
  // FEATURE 4: NAVICUES (Just-in-Time Micro-Practices)
  // ========================================
  {
    id: "navicues",
    number: 4,
    functionalBlock: "NaviCues",
    headline: "Recovery in the flow of life",
    taglines: [
      "The right wisdom at the right moment",
      "Therapeutic tools that live in pockets, not offices",
      "When life happens, tools are ready"
    ],
    whatItIs: "8-12 minute clinical-grade micro-practices (proactive NaviCues) and 60-90 second stabilization interventions (reactive ResCues) delivered just-in-time when patient state or context signals need.",
    whyItMatters: "Shame doesn't wait for therapy appointments. NaviCues meet patients in real moments with real tools, turning everyday challenges into neuroplastic opportunities.",
    howItWorks: {
      overview: "LUMA observes patient state (Inner Compass data, micro-block patterns, calendar/location cues) and selects the right intervention: NaviCue (proactive skill-building) or ResCue (reactive stabilization). Both feed back into Platform OS to update micro-block states.",
      mechanics: [
        "NaviCues: Structured practices (8-12 min) targeting specific micro-blocks (e.g., Shame Body Mapping, Urge Surfing, Values Clarification, Window of Tolerance Exploration)",
        "ResCues: Rapid stabilization (60-90 sec) for acute moments (breathwork, grounding, cognitive reframe, safe place visualization)",
        "Evidence-based: Every cue maps to modalities (ACT, DBT, IFS, SE, CFT, Polyvagal, MBRP) and explains neural mechanisms",
        "Progress tracking: Completion rate, micro-block states before/after, patient reflections",
        "Timing intelligence: Calendar integration (opt-in) → NaviCue lands 1 hour before known trigger window. Geofence (opt-in) → ResCue offers when leaving high-stress location."
      ],
      technicalDetails: [
        "LUMA decision matrix: Safety (escalate to human) → Stability (ResCue) → Progress (NaviCue) → Rest (back off)",
        "Lock-screen glanceables: One-tap launch from phone home screen or lock screen",
        "Offline-first: All NaviCues/ResCues cached locally; sync completions when online",
        "Haptic/audio guidance: Breathwork paced by vibration patterns; narration optional",
        "Reflection capture: Post-practice 'How did this land?' prompt → feeds Momentum insights"
      ]
    },
    interconnections: {
      feedsInto: ["platform", "momentum", "inner-compass"],
      receivesFrom: ["journey", "luma", "library", "platform"],
      synergy: "NaviCues are the 'doing' layer of the platform. Journey plans them, LUMA times them, Library informs them, Inner Compass measures their impact. Clinicians see results in Momentum ('Maya completed Shame NaviCue and emotional regulation micro-blocks shifted from orange to green')."
    },
    keyConcepts: ["Just-in-time intervention", "Neuroplastic practice", "Context-aware delivery", "Micro-block targeting", "Real-world rehearsal"],
    experience: {
      patient: "11:47pm. Lying in bed, mind racing. Phone vibrates: 'Feeling restless? Try a 90-second grounding ResCue.' Tap → gentle voice guides somatic scan → 2 minutes later, breath deepens. No app-opening friction. Just support.",
      clinician: "Momentum shows: 'Jordan completed Urge Surfing NaviCue 3 times this week. Distress tolerance micro-blocks improving. Reflection: \"I didn't use. I surfed. First time.\"' Therapist starts next session there and builds on the win."
    },
    appleGradeDetails: [
      "Two-second launch: From lock screen notification to practice start in < 2 seconds",
      "No progress-shaming: Skip a cue? No guilt. 'Want to try later or explore something else?'",
      "Completion ≠ success: Patients can mark 'Started but didn't finish', still tracked, still valued",
      "Favorites library: Every completed cue saves to personal library for on-demand replay",
      "Customization: Patients can adjust voice speed, enable/disable narration, choose haptic intensity"
    ],
    proofToShow: "Pilot study: Just-in-time NaviCue/ResCue use correlated with 42% reduction in self-reported urge intensity within 3 minutes. Completion rate: 73% (vs. 31% for 'homework' assigned in therapy).",
    demoMoment: "Patient's calendar shows 'Family dinner' (known trigger window). 90 minutes before, NaviCue lands: 'Prepare for tonight: 8-minute Values Alignment practice.' Completes it. At dinner, trigger hits and muscle memory kicks in. Recovery becomes reflex.",
    screenshot: "Shame NaviCue body mapping interface: 'Where do you feel shame in your body?'"
  },

  // ========================================
  // FEATURE 5: LUMA (Emotional Co-Pilot)
  // ========================================
  {
    id: "luma",
    number: 5,
    functionalBlock: "LUMA",
    headline: "Your emotional co-pilot",
    taglines: [
      "Curates, never commands",
      "She sees patterns. You feel supported.",
      "Calm guidance. Clear boundaries. Human handoff when needed."
    ],
    whatItIs: "Context-aware AI companion that observes patient state (Inner Compass, micro-blocks, calendar, location), curates timely interventions (NaviCues/ResCues), and escalates to humans when risk thresholds are met.",
    whyItMatters: "People want support without being managed. LUMA respects autonomy while amplifying agency, surfacing the right tool at the right moment without waiting to be asked.",
    howItWorks: {
      overview: "LUMA runs continuously in background, analyzing patterns (sleep debt + conflict history = emotional regulation risk), selecting interventions (NaviCue for proactive building, ResCue for reactive stabilization), and routing to care teams when safety nets activate.",
      mechanics: [
        "Pattern detection: Sleep/HRV trends (via wearable opt-in), Inner Compass states, NaviCue completion patterns, calendar triggers (opt-in)",
        "Decision prioritization: 1) Safety (escalate to clinician) → 2) Stability (ResCue) → 3) Progress (NaviCue) → 4) Rest (back off to prevent overwhelm)",
        "Transparency: Every prompt includes 'Why this now?' explanation ('You mentioned low energy + upcoming meeting. This 3-minute grounding practice might help.')",
        "Escalation: If micro-blocks stay red for 48 hours OR patient flags crisis → warm handoff to care team with context summary",
        "Autonomy: One-switch pause ('I need space from LUMA today'). No persistence. No guilt."
      ],
      technicalDetails: [
        "No diagnostic claims: LUMA never says 'You are depressed', only 'Your emotional tone has been low this week. Want to explore what might help?'",
        "No prescriptive advice: LUMA curates options, never commands ('You might try...' vs. 'You should...')",
        "Consent-first: All context data (calendar, location, wearables) requires explicit opt-in with granular controls",
        "FamilyView signals (opt-in): If patient consents, LUMA can send gentle updates to loved ones ('Jordan's having a tough week and might appreciate check-in')",
        "Audit trail: Every LUMA decision logged for clinician review in Momentum"
      ]
    },
    interconnections: {
      feedsInto: ["navicues", "journey", "momentum", "navigate"],
      receivesFrom: ["platform", "inner-compass", "wellbeing", "library"],
      synergy: "LUMA is the intelligence layer that makes every other feature smarter. She reads Inner Compass states, curates NaviCues from Library, adjusts Journey pacing, and alerts clinicians via Momentum. She's the connective tissue that turns isolated features into a living system."
    },
    keyConcepts: ["Adaptive curation", "Transparent intelligence", "Autonomy-preserving", "Safety-first escalation", "Pattern amplification"],
    experience: {
      patient: "Tuesday morning. LUMA: 'Good morning. I noticed yesterday felt heavy. Want to set a small intention for today?' 30 seconds later: intention set, day feels manageable. Didn't have to remember to check in. LUMA remembered.",
      clinician: "Momentum alert: 'LUMA escalation: Alex's distress tolerance micro-blocks red for 3 days, skipped last 2 Journey steps, flagged needing support.' Clinician calls → warm conversation → crisis averted. LUMA bought time."
    },
    appleGradeDetails: [
      "Natural language: LUMA speaks like a wise friend, not a bot ('You've been carrying a lot' vs. 'Stress levels elevated')",
      "Adaptive cadence: If patient consistently ignores prompts, LUMA backs off. If patient engages deeply, LUMA increases touchpoints.",
      "No manipulation: LUMA never uses dark patterns (no 'streaks at risk!' anxiety, no 'Your therapist will see this' guilt)",
      "Warm handoffs: When escalating to humans, LUMA frames it as support, not failure ('Your care team wants to check in and they're here for this')",
      "Continuous learning: LUMA observes what works for each patient and refines curation over time"
    ],
    proofToShow: "Pilot study: LUMA-curated interventions accepted 81% of the time (vs. 34% for generic push notifications). Escalation effectiveness: 94% of flagged patients reached by care team within 4 hours.",
    demoMoment: "Patient's HRV trending low for 3 nights + calendar shows 'Performance review Friday' + emotional regulation micro-blocks orange. Wednesday evening, LUMA: 'Big day Friday. Want to rehearse a 5-minute nervous system reset you can use before the meeting?' Patient completes it. Friday: muscle memory activated. Review goes well.",
    screenshot: "LUMA morning intention modal with gentle prompt and 'Why this now?' transparency"
  },

  // ========================================
  // FEATURE 6: WELLBEING (Somatic Toolkit)
  // ========================================
  {
    id: "wellbeing",
    number: 6,
    functionalBlock: "Wellbeing",
    headline: "Personalised body wisdom",
    taglines: [
      "Where mind meets body meets soul",
      "Your body knows. We help you listen.",
      "Somatic support, personalized"
    ],
    whatItIs: "Library of somatic practices (breathwork, movement, embodiment, nervous system regulation) personalized to patient state, autonomic tone, and pillar needs.",
    whyItMatters: "Recovery accelerates when the body is heard—Wellbeing teaches patients to read physiological signals and respond with practices that restore regulation.",
    howItWorks: {
      overview: "Wellbeing integrates optional biometric data (sleep, HRV, steps via Apple Health/Google Fit) with subjective Inner Compass states to recommend somatic practices tailored to current nervous system needs.",
      mechanics: [
        "Practice library: Morning Flow (energizing), Midday Reset (regulating), Evening Wind-Down (calming), SOS Practices (acute distress)",
        "Personalization: If HRV low + Inner Compass shows 'Physical Energy: Low' → recommend gentle restorative practices, not high-intensity movement",
        "Guided sessions: Video/audio-guided breathwork, somatic tracking, embodiment exercises (2-20 minutes)",
        "Progress tracking: Completion rate, before/after state shifts (Inner Compass), autonomic tone trends",
        "Biometric integration: Private-by-default; data never leaves device except as aggregated features"
      ],
      technicalDetails: [
        "Wearable sync: Apple Health/Google Fit APIs for HRV, sleep quality, resting heart rate, step count",
        "On-device processing: Biometric feature extraction happens locally; only trends sent to Platform OS",
        "Consent granularity: Patients choose which metrics to share, can revoke anytime",
        "Offline-first: All practices cached for airplane mode or low-connectivity moments",
        "Customization: Adjust practice length, enable/disable narration, choose voice"
      ]
    },
    interconnections: {
      feedsInto: ["platform", "inner-compass", "momentum"],
      receivesFrom: ["luma", "journey", "platform"],
      synergy: "Wellbeing practices are LUMA-curated based on Inner Compass states and Journey phase. Completion feeds back to Platform OS → updates micro-block states → Momentum shows clinicians 'Patient's self-regulation practices improving autonomic resilience.'"
    },
    keyConcepts: ["Somatic intelligence", "Nervous system literacy", "Physiological self-awareness", "Body-first regulation", "Autonomic attunement"],
    experience: {
      patient: "Morning: LUMA suggests 'Morning Flow' (noticed restless sleep via HRV). 8 minutes of guided movement. Body feels alive. Inner Compass check-in: 'Physical Energy' shifts from 3/10 to 7/10. Day starts differently.",
      clinician: "Momentum shows: 'Patient's Wellbeing practice adherence 85% this month. HRV trending up. Sleep quality improving. Self-regulation micro-blocks shifting green.' Therapist reinforces the win in session."
    },
    appleGradeDetails: [
      "Beautiful cinematography: Practice videos shot in calming natural environments (forest, ocean, mountain)",
      "Accessibility: All practices available audio-only for vision-impaired users or eyes-closed preference",
      "No performance pressure: Practices frame as 'exploration,' not 'workout' ('Notice what your body needs' vs. 'Complete 10 reps')",
      "Favorites sync: Patients can favorite practices for quick access from lock screen widget",
      "Privacy promise: Biometric data encrypted at rest, never sold, deleted on account closure"
    ],
    proofToShow: "Pilot study: Patients using Wellbeing practices 3+ times/week showed 2.1x improvement in self-regulation micro-blocks and 31% better sleep quality (measured via HRV) compared to non-users.",
    demoMoment: "Patient reports 'Physical Energy: Low' in Inner Compass for 3 days. LUMA suggests gentle 'Midday Reset' Wellbeing practice instead of cognitively demanding NaviCue. Patient completes it. Energy lifts. Micro-blocks stay regulated.",
    screenshot: "Wellbeing Morning Flow practice with video guidance and breath pacing"
  },

  // ========================================
  // FEATURE 7: LIBRARY (Clinical Resource Hub)
  // ========================================
  {
    id: "library",
    number: 7,
    functionalBlock: "Library",
    headline: "Endless discovery",
    taglines: [
      "Not content. A clinical library.",
      "Evidence-based, endlessly discoverable",
      "The foundation you can build a skyscraper on"
    ],
    whatItIs: "200+ evidence-based resources (articles, exercises, practices, videos) organized by pillar, searchable by topic, and integrated into Journey steps and LUMA curation.",
    whyItMatters: "Depth earns clinician trust—Library provides the theoretical foundation and practical tools that make therapists say 'they get it' while giving patients endless pathways for exploration.",
    howItWorks: {
      overview: "Library serves as the knowledge base that informs all platform features: NaviCues draw from Library exercises, Journeys link to Library articles for deeper learning, LUMA curates Library resources based on patient needs.",
      mechanics: [
        "Content types: Foundational articles (Window of Tolerance, Polyvagal Theory, Micro-blocks), guided exercises (Values Card Sort, Parts Mapping), practices (breathwork, somatic)",
        "Organization: Filterable by 6 Pillars, searchable by keyword, browseable by modality (ACT, DBT, IFS, SE, CFT, MBRP)",
        "Integration: Every NaviCue links to related Library articles ('Want to learn more about the neuroscience behind this practice?')",
        "Favorites: Patients can favorite resources for personal library; clinicians can recommend specific articles",
        "Extensibility: Orgs can upload custom content (PDFs, videos) tagged with micro-blocks and pillars"
      ],
      technicalDetails: [
        "Content schema: { title, type, pillarTags, microblockTags, modalityTags, readTime, content, relatedResources }",
        "Full-text search: Indexed for sub-second query response",
        "Version control: Articles can be updated; version history preserved for clinical integrity",
        "Access control: Some advanced resources unlocked after Journey milestones (scaffolded learning)",
        "Analytics: Track most-viewed resources, completion rates, effectiveness (pre/post micro-block states)"
      ]
    },
    interconnections: {
      feedsInto: ["navicues", "journey", "luma", "wellbeing"],
      receivesFrom: ["momentum", "platform"],
      synergy: "Library is the knowledge layer. NaviCues are applied Library content. Journeys are Library sequences. LUMA curates Library picks. Momentum shows clinicians which Library resources patients engage with most. Everything connects back to evidence."
    },
    keyConcepts: ["Evidence-based depth", "Clinical credibility", "Endless exploration", "Scaffolded learning", "Modality integration"],
    experience: {
      patient: "Completes 'Window of Tolerance' NaviCue. Reflection prompt: 'Want to dive deeper into the neuroscience?' Tap → Article opens. 8-minute read. Mind: blown. Favorites it. Returns twice more that week.",
      clinician: "Momentum shows: 'Patient explored 12 Library resources this month, 8 related to Parts Work (IFS). Spending 40+ minutes on self-compassion articles.' Therapist weaves IFS into next session—patient already primed."
    },
    appleGradeDetails: [
      "Beautiful typography: Readable, generous line-height, adjustable text size",
      "Estimated read time: Every article shows '8 min read' so patients can plan engagement",
      "Progress tracking: Articles save scroll position; patients can resume where they left off",
      "Offline access: Favorited articles cached for offline reading",
      "Citation transparency: Every clinical claim links to peer-reviewed source"
    ],
    proofToShow: "Pilot study: Patients who engaged with 5+ Library resources showed 1.8x greater understanding of recovery mechanisms (self-reported) and 2.3x higher Journey adherence.",
    demoMoment: "Patient asks therapist: 'What's the vagus nerve?' Therapist: 'Great question—there's a beautiful article in your Library. I'll assign it as your Journey step this week.' Patient reads it. Next session starts with informed curiosity, not blank stares.",
    screenshot: "Library Window of Tolerance article with sidebar showing related resources and pillar tags"
  },

  // ========================================
  // FEATURE 8: INNER COMPASS (State Tracking)
  // ========================================
  {
    id: "inner-compass",
    number: 8,
    functionalBlock: "Inner Compass",
    headline: "Map your State",
    taglines: [
      "Know your state. Honor your pace.",
      "Awareness without judgment",
      "Self-knowledge before self-judgment"
    ],
    whatItIs: "Real-time nervous system state tracking across 4 dimensions (Physical Energy, Emotional Tone, Mental Clarity, Social Capacity) that builds interoceptive awareness and feeds Platform OS intelligence.",
    whyItMatters: "Naming creates space. Space creates choice. Choice rewires identity—Inner Compass teaches patients to read their internal state and respond with self-compassion instead of self-judgment.",
    howItWorks: {
      overview: "Patients check in via 4 intuitive sliders (5 seconds) + optional one-word note. Data feeds Platform OS → updates micro-block states → informs LUMA curation → surfaces in Momentum for clinician insight.",
      mechanics: [
        "4D state model: Physical Energy (depleted ↔ energized), Emotional Tone (heavy ↔ light), Mental Clarity (foggy ↔ clear), Social Capacity (withdrawn ↔ engaged)",
        "Gentle rhythm: LUMA suggests check-ins at natural transition points (morning, midday, evening) but never mandates",
        "Pattern visualization: Timeline view shows state trends over days/weeks; patients can see 'Oh, Mondays are always tough for Mental Clarity'",
        "Reflection prompts: After check-in, optional 'What's contributing to this state?' with pre-populated options (sleep, conflict, physical pain, joy, connection)",
        "Private notes: Patients can add context visible only to them (or opt to share with care team)"
      ],
      technicalDetails: [
        "5-second check-in: Slider UI optimized for speed (no text entry required unless patient wants to add note)",
        "Streak-free design: No 'days in a row' anxiety; gaps are normalized ('Life happens—pick up anytime')",
        "Privacy layers: Default = patient-only visibility. Opt-in = clinician can see trends (not individual check-ins unless patient shares)",
        "Pattern algorithms: Platform OS detects declining trends (3+ consecutive low scores) → triggers LUMA gentle outreach or Momentum alert",
        "Exportable: Patients can download their Inner Compass data as CSV for personal tracking or therapy discussions"
      ]
    },
    interconnections: {
      feedsInto: ["platform", "luma", "momentum", "journey"],
      receivesFrom: ["luma", "platform"],
      synergy: "Inner Compass is the patient's voice inside the system. Their check-ins feed LUMA's intelligence ('Low energy 3 days → suggest restorative Wellbeing practice'), inform Momentum's clinical view ('Emotional Tone trending down → proactive outreach'), and adapt Journey pacing ('Mental Clarity low → lighten cognitive load')."
    },
    keyConcepts: ["Interoceptive awareness", "Self-compassion", "Pattern recognition", "Autonomy", "Non-judgmental tracking"],
    experience: {
      patient: "Morning check-in: sliders show 'Physical Energy: 4/10, Emotional Tone: 3/10.' LUMA: 'Sounds like a tough start. Want a 2-minute grounding practice before the day begins?' Tap. Breathe. Recalibrate. Day becomes doable.",
      clinician: "Momentum shows: 'Inner Compass check-in rate: 78%. Emotional Tone trending down this week (avg 3.2/10 vs. 6.5/10 last week). Patient note: \"Anniversary of loss.\"' Therapist reaches out proactively."
    },
    appleGradeDetails: [
      "Haptic feedback: Sliders give gentle vibration at midpoint and endpoints for tactile grounding",
      "Dark mode optimized: Inner Compass UI designed for late-night check-ins without eye strain",
      "Lock-screen widget: Patients can check in without opening app (2 swipes → done)",
      "No shame for low scores: UI language: 'This is information, not judgment'",
      "Trend insights: 'Your Physical Energy is 40% higher on days you do morning Wellbeing practices'"
    ],
    proofToShow: "Pilot study: Patients who checked in 5+ times/week showed 67% greater awareness of state-trigger relationships and 2.8x more likely to use coping tools proactively.",
    demoMoment: "Patient checks in: 'Social Capacity: 2/10.' LUMA: 'Feeling withdrawn is okay. Want some solo practices today instead of group-focused ones?' Journey auto-adjusts: skips 'connection ritual,' offers 'self-compassion reflection' instead.",
    screenshot: "Inner Compass state tracking sliders with 4D visualization and trend graph"
  },

  // ========================================
  // FEATURE 9: NAVIGATE (Care Coordination)
  // ========================================
  {
    id: "navigate",
    number: 9,
    functionalBlock: "Navigate",
    headline: "Always Connected",
    taglines: [
      "Your team, one system",
      "Coordinated care, finally",
      "Continuity that earns trust"
    ],
    whatItIs: "Care team coordination hub that keeps therapists, psychiatrists, care coordinators, and family (opt-in) synchronized through shared notes, patient state visibility, and secure messaging.",
    whyItMatters: "Continuity sustains momentum—Navigate ensures no patient slips through cracks because everyone sees the same real-time picture and can coordinate seamlessly.",
    howItWorks: {
      overview: "Navigate serves as the shared workspace for care teams: clinicians see patient state (from Momentum), add progress notes, assign tasks, message collaborators, and maintain FHIR-compliant documentation.",
      mechanics: [
        "Care team cards: Visual roster showing each team member (therapist, psychiatrist, coordinator, family supporter) with role, contact, last activity",
        "Shared notes: Clinicians add session notes, medication adjustments, risk flags; all timestamped and attributed",
        "Patient state view: Care team sees same Momentum insights (pillar scores, Journey progress, risk flags) without individual login friction",
        "Secure messaging: HIPAA-compliant chat for team coordination ('Maya missed 2 sessions—can coordinator do wellness check?')",
        "Warm handoffs: Discharge workflows auto-notify aftercare providers, sync care plan, transfer Journey continuity"
      ],
      technicalDetails: [
        "Role-based permissions: Therapists see clinical notes, family sees progress summary (not detailed notes) if patient consents",
        "FHIR interoperability: CarePlan, CareTeam resources sync with EHR systems via HL7 FHIR API",
        "Audit trail: Every note, message, and action logged with timestamp and user attribution",
        "Notification rules: Care team members can set alerts ('Notify me if patient's risk score goes red')",
        "Consent management: Patients control who sees what (granular privacy: family sees Journey progress but not therapy notes)"
      ]
    },
    interconnections: {
      feedsInto: ["patient-management", "momentum"],
      receivesFrom: ["platform", "momentum", "luma"],
      synergy: "Navigate translates Platform OS intelligence into coordinated human action. LUMA escalates a risk signal → Navigate alerts care team → clinician adds note → team coordinator schedules check-in → continuity preserved."
    },
    keyConcepts: ["Care continuity", "Team synchronization", "Interoperability", "Warm handoffs", "No patient left behind"],
    experience: {
      patient: "Discharge day. Inpatient therapist adds note: 'Emotional regulation work ongoing. Recommend DBT skills Journey.' Outpatient therapist receives care plan that afternoon. First session: seamless pickup. Patient doesn't have to re-explain trauma history.",
      clinician: "Friday afternoon: Navigate alert: 'Alex's care coordinator flagged housing instability. Emotional regulation pillar declining.' Team huddle via Navigate chat. Psychiatrist adjusts med check schedule. Therapist lightens Journey. Crisis plan in place by Monday."
    },
    appleGradeDetails: [
      "One-click team view: Care team dashboard shows all members, recent activity, and action items",
      "Smart notifications: Alerts only for high-priority events (red flags, missed appointments), not every note",
      "Mobile-optimized: Clinicians can add quick notes from phones between sessions",
      "Template notes: Pre-structured templates for common scenarios (intake, discharge, risk assessment) save time",
      "Export-ready: Care plans exportable as PDFs for external providers or insurance documentation"
    ],
    proofToShow: "Pilot study: Navigate use correlated with 58% reduction in care coordination delays and 73% improvement in post-discharge engagement (30-day follow-up attendance).",
    demoMoment: "Patient transitions from inpatient to outpatient. Navigate auto-syncs: care plan, medication list, Journey progress, risk assessment. Outpatient team receives notification. First session scheduled within 48 hours. No information lost in handoff.",
    screenshot: "Navigate care team cards showing therapist, psychiatrist, coordinator, and family supporter with recent activity"
  },

  // ========================================
  // FEATURE 10: PATIENT MANAGEMENT (Admin System)
  // ========================================
  {
    id: "patient-management",
    number: 10,
    functionalBlock: "Patient Management",
    headline: "Seamless administration",
    taglines: [
      "From intake to aftercare in one system",
      "Clinical rigor meets operational ease",
      "Manage care, not paperwork"
    ],
    whatItIs: "Administrative layer for creating patient profiles, assigning Journeys, managing care teams, tracking enrollment status, and coordinating across treatment phases (inpatient → outpatient → aftercare).",
    whyItMatters: "Clinicians need tools that handle administrative burden so they can focus on care—Patient Management reduces friction from intake through discharge.",
    howItWorks: {
      overview: "Patient Management integrates with Platform OS to handle patient lifecycle: profile creation → Journey assignment → care team setup → progress monitoring → discharge planning → aftercare transition.",
      mechanics: [
        "Patient profiles: Demographics, admission date, treatment program, assigned clinician, care team, current Journey",
        "Journey assignment: Select from template library or custom-built paths; set start date, adjust cadence, monitor completion",
        "Care team builder: Assign roles (primary therapist, psychiatrist, care coordinator, family contact), set permissions",
        "Status tracking: Active, discharged, aftercare, alumni—with automatic transition workflows",
        "Bulk operations: Assign Journey to cohort, message multiple patients, export outcomes for group"
      ],
      technicalDetails: [
        "Multi-tenant architecture: Each org (treatment center) has isolated patient database with org-level settings",
        "FHIR-compliant: Patient resources sync with external EHR systems via CarePlan, Observation, Goal",
        "Role-based access: Org admins create patients, clinicians manage assigned patients, patients see only their own data",
        "Search & filter: Find patients by status, risk level, Journey phase, last activity, pillar focus",
        "Audit logs: Track all patient record changes (HIPAA compliance requirement)"
      ]
    },
    interconnections: {
      feedsInto: ["momentum", "navigate", "journey", "platform"],
      receivesFrom: ["platform", "navigate"],
      synergy: "Patient Management is the operational backbone. It creates the patient record that Platform OS animates with intelligence, Momentum visualizes for clinicians, Navigate coordinates across teams, and Journey guides through recovery."
    },
    keyConcepts: ["Administrative efficiency", "Lifecycle management", "Multi-tenant isolation", "Compliance-ready", "Operational scalability"],
    experience: {
      patient: "Patients never see Patient Management—but they experience its impact: seamless intake (profile already created), instant Journey assignment, coordinated care team, smooth discharge transitions.",
      clinician: "Intake day: Create patient profile (2 minutes) → assign 12-Week Foundation Journey → add care team members → patient receives welcome email with login. First Journey step lands that evening. Total admin time: 5 minutes."
    },
    appleGradeDetails: [
      "Quick add: Patient profile creation in < 2 minutes (name, email, program, Journey template)",
      "Smart defaults: Common Journey templates pre-selected based on program type (inpatient, IOP, outpatient)",
      "Duplicate detection: System checks for existing profiles before creating new ones",
      "Batch import: CSV upload for enrolling cohorts (e.g., 20 patients starting Monday)",
      "Discharge workflows: Automated checklist (export care plan, schedule aftercare, notify outpatient team, transfer Journey)"
    ],
    proofToShow: "Pilot study: Patient Management reduced intake administrative time from 22 minutes (manual EHR entry) to 4 minutes (Recover OS). Discharge coordination errors dropped from 31% to 3%.",
    demoMoment: "Treatment center enrolls 15 new patients Monday. Admin uploads CSV → profiles created, Journeys assigned, care teams auto-populated from org defaults, welcome emails sent. Total time: 8 minutes. Patients start Journey that evening.",
    screenshot: "Patient Management dashboard with patient grid, quick-add form, and Journey assignment interface"
  }
];

// SYSTEM MAP - How the 9 truths map to functional blocks and connect
const systemMap = {
  blocks: [
    {
      id: "platform",
      name: "Recover OS",
      carouselNumber: 1,
      carouselHeadline: "Neuroadaptive continuous-care OS",
      tagline: "The foundation layer everything runs on",
      whatItIs: "The adaptive infrastructure that synchronizes clinical protocols, patient life, and identity-level change.",
      role: "Foundation",
      color: "#3E2BB8",
      connects: ["momentum", "navigate", "luma", "journey"],
      keyConceptsProvided: ["Continuity", "Interoperability", "Standards portability"]
    },
    {
      id: "momentum",
      name: "Momentum Dashboard",
      carouselNumber: 2,
      carouselHeadline: "Know your patients in 60 seconds",
      tagline: "Clinician intelligence layer",
      whatItIs: "Real-time patient state overview with Sync scores, pillar engagement, risk flags, and care notes.",
      role: "Clinician Loop",
      color: "#5739FB",
      connects: ["platform", "journey", "luma", "navigate"],
      keyConceptsProvided: ["Clinical efficiency", "Proactive care", "Signal-rich supervision"]
    },
    {
      id: "navicues",
      name: "NaviCues",
      carouselNumber: 3,
      carouselHeadline: "Recovery in the flow of life",
      tagline: "Proactive cues + reactive rescues",
      whatItIs: "Proactive NaviCues (8-12 min skill-building) and reactive ResCues (60-90 sec stabilization) delivered just-in-time when patient state signals need. ResCue button launches LUMA; in LUMA, becomes SOS to alert care team.",
      role: "Patient Loop - Intervention Layer",
      color: "#7C67FF",
      connects: ["journey", "luma", "library", "inner-compass", "navigate"],
      keyConceptsProvided: ["Just-in-time intervention", "Proactive + Reactive", "Instagram-speed provocation", "Building Blocks for depth"]
    },
    {
      id: "luma",
      name: "LUMA",
      carouselNumber: 4,
      carouselHeadline: "Your emotional co-pilot",
      tagline: "Pattern recognition & curation engine",
      whatItIs: "Context-aware companion that sequences prompts, curates interventions, and escalates to humans. Contains ResCue button that becomes SOS—pressing SOS sends crisis alert to entire care team.",
      role: "Adaptive Intelligence",
      color: "#C4B5FD",
      connects: ["journey", "navicues", "wellbeing", "inner-compass", "momentum", "navigate"],
      keyConceptsProvided: ["Timely wisdom", "Pattern recognition", "ResCue → SOS escalation", "Warm handoff"]
    },
    {
      id: "wellbeing",
      name: "Wellbeing",
      carouselNumber: 5,
      carouselHeadline: "Personalised body wisdom",
      tagline: "Somatic toolkit",
      whatItIs: "Library of breathwork, movement, somatic practices tailored to nervous system state.",
      role: "Patient Loop - Body Integration",
      color: "#A8E6CF",
      connects: ["luma", "journey", "inner-compass"],
      keyConceptsProvided: ["Embodiment", "Nervous system regulation", "Body wisdom"]
    },
    {
      id: "library",
      name: "Library",
      carouselNumber: 6,
      carouselHeadline: "Endless discovery",
      tagline: "Content depth + Building Blocks",
      whatItIs: "200+ evidence-based resources (ACT, DBT, IFS, SE, CFT) organized by pillar and searchable. When NaviCues spark curiosity, Building Blocks provide infinite exploration—no finite boxes, open canvas for learning.",
      role: "Knowledge Foundation",
      color: "#FFB84D",
      connects: ["journey", "navicues", "luma"],
      keyConceptsProvided: ["Depth", "Discovery", "Building Blocks", "Infinite exploration"]
    },
    {
      id: "inner-compass",
      name: "Inner Compass",
      carouselNumber: 7,
      carouselHeadline: "Map your State",
      tagline: "Self-awareness tool",
      whatItIs: "Real-time nervous system tracking across 4 dimensions with pattern visibility.",
      role: "Patient Loop - Self-Monitoring",
      color: "#87CEEB",
      connects: ["luma", "journey", "momentum", "wellbeing"],
      keyConceptsProvided: ["Interoceptive awareness", "State tracking", "Self-knowledge"]
    },
    {
      id: "navigate",
      name: "Navigate",
      carouselNumber: 8,
      carouselHeadline: "Always Connected",
      tagline: "Care coordination + SOS response",
      whatItIs: "Synchronized care team layer—therapist, psychiatrist, coordinator, family—all seeing real-time state. Receives SOS alerts when patient presses SOS in LUMA, enabling immediate human support.",
      role: "Clinician Loop - Coordination",
      color: "#DDA0DD",
      connects: ["platform", "momentum", "luma", "journey"],
      keyConceptsProvided: ["Continuity", "Coordination", "SOS escalation", "No cold handovers"]
    },
    {
      id: "journey",
      name: "Journey",
      carouselNumber: null, // Spans multiple carousel truths
      carouselHeadline: "Patient Experience Layer",
      tagline: "Structured daily choreography",
      whatItIs: "Clinician-curated daily flows: check-ins, rituals, reflections, skills practice—adaptive and sequenced.",
      role: "Patient Loop - Daily Arc",
      color: "#FF8E72",
      connects: ["platform", "luma", "navicues", "rescues", "wellbeing", "library", "inner-compass", "momentum"],
      keyConceptsProvided: ["Structured practice", "Daily rhythm", "Skills rehearsal"]
    }
  ],

  loops: {
    patientLoop: {
      name: "Patient Loop",
      description: "Signal → Intervention → Micro-win → Reflection → Confidence ↑",
      components: ["journey", "navicues", "luma", "inner-compass", "wellbeing", "library"],
      flow: [
        "Patient checks Inner Compass (state)",
        "LUMA notices pattern + curates next move",
        "Delivers NaviCue (proactive skill-building) or ResCue (reactive stabilization)",
        "Patient completes practice → micro-win. If crisis: ResCue button → launches LUMA → SOS button → alerts care team",
        "Reflection captured → Journey adjusts",
        "Confidence builds → identity shifts"
      ]
    },
    clinicianLoop: {
      name: "Clinician Loop",
      description: "Console insight → Journey tweak → ERA retimes cues → Outcomes ↑",
      components: ["momentum", "navigate", "platform", "journey", "luma"],
      flow: [
        "Therapist opens Momentum Dashboard",
        "Sees Sync score, risk flags, recent activity (60 seconds)",
        "Adjusts Journey plan (one-tap)",
        "Platform syncs changes to patient experience",
        "LUMA retimes cues based on new plan",
        "Next session: outcomes trend bends"
      ]
    },
    dataLoop: {
      name: "Data Loop (ERA Flow)",
      description: "Experience → Reflection → Adjustment (on repeat)",
      components: ["platform", "luma", "inner-compass", "momentum"],
      flow: [
        "Experience: Patient engages with NaviCue/ResCue",
        "Reflection: Inner Compass captures state change",
        "Adjustment: LUMA tunes timing/content",
        "Clinician Feedback: Momentum shows patterns",
        "System Learning: Platform adapts thresholds",
        "Loop repeats: Insights become reflexes"
      ]
    }
  },

  keyConceptsMissing: [
    {
      concept: "Continuity",
      whereItLives: ["Platform (OS-level)", "Navigate (care coordination)", "Journey (admission to aftercare)"],
      why: "Recovery doesn't end at discharge. Same guidance, same language, same cadence—everywhere.",
      howToMessage: "Emphasize 'from inpatient to 365-day care' + 'no cold handovers' + 'continuity by design'"
    },
    {
      concept: "Reinforcement",
      whereItLives: ["ERA Flow (Experience→Reflection→Adjustment)", "LUMA (timely prompts)", "Journey (practice repetition)"],
      why: "Neural pathways strengthen through repeated exposure. Reinforcement turns insights into reflexes.",
      howToMessage: "Highlight 'just-in-time reinforcement' + 'micro-wins compound' + 'practice until automatic'"
    },
    {
      concept: "Precision Timing",
      whereItLives: ["LUMA (pattern recognition)", "ResCues (when urge hits)", "NaviCues (before trigger window)"],
      why: "The second between urge and action is where recovery happens. Timing is everything.",
      howToMessage: "Feature 'the right wisdom at the right moment' + 'when life happens, tools are ready' + 'seconds, not sessions'"
    },
    {
      concept: "Warm Handoff",
      whereItLives: ["LUMA (escalation to humans)", "Navigate (care team sync)", "Momentum (risk flags)"],
      why: "Technology curates, humans connect. When risk spikes, the handoff must be seamless and warm.",
      howToMessage: "Showcase 'LUMA escalates, humans embrace' + 'no dropped threads' + 'safety rails built in'"
    }
  ],

  synergy: [
    {
      connection: "LUMA ↔ Inner Compass",
      synergy: "Inner Compass feeds state data to LUMA. LUMA suggests check-ins when patterns need tracking.",
      reinforcement: "Self-awareness loop: The more you map, the better LUMA curates."
    },
    {
      connection: "NaviCues ↔ Journey",
      synergy: "Journey defines the arc. NaviCues execute the steps in real-time, adapting to context.",
      reinforcement: "Structured flexibility: Protocols breathe with the person."
    },
    {
      connection: "Momentum ↔ LUMA",
      synergy: "LUMA surfaces patient patterns. Momentum aggregates them for clinicians with risk color-coding.",
      reinforcement: "Intelligence bridge: Patient experience → Clinical insight."
    },
    {
      connection: "Platform ↔ Navigate",
      synergy: "Platform provides interoperability spine (FHIR, EHR sync). Navigate uses it to coordinate care teams.",
      reinforcement: "Technical continuity enables human coordination."
    },
    {
      connection: "Journey ↔ Library",
      synergy: "Library contains the content. Journey sequences it into daily practice based on pillar needs.",
      reinforcement: "Content becomes curriculum: From resources to lived experience."
    },
    {
      connection: "Wellbeing ↔ LUMA ↔ Inner Compass",
      synergy: "Inner Compass shows dysregulated state → LUMA curates somatic practice from Wellbeing toolkit.",
      reinforcement: "Body-state-action loop: Nervous system regulation becomes automatic."
    }
  ]
};

// EPIC STORIES - Product Backlog (Foundation → Intelligence → Management → SaaS)
type StoryStatus = "not-started" | "in-progress" | "complete" | "blocked";
type StorySize = "xs" | "s" | "m" | "l" | "xl" | "xxl";

interface EpicStory {
  id: string;
  number: string;
  name: string;
  tagline: string;
  vision: string;
  whatItSolves: string;
  status: StoryStatus;
  size: StorySize;
  dependencies: string[];
  acceptanceCriteria: string[];
  technicalNotes: string[];
  deliverables: string[];
  priority: "critical" | "high" | "medium" | "low";
  phase: "foundation" | "intelligence" | "management" | "saas" | "optimization" | "infrastructure" | "future" | "core";
  comments?: string[]; // Comments/notes for review - shows "NEEDS REVIEW" badge
}

const epicStories: EpicStory[] = [
  {
    id: "st0",
    number: "ST0",
    name: "Complete Foundation",
    tagline: "The bedrock that makes everything else possible",
    vision: "Brand Anchor contains 6 Pillars framework, 150+ Micro-blocks library, content mapping, and System Map. This becomes the SPEC for the intelligence algorithm.",
    whatItSolves: "Without this foundation, the algorithm won't know what to map, traffic lights won't have meaning, and the platform won't have clinical grounding.",
    status: "in-progress",
    size: "l",
    dependencies: [],
    acceptanceCriteria: [
      "✅ 6 Pillars section added to Brand Anchor with clinical stance, mechanisms, ERA flow, measurement framework",
      "✅ Micro-blocks library structure created (awaiting individual pillar deep-dive content)",
      "✅ System Map complete with reinforcement concepts and interconnections",
      "✅ Core Features section complete with 10 features, Apple-grade detail, cross-references",
      "🔲 Individual pillar deep-dives: Clinical maps, Dream Teams, example ERA weeks, NaviCue pairings",
      "🔲 Content mapping table: which NaviCues/Library resources target which micro-blocks",
      "🔲 JSON export of micro-blocks for ST1 algorithm"
    ],
    technicalNotes: [
      "Pure content work - no code yet",
      "This becomes JSON data structure for ST1",
      "Can start with core 30 micro-blocks, expand to 150+ iteratively"
    ],
    deliverables: [
      "Brand Anchor: 6 Pillars section",
      "Brand Anchor: Micro-blocks library",
      "Brand Anchor: Content mapping table",
      "JSON export of micro-blocks for algorithm"
    ],
    priority: "critical",
    phase: "foundation"
  },
  {
    id: "st1",
    number: "ST1",
    name: "Intelligence Algorithm + Traffic Light System",
    tagline: "The brain that governs everything",
    vision: "Build the HCP algorithm that maps patient activities → micro-blocks → traffic lights (red/orange/green). LUMA decision engine selects interventions based on state. Clinicians see real-time patient intelligence in Momentum.",
    whatItSolves: "Turns the platform from static content delivery into adaptive intelligence. The 'neuroadaptive' in our positioning becomes REAL.",
    status: "not-started",
    size: "xxl",
    dependencies: ["ST0"],
    acceptanceCriteria: [
      "Server function: Calculate micro-block states from patient activity",
      "Traffic light logic: Red (dysregulated) / Orange (fragile) / Green (regulated)",
      "LUMA decision engine: Select NaviCue vs ResCue based on state + context",
      "Pillar rollup scores: Aggregate micro-blocks → 6 pillar scores",
      "Momentum Dashboard shows traffic lights for each patient",
      "Patient view: Simplified state visualization (no overwhelming data)",
      "Journey auto-tuning: Lighten load when red, progress when green",
      "Pattern detection: Identify trends over time"
    ],
    technicalNotes: [
      "KV Store structure: patient:{id}:microblocks, patient:{id}:pillars, patient:{id}:hcp:graph",
      "Server function: /make-server-49b28b8a/luma-engine",
      "Algorithm weights: Time since last practice, completion rate, state check-ins, trigger exposure",
      "LUMA prioritization: Safety (escalate) → Stability (ResCue) → Progress (NaviCue) → Rest (back off)",
      "Real-time calculation on patient state change, cached for dashboard views"
    ],
    deliverables: [
      "/supabase/functions/server/hcp-algorithm.tsx",
      "/supabase/functions/server/luma-engine.tsx",
      "Momentum Dashboard traffic light UI",
      "Patient state visualization component",
      "Journey auto-tune logic"
    ],
    priority: "critical",
    phase: "intelligence"
  },
  {
    id: "st1-5",
    number: "ST1.5",
    name: "HCP Graph Visualization",
    tagline: "Make the invisible visible",
    vision: "Interactive HCP graph showing micro-block connections, states, and pathways. Used in Momentum (clinician view) and optionally patient view.",
    whatItSolves: "Clinicians can SEE the neural pathway map, not just numbers. Makes the neuroscience tangible.",
    status: "not-started",
    size: "m",
    dependencies: ["ST1"],
    acceptanceCriteria: [
      "Interactive graph component using D3 or similar",
      "Nodes = micro-blocks (colored by traffic light state)",
      "Edges = connections (weighted by relevance)",
      "Zoom/pan functionality",
      "Click node → see details (last practice, trend, related content)",
      "Pillar grouping visualization",
      "Export graph as image for reports"
    ],
    technicalNotes: [
      "Use recharts or visx for simpler version, or D3 for full interactivity",
      "Graph data structure stored in KV: patient:{id}:hcp:graph",
      "Update graph on state change (debounced)",
      "Mobile: Simplified view or disable (too complex for small screen)"
    ],
    deliverables: [
      "/components/HCPGraph.tsx (interactive version)",
      "Momentum integration",
      "Export functionality"
    ],
    priority: "medium",
    phase: "intelligence"
  },
  {
    id: "st2",
    number: "ST2",
    name: "Patient Management System",
    tagline: "Clinicians can add, track, and manage patients",
    vision: "Patient profiles, Journey assignments, care team management, progress tracking, clinical notes (Navigate). All tied to a single organization.",
    whatItSolves: "Moves from demo/prototype to real clinical tool. Therapists can use this with actual patients.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST1"],
    acceptanceCriteria: [
      "Create patient profile (name, admission date, Journey assignment)",
      "Assign care team (therapist, psychiatrist, coordinator, family opt-in)",
      "View patient list with filters (status, risk level, last activity)",
      "Patient detail page: Profile + Journey progress + Traffic lights + Notes",
      "Add clinical notes (Navigate integration)",
      "Journey assignment and modification",
      "Discharge workflow (move to aftercare status)",
      "Patient search and sorting"
    ],
    technicalNotes: [
      "KV structure: patient:{id}:profile, patient:{id}:journey, patient:{id}:careteam, patient:{id}:notes",
      "Server routes: POST /patients, GET /patients, PUT /patients/{id}, DELETE /patients/{id}",
      "Auth: Verify user is clinician or admin before patient operations",
      "Patient IDs: UUID v4 for privacy",
      "Soft delete (status: 'archived') rather than hard delete"
    ],
    deliverables: [
      "Patient management routes (server)",
      "Patient list page",
      "Patient detail page",
      "Patient creation flow",
      "Navigate clinical notes integration"
    ],
    priority: "high",
    phase: "management"
  },
  {
    id: "st2-5",
    number: "ST2.5",
    name: "Journey Builder",
    tagline: "Clinicians can create and customize therapeutic journeys",
    vision: "Template library of evidence-based Journeys (12-week foundation, DBT skills, trauma recovery, etc.). Clinicians can customize or build from scratch.",
    whatItSolves: "One-size-fits-all doesn't work in recovery. Clinicians need to adapt protocols to their model and patient needs.",
    status: "not-started",
    size: "l",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "Journey template library (pre-built evidence-based paths)",
      "Journey builder: Add/remove/reorder steps",
      "Step types: Check-in, NaviCue, Reflection, Ritual, Milestone",
      "Assign micro-blocks to each step (for HCP tracking)",
      "Set timing rules: Daily, weekly, on-demand, trigger-based",
      "Clone and customize existing Journeys",
      "Preview Journey flow before assigning",
      "Version control (track changes to Journey templates)"
    ],
    technicalNotes: [
      "KV structure: journey:template:{id}, org:{id}:journeys (org-specific templates)",
      "Journey schema: { steps: [], rules: {}, microblocks: [], pillarFocus: [] }",
      "No-code builder UI (drag-drop or form-based)",
      "Validation: Ensure step sequence makes clinical sense",
      "Default templates seeded from ST0 content mapping"
    ],
    deliverables: [
      "Journey template library",
      "Journey builder UI",
      "Journey assignment to patients",
      "Template versioning system"
    ],
    priority: "medium",
    phase: "management"
  },
  {
    id: "st3",
    number: "ST3",
    name: "Master Account + Client Deployment",
    tagline: "Multi-tenant SaaS architecture",
    vision: "Platform owner (you) has master dashboard to create organizations. Each org gets admin login to add clinicians/patients. Full org isolation.",
    whatItSolves: "Scales from single-org to multi-org. This is the B2B SaaS model: sell to treatment centers as seat-based licensing.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "Platform owner dashboard: Create/view/manage organizations",
      "Org creation flow: Name, plan (enterprise/standard), seat limit, admin email",
      "Org admin dashboard: Add/remove clinicians and patients",
      "Role-based auth: platform-owner, org-admin, clinician, patient",
      "Data scoping: Patients/clinicians only see their org's data",
      "Org settings: Branding, Journey templates, feature flags",
      "Org analytics: Usage, seat count, engagement metrics",
      "Invite system: Email invites for new users with role assignment"
    ],
    technicalNotes: [
      "Supabase Auth user_metadata: { role, orgId, orgName }",
      "KV structure: org:{id}:profile, org:{id}:users, org:{id}:settings",
      "Server middleware: Verify orgId matches resource being accessed",
      "getByPrefix for org-scoped queries: getByPrefix(`org:${orgId}:patients`)",
      "Platform owner: Special role with access to all orgs",
      "Org creation: Auto-create first admin user, send invite email"
    ],
    deliverables: [
      "Platform owner master dashboard",
      "Org creation flow",
      "Org admin dashboard",
      "User invite system",
      "Role-based route guards"
    ],
    priority: "high",
    phase: "saas"
  },
  {
    id: "st3-5",
    number: "ST3.5",
    name: "Onboarding Flows",
    tagline: "First-time experience for orgs, clinicians, patients",
    vision: "New org: Setup wizard (branding, first Journey templates, invite clinicians). New clinician: Product tour. New patient: Welcome flow.",
    whatItSolves: "Reduces friction for new users. Self-service onboarding = less support burden.",
    status: "not-started",
    size: "m",
    dependencies: ["ST3"],
    acceptanceCriteria: [
      "Org setup wizard: 5-step flow (branding, seat count, templates, invite team)",
      "Clinician onboarding: Product tour highlighting Momentum, Journey assignment, Navigate",
      "Patient onboarding: Welcome video, first Inner Compass check-in, assign first Journey",
      "Progress indicators (step 1 of 5)",
      "Skip option (return later)",
      "Completion tracking (mark onboarding as done)",
      "Optional demo data for new orgs (sample patients for testing)"
    ],
    technicalNotes: [
      "Local storage: Track onboarding completion state",
      "KV store: org:{id}:onboarding:status, user:{id}:onboarding:status",
      "Onboarding components: Reusable wizard framework",
      "Analytics: Track completion rate, drop-off points",
      "Demo data: Seeded anonymized patient records (opt-in)"
    ],
    deliverables: [
      "Org setup wizard",
      "Clinician product tour",
      "Patient welcome flow",
      "Demo data seeding"
    ],
    priority: "medium",
    phase: "saas"
  },
  {
    id: "st4",
    number: "ST4",
    name: "Full SaaS (Billing + Admin)",
    tagline: "Platform + PMPM pricing model",
    vision: "Stripe integration for seat-based billing. Usage tracking. Invoice generation. Platform analytics. Feature flags. Production-ready SaaS.",
    whatItSolves: "Moves from prototype to revenue-generating SaaS. This is the business model.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST3"],
    acceptanceCriteria: [
      "Stripe integration: Customer creation, subscription management",
      "Pricing tiers: Standard (100 seats) vs Enterprise (500+ seats)",
      "PMPM tracking: Per-patient-per-month billing",
      "Seat limit enforcement (block new patients if over limit)",
      "Invoice generation and email",
      "Usage dashboard: Seats used, active patients, engagement metrics",
      "Platform analytics: Org count, total patients, revenue, churn",
      "Feature flags: Enable/disable features per org or globally",
      "Billing admin: View invoices, update payment methods, cancel subscriptions"
    ],
    technicalNotes: [
      "Stripe: Use Checkout for subscriptions, Webhooks for updates",
      "KV structure: org:{id}:billing, org:{id}:usage",
      "Seat counting: Real-time patient count, update on patient create/delete",
      "Feature flags: org:{id}:features → { hcpGraph: true, lumaPremium: false }",
      "Platform analytics: Aggregated KV queries + caching",
      "Billing cycle: Monthly, charge on anniversary of org creation",
      "Grace period: 7 days after failed payment before suspension"
    ],
    deliverables: [
      "Stripe integration (server routes)",
      "Billing dashboard (org admin)",
      "Platform analytics dashboard (platform owner)",
      "Feature flag system",
      "Invoice generation"
    ],
    priority: "high",
    phase: "saas"
  },
  {
    id: "st5",
    number: "ST5",
    name: "Visual Diagram System",
    tagline: "Apple-style architecture diagrams",
    vision: "The ONE hero diagram showing patient loop ↔ clinician loop ↔ data loop. Plus diagrams for marketing, investor decks, and product documentation.",
    whatItSolves: "Buyers can't visualize how blocks connect. One diagram makes it click.",
    status: "not-started",
    size: "m",
    dependencies: ["ST0"],
    acceptanceCriteria: [
      "Hero diagram: Patient loop ↔ Clinician loop ↔ ERA engine (center)",
      "Component diagram: How each block (LUMA, Journey, Momentum, etc.) fits",
      "Data flow diagram: How information moves through the system",
      "Diagrams exportable as SVG/PNG for marketing site",
      "Interactive version (optional): Click blocks to learn more",
      "Variations for different audiences: Technical, clinical, executive"
    ],
    technicalNotes: [
      "Design in Figma first, then export or build in code",
      "Use SVG for crisp scaling",
      "Animated version using motion/react (optional)",
      "Store diagrams in /public or as React components"
    ],
    deliverables: [
      "Hero system diagram (patient/clinician/data loops)",
      "Component architecture diagram",
      "Marketing site integration",
      "Investor deck slides"
    ],
    priority: "high",
    phase: "foundation"
  },
  {
    id: "st6",
    number: "ST6",
    name: "Demo Mode",
    tagline: "Show, don't tell",
    vision: "Pre-seeded demo organization with realistic patient data (anonymized). Sales can walk through live platform without creating test patients. Reset-able.",
    whatItSolves: "Sales demos need REAL platform experience, not slides. Demo mode removes data entry friction.",
    status: "not-started",
    size: "s",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "Demo org with 10-15 realistic patient profiles",
      "Pre-populated Journeys, state check-ins, traffic lights",
      "Varied patient states (red, orange, green) for demo scenarios",
      "Clinical notes, care team assignments populated",
      "Demo mode toggle (platform owner can enable/disable)",
      "Reset button (restore demo org to initial state)",
      "Read-only option (prevent demo users from making changes)",
      "Demo banner: 'You're viewing demo data' (clear UX indicator)"
    ],
    technicalNotes: [
      "KV structure: org:demo:* (special demo org ID)",
      "Seed script: Generate realistic patient data (names, states, notes)",
      "Reset function: Delete all demo org data, re-seed from template",
      "Auth: Demo users get limited permissions (read-only or sandbox)",
      "Analytics: Track demo usage separately from real orgs"
    ],
    deliverables: [
      "Demo org seed script",
      "Demo mode UI toggle",
      "Reset functionality",
      "Sales demo guide"
    ],
    priority: "medium",
    phase: "optimization"
  },
  {
    id: "st7",
    number: "ST7",
    name: "Mobile Optimization",
    tagline: "Recovery lives on phones",
    vision: "Patient-facing features (Journey, LUMA, Inner Compass, Wellbeing) are mobile-first. Clinician features (Momentum) are desktop-optimized but mobile-usable.",
    whatItSolves: "Patients use phones 24/7. If the platform isn't mobile-friendly, it won't get used.",
    status: "not-started",
    size: "l",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "All patient pages responsive (Journey, Inner Compass, Library, Wellbeing)",
      "Touch-friendly UI (tap targets 44px+, swipe gestures where appropriate)",
      "Mobile navigation (bottom nav or hamburger)",
      "LUMA: Mobile-optimized (lock-screen widget feel)",
      "NaviCues/ResCues: One-tap launch from mobile",
      "Offline support (cache content, sync when online)",
      "Push notifications (optional): Reminders, LUMA prompts",
      "PWA setup (install to home screen)"
    ],
    technicalNotes: [
      "Tailwind: Mobile-first breakpoints (default = mobile, then md:, lg:)",
      "Test on real devices (iOS Safari, Android Chrome)",
      "PWA: manifest.json, service worker for offline",
      "Push notifications: Use Supabase Realtime or external service",
      "Offline: LocalStorage or IndexedDB cache, sync queue"
    ],
    deliverables: [
      "Mobile-responsive patient pages",
      "PWA setup",
      "Push notification system (optional)",
      "Mobile testing report"
    ],
    priority: "high",
    phase: "optimization"
  },
  {
    id: "st8",
    number: "ST8",
    name: "Integration Layer (EHR, Schedulers, Wearables)",
    tagline: "Interoperability that delivers on 'Always Connected'",
    vision: "FHIR-compliant EHR sync (patient records, care plans). Scheduler integration (sessions, groups). Wearable data (Apple Health, Google Fit) for HRV/sleep.",
    whatItSolves: "Clinical teams use EHRs. Patients wear smartwatches. Integration removes double-entry and enriches data.",
    status: "not-started",
    size: "xxl",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "FHIR API: Sync patient demographics, care plans, observations",
      "EHR partners: Integration with top 3 EHRs (e.g., Epic, Cerner, NextGen)",
      "Scheduler integration: Google Calendar, Outlook, Acuity",
      "Wearable data: Apple Health, Google Fit (HRV, sleep, steps)",
      "SSO (OIDC): Single sign-on for org users",
      "Webhook support: Real-time updates from external systems",
      "Data mapping: EHR fields → Platform fields (e.g., diagnosis → pillar focus)",
      "Privacy controls: Granular consent for data sharing"
    ],
    technicalNotes: [
      "FHIR: Use CarePlan, Observation, Patient resources",
      "OAuth2 for EHR/wearable auth",
      "Server functions: /integrations/ehr, /integrations/wearables",
      "Mapping layer: Transform external data → KV structure",
      "Audit log: Track all external data access (compliance)",
      "Rate limits: Respect EHR API limits, implement backoff",
      "Fallback: Manual entry if integration unavailable"
    ],
    deliverables: [
      "FHIR API integration",
      "EHR connector (top 3 EHRs)",
      "Wearable data sync",
      "SSO setup",
      "Integration admin dashboard"
    ],
    priority: "medium",
    phase: "optimization"
  },
  {
    id: "st9",
    number: "ST9",
    name: "Reporting & Outcomes",
    tagline: "Show, don't tell (with data)",
    vision: "Export-ready de-identified cohort data. Outcome graphs (craving reduction, retention, readmission). Org-level analytics. Public outcomes dashboard (optional).",
    whatItSolves: "Commissioners need proof. 'Big claims, light evidence' becomes 'Here's the 12-week pilot data.'",
    status: "not-started",
    size: "l",
    dependencies: ["ST1"],
    acceptanceCriteria: [
      "Cohort analytics: Aggregate patient outcomes by org or globally",
      "Outcome graphs: Craving intensity over time, pillar scores, retention rates",
      "De-identification: Strip PII before export",
      "Export formats: CSV, PDF report, shareable dashboard link",
      "Org admin: View org-specific outcomes",
      "Platform owner: View cross-org aggregate data",
      "Public dashboard (optional): De-identified rolling outcomes",
      "Comparison views: Pre/post intervention, cohort A vs B"
    ],
    technicalNotes: [
      "KV queries: Aggregate patient:{*}:pillars, patient:{*}:microblocks",
      "De-identification: Hash patient IDs, remove names/DOBs",
      "Charts: Use recharts for outcome visualizations",
      "Caching: Pre-compute aggregate metrics (daily/weekly)",
      "Methodology page: Explain how outcomes are calculated",
      "Privacy: Ensure HIPAA compliance (de-identified data exempt, but be cautious)"
    ],
    deliverables: [
      "Outcome dashboard (org-level)",
      "Cohort analytics (platform-level)",
      "Export functionality",
      "Public outcomes page (optional)"
    ],
    priority: "high",
    phase: "optimization"
  },
  {
    id: "st10",
    number: "ST10",
    name: "Security & Compliance",
    tagline: "Trust stack that closes deals",
    vision: "HIPAA compliance (BAA with Supabase), SOC2 Type II prep, penetration testing, security whitepaper, incident response plan.",
    whatItSolves: "Enterprise buyers (NHS, large providers) won't buy without security proof. This is table stakes for healthcare SaaS.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST4"],
    acceptanceCriteria: [
      "HIPAA compliance: BAA with Supabase, encryption at rest/in transit",
      "SOC2 Type II: Engage auditor, implement controls, achieve certification",
      "Penetration testing: Annual pen test, remediate findings",
      "Security whitepaper: 1-pager for enterprise buyers",
      "Incident response plan: Documented breach procedures",
      "Access controls: Role-based permissions, audit logs",
      "Data retention policy: Define retention periods, auto-delete",
      "Privacy policy: GDPR/CCPA compliance (if applicable)",
      "Security page on website: Visible certs, whitepaper, contact"
    ],
    technicalNotes: [
      "Supabase: Already HIPAA-compliant with BAA (verify this)",
      "Encryption: TLS 1.3 in transit, AES-256 at rest (Supabase default)",
      "Audit logs: KV structure: audit:{timestamp}:{userId}:{action}",
      "SOC2: Use Vanta or Drata for compliance automation",
      "Pen test: Engage external firm (e.g., Cobalt, Bugcrowd)",
      "Data retention: Background job to purge old records (configurable)",
      "Privacy policy: Use Termly or similar generator, customize"
    ],
    deliverables: [
      "HIPAA BAA with Supabase",
      "SOC2 Type II certification",
      "Pen test report + remediation",
      "Security whitepaper",
      "Security page on marketing site"
    ],
    priority: "high",
    phase: "saas"
  },
  {
    id: "st11",
    number: "ST11",
    name: "Platform Analytics Dashboard",
    tagline: "Know your business in 60 seconds",
    vision: "Platform owner dashboard: Org count, total patients, revenue (MRR/ARR), churn, engagement metrics, top features. Real-time insights.",
    whatItSolves: "You can't manage what you can't measure. This is the business intelligence layer.",
    status: "not-started",
    size: "m",
    dependencies: ["ST4"],
    acceptanceCriteria: [
      "Real-time metrics: Org count, patient count, active users",
      "Revenue tracking: MRR, ARR, churn rate",
      "Engagement: Daily/weekly active users, feature adoption",
      "Top orgs: By seats, by engagement, by revenue",
      "Cohort retention: 30/60/90-day retention curves",
      "Feature usage: Which features are used most/least",
      "Exportable reports: CSV, PDF",
      "Alerts: Notify on churn, low engagement, billing issues"
    ],
    technicalNotes: [
      "Analytics KV structure: analytics:daily:{date}, analytics:monthly:{month}",
      "Aggregation: Daily cron job to roll up metrics",
      "Charts: Recharts for time-series and cohort charts",
      "Caching: Compute metrics once, cache for 1 hour",
      "PostHog integration: Pull event data for deeper analysis",
      "Alerting: Email or Slack notifications on thresholds"
    ],
    deliverables: [
      "Platform analytics dashboard",
      "Revenue tracking",
      "Engagement metrics",
      "Alerting system"
    ],
    priority: "medium",
    phase: "saas"
  },
  {
    id: "st12",
    number: "ST12",
    name: "Content Management System",
    tagline: "Org admins can upload custom content",
    vision: "Library management: Orgs can upload PDFs, videos, custom NaviCues. Tag content with micro-blocks/pillars. Searchable. Versioned.",
    whatItSolves: "One-size-fits-all content doesn't work. Orgs want to integrate their proprietary materials.",
    status: "not-started",
    size: "l",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "Upload content: PDFs, videos, audio files",
      "Tag content: Assign micro-blocks, pillars, categories",
      "Custom NaviCues: Build org-specific interventions",
      "Content library: Browse, search, filter by tags",
      "Version control: Track updates to content",
      "Approval workflow (optional): Admin approves before publishing",
      "Content analytics: Track views, completions, ratings",
      "Supabase Storage: File storage with signed URLs"
    ],
    technicalNotes: [
      "Supabase Storage: Bucket per org (org-{orgId}-content)",
      "KV structure: org:{id}:content:{contentId} → metadata",
      "File types: PDF, MP4, MP3, EPUB (whitelist for security)",
      "Virus scanning: Optional (ClamAV or external service)",
      "Content CDN: Serve via Supabase signed URLs (private buckets)",
      "Search: Full-text search on title/description/tags"
    ],
    deliverables: [
      "Content upload UI",
      "Content library page",
      "Tagging system",
      "Content analytics"
    ],
    priority: "low",
    phase: "optimization"
  },
  {
    id: "st13",
    number: "ST13",
    name: "Platform Onboarding Overlay",
    tagline: "Guide users through features without overwhelming",
    vision: "In-app contextual guidance system that appears on first login and when new features launch. Interactive tooltips, feature spotlights, and progressive disclosure tutorials.",
    whatItSolves: "New users feel lost. New features go undiscovered. Onboarding overlays reduce friction, increase feature adoption, and decrease support burden.",
    status: "not-started",
    size: "m",
    dependencies: ["ST3"],
    acceptanceCriteria: [
      "First-time user flow: Welcome modal → feature tour → contextual tooltips",
      "Feature announcement system: Highlight new features with dismissible overlays",
      "Progressive disclosure: Show tips based on user actions (e.g., 'Try LUMA' after 3 Inner Compass check-ins)",
      "Dismissible and resumable: Users can skip tours and resume later",
      "Role-specific tours: Different onboarding for patients vs. clinicians vs. admins",
      "Completion tracking: Mark tours as complete, never show again (unless reset)",
      "Analytics: Track tour completion rates, drop-off points, time-to-first-value"
    ],
    technicalNotes: [
      "Use driver.js or intro.js for overlay framework (lightweight, accessible)",
      "KV structure: user:{id}:onboarding:{ tours: { dashboard: 'complete', momentum: 'skipped' } }",
      "Feature flags: Enable/disable tours per feature or globally",
      "Trigger logic: On first visit (localStorage check) OR when feature flag 'onboarding.{feature}' is set",
      "Mobile-responsive: Tooltips adapt to screen size, bottom-anchored on mobile",
      "Accessibility: Keyboard navigation, screen reader support, respect prefers-reduced-motion"
    ],
    deliverables: [
      "Onboarding overlay framework (driver.js integration)",
      "First-login welcome tour (patients)",
      "First-login dashboard tour (clinicians)",
      "Feature announcement system (admin-configurable)",
      "Onboarding progress tracking",
      "Analytics dashboard for tour effectiveness"
    ],
    priority: "medium",
    phase: "optimization"
  },
  {
    id: "st14",
    number: "ST14",
    name: "Sign-Up Wizard",
    tagline: "Profile complete in 60 seconds",
    vision: "Multi-step sign-up wizard that collects essential profile info, Journey preferences, care team opt-ins, and biometric permissions in one smooth flow on first login.",
    whatItSolves: "Incomplete profiles lead to poor personalization. Wizard ensures all critical data is captured upfront while feeling effortless.",
    status: "not-started",
    size: "m",
    dependencies: ["ST3"],
    acceptanceCriteria: [
      "5-step wizard: Welcome → Profile basics (name, DOB, program) → Journey selection → Care team opt-ins (family, providers) → Privacy & biometrics",
      "Progress indicator: Step 1 of 5 with visual progress bar",
      "Smart defaults: Pre-select most common options (e.g., 12-Week Foundation Journey)",
      "Skip-able steps: 'I'll do this later' option for non-critical fields",
      "Validation: Real-time field validation with helpful error messages",
      "Mobile-optimized: Large tap targets, keyboard-friendly, minimal typing",
      "Celebration moment: 'You're all set!' screen with first Journey step preview",
      "Resume-able: Save partial progress if user exits wizard"
    ],
    technicalNotes: [
      "Multi-step form library: React Hook Form + Zod validation",
      "KV structure: user:{id}:profile:{ name, dob, program, journeyPreference, careTeam, privacySettings }",
      "State persistence: LocalStorage for partial wizard state, sync to KV on completion",
      "Auto-advance: After field completion, auto-focus next field or auto-advance to next step",
      "Prefill from EHR: If available, pre-populate demographics from org's EHR integration",
      "Accessibility: Focus management, screen reader announcements, clear field labels"
    ],
    deliverables: [
      "Sign-up wizard component (5-step flow)",
      "Profile schema + validation rules",
      "Wizard progress tracking",
      "Resume wizard functionality",
      "First Journey assignment logic",
      "Welcome email trigger on completion"
    ],
    priority: "high",
    phase: "optimization"
  },
  {
    id: "st15",
    number: "ST15",
    name: "Native Mobile APP (React Native)",
    tagline: "One codebase, iOS + Android",
    vision: "React Native app that shares codebase with web platform. Patient-facing features optimized for mobile-first use. Offline-capable. Push notifications ready. Leverages existing Recoverlution app setup (App Store/Play Store accounts ready).",
    whatItSolves: "Patients live on phones 24/7. Web-only limits engagement. Native app delivers better UX, offline support, push notifications, and lock-screen widgets.",
    status: "not-started",
    size: "xxl",
    dependencies: ["ST2", "ST7"],
    acceptanceCriteria: [
      "React Native setup: Expo or React Native CLI, shared components with web",
      "Core patient features: Journey, NaviCues, Inner Compass, LUMA, Wellbeing, Library",
      "Offline-first: Cache content, queue actions, sync when online",
      "Push notifications: Integrated (see ST16 for details)",
      "Biometric auth: Face ID / Touch ID for secure login",
      "Native UI components: Bottom tab navigation, native animations, haptic feedback",
      "Deep linking: Open specific NaviCues or Journey steps from notifications",
      "App Store & Play Store: Submission-ready builds, screenshots, descriptions",
      "Code sharing: 80%+ shared code between web and mobile via shared components library"
    ],
    technicalNotes: [
      "Framework: React Native (not Expo - need custom native modules for offline-first architecture)",
      "Code organization: /shared (components, hooks, utils) + /web + /mobile",
      "State management: Same Zustand/Jotai stores across web and mobile",
      "API client: Same fetch wrappers, same server routes",
      "Offline: React Query with persistence, IndexedDB (web) / AsyncStorage (mobile)",
      "Platform-specific: Navigation (React Navigation for mobile, router.tsx for web), Storage (AsyncStorage vs. LocalStorage)",
      "Build pipeline: Separate builds for iOS/Android, shared CI/CD with web",
      "Existing setup: Recoverlution app accounts already exist - just need to update bundle IDs and submit new build",
      "Testing: Jest for shared logic, Detox for E2E mobile testing"
    ],
    deliverables: [
      "React Native project setup",
      "Shared component library (/shared)",
      "Mobile app (iOS + Android builds)",
      "Offline-first architecture",
      "Biometric authentication",
      "Deep linking setup",
      "App Store submission (iOS)",
      "Play Store submission (Android)",
      "Mobile-specific UI optimizations"
    ],
    priority: "high",
    phase: "optimization"
  },
  {
    id: "st16",
    number: "ST16",
    name: "Push Notifications + Bottom Tab Bar",
    tagline: "NaviCues delivered to your pocket",
    vision: "Push notification system for delivering LUMA-curated NaviCues, Journey reminders, care team messages, and risk alerts. Bottom tab bar navigation for mobile app. Lock-screen quick actions.",
    whatItSolves: "Patients miss interventions if they have to remember to open the app. Push notifications deliver timely support exactly when needed.",
    status: "not-started",
    size: "l",
    dependencies: ["ST15", "ST1"],
    acceptanceCriteria: [
      "Push notification infrastructure: Firebase Cloud Messaging (iOS + Android)",
      "Notification types: NaviCue suggestions, Journey step reminders, Inner Compass nudges, LUMA insights, Care team messages, Risk alerts",
      "Smart timing: LUMA determines optimal send time based on user patterns (no 3am notifications)",
      "Rich notifications: Images, action buttons (e.g., 'Start NaviCue' vs. 'Remind me later')",
      "Notification preferences: Granular controls per notification type, quiet hours, frequency limits",
      "Bottom tab bar: Home (Dashboard), Journey, LUMA, Inner Compass, Library - consistent navigation",
      "Lock-screen widgets: Quick access to Inner Compass check-in, last NaviCue, LUMA insight",
      "Deep linking: Tap notification → open specific NaviCue or Journey step",
      "Analytics: Track notification delivery, open rates, action rates, opt-out rates"
    ],
    technicalNotes: [
      "FCM setup: Firebase project with iOS APNs + Android FCM credentials",
      "Server function: /make-server-49b28b8a/notifications/send (queues notifications via FCM)",
      "KV structure: user:{id}:notifications:{ preferences, tokens, deliveryLog }",
      "Token management: Store FCM tokens per device, refresh on app start",
      "Batching: Queue notifications, send in batches (avoid rate limits)",
      "Scheduling: Use Firebase Cloud Scheduler or server cron jobs for time-based notifications",
      "LUMA integration: LUMA decision engine triggers notification send when intervention is selected",
      "Quiet hours: Default 10pm-8am, user-configurable",
      "Notification throttling: Max 3 notifications per day unless critical (risk alerts always send)",
      "Bottom tab bar: React Navigation bottom tabs, icon set from lucide-react",
      "Lock-screen widgets: iOS (WidgetKit) + Android (Glance widgets) - separate native implementations"
    ],
    deliverables: [
      "Firebase Cloud Messaging setup",
      "Server notification sending function",
      "Notification preference UI",
      "Bottom tab bar navigation (mobile)",
      "Lock-screen widgets (iOS + Android)",
      "Deep linking handlers",
      "Notification analytics dashboard",
      "Push notification testing suite"
    ],
    priority: "high",
    phase: "optimization"
  },
  {
    id: "st17",
    number: "ST17",
    name: "Voice Analysis AI",
    tagline: "Hear what's beneath the words",
    vision: "Real-time voice emotion detection that analyzes tone, pitch, cadence, and prosody to identify anxiety, stress, elevated emotional states, or calm markers. Integrates with Inner Compass, LUMA, and ResCue to provide clinicians with voice-based emotional insights.",
    whatItSolves: "Patients can say 'I'm fine' while their voice reveals distress. Voice AI catches what words hide—anxiety spikes, emotional dysregulation, or calm states—giving clinicians and LUMA early warning signals.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST1", "ST2", "ST15"],
    acceptanceCriteria: [
      "Voice capture: Record audio during Inner Compass check-ins, ResCue interactions, or opt-in voice notes",
      "Emotion detection: Analyze tone, pitch, speed, volume, pauses for markers of anxiety, stress, calm, agitation",
      "Privacy-first: Process on-device where possible, encrypt in-transit, user consent required",
      "Integration: Feed insights to LUMA decision engine + clinician Momentum dashboard",
      "Visual feedback: Show 'Voice analysis detected elevated stress' in clinician view",
      "Patient transparency: Patients can see/hear what was analyzed ('Your voice showed signs of anxiety')",
      "Opt-in/opt-out: Granular controls per feature (e.g., voice check-ins yes, voice notes no)",
      "Thresholds: Configurable sensitivity (avoid false positives)"
    ],
    technicalNotes: [
      "APIs: Hume AI (emotion detection), AssemblyAI (transcription + sentiment), or custom ML model",
      "Audio processing: WebRTC for browser capture, native audio APIs for mobile",
      "On-device ML: Use TensorFlow Lite or Core ML for real-time processing (reduce latency, increase privacy)",
      "Server processing: For deeper analysis, send encrypted audio to server function → external API → return metrics",
      "KV structure: user:{id}:voiceAnalysis:{ timestamp, emotionScores, markers, transcription }",
      "LUMA integration: Voice markers become inputs to LUMA decision tree (e.g., high anxiety → suggest grounding NaviCue)",
      "Compliance: HIPAA-compliant audio storage (encrypted at rest), consent logging",
      "Fallback: If voice analysis unavailable, fall back to text-only check-ins"
    ],
    deliverables: [
      "Voice capture UI (opt-in prompts)",
      "Emotion detection integration (API or on-device)",
      "LUMA voice input pipeline",
      "Clinician voice insights dashboard",
      "Patient transparency UI",
      "Privacy controls + consent flow",
      "Voice analysis testing suite"
    ],
    priority: "low",
    phase: "future"
  },
  {
    id: "st18",
    number: "ST18",
    name: "Video Analysis AI",
    tagline: "Read the face, feel the truth",
    vision: "Computer vision that analyzes facial expressions, micro-expressions, gaze patterns, and body language during video check-ins to detect emotional states, engagement levels, and distress markers. Enriches clinician insights and LUMA decision-making.",
    whatItSolves: "Video calls reveal what audio can't—averted gaze, tense jaw, flat affect. Video AI gives clinicians emotional context before/during sessions and helps LUMA detect when a patient needs immediate support.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST1", "ST2", "ST15"],
    acceptanceCriteria: [
      "Video capture: Opt-in video check-ins (selfie-style or session recordings)",
      "Facial analysis: Detect emotions (joy, sadness, anger, fear, surprise, disgust, neutral) via facial expressions",
      "Micro-expressions: Catch fleeting emotional leaks (e.g., brief fear response masked by smile)",
      "Engagement detection: Track gaze direction, attention, disengagement (looking away, closed eyes)",
      "Body language: Detect posture cues (slumped shoulders, crossed arms) if full-body visible",
      "Privacy-first: Process on-device where possible, encrypted storage, explicit consent",
      "Integration: Feed insights to LUMA + clinician dashboard",
      "Patient transparency: Show analyzed emotions ('Video showed signs of sadness')",
      "Opt-in/opt-out: Granular controls (e.g., yes to check-ins, no to session recording)",
      "Bias mitigation: Test across diverse demographics to avoid bias in emotion detection"
    ],
    technicalNotes: [
      "APIs: Hume AI (facial emotion), Microsoft Azure Face API, or custom ML model (FER+ dataset)",
      "Video processing: WebRTC for browser, native camera APIs for mobile",
      "On-device ML: Use TensorFlow Lite or Core ML for real-time face analysis (privacy + speed)",
      "Server processing: For deeper analysis, send encrypted video frames → API → return emotion scores",
      "KV structure: user:{id}:videoAnalysis:{ timestamp, emotionScores, gazeMetrics, engagement }",
      "LUMA integration: Video markers become inputs (e.g., detected sadness + low engagement → suggest connection NaviCue)",
      "Compliance: HIPAA-compliant video storage (encrypted at rest), consent logging, no third-party sharing",
      "Frame sampling: Analyze every Nth frame (reduce compute cost)",
      "Fallback: If video analysis unavailable, fall back to voice or text check-ins"
    ],
    deliverables: [
      "Video capture UI (opt-in prompts)",
      "Facial emotion detection integration",
      "LUMA video input pipeline",
      "Clinician video insights dashboard",
      "Patient transparency UI",
      "Privacy controls + consent flow",
      "Video analysis testing suite",
      "Bias testing report"
    ],
    priority: "low",
    phase: "future"
  },
  {
    id: "st19",
    number: "ST19",
    name: "Text Analysis AI (Deviation Detection)",
    tagline: "Between the lines, beneath the surface",
    vision: "NLP-powered text analysis that detects sentiment shifts, linguistic markers of distress (absolutism, hopelessness), deviation from baseline communication patterns, and crisis language. Analyzes Inner Compass text entries, Journey reflections, and Navigate messages.",
    whatItSolves: "Patients may not explicitly say they're struggling, but their language shifts—shorter responses, negative sentiment spikes, crisis keywords. Text AI catches these deviations and alerts clinicians before small struggles become big crises.",
    status: "not-started",
    size: "l",
    dependencies: ["ST1", "ST2"],
    acceptanceCriteria: [
      "Sentiment analysis: Track positive/negative/neutral sentiment over time, flag sudden shifts",
      "Crisis language detection: Identify keywords/phrases indicating self-harm, suicidal ideation, substance use (immediate escalation to ResCue/clinician)",
      "Baseline deviation: Establish patient's typical communication style (tone, length, frequency), flag deviations",
      "Linguistic markers: Detect absolutism ('always', 'never'), hopelessness ('no point', 'give up'), isolation ('alone', 'nobody')",
      "Integration: Feed insights to LUMA + clinician dashboard, trigger ResCue for crisis language",
      "Privacy-first: Process text securely, no third-party sharing without consent",
      "Patient transparency: Show flagged patterns ('Your recent entries showed increased negativity')",
      "False positive management: Avoid over-alerting (e.g., 'I'm devastated my team lost' ≠ crisis)",
      "Contextual understanding: Use context to distinguish crisis from casual language"
    ],
    technicalNotes: [
      "APIs: OpenAI GPT-4 (sentiment + crisis detection), Google Cloud NLP, or custom fine-tuned model",
      "Processing: Server-side analysis (text is already stored in KV)",
      "Baseline calculation: Calculate rolling average sentiment + communication metrics (length, frequency) per patient",
      "KV structure: user:{id}:textAnalysis:{ baseline, recentSentiment, deviations, crisisFlags }",
      "LUMA integration: Text insights feed into decision tree (e.g., sentiment drop → suggest reflection NaviCue)",
      "ResCue integration: Crisis keywords trigger immediate ResCue notification + clinician alert",
      "Threshold tuning: Configurable sensitivity to balance early detection vs. alert fatigue",
      "Compliance: HIPAA-compliant text processing, audit logs for crisis detections",
      "Multilingual: Support for multiple languages (if serving diverse populations)"
    ],
    deliverables: [
      "Text sentiment analysis pipeline",
      "Crisis language detection + escalation flow",
      "Baseline deviation tracking",
      "LUMA text input integration",
      "Clinician text insights dashboard",
      "Patient transparency UI",
      "Crisis detection testing suite",
      "False positive tuning report"
    ],
    priority: "medium",
    phase: "future"
  },
  {
    id: "st20",
    number: "ST20",
    name: "Automated Seat-Based Billing",
    tagline: "Select seats. Sign contract. Start healing.",
    vision: "Self-service billing portal where orgs select seat count, commit to 12-month contract, and choose monthly or annual payment. Automated invoicing, payment processing (Stripe), and seat management (add/remove seats mid-contract with prorated adjustments).",
    whatItSolves: "Manual contracts and invoicing create friction. Automated billing removes sales bottlenecks, speeds time-to-revenue, and gives orgs transparency + control over their subscription.",
    status: "not-started",
    size: "l",
    dependencies: ["ST2", "ST3"],
    acceptanceCriteria: [
      "Self-service portal: Org admin can select seat count (minimum 10 seats, maximum 500 for self-service)",
      "Pricing tiers: Display per-seat pricing (e.g., $50/seat/month for 10-49 seats, $40/seat for 50-199, $30/seat for 200+)",
      "Contract commitment: 12-month minimum, option for monthly or annual payment (annual gets 15% discount)",
      "Payment processing: Stripe integration (credit card, ACH, invoice billing for enterprise)",
      "Automated invoicing: Generate invoices monthly or annually, email to org admin + accounting contact",
      "Seat management: Add/remove seats mid-contract with prorated charges/credits",
      "Usage tracking: Show 'X of Y seats active' in admin dashboard",
      "Contract renewal: 30-day advance notice, auto-renew or cancel, price lock for 12 months",
      "Enterprise escalation: 500+ seats or custom needs → 'Contact Sales' flow",
      "Tax handling: Calculate sales tax based on org location (US states, VAT for EU)"
    ],
    technicalNotes: [
      "Payment gateway: Stripe Billing (subscriptions, invoicing, seat-based pricing)",
      "Stripe products: Create 'Recoverlution Platform' product with seat-based pricing tiers",
      "Server functions: /make-server-49b28b8a/billing/subscribe, /billing/manage, /billing/invoice",
      "KV structure: org:{id}:billing:{ seatCount, plan, paymentSchedule, stripeCustomerId, subscriptionId }",
      "Prorated adjustments: Use Stripe's proration features for seat changes mid-cycle",
      "Seat enforcement: On seat limit reached, prevent new patient invites (show 'Upgrade plan' prompt)",
      "Admin UI: Billing dashboard at /admin/billing (view invoices, change plan, update payment method)",
      "Compliance: PCI-DSS (Stripe handles), store minimal payment data (last 4 digits, expiry)",
      "Tax calculation: Use Stripe Tax or integrate TaxJar for automated sales tax",
      "Webhooks: Listen for Stripe events (payment success/failure, subscription updated/canceled)",
      "Dunning: Automated retry for failed payments (3 attempts over 2 weeks), then suspend access",
      "Cancellation flow: Allow cancel with 30-day notice, enforce 12-month minimum (no refunds)"
    ],
    deliverables: [
      "Self-service billing portal UI",
      "Stripe integration (subscriptions, invoicing)",
      "Seat management dashboard",
      "Automated invoicing system",
      "Prorated seat adjustment logic",
      "Payment webhook handlers",
      "Tax calculation integration",
      "Billing admin guide",
      "Contract templates (terms of service)"
    ],
    priority: "high",
    phase: "core"
  },
  {
    id: "st21",
    number: "ST21",
    name: "Baseline Assessment & Mind Mapping System",
    tagline: "Map the starting point, light the path forward",
    vision: "First 1-4 weeks are dedicated 'mind mapping' phase where platform systematically assesses patient's micro-block states across all 6 pillars. Uses Journey choreography, Inner Compass check-ins, and NaviCue completions to gather maximum data points and establish baseline red/orange/green traffic lights. Goal: Map as many micro-blocks as possible (target: 80-120 of 150+) to create accurate personalization foundation.",
    whatItSolves: "Without baseline, LUMA is guessing. With baseline, LUMA is personalizing. Establishes patient's unique starting point, identifies strengths (green blocks to leverage) and vulnerabilities (red blocks to prioritize). Enables true adaptive intelligence.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST1"],
    acceptanceCriteria: [
      "Onboarding Journey: Specialized 'Foundation Assessment' Journey (Week 1-4) designed to expose patient to diverse micro-blocks",
      "Systematic exposure: Each day introduces practices targeting different micro-blocks (emotional regulation Day 1, cognitive reframing Day 2, etc.)",
      "Inner Compass integration: Daily check-ins capture state data across 4 dimensions (nervous system, thoughts, emotions, cravings)",
      "NaviCue sampling: Short (2-3 min) assessment NaviCues for each pillar ('How do you respond to stress?' → maps stress resilience blocks)",
      "Reflection capture: Post-practice reflections feed micro-block scoring ('I found this practice challenging/helpful/neutral')",
      "Traffic light assignment: Algorithm assigns red/orange/green to each assessed micro-block based on: difficulty completing practice, Inner Compass state during practice, self-reported challenge level, completion rate",
      "Baseline dashboard: Clinician sees 'Baseline Assessment Progress' in Momentum (e.g., '67/150 micro-blocks assessed, 23 red, 31 orange, 13 green')",
      "Patient transparency: Patient sees their emerging map ('Your strengths: Decision Mastery, Cognitive Reframing. Areas for growth: Emotional Regulation, Stress Resilience')",
      "Neuroscience backing: Micro-block granularity aligns with research on semantic memory networks (120-150 distinct concepts within 6 domains)",
      "Adaptive pacing: If patient overwhelmed, slow baseline phase (extend to 4 weeks). If engaged, accelerate (complete in 2 weeks)",
      "Incomplete baseline handling: Algorithm works with partial data (minimum 40 micro-blocks for basic personalization)"
    ],
    technicalNotes: [
      "KV structure: user:{id}:baseline:{ microBlockStates: { 'emotional-regulation-distress-tolerance': { state: 'red', confidence: 0.87, lastAssessed: timestamp }, ... }, assessmentProgress: 67, targetBlocks: 150, phase: 'active/complete' }",
      "Assessment Journey: Pre-built Journey template 'Foundation Assessment' with 28 days of varied practices",
      "Scoring algorithm: Multi-factor (completion time, Inner Compass delta, reflection sentiment, attempts needed) → confidence score (0-1) + state (red/orange/green)",
      "Confidence thresholds: High confidence (0.8+) = trusted baseline. Low confidence (0.4-0.7) = provisional, reassess later. Very low (<0.4) = insufficient data.",
      "LUMA integration: Baseline data feeds LUMA decision tree (prioritize red blocks, reinforce green blocks, probe orange blocks)",
      "Reassessment: Baseline updates quarterly or after major life events (relapse, discharge, crisis)",
      "Clinician override: Therapist can manually adjust micro-block states based on session insights",
      "Export: Baseline report exportable as PDF for clinical records ('Patient {name} baseline assessment: {date}')"
    ],
    deliverables: [
      "'Foundation Assessment' Journey template (28-day baseline protocol)",
      "Baseline assessment algorithm (scoring + traffic light assignment)",
      "Clinician baseline dashboard (Momentum integration)",
      "Patient baseline progress view",
      "LUMA baseline data pipeline",
      "Baseline report export (PDF)",
      "Reassessment scheduler",
      "Neuroscience brief (justifying micro-block granularity)"
    ],
    priority: "critical",
    phase: "intelligence"
  },
  {
    id: "st22",
    number: "ST22",
    name: "LUMA Adaptive Intelligence Engine",
    tagline: "From linear content to dynamic curation",
    vision: "LUMA's decision-making algorithms that transform baseline + ongoing state data into personalized content curation. Determines which NaviCues to surface, when to suggest ResCues, how to adjust Journey pacing, which Library articles to recommend, which Wellbeing practices fit current state. Makes platform adaptive, not linear.",
    whatItSolves: "Without intelligence, everyone gets same Journey. With LUMA, each patient gets personalized path based on their micro-block states, patterns, progress. Maximizes relevance, minimizes overwhelm, increases engagement.",
    status: "not-started",
    size: "xxl",
    dependencies: ["ST1", "ST21"],
    acceptanceCriteria: [
      "Decision tree framework: LUMA follows priority hierarchy: 1) Safety (escalate to human) → 2) Stability (ResCue) → 3) Progress (NaviCue) → 4) Rest (back off)",
      "Micro-block targeting: Algorithm selects NaviCues that target patient's red/orange blocks (e.g., if emotional regulation red → suggest 'Urge Surfing' NaviCue)",
      "State-aware curation: Inner Compass state influences timing (e.g., high arousal → suggest grounding ResCue, not cognitive NaviCue)",
      "Pattern recognition: LUMA detects recurring patterns ('Patient struggles with stress every Monday morning' → proactively surface stress resilience NaviCue Sunday evening)",
      "Journey auto-tuning: If patient missing steps, LUMA suggests Journey pacing adjustment to clinician ('Reduce to 3x/week?' or 'Add rest day?')",
      "Library personalization: When patient browses Library, LUMA surfaces articles matching their red/orange blocks ('Recommended for you: Window of Tolerance deep-dive')",
      "Wellbeing matching: Suggests breathwork/movement practices aligned with current state (anxious → box breathing, low energy → gentle movement)",
      "Reinforcement learning: LUMA learns from patient responses (completed NaviCue → positive reflection → increase similar content frequency)",
      "Diversity balancing: Avoid over-targeting one pillar (ensure cross-pillar exposure even when focusing on weak areas)",
      "Clinician input integration: Therapist session notes feed LUMA ('Focus on shame work' → LUMA prioritizes shame-related content for 2 weeks)",
      "Explainability: Every LUMA suggestion includes 'Why this now?' explanation ('You mentioned low energy + upcoming meeting. This 3-minute grounding practice might help.')",
      "Opt-out option: One-switch 'Pause LUMA' (patient can silence suggestions for 24 hours, no guilt)"
    ],
    technicalNotes: [
      "Decision engine: Rule-based system (Phase 1) → ML-based system (Phase 2, future)",
      "Rule examples: IF emotional_regulation == 'red' AND inner_compass_arousal == 'high' THEN suggest_rescue('grounding'). IF stress_resilience == 'orange' AND day == 'Monday' THEN suggest_navicue('stress_prep') ON 'Sunday 7pm'.",
      "Pattern detection: Time-series analysis of Inner Compass data, identify recurring low points (day of week, time of day, location if opted-in)",
      "Scoring system: Each content piece tagged with micro-blocks it addresses + difficulty level + modality (cognitive/somatic/relational)",
      "Matching algorithm: Content score = (micro_block_match * 0.4) + (state_appropriateness * 0.3) + (difficulty_fit * 0.2) + (novelty * 0.1)",
      "KV structure: user:{id}:luma:{ decisionHistory: [{timestamp, action, reasoning, outcome}], patterns: [{type: 'recurring_stress', trigger: 'Monday morning', confidence: 0.82}], preferences: {prefers_somatic: true, avoids_video: false} }",
      "Feedback loop: Track suggestion→acceptance rate, suggestion→completion rate, suggestion→positive reflection rate",
      "Cold start problem: First 2 weeks (before baseline complete), use population-level defaults + rapid adaptation based on early signals",
      "Server-side processing: LUMA decision logic runs server-side (edge function) to enable complex algorithms without client-side compute",
      "Logging: All LUMA decisions logged for debugging and algorithm refinement ('Why did LUMA suggest X at Y time?')",
      "A/B testing infrastructure: Run experiments on LUMA logic (e.g., 'Does somatic-first sequencing improve engagement vs cognitive-first?')"
    ],
    deliverables: [
      "LUMA decision engine (rule-based Phase 1)",
      "Micro-block→content matching algorithm",
      "State-aware curation logic",
      "Pattern detection system",
      "Journey auto-tuning recommendations",
      "Library/Wellbeing personalization",
      "Explainability UI ('Why this suggestion?')",
      "LUMA logging and analytics dashboard",
      "Algorithm documentation (for clinical team review)",
      "A/B testing framework"
    ],
    priority: "critical",
    phase: "intelligence"
  },
  {
    id: "st23",
    number: "ST23",
    name: "Patient Onboarding & Activation System",
    tagline: "From signup to baseline: the first mile",
    vision: "Comprehensive onboarding experience that introduces platform features, builds engagement habits, collects baseline data, and establishes LUMA relationship. Includes: welcome wizard, feature tutorials (contextual, not overwhelming), light gamification (micro-wins, not gaming), and systematic 'valuable interruption' notifications. Goal: 80%+ of new patients complete baseline assessment.",
    whatItSolves: "Patients won't use tools they don't understand. Onboarding creates clarity, builds confidence, establishes rhythm. First-week engagement predicts long-term retention—onboarding determines if platform becomes daily companion or forgotten app.",
    status: "not-started",
    size: "l",
    dependencies: ["ST21"],
    acceptanceCriteria: [
      "Welcome wizard: 5-step introduction (30 seconds per step): 1) 'Welcome to your recovery companion' 2) 'Meet LUMA' (intro + personality) 3) 'Your Journey begins' (show today's step) 4) 'Check your Inner Compass' (first state check) 5) 'We're building your map' (explain baseline phase)",
      "LUMA introduction: Dedicated 'Meet LUMA' interaction—LUMA asks 2-3 questions, shares first insight, sets expectation ('I'll observe your patterns and suggest practices when timing feels right. You're in control.')",
      "Contextual tutorials: Feature tooltips appear when relevant (first time viewing Library → 'Search by pillar or keyword.' First NaviCue → 'Take your time. This is practice, not performance.')",
      "Micro-win celebration: Small animations/affirmations for milestones (First Inner Compass check → '✨ You're tuning in. That's the first step.' First NaviCue complete → 'You showed up. That's courage.')",
      "Progress visibility: Onboarding dashboard shows 'Your First Week' checklist (NOT mandatory, but visible): ✅ Meet LUMA, ✅ Complete first Journey step, ⬜ Check Inner Compass 3x, ⬜ Complete first NaviCue, ⬜ Explore Library",
      "Notification strategy: Week 1: Daily gentle reminders ('Your Journey step is ready' at preferred time). Week 2-4: Reduce to 3-4x/week. Adaptive frequency based on engagement (if using daily, maintain daily; if sporadic, reduce to avoid overwhelm).",
      "Notification quality: Every notification is valuable interruption ('Your evening reflection is ready' NOT 'You have 1 unread notification'). Include preview ('Today: Grounding practice for emotional regulation').",
      "Gamification boundaries: Micro-wins YES (affirmations, progress visibility). Streaks NO (no punishment for missed days). Leaderboards NO (recovery is not competition). Badges/trophies NO (recovery is fluid, not finite).",
      "Opt-in preference wizard: During onboarding, ask: 'What time works best for your Journey step?' 'Do you prefer morning or evening check-ins?' 'Would you like LUMA to suggest practices or wait for you to ask?'",
      "Clinician coordination: Therapist receives 'New patient onboarding started' notification, can view onboarding progress in Momentum ('Jordan completed Meet LUMA, started baseline Journey, hasn't checked Inner Compass yet').",
      "Drop-off recovery: If patient abandons onboarding (doesn't complete welcome wizard within 3 days), LUMA sends gentle re-engagement ('We're here when you're ready. No pressure. Just support.')"
    ],
    technicalNotes: [
      "KV structure: user:{id}:onboarding:{ phase: 'welcome/active/complete', completedSteps: ['meet_luma', 'first_journey'], preferences: {journeyTime: '19:00', lumaMode: 'suggest'}, startedAt: timestamp, completedAt: timestamp }",
      "Welcome wizard: Multi-step modal with progress bar, skippable (can return later)",
      "Notification scheduling: Server-side cron jobs (Supabase Edge Function scheduled tasks) send notifications based on user preferences",
      "Push notifications: Web Push API (browser), eventually native push (mobile). Graceful degradation if push disabled (show in-app inbox).",
      "A/B testing: Test onboarding variations (e.g., 3-step vs 5-step wizard, LUMA intro video vs text, checklist visible vs hidden)",
      "Analytics: Track onboarding completion rate, time to first action (Journey, Inner Compass, NaviCue), drop-off points, feature adoption",
      "Clinician dashboard: Momentum shows 'Onboarding Status' for each new patient (color-coded: green = engaged, orange = started but stalled, red = not started)",
      "Personalization: LUMA adapts onboarding based on patient's baseline data (if stress resilience red → introduce breathwork practices early)",
      "Localization: Design onboarding for future multi-language support (separate translation layer)"
    ],
    deliverables: [
      "Welcome wizard UI (5 steps)",
      "'Meet LUMA' introduction flow",
      "Contextual tutorial tooltips",
      "Micro-win celebration animations",
      "Onboarding progress dashboard",
      "Notification system (scheduling + delivery)",
      "Preference collection wizard",
      "Clinician onboarding visibility (Momentum)",
      "Drop-off recovery flow",
      "Onboarding analytics dashboard",
      "A/B testing framework for onboarding variations"
    ],
    priority: "high",
    phase: "intelligence"
  },
  {
    id: "st24",
    number: "ST24",
    name: "Intelligent Notification & Engagement System",
    tagline: "Valuable interruptions, not digital noise",
    vision: "Notification system that respects patient attention, delivers value every time, and adapts based on engagement patterns. LUMA-powered timing optimization ('Best time to send: 7:15pm based on your check-in patterns'), content-aware previews ('Today's practice: Urge Surfing for cravings'), and escalation logic (daily → weekly if user disengaged, silence entirely if opted out). Goal: Notifications become anticipated moments, not ignored noise.",
    whatItSolves: "Generic notifications train users to ignore them. Intelligent notifications build engagement. Right message, right time, right reason = trusted interruption. Wrong timing/frequency = app abandonment.",
    status: "not-started",
    size: "m",
    dependencies: ["ST21", "ST22", "ST23"],
    acceptanceCriteria: [
      "Timing optimization: LUMA analyzes when patient typically engages (e.g., 'You usually check in around 7:30pm') and schedules notifications 15-30 min before",
      "Content-aware: Every notification includes preview ('Today: Shame body mapping NaviCue - 8 min' NOT 'You have a new activity')",
      "Notification types: 1) Journey step ready, 2) Inner Compass reminder, 3) LUMA suggestion (NaviCue/ResCue), 4) Milestone celebration, 5) Care team message, 6) ResCue/SOS escalation (clinician-facing)",
      "Frequency adaptation: If patient consistently engages → maintain daily. If engagement drops → reduce to 3x/week. If ignored 5+ times → send re-engagement ('We're backing off. Let us know when you're ready.').",
      "Quiet hours: Auto-detect (or ask patient): 'No notifications between 10pm-7am' or custom times",
      "Do Not Disturb mode: One-tap 'Silence all' for 24 hours (accessible from any page). No punishment, no guilt.",
      "Escalation notifications: ResCue → LUMA → SOS flow triggers immediate high-priority notifications to care team ('🚨 SOS: Jordan needs help NOW')",
      "Notification settings: Granular controls (enable/disable per type: Journey yes, LUMA suggestions yes, Milestone no, Care team yes)",
      "Preview intelligence: Notification preview includes 'why' ('Stress resilience has been challenging this week. Here's a 3-min grounding practice.')",
      "Delivery channels: Web push (browser), in-app inbox (fallback), eventually SMS (opt-in) and native mobile push",
      "A/B testing: Test notification timing, copy variations, frequency thresholds to optimize engagement without overwhelming"
    ],
    technicalNotes: [
      "Server-side scheduling: Supabase Edge Function with cron jobs checks 'who needs notification now?' every 15 minutes",
      "Timing algorithm: Analyze user:{id}:activity:{ timestamps: [] } to find modal engagement time (e.g., user most active 7-8pm → schedule notifications 6:45pm)",
      "KV structure: user:{id}:notifications:{ preferences: {types: {journey: true, luma: true}, quietHours: {start: '22:00', end: '07:00'}, frequency: 'daily'}, history: [{type, sentAt, opened, actedOn}], doNotDisturbUntil: timestamp }",
      "Notification API: Use Web Push API (browser), track delivery/open/action rates",
      "In-app inbox: Backup for users who disable push (show unread count in nav bar, list in dropdown)",
      "Escalation priority: ResCue notifications bypass quiet hours, SOS notifications go to care team immediately (SMS if configured)",
      "Engagement tracking: Log notification sent → opened → action taken (Journey step completed, NaviCue started). Calculate 'notification effectiveness score'.",
      "Fatigue detection: If user opens <20% of notifications over 2 weeks → auto-reduce frequency",
      "Re-engagement flow: After 7 days no interaction, send single re-engagement notification ('We miss you. Your Journey is here when you're ready.')—then silence for 14 days.",
      "Analytics: Track per-notification-type: send count, open rate, action rate, time-to-action. Surface in Momentum for clinician visibility."
    ],
    deliverables: [
      "Notification timing optimization algorithm",
      "Content-aware notification templates",
      "Frequency adaptation logic",
      "Quiet hours & DND mode",
      "Granular notification settings UI",
      "In-app notification inbox",
      "Escalation notification system (ResCue/SOS)",
      "Web Push API integration",
      "Notification analytics dashboard",
      "A/B testing framework for notification experiments",
      "Re-engagement flow"
    ],
    priority: "high",
    phase: "intelligence"
  },
  {
    id: "st25",
    number: "ST25",
    name: "Modular Architecture & Micro-Services",
    tagline: "Think in spheres, not silos",
    vision: "Decompose monolithic platform into modular micro-services. Each feature = independent sphere with API-first architecture. Start simple (email tool), scale to bigger (integrations, notifications, AI). Enables: swap components without breaking system, third-party integrations, white-label customization, faster shipping.",
    whatItSolves: "Monolithic architecture creates technical debt, limits flexibility, blocks integrations. Modular = replaceable, extensible, scalable. Think LEGO blocks, not concrete slabs.",
    status: "not-started",
    size: "xl",
    dependencies: ["ST1"],
    acceptanceCriteria: [
      "Email service decoupled: Independent server function, API endpoint, can swap providers (Resend → SendGrid → Mailgun) without touching core",
      "Notification service decoupled: Push, SMS, email notifications via unified API",
      "Payment service decoupled: Billing/subscriptions via abstraction layer (supports Stripe, Chargebee, Paddle)",
      "AI service decoupled: LUMA intelligence, voice analysis, video analysis as independent services",
      "Authentication service decoupled: Supabase auth wrapped in abstraction (enables future auth providers)",
      "Storage service decoupled: File uploads, document storage abstracted",
      "API gateway: Unified endpoint that routes to micro-services, handles auth, rate limiting",
      "Service mesh: Inter-service communication protocol, service discovery, health checks",
      "Configuration: Each service has env config, can be toggled on/off independently",
      "Documentation: API docs for each service (OpenAPI/Swagger)",
      "Testing: Each service has isolated test suite, can ship independently"
    ],
    technicalNotes: [
      "Start with email tool modularization (simplest)",
      "Pattern: /supabase/functions/server/services/{service-name}/ with index.tsx, types.tsx, config.tsx",
      "Each service exposes: init(), execute(), validate(), getStatus()",
      "API gateway at /make-server-49b28b8a/api/* routes to services",
      "Use dependency injection (services don't import each other directly)",
      "Environment-based feature flags (enable/disable services per environment)",
      "Monitoring: Each service reports health, latency, error rate",
      "Migration strategy: Dual-run old+new for 2 weeks, monitor, then deprecate old",
      "White-label ready: Services can be configured per org (custom email sender, custom branding)"
    ],
    deliverables: [
      "Email service (decoupled, API-first)",
      "Notification service (push/SMS/email unified)",
      "Payment service abstraction layer",
      "AI service (LUMA + analysis engines)",
      "Auth service wrapper",
      "Storage service wrapper",
      "API gateway implementation",
      "Service mesh infrastructure",
      "API documentation (Swagger/OpenAPI)",
      "Service testing framework",
      "Migration guide (monolith → modular)"
    ],
    priority: "high",
    phase: "infrastructure",
    comments: [
      "QUESTION: Should we start with email tool modularization (simplest) or go bigger (payment service first)?",
      "DECISION NEEDED: Priority order for service decomposition - Email → Notifications → Payment → AI?",
      "Your input: How aggressive should we be with modularization? Ship incrementally or big-bang migration?"
    ]
  },
  {
    id: "st26",
    number: "ST26",
    name: "Payment Infrastructure & Subscription Management",
    tagline: "Enterprise billing that feels consumer-grade",
    vision: "Deep payment solution evaluation (Chargebee, Stripe Billing, Paddle, Recurly). Choose platform that handles: seat-based licensing, prorated adjustments, dunning, tax calculation, multi-currency, self-service portal, webhook reliability. Not just 'integrate Stripe' — architect subscription lifecycle end-to-end.",
    whatItSolves: "B2B SaaS billing is complex: variable seats, annual contracts, prorated changes, failed payments, tax compliance. Wrong choice = technical debt, manual work, revenue leakage. Right choice = automated growth engine.",
    status: "not-started",
    size: "l",
    dependencies: ["ST20", "ST25"],
    acceptanceCriteria: [
      "Platform evaluation: Compare Chargebee, Stripe Billing, Paddle, Recurly on: seat management, proration, dunning, tax, API quality, webhook reliability, reporting, cost structure",
      "Seat-based licensing: Organizations pay per active patient seat, add/remove seats dynamically",
      "Prorated billing: Mid-cycle seat additions = prorated charges, seat removals = prorated credits",
      "Dunning management: Automated retry logic for failed payments (3 attempts over 2 weeks), email notifications, account suspension",
      "Tax calculation: Automated sales tax/VAT calculation based on organization location (Stripe Tax, TaxJar, or Paddle's built-in)",
      "Multi-currency: Support USD, GBP, EUR for international markets",
      "Self-service portal: Organizations can: view invoices, update payment method, add/remove seats, change plan, download receipts",
      "Webhook reliability: Handle Stripe/Chargebee webhooks (payment success/failure, subscription updated/canceled), idempotency, retry logic",
      "Contract enforcement: 12-month minimum commitment, no refunds, 30-day cancellation notice",
      "Seat enforcement: When seat limit reached, block new patient invites (show 'Upgrade plan' prompt)",
      "Billing dashboard: Admin view showing: MRR, churn, seat utilization, failed payments, dunning status",
      "Revenue recognition: Track deferred revenue, recognized revenue (for accounting)",
      "Audit log: All billing events logged (seat changes, payments, cancellations)"
    ],
    technicalNotes: [
      "Research phase: 2-3 days evaluating platforms (pricing, features, API docs, community reviews)",
      "Likely winner: Chargebee (seat management + tax + dunning built-in) OR Stripe Billing + custom dunning logic",
      "If Chargebee: Use their hosted portal for self-service (faster ship, less maintenance)",
      "If Stripe: Build custom portal UI, use Stripe Billing API + Stripe Tax + custom dunning",
      "Webhook security: Verify signature, use idempotency keys, store webhook payloads for audit",
      "KV structure: org:{id}:billing:{ plan, seats, mrr, nextBillingDate, stripeCustomerId, subscriptionId, dunningStatus }",
      "Server routes: POST /billing/subscribe, GET /billing/portal, POST /billing/webhook, GET /billing/invoice/{id}",
      "Payment method storage: Store last 4 digits + expiry only, link to Stripe/Chargebee customer for actual payment",
      "Failed payment flow: Retry Day 1 → Retry Day 7 → Retry Day 14 → Suspend access + email",
      "Testing: Use Stripe/Chargebee test mode, mock webhook events, test all failure scenarios"
    ],
    deliverables: [
      "Platform evaluation report (recommend Chargebee vs Stripe Billing vs Paddle)",
      "Billing service implementation (ST25 modular architecture)",
      "Seat management system",
      "Prorated billing calculator",
      "Dunning automation",
      "Tax calculation integration",
      "Self-service billing portal UI",
      "Webhook handler (idempotent, reliable)",
      "Admin billing dashboard",
      "Revenue recognition reports",
      "Billing audit log",
      "Testing suite (happy path + failure scenarios)",
      "Billing documentation (for finance team)"
    ],
    priority: "high",
    phase: "saas",
    comments: [
      "CRITICAL DECISION: Chargebee vs Stripe Billing vs Paddle - need 2-3 day research phase to evaluate.",
      "Your preference? I recommend Chargebee for speed-to-market (seat management + tax + dunning built-in) OR Stripe for long-term control.",
      "Budget for research: Should I deep-dive into all 3 platforms or do you have a strong preference already?"
    ]
  },
  {
    id: "st27",
    number: "ST27",
    name: "Authentication & Password Recovery System",
    tagline: "Security that doesn't feel like security",
    vision: "Production-ready auth system: encrypted password reset flow, magic link login (optional), MFA (future), session management, token refresh, account lockout protection. Leverage Supabase Auth but add recovery UI, error handling, edge cases (expired links, rate limiting, suspicious activity).",
    whatItSolves: "Users forget passwords. Auth breaks trust if buggy. Need: secure password reset (encrypted tokens, time-limited), clear error messages, protection against brute force, seamless UX.",
    status: "not-started",
    size: "m",
    dependencies: ["ST2"],
    acceptanceCriteria: [
      "Forgot password flow: User enters email → server sends reset link → user clicks link → resets password → auto-login",
      "Reset link security: Encrypted token (UUID), time-limited (24 hours), single-use, invalidated after reset",
      "Email template: Professional, branded, clear CTA ('Reset your password'), includes expiry time, support contact",
      "Reset page: Validates token, shows error if expired/invalid, password strength indicator, confirms reset success",
      "Rate limiting: Max 3 reset requests per email per hour (prevents abuse)",
      "Account lockout: After 5 failed login attempts, lock account for 15 minutes (prevents brute force)",
      "Session management: JWT tokens with 7-day expiry, refresh tokens with 30-day expiry, auto-refresh before expiry",
      "Magic link login (optional): Passwordless login via email link (for patients who prefer it)",
      "Error handling: Clear messages ('Token expired', 'Invalid link', 'Account locked - try in 15 minutes')",
      "Suspicious activity: Detect login from new device/location → send email alert ('Was this you?')",
      "Admin password reset: Clinicians can trigger password reset for patients (logged, patient receives email)",
      "Two-factor authentication (future-ready): Design auth flow to support MFA later (TOTP, SMS)"
    ],
    technicalNotes: [
      "Supabase Auth handles: password hashing (bcrypt), token generation, session management",
      "Custom implementation needed: Reset email UI, rate limiting, account lockout, suspicious activity detection",
      "Server routes: POST /auth/forgot-password (send email), POST /auth/reset-password (verify token, update password)",
      "KV structure: user:{email}:resetToken:{ token, expiresAt, used: false }, user:{email}:loginAttempts:{ count, lockedUntil }",
      "Email service: Use modular email service (ST25), template: /templates/email/password-reset.html",
      "Rate limiting: Store request count in KV, expire after 1 hour",
      "Token generation: crypto.randomUUID(), store hash (not plaintext), compare on reset",
      "Account lockout: Increment login attempts on failure, reset on success, store lockedUntil timestamp",
      "Suspicious activity: Track login IPs, device fingerprints (user agent), compare to historical, flag if new",
      "Frontend: /reset-password?token={token} page, validates token, shows password form, handles errors"
    ],
    deliverables: [
      "Forgot password flow (email request)",
      "Password reset page UI",
      "Email template (branded, professional)",
      "Token generation & validation logic",
      "Rate limiting (3 requests/hour per email)",
      "Account lockout (5 failed attempts → 15 min lock)",
      "Session management (JWT + refresh tokens)",
      "Magic link login (optional)",
      "Error handling & user messaging",
      "Suspicious activity detection",
      "Admin password reset (clinician tool)",
      "MFA-ready architecture (future)",
      "Auth testing suite (happy path + edge cases)"
    ],
    priority: "critical",
    phase: "foundation",
    comments: [
      "QUESTION: Magic link login (passwordless) - ship this Day 1 or Phase 2?",
      "Your take: Should we prioritize MFA-readiness or ship basic auth first and add MFA later?"
    ]
  },
  {
    id: "st28",
    number: "ST28",
    name: "Payment Enforcement & Account Suspension",
    tagline: "Compassionate but firm collection",
    vision: "Automated system to handle non-payment: dunning sequence (ST26), account suspension (block login after 14 days overdue), grace period (7 days post-due-date), reactivation (auto-restore on payment), data retention (90 days post-suspension, then soft delete). Balance firmness with empathy—recovery orgs face cash flow issues, we're not heartless.",
    whatItSolves: "Revenue leakage from non-payment. Need automated enforcement that's fair (grace period, warnings) but firm (suspend access, protect revenue). Can't manually chase payments—doesn't scale.",
    status: "not-started",
    size: "m",
    dependencies: ["ST26", "ST27"],
    acceptanceCriteria: [
      "Payment due date tracking: Calculate due date based on billing cycle, send reminder 7 days before, day of, 3 days after",
      "Grace period: 7 days post-due-date before account suspension (allow for payment processing delays)",
      "Account suspension: After 14 days overdue (7-day grace + 7-day warning), suspend access: block login, show 'Payment overdue' message, contact link",
      "Dunning sequence: Day -7 (reminder), Day 0 (due today), Day 3 (overdue), Day 7 (final warning), Day 14 (suspended)",
      "Reactivation: When payment received, auto-restore access within 5 minutes, send 'Welcome back' email",
      "Data retention: Suspended accounts retain data for 90 days (patient records, settings, content), then soft delete (archived, recoverable by admin)",
      "Admin override: Support team can manually extend grace period (e.g., org facing temporary cash flow issue)",
      "Notification customization: Emails use empathetic tone ('We understand things get busy'), include payment link, support contact",
      "Seat blocking: If org at seat limit and payment overdue, block new patient invites (existing patients retain access during grace period)",
      "Audit log: All suspension/reactivation events logged (date, reason, admin who triggered)",
      "Dashboard indicator: Admin billing dashboard shows: accounts at risk, suspended accounts, churn risk score",
      "Contract exceptions: Organizations on annual invoicing (not auto-charged) exempt from auto-suspension (manual follow-up)"
    ],
    technicalNotes: [
      "Cron job: Daily check for overdue accounts, trigger dunning emails, suspend if 14 days overdue",
      "Server routes: POST /billing/suspend, POST /billing/reactivate, GET /billing/status",
      "KV structure: org:{id}:billing:{ status: 'active/grace/overdue/suspended', dueDate, suspendedAt, dunningSequence: { day7Sent, day0Sent, day3Sent, day7Sent, day14Sent } }",
      "Suspension logic: Update org status to 'suspended', block login (auth middleware checks status), send email notification",
      "Reactivation logic: Webhook from Stripe/Chargebee (payment success) → update org status to 'active' → send welcome-back email",
      "Grace period extension: Admin UI allows support team to add X days to grace period (logged in audit)",
      "Data retention: Separate cron job runs daily, checks for accounts suspended >90 days, soft deletes (sets status: 'archived')",
      "Soft delete: Data remains in KV with status 'archived', not displayed in UI, admin can recover via support tool",
      "Email templates: 5 dunning emails (reminder, due, overdue, final warning, suspended) + reactivation email",
      "Testing: Mock overdue scenario, test suspension, test reactivation, test grace period extension"
    ],
    deliverables: [
      "Payment tracking & due date calculation",
      "Grace period logic (7 days)",
      "Account suspension system",
      "Dunning email sequence (5 emails)",
      "Auto-reactivation on payment",
      "Data retention & soft delete (90 days)",
      "Admin grace period extension UI",
      "Empathetic email templates",
      "Audit log (suspension/reactivation events)",
      "Admin dashboard (at-risk accounts)",
      "Suspension testing suite",
      "Contract exception handling (annual invoicing)"
    ],
    priority: "high",
    phase: "saas",
    comments: [
      "TONE CHECK: Does 14-day grace period (7+7) feel right? Or too lenient/harsh?",
      "Philosophy question: How empathetic should the dunning emails be? 'Compassionate but firm' - what does that sound like to you?",
      "Edge case: What if a rehab facility is genuinely struggling but has been a good client? Manual override process?"
    ]
  }
];

// MESSAGING LAB - Taglines and power copy we're testing
const messagingLab = {
  platformTaglines: [
    "Apple for addiction",
    "Neuroadaptive continuous-care OS",
    "Recovery infrastructure, not recovery content",
    "Where therapeutic standards become portable",
    "The OS your clinical model runs on",
    "Evidence-based recovery, technology-enabled"
  ],
  
  valueProp: [
    "Extend your inpatient therapeutic standards into patient-driven 365-day care",
    "Turn recovery insights into reflexes",
    "From clinical hours to continuous care",
    "Make your therapeutic model portable",
    "Recovery that doesn't end when patients walk out the door"
  ],
  
  audienceSpecific: {
    forCEOs: [
      "Reduce readmissions. Increase outcomes. Differentiate your program.",
      "The competitive edge every treatment center needs",
      "Continuous care without continuous staffing costs",
      "Your clinical excellence, extended beyond your walls"
    ],
    forTherapists: [
      "Your clinical model, in patients' pockets",
      "See patient state before session starts",
      "Therapeutic tools that work between sessions",
      "Clinical depth patients can actually practice"
    ],
    forPatients: [
      "Recovery tools when you need them, not just when you remember",
      "Your healing, on your timeline",
      "Support that meets you where you are",
      "Not another app. Your recovery companion."
    ]
  },
  
  featureTaglines: {
    luma: [
      "Your emotional co-pilot",
      "She sees patterns. You feel supported.",
      "Timely wisdom, not generic advice",
      "AI that feels like intuition"
    ],
    navicues: [
      "Brain rewiring tools",
      "Not tips. Transformations.",
      "Clinical depth you can practice",
      "8-12 minutes that change neural pathways"
    ],
    momentum: [
      "Know your patients in 60 seconds",
      "From 30-minute intake to 60-second insight",
      "Clinical intelligence at a glance",
      "See who thrives. See who needs you."
    ],
    innerCompass: [
      "Map your state. Honor your pace.",
      "Awareness without judgment",
      "Track your nervous system in real-time",
      "Know yourself, moment by moment"
    ]
  },
  
  socialProof: [
    "Therapists are calling it 'Apple for addiction'",
    "The platform clinicians wished existed",
    "Built by Recoverlutionists, for recovery",
    "Five years in development. Opening to 10 facilities this quarter."
  ]
};

// TONE & VOICE
const toneAndVoice = {
  identity: "Recoverlutionists",
  essence: "Clinical sophistication meets human warmth. We speak truth without shame. We're confident without arrogance.",
  
  characteristics: [
    "Direct but compassionate",
    "Evidence-based but accessible", 
    "Sophisticated but not academic",
    "Confident but not pushy",
    "Human-first, tech-second"
  ],
  
  avoidWords: ["journey (overused)", "warrior", "battle", "fight", "clean", "sober (stigmatizing)"],
  embraceWords: ["recovery", "practice", "integrated", "aligned", "regulated", "resilient", "state", "nervous system"],
  
  examples: {
    bad: "Embark on your warrior journey to fight addiction and achieve sobriety!",
    good: "Recovery tools that meet you where you are—building resilience, one practice at a time."
  },
  
  writingPrinciples: [
    "Start with empathy, end with action",
    "Use neuroscience terms correctly or not at all",
    "Never shame, never oversimplify",
    "Speak to B2B buyers (CEOs), but write for B2C users (patients)",
    "Clinical credibility without clinical coldness"
  ]
};

// THEORY & FRAMEWORK
const theoryAndFramework = {
  hcp: {
    name: "Human Cognition Platform (HCP)",
    description: "Three-tier architecture mapping content to brain micro-blocks tracked as red/orange/green states",
    layers: [
      {
        name: "Layer 1: Micro-Blocks",
        description: "Smallest units of therapeutic change",
        example: "150+ micro-blocks: Impulse Inhibition, Self-Compassion, Distress Tolerance, etc."
      },
      {
        name: "Layer 2: Content Library",
        description: "200+ evidence-based resources mapped to micro-blocks",
        example: "Each article, NaviCue, exercise targets specific micro-blocks"
      },
      {
        name: "Layer 3: User State",
        description: "Real-time tracking of micro-block development (red/orange/green)",
        example: "Patient dashboard shows pillar strength across 6 domains"
      }
    ],
    eraFlow: {
      name: "ERA Flow",
      fullName: "Exposure → Repetition → Automaticity",
      description: "The mechanism that turns recovery insights into reflexes",
      how: "Repeated exposure to micro-block content creates neural pathway strengthening until new behaviors become automatic"
    }
  },
  
  sixPillars: [
    {
      name: "Emotional Regulation",
      color: "#FF8E72",
      icon: "❤️",
      description: "Building capacity to feel without reacting, to sit with discomfort, to meet emotions with curiosity rather than avoidance.",
      microBlocks: ["Distress Tolerance", "Emotional Granularity", "Window of Tolerance", "Self-Soothing", "Affect Labeling"],
      clinicalBasis: ["DBT", "Polyvagal Theory", "Somatic Experiencing"],
      whyItMatters: "Addiction is often emotion avoidance. When patients can regulate, substances lose their pull."
    },
    {
      name: "Cognitive Reframing",
      color: "#FFB84D",
      icon: "🧠",
      description: "Noticing automatic thoughts, challenging cognitive distortions, building new mental pathways that don't lead to shame or relapse.",
      microBlocks: ["Thought Defusion", "Cognitive Flexibility", "Meta-Cognition", "Perspective Taking", "Reappraisal"],
      clinicalBasis: ["CBT", "ACT", "Metacognitive Therapy"],
      whyItMatters: "Recovery requires rewiring the stories we tell ourselves about ourselves."
    },
    {
      name: "Stress Resilience",
      color: "#A8E6CF",
      icon: "💪",
      description: "Building physiological and psychological capacity to handle life's inevitable stressors without returning to substances.",
      microBlocks: ["HRV Coherence", "Vagal Tone", "Stress Appraisal", "Recovery Practices", "Resilience Building"],
      clinicalBasis: ["Stress Inoculation", "Resilience Training", "Nervous System Regulation"],
      whyItMatters: "Stress is the #1 relapse trigger. Resilience is the #1 protective factor."
    },
    {
      name: "Decision Mastery",
      color: "#87CEEB",
      icon: "🎯",
      description: "Strengthening prefrontal cortex control over amygdala-driven impulses. Learning to pause, to surf urges, to choose response over reaction.",
      microBlocks: ["Impulse Inhibition", "Delayed Gratification", "Urge Surfing", "Values-Based Decision Making", "Prefrontal Engagement"],
      clinicalBasis: ["MBRP", "Executive Function Training", "Neuroscience of Craving"],
      whyItMatters: "Recovery happens in the gap between urge and action."
    },
    {
      name: "Social Connectivity",
      color: "#DDA0DD",
      icon: "🤝",
      description: "Rebuilding trust, practicing vulnerability, learning to receive support, contributing to community. Humans recover in connection.",
      microBlocks: ["Attachment Security", "Trust Rebuilding", "Vulnerability Practice", "Reciprocal Support", "Connection Skills"],
      clinicalBasis: ["Attachment Theory", "Shame Resilience Theory", "Relational Neurobiology"],
      whyItMatters: "Isolation feeds addiction. Connection feeds recovery."
    },
    {
      name: "Identity Integration",
      color: "#FFD93D",
      icon: "✨",
      description: "Moving from 'addict in recovery' to integrated human. Values clarification, purpose activation, becoming the person you want to be.",
      microBlocks: ["Values Clarity", "Authentic Self-Expression", "Purpose Activation", "Life Direction", "Meaning Making"],
      clinicalBasis: ["ACT", "IFS", "Narrative Therapy", "Logotherapy"],
      whyItMatters: "Long-term recovery requires knowing what you're recovering FOR, not just what you're recovering from."
    }
  ],
  
  philosophy: {
    fluidAndForever: {
      name: "Fluid and Forever",
      description: "Nothing is ever 'complete'—only favorited for ongoing practice. Recovery is not linear. Progress is not perfection.",
      principles: [
        "No checkboxes or completion badges",
        "Favorites, not completions",
        "Practice, not mastery",
        "States, not stages",
        "Journey, not destination"
      ]
    },
    appleForAddiction: {
      name: "Apple for Addiction",
      description: "Premium, thoughtful, human-centered technology that makes therapeutic sophistication feel effortless.",
      principles: [
        "Clinical rigor WITHOUT clinical coldness",
        "Technology that disappears into life",
        "Neuroscience-grounded but human-spoken",
        "B2B sold, B2C experienced",
        "Designed for daily use, not crisis intervention"
      ]
    }
  }
};

// ROADMAP - Based on ChatGPT Cold Critique (Jan 2025)
type RoadmapStatus = "have-it" | "messaging-gap" | "build-it";

interface RoadmapItem {
  id: string;
  title: string;
  status: RoadmapStatus;
  vision: string;
  whatItSolves: string;
  currentState: string;
  nextStep: string;
  priority: "high" | "medium" | "low";
  source: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    id: "proof-gap",
    title: "Proof & Outcomes",
    status: "messaging-gap",
    vision: "Show, don't tell. Cohort data, outcome graphs, case studies front-and-center.",
    whatItSolves: "Commissioners can't say yes without seeing 12-week pilot results: % craving reduction, retention delta, readmission impact.",
    currentState: "We HAVE the clinical model, the tracking, the Sync scores. We DON'T have public-facing outcome graphs or case study pages.",
    nextStep: "Create Outcomes section on /platform with: (1) pilot schema, (2) de-identified dashboard mockup, (3) narrative case studies",
    priority: "high",
    source: "ChatGPT: 'Big claims, light evidence. No outcome graphs, cohort data, or case studies front-and-centre.'"
  },
  {
    id: "trust-stack",
    title: "Trust Stack & Certs",
    status: "messaging-gap",
    vision: "Clinical advisory board, interoperability badges, security whitepaper, ISO27001/DTAC certs visible.",
    whatItSolves: "Enterprise buyers (NHS, large providers) need proof of clinical governance, data security, and regulatory compliance.",
    currentState: "We likely HAVE security practices and clinical advisors. We DON'T showcase them prominently.",
    nextStep: "Create /trust page with: Clinical Advisory Board bios, security whitepaper (1-pager), interoperability logos, cert badges",
    priority: "high",
    source: "ChatGPT: 'Add visible clinical advisory board, interoperability badges (HL7/FHIR), certs (ISO27001, DCB0129/0160 or NHS DTAC).'"
  },
  {
    id: "hero-diagram",
    title: "Product Architecture Diagram",
    status: "build-it",
    vision: "ONE hero diagram: patient loop ↔ clinician loop ↔ data loop. Shows how LUMA, NaviCues, Momentum, Navigate all fit together.",
    whatItSolves: "Buyers hear feature names but don't see the system. A single visual makes it click.",
    currentState: "We have HCP graph. We DON'T have a user-facing product architecture diagram.",
    nextStep: "Design Apple-style architecture diagram showing: Patient Experience → Recovery Engine (LUMA/ERA) → Clinician Console → Data Loop",
    priority: "high",
    source: "ChatGPT: 'Give me one hero diagram showing how it all fits: patient loop ↔ clinician loop ↔ data loop.'"
  },
  {
    id: "split-funnels",
    title: "Split Buyer Funnels",
    status: "messaging-gap",
    vision: "Two distinct nav paths: 'For Providers' (ROI, workflows, Momentum) vs 'For People' (hope, habit, LUMA).",
    whatItSolves: "Copy currently toggles between patient inspiration and provider ROI, confusing both audiences.",
    currentState: "We HAVE content for both. We DON'T separate the journeys clearly.",
    nextStep: "Add dual CTAs to homepage hero: 'For Treatment Centers' → /providers page | 'For Individuals' → /people page",
    priority: "medium",
    source: "ChatGPT: 'Who's the buyer? Copy toggles between patient inspiration and provider ROI. Consider split funnels.'"
  },
  {
    id: "integration-receipts",
    title: "Integration Receipts",
    status: "messaging-gap",
    vision: "Integrations page with EHR logos, HL7/FHIR badges, supported endpoints, technical docs.",
    whatItSolves: "IT/procurement teams need proof of interoperability before they'll approve.",
    currentState: "We SAY 'EHR/scheduler integration.' We DON'T show logos, certs, or technical page.",
    nextStep: "Create /integrations page showing: EHR partners, FHIR resources supported, SSO (OIDC), webhook examples",
    priority: "medium",
    source: "ChatGPT: 'You say EHR/scheduler integration—show logos, certs, or a technical integrations page with supported endpoints.'"
  },
  {
    id: "category-name",
    title: "Category Clarity",
    status: "messaging-gap",
    vision: "'Recovery Reinforcement Platform (RRP)' as repeatable category name for evaluators.",
    whatItSolves: "Procurement needs a category box to put us in. 'Neuro-adaptive ecosystem' is intriguing but not procurement-friendly.",
    currentState: "We HAVE unique positioning. We DON'T have a repeatable category label.",
    nextStep: "Test 'Recovery Reinforcement Platform' in hero copy, /platform page, and sales deck. Measure if it lands.",
    priority: "low",
    source: "ChatGPT: 'Category naming for evaluators (procurement/commissioners) should be explicit and repeatable.'"
  },
  {
    id: "pricing-signal",
    title: "Pricing & Deployment Timeline",
    status: "messaging-gap",
    vision: "Pricing tiers (even if 'Let's talk'), time-to-value estimate, pilot program details.",
    whatItSolves: "Buyers can't budget without a signal. Even 'Platform fee + PMPM' helps.",
    currentState: "We HAVE a business model. We DON'T surface pricing structure or deployment timeline.",
    nextStep: "Add Pricing section to /pricing page: 'Pilot program (12 weeks) → Full deployment (X weeks)' + ballpark PMPM range",
    priority: "medium",
    source: "ChatGPT: 'No obvious tiers, time-to-value, or timeline (go-live in X weeks, pilot in Y days).'"
  },
  {
    id: "demo-video",
    title: "120-Second Demo Video",
    status: "build-it",
    vision: "Show three lived moments where LUMA prevents a spiral. Emotion + product in 120 seconds.",
    whatItSolves: "Text can't convey the magic of timely intervention. Video shows the 'second between sessions.'",
    currentState: "We DON'T have a product demo video.",
    nextStep: "Script + shoot 120-second demo: (1) Morning urge → LUMA suggests Urge Surfing, (2) Evening anxiety → Body scan prompt, (3) Therapist sees flag in Momentum",
    priority: "medium",
    source: "ChatGPT: 'Demo video: 120 seconds; show three lived moments where LUMA prevents a spiral.'"
  }
];

export function BrandAnchorPage() {
  // Updated: Oct 17, 2025 - BRAND ANCHOR → PRODUCT DNA HUB (Task 3)
  console.log('🧬 Product DNA Hub v3.0 loaded - Oct 17, 2025');
  console.log('📋 Living specification: How we build, what we build, why it matters');
  
  const [activeSection, setActiveSection] = useState<Section>("how-we-build");

  const sections = [
    { id: "how-we-build" as Section, name: "How We Build", icon: Compass, description: "Philosophy & principles" },
    { id: "system-map" as Section, name: "System Map", icon: Layers, description: "How blocks connect" },
    { id: "pillars" as Section, name: "6 Pillars Framework", icon: Brain, description: "Neuroscience of change" },
    { id: "micro-blocks" as Section, name: "Micro-Block Library", icon: Target, description: "Pillar deep-dives" },
    { id: "core-features" as Section, name: "Core Features", icon: Zap, description: "The 10 functional blocks" },
    { id: "roadmap" as Section, name: "Roadmap", icon: TrendingUp, description: "Vision/value board" },
    { id: "stories" as Section, name: "Stories", icon: Book, description: "Epic product backlog" },
    { id: "theory" as Section, name: "Theory & Framework", icon: Heart, description: "HCP, Philosophy, Values" },
    { id: "features" as Section, name: "Feature Definitions", icon: Code, description: "What things are/aren't" },
    { id: "messaging" as Section, name: "Messaging Lab", icon: MessageSquare, description: "Taglines & power copy" },
    { id: "tone" as Section, name: "Tone & Voice", icon: Palette, description: "How we speak" },
    { id: "ideas" as Section, name: "Ideas", icon: Lightbulb, description: "Breakthrough moments" },
    { id: "analytics" as Section, name: "Analytics", icon: TrendingUp, description: "Platform insights" },
    { id: "tech-stack" as Section, name: "Tech Stack", icon: Terminal, description: "Technology & architecture" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFAFA] to-[#F9F7FF]">
      {/* Updated: Oct 17, 2025 - PRODUCT DNA HUB (Task 3: Brand Anchor → Living Specification) */}
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-5xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                Product DNA Hub
              </h1>
              <p className="text-white/80 text-sm font-mono">
                /docs/product-dna · Internal Spec · v3.0 · Last Updated: Oct 17, 2025
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-white text-3xl mb-3">🧬</div>
              <h3 className="text-white font-bold mb-2">Living Specification</h3>
              <p className="text-white/80 text-sm">
                Not marketing copy—this is product truth. How we build, what we ship, why it matters.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-white text-3xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Decision Authority</h3>
              <p className="text-white/80 text-sm">
                When we don't know if we should build it—we check here. If it's not in the DNA, it doesn't ship.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-white text-3xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Single Source of Truth</h3>
              <p className="text-white/80 text-sm">
                Architecture, stories, messaging, philosophy—everything sings from the same hymn sheet.
              </p>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-white/90 text-lg leading-relaxed mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              "This isn't a brand anchor page—this is the living specification that defines how we build."
            </p>
            <p className="text-white/70 text-sm">
              <strong>Philosophy:</strong> You give the truth, I give the rigour. Raw insights validated with neuroscience, reduced to essentials, shipped Apple-clean. Every feature cross-referenced. Every dependency mapped. Every decision documented.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-72 flex-shrink-0">
            <div className="sticky top-8 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      w-full p-4 rounded-2xl text-left transition-all group
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-lg' 
                        : 'bg-white border-2 border-gray-200 hover:border-[#3E2BB8]/30'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#3E2BB8]'}`} />
                      <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {section.name}
                      </span>
                    </div>
                    <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                      {section.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeSection === "how-we-build" && <HowWeBuildSection />}
            {activeSection === "core-features" && <CoreFeaturesSection />}
            {activeSection === "system-map" && <SystemMapSection />}
            {activeSection === "pillars" && <SixPillarsSection />}
            {activeSection === "micro-blocks" && <MicroBlocksSection onNavigateToPillar={(pillarPageType) => {
              navigateToPage(pillarPageType as PageType);
            }} />}
            {activeSection === "stories" && <StoriesSection />}
            {activeSection === "messaging" && <MessagingLabSection />}
            {activeSection === "tone" && <ToneVoiceSection />}
            {activeSection === "theory" && <TheoryFrameworkSection />}
            {activeSection === "features" && <FeatureDefinitionsSection />}
            {activeSection === "roadmap" && <RoadmapSection />}
            {activeSection === "ideas" && <IdeasSection />}
            {activeSection === "analytics" && <AnalyticsSection />}
            {activeSection === "tech-stack" && <TechStackSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

// SECTION COMPONENTS

function HowWeBuildSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          How We Build
        </h2>
        <p className="text-gray-600 text-lg mb-3">
          Not marketing copy—this is product truth. Our building philosophy, decision framework, and architectural principles.
        </p>
        <p className="text-[#3E2BB8] font-semibold italic">
          "You give the truth, I give the rigour" — Raw insights validated with neuroscience, reduced to essentials, shipped Apple-clean.
        </p>
      </div>

      {/* Our Anchor: The Working Mantra */}
      <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] rounded-3xl p-8 border-2 border-[#3E2BB8]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Our Anchor
          </h3>
        </div>
        <p className="text-white/90 text-lg mb-6 leading-relaxed">
          Apple for addiction: world-class science, human-first design, authority with heart.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white font-semibold mb-2">World-Class Science</p>
            <p className="text-white/80 text-sm">Every feature grounded in neuroscience, validated by clinical research, traceable to evidence</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white font-semibold mb-2">Human-First Design</p>
            <p className="text-white/80 text-sm">Beautiful, intuitive, Apple-grade UX that respects attention and honors vulnerability</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white font-semibold mb-2">Authority with Heart</p>
            <p className="text-white/80 text-sm">Clinical rigor delivered with warmth, precision with compassion, standards with humanity</p>
          </div>
        </div>
      </div>

      {/* Decision Framework */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Decision Framework
        </h3>
        <div className="space-y-6">
          {[
            {
              icon: CheckCircle2,
              color: "from-green-500 to-emerald-500",
              title: "If it's not in the DNA, it doesn't ship",
              description: "Every feature, every story, every decision must map back to this document. If it doesn't exist here, we don't build it."
            },
            {
              icon: Brain,
              color: "from-purple-500 to-indigo-500",
              title: "Neuroscience validates everything",
              description: "Raw insights get validated with neuroscience research, reduced to essentials, then shipped in Apple-clean UI. No hand-waving."
            },
            {
              icon: Target,
              color: "from-blue-500 to-cyan-500",
              title: "Cross-reference or it's incomplete",
              description: "Every feature documents its interconnections. Data flows must be mapped. Dependencies must be explicit."
            },
            {
              icon: Zap,
              color: "from-orange-500 to-red-500",
              title: "Ship small, iterate fast, measure ruthlessly",
              description: "Start with MVF (Minimum Viable Feature), get user feedback, iterate. PostHog tracks everything."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Principles */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Architecture Principles
        </h3>
        
        {/* Deep-Dive Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <a 
            href="/docs/hcp"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('docs-hcp');
            }}
            className="group p-6 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] rounded-xl border-2 border-transparent hover:border-[#7C67FF] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <Layers className="w-6 h-6 text-white" />
              <h4 className="text-white font-semibold">HCP (Human Cognition Platform)</h4>
            </div>
            <p className="text-white/80 text-sm mb-3">
              The three-layer architecture that mirrors how the brain learns: Perception → Processing → Integration
            </p>
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span>Read Architecture Deep-Dive</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a 
            href="/docs/era-flow"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('docs-era-flow');
            }}
            className="group p-6 bg-gradient-to-br from-[#5739FB] to-[#7C67FF] rounded-xl border-2 border-transparent hover:border-[#9D8FFF] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-white" />
              <h4 className="text-white font-semibold">ERA Flow</h4>
            </div>
            <p className="text-white/80 text-sm mb-3">
              Encounter → Reflection → Application: The neuroscience-backed pathway that turns insights into reflexes
            </p>
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span>Read Learning Mechanics</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a 
            href="/docs/infinite-canvas"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('docs-infinite-canvas');
            }}
            className="group p-6 bg-gradient-to-br from-[#7C67FF] to-[#9D8FFF] rounded-xl border-2 border-transparent hover:border-[#C4B5FD] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-white" />
              <h4 className="text-white font-semibold">Infinite Canvas Principle</h4>
            </div>
            <p className="text-white/80 text-sm mb-3">
              Nothing is finite. Nothing is boxed. Recovery is an infinite canvas for exploration and becoming
            </p>
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span>Read Design Philosophy</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Instagram Speed, Infinite Depth",
              description: "NaviCues are rapid provocations. Building Blocks are infinite exploration. Users choose their depth."
            },
            {
              title: "Mobile-First, Always",
              description: "Patients live on phones. Every feature optimized for touch. Responsive by default, not afterthought."
            },
            {
              title: "Privacy by Design",
              description: "HIPAA-compliant, encrypted at rest/transit, on-device processing where possible. No surveillance."
            },
            {
              title: "Interoperability Native",
              description: "FHIR-first data model. EHR integration is table stakes. Care doesn't stop at clinic walls."
            },
            {
              title: "Type Safety Everywhere",
              description: "TypeScript strict mode. Catch errors at compile time, not production. Zero runtime surprises."
            }
          ].map((principle, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl border border-[#3E2BB8]/20">
              <h4 className="text-gray-900 font-semibold mb-2">{principle.title}</h4>
              <p className="text-sm text-gray-600">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What We DON'T Build */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200/50">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              What We DON'T Build
            </h3>
            <p className="text-gray-600">
              Equally important: knowing what we reject. These are never features, no matter how much users ask.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            "❌ Gamification (points, streaks, leaderboards) — Recovery isn't a game",
            "❌ Social feeds or public sharing — Privacy > virality",
            "❌ Compliance surveillance — We track state, not behavior policing",
            "❌ 'Quick fix' shortcuts — Neural pathway change takes time and practice",
            "❌ Chatbots pretending to be therapists — LUMA is a co-pilot, not a replacement",
            "❌ Generic wellness content — Everything is clinical-grade, evidence-based, or it's not here",
            "❌ Feature bloat 'because competitors have it' — We build what patients need, not what sells"
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-white rounded-xl border border-red-200/50">
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Cadence */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200/50">
        <h3 className="text-gray-900 text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Shipping Cadence
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">Weekly Iterations</h4>
            <p className="text-sm text-gray-600">Small, tested changes every week. No big-bang releases. Continuous improvement.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">User Feedback Loops</h4>
            <p className="text-sm text-gray-600">PostHog events, user interviews, clinician feedback. Data informs everything.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">Documentation First</h4>
            <p className="text-sm text-gray-600">Spec written before code ships. This hub updated before feature launches.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoreFeaturesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Core Features
        </h2>
        <p className="text-gray-600 text-lg mb-3">
          The 10 functional blocks that define Recoverlution. Apple-grade precision. Every feature cross-referenced. Language locked in.
        </p>
        <p className="text-[#3E2BB8] font-semibold italic">
          This is our hymn sheet—everything sings from this. 🍎💜
        </p>
      </div>

      <div className="space-y-8">
        {coreFeatures.map((feature) => (
          <div key={feature.id} className="bg-white rounded-3xl p-8 border-2 border-gray-200">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">{feature.number}</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {feature.functionalBlock}
                </div>
                <h3 className="text-gray-900 text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {feature.headline}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {feature.taglines.map((tagline, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-[#F5F3FF] text-[#3E2BB8] rounded-lg border border-[#3E2BB8]/20">
                      {tagline}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What It Is & Why It Matters */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">What It Is</h4>
                <p className="text-sm text-gray-800">{feature.whatItIs}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Why It Matters</h4>
                <p className="text-sm text-gray-800">{feature.whyItMatters}</p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">How It Works</h4>
              <p className="text-sm text-gray-700 mb-3">{feature.howItWorks.overview}</p>
              <div className="space-y-2 mb-3">
                {feature.howItWorks.mechanics.map((mechanic, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <ChevronRight className="w-4 h-4 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
                    <span>{mechanic}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-200">
                <h5 className="text-xs font-semibold text-gray-600 mb-2">Technical Details:</h5>
                <div className="space-y-1">
                  {feature.howItWorks.technicalDetails.map((detail, idx) => (
                    <p key={idx} className="text-xs text-gray-600 pl-3 border-l-2 border-gray-300">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Interconnections */}
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Interconnections</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-xs font-semibold text-gray-700 mb-1">Feeds Into:</h5>
                  <div className="flex flex-wrap gap-1">
                    {feature.interconnections.feedsInto.map((target, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-white rounded border border-emerald-300 text-emerald-700">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-700 mb-1">Receives From:</h5>
                  <div className="flex flex-wrap gap-1">
                    {feature.interconnections.receivesFrom.map((source, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-white rounded border border-teal-300 text-teal-700">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <h5 className="text-xs font-semibold text-gray-700 mb-1">Synergy:</h5>
                <p className="text-xs text-gray-700 italic">{feature.interconnections.synergy}</p>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {feature.keyConcepts.map((concept, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 rounded-lg text-xs font-semibold border border-amber-300/50">
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience (Patient & Clinician) */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl border border-indigo-200/50">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Patient Experience</h4>
                <p className="text-sm text-gray-800 italic">{feature.experience.patient}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl border border-violet-200/50">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Clinician Experience</h4>
                <p className="text-sm text-gray-800 italic">{feature.experience.clinician}</p>
              </div>
            </div>

            {/* Apple-Grade Details */}
            <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200/50">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">🍎 Apple-Grade Details</h4>
              <div className="space-y-2">
                {feature.appleGradeDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-rose-500 flex-shrink-0">✓</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof & Demo */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-xl border border-green-200/50">
                <h4 className="text-xs font-semibold text-green-800 mb-1">📊 Proof to Show</h4>
                <p className="text-xs text-green-900">{feature.proofToShow}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/50">
                <h4 className="text-xs font-semibold text-blue-800 mb-1">🎬 Demo Moment</h4>
                <p className="text-xs text-blue-900 italic">{feature.demoMoment}</p>
              </div>
            </div>

            {/* Screenshot Reference */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <strong>Screenshot:</strong> {feature.screenshot}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemMapSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          System Map
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          How the 9 carousel truths map to functional blocks. The synergy, symbiosis, information exchange, reinforcement loops, and backup systems.
        </p>
        <p className="text-[#3E2BB8] font-semibold italic">
          "Map the map, then the map will show us the way." — Capturing continuity, reinforcement, and the concepts we've been missing.
        </p>
      </div>

      {/* The 10 Functional Blocks */}
      <div>
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          The 10 Functional Blocks
        </h3>
        <p className="text-gray-600 mb-6">Each carousel truth maps to a block. Each block has a role, connections, and key concepts it provides.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {systemMap.blocks.map((block) => (
            <div 
              key={block.id} 
              className="bg-white rounded-3xl p-6 border-2 border-gray-200 hover:border-[#3E2BB8]/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                {block.carouselNumber && (
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: block.color }}
                  >
                    {block.carouselNumber}
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-gray-900 font-bold mb-1">{block.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{block.carouselHeadline}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: block.color }} />
                    <span className="text-xs text-gray-500">{block.tagline}</span>
                  </div>
                </div>
              </div>

              {/* What It Is */}
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700 italic">{block.whatItIs}</p>
              </div>

              {/* Role */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#F5F3FF] to-white rounded-lg border border-[#3E2BB8]/20 text-xs font-semibold text-[#3E2BB8]">
                  Role: {block.role}
                </span>
              </div>

              {/* Key Concepts */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-gray-900 mb-2">Key Concepts Provided:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {block.keyConceptsProvided.map((concept, idx) => (
                    <span key={idx} className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 font-semibold">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connects To */}
              <div className="pt-3 border-t border-gray-200">
                <h5 className="text-xs font-semibold text-gray-900 mb-2">Connects To:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {block.connects.map((connId, idx) => {
                    const connBlock = systemMap.blocks.find(b => b.id === connId);
                    return (
                      <span 
                        key={idx} 
                        className="px-2 py-1 rounded-lg text-xs font-medium text-white"
                        style={{ backgroundColor: connBlock?.color || '#ccc' }}
                      >
                        {connBlock?.name || connId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 3 Loops */}
      <div>
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          The 3 Loops (Two loops, one engine)
        </h3>
        <p className="text-gray-600 mb-6">Patient loop ↔ Clinician loop ↔ Data loop (ERA). This is how the system creates continuous reinforcement.</p>

        <div className="space-y-6">
          {Object.entries(systemMap.loops).map(([key, loop]) => (
            <div key={key} className="bg-gradient-to-br from-white to-[#F5F3FF] rounded-3xl p-8 border-2 border-[#3E2BB8]/20">
              <h4 className="text-gray-900 text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {loop.name}
              </h4>
              <p className="text-[#3E2BB8] font-semibold mb-4">{loop.description}</p>

              {/* Components in Loop */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Components:</h5>
                <div className="flex flex-wrap gap-2">
                  {loop.components.map((compId, idx) => {
                    const block = systemMap.blocks.find(b => b.id === compId);
                    return (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium text-white"
                        style={{ backgroundColor: block?.color || '#ccc' }}
                      >
                        {block?.name || compId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Flow Steps */}
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Flow:</h5>
                {loop.flow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#3E2BB8] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts We've Been Missing */}
      <div>
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Key Concepts We've Been Missing
        </h3>
        <p className="text-gray-600 mb-6">
          Important words like <strong>continuity</strong>, <strong>reinforcement</strong>, <strong>precision timing</strong>, <strong>warm handoff</strong> — 
          these are critical but we haven't been surfacing them enough.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {systemMap.keyConceptsMissing.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200/50">
              <h4 className="text-amber-900 font-bold text-lg mb-3">{item.concept}</h4>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-semibold text-amber-900 mb-1">WHERE IT LIVES:</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {item.whereItLives.map((location, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700 border border-amber-200">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <h5 className="text-xs font-semibold text-gray-900 mb-1">WHY IT MATTERS:</h5>
                  <p className="text-sm text-gray-700">{item.why}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <h5 className="text-xs font-semibold text-emerald-900 mb-1">HOW TO MESSAGE:</h5>
                  <p className="text-sm text-gray-700 italic">{item.howToMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synergy & Reinforcement Loops */}
      <div>
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Synergy & Reinforcement Loops
        </h3>
        <p className="text-gray-600 mb-6">
          How blocks work together. The magic is in the connections—each relationship creates a reinforcement loop.
        </p>

        <div className="space-y-4">
          {systemMap.synergy.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-gray-900 font-bold">{item.connection}</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200/50">
                  <h5 className="text-xs font-semibold text-blue-900 mb-2">SYNERGY:</h5>
                  <p className="text-sm text-gray-700">{item.synergy}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200/50">
                  <h5 className="text-xs font-semibold text-purple-900 mb-2">REINFORCEMENT:</h5>
                  <p className="text-sm text-gray-700">{item.reinforcement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual System Diagram Placeholder */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-indigo-200/50 text-center">
        <Target className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h3 className="text-gray-900 text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Visual System Diagram (To Be Designed)
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          This section needs an Apple-style visual diagram showing:
        </p>
        <div className="max-w-lg mx-auto text-left space-y-2 mb-6">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm">Patient Loop (outer circle): Journey → LUMA → NaviCues/ResCues → Inner Compass → Wellbeing</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm">Clinician Loop (parallel): Momentum → Navigate → Journey adjustments</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm">Data Loop (center): Platform/ERA connecting both loops with bidirectional arrows</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm">Library feeding into all patient-facing tools</span>
          </div>
        </div>
        <p className="text-sm text-indigo-600 font-semibold">
          Priority: HIGH (Roadmap Item #3)
        </p>
      </div>
    </div>
  );
}

function StoriesSection() {
  const statusConfig = {
    "not-started": { label: "Not Started", color: "gray", bgColor: "bg-gray-50", borderColor: "border-gray-300", textColor: "text-gray-700" },
    "in-progress": { label: "In Progress", color: "blue", bgColor: "bg-blue-50", borderColor: "border-blue-300", textColor: "text-blue-700" },
    "complete": { label: "Complete", color: "green", bgColor: "bg-green-50", borderColor: "border-green-300", textColor: "text-green-700" },
    "blocked": { label: "Blocked", color: "red", bgColor: "bg-red-50", borderColor: "border-red-300", textColor: "text-red-700" }
  };

  const sizeConfig = {
    "xs": { label: "XS (1-2 days)", color: "bg-emerald-100 text-emerald-700" },
    "s": { label: "S (3-5 days)", color: "bg-green-100 text-green-700" },
    "m": { label: "M (1-2 weeks)", color: "bg-yellow-100 text-yellow-700" },
    "l": { label: "L (2-4 weeks)", color: "bg-orange-100 text-orange-700" },
    "xl": { label: "XL (1-2 months)", color: "bg-red-100 text-red-700" },
    "xxl": { label: "XXL (2-3 months)", color: "bg-purple-100 text-purple-700" }
  };

  const phaseConfig = {
    "foundation": { label: "Foundation", color: "#3E2BB8", icon: "🏗️" },
    "intelligence": { label: "Intelligence", color: "#5739FB", icon: "🧠" },
    "management": { label: "Management", color: "#7C67FF", icon: "👥" },
    "infrastructure": { label: "Infrastructure", color: "#2DD4BF", icon: "⚙️" },
    "saas": { label: "SaaS", color: "#9D8FFF", icon: "🚀" },
    "core": { label: "Core", color: "#F59E0B", icon: "⭐" },
    "optimization": { label: "Optimization", color: "#C4B5FD", icon: "✨" },
    "future": { label: "Future", color: "#94A3B8", icon: "🔮" }
  };

  const groupedByPhase = {
    foundation: epicStories.filter(s => s.phase === "foundation"),
    intelligence: epicStories.filter(s => s.phase === "intelligence"),
    management: epicStories.filter(s => s.phase === "management"),
    infrastructure: epicStories.filter(s => s.phase === "infrastructure"),
    saas: epicStories.filter(s => s.phase === "saas"),
    core: epicStories.filter(s => s.phase === "core"),
    optimization: epicStories.filter(s => s.phase === "optimization"),
    future: epicStories.filter(s => s.phase === "future")
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Epic Stories
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          The product backlog. ST0 → ST12. Foundation → Intelligence → Management → SaaS → Optimization.
        </p>
        <p className="text-[#3E2BB8] font-semibold italic">
          "This is not just a brand anchor - this is our foundation. We cannot move much further forward without a solid foundation." 
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(phaseConfig).map(([key, config]) => {
          const count = groupedByPhase[key as keyof typeof groupedByPhase].length;
          return (
            <div key={key} className="bg-white rounded-2xl p-4 border-2 border-gray-200 text-center">
              <div className="text-3xl mb-2">{config.icon}</div>
              <div className="font-bold text-gray-900">{config.label}</div>
              <div className="text-sm text-gray-600">{count} {count === 1 ? 'story' : 'stories'}</div>
            </div>
          );
        })}
      </div>

      {/* Needs Review Section */}
      {epicStories.filter(s => s.comments && s.comments.length > 0).length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border-2 border-amber-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                ⚠️ Stories Needing Your Review
              </h3>
              <p className="text-sm text-gray-600">
                {epicStories.filter(s => s.comments && s.comments.length > 0).length} {epicStories.filter(s => s.comments && s.comments.length > 0).length === 1 ? 'story has' : 'stories have'} comments or questions
              </p>
            </div>
          </div>
          
          <div className="grid gap-4">
            {epicStories.filter(s => s.comments && s.comments.length > 0).map((story) => (
              <div key={story.id} className="bg-white rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-bold text-[#3E2BB8]">{story.number}</span>
                      <h4 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {story.name}
                      </h4>
                    </div>
                    <p className="text-sm text-[#5739FB] font-semibold">{story.tagline}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    story.priority === 'critical' ? 'bg-red-100 text-red-700' :
                    story.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    story.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {story.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {story.comments?.map((comment, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                      <span className="text-amber-600 text-xs mt-0.5">💬</span>
                      <span className="text-sm text-gray-700">{comment}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Priority Roadmap */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Priority Roadmap
            </h3>
            <p className="text-sm text-gray-600">Critical path for product development</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Critical Priority */}
          <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-bold text-red-600">CRITICAL</h4>
              <span className="ml-auto text-sm text-gray-600">
                {epicStories.filter(s => s.priority === 'critical').length} stories
              </span>
            </div>
            <div className="space-y-2">
              {epicStories.filter(s => s.priority === 'critical').map((story) => (
                <div key={story.id} className="p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-sm text-gray-900">{story.number}: {story.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{phaseConfig[story.phase].icon} {phaseConfig[story.phase].label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* High Priority */}
          <div className="bg-white rounded-2xl p-6 border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h4 className="font-bold text-orange-600">HIGH</h4>
              <span className="ml-auto text-sm text-gray-600">
                {epicStories.filter(s => s.priority === 'high').length} stories
              </span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {epicStories.filter(s => s.priority === 'high').map((story) => (
                <div key={story.id} className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-sm text-gray-900">{story.number}: {story.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{phaseConfig[story.phase].icon} {phaseConfig[story.phase].label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Medium + Low Priority */}
          <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h4 className="font-bold text-yellow-600">MEDIUM / LOW</h4>
              <span className="ml-auto text-sm text-gray-600">
                {epicStories.filter(s => s.priority === 'medium' || s.priority === 'low').length} stories
              </span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {epicStories.filter(s => s.priority === 'medium' || s.priority === 'low').map((story) => (
                <div key={story.id} className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-sm text-gray-900">{story.number}: {story.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{phaseConfig[story.phase].icon} {phaseConfig[story.phase].label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stories by Phase */}
      {Object.entries(phaseConfig).map(([phaseKey, phaseConfig]) => {
        const stories = groupedByPhase[phaseKey as keyof typeof groupedByPhase];
        if (stories.length === 0) return null;

        return (
          <div key={phaseKey}>
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${phaseConfig.color}20` }}
              >
                {phaseConfig.icon}
              </div>
              <div>
                <h3 className="text-gray-900 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {phaseConfig.label} Phase
                </h3>
                <p className="text-sm text-gray-600">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</p>
              </div>
            </div>

            <div className="space-y-6">
              {stories.map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#3E2BB8]/30 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-[#3E2BB8]">{story.number}</span>
                        <h4 className="text-gray-900 text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                          {story.name}
                        </h4>
                        {story.comments && story.comments.length > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300 animate-pulse">
                            ⚠️ NEEDS REVIEW
                          </span>
                        )}
                      </div>
                      <p className="text-[#5739FB] font-semibold mb-4">{story.tagline}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusConfig[story.status].bgColor} ${statusConfig[story.status].textColor} border ${statusConfig[story.status].borderColor}`}>
                        {statusConfig[story.status].label}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${sizeConfig[story.size].color}`}>
                        {sizeConfig[story.size].label}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        story.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        story.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        story.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {story.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Vision & What It Solves */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200/50">
                      <h5 className="text-xs font-semibold text-purple-900 mb-2">VISION:</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{story.vision}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50">
                      <h5 className="text-xs font-semibold text-emerald-900 mb-2">WHAT IT SOLVES:</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{story.whatItSolves}</p>
                    </div>
                  </div>

                  {/* Dependencies */}
                  {story.dependencies.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-xs font-semibold text-gray-900 mb-2">DEPENDENCIES:</h5>
                      <div className="flex flex-wrap gap-2">
                        {story.dependencies.map((dep, idx) => (
                          <span key={idx} className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-700">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Acceptance Criteria */}
                  <div className="mb-6">
                    <h5 className="text-xs font-semibold text-gray-900 mb-3">ACCEPTANCE CRITERIA:</h5>
                    <div className="space-y-2">
                      {story.acceptanceCriteria.map((criteria, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                          <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-sm bg-gray-300" />
                          </div>
                          <span className="text-sm text-gray-700">{criteria}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Notes */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h5 className="text-xs font-semibold text-slate-900 mb-3">TECHNICAL NOTES:</h5>
                    <div className="space-y-1">
                      {story.technicalNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-slate-400 text-xs mt-1">→</span>
                          <span className="text-xs text-slate-700 font-mono">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className={story.comments && story.comments.length > 0 ? "mb-6" : ""}>
                    <h5 className="text-xs font-semibold text-gray-900 mb-3">DELIVERABLES:</h5>
                    <div className="flex flex-wrap gap-2">
                      {story.deliverables.map((deliverable, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-[#F5F3FF] to-white rounded-lg border border-[#3E2BB8]/20 text-xs font-semibold text-[#3E2BB8]">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Comments / Review Notes */}
                  {story.comments && story.comments.length > 0 && (
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-300">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4 text-amber-700" />
                        <h5 className="text-xs font-semibold text-amber-900">COMMENTS / NEEDS REVIEW:</h5>
                      </div>
                      <div className="space-y-2">
                        {story.comments.map((comment, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-amber-200">
                            <span className="text-amber-600 text-xs mt-0.5">💬</span>
                            <span className="text-sm text-gray-700 leading-relaxed">{comment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Unified Mind Quote */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-3 text-lg">The Unified Mind</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              <em>"This is an opportunity to unpack my infinite conscious mind and your infinite unconscious mind as a unified mind."</em>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              These stories represent the full architecture of what we're building. Not just features—but a <strong>foundation</strong> that supports 
              the vision of neuroadaptive continuous-care recovery. Each story builds on the last. Each dependency is intentional. 
              This is the <strong>house we're building</strong>, and we're starting with bedrock, not drywall.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessagingLabSection() {
  // Import the messaging matrix
  const { MESSAGING_MATRIX, auditMessagingConsistency } = require('../../utils/messaging');
  const auditResults = auditMessagingConsistency();
  const hasIssues = auditResults.length > 0;
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Messaging Lab
        </h2>
        <p className="text-gray-600 text-lg">
          Our whiteboard of taglines, power copy, and messaging variations. Add to this as we refine.
        </p>
      </div>

      {/* MESSAGING MATRIX - Complete Touchpoint Map */}
      <div className="bg-gradient-to-br from-[#3E2BB8]/5 via-white to-[#5739FB]/5 rounded-3xl p-8 border-2 border-[#3E2BB8]/20">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-gray-900 text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              📊 Messaging Matrix
            </h3>
            <p className="text-gray-600">
              Complete map of every messaging touchpoint across the platform. Ensures 100% consistency.
            </p>
          </div>
          <div className={`px-4 py-2 rounded-xl border-2 flex items-center gap-2 ${
            hasIssues 
              ? 'bg-yellow-50 border-yellow-300 text-yellow-900'
              : 'bg-green-50 border-green-300 text-green-900'
          }`}>
            {hasIssues ? (
              <span className="text-sm font-semibold">⚠️ {auditResults.length} Issues</span>
            ) : (
              <span className="text-sm font-semibold">✅ All Consistent</span>
            )}
          </div>
        </div>

        {/* Feature Messaging Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Dashboard Tile</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Page Header</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Core Concept</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MESSAGING_MATRIX.map((feature: any) => {
                const dashboardSlot = feature.slots.find((s: any) => s.location.includes('Dashboard Tile (Desktop)'));
                const headerSlot = feature.slots.find((s: any) => s.location.includes('Page Header'));
                
                return (
                  <tr key={feature.featureName} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{feature.featureName}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">"{dashboardSlot?.text}"</div>
                      <div className="text-xs text-gray-500 mt-1">{dashboardSlot?.characterCount} chars</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">"{headerSlot?.text}"</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">{feature.coreConcept}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* DNA Compliance Check */}
        {hasIssues && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <h4 className="text-sm font-bold text-yellow-900 mb-2">DNA Violations Detected:</h4>
            <div className="space-y-2">
              {auditResults.map((result: any, idx: number) => (
                <div key={idx} className="text-sm text-yellow-800">
                  <span className="font-semibold">{result.feature}:</span>
                  <ul className="ml-4 mt-1 space-y-1">
                    {result.issues.map((issue: string, issueIdx: number) => (
                      <li key={issueIdx} className="text-xs">• {issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-6 flex items-center gap-4 text-sm">
          <div className="text-gray-600">
            <strong>7 features</strong> × <strong>9 touchpoints</strong> = <strong>63 messaging slots</strong> mapped
          </div>
          <div className="flex-1 border-t border-gray-300" />
          <div className="text-[#3E2BB8] font-semibold">
            Edit in <code className="px-2 py-1 bg-gray-100 rounded text-xs">/utils/messaging.tsx</code>
          </div>
        </div>
      </div>

      {/* Platform Taglines */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Platform Taglines
        </h3>
        <div className="space-y-2">
          {messagingLab.platformTaglines.map((tagline, idx) => (
            <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <p className="text-gray-800 font-medium">{tagline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Value Prop */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Value Propositions
        </h3>
        <div className="space-y-2">
          {messagingLab.valueProp.map((line, idx) => (
            <div key={idx} className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
              <p className="text-gray-800 font-medium">{line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audience-Specific */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200">
          <h3 className="text-gray-900 font-bold mb-3">For CEOs</h3>
          <div className="space-y-2">
            {messagingLab.audienceSpecific.forCEOs.map((line, idx) => (
              <p key={idx} className="text-sm text-gray-700 p-2 bg-purple-50 rounded-lg">{line}</p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200">
          <h3 className="text-gray-900 font-bold mb-3">For Therapists</h3>
          <div className="space-y-2">
            {messagingLab.audienceSpecific.forTherapists.map((line, idx) => (
              <p key={idx} className="text-sm text-gray-700 p-2 bg-blue-50 rounded-lg">{line}</p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-gray-200">
          <h3 className="text-gray-900 font-bold mb-3">For Patients</h3>
          <div className="space-y-2">
            {messagingLab.audienceSpecific.forPatients.map((line, idx) => (
              <p key={idx} className="text-sm text-gray-700 p-2 bg-green-50 rounded-lg">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Taglines */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Feature Taglines
        </h3>
        
        <div className="space-y-6">
          {Object.entries(messagingLab.featureTaglines).map(([feature, taglines]) => (
            <div key={feature}>
              <h4 className="text-gray-900 font-semibold mb-2 capitalize">{feature}:</h4>
              <div className="grid grid-cols-2 gap-2">
                {taglines.map((tagline, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700">{tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200/50">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Social Proof Lines
        </h3>
        <div className="space-y-2">
          {messagingLab.socialProof.map((line, idx) => (
            <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200/50">
              <p className="text-gray-800 font-medium">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToneVoiceSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Tone & Voice
        </h2>
        <p className="text-gray-600 text-lg">
          How Recoverlutionists speak. Our voice identity, word choices, and writing principles.
        </p>
      </div>

      {/* Identity */}
      <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-3xl p-8 border-2 border-[#3E2BB8]/20">
        <h3 className="text-gray-900 text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {toneAndVoice.identity}
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {toneAndVoice.essence}
        </p>
      </div>

      {/* Characteristics */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          We Are:
        </h3>
        <div className="space-y-2">
          {toneAndVoice.characteristics.map((char, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3E2BB8] mt-2 flex-shrink-0" />
              <span className="text-gray-700">{char}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Words */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200/50">
          <h3 className="text-red-900 text-xl mb-4 font-bold">Avoid These Words:</h3>
          <div className="flex flex-wrap gap-2">
            {toneAndVoice.avoidWords.map((word, idx) => (
              <span key={idx} className="px-3 py-2 bg-white border border-red-200 rounded-lg text-sm text-red-700 line-through">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200/50">
          <h3 className="text-green-900 text-xl mb-4 font-bold">Embrace These Words:</h3>
          <div className="flex flex-wrap gap-2">
            {toneAndVoice.embraceWords.map((word, idx) => (
              <span key={idx} className="px-3 py-2 bg-white border border-green-200 rounded-lg text-sm text-green-700 font-semibold">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Before & After
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-200/50">
            <p className="text-xs text-red-600 font-semibold mb-2">❌ DON'T:</p>
            <p className="text-gray-700 italic">{toneAndVoice.examples.bad}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-2xl border border-green-200/50">
            <p className="text-xs text-green-600 font-semibold mb-2">✓ DO:</p>
            <p className="text-gray-700 italic">{toneAndVoice.examples.good}</p>
          </div>
        </div>
      </div>

      {/* Writing Principles */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Writing Principles
        </h3>
        <div className="space-y-3">
          {toneAndVoice.writingPrinciples.map((principle, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#F5F3FF] to-white rounded-xl border border-[#3E2BB8]/20">
              <div className="w-6 h-6 rounded-full bg-[#3E2BB8] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{idx + 1}</span>
              </div>
              <span className="text-gray-700">{principle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TheoryFrameworkSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Theory & Framework
        </h2>
        <p className="text-gray-600 text-lg">
          The clinical and technical foundation everything is built on.
        </p>
      </div>

      {/* Architecture Deep-Dives - Updated Oct 17, 2025 */}
      <div className="bg-gradient-to-br from-[#F5F3FF] via-white to-[#F5F3FF] rounded-3xl p-8 border-2 border-[#5739FB]/20">
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Architecture Deep-Dives
        </h3>
        <p className="text-gray-600 mb-6">
          Visual explorations of our core principles and content strategy
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* HCP */}
          <button
            onClick={() => navigateToPage('docs-hcp', 'Human Cognition Platform - Architecture')}
            className="group bg-white rounded-2xl p-5 border-2 border-[#5739FB]/10 hover:border-[#5739FB]/40 transition-all hover:shadow-lg text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5739FB]/10 flex items-center justify-center mb-3 group-hover:bg-[#5739FB]/20 transition-colors">
              <Cpu className="w-5 h-5 text-[#5739FB]" />
            </div>
            <div className="font-bold text-gray-900 mb-1">Human Cognition Platform</div>
            <div className="text-sm text-gray-600">3-layer architecture (HCP) + ERA flow mechanics</div>
            <div className="flex items-center gap-2 mt-3 text-[#5739FB] text-sm font-medium">
              <span>Explore →</span>
            </div>
          </button>

          {/* ERA Flow */}
          <button
            onClick={() => navigateToPage('docs-era-flow', 'ERA Flow - Learning Mechanics')}
            className="group bg-white rounded-2xl p-5 border-2 border-[#5739FB]/10 hover:border-[#5739FB]/40 transition-all hover:shadow-lg text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5739FB]/10 flex items-center justify-center mb-3 group-hover:bg-[#5739FB]/20 transition-colors">
              <Zap className="w-5 h-5 text-[#5739FB]" />
            </div>
            <div className="font-bold text-gray-900 mb-1">ERA Flow</div>
            <div className="text-sm text-gray-600">Experience → Recognize → Align: How learning becomes reflex</div>
            <div className="flex items-center gap-2 mt-3 text-[#5739FB] text-sm font-medium">
              <span>Explore →</span>
            </div>
          </button>

          {/* Infinite Canvas */}
          <button
            onClick={() => navigateToPage('docs-infinite-canvas', 'Infinite Canvas Principle')}
            className="group bg-white rounded-2xl p-5 border-2 border-[#5739FB]/10 hover:border-[#5739FB]/40 transition-all hover:shadow-lg text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5739FB]/10 flex items-center justify-center mb-3 group-hover:bg-[#5739FB]/20 transition-colors">
              <Sparkles className="w-5 h-5 text-[#5739FB]" />
            </div>
            <div className="font-bold text-gray-900 mb-1">Infinite Canvas Principle</div>
            <div className="text-sm text-gray-600">Why NaviCues provoke and Building Blocks satisfy</div>
            <div className="flex items-center gap-2 mt-3 text-[#5739FB] text-sm font-medium">
              <span>Explore →</span>
            </div>
          </button>
        </div>

        {/* New: Core Principles - The Sphere */}
        <div className="mt-6 pt-6 border-t border-[#5739FB]/20">
          <h4 className="font-bold text-gray-900 mb-4">Core Principles</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sphere Principle */}
            <button
              onClick={() => navigateToPage('docs-sphere-principle', 'The Sphere Principle')}
              className="group bg-gradient-to-br from-[#5739FB]/5 to-[#3E2BB8]/5 rounded-2xl p-5 border-2 border-[#5739FB]/20 hover:border-[#5739FB]/60 transition-all hover:shadow-lg text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <div className="text-2xl">🌐</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">The Sphere Principle</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Why recovery is about building a sphere that rolls, not checking boxes
                  </div>
                  <div className="text-xs text-[#3E2BB8] italic">
                    "The sphere will never be perfect. But it will roll. And that's recovery."
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[#5739FB] text-sm font-medium">
                    <span>Read More →</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Content Roadmap */}
            <button
              onClick={() => navigateToPage('docs-content-roadmap', 'Content Build-Out Roadmap')}
              className="group bg-gradient-to-br from-[#10B981]/5 to-[#3B82F6]/5 rounded-2xl p-5 border-2 border-[#10B981]/20 hover:border-[#10B981]/60 transition-all hover:shadow-lg text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <div className="text-2xl">🗺️</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">Content Build-Out Roadmap</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Visual plan for ST43-ST46: Weekly sprints, micro-blocks, content, videos
                  </div>
                  <div className="text-xs text-[#10B981] italic">
                    84 exercises, 440 blocks, 585 articles, 264 videos
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[#10B981] text-sm font-medium">
                    <span>View Roadmap →</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* HCP Architecture */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200/50">
        <h3 className="text-gray-900 text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {theoryAndFramework.hcp.name}
        </h3>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          {theoryAndFramework.hcp.description}
        </p>

        <div className="space-y-4">
          {theoryAndFramework.hcp.layers.map((layer, idx) => (
            <div key={idx} className="bg-white/60 rounded-2xl p-5 border border-blue-200/50">
              <h4 className="text-gray-900 font-bold mb-2">{layer.name}</h4>
              <p className="text-gray-700 mb-2">{layer.description}</p>
              <p className="text-sm text-blue-800 italic">Example: {layer.example}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-blue-200">
          <h4 className="text-gray-900 font-bold mb-2">{theoryAndFramework.hcp.eraFlow.name}</h4>
          <p className="text-gray-700 mb-2">{theoryAndFramework.hcp.eraFlow.fullName}</p>
          <p className="text-blue-800">{theoryAndFramework.hcp.eraFlow.description}</p>
        </div>
      </div>

      {/* 6 Pillars */}
      <div>
        <h3 className="text-gray-900 text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          The 6 Pillars of Recovery
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {theoryAndFramework.sixPillars.map((pillar) => (
            <div key={pillar.name} className="bg-white rounded-3xl p-6 border-2 border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  {pillar.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-bold mb-1">{pillar.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                    <span className="text-xs text-gray-500 font-mono">{pillar.color}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">{pillar.description}</p>

              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-semibold text-gray-900 mb-2">Micro-Blocks:</h5>
                  <div className="flex flex-wrap gap-1">
                    {pillar.microBlocks.map((block, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                        {block}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-gray-900 mb-2">Clinical Basis:</h5>
                  <div className="flex flex-wrap gap-1">
                    {pillar.clinicalBasis.map((basis, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-900 font-semibold">
                        {basis}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 italic">
                    <strong>Why it matters:</strong> {pillar.whyItMatters}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200/50">
          <h3 className="text-gray-900 text-xl mb-3 font-bold">
            {theoryAndFramework.philosophy.fluidAndForever.name}
          </h3>
          <p className="text-gray-700 mb-4">{theoryAndFramework.philosophy.fluidAndForever.description}</p>
          <div className="space-y-2">
            {theoryAndFramework.philosophy.fluidAndForever.principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{principle}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-3xl p-8 border-2 border-[#3E2BB8]/20">
          <h3 className="text-gray-900 text-xl mb-3 font-bold">
            {theoryAndFramework.philosophy.appleForAddiction.name}
          </h3>
          <p className="text-gray-700 mb-4">{theoryAndFramework.philosophy.appleForAddiction.description}</p>
          <div className="space-y-2">
            {theoryAndFramework.philosophy.appleForAddiction.principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3E2BB8] mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureDefinitionsSection() {
  const features = [
    {
      name: "LUMA",
      fullName: "Learned Universal Momentum Architect",
      positioning: "Your Emotional Co-Pilot",
      whatItIs: "Pattern recognition engine that curates timely interventions based on user state, context, and history",
      whatItIsNot: "NOT a therapist. NOT reactive support. NOT chatbot.",
      clinicalFoundation: "Ecological Momentary Intervention (EMI) + Adaptive Algorithms",
      userExperience: "LUMA notices patterns you don't see. She surfaces what you need before you know you need it.",
      examples: [
        "After 3 days of low energy + poor sleep → suggests somatic grounding",
        "Pattern of evening anxiety → offers Urge Surfing NaviCue at 7pm",
        "Upcoming family event + social connectivity flag → prompts boundary practice"
      ]
    },
    {
      name: "NaviCues",
      positioning: "Brain Rewiring Tools",
      whatItIs: "8-12 minute structured therapeutic journeys with clinical rigor, progress tracking, and evidence-based foundations",
      whatItIsNot: "NOT quick tips. NOT assessments. NOT lightweight content.",
      clinicalFoundation: "ACT, DBT, IFS, SE, CFT, Polyvagal Theory, MBRP",
      userExperience: "Substantial work that creates actual neural pathway changes through experiential practice.",
      examples: [
        "Understanding Shame: 5-step journey through somatic location → self-compassion → intervention pathways",
        "Window of Tolerance: Nervous system education + state identification + regulation practice",
        "Values Clarification: Card-sorting → ranking → action-planning based on ACT"
      ]
    },
    {
      name: "Inner Compass",
      positioning: "Map Your State. Honor Your Pace.",
      whatItIs: "Real-time nervous system state tracking across 4 dimensions",
      whatItIsNot: "NOT mood tracking. NOT compliance surveillance.",
      dimensions: [
        "Physical Energy (tired → energized)",
        "Emotional Tone (heavy → light)",
        "Mental Clarity (foggy → sharp)",
        "Social Capacity (withdrawn → connected)"
      ],
      clinicalFoundation: "Interoceptive awareness + Self-monitoring",
      userExperience: "5-second check-in that builds self-awareness over time. See patterns. Honor your state.",
      examples: []
    },
    {
      name: "Momentum Dashboard",
      positioning: "Know Your Patients in 60 Seconds",
      whatItIs: "Therapist-facing patient overview with Sync scores, pillar engagement, recent activity, and care notes",
      whatItIsNot: "NOT surveillance. NOT compliance tracking. NOT punishment tool.",
      syncScore: "0-100 composite score: engagement frequency + content depth + state regulation + care alignment",
      userExperience: "Glanceable intelligence that informs clinical decision-making without overwhelming.",
      examples: []
    },
    {
      name: "Navigate",
      positioning: "Your Care Team, Always Connected",
      whatItIs: "Care coordination layer connecting therapist, psychiatrist, care coordinator, family",
      whatItIsNot: "NOT just messaging. NOT another EHR.",
      userExperience: "Everyone sees patient state, notes, milestones. Care stays coordinated beyond clinic walls.",
      examples: []
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Feature Definitions
        </h2>
        <p className="text-gray-600 text-lg">
          What each feature is (and isn't). Clear definitions prevent feature creep and maintain identity.
        </p>
      </div>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.name} className="bg-white rounded-3xl p-8 border-2 border-gray-200">
            <div className="mb-6">
              <h3 className="text-gray-900 text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {feature.name}
              </h3>
              {'fullName' in feature && (
                <p className="text-sm text-gray-500 mb-2">{feature.fullName}</p>
              )}
              <p className="text-[#3E2BB8] font-semibold text-lg">{feature.positioning}</p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-2xl p-4 border border-green-200/50">
                  <h4 className="text-green-900 font-semibold mb-2 text-sm">✓ What It IS:</h4>
                  <p className="text-gray-700 text-sm">{feature.whatItIs}</p>
                </div>
                
                {feature.whatItIsNot && (
                  <div className="bg-red-50 rounded-2xl p-4 border border-red-200/50">
                    <h4 className="text-red-900 font-semibold mb-2 text-sm">✗ What It's NOT:</h4>
                    <p className="text-gray-700 text-sm">{feature.whatItIsNot}</p>
                  </div>
                )}
              </div>

              {feature.clinicalFoundation && (
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200/50">
                  <h4 className="text-blue-900 font-semibold mb-2 text-sm">Clinical Foundation:</h4>
                  <p className="text-gray-700 text-sm">{feature.clinicalFoundation}</p>
                </div>
              )}

              {'dimensions' in feature && feature.dimensions && (
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200/50">
                  <h4 className="text-purple-900 font-semibold mb-2 text-sm">4 Dimensions:</h4>
                  <div className="space-y-1">
                    {feature.dimensions.map((dim, idx) => (
                      <p key={idx} className="text-gray-700 text-sm">• {dim}</p>
                    ))}
                  </div>
                </div>
              )}

              {'syncScore' in feature && feature.syncScore && (
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200/50">
                  <h4 className="text-purple-900 font-semibold mb-2 text-sm">Sync Score:</h4>
                  <p className="text-gray-700 text-sm">{feature.syncScore}</p>
                </div>
              )}

              <div className="bg-gradient-to-br from-[#F5F3FF] to-white rounded-2xl p-4 border border-[#3E2BB8]/20">
                <h4 className="text-gray-900 font-semibold mb-2 text-sm">User Experience:</h4>
                <p className="text-gray-700 text-sm italic">{feature.userExperience}</p>
              </div>

              {feature.examples && feature.examples.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-gray-900 font-semibold text-sm">Examples:</h4>
                  {feature.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3E2BB8] mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapSection() {
  const statusConfig = {
    "have-it": {
      label: "Have It, Need to Message",
      color: "blue",
      icon: CheckCircle2,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900"
    },
    "messaging-gap": {
      label: "Messaging Gap",
      color: "amber",
      icon: AlertCircle,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-900"
    },
    "build-it": {
      label: "Build It",
      color: "purple",
      icon: Clock,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900"
    }
  };

  const groupedItems = {
    "have-it": roadmapItems.filter(item => item.status === "have-it"),
    "messaging-gap": roadmapItems.filter(item => item.status === "messaging-gap"),
    "build-it": roadmapItems.filter(item => item.status === "build-it")
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Roadmap
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Based on ChatGPT's cold critique (Jan 2025). These aren't necessarily gaps—many we likely HAVE but aren't messaging right.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Vision/value board • Jira-style • Tracks capability vs messaging</span>
        </div>
      </div>

      {/* Status Key */}
      <div className="flex gap-4 flex-wrap">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          const count = groupedItems[key as RoadmapStatus].length;
          return (
            <div key={key} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bgColor} border-2 ${config.borderColor}`}>
              <Icon className={`w-4 h-4 ${config.textColor}`} />
              <span className={`font-semibold ${config.textColor}`}>{config.label}</span>
              <span className="text-xs text-gray-600">({count})</span>
            </div>
          );
        })}
      </div>

      {/* Kanban-style Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(statusConfig).map(([statusKey, config]) => {
          const Icon = config.icon;
          const items = groupedItems[statusKey as RoadmapStatus];
          
          return (
            <div key={statusKey} className="space-y-4">
              {/* Column Header */}
              <div className={`${config.bgColor} rounded-2xl p-4 border-2 ${config.borderColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-5 h-5 ${config.textColor}`} />
                  <h3 className={`font-bold ${config.textColor}`}>{config.label}</h3>
                </div>
                <p className="text-xs text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-[#3E2BB8]/30 transition-all">
                    {/* Priority Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-gray-900 font-bold">{item.title}</h4>
                      <span className={`
                        px-2 py-1 rounded-lg text-xs font-semibold
                        ${item.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
                        ${item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${item.priority === 'low' ? 'bg-green-100 text-green-700' : ''}
                      `}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Vision */}
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-[#3E2BB8] mb-1">VISION:</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.vision}</p>
                    </div>

                    {/* What It Solves */}
                    <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                      <h5 className="text-xs font-semibold text-green-900 mb-1">SOLVES:</h5>
                      <p className="text-xs text-gray-700 leading-relaxed">{item.whatItSolves}</p>
                    </div>

                    {/* Current State */}
                    <div className="mb-3 p-3 bg-gray-50 rounded-xl">
                      <h5 className="text-xs font-semibold text-gray-900 mb-1">CURRENT STATE:</h5>
                      <p className="text-xs text-gray-700 leading-relaxed">{item.currentState}</p>
                    </div>

                    {/* Next Step */}
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-gray-900 mb-1">NEXT STEP:</h5>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">{item.nextStep}</p>
                    </div>

                    {/* Source */}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">{item.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ChatGPT Source Attribution */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-2">Source: ChatGPT Cold Critique (Jan 2025)</h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Asked ChatGPT to do a brutal cold look at recoverlution.com. The critique validated we're on the right track 
              while highlighting specific gaps. Key insight: <strong>Most of these aren't capability gaps—they're messaging gaps.</strong> 
              We likely HAVE the clinical rigor, the security, the integrations. We just don't showcase them prominently.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-indigo-200">
                April Dunford Positioning Framework
              </span>
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-indigo-200">
                "Show, don't tell"
              </span>
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold text-gray-700 border border-indigo-200">
                Recovery Reinforcement Platform (RRP)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdeasSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Ideas
        </h2>
        <p className="text-gray-600 text-lg">
          Breakthrough moments, naming insights, narrative discoveries. Add to this as they happen.
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 border-2 border-amber-200/50 text-center">
        <Lightbulb className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h3 className="text-gray-900 text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Space for Future Gold
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          As we have breakthroughs, naming moments, or narrative insights, we'll add them here with dates and context.
        </p>
        
        {/* Example format */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border-2 border-amber-200/50 text-left">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-gray-900 font-bold">Example Insight</h4>
            <span className="text-xs text-gray-500">Jan 2025</span>
          </div>
          <p className="text-gray-700 mb-3 italic">
            "The carousel exercise revealed our positioning in its purest form. Each slide became a truth we can build from."
          </p>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Impact:</strong> Created this Brand Anchor as our single source of truth. All future messaging can be tested against these 9 truths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Analytics
        </h2>
        <p className="text-gray-600 text-lg">
          Platform insights and data analysis. This section will be populated when we have viable, usable data.
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border-2 border-blue-200/50 text-center">
        <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-gray-900 text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Coming Soon
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          Once we have viable, usable data from the platform, this section will include:
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border-2 border-blue-200/50 text-left">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-semibold mb-1">Patient Engagement Metrics</h4>
                <p className="text-sm text-gray-600">NaviCue completion rates, Journey adherence, Inner Compass check-in frequency</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-semibold mb-1">Clinical Outcomes</h4>
                <p className="text-sm text-gray-600">Micro-block state changes, pillar score trends, retention rates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-semibold mb-1">Platform Performance</h4>
                <p className="text-sm text-gray-600">LUMA curation effectiveness, ResCue response times, care team coordination metrics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-gray-900 font-semibold mb-1">Proof Points</h4>
                <p className="text-sm text-gray-600">Real data to validate our 1/10 → 3/10 recovery thesis and inform product development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStackSection() {
  const techCategories = [
    {
      name: "Frontend Stack",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "React 18", purpose: "UI framework", status: "active", notes: "Hooks-based, concurrent features" },
        { name: "TypeScript", purpose: "Type safety", status: "active", notes: "Strict mode enabled" },
        { name: "Tailwind CSS v4", purpose: "Styling system", status: "active", notes: "Custom brand tokens, responsive utilities" },
        { name: "Vite", purpose: "Build tool", status: "active", notes: "Fast HMR, optimized production builds" },
        { name: "Lucide React", purpose: "Icon library", status: "active", notes: "Lightweight, tree-shakeable SVG icons" },
        { name: "Recharts", purpose: "Data visualization", status: "active", notes: "Charts for Momentum dashboard, analytics" },
        { name: "Motion (Framer Motion)", purpose: "Animation library", status: "active", notes: "Fluid UI animations, transitions" },
        { name: "React Hook Form", purpose: "Form management", status: "planned", notes: "v7.55.0, used with Zod validation" }
      ]
    },
    {
      name: "Backend & Infrastructure",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      technologies: [
        { name: "Supabase", purpose: "Backend platform", status: "active", notes: "Auth, storage, edge functions, Postgres" },
        { name: "Supabase Edge Functions", purpose: "Server logic", status: "active", notes: "Deno runtime, Hono web framework" },
        { name: "Hono", purpose: "Web framework", status: "active", notes: "Fast, lightweight, TypeScript-first" },
        { name: "PostgreSQL", purpose: "Primary database", status: "active", notes: "KV store table (kv_store_49b28b8a)" },
        { name: "Supabase Storage", purpose: "Blob storage", status: "active", notes: "Private buckets for files, signed URLs" },
        { name: "Supabase Auth", purpose: "Authentication", status: "active", notes: "Email/password, social login (Google, GitHub)" },
        { name: "Figma Make", purpose: "Hosting platform", status: "active", notes: "Zero-config deployment, custom domains" }
      ]
    },
    {
      name: "AI & Machine Learning",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      technologies: [
        { name: "OpenAI GPT-4", purpose: "Text analysis AI", status: "planned", notes: "Sentiment, crisis detection, deviation analysis (ST19)" },
        { name: "Hume AI", purpose: "Voice & facial emotion AI", status: "planned", notes: "Voice tone analysis (ST17), facial expression detection (ST18)" },
        { name: "AssemblyAI", purpose: "Speech-to-text + sentiment", status: "planned", notes: "Alternative to OpenAI for voice processing" },
        { name: "TensorFlow Lite", purpose: "On-device ML", status: "planned", notes: "Mobile voice/video analysis (privacy-first)" },
        { name: "Azure Face API", purpose: "Facial analysis", status: "planned", notes: "Alternative to Hume for video emotion detection" }
      ]
    },
    {
      name: "Payments & Billing",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      technologies: [
        { name: "Stripe", purpose: "Payment gateway", status: "planned", notes: "Subscriptions, invoicing, seat-based billing (ST20)" },
        { name: "Stripe Billing", purpose: "Subscription management", status: "planned", notes: "Seat-based pricing, prorated adjustments" },
        { name: "Stripe Tax", purpose: "Tax calculation", status: "planned", notes: "Automated sales tax (US) and VAT (EU)" }
      ]
    },
    {
      name: "Analytics & Monitoring",
      icon: Target,
      color: "from-orange-500 to-red-500",
      technologies: [
        { name: "PostHog", purpose: "Product analytics", status: "active", notes: "Event tracking, user journeys, funnels" },
        { name: "Sentry", purpose: "Error tracking", status: "planned", notes: "Frontend + backend error monitoring" },
        { name: "LogRocket", purpose: "Session replay", status: "planned", notes: "Debug user issues, UX insights" }
      ]
    },
    {
      name: "Integrations",
      icon: Layers,
      color: "from-teal-500 to-blue-500",
      technologies: [
        { name: "FHIR", purpose: "EHR interoperability", status: "planned", notes: "Standard for healthcare data exchange (ST8)" },
        { name: "Apple Health", purpose: "Wearable data", status: "planned", notes: "HRV, sleep, activity tracking (ST8)" },
        { name: "Google Fit", purpose: "Wearable data", status: "planned", notes: "Android wearable integration (ST8)" },
        { name: "Firebase Cloud Messaging", purpose: "Push notifications", status: "planned", notes: "iOS + Android notifications (ST16)" },
        { name: "Twilio", purpose: "SMS/voice", status: "planned", notes: "ResCue SMS alerts, voice calls" },
        { name: "Resend", purpose: "Email delivery", status: "active", notes: "Transactional emails, marketing blasts" }
      ]
    },
    {
      name: "Developer Tools",
      icon: Terminal,
      color: "from-gray-600 to-gray-800",
      technologies: [
        { name: "Git + GitHub", purpose: "Version control", status: "active", notes: "Source code management" },
        { name: "ESLint", purpose: "Code linting", status: "active", notes: "TypeScript + React rules" },
        { name: "Prettier", purpose: "Code formatting", status: "active", notes: "Consistent code style" },
        { name: "React DevTools", purpose: "Debugging", status: "active", notes: "Component inspection, profiling" }
      ]
    },
    {
      name: "UI Component Libraries",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      technologies: [
        { name: "shadcn/ui", purpose: "Component library", status: "active", notes: "Accessible, customizable React components" },
        { name: "Radix UI", purpose: "Unstyled primitives", status: "active", notes: "Underlying primitives for shadcn/ui" },
        { name: "Sonner", purpose: "Toast notifications", status: "active", notes: "Beautiful, accessible toast UI" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-900 text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Tech Stack
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Complete technology architecture and tooling. Active systems powering the platform today, plus planned integrations for future capabilities.
        </p>
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200/50">
          <Cpu className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-900 font-semibold">Apple-Grade Stack</p>
            <p className="text-xs text-gray-600">Modern, type-safe, performant. Every choice deliberate. Every integration purposeful.</p>
          </div>
        </div>
      </div>

      {/* Technology Categories */}
      <div className="space-y-6">
        {techCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="bg-white rounded-3xl p-8 border-2 border-gray-200">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.technologies.length} technologies</p>
                </div>
              </div>

              {/* Technologies Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {category.technologies.map((tech) => (
                  <div key={tech.name} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#3E2BB8]/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900 font-semibold">{tech.name}</h4>
                      <span className={`
                        px-2 py-1 rounded-lg text-xs font-semibold
                        ${tech.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                        ${tech.status === 'planned' ? 'bg-blue-100 text-blue-700' : ''}
                        ${tech.status === 'deprecated' ? 'bg-gray-100 text-gray-700' : ''}
                      `}>
                        {tech.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      <strong>Purpose:</strong> {tech.purpose}
                    </p>
                    <p className="text-xs text-gray-500 italic">{tech.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Principles */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200/50">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Architecture Principles
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">Type Safety First</h4>
            <p className="text-sm text-gray-600">TypeScript everywhere. Catch errors at compile time, not production.</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">Privacy by Design</h4>
            <p className="text-sm text-gray-600">HIPAA-compliant. Encrypted at rest and in transit. On-device processing where possible.</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">Mobile-First</h4>
            <p className="text-sm text-gray-600">Patients live on phones. Every feature optimized for touch, responsive by default.</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">API-First Design</h4>
            <p className="text-sm text-gray-600">Every feature exposed via API. Future-proof for mobile apps, integrations, partners.</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">Edge-First Compute</h4>
            <p className="text-sm text-gray-600">Deno edge functions for low latency. Global distribution. Fast everywhere.</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h4 className="text-gray-900 font-semibold mb-2">Minimal Dependencies</h4>
            <p className="text-sm text-gray-600">Every package justified. Small bundle size. Fast load times. Less attack surface.</p>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200/50">
        <h3 className="text-gray-900 text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Related Stories
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST17: Voice Analysis AI</p>
              <p className="text-xs text-gray-600">Hume AI, AssemblyAI, TensorFlow Lite for on-device voice emotion detection</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST18: Video Analysis AI</p>
              <p className="text-xs text-gray-600">Hume AI, Azure Face API, Core ML for facial expression and engagement detection</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST19: Text Analysis AI</p>
              <p className="text-xs text-gray-600">OpenAI GPT-4, Google Cloud NLP for sentiment, crisis detection, deviation tracking</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST20: Automated Seat-Based Billing</p>
              <p className="text-xs text-gray-600">Stripe Billing, Stripe Tax for self-service subscription management</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST8: Integration Layer</p>
              <p className="text-xs text-gray-600">FHIR, Apple Health, Google Fit, Firebase for EHR and wearable integration</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-semibold">ST15: Native Mobile App</p>
              <p className="text-xs text-gray-600">React Native for iOS + Android with 80%+ code sharing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NaviCues Page V2 - Pure Magic
 * 
 * Philosophy:
 * - No data points, no counts, no technical details
 * - Just the feeling
 * - Like Apple would do it
 */

import React, { useState, useEffect } from "react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { NaviCueEngine, NaviCue } from "../navicues/NaviCueEngine";
import { createClient } from "../../utils/supabase/client";
import { DASHBOARD_ASSETS } from "../../utils/dashboardAssetManifest";
import { useLumaPlayer } from "../../contexts/LumaPlayerContext";

// Initialize Supabase client once
const supabase = createClient();

export function NavicuesPageV2() {
  const [patientCues, setPatientCues] = useState<NaviCue[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NEW v2.2: Track routing from soundbite
  const { markLedToPractice } = useLumaPlayer();

  useEffect(() => {
    loadPatientCues();
    
    // NEW v2.2: Mark that soundbite led to practice page
    markLedToPractice().catch(err => {
      console.log('[NaviCues] No active soundbite session to track');
    });
  }, []);

  const loadPatientCues = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("navicues")
        .select("*")
        .eq("status", "pilot")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setPatientCues(getMockNaviCues());
      } else {
        setPatientCues(data as NaviCue[]);
      }
    } catch (error) {
      setPatientCues(getMockNaviCues());
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = () => {
    if (patientCues.length > 0) {
      setShowPlayer(true);
    }
  };

  const handlePlayerComplete = () => {
    setShowPlayer(false);
    loadPatientCues();
  };

  const handlePlayerExit = () => {
    setShowPlayer(false);
  };

  if (showPlayer && patientCues.length > 0) {
    return (
      <NaviCueEngine
        cues={patientCues}
        onComplete={handlePlayerComplete}
        onExit={handlePlayerExit}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
      <PlatformPageHeader
        page="Navicues"
        headline="Navigational cues illuminating your pathway"
        height="medium"
        actions={
          !loading && patientCues.length > 0 ? (
            <button
              onClick={handleLaunch}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300"
              style={{
                borderRadius: "0px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              <Play className="w-4 h-4" fill="white" />
              <span>Begin</span>
            </button>
          ) : loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : null
        }
      />

      {/* Content Area */}
      <div className="page-content">
        <div className="content-container">
          {/* Hero Card */}
          <div className="card-hero">
            {/* Background Asset */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}>
              <img
                src="https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/21:9/PNG/3D%20SHAPE%20_%20cube%20balls.png"
                alt=""
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Content */}
            <div className="card-hero-content" style={{ gap: 'var(--gap-loose)' }}>
              {/* Top Section: Copy */}
              <div>
                {/* Eyebrow: INNER COMPASS · TIMELESS TRUTH */}
                <p className="text-eyebrow text-white" style={{ marginBottom: '12px' }}>
                  INNER COMPASS · TIMELESS TRUTH
                </p>

                {/* Headline */}
                <h1 className="text-hero-headline text-white" style={{ marginBottom: '20px' }}>
                  Recovery through discovery
                </h1>
                
                {/* Subheadline */}
                <p className="text-body-hero text-white" style={{ maxWidth: '680px' }}>
                  Sparks of insight decode the past and unearth an inner world shinning a light on a narrative you call home. A foundation as strong as truth, your true self has always been the compass to tell the story.
                </p>
              </div>

              {/* Bottom Section: CTA */}
              <div>
                {!loading && patientCues.length > 0 ? (
                  <button
                    onClick={handleLaunch}
                    className="btn-glass btn-glass-lg"
                  >
                    <Play className="w-5 h-5" fill="white" />
                    <span>Begin</span>
                  </button>
                ) : loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-sans)'
                    }}>
                      Loading your sparks
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock NaviCues data
function getMockNaviCues(): NaviCue[] {
  return [
    {
      id: "navi.mirror.urgency",
      family: "statement_mirror",
      subtype: "mirror:statement",
      modality: "text",
      text_line: "Urgency is a feeling, not a fact.",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "Urgency vs Reality",
      response_type: "tap",
      response_options: {
        tap_options: ["Landed", "Meh", "Pass"]
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.mirror.deserving",
      family: "statement_mirror",
      subtype: "mirror:worth",
      modality: "text",
      text_line: "You don't earn rest. You're already worthy of it.",
      pillar_id: "P-02",
      pillar_name: "MEET YOUR NEEDS",
      pillar_color: "#2EC4B6",
      theme_name: "Rest & Worth",
      response_type: "breath",
      response_options: {
        breath_count: 3
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.mirror.enough",
      family: "statement_mirror",
      subtype: "mirror:completion",
      modality: "text",
      text_line: "Done is better than perfect, and you've already done enough.",
      pillar_id: "P-03",
      pillar_name: "MOVE YOUR BODY",
      pillar_color: "#F4A261",
      theme_name: "Enoughness",
      response_type: "slider",
      response_options: {
        slider_label: "How much do you believe this?",
        slider_min: 0,
        slider_max: 10
      },
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.probe.relief",
      family: "belief_probe",
      subtype: "probe:cost",
      modality: "text",
      text_line: "Relief now, regret later — what's the price tag today?",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "The Cost of Relief",
      response_type: "one_word",
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.probe.story",
      family: "belief_probe",
      subtype: "probe:narrative",
      modality: "text",
      text_line: "What story are you telling yourself about why you can't?",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Self Narrative",
      response_type: "one_word",
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.probe.avoiding",
      family: "belief_probe",
      subtype: "probe:avoidance",
      modality: "text",
      text_line: "What are you avoiding by staying busy?",
      pillar_id: "P-02",
      pillar_name: "MEET YOUR NEEDS",
      pillar_color: "#2EC4B6",
      theme_name: "Busyness as Armor",
      response_type: "hold",
      response_options: {
        hold_duration: 5
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.koan.control",
      family: "identity_koan",
      subtype: "koan:control",
      modality: "text",
      text_line: "If control made you safe, would it have worked by now?",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Control Patterns",
      response_type: "none",
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.koan.worthy",
      family: "identity_koan",
      subtype: "koan:identity",
      modality: "text",
      text_line: "Who would you be if you didn't have to prove your worth?",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Identity & Worth",
      response_type: "none",
      kbe_target: "knowing",
      is_curveball: true,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.koan.pain",
      family: "identity_koan",
      subtype: "koan:suffering",
      modality: "text",
      text_line: "What if the pain isn't the problem, but how you've been taught to fear it?",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "Pain & Fear",
      response_type: "breath",
      response_options: {
        breath_count: 5
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.paradox.kind",
      family: "paradox_prompt",
      subtype: "paradox:kind_no",
      modality: "text",
      text_line: "You can be kind and still say no.",
      pillar_id: "P-05",
      pillar_name: "SHOW YOURSELF",
      pillar_color: "#E84855",
      theme_name: "Boundaries",
      response_type: "binary",
      response_options: {
        binary_left: "Still learning",
        binary_right: "I know this"
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.paradox.heal",
      family: "paradox_prompt",
      subtype: "paradox:healing",
      modality: "text",
      text_line: "Healing doesn't mean the damage never happened. It means it no longer controls you.",
      pillar_id: "P-04",
      pillar_name: "CONNECT",
      pillar_color: "#FFB703",
      theme_name: "Healing",
      response_type: "tap",
      response_options: {
        tap_options: ["Needed this", "Not today", "Keep going"]
      },
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.paradox.both",
      family: "paradox_prompt",
      subtype: "paradox:duality",
      modality: "text",
      text_line: "You can be terrified and brave at the same time.",
      pillar_id: "P-05",
      pillar_name: "SHOW YOURSELF",
      pillar_color: "#E84855",
      theme_name: "Courage",
      response_type: "binary",
      response_options: {
        binary_left: "Trying to believe",
        binary_right: "Living it"
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.story.twominutes",
      family: "story_shard",
      subtype: "story:meeting",
      modality: "text",
      text_line: "He wrote 'I'm triggered' and waited two minutes. The meeting survived.",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "Pause Practice",
      response_type: "tap",
      response_options: {
        tap_options: ["I've done this", "I need this", "Tell me more"]
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.story.grocery",
      family: "story_shard",
      subtype: "story:mundane",
      modality: "text",
      text_line: "She cried in the grocery store parking lot, then bought herself flowers. Both mattered.",
      pillar_id: "P-02",
      pillar_name: "MEET YOUR NEEDS",
      pillar_color: "#2EC4B6",
      theme_name: "Self Compassion",
      response_type: "binary",
      response_options: {
        binary_left: "I've been there",
        binary_right: "I'm there now"
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.story.text",
      family: "story_shard",
      subtype: "story:boundaries",
      modality: "text",
      text_line: "Three times he typed the reply. Zero times he hit send. That was the boundary.",
      pillar_id: "P-05",
      pillar_name: "SHOW YOURSELF",
      pillar_color: "#E84855",
      theme_name: "Digital Boundaries",
      response_type: "tap",
      response_options: {
        tap_options: ["Relate", "Aspire to this", "Not ready"]
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.reframe.trigger",
      family: "reframe_seed",
      subtype: "reframe:trigger",
      modality: "text",
      text_line: "A trigger isn't a failure. It's your nervous system showing you where the work lives.",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Triggers as Data",
      response_type: "slider",
      response_options: {
        slider_label: "How new is this idea?",
        slider_min: 0,
        slider_max: 10
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.reframe.relapse",
      family: "reframe_seed",
      subtype: "reframe:relapse",
      modality: "text",
      text_line: "Relapse isn't the end of your story. It's a chapter that teaches you how to write the next one.",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "Relapse Reframe",
      response_type: "breath",
      response_options: {
        breath_count: 4
      },
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.reframe.rest",
      family: "reframe_seed",
      subtype: "reframe:productivity",
      modality: "text",
      text_line: "Rest isn't lazy. It's the most radical form of resistance in a culture that profits from your exhaustion.",
      pillar_id: "P-02",
      pillar_name: "MEET YOUR NEEDS",
      pillar_color: "#2EC4B6",
      theme_name: "Rest as Resistance",
      response_type: "tap",
      response_options: {
        tap_options: ["Amen", "Still fighting this", "New lens"]
      },
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.curve.dishwasher",
      family: "curveball",
      subtype: "curve:mundane",
      modality: "text",
      text_line: "You loaded the dishwasher. That counts as taking care of yourself today.",
      pillar_id: "P-02",
      pillar_name: "MEET YOUR NEEDS",
      pillar_color: "#2EC4B6",
      theme_name: "Tiny Wins",
      response_type: "tap",
      response_options: {
        tap_options: ["Needed to hear this", "Laughing", "Truth"]
      },
      kbe_target: "embodying",
      is_curveball: true,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.curve.3am",
      family: "curveball",
      subtype: "curve:night",
      modality: "text",
      text_line: "3am thoughts are liars. You're not making life decisions right now. You're going back to sleep.",
      pillar_id: "P-01",
      pillar_name: "PAUSE + GROUND",
      pillar_color: "#3E2BB8",
      theme_name: "Night Mind",
      response_type: "binary",
      response_options: {
        binary_left: "Fighting it",
        binary_right: "Trying to trust"
      },
      kbe_target: "knowing",
      is_curveball: true,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.curve.unfollow",
      family: "curveball",
      subtype: "curve:digital",
      modality: "text",
      text_line: "Unfollow that account. Your peace is worth more than being polite to a screen.",
      pillar_id: "P-05",
      pillar_name: "SHOW YOURSELF",
      pillar_color: "#E84855",
      theme_name: "Digital Boundaries",
      response_type: "tap",
      response_options: {
        tap_options: ["Done", "Not yet", "Considering"]
      },
      kbe_target: "embodying",
      is_curveball: true,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.mirror.progress",
      family: "statement_mirror",
      subtype: "mirror:progress",
      modality: "text",
      text_line: "Progress isn't linear. Some days you're building. Some days you're just not losing ground.",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Progress Reframe",
      response_type: "tap",
      response_options: {
        tap_options: ["Truth", "Hard to hear", "Needed this"]
      },
      kbe_target: "knowing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.paradox.messy",
      family: "paradox_prompt",
      subtype: "paradox:growth",
      modality: "text",
      text_line: "You can be a mess and still be making progress.",
      pillar_id: "P-06",
      pillar_name: "KNOW SELF",
      pillar_color: "#5739FB",
      theme_name: "Messy Progress",
      response_type: "binary",
      response_options: {
        binary_left: "Learning this",
        binary_right: "Living this"
      },
      kbe_target: "believing",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.reframe.boundary",
      family: "reframe_seed",
      subtype: "reframe:boundaries",
      modality: "text",
      text_line: "Saying no to them is saying yes to you.",
      pillar_id: "P-05",
      pillar_name: "SHOW YOURSELF",
      pillar_color: "#E84855",
      theme_name: "Boundary Practice",
      response_type: "breath",
      response_options: {
        breath_count: 3
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
    {
      id: "navi.story.walk",
      family: "story_shard",
      subtype: "story:movement",
      modality: "text",
      text_line: "She walked around the block when she wanted to text him. One lap became two. The urge passed.",
      pillar_id: "P-03",
      pillar_name: "MOVE YOUR BODY",
      pillar_color: "#F4A261",
      theme_name: "Movement as Pause",
      response_type: "tap",
      response_options: {
        tap_options: ["I've done this", "Want to try", "Powerful"]
      },
      kbe_target: "embodying",
      is_curveball: false,
      background_asset: DASHBOARD_ASSETS.navicues
    },
  ];
}
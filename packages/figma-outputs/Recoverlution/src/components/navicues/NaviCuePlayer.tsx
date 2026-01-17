/**
 * NaviCue Player - Full-screen Spark Experience
 * 
 * Philosophy:
 * - One cue at a time
 * - Minimal chrome
 * - Ephemeral (no history, no replays)
 * - Captures hesitation, valence, response
 * - Auto-advances after response
 * 
 * Design:
 * - Full viewport experience
 * - Soft background gradients
 * - Floating card in center
 * - Gentle transitions
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, Sparkles } from "lucide-react";
import { NaviCueCard, NaviCue, ResponseType } from "./NaviCueCard";
import { createClient } from "@supabase/supabase-js";

interface NaviCuePlayerProps {
  cues: NaviCue[];
  onComplete?: () => void;
  onExit?: () => void;
  className?: string;
}

export function NaviCuePlayer({ cues, onComplete, onExit, className = "" }: NaviCuePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentCue = cues[currentIndex];

  const handleResponse = async (responseType: ResponseType, value: any) => {
    setSaving(true);

    // TODO: Save to Supabase navicue_responses table
    // const supabase = createClient(...)
    // await supabase.from('navicue_responses').insert({
    //   navicue_id: currentCue.id,
    //   response_type: responseType,
    //   response_value: value.value,
    //   hesitation_ms: value.hesitationMs,
    //   ...
    // });

    console.log("Response captured:", {
      cue_id: currentCue.id,
      type: responseType,
      value: value.value,
      hesitation_ms: value.hesitationMs,
    });

    // Wait a moment for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Advance or complete
    if (currentIndex < cues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      onComplete?.();
    }

    setSaving(false);
  };

  const handleSkip = async () => {
    // Log skip as a response (no response = signal)
    await handleResponse("none", { value: null, hesitationMs: 0 });
  };

  const handleExit = () => {
    onExit?.();
  };

  if (completed) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md px-6"
        >
          <div 
            className="w-20 h-20 mx-auto bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center"
            style={{ borderRadius: "0px" }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h2 
              className="text-3xl text-gray-900"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Complete
            </h2>
            <p className="text-gray-600">
              What landed will echo. What did not will pass.
            </p>
          </div>

          <button
            onClick={handleExit}
            className="px-8 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-md hover:shadow-lg transition-all"
            style={{ borderRadius: "0px" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              Continue
            </span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 z-50 overflow-auto ${className}`}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleExit}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Exit
              </span>
            </button>

            {/* Progress */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} of {cues.length}
              </span>
              <div className="w-32 h-1 bg-gray-200" style={{ borderRadius: "0px" }}>
                <div
                  className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / cues.length) * 100}%`,
                    borderRadius: "0px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <AnimatePresence mode="wait">
          <NaviCueCard
            key={currentCue.id}
            cue={currentCue}
            onResponse={handleResponse}
            onSkip={handleSkip}
          />
        </AnimatePresence>
      </div>

      {/* Loading overlay */}
      {saving && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-[#5739FB] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

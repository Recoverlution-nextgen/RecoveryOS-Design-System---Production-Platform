/**
 * UNIVERSAL PLAYER
 * 
 * Routes any NaviCue to the correct rendering component based on component_type
 * This is the single source of truth for "how to render a NaviCue"
 * 
 * Supports:
 * - 12 new experience primitives
 * - Existing families from 3,000 batch
 * - Council lens variants
 * - Tier gating
 * - Response capture
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, StateSnapshot } from '../../types/navicue-contract';

// Import all component renderers
import { WitnessSwitchPlayer } from './components/WitnessSwitchPlayer';
import { TwoColumnRealityPlayer } from './components/TwoColumnRealityPlayer';
import { PartsRollcallPlayer } from './components/PartsRollcallPlayer';
import { ValuesForkPlayer } from './components/ValuesForkPlayer';
import { RecallCardCreatePlayer } from './components/RecallCardCreatePlayer';
import { RecallCardReturnPlayer } from './components/RecallCardReturnPlayer';
import { ProofStampCapturePlayer } from './components/ProofStampCapturePlayer';
import { RepairDraftPlayer } from './components/RepairDraftPlayer';
import { SanghaPingPlayer } from './components/SanghaPingPlayer';
import { StorySeedPlayer } from './components/StorySeedPlayer';
import { ParadoxKeySafePlayer } from './components/ParadoxKeySafePlayer';
import { SomaticMapTapPlayer } from './components/SomaticMapTapPlayer';

// Existing family players
import { BeliefProbePlayer } from './components/BeliefProbePlayer';
import { StatementMirrorPlayer } from './components/StatementMirrorPlayer';
import { PracticePlayer } from './components/PracticePlayer';
import { ReframeSeedPlayer } from './components/ReframeSeedPlayer';
import { IdentityKoanPlayer } from './components/IdentityKoanPlayer';
import { ParadoxPromptPlayer } from './components/ParadoxPromptPlayer';
import { StoryShardPlayer } from './components/StoryShardPlayer';
import { CurveballPlayer } from './components/CurveballPlayer';
import { GripScanPlayer } from './components/GripScanPlayer';
import { AllowingGatePlayer } from './components/AllowingGatePlayer';
import { ReleasePromptPlayer } from './components/ReleasePromptPlayer';
import { StoryDropPlayer } from './components/StoryDropPlayer';
import { InventorySparkPlayer } from './components/InventorySparkPlayer';
import { ProofStampPlayer } from './components/ProofStampPlayer';

import { GenericPromptPlayer } from './components/GenericPromptPlayer';

interface UniversalPlayerProps {
  navicue: NavicuePlayerDTO;
  userState?: StateSnapshot;
  onResponse?: (response: any, statePost?: StateSnapshot) => void;
  onRotate?: () => void;
  selectedVariantIndex?: number;
}

export function UniversalPlayer({
  navicue,
  userState,
  onResponse,
  onRotate,
  selectedVariantIndex = 0,
}: UniversalPlayerProps) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(selectedVariantIndex);
  
  // Get current variant (default to first)
  const variant = navicue.variants[currentVariantIndex] || navicue.variants[0];
  
  if (!variant) {
    return (
      <div className="p-8 bg-red-900/20 border border-red-700 text-red-200">
        <div className="font-bold mb-2">No Variants Available</div>
        <div className="text-sm opacity-80">NaviCue {navicue.code} has no variants defined.</div>
      </div>
    );
  }
  
  const handleRotate = () => {
    const nextIndex = (currentVariantIndex + 1) % navicue.variants.length;
    setCurrentVariantIndex(nextIndex);
    onRotate?.();
  };
  
  const handleResponse = (response: any, statePost?: StateSnapshot) => {
    onResponse?.(response, statePost);
  };
  
  // Common props for all players
  const commonProps = {
    navicue,
    variant,
    userState,
    onResponse: handleResponse,
  };
  
  // Route to correct component based on component_type
  const renderPlayer = () => {
    switch (navicue.component_type) {
      // NEW EXPERIENCE PRIMITIVES
      case 'witness_switch':
        return <WitnessSwitchPlayer {...commonProps} />;
      
      case 'two_column_reality':
        return <TwoColumnRealityPlayer {...commonProps} />;
      
      case 'parts_rollcall':
        return <PartsRollcallPlayer {...commonProps} />;
      
      case 'values_fork':
        return <ValuesForkPlayer {...commonProps} />;
      
      case 'recall_card_create':
        return <RecallCardCreatePlayer {...commonProps} />;
      
      case 'recall_card_return':
        return <RecallCardReturnPlayer {...commonProps} />;
      
      case 'proof_stamp_capture':
        return <ProofStampCapturePlayer {...commonProps} />;
      
      case 'repair_draft':
        return <RepairDraftPlayer {...commonProps} />;
      
      case 'sangha_ping':
        return <SanghaPingPlayer {...commonProps} />;
      
      case 'story_seed':
        return <StorySeedPlayer {...commonProps} />;
      
      case 'paradox_key_safe':
        return <ParadoxKeySafePlayer {...commonProps} />;
      
      case 'somatic_map_tap':
        return <SomaticMapTapPlayer {...commonProps} />;
      
      // EXISTING FAMILIES
      case 'statement_mirror':
        return <StatementMirrorPlayer {...commonProps} />;
      
      case 'belief_probe':
        return <BeliefProbePlayer {...commonProps} />;
      
      case 'reframe_seed':
        return <ReframeSeedPlayer {...commonProps} />;
      
      case 'identity_koan':
        return <IdentityKoanPlayer {...commonProps} />;
      
      case 'paradox_prompt':
        return <ParadoxPromptPlayer {...commonProps} />;
      
      case 'practice':
        return <PracticePlayer {...commonProps} />;
      
      case 'story_shard':
        return <StoryShardPlayer {...commonProps} />;
      
      case 'curveball':
        return <CurveballPlayer {...commonProps} />;
      
      case 'grip_scan':
        return <GripScanPlayer {...commonProps} />;
      
      case 'allowing_gate':
        return <AllowingGatePlayer {...commonProps} />;
      
      case 'release_prompt':
        return <ReleasePromptPlayer {...commonProps} />;
      
      case 'story_drop':
        return <StoryDropPlayer {...commonProps} />;
      
      case 'inventory_spark':
        return <InventorySparkPlayer {...commonProps} />;
      
      case 'proof_stamp':
        return <ProofStampPlayer {...commonProps} />;
      
      default:
        return (
          <div className="p-8 bg-yellow-900/20 border border-yellow-700 text-yellow-200">
            <div className="font-bold mb-2">Unknown Component Type</div>
            <div className="text-sm opacity-80">
              Component type "{navicue.component_type}" does not have a renderer.
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="relative">
      {/* Top Bar - Metadata + Rotate */}
      <div className="flex items-center justify-between mb-4 p-4 bg-zinc-900/50 border border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="font-mono text-[#5739FB] font-bold">{navicue.code}</div>
          <div className="text-xs opacity-60">
            {navicue.kbe_layer} · {navicue.tier} · {navicue.component_type}
          </div>
          <div className="px-2 py-1 bg-[#3E2BB8] text-xs">
            {variant.lens}
          </div>
        </div>
        
        {navicue.variants.length > 1 && (
          <button
            onClick={handleRotate}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-sm"
          >
            Different Angle ({currentVariantIndex + 1}/{navicue.variants.length})
          </button>
        )}
      </div>
      
      {/* Player Body */}
      <div className="bg-zinc-900/30 border border-zinc-800">
        {renderPlayer()}
      </div>
      
      {/* Debug Info (Optional) */}
      {userState && (
        <div className="mt-4 p-3 bg-zinc-900/50 border border-zinc-800 text-xs opacity-60">
          <div className="font-bold mb-1">Current State</div>
          <div className="grid grid-cols-4 gap-2">
            <div>Heat: {userState.heat || 0}/10</div>
            <div>Fusion: {userState.fusion || 0}/10</div>
            <div>Resistance: {userState.resistance || 0}/10</div>
            <div>Choice: {userState.choice_access || 0}/10</div>
          </div>
        </div>
      )}
    </div>
  );
}
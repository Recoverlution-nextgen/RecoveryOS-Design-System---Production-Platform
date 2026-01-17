/**
 * CLINICAL SR BATCH PAGE
 * 50 Stress Resilience NaviCues from arsenal
 */

import React, { useState } from 'react';
import ClinicalSR from '../../navicues/arsenal/clinical-batch-02-SR';

const navicues = [
  // HPA Axis & Cortisol Response (10)
  { id: 'cortisol-curve', name: 'Cortisol Curve Mapper', component: ClinicalSR.CortisolCurveMapper, desc: 'Track your natural daily cortisol rhythm' },
  { id: 'hpa-activation', name: 'HPA Axis Activation', component: ClinicalSR.HPAAxisActivation, desc: 'Hypothalamus → Pituitary → Adrenal cascade' },
  { id: 'adrenal-fatigue', name: 'Adrenal Fatigue Detector', component: ClinicalSR.AdrenalFatigueDetector, desc: 'Chronic stress depletion assessment' },
  { id: 'cortisol-rhythm', name: 'Cortisol Rhythm Tracker', component: ClinicalSR.CortisolRhythmTracker, desc: 'Map energy levels across 6 timepoints' },
  { id: 'hormone-balance', name: 'Stress Hormone Balance', component: ClinicalSR.StressHormoneBalance, desc: 'Cortisol vs DHEA ratio analyzer' },
  { id: 'acute-chronic', name: 'Acute vs Chronic Stress', component: ClinicalSR.AcuteVsChronicStress, desc: 'Duration determines damage' },
  { id: 'fight-flight-freeze', name: 'Fight, Flight, or Freeze', component: ClinicalSR.FightFlightFreeze, desc: 'Identify your automatic response' },
  { id: 'sympathetic-para', name: 'Sympathetic vs Parasympathetic', component: ClinicalSR.SympatheticVsParasympathetic, desc: 'Gas pedal or brake toggle' },
  { id: 'response-flex', name: 'Stress Response Flexibility', component: ClinicalSR.StressResponseFlexibility, desc: 'Can you shift state on demand?' },
  { id: 'catecholamine', name: 'Catecholamine Flood', component: ClinicalSR.CatecholamineFlood, desc: 'Adrenaline surge simulator' },
  
  // Allostatic Load (10)
  { id: 'allostatic-calc', name: 'Allostatic Load Calculator', component: ClinicalSR.AllostaticLoadCalculator, desc: 'Cumulative wear and tear assessment' },
  { id: 'cumulative-stress', name: 'Cumulative Stress Tracker', component: ClinicalSR.CumulativeStressTracker, desc: 'Stack of stressors over time' },
  { id: 'inflammation', name: 'Systemic Inflammation Marker', component: ClinicalSR.SystemicInflammationMarker, desc: 'Chronic inflammation detection' },
  { id: 'metabolic', name: 'Metabolic Dysregulation', component: ClinicalSR.MetabolicDysregulation, desc: 'Blood sugar and insulin impacts' },
  { id: 'cardiovascular', name: 'Cardiovascular Wear & Tear', component: ClinicalSR.CardiovascularWearTear, desc: 'Heart and blood vessel stress' },
  { id: 'immune', name: 'Immune Suppression Gauge', component: ClinicalSR.ImmuneSuppressionGauge, desc: 'Stress impacts on immune function' },
  { id: 'body-burden', name: 'Body Burden Assessment', component: ClinicalSR.BodyBurdenAssessment, desc: 'Total physiological load' },
  { id: 'regulatory', name: 'Regulatory Systems Check', component: ClinicalSR.RegulatorySystems, desc: 'Homeostatic balance monitor' },
  { id: 'biomarkers', name: 'Biomarker Panel', component: ClinicalSR.BiomarkerPanel, desc: 'Multiple stress indicators' },
  { id: 'weathering', name: 'Weathering Effect', component: ClinicalSR.WeatheringEffect, desc: 'Accelerated aging from stress' },
  
  // Recovery & Restoration (10)
  { id: 'recovery-ratio', name: 'Recovery Ratio Tracker', component: ClinicalSR.RecoveryRatioTracker, desc: 'Stress vs recovery time balance' },
  { id: 'para-rebound', name: 'Parasympathetic Rebound Timer', component: ClinicalSR.ParasympatheticReboundTimer, desc: 'Return to calm measurement' },
  { id: 'hrv-coherence', name: 'HRV Coherence Meter', component: ClinicalSR.HRVCoherenceMeter, desc: 'Heart rate variability optimizer' },
  { id: 'restoration-window', name: 'Restoration Window Detector', component: ClinicalSR.RestorationWindowDetector, desc: 'Optimal recovery timing' },
  { id: 'sleep-architecture', name: 'Sleep Architecture Map', component: ClinicalSR.SleepArchitectureMap, desc: 'Deep, REM, light sleep cycles' },
  { id: 'active-recovery', name: 'Active Recovery Practices', component: ClinicalSR.ActiveRecoveryPractices, desc: 'Movement-based restoration' },
  { id: 'passive-recovery', name: 'Passive Recovery Time', component: ClinicalSR.PassiveRecoveryTime, desc: 'Rest and stillness tracker' },
  { id: 'downtime-deficit', name: 'Downtime Deficit Tracker', component: ClinicalSR.DowntimeDeficitTracker, desc: 'Accumulated recovery debt' },
  { id: 'energy-envelope', name: 'Energy Envelope Monitor', component: ClinicalSR.EnergyEnvelopeMonitor, desc: 'Available energy capacity' },
  { id: 'replenishment', name: 'Replenishment Rituals', component: ClinicalSR.ReplenishmentRituals, desc: 'Practices that restore' },
  
  // Hormesis & Growth (10)
  { id: 'stress-dose', name: 'Stress Dose Finder', component: ClinicalSR.StressDoseFinder, desc: 'Optimal challenge level (hormesis)' },
  { id: 'hormesis-zone', name: 'Hormesis Zone Identifier', component: ClinicalSR.HormesisZoneIdentifier, desc: 'Sweet spot of beneficial stress' },
  { id: 'optimal-exposure', name: 'Optimal Stress Exposure', component: ClinicalSR.OptimalStressExposure, desc: 'Right amount at right time' },
  { id: 'adaptive-response', name: 'Adaptive Response Builder', component: ClinicalSR.AdaptiveResponseBuilder, desc: 'Strengthen through challenge' },
  { id: 'challenge-threat', name: 'Challenge vs Threat Appraisal', component: ClinicalSR.ChallengeVsThreratAppraisal, desc: 'Mindset shift detector' },
  { id: 'growth-zone', name: 'Growth Zone Calibrator', component: ClinicalSR.GrowthZoneCalibrator, desc: 'Between comfort and panic' },
  { id: 'eustress-distress', name: 'Eustress vs Distress', component: ClinicalSR.EustressVsDistress, desc: 'Good stress vs bad stress' },
  { id: 'inoculation', name: 'Stress Inoculation Protocol', component: ClinicalSR.StressInoculationProtocol, desc: 'Build immunity to stressors' },
  { id: 'antifragile', name: 'Antifragile Adaptation', component: ClinicalSR.AntifragileAdaptation, desc: 'Gain from disorder' },
  { id: 'intermittent', name: 'Intermittent Stressors', component: ClinicalSR.IntermittentStressors, desc: 'Periodic exposure benefits' },
  
  // Resilience Factors (10)
  { id: 'resilience-quotient', name: 'Resilience Quotient Builder', component: ClinicalSR.ResilienceQuotientBuilder, desc: 'Overall resilience capacity' },
  { id: 'adaptive-capacity', name: 'Adaptive Capacity Gauge', component: ClinicalSR.AdaptiveCapacityGauge, desc: 'Flexibility under pressure' },
  { id: 'ptg', name: 'Post-Traumatic Growth Marker', component: ClinicalSR.PostTraumaticGrowthMarker, desc: 'Growth through adversity' },
  { id: 'protective-factors', name: 'Protective Factors Inventory', component: ClinicalSR.ProtectiveFactorsInventory, desc: 'What buffers you from stress' },
  { id: 'coping-repertoire', name: 'Coping Repertoire Expander', component: ClinicalSR.CopingRepertoireExpander, desc: 'Diversify your strategies' },
  { id: 'resourcefulness', name: 'Resourcefulness Rating', component: ClinicalSR.ResourcefulnessRating, desc: 'Use what you have creatively' },
  { id: 'bounce-back', name: 'Bounce-Back Speed', component: ClinicalSR.BounceBackSpeed, desc: 'Recovery velocity after setback' },
  { id: 'thriving-surviving', name: 'Thriving vs Surviving', component: ClinicalSR.ThrivingVsSurviving, desc: 'Beyond mere survival' },
  { id: 'adversity-advantage', name: 'Adversity Advantage', component: ClinicalSR.AdversityAdvantage, desc: 'Turn obstacles into fuel' },
  { id: 'grit', name: 'Grit and Perseverance', component: ClinicalSR.GritAndPerseverance, desc: 'Long-term passion and persistence' },
];

interface ClinicalSRBatchProps {
  onNavigate?: (page: string) => void;
}

export function ClinicalSRBatch({ onNavigate }: ClinicalSRBatchProps) {
  const [activeNaviCue, setActiveNaviCue] = useState<number | null>(null);

  if (activeNaviCue !== null) {
    const NaviCueComponent = navicues[activeNaviCue].component;
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
          <button
            onClick={() => setActiveNaviCue(null)}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to SR Arsenal
          </button>
        </div>
        <NaviCueComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          {onNavigate && (
            <button
              onClick={() => onNavigate('navicue-arsenal')}
              className="text-sm mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              ← Back to NaviCue Arsenal
            </button>
          )}
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
            PILLAR SR
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Stress Resilience Arsenal
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            50 NaviCues for HPA axis, allostatic load, recovery, hormesis, and resilience building
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>HPA Axis</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Allostatic Load</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Recovery</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Hormesis</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>10</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Resilience</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {navicues.map((nc, idx) => (
            <button
              key={nc.id}
              onClick={() => setActiveNaviCue(idx)}
              className="p-8 text-left transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.2)',
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: '#5739FB' }}>
                SR-{String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
                {nc.name}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {nc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClinicalSRBatch;

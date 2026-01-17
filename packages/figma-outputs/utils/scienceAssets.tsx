/**
 * SCIENCE ASSETS - CENTRAL REPOSITORY
 * Created: November 6, 2025
 * 
 * Single source of truth for all Science page assets.
 * Any asset updates here automatically propagate to:
 * - SciencePageArchitecture.tsx
 * - SciencePageEvidence.tsx  
 * - Section7ValidatedByScienceV2.tsx (Homepage)
 * 
 * Philosophy: ONE ASSET, ONE UPDATE, PERFECT SYNC
 */

// ============================================================================
// ARCHITECTURE ASSETS - Nov 6, 2025 Optimized (TinyPNG, on-brand)
// ============================================================================
// OS/ORBIT/PROOF - The three core architecture pillars

export { default as archOSOptimized } from 'figma:asset/87e260a93dbce90019479377298d5fd141884482.png';
export { default as archORBITOptimized } from 'figma:asset/7f9a253f1ad236f54e1546487858f189c6f824d8.png';
export { default as archPROOFOptimized } from 'figma:asset/a4f67fae756b11dad0e2a6948823c8bedfc5c79c.png';

// ============================================================================
// EVIDENCE ASSETS - Shared across Science Page + Homepage Section 7
// ============================================================================
// These 4 stats appear in TWO places:
// 1. Science Page → Evidence Based section
// 2. Homepage → Section 7 "Validated by Science"
//
// IMPORTANT: Update these assets and BOTH sections update automatically

// BATCH 7 - Part 1 (Uploaded Nov 6, 2025) - First 2 of 4 Evidence stats
export { default as evidenceMemoryOptimized } from 'figma:asset/82cd1d1be9ed95a32e34a37713ac52cabf0c898c.png';
export { default as evidenceEngagementOptimized } from 'figma:asset/ee343be3dac43646355541fb4dececf3f511b0ce.png';

// BATCH 7 - Part 2 (Uploaded Nov 6, 2025) - FINAL 2 Evidence stats ✨
export { default as evidenceBehaviorOptimized } from 'figma:asset/d9c1e9907948b74b73a6ddff58f8385a46ebde99.png';
export { default as evidenceRelapseOptimized } from 'figma:asset/6972e62a1a5cc67d06d4bd3b67a7ae5732d7966b.png';

// ============================================================================
// ALL 4 LEGACY ASSETS REPLACED - SAFE TO DELETE IN FINAL CLEANUP
// ============================================================================
// - Memory: b2198e56db47fcf7e3f6d502d69231bc8901f59e.png → REPLACED ✅
// - Behavior: e522094db1b086e536ab837ad925a397cd1fd542.png → REPLACED ✅
// - Engagement: f2c0ea740b6b6725dd0ec99b9e1b7e522ddff55b.png → REPLACED ✅
// - Relapse: 320b892ab31a00a77c58c286a6f9fe53043870bc.png → REPLACED ✅
// ============================================================================

/**
 * Micro-Motion: Seal, snap, settle, glide (regulation-grade)
 * Animation primitives with physiological intent
 */

import type { AssetWithFamily } from '../types/asset-families';

/**
 * Seal Motion — proof capture confirmation
 */
export const SEAL_MOTION: AssetWithFamily = {
  id: 'micro-motion-seal',
  slug: 'seal-motion',
  title: 'Seal',
  narrative: 'Proof capture confirmed — compress, hold, release. Dopamine + validation.',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'seal',
    regulation: 'neutral',
    duration: 400,
    easing: 'spring',
    haptic: 'medium',
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/seal.json',
  alt: 'Button compresses, holds, releases with success confirmation',
  dimensions: { width: 200, height: 200 },
  etchedCopy: {
    text: '✓',
    position: 'center',
    style: 'illuminated',
    typography: {
      family: 'SF Pro Display',
      size: 64,
      weight: 700,
      letterSpacing: 0,
      lineHeight: 1,
    },
    color: 'hsla(160, 70%, 48%, 1)',
    blend: 'screen',
  },
  usedIn: ['companion'],
  elevation: 'raised',
};

/**
 * Snap Motion — quick toggle/switch
 */
export const SNAP_MOTION: AssetWithFamily = {
  id: 'micro-motion-snap',
  slug: 'snap-motion',
  title: 'Snap',
  narrative: 'Instant state change — toggle snaps to position with satisfying click',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'snap',
    regulation: 'activating',
    duration: 180,
    easing: 'spring',
    haptic: 'light',
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/snap.json',
  alt: 'Toggle switch snaps to new position with bounce',
  dimensions: { width: 80, height: 40 },
  usedIn: ['companion', 'console'],
  elevation: 'surface',
};

/**
 * Settle Motion — element coming to rest
 */
export const SETTLE_MOTION: AssetWithFamily = {
  id: 'micro-motion-settle',
  slug: 'settle-motion',
  title: 'Settle',
  narrative: 'Element finds its place — gentle deceleration, no jarring stop',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'settle',
    regulation: 'calming',
    duration: 600,
    easing: 'spring',
    haptic: undefined,
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/settle.json',
  alt: 'Element settles into position with damped spring',
  dimensions: { width: 400, height: 300 },
  usedIn: ['companion', 'console', 'command'],
  elevation: 'surface',
};

/**
 * Glide Motion — smooth continuous movement
 */
export const GLIDE_MOTION: AssetWithFamily = {
  id: 'micro-motion-glide',
  slug: 'glide-motion',
  title: 'Glide',
  narrative: 'Effortless movement — no friction, no resistance, just flow',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'glide',
    regulation: 'neutral',
    duration: 300,
    easing: 'ease-out',
    haptic: undefined,
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/glide.json',
  alt: 'Element glides across screen with constant velocity',
  dimensions: { width: 600, height: 100 },
  usedIn: ['companion', 'console'],
  elevation: 'surface',
};

/**
 * Pulse Motion — attention signal (non-alarming)
 */
export const PULSE_MOTION: AssetWithFamily = {
  id: 'micro-motion-pulse',
  slug: 'pulse-motion',
  title: 'Pulse',
  narrative: 'Gentle attention signal — not alarm, just "look here"',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'pulse',
    regulation: 'neutral',
    duration: 1200,
    easing: 'ease-out',
    haptic: undefined,
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/pulse.json',
  alt: 'Element pulses with subtle scale and opacity change',
  dimensions: { width: 200, height: 200 },
  usedIn: ['companion', 'console'],
  elevation: 'raised',
};

/**
 * Breathe Motion — slow rhythmic expansion/contraction
 */
export const BREATHE_MOTION: AssetWithFamily = {
  id: 'micro-motion-breathe',
  slug: 'breathe-motion',
  title: 'Breathe',
  narrative: 'Regulation-grade rhythm — 4s in, 4s out, encourages co-regulation',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'breathe',
    regulation: 'calming',
    duration: 8000,
    easing: 'ease-out',
    haptic: undefined,
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/breathe.json',
  alt: 'Circle expands and contracts in 4-4 breath rhythm',
  dimensions: { width: 300, height: 300 },
  etchedCopy: {
    text: 'In · · · Out',
    position: 'center',
    style: 'transparent',
    typography: {
      family: 'SF Pro Text',
      size: 18,
      weight: 400,
      letterSpacing: 0.08,
      lineHeight: 1,
    },
    color: 'hsla(0, 0%, 100%, 0.3)',
    blend: 'overlay',
  },
  usedIn: ['companion'],
  elevation: 'raised',
};

/**
 * Escalation Shake — urgent attention (used sparingly)
 */
export const ESCALATION_SHAKE: AssetWithFamily = {
  id: 'micro-motion-escalation-shake',
  slug: 'escalation-shake',
  title: 'Escalation Shake',
  narrative: 'Urgent signal — shake 2-4x then settle. Only for true escalations.',
  family: 'micro-motion',
  familyMetadata: {
    family: 'micro-motion',
    motionType: 'seal', // Uses seal but with shake pattern
    regulation: 'activating',
    duration: 600,
    easing: 'spring',
    haptic: 'heavy',
  },
  format: 'json-lottie',
  source: '/assets/micro-motion/escalation-shake.json',
  alt: 'Element shakes horizontally then settles',
  dimensions: { width: 400, height: 300 },
  usedIn: ['companion', 'console'],
  elevation: 'floating',
};

/**
 * Export all micro-motion assets
 */
export const MICRO_MOTION_ASSETS: AssetWithFamily[] = [
  SEAL_MOTION,
  SNAP_MOTION,
  SETTLE_MOTION,
  GLIDE_MOTION,
  PULSE_MOTION,
  BREATHE_MOTION,
  ESCALATION_SHAKE,
];

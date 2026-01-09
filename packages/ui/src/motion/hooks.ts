import React from 'react';
import { motionConfig } from './config';

/**
 * useProofCapture: Orchestrates seal → success → receipt cascade
 */
export function useProofCapture() {
  const [capturing, setCapturing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const trigger = React.useCallback(async () => {
    setCapturing(true);
    // Seal button compresses
    await new Promise((r) => setTimeout(r, motionConfig.duration.micro));
    // Success pulse
    setSuccess(true);
    await new Promise((r) => setTimeout(r, motionConfig.duration.base));
    // Reset for next capture
    setCapturing(false);
    setSuccess(false);
  }, []);

  return { capturing, success, trigger };
}

/**
 * useViewTransition: Orchestrates view cross-fade + stagger
 */
export function useViewTransition(view: string) {
  const [isChanging, setIsChanging] = React.useState(false);

  React.useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), motionConfig.duration.fast);
    return () => clearTimeout(timer);
  }, [view]);

  return { isChanging };
}

/**
 * useHeatShift: Animates theme color/contrast transition
 */
export function useHeatShift(mode: 'calm' | 'heat') {
  const [shifting, setShifting] = React.useState(false);

  React.useEffect(() => {
    setShifting(true);
    const timer = setTimeout(() => setShifting(false), motionConfig.duration.slow);
    return () => clearTimeout(timer);
  }, [mode]);

  return { shifting };
}

/**
 * useEscalationAlert: Orchestrates alert pulse + shake
 */
export function useEscalationAlert() {
  const [alerting, setAlerting] = React.useState(false);

  const trigger = React.useCallback(async () => {
    setAlerting(true);
    await new Promise((r) => setTimeout(r, motionConfig.duration.ceremony));
    setAlerting(false);
  }, []);

  return { alerting, trigger };
}

/**
 * useStagger: Calculates stagger timing for list items
 */
export function useStagger(index: number, total: number) {
  const delayPerItem = motionConfig.transitions.viewChange.stagger * 1000; // ms
  return {
    delay: index * delayPerItem,
    duration: motionConfig.duration.base,
  };
}

/**
 * useReducedMotion: Respects prefers-reduced-motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return prefersReduced;
}

import React from 'react';
import { RecoveryOSEvent, IntegrityLog, ProofStatus } from '../types/events';

/**
 * useEventCapture: Simple event store
 * Maintains proof stack and audit log.
 */
interface EventStoreState {
  events: RecoveryOSEvent[];
  logs: IntegrityLog[];
  sequence: number;
}

export function useEventCapture() {
  const [state, setState] = React.useState<EventStoreState>(() => {
    try {
      const stored = localStorage.getItem('recovery-events');
      return stored ? JSON.parse(stored) : { events: [], logs: [], sequence: 0 };
    } catch {
      return { events: [], logs: [], sequence: 0 };
    }
  });

  const addEvent = React.useCallback(
    (event: RecoveryOSEvent, log: IntegrityLog) => {
      event.sequence = state.sequence + 1;
      const next = {
        events: [...state.events, event],
        logs: [...state.logs, log],
        sequence: state.sequence + 1,
      };
      localStorage.setItem('recovery-events', JSON.stringify(next));
      setState(next);
    },
    [state.sequence, state.events, state.logs],
  );

  const proofEntries = state.events.map((e) => ({
    id: e.delivery_id,
    label: e.contract.primitive,
    status: e.status as ProofStatus,
    timestamp: new Date(e.timestamp).toLocaleString(),
    intent: e.contract.aim,
    target: e.contract.target,
    dose: e.contract.dose,
  }));

  const exportLog = () => {
    const data = {
      timestamp: new Date().toISOString(),
      events: state.events,
      integrity_audit: state.logs,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recovery-os-audit-${Date.now()}.json`;
    a.click();
  };

  const reset = () => {
    localStorage.removeItem('recovery-events');
    setState({ events: [], logs: [], sequence: 0 });
  };

  return { events: state.events, logs: state.logs, proofEntries, addEvent, exportLog, reset };
}

/**
 * useThemePersistence: Sync theme to localStorage
 */
export function useThemePersistence() {
  const [theme, setTheme] = React.useState<'calm' | 'heat'>(() => {
    try {
      const stored = localStorage.getItem('recovery-theme');
      return (stored as 'calm' | 'heat') || 'calm';
    } catch {
      return 'calm';
    }
  });

  React.useEffect(() => {
    localStorage.setItem('recovery-theme', theme);
    document.body.classList.remove('theme-calm', 'theme-heat');
    document.body.classList.add(theme === 'heat' ? 'theme-heat' : 'theme-calm');
  }, [theme]);

  return { theme, setTheme };
}

/**
 * useConsent: Manage consent scope state
 */
export function useConsent(initial?: boolean) {
  const [scopes, setScopes] = React.useState([
    {
      id: 'state-signals',
      label: 'State signals',
      description: 'Energy, clarity, anchorage — pulled on request only.',
      enabled: initial ?? true,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Moment nudges when heat is rising.',
      enabled: initial ?? true,
    },
    {
      id: 'escalation',
      label: 'Escalation contact',
      description: 'Allow LUMA to reach your chosen person per protocol.',
      enabled: initial ?? false,
      required: false,
    },
  ]);

  const toggle = (id: string, next: boolean) => {
    setScopes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: next } : s)),
    );
  };

  return { scopes, toggle };
}

/**
 * useQuietHours: Manage quiet hours
 */
export function useQuietHours(defaultStart = '21:00', defaultEnd = '07:00') {
  const [hours, setHours] = React.useState<{ start: string; end: string }>(() => {
    try {
      const stored = localStorage.getItem('recovery-quiet-hours');
      return stored ? JSON.parse(stored) : { start: defaultStart, end: defaultEnd };
    } catch {
      return { start: defaultStart, end: defaultEnd };
    }
  });

  React.useEffect(() => {
    localStorage.setItem('recovery-quiet-hours', JSON.stringify(hours));
  }, [hours]);

  const isQuietNow = () => {
    const now = new Date();
    const curr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (hours.start < hours.end) {
      return curr >= hours.start && curr < hours.end;
    }
    // Wraps midnight
    return curr >= hours.start || curr < hours.end;
  };

  return {
    hours,
    setHours,
    isQuietNow,
  };
}

import React from 'react';
import {
  // Legacy components
  NaviCueCard,
  ProofStack,
  UniversalPlayer,
  ERALane,
  StateChip,
  ConsentSheet,
  QuietHoursPicker,
  EscalationChooser,
  Console,
  CommandCenter,
  useThemePersistence,
  useEventCapture,
  useConsent,
  useQuietHours,
  createEvent,
  createIntegrityLog,
  // Motion imports
  MotionView,
  MotionList,
  MotionProofPill,
  MotionAlert,
  useProofCapture,
  useViewTransition,
  useHeatShift,
  useEscalationAlert,
  useReducedMotion,
  // Asset imports
  AssetCard,
  SENSE_ROUTE_DELIVER_SEAL_HERO,
  ERA_CADENCE_HERO,
  THREE_ALTITUDES_HERO,
  PROOF_STACKING_ASSET,
  // Continuity Layer
  ContinuityDemo,
  OSRevealDemo,
  // Portal
  RecoveryOSPortal,
  // Website components
  WalkthroughPresenter,
  // Icon system
  Icon,
  IconGrid,
} from '@ui';

const proofEntries = [
  {
    id: 'p1',
    label: 'Baseline micro-receipt',
    status: 'captured' as const,
    timestamp: 'Today 09:12',
    intent: 'Hold under load',
    target: 'Arousal regulation',
    dose: '30s',
  },
  {
    id: 'p2',
    label: 'Alignment move',
    status: 'pending' as const,
    timestamp: 'Queued',
    intent: 'Route next move',
    target: 'Choice space',
    dose: '45s',
  },
];

export default function App() {
  const { theme, setTheme } = useThemePersistence();
  const { events, logs, proofEntries: capturedProofs, addEvent, exportLog, reset } = useEventCapture();
  const { scopes, toggle } = useConsent(true);
  const { hours, setHours, isQuietNow } = useQuietHours();
  const [view, setView] = React.useState<'companion' | 'console' | 'command' | 'continuity' | 'reveal' | 'portal' | 'walkthrough' | 'icons'>('companion');

  // Motion orchestration
  const { capturing, success, trigger: triggerProofCapture } = useProofCapture();
  const { isChanging } = useViewTransition(view);
  const { shifting } = useHeatShift(theme);
  const { alerting } = useEscalationAlert();
  const prefersReduced = useReducedMotion();


  return (
    <div
      style={{
        padding: 24,
        display: 'grid',
        gap: 16,
        background: 'var(--color-surface-base)',
        minHeight: '100vh',
      }}
    >
      <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <StateChip label="Energy" value="Stable" tone="safe" />
          <StateChip label="Clarity" value="Focused" tone="safe" />
          <StateChip label="Anchorage" value="Centered" tone="caution" />
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="label">View</span>
          <button className={`button ${view === 'companion' ? '' : 'secondary'}`} onClick={() => setView('companion')}>
            Companion
          </button>
          <button className={`button ${view === 'console' ? '' : 'secondary'}`} onClick={() => setView('console')}>
            Console
          </button>
          <button className={`button ${view === 'command' ? '' : 'secondary'}`} onClick={() => setView('command')}>
            Command
          </button>
          <button className={`button ${view === 'continuity' ? '' : 'secondary'}`} onClick={() => setView('continuity')}>
            Continuity
          </button>
          <button className={`button ${view === 'reveal' ? '' : 'secondary'}`} onClick={() => setView('reveal')}>
            OS Reveal
          </button>
          <button className={`button ${view === 'portal' ? '' : 'secondary'}`} onClick={() => setView('portal')}>
            Portal
          </button>
          <button className={`button ${view === 'walkthrough' ? '' : 'secondary'}`} onClick={() => setView('walkthrough')}>
            Walkthrough
          </button>
          <button className={`button ${view === 'icons' ? '' : 'secondary'}`} onClick={() => setView('icons')}>
            Icons
          </button>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="label">Theme</span>
          <button className="button secondary" onClick={() => setTheme('calm')}>
            Calm
          </button>
          <button className="button" onClick={() => setTheme('heat')}>
            Heat
          </button>
          <button className="button secondary" onClick={exportLog}>
            Export audit
          </button>
          <button className="button secondary" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <MotionView isExiting={isChanging} variant="fade">
        {view === 'companion' && (
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Hero Asset: Sense→Route→Deliver→Seal */}
            <AssetCard asset={SENSE_ROUTE_DELIVER_SEAL_HERO} interactive={false} />

            <UniversalPlayer
              title="Downshift under load"
              description="Deliver the right primitive, seal proof"
              status="pending"
              contract={{
                target: 'Arousal regulation',
                mechanism: 'Breath + orient',
                primitive: 'Box breath 4x',
                heatBand: 'caution',
                proofRequest: 'Capture felt shift in 45s',
                duration: '00:45',
              }}
              onSeal={() => {
                triggerProofCapture();
                const event = createEvent(
                  {
                    target: 'Arousal regulation',
                    aim: 'Lower activation',
                    dose: '45s',
                    primitive: 'Box breath 4x',
                    heatBand: 'caution',
                    proofRequest: 'Felt shift',
                  },
                  {
                    state_signals: scopes[0].enabled,
                    notifications: scopes[1].enabled,
                    escalation_contact: scopes[2].enabled,
                    quiet_hours_active: isQuietNow(),
                  },
                  'captured',
                  { felt_shift: 'Activation down 2 bands', timestamp: Date.now(), held_under: 'caution' },
                );
                const log = createIntegrityLog(event, isQuietNow(), true);
                addEvent(event, log);
                console.log('Event captured:', event);
              }}
            />

            <NaviCueCard
              title="Name the pattern"
              intent="Recognise the loop in-flight"
              suitability="safe"
              primitive="Label + breath drop"
              proofRequest="Mark awareness in 20s"
              status="pending"
            />

            <MotionList items={capturedProofs.length > 0 ? capturedProofs : proofEntries} variant="slideUp">
              <ProofStack entries={capturedProofs.length > 0 ? capturedProofs : proofEntries} />
            </MotionList>

            {/* Asset: Proof Stacking Visual */}
            <AssetCard asset={PROOF_STACKING_ASSET} interactive={false} />

            {/* Asset: ERA Cadence Hero */}
            <AssetCard asset={ERA_CADENCE_HERO} interactive={false} />

            <ERALane />

            <ConsentSheet
              scopes={scopes}
              onToggle={toggle}
            />

            <QuietHoursPicker start={hours.start} end={hours.end} onChange={setHours} />

            <MotionAlert active={alerting} severity="caution" variant="pulse">
              <EscalationChooser
                selectedId="clinician"
                options={[
                  {
                    id: 'self',
                    label: 'Self-stabilise only',
                    description: 'Keep it quiet; no external handoff. Use state-first stabilisers.',
                    protocol: 'Micro-dose only',
                  },
                  {
                    id: 'clinician',
                    label: 'Clinician (primary)',
                    description: 'Escalate to primary clinician if heat > threshold.',
                    contact: 'Dr. Rivers',
                    protocol: 'Consent-bound outreach',
                  },
                  {
                    id: 'support',
                    label: 'Support person',
                    description: 'Reach designated person if pattern repeats x3 in 24h.',
                    contact: 'T. Cole',
                    protocol: 'Text + call fallback',
                  },
                ]}
              />
            </MotionAlert>
          </div>
        )}

        {view === 'console' && (
          <div style={{ display: 'grid', gap: 16 }}>
            <Console events={events} personName="Sarah M." />
          </div>
        )}

        {view === 'command' && (
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Asset: Three Altitudes Hero */}
            <AssetCard asset={THREE_ALTITUDES_HERO} interactive={false} />
            
            <CommandCenter logs={logs} organizationName="Clinical Operations" />
          </div>
        )}

        {view === 'continuity' && (
          <ContinuityDemo />
        )}

        {view === 'reveal' && (
          <OSRevealDemo />
        )}

        {view === 'portal' && (
          <RecoveryOSPortal
            initialRoom="moment"
            spineRailVisible={true}
            artifactRailVisible={true}
            skipEnabled={true}
          />
        )}

        {view === 'walkthrough' && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
            <WalkthroughPresenter />
          </div>
        )}

        {view === 'icons' && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#15142a', overflow: 'auto' }}>
            <IconGrid />
          </div>
        )}
      </MotionView>
    </div>
  );
}

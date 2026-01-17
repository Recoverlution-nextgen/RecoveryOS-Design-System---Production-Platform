/**
 * CC2 LAYOUT - COMMAND CENTER 2
 * The complete control plane shell
 * 
 * Architecture: Four Modes
 * - BUILD: Create interventions (Registry, Journey, Content Assembly, Wellbeing, Orbit)
 * - GOVERN: Policies, reviews, consent, lifecycle, releases
 * - SIMULATE: Make LUMA debuggable (replay, inspect, scenario test)
 * - PROVE: Make outcomes visible (events, proofs, analytics, audit)
 */

import { useState } from 'react';
import { CC2Nav } from './CC2Nav';
import { CC2Home } from './CC2Home';
import { RegistryStudio } from './studios/RegistryStudio';
import { EventExplorer } from './studios/EventExplorer';
import { ProofLedger } from './studios/ProofLedger';
import { SimulationLab } from './studios/SimulationLab';
import { NaviCueStudio } from './studios/NaviCueStudio';
import { MindblockStudio } from './studios/MindblockStudio';
import { ProtocolStudio } from './studios/ProtocolStudio';
import { IndividualDataStudio } from './studios/IndividualDataStudio';
import { NaviCueBatchGeneratorStudio } from './studios/NaviCueBatchGeneratorStudio';
import { NaviCuePlayground } from './studios/NaviCuePlayground';
import { NaviCueSyncStudio } from './studios/NaviCueSyncStudio';
import { JourneyStudio } from './studios/JourneyStudio';
import { ContentAssemblyLab } from './studios/ContentAssemblyLab';
import { WellbeingStudio } from './studios/WellbeingStudio';
import { PatientRoster } from './studios/PatientRoster';
import { TeamManagement } from './studios/TeamManagement';
import { SessionPrepSummaries } from './studios/SessionPrepSummaries';
import { QuickInterventions } from './studios/QuickInterventions';
import { ProfessionalInbox } from './studios/ProfessionalInbox';
import { SharedContentTracker } from './studios/SharedContentTracker';
import { PopulationHealth } from './studios/PopulationHealth';
import { AlumniMicrosites } from './studios/AlumniMicrosites';
import { AlgorithmVisualizerStudio } from './studios/AlgorithmVisualizerStudio';
import { InstallationControlPlane } from './studios/InstallationControlPlane';
import { InstallationSystemExplorer } from './studios/InstallationSystemExplorer';
import { TaxonomyExplorationEngine } from './studios/TaxonomyExplorationEngine';
import { PlaygroundHome } from './playground/PlaygroundHome';
import EnrichmentPanel from '../admin/EnrichmentPanel';
import AITaggingAssistant from '../admin/AITaggingAssistant';
import SyntheticsStudio from './SyntheticsStudio';
import AdminSetupHelper from '../admin/AdminSetupHelper';

type CC2Mode = 'home' | 'build' | 'govern' | 'simulate' | 'prove' | 'playground';
type CC2Studio = 
  | 'registry' 
  | 'navicue'
  | 'mindblock'
  | 'protocol'
  | 'navicue-batch-generator'
  | 'navicue-playground'
  | 'navicue-sync'
  | 'player' 
  | 'journey' 
  | 'content-assembly' 
  | 'wellbeing' 
  | 'soundbites'  
  | 'orbit'
  | 'policies'
  | 'reviews'
  | 'consent'
  | 'lifecycle'
  | 'releases'
  | 'simulation'
  | 'events'
  | 'proofs'
  | 'analytics'
  | 'audit'
  | 'patient-roster'
  | 'team-management'
  | 'session-prep'
  | 'quick-interventions'
  | 'professional-inbox'
  | 'shared-content'
  | 'population-health'
  | 'alumni-microsites'
  | 'algorithm-visualizer'
  | 'installation-control-plane'
  | 'installation-system-explorer'
  | 'taxonomy-exploration-engine'
  | 'enrichment'
  | 'ai-tagging'
  | 'synthetics'
  | 'admin-setup';

export function CC2Layout({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [mode, setMode] = useState<CC2Mode>('home');
  const [activeStudio, setActiveStudio] = useState<CC2Studio | null>(null);
  const [tenantScope, setTenantScope] = useState<'platform' | 'org' | 'professional'>('platform');

  const handleStudioOpen = (studio: CC2Studio) => {
    setActiveStudio(studio);
  };

  const handleBack = () => {
    setActiveStudio(null);
    setMode('home');
  };

  const renderContent = () => {
    // If a studio is open, show it
    if (activeStudio) {
      switch (activeStudio) {
        case 'registry':
          return <RegistryStudio onBack={handleBack} tenantScope={tenantScope} />;
        case 'events':
          return <EventExplorer onBack={handleBack} tenantScope={tenantScope} />;
        case 'proofs':
          return <ProofLedger onBack={handleBack} tenantScope={tenantScope} />;
        case 'simulation':
          return <SimulationLab onBack={handleBack} />;
        case 'navicue':
          return <NaviCueStudio onBack={handleBack} tenantScope={tenantScope} />;
        case 'mindblock':
          return <MindblockStudio onBack={handleBack} tenantScope={tenantScope} />;
        case 'protocol':
          return <ProtocolStudio onBack={handleBack} />;
        case 'individual-data':
          return <IndividualDataStudio onBack={handleBack} />;
        case 'navicue-batch-generator':
          return <NaviCueBatchGeneratorStudio onClose={handleBack} />;
        case 'navicue-playground':
          return <NaviCuePlayground onClose={handleBack} />;
        case 'navicue-sync':
          return <NaviCueSyncStudio onClose={handleBack} />;
        case 'journey':
          return <JourneyStudio onClose={handleBack} />;
        case 'content-assembly':
          return <ContentAssemblyLab onClose={handleBack} />;
        case 'wellbeing':
          return <WellbeingStudio onClose={handleBack} />;
        case 'patient-roster':
          return <PatientRoster onBack={handleBack} tenantScope={tenantScope} />;
        case 'team-management':
          return <TeamManagement onClose={handleBack} />;
        case 'session-prep':
          return <SessionPrepSummaries onBack={handleBack} tenantScope={tenantScope} />;
        case 'quick-interventions':
          return <QuickInterventions onBack={handleBack} tenantScope={tenantScope} />;
        case 'professional-inbox':
          return <ProfessionalInbox onBack={handleBack} tenantScope={tenantScope} />;
        case 'shared-content':
          return <SharedContentTracker onBack={handleBack} tenantScope={tenantScope} />;
        case 'population-health':
          return <PopulationHealth onBack={handleBack} />;
        case 'alumni-microsites':
          return <AlumniMicrosites onBack={handleBack} />;
        case 'algorithm-visualizer':
          return <AlgorithmVisualizerStudio onBack={handleBack} />;
        case 'installation-control-plane':
          return <InstallationControlPlane onBack={handleBack} />;
        case 'installation-system-explorer':
          return <InstallationSystemExplorer onBack={handleBack} />;
        case 'taxonomy-exploration-engine':
          return <TaxonomyExplorationEngine onBack={handleBack} />;
        case 'enrichment':
          return <EnrichmentPanel onBack={handleBack} />;
        case 'ai-tagging':
          return <AITaggingAssistant onBack={handleBack} />;
        case 'synthetics':
          return <SyntheticsStudio onBack={handleBack} />;
        case 'admin-setup':
          return <AdminSetupHelper onBack={handleBack} />;
        default:
          return (
            <div className="min-h-screen bg-[#0A0B0F] text-white flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl mb-4">{activeStudio.replace('-', ' ').toUpperCase()}</h2>
                <p className="text-zinc-400 mb-8">Studio coming soon</p>
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          );
      }
    }

    // If in Playground mode, show Playground Home
    if (mode === 'playground') {
      return <PlaygroundHome />;
    }

    // Otherwise show home cockpit
    return (
      <CC2Home
        mode={mode}
        onModeChange={setMode}
        onStudioOpen={handleStudioOpen}
        tenantScope={tenantScope}
        onTenantScopeChange={setTenantScope}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Nav */}
      <CC2Nav 
        currentMode={mode}
        activeStudio={activeStudio}
        onModeChange={setMode}
        onBack={activeStudio ? handleBack : undefined}
        onNavigate={onNavigate}
      />

      {/* Content */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}
// Legacy components (maintained for backward compatibility)
export * from './components/NaviCueCard';
export * from './components/ProofPill';
export * from './components/StateChip';
export * from './components/ProofStack';
export * from './components/UniversalPlayer';
export * from './components/ERALane';
export * from './components/ConsentSheet';
export * from './components/QuietHoursPicker';
export * from './components/EscalationChooser';
export * from './components/Console';
export * from './components/CommandCenter';
export * from './components/AssetCard';

// Public language components (Continuity Layer)
export * from './components/return/ReturnButton';
export * from './components/trace/TraceObject';
export * from './components/thread/ThreadView';
export * from './components/grip/GripGenerator';
export * from './components/lens/LensControl';

// Tier A: Iconic Objects (Component Registry)
export * from './components/handrail/Handrail';

// Tier B: Belief Machines (Component Registry)
export * from './components/loop/LoopRunner';
export * from './components/travel/TraceTravel';
export * from './components/forge/ReceiptForge';
export * from './components/conductor/ConductorView';
export * from './components/atlas/SpineAtlas';
export * from './components/switcher/RoomSwitcher';

// Tier C: Trust Surfaces (Component Registry)
export * from './components/trust/ConsentMap';
export * from './components/trust/EscalationRail';
export * from './components/trust/IntegrityLogPreview';
export * from './components/trust/GovernanceLockMap';

// Tier D: Immersive Explorers (Component Registry)
export * from './components/portal/RecoveryOSPortal';

// Components (General)
export * from './components/gallery/NaviCueGallery';
export * from './components/studio/JourneyStudio';

// Demos
export * from './demos/ContinuityDemo';
export * from './demos/OSRevealDemo';

// Hooks
export * from './hooks';

// Motion (animations, orchestration, primitives)
export * from './motion';

// Types
export * from './types/events';
export * from './types/assets';
export * from './types/asset-families';

// Assets (hero visuals with etched copy)
export * from './assets/heroes';
export * from './assets/cinematic-reality';
export * from './assets/os-objects';
export * from './assets/system-maps';
export * from './assets/field-atmospheres';
export * from './assets/micro-motion';

// Website primitives
export * from './website/primitives';

// Website system components
export * from './website/system';

// Website narrative components
export * from './website/narrative';

// Asset tokens
export * from './assets/tokens';

// Icon system
export * from './icons';

// Form components
export * from './components/form';

// Infrastructure
export * from './components/ErrorBoundary';
export * from './components/Loading';
export * from './components/SEO';

// Supabase integration
export * from './lib/supabase';

// Asset governance
export * from './assets/asset-governance';
export { useAssetsByComponent, useAssetsByLabels, useAssetsByClass, useHeroScene } from './hooks/useAssetPlacement';

// Founding Objects (RecoveryOS Core)
export { ReturnButton } from "./objects/ReturnButton/ReturnButton";

export { RoomHeader } from "./objects/RoomHeader/RoomHeader";
export { RoomFrame } from "./objects/RoomFrame/RoomFrame";

export { PortalShell } from "./objects/PortalShell/PortalShell";

export { PrimaryRail, ContextRail, ArtifactRail } from "./objects/Rails/Rails";

export { SystemMessageToastHost } from "./objects/SystemMessageToast/SystemMessageToastHost";

export { ReceiptCard } from "./objects/ReceiptCard/ReceiptCard";

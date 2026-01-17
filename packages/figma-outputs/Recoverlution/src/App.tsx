// RECOVERLUTION DASHBOARD - NOVEMBER 2025
// ✅ MARKETING SUITE EXHIBITION-READY
// Clean Naming: No versions, production-ready file structure
// Active Pages: Home, Story, Platform, Science, Pricing, Demo
// ✅ NAVICUES V2 - THE SPARK ROOM - NEW PHILOSOPHY
// Old Recovery Instagram deprecated - new ephemeral provocation system

// DESIGN SYSTEM BEDROCK - infiniteK Foundation
import './design-system/styles/tokens.css';
import './design-system/styles/globals.css';

import { shouldShowTour, markTourCompleted, markTourSkipped } from "./utils/tourStatus";
import { PAGE_IMAGES } from "./utils/pageImageMapping";
import { LumaPlayerProvider } from "./contexts/LumaPlayerContext";
import { UserProvider } from "./contexts/UserContext"; // NEW: Multi-tenancy system
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState, useEffect, lazy, Suspense, memo } from "react";
import { analytics } from "./utils/analytics";
import { getCurrentPage, navigateToPage, initializeRouter, getPageTitle, type PageType } from "./utils/router";
import { getPatient } from "./utils/patientData";

// Create QueryClient instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Journey Audio - Auto-generates via OpenAI TTS on first use (lazy loading)

// ✅ NaviCue infiniteK conversion complete: ShameNavicue, ValuesNavicue, NaviCueSuitePage
// PERFORMANCE: Lazy load navigation and overlays to reduce initial bundle
const RecoverlutionNav = lazy(() => import("./components/RecoverlutionNav").then(m => ({ default: m.RecoverlutionNav })));
const CommandCenterNav = lazy(() => import("./components/CommandCenterNav").then(m => ({ default: m.CommandCenterNav })));
const PlatformFooter = lazy(() => import("./components/PlatformFooter").then(m => ({ default: m.PlatformFooter })));
const PlatformTourOverlay = lazy(() => import("./components/PlatformTourOverlay").then(m => ({ default: m.PlatformTourOverlay })));

// LUMA3 - Navigation: HOME ↔ VOICE ↔ PLAY ↔ TALK
const LumaHome = lazy(() => import("./components/luma3/LumaHome").then(m => ({ default: m.LumaHome })));
const LumaVoice = lazy(() => import("./components/luma3/LumaVoice").then(m => ({ default: m.LumaVoice })));
const LumaPlay = lazy(() => import("./components/luma3/LumaPlay").then(m => ({ default: m.LumaPlay })));
const LumaTalk = lazy(() => import("./components/luma3/LumaTalk").then(m => ({ default: m.LumaTalk })));
const LumaFloatingButton = lazy(() => import("./components/luma/LumaFloatingButton").then(m => ({ default: m.LumaFloatingButton })));

const AssetHealthMonitor = lazy(() => import("./components/AssetHealthMonitor").then(m => ({ default: m.AssetHealthMonitor })));
const KeyboardShortcutsOverlay = lazy(() => import("./components/KeyboardShortcutsOverlay").then(m => ({ default: m.KeyboardShortcutsOverlay })));

// LAZY LOAD ALL PAGES - Only load when needed (reduces initial bundle by 80%)
const DashboardPage = lazy(() => import("./components/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const WellbeingPageV5 = lazy(() => import("./components/pages/WellbeingPageV5").then(m => ({ default: m.WellbeingPageV5 })));
const StatePage = lazy(() => import("./components/pages/StatePage").then(m => ({ default: m.StatePage })));
const ToolkitPage = lazy(() => import("./components/pages/ToolkitPage").then(m => ({ default: m.ToolkitPage })));
const ArticlePage = lazy(() => import("./components/pages/ArticlePage").then(m => ({ default: m.ArticlePage })));
const ArticleDetailPage = lazy(() => import("./components/pages/ArticleDetailPage").then(m => ({ default: m.ArticleDetailPage })));
const EnhancedBuildingBlockPage = lazy(() => import("./components/pages/EnhancedBuildingBlockPage").then(m => ({ default: m.EnhancedBuildingBlockPage })));
const EnhancedPracticePage = lazy(() => import("./components/pages/EnhancedPracticePage").then(m => ({ default: m.EnhancedPracticePage })));
const EnhancedInsightPage = lazy(() => import("./components/pages/EnhancedInsightPage").then(m => ({ default: m.EnhancedInsightPage })));
const ArticleLibraryPage = lazy(() => import("./components/pages/ArticleLibraryPage").then(m => ({ default: m.ArticleLibraryPage })));
const NavigatePage = lazy(() => import("./components/pages/NavigatePage").then(m => ({ default: m.NavigatePage })));
const MomentumPageV2 = lazy(() => import("./components/pages/MomentumPageV2").then(m => ({ default: m.MomentumPageV2 })));
const AlumniMessengerPage = lazy(() => import("./components/pages/AlumniMessengerPage").then(m => ({ default: m.AlumniMessengerPage })));
const ProfilePage = lazy(() => import("./components/pages/ProfilePage").then(m => ({ default: m.ProfilePage })));

// ✅ ACTIVE MARKETING SUITE - Exhibition-Ready (November 2025)
// All 6 pages standardized with V2 naming convention (Phase 5 in progress)
const MarketingHomePage = lazy(() => import("./components/pages/MarketingHomePageV2"));
const MarketingStoryPage = lazy(() => import("./components/pages/MarketingStoryPageV2").then(m => ({ default: m.MarketingStoryPage })));
const MarketingPlatformPage = lazy(() => import("./components/pages/MarketingPlatformPageV2").then(m => ({ default: m.MarketingPlatformPage })));
const MarketingSciencePage = lazy(() => import("./components/pages/MarketingSciencePageV2").then(m => ({ default: m.MarketingSciencePage })));
const MarketingPricingPage = lazy(() => import("./components/pages/MarketingPricingPageV2"));
const MarketingDemoPage = lazy(() => import("./components/pages/MarketingDemoPageV2").then(m => ({ default: m.MarketingDemoPage })));
const MarketingTherapyPage = lazy(() => import("./components/pages/MarketingTherapyPageV2"));

// ✅ V3 MARKETING SUITE - ATLAS Ecosystem Launch (January 2026)
const V3HomePage = lazy(() => import("./components/v3/pages/V3HomePage").then(m => ({ default: m.V3HomePage })));
const V3OrganisationsPage = lazy(() => import("./components/v3/pages/V3OrganisationsPage").then(m => ({ default: m.V3OrganisationsPage })));
const V3ProfessionalsPage = lazy(() => import("./components/v3/pages/V3ProfessionalsPage").then(m => ({ default: m.V3ProfessionalsPage })));
const V3IndividualsPage = lazy(() => import("./components/v3/pages/V3IndividualsPage").then(m => ({ default: m.V3IndividualsPage })));
const V3CompanionsPage = lazy(() => import("./components/v3/pages/V3CompanionsPage").then(m => ({ default: m.V3CompanionsPage })));
const V3PlatformPage = lazy(() => import("./components/v3/pages/V3PlatformPage").then(m => ({ default: m.V3PlatformPage })));
const V3SciencePage = lazy(() => import("./components/v3/pages/V3SciencePage").then(m => ({ default: m.V3SciencePage})));

const PrivacyPage = lazy(() => import("./components/pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./components/pages/TermsPage").then(m => ({ default: m.TermsPage })));
const CookiesPage = lazy(() => import("./components/pages/CookiesPage").then(m => ({ default: m.CookiesPage })));
const LoginPage = lazy(() => import("./components/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const SetupPage = lazy(() => import("./components/pages/SetupPage").then(m => ({ default: m.SetupPage })));
const FractionalSalesPage = lazy(() => import("./components/pages/FractionalSalesPage").then(m => ({ default: m.FractionalSalesPage })));
const EmailBlastPage = lazy(() => import("./components/pages/EmailBlastPage").then(m => ({ default: m.EmailBlastPage })));
const LinkedInCarouselPage = lazy(() => import("./components/pages/LinkedInCarouselPage").then(m => ({ default: m.LinkedInCarouselPage })));
const BrandAnchorPage = lazy(() => import("./components/pages/BrandAnchorPage").then(m => ({ default: m.BrandAnchorPage })));
const InvestorsPage = lazy(() => import("./components/pages/InvestorsPage").then(m => ({ default: m.InvestorsPage })));
const HumanCognitionPlatform = lazy(() => import("./components/HumanCognitionPlatform").then(m => ({ default: m.HumanCognitionPlatform })));
const ERAFlow = lazy(() => import("./components/ERAFlow").then(m => ({ default: m.ERAFlow })));
const InfiniteCanvasPrinciple = lazy(() => import("./components/InfiniteCanvasPrinciple").then(m => ({ default: m.InfiniteCanvasPrinciple })));
const EmotionalRegulationPillar = lazy(() => import("./components/EmotionalRegulationPillar").then(m => ({ default: m.EmotionalRegulationPillar })));
const StressResiliencePillar = lazy(() => import("./components/StressResiliencePillar").then(m => ({ default: m.StressResiliencePillar })));
const SocialConnectivityPillar = lazy(() => import("./components/SocialConnectivityPillar").then(m => ({ default: m.SocialConnectivityPillar })));
const CognitiveReframingPillar = lazy(() => import("./components/CognitiveReframingPillar").then(m => ({ default: m.CognitiveReframingPillar })));
const IdentityIntegrationPillar = lazy(() => import("./components/IdentityIntegrationPillar").then(m => ({ default: m.IdentityIntegrationPillar })));
const DecisionMasteryPillar = lazy(() => import("./components/DecisionMasteryPillar").then(m => ({ default: m.DecisionMasteryPillar })));
const SpherePrinciple = lazy(() => import("./components/SpherePrinciple").then(m => ({ default: m.SpherePrinciple })));
const ContentBuildOutRoadmap = lazy(() => import("./components/ContentBuildOutRoadmap").then(m => ({ default: m.ContentBuildOutRoadmap })));
const WeeklyEraPage = lazy(() => import("./components/pages/WeeklyEraPage").then(m => ({ default: m.WeeklyEraPage })));
const MicroBlockLibraryPage = lazy(() => import("./components/pages/MicroBlockLibraryPage").then(m => ({ default: m.MicroBlockLibraryPage })));
const ContentMappingPage = lazy(() => import("./components/pages/ContentMappingPage").then(m => ({ default: m.ContentMappingPage })));
const VideoLibraryAuditPage = lazy(() => import("./components/pages/VideoLibraryAuditPage").then(m => ({ default: m.VideoLibraryAuditPage })));
const CommandCenterHomePageV2 = lazy(() => import("./components/pages/CommandCenterHomePageV2"));
const CommandCenterExecutionHub = lazy(() => import("./components/pages/CommandCenterExecutionHub"));
const JourneyLabRoom = lazy(() => import("./components/pages/JourneyLabRoom"));
const ContentAssemblyLabRoom = lazy(() => import("./components/pages/ContentAssemblyLabRoom"));
const WellbeingStudioRoom = lazy(() => import("./components/pages/WellbeingStudioRoom"));
const StateDashboardRoom = lazy(() => import("./components/pages/StateDashboardRoom"));
const NavigateOrchestratorRoom = lazy(() => import("./components/pages/NavigateOrchestratorRoom"));
const MomentumAnalyticsRoom = lazy(() => import("./components/pages/MomentumAnalyticsRoom"));
const CommunicationsConsoleRoom = lazy(() => import("./components/pages/CommunicationsConsoleRoom"));
const NaviCueTypeBuilderRoom = lazy(() => import("./components/pages/NaviCueTypeBuilderRoom"));
const SchemaExposureMatrix = lazy(() => import("./components/pages/SchemaExposureMatrix"));
const CommandCenterPatternLibrary = lazy(() => import("./components/pages/CommandCenterPatternLibrary"));
const BackendAdminPage = lazy(() => import("./components/pages/BackendAdminPage").then(m => ({ default: m.BackendAdminPage })));
const AdminNaviCueSync = lazy(() => import("./components/AdminNaviCueSync").then(m => ({ default: m.AdminNaviCueSync })));
const DNAHubPage = lazy(() => import("./components/pages/DNAHubPage").then(m => ({ default: m.DNAHubPage })));
const DNADesignSystemPage = lazy(() => import("./components/pages/DNADesignSystemPage").then(m => ({ default: m.DNADesignSystemPage })));
const DNAAssetManagerPage = lazy(() => import("./components/pages/DNAAssetManagerPage").then(m => ({ default: m.DNAAssetManagerPage })));
const TinyCDNPreviewPage = lazy(() => import("./components/pages/TinyCDNPreviewPage").then(m => ({ default: m.default })));
const MessagingMatrixPage = lazy(() => import("./components/pages/MessagingMatrixPage").then(m => ({ default: m.MessagingMatrixPage })));
const ContentLabPage = lazy(() => import("./components/pages/ContentLabPage").then(m => ({ default: m.ContentLabPage })));
const ContentLibraryShowcase = lazy(() => import("./components/pages/ContentLibraryShowcase"));
const PatientOnboardingPage = lazy(() => import("./components/pages/PatientOnboardingPage").then(m => ({ default: m.PatientOnboardingPage })));
const OnboardingWrapper = lazy(() => import("./components/OnboardingWrapper").then(m => ({ default: m.OnboardingWrapper })));
const FrostedGlassDemo = lazy(() => import("./components/FrostedGlassDemo").then(m => ({ default: m.FrostedGlassDemo })));
const IntelligentBackgroundsDemo = lazy(() => import("./components/pages/IntelligentBackgroundsDemo").then(m => ({ default: m.IntelligentBackgroundsDemo })));
const CardBackgroundGallery = lazy(() => import("./components/pages/CardBackgroundGallery").then(m => ({ default: m.CardBackgroundGallery })));
const HeaderAssetTestPage = lazy(() => import("./components/pages/HeaderAssetTestPage").then(m => ({ default: m.HeaderAssetTestPage })));
const JourneyInfrastructurePage = lazy(() => import("./components/pages/JourneyInfrastructurePage").then(m => ({ default: m.JourneyInfrastructurePage })));
const JourneyPage = lazy(() => import("./components/pages/JourneyPage").then(m => ({ default: m.JourneyPage })));
const JourneyLandingPage = lazy(() => import("./components/pages/JourneyLandingPage").then(m => ({ default: m.JourneyLandingPage })));
const JourneyImmersive = lazy(() => import("./components/pages/JourneyImmersiveV4").then(m => ({ default: m.JourneyImmersiveV4 })));
const JourneyFlowDemo = lazy(() => import("./components/pages/JourneyFlowDemo").then(m => ({ default: m.JourneyFlowDemo })));
const JourneyAdminPanel = lazy(() => import("./components/pages/JourneyAdminPanel").then(m => ({ default: m.JourneyAdminPanel })));
const JourneySchemaInspector = lazy(() => import("./components/pages/JourneySchemaInspector").then(m => ({ default: m.JourneySchemaInspector })));
const WeekDetailPage = lazy(() => import("./components/pages/WeekDetailPage").then(m => ({ default: m.WeekDetailPage })));
const PathwayPage = lazy(() => import("./components/pages/PathwayPage").then(m => ({ default: m.PathwayPage })));
const NavicuesPage = lazy(() => import("./components/pages/NavicuesPageV2").then(m => ({ default: m.NavicuesPageV2 })));
const BuildingBlocksPage = lazy(() => import("./components/pages/BuildingBlocksPage").then(m => ({ default: m.BuildingBlocksPage })));
const UniversalPlayerPage = lazy(() => import("./components/pages/UniversalPlayerPage").then(m => ({ default: m.UniversalPlayerPage })));
const ThreadPage = lazy(() => import("./components/pages/ThreadPage").then(m => ({ default: m.ThreadPage })));
const NaviCueArsenalDemo = lazy(() => import("./components/pages/NaviCueArsenalDemo").then(m => ({ default: m.NaviCueArsenalDemo })));
const PixabayTestPage = lazy(() => import("./components/pages/PixabayTestPage").then(m => ({ default: m.PixabayTestPage })));
const OpenAITestPage = lazy(() => import("./components/pages/OpenAITestPage"));
const HeroTestPage = lazy(() => import("./components/pages/HeroTestPage").then(m => ({ default: m.HeroTestPage })));
const ComponentArchitectureLabPage = lazy(() => import("./components/pages/ComponentArchitectureLabPage").then(m => ({ default: m.ComponentArchitectureLabPage })));
const InsightDemo = lazy(() => import("./pages/InsightDemo"));

// LUMA PLAY V2 - Modular Player System with 6 S's
const LumaPlayV2Page = lazy(() => import("./components/pages/LumaPlayV2Page"));

// Content Migration - Admin tool
const SimpleMigrationPage = lazy(() => import("./components/pages/SimpleMigrationPage").then(m => ({ default: m.SimpleMigrationPage })));
const BeliefSequenceDemoPage = lazy(() => import("./components/pages/BeliefSequenceDemoPage").then(m => ({ default: m.BeliefSequenceDemoPage })));
const TrustExperiencePage = lazy(() => import("./components/pages/TrustExperiencePage").then(m => ({ default: m.TrustExperiencePage })));

// NEW: Integrations & Professional/Org Portal
const IntegrationsPage = lazy(() => import("./components/pages/IntegrationsPage"));
const ProfessionalPortalPage = lazy(() => import("./components/pages/ProfessionalPortalPage"));
const ProfessionalOnboardingPage = lazy(() => import("./components/pages/ProfessionalOnboardingPage"));
const OrganizationPortalPage = lazy(() => import("./components/pages/OrganizationPortalPage"));
const OrganizationOnboardingPage = lazy(() => import("./components/pages/OrganizationOnboardingPage"));
const TherapySessionBookingPage = lazy(() => import("./components/pages/TherapySessionBookingPage"));
const RecoveryMeetingFinderPage = lazy(() => import("./components/pages/RecoveryMeetingFinderPage"));
const ForProfessionalsPage = lazy(() => import("./components/pages/ForProfessionalsPage"));
const ForOrganizationsPage = lazy(() => import("./components/pages/ForOrganizationsPage"));
const PlatformAdminPage = lazy(() => import("./components/pages/PlatformAdminPage"));

const NaviCueTest1 = lazy(() => import("./components/pages/NaviCueTest1").then(m => ({ default: m.NaviCueTest1 })));
const NaviCueBatch1Viewer = lazy(() => import("./components/pages/NaviCueBatch1Viewer").then(m => ({ default: m.NaviCueBatch1Viewer })));
const NaviCueMasterIndex = lazy(() => import("./components/pages/NaviCueMasterIndex").then(m => ({ default: m.NaviCueMasterIndex })));
const NaviCueBatch2Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch2Viewer })));
const NaviCueBatch3Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch3Viewer })));
const NaviCueBatch4Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch4Viewer })));
const NaviCueBatch5Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch5Viewer })));
const NaviCueBatch6Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch6Viewer })));
const NaviCueBatch7Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch7Viewer })));
const NaviCueBatch8Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch8Viewer })));
const NaviCueBatch9Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch9Viewer })));
const NaviCueBatch10Viewer = lazy(() => import("./components/pages/BatchViewers").then(m => ({ default: m.NaviCueBatch10Viewer })));
const NaviCueBatch11Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch11Viewer })));
const NaviCueBatch12Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch12Viewer })));
const NaviCueBatch13Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch13Viewer })));
const NaviCueBatch14Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch14Viewer })));
const NaviCueBatch15Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch15Viewer })));
const NaviCueBatch16Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch16Viewer })));
const NaviCueBatch17Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch17Viewer })));
const NaviCueBatch18Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch18Viewer })));
const NaviCueBatch19Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch19Viewer })));
const NaviCueBatch20Viewer = lazy(() => import("./components/pages/BatchViewers11-20").then(m => ({ default: m.NaviCueBatch20Viewer })));
const NaviCueArsenalPage = lazy(() => import("./components/pages/NaviCueArsenalPage").then(m => ({ default: m.NaviCueArsenalPage })));
const NaviCueArsenalPageV2 = lazy(() => import("./components/pages/NaviCueArsenalPageV2"));
const NaviCueArsenalPageV3 = lazy(() => import("./components/pages/NaviCueArsenalPageV3").then(m => ({ default: m.default })));
const JourneyArsenalPage = lazy(() => import("./components/pages/JourneyArsenalPage").then(m => ({ default: m.default })));

// NEW: Arsenal batch pages (Clinical, Guru, Infinite)
const ClinicalSCBatch = lazy(() => import("./components/pages/batches/ClinicalSCBatch").then(m => ({ default: m.ClinicalSCBatch })));
const ClinicalCRBatch = lazy(() => import("./components/pages/batches/ClinicalCRBatch").then(m => ({ default: m.ClinicalCRBatch })));
const ClinicalIIBatch = lazy(() => import("./components/pages/batches/ClinicalIIBatch").then(m => ({ default: m.ClinicalIIBatch })));
const ClinicalDMBatch = lazy(() => import("./components/pages/batches/ClinicalDMBatch").then(m => ({ default: m.ClinicalDMBatch })));
const GuruRamDassBatch = lazy(() => import("./components/pages/batches/GuruRamDassBatch").then(m => ({ default: m.GuruRamDassBatch })));
const GuruPemaBatch = lazy(() => import("./components/pages/batches/GuruPemaBatch").then(m => ({ default: m.GuruPemaBatch })));
const GuruThichBatch = lazy(() => import("./components/pages/batches/GuruThichBatch").then(m => ({ default: m.GuruThichBatch })));
const GuruKornfieldBatch = lazy(() => import("./components/pages/batches/GuruKornfieldBatch").then(m => ({ default: m.GuruKornfieldBatch })));
const InfiniteQuantumBatch = lazy(() => import("./components/pages/batches/InfiniteQuantumBatch").then(m => ({ default: m.InfiniteQuantumBatch })));
const InfiniteMusicBatch = lazy(() => import("./components/pages/batches/InfiniteMusicBatch").then(m => ({ default: m.InfiniteMusicBatch })));
const NaviCueArsenalBrowserPage = lazy(() => import("./components/pages/NaviCueArsenalBrowserPage").then(m => ({ default: m.NaviCueArsenalBrowserPage })));
const CreativePlaygroundPage = lazy(() => import("./components/pages/CreativePlaygroundPage").then(m => ({ default: m.CreativePlaygroundPage })));

// NEW CC2 - Command Center 2 (Full System)
const CC2Page = lazy(() => import("./components/pages/CC2Page").then(m => ({ default: m.CC2Page })));

// NEW: Journey System (Platform Pages - CC2 Journey Studio loaded via CC2Layout)
const JourneyLibraryPage = lazy(() => import("./components/pages/JourneyLibraryPage").then(m => ({ default: m.JourneyLibraryPage })));
const JourneyRoomPage = lazy(() => import("./components/pages/JourneyRoomPage").then(m => ({ default: m.JourneyRoomPage })));
const TodayPage = lazy(() => import("./components/pages/TodayPage").then(m => ({ default: m.TodayPage })));

// Ultra-lightweight loading fallback - minimal DOM and no styles to parse
const PageLoader = memo(() => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh', 
    background: '#fff' 
  }}>
    <div style={{ 
      width: '32px', 
      height: '32px', 
      border: '4px solid rgba(62, 43, 184, 0.2)', 
      borderTopColor: '#3E2BB8', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite' 
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
));

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => getCurrentPage());
  const [isLumaOpen, setIsLumaOpen] = useState(false);
  const [lumaScreen, setLumaScreen] = useState<'home' | 'voice' | 'play' | 'talk'>('home');
  const [lumaHelpMode, setLumaHelpMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(null);
  const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(1);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showPlatformTour, setShowPlatformTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [journeyView, setJourneyView] = useState<'landing' | 'immersive'>('landing');
  const [showSoundbiteHealthCheck, setShowSoundbiteHealthCheck] = useState(false);

  // Prevent body scroll when LUMA is open
  useEffect(() => {
    if (isLumaOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLumaOpen]);

  // Initialize analytics and router on mount
  useEffect(() => {
    // Initialize PostHog analytics
    analytics.init();
    console.log(' Analytics initialized - Visit PostHog dashboard to see events');
    
    // NOTE: Journey image cache clearing is now handled in /utils/journeyImagery.tsx
    // The module automatically cleans up invalid URLs and handles contextual search migration
    
    // Check for existing patient in localStorage
    const storedPatientId = localStorage.getItem('currentPatientId');
    if (storedPatientId) {
      setCurrentPatientId(storedPatientId);
      console.log('✅ Found existing patient:', storedPatientId);
      
      // Check if they need onboarding/tour
      getPatient(storedPatientId).then((patient) => {
        if (patient && !patient.hasCompletedOnboarding) {
          setNeedsOnboarding(true);
          // Tour will be shown after onboarding if they haven't seen it
          setIsFirstTimeUser(true); // Mark as first-time for LUMA
        } else if (patient && shouldShowTour()) {
          // Existing patient who hasn't seen the tour yet
          setShowPlatformTour(true);
        }
      });
    }
    
    // Initialize router with navigation handler
    initializeRouter((page) => {
      setCurrentPage(page);
    });
    
    // Listen for custom navigate events
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail.page);
    };
    
    window.addEventListener('navigate', handleNavigate as EventListener);
    
    return () => {
      window.removeEventListener('navigate', handleNavigate as EventListener);
    };
  }, []);

  // Scroll to top, track page views, and update document title whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = getPageTitle(currentPage);
    
    // Track page view
    const pageName = currentPage.startsWith('marketing-') 
      ? currentPage.replace('marketing-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : currentPage === 'Website' 
      ? 'Home'
      : currentPage;
    
    analytics.pageView(pageName);

    // Check if user should see platform tour when landing on Dashboard
    if (currentPage === "Dashboard" && isAuthenticated && shouldShowTour()) {
      setShowPlatformTour(true);
      setTourStep(0);
    }
    
    // Reset Journey view to landing when navigating TO Journey page
    if (currentPage === "Journey") {
      setJourneyView('landing');
    }
  }, [currentPage, isAuthenticated]);

  // Handle authentication redirects (must be in useEffect to avoid setState during render)
  useEffect(() => {
    // Protected pages that require authentication
    const protectedPages = ["Dashboard", "Journey", "Navicues", "building-blocks", "Wellbeing", "State", "Toolkit", "Navigate", "Momentum", "Alumni", "Profile", "Player", "cc2"];
    
    // Check if current page requires auth
    const needsAuth = protectedPages.includes(currentPage) || 
                      currentPage.startsWith("article-") || 
                      currentPage.startsWith("block-") || 
                      currentPage.startsWith("insight-") || 
                      currentPage.startsWith("practice-") || 
                      currentPage.startsWith("week-");
    
    // Redirect to login if not authenticated
    if (needsAuth && !isAuthenticated && currentPage !== "Login") {
      handleNavigate("Login");
    }
  }, [currentPage, isAuthenticated]);
  
  // Navigation handler that updates both state and URL
  const handleNavigate = (page: PageType) => {
    navigateToPage(page, getPageTitle(page));
    setCurrentPage(page);
  };

  const renderPage = () => {
    // Wrap all pages in Suspense for lazy loading
    return (
      <Suspense fallback={<PageLoader />}>
        {renderPageContent()}
      </Suspense>
    );
  };

  const renderPageContent = () => {
    // DEBUG: Log current page
    console.log('📄 Rendering page:', currentPage);
    
    // First-time login guide (runs after patient creation, before dashboard)
    if (needsOnboarding && currentPatientId) {
      return (
        <OnboardingWrapper
          patientId={currentPatientId}
          onComplete={() => {
            setNeedsOnboarding(false);
            // Only show tour if they haven't seen it before
            if (shouldShowTour()) {
              setShowPlatformTour(true);
            }
            setIsFirstTimeUser(true); // Mark as first-time for LUMA
            handleNavigate("Dashboard");
          }}
        />
      );
    }

    // Patient Onboarding - accessible without auth
    if (currentPage === "patient-onboarding") {
      return (
        <PatientOnboardingPage
          onPatientCreated={(patientId) => {
            setCurrentPatientId(patientId);
            setIsAuthenticated(true);
            setNeedsOnboarding(true); // Trigger first-login guide
            // The needsOnboarding check above will catch this
          }}
        />
      );
    }

    // Setup page (one-time demo user creation)
    if (currentPage === "Setup") {
      return <SetupPage />;
    }

    // Login page
    if (currentPage === "Login") {
      return (
        <LoginPage 
          onLogin={() => {
            setIsAuthenticated(true);
            // Check if patient exists, otherwise go to onboarding
            const storedPatientId = localStorage.getItem('currentPatientId');
            if (storedPatientId) {
              setCurrentPatientId(storedPatientId);
              handleNavigate("Dashboard");
            } else {
              handleNavigate("patient-onboarding");
            }
          }}
          onBackToWebsite={() => handleNavigate("Website")}
        />
      );
    }

    // Check if it's an article page
    if (currentPage.startsWith("article-")) {
      const articleId = currentPage.replace("article-", "");
      
      // Article ID 0 = Article Library view (legacy)
      if (articleId === "0") {
        return (
          <ArticleLibraryPage
            onNavigateToArticle={(id) => handleNavigate(`article-${id}`)}
            onBack={() => handleNavigate("Toolkit")}
          />
        );
      }
      
      // All articles now use string IDs from contentLibraryMaster
      return (
        <ArticleDetailPage 
          articleId={articleId} 
          onBack={() => handleNavigate("Toolkit")}
          onNavigateToArticle={(id) => handleNavigate(`article-${id}`)}
        />
      );
    }

    // Check if it's a building block page
    if (currentPage.startsWith("block-")) {
      const blockId = parseInt(currentPage.replace("block-", ""));
      return (
        <EnhancedBuildingBlockPage
          blockId={blockId}
          onBack={() => handleNavigate("Toolkit")}
          onNavigateToBlock={(id) => handleNavigate(`block-${id}`)}
        />
      );
    }

    // Check if it's a practice page
    if (currentPage.startsWith("practice-")) {
      const practiceId = currentPage.replace("practice-", "");
      return (
        <EnhancedPracticePage
          practiceId={practiceId}
          onBack={() => handleNavigate("Toolkit")}
          onNavigateToPractice={(id) => handleNavigate(`practice-${id}`)}
        />
      );
    }

    // Check if it's an insight page
    if (currentPage.startsWith("insight-")) {
      const insightId = currentPage.replace("insight-", "");
      return (
        <EnhancedInsightPage
          insightId={insightId}
          onBack={() => handleNavigate("Toolkit")}
          onNavigateToInsight={(id) => handleNavigate(`insight-${id}`)}
        />
      );
    }

    // Check if rendering a week detail page
    if (currentPage.startsWith("week-")) {
      const weekNum = parseInt(currentPage.replace("week-", ""));
      return (
        <WeekDetailPage
          patientId={currentPatientId!}
          weekNumber={weekNum}
          onBack={() => handleNavigate("Journey")}
          onNavigateToNaviCue={(navicueId) => {
            // Navigate to actual NaviCue page (we'll implement this later)
            console.log(`Navigate to NaviCue: ${navicueId}`);
          }}
        />
      );
    }

    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage key="dashboard-v10-breathing-room-oct22" onNavigate={handleNavigate} onNavigateToWebsite={() => handleNavigate("Website")} />;
      case "Journey":
        // New Flow: Landing → Immersive (November 9, 2025)
        if (journeyView === 'immersive') {
          return (
            <JourneyImmersive 
              patientId={currentPatientId} 
              onNavigate={(page) => {
                if (page === 'Journey') {
                  // Go back to landing
                  setJourneyView('landing');
                } else {
                  handleNavigate(page);
                }
              }}
            />
          );
        }
        
        // Default: Show landing page with week overview
        return (
          <JourneyLandingPage
            patientId={currentPatientId}
            onNavigate={handleNavigate}
            onBeginPractice={() => setJourneyView('immersive')}
          />
        );
        
        // OLD VERSIONS (archive reference):
        // V2: return <JourneyPage />;
        // V1: if (currentPatientId) {
        //   return <JourneyNowView key="journey-v2-elegant-oct20" patientId={currentPatientId} />;
        // } else {
        //   return <PathwayPage onNavigate={handleNavigate} onNavigateToArticle={(id) => handleNavigate(`article-${id}`)} onNavigateToWebsite={() => handleNavigate("Website")} />;
        // }
      case "Navicues":
        return (
          <NavicuesPage
            patientId={currentPatientId || undefined}
            currentWeek={currentWeekNumber}
            onNavigateToBuildingBlock={(navicueId) => {
              handleNavigate("building-blocks");
            }}
            heroImage={PAGE_IMAGES.Navicues}
          />
        );
      case "Wellbeing":
        return <WellbeingPageV5 />;
      case "State":
        return <StatePage patientId={currentPatientId} />;
      case "Toolkit":
        return <ToolkitPage 
          patientId={currentPatientId || undefined} 
          onNavigateToArticle={(id) => handleNavigate(`article-${id}`)}
          onNavigateToInsight={(id) => handleNavigate(`insight-${id}`)}
          onNavigateToPractice={(id) => handleNavigate(`practice-${id}`)}
        />; 
      case "Navigate":
        return <NavigatePage onNavigate={handleNavigate} />;
      case "Momentum":
        return <MomentumPageV2 patientId={currentPatientId || undefined} />;
      case "Alumni":
        return <AlumniMessengerPage />;
      case "Profile":
        return <ProfilePage onNavigate={handleNavigate} onLogout={() => { setIsAuthenticated(false); handleNavigate("Login"); }} />;
      
      // NEW: Integrations & Professional/Org Routes
      case "Integrations":
        return <IntegrationsPage />;
      case "professional-portal":
        return <ProfessionalPortalPage onNavigate={handleNavigate} />;
      case "professional-onboarding":
        return <ProfessionalOnboardingPage onNavigate={handleNavigate} />;
      case "organization-portal":
        return <OrganizationPortalPage onNavigate={handleNavigate} />;
      case "organization-onboarding":
        return <OrganizationOnboardingPage onNavigate={handleNavigate} />;
      case "therapy-booking":
        return <TherapySessionBookingPage onNavigate={handleNavigate} />;
      case "recovery-meetings":
        return <RecoveryMeetingFinderPage onNavigate={handleNavigate} />;
      case "for-professionals":
        return <ForProfessionalsPage onNavigate={handleNavigate} />;
      case "for-organizations":
        return <ForOrganizationsPage onNavigate={handleNavigate} />;
      case "platform-admin":
        return <PlatformAdminPage onNavigate={handleNavigate} />;
      
      case "Player":
        return <UniversalPlayerPage onNavigate={handleNavigate} onExit={() => handleNavigate("Dashboard")} />;
      case "Thread":
        return <ThreadPage />;
      case "building-blocks":
        return (
          <BuildingBlocksPage
            onBack={() => handleNavigate("Navicues")}
            onNavigateToArticle={(blockId) => {
              console.log('Navigate to Building Block article:', blockId);
              // TODO: Create dedicated article pages for Building Blocks
            }}
          />
        );
      case "Website":
        // ✅ ACTIVE HOMEPAGE - Clean naming, no versions
        return <MarketingHomePage onEnterPlatform={() => handleNavigate("Login")} onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onScheduleDemo={() => handleNavigate("marketing-demo")} />;
      case "hero-test":
        return <HeroTestPage onBack={() => handleNavigate("Website")} />;
      case "admin-openai-test":
        return <OpenAITestPage />;
      case "marketing-about":
        return <MarketingAboutPage onBack={() => handleNavigate("Website")} onNavigate={(section) => section === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${section}`)} />;
      case "marketing-story":
        return (
          <MarketingStoryPage
            onBack={() => handleNavigate("Website")} 
            onNavigate={(section) => section === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${section}`)} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-pricing":
        return (
          <MarketingPricingPage 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-platform":
        return (
          <MarketingPlatformPage 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-platform-v1":
        return (
          <MarketingPlatformPageV1 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-science":
        return (
          <MarketingSciencePage
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-science-v1":
        return (
          <MarketingSciencePageV1 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-story-v1":
        return (
          <MarketingStoryPageV1 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-pricing-v1":
        return (
          <MarketingPricingPageV1 
            onBack={() => handleNavigate("Website")} 
            onScheduleDemo={() => handleNavigate("marketing-demo-v1")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-demo-v1":
        return (
          <MarketingDemoPageV1 
            onBack={() => handleNavigate("Website")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)}
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-demo":
        return (
          <MarketingDemoPage
            onBack={() => handleNavigate("Website")} 
            onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} 
            onLogin={() => handleNavigate("Login")}
          />
        );
      case "marketing-privacy":
        return <PrivacyPage onBack={() => handleNavigate("Website")} onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onLogin={() => handleNavigate("Login")} />;
      case "marketing-terms":
        return <TermsPage onBack={() => handleNavigate("Website")} onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onLogin={() => handleNavigate("Login")} />;
      case "marketing-cookies":
        return <CookiesPage onBack={() => handleNavigate("Website")} onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onLogin={() => handleNavigate("Login")} />;
      case "marketing-therapy":
        return <MarketingTherapyPage onEnterPlatform={() => handleNavigate("Dashboard")} onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onCreateAccount={() => handleNavigate("Login")} />;
      
      // ✅ V3 MARKETING ROUTES - ATLAS Ecosystem
      case "v3":
        return <V3HomePage />;
      case "v3-organisations":
        return <V3OrganisationsPage />;
      case "v3-professionals":
        return <V3ProfessionalsPage />;
      case "v3-individuals":
        return <V3IndividualsPage />;
      case "v3-companions":
        return <V3CompanionsPage />;
      case "v3-platform":
        return <V3PlatformPage />;
      case "v3-science":
        return <V3SciencePage />;

      case "investors":
        return <InvestorsPage />;

      case "careers-fractional-sales":
        return <FractionalSalesPage onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} onScheduleDemo={() => handleNavigate("marketing-demo")} />;
      case "admin-email-blast":
        return <EmailBlastPage onNavigate={(page) => page === 'home' ? handleNavigate("Website") : handleNavigate(`marketing-${page}`)} />;
      case "admin-linkedin-carousel":
        return <LinkedInCarouselPage />;
      case "admin-content-migration":
        return <SimpleMigrationPage />;
      case "dna-hub":
        return <DNAHubPage onNavigate={handleNavigate} />;
      case "dna-design-system":
        return <DNADesignSystemPage onNavigate={handleNavigate} />;
      case "dna-asset-manager":
        return <DNAAssetManagerPage onNavigate={handleNavigate} />;
      case "dna-tinycdn-preview":
        return <TinyCDNPreviewPage />;
      case "dna-messaging-matrix":
        return <MessagingMatrixPage onNavigate={handleNavigate} />;
      case "content-lab":
        return <ContentLabPage onNavigate={handleNavigate} />;
      case "demo-recovery-instagram":
        return <RecoveryInstagramDemo />;
      case "demo-journey-flow":
        return <JourneyFlowDemo />;
      case "demo-frosted-glass":
        return <FrostedGlassDemo />;
      case "demo-backgrounds":
        return <IntelligentBackgroundsDemo onNavigate={handleNavigate} />;
      case "demo-card-backgrounds":
        return <CardBackgroundGallery onNavigate={handleNavigate} />;
      case "test-header-assets":
        return <HeaderAssetTestPage onNavigate={handleNavigate} />;
      case "admin-pixabay-test":
        return <PixabayTestPage />;
      case "admin-journey-reset":
        return <JourneyAdminPanel />;
      case "admin-journey-schema":
        return <JourneySchemaInspector onNavigate={handleNavigate} />;
      case "component-architecture-lab":
        return <ComponentArchitectureLabPage />;
      case "demo-insight-system":
        return <InsightDemo />;
      case "demo-luma-play-v2":
        return <LumaPlayV2Page />;
      case "command-center":
        // Redirect old Command Centre to Execution Hub (consolidated)
        return <CommandCenterExecutionHub onNavigate={handleNavigate} />;
      case "cc2":
        // NEW: Command Center 2 - Full Control Plane
        // Journey Studio accessible from CC2 home
        return <CC2Page onNavigate={handleNavigate} />;
      case "today":
        // NEW: Today page (daily landing)
        return <TodayPage onNavigate={handleNavigate} />;
      case "journey-library":
        // NEW: Journey Library (user-facing)
        return <JourneyLibraryPage onNavigate={handleNavigate} />;
      case "journey-room":
        // NEW: Journey Room (detail view)
        return <JourneyRoomPage journeyId="buy-2-seconds" onNavigate={handleNavigate} />;
      case "command-center-execution":
        return <CommandCenterExecutionHub onNavigate={handleNavigate} />;
      case "command-center/journey-lab":
        return <JourneyLabRoom onNavigate={handleNavigate} />;
      case "command-center/content-lab":
        return <ContentAssemblyLabRoom onNavigate={handleNavigate} />;
      case "command-center/wellbeing-studio":
        return <WellbeingStudioRoom onNavigate={handleNavigate} />;
      case "command-center/state-dashboard":
        return <StateDashboardRoom onNavigate={handleNavigate} />;
      case "command-center/navigate-orchestrator":
        return <NavigateOrchestratorRoom onNavigate={handleNavigate} />;
      case "command-center/momentum":
        return <MomentumAnalyticsRoom onNavigate={handleNavigate} />;
      case "command-center/communications":
        return <CommunicationsConsoleRoom onNavigate={handleNavigate} />;
      case "command-center/navicue-builder":
        return <NaviCueTypeBuilderRoom onNavigate={handleNavigate} />;
      case "command-center-navicue-arsenal":
        return <NaviCueArsenalPageV3 onNavigate={handleNavigate} />;
      case "command-center-journey-arsenal":
        return <JourneyArsenalPage onNavigate={handleNavigate} />;
      case "schema-exposure":
        return <SchemaExposureMatrix />;
      case "command-center-patterns":
        return <CommandCenterPatternLibrary onNavigate={handleNavigate} />;
      case "backend-admin":
        return <BackendAdminPage onNavigate={handleNavigate} />;
      case "admin-navicue-sync":
        return <AdminNaviCueSync />;
      case "docs-brand-anchor":
        return <BrandAnchorPage />;
      case "docs-hcp":
        return <HumanCognitionPlatform onNavigate={handleNavigate} />;
      case "docs-era-flow":
        return <ERAFlow onNavigate={handleNavigate} />;
      case "docs-infinite-canvas":
        return <InfiniteCanvasPrinciple onNavigate={handleNavigate} />;
      case "docs-pillar-emotional-regulation":
        return <EmotionalRegulationPillar onNavigate={handleNavigate} />;
      case "docs-pillar-stress-resilience":
        return <StressResiliencePillar onNavigate={handleNavigate} />;
      case "docs-pillar-social-connectivity":
        return <SocialConnectivityPillar onNavigate={handleNavigate} />;
      case "docs-pillar-cognitive-reframing":
        return <CognitiveReframingPillar onNavigate={handleNavigate} />;
      case "docs-pillar-identity-integration":
        return <IdentityIntegrationPillar onNavigate={handleNavigate} />;
      case "docs-pillar-decision-mastery":
        return <DecisionMasteryPillar onNavigate={handleNavigate} />;
      case "docs-sphere-principle":
        return <SpherePrinciple />;
      case "docs-content-roadmap":
        return <ContentBuildOutRoadmap />;
      case "docs-weekly-era-sprints":
        return <WeeklyEraPage onNavigate={handleNavigate} />;
      case "docs-micro-block-library":
        return <MicroBlockLibraryPage onNavigate={handleNavigate} />;
      case "docs-content-mapping":
        return <ContentMappingPage onNavigate={handleNavigate} />;
      case "docs-video-library-audit":
        return <VideoLibraryAuditPage onNavigate={handleNavigate} />;
      case "docs-navicue-suite":
        return <NaviCueSuitePage onNavigate={handleNavigate} />;
      case "docs-journey-infrastructure":
        return <JourneyInfrastructurePage onNavigate={handleNavigate} />;
      case "content-library-showcase":
        return <ContentLibraryShowcase />;
      
      case "navicue-arsenal-demo":
        return <NaviCueArsenalDemo />;
      
      case "belief-sequence-demo":
        return <BeliefSequenceDemoPage onNavigate={handleNavigate} />;
      
      case "trust-experience":
        return <TrustExperiencePage onNavigate={handleNavigate} />;
      
      case "navicue-test-1":
        return <NaviCueTest1 onNavigate={handleNavigate} />;
      
      case "navicue-batch-1-viewer":
        return <NaviCueBatch1Viewer onNavigate={handleNavigate} />;
      
      case "navicue-master-index":
        return <NaviCueMasterIndex onNavigate={handleNavigate} />;
      
      case "navicue-batch-2-viewer":
        return <NaviCueBatch2Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-3-viewer":
        return <NaviCueBatch3Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-4-viewer":
        return <NaviCueBatch4Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-5-viewer":
        return <NaviCueBatch5Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-6-viewer":
        return <NaviCueBatch6Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-7-viewer":
        return <NaviCueBatch7Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-8-viewer":
        return <NaviCueBatch8Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-9-viewer":
        return <NaviCueBatch9Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-10-viewer":
        return <NaviCueBatch10Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-11-viewer":
        return <NaviCueBatch11Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-12-viewer":
        return <NaviCueBatch12Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-13-viewer":
        return <NaviCueBatch13Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-14-viewer":
        return <NaviCueBatch14Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-15-viewer":
        return <NaviCueBatch15Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-16-viewer":
        return <NaviCueBatch16Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-17-viewer":
        return <NaviCueBatch17Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-18-viewer":
        return <NaviCueBatch18Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-19-viewer":
        return <NaviCueBatch19Viewer onNavigate={handleNavigate} />;
      
      case "navicue-batch-20-viewer":
        return <NaviCueBatch20Viewer onNavigate={handleNavigate} />;
      
      case "navicue-arsenal":
        return <NaviCueArsenalPage onNavigate={handleNavigate} />;
      
      case "navicue-arsenal-v2":
        return <NaviCueArsenalPageV2 onNavigate={handleNavigate} />;
      
      case "navicue-arsenal-v3":
        return <NaviCueArsenalPageV3 onNavigate={handleNavigate} />;
      
      // NEW: Arsenal batch pages (Clinical, Guru, Infinite)
      case "clinical-sc-batch":
        return <ClinicalSCBatch onNavigate={handleNavigate} />;
      
      case "clinical-cr-batch":
        return <ClinicalCRBatch onNavigate={handleNavigate} />;
      
      case "clinical-ii-batch":
        return <ClinicalIIBatch onNavigate={handleNavigate} />;
      
      case "clinical-dm-batch":
        return <ClinicalDMBatch onNavigate={handleNavigate} />;
      
      case "guru-ram-dass-batch":
        return <GuruRamDassBatch onNavigate={handleNavigate} />;
      
      case "guru-pema-batch":
        return <GuruPemaBatch onNavigate={handleNavigate} />;
      
      case "guru-thich-batch":
        return <GuruThichBatch onNavigate={handleNavigate} />;
      
      case "guru-kornfield-batch":
        return <GuruKornfieldBatch onNavigate={handleNavigate} />;
      
      case "infinite-quantum-batch":
        return <InfiniteQuantumBatch onNavigate={handleNavigate} />;
      
      case "infinite-music-batch":
        return <InfiniteMusicBatch onNavigate={handleNavigate} />;
      
      case "navicue-arsenal-browser":
        return <NaviCueArsenalBrowserPage onNavigate={handleNavigate} />;
      
      case "creative-playground":
        return <CreativePlaygroundPage onNavigate={handleNavigate} />;
      
      // ========== PLATFORM PAGES (8) ==========
      case "Navicues":
        return <NavicuesPage onNavigate={handleNavigate} />;
      case "Wellbeing":
        return <WellbeingPageV5 />;
      case "State":
        return <StatePage patientId={currentPatientId} />;
      case "Toolkit":
        return <ToolkitPage onNavigate={handleNavigate} />;
      case "Navigate":
        return <NavigatePage onNavigate={handleNavigate} />;
      case "Momentum":
        return <MomentumPageV2 patientId={currentPatientId!} />;
      case "Profile":
        return <ProfilePage onNavigate={handleNavigate} onLogout={() => { setIsAuthenticated(false); handleNavigate("Login"); }} />;
      
      default:
        return <DashboardPage onNavigate={handleNavigate} onNavigateToWebsite={() => handleNavigate("Website")} />;
    }
  };

  // Check if current page is a marketing page or login
  const isMarketingPage = currentPage === "Website" || currentPage.startsWith("marketing-") || currentPage === "Login";
  
  // Check if we're in Command Center mode (docs, admin, design pages)
  const isCommandCenterMode = currentPage === "cc2" ||
                               currentPage === "command-center" ||
                               currentPage === "command-center-navicue-arsenal" ||
                               currentPage === "command-center-journey-arsenal" ||
                               currentPage === "schema-exposure" ||
                               currentPage === "command-center-patterns" ||
                               currentPage === "backend-admin" ||
                               currentPage.startsWith("docs-") || 
                               currentPage.startsWith("admin-") || 
                               currentPage.startsWith("dna-") || 
                               currentPage.startsWith("demo-") ||
                               currentPage === "content-lab";

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LumaPlayerProvider>
          <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation - Switch between Command Center and Patient Nav */}
        {!isMarketingPage && (
          <Suspense fallback={<PageLoader />}>
            {isCommandCenterMode ? (
              <CommandCenterNav
                onNavigate={handleNavigate}
              />
            ) : (
              <RecoverlutionNav 
                currentPage={currentPage} 
                onNavigate={handleNavigate} 
                onOpenLuma={() => {
                  setLumaScreen('voice'); // Open directly to VOICE when clicking mic
                  setIsLumaOpen(true);
                }}
              />
            )}
          </Suspense>
        )}
        <div className="flex-1 w-full">
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
        </div>
        
        {/* Platform Footer - Shows on patient-facing pages only */}
        {!isMarketingPage && !isCommandCenterMode && (
          <Suspense fallback={null}>
            <PlatformFooter 
              onNavigate={handleNavigate}
            />
          </Suspense>
        )}
        
        {/* Platform Tour - First-time onboarding */}
        {showPlatformTour && currentPage === "Dashboard" && (
          <Suspense fallback={null}>
            <PlatformTourOverlay
              currentStep={tourStep}
              onNext={() => {
                const nextStep = tourStep + 1;
                if (nextStep >= 8) {
                  // Last step - mark as completed and open LUMA
                  console.log('🎯 Platform Tour Complete - Opening LUMA with isFirstTimeUser:', isFirstTimeUser);
                  markTourCompleted(); // Save completion to localStorage
                  setShowPlatformTour(false);
                  setTourStep(0);
                  setIsLumaOpen(true);
                } else {
                  setTourStep(nextStep);
                }
              }}
              onSkip={() => {
                // User said "I've got it" - mark as skipped
                markTourSkipped(); // Save skip to localStorage
                console.log('👍 User skipped tour - won\'t show again');
                setShowPlatformTour(false);
                setTourStep(0);
              }}
              onClose={() => {
                // Close button also counts as skip
                markTourSkipped(); // Save skip to localStorage
                setShowPlatformTour(false);
                setTourStep(0);
              }}
            />
          </Suspense>
        )}

        {/* LUMA Floating Access Button - Always available */}
        {!isMarketingPage && !isCommandCenterMode && (
          <Suspense fallback={null}>
            <LumaFloatingButton onClick={() => {
              console.log('LUMA button clicked!'); 
              console.log('Current isLumaOpen:', isLumaOpen);
              console.log('Setting lumaScreen to home and isLumaOpen to true');
              setLumaScreen('home'); // Reset to home when opening
              setIsLumaOpen(true);
            }} />
          </Suspense>
        )}
        
        {/* LUMA3 - The Sentient Antenna (4 screens: HOME | VOICE | TALK | PLAY) */}
        {isLumaOpen && (
          <Suspense fallback={null}>
            {console.log('🎯 LUMA is rendering! Screen:', lumaScreen)}
            {lumaScreen === 'home' ? (
              <LumaHome 
                onClose={() => setIsLumaOpen(false)} 
                onNavigateToVoice={() => setLumaScreen('voice')}
                onNavigateToPlay={() => setLumaScreen('play')}
                onNavigateToTalk={() => setLumaScreen('talk')}
                helpMode={lumaHelpMode}
                onToggleHelpMode={() => setLumaHelpMode(!lumaHelpMode)}
              />
            ) : lumaScreen === 'voice' ? (
              <LumaVoice 
                onClose={() => setLumaScreen('home')} 
                onNavigateHome={() => setLumaScreen('home')}
                onNavigateToPlay={() => setLumaScreen('play')}
              />
            ) : lumaScreen === 'play' ? (
              <LumaPlay 
                onClose={() => setIsLumaOpen(false)} 
                onNavigateHome={() => setLumaScreen('home')}
                onNavigateToVoice={() => setLumaScreen('voice')}
              />
            ) : (
              <LumaTalk 
                onClose={() => setIsLumaOpen(false)} 
              />
            )}
          </Suspense>
        )}
        
        {/* Keyboard Shortcuts Overlay - Press ? to open */}
        <Suspense fallback={null}>
          <KeyboardShortcutsOverlay />
        </Suspense>
        </div>
        </LumaPlayerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
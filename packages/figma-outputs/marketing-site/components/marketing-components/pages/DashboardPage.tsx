import { DashboardTileClass } from "../DashboardTileClass";
import { 
  Sparkles,      // Journey
  Compass,       // Navicues
  Heart,         // Wellbeing
  Wrench,        // Toolkit
  Activity,      // State
  Network,       // Navigate
  TrendingUp     // Momentum
} from 'lucide-react';

/**
 * DASHBOARD PAGE - infiniteK Design System v20.1
 * PIXEL-PERFECT RESPONSIVE - December 2025
 * 
 * - Preserves your exact pixel-perfect layout (1360×860 canvas)
 * - Scales proportionally to fit any screen size
 * - Uses CSS transform: scale() for perfect aspect ratio preservation
 * - Brand-aligned copy (lowercase, periods, no dashes)
 * - Compound glass with premium shadows
 * - 12s shimmer animations
 * - Apple-grade hover effects
 */

import { DASHBOARD_ASSETS } from '../../utils/dashboardAssetManifest';

type PageType = "Dashboard" | "Journey" | "Navicues" | "Wellbeing" | "State" | "Toolkit" | "Navigate" | "Momentum";

interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
  onNavigateToWebsite?: () => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 50%, #F5F3FF 100%)' }}>
      
      {/* ============================================
          DESKTOP: Pixel-Perfect Layout with Responsive Scaling (1024px+)
          Your original 1360×860 canvas scales to fit viewport
          ============================================ */}
      <div className="hidden lg:block w-full h-screen overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            padding: 'clamp(20px, 3vh, 48px) clamp(20px, 3vw, 48px)'
          }}
        >
          {/* Scaling Container - maintains aspect ratio */}
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Canvas - Your Pixel-Perfect 1360×860 Layout */}
            <div 
              className="dashboard-canvas-desktop" 
              style={{ 
                width: '1360px', 
                height: '860px',
                position: 'relative',
                transformOrigin: 'center center',
                transform: 'scale(var(--dashboard-scale))',
                maxWidth: 'none'
              }}
            >
            
            {/* Journey: Large hero tile (0,0 → 960×360) */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 360 }}>
              <DashboardTileClass
                icon={Sparkles}
                iconColor="#5739FB"
                title="JOURNEY"
                subtitle="a timeless path to where you belong, as yourself"
                backgroundAsset={DASHBOARD_ASSETS.journey}
                onClick={() => onNavigate("Journey")}
                animationDelay={0}
                width={960}
                height={360}
              />
            </div>
            
            {/* Navicues: Square tile (1000,0 → 360×360) */}
            <div style={{ position: 'absolute', left: 1000, top: 0, width: 360, height: 360 }}>
              <DashboardTileClass
                icon={Compass}
                iconColor="#40E0D0"
                title="NAVICUES"
                subtitle="timely wisdom"
                backgroundAsset={DASHBOARD_ASSETS.navicues}
                onClick={() => onNavigate("Navicues")}
                animationDelay={0.1}
                width={360}
                height={360}
              />
            </div>
            
            {/* Wellbeing: Wide tile (0,400 → 680×320) */}
            <div style={{ position: 'absolute', left: 0, top: 400, width: 680, height: 320 }}>
              <DashboardTileClass
                icon={Heart}
                iconColor="#5739FB"
                title="WELLBEING"
                subtitle="nourishment for mind, body and soul"
                backgroundAsset={DASHBOARD_ASSETS.wellbeing}
                onClick={() => onNavigate("Wellbeing")}
                animationDelay={0.2}
                width={680}
                height={320}
              />
            </div>
            
            {/* State: Tall tile (720,400 → 240×460) */}
            <div style={{ position: 'absolute', left: 720, top: 400, width: 240, height: 460 }}>
              <DashboardTileClass
                icon={Activity}
                iconColor="#40E0D0"
                title="STATE"
                subtitle="inner compass"
                backgroundAsset={DASHBOARD_ASSETS.state}
                onClick={() => onNavigate("State")}
                animationDelay={0.3}
                width={240}
                height={460}
              />
            </div>
            
            {/* Navigate (1000,400 → 360×210) */}
            <div style={{ position: 'absolute', left: 1000, top: 400, width: 360, height: 210 }}>
              <DashboardTileClass
                icon={Network}
                iconColor="#40E0D0"
                title="NAVIGATE"
                subtitle="connected care network"
                backgroundAsset={DASHBOARD_ASSETS.navigate}
                onClick={() => onNavigate("Navigate")}
                animationDelay={0.4}
                width={360}
                height={210}
              />
            </div>
            
            {/* Momentum (1000,650 → 360×210) */}
            <div style={{ position: 'absolute', left: 1000, top: 650, width: 360, height: 210 }}>
              <DashboardTileClass
                icon={TrendingUp}
                iconColor="#40E0D0"
                title="MOMENTUM"
                subtitle="guiding heartbeat"
                backgroundAsset={DASHBOARD_ASSETS.momentum}
                onClick={() => onNavigate("Momentum")}
                animationDelay={0.5}
                width={360}
                height={210}
              />
            </div>
            
            {/* Toolkit: Banner (0,760 → 680×100) */}
            <div style={{ position: 'absolute', left: 0, top: 760, width: 680, height: 100 }}>
              <DashboardTileClass
                icon={Wrench}
                iconColor="#5739FB"
                title="TOOLKIT"
                subtitle="precision practices for everyday moments"
                backgroundAsset={DASHBOARD_ASSETS.toolkit}
                onClick={() => onNavigate("Toolkit")}
                animationDelay={0.6}
                width={680}
                height={100}
              />
            </div>
            
            </div>
          </div>
        </div>

        {/* CSS to calculate scale dynamically */}
        <style>{`
          .dashboard-canvas-desktop {
            --dashboard-scale: min(
              calc((100vw - clamp(40px, 6vw, 96px)) / 1360),
              calc((100vh - clamp(40px, 6vh, 96px)) / 860)
            );
          }
        `}</style>
      </div>
      
      {/* ============================================
          TABLET: 2-Column Grid (768px - 1023px)
          ============================================ */}
      <div className="hidden md:block lg:hidden">
        <div className="py-6 px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="space-y-6">
            
            {/* Journey - Full width hero */}
            <div className="w-full" style={{ height: 'clamp(200px, 25vh, 280px)' }}>
              <DashboardTileClass
                icon={Sparkles}
                iconColor="#5739FB"
                title="JOURNEY"
                subtitle="a timeless path to where you belong, as yourself"
                backgroundAsset={DASHBOARD_ASSETS.journey}
                onClick={() => onNavigate("Journey")}
                animationDelay={0}
              />
            </div>
            
            {/* Row 1: Navicues + Wellbeing */}
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full" style={{ height: 'clamp(200px, 25vh, 280px)' }}>
                <DashboardTileClass
                  icon={Compass}
                  iconColor="#40E0D0"
                  title="NAVICUES"
                  subtitle="timely wisdom"
                  backgroundAsset={DASHBOARD_ASSETS.navicues}
                  onClick={() => onNavigate("Navicues")}
                  animationDelay={0.1}
                />
              </div>
              
              <div className="w-full" style={{ height: 'clamp(200px, 25vh, 280px)' }}>
                <DashboardTileClass
                  icon={Heart}
                  iconColor="#5739FB"
                  title="WELLBEING"
                  subtitle="nourishment for mind, body and soul"
                  backgroundAsset={DASHBOARD_ASSETS.wellbeing}
                  onClick={() => onNavigate("Wellbeing")}
                  animationDelay={0.2}
                />
              </div>
            </div>
            
            {/* Row 2: State + Navigate */}
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full" style={{ height: 'clamp(240px, 30vh, 320px)' }}>
                <DashboardTileClass
                  icon={Activity}
                  iconColor="#40E0D0"
                  title="STATE"
                  subtitle="inner compass"
                  backgroundAsset={DASHBOARD_ASSETS.state}
                  onClick={() => onNavigate("State")}
                  animationDelay={0.3}
                />
              </div>
              
              <div className="w-full" style={{ height: 'clamp(240px, 30vh, 320px)' }}>
                <DashboardTileClass
                  icon={Network}
                  iconColor="#40E0D0"
                  title="NAVIGATE"
                  subtitle="connected care network"
                  backgroundAsset={DASHBOARD_ASSETS.navigate}
                  onClick={() => onNavigate("Navigate")}
                  animationDelay={0.4}
                />
              </div>
            </div>
            
            {/* Row 3: Momentum + Toolkit */}
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full" style={{ height: 'clamp(180px, 22vh, 240px)' }}>
                <DashboardTileClass
                  icon={TrendingUp}
                  iconColor="#40E0D0"
                  title="MOMENTUM"
                  subtitle="guiding heartbeat"
                  backgroundAsset={DASHBOARD_ASSETS.momentum}
                  onClick={() => onNavigate("Momentum")}
                  animationDelay={0.5}
                />
              </div>
              
              <div className="w-full" style={{ height: 'clamp(180px, 22vh, 240px)' }}>
                <DashboardTileClass
                  icon={Wrench}
                  iconColor="#5739FB"
                  title="TOOLKIT"
                  subtitle="precision practices for everyday moments"
                  backgroundAsset={DASHBOARD_ASSETS.toolkit}
                  onClick={() => onNavigate("Toolkit")}
                  animationDelay={0.6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ============================================
          MOBILE: Single Column Stack (<768px)
          ============================================ */}
      <div className="md:hidden py-4 px-4">
        <div className="max-w-lg mx-auto space-y-4">
          
          {/* Journey - Hero */}
          <div className="w-full" style={{ height: 'clamp(180px, 35vw, 220px)' }}>
            <DashboardTileClass
              icon={Sparkles}
              iconColor="#5739FB"
              title="JOURNEY"
              subtitle="a timeless path to where you belong, as yourself"
              backgroundAsset={DASHBOARD_ASSETS.journey}
              onClick={() => onNavigate("Journey")}
              animationDelay={0}
            />
          </div>
          
          {/* Navicues */}
          <div className="w-full" style={{ height: 'clamp(180px, 35vw, 220px)' }}>
            <DashboardTileClass
              icon={Compass}
              iconColor="#40E0D0"
              title="NAVICUES"
              subtitle="timely wisdom"
              backgroundAsset={DASHBOARD_ASSETS.navicues}
              onClick={() => onNavigate("Navicues")}
              animationDelay={0.1}
            />
          </div>
          
          {/* Wellbeing */}
          <div className="w-full" style={{ height: 'clamp(180px, 35vw, 220px)' }}>
            <DashboardTileClass
              icon={Heart}
              iconColor="#5739FB"
              title="WELLBEING"
              subtitle="nourishment for mind, body and soul"
              backgroundAsset={DASHBOARD_ASSETS.wellbeing}
              onClick={() => onNavigate("Wellbeing")}
              animationDelay={0.2}
            />
          </div>
          
          {/* State */}
          <div className="w-full" style={{ height: 'clamp(200px, 40vw, 260px)' }}>
            <DashboardTileClass
              icon={Activity}
              iconColor="#40E0D0"
              title="STATE"
              subtitle="inner compass"
              backgroundAsset={DASHBOARD_ASSETS.state}
              onClick={() => onNavigate("State")}
              animationDelay={0.3}
            />
          </div>
          
          {/* Navigate */}
          <div className="w-full" style={{ height: 'clamp(160px, 32vw, 200px)' }}>
            <DashboardTileClass
              icon={Network}
              iconColor="#40E0D0"
              title="NAVIGATE"
              subtitle="connected care network"
              backgroundAsset={DASHBOARD_ASSETS.navigate}
              onClick={() => onNavigate("Navigate")}
              animationDelay={0.4}
            />
          </div>
          
          {/* Momentum */}
          <div className="w-full" style={{ height: 'clamp(160px, 32vw, 200px)' }}>
            <DashboardTileClass
              icon={TrendingUp}
              iconColor="#40E0D0"
              title="MOMENTUM"
              subtitle="guiding heartbeat"
              backgroundAsset={DASHBOARD_ASSETS.momentum}
              onClick={() => onNavigate("Momentum")}
              animationDelay={0.5}
            />
          </div>
          
          {/* Toolkit */}
          <div className="w-full" style={{ height: 'clamp(120px, 24vw, 160px)' }}>
            <DashboardTileClass
              icon={Wrench}
              iconColor="#5739FB"
              title="TOOLKIT"
              subtitle="precision practices for everyday moments"
              backgroundAsset={DASHBOARD_ASSETS.toolkit}
              onClick={() => onNavigate("Toolkit")}
              animationDelay={0.6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

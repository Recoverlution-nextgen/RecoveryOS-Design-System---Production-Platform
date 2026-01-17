/**
 * COMMAND CENTER HOME PAGE V2
 * 
 * Main dashboard for all 6 Control Rooms.
 * Built on CommandCenterLayout framework.
 * 
 * Created: December 26, 2025
 * Status: Foundation Complete
 */

import React, { useState } from 'react';
import { 
  CommandCenterLayout, 
  CommandCenterCard, 
  SectionHeader,
  StatusBadge,
  CC_TOKENS,
} from '../commandcenter/CommandCenterLayout';
import { 
  CONTROL_ROOMS,
  getCommandCenterStats,
  getBuildOrder,
  areDependenciesMet,
  type ControlRoom,
} from '../commandcenter/CommandCenterRegistry';

interface CommandCenterHomePageProps {
  onNavigate: (page: string) => void;
}

export default function CommandCenterHomePageV2({ onNavigate }: CommandCenterHomePageProps) {
  const [view, setView] = useState<'overview' | 'roadmap' | 'dependencies'>('overview');
  const stats = getCommandCenterStats();
  const buildOrder = getBuildOrder();

  const views = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'roadmap', label: 'Build Roadmap', icon: '🗺️' },
    { id: 'dependencies', label: 'Dependencies', icon: '🔗' },
  ];

  const headerStats = [
    {
      label: 'Control Rooms',
      value: `${stats.controlRooms.complete}/${stats.controlRooms.total}`,
      status: stats.controlRooms.complete === stats.controlRooms.total ? 'success' as const : 'warning' as const,
    },
    {
      label: 'Views',
      value: `${stats.views.complete}/${stats.views.total}`,
      status: stats.views.complete === stats.views.total ? 'success' as const : 'warning' as const,
    },
    {
      label: 'Completion',
      value: `${stats.controlRooms.completionPercentage}%`,
      status: stats.controlRooms.completionPercentage === 100 ? 'success' as const : 'warning' as const,
    },
  ];

  return (
    <CommandCenterLayout
      title="Command Center"
      subtitle="6 Control Rooms · Everything connects · Nothing is built in isolation"
      icon="🎛️"
      currentView={view}
      views={views}
      onViewChange={(viewId) => setView(viewId as any)}
      onNavigate={onNavigate}
      stats={headerStats}
    >
      {view === 'overview' && <OverviewView onNavigate={onNavigate} />}
      {view === 'roadmap' && <RoadmapView buildOrder={buildOrder} />}
      {view === 'dependencies' && <DependenciesView />}
    </CommandCenterLayout>
  );
}

// ============================================================================
// VIEW 1: OVERVIEW (6 Control Room Cards)
// ============================================================================

function OverviewView({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="6 Control Rooms"
        subtitle="Each room manages a critical part of the Recoverlution platform"
        icon="🎛️"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CONTROL_ROOMS.map((room) => (
          <ControlRoomCard
            key={room.id}
            room={room}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

function ControlRoomCard({ 
  room, 
  onNavigate 
}: { 
  room: ControlRoom; 
  onNavigate: (page: string) => void;
}) {
  const dependenciesMet = areDependenciesMet(room.id);
  const canBuild = dependenciesMet || room.dependencies.length === 0;
  
  const completeViews = room.views.filter((v) => v.status === 'complete').length;
  const totalViews = room.views.length;

  return (
    <CommandCenterCard 
      hover={room.status === 'complete'} 
      border={room.status === 'complete' ? 'strong' : 'subtle'}
      onClick={() => {
        if (room.status === 'complete') {
          if (room.route.startsWith('/command-center/')) {
            // Internal route
            onNavigate(room.route.replace('/command-center/', 'command-center-'));
          } else {
            // External route (like navicue-arsenal)
            onNavigate(room.route.replace('/', ''));
          }
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{room.icon}</span>
          <div>
            <h3 
              style={{ 
                color: CC_TOKENS.colors.text.primary,
                fontSize: CC_TOKENS.typography.h3.fontSize,
                marginBottom: '4px',
              }}
            >
              {room.name}
            </h3>
            <p 
              style={{ 
                color: CC_TOKENS.colors.text.secondary,
                fontSize: CC_TOKENS.typography.body.fontSize,
              }}
            >
              {room.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <StatusBadge
            status={
              room.status === 'complete' ? 'success' :
              room.status === 'in_progress' ? 'warning' :
              'neutral'
            }
            label={
              room.status === 'complete' ? 'Complete' :
              room.status === 'in_progress' ? 'In Progress' :
              'Planned'
            }
          />
          
          <StatusBadge
            status={
              room.priority === 'critical' ? 'error' :
              room.priority === 'high' ? 'warning' :
              'neutral'
            }
            label={`Priority: ${room.priority}`}
          />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span 
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.small.fontSize,
            }}
          >
            Views: {completeViews}/{totalViews}
          </span>
          <span 
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.small.fontSize,
            }}
          >
            {Math.round((completeViews / totalViews) * 100)}%
          </span>
        </div>
        <div 
          className="h-2"
          style={{ 
            backgroundColor: CC_TOKENS.colors.bg.card,
            border: `1px solid ${CC_TOKENS.colors.border.subtle}`,
          }}
        >
          <div
            style={{
              width: `${(completeViews / totalViews) * 100}%`,
              height: '100%',
              backgroundColor: CC_TOKENS.colors.brand.primary,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Dependencies */}
      {room.dependencies.length > 0 && (
        <div className="mb-4">
          <div 
            className="mb-2"
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.small.fontSize,
            }}
          >
            Dependencies:
          </div>
          <div className="flex flex-wrap gap-2">
            {room.dependencies.map((depId) => {
              const dep = CONTROL_ROOMS.find((r) => r.id === depId);
              if (!dep) return null;
              
              return (
                <span 
                  key={depId}
                  className="px-2 py-1"
                  style={{
                    backgroundColor: dep.status === 'complete' 
                      ? `${CC_TOKENS.colors.status.success}20`
                      : `${CC_TOKENS.colors.status.warning}20`,
                    color: dep.status === 'complete' 
                      ? CC_TOKENS.colors.status.success
                      : CC_TOKENS.colors.status.warning,
                    fontSize: CC_TOKENS.typography.small.fontSize,
                    border: `1px solid ${dep.status === 'complete' 
                      ? `${CC_TOKENS.colors.status.success}40`
                      : `${CC_TOKENS.colors.status.warning}40`}`,
                  }}
                >
                  {dep.icon} {dep.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Connections */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t" style={{ borderColor: CC_TOKENS.colors.border.subtle }}>
        <div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.tertiary,
              fontSize: CC_TOKENS.typography.small.fontSize,
              marginBottom: '4px',
            }}
          >
            Tables
          </div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.body.fontSize,
            }}
          >
            {room.connections.tables.length}
          </div>
        </div>
        <div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.tertiary,
              fontSize: CC_TOKENS.typography.small.fontSize,
              marginBottom: '4px',
            }}
          >
            APIs
          </div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.body.fontSize,
            }}
          >
            {room.connections.apis.length}
          </div>
        </div>
        <div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.tertiary,
              fontSize: CC_TOKENS.typography.small.fontSize,
              marginBottom: '4px',
            }}
          >
            Components
          </div>
          <div 
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.body.fontSize,
            }}
          >
            {room.connections.components.length}
          </div>
        </div>
      </div>

      {/* Open button for complete rooms */}
      {room.status === 'complete' && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: CC_TOKENS.colors.border.subtle }}>
          <button
            onClick={() => {
              if (room.id === 'navicue-arsenal') {
                onNavigate('command-center-navicue-arsenal');
              } else {
                onNavigate(room.route.replace('/', ''));
              }
            }}
            className="w-full py-2 transition-all hover:opacity-80"
            style={{
              backgroundColor: CC_TOKENS.colors.brand.primary,
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.body.fontSize,
              border: `1px solid ${CC_TOKENS.colors.brand.secondary}`,
            }}
          >
            Open {room.name} →
          </button>
        </div>
      )}
    </CommandCenterCard>
  );
}

// ============================================================================
// VIEW 2: BUILD ROADMAP (Sequential Build Order)
// ============================================================================

function RoadmapView({ buildOrder }: { buildOrder: string[] }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Build Roadmap"
        subtitle="Sequential build order based on dependencies"
        icon="🗺️"
      />

      <div className="space-y-4">
        {buildOrder.map((roomId, index) => {
          const room = CONTROL_ROOMS.find((r) => r.id === roomId);
          if (!room) return null;

          return (
            <CommandCenterCard key={roomId}>
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 flex items-center justify-center border"
                  style={{
                    backgroundColor: CC_TOKENS.colors.bg.card,
                    borderColor: CC_TOKENS.colors.border.medium,
                    color: CC_TOKENS.colors.text.primary,
                    fontSize: CC_TOKENS.typography.h2.fontSize,
                  }}
                >
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{room.icon}</span>
                    <h3 
                      style={{ 
                        color: CC_TOKENS.colors.text.primary,
                        fontSize: CC_TOKENS.typography.h3.fontSize,
                      }}
                    >
                      {room.name}
                    </h3>
                    <StatusBadge
                      status={
                        room.status === 'complete' ? 'success' :
                        room.status === 'in_progress' ? 'warning' :
                        'neutral'
                      }
                      label={room.status === 'complete' ? '✓ Complete' : room.status === 'in_progress' ? '⏳ In Progress' : '📋 Planned'}
                    />
                  </div>
                  <p 
                    style={{ 
                      color: CC_TOKENS.colors.text.secondary,
                      fontSize: CC_TOKENS.typography.body.fontSize,
                    }}
                  >
                    {room.description}
                  </p>
                </div>
              </div>
            </CommandCenterCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: DEPENDENCIES (Dependency Graph)
// ============================================================================

function DependenciesView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dependency Graph"
        subtitle="Visual map of how Control Rooms depend on each other"
        icon="🔗"
      />

      <CommandCenterCard>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🕸️</div>
          <h3 
            className="mb-2"
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.h3.fontSize,
            }}
          >
            Dependency Graph Visualization
          </h3>
          <p 
            className="mb-6"
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: CC_TOKENS.typography.body.fontSize,
            }}
          >
            Interactive graph showing how Control Rooms connect
            <br />
            Coming soon...
          </p>
        </div>
      </CommandCenterCard>
    </div>
  );
}
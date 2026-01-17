import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckSquare, 
  Users, 
  Folder, 
  GitBranch, 
  Calendar,
  AlertCircle,
  Clock,
  TrendingUp,
  Database,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

/**
 * BACKEND ADMIN PAGE
 * 
 * Central hub for Notion + Jira integration
 * - View projects and tasks
 * - Sync documentation
 * - Create issues
 * - Update pages
 * - Manage workflow
 */

interface BackendAdminPageProps {
  onNavigate?: (page: string) => void;
}

type ViewMode = 'overview' | 'notion' | 'jira' | 'sync';

export function BackendAdminPage({ onNavigate }: BackendAdminPageProps) {
  const [view, setView] = useState<ViewMode>('overview');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
                Backend Admin
              </h1>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Notion + Jira integration hub
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('command-center')}
                className="px-4 py-2 text-sm transition-opacity hover:opacity-70"
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                ← Back to Command Center
              </button>
            )}
          </div>

          {/* View selector */}
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: Database },
              { id: 'notion', label: 'Notion', icon: FileText },
              { id: 'jira', label: 'Jira', icon: CheckSquare },
              { id: 'sync', label: 'Sync Status', icon: RefreshCw },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewMode)}
                className="px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2"
                style={{
                  backgroundColor: view === item.id ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                  color: view === item.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {view === 'overview' && <OverviewView onNavigate={onNavigate} />}
        {view === 'notion' && <NotionView />}
        {view === 'jira' && <JiraView />}
        {view === 'sync' && <SyncView syncStatus={syncStatus} />}
      </div>
    </div>
  );
}

// ============================================================================
// OVERVIEW VIEW
// ============================================================================

function OverviewView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const stats = [
    { label: 'Notion Pages', value: '127', icon: FileText, color: '#000000' },
    { label: 'Active Jira Issues', value: '34', icon: CheckSquare, color: '#0052CC' },
    { label: 'Last Sync', value: '2 mins ago', icon: Clock, color: '#5739FB' },
    { label: 'Pending Tasks', value: '12', icon: AlertCircle, color: '#FF6B6B' },
  ];

  const quickActions = [
    {
      title: 'NaviCue Sync',
      description: 'Sync NaviCues from library to canonical schema',
      icon: Database,
      color: '#5739FB',
      action: 'navicue-sync',
    },
    {
      title: 'Create Jira Issue',
      description: 'Quick create from Figma Make build',
      icon: CheckSquare,
      color: '#0052CC',
      action: 'create-jira',
    },
    {
      title: 'Update Notion Docs',
      description: 'Sync latest documentation',
      icon: FileText,
      color: '#000000',
      action: 'update-notion',
    },
    {
      title: 'View All Projects',
      description: 'Browse Jira projects',
      icon: Folder,
      color: '#5739FB',
      action: 'view-projects',
    },
    {
      title: 'Search Workspace',
      description: 'Search across Notion + Jira',
      icon: Database,
      color: '#3E2BB8',
      action: 'search',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6"
            style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} style={{ color: stat.color }} />
              <div className="text-3xl" style={{ color: '#FFFFFF' }}>
                {stat.value}
              </div>
            </div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl mb-4" style={{ color: '#FFFFFF' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => {
                if (action.action === 'navicue-sync' && onNavigate) {
                  onNavigate('admin-navicue-sync');
                }
              }}
              className="p-6 text-left transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                borderLeft: `4px solid ${action.color}`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <action.icon size={24} style={{ color: action.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1" style={{ color: '#FFFFFF' }}>
                    {action.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl mb-4" style={{ color: '#FFFFFF' }}>
          Recent Activity
        </h2>
        <div className="space-y-2">
          {[
            { type: 'notion', action: 'Updated', item: 'PLATFORM_REVIEW.md', time: '2 mins ago' },
            { type: 'jira', action: 'Created', item: 'RECOVER-123: NaviCue Arsenal expansion', time: '15 mins ago' },
            { type: 'notion', action: 'Created', item: 'Feature Integrations Briefing', time: '1 hour ago' },
            { type: 'jira', action: 'Transitioned', item: 'RECOVER-122: My Brain Wave 2', time: '2 hours ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}
            >
              <div className="flex items-center gap-4">
                {activity.type === 'notion' ? (
                  <FileText size={20} style={{ color: '#000000' }} />
                ) : (
                  <CheckSquare size={20} style={{ color: '#0052CC' }} />
                )}
                <div>
                  <div className="text-sm" style={{ color: '#FFFFFF' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{activity.action}</span> {activity.item}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
              <ExternalLink size={16} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// NOTION VIEW
// ============================================================================

function NotionView() {
  const notionDocs = [
    {
      title: 'Recoverlution Platform Documentation',
      type: 'database',
      pages: 47,
      lastUpdated: 'Today',
      status: 'active',
    },
    {
      title: 'NaviCue Arsenal Specs',
      type: 'page',
      pages: 1,
      lastUpdated: '2 days ago',
      status: 'active',
    },
    {
      title: 'Clinical Blueprint',
      type: 'database',
      pages: 23,
      lastUpdated: '1 week ago',
      status: 'active',
    },
    {
      title: 'Design System Guide',
      type: 'page',
      pages: 1,
      lastUpdated: '3 days ago',
      status: 'active',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
          Notion Workspace
        </h2>
        <button
          className="px-4 py-2 text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
          }}
        >
          <FileText size={16} />
          Create Page
        </button>
      </div>

      {/* Documentation List */}
      <div className="space-y-2">
        {notionDocs.map((doc, index) => (
          <motion.div
            key={doc.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 flex items-center justify-between transition-all duration-200 hover:scale-[1.01]"
            style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={20} style={{ color: '#000000' }} />
                <h3 className="text-lg" style={{ color: '#FFFFFF' }}>
                  {doc.title}
                </h3>
                <span
                  className="px-2 py-1 text-xs"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {doc.type}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <span>{doc.pages} {doc.type === 'database' ? 'pages' : 'page'}</span>
                <span>Updated {doc.lastUpdated}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-xs transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                View
              </button>
              <button
                className="px-3 py-1 text-xs transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                Sync
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sync Actions */}
      <div className="p-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <h3 className="text-lg mb-4" style={{ color: '#FFFFFF' }}>
          Documentation to Sync
        </h3>
        <div className="space-y-2">
          {[
            { name: 'PLATFORM_REVIEW.md', status: 'pending' },
            { name: 'FEATURE_INTEGRATIONS_BRIEFING.md', status: 'pending' },
            { name: 'MY_BRAIN_WAVE_2_BRIEFING.md', status: 'pending' },
            { name: 'CLINICAL_ARSENAL_EXPANSION_FRAMEWORK.md', status: 'pending' },
          ].map((doc) => (
            <div
              key={doc.name}
              className="p-3 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}
            >
              <div className="flex items-center gap-3">
                <FileText size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <span className="text-sm" style={{ color: '#FFFFFF' }}>
                  {doc.name}
                </span>
              </div>
              <button
                className="px-3 py-1 text-xs transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: '#5739FB',
                  color: '#FFFFFF',
                }}
              >
                Push to Notion
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// JIRA VIEW
// ============================================================================

function JiraView() {
  const projects = [
    { key: 'RECOVER', name: 'Recoverlution Platform', issues: 156, active: 34 },
    { key: 'NAVICUE', name: 'NaviCue System', issues: 89, active: 12 },
    { key: 'DESIGN', name: 'Design System', issues: 45, active: 8 },
  ];

  const recentIssues = [
    {
      key: 'RECOVER-123',
      title: 'NaviCue Arsenal Expansion',
      status: 'In Progress',
      assignee: 'You',
      priority: 'High',
    },
    {
      key: 'RECOVER-122',
      title: 'My Brain Wave 2 Components',
      status: 'Done',
      assignee: 'You',
      priority: 'High',
    },
    {
      key: 'NAVICUE-45',
      title: 'Feature Integrations Tab',
      status: 'Done',
      assignee: 'You',
      priority: 'Medium',
    },
    {
      key: 'DESIGN-12',
      title: 'infiniteK Design System Updates',
      status: 'To Do',
      assignee: 'Unassigned',
      priority: 'Low',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
          Jira Projects
        </h2>
        <button
          className="px-4 py-2 text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            backgroundColor: '#0052CC',
            color: '#FFFFFF',
          }}
        >
          <CheckSquare size={16} />
          Create Issue
        </button>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6"
            style={{ backgroundColor: 'rgba(0, 82, 204, 0.1)' }}
          >
            <div className="mb-4">
              <div
                className="inline-block px-2 py-1 text-xs mb-2"
                style={{
                  backgroundColor: '#0052CC',
                  color: '#FFFFFF',
                }}
              >
                {project.key}
              </div>
              <h3 className="text-lg" style={{ color: '#FFFFFF' }}>
                {project.name}
              </h3>
            </div>
            <div className="space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              <div className="flex justify-between">
                <span>Total Issues:</span>
                <span style={{ color: '#FFFFFF' }}>{project.issues}</span>
              </div>
              <div className="flex justify-between">
                <span>Active:</span>
                <span style={{ color: '#5739FB' }}>{project.active}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Issues */}
      <div>
        <h3 className="text-lg mb-4" style={{ color: '#FFFFFF' }}>
          Recent Issues
        </h3>
        <div className="space-y-2">
          {recentIssues.map((issue, index) => (
            <motion.div
              key={issue.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}
            >
              <div className="flex items-center gap-4 flex-1">
                <CheckSquare size={20} style={{ color: '#0052CC' }} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs px-2 py-1"
                      style={{
                        backgroundColor: 'rgba(0, 82, 204, 0.2)',
                        color: '#0052CC',
                      }}
                    >
                      {issue.key}
                    </span>
                    <span className="text-sm" style={{ color: '#FFFFFF' }}>
                      {issue.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    <span>{issue.assignee}</span>
                    <span>•</span>
                    <span>{issue.priority} Priority</span>
                  </div>
                </div>
              </div>
              <div
                className="px-3 py-1 text-xs"
                style={{
                  backgroundColor:
                    issue.status === 'Done'
                      ? 'rgba(76, 175, 80, 0.2)'
                      : issue.status === 'In Progress'
                      ? 'rgba(33, 150, 243, 0.2)'
                      : 'rgba(156, 39, 176, 0.2)',
                  color:
                    issue.status === 'Done'
                      ? '#4CAF50'
                      : issue.status === 'In Progress'
                      ? '#2196F3'
                      : '#9C27B0',
                }}
              >
                {issue.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SYNC VIEW
// ============================================================================

interface SyncViewProps {
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
}

function SyncView({ syncStatus }: SyncViewProps) {
  const syncItems = [
    {
      source: 'Figma Make',
      destination: 'Notion',
      items: ['Documentation', 'Briefings', 'Frameworks'],
      status: 'pending',
    },
    {
      source: 'Figma Make',
      destination: 'Jira',
      items: ['Issues', 'Tasks', 'Epics'],
      status: 'pending',
    },
    {
      source: 'Notion',
      destination: 'Figma Make',
      items: ['Requirements', 'Specs'],
      status: 'idle',
    },
    {
      source: 'Jira',
      destination: 'Figma Make',
      items: ['Issue Updates', 'Comments'],
      status: 'idle',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
          Sync Status
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Manage data flow between Figma Make, Notion, and Jira
        </p>
      </div>

      {/* Sync Diagram */}
      <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
        <div className="flex items-center justify-center gap-8">
          {/* Figma Make */}
          <div className="text-center">
            <div
              className="w-24 h-24 flex items-center justify-center mb-3"
              style={{ backgroundColor: '#5739FB' }}
            >
              <Database size={40} style={{ color: '#FFFFFF' }} />
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              Figma Make
            </div>
          </div>

          {/* Arrows */}
          <div className="flex flex-col gap-4">
            <GitBranch size={24} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <GitBranch size={24} style={{ color: 'rgba(255, 255, 255, 0.4)', transform: 'rotate(180deg)' }} />
          </div>

          {/* Notion */}
          <div className="text-center">
            <div
              className="w-24 h-24 flex items-center justify-center mb-3"
              style={{ backgroundColor: '#000000' }}
            >
              <FileText size={40} style={{ color: '#FFFFFF' }} />
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              Notion
            </div>
          </div>

          {/* Arrows */}
          <div className="flex flex-col gap-4">
            <GitBranch size={24} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
            <GitBranch size={24} style={{ color: 'rgba(255, 255, 255, 0.4)', transform: 'rotate(180deg)' }} />
          </div>

          {/* Jira */}
          <div className="text-center">
            <div
              className="w-24 h-24 flex items-center justify-center mb-3"
              style={{ backgroundColor: '#0052CC' }}
            >
              <CheckSquare size={40} style={{ color: '#FFFFFF' }} />
            </div>
            <div className="text-sm" style={{ color: '#FFFFFF' }}>
              Jira
            </div>
          </div>
        </div>
      </div>

      {/* Sync Items */}
      <div className="space-y-2">
        {syncItems.map((item, index) => (
          <div
            key={index}
            className="p-4"
            style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: '#FFFFFF' }}>
                  {item.source} → {item.destination}
                </span>
                <span
                  className="px-2 py-1 text-xs"
                  style={{
                    backgroundColor:
                      item.status === 'pending'
                        ? 'rgba(255, 152, 0, 0.2)'
                        : 'rgba(156, 39, 176, 0.2)',
                    color: item.status === 'pending' ? '#FF9800' : '#9C27B0',
                  }}
                >
                  {item.status}
                </span>
              </div>
              <button
                className="px-3 py-1 text-xs transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: '#5739FB',
                  color: '#FFFFFF',
                }}
              >
                Sync Now
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {item.items.map((subItem) => (
                <span
                  key={subItem}
                  className="px-2 py-1 text-xs"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.2)',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {subItem}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Auto Sync Settings */}
      <div className="p-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <h3 className="text-lg mb-4" style={{ color: '#FFFFFF' }}>
          Auto-Sync Settings
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Sync documentation to Notion on file save', enabled: true },
            { label: 'Create Jira issues from TODO comments', enabled: false },
            { label: 'Update issue status from commits', enabled: true },
            { label: 'Sync Notion updates back to Figma Make', enabled: false },
          ].map((setting) => (
            <label
              key={setting.label}
              className="flex items-center justify-between p-3 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}
            >
              <span className="text-sm" style={{ color: '#FFFFFF' }}>
                {setting.label}
              </span>
              <input
                type="checkbox"
                checked={setting.enabled}
                className="w-4 h-4"
                style={{ accentColor: '#5739FB' }}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
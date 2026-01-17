/**
 * WELLBEING STUDIO
 * Complete video library management for therapeutic wellbeing videos
 * Features: Upload, chapters, practice injection, Truth Layer metadata, publish workflow
 */

import { useState, useEffect } from 'react';
import { Upload, Video, Plus, Edit, Trash2, Play, Check, X } from 'lucide-react';
import { projectId } from '../../../utils/supabase/info';
import { createClient } from '../../../utils/supabase/client';

interface WellbeingVideo {
  id: string;
  title: string;
  instructor: string;
  duration_seconds: number;
  primary_purpose: 'downshift' | 'energize' | 'clarify' | 'connect' | 'meaning';
  pillar: string;
  status: 'draft' | 'published' | 'archived';
  video_url: string;
  created_at: string;
  chapters?: VideoChapter[];
}

interface VideoChapter {
  id: string;
  title: string;
  timestamp: number;
  chapter_type: 'intro' | 'practice' | 'teaching' | 'outro';
}

interface SyncStatus {
  videos: {
    total: number;
    enriched: number;
    percentage: number;
  };
  jobs: Record<string, number>;
  lastSync: string | null;
}

interface WellbeingStudioProps {
  onClose: () => void;
}

export function WellbeingStudio({ onClose }: WellbeingStudioProps) {
  const [videos, setVideos] = useState<WellbeingVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<WellbeingVideo | null>(null);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [syncResult, setSyncResult] = useState<any>(null);

  useEffect(() => {
    loadVideos();
    loadSyncStatus();
  }, [filter]);

  async function loadVideos() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const url = filter === 'all' 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/wellbeing/videos`
        : `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/wellbeing/videos?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadSyncStatus() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/wellbeing/jw-sync/status`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSyncStatus(data);
      }
    } catch (error) {
      console.error('Error loading sync status:', error);
    }
  }

  async function triggerJWSync() {
    console.log('[WellbeingStudio] Starting JW sync...');
    setSyncing(true);
    setSyncResult(null);
    
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error('[WellbeingStudio] No session found - user not authenticated');
        alert('Not authenticated. Please log in.');
        setSyncing(false);
        return;
      }

      console.log('[WellbeingStudio] Session found, making sync request...');
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/wellbeing/jw-sync`;
      console.log('[WellbeingStudio] Sync URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: 'full' }),
      });

      console.log('[WellbeingStudio] Sync response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('[WellbeingStudio] Sync result:', result);
        setSyncResult(result);
        await loadVideos();
        await loadSyncStatus();
        alert('Sync complete! Check the results below.');
      } else {
        const error = await response.text();
        console.error('[WellbeingStudio] Sync failed with status', response.status, ':', error);
        alert(`Sync failed (${response.status}): ${error.substring(0, 200)}`);
      }
    } catch (error) {
      console.error('[WellbeingStudio] Error triggering sync:', error);
      alert(`Sync error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSyncing(false);
      console.log('[WellbeingStudio] Sync finished');
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0118] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl mb-0.5">Wellbeing Studio</h1>
              <p className="text-white/40 text-xs">Video library management</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 rounded bg-[#5739FB] hover:bg-[#3E2BB8] text-white text-sm transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* JW Sync Status & Control - Always visible */}
        <div className="bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg mb-1">JW Player Sync</h2>
              <p className="text-white/50 text-sm">
                {syncStatus ? (
                  `${syncStatus.videos.total} videos • ${syncStatus.videos.enriched} enriched (${syncStatus.videos.percentage}%)`
                ) : (
                  'Sync 241 wellbeing videos from JW Player library'
                )}
              </p>
            </div>
            <button
              onClick={triggerJWSync}
              disabled={syncing}
              className={`px-6 py-3 rounded-lg text-sm transition-all flex items-center gap-2 ${
                syncing
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-[#5739FB] hover:bg-[#3E2BB8] text-white'
              }`}
            >
              {syncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  Sync from JW Player
                </>
              )}
            </button>
          </div>

          {/* Sync Progress - Only show if syncStatus exists */}
          {syncStatus && (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] h-full transition-all duration-500"
                    style={{ width: `${syncStatus.videos.percentage}%` }}
                  />
                </div>
                <span className="text-white/60 text-sm">{syncStatus.videos.percentage}%</span>
              </div>

              {/* Last Sync */}
              <p className="text-white/40 text-xs">
                Last sync: {syncStatus.lastSync ? new Date(syncStatus.lastSync).toLocaleString() : 'Never'}
              </p>
            </>
          )}

          {/* Sync Result */}
          {syncResult && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-green-400 mb-2">✅ Sync Complete!</p>
              <div className="text-xs text-white/60 space-y-1">
                <p>Videos synced: {syncResult.sync?.upserted || 0}</p>
                <p>Jobs enqueued: {syncResult.enqueued || 0}</p>
                <p>Classified: {syncResult.classified || 0}</p>
              </div>
            </div>
          )}

          {/* Job Status */}
          {syncStatus?.jobs && Object.keys(syncStatus.jobs).length > 0 && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-white/60 mb-2">Classification Jobs:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(syncStatus.jobs).map(([key, count]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-white/40">{key.replace('_', ' ')}:</span>
                    <span className="text-white/60">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          {(['all', 'draft', 'published'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded text-sm transition-all ${
                filter === f
                  ? 'bg-[#5739FB] text-white'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="text-center py-12 text-white/40">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Video className="w-12 h-12 mx-auto mb-4 text-white/20" />
            <p className="text-white/40 mb-4">No videos yet</p>
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all"
            >
              Upload Your First Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onSuccess={loadVideos} />
      )}

      {/* Video Editor */}
      {selectedVideo && (
        <VideoEditor video={selectedVideo} onClose={() => setSelectedVideo(null)} onSave={loadVideos} />
      )}
    </div>
  );
}

function VideoCard({ video, onSelect }: { video: WellbeingVideo; onSelect: () => void }) {
  const minutes = Math.floor(video.duration_seconds / 60);
  const seconds = video.duration_seconds % 60;

  return (
    <button
      onClick={onSelect}
      className="group text-left bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#5739FB]/50 transition-all"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/20 rounded-lg mb-3 flex items-center justify-center">
        <Play className="w-12 h-12 text-white/40 group-hover:text-white/60 transition-colors" />
      </div>

      {/* Meta */}
      <div className="flex items-start gap-2 mb-2">
        <span className={`px-2 py-1 text-xs rounded ${
          video.status === 'published' ? 'bg-green-500/20 text-green-400' :
          video.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-white/10 text-white/40'
        }`}>
          {video.status}
        </span>
        <span className="px-2 py-1 text-xs bg-[#5739FB]/20 text-[#5739FB] rounded">
          {video.primary_purpose}
        </span>
      </div>

      <h3 className="text-white mb-1 leading-tight">{video.title}</h3>
      <p className="text-white/50 text-sm mb-2">{video.instructor}</p>
      <p className="text-white/30 text-xs">{minutes}:{seconds.toString().padStart(2, '0')}</p>
    </button>
  );
}

function UploadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: 0,
    purpose: 'downshift' as const,
  });

  async function handleUpload() {
    setUploading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/wellbeing/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            instructor: formData.instructor,
            duration: formData.duration,
            file_path: '/placeholder/video.mp4', // Replace with actual upload
          }),
        }
      );

      if (response.ok) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-[#0A0118] border border-white/10 rounded-xl p-8 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Upload Video</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
              placeholder="5-Minute Breathwork for Grounding"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Instructor</label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
              placeholder="Dr. Sarah Mitchell"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Duration (seconds)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
              placeholder="300"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Primary Purpose</label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
            >
              <option value="downshift">Downshift</option>
              <option value="energize">Energize</option>
              <option value="clarify">Clarify</option>
              <option value="connect">Connect</option>
              <option value="meaning">Meaning</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading || !formData.title}
            className="flex-1 px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoEditor({ video, onClose, onSave }: { video: WellbeingVideo; onClose: () => void; onSave: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0A0118] border border-white/10 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Edit Video</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-white/60 text-center py-12">
              Video editor UI coming soon...
              <br />
              Chapters, practice injection, Truth Layer metadata
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
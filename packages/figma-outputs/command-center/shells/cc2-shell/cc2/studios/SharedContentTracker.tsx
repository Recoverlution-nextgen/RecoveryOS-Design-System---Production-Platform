/**
 * SHARED CONTENT TRACKER STUDIO
 * Track all content shared with individuals
 */

import { useState, useEffect } from 'react';
import { Share2, Eye, CheckCircle, MessageCircle } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface SharedContent {
  id: string;
  content_type: 'navicue' | 'block' | 'video' | 'practice';
  content_title: string;
  individual_name: string;
  shared_at: string;
  viewed_at: string | null;
  completed_at: string | null;
  individual_response: string | null;
}

interface SharedContentTrackerProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function SharedContentTracker({ onBack, tenantScope }: SharedContentTrackerProps) {
  const { professionalId } = useUser();
  const [content, setContent] = useState<SharedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadSharedContent();
  }, [professionalId]);

  async function loadSharedContent() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/shared-content?professional_id=${professionalId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContent(data.content || []);
      }
    } catch (error) {
      console.error('[SharedContentTracker] Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Shared Content Tracker" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Shared Content Tracker" 
        subtitle={`${content.length} items shared`}
        onBack={onBack}
      />

      <div className="p-6">
        {content.length === 0 ? (
          <div className="text-center py-20">
            <Share2 className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50">No content shared yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70">Content</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Type</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Shared With</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Shared</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70">Status</th>
                  <th className="text-right py-3 px-4 text-sm opacity-70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">{item.content_title}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-[#5739FB]/20 text-xs uppercase">
                        {item.content_type}
                      </span>
                    </td>
                    <td className="py-4 px-4">{item.individual_name}</td>
                    <td className="py-4 px-4 text-sm opacity-70">
                      {new Date(item.shared_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {item.completed_at ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Completed</span>
                        </div>
                      ) : item.viewed_at ? (
                        <div className="flex items-center gap-2 text-amber-400">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">Viewed</span>
                        </div>
                      ) : (
                        <span className="text-sm opacity-50">Not viewed</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setPlayerContent({
                            type: 'block',
                            data: {
                              block_id: item.id,
                              block_type: item.content_type === 'practice' ? 'practice' : 'insight',
                              title: item.content_title,
                              content: { text: 'Content preview coming from API...' },
                              pillar_id: 'p1',
                              pillar_name: 'Self',
                              pillar_color: '#5739FB',
                              tags: [item.content_type],
                              shared_by: {
                                name: 'You',
                                role: 'Professional',
                                message: `Shared with ${item.individual_name} on ${new Date(item.shared_at).toLocaleDateString()}`
                              }
                            }
                          })}
                          className="px-3 py-1 text-sm bg-[#5739FB] hover:bg-[#3E2BB8] flex items-center gap-1"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        {item.individual_response && (
                          <button className="p-2 hover:bg-white/10" title="View response">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10">
                          Reshare
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* UNIVERSAL PLAYER MODAL */}
      {playerContent && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <ContentRenderer
            content={playerContent.data}
            contentType={playerContent.type}
            onResponse={(response) => {
              console.log('[SharedContentTracker] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}
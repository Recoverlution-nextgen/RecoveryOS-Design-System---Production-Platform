/**
 * PROFESSIONAL INBOX STUDIO
 * View replies from individuals + threaded conversations
 */

import { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, Archive, Reply, Eye } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface Message {
  id: string;
  individual_id: string;
  individual_name: string;
  message_type: 'voice' | 'text' | 'video';
  message_content: string;
  sent_at: string;
  read_at: string | null;
  individual_reply: string | null;
  replied_at: string | null;
}

interface ProfessionalInboxProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function ProfessionalInbox({ onBack, tenantScope }: ProfessionalInboxProps) {
  const { professionalId } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadMessages();
  }, [professionalId, filterUnread]);

  async function loadMessages() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/messages${filterUnread ? '?unread_only=true' : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('[ProfessionalInbox] Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMessages = filterUnread 
    ? messages.filter(m => m.individual_reply && !m.read_at)
    : messages;

  const unreadCount = messages.filter(m => m.individual_reply && !m.read_at).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Professional Inbox" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Professional Inbox" 
        subtitle={`${filteredMessages.length} messages${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        onBack={onBack}
        actions={
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`px-4 py-2 transition-colors text-sm ${
              filterUnread ? 'bg-[#3E2BB8]' : 'bg-white/5 hover:bg-white/10'
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {filterUnread ? 'Show All' : 'Unread Only'}
          </button>
        }
      />

      <div className="p-6">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="opacity-50 mb-2">
              {filterUnread ? 'No unread messages' : 'No messages yet'}
            </p>
            {filterUnread && (
              <button
                onClick={() => setFilterUnread(false)}
                className="text-sm text-[#5739FB] hover:underline"
              >
                Show all messages
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white/5 border p-6 transition-all hover:bg-white/8 ${
                  message.individual_reply && !message.read_at
                    ? 'border-[#3E2BB8]'
                    : 'border-white/10'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {message.individual_name}
                      </h3>
                      {message.individual_reply && !message.read_at && (
                        <span className="px-2 py-1 bg-[#3E2BB8]/30 border border-[#3E2BB8] text-xs">
                          NEW REPLY
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-50">
                      Sent {new Date(message.sent_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/10 text-xs uppercase tracking-wide">
                      {message.message_type}
                    </span>
                  </div>
                </div>

                {/* Your Message */}
                <div className="mb-4">
                  <p className="text-xs opacity-50 mb-2">Your Message</p>
                  <div className="bg-white/5 p-3 border-l-2 border-[#5739FB]">
                    <p className="opacity-90" style={{ fontFamily: 'var(--font-sans)' }}>
                      {message.message_content}
                    </p>
                  </div>
                </div>

                {/* Individual Reply */}
                {message.individual_reply && (
                  <div className="mb-4">
                    <p className="text-xs opacity-50 mb-2">
                      Their Reply {message.replied_at && `(${new Date(message.replied_at).toLocaleString()})`}
                    </p>
                    <div className="bg-[#3E2BB8]/10 p-3 border-l-2 border-[#3E2BB8]">
                      <p className="opacity-90" style={{ fontFamily: 'var(--font-sans)' }}>
                        {message.individual_reply}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayerContent({
                      type: 'professional_message',
                      data: {
                        message_id: message.id,
                        professional_name: 'You',
                        professional_title: 'Your Message',
                        message_type: message.message_type,
                        content: message.message_content,
                        sent_at: message.sent_at,
                        individual_reply: message.individual_reply,
                        replied_at: message.replied_at,
                        affective_analysis: {
                          tone: 'supportive',
                          warmth_score: 8,
                          clarity_score: 9,
                          threat_score: 5
                        }
                      }
                    })}
                    className="px-4 py-2 bg-[#5739FB] hover:bg-[#3E2BB8] transition-colors text-sm flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <Eye className="w-4 h-4" />
                    View in Player
                  </button>
                  {message.individual_reply && !message.read_at && (
                    <button
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-sm flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                  <button
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                </div>
              </div>
            ))}
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
              console.log('[ProfessionalInbox] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}
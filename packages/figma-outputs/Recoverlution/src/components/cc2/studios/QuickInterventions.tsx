/**
 * QUICK INTERVENTIONS STUDIO
 * Mobile-first: Send voice/text/video messages to individuals
 * Features: Affective Compiler (tone calibration)
 */

import { useState, useEffect } from 'react';
import { Mic, Type, Video, Send, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { ContentRenderer } from '../../universal-player/ContentRenderer';

interface QuickInterventionsProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

type MessageType = 'voice' | 'text' | 'video';

interface ToneAnalysis {
  threat_score: number;
  agency_score: number;
  suggested_rewrite?: string;
}

export function QuickInterventions({ onBack, tenantScope }: QuickInterventionsProps) {
  const { professionalId } = useUser();
  const [individuals, setIndividuals] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [selectedIndividual, setSelectedIndividual] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('text');
  const [messageContent, setMessageContent] = useState('');
  const [toneAnalysis, setToneAnalysis] = useState<ToneAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [playerContent, setPlayerContent] = useState<any>(null);

  useEffect(() => {
    loadIndividuals();
  }, [professionalId]);

  useEffect(() => {
    if (messageType === 'text' && messageContent.length > 10) {
      const debounce = setTimeout(() => {
        analyzeTone(messageContent);
      }, 1000);
      return () => clearTimeout(debounce);
    }
  }, [messageContent, messageType]);

  async function loadIndividuals() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/individuals`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIndividuals(data.individuals || []);
        if (data.individuals?.length > 0) {
          setSelectedIndividual(data.individuals[0].id);
        }
      }
    } catch (error) {
      console.error('[QuickInterventions] Error loading individuals:', error);
    }
  }

  async function analyzeTone(text: string) {
    setAnalyzing(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/analyze-tone`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: text }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToneAnalysis(data);
      }
    } catch (error) {
      console.error('[QuickInterventions] Error analyzing tone:', error);
    } finally {
      setAnalyzing(false);
    }
  }

  async function sendMessage() {
    if (!selectedIndividual || !messageContent) return;

    setSending(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !professionalId) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/professionals/${professionalId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            individual_id: selectedIndividual,
            message_type: messageType,
            content: messageContent,
            tone_analysis: {
              threat_score: toneAnalysis?.threat_score || 0,
              agency_score: toneAnalysis?.agency_score || 0,
              suggested_rewrite: toneAnalysis?.suggested_rewrite || null
            }
          }),
        }
      );

      if (response.ok) {
        setSent(true);
        setMessageContent('');
        setToneAnalysis(null);
        setTimeout(() => setSent(false), 3000);
      }
    } catch (error) {
      console.error('[QuickInterventions] Error sending message:', error);
    } finally {
      setSending(false);
    }
  }

  const selectedIndividualData = individuals.find(i => i.id === selectedIndividual);

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Quick Interventions" 
        subtitle="Send voice, text, or video messages"
        onBack={onBack}
      />

      <div className="max-w-4xl mx-auto p-6">
        {sent && (
          <div className="mb-6 bg-green-500/20 border border-green-500/40 p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400">Message sent successfully!</p>
          </div>
        )}

        {/* Individual Selector */}
        <div className="mb-6">
          <label className="block text-sm opacity-70 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            Send to
          </label>
          <select
            value={selectedIndividual}
            onChange={(e) => setSelectedIndividual(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors text-lg"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {individuals.map(ind => (
              <option key={ind.id} value={ind.id}>{ind.name} ({ind.email})</option>
            ))}
          </select>
        </div>

        {/* Message Type Selector */}
        <div className="mb-6">
          <label className="block text-sm opacity-70 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            Message Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMessageType('text')}
              className={`p-4 flex flex-col items-center gap-2 transition-all ${
                messageType === 'text' 
                  ? 'bg-[#3E2BB8]/20 border-2 border-[#3E2BB8]' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/8'
              }`}
            >
              <Type className="w-6 h-6" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                Text (200 chars)
              </span>
            </button>
            
            <button
              onClick={() => setMessageType('voice')}
              className={`p-4 flex flex-col items-center gap-2 transition-all ${
                messageType === 'voice' 
                  ? 'bg-[#3E2BB8]/20 border-2 border-[#3E2BB8]' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/8'
              }`}
            >
              <Mic className="w-6 h-6" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                Voice (60s)
              </span>
            </button>
            
            <button
              onClick={() => setMessageType('video')}
              className={`p-4 flex flex-col items-center gap-2 transition-all ${
                messageType === 'video' 
                  ? 'bg-[#3E2BB8]/20 border-2 border-[#3E2BB8]' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/8'
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                Video (90s)
              </span>
            </button>
          </div>
        </div>

        {/* Message Composer */}
        <div className="mb-6">
          {messageType === 'text' ? (
            <>
              <label className="block text-sm opacity-70 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                Your Message
              </label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value.slice(0, 200))}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-[#3E2BB8] focus:outline-none transition-colors min-h-32"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
              <div className="flex justify-between mt-2 text-sm opacity-70">
                <span>{messageContent.length}/200 characters</span>
                {analyzing && <span>Analyzing tone...</span>}
              </div>
            </>
          ) : (
            <div className="bg-white/5 border border-white/10 p-12 text-center">
              <div className="opacity-50 mb-4">
                {messageType === 'voice' ? (
                  <Mic className="w-12 h-12 mx-auto" />
                ) : (
                  <Video className="w-12 h-12 mx-auto" />
                )}
              </div>
              <p className="opacity-70 mb-4">
                {messageType === 'voice' ? 'Voice recording' : 'Video recording'} interface coming soon
              </p>
              <p className="text-sm opacity-50">
                For now, use text messages
              </p>
            </div>
          )}
        </div>

        {/* Affective Compiler Results */}
        {toneAnalysis && messageType === 'text' && (
          <div className="mb-6 bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-[#5739FB]" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Affective Compiler Analysis
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-70">Threat Score</span>
                  <span className={toneAnalysis.threat_score > 30 ? 'text-red-400' : 'text-green-400'}>
                    {toneAnalysis.threat_score}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 overflow-hidden">
                  <div 
                    className={`h-full ${toneAnalysis.threat_score > 30 ? 'bg-red-400' : 'bg-green-400'}`}
                    style={{ width: `${toneAnalysis.threat_score}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="opacity-70">Agency Score</span>
                  <span className="text-[#5739FB]">{toneAnalysis.agency_score}%</span>
                </div>
                <div className="h-2 bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-[#5739FB]"
                    style={{ width: `${toneAnalysis.agency_score}%` }}
                  />
                </div>
              </div>
            </div>

            {toneAnalysis.threat_score > 30 && toneAnalysis.suggested_rewrite && (
              <div className="bg-amber-500/20 border border-amber-500/40 p-4">
                <p className="text-sm text-amber-400 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                  Suggested Rewrite (Lower Threat)
                </p>
                <p className="opacity-90" style={{ fontFamily: 'var(--font-sans)' }}>
                  {toneAnalysis.suggested_rewrite}
                </p>
                <button
                  onClick={() => setMessageContent(toneAnalysis.suggested_rewrite!)}
                  className="mt-3 px-4 py-2 bg-amber-500/30 hover:bg-amber-500/40 transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  Use This Version
                </button>
              </div>
            )}
          </div>
        )}

        {/* Send Button */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!selectedIndividual || !messageContent) return;
              setPlayerContent({
                type: 'professional_message',
                data: {
                  message_id: 'preview',
                  professional_name: 'You',
                  professional_title: 'Preview Mode',
                  message_type: messageType,
                  content: messageContent,
                  sent_at: new Date().toISOString(),
                  affective_analysis: {
                    tone: toneAnalysis?.threat_score && toneAnalysis.threat_score > 30 ? 'cautious' : 'supportive',
                    warmth_score: toneAnalysis?.agency_score || 8,
                    clarity_score: 9,
                    threat_score: toneAnalysis?.threat_score || 0
                  }
                }
              });
            }}
            disabled={!selectedIndividual || !messageContent}
            className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 disabled:bg-white/10 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-lg"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            <Eye className="w-5 h-5" />
            Preview Message
          </button>

          <button
            onClick={sendMessage}
            disabled={!selectedIndividual || !messageContent || sending}
            className="flex-1 px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:bg-white/10 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-lg"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {sending ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send to {selectedIndividualData?.name}
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white/5 border border-white/10 p-4">
          <p className="text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)' }}>
            <strong>How it works:</strong> Your message will appear in {selectedIndividualData?.name}'s LUMA feed as a notification from you. \n            They can reply directly, and you'll see their response in your Professional Inbox.
          </p>
        </div>
      </div>

      {/* UNIVERSAL PLAYER MODAL */}
      {playerContent && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <ContentRenderer
            content={playerContent.data}
            contentType={playerContent.type}
            onResponse={(response) => {
              console.log('[QuickInterventions] Player response:', response);
            }}
            onClose={() => setPlayerContent(null)}
          />
        </div>
      )}
    </div>
  );
}
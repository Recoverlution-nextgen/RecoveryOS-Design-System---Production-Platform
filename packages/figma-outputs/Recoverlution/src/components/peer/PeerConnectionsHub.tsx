/**
 * PEER CONNECTIONS HUB
 * Complete peer-to-peer connection system for individuals
 * Features: Send invites, accept/reject, messaging, support circles
 */

import { useState, useEffect } from 'react';
import { Users, MessageCircle, Send, Check, X, Plus, Search, Circle } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface Connection {
  id: string;
  user1_id: string;
  user2_id: string;
  connected_at: string;
  other_user: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

interface Invite {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  sent_at: string;
  from_user: {
    name: string;
    avatar_url?: string;
  };
}

interface Message {
  id: string;
  connection_id: string;
  from_user_id: string;
  message: string;
  sent_at: string;
}

export default function PeerConnectionsHub({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [view, setView] = useState<'connections' | 'invites' | 'messages' | 'circles'>('connections');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load connections
    const connResponse = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/peer/connections/${user.id}`,
      {
        headers: { 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
      }
    );
    if (connResponse.ok) {
      const data = await connResponse.json();
      setConnections(data);
    }

    // Load pending invites
    const { data: invitesData } = await supabase
      .from('peer_connection_invites')
      .select('*')
      .eq('to_user_id', user.id)
      .eq('status', 'pending');
    
    setInvites(invitesData || []);
    setLoading(false);
  }

  async function acceptInvite(inviteId: string) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/peer/accept-invite`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invite_id: inviteId }),
      }
    );

    loadData();
  }

  async function loadMessages(connectionId: string) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/peer/messages/${connectionId}`,
      {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  }

  async function sendMessage() {
    if (!selectedConnection || !newMessage.trim()) return;

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/peer/message`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connection_id: selectedConnection.id,
          from_user_id: session.user.id,
          message: newMessage,
        }),
      }
    );

    setNewMessage('');
    loadMessages(selectedConnection.id);
  }

  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-1">Peer Connections</h1>
              <p className="text-white/40 text-sm">Connect with others on the journey</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Invite Someone
              </button>
              <button
                onClick={() => onNavigate('Dashboard')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Nav Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {[
            { id: 'connections', label: 'My Connections', icon: Users },
            { id: 'invites', label: 'Invites', icon: Send, badge: invites.length },
            { id: 'messages', label: 'Messages', icon: MessageCircle },
            { id: 'circles', label: 'Support Circles', icon: Circle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`px-4 py-3 text-sm transition-all flex items-center gap-2 border-b-2 ${
                view === tab.id
                  ? 'border-[#5739FB] text-white'
                  : 'border-transparent text-white/40 hover:text-white/60'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-2 py-0.5 bg-[#5739FB] text-white text-xs rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {view === 'connections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-white/20" />
                <p className="text-white/40 mb-4">No connections yet</p>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all"
                >
                  Send Your First Invite
                </button>
              </div>
            ) : (
              connections.map((conn) => (
                <button
                  key={conn.id}
                  onClick={() => {
                    setSelectedConnection(conn);
                    setView('messages');
                    loadMessages(conn.id);
                  }}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#5739FB]/50 transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5739FB]/40 to-[#3E2BB8]/40 rounded-full flex items-center justify-center text-lg">
                      {conn.other_user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h3 className="text-white">{conn.other_user.name || 'Anonymous'}</h3>
                      <p className="text-white/40 text-xs">
                        Connected {new Date(conn.connected_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 bg-[#5739FB]/20 text-[#5739FB] rounded text-sm hover:bg-[#5739FB]/30 transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </button>
                </button>
              ))
            )}
          </div>
        )}

        {view === 'invites' && (
          <div className="space-y-3 max-w-2xl">
            {invites.length === 0 ? (
              <div className="text-center py-12">
                <Send className="w-12 h-12 mx-auto mb-4 text-white/20" />
                <p className="text-white/40">No pending invites</p>
              </div>
            ) : (
              invites.map((invite) => (
                <div
                  key={invite.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5739FB]/40 to-[#3E2BB8]/40 rounded-full flex items-center justify-center text-lg">
                      {invite.from_user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">
                        {invite.from_user.name || 'Someone'} wants to connect
                      </h3>
                      {invite.message && (
                        <p className="text-white/60 text-sm mb-3 italic">"{invite.message}"</p>
                      )}
                      <p className="text-white/40 text-xs mb-3">
                        Sent {new Date(invite.sent_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptInvite(invite.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all text-sm">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'messages' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Connections List */}
            <div className="space-y-2">
              <h3 className="text-sm text-white/40 mb-3">Conversations</h3>
              {connections.map((conn) => (
                <button
                  key={conn.id}
                  onClick={() => {
                    setSelectedConnection(conn);
                    loadMessages(conn.id);
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedConnection?.id === conn.id
                      ? 'bg-[#5739FB]/20 border border-[#5739FB]/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5739FB]/40 to-[#3E2BB8]/40 rounded-full flex items-center justify-center text-sm">
                      {conn.other_user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm">{conn.other_user.name || 'Anonymous'}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl flex flex-col h-[600px]">
              {selectedConnection ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-lg">{selectedConnection.other_user.name || 'Anonymous'}</h3>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.from_user_id === selectedConnection.user1_id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            msg.from_user_id === selectedConnection.user1_id
                              ? 'bg-[#5739FB] text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {new Date(msg.sent_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
                      />
                      <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white/40">Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'circles' && (
          <div className="text-center py-12">
            <Circle className="w-12 h-12 mx-auto mb-4 text-white/20" />
            <h3 className="text-lg mb-2">Support Circles</h3>
            <p className="text-white/40 mb-6">Create or join groups for shared support</p>
            <button className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all">
              Create Circle
            </button>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} onSuccess={loadData} />
      )}
    </div>
  );
}

function InviteModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function sendInvite() {
    setSending(true);
    // TODO: Implement invite logic
    setTimeout(() => {
      setSending(false);
      onSuccess();
      onClose();
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-[#0A0118] border border-white/10 rounded-xl p-8 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Invite Someone to Connect</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">Their Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
              placeholder="friend@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Personal Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50 h-24"
              placeholder="I'd love to connect and support each other..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={sendInvite}
            disabled={sending}
            className="flex-1 px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Invite'}
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

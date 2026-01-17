/**
 * ALUMNI MESSAGE RENDERER
 * 
 * Renders messages from alumni microsite message boards
 * Supports text, voice, and photo messages with AI moderation flags
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Heart, Flag, Share2, Image as ImageIcon, Mic } from 'lucide-react';

interface AlumniMessageData {
  message_id: string;
  author_name: string;
  author_avatar?: string;
  author_badge?: 'alumni' | 'peer_leader' | 'moderator';
  message_type: 'text' | 'voice' | 'photo';
  content: string;
  photo_url?: string;
  audio_url?: string;
  posted_at: string;
  likes_count: number;
  replies_count: number;
  tags?: string[];
  microsite_name: string;
  ai_moderation?: {
    flagged: boolean;
    reason?: string;
    confidence: number;
  };
  user_has_liked?: boolean;
}

interface AlumniMessageRendererProps {
  content: AlumniMessageData;
  onResponse?: (response: any) => void;
  onClose?: () => void;
}

export function AlumniMessageRenderer({ 
  content, 
  onResponse, 
  onClose 
}: AlumniMessageRendererProps) {
  const [hasLiked, setHasLiked] = useState(content.user_has_liked || false);
  const [likesCount, setLikesCount] = useState(content.likes_count);
  const [showModeration, setShowModeration] = useState(false);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'peer_leader': return '#F59E0B';
      case 'moderator': return '#5739FB';
      case 'alumni': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getBadgeLabel = (badge?: string) => {
    switch (badge) {
      case 'peer_leader': return 'Peer Leader';
      case 'moderator': return 'Moderator';
      case 'alumni': return 'Alumni';
      default: return '';
    }
  };

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
    
    onResponse?.({
      action: 'like',
      message_id: content.message_id,
      liked: !hasLiked,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: 'var(--portal-bg)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
              {content.microsite_name}
            </div>
            <h1 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Community Message
            </h1>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF'
              }}
            >
              Close
            </button>
          )}
        </motion.div>

        {/* AI MODERATION FLAG (if flagged) */}
        {content.ai_moderation?.flagged && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '0'
            }}
          >
            <div className="flex items-start gap-3">
              <Flag className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
              <div className="space-y-1">
                <div style={{ color: '#F59E0B' }}>
                  Flagged for Review
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {content.ai_moderation.reason}
                </div>
                <button
                  onClick={() => setShowModeration(!showModeration)}
                  className="text-xs underline"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                >
                  {showModeration ? 'Hide details' : 'Show details'}
                </button>
                <AnimatePresence>
                  {showModeration && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs mt-2"
                      style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      Confidence: {Math.round(content.ai_moderation.confidence * 100)}%
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* MESSAGE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 space-y-4"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0'
          }}
        >
          {/* AUTHOR INFO */}
          <div className="flex items-center gap-3">
            {content.author_avatar ? (
              <img
                src={content.author_avatar}
                alt={content.author_name}
                className="w-12 h-12 object-cover"
                style={{ borderRadius: '0' }}
              />
            ) : (
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  color: '#5739FB'
                }}
              >
                {content.author_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div style={{ color: '#FFFFFF' }}>
                  {content.author_name}
                </div>
                {content.author_badge && (
                  <div
                    className="px-2 py-0.5 text-xs uppercase tracking-wider"
                    style={{
                      backgroundColor: `${getBadgeColor(content.author_badge)}20`,
                      color: getBadgeColor(content.author_badge),
                      border: `1px solid ${getBadgeColor(content.author_badge)}50`
                    }}
                  >
                    {getBadgeLabel(content.author_badge)}
                  </div>
                )}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                {new Date(content.posted_at).toLocaleString()}
              </div>
            </div>
          </div>

          {/* MESSAGE TYPE INDICATOR */}
          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            {content.message_type === 'voice' && (
              <>
                <Mic className="w-4 h-4" />
                <span>Voice Message</span>
              </>
            )}
            {content.message_type === 'photo' && (
              <>
                <ImageIcon className="w-4 h-4" />
                <span>Photo Message</span>
              </>
            )}
            {content.message_type === 'text' && (
              <>
                <MessageCircle className="w-4 h-4" />
                <span>Text Message</span>
              </>
            )}
          </div>

          {/* PHOTO */}
          {content.message_type === 'photo' && content.photo_url && (
            <img
              src={content.photo_url}
              alt="Message photo"
              className="w-full"
              style={{
                maxHeight: '400px',
                objectFit: 'cover'
              }}
            />
          )}

          {/* VOICE PLAYER */}
          {content.message_type === 'voice' && content.audio_url && (
            <audio
              controls
              className="w-full"
              src={content.audio_url}
              style={{
                filter: 'invert(1) hue-rotate(180deg)'
              }}
            />
          )}

          {/* TEXT CONTENT */}
          <div className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
            {content.content}
          </div>

          {/* TAGS */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {content.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-1 text-sm"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.1)',
                    border: '1px solid rgba(87, 57, 251, 0.3)',
                    borderRadius: '0',
                    color: '#5739FB'
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}

          {/* ENGAGEMENT STATS */}
          <div 
            className="flex items-center gap-6 pt-4 border-t"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {likesCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {content.replies_count}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          {/* LIKE */}
          <button
            onClick={handleLike}
            className="p-4 flex items-center justify-center gap-2"
            style={{
              backgroundColor: hasLiked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: hasLiked ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0',
              color: hasLiked ? '#EF4444' : '#FFFFFF'
            }}
          >
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{hasLiked ? 'Liked' : 'Like'}</span>
          </button>

          {/* REPLY */}
          <button
            onClick={() => {
              onResponse?.({
                action: 'reply',
                message_id: content.message_id,
                timestamp: new Date().toISOString()
              });
              console.log('Open reply interface');
            }}
            className="p-4 flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0',
              color: '#FFFFFF'
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Reply</span>
          </button>

          {/* SHARE */}
          <button
            onClick={() => {
              onResponse?.({
                action: 'share',
                message_id: content.message_id,
                timestamp: new Date().toISOString()
              });
              console.log('Open share interface');
            }}
            className="p-4 flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0',
              color: '#FFFFFF'
            }}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * SESSION PREP RENDERER
 * 
 * Renders auto-generated session preparation summaries for professionals
 * Displays: Timeline, MTTR, AI insights, arousal patterns, risk indicators
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, TrendingUp, AlertTriangle, Clock, Activity } from 'lucide-react';

interface SessionPrepData {
  individual_id: string;
  individual_name: string;
  session_date: string;
  week_number: number;
  mttr_current: number;
  mttr_trend: 'improving' | 'stable' | 'declining';
  arousal_pattern: string;
  risk_level: 'green' | 'amber' | 'red';
  key_insights: string[];
  recent_events: Array<{
    date: string;
    type: string;
    summary: string;
  }>;
  recommended_focus: string[];
  ai_summary: string;
}

interface SessionPrepRendererProps {
  content: SessionPrepData;
  onResponse?: (response: any) => void;
  onClose?: () => void;
}

export function SessionPrepRenderer({ content, onResponse, onClose }: SessionPrepRendererProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'green': return '#10B981';
      case 'amber': return '#F59E0B';
      case 'red': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getMTTRColor = (trend: string) => {
    switch (trend) {
      case 'improving': return '#10B981';
      case 'stable': return '#6B7280';
      case 'declining': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: 'var(--portal-bg)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl" style={{ color: '#FFFFFF' }}>
              Session Preparation
            </h1>
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
          </div>
          <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {content.individual_name} • Week {content.week_number}
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            <Calendar className="w-4 h-4" />
            {new Date(content.session_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </motion.div>

        {/* KEY METRICS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* MTTR */}
          <div
            className="p-6 space-y-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${getMTTRColor(content.mttr_trend)}`,
              borderRadius: '0'
            }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: getMTTRColor(content.mttr_trend) }} />
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                MTTR (Mean Time to Regulate)
              </div>
            </div>
            <div className="text-3xl" style={{ color: getMTTRColor(content.mttr_trend) }}>
              {content.mttr_current}m
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {content.mttr_trend === 'improving' && '↓ Improving'}
              {content.mttr_trend === 'stable' && '→ Stable'}
              {content.mttr_trend === 'declining' && '↑ Declining'}
            </div>
          </div>

          {/* RISK LEVEL */}
          <div
            className="p-6 space-y-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${getRiskColor(content.risk_level)}`,
              borderRadius: '0'
            }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" style={{ color: getRiskColor(content.risk_level) }} />
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Risk Level
              </div>
            </div>
            <div className="text-3xl uppercase" style={{ color: getRiskColor(content.risk_level) }}>
              {content.risk_level}
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Current status
            </div>
          </div>

          {/* AROUSAL PATTERN */}
          <div
            className="p-6 space-y-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.5)',
              borderRadius: '0'
            }}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" style={{ color: '#5739FB' }} />
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Arousal Pattern
              </div>
            </div>
            <div className="text-lg" style={{ color: '#FFFFFF' }}>
              {content.arousal_pattern}
            </div>
          </div>
        </motion.div>

        {/* AI SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 space-y-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
            borderRadius: '0'
          }}
        >
          <div className="text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
            AI Generated Summary
          </div>
          <div className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
            {content.ai_summary}
          </div>
        </motion.div>

        {/* KEY INSIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
            Key Insights
          </h2>
          <div className="space-y-2">
            {content.key_insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 flex items-start gap-3"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0'
                }}
              >
                <div
                  className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    backgroundColor: 'rgba(87, 57, 251, 0.2)',
                    color: '#5739FB'
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {insight}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RECOMMENDED FOCUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
            Recommended Focus Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.recommended_focus.map((focus, index) => (
              <div
                key={index}
                className="px-4 py-2"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '0',
                  color: '#10B981'
                }}
              >
                {focus}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RECENT EVENTS TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
            Recent Events
          </h2>
          <div className="space-y-3">
            {content.recent_events.map((event, index) => (
              <div
                key={index}
                className="p-4 space-y-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderLeft: '3px solid #5739FB',
                  borderRadius: '0'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm uppercase tracking-wider" style={{ color: '#5739FB' }}>
                    {event.type}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {event.summary}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={() => {
              onResponse?.({ 
                viewed: true, 
                timestamp: new Date().toISOString() 
              });
              onClose?.();
            }}
            className="px-8 py-4 text-lg"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
              border: 'none'
            }}
          >
            Begin Session
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * RAW COMPONENT DEMO - V3 READY
 * Shows how to use extracted V2 components in V3
 */

import React, { useState } from 'react';
import { RawEchoResponse } from './raw-components/RawEchoResponse';
import { RawSliderResponse } from './raw-components/RawSliderResponse';
import { RawContentPlayer } from './raw-components/RawContentPlayer';
import { useRawPlayer } from './raw-hooks/useRawPlayer';
import { RawContentItem } from './raw-utils/contentUtils';

// Import InfiniteK design tokens
import './raw-types/design-tokens.css';

export function RawComponentDemo() {
  const [currentDemo, setCurrentDemo] = useState<'echo' | 'slider' | 'player'>('echo');
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Sample content for player demo
  const sampleContent: RawContentItem[] = [
    {
      id: '1',
      type: 'text',
      title: 'Welcome',
      content: 'Take a deep breath. You are safe here.',
    },
    {
      id: '2',
      type: 'text',
      title: 'Check In',
      content: 'How are you feeling in this moment?',
      responseRequired: true,
      responseType: 'text'
    }
  ];

  const player = useRawPlayer({
    items: sampleContent,
    onItemComplete: (itemId, response) => {
      setResponses(prev => ({ ...prev, [itemId]: response }));
    },
    onComplete: () => {
      console.log('Player session complete!', responses);
    }
  });

  const handleEchoComplete = (count: number) => {
    setResponses(prev => ({ ...prev, echo: count }));
    alert(`Completed ${count} voice repetitions!`);
  };

  const handleSliderComplete = (value: number) => {
    setResponses(prev => ({ ...prev, slider: value }));
    alert(`Intensity rated: ${value}/100`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: 'var(--space-6)'
    }}>
      {/* Demo selector */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: 'var(--space-8)'
      }}>
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
          color: 'var(--infinitek-primary)'
        }}>
          V2 → V3 Raw Component Demo
        </h1>

        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          justifyContent: 'center',
          marginBottom: 'var(--space-8)'
        }}>
          {[
            { key: 'echo', label: 'Voice Echo' },
            { key: 'slider', label: 'Intensity Slider' },
            { key: 'player', label: 'Content Player' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentDemo(key as any)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: currentDemo === key ? 'var(--infinitek-primary)' : '#FFFFFF',
                color: currentDemo === key ? '#FFFFFF' : '#374151',
                border: '2px solid var(--infinitek-primary)',
                borderRadius: '0', // InfiniteK: no rounded corners
                fontSize: 'var(--text-base)',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo content */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        border: '2px solid #E5E7EB',
        borderRadius: '0' // InfiniteK: no rounded corners
      }}>
        {currentDemo === 'echo' && (
          <RawEchoResponse
            statement="I am worthy of love and belonging"
            repetitions={3}
            onComplete={handleEchoComplete}
            primaryColor="var(--infinitek-primary)"
          />
        )}

        {currentDemo === 'slider' && (
          <RawSliderResponse
            label="How anxious do you feel right now?"
            min={0}
            max={100}
            onComplete={handleSliderComplete}
            primaryColor="var(--infinitek-secondary)"
          />
        )}

        {currentDemo === 'player' && (
          <div>
            {/* Player controls */}
            <div style={{
              padding: 'var(--space-4)',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: 'var(--text-sm)', color: '#6B7280' }}>
                Progress: {player.progress.toFixed(0)}%
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: '#6B7280' }}>
                {player.currentIndex + 1} of {player.totalItems}
              </div>
            </div>

            {/* Current content */}
            <div style={{ padding: 'var(--space-6)' }}>
              {player.currentItem ? (
                <div>
                  <h3 style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: '600',
                    marginBottom: 'var(--space-4)',
                    textAlign: 'center'
                  }}>
                    {player.currentItem.title}
                  </h3>

                  <div style={{
                    fontSize: 'var(--text-lg)',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    marginBottom: 'var(--space-6)'
                  }}>
                    {player.currentItem.content}
                  </div>

                  {player.currentItem.responseRequired ? (
                    <div style={{ textAlign: 'center' }}>
                      <textarea
                        placeholder="Share your response..."
                        style={{
                          width: '100%',
                          minHeight: '100px',
                          padding: 'var(--space-3)',
                          border: '2px solid #E5E7EB',
                          borderRadius: '0',
                          fontSize: 'var(--text-base)',
                          marginBottom: 'var(--space-4)'
                        }}
                        onChange={(e) => {
                          // In real usage, you'd store this in local state
                        }}
                      />
                      <button
                        onClick={() => player.completeItem('Sample response')}
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          backgroundColor: 'var(--infinitek-primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '0',
                          fontSize: 'var(--text-base)',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Complete & Continue
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => player.completeItem()}
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          backgroundColor: 'var(--infinitek-tertiary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '0',
                          fontSize: 'var(--text-base)',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--space-8)',
                  color: '#6B7280'
                }}>
                  Session complete! Check console for responses.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Response log */}
      <div style={{
        maxWidth: '600px',
        margin: 'var(--space-8) auto 0',
        backgroundColor: '#FFFFFF',
        border: '2px solid #E5E7EB',
        borderRadius: '0',
        padding: 'var(--space-4)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: '600',
          marginBottom: 'var(--space-3)',
          color: '#374151'
        }}>
          Response Log
        </h3>
        <pre style={{
          fontSize: 'var(--text-sm)',
          color: '#6B7280',
          backgroundColor: '#F9FAFB',
          padding: 'var(--space-3)',
          borderRadius: '0',
          overflow: 'auto'
        }}>
          {JSON.stringify(responses, null, 2)}
        </pre>
      </div>
    </div>
  );
}
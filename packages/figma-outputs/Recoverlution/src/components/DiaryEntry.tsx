/**
 * DIARY ENTRY - Micro-moment captures
 * 
 * 30-60s voice or text captures
 * Auto-tagged with affect and context
 * 
 * Philosophy: Quick, frictionless, no judgment
 */

import { useState } from 'react';
import { Mic, FileText, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';

interface DiaryEntryProps {
  userId: string;
  rehabId: string;
  onComplete?: () => void;
}

export function DiaryEntry({ userId, rehabId, onComplete }: DiaryEntryProps) {
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          rehab_id: rehabId,
          mode,
          content_text: content,
          word_count: content.split(/\s+/).length,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save diary entry');
      }

      setSaved(true);
      setTimeout(() => {
        setContent('');
        setSaved(false);
        onComplete?.();
      }, 1500);

    } catch (err) {
      console.error('Diary save error:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (saved) {
    return (
      <Card style={{ borderRadius: '0px' }}>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div 
              className="w-12 h-12 bg-emerald-100 flex items-center justify-center mb-3"
              style={{ borderRadius: '0px' }}
            >
              <Check className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-gray-700">Entry saved</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ borderRadius: '0px' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 
            className="text-lg"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Quick capture
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('text')}
              className={`p-2 border transition-colors ${
                mode === 'text'
                  ? 'bg-[#5739FB] text-white border-[#5739FB]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
              style={{ borderRadius: '0px' }}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`p-2 border transition-colors ${
                mode === 'voice'
                  ? 'bg-[#5739FB] text-white border-[#5739FB]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
              style={{ borderRadius: '0px' }}
              disabled={true}
              title="Voice mode coming soon"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          What's present right now? No need to explain or justify.
        </p>
      </CardHeader>
      <CardContent>
        {mode === 'text' && (
          <>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Heat in chest during ops meeting. Wanted to say something but didn't."
              rows={3}
              className="mb-4"
              style={{ borderRadius: '0px' }}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {content.split(/\s+/).filter(Boolean).length} words
              </span>
              <Button
                onClick={handleSave}
                disabled={loading || !content.trim()}
                size="sm"
                style={{ borderRadius: '0px' }}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </>
        )}

        {mode === 'voice' && (
          <div className="py-8 text-center text-gray-500">
            Voice recording coming soon
          </div>
        )}
      </CardContent>
    </Card>
  );
}

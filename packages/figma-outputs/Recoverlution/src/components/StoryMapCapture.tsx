/**
 * STORY MAP CAPTURE - Pain / Protection / Identity Seeds
 * 
 * Gentle, non-directive intake that captures:
 * - Where pain lives in the body
 * - What protection pattern dominates
 * - Identity line drafts
 * - Hot contexts (where pain shows up)
 * 
 * Philosophy: Never force disclosure, always offer safety
 */

import { useState } from 'react';
import { Heart, Shield, User, MapPin, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';

interface StoryMapCaptureProps {
  userId: string;
  rehabId: string;
  onComplete?: () => void;
}

type Step = 'pain' | 'protection' | 'identity' | 'complete';

const protectionOptions = [
  { value: 'safety', label: 'Safety', description: 'I need to protect myself from harm' },
  { value: 'image', label: 'Image', description: 'I need to protect how others see me' },
  { value: 'control', label: 'Control', description: 'I need to control the outcome' },
  { value: 'belonging', label: 'Belonging', description: 'I need to protect my place' },
];

const hotContextOptions = [
  'family', 'work', 'money', 'sleep', 'conflict', 
  'performance', 'relationships', 'home', 'social'
];

export function StoryMapCapture({ userId, rehabId, onComplete }: StoryMapCaptureProps) {
  const [step, setStep] = useState<Step>('pain');
  const [painNote, setPainNote] = useState('');
  const [protectionBias, setProtectionBias] = useState<string | null>(null);
  const [identityLine, setIdentityLine] = useState('');
  const [hotContexts, setHotContexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/story-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          rehab_id: rehabId,
          mode: 'text',
          content_text: painNote,
          protection_bias: protectionBias,
          identity_line_draft: identityLine,
          hot_contexts: hotContexts,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save story map');
      }

      setStep('complete');
      setTimeout(() => {
        onComplete?.();
      }, 2000);

    } catch (err) {
      console.error('Story map error:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div 
          className="w-16 h-16 bg-emerald-100 flex items-center justify-center mb-4"
          style={{ borderRadius: '0px' }}
        >
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 
          className="text-2xl mb-2"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
        >
          Thank you for sharing
        </h2>
        <p className="text-gray-600">
          This helps LUMA understand where you are and guide you more effectively.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className={`w-8 h-1 ${step === 'pain' ? 'bg-[#5739FB]' : 'bg-gray-300'}`} style={{ borderRadius: '0px' }} />
        <div className={`w-8 h-1 ${step === 'protection' ? 'bg-[#5739FB]' : 'bg-gray-300'}`} style={{ borderRadius: '0px' }} />
        <div className={`w-8 h-1 ${step === 'identity' ? 'bg-[#5739FB]' : 'bg-gray-300'}`} style={{ borderRadius: '0px' }} />
      </div>

      {/* Step 1: Pain */}
      {step === 'pain' && (
        <Card style={{ borderRadius: '0px' }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-[#5739FB]" />
              <h2 
                className="text-xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Where do you carry pain?
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              There's no right answer. Just notice what's present today.
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={painNote}
              onChange={(e) => setPainNote(e.target.value)}
              placeholder="Example: Heat in my chest during family dinners. Tightness in my throat when I need to speak up."
              rows={4}
              className="mb-4"
              style={{ borderRadius: '0px' }}
            />
            
            {/* Hot Contexts */}
            <p className="text-sm text-gray-700 mb-2">
              Where does pain show up most?
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {hotContextOptions.map((context) => (
                <button
                  key={context}
                  onClick={() => {
                    if (hotContexts.includes(context)) {
                      setHotContexts(hotContexts.filter((c) => c !== context));
                    } else {
                      setHotContexts([...hotContexts, context]);
                    }
                  }}
                  className={`px-3 py-1 text-sm border transition-colors ${
                    hotContexts.includes(context)
                      ? 'bg-[#5739FB] text-white border-[#5739FB]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#5739FB]'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  {context}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep('protection')}
                style={{ borderRadius: '0px' }}
              >
                Skip for now
              </Button>
              <Button
                onClick={() => setStep('protection')}
                disabled={!painNote.trim() && hotContexts.length === 0}
                style={{ borderRadius: '0px' }}
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Protection */}
      {step === 'protection' && (
        <Card style={{ borderRadius: '0px' }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-[#5739FB]" />
              <h2 
                className="text-xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                What do you protect most?
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              We all protect something. Which resonates most right now?
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {protectionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProtectionBias(option.value)}
                  className={`w-full p-4 text-left border transition-all ${
                    protectionBias === option.value
                      ? 'border-[#5739FB] bg-purple-50'
                      : 'border-gray-300 hover:border-[#5739FB]'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 
                        className="text-lg mb-1"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                      >
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {protectionBias === option.value && (
                      <Check className="w-5 h-5 text-[#5739FB] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep('pain')}
                style={{ borderRadius: '0px' }}
              >
                Back
              </Button>
              <Button
                onClick={() => setStep('identity')}
                disabled={!protectionBias}
                style={{ borderRadius: '0px' }}
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Identity */}
      {step === 'identity' && (
        <Card style={{ borderRadius: '0px' }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-[#5739FB]" />
              <h2 
                className="text-xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Your identity line
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              One sentence that anchors who you're becoming. This can evolve.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Textarea
                value={identityLine}
                onChange={(e) => setIdentityLine(e.target.value)}
                placeholder="Example: Two seconds buys me a choice."
                rows={2}
                className="mb-2"
                style={{ borderRadius: '0px' }}
              />
              <p className="text-xs text-gray-500">
                This will show on your Today page as your weekly anchor.
              </p>
            </div>

            <div className="bg-gray-50 p-4 mb-4" style={{ borderRadius: '0px' }}>
              <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Examples:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Pause is power."</li>
                <li>• "I belong to myself first."</li>
                <li>• "Progress, not perfection."</li>
                <li>• "The pause buys me time."</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep('protection')}
                style={{ borderRadius: '0px' }}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || !identityLine.trim()}
                style={{ borderRadius: '0px' }}
              >
                {loading ? 'Saving...' : 'Complete'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}

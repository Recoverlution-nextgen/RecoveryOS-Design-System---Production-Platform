/**
 * Intelligent Backgrounds Demo
 * 
 * Replaces Trianglify demo with premium Pexels + Colormind system
 * Shows real-time AI-powered background generation
 */

import { useState } from 'react';
import { ArrowLeft, RefreshCw, Palette, Image as ImageIcon, Sparkles } from 'lucide-react';
import recoverlutionLogo from 'figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png';
import {
  IntelligentBackground,
  IntelligentHeader,
  BackgroundThemeSelector,
} from '../IntelligentBackground';
import { BACKGROUND_THEMES, type BackgroundThemeKey } from '../../utils/intelligentBackgrounds';

interface IntelligentBackgroundsDemoProps {
  onNavigate?: (page: string) => void;
}

export function IntelligentBackgroundsDemo({ onNavigate }: IntelligentBackgroundsDemoProps) {
  const [selectedTheme, setSelectedTheme] = useState<BackgroundThemeKey>('peaceful');
  const [mode, setMode] = useState<'photo' | 'gradient'>('photo');
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);

  const handleRegenerate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/60 px-6 md:px-12 flex items-center justify-between" style={{ height: '72px', minHeight: '72px' }}>
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('dna-hub')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          <span className="text-xs text-gray-400 font-mono">Intelligent Backgrounds</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Pexels + Colormind AI</span>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#5739FB]" />
            <h1 className="text-4xl md:text-5xl text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Intelligent Backgrounds
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Premium replacement for Trianglify. Real photography with AI-powered color harmony using Pexels API + Colormind.
          </p>

          <div className="bg-gradient-to-r from-[#3E2BB8]/5 to-[#5739FB]/5 border border-[#5739FB]/20 rounded-xl p-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#5739FB]" />
              Why This is Better Than Trianglify
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB]">•</span>
                <span><strong>Dual image sources</strong> Pexels for photography + Pixabay for ethereal abstracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">✦</span>
                <span><strong>NEW: Pixabay themes</strong> ethereal, fluid, state, perfect for Inner Compass</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB]">•</span>
                <span><strong>AI color matching</strong> via Colormind ensures brand harmony</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB]">•</span>
                <span><strong>Context-aware selection</strong> matches content mood automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB]">•</span>
                <span><strong>Frosted glass overlays</strong> maintain readability while looking premium</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5739FB]">•</span>
                <span><strong>Smart caching</strong> prevents unnecessary API calls</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Select Theme
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('photo')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  mode === 'photo'
                    ? 'bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Photo
              </button>
              <button
                onClick={() => setMode('gradient')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  mode === 'gradient'
                    ? 'bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                Gradient
              </button>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>

          <BackgroundThemeSelector
            currentTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
          />
          
          {/* Source Legend */}
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5739FB]" />
              <span>Pexels Photography</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">✦</span>
              <span>Pixabay Abstract (perfect for State tracking)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5739FB]" />
              Live Preview
            </h3>
            <span className="text-xs text-gray-500 font-mono">
              {mode === 'photo' ? `Theme: ${selectedTheme}` : 'AI Gradient Mesh'}
            </span>
          </div>

          <div className="relative" style={{ height: '500px' }}>
            <IntelligentBackground
              key={refreshKey}
              theme={selectedTheme}
              mode={mode}
              overlayOpacity={0.75}
              onPaletteGenerated={setCurrentPalette}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-8 text-center">
                  <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Premium Background System
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    This is how content looks on top of intelligent backgrounds.
                    Notice how the frosted glass overlay maintains perfect readability
                    while preserving the premium aesthetic.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <div className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 shadow-lg">
                      <p className="text-sm text-gray-600">Glass Card Example</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-xl px-6 py-3 shadow-lg">
                      <p className="text-sm">Button Example</p>
                    </div>
                  </div>
                </div>
              </div>
            </IntelligentBackground>
          </div>
        </div>

        {/* Color Palette Display */}
        {currentPalette.length > 0 && mode === 'photo' && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#5739FB]" />
              AI-Generated Palette (Colormind)
            </h3>
            <div className="flex gap-3">
              {currentPalette.map((color, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200 shadow-sm mb-2"
                    style={{ background: color }}
                  />
                  <code className="text-xs text-gray-600 block text-center">{color}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Implementation Guide */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            How to Use
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="text-gray-900 mb-2">Context-Aware (Automatic)</h4>
              <code className="block bg-gray-50 p-3 rounded text-xs">
                {`<IntelligentBackground context="journey">\n  {children}\n</IntelligentBackground>`}
              </code>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Manual Theme Selection</h4>
              <code className="block bg-gray-50 p-3 rounded text-xs">
                {`<IntelligentBackground theme="peaceful" overlayOpacity={0.85}>\n  {children}\n</IntelligentBackground>`}
              </code>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Gradient Mode (No API Calls)</h4>
              <code className="block bg-gray-50 p-3 rounded text-xs">
                {`<IntelligentBackground mode="gradient">\n  {children}\n</IntelligentBackground>`}
              </code>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Header Only</h4>
              <code className="block bg-gray-50 p-3 rounded text-xs">
                {`<IntelligentHeader theme="journey" height="400px">\n  {header content}\n</IntelligentHeader>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

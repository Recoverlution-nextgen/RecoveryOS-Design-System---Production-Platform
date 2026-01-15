import React from 'react';

export default function OverlaysPage() {
  const overlayExamples = [
    {
      type: 'paper-white',
      title: 'Paper White',
      description: 'Clean overlays on dark backgrounds',
      text: 'Inner Light',
      bgColor: '#1a1a1a'
    },
    {
      type: 'rim',
      title: 'Rim',
      description: 'Defined edges on organic assets',
      text: 'Flow State',
      bgColor: '#2d5a27'
    },
    {
      type: 'bloom',
      title: 'Bloom',
      description: 'Soft expanding text on growth themes',
      text: 'Bloom Within',
      bgColor: '#4a0e4e'
    },
    {
      type: 'frost',
      title: 'Frost',
      description: 'Crystalline effects on clarity assets',
      text: 'Clear Mind',
      bgColor: '#0f172a'
    }
  ];

  const copyExamples = [
    'Inner Light Awakens',
    'Peaceful Currents',
    'Break Through Limits',
    'Transform Through Change',
    'Harmony in Motion',
    'Renewal Begins Within'
  ];

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Glass Carve Overlays</h1>

      {/* Overlay Types */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Overlay Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {overlayExamples.map((example) => (
            <div key={example.type} className="space-y-4">
              <div className="text-sm font-medium">{example.title}</div>
              <div className="text-xs text-gray-600 mb-4">{example.description}</div>

              <div
                className="relative h-32 rounded-lg overflow-hidden"
                style={{ backgroundColor: example.bgColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="px-6 py-3 rounded-lg text-center font-medium"
                    style={{
                      backgroundColor: `var(--asset-type-${example.type})`,
                      color: `var(--asset-type-${example.type}-text)`,
                      textShadow: `0 1px 2px var(--asset-type-${example.type}-shadow)`,
                      fontSize: 'var(--overlay-text-base)',
                      fontWeight: 'var(--overlay-weight-medium)'
                    }}
                  >
                    {example.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Copy Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Copy Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copyExamples.map((copy, index) => (
            <div key={index} className="space-y-2">
              <div
                className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900"
                style={{ backgroundColor: '#1e1b4b' }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div
                    className="text-center font-medium leading-tight"
                    style={{
                      color: 'var(--asset-type-paper-text)',
                      textShadow: '0 1px 2px var(--asset-type-paper-shadow)',
                      fontSize: 'var(--overlay-text-sm)',
                      fontWeight: 'var(--overlay-weight-medium)'
                    }}
                  >
                    {copy}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 text-center">Example {index + 1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Typography Scale</h2>
        <div className="space-y-4">
          {[
            { size: 'xs', text: 'Caption text' },
            { size: 'sm', text: 'Small body text' },
            { size: 'base', text: 'Regular body text' },
            { size: 'lg', text: 'Large body text' },
            { size: 'xl', text: 'Extra large text' }
          ].map((item) => (
            <div key={item.size} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-mono">{item.size}</div>
              <div
                style={{
                  fontSize: `var(--overlay-text-${item.size})`,
                  fontWeight: 'var(--overlay-weight-normal)',
                  color: 'var(--asset-type-paper-text)',
                  backgroundColor: 'var(--asset-type-paper-white)',
                  padding: '0.5rem',
                  borderRadius: '0.25rem'
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import React from 'react';

export default function TypePage() {
  const typeScale = [
    { name: 'xs', size: 'text-xs', description: 'Captions, metadata' },
    { name: 'sm', size: 'text-sm', description: 'Secondary text, labels' },
    { name: 'base', size: 'text-base', description: 'Body text, default' },
    { name: 'lg', size: 'text-lg', description: 'Large body, emphasis' },
    { name: 'xl', size: 'text-xl', description: 'Subheadings, cards' },
    { name: '2xl', size: 'text-2xl', description: 'Headings, hero text' },
    { name: '3xl', size: 'text-3xl', description: 'Large headings' },
    { name: '4xl', size: 'text-4xl', description: 'Hero headings' },
    { name: '5xl', size: 'text-5xl', description: 'Display text' }
  ];

  const fontWeights = [
    { name: 'Thin', weight: 'font-thin', value: '100' },
    { name: 'Light', weight: 'font-light', value: '300' },
    { name: 'Normal', weight: 'font-normal', value: '400' },
    { name: 'Medium', weight: 'font-medium', value: '500' },
    { name: 'Semibold', weight: 'font-semibold', value: '600' },
    { name: 'Bold', weight: 'font-bold', value: '700' }
  ];

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8">Typography System</h1>

      {/* Type Scale */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Type Scale</h2>
        <div className="space-y-6">
          {typeScale.map((item) => (
            <div key={item.name} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-mono text-gray-600">{item.name}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
              <div className={item.size}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>
        <div className="space-y-4">
          {fontWeights.map((weight) => (
            <div key={weight.name} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-mono">{weight.value}</div>
              <div className="w-24 text-sm">{weight.name}</div>
              <div className={`text-lg ${weight.weight}`}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Font Families */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Font Families</h2>
        <div className="space-y-6">
          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Sans (IBM Plex Sans)</div>
            <div className="text-lg" style={{ fontFamily: 'var(--font-family-sans)' }}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
          </div>

          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Mono (IBM Plex Mono)</div>
            <div className="text-lg font-mono" style={{ fontFamily: 'var(--font-family-mono)' }}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
          </div>

          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Serif (IBM Plex Serif)</div>
            <div className="text-lg" style={{ fontFamily: 'var(--font-family-serif)' }}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
          </div>
        </div>
      </section>

      {/* Line Heights */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Line Heights</h2>
        <div className="space-y-6">
          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Tight (1.25)</div>
            <div className="text-base leading-tight max-w-md">
              The quick brown fox jumps over the lazy dog. This text demonstrates tight line spacing for compact layouts and captions.
            </div>
          </div>

          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Normal (1.5)</div>
            <div className="text-base leading-normal max-w-md">
              The quick brown fox jumps over the lazy dog. This text demonstrates normal line spacing for comfortable reading in body content.
            </div>
          </div>

          <div>
            <div className="text-sm font-mono text-gray-600 mb-2">Relaxed (1.75)</div>
            <div className="text-base leading-relaxed max-w-md">
              The quick brown fox jumps over the lazy dog. This text demonstrates relaxed line spacing for improved readability in longer content.
            </div>
          </div>
        </div>
      </section>

      {/* Letter Spacing */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Letter Spacing</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 text-sm font-mono">Tight</div>
            <div className="text-lg tracking-tight">The quick brown fox jumps over the lazy dog</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-20 text-sm font-mono">Normal</div>
            <div className="text-lg tracking-normal">The quick brown fox jumps over the lazy dog</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-20 text-sm font-mono">Wide</div>
            <div className="text-lg tracking-wide">The quick brown fox jumps over the lazy dog</div>
          </div>
        </div>
      </section>
    </div>
  );
}
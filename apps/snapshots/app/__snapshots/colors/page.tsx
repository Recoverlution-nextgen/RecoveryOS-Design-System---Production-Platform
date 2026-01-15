import React from 'react';

export default function ColorsPage() {
  const neutralShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const semanticColors = [
    { name: 'Primary', shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: 'Success', shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: 'Warning', shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
    { name: 'Error', shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] }
  ];

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Color System</h1>

      {/* Neutral Scale */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Neutral Scale</h2>
        <div className="grid grid-cols-10 gap-4">
          {neutralShades.map((shade) => (
            <div key={shade} className="text-center">
              <div
                className="h-16 rounded-lg border border-gray-300 mb-2"
                style={{ backgroundColor: `var(--color-neutral-${shade})` }}
              />
              <div className="text-sm font-mono">{shade}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Colors */}
      {semanticColors.map((color) => (
        <section key={color.name}>
          <h2 className="text-2xl font-semibold mb-6">{color.name}</h2>
          <div className="grid grid-cols-10 gap-4">
            {color.shades.map((shade) => (
              <div key={shade} className="text-center">
                <div
                  className="h-16 rounded-lg border border-gray-300 mb-2"
                  style={{ backgroundColor: `var(--color-${color.name.toLowerCase()}-${shade})` }}
                />
                <div className="text-sm font-mono">{shade}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Surface Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Surface Examples</h2>
        <div className="space-y-4">
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
            <p className="text-sm" style={{ color: 'var(--color-neutral-900)' }}>
              Light surface with dark text
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
            <p className="text-sm" style={{ color: 'var(--color-neutral-800)' }}>
              Slightly elevated surface
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
            <p className="text-sm" style={{ color: 'var(--color-neutral-50)' }}>
              Dark surface with light text
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
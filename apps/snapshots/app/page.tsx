import Link from 'next/link';

export default function HomePage() {
  const snapshots = [
    {
      title: 'Colors',
      description: 'Color system matrix and semantic usage',
      href: '/__snapshots/colors',
      color: 'bg-indigo-500'
    },
    {
      title: 'Assets',
      description: 'Therapeutic asset gallery with overlays',
      href: '/__snapshots/assets',
      color: 'bg-green-500'
    },
    {
      title: 'Overlays',
      description: 'Glass carve overlay examples',
      href: '/__snapshots/overlays',
      color: 'bg-purple-500'
    },
    {
      title: 'Type',
      description: 'Typography scale and font specimens',
      href: '/__snapshots/type',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recoverlution Design System
          </h1>
          <p className="text-xl text-gray-600">
            Visual regression testing and design system snapshots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {snapshots.map((snapshot) => (
            <Link
              key={snapshot.title}
              href={snapshot.href}
              className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${snapshot.color} rounded-lg mb-4`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {snapshot.title}
              </h3>
              <p className="text-gray-600">
                {snapshot.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Governance Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-gray-600">Color Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-gray-600">Asset System</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-gray-600">Typography</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-gray-600">Glass Carve</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
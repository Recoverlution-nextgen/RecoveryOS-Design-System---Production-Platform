import { useState } from 'react';
import { CheckCircle2, AlertCircle, Search, Filter, Eye, EyeOff, MessageSquare, ArrowLeft } from 'lucide-react';
import { MESSAGING_MATRIX, auditMessagingConsistency, getMessagingByLocation, type FeatureMessaging } from '../../utils/messaging';

interface MessagingMatrixPageProps {
  onNavigate: (page: string) => void;
}

export function MessagingMatrixPage({ onNavigate }: MessagingMatrixPageProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'audit'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  // Get unique locations
  const allLocations = Array.from(
    new Set(
      MESSAGING_MATRIX.flatMap(f => f.slots.map(s => s.location))
    )
  ).sort();
  
  // Filter features by search
  const filteredFeatures = MESSAGING_MATRIX.filter(feature =>
    feature.featureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.coreConcept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.slots.some(slot => slot.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Run consistency audit
  const auditResults = auditMessagingConsistency();
  const hasIssues = auditResults.length > 0;

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F3FF]">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#3E2BB8] via-[#5739FB] to-[#7C67FF] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative px-6 md:px-12 py-12 md:py-16">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("dna-hub")}
            className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to DNA Hub</span>
          </button>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    Messaging Matrix
                  </h1>
                </div>
              </div>
              <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
                Complete map of every messaging touchpoint across the platform. Ensures 100% consistency and gives instant visibility to audit all copy.
              </p>
            </div>
            
            {/* Status Badge */}
            <div className={`px-4 py-2 rounded-xl backdrop-blur-xl border flex items-center gap-2 ${
              hasIssues 
                ? 'bg-yellow-500/10 border-yellow-300/30 text-yellow-100'
                : 'bg-green-500/10 border-green-300/30 text-green-100'
            }`}>
              {hasIssues ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{auditResults.length} Issues Found</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">All Consistent</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search features or messaging..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB]/20 focus:border-[#5739FB]"
            />
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#5739FB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-[#5739FB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('audit')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'audit'
                  ? 'bg-[#5739FB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Audit View
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-8">
        {viewMode === 'grid' && (
          <GridView 
            features={filteredFeatures} 
            selectedFeature={selectedFeature}
            onSelectFeature={setSelectedFeature}
          />
        )}
        
        {viewMode === 'table' && (
          <TableView 
            features={filteredFeatures}
            locations={allLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />
        )}
        
        {viewMode === 'audit' && (
          <AuditView auditResults={auditResults} />
        )}
      </div>
    </div>
  );
}

// Grid View Component
function GridView({ 
  features, 
  selectedFeature,
  onSelectFeature 
}: { 
  features: FeatureMessaging[];
  selectedFeature: string | null;
  onSelectFeature: (name: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      {features.map(feature => {
        const isExpanded = selectedFeature === feature.featureName;
        
        return (
          <div
            key={feature.featureName}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Feature Header */}
            <button
              onClick={() => onSelectFeature(isExpanded ? null : feature.featureName)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {feature.featureName}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.coreConcept}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {feature.slots.length} slots
                </span>
                {isExpanded ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="p-6 space-y-4">
                  {feature.slots.map((slot, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-[#5739FB] uppercase tracking-wide mb-2">
                            {slot.location}
                          </div>
                          <div className="text-lg text-gray-900 font-medium">
                            "{slot.text}"
                          </div>
                        </div>
                        {slot.characterCount && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {slot.characterCount} chars
                          </div>
                        )}
                      </div>
                      {slot.context && (
                        <div className="text-sm text-gray-600 mt-2 pl-4 border-l-2 border-gray-200">
                          {slot.context}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Table View Component
function TableView({
  features,
  locations,
  selectedLocation,
  onSelectLocation
}: {
  features: FeatureMessaging[];
  locations: string[];
  selectedLocation: string | null;
  onSelectLocation: (location: string | null) => void;
}) {
  const filteredLocations = selectedLocation 
    ? locations.filter(l => l === selectedLocation)
    : locations;

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by location:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectLocation(null)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                !selectedLocation
                  ? 'bg-[#5739FB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {/* Dashboard Tiles */}
            <div className="h-4 w-px bg-gray-300" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Dashboard:</span>
            {locations.filter(l => l.includes('Dashboard Tile')).map(location => (
              <button
                key={location}
                onClick={() => onSelectLocation(location)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedLocation === location
                    ? 'bg-[#5739FB] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {location.replace('Dashboard Tile ', '')}
              </button>
            ))}
            {/* Marketing */}
            <div className="h-4 w-px bg-gray-300" />
            <span className="text-xs text-gray-500 uppercase tracking-wide">Marketing:</span>
            {locations.filter(l => l.includes('Marketing Website')).map(location => (
              <button
                key={location}
                onClick={() => onSelectLocation(location)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedLocation === location
                    ? 'bg-[#5739FB] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {location.replace('Marketing Website - ', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Feature
                </th>
                {filteredLocations.map(location => (
                  <th key={location} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    {location}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map(feature => (
                <tr key={feature.featureName} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{feature.featureName}</div>
                  </td>
                  {filteredLocations.map(location => {
                    const slot = feature.slots.find(s => s.location === location);
                    return (
                      <td key={location} className="px-6 py-4">
                        {slot ? (
                          <div>
                            <div className="text-sm text-gray-900">"{slot.text}"</div>
                            {slot.characterCount && (
                              <div className="text-xs text-gray-500 mt-1">
                                {slot.characterCount} chars
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Audit View Component
function AuditView({ auditResults }: { auditResults: { feature: string; issues: string[] }[] }) {
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`rounded-2xl border p-6 ${
        auditResults.length === 0
          ? 'bg-green-50 border-green-200'
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-start gap-4">
          {auditResults.length === 0 ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {auditResults.length === 0 ? (
                <span className="text-green-900">All Messaging Consistent ✨</span>
              ) : (
                <span className="text-yellow-900">Consistency Issues Detected</span>
              )}
            </h3>
            <p className="text-sm leading-relaxed">
              {auditResults.length === 0 ? (
                <span className="text-green-800">
                  All messaging across the platform follows DNA principles. No dashes, consistent breakpoint messaging, and proper character counts.
                </span>
              ) : (
                <span className="text-yellow-800">
                  Found {auditResults.length} {auditResults.length === 1 ? 'feature' : 'features'} with messaging that needs attention.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {auditResults.length > 0 && (
        <div className="space-y-4">
          {auditResults.map(result => (
            <div key={result.feature} className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
              <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-200">
                <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                  {result.feature}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {result.issues.length} {result.issues.length === 1 ? 'issue' : 'issues'} found
                </p>
              </div>
              <div className="p-6 space-y-3">
                {result.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DNA Principles Reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Messaging DNA Principles
        </h4>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">No Dashes Site-Wide</div>
              <div className="text-gray-600">Rewrite instead. Apple never uses dashes.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Consistent Across Breakpoints</div>
              <div className="text-gray-600">Dashboard tile messaging should be identical on mobile/tablet/desktop unless space requires it.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Character Balance</div>
              <div className="text-gray-600">Similar length descriptions create visual harmony.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

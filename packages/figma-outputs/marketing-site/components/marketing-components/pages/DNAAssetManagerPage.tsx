import { useState, useEffect } from "react";
import { ArrowLeft, Search, Download, Copy, Check, ExternalLink, Info, Image as ImageIcon } from "lucide-react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { searchPixabayForBackground, type PixabayImage } from "../../utils/pixabayAPI";

interface DNAAssetManagerPageProps {
  onNavigate: (page: string) => void;
}

const popularSearches = [
  "smooth purple gradient",
  "peaceful journey path",
  "soft layered waves",
  "abstract zen space",
  "minimal calm water",
  "purple mist forest",
  "smooth flowing shapes",
  "serene light abstract",
  "gentle purple clouds",
  "calm geometric patterns",
];

const currentHeroImages = [
  { page: "Journey", query: "peaceful journey path light", current: "figma:asset/..." },
  { page: "Navicues", query: "smooth purple smoke", current: "figma:asset/..." },
  { page: "Wellbeing", query: "soft purple mist forest", current: "figma:asset/..." },
  { page: "Inner Compass", query: "smooth gradient waves", current: "figma:asset/..." },
  { page: "Toolkit", query: "abstract library workspace", current: "figma:asset/..." },
  { page: "Navigate", query: "soft layered waves purple", current: "figma:asset/..." },
  { page: "Momentum", query: "peaceful journey mountain path", current: "figma:asset/..." },
];

export function DNAAssetManagerPage({ onNavigate }: DNAAssetManagerPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [pixabayResults, setPixabayResults] = useState<PixabayImage[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setPixabayResults([]);
    
    try {
      const results = await searchPixabayForBackground(searchQuery, 12);
      setPixabayResults(results);
    } catch (error) {
      // Silently handle - Pixabay may not be available in preview
      setPixabayResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery && !isSearching) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/60 px-6 md:px-12 flex items-center justify-between" style={{ height: '72px', minHeight: '72px' }}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("dna-hub")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          <span className="text-xs text-gray-400 font-mono">Asset Manager</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate("dna-hub")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            DNA HUB
          </button>
          <button
            onClick={() => onNavigate("dna-asset-manager")}
            className="text-sm text-[#3E2BB8] hover:text-[#5739FB] transition-colors relative"
          >
            Asset Manager
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5739FB]"></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Image Asset Manager
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Search and preview hero images from Pixabay. Find the perfect images for page headers without disrupting development.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                <strong className="text-blue-900">How it works:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>Search for an image using natural keywords (2-3 words work best)</li>
                <li>Preview images in real-time</li>
                <li>Copy the image URL to use in your code</li>
                <li>Images are high-quality and automatically optimized</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g., 'peaceful mountain path' or 'soft purple gradient'"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5739FB]/20 focus:border-[#5739FB]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-6 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              {isSearching ? "Searching..." : "Search Pixabay"}
            </button>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-3">Popular Searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((query) => (
              <button
                key={query}
                onClick={() => handleQuickSearch(query)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#5739FB] hover:bg-[#5739FB]/5 transition-all"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {pixabayResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pixabayResults.map((image) => (
              <div 
                key={image.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={image.webformatURL}
                    alt={image.tags}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="text-sm text-gray-600">
                    {image.imageWidth} × {image.imageHeight}px
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(image.largeImageURL)}
                      className="flex-1 px-3 py-2 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      {copiedUrl === image.largeImageURL ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy URL
                        </>
                      )}
                    </button>
                    
                    <a
                      href={image.pageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Photo by <span className="font-medium">{image.user}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isSearching && pixabayResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No images found. Try different keywords.</p>
          </div>
        )}

        {/* Current Hero Images Reference */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Current Hero Images
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentHeroImages.map((item) => (
              <div key={item.page} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm text-gray-900 mb-2">{item.page}</h3>
                <p className="text-xs text-gray-600 mb-2">Query: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{item.query}</span></p>
                <button
                  onClick={() => handleQuickSearch(item.query)}
                  className="text-xs text-[#5739FB] hover:underline"
                >
                  Search similar →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

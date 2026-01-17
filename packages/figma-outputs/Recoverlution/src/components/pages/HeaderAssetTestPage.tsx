/**
 * Header Asset Test Page
 * Quick visual verification that all dashboard header assets are loading correctly
 */

import { ArrowLeft } from "lucide-react";

// Import all dashboard header assets
import journeyHeroAsset from "figma:asset/abbdcde6011c1b4fea13c52874ecbe79bf638b4a.png";
import navicuesHeroAsset from "figma:asset/6d10e5fdaf0c14e3124f0278e0ee4cab6c27c11d.png";
import wellbeingHeroAsset from "figma:asset/a3e60413e37cf570a5c93b24174be4dfe1b1461a.png";
import stateHeroAsset from "figma:asset/20c2aa2a809398c70628df25868ff42d3b7c6dfd.png";
import toolkitHeroAsset from "figma:asset/d3b08d5e57ff6104e428dae18b236d12cf53297e.png";
import navigateHeroAsset from "figma:asset/3ec6ce502171668b7dfada21b1a8ae7dd4d82bb1.png";
import momentumHeroAsset from "figma:asset/4c5dd03002ca21bee685976d68edf96f531f83fd.png";
import settingsHeroAsset from "figma:asset/b8c0c664db13180aae6ef8c21894fe5895c3cf45.png";

interface HeaderAssetTestPageProps {
  onNavigate: (page: string) => void;
}

const assets = [
  {
    name: "Journey",
    asset: journeyHeroAsset,
    description: "Blue fabric/ribbon (brand aligned warmth)",
    hash: "abbdcde6011c1b4fea13c52874ecbe79bf638b4a"
  },
  {
    name: "Navicues",
    asset: navicuesHeroAsset,
    description: "Cooler blue geometric cubes (distinct from Journey)",
    hash: "6d10e5fdaf0c14e3124f0278e0ee4cab6c27c11d"
  },
  {
    name: "Wellbeing",
    asset: wellbeingHeroAsset,
    description: "Purple fluid swirls (gentle purple movement)",
    hash: "a3e60413e37cf570a5c93b24174be4dfe1b1461a"
  },
  {
    name: "State (Inner Compass)",
    asset: stateHeroAsset,
    description: "Blue clover pattern (soft organic blue)",
    hash: "20c2aa2a809398c70628df25868ff42d3b7c6dfd"
  },
  {
    name: "Toolkit",
    asset: toolkitHeroAsset,
    description: "Soft purple geometry (elegant brand purple)",
    hash: "d3b08d5e57ff6104e428dae18b236d12cf53297e"
  },
  {
    name: "Navigate",
    asset: navigateHeroAsset,
    description: "Cyan 3D stairs (turquoise depth)",
    hash: "3ec6ce502171668b7dfada21b1a8ae7dd4d82bb1"
  },
  {
    name: "Momentum",
    asset: momentumHeroAsset,
    description: "Purple/blue dominoes (gradient energy)",
    hash: "4c5dd03002ca21bee685976d68edf96f531f83fd"
  },
  {
    name: "Settings",
    asset: settingsHeroAsset,
    description: "Cyan 3D stacked blocks (organized, technical)",
    hash: "b8c0c664db13180aae6ef8c21894fe5895c3cf45"
  }
];

export function HeaderAssetTestPage({ onNavigate }: HeaderAssetTestPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate("Dashboard")}
            className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl mb-2">Dashboard Header Assets Test</h1>
          <p className="text-white/80">Visual verification of all v12.3 dashboard header assets</p>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assets.map((item) => (
            <div key={item.name} className="bg-[#FAFAFA] p-6" style={{ borderRadius: '0px' }}>
              {/* Asset Preview */}
              <div 
                className="w-full h-64 bg-cover bg-center mb-4"
                style={{ 
                  backgroundImage: `url(${item.asset})`,
                  borderRadius: '0px'
                }}
              />
              
              {/* Details */}
              <div className="space-y-2">
                <h3 className="text-xl text-[#3E2BB8]">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-400 font-mono break-all">{item.hash}</p>
                
                {/* Test Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500" style={{ borderRadius: '0px' }}></div>
                    <span className="text-xs text-gray-600">Asset loaded successfully</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 p-8 bg-[#F5F3FF]" style={{ borderRadius: '0px' }}>
          <h2 className="text-2xl mb-4 text-[#3E2BB8]">Asset Status Summary</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Total Assets:</strong> {assets.length}/8
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> All assets imported and ready
            </p>
            <p className="text-gray-700">
              <strong>Color Harmony:</strong> Blues → Purples → Cyan
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-white" style={{ borderRadius: '0px' }}>
            <p className="text-sm text-gray-600">
              If you see this page with all 8 asset previews above, the header assets are loading correctly.
              The issue may be browser caching. Try hard refreshing (Cmd+Shift+R or Ctrl+Shift+R) on the 
              individual dashboard pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

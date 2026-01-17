/**
 * TINYPNG CDN PREVIEW & TESTING TOOL
 * 
 * Purpose: Test and preview TinyPNG CDN optimizations
 * Features:
 *   - Live URL generation with visual preview
 *   - Side-by-side before/after comparison
 *   - Performance metrics and savings calculator
 *   - Copy optimized URLs for production use
 *   - Responsive image preview
 * 
 * Location: Command Center > DNA Hub > TinyPNG CDN Preview
 * 
 * Created: October 26, 2025 (ST56 Implementation)
 */

import { useState, useEffect } from 'react';
import { Copy, Check, Zap, Download, Image as ImageIcon, Code, TrendingDown, Clock } from 'lucide-react';
import { getTinyCDNUrl, getResponsiveSrcSet, calculatePerformanceImpact, TinyCDNOptions } from '../../utils/tinypngCDN';
import { TinyCDNImage } from '../TinyCDNImage';

export default function TinyCDNPreviewPage() {
  // Form state
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [fit, setFit] = useState<'cover' | 'contain' | 'fill' | 'scale-down'>('cover');
  const [format, setFormat] = useState<'webp' | 'avif' | 'auto'>('auto');
  const [background, setBackground] = useState('');
  
  // Output state
  const [optimizedUrl, setOptimizedUrl] = useState('');
  const [srcSet, setSrcSet] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Performance metrics
  const [originalSize, setOriginalSize] = useState(1800); // Default: 1.8MB
  const [metrics, setMetrics] = useState(calculatePerformanceImpact(1800, 'auto'));
  
  // Sample images for quick testing
  const sampleImages = [
    {
      name: 'Hero Dashboard (1600x1140)',
      url: 'https://via.placeholder.com/1600x1140/5739FB/FFFFFF?text=Hero+Dashboard',
      size: 1800
    },
    {
      name: 'Marketing Asset (1920x1080)',
      url: 'https://via.placeholder.com/1920x1080/40E0D0/FFFFFF?text=Marketing+Asset',
      size: 2100
    },
    {
      name: 'Profile Photo (800x800)',
      url: 'https://via.placeholder.com/800x800/3E2BB8/FFFFFF?text=Profile',
      size: 450
    }
  ];
  
  // Generate optimized URL
  const generateOptimizedUrl = async () => {
    if (!imageUrl) return;
    
    setIsGenerating(true);
    
    try {
      const options: TinyCDNOptions = {
        width: width || undefined,
        height: height || undefined,
        fit,
        format,
        background: background || undefined
      };
      
      const cdnUrl = await getTinyCDNUrl(imageUrl, options);
      setOptimizedUrl(cdnUrl);
      
      // Generate responsive srcSet
      const responsiveSrcSet = await getResponsiveSrcSet(imageUrl, [800, 1200, 1600, 2400], format);
      setSrcSet(responsiveSrcSet);
      
      // Update metrics
      setMetrics(calculatePerformanceImpact(originalSize, format));
      
    } catch (error) {
      console.error('Failed to generate CDN URL:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Auto-generate when form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (imageUrl) {
        generateOptimizedUrl();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [imageUrl, width, height, fit, format, background]);
  
  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Load sample image
  const loadSample = (sample: typeof sampleImages[0]) => {
    setImageUrl(sample.url);
    setOriginalSize(sample.size);
  };
  
  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200/60 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 border"
            style={{
              background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.08), rgba(64, 224, 208, 0.05))',
              borderColor: 'rgba(87, 57, 251, 0.2)',
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#3E2BB8'
            }}
          >
            DNA HUB · IMAGE OPTIMIZATION
          </div>
          <h1 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#111827'
            }}
          >
            TinyPNG CDN Preview
          </h1>
          <p 
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#6B7280',
              maxWidth: '600px'
            }}
          >
            Test image optimization with live before/after comparison and performance metrics
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Quick Samples */}
        <div className="mb-8">
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              letterSpacing: '0.08em',
              color: '#6B7280',
              textTransform: 'uppercase'
            }}
          >
            Quick Test Samples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleImages.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => loadSample(sample)}
                className="p-4 border text-left transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
                  borderColor: imageUrl === sample.url ? '#5739FB' : 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  boxShadow: imageUrl === sample.url 
                    ? '0 4px 16px rgba(87, 57, 251, 0.15)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <p 
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: '#111827'
                  }}
                >
                  {sample.name}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Original: {sample.size}KB
                </p>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT: Configuration Form */}
          <div 
            className="p-8 border"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              borderRadius: '0px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.15), rgba(87, 57, 251, 0.1))',
                  borderRadius: '0px'
                }}
              >
                <ImageIcon className="w-5 h-5" style={{ color: '#5739FB' }} />
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#111827'
                }}
              >
                Image Configuration
              </h2>
            </div>
            
            {/* Image URL */}
            <div className="mb-6">
              <label 
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 border transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                  fontSize: '0.9375rem',
                  color: '#111827'
                }}
              />
            </div>
            
            {/* Width & Height */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}
                >
                  Width (px)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="1600"
                  className="w-full px-4 py-3 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '0px',
                    fontSize: '0.9375rem'
                  }}
                />
              </div>
              <div>
                <label 
                  className="block mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}
                >
                  Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="Auto"
                  className="w-full px-4 py-3 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '0px',
                    fontSize: '0.9375rem'
                  }}
                />
              </div>
            </div>
            
            {/* Fit Mode */}
            <div className="mb-6">
              <label 
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Fit Mode
              </label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value as any)}
                className="w-full px-4 py-3 border"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                  fontSize: '0.9375rem'
                }}
              >
                <option value="cover">Cover (crop to fill)</option>
                <option value="contain">Contain (fit within)</option>
                <option value="fill">Fill (stretch)</option>
                <option value="scale-down">Scale Down</option>
              </select>
            </div>
            
            {/* Format */}
            <div className="mb-6">
              <label 
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-4 py-3 border"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                  fontSize: '0.9375rem'
                }}
              >
                <option value="auto">Auto (browser-optimized)</option>
                <option value="webp">WebP (75% compression)</option>
                <option value="avif">AVIF (85% compression)</option>
              </select>
            </div>
            
            {/* Original File Size */}
            <div className="mb-6">
              <label 
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151'
                }}
              >
                Original File Size (KB)
              </label>
              <input
                type="number"
                value={originalSize}
                onChange={(e) => {
                  const size = parseInt(e.target.value) || 0;
                  setOriginalSize(size);
                  setMetrics(calculatePerformanceImpact(size, format));
                }}
                placeholder="1800"
                className="w-full px-4 py-3 border"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0px',
                  fontSize: '0.9375rem'
                }}
              />
            </div>
            
            {/* Performance Metrics */}
            <div 
              className="p-6 border"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.05))',
                borderColor: 'rgba(16, 185, 129, 0.2)',
                borderRadius: '0px'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5" style={{ color: '#10B981' }} />
                <h3 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    color: '#111827'
                  }}
                >
                  Estimated Performance Impact
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Compression
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: '#10B981'
                    }}
                  >
                    {metrics.compressionPercent}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    File Size Reduction
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: '#10B981'
                    }}
                  >
                    {metrics.savedKB}KB saved
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    Load Time Improvement (3G)
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: '#10B981'
                    }}
                  >
                    {(metrics.savedTimeMs / 1000).toFixed(2)}s faster
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT: Preview & Output */}
          <div className="space-y-6">
            
            {/* Visual Preview */}
            {optimizedUrl && (
              <div 
                className="p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: '#111827'
                  }}
                >
                  Optimized Preview
                </h3>
                
                <div 
                  className="overflow-hidden border"
                  style={{
                    background: '#F5F3FF',
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                    borderRadius: '0px',
                    maxHeight: '400px'
                  }}
                >
                  <TinyCDNImage
                    src={imageUrl}
                    alt="Preview"
                    width={width || undefined}
                    height={height || undefined}
                    format={format}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            
            {/* Optimized URL */}
            {optimizedUrl && (
              <div 
                className="p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" style={{ color: '#5739FB' }} />
                    <h3 
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        color: '#111827'
                      }}
                    >
                      Optimized CDN URL
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(optimizedUrl)}
                    className="flex items-center gap-2 px-4 py-2 border transition-all duration-200"
                    style={{
                      background: copied ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.1))' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: copied ? '#10B981' : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '0px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: copied ? '#10B981' : '#5739FB'
                    }}
                  >
                    {copied ? (
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
                </div>
                
                <div 
                  className="p-4 border overflow-x-auto"
                  style={{
                    background: 'rgba(17, 24, 39, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '0px'
                  }}
                >
                  <code 
                    style={{
                      fontSize: '0.8125rem',
                      color: '#374151',
                      wordBreak: 'break-all'
                    }}
                  >
                    {optimizedUrl}
                  </code>
                </div>
              </div>
            )}
            
            {/* Responsive SrcSet */}
            {srcSet && (
              <div 
                className="p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: '#111827'
                    }}
                  >
                    Responsive SrcSet
                  </h3>
                  
                  <button
                    onClick={() => copyToClipboard(srcSet)}
                    className="flex items-center gap-2 px-4 py-2 border transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '0px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#5739FB'
                    }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                
                <div 
                  className="p-4 border overflow-x-auto"
                  style={{
                    background: 'rgba(17, 24, 39, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '0px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  <code 
                    style={{
                      fontSize: '0.75rem',
                      color: '#374151',
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {srcSet}
                  </code>
                </div>
              </div>
            )}
            
            {/* Usage Example */}
            {optimizedUrl && (
              <div 
                className="p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.05), rgba(87, 57, 251, 0.03))',
                  borderColor: 'rgba(87, 57, 251, 0.2)',
                  borderRadius: '0px'
                }}
              >
                <h3 
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: '#111827'
                  }}
                >
                  Usage in React
                </h3>
                
                <div 
                  className="p-4 border"
                  style={{
                    background: 'rgba(17, 24, 39, 0.95)',
                    borderColor: 'rgba(87, 57, 251, 0.3)',
                    borderRadius: '0px'
                  }}
                >
                  <pre style={{ margin: 0, overflow: 'auto' }}>
                    <code 
                      style={{
                        fontSize: '0.8125rem',
                        color: '#E5E7EB',
                        fontFamily: 'monospace'
                      }}
                    >
{`<TinyCDNImage
  src="${imageUrl}"
  alt="Optimized image"${width ? `\n  width={${width}}` : ''}${height ? `\n  height={${height}}` : ''}
  format="${format}"
  responsive
/>`}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

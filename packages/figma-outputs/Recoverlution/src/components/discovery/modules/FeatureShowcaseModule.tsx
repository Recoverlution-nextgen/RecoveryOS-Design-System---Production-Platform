/**
 * FEATURE SHOWCASE MODULE
 * 
 * Dual-state component for showcasing individual features.
 * State 1: Overview (Apple-style hero with device mockup)
 * State 2: Detail (feature breakdown with asset)
 */

import React, { useState } from 'react';
import { MODULES } from '../discoveryData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface FeatureShowcaseModuleProps {
  moduleId: string;
}

export function FeatureShowcaseModule({ moduleId }: FeatureShowcaseModuleProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const module = MODULES.find(m => m.id === moduleId);
  
  if (!module || !module.content?.featureShowcase) {
    return <div>Feature showcase content not found</div>;
  }

  const { overview, detail } = module.content.featureShowcase;

  // Reset slide when switching states
  const handleShowDetail = () => {
    setCurrentSlide(0);
    setShowDetail(true);
  };

  const handleShowOverview = () => {
    setCurrentSlide(0);
    setShowDetail(false);
  };

  if (!showDetail) {
    // STATE 1: OVERVIEW (Apple bluesky style)
    return (
      <div className="relative">
        {/* Hero Section */}
        <div 
          className="relative px-8 py-12 cursor-pointer transition-all duration-300 hover:bg-white/[0.02]"
          onClick={handleShowDetail}
          style={{
            background: 'linear-gradient(180deg, rgba(87, 57, 251, 0.05) 0%, rgba(0, 0, 0, 0) 100%)'
          }}
        >
          {/* Headline */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 
              className="mb-3"
              style={{
                fontSize: '2.5rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '-0.02em'
              }}
            >
              {overview.headline}
            </h2>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.60)',
                fontWeight: 400
              }}
            >
              {overview.tagline}
            </p>
          </div>

          {/* Asset Window - Slider or Placeholder */}
          <div className="max-w-5xl mx-auto relative">
            {/* Copy that shines through transparent asset */}
            {overview.shineThrough && (
              <div className={`absolute inset-0 flex flex-col items-center ${overview.shineThrough.position === 'bottom' ? 'justify-end pb-12' : 'justify-start pt-12'} pointer-events-none z-0`}>
                <div className="max-w-2xl text-center px-8">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.85)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {overview.shineThrough.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '1.125rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: '1.7'
                    }}
                  >
                    {overview.shineThrough.description}
                  </p>
                </div>
              </div>
            )}

            {overview.assetSpec.images && overview.assetSpec.images.length > 0 ? (
              // CUSTOM IMAGE SLIDER
              <div className="relative z-10" style={{ paddingBottom: '60px' }}>
                {/* Slider Container */}
                <div className="relative overflow-hidden rounded-lg">
                  {/* Slides */}
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`
                    }}
                  >
                    {overview.assetSpec.images.map((imageUrl, index) => (
                      <div 
                        key={index}
                        className="w-full flex-shrink-0"
                      >
                        <div
                          style={{
                            aspectRatio: overview.assetSpec.aspectRatio.replace(':', '/')
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`NaviCue example ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {overview.assetSpec.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(prev => 
                            prev === 0 ? overview.assetSpec.images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all hover:scale-110"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255, 255, 255, 0.10)',
                          border: '1px solid rgba(255, 255, 255, 0.20)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ChevronLeft size={20} style={{ color: 'rgba(255, 255, 255, 0.80)' }} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(prev => 
                            prev === overview.assetSpec.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all hover:scale-110"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255, 255, 255, 0.10)',
                          border: '1px solid rgba(255, 255, 255, 0.20)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ChevronRight size={20} style={{ color: 'rgba(255, 255, 255, 0.80)' }} />
                      </button>
                    </>
                  )}
                </div>

                {/* Dots Navigation */}
                {overview.assetSpec.images.length > 1 && (
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2"
                  >
                    {overview.assetSpec.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        className="transition-all"
                        style={{
                          width: currentSlide === index ? '24px' : '8px',
                          height: '8px',
                          background: currentSlide === index 
                            ? 'rgba(87, 57, 251, 1)' 
                            : 'rgba(255, 255, 255, 0.30)',
                          borderRadius: currentSlide === index ? '4px' : '50%',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // PLACEHOLDER
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  aspectRatio: overview.assetSpec.aspectRatio.replace(':', '/')
                }}
              >
                {/* Asset Spec Info */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <div
                      className="mb-3"
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.40)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 600
                      }}
                    >
                      {overview.assetSpec.type} • {overview.assetSpec.aspectRatio}
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.50)',
                        lineHeight: '1.6'
                      }}
                    >
                      {overview.assetSpec.description}
                    </p>
                    {overview.assetSpec.composition && (
                      <p
                        className="mt-3"
                        style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.35)',
                          fontStyle: 'italic'
                        }}
                      >
                        Composition: {overview.assetSpec.composition}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="flex items-center justify-center mt-8 gap-2">
            <span
              style={{
                fontSize: '0.9375rem',
                color: 'rgba(255, 255, 255, 0.60)',
                fontWeight: 500
              }}
            >
              Click to explore
            </span>
            <ChevronRight 
              size={18} 
              style={{ color: 'rgba(255, 255, 255, 0.60)' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // STATE 2: DETAIL (Feature breakdown)
  return (
    <div className="relative">
      {/* Back Button */}
      <button
        onClick={handleShowOverview}
        className="mb-6 px-4 py-2 flex items-center gap-2 transition-all hover:bg-white/[0.05]"
        style={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.60)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          borderRadius: '0px'
        }}
      >
        <ChevronRight 
          size={16} 
          style={{ transform: 'rotate(180deg)' }}
        />
        Back to overview
      </button>

      {/* Detail Header */}
      <div className="mb-8">
        <h3
          className="mb-2"
          style={{
            fontSize: '2rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '-0.02em'
          }}
        >
          {detail.headline}
        </h3>
      </div>

      {/* Asset + Features Grid */}
      <div className="relative mb-8">
        {/* Features List - absolutely positioned on the right */}
        <div className="absolute inset-y-0 right-0 w-1/2 flex items-center z-10 pointer-events-none">
          <div className="space-y-6 pl-8 pointer-events-auto">
            {detail.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-1"
                      style={{
                        width: '2rem',
                        height: '2rem',
                        background: 'rgba(87, 57, 251, 0.15)',
                        border: '1px solid rgba(87, 57, 251, 0.30)',
                        borderRadius: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon 
                        size={18} 
                        style={{ color: 'rgba(87, 57, 251, 1)' }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="mb-1"
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.90)'
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.60)',
                          lineHeight: '1.6'
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asset - fills full space */}
        {detail.assetSpec.images && detail.assetSpec.images.length > 0 ? (
          // CUSTOM IMAGE SLIDER FOR DETAIL STATE - SPANS FULL WIDTH
          <div className="relative" style={{ paddingBottom: '60px', minHeight: '600px' }}>
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-lg h-full">
              {/* Slides */}
              <div 
                className="flex transition-transform duration-500 ease-out h-full"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {detail.assetSpec.images.map((imageUrl: string, index: number) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 h-full flex items-center justify-center"
                  >
                    <img
                      src={imageUrl}
                      alt={`Example ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {detail.assetSpec.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(prev => 
                        prev === 0 ? detail.assetSpec.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all hover:scale-110"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.10)',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={20} style={{ color: 'rgba(255, 255, 255, 0.80)' }} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(prev => 
                        prev === detail.assetSpec.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all hover:scale-110"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.10)',
                      border: '1px solid rgba(255, 255, 255, 0.20)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={20} style={{ color: 'rgba(255, 255, 255, 0.80)' }} />
                  </button>
                </>
              )}
            </div>

            {/* Dots Navigation */}
            {detail.assetSpec.images.length > 1 && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2"
              >
                {detail.assetSpec.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className="transition-all"
                    style={{
                      width: currentSlide === index ? '24px' : '8px',
                      height: '8px',
                      background: currentSlide === index 
                        ? 'rgba(87, 57, 251, 1)' 
                        : 'rgba(255, 255, 255, 0.30)',
                      borderRadius: currentSlide === index ? '4px' : '50%',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          // PLACEHOLDER
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              aspectRatio: detail.assetSpec.aspectRatio.replace(':', '/')
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center max-w-lg">
                <div
                  className="mb-3"
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.40)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600
                  }}
                >
                  {detail.assetSpec.type} • {detail.assetSpec.aspectRatio}
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.50)',
                    lineHeight: '1.6'
                  }}
                >
                  {detail.assetSpec.description}
                </p>
                {detail.assetSpec.composition && (
                  <p
                    className="mt-3"
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.35)',
                      fontStyle: 'italic'
                    }}
                  >
                    Composition: {detail.assetSpec.composition}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/**
 * MARKETING HEADER - MASTER COMPONENT
 * 
 * Universal header for all marketing pages (Homepage, Platform, Science, Story, Pricing, Demo)
 * Features: Black logo, consistent margins, sticky nav, mobile menu
 * 
 * Created: October 28, 2025
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import recoverlutionLogo from 'figma:asset/7da866ea6ef2018dfd4656f74ef1f42cdc972b51.png';

interface MarketingHeaderProps {
  onNavigate?: (page: string) => void;
  onEnterPlatform?: () => void;
  currentPage?: string;
}

export function MarketingHeader({ onNavigate, onEnterPlatform, currentPage }: MarketingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      className="sticky top-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #FEFCFF 0%, #FDFBFF 100%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)'
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo - Links to Homepage */}
        <button 
          onClick={() => onNavigate?.('home')}
          className="flex items-center transition-opacity hover:opacity-70"
        >
          <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate?.('platform')}
            className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-[10px] uppercase tracking-[0.1em]"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: currentPage === 'platform' ? '#1a1a1a' : undefined
            }}
          >
            Platform
          </button>
          <button
            onClick={() => onNavigate?.('science')}
            className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-[10px] uppercase tracking-[0.1em]"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: currentPage === 'science' ? '#1a1a1a' : undefined
            }}
          >
            Science
          </button>
          <button
            onClick={() => onNavigate?.('story')}
            className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-[10px] uppercase tracking-[0.1em]"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: currentPage === 'story' ? '#1a1a1a' : undefined
            }}
          >
            Story
          </button>
          <button
            onClick={() => onNavigate?.('pricing')}
            className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-[10px] uppercase tracking-[0.1em]"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: currentPage === 'pricing' ? '#1a1a1a' : undefined
            }}
          >
            Pricing
          </button>
          <button
            onClick={() => onEnterPlatform?.()}
            className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Log In
          </button>
          <button
            onClick={() => onNavigate?.('demo')}
            className="group relative overflow-hidden px-6 py-2 text-white transition-all text-[10px] uppercase tracking-[0.12em]"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              borderRadius: '0px',
              background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
              boxShadow: '0 4px 16px rgba(87, 57, 251, 0.25), 0 2px 8px rgba(62, 43, 184, 0.15)'
            }}
          >
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
                pointerEvents: 'none'
              }}
            />
            <span className="relative">View Demo</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#1a1a1a] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200/40">
          <div className="px-6 py-4 space-y-3">
            <button
              onClick={() => { onNavigate?.('platform'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Platform
            </button>
            <button
              onClick={() => { onNavigate?.('science'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Science
            </button>
            <button
              onClick={() => { onNavigate?.('story'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Story
            </button>
            <button
              onClick={() => { onNavigate?.('pricing'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Pricing
            </button>
            <button
              onClick={() => { onEnterPlatform?.(); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderRadius: '0px' }}
            >
              Log In
            </button>
            <button
              onClick={() => { onNavigate?.('demo'); setMobileMenuOpen(false); }}
              className="block w-full px-5 py-2.5 bg-[#1a1a1a] text-white hover:bg-[#333333] transition-all text-center"
              style={{ borderRadius: '0px' }}
            >
              View Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

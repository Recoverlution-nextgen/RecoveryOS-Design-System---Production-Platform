import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export function V3Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);

  const audiences = [
    { label: 'Organisations', href: '#/v3-organisations', icon: '🏔️' },
    { label: 'Professionals', href: '#/v3-professionals', icon: '🪶' },
    { label: 'Individuals', href: '#/v3-individuals', icon: '🌅' },
    { label: 'Companions', href: '#/v3-companions', icon: '🌿' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]" />
            <span className="text-xl font-bold text-white">Recoverlution</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Audience Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAudienceDropdownOpen(!audienceDropdownOpen)}
                className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors"
              >
                <span>For</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {audienceDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1A1B2E] border border-white/10 shadow-xl">
                  {audiences.map((audience) => (
                    <a
                      key={audience.href}
                      href={audience.href}
                      className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setAudienceDropdownOpen(false)}
                    >
                      <span className="text-2xl">{audience.icon}</span>
                      <span>{audience.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/platform" className="text-white/90 hover:text-white transition-colors">
              Platform
            </a>
            <a href="/science" className="text-white/90 hover:text-white transition-colors">
              Science
            </a>
            
            <a 
              href="/login" 
              className="text-white/90 hover:text-white transition-colors"
            >
              Log In
            </a>
            <a 
              href="/demo" 
              className="px-6 py-2 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white hover:opacity-90 transition-opacity"
            >
              View Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="space-y-2">
              <p className="text-white/50 text-sm px-4">For</p>
              {audiences.map((audience) => (
                <a
                  key={audience.href}
                  href={audience.href}
                  className="flex items-center space-x-3 px-4 py-2 text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{audience.icon}</span>
                  <span>{audience.label}</span>
                </a>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2">
              <a href="/platform" className="block px-4 py-2 text-white/90 hover:text-white">
                Platform
              </a>
              <a href="/science" className="block px-4 py-2 text-white/90 hover:text-white">
                Science
              </a>
              <a href="/login" className="block px-4 py-2 text-white/90 hover:text-white">
                Log In
              </a>
              <a 
                href="/demo" 
                className="block mx-4 px-6 py-2 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white text-center"
              >
                View Demo
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
import { Menu, X } from "lucide-react";
import { useState } from "react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { SEOHead } from "../SEOHead";
import { getPageSEO } from "../../utils/seo";

interface CookiesPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogin?: () => void;
}

export function CookiesPage({ onBack, onNavigate, onLogin }: CookiesPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const seo = getPageSEO('cookies');

  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      <SEOHead {...seo} />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <button onClick={onBack} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate?.("platform")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Platform
            </button>
            <button
              onClick={() => onNavigate?.("science")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Science
            </button>
            <button
              onClick={() => onNavigate?.("story")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Story
            </button>
            <button
              onClick={() => onNavigate?.("pricing")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Pricing
            </button>
            <button
              onClick={() => onLogin ? onLogin() : onBack?.()}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate?.("demo")}
              className="px-5 py-2 bg-[#3E2BB8] text-white rounded-lg hover:bg-[#5739FB] transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              View Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#3E2BB8] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200/40">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => { onNavigate?.("platform"); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Platform
              </button>
              <button
                onClick={() => { onNavigate?.("science"); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Science
              </button>
              <button
                onClick={() => { onNavigate?.("story"); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Story
              </button>
              <button
                onClick={() => { onNavigate?.("pricing"); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Pricing
              </button>
              <button
                onClick={() => { onLogin ? onLogin() : onBack?.(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
        <div className="relative max-w-4xl mx-auto px-6 md:px-12">
          <h1 
            className="text-gray-900 mb-4"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600, 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em'
            }}
          >
            Cookie Policy
          </h1>
          <p className="text-gray-500" style={{ fontSize: '1rem' }}>
            Last updated: 13 July 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-200/60">
            <div className="prose prose-lg max-w-none">
              {/* Intro */}
              <div className="mb-12">
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Recoverlution uses cookies and similar technologies to improve your experience, analyze usage, and deliver personalized content. This policy explains what cookies we use and how you can control them.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  1. What are cookies?
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  2. Essential cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  These cookies are necessary for the platform to function and cannot be disabled:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Session management
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Keeps you logged in and maintains your session state
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Security tokens
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Protects against cross-site request forgery attacks
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Cookie consent
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Remembers your cookie preferences
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  3. Analytics cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  These cookies help us understand how visitors use our site (with your consent):
                </p>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Usage analytics
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Page views, time on site, navigation patterns
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Performance monitoring
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Load times, errors, technical issues
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Feature usage
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Which features are most valuable to users
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  4. Preference cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  These cookies remember your choices to personalize your experience:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Language settings
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Your preferred language and region
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Interface preferences
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Theme, layout, and display options
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}>
                      Notification settings
                    </p>
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                      Your communication preferences
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  5. Third-party cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  We use trusted third-party services that may set their own cookies:
                </p>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>AWS CloudFront</strong> – Content delivery and security
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Auth0</strong> – Authentication and session management
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>HubSpot</strong> – Marketing analytics (with consent)
                  </li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  6. Managing cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  You can control cookies through:
                </p>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Cookie banner</strong> – Accept or decline non-essential cookies when you first visit
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Browser settings</strong> – Block or delete cookies through your browser preferences
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Account settings</strong> – Manage preferences within your Recoverlution account
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
                  Note: Blocking essential cookies may prevent the platform from working properly.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  7. Updates to this policy
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  We may update this Cookie Policy to reflect changes in our practices or for legal reasons. We'll post the updated policy here and update the "Last updated" date.
                </p>
              </div>

              {/* Questions */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  <strong>Questions about cookies?</strong>{" "}
                  <a href="mailto:support@recoverlution.com" className="text-[#3E2BB8] hover:underline">
                    support@recoverlution.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/40 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
              © 2025 Recoverlution. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate?.("privacy")}
                className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Privacy
              </button>
              <button
                onClick={() => onNavigate?.("terms")}
                className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Terms
              </button>
              <button
                onClick={() => onNavigate?.("cookies")}
                className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

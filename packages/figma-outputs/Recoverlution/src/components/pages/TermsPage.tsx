import { Menu, X } from "lucide-react";
import { useState } from "react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { SEOHead } from "../SEOHead";
import { getPageSEO } from "../../utils/seo";

interface TermsPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogin?: () => void;
}

export function TermsPage({ onBack, onNavigate, onLogin }: TermsPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const seo = getPageSEO('terms');

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
            Terms of Service
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
              {/* Section 1 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  By accessing or using the Recoverlution platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  2. Service Description
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  Recoverlution provides a therapeutic platform designed to help recovery facilities deliver structured content to patients through evidence-based frameworks. Our services include:
                </p>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Patient engagement tools and content library
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Clinical dashboards and progress tracking
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Care team coordination features
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Neuroscience-backed recovery frameworks
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  3. Account Responsibilities
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  You are responsible for:
                </p>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    All activities that occur under your account
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Notifying us immediately of any unauthorized access
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Providing accurate and current information
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  4. Acceptable Use
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  You agree not to:
                </p>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Use the service for any unlawful purpose
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Attempt to gain unauthorized access to our systems
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Interfere with or disrupt the service or servers
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Share your account with unauthorized users
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Use the platform to provide medical advice outside your scope of practice
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  5. Subscription & Payment
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Recoverlution is offered on a seat-based subscription model. Payment terms are specified in your service agreement. You may cancel your subscription at any time, with access continuing through the end of the current billing period.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  6. Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  All content, features, and functionality of Recoverlution remain the exclusive property of Recoverlution Ltd. You are granted a limited, non-exclusive, non-transferable license to use the platform in accordance with these terms.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  7. Disclaimer of Warranties
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Recoverlution is a therapeutic tool and does not replace professional medical advice, diagnosis, or treatment. The platform is provided "as is" without warranties of any kind, either express or implied.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  To the maximum extent permitted by law, Recoverlution Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  9. Modifications to Service
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  We reserve the right to modify or discontinue the service at any time, with or without notice. We will provide reasonable notice of any material changes that affect your use of the platform.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-8">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  10. Governing Law
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.
                </p>
              </div>

              {/* Questions */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  <strong>Questions about these terms?</strong>{" "}
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

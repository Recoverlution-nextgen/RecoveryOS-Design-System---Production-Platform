import { Menu, X } from "lucide-react";
import { useState } from "react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { SEOHead } from "../SEOHead";
import { getPageSEO } from "../../utils/seo";

interface PrivacyPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogin?: () => void;
}

export function PrivacyPage({ onBack, onNavigate, onLogin }: PrivacyPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const seo = getPageSEO('privacy');

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
            Privacy Policy
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
                  1. Who we are
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3" style={{ fontSize: '1rem' }}>
                  Recoverlution Ltd ("Recoverlution", "we", "us", "our")
                </p>
                <p className="text-gray-700 leading-relaxed mb-1" style={{ fontSize: '1rem' }}>
                  Bates Lane, Helsby, Cheshire, WA6 9LH
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  <a href="mailto:privacy@recoverlution.com" className="text-[#3E2BB8] hover:underline">
                    privacy@recoverlution.com
                  </a>
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  2. Scope
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  This notice covers:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Marketing site</strong> (recoverlution.com) – analytics, contact forms, cookies.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Recovery platform / mobile app</strong> – patient accounts, journals, wearables, clinician dashboards.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  When you use Recoverlution via a rehab or employer, that organisation is a separate data controller for the information it enters; Recoverlution acts as its processor.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  3. What we collect
                </h2>
                <ul className="space-y-3 mb-4">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Account data</strong> – name, email, phone, password hash.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Profile & goals</strong> – recovery goals, triggers, coping strategies.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Clinical notes</strong> – journals, mood logs, ResCue usage.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Wearable data (optional)</strong> – HRV, steps, sleep, location pings.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Usage data</strong> – IP address, device, feature clicks, crash logs.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Marketing preferences</strong> – newsletter opt-in/out.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Lawful bases: contract, consent, legitimate interest, legal obligation. Special-category (health) data is processed only with your explicit consent.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  4. How we use data
                </h2>
                <ol className="space-y-2 mb-4 list-decimal list-inside">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Deliver and secure the platform.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Personalise micro-practices and ResCues.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Generate aggregate analytics for clinicians.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Improve and research product features.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Send optional updates with your consent.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    Use anonymised, aggregated data to refine our adaptive models, never fully automated decisions with legal or similar impact.
                  </li>
                </ol>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  We never sell personal data or use patient information for third-party ads.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  5. Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Essential cookies keep the site working. Analytics and preference cookies load only after you opt in. Full list:{" "}
                  <button 
                    onClick={() => onNavigate?.("cookies")} 
                    className="text-[#3E2BB8] hover:underline"
                  >
                    recoverlution.com/cookies
                  </button>
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  6. Sharing & transfers
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  We share data only with trusted service providers (AWS, Auth0, Mailgun, Webflow, HubSpot) under strict data-processing agreements. Where data moves outside the UK/EEA, we rely on Standard Contractual Clauses.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  7. Retention
                </h2>
                <ul className="space-y-2">
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Account & profile:</strong> while account active + 7 years.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Journals & clinical notes:</strong> while account active + 7 years.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Analytics logs:</strong> 14 months.
                  </li>
                  <li className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                    <strong>Marketing contacts:</strong> until opt-out or 24 months of inactivity.
                  </li>
                </ul>
              </div>

              {/* Section 8 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  8. Your rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  Access • Rectify • Erase • Restrict • Object • Port • Withdraw consent • Complain to the ICO.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Email{" "}
                  <a href="mailto:support@recoverlution.com" className="text-[#3E2BB8] hover:underline">
                    support@recoverlution.com
                  </a>
                  {" "}– we respond within 30 days.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  9. Security
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  AES-256 encryption at rest, TLS 1.2+ in transit, MFA for staff, yearly penetration tests. Enterprise clients can enable federated-learning so raw patient data never leaves their environment.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  10. HIPAA (US clients)
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  For US covered entities we sign a Business Associate Agreement (BAA) and follow HIPAA-aligned safeguards.
                </p>
              </div>

              {/* Section 11 */}
              <div className="mb-12">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  11. Children
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  Service intended for users 18 years old and over.
                </p>
              </div>

              {/* Section 12 */}
              <div className="mb-8">
                <h2 
                  className="text-gray-900 mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem' }}
                >
                  12. Changes
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  We'll post any future changes here and email account holders 14 days before they take effect.
                </p>
              </div>

              {/* Questions */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1rem' }}>
                  <strong>Questions?</strong>{" "}
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

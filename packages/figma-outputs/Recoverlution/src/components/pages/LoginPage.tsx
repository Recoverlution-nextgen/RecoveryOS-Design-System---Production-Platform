import { useState } from "react";
import { ArrowRight } from "lucide-react";
import recoverlutionLogo from "figma:asset/d3c889f1d4c13c03718e4dd433a2fd6fe4a8d55c.png";
import { analytics } from "../../utils/analytics";
import { AssetPreloader } from "../AssetPreloader";
import { createClient } from "../../utils/supabase/client";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

interface LoginPageProps {
  onLogin: () => void;
  onBackToWebsite: () => void;
}

export function LoginPage({ onLogin, onBackToWebsite }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Track login attempt
    analytics.track({ type: 'login_attempted', email });
    
    // Restricted login - only specific credentials
    const DEMO_EMAIL = "demo@recoverlution.com";
    const DEMO_PASSWORD = "recoverlution2025";
    
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      try {
        console.log('[LoginPage] Attempting demo user sign in...');
        const supabase = createClient();
        
        // Try to sign in directly with Supabase
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });

        if (signInError) {
          console.error('[LoginPage] Supabase sign in error:', signInError);
          
          // If user doesn't exist, show helpful message
          if (signInError.message.includes('Invalid login credentials') || 
              signInError.message.includes('Email not confirmed')) {
            setError('Demo user not set up yet. Please contact support or check setup instructions.');
          } else {
            setError(`Authentication error: ${signInError.message}`);
          }
          
          analytics.track({ type: 'login_failed', email, error: signInError.message });
          setIsLoading(false);
          return;
        }

        console.log('[LoginPage] Supabase sign in successful:', data);
        
        // Track successful login
        analytics.track({ type: 'login_succeeded', email });
        analytics.identify(email, { email, user_type: 'demo' });
        analytics.conversion('login', 1);
        
        onLogin();
      } catch (err) {
        console.error('[LoginPage] Login error:', err);
        setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        analytics.track({ type: 'login_failed', email, error: String(err) });
        setIsLoading(false);
      }
    } else if (!email || !password) {
      setError("Please enter your credentials");
      analytics.track({ type: 'login_failed', email, error: 'Empty credentials' });
      setIsLoading(false);
    } else {
      const errorMsg = "Invalid credentials. Please contact us for demo access.";
      setError(errorMsg);
      analytics.track({ type: 'login_failed', email, error: errorMsg });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Preload Critical Assets - Dashboard tiles + page headers */}
      <AssetPreloader 
        onComplete={() => setAssetsPreloaded(true)}
        debug={false} // Set to true to see preload progress in console
      />
      
      {/* Top Nav - InfiniteK Glass */}
      <nav 
        className="bg-white/90 backdrop-blur-[40px] backdrop-saturate-[180%] border-b border-gray-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset]" 
        style={{ height: '72px', minHeight: '72px' }}
      >
        <div className="h-full px-6 md:px-12 flex items-center justify-between">
          <button 
            onClick={onBackToWebsite} 
            className="flex items-center transition-opacity hover:opacity-70"
          >
            <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          </button>
          <button
            onClick={onBackToWebsite}
            className="text-gray-500 hover:text-[#3E2BB8] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Back to Website
          </button>
        </div>
      </nav>

      {/* Login Content - Apple-level spacing and hierarchy */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          
          {/* Branding - Minimal and centered */}
          <div className="text-center mb-12">
            <h1 
              className="text-[#1A1A1A] mb-2"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: '2rem',
                letterSpacing: '-0.025em'
              }}
            >
              Sign in to Recoverlution
            </h1>
            <p 
              className="text-gray-500"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem' }}
            >
              Access your recovery platform
            </p>
          </div>

          {/* Login Card - InfiniteK Glass System */}
          <div 
            className="bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-[20px] border border-[#3E2BB8]/10 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.5)_inset] p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field - Apple Input Style */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-[#1A1A1A] mb-2.5"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="demo@recoverlution.com"
                  className="w-full px-4 py-3.5 bg-white/50 border border-gray-200/60 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#5739FB]/40 focus:border-[#5739FB]/40 transition-all placeholder:text-gray-400"
                  style={{ fontFamily: 'var(--font-sans)' }}
                  disabled={isLoading}
                />
              </div>

              {/* Password Field - Apple Input Style */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-[#1A1A1A] mb-2.5"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 bg-white/50 border border-gray-200/60 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#5739FB]/40 focus:border-[#5739FB]/40 transition-all placeholder:text-gray-400"
                  style={{ fontFamily: 'var(--font-sans)' }}
                  disabled={isLoading}
                />
              </div>

              {/* Error Message - Subtle and clear */}
              {error && (
                <div 
                  className="px-4 py-3 bg-red-50/50 border border-red-200/40 rounded-[12px] text-red-700"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
                >
                  {error}
                </div>
              )}

              {/* Submit Button - Premium glass button with preload indicator */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-[12px] shadow-[0_2px_12px_rgba(62,43,184,0.25)] hover:shadow-[0_4px_20px_rgba(62,43,184,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {/* Subtle preload ready indicator */}
                {assetsPreloaded && !isLoading && (
                  <div 
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"
                    title="Assets preloaded - instant login experience!"
                  />
                )}
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

            </form>

            {/* Demo Credentials - Subtle divider */}
            <div className="mt-8 pt-8 border-t border-gray-200/40">
              <div className="flex items-center justify-center gap-2 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3E2BB8]/5 rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#3E2BB8] rounded-full" />
                  <span 
                    className="text-[#3E2BB8]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.02em' }}
                  >
                    DEMO ACCESS
                  </span>
                </div>
              </div>
              <p 
                className="text-gray-500 text-center mt-3 leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
              >
                Contact us to receive login credentials
              </p>
            </div>
          </div>

          {/* Footer Note - Minimal */}
          <p 
            className="text-center text-gray-400 mt-8"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
          >
            Demonstration environment for evaluation purposes
          </p>

        </div>
      </div>
    </div>
  );
}
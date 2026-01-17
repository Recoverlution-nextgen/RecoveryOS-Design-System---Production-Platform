/**
 * MARKETING FOOTER - MASTER COMPONENT
 * 
 * Universal footer for all marketing pages (Homepage, Platform, Science, Story, Pricing, Demo)
 * Features: Consistent margins matching page content, legal links, copyright
 * 
 * Created: October 28, 2025
 */

interface MarketingFooterProps {
  onNavigate?: (page: string) => void;
}

export function MarketingFooter({ onNavigate }: MarketingFooterProps) {
  return (
    <footer 
      className="bg-white border-t"
      style={{
        borderColor: 'rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Legal Links - Left */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate?.('privacy')}
              className="text-gray-500 hover:text-[#1a1a1a] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Privacy
            </button>
            <button 
              onClick={() => onNavigate?.('terms')}
              className="text-gray-500 hover:text-[#1a1a1a] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Terms
            </button>
            <button 
              onClick={() => onNavigate?.('cookies')}
              className="text-gray-500 hover:text-[#1a1a1a] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Cookies
            </button>
            <button 
              onClick={() => onNavigate?.('therapy')}
              className="text-gray-500 hover:text-[#1a1a1a] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Therapy
            </button>
            <span className="text-gray-300">|</span>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'investors';
              }}
              className="text-gray-500 hover:text-[#1a1a1a] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Investors
            </a>
          </div>

          {/* Copyright - Right */}
          <p 
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
          >
            © 2025 Recoverlution
          </p>
        </div>
      </div>
    </footer>
  );
}

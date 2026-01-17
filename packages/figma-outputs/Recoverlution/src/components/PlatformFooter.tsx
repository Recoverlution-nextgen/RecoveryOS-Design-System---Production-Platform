import { type PageType } from "../utils/router";

interface PlatformFooterProps {
  onNavigate?: (page: PageType) => void;
}

export function PlatformFooter({ onNavigate }: PlatformFooterProps) {

  return (
    <footer 
      className="backdrop-blur-[40px] backdrop-saturate-[180%] mt-auto" 
      style={{ 
        height: '52px', 
        minHeight: '52px',
        background: 'linear-gradient(180deg, #FDFBFF 0%, #FEFCFF 100%)',
        borderTop: '1px solid rgba(87, 57, 251, 0.08)',
        boxShadow: '0 -1px 3px rgba(62, 43, 184, 0.04), 0 -1px 2px rgba(0, 0, 0, 0.02)'
      }}
    >
      <div className="px-6 md:px-12 flex items-center justify-between h-full">
        {/* Left Side - Utility Links */}
        <div className="flex items-center gap-6">
          {/* Legal Links */}
          <button 
            onClick={() => onNavigate?.('marketing-privacy')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate?.('marketing-terms')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
          >
            Terms
          </button>
          <button 
            onClick={() => onNavigate?.('marketing-cookies')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
          >
            Cookies
          </button>

          {/* Divider */}
          <div className="h-3 w-px bg-gray-300" />

          {/* Investors Link */}
          <button 
            onClick={() => onNavigate?.('investors')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap font-medium"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
            title="RecoveryOS Investor Presentation"
          >
            Investors
          </button>

          {/* Divider */}
          <div className="h-3 w-px bg-gray-300" />

          {/* Command Center 2 - Full Control Plane */}
          <button 
            onClick={() => onNavigate?.('cc2')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap font-medium"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
            title="Command Center 2 - Registry Studio · Event Explorer · Proof Ledger · Simulation Lab"
          >
            CC2
          </button>

          {/* V3 Marketing Site - ATLAS Ecosystem */}
          <button 
            onClick={() => onNavigate?.('v3')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap font-medium"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
            title="V3 Marketing Site - ATLAS Ecosystem · 4 Audiences · Homepage"
          >
            V3
          </button>

          {/* Command Center (Consolidated) */}
          <button 
            onClick={() => onNavigate?.('command-center-execution')}
            className="text-gray-400 hover:text-[#5739FB] transition-colors whitespace-nowrap font-medium"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
            title="Command Center - Player · Configuration · Schema · Data"
          >
            Command Center
          </button>
        </div>

        {/* Right Side - Copyright */}
        <p 
          className="text-gray-400 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '11px' }}
        >
          © 2025 Recoverlution
        </p>
      </div>
    </footer>
  );
}
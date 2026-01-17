interface RecoverlutionFooterProps {
  onNavigateToWebsite?: () => void;
  onNavigate?: (page: string) => void;
}

export function RecoverlutionFooter({ onNavigateToWebsite, onNavigate }: RecoverlutionFooterProps = {}) {
  return (
    <footer className="bg-white border-t border-gray-200/40 h-14">
      <div className="px-6 md:px-12 flex items-center justify-between h-full">
        {/* Legal Links - Left */}
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto">
          <button 
            onClick={() => onNavigate?.("privacy")}
            className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate?.("terms")}
            className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Terms
          </button>
          <button 
            onClick={() => onNavigate?.("cookies")}
            className="text-gray-500 hover:text-[#3E2BB8] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Cookies
          </button>
          <span className="text-gray-300">·</span>
          <button 
            onClick={() => onNavigate?.("home-old")}
            className="text-gray-400 hover:text-[#3E2BB8] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            HP OLD
          </button>
          <button 
            onClick={() => onNavigate?.("command-center")}
            className="text-gray-400 hover:text-[#3E2BB8] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            CC1
          </button>
          <button 
            onClick={() => onNavigate?.("cc2")}
            className="text-gray-400 hover:text-[#5739FB] transition-colors text-xs whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            CC2
          </button>
        </div>

        {/* Copyright - Right */}
        <p 
          className="text-gray-400 text-xs whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          © 2025 Recoverlution
        </p>
      </div>
    </footer>
  );
}
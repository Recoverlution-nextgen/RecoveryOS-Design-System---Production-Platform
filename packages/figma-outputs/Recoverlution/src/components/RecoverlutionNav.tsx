import { useState } from "react";
import { Settings, Menu, X } from "lucide-react";
import recoverlutionLogo from "figma:asset/7da866ea6ef2018dfd4656f74ef1f42cdc972b51.png";

type PageType = "Dashboard" | "Journey" | "Navicues" | "Wellbeing" | "State" | "Toolkit" | "Navigate" | "Momentum" | "Profile";

interface RecoverlutionNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenLuma: () => void;
}

const navItems: PageType[] = ["Journey", "Navicues", "Wellbeing", "State", "Toolkit", "Navigate", "Momentum"];

export function RecoverlutionNav({ currentPage, onNavigate, onOpenLuma }: RecoverlutionNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* infiniteK NAV: Premium warm purple tint + enhanced glass */}
      <nav 
        className="relative z-50 w-full" 
        style={{ 
          height: '68px', 
          minHeight: '68px',
          background: 'linear-gradient(180deg, rgba(254, 252, 255, 0.98) 0%, rgba(253, 251, 255, 0.96) 100%)',
          borderBottom: '1px solid rgba(87, 57, 251, 0.10)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 2px 8px rgba(62, 43, 184, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="h-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate("Dashboard")} 
            className="flex items-center transition-opacity duration-300 hover:opacity-75 flex-shrink-0"
          >
            <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
          </button>

          {/* Desktop Nav Items - Absolutely centered */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                data-tour={item.toLowerCase().replace(' ', '-')}
                className={`px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
                  item === currentPage
                    ? "text-[#3E2BB8]"
                    : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                }`}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side - Premium elements */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* LUMA Button - Premium square glass - Tighter on mobile */}
            <button 
              onClick={onOpenLuma}
              data-tour="luma"
              className="relative px-4 sm:px-7 py-2.5 bg-[#3E2BB8]/6 backdrop-blur-[40px] backdrop-saturate-[200%] text-[#3E2BB8] border border-[#3E2BB8]/18 hover:bg-[#3E2BB8]/10 hover:border-[#3E2BB8]/28 transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] text-[10px] uppercase tracking-[0.14em] overflow-hidden group" 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                borderRadius: '0px',
                boxShadow: '0 3px 10px rgba(62, 43, 184, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
              }}
            >
              {/* Enhanced shimmer effect on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-[#3E2BB8]/18 to-transparent pointer-events-none" />
              <span className="relative flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3E2BB8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3E2BB8]"></span>
                </span>
                LUMA
              </span>
            </button>
            
            {/* Settings - Premium square glass icon button - Hidden on mobile */}
            <button 
              onClick={() => handleNavClick("Profile")}
              data-tour="settings"
              className={`hidden lg:flex w-10 h-10 items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                currentPage === "Profile"
                  ? "bg-[#3E2BB8]/12 backdrop-blur-[40px] backdrop-saturate-[200%] text-[#3E2BB8] border border-[#3E2BB8]/24"
                  : "bg-[#3E2BB8]/4 backdrop-blur-[40px] backdrop-saturate-[200%] text-[#1A1A1A]/60 border border-[#3E2BB8]/12 hover:bg-[#3E2BB8]/8 hover:border-[#3E2BB8]/20 hover:text-[#3E2BB8]"
              }`}
              style={{ 
                borderRadius: '0px',
                boxShadow: '0 2px 8px rgba(62, 43, 184, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle - Square glass */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#3E2BB8]/4 backdrop-blur-[40px] backdrop-saturate-[200%] border border-[#3E2BB8]/12 text-[#1A1A1A]/70 hover:bg-[#3E2BB8]/8 hover:border-[#3E2BB8]/20 transition-all duration-300"
              style={{ 
                borderRadius: '0px',
                boxShadow: '0 2px 8px rgba(62, 43, 184, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Premium glass panel */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed top-[68px] left-0 right-0 backdrop-blur-xl border-b z-40"
          style={{
            background: 'linear-gradient(180deg, rgba(254, 252, 255, 0.98) 0%, rgba(253, 251, 255, 0.96) 100%)',
            borderBottom: '1px solid rgba(87, 57, 251, 0.10)',
            boxShadow: '0 8px 24px rgba(62, 43, 184, 0.12)'
          }}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 ${
                  item === currentPage
                    ? "bg-[#3E2BB8]/8 text-[#3E2BB8]"
                    : "text-[#1A1A1A]/60 hover:bg-[#3E2BB8]/4 hover:text-[#1A1A1A]"
                }`}
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 700,
                  borderRadius: '0px'
                }}
              >
                {item}
              </button>
            ))}
            
            {/* Settings - Mobile only */}
            <button
              onClick={() => handleNavClick("Profile")}
              className={`w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 flex items-center gap-3 ${
                currentPage === "Profile"
                  ? "bg-[#3E2BB8]/8 text-[#3E2BB8]"
                  : "text-[#1A1A1A]/60 hover:bg-[#3E2BB8]/4 hover:text-[#1A1A1A]"
              }`}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                borderRadius: '0px'
              }}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
}
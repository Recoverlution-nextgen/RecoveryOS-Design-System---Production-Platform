import { UserCircle2, Sparkles } from "lucide-react";

type PageType = "Pathway" | "Echo Links" | "Wellbeing" | "Inner Compass" | "Toolkit" | "Navigate" | "Momentum";

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems: PageType[] = [
    "Pathway",
    "Echo Links",
    "Wellbeing",
    "Inner Compass",
    "Toolkit",
    "Navigate",
    "Momentum",
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/80 px-8 h-14 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#6B9FA6] to-[#2C4F7C] rounded flex items-center justify-center">
            <span className="text-white text-xs">RCA</span>
          </div>
          <div>
            <div className="text-sm text-gray-900 leading-tight">Recovery Coach</div>
            <div className="text-[10px] text-gray-500 leading-tight tracking-wide">HEALTHCARE</div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                item === currentPage
                  ? "text-[#2C4F7C] bg-[#6B9FA6]/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button className="bg-gradient-to-r from-[#6B9FA6] to-[#5A8A91] text-white px-5 py-1.5 rounded-md hover:shadow-md transition-all flex items-center gap-2 text-sm">
          <Sparkles className="w-3.5 h-3.5" />
          LUMA
        </button>
        <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B9FA6] to-[#2C4F7C] flex items-center justify-center text-white hover:shadow-md transition-all">
          <UserCircle2 className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

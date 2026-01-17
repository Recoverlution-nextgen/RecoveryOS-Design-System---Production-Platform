export function V3Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]" />
              <span className="text-xl font-bold text-white">Recoverlution</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              The continuity infrastructure. Built for the 167 hours where life happens.
            </p>
          </div>

          {/* For */}
          <div>
            <h3 className="text-white font-semibold mb-4">For</h3>
            <ul className="space-y-2">
              <li>
                <a href="#/v3-organisations" className="text-white/60 hover:text-white transition-colors text-sm">
                  Organisations
                </a>
              </li>
              <li>
                <a href="#/v3-professionals" className="text-white/60 hover:text-white transition-colors text-sm">
                  Professionals
                </a>
              </li>
              <li>
                <a href="#/v3-individuals" className="text-white/60 hover:text-white transition-colors text-sm">
                  Individuals
                </a>
              </li>
              <li>
                <a href="#/v3-companions" className="text-white/60 hover:text-white transition-colors text-sm">
                  Companions
                </a>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-white font-semibold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <a href="/platform" className="text-white/60 hover:text-white transition-colors text-sm">
                  Platform
                </a>
              </li>
              <li>
                <a href="/science" className="text-white/60 hover:text-white transition-colors text-sm">
                  Science
                </a>
              </li>
              <li>
                <a href="/story" className="text-white/60 hover:text-white transition-colors text-sm">
                  Story
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-white/60 hover:text-white transition-colors text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-white/60 hover:text-white transition-colors text-sm">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#/investors" className="text-white/60 hover:text-white transition-colors text-sm">
                  Investors
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            © {currentYear} Recoverlution. The scaffold for oneness.
          </p>
        </div>
      </div>
    </footer>
  );
}
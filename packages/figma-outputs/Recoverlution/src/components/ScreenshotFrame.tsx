interface BrowserWindowProps {
  imageSrc: string;
  alt: string;
  showAddressBar?: boolean;
  overlayEffect?: boolean;
  overlayIntensity?: 'subtle' | 'medium' | 'strong';
}

export function BrowserWindow({ imageSrc, alt, showAddressBar = true, overlayEffect = false, overlayIntensity = 'subtle' }: BrowserWindowProps) {
  // Define overlay gradient intensities
  const overlayGradients = {
    subtle: 'from-white/5 via-transparent to-black/10',     // Original: 5% → 0% → 10%
    medium: 'from-white/10 via-transparent to-black/20',    // More visible: 10% → 0% → 20%
    strong: 'from-white/15 via-transparent to-black/30',    // Pronounced: 15% → 0% → 30%
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3E2BB8]/10 bg-white">
      {/* Browser Chrome */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          {showAddressBar && (
            <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200">
              app.recoverlution.com
            </div>
          )}
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative bg-white">
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover object-top" />
        {/* Optional overlay effect - screen glare/vignette with configurable intensity */}
        {overlayEffect && (
          <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradients[overlayIntensity]} pointer-events-none`} />
        )}
      </div>
    </div>
  );
}

interface CleanScreenshotProps {
  imageSrc: string;
  alt: string;
  aspectRatio?: string;
  overlayEffect?: boolean;
  overlayIntensity?: 'subtle' | 'medium' | 'strong';
}

export function CleanScreenshot({ imageSrc, alt, aspectRatio = "4/3", overlayEffect = false, overlayIntensity = 'subtle' }: CleanScreenshotProps) {
  const overlayGradients = {
    subtle: 'from-white/5 via-transparent to-black/10',
    medium: 'from-white/10 via-transparent to-black/20',
    strong: 'from-white/15 via-transparent to-black/30',
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3E2BB8]/10 bg-white">
      <div className="relative" style={{ aspectRatio }}>
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover object-top" />
        {/* Optional overlay effect - screen glare/vignette with configurable intensity */}
        {overlayEffect && (
          <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradients[overlayIntensity]} pointer-events-none`} />
        )}
      </div>
    </div>
  );
}

interface MobileDeviceProps {
  imageSrc: string;
  alt: string;
  overlayEffect?: boolean;
  overlayIntensity?: 'subtle' | 'medium' | 'strong';
}

export function MobileDevice({ imageSrc, alt, overlayEffect = false, overlayIntensity = 'subtle' }: MobileDeviceProps) {
  const overlayGradients = {
    subtle: 'from-white/10 via-transparent to-black/15',    // Mobile default (slightly more visible)
    medium: 'from-white/15 via-transparent to-black/25',
    strong: 'from-white/20 via-transparent to-black/35',
  };

  return (
    <div className="relative mx-auto max-w-[280px]">
      {/* iPhone Frame */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-900 bg-gray-900">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
        {/* Screenshot */}
        <div className="relative aspect-[9/19.5]">
          <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
          {/* Optional overlay effect - screen glare with configurable intensity */}
          {overlayEffect && (
            <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradients[overlayIntensity]} pointer-events-none`} />
          )}
        </div>
      </div>
    </div>
  );
}

interface DesktopMobileComboProps {
  desktopSrc: string;
  mobileSrc: string;
  desktopAlt: string;
  mobileAlt: string;
  overlayEffect?: boolean;
  overlayIntensity?: 'subtle' | 'medium' | 'strong';
}

export function DesktopMobileCombo({ desktopSrc, mobileSrc, desktopAlt, mobileAlt, overlayEffect = false, overlayIntensity = 'subtle' }: DesktopMobileComboProps) {
  const desktopOverlayGradients = {
    subtle: 'from-white/5 via-transparent to-black/10',
    medium: 'from-white/10 via-transparent to-black/20',
    strong: 'from-white/15 via-transparent to-black/30',
  };

  const mobileOverlayGradients = {
    subtle: 'from-white/10 via-transparent to-black/15',
    medium: 'from-white/15 via-transparent to-black/25',
    strong: 'from-white/20 via-transparent to-black/35',
  };

  return (
    <div className="relative">
      {/* Desktop Screenshot */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3E2BB8]/10 bg-white">
        <div className="relative aspect-[16/10]">
          <img src={desktopSrc} alt={desktopAlt} className="w-full h-full object-cover object-top" />
          {/* Optional overlay effect - screen glare/vignette with configurable intensity */}
          {overlayEffect && (
            <div className={`absolute inset-0 bg-gradient-to-br ${desktopOverlayGradients[overlayIntensity]} pointer-events-none`} />
          )}
        </div>
      </div>

      {/* Floating Mobile Preview */}
      <div className="absolute -bottom-8 -right-8 w-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
        <div className="relative aspect-[9/16]">
          <img src={mobileSrc} alt={mobileAlt} className="w-full h-full object-cover" />
          {/* Optional overlay effect - screen glare with configurable intensity */}
          {overlayEffect && (
            <div className={`absolute inset-0 bg-gradient-to-br ${mobileOverlayGradients[overlayIntensity]} pointer-events-none`} />
          )}
        </div>
      </div>
    </div>
  );
}

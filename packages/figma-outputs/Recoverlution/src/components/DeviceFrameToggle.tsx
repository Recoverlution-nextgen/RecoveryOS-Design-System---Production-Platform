/**
 * Device Frame Toggle
 * Shows mobile/tablet view during desktop demos
 * 
 * Allows presenter to toggle between:
 * - Full desktop view
 * - iPhone frame (375×812)
 * - iPad frame (768×1024)
 */

import { useState } from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { Button } from './ui/button';

interface DeviceFrameToggleProps {
  children: React.ReactNode;
}

type DeviceMode = 'desktop' | 'iphone' | 'ipad';

export function DeviceFrameToggle({ children }: DeviceFrameToggleProps) {
  const [mode, setMode] = useState<DeviceMode>('desktop');
  
  // Device dimensions
  const devices = {
    iphone: { width: 375, height: 812 },
    ipad: { width: 768, height: 1024 },
  };
  
  if (mode === 'desktop') {
    return (
      <>
        {children}
        <DeviceControls mode={mode} onModeChange={setMode} />
      </>
    );
  }
  
  // Show device frame
  const device = mode === 'iphone' ? devices.iphone : devices.ipad;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      {/* Device Frame */}
      <div
        className="bg-black rounded-[3rem] p-3 shadow-2xl relative"
        style={{
          width: device.width + 24,
          height: device.height + 24,
        }}
      >
        {/* Notch (iPhone only) */}
        {mode === 'iphone' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />
        )}
        
        {/* Screen */}
        <div
          className="bg-white rounded-[2.5rem] overflow-hidden relative"
          style={{
            width: device.width,
            height: device.height,
          }}
        >
          {/* Scrollable content */}
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
        </div>
        
        {/* Home indicator (iPhone only) */}
        {mode === 'iphone' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
        )}
      </div>
      
      <DeviceControls mode={mode} onModeChange={setMode} />
    </div>
  );
}

interface DeviceControlsProps {
  mode: DeviceMode;
  onModeChange: (mode: DeviceMode) => void;
}

function DeviceControls({ mode, onModeChange }: DeviceControlsProps) {
  return (
    <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg p-2 flex gap-1 z-50">
      <Button
        onClick={() => onModeChange('desktop')}
        size="sm"
        variant={mode === 'desktop' ? 'default' : 'ghost'}
        className="rounded-full w-10 h-10 p-0"
        title="Desktop view"
      >
        <Monitor className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={() => onModeChange('iphone')}
        size="sm"
        variant={mode === 'iphone' ? 'default' : 'ghost'}
        className="rounded-full w-10 h-10 p-0"
        title="iPhone view"
      >
        <Smartphone className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={() => onModeChange('ipad')}
        size="sm"
        variant={mode === 'ipad' ? 'default' : 'ghost'}
        className="rounded-full w-10 h-10 p-0"
        title="iPad view"
      >
        <Tablet className="w-4 h-4" />
      </Button>
    </div>
  );
}

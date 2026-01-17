/**
 * DateRangeSelector - Site-Wide Date Range Component
 * 
 * ON-BRAND DESIGN:
 * - Glass cards with brand purple
 * - Minimal, Apple-clean
 * - No calendar icon clutter
 * - Smooth transitions
 * 
 * USAGE:
 * - Momentum page
 * - Analytics dashboards
 * - Any time-based data views
 * 
 * DNA: Minimal, clean, on-brand
 */

import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';

export type DateRangePreset = 'week' | 'month' | 'all' | 'custom';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeSelectorProps {
  value?: DateRangePreset;
  customRange?: DateRange;
  onChange: (preset: DateRangePreset, customRange?: DateRange) => void;
  className?: string;
}

export function DateRangeSelector({ 
  value = 'week', 
  customRange,
  onChange,
  className = '' 
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>({
    from: customRange?.from,
    to: customRange?.to
  });

  const presets: { value: DateRangePreset; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'all', label: 'All Time' }
  ];

  const handlePresetClick = (preset: DateRangePreset) => {
    if (preset === 'custom') {
      setIsOpen(true);
    } else {
      onChange(preset);
    }
  };

  const handleCustomRangeSelect = () => {
    if (tempRange.from && tempRange.to) {
      onChange('custom', tempRange);
      setIsOpen(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Preset Buttons - Apple Clean */}
      <div className="inline-flex items-center bg-white/90 backdrop-blur-xl rounded-xl border border-[#3E2BB8]/10 p-1 shadow-sm">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetClick(preset.value)}
            className={`
              px-4 py-1.5 rounded-lg text-sm transition-all duration-200
              ${value === preset.value
                ? 'bg-[#3E2BB8] text-white shadow-sm'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#3E2BB8]/5'
              }
            `}
            style={{ fontWeight: value === preset.value ? 600 : 500 }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Calendar Picker - Hidden until needed */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm
              bg-white/90 backdrop-blur-xl border transition-all duration-200
              ${value === 'custom'
                ? 'border-[#3E2BB8]/30 text-[#3E2BB8] shadow-sm'
                : 'border-[#3E2BB8]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#3E2BB8]/20'
              }
            `}
            style={{ fontWeight: value === 'custom' ? 600 : 500 }}
          >
            <CalendarIcon className="w-4 h-4" />
            {value === 'custom' && customRange?.from && customRange?.to ? (
              <span className="text-xs">
                {format(customRange.from, 'MMM d')} – {format(customRange.to, 'MMM d')}
              </span>
            ) : (
              <span className="text-xs">Custom</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white/95 backdrop-blur-xl border-[#3E2BB8]/10 shadow-xl" 
          align="end"
        >
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="text-xs text-[#1A1A1A]/60 mb-3" style={{ fontWeight: 600 }}>
                Select date range.
              </div>
              
              {/* From Date */}
              <div className="space-y-2">
                <label className="text-xs text-[#1A1A1A]/60" style={{ fontWeight: 500 }}>
                  From
                </label>
                <Calendar
                  mode="single"
                  selected={tempRange.from}
                  onSelect={(date) => setTempRange(prev => ({ ...prev, from: date }))}
                  disabled={(date) => date > new Date() || (tempRange.to ? date > tempRange.to : false)}
                  initialFocus
                />
              </div>

              {/* To Date */}
              <div className="space-y-2">
                <label className="text-xs text-[#1A1A1A]/60" style={{ fontWeight: 500 }}>
                  To
                </label>
                <Calendar
                  mode="single"
                  selected={tempRange.to}
                  onSelect={(date) => setTempRange(prev => ({ ...prev, to: date }))}
                  disabled={(date) => date > new Date() || (tempRange.from ? date < tempRange.from : false)}
                />
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleCustomRangeSelect}
              disabled={!tempRange.from || !tempRange.to}
              className={`
                w-full px-4 py-2 rounded-xl text-sm transition-all duration-200
                ${tempRange.from && tempRange.to
                  ? 'bg-[#3E2BB8] text-white shadow-sm hover:bg-[#3E2BB8]/90'
                  : 'bg-[#3E2BB8]/10 text-[#1A1A1A]/40 cursor-not-allowed'
                }
              `}
              style={{ fontWeight: 600 }}
            >
              Apply range
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

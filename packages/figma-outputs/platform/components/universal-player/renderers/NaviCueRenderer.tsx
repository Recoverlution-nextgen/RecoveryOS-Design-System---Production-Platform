/**
 * NaviCue Renderer - Universal Player
 * 
 * Renders NaviCues in the Universal Player
 * Re-uses core NaviCue display logic with simplified interface
 * 
 * COMPLETE: All 15 response types supported
 */

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, Square } from 'lucide-react';

interface NaviCueRendererProps {
  content: any; // NaviCue object
  metadata?: any;
  onInteraction?: (data: any) => void;
}

export function NaviCueRenderer({ content, metadata, onInteraction }: NaviCueRendererProps) {
  const [hasResponded, setHasResponded] = useState(false);

  if (!content) {
    return <div className="text-white text-center">No content available</div>;
  }

  const handleResponse = (response: any) => {
    setHasResponded(true);
    if (onInteraction) {
      onInteraction({ response, navicue_id: content.id });
    }
  };

  return (
    <div>
      {/* Pillar eyebrow */}
      <div className="mb-6 flex items-center gap-3">
        <div 
          className="w-2 h-2"
          style={{ 
            backgroundColor: content.pillar_color || '#5739FB',
            borderRadius: '0px'
          }}
        />
        <div className="text-white/60 text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>
          {content.pillar_name || 'NAVICUE'} {content.theme_name && `· ${content.theme_name}`}
        </div>
      </div>

      {/* Glass card */}
      <div 
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 shadow-2xl"
        style={{ borderRadius: '0px' }}
      >
        {/* Pillar accent */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: content.pillar_color || '#5739FB' }}
        />

        {/* Content */}
        <div className="space-y-8">
          {/* Main text */}
          <p 
            className="text-white leading-relaxed"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)'
            }}
          >
            {content.text_line}
          </p>

          {/* Response interface */}
          {content.response_type && content.response_type !== 'none' && !hasResponded && (
            <ResponseInterface
              cue={content}
              onRespond={handleResponse}
            />
          )}

          {/* Response confirmation */}
          {hasResponded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60 text-center text-sm"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Swipe to continue
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Response interface component
function ResponseInterface({ cue, onRespond }: { cue: any; onRespond: (response: any) => void }) {
  const [sliderValue, setSliderValue] = useState(5);
  const [textValue, setTextValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // NONE - No response needed
  if (cue.response_type === 'none') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/60 text-center text-sm italic"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        Swipe when ready
      </motion.div>
    );
  }

  switch (cue.response_type) {
    case 'tap':
      return (
        <div className="flex flex-wrap gap-3">
          {(cue.response_options?.tap_options || ['Yes', 'No', 'Maybe']).map((option: string, idx: number) => (
            <button
              key={idx}
              onClick={() => onRespond({ type: 'tap', value: option })}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500
              }}
            >
              {option}
            </button>
          ))}
        </div>
      );

    case 'binary':
      return (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onRespond({ type: 'binary', value: 'left' })}
            className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all text-center"
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            {cue.response_options?.binary_left || 'Not yet'}
          </button>
          <button
            onClick={() => onRespond({ type: 'binary', value: 'right' })}
            className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all text-center"
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            {cue.response_options?.binary_right || 'I know this'}
          </button>
        </div>
      );

    case 'slider':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-white/60 text-sm">
            <span>{cue.response_options?.slider_min || 0}</span>
            <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>{sliderValue}</span>
            <span>{cue.response_options?.slider_max || 10}</span>
          </div>
          <input
            type="range"
            min={cue.response_options?.slider_min || 0}
            max={cue.response_options?.slider_max || 10}
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 appearance-none cursor-pointer"
            style={{ borderRadius: '0px' }}
          />
          <button
            onClick={() => onRespond({ type: 'slider', value: sliderValue })}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            Submit
          </button>
        </div>
      );

    case 'scale':
      return (
        <ScaleInput 
          minLabel={cue.response_options?.min_label || 'Low'}
          maxLabel={cue.response_options?.max_label || 'High'}
          min={cue.response_options?.scale_min || 1}
          max={cue.response_options?.scale_max || 10}
          onSubmit={(value) => onRespond({ type: 'scale', value })}
        />
      );

    case 'one_word':
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Type your word..."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-sm"
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            onClick={() => onRespond({ type: 'one_word', value: textValue })}
            disabled={!textValue.trim()}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            Submit
          </button>
        </div>
      );

    case 'breath':
      return (
        <BreathCounter 
          count={cue.response_options?.breath_count || 3}
          onComplete={() => onRespond({ type: 'breath', value: cue.response_options?.breath_count })}
        />
      );

    case 'hold':
      return (
        <HoldTimer
          duration={cue.response_options?.hold_duration || 5}
          onComplete={() => onRespond({ type: 'hold', value: cue.response_options?.hold_duration })}
        />
      );

    case 'witness':
      return (
        <WitnessTimer
          duration={cue.response_options?.witness_duration || 10}
          onComplete={() => onRespond({ type: 'witness', value: cue.response_options?.witness_duration })}
        />
      );

    case 'voice10':
      return (
        <VoiceRecorder
          maxDuration={cue.response_options?.voice_max_duration || 10}
          showWaveform={cue.response_options?.voice_show_waveform !== false}
          onComplete={(audioBlob) => onRespond({ type: 'voice10', value: audioBlob })}
        />
      );

    case 'body_map':
      return (
        <BodyMap
          regions={cue.response_options?.body_regions || ['head', 'chest', 'gut', 'throat', 'limbs']}
          multiSelect={cue.response_options?.body_multi_select !== false}
          selectedRegions={selectedRegions}
          onRegionToggle={(region) => {
            if (cue.response_options?.body_multi_select !== false) {
              setSelectedRegions(prev => 
                prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
              );
            } else {
              setSelectedRegions([region]);
            }
          }}
          onSubmit={() => onRespond({ type: 'body_map', value: selectedRegions })}
        />
      );

    case 'dial':
      return (
        <DialGauge
          minLabel={cue.response_options?.dial_min_label || 'Low'}
          maxLabel={cue.response_options?.dial_max_label || 'High'}
          colorStart={cue.response_options?.dial_color_start || '#10B981'}
          colorEnd={cue.response_options?.dial_color_end || '#EF4444'}
          onSubmit={(value) => onRespond({ type: 'dial', value })}
        />
      );

    case 'timeline':
      return (
        <TimelineSelector
          labels={cue.response_options?.timeline_labels || ['Minutes', 'Hours', 'Days', 'Weeks']}
          minLabel={cue.response_options?.timeline_min_label || 'Minutes'}
          maxLabel={cue.response_options?.timeline_max_label || 'Weeks'}
          onSubmit={(value) => onRespond({ type: 'timeline', value })}
        />
      );

    case 'paradox':
      return (
        <ParadoxHolder
          statement1={cue.response_options?.paradox_statement_1 || 'Truth 1'}
          statement2={cue.response_options?.paradox_statement_2 || 'Truth 2'}
          holdDuration={cue.response_options?.paradox_hold_duration || 10}
          onComplete={() => onRespond({ type: 'paradox', value: 'held' })}
        />
      );

    case 'multi_select':
      return (
        <MultiSelect
          options={cue.response_options?.multi_options || ['Option 1', 'Option 2', 'Option 3']}
          selectedOptions={selectedOptions}
          onToggle={(option) => {
            setSelectedOptions(prev => 
              prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
            );
          }}
          onSubmit={() => onRespond({ type: 'multi_select', value: selectedOptions })}
        />
      );

    default:
      return null;
  }
}

// Scale input component
function ScaleInput({ minLabel, maxLabel, min, max, onSubmit }: { minLabel: string; maxLabel: string; min: number; max: number; onSubmit: (value: number) => void }) {
  const [value, setValue] = useState(min);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-white/60 text-sm">
        <span>{minLabel}</span>
        <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>{value}</span>
        <span>{maxLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-full h-2 bg-white/20 appearance-none cursor-pointer"
        style={{ borderRadius: '0px' }}
      />
      <button
        onClick={() => onSubmit(value)}
        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500
        }}
      >
        Submit
      </button>
    </div>
  );
}

// Breath counter component
function BreathCounter({ count, onComplete }: { count: number; onComplete: () => void }) {
  const [currentBreath, setCurrentBreath] = useState(0);
  const [isInhaling, setIsInhaling] = useState(true);

  const handleBreath = () => {
    if (!isInhaling) {
      const nextCount = currentBreath + 1;
      setCurrentBreath(nextCount);
      
      if (nextCount >= count) {
        onComplete();
      } else {
        setIsInhaling(true);
      }
    } else {
      setIsInhaling(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-white/60 text-sm">
        Breath {currentBreath + 1} of {count}
      </div>
      <motion.button
        onClick={handleBreath}
        animate={{ scale: isInhaling ? 1.1 : 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-32 h-32 mx-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all flex items-center justify-center"
        style={{ borderRadius: '0px' }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          {isInhaling ? 'Inhale' : 'Exhale'}
        </span>
      </motion.button>
    </div>
  );
}

// Hold timer component
function HoldTimer({ duration, onComplete }: { duration: number; onComplete: () => void }) {
  const [isHolding, setIsHolding] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const startHold = () => {
    setIsHolding(true);
    let remaining = duration;
    
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
        setIsHolding(false);
        onComplete();
      }
    }, 1000);
  };

  return (
    <div className="text-center space-y-6">
      {!isHolding ? (
        <button
          onClick={startHold}
          className="w-32 h-32 mx-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all flex items-center justify-center"
          style={{ borderRadius: '0px' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Hold
          </span>
        </button>
      ) : (
        <div className="w-32 h-32 mx-auto bg-white/10 text-white backdrop-blur-sm flex items-center justify-center" style={{ borderRadius: '0px' }}>
          <span className="text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {timeLeft}
          </span>
        </div>
      )}
      <div className="text-white/60 text-sm">
        Hold for {duration} seconds
      </div>
    </div>
  );
}

// Witness timer component
function WitnessTimer({ duration, onComplete }: { duration: number; onComplete: () => void }) {
  const [isWitnessing, setIsWitnessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const startWitness = () => {
    setIsWitnessing(true);
    let remaining = duration;
    
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
        setIsWitnessing(false);
        onComplete();
      }
    }, 1000);
  };

  return (
    <div className="text-center space-y-6">
      {!isWitnessing ? (
        <button
          onClick={startWitness}
          className="w-32 h-32 mx-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all flex items-center justify-center"
          style={{ borderRadius: '0px' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Witness
          </span>
        </button>
      ) : (
        <div className="w-32 h-32 mx-auto bg-white/10 text-white backdrop-blur-sm flex items-center justify-center" style={{ borderRadius: '0px' }}>
          <span className="text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {timeLeft}
          </span>
        </div>
      )}
      <div className="text-white/60 text-sm">
        Witness for {duration} seconds
      </div>
    </div>
  );
}

// Voice recorder component
function VoiceRecorder({ maxDuration, showWaveform, onComplete }: { maxDuration: number; showWaveform: boolean; onComplete: (audioBlob: Blob) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setIsRecording(true);
    let remaining = maxDuration;
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      setAudioUrl(URL.createObjectURL(audioBlob));
      onComplete(audioBlob);
    };

    mediaRecorder.start();

    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
        mediaRecorder.stop();
        setIsRecording(false);
      }
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="w-32 h-32 mx-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all flex items-center justify-center"
          style={{ borderRadius: '0px' }}
        >
          <Mic className="w-10 h-10" />
        </button>
      ) : (
        <div className="w-32 h-32 mx-auto bg-white/10 text-white backdrop-blur-sm flex items-center justify-center" style={{ borderRadius: '0px' }}>
          <span className="text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {timeLeft}
          </span>
        </div>
      )}
      <div className="text-white/60 text-sm">
        Record for {maxDuration} seconds
      </div>
      {audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

// Body map component
function BodyMap({ regions, multiSelect, selectedRegions, onRegionToggle, onSubmit }: { regions: string[]; multiSelect: boolean; selectedRegions: string[]; onRegionToggle: (region: string) => void; onSubmit: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {regions.map((region: string) => (
          <button
            key={region}
            onClick={() => onRegionToggle(region)}
            className={`px-6 py-3 ${selectedRegions.includes(region) ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20 text-white backdrop-blur-sm transition-all`}
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            {region}
          </button>
        ))}
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500
        }}
      >
        Submit
      </button>
    </div>
  );
}

// Dial gauge component
function DialGauge({ minLabel, maxLabel, colorStart, colorEnd, onSubmit }: { minLabel: string; maxLabel: string; colorStart: string; colorEnd: string; onSubmit: (value: number) => void }) {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-white/60 text-sm">
        <span>{minLabel}</span>
        <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>{value}</span>
        <span>{maxLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-full h-2 bg-white/20 appearance-none cursor-pointer"
        style={{ borderRadius: '0px' }}
      />
      <button
        onClick={() => onSubmit(value)}
        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500
        }}
      >
        Submit
      </button>
    </div>
  );
}

// Timeline selector component
function TimelineSelector({ labels, minLabel, maxLabel, onSubmit }: { labels: string[]; minLabel: string; maxLabel: string; onSubmit: (value: string) => void }) {
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-white/60 text-sm">
        <span>{minLabel}</span>
        <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>{selectedLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <select
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-sm"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {labels.map((label: string) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <button
        onClick={() => onSubmit(selectedLabel)}
        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500
        }}
      >
        Submit
      </button>
    </div>
  );
}

// Paradox holder component
function ParadoxHolder({ statement1, statement2, holdDuration, onComplete }: { statement1: string; statement2: string; holdDuration: number; onComplete: () => void }) {
  const [isHolding, setIsHolding] = useState(false);
  const [timeLeft, setTimeLeft] = useState(holdDuration);

  const startHold = () => {
    setIsHolding(true);
    let remaining = holdDuration;
    
    const interval = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
        setIsHolding(false);
        onComplete();
      }
    }, 1000);
  };

  return (
    <div className="text-center space-y-6">
      {!isHolding ? (
        <button
          onClick={startHold}
          className="w-32 h-32 mx-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all flex items-center justify-center"
          style={{ borderRadius: '0px' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Hold
          </span>
        </button>
      ) : (
        <div className="w-32 h-32 mx-auto bg-white/10 text-white backdrop-blur-sm flex items-center justify-center" style={{ borderRadius: '0px' }}>
          <span className="text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {timeLeft}
          </span>
        </div>
      )}
      <div className="text-white/60 text-sm">
        Hold for {holdDuration} seconds
      </div>
      <div className="text-white/60 text-sm">
        {statement1}
      </div>
      <div className="text-white/60 text-sm">
        {statement2}
      </div>
    </div>
  );
}

// Multi select component
function MultiSelect({ options, selectedOptions, onToggle, onSubmit }: { options: string[]; selectedOptions: string[]; onToggle: (option: string) => void; onSubmit: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {options.map((option: string) => (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-6 py-3 ${selectedOptions.includes(option) ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20 text-white backdrop-blur-sm transition-all`}
            style={{ 
              borderRadius: '0px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
        style={{ 
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500
        }}
      >
        Submit
      </button>
    </div>
  );
}
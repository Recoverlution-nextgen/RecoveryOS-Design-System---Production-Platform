/**
 * RAW SLIDER RESPONSE - V3 READY
 * Simple 0-100 slider component
 * No V2 dependencies
 */

import React, { useState } from 'react';

interface RawSliderResponseProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  onComplete: (value: number) => void;
  primaryColor?: string;
}

export function RawSliderResponse({
  label = "How intense is this feeling?",
  min = 0,
  max = 100,
  step = 1,
  onComplete,
  primaryColor = '#FF6B6B'
}: RawSliderResponseProps) {
  const [value, setValue] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    setHasInteracted(true);
  };

  const handleSubmit = () => {
    onComplete(value);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {/* Label */}
      <div style={{
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '24px',
        textAlign: 'center',
        color: '#374151'
      }}>
        {label}
      </div>

      {/* Value display */}
      <div style={{
        fontSize: '48px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '24px',
        color: primaryColor
      }}>
        {value}
      </div>

      {/* Slider */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '0', // InfiniteK: no rounded corners
            background: '#E5E7EB',
            outline: 'none',
            appearance: 'none',
            cursor: 'pointer'
          }}
          className="slider"
        />

        {/* Custom slider styling */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background: ${primaryColor};
            cursor: pointer;
            border-radius: 0; /* InfiniteK: no rounded corners */
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: ${primaryColor};
            cursor: pointer;
            border-radius: 0;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>

      {/* Min/Max labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#6B7280',
        marginBottom: '24px'
      }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {/* Submit button */}
      {hasInteracted && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#E53E3E';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
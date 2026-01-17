import { useEffect, useState } from "react";

interface GaugeRing {
  value: number;
  label: string;
  color: string;
}

export function InnerCompassGauge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rings: GaugeRing[] = [
    { value: 78, label: "Emotional Pulse", color: "#5739FB" },
    { value: 65, label: "Anchorage", color: "#7C67FF" },
    { value: 82, label: "Coherence", color: "#9D8FFF" }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5739FB]/10 via-transparent to-[#3E2BB8]/10 rounded-full blur-3xl" />
      
      {/* Three-ring gauge */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        <defs>
          {rings.map((ring, index) => (
            <linearGradient key={`gradient-${index}`} id={`ring-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ring.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={ring.color} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>
        
        {rings.map((ring, index) => {
          const radius = 80 - (index * 22);
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = mounted ? circumference * (1 - ring.value / 100) : circumference;
          
          return (
            <g key={index}>
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Animated progress ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={`url(#ring-gradient-${index})`}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 100 100)"
                style={{
                  transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: "drop-shadow(0 0 8px rgba(87, 57, 251, 0.4))"
                }}
              />
            </g>
          );
        })}
        
        {/* Center text */}
        <text x="100" y="95" textAnchor="middle" className="fill-white text-2xl font-medium">
          {rings[0].value}
        </text>
        <text x="100" y="110" textAnchor="middle" className="fill-white/60 text-xs">
          ALIGNED
        </text>
      </svg>

      {/* Ring labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {rings.map((ring, index) => (
            <div
              key={index}
              className="absolute text-white/80 text-xs whitespace-nowrap"
              style={{
                top: `${20 + index * 25}%`,
                right: `-${10 + index * 5}%`,
                transform: 'translateY(-50%)'
              }}
            >
              {ring.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

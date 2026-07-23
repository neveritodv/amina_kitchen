import React from 'react';

interface LuxurySliderProps {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  unit?: string;
  className?: string;
}

export const LuxurySlider: React.FC<LuxurySliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  unit = '',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={`space-y-2.5 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          <span>{label}</span>
          <span className="font-mono text-sm text-[#E5C158] font-extrabold bg-[#1C281D] px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
            {value} {unit}
          </span>
        </div>
      )}

      <div className="relative flex items-center h-6 select-none cursor-pointer">
        {/* Track background */}
        <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative border border-[#D4AF37]/30">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] rounded-full shadow-[0_0_12px_#D4AF37]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real hidden range input overlaid for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Custom Gold Glowing Thumb Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] border-2 border-[#121A13] shadow-[0_0_15px_rgba(212,175,55,0.8)] pointer-events-none transition-transform group-hover:scale-110"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  desc?: string;
}

interface LuxurySelectProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const LuxurySelect: React.FC<LuxurySelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select Option...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 280 });

  const updatePos = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPortalPos({
        top: rect.bottom + 8,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - 300)),
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePos();
      window.addEventListener('resize', updatePos);
      window.addEventListener('scroll', updatePos, true);
    }
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        const popupEl = document.getElementById('luxury-select-portal');
        if (popupEl && popupEl.contains(e.target as Node)) return;
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          <Sparkles className="w-3 h-3 text-[#E5C158]" />
        </label>
      )}

      {/* Trigger Button Input Box (56px Height, 20px Radius) */}
      <button
        type="button"
        onClick={() => {
          updatePos();
          setIsOpen(!isOpen);
        }}
        className="w-full h-[56px] px-4 rounded-2xl bg-[#1C281D]/90 border border-[#D4AF37]/30 text-[#F7F3E9] flex items-center justify-between shadow-lg hover:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 transition-all group cursor-pointer"
      >
        <span className={`text-xs font-medium ${value ? 'text-white font-bold' : 'text-stone-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* React Portal to document.body (UNCLIPPABLE) */}
      {isOpen &&
        createPortal(
          <div
            id="luxury-select-portal"
            style={{
              position: 'fixed',
              top: `${portalPos.top}px`,
              left: `${portalPos.left}px`,
              width: `${portalPos.width}px`,
              zIndex: 99999
            }}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="p-2 rounded-3xl bg-[#121A13]/98 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#F7F3E9] max-h-64 overflow-y-auto space-y-1"
              >
                {options.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#E5C158]/20 border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-white/5 border-white/10 text-stone-200 hover:border-[#D4AF37]/50 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold font-serif-display group-hover:text-[#D4AF37]">
                          {opt.label}
                        </p>
                        {opt.desc && (
                          <p className="text-[10px] text-stone-400 font-light leading-tight">
                            {opt.desc}
                          </p>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>,
          document.body
        )}
    </div>
  );
};

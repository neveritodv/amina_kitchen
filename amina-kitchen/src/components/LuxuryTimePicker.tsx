import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronDown, Check, Sun, Moon, Sparkles } from 'lucide-react';

interface LuxuryTimePickerProps {
  value: string; // HH:MM
  onChange: (timeStr: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const LuxuryTimePicker: React.FC<LuxuryTimePickerProps> = ({
  value,
  onChange,
  label = 'Select Concierge Dining Time',
  placeholder = 'Choose Time Slot...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const timeSlots = [
    { time: '12:00', label: '12:00 PM — Royal Lunch Banquet', period: 'Lunch' },
    { time: '13:00', label: '01:00 PM — Midday Feast', period: 'Lunch' },
    { time: '14:00', label: '02:00 PM — Afternoon Salon', period: 'Lunch' },
    { time: '18:00', label: '06:00 PM — Sunset Tea & Pastries', period: 'Evening' },
    { time: '19:30', label: '07:30 PM — Imperial Dinner Service', period: 'Dinner' },
    { time: '20:30', label: '08:30 PM — Gala Dining Experience', period: 'Dinner' },
    { time: '21:30', label: '09:30 PM — Late Night Medina Banquet', period: 'Dinner' }
  ];

  const selectedSlot = timeSlots.find(s => s.time === value);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          <Sparkles className="w-3 h-3 text-[#E5C158]" />
        </label>
      )}

      {/* Trigger Button Input Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-2xl bg-[#1C281D]/80 border border-[#D4AF37]/30 text-[#F7F3E9] flex items-center justify-between shadow-lg hover:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 transition-all group cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <Clock className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className={`text-xs font-medium ${value ? 'text-white font-bold' : 'text-stone-400'}`}>
            {selectedSlot ? selectedSlot.label : value || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Time Slots Modal Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute top-full left-0 right-0 mt-2 z-50 p-3 rounded-3xl bg-[#121A13]/98 backdrop-blur-2xl border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#F7F3E9] max-h-72 overflow-y-auto space-y-1.5"
          >
            {timeSlots.map((slot) => {
              const isSelected = value === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => {
                    onChange(slot.time);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37]/30 to-[#E5C158]/20 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-white/5 border-white/10 text-stone-200 hover:border-[#D4AF37]/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                      {slot.period === 'Lunch' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold font-serif-display group-hover:text-[#D4AF37]">
                        {slot.label}
                      </p>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {slot.period} Dining Slot
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

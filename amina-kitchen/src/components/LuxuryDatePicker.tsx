import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LuxuryDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  className?: string;
}

export const LuxuryDatePicker: React.FC<LuxuryDatePickerProps> = ({
  value,
  onChange,
  label = 'Select Reservation Date',
  placeholder = 'Choose Date...',
  minDate,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalPos, setPortalPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 340
  });

  // Parse current selected or active view date
  const initialDate = value ? new Date(value) : new Date();
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());

  const updatePos = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popupHeight = 360;
      const popupWidth = 340;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      let top = rect.bottom + 8;
      if (spaceBelow < popupHeight && spaceAbove > spaceBelow) {
        top = Math.max(16, rect.top - popupHeight - 8);
      }

      const left = Math.max(16, Math.min(rect.left, window.innerWidth - popupWidth - 16));

      setPortalPos({
        top,
        left,
        width: Math.min(popupWidth, window.innerWidth - 32)
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
        const popupEl = document.getElementById('luxury-datepicker-portal');
        if (popupEl && popupEl.contains(e.target as Node)) return;
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar Math
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  // Quick Preset Options
  const handleQuickPreset = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${day}`);
    setViewYear(y);
    setViewMonth(d.getMonth());
    setIsOpen(false);
  };

  const formattedDisplay = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

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
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          <span className={`text-xs font-medium ${formattedDisplay ? 'text-white font-bold' : 'text-stone-400'}`}>
            {formattedDisplay || placeholder}
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
          {isOpen ? 'Close' : 'Select'}
        </span>
      </button>

      {/* React Portal to document.body (UNCLIPPABLE & AUTO-POSITIONED) */}
      {isOpen &&
        createPortal(
          <div
            id="luxury-datepicker-portal"
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
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                className="p-4 rounded-3xl bg-[#121A13]/98 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#F7F3E9] max-h-[min(380px,calc(100vh-100px))] flex flex-col select-none"
              >
                {/* STICKY HEADER: Month & Year Selector */}
                <div className="sticky top-0 z-10 bg-[#121A13] pb-2 border-b border-[#D4AF37]/20 shrink-0">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121A13] flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                      <p className="font-serif-display font-bold text-sm text-[#F7F3E9]">
                        {monthNames[viewMonth]} {viewYear}
                      </p>
                      <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono">
                        Royal Concierge Calendar
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121A13] flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* STICKY QUICK PRESETS */}
                  <div className="flex items-center justify-between gap-1 pt-2.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleQuickPreset(0)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-[#121A13] text-[#D4AF37] border border-[#D4AF37]/30 transition-all font-semibold cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPreset(1)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-[#121A13] text-[#D4AF37] border border-[#D4AF37]/30 transition-all font-semibold cursor-pointer"
                    >
                      Tomorrow
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPreset(3)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-[#121A13] text-[#D4AF37] border border-[#D4AF37]/30 transition-all font-semibold cursor-pointer"
                    >
                      In 3 Days
                    </button>
                  </div>

                  {/* Grid Header: Days of Week */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] pt-2">
                    {daysOfWeek.map(d => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                </div>

                {/* SCROLLABLE GRID BODY: Calendar Days */}
                <div className="overflow-y-auto max-h-[200px] pt-2 pr-1 space-y-1 custom-scrollbar">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Empty Offset Slots */}
                    {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="w-8 h-8" />
                    ))}

                    {/* Day Buttons */}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const formattedMonth = String(viewMonth + 1).padStart(2, '0');
                      const formattedDay = String(dayNum).padStart(2, '0');
                      const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;

                      const isSelected = value === dateStr;
                      const todayStr = new Date().toISOString().split('T')[0];
                      const isToday = todayStr === dateStr;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => handleSelectDay(dayNum)}
                          className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D4AF37] text-[#121A13] shadow-lg shadow-[#D4AF37]/40 scale-105'
                              : isToday
                              ? 'border border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                              : 'hover:bg-white/10 text-stone-200 hover:text-[#D4AF37]'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>,
          document.body
        )}
    </div>
  );
};

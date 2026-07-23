import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle, Search, Mail, Phone, Upload, Sparkles, X, Plus, Minus } from 'lucide-react';

// ============================================================================
// 1. TEXT INPUT WITH FLOATING LABELS & GOLD FOCUS GLOW
// ============================================================================
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  success,
  icon,
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;

  return (
    <div className="relative w-full space-y-1">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[#D4AF37] pointer-events-none z-10">
            {icon}
          </div>
        )}

        <input
          id={id}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={isFocused ? placeholder : (label ? '' : placeholder)}
          className={`w-full ${icon ? 'pl-11' : 'px-4'} py-3.5 rounded-2xl bg-[#1C281D]/80 border text-xs text-[#F7F3E9] placeholder-stone-400 focus:outline-none transition-all duration-300 shadow-lg ${
            error
              ? 'border-red-500/70 focus:ring-2 focus:ring-red-500/40'
              : success
              ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500/40'
              : 'border-[#D4AF37]/30 hover:border-[#D4AF37] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40'
          } ${className}`}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <label
            htmlFor={id}
            className={`absolute left-${icon ? '11' : '4'} transition-all duration-200 pointer-events-none ${
              isFocused || hasValue
                ? '-top-2.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#121A13] px-2 rounded-full border border-[#D4AF37]/30 shadow-md'
                : 'top-3.5 text-xs text-stone-400'
            }`}
          >
            {label}
          </label>
        )}

        {/* Validation Icons */}
        {success && !error && (
          <Check className="absolute right-3.5 w-4 h-4 text-emerald-400" />
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center space-x-1 text-[11px] text-red-400 font-medium px-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// 2. TEXTAREA WITH LUXURY GLASSMORPHISM
// ============================================================================
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  value,
  rows = 3,
  placeholder,
  ...props
}) => {
  const id = useId();

  return (
    <div className="relative w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        className={`w-full p-4 rounded-2xl bg-[#1C281D]/80 border text-xs text-[#F7F3E9] placeholder-stone-400 focus:outline-none transition-all duration-300 shadow-lg border-[#D4AF37]/30 hover:border-[#D4AF37] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 ${className}`}
        {...props}
      />
    </div>
  );
};

// ============================================================================
// 3. SEARCH INPUT WITH GOLD ICON & CLEAR BUTTON
// ============================================================================
export interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search royal culinary items...',
  className = '',
  onClear
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#1C281D]/80 border border-[#D4AF37]/30 text-xs text-[#F7F3E9] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 transition-all shadow-lg"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#121A13] text-stone-300 transition-all"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

// ============================================================================
// 4. CHECKBOX WITH SPRING CHECKMARK
// ============================================================================
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className = ''
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer select-none group ${className}`}>
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-lg border transition-all duration-200 flex items-center justify-center shrink-0 ${
          checked
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] border-[#D4AF37] text-[#121A13] shadow-md shadow-[#D4AF37]/20 scale-105'
            : 'bg-white/5 border-[#D4AF37]/40 group-hover:border-[#D4AF37]'
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
      <span className="text-xs text-stone-200 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
};

// ============================================================================
// 5. QUANTITY STEPPER BUTTONS
// ============================================================================
export interface QuantityStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center bg-[#1C281D] border border-[#D4AF37]/30 rounded-2xl p-1 shadow-md ${className}`}>
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-[#121A13] text-[#D4AF37] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-9 text-center font-mono font-bold text-xs text-[#E5C158]">
        {value}
      </span>

      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-[#121A13] text-[#D4AF37] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

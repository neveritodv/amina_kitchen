import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export interface WhatsAppButtonProps {
  text?: string;
  message?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  text = 'WhatsApp Order',
  message = 'Bonjour Concierge Amina Kitchen, I would like to inquire about reserving a royal banquet or placing an artisanal dish order.',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  fullWidth = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
      return;
    }
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/212600000000?text=${encoded}`, '_blank');
  };

  // Icon Sizing Rules per Prompt
  // Header / Large: 20px, Standard Buttons: 18px, FAB: 24px, Small: 16px
  const getIconSize = () => {
    if (variant === 'floating') return 24;
    if (size === 'lg') return 20;
    if (size === 'sm') return 16;
    return 18;
  };

  const iconPx = getIconSize();

  // Floating FAB (60x60px, 24px FaWhatsapp)
  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-40 w-[60px] h-[60px] rounded-full bg-[#E0B63F] text-[#121A13] shadow-[0_10px_30px_rgba(224,182,63,0.4)] hover:shadow-[0_15px_35px_rgba(224,182,63,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border border-[#FFF8E7]/40 cursor-pointer ${className}`}
        aria-label="Contact WhatsApp Concierge"
        title="WhatsApp Concierge"
      >
        <span style={{ fontSize: `${iconPx}px` }} className="shrink-0 flex items-center justify-center">
          <FaWhatsapp />
        </span>
      </button>
    );
  }

  // Variant Styles
  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle = 'bg-[#E0B63F] text-[#121A13] font-bold shadow-lg shadow-[#E0B63F]/20 hover:shadow-[0_8px_30px_rgba(224,182,63,0.45)] hover:scale-[1.02] active:scale-[0.98] border border-[#FFF8E7]/40';
  } else if (variant === 'secondary') {
    variantStyle = 'bg-[#1C281D] text-[#E0B63F] font-bold border border-[#E0B63F]/40 hover:border-[#E0B63F] hover:bg-[#E0B63F]/10 hover:scale-[1.02] active:scale-[0.98] shadow-md';
  } else if (variant === 'outline') {
    variantStyle = 'bg-transparent text-[#E0B63F] font-bold border border-[#E0B63F]/60 hover:bg-[#E0B63F]/15 hover:border-[#E0B63F] hover:scale-[1.02] active:scale-[0.98]';
  }

  // Height and Padding Rules (10px gap between icon and text)
  const dimensionStyle = size === 'sm'
    ? 'h-10 px-4 text-xs gap-[10px] rounded-full'
    : 'h-[48px] md:h-[52px] px-[28px] text-xs uppercase tracking-wider gap-[10px] rounded-[999px]';

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-sans transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] shrink-0 cursor-pointer ${dimensionStyle} ${variantStyle} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <span style={{ fontSize: `${iconPx}px` }} className="shrink-0 flex items-center justify-center">
        <FaWhatsapp />
      </span>
      <span>{text}</span>
    </button>
  );
};

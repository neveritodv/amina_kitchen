import React from 'react';
import logo from '../assets/images/logo.png';

export interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'splash' | 'loader' | 'modal' | 'mobile';
  isScrolled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  isScrolled = false,
  className = '',
  onClick
}) => {
  // Sizing Rules per Prompt Specifications:
  // Header: Desktop 68-76px, Laptop 64-70px, Tablet 58-64px, Mobile 52-56px
  // Footer: Desktop 90-100px, Tablet 80px, Mobile 64-72px
  // Splash: ~30% larger (128-160px)
  // Loader: 96-112px
  // Modal: 56px

  let sizeClass = '';

  if (variant === 'header') {
    if (isScrolled) {
      sizeClass = 'h-[52px] sm:h-[56px] md:h-[58px] lg:h-[62px]';
    } else {
      sizeClass = 'h-[54px] sm:h-[58px] md:h-[62px] lg:h-[72px]';
    }
  } else if (variant === 'footer') {
    sizeClass = 'h-[68px] md:h-[80px] lg:h-[96px]';
  } else if (variant === 'splash') {
    sizeClass = 'h-[120px] sm:h-[140px] md:h-[160px]';
  } else if (variant === 'loader') {
    sizeClass = 'h-[90px] md:h-[110px]';
  } else if (variant === 'modal') {
    sizeClass = 'h-[50px] md:h-[56px]';
  } else if (variant === 'mobile') {
    sizeClass = 'h-[52px] md:h-[58px]';
  }

  return (
    <div className={`inline-flex items-center shrink-0 cursor-pointer ${className}`} onClick={onClick}>
      <img
        src={logo}
        alt="Amina Kitchen"
        className={`w-auto object-contain transition-all duration-500 ${sizeClass}`}
        style={{ imageRendering: '-webkit-optimize-contrast' }}
      />
    </div>
  );
};

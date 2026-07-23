import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  Download,
  Sparkles,
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  FileText,
  Star,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppButton } from './WhatsAppButton';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenAccount: () => void;
  favoriteCount: number;
  cartCount: number;
  deferredPwaPrompt?: any;
  onInstallPwa?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenCart,
  onOpenFavorites,
  onOpenAccount,
  favoriteCount,
  cartCount,
  deferredPwaPrompt,
  onInstallPwa
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const moreMenuLinks = [
    { path: '/ramadan', label: 'Ramadan Kareem', icon: Calendar, desc: 'Special Iftar Banquets & Boxes' },
    { path: '/testimonials', label: 'Guest Reviews', icon: Star, desc: 'Ratings & Imperial Testimonials' },
    { path: '/faq', label: 'FAQ & Help', icon: HelpCircle, desc: 'Delivery Zones & Ordering Info' },
    { path: '/privacy', label: 'Privacy Policy', icon: ShieldCheck, desc: 'Data Protection & Integrity' },
    { path: '/terms', label: 'Terms of Service', icon: FileText, desc: 'Booking & Catering Guidelines' },
    { path: '/favorites', label: 'Saved Favorites', icon: Heart, desc: 'Your Curated Wishlist' },
    { path: '/search', label: 'Search Catalog', icon: Search, desc: 'Find Dishes & Delicacies' }
  ];

  // Fullscreen Navigation Drawer Items (Clean luxury order)
  const fullScreenNavItems = [
    { path: '/', label: 'Home', num: '01' },
    { path: '/menu', label: 'Menu', num: '02' },
    { path: '/gallery', label: 'Gallery', num: '03' },
    { path: '/services', label: 'Services', num: '04' },
    { path: '/catering', label: 'Royal Catering', num: '05' },
    { path: '/ramadan', label: 'Ramadan', num: '06' },
    { path: '/about', label: 'About', num: '07' },
    { path: '/testimonials', label: 'Reviews', num: '08' },
    { path: '/faq', label: 'FAQ', num: '09' },
    { path: '/contact', label: 'Contact', num: '10' },
    { path: '/favorites', label: 'Favorites', num: '11' },
    { path: '/order', label: 'Order', num: '12' }
  ];

  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Scroll Progress Bar at top */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-[#2C3E2B] via-[#D4AF37] to-[#E5C158] origin-left z-50 fixed top-0 left-0 right-0"
        style={{ scaleX }}
      />

      {/* Main Header Bar (Desktop & Mobile) */}
      <div
        className={`w-full border-b border-[#D4AF37]/20 transition-all duration-500 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#121A13]/98 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-[80px]'
            : 'bg-gradient-to-b from-[#121A13] via-[#121A13]/95 to-[#1C281D]/90 backdrop-blur-xl h-[86px]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* ========================================================= */}
          {/* 1. LUXURY DESKTOP HEADER (lg:flex)                       */}
          {/* ========================================================= */}
          
          {/* LEFT: Prominent Brand Anchor (68-76px Desktop Logo Height) */}
          <div className="hidden lg:flex items-center shrink-0 pr-6">
            <BrandLogo
              variant="header"
              isScrolled={isScrolled}
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* CENTER: Navigation (Starts directly after branding) */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-10">
            {primaryNavLinks.map((link) => {
              const isActive =
                currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 py-1.5 hover:-translate-y-0.5 ${
                    isActive
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-stone-300 hover:text-[#D4AF37]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-full shadow-[0_0_10px_#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Mega Dropdown: More ▼ */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onMouseEnter={() => setIsMoreOpen(true)}
                className={`flex items-center space-x-1 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 py-1.5 hover:-translate-y-0.5 ${
                  isMoreOpen ? 'text-[#D4AF37] font-bold' : 'text-stone-300 hover:text-[#D4AF37]'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Panel */}
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl glass-panel bg-[#121A13]/98 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 z-50"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] px-3 py-1.5 border-b border-[#D4AF37]/20 mb-1 flex items-center justify-between">
                      <span>Explorer Concierge</span>
                      <Sparkles className="w-3 h-3 text-[#E5C158]" />
                    </div>

                    <div className="space-y-1">
                      {moreMenuLinks.map((item) => {
                        const IconComp = item.icon;
                        const isItemActive = currentPath === item.path;
                        return (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setIsMoreOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center space-x-3 group ${
                              isItemActive
                                ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37]'
                                : 'hover:bg-white/5 text-stone-200 hover:text-[#D4AF37]'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold font-serif-display tracking-wide group-hover:text-[#D4AF37]">
                                {item.label}
                              </p>
                              <p className="text-[10px] text-stone-400 font-light leading-tight">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            <button
              onClick={onOpenSearch}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-white/5 backdrop-blur-md hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center shrink-0 group cursor-pointer"
              title="Search Concierge"
            >
              <Search className="w-4 h-4 text-[#D4AF37] group-hover:scale-105 transition-transform" />
            </button>

            <button
              onClick={onOpenAccount}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-white/5 backdrop-blur-md hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center shrink-0 group cursor-pointer"
              title="Guest Profile"
            >
              <User className="w-4 h-4 text-[#D4AF37] group-hover:scale-105 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/favorites')}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-white/5 backdrop-blur-md hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center relative shrink-0 group cursor-pointer"
              title="Saved Favorites"
            >
              <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-amber-500 text-amber-500' : 'text-[#D4AF37]'}`} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {favoriteCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/order')}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-white/5 backdrop-blur-md hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center relative shrink-0 group cursor-pointer"
              title="Your Order Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            <WhatsAppButton variant="primary" size="lg" text="WhatsApp Order" />
          </div>

          {/* ========================================================= */}
          {/* 2. MOBILE & TABLET HEADER BAR (max-width: 1023px / lg:hidden) */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center justify-between w-full h-full">
            <BrandLogo
              variant="mobile"
              onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-full border border-[#D4AF37]/20 bg-white/5 text-[#F7F3E9]"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => navigate('/favorites')}
                className="p-2 rounded-full border border-[#D4AF37]/20 bg-white/5 text-[#F7F3E9] relative"
                aria-label="Favorites"
              >
                <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-amber-500 text-amber-500' : 'text-[#D4AF37]'}`} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-[#121A13] text-[9px] font-bold flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/order')}
                className="p-2 px-2.5 rounded-full bg-[#1C281D] text-[#F7F3E9] border border-[#D4AF37]/40 flex items-center space-x-1.5 shadow-md"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold text-[#D4AF37]">{cartCount}</span>
              </button>

              {/* Hamburger / Close Toggle Button (48x48px, glassmorphism) */}
              <motion.button
                whileHover={{ rotate: mobileMenuOpen ? 90 : 0, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-white/5 backdrop-blur-md text-[#D4AF37] flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-[22px] h-[22px] text-[#D4AF37]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#D4AF37]" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MOBILE & TABLET DRAWER OVERLAY (ATTACHED DIRECTLY BELOW HEADER AT TOP-80PX) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden fixed top-[80px] left-0 right-0 bottom-0 h-[calc(100dvh-80px)] z-40 bg-[#121A13]/98 backdrop-blur-2xl text-[#F7F3E9] flex flex-col justify-start items-stretch overflow-y-auto pb-safe select-none border-t border-[#D4AF37]/20"
          >
            {/* Radial Zellige Geometry & Subtle Gold Glow */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* 3.1 MENU CONTENT (Starts IMMEDIATELY 24px below header line) */}
            <div className="pt-6 px-6 max-w-lg mx-auto w-full space-y-2 relative z-10">
              {fullScreenNavItems.map((item, idx) => {
                const isActive = currentPath === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.025, duration: 0.25 }}
                  >
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full h-[56px] px-4 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D4AF37]/25 to-[#E5C158]/10 border-[#D4AF37] text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                          : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 text-stone-200 hover:text-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono text-[#D4AF37]/80 tracking-widest">
                          {item.num}
                        </span>
                        <span className="font-serif-display text-lg sm:text-xl font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                        )}
                        <ChevronRight className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* 3.2 BOTTOM SECTION (mt-auto pinned to bottom) */}
            <div className="mt-auto pt-8 pb-8 px-6 border-t border-[#D4AF37]/20 max-w-lg mx-auto w-full space-y-6 relative z-10 shrink-0">
              {/* Primary CTA: WhatsApp Order */}
              <WhatsAppButton
                variant="primary"
                text="WhatsApp Order"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Secondary Actions & Direct Contact */}
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-300 font-light">
                <a
                  href="tel:+212600000000"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] flex items-center justify-center space-x-2 text-[#D4AF37] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">+212 600 000 000</span>
                </a>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center space-x-2 text-stone-300">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>10:00 – 23:00</span>
                </div>
              </div>

              {/* Location & Social Icons */}
              <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Derb Dabachi, Medina, Marrakesh</span>
                </div>

                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 transition-all" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 transition-all" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Copyright */}
              <p className="text-[10px] text-center text-stone-500 uppercase tracking-widest pb-4">
                © {new Date().getFullYear()} Amina Kitchen • Royal Moroccan Gastronomy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

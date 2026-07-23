import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Sparkles,
  Utensils,
  Crown,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Award,
  Clock,
  Heart,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Flame,
  CheckCircle2,
  Maximize2,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Dish } from '../types';
import { DISHES } from '../data/dishes';
import { WhatsAppButton } from './WhatsAppButton';
import { LightboxModal } from './LightboxModal';

interface LuxuryHeroProps {
  onExploreMenu: () => void;
  onBookCatering: () => void;
  onAddToCart?: (dish: Dish, quantity?: number, instructions?: string) => void;
}

export const LuxuryHero: React.FC<LuxuryHeroProps> = ({
  onExploreMenu,
  onBookCatering,
  onAddToCart
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Parallax Scroll Effects for Desktop Hero
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);

  // Featured Slides Data Mapping from DISHES
  const featuredSlides = DISHES.slice(0, 5).map(dish => ({
    id: dish.id,
    title: dish.name,
    arabicName: dish.arabicName,
    subtitle: dish.description,
    category: dish.category,
    priceMAD: dish.priceMAD,
    imageUrl: dish.imageUrl,
    badge: 'Chef Selection',
    dishObj: dish
  }));

  const currentSlide = featuredSlides[currentSlideIndex];

  // Auto-play interval (5.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % featuredSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, featuredSlides.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev + 1) % featuredSlides.length);
  }, [featuredSlides.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  }, [featuredSlides.length]);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  return (
    <div className="space-y-12 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. MOBILE HERO SECTION (<768px / Dedicated Native Mobile Redesign)       */}
      {/* ========================================================================= */}
      <section className="block md:hidden w-full pt-20 pb-[calc(80px+env(safe-area-inset-bottom))] px-4 bg-[#121A13] text-[#F7F3E9]">
        <div className="space-y-4 max-w-md mx-auto">
          {/* Top Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1C281D] border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>#1 Imperial Gastronomy</span>
            </div>

            <span className="text-[10px] font-serif text-[#D4AF37] tracking-wider">
              Marrakesh Medina
            </span>
          </div>

          {/* Large Image (16:10 Ratio) */}
          <div className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide.id}
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Rating Chip (Top-Right) */}
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-[#121A13]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#D4AF37] border border-[#D4AF37]/40 shadow-md z-10">
              <Star className="w-3 h-3 fill-[#D4AF37]" />
              <span>4.95 ★</span>
            </div>

            {/* Floating Expand Icon (Top-Left) */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-3 left-3 p-2 rounded-full bg-[#121A13]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 z-10"
              aria-label="Expand Photo"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* 48px Circular Navigation Glass Buttons (Left & Right Center) */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center active:scale-90 transition-all z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center active:scale-90 transition-all z-10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Content Card (Positioned BELOW Image) */}
          <div className="p-5 rounded-[24px] glass-panel bg-[#18221A]/95 border border-[#D4AF37]/30 space-y-3 shadow-xl relative z-10">
            {/* Arabic Name */}
            {currentSlide.arabicName && (
              <p className="text-xs font-bold text-[#E5C158] font-serif tracking-widest">
                {currentSlide.arabicName}
              </p>
            )}

            {/* 30px Title Clamped to 2 lines */}
            <h2 className="font-serif-display font-bold text-2xl sm:text-[30px] leading-tight text-[#F7F3E9] line-clamp-2">
              {currentSlide.title}
            </h2>

            {/* Description Clamped to 3 lines */}
            <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-3">
              {currentSlide.subtitle}
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="space-y-2 pt-2">
              <WhatsAppButton
                variant="primary"
                text="WhatsApp Order"
                fullWidth
                message={`Hello Amina Kitchen Concierge, I am viewing the *${currentSlide.title}* on your website and would like to inquire about ordering/catering.`}
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onExploreMenu}
                  className="py-3 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#F7F3E9] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1"
                >
                  <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Explore Menu</span>
                </button>

                <button
                  onClick={onBookCatering}
                  className="py-3 px-3 rounded-2xl bg-[#1C281D] hover:bg-[#2C3E2B] border border-[#D4AF37]/50 text-[#F7F3E9] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1"
                >
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Book Catering</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Progress Indicator & Slim Thumbnails */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-[#D4AF37] font-mono">
              <span>0{currentSlideIndex + 1} / 0{featuredSlides.length}</span>
              <div className="flex-1 mx-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#D4AF37] transition-all duration-300"
                  style={{ width: `${((currentSlideIndex + 1) / featuredSlides.length) * 100}%` }}
                />
              </div>
              <span className="font-sans font-bold uppercase text-[10px]">Royal Selection</span>
            </div>

            {/* 64x64 Thumbnails Strip */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
              {featuredSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all relative ${
                    idx === currentSlideIndex
                      ? 'border-[#D4AF37] scale-105 shadow-md shadow-[#D4AF37]/30'
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HERO SECTION (>=768px / Fullscreen Editorial Showcase)        */}
      {/* ========================================================================= */}
      <section className="hidden md:flex relative w-full min-h-screen xl:h-screen flex-col justify-between pt-24 pb-8 px-6 lg:px-8 bg-[#121A13] text-[#F7F3E9] overflow-hidden">
        {/* Subtle Background Zellige Geometry & Golden Ambient Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2C3E2B]/40 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Main Grid Layout (Left 42% / Right 58% on Desktop) */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* LEFT COLUMN: LUXURY EDITORIAL TYPOGRAPHY & CONCIERGE CTAS */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="xl:col-span-5 space-y-6 text-center xl:text-left order-2 xl:order-1"
          >
            {/* Luxury Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1C281D] border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-2xl backdrop-blur-md"
            >
              <Crown className="w-4 h-4 text-[#E5C158] animate-pulse" />
              <span>#1 Imperial Moroccan Gastronomy</span>
            </motion.div>

            {/* Headline Split */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7F3E9] leading-[1.1]">
                Artisanal Royal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] italic">
                  Moroccan Delicacies
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-serif tracking-widest uppercase">
                Handcrafted in Marrakesh Medina • 100% Homemade
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-xl mx-auto xl:mx-0"
            >
              Experience hand-pulled golden warka pastillas, High Atlas honey pastries, and slow-simmered Taliouine saffron poultry crafted according to centuries of royal Fassi recipes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center xl:justify-start gap-3 pt-2"
            >
              {/* Primary CTA */}
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2 group"
              >
                <Utensils className="w-4 h-4 text-[#121A13]" />
                <span>Explore Royal Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onBookCatering}
                className="px-6 py-3.5 rounded-2xl bg-[#1C281D] hover:bg-[#2C3E2B] border border-[#D4AF37]/50 text-[#F7F3E9] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl active:scale-95 transition-all flex items-center space-x-2"
              >
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Royal Catering</span>
              </button>

              {/* Direct WhatsApp Concierge CTA */}
              <WhatsAppButton
                variant="primary"
                text="WhatsApp Order"
                message={`Hello Amina Kitchen Concierge, I am viewing the *${currentSlide.title}* on your website and would like to inquire about ordering/catering.`}
              />
            </motion.div>

            {/* Trust Indicators Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-xs"
            >
              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">4.95 ★ Rating</p>
                  <p className="text-[10px] text-stone-400">Google Verified</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">30+ Years</p>
                  <p className="text-[10px] text-stone-400">Royal Heritage</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">100% Halal</p>
                  <p className="text-[10px] text-stone-400">Organic Saffron</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">Fresh Daily</p>
                  <p className="text-[10px] text-stone-400">Made To Order</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: CINEMATIC EDITORIAL CAROUSEL SHOWCASE */}
          <div
            className="xl:col-span-7 order-1 xl:order-2 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Carousel Frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[4/3] lg:aspect-[16/10] bg-black">
              
              {/* Animated Slides Layer with Ken Burns Zoom Effect */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    loading="eager"
                    className="w-full h-full object-cover filter brightness-95 contrast-105"
                  />

                  {/* Subtle Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                  {/* Floating Overlay Badge & Details */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel bg-black/60 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold uppercase tracking-wider">
                          {currentSlide.badge}
                        </span>
                        {currentSlide.arabicName && (
                          <span className="text-xs text-[#E5C158] font-serif">
                            {currentSlide.arabicName}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif-display text-xl lg:text-2xl font-bold text-white">
                        {currentSlide.title}
                      </h3>
                      <p className="text-xs text-stone-300 font-light line-clamp-1 max-w-md">
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="font-serif-display font-bold text-xl text-[#E5C158]">
                        {currentSlide.priceMAD} MAD
                      </span>
                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(currentSlide.dishObj)}
                          className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                        >
                          Order Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#121A13] border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-md transition-all shadow-xl z-20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#121A13] border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-md transition-all shadow-xl z-20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-x-auto py-1">
                {featuredSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`relative rounded-xl overflow-hidden w-20 h-14 border-2 transition-all cursor-pointer ${
                      idx === currentSlideIndex
                        ? 'border-[#D4AF37] scale-105 shadow-lg shadow-[#D4AF37]/30'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-[#D4AF37]">
                0{currentSlideIndex + 1} / 0{featuredSlides.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Photo Zoom */}
      {lightboxOpen && (
        <LightboxModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageUrl={currentSlide.imageUrl}
          title={currentSlide.title}
          arabicName={currentSlide.arabicName}
        />
      )}
    </div>
  );
};

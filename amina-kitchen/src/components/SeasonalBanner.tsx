import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, X, ArrowRight, Calendar } from 'lucide-react';
import { SeasonalCampaign } from '../types';

interface SeasonalBannerProps {
  campaign: SeasonalCampaign;
  onSelectCampaign: (campaign: SeasonalCampaign) => void;
}

export const SeasonalBanner: React.FC<SeasonalBannerProps> = ({ campaign, onSelectCampaign }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(campaign.targetDateISO) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [campaign.targetDateISO]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-xl bg-gradient-to-r from-[#18221A] via-[#2A3B2B] to-[#121A13] text-[#F7F3E9] p-6 sm:p-8 md:p-10">
          {/* Subtle Background Art */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url(${campaign.bannerImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-[#D4AF37] transition-all z-10"
            title="Dismiss Announcement"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C158] animate-pulse" />
                <span>{campaign.badgeText}</span>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-wide text-white leading-tight">
                {campaign.title}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl">
                {campaign.subtitle}
              </p>

              {/* Countdown Timer Display */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-center">
                <div className="flex items-center space-x-1.5 text-xs text-[#D4AF37] uppercase tracking-wider font-medium mr-2">
                  <Clock className="w-4 h-4 text-[#E5C158]" />
                  <span>Orders Closing In:</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-[#121A13]/80 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#E5C158]">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">Days</span>
                  </div>
                  <span className="text-[#D4AF37] font-bold">:</span>

                  <div className="bg-[#121A13]/80 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#E5C158]">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">Hours</span>
                  </div>
                  <span className="text-[#D4AF37] font-bold">:</span>

                  <div className="bg-[#121A13]/80 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#E5C158]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">Mins</span>
                  </div>
                  <span className="text-[#D4AF37] font-bold">:</span>

                  <div className="bg-[#121A13]/80 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#E5C158]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action CTA */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                onClick={() => onSelectCampaign(campaign)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>{campaign.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

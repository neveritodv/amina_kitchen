import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Utensils, Users, Sparkles, Calculator, Check, ArrowRight } from 'lucide-react';
import { LuxurySlider } from './LuxurySlider';

export const ServicesView: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const [guestCount, setGuestCount] = useState(50);
  const [selectedPackage, setSelectedPackage] = useState<'Standard' | 'Royal' | 'Imperial'>('Royal');

  const packagePrices = {
    Standard: 350, // MAD per guest
    Royal: 550,
    Imperial: 850
  };

  const totalEstimateMAD = guestCount * packagePrices[selectedPackage];
  const totalEstimateUSD = Math.round(totalEstimateMAD / 10);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Bespoke Culinary Services</span>
        </span>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
          Luxury Catering & Private Chef Services
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          From intimate rooftop dinners in Medina Riads to grand 500-guest wedding receptions across Morocco.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl glass-card border border-[#D4AF37]/30 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold">Royal Wedding Catering</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Complete multi-course banquet experiences featuring signature Pigeon Pastilla, Lamb Mechoui, poultry tagines, custom pastry pyramids, and silver tea tables.
            </p>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Full uniform waitstaff & copper chafing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom pastry towers & Kaab El Ghzal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Live silver mint tea ceremony</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onBookClick}
            className="w-full py-3 rounded-xl bg-[#2C3E2B] dark:bg-[#1C281D] hover:bg-[#395038] text-[#F7F3E9] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/40 flex items-center justify-center space-x-2"
          >
            <span>Inquire Package</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl glass-card border border-[#D4AF37]/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden bg-gradient-to-b from-[#121A13]/90 to-[#1C281D]"
        >
          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#121A13]">
            Most Requested
          </span>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#F7F3E9]">Private Riad Chef</h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              An exclusive culinary master assigned to your private Riad or Villa in Marrakesh or Casablanca for live custom cooking, breakfast spreads, and candlelight dinners.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Personalized daily menu planning</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Fresh organic morning market sourcing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Rooftop terrace candlelight service</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onBookClick}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Reserve Private Chef</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl glass-card border border-[#D4AF37]/30 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold">Corporate Galas & Iftar</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Bespoke corporate catering spreads, diplomatic receptions, and Ramadan Iftar buffets crafted to host international delegations with grace.
            </p>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Scalable from 20 to 500+ guests</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom branding & corporate favors</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>High-capacity temperature control</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onBookClick}
            className="w-full py-3 rounded-xl bg-[#2C3E2B] dark:bg-[#1C281D] hover:bg-[#395038] text-[#F7F3E9] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/40 flex items-center justify-center space-x-2"
          >
            <span>Inquire Corporate</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </motion.div>
      </div>

      {/* Services Visual Showcase Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Visual Atmosphere</span>
          <h2 className="font-serif-display text-3xl font-bold">Immersive Royal Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Wedding Hero */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 group aspect-[4/3] shadow-xl">
            <img
              src="/images/entrance.png"
              alt="Royal Wedding Entrance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
              <p className="font-serif-display font-bold text-sm text-[#D4AF37]">Royal Wedding Entrance</p>
              <p className="text-[11px] text-stone-300">Grand arrival experience at Riad Amina</p>
            </div>
          </div>

          {/* Kitchen Preview */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 group aspect-[4/3] shadow-xl">
            <img
              src="/images/Moroccan kitchen.png"
              alt="Copper Tagine Kitchen Atelier"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
              <p className="font-serif-display font-bold text-sm text-[#D4AF37]">Master Culinary Kitchen</p>
              <p className="text-[11px] text-stone-300">Live copper tagine preparation over charcoal</p>
            </div>
          </div>

          {/* Dessert Catering */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 group aspect-[4/3] shadow-xl">
            <img
              src="/images/Luxury Moroccan dessert table..png"
              alt="Luxury Moroccan Dessert Table"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
              <p className="font-serif-display font-bold text-sm text-[#D4AF37]">Royal Dessert Catering</p>
              <p className="text-[11px] text-stone-300">Imperial sweet pastries & silver tea ceremony</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Banquet Cost Estimator */}
      <section className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#D4AF37]/40 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator</span>
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
            Estimate Your Event Budget
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            {/* Package Selector */}
            <div>
              <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                Select Banquet Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Royal', 'Imperial'] as const).map(pkg => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedPackage === pkg
                        ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] shadow-md'
                        : 'bg-black/5 dark:bg-white/5 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {pkg} Tier
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Slider */}
            <div>
              <LuxurySlider
                label="Number of Guests"
                unit="Guests"
                min={10}
                max={300}
                step={5}
                value={guestCount}
                onChange={setGuestCount}
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-[#121A13] text-[#F7F3E9] border border-[#D4AF37]/40 text-center space-y-4 shadow-xl">
            <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">Estimated Investment</p>
            <div>
              <p className="font-serif-display text-4xl font-extrabold text-[#E5C158]">
                {totalEstimateMAD.toLocaleString()} MAD
              </p>
              <p className="text-xs text-stone-400">~ ${totalEstimateUSD.toLocaleString()} USD</p>
            </div>
            <p className="text-[11px] text-stone-400 font-light">
              Includes course planning, organic ingredients, and silver service staff setup.
            </p>
            <button
              onClick={onBookClick}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider"
            >
              Lock In Date & Reserve
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

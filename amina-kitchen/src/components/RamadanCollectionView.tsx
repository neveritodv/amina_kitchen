import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon, Clock, Utensils, ShoppingBag, Check, Heart } from 'lucide-react';
import { DISHES } from '../data/dishes';
import { Dish } from '../types';

interface RamadanCollectionViewProps {
  onAddToCart: (dish: Dish, quantity: number) => void;
  onSelectDish: (dish: Dish) => void;
}

export const RamadanCollectionView: React.FC<RamadanCollectionViewProps> = ({
  onAddToCart,
  onSelectDish
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 25, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ramadanDishes = DISHES.filter(
    d => d.category === 'Ramadan' || d.category === 'Sweets' || d.id.includes('chebakia') || d.id.includes('harira')
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* Ramadan Spotlight Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/50 shadow-2xl p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-[#121A13] to-[#1C281D] text-[#F7F3E9]">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C158] text-xs font-bold uppercase tracking-widest">
          <Moon className="w-4 h-4" />
          <span>Ramadan Kareem Collection</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold">
          Royal Iftar Spreads & Sacred Confections
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
          Break your fast with authentic Fassi Harira, Tafilalet Majhool dates, golden Chebakia roses, and warm Msemmen crepes delivered fresh before Maghrib.
        </p>

        {/* Live Countdown to Maghrib Iftar */}
        <div className="pt-4 flex flex-col items-center space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
            Maghrib Iftar Delivery Lock Countdown
          </p>
          <div className="flex space-x-3 text-center">
            <div className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/30 min-w-[64px]">
              <span className="font-serif-display text-2xl font-bold text-[#E5C158]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[9px] text-stone-400 uppercase">Hours</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/30 min-w-[64px]">
              <span className="font-serif-display text-2xl font-bold text-[#E5C158]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[9px] text-stone-400 uppercase">Mins</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/30 min-w-[64px]">
              <span className="font-serif-display text-2xl font-bold text-[#E5C158]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[9px] text-stone-400 uppercase">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ramadan Dishes Grid */}
      <div className="space-y-6">
        <h2 className="font-serif-display text-2xl font-bold text-center">
          Featured Iftar & Suhoor Delicacies
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ramadanDishes.map(dish => (
            <div
              key={dish.id}
              onClick={() => onSelectDish(dish)}
              className="p-6 rounded-3xl glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="h-48 rounded-2xl overflow-hidden relative">
                  <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold">
                    {dish.servings}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-lg font-bold">{dish.name}</h3>
                  <span className="font-serif-display font-extrabold text-base text-[#D4AF37]">
                    {dish.priceMAD} MAD
                  </span>
                </div>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {dish.description}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(dish, 1);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Iftar Tray</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

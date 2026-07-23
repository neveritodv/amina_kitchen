import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Award, ChevronRight } from 'lucide-react';
import { Dish } from '../types';
import { DishCard } from './DishCard';

interface ChefRecommendationSectionProps {
  dishes: Dish[];
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  onQuickView: (dish: Dish) => void;
}

export const ChefRecommendationSection: React.FC<ChefRecommendationSectionProps> = ({
  dishes,
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onQuickView
}) => {
  const chefDishes = dishes.filter(d => d.isChefsRecommendation);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Decorative Arch Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-12 relative z-10">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121A13] border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-md">
          <Crown className="w-4 h-4 text-[#E5C158]" />
          <span>Handcrafted Signature Creations</span>
        </span>

        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A2421] dark:text-[#F7F3E9]">
          Chef’s Recommendation
        </h2>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Selected by Chef Amina, these heirloom recipes embody royal Moroccan gastronomy — slow-cooked with saffron, organic flower blossom honey, and centuries of tradition.
        </p>
      </div>

      {/* Grid of Chef's Recommendations - Single column on mobile & tablet, 3-col on desktop (1280px+) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
        {chefDishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            isFavorite={favoriteIds.has(dish.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};

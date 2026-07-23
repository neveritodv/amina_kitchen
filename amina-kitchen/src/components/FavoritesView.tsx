import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowLeft, Utensils } from 'lucide-react';
import { Dish } from '../types';
import { DishCard } from './DishCard';

interface FavoritesViewProps {
  favoriteDishes: Dish[];
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  onQuickView: (dish: Dish) => void;
  onBackToMenu: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteDishes,
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  onBackToMenu
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-1">
          <button
            onClick={onBackToMenu}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </button>

          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold flex items-center space-x-3">
            <span>Your Saved Favorites</span>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-sans font-bold">
              {favoriteDishes.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Easily reorder your saved royal dishes anytime. Saved locally to your device.
          </p>
        </div>
      </div>

      {/* Grid of Favorites */}
      {favoriteDishes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {favoriteDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                isFavorite={favoriteIds.has(dish.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center space-y-4 max-w-md mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Heart className="w-10 h-10" />
          </div>

          <h3 className="font-serif-display text-2xl font-bold">No Saved Dishes Yet</h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Click the heart icon on any royal pastilla, tagine, or pastry to save it to your personal favorites list.
          </p>

          <button
            onClick={onBackToMenu}
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all inline-flex items-center space-x-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Discover Royal Menu</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

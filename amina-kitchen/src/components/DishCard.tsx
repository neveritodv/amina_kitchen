import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Clock, Users, Plus, Sparkles, Check, Eye } from 'lucide-react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  onQuickView: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onQuickView
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showParticle, setShowParticle] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowParticle(true);
    setTimeout(() => setShowParticle(false), 800);
    onToggleFavorite(dish);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    onAddToCart(dish);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onQuickView(dish)}
      className="group relative rounded-2xl glass-card overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex flex-col h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-stone-900">
        {/* Skeleton Blur-Up Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 animate-pulse" />
        )}

        {/* Luxury Food Photography Image */}
        <img
          src={dish.imageUrl}
          alt={dish.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {dish.isChefsRecommendation && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#121A13]/90 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#E5C158] animate-pulse" />
              <span>Chef's Choice</span>
            </span>
          )}
          {dish.isSeasonal && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-950/90 border border-amber-500 text-amber-300 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
              <span>Seasonal</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button with Particles */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all z-10 hover:scale-110 active:scale-95"
          title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-200 group-hover:text-white'
            }`}
          />

          {/* Floating particle burst */}
          <AnimatePresence>
            {showParticle && (
              <motion.span
                initial={{ scale: 0, opacity: 1, y: 0 }}
                animate={{ scale: 2, opacity: 0, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Quick View Hover Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <span className="px-4 py-2 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center space-x-1.5 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Dish Details</span>
          </span>
        </div>

        {/* Price Tag Overlay at Bottom Left of Image */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="flex items-baseline space-x-1.5 px-3 py-1 rounded-lg bg-[#121A13]/90 border border-[#D4AF37]/40 backdrop-blur-md">
            <span className="font-serif-display text-lg font-bold text-[#E5C158]">{dish.priceMAD} MAD</span>
            <span className="text-[10px] text-stone-400">(${dish.priceUSD})</span>
          </div>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          {/* Dish Arabic & English Title */}
          <div className="flex items-start justify-between">
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#2A2421] dark:text-[#F7F3E9] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
              {dish.name}
            </h3>
          </div>
          {dish.arabicName && (
            <p className="text-xs text-[#2C3E2B] dark:text-[#D4AF37] font-medium tracking-wide mt-0.5">
              {dish.arabicName}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{dish.prepTimeMinutes} mins</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{dish.servings}</span>
            </span>
          </div>

          <div className="flex items-center space-x-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{dish.rating}</span>
          </div>
        </div>

        {/* Add to Order Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-1 min-h-[48px] py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-[#2C3E2B] dark:bg-[#1C281D] hover:bg-[#395038] text-[#F7F3E9] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Order</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

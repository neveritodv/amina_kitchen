import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Clock, Users, Plus, Minus, ShoppingBag, Sparkles, Flame, Check } from 'lucide-react';
import { Dish } from '../types';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity: number, instructions?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [activeImage, setActiveImage] = useState(dish.imageUrl);
  const [isAdded, setIsAdded] = useState(false);

  const images = [dish.imageUrl, ...(dish.secondaryImages || [])];

  const handleAdd = () => {
    onAddToCart(dish, quantity, instructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl rounded-3xl glass-panel border border-[#D4AF37]/30 overflow-hidden shadow-2xl z-10 my-8 text-[#2A2421] dark:text-[#F7F3E9]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md z-20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Gallery */}
            <div className="relative bg-stone-900 p-6 flex flex-col justify-between">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-lg">
                <img
                  src={activeImage}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Favorite Button Overlay */}
                <button
                  onClick={() => onToggleFavorite(dish)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md hover:scale-110 transition-all"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex items-center space-x-2 mt-4 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === img ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details Content */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-4">
                {dish.isChefsRecommendation && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Chef's Masterpiece</span>
                  </span>
                )}

                <div>
                  <h2 className="font-serif-display text-2xl md:text-3xl font-bold leading-tight">
                    {dish.name}
                  </h2>
                  {dish.arabicName && (
                    <p className="text-sm text-[#2C3E2B] dark:text-[#D4AF37] font-medium tracking-wide mt-1">
                      {dish.arabicName}
                    </p>
                  )}
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <span className="font-serif-display text-2xl font-bold text-[#E5C158]">{dish.priceMAD * quantity} MAD</span>
                    <span className="text-xs text-stone-400 ml-2">(${dish.priceUSD * quantity})</span>
                  </div>

                  <div className="flex items-center space-x-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{dish.rating} ({dish.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
                    <Clock className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                    <span className="block text-stone-500 dark:text-stone-400 text-[10px]">PREP TIME</span>
                    <span className="font-semibold">{dish.prepTimeMinutes} mins</span>
                  </div>

                  <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
                    <Users className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                    <span className="block text-stone-500 dark:text-stone-400 text-[10px]">PORTION</span>
                    <span className="font-semibold">{dish.servings}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
                    <Flame className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                    <span className="block text-stone-500 dark:text-stone-400 text-[10px]">SPICE</span>
                    <span className="font-semibold">{dish.spiceLevel || 'Mild'}</span>
                  </div>
                </div>

                {/* Long Description */}
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Heritage Story</h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {dish.longDescription || dish.description}
                  </p>
                </div>

                {/* Ingredients Tags */}
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-700 dark:text-stone-300">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Custom Culinary Request
                  </label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Extra cinnamon sugar, less spice, allergy notes..."
                    className="w-full p-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 focus:border-[#D4AF37] focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Quantity Selector & Add Button */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-4">
                <div className="flex items-center space-x-3 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
                  >
                    <Minus className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                  <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] hover:opacity-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added To Order</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Order — {dish.priceMAD * quantity} MAD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

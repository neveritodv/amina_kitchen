import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, Plus, Check, Trash2, ShoppingBag } from 'lucide-react';
import { Dish } from '../types';
import { DISHES } from '../data/dishes';

interface ProductComparisonModalProps {
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
  initialDishes?: Dish[];
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  onClose,
  onAddToCart,
  initialDishes = []
}) => {
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>(
    initialDishes.length > 0 ? initialDishes : [DISHES[0], DISHES[1], DISHES[3]]
  );

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleRemoveDish = (id: string) => {
    setSelectedDishes(prev => prev.filter(d => d.id !== id));
  };

  const handleAddDish = (dish: Dish) => {
    if (selectedDishes.length < 4 && !selectedDishes.some(d => d.id === dish.id)) {
      setSelectedDishes(prev => [...prev, dish]);
      setIsAdding(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-6xl glass-panel border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-[#2A2421] dark:text-[#F7F3E9] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif-display text-2xl font-bold">Gastronomy Comparison Matrix</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Compare ingredients, serving sizes, prep times, and prices across royal dishes
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Matrix Table */}
          {selectedDishes.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-stone-400 text-sm">No dishes selected for comparison.</p>
              <button
                onClick={() => setSelectedDishes([DISHES[0], DISHES[1]])}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase"
              >
                Load Sample Comparison
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-[#D4AF37] w-36">
                      Attribute
                    </th>
                    {selectedDishes.map(dish => (
                      <th key={dish.id} className="p-3 text-center min-w-[180px] align-top">
                        <div className="space-y-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 relative">
                          <button
                            onClick={() => handleRemoveDish(dish.id)}
                            className="absolute top-2 right-2 p-1 rounded-full text-stone-400 hover:text-rose-500"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-16 h-16 rounded-xl object-cover mx-auto"
                          />
                          <p className="font-serif-display font-bold text-sm line-clamp-1">{dish.name}</p>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold">
                            {dish.category}
                          </span>
                        </div>
                      </th>
                    ))}

                    {selectedDishes.length < 4 && (
                      <th className="p-3 text-center min-w-[140px] align-middle">
                        <button
                          onClick={() => setIsAdding(!isAdding)}
                          className="w-full h-36 rounded-2xl border-2 border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors space-y-1"
                        >
                          <Plus className="w-6 h-6" />
                          <span className="text-xs font-bold">Add Dish</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                  {/* Price Row */}
                  <tr>
                    <td className="p-3 font-bold text-[#D4AF37]">Price (MAD / USD)</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center font-bold text-[#E5C158]">
                        {dish.priceMAD} MAD (~${dish.priceUSD})
                      </td>
                    ))}
                  </tr>

                  {/* Servings Row */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Servings</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center">
                        {dish.servings}
                      </td>
                    ))}
                  </tr>

                  {/* Prep Time Row */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Prep Time</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center">
                        {dish.prepTimeMinutes} Mins
                      </td>
                    ))}
                  </tr>

                  {/* Spice Level */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Spice & Aroma</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center">
                        {dish.spiceLevel || 'Mild'}
                      </td>
                    ))}
                  </tr>

                  {/* Key Ingredients */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Key Ingredients</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center text-[11px] font-light">
                        {dish.ingredients.slice(0, 4).join(', ')}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Rating</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center font-bold text-[#D4AF37]">
                        ★ {dish.rating.toFixed(2)} ({dish.reviewCount})
                      </td>
                    ))}
                  </tr>

                  {/* Action Add to Bag Row */}
                  <tr>
                    <td className="p-3 font-bold text-stone-500">Action</td>
                    {selectedDishes.map(dish => (
                      <td key={dish.id} className="p-3 text-center">
                        <button
                          onClick={() => onAddToCart(dish, 1)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Selector Drawer when clicking Add Dish */}
          {isAdding && (
            <div className="p-4 rounded-2xl bg-black/10 dark:bg-white/5 border border-[#D4AF37]/30 space-y-3">
              <p className="text-xs font-bold text-[#D4AF37] uppercase">Choose a dish to add:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                {DISHES.filter(d => !selectedDishes.some(sd => sd.id === d.id)).map(dish => (
                  <button
                    key={dish.id}
                    onClick={() => handleAddDish(dish)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:border-[#D4AF37] border text-left flex items-center space-x-2"
                  >
                    <img src={dish.imageUrl} alt={dish.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-[11px] font-bold truncate">{dish.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

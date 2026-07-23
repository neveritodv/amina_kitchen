import React from 'react';
import { motion } from 'motion/react';
import { CategoryType } from '../types';

interface CategoryBarProps {
  categories: CategoryType[];
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full my-6 overflow-hidden">
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 px-4 sm:px-0 scroll-smooth">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'text-[#121A13] font-bold shadow-md'
                  : 'text-[#2A2421]/80 dark:text-[#F7F3E9]/80 hover:text-[#D4AF37] bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

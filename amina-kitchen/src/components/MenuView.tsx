import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Scale, ChevronRight, Crown, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { DISHES } from '../data/dishes';
import { Dish, CategoryType } from '../types';
import { CategoryBar } from './CategoryBar';
import { DishCard } from './DishCard';
import { ChefRecommendationSection } from './ChefRecommendationSection';
import { LuxurySelect } from './LuxurySelect';

const CATEGORIES: CategoryType[] = [
  'All',
  'Traditional Meals',
  'Chicken',
  'Seafood',
  'Pastries',
  'Desserts',
  'Traditional Bread',
  'Cookies',
  'Sweets',
  'Wedding Catering',
  'Ramadan',
  'Family Meals',
  'Luxury Catering'
];

interface MenuViewProps {
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity?: number, instructions?: string) => void;
  onOpenComparison: () => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onOpenComparison
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');

  // Filter and sort dishes
  const filteredDishes = useMemo(() => {
    let list = DISHES;

    if (selectedCategory !== 'All') {
      list = list.filter(d => d.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          (d.arabicName && d.arabicName.includes(q))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.priceMAD - b.priceMAD);
      case 'price-desc':
        return [...list].sort((a, b) => b.priceMAD - a.priceMAD);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'name':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* SEO Metadata Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Menu',
            name: 'Amina Kitchen Royal Menu',
            description: 'Complete collection of imperial Moroccan pastries, pigeon pastillas, tagines, briouates, and catering menus.',
            hasMenuItem: DISHES.map(d => ({
              '@type': 'MenuItem',
              name: d.name,
              description: d.description,
              offers: {
                '@type': 'Offer',
                price: d.priceMAD,
                priceCurrency: 'MAD'
              }
            }))
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400 border-b border-[#D4AF37]/20 pb-3">
        <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#D4AF37] font-semibold">Menu Collection</span>
      </div>

      {/* Luxury Hero Banner for Menu Page */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#121A13] via-[#1C281D] to-[#121A13] border border-[#D4AF37]/40 shadow-2xl text-[#F7F3E9] overflow-hidden space-y-4">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Crown className="w-64 h-64 text-[#D4AF37]" />
        </div>

        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Fassi Culinary Heritage</span>
          </span>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Royal Moroccan Culinary Menu
          </h1>

          <p className="text-sm text-stone-300 font-light leading-relaxed">
            Select from our royal pastillas, saffron poultry, High Atlas honey briouates, and traditional sourdough breads crafted by master artisan cooks.
          </p>
        </div>

        {/* Quick Search & Filter Controls */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, ingredient, or Arabic..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <LuxurySelect
              value={sortBy}
              onChange={(val) => setSortBy(val as any)}
              options={[
                { value: 'featured', label: 'Featured / Royal Order' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Customer Rating' },
                { value: 'name', label: 'Alphabetical' }
              ]}
            />
          </div>

          {/* Compare Matrix Button */}
          <div className="md:col-span-3">
            <button
              onClick={onOpenComparison}
              className="w-full h-full py-3 px-4 rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Dishes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chef Recommendations Section */}
      <ChefRecommendationSection
        dishes={DISHES}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onQuickView={(dish) => navigate(`/menu/${dish.id}`)}
      />

      {/* Category Selection Filter Chips */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-display text-2xl font-bold">
            Browse by Category ({filteredDishes.length} Items Found)
          </h2>
        </div>

        <CategoryBar
          categories={CATEGORIES}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isFavorite={favoriteIds.has(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onQuickView={(d) => navigate(`/menu/${d.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4 glass-card border border-[#D4AF37]/30 rounded-3xl p-8">
          <p className="font-serif-display text-2xl font-bold text-stone-500">No dishes match your query</p>
          <p className="text-xs text-stone-400">Try adjusting your category filter or search keywords.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-6 py-2.5 rounded-2xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

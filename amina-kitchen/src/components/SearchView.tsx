import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Sparkles, Filter, X } from 'lucide-react';
import { DISHES } from '../data/dishes';
import { Dish } from '../types';
import { DishCard } from './DishCard';
import { SearchInput } from './FormControls';
import { LuxurySlider } from './LuxurySlider';

interface SearchViewProps {
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity?: number, instructions?: string) => void;
}

const QUICK_TAGS = ['Pastilla', 'Chicken', 'Seafood', 'Briouates', 'Baklava', 'Ramadan', 'Wedding', 'Tajine'];

export const SearchView: React.FC<SearchViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onAddToCart
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const results = useMemo(() => {
    let list = DISHES.filter(d => d.priceMAD <= maxPrice);

    if (!query.trim()) return list;

    const q = query.toLowerCase();
    return list.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        (d.arabicName && d.arabicName.includes(q)) ||
        d.ingredients.some(i => i.toLowerCase().includes(q))
    );
  }, [query, maxPrice]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400 border-b border-[#D4AF37]/20 pb-3">
        <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#D4AF37] font-semibold">Concierge Search Engine</span>
      </div>

      {/* Main Search Panel */}
      <div className="p-8 rounded-3xl bg-[#121A13] border border-[#D4AF37]/40 text-[#F7F3E9] space-y-6 shadow-2xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Search Royal Gastronomy</span>
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-extrabold">
            Search Dishes, Spices & Pastries
          </h1>
        </div>

        {/* Input Field */}
        <div>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Type dish name, ingredient (e.g. Saffron, Almonds), or Arabic name..."
            onClear={() => setQuery('')}
          />
        </div>

        {/* Quick Search Chips */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Popular Queries:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-medium text-stone-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="pt-2 border-t border-white/10">
          <LuxurySlider
            label="Max Investment"
            unit="MAD"
            min={50}
            max={1000}
            step={50}
            value={maxPrice}
            onChange={setMaxPrice}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-2xl font-bold">
          Search Results ({results.length} Matches)
        </h2>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {results.map((dish) => (
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
          <p className="font-serif-display text-2xl font-bold text-stone-500">No dishes match "{query}"</p>
          <p className="text-xs text-stone-400">Try searching for "Pastilla", "Saffron", "Chicken", or "Briouat".</p>
          <button
            onClick={() => { setQuery(''); setMaxPrice(1000); }}
            className="px-6 py-2.5 rounded-2xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, Sparkles, ArrowRight, Utensils, Trash2 } from 'lucide-react';
import { Dish } from '../types';
import { SearchInput } from './FormControls';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({
  isOpen,
  onClose,
  dishes,
  onSelectDish
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('amina_recent_searches') || '["Pastilla", "Tagine", "Pastries", "Saffron"]');
    } catch {
      return ["Pastilla", "Tagine", "Pastries", "Saffron"];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const saveSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('amina_recent_searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('amina_recent_searches');
  };

  const filteredDishes = query.trim()
    ? dishes.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        (d.arabicName && d.arabicName.includes(query)) ||
        d.description.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase()) ||
        d.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSuggestions = ['Royal Pigeon Pastilla', 'Seafood Pastilla', 'Chicken M\'hammar', 'Briouats', 'Gazelle Horns', 'Iftar Box'];

  // Helper function to highlight matching text query
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-[#D4AF37]/40 text-[#D4AF37] font-semibold rounded px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[#D4AF37]/40 overflow-hidden shadow-2xl z-10 text-[#2A2421] dark:text-[#F7F3E9] my-6"
        >
          {/* Input Header */}
          <div className="relative p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search royal dishes, spices, pastilla, tagine, pastries..."
              onClear={() => setQuery('')}
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] bg-stone-200 dark:bg-stone-800 rounded text-stone-500 font-mono">
              ESC
            </kbd>
          </div>

          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* If query entered -> Show Live Filtered Results */}
            {query.trim() !== '' ? (
              filteredDishes.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Matches ({filteredDishes.length})
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {filteredDishes.map((dish) => (
                      <button
                        key={dish.id}
                        onClick={() => {
                          saveSearch(query);
                          onSelectDish(dish);
                          onClose();
                        }}
                        className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-[#D4AF37]/30 transition-all text-left group"
                      >
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]/30"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif-display font-bold text-sm sm:text-base text-[#2A2421] dark:text-[#F7F3E9] group-hover:text-[#D4AF37] transition-colors">
                            {highlightMatch(dish.name, query)}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                            {highlightMatch(dish.description, query)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif-display font-bold text-sm text-[#E5C158] block">
                            {dish.priceMAD} MAD
                          </span>
                          <span className="text-[10px] text-[#D4AF37] font-medium">{dish.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Animated Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mx-auto flex items-center justify-center text-[#D4AF37]">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-display text-lg font-bold">No Royal Dishes Found</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    We couldn't find any dish matching "<span className="text-[#D4AF37] font-semibold">{query}</span>". Try searching for "Pastilla", "Briouat", or "Chicken".
                  </p>
                </motion.div>
              )
            ) : (
              /* If no query entered -> Show Suggestions & Recent Searches */
              <div className="space-y-6">
                {/* Popular Dishes */}
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Popular Suggestions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSuggestions.map((sug) => (
                      <button
                        key={sug}
                        onClick={() => setQuery(sug)}
                        className="px-3.5 py-1.5 rounded-full text-xs bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 hover:border-[#D4AF37] transition-all"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Recent Searches</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-[10px] text-stone-400 hover:text-red-400 flex items-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 hover:border-[#D4AF37] flex items-center space-x-2 transition-all"
                        >
                          <span>{term}</span>
                          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

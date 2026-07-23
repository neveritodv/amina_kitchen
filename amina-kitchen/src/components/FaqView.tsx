import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Ordering & Delivery',
    question: 'How far in advance should I place a daily meal or pastry order?',
    answer: 'For individual dishes and pastry platters, we recommend ordering at least 4 to 6 hours in advance. For large pastillas and celebration tagines, 24 hours notice allows our chefs to source fresh market ingredients and slow-braise to perfection.'
  },
  {
    id: 'faq-2',
    category: 'Ordering & Delivery',
    question: 'What cities do you deliver to in Morocco?',
    answer: 'We provide daily refrigerated door-to-door delivery across Marrakesh, Casablanca, Rabat, and Fes. Express temperature-controlled courier delivery is available for dry pastries and cookies nationwide.'
  },
  {
    id: 'faq-3',
    category: 'Dietary & Halal',
    question: 'Are all ingredients 100% Halal certified?',
    answer: 'Yes, 100%. All meat, poultry, and game are strictly Halal certified from free-range Atlas mountain farms. We never use artificial preservatives, pork derivatives, or synthetic flavorings.'
  },
  {
    id: 'faq-4',
    category: 'Dietary & Halal',
    question: 'Do you offer gluten-free or vegetarian Moroccan dishes?',
    answer: 'We offer a rich selection of vegetarian tagines, fresh salads, almond pastries, and gluten-free corn/rice pastry alternatives. Special dietary requests can be added during checkout.'
  },
  {
    id: 'faq-5',
    category: 'Catering & Events',
    question: 'What is included in your Royal Wedding Catering package?',
    answer: 'Our full wedding package includes multi-course traditional banquets (Pastilla, Mechoui, Chicken Mhammar), full silver tea ceremony tables, traditional uniformed waitstaff, fine porcelain dishware, and copper heating chafing dishes.'
  },
  {
    id: 'faq-6',
    category: 'Catering & Events',
    question: 'Can you provide on-site private chefs for private Riads or villas?',
    answer: 'Yes. Our master chefs and service staff can arrive at your private Riad or villa in Marrakesh, Essaouira, or Casablanca to prepare live multi-course feasts in your kitchen.'
  },
  {
    id: 'faq-7',
    category: 'Preparation & Reheating',
    question: 'How should I reheat a Pigeon or Seafood Pastilla at home?',
    answer: 'Preheat your oven to 180°C (350°F). Place the pastilla on a baking sheet lined with parchment paper for 12–15 minutes until the warka dough crispness is restored. Do not microwave.'
  }
];

export const FaqView: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1', 'faq-5']));

  const categories = ['All', 'Ordering & Delivery', 'Dietary & Halal', 'Catering & Events', 'Preparation & Reheating'];

  const toggleOpen = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredFaqs = FAQ_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Frequently Asked Questions</span>
        </span>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
          Everything You Need to Know
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Find answers about ordering lead times, nationwide delivery, dietary customizations, and private wedding catering.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g., pastilla reheating, delivery, halal)..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-[#D4AF37] text-[#121A13] shadow-md'
                : 'bg-black/5 dark:bg-white/5 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map(faq => {
          const isOpen = openIds.has(faq.id);
          return (
            <div
              key={faq.id}
              className="rounded-2xl glass-card border border-[#D4AF37]/20 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleOpen(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                    {faq.category}
                  </span>
                  <span className="font-serif-display font-bold text-sm sm:text-base text-[#2A2421] dark:text-[#F7F3E9]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-5 pt-0 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light border-t border-stone-200 dark:border-stone-800/60 mt-1">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-8 rounded-3xl bg-[#121A13] text-[#F7F3E9] border border-[#D4AF37]/30 text-center space-y-4">
        <h3 className="font-serif-display text-xl font-bold">Have a Custom Requirement?</h3>
        <p className="text-xs text-stone-300 max-w-md mx-auto font-light">
          Our royal concierge is ready to assist you with tailored menus, allergic requirements, or custom banquet setups.
        </p>
        <div className="flex justify-center">
          <WhatsAppButton variant="primary" text="Contact Concierge" />
        </div>
      </div>
    </div>
  );
};

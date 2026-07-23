import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Sparkles, CheckCircle, Send } from 'lucide-react';
import { TextInput } from './FormControls';
import { LuxurySelect } from './LuxurySelect';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  event: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Lalla Sofia & Moulay Omar',
    role: 'Bride & Groom',
    event: 'Royal Wedding Banquet (350 Guests)',
    rating: 5,
    comment: 'Amina Kitchen managed our wedding reception at Palais Namaskar. The Pigeon Pastillas and Lamb Mechoui were the talk of the evening. The silver tea service was executed with breathtaking royal elegance.',
    date: 'October 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    name: 'Sir Arthur Montgomery',
    role: 'Diplomatic Host',
    event: 'Private Riad Dinner (24 Guests)',
    rating: 5,
    comment: 'The Atlantic Seafood Pastilla and Saffron Chicken M’hammar cooked live in our Medina Riad was the finest culinary experience we had in Morocco. Truly Michelin-caliber royal heritage food.',
    date: 'December 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    name: 'Madame Kenza El Fassi',
    role: 'Corporate Director',
    event: 'Ramadan Iftar Gala (120 Guests)',
    rating: 5,
    comment: 'Unmatched authenticity! The Harira tureen, Chebakia sesame roses, and warm Msemmen crepes were served seamlessly. Every single executive left impressed by the warmth and quality.',
    date: 'March 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  }
];

export const TestimonialsView: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', event: 'Private Dinner', rating: 5, comment: '' });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const item: Testimonial = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      role: 'Verified Client',
      event: newReview.event,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    };
    setReviews([item, ...reviews]);
    setShowAddForm(false);
    setNewReview({ name: '', event: 'Private Dinner', rating: 5, comment: '' });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Client Testimonials & Praise</span>
        </span>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
          Voices of Royal Celebrations
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Read reviews from diplomats, wedding couples, and private dinner hosts who entrusted their most memorable celebrations to Amina Kitchen.
        </p>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-all shadow-md"
        >
          {showAddForm ? 'Close Review Form' : 'Share Your Experience'}
        </button>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto p-6 rounded-3xl glass-panel border border-[#D4AF37]/40 space-y-4"
        >
          <h3 className="font-serif-display text-lg font-bold text-[#D4AF37]">Write a Review</h3>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                required
                placeholder="Your Name"
                value={newReview.name}
                onChange={e => setNewReview({ ...newReview, name: e.target.value })}
              />
              <LuxurySelect
                value={newReview.event}
                onChange={val => setNewReview({ ...newReview, event: val })}
                options={[
                  { value: 'Wedding Reception', label: 'Wedding Reception' },
                  { value: 'Private Riad Dinner', label: 'Private Riad Dinner' },
                  { value: 'Corporate Event', label: 'Corporate Event' },
                  { value: 'Home Delivery', label: 'Home Delivery' }
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              required
              placeholder="Tell us about the flavors, presentation, and service..."
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-3 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </form>
        </motion.div>
      )}

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(rev => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl glass-card border border-[#D4AF37]/20 flex flex-col justify-between space-y-4 relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#D4AF37]/15" />

            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-3">
              <img
                src={rev.avatarUrl}
                alt={rev.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
              />
              <div>
                <p className="font-serif-display font-bold text-xs text-[#2A2421] dark:text-[#F7F3E9] flex items-center space-x-1">
                  <span>{rev.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                </p>
                <p className="text-[10px] text-[#D4AF37]">{rev.event}</p>
                <p className="text-[10px] text-stone-400">{rev.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

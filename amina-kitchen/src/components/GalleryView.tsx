import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Instagram,
  Heart,
  MapPin,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Sparkles,
  ChevronRight as ArrowChevron,
  Grid,
  Filter
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';

const CATEGORIES = ['All', 'Traditional Meals', 'Pastries', 'Desserts', 'Bread', 'Kitchen', 'Events'];

export const GalleryView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null && filteredItems.length > 0) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null && filteredItems.length > 0) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleCategoryChange = (cat: string) => {
    setIsLoading(true);
    setSelectedCategory(cat);
    setSelectedItemIndex(null);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* SEO Metadata Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Amina Kitchen Royal Visual Journal',
            description: 'Exclusive visual gallery of royal Moroccan banquets, pigeon pastillas, Fassi confections, and high-society wedding setups.',
            url: window.location.href
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400 border-b border-[#D4AF37]/20 pb-3">
        <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors">Home</button>
        <ArrowChevron className="w-3.5 h-3.5" />
        <span className="text-[#D4AF37] font-semibold">Visual Journal & Gallery</span>
      </div>

      {/* Fullscreen Luxury Hero Header */}
      <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#121A13] via-[#1C281D] to-[#121A13] border border-[#D4AF37]/40 shadow-2xl text-[#F7F3E9] overflow-hidden space-y-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Instagram className="w-4 h-4 text-[#E5C158]" />
          <span>@AminaKitchenOfficial</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
          Visual Journal of Gastronomy
        </h1>

        <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
          Behind the scenes at our Medina atelier. Inspect handcrafted warka leaves, High Atlas honey glazes, and private royal banquet installations in Marrakesh.
        </p>

        {/* Category Filter Tabs */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 relative z-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#D4AF37] text-[#121A13] shadow-lg scale-105'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Masonry Grid or Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-80 rounded-3xl bg-stone-200 dark:bg-stone-800 animate-pulse border border-[#D4AF37]/20" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pt-4">
          {filteredItems.map((item, index) => {
            const isLiked = likedMap[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedItemIndex(index)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer glass-card border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Hover Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37] text-[#121A13]">
                      {item.category}
                    </span>

                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-all"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {item.location && (
                      <div className="flex items-center space-x-1 text-xs text-[#D4AF37]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    <h4 className="font-serif-display font-bold text-lg leading-tight">{item.title}</h4>
                    <p className="text-xs text-stone-300 line-clamp-2 font-light">{item.caption}</p>

                    <div className="pt-2 flex items-center justify-between text-xs text-stone-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                        <span>{item.likes + (isLiked ? 1 : 0)} likes</span>
                      </span>
                      <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Lightbox</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4 glass-card border border-[#D4AF37]/30 rounded-3xl p-8">
          <p className="font-serif-display text-xl font-bold">No gallery items in this category</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-6 py-2.5 rounded-2xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase"
          >
            Show All Media
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full rounded-3xl glass-panel border border-[#D4AF37]/40 overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 text-white"
            >
              <button
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white z-20 hover:scale-110 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white z-20 hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#D4AF37]" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white z-20 hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-[#D4AF37]" />
              </button>

              <div className="md:col-span-7 bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4 bg-[#121A13]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
                    <Instagram className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">Amina Kitchen Gallery</span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-bold">{activeItem.title}</h3>

                  {activeItem.location && (
                    <div className="flex items-center space-x-1 text-xs text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{activeItem.location}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeItem.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleLike(activeItem.id)}
                    className="flex items-center space-x-2 text-xs font-semibold hover:text-red-400 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedMap[activeItem.id] ? 'fill-red-500 text-red-500' : 'text-stone-300'
                      }`}
                    />
                    <span>{activeItem.likes + (likedMap[activeItem.id] ? 1 : 0)} Likes</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: activeItem.title,
                          text: activeItem.caption,
                          url: window.location.href
                        });
                      }
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D4AF37]"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

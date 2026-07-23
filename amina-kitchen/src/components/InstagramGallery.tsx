import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Instagram, MapPin, Eye, X, ChevronLeft, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';

export const InstagramGallery: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const activeItem = selectedItemIndex !== null ? GALLERY_ITEMS[selectedItemIndex] : null;

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Instagram className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>@AminaKitchenOfficial</span>
        </span>

        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A2421] dark:text-[#F7F3E9]">
          Instagram Moments & Moments of Gastronomy
        </h2>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Explore our visual journal of handcrafted pastries, private royal banquet setups, and culinary craftsmanship in the heart of Marrakesh.
        </p>
      </div>

      {/* Masonry Grid - Single column on mobile & tablet */}
      <div className="columns-1 lg:columns-3 gap-6 space-y-6">
        {GALLERY_ITEMS.map((item, index) => {
          const isLiked = likedMap[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItemIndex(index)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer glass-card border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 shadow-md hover:shadow-2xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#121A13]">
                    {item.category}
                  </span>

                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all"
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
                      <span>View Lightbox</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full rounded-3xl glass-panel border border-[#D4AF37]/40 overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white z-20 hover:scale-110 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white z-20 hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#D4AF37]" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white z-20 hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-[#D4AF37]" />
              </button>

              {/* Image View */}
              <div className="md:col-span-7 bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Lightbox Sidebar Info */}
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
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, MapPin, Heart } from 'lucide-react';

interface LightboxModalProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
  location?: string;
  caption?: string;
  likes?: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  initialIndex = 0,
  onClose,
  title,
  location,
  caption,
  likes
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between text-white z-10">
          <div className="space-y-0.5">
            {title && <h3 className="font-serif-display text-lg font-bold text-[#E5C158]">{title}</h3>}
            {location && (
              <p className="text-xs text-stone-400 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span>{location}</span>
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-stone-400 font-bold">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              onClick={toggleZoom}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Toggle Zoom"
            >
              {zoomLevel === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage: Image Viewer */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4 select-none">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: zoomLevel }}
            transition={{ duration: 0.3 }}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl cursor-pointer"
            onClick={toggleZoom}
            onContextMenu={(e) => e.preventDefault()} // Disable right click image download
          />

          {/* Nav Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Footer Info */}
        <div className="text-center text-white space-y-2 max-w-xl mx-auto z-10">
          {caption && <p className="text-xs sm:text-sm text-stone-300 font-light italic">"{caption}"</p>}

          {likes !== undefined && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-400 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{likes.toLocaleString()} Likes</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

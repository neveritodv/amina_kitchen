import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { Sparkles } from 'lucide-react';

interface PageTransitionLoaderProps {
  isLoading?: boolean;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ isLoading: externalIsLoading }) => {
  const location = useLocation();
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    // Trigger cinematic page transition on every route change
    setInternalLoading(true);
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 700); // 700ms 60 FPS duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const active = externalIsLoading || internalLoading;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121A13] text-[#F7F3E9] p-4 pointer-events-none select-none overflow-hidden"
        >
          {/* Moroccan Radial Zellige Pattern Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />

          {/* Floating Gold Particles (GPU Accelerated) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, x: (i - 4) * 80 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [-50, -200],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
                className="absolute bottom-10 left-1/2 w-1.5 h-1.5 rounded-full bg-[#E5C158] shadow-[0_0_10px_#D4AF37]"
              />
            ))}
          </div>

          {/* Central Rotating Moroccan Geometric Arch & Logo */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Animated Outer Moroccan Star */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 text-[#D4AF37]/30"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </motion.div>

            {/* Tagine Steam Wiggles */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex space-x-2 opacity-80">
              <motion.div
                animate={{ y: [-4, -12, -4], opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-6 rounded-full bg-gradient-to-t from-transparent via-[#E5C158] to-transparent"
              />
              <motion.div
                animate={{ y: [-2, -14, -2], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                className="w-1 h-8 rounded-full bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent"
              />
              <motion.div
                animate={{ y: [-4, -10, -4], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
                className="w-1 h-6 rounded-full bg-gradient-to-t from-transparent via-[#E5C158] to-transparent"
              />
            </div>

            {/* Sole Brand Source of Truth: Transparent Logo */}
            <motion.div
              animate={{ scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <BrandLogo variant="loader" />
            </motion.div>
          </div>

          {/* Progress Bar & Subtitle */}
          <div className="mt-6 flex flex-col items-center space-y-3 max-w-xs w-full">
            <div className="flex items-center space-x-2 text-xs text-[#E5C158] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Amina Kitchen Concierge</span>
            </div>

            {/* Gold Loading Line */}
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); // wait for fade out animation
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121A13] text-[#F7F3E9] overflow-hidden select-none"
        >
          {/* Subtle Zellige Geometric Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none" 
            style={{
              backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#D4AF37 1px, #121A13 1px)`,
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px'
            }}
          />

          {/* Floating Gold Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 20,
                  opacity: 0,
                  scale: Math.random() * 0.8 + 0.4
                }}
                animate={{
                  y: -50,
                  opacity: [0, 0.7, 0],
                  x: `calc(${Math.random() * window.innerWidth}px + ${(i % 2 === 0 ? 30 : -30)}px)`
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px]"
              />
            ))}
          </div>

          {/* Moroccan Arch Frame Line Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Soft Steam Animation */}
            <div className="relative mb-6 flex justify-center">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: -25, opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 w-8 h-12 bg-gradient-to-t from-[#D4AF37]/30 to-transparent blur-md rounded-full"
              />
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: -30, opacity: [0, 0.4, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                className="absolute -top-12 w-12 h-16 bg-gradient-to-t from-[#E5C158]/20 to-transparent blur-lg rounded-full"
              />

              {/* Amina Kitchen Emblem / Logo Frame */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#D4AF37]/30 flex items-center justify-center p-3 shadow-[0_0_50px_rgba(212,175,55,0.25)] bg-[#18221a]">
                {/* Rotating Arch Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/40"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <BrandLogo variant="splash" />
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-3"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xs md:text-sm tracking-[0.3em] font-light text-[#D4AF37] uppercase"
            >
              Royal Moroccan Culinary Artistry
            </motion.p>
          </motion.div>

          {/* Bottom Loading Progress Bar */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-[#243326] rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Home, Flame, Sparkles } from 'lucide-react';

interface NotFoundViewProps {
  onBackHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onBackHome }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-6 text-center text-[#2A2421] dark:text-[#F7F3E9] overflow-hidden">
      {/* Zellige Background Texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-[#D4AF37]/40 blur-[1px]"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg space-y-6"
      >
        {/* Animated Moroccan Lantern & Arch Icon */}
        <div className="relative w-28 h-28 mx-auto rounded-full bg-[#121A13] border border-[#D4AF37]/50 flex items-center justify-center p-4 shadow-[0_0_50px_rgba(212,175,55,0.25)]">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-md"
          />
          <Flame className="w-12 h-12 text-[#E5C158] animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-serif-display text-6xl font-bold tracking-widest text-[#D4AF37] block">
            404
          </span>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
            The Dish You Seek Has Departed The Riad
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light max-w-md mx-auto">
            This culinary corridor does not exist or has been relocated to another wing of the kitchen.
          </p>
        </div>

        <button
          onClick={onBackHome}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Royal Table</span>
        </button>
      </motion.div>
    </div>
  );
};

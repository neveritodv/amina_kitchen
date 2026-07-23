import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger Golden Confetti Particles Burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#E5C158', '#2C3E2B', '#FAF7F2']
        });
      } catch (err) {}

      // Trigger soft device vibration feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl glass-panel border border-[#D4AF37]/50 p-8 text-center z-10 text-[#2A2421] dark:text-[#F7F3E9] shadow-2xl overflow-hidden"
        >
          {/* Subtle Golden Glow Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Golden Checkmark Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2C3E2B] via-[#D4AF37] to-[#E5C158] p-1 mx-auto mb-6 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <div className="w-full h-full rounded-full bg-[#121A13] flex items-center justify-center text-[#D4AF37]">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
          </motion.div>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Order Request Received</span>
          </span>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold mb-2">
            Thank you for choosing Amina Kitchen
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-300 font-light mb-6 leading-relaxed">
            Your royal order request has been directed to Chef Amina’s team via WhatsApp. We will confirm preparation timing and delivery details momentarily.
          </p>

          {orderDetails && (
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 text-left text-xs space-y-1 mb-6">
              <p><span className="text-[#D4AF37] font-semibold">Guest:</span> {orderDetails.customerName}</p>
              <p><span className="text-[#D4AF37] font-semibold">Contact:</span> {orderDetails.customerPhone}</p>
              <p><span className="text-[#D4AF37] font-semibold">Scheduled Date:</span> {orderDetails.deliveryDate}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Return to Royal Table</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Send, Phone, Calendar, MapPin, User, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { OrderItem, OrderDetails } from '../types';
import { WhatsAppButton } from './WhatsAppButton';
import { LuxuryDatePicker } from './LuxuryDatePicker';
import { LuxuryTimePicker } from './LuxuryTimePicker';

interface FloatingOrderSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrderItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderDetails: OrderDetails) => void;
}

export const FloatingOrderSummary: React.FC<FloatingOrderSummaryProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) => {
  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTime: '19:00',
    note: ''
  });

  const [step, setStep] = useState<'cart' | 'details'>('cart');

  const totalMAD = cart.reduce((sum, item) => sum + item.dish.priceMAD * item.quantity, 0);
  const totalUSD = cart.reduce((sum, item) => sum + item.dish.priceUSD * item.quantity, 0);

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!details.customerName || !details.customerPhone) {
      alert('Please enter your name and phone number so Amina Kitchen can confirm your order.');
      return;
    }

    // Format WhatsApp Order Message
    let message = `*🕌 AMINA KITCHEN — ROYAL ORDER REQUEST*\n`;
    message += `───────────────────────\n`;
    message += `*Customer:* ${details.customerName}\n`;
    message += `*Phone:* ${details.customerPhone}\n`;
    if (details.deliveryAddress) message += `*Delivery Address:* ${details.deliveryAddress}\n`;
    message += `*Date & Time:* ${details.deliveryDate} at ${details.deliveryTime}\n`;
    message += `───────────────────────\n\n`;
    message += `*ORDERED DISHES:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.dish.name}* (x${item.quantity})\n`;
      message += `   • Price: ${item.dish.priceMAD * item.quantity} MAD\n`;
      if (item.specialInstructions) {
        message += `   • Request: _${item.specialInstructions}_\n`;
      }
    });

    message += `\n───────────────────────\n`;
    message += `*TOTAL ESTIMATE:* ${totalMAD} MAD (~$${totalUSD})\n`;
    if (details.note) message += `*Notes:* ${details.note}\n`;
    message += `───────────────────────\n`;
    message += `_Thank you for choosing Amina Kitchen!_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212600000000?text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    // Trigger Order Success Experience
    onOrderSuccess(details);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg h-full glass-panel border-l border-[#D4AF37]/30 shadow-2xl z-10 flex flex-col justify-between text-[#2A2421] dark:text-[#F7F3E9]"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif-display text-xl font-bold">Your Royal Order</h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {cart.length} dish{cart.length !== 1 ? 'es' : ''} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto opacity-40" />
                <h4 className="font-serif-display text-lg font-bold">Your Order is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our royal Moroccan dishes and add your favorites to build your custom feast.
                </p>
              </div>
            ) : step === 'cart' ? (
              /* Itemized Cart List */
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.dish.id}
                    className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 flex items-center space-x-3"
                  >
                    <img
                      src={item.dish.imageUrl}
                      alt={item.dish.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/30"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-display font-bold text-sm truncate">{item.dish.name}</h4>
                      <span className="font-serif-display font-bold text-xs text-[#E5C158]">
                        {item.dish.priceMAD * item.quantity} MAD
                      </span>
                      {item.specialInstructions && (
                        <p className="text-[10px] text-stone-400 italic truncate mt-0.5">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-stone-200 dark:bg-stone-800 p-1 rounded-xl">
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                        className="p-1 hover:text-[#D4AF37]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                        className="p-1 hover:text-[#D4AF37]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="p-1.5 text-stone-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Order Form Details Step */
              <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#D4AF37] mb-1">
                      Customer Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <input
                        required
                        type="text"
                        value={details.customerName}
                        onChange={(e) => setDetails({ ...details, customerName: e.target.value })}
                        placeholder="Lalla Fatima Zohra"
                        className="w-full pl-9 p-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#D4AF37] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <input
                        required
                        type="tel"
                        value={details.customerPhone}
                        onChange={(e) => setDetails({ ...details, customerPhone: e.target.value })}
                        placeholder="+212 600 000 000"
                        className="w-full pl-9 p-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#D4AF37] mb-1">
                      Delivery Address / Hotel / Riad
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={details.deliveryAddress}
                        onChange={(e) => setDetails({ ...details, deliveryAddress: e.target.value })}
                        placeholder="Riad Al Jazira, Medina Marrakesh"
                        className="w-full pl-9 p-2.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <LuxuryDatePicker
                      label="Preferred Date"
                      value={details.deliveryDate}
                      onChange={(val) => setDetails({ ...details, deliveryDate: val })}
                      placeholder="Choose Date..."
                    />

                    <LuxuryTimePicker
                      label="Preferred Time"
                      value={details.deliveryTime}
                      onChange={(val) => setDetails({ ...details, deliveryTime: val })}
                      placeholder="Choose Time..."
                    />
                  </div>
                </div>

                <WhatsAppButton variant="primary" text="Send Order via WhatsApp" fullWidth />
              </form>
            )}
          </div>

          {/* Footer Total & Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 space-y-3 bg-black/5 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-500">Estimated Total</span>
                <div className="text-right">
                  <span className="font-serif-display font-bold text-xl text-[#E5C158]">{totalMAD} MAD</span>
                  <span className="text-xs text-stone-400 block">(~${totalUSD})</span>
                </div>
              </div>

              {step === 'cart' ? (
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+212600000000"
                    className="py-3 px-3 rounded-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-xs text-center flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Call Kitchen</span>
                  </a>

                  <button
                    onClick={() => setStep('details')}
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Proceed to Order</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setStep('cart')}
                  className="w-full py-2 text-xs text-stone-400 hover:text-white underline text-center"
                >
                  ← Back to Order Items
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

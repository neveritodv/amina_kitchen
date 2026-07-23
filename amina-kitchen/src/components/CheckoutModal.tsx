import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Truck,
  Store,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  MessageCircle,
  CheckCircle,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { OrderItem } from '../types';
import { WhatsAppButton } from './WhatsAppButton';
import { LuxuryDatePicker } from './LuxuryDatePicker';
import { LuxuryTimePicker } from './LuxuryTimePicker';
import { TextInput } from './FormControls';

interface CheckoutModalProps {
  cart: OrderItem[];
  onClose: () => void;
  onClearCart: () => void;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cart,
  onClose,
  onClearCart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('12:30');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [requestCallConfirmation, setRequestCallConfirmation] = useState<boolean>(true);

  // Calculations
  const subtotalMAD = cart.reduce((sum, item) => sum + item.dish.priceMAD * item.quantity, 0);
  const deliveryFeeMAD = fulfillmentType === 'delivery' ? 50 : 0;
  const totalMAD = subtotalMAD + deliveryFeeMAD;
  const totalUSD = Math.round(totalMAD / 10);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Format WhatsApp Message
    const orderItemsList = cart
      .map(
        i =>
          `• *${i.quantity}x ${i.dish.name}* (${i.dish.priceMAD * i.quantity} MAD)${
            i.specialInstructions ? ` - Note: ${i.specialInstructions}` : ''
          }`
      )
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `👑 *NEW LUXURY ORDER - AMINA KITCHEN*\n\n` +
        `*Customer:* ${customerName}\n` +
        `*Phone:* ${customerPhone}\n` +
        `*Fulfillment:* ${fulfillmentType.toUpperCase()}\n` +
        `${fulfillmentType === 'delivery' ? `*Address:* ${deliveryAddress}\n` : ''}` +
        `*Date:* ${deliveryDate || 'As soon as possible'}\n` +
        `*Preferred Time:* ${deliveryTime}\n` +
        `*Call Confirmation:* ${requestCallConfirmation ? 'Yes, please call me' : 'WhatsApp only'}\n\n` +
        `*ORDER ITEMS:*\n${orderItemsList}\n\n` +
        `*Subtotal:* ${subtotalMAD} MAD\n` +
        `*Delivery:* ${deliveryFeeMAD} MAD\n` +
        `*Total Investment:* ${totalMAD} MAD (~$${totalUSD} USD)\n\n` +
        `${specialNote ? `*Special Request:* ${specialNote}\n` : ''}` +
        `Please confirm this order and dispatch time slot.`
    );

    // Open WhatsApp
    window.open(`https://wa.me/212600000000?text=${whatsappMessage}`, '_blank');

    setStep('success');
    onClearCart();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-2xl glass-panel border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-[#2A2421] dark:text-[#F7F3E9] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif-display text-2xl font-bold">
                  {step === 'cart'
                    ? 'Review Gourmet Bag'
                    : step === 'details'
                    ? 'Delivery & Concierge Checkout'
                    : 'Order Dispatched'}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {step === 'cart'
                    ? `${cart.length} unique items in your luxury order`
                    : step === 'details'
                    ? 'Specify preferred delivery slot and address across Morocco'
                    : 'Order confirmed with Master Kitchen'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART REVIEW */}
          {step === 'cart' && (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-stone-400 text-sm">Your gourmet bag is currently empty.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase"
                  >
                    Browse Royal Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div
                        key={item.dish.id}
                        className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 flex items-center justify-between space-x-3 text-xs"
                      >
                        <img
                          src={item.dish.imageUrl}
                          alt={item.dish.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 space-y-0.5">
                          <p className="font-serif-display font-bold text-sm">{item.dish.name}</p>
                          <p className="text-[#D4AF37] font-bold">
                            {item.dish.priceMAD * item.quantity} MAD (~${item.dish.priceUSD * item.quantity})
                          </p>
                        </div>

                        {/* Quantity adjust buttons */}
                        <div className="flex items-center space-x-2 bg-stone-200 dark:bg-stone-800 p-1 rounded-xl">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white/20 font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="w-6 h-6 rounded-lg bg-white/20 font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Footer */}
                  <div className="p-4 rounded-2xl bg-[#121A13] text-[#F7F3E9] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase font-bold">Estimated Investment</p>
                      <p className="font-serif-display text-2xl font-bold text-[#E5C158]">
                        {subtotalMAD.toLocaleString()} MAD
                      </p>
                    </div>

                    <button
                      onClick={() => setStep('details')}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
                    >
                      <span>Proceed to Concierge</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: DETAILS & FULFILLMENT FORM */}
          {step === 'details' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              {/* Fulfillment Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('delivery')}
                    className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37]'
                        : 'bg-black/5 dark:bg-white/5 border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Courier Delivery (50 MAD)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37]'
                        : 'bg-black/5 dark:bg-white/5 border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Riad Medina Pickup (Free)</span>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput
                  label="Your Full Name *"
                  required
                  placeholder="e.g. Lalla Sophia Alami"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />

                <TextInput
                  label="Phone / WhatsApp Number *"
                  type="tel"
                  required
                  placeholder="+212 6XX-XXXXXX"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                />
              </div>

              {fulfillmentType === 'delivery' && (
                <div>
                  <TextInput
                    label="Delivery Address (Hotel, Riad, Villa, or City) *"
                    required
                    placeholder="e.g. Riad Jardin Secret, Medina Marrakesh"
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                  />
                </div>
              )}

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <LuxuryDatePicker
                    label="Preferred Date"
                    value={deliveryDate}
                    onChange={setDeliveryDate}
                    placeholder="Choose Date..."
                  />
                </div>

                <div>
                  <LuxuryTimePicker
                    label="Time Slot"
                    value={deliveryTime}
                    onChange={setDeliveryTime}
                    placeholder="Choose Time..."
                  />
                </div>
              </div>

              {/* Call Confirmation Checkbox */}
              <label className="flex items-center space-x-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={requestCallConfirmation}
                  onChange={e => setRequestCallConfirmation(e.target.checked)}
                  className="accent-[#D4AF37] rounded"
                />
                <span>Request phone call confirmation from Master Concierge</span>
              </label>

              {/* Total & Action Button */}
              <div className="p-4 rounded-2xl bg-[#121A13] text-[#F7F3E9] flex items-center justify-between pt-2">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase font-bold">Total (Inc. Delivery)</p>
                  <p className="font-serif-display text-2xl font-bold text-[#E5C158]">
                    {totalMAD.toLocaleString()} MAD
                  </p>
                  <p className="text-[10px] text-stone-400">~ ${totalUSD} USD</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
                  >
                    Back
                  </button>

                  <WhatsAppButton variant="primary" text="Send Order to WhatsApp" />
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-2xl font-bold">Order Sent via WhatsApp!</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Our master chef concierge has received your order details and will confirm your preparation slot immediately.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider"
              >
                Return to Kitchen
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

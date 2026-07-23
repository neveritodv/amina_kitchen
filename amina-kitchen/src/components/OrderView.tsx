import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Trash2, ArrowRight, ShieldCheck, Truck, MessageCircle, Crown, Sparkles } from 'lucide-react';
import { OrderItem } from '../types';
import { WhatsAppButton } from './WhatsAppButton';

interface OrderViewProps {
  cart: OrderItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const OrderView: React.FC<OrderViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout
}) => {
  const navigate = useNavigate();

  const totalMAD = cart.reduce((sum, item) => sum + item.dish.priceMAD * item.quantity, 0);
  const totalUSD = cart.reduce((sum, item) => sum + item.dish.priceUSD * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const summaryText = cart
      .map(
        i => `• *${i.dish.name}* x${i.quantity} = ${i.dish.priceMAD * i.quantity} MAD`
      )
      .join('\n');

    const text = encodeURIComponent(
      `Hello Amina Kitchen Concierge, I would like to place an order from my bag:\n\n${summaryText}\n\n*Total Estimate:* ${totalMAD} MAD (~$${totalUSD} USD)\n\nPlease confirm delivery availability.`
    );
    window.open(`https://wa.me/212600000000?text=${text}`, '_blank');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400 border-b border-[#D4AF37]/20 pb-3">
        <button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/menu')} className="hover:text-[#D4AF37] transition-colors">Menu</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#D4AF37] font-semibold">Your Order Summary</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Royal Banqueting Bag</span>
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-extrabold">
            Your Order & Cart Items
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs font-bold text-stone-400 hover:text-red-500 transition-colors uppercase tracking-wider flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.dish.id}
                className="p-4 sm:p-6 rounded-3xl glass-card border border-[#D4AF37]/30 shadow-md flex flex-col sm:flex-row items-center gap-4 group"
              >
                <img
                  src={item.dish.imageUrl}
                  alt={item.dish.name}
                  onClick={() => navigate(`/menu/${item.dish.id}`)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover cursor-pointer group-hover:scale-105 transition-transform shrink-0"
                />

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                    {item.dish.category}
                  </span>
                  <h3
                    onClick={() => navigate(`/menu/${item.dish.id}`)}
                    className="font-serif-display font-bold text-lg hover:text-[#D4AF37] cursor-pointer transition-colors"
                  >
                    {item.dish.name}
                  </h3>

                  {item.specialInstructions && (
                    <p className="text-xs text-stone-400 italic">
                      Note: "{item.specialInstructions}"
                    </p>
                  )}

                  <p className="text-xs font-bold text-[#D4AF37]">
                    {item.dish.priceMAD} MAD (~${item.dish.priceUSD}) / unit
                  </p>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-stone-800">
                  <div className="flex items-center space-x-2 bg-stone-100 dark:bg-white/10 p-1 rounded-2xl border border-stone-200 dark:border-white/15">
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-xl bg-stone-200 dark:bg-white/10 font-bold flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#121A13] transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold text-xs w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-xl bg-stone-200 dark:bg-white/10 font-bold flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#121A13] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-serif-display font-bold text-base text-[#D4AF37]">
                      {item.dish.priceMAD * item.quantity} MAD
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="text-[10px] text-stone-400 hover:text-red-500 uppercase tracking-wider font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121A13] text-[#F7F3E9] border border-[#D4AF37]/40 shadow-2xl space-y-6">
              <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Royal Concierge Invoice</span>
                </span>
                <h2 className="font-serif-display text-2xl font-bold">Investment Summary</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-bold">{totalMAD} MAD</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Estimated Courier (Marrakesh Medina)</span>
                  <span className="font-bold text-[#D4AF37]">Complimentary</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Thermal Packaging & Saffron Seal</span>
                  <span className="font-bold text-[#D4AF37]">Included</span>
                </div>

                <div className="pt-4 border-t border-white/15 flex justify-between items-baseline">
                  <div>
                    <p className="font-bold uppercase tracking-wider text-stone-400">Total Investment</p>
                    <p className="text-[10px] text-stone-400">~ ${totalUSD} USD</p>
                  </div>
                  <span className="font-serif-display text-3xl font-extrabold text-[#E5C158]">
                    {totalMAD} MAD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onOpenCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:brightness-105 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proceed to Concierge Checkout</span>
                </button>

                <WhatsAppButton variant="secondary" text="Instant WhatsApp Order" fullWidth />
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-[10px] text-stone-400">
                <div className="flex items-center justify-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Heated Courier</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>100% Halal Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 space-y-6 glass-card border border-[#D4AF37]/30 rounded-3xl p-10 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">Your Banqueting Bag is Empty</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Discover our signature pastillas, saffron poultry, and High Atlas honey pastries to begin your culinary order.
            </p>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="px-8 py-3.5 rounded-2xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg hover:brightness-105"
          >
            <span>Explore Royal Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

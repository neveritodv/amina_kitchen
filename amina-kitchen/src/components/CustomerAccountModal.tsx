import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Heart,
  ShoppingBag,
  MapPin,
  Globe,
  Sun,
  Moon,
  Clock,
  Trash2,
  Plus,
  CheckCircle2,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Dish, OrderItem } from '../types';
import { DISHES } from '../data/dishes';
import { TextInput } from './FormControls';
import { LuxurySelect } from './LuxurySelect';

interface SavedAddress {
  id: string;
  label: string;
  street: string;
  zone: string;
  isDefault: boolean;
}

interface SavedOrder {
  id: string;
  dateISO: string;
  items: OrderItem[];
  totalMAD: number;
  status: 'Delivered' | 'In Preparation' | 'Confirmed';
}

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteDishes: Dish[];
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, qty: number) => void;
  onSelectDish: (dish: Dish) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const CustomerAccountModal: React.FC<CustomerAccountModalProps> = ({
  isOpen,
  onClose,
  favoriteDishes,
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onSelectDish,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<
    'favorites' | 'orders' | 'addresses' | 'preferences' | 'activity'
  >('favorites');

  // Customer account state from LocalStorage
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('amina_lang') || 'English';
  });

  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    try {
      const saved = localStorage.getItem('amina_saved_addresses');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: '1',
              label: 'Medina Villa Riad',
              street: 'Derb El Qadi No. 18, Medina',
              zone: 'Zone 1 (Medina Free)',
              isDefault: true
            },
            {
              id: '2',
              label: 'Palmeraie Estate',
              street: 'Route de la Palmeraie, Villa Jasmine',
              zone: 'Zone 3 (Palmeraie 60 MAD)',
              isDefault: false
            }
          ];
    } catch {
      return [];
    }
  });

  const [orderHistory, setOrderHistory] = useState<SavedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('amina_order_history');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'ORD-8921',
              dateISO: new Date(Date.now() - 86400000 * 2).toISOString(),
              items: [
                { dish: DISHES[0], quantity: 2 },
                { dish: DISHES[2], quantity: 1 }
              ],
              totalMAD: 890,
              status: 'Delivered'
            }
          ];
    } catch {
      return [];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amina_recent_searches');
      return saved ? JSON.parse(saved) : ['Pastilla', 'Lamb Tagine', 'Gazelle Horns'];
    } catch {
      return [];
    }
  });

  const [newAddressForm, setNewAddressForm] = useState({
    label: '',
    street: '',
    zone: 'Zone 1 (Medina Free)'
  });
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    localStorage.setItem('amina_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('amina_saved_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('amina_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  if (!isOpen) return null;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.label || !newAddressForm.street) return;
    const newAddr: SavedAddress = {
      id: Date.now().toString(),
      label: newAddressForm.label,
      street: newAddressForm.street,
      zone: newAddressForm.zone,
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, newAddr]);
    setNewAddressForm({ label: '', street: '', zone: 'Zone 1 (Medina Free)' });
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Drawer Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#121A13] text-[#F7F3E9] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#1A261C]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold">
                Guest Profile & Private Concierge
              </h2>
              <p className="text-xs text-stone-400">
                Local Storage Persistence • Orders, Favorites & Addresses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D4AF37]/20 bg-[#1A261C]/50 px-6 space-x-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'favorites', label: `Favorites (${favoriteDishes.length})`, icon: Heart },
            { id: 'orders', label: `Orders History (${orderHistory.length})`, icon: ShoppingBag },
            { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
            { id: 'preferences', label: 'Preferences & Theme', icon: Globe },
            { id: 'activity', label: 'Recent Searches', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                  isSel
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* TAB 1: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favoriteDishes.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 mx-auto text-stone-600" />
                  <p className="font-serif-display text-lg font-bold">No Favorite Dishes Saved Yet</p>
                  <p className="text-xs text-stone-400">Click the heart icon on any dish to save it to your local profile.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteDishes.map(dish => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex space-x-4 items-center group hover:border-[#D4AF37]/50 transition-all"
                    >
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="font-serif-display font-bold text-sm text-white line-clamp-1">{dish.name}</p>
                        <p className="text-xs text-[#D4AF37] font-bold">{dish.priceMAD} MAD</p>
                        <div className="flex items-center space-x-2 pt-1">
                          <button
                            onClick={() => {
                              onAddToCart(dish, 1);
                            }}
                            className="text-[10px] font-bold px-3 py-1 rounded-lg bg-[#D4AF37] text-[#121A13] uppercase tracking-wider"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => onSelectDish(dish)}
                            className="text-[10px] text-stone-400 hover:text-white"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleFavorite(dish)}
                        className="p-2 text-rose-500 hover:bg-rose-500/20 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orderHistory.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-600" />
                  <p className="font-serif-display text-lg font-bold">No Past Orders Found</p>
                  <p className="text-xs text-stone-400">Your completed banquet & pastry orders will appear here automatically.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderHistory.map(order => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#D4AF37]">{order.id}</span>
                          <p className="text-[11px] text-stone-400">
                            {new Date(order.dateISO).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                            {order.status}
                          </span>
                          <span className="font-serif-display text-base font-bold text-white">
                            {order.totalMAD} MAD
                          </span>
                        </div>
                      </div>

                      {/* Order Items List */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-stone-300">
                              {item.quantity}x {item.dish.name}
                            </span>
                            <span className="font-mono text-stone-400">
                              {item.dish.priceMAD * item.quantity} MAD
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            order.items.forEach(it => onAddToCart(it.dish, it.quantity));
                          }}
                          className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#121A13] transition-colors flex items-center space-x-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Reorder All Items</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif-display text-lg font-bold">Saved Delivery Locations</h3>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs flex items-center space-x-1 hover:bg-[#E5C158]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/40 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextInput
                      placeholder="Address Label (e.g. Medina Riad, Gueliz Apt)"
                      required
                      value={newAddressForm.label}
                      onChange={e => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                    />
                    <LuxurySelect
                      value={newAddressForm.zone}
                      onChange={val => setNewAddressForm({ ...newAddressForm, zone: val })}
                      options={[
                        { value: 'Zone 1 (Medina Free)', label: 'Zone 1 (Medina Free Delivery)' },
                        { value: 'Zone 2 (Gueliz / Hivernage 30 MAD)', label: 'Zone 2 (Gueliz 30 MAD)' },
                        { value: 'Zone 3 (Palmeraie 60 MAD)', label: 'Zone 3 (Palmeraie 60 MAD)' },
                        { value: 'Zone 4 (Route de l\'Ourika Event)', label: 'Zone 4 (Ourika Event Zone)' }
                      ]}
                    />
                  </div>
                  <TextInput
                    placeholder="Street Address, Derb / Villa Number"
                    required
                    value={newAddressForm.street}
                    onChange={e => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#121A13] text-xs font-bold uppercase tracking-wider"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300">{addr.street}</p>
                      <p className="text-[10px] text-[#D4AF37] font-semibold">{addr.zone}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-2 text-stone-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES & THEME */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-serif-display font-bold text-base text-[#D4AF37]">Appearance Mode</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Dark Luxury Mode</p>
                    <p className="text-[11px] text-stone-400">Toggle between Twilight Emerald and Royal Ivory theme</p>
                  </div>
                  <button
                    onClick={onToggleDarkMode}
                    className="p-3 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121A13] transition-colors flex items-center space-x-2 text-xs font-bold"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-serif-display font-bold text-base text-[#D4AF37]">Preferred Display Language</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['English', 'Français', 'العربية'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                        language === lang
                          ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37]'
                          : 'bg-black/20 border-white/10 text-stone-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RECENT SEARCHES */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif-display text-lg font-bold">Recent Gastronomy Searches</h3>
                {recentSearches.length > 0 && (
                  <button
                    onClick={handleClearSearches}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {recentSearches.length === 0 ? (
                <p className="text-xs text-stone-400 py-6 text-center">Search history cleared.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-stone-300 flex items-center space-x-1.5"
                    >
                      <Search className="w-3 h-3 text-[#D4AF37]" />
                      <span>{term}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

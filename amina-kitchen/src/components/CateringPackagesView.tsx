import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Check, Users, Sparkles, Send, ArrowRight, X, Phone, Calendar } from 'lucide-react';
import { CATERING_PACKAGES, CateringPackage } from '../data/cateringPackages';
import { TextInput } from './FormControls';
import { LuxuryDatePicker } from './LuxuryDatePicker';

interface CateringPackagesViewProps {
  onSelectPackageQuote?: (pkg: CateringPackage) => void;
  onNavigateContact?: () => void;
}

export const CateringPackagesView: React.FC<CateringPackagesViewProps> = ({
  onSelectPackageQuote,
  onNavigateContact
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedQuotePackage, setSelectedQuotePackage] = useState<CateringPackage | null>(null);
  const [guestCount, setGuestCount] = useState<number>(100);
  const [eventDate, setEventDate] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const categories = ['All', 'Wedding', 'Corporate', 'Private Event', 'Seasonal'];

  const filteredPackages =
    activeCategory === 'All'
      ? CATERING_PACKAGES
      : CATERING_PACKAGES.filter(p => p.category === activeCategory);

  const handleSendQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuotePackage) return;

    const totalEstimateMAD = selectedQuotePackage.pricePerGuestMAD * guestCount;
    const message = encodeURIComponent(
      `Hello Amina Kitchen Concierge, I would like to request a formal quote for:\n\n*${selectedQuotePackage.name}*\n- Client Name: ${customerName}\n- Phone: ${customerPhone}\n- Event Date: ${eventDate || 'TBD'}\n- Estimated Guests: ${guestCount}\n- Estimated Investment: ${totalEstimateMAD.toLocaleString()} MAD (~$${Math.round(totalEstimateMAD / 10).toLocaleString()} USD)\n\nPlease contact me with menu customization options.`
    );

    window.open(`https://wa.me/212600000000?text=${message}`, '_blank');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedQuotePackage(null);
    }, 3000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Royal Event Gastronomy</span>
        </span>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-bold">
          Royal Catering Packages & Banquets
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Tailored multi-course experiences for 10 to 1,000+ guests. Delivered in copper tagines with full silver-uniformed service across Morocco.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              activeCategory === cat
                ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] shadow-lg'
                : 'bg-black/5 dark:bg-white/5 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#D4AF37]'
            }`}
          >
            {cat} Packages
          </button>
        ))}
      </div>

      {/* Packages Grid - Single column on mobile & tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredPackages.map(pkg => (
          <motion.div
            key={pkg.id}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl glass-card border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {pkg.badgeText && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D4AF37] text-[#121A13] z-10 shadow">
                {pkg.badgeText}
              </span>
            )}

            <div className="space-y-4">
              {/* Package Banner Image */}
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img src={pkg.bannerImage} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-serif-display text-xl font-bold">{pkg.name}</p>
                  <p className="font-serif-arabic text-xs text-[#E5C158]">{pkg.arabicName}</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {pkg.description}
              </p>

              {/* Guest Capacity & Pricing */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 text-xs">
                <div className="flex items-center space-x-1.5 text-stone-500 dark:text-stone-400">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>{pkg.minGuests}–{pkg.maxGuests}+ Guests</span>
                </div>
                <div className="text-right">
                  <span className="font-serif-display font-extrabold text-base text-[#D4AF37]">
                    {pkg.pricePerGuestMAD} MAD
                  </span>
                  <span className="text-[10px] text-stone-400 block">/ Guest</span>
                </div>
              </div>

              {/* Menu Course Highlights */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  Menu Highlights Included:
                </p>
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                  {pkg.menuHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Request Quote Action */}
            <button
              onClick={() => {
                setSelectedQuotePackage(pkg);
                setGuestCount(pkg.minGuests);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
            >
              <span>Request Tailored Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {selectedQuotePackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg glass-panel border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-[#2A2421] dark:text-[#F7F3E9] space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedQuotePackage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-[#D4AF37]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Bespoke Banquet Inquiry
                </span>
                <h3 className="font-serif-display text-2xl font-bold">{selectedQuotePackage.name}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">{selectedQuotePackage.tagline}</p>
              </div>

              {isSuccess ? (
                <div className="text-center py-8 space-y-3 text-emerald-500">
                  <Check className="w-12 h-12 mx-auto" />
                  <p className="font-bold text-lg">Inquiry Sent via WhatsApp!</p>
                  <p className="text-xs text-stone-400">Our concierge will contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSendQuoteRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Madame Amina Benjelloun"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+212 6XX-XXXXXX"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <TextInput
                        label="Guest Count"
                        type="number"
                        min={10}
                        max={1000}
                        value={guestCount}
                        onChange={e => setGuestCount(Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <LuxuryDatePicker
                        label="Event Date"
                        value={eventDate}
                        onChange={setEventDate}
                        placeholder="Choose Date..."
                      />
                    </div>
                  </div>

                  {/* Investment Calculation */}
                  <div className="p-4 rounded-2xl bg-[#121A13] text-[#F7F3E9] text-center space-y-1">
                    <p className="text-[10px] text-stone-400 uppercase font-bold">Estimated Investment</p>
                    <p className="font-serif-display text-2xl font-bold text-[#E5C158]">
                      {(selectedQuotePackage.pricePerGuestMAD * guestCount).toLocaleString()} MAD
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

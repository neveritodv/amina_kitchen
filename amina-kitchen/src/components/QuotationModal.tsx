import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Crown,
  Users,
  Calendar,
  DollarSign,
  Printer,
  CheckCircle2,
  PhoneCall,
  Send,
  Building,
  HeartHandshake,
  UtensilsCrossed,
  Clock,
  MapPin,
  HelpCircle,
  Download
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LuxurySlider } from './LuxurySlider';
import { LuxuryDatePicker } from './LuxuryDatePicker';
import { TextInput, TextArea } from './FormControls';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  initialType = 'Wedding'
}) => {
  const [eventType, setEventType] = useState<string>(initialType);
  const [guestCount, setGuestCount] = useState<number>(80);
  const [tier, setTier] = useState<'Classic' | 'Royal' | 'Imperial'>('Royal');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('Marrakesh Villa / Riad');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Live Pastilla Station',
    'Royal Mint Tea Service'
  ]);
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Pricing calculations
  const tierPricePerGuest = tier === 'Classic' ? 350 : tier === 'Royal' ? 580 : 850; // MAD
  const addonsCatalog = [
    { id: 'Live Pastilla Station', name: 'Live Pastilla Cooking Station', price: 4500 },
    { id: 'Royal Mint Tea Service', name: 'Traditional Tea & Almond Pastry Bar', price: 2500 },
    { id: 'Andalusian Musicians', name: 'Live Andalusian Musician Trio', price: 6000 },
    { id: 'Luxury Tableware', name: 'Royal Silverware & Porcelain Rental', price: 3500 },
    { id: 'Floral Centerpieces', name: 'Moroccan Rose & Brass Candle Arrangements', price: 4000 }
  ];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsCatalog.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const baseFoodTotal = guestCount * tierPricePerGuest;
  const grandTotalMAD = baseFoodTotal + addonsTotal;
  const grandTotalUSD = Math.round(grandTotalMAD / 10);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handlePrintQuote = () => {
    window.print();
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#121A13] text-[#F7F3E9] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#1A261C]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#F7F3E9]">
                Professional Catering Quotation Builder
              </h2>
              <p className="text-xs text-stone-400">
                Custom Banquet Estimator & Instant PDF Quote Generator
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 px-6 text-center space-y-6 max-w-xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-display text-3xl font-bold text-[#E5C158]">
                  Quotation Request Sent Successfully
                </h3>
                <p className="text-sm text-stone-300 font-light leading-relaxed">
                  Thank you, <span className="font-bold text-white">{clientName}</span>. Your bespoke quotation ref <span className="text-[#D4AF37] font-mono">#AK-Q{Math.floor(1000 + Math.random() * 9000)}</span> for <span className="font-bold text-white">{guestCount} Guests</span> has been generated and dispatched to our Senior Event Director.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300 space-y-1">
                <p>Estimated Banquet Total: <strong className="text-[#D4AF37] font-serif-display text-base">{grandTotalMAD.toLocaleString()} MAD</strong> (~${grandTotalUSD.toLocaleString()} USD)</p>
                <p>Our concierge will call you at <strong className="text-white">{clientPhone}</strong> within 15 minutes.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button
                  onClick={() => setShowPdfPreview(true)}
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-[#E5C158] transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>View & Print Official PDF Quote</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Event Category Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    1. Select Event Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'Wedding', label: 'Wedding', icon: HeartHandshake },
                      { id: 'Corporate', label: 'Corporate', icon: Building },
                      { id: 'Private Chef', label: 'Private Chef', icon: UtensilsCrossed },
                      { id: 'Ramadan / Eid', label: 'Ramadan / Eid', icon: Sparkles }
                    ].map(type => {
                      const Icon = type.icon;
                      const isSel = eventType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setEventType(type.id)}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center justify-center space-y-1 text-center ${
                            isSel
                              ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] font-bold shadow-lg scale-102'
                              : 'bg-white/5 border-white/10 text-stone-300 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Calculator & Slider */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <LuxurySlider
                    label="Guest Count"
                    unit="Guests"
                    min={10}
                    max={500}
                    step={5}
                    value={guestCount}
                    onChange={setGuestCount}
                  />
                </div>

                {/* Banquet Menu Tier Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    3. Choose Menu Experience Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'Classic',
                        title: 'Heritage Classic',
                        price: 350,
                        desc: '3-Course Traditional Menu with Lamb Tagine & Mint Tea'
                      },
                      {
                        id: 'Royal',
                        title: 'Royal Prestige',
                        price: 580,
                        desc: '5-Course Feast: Royal Pastilla, Mechoui & Almond Pastry Pyramid'
                      },
                      {
                        id: 'Imperial',
                        title: 'Imperial Palace',
                        price: 850,
                        desc: '7-Course Masterpiece: Wild Atlantic Seafood, Saffron Lamb & Live Stations'
                      }
                    ].map(t => {
                      const isSel = tier === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setTier(t.id as any)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                            isSel
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif-display font-bold text-sm text-white">{t.title}</span>
                            <span className="text-xs font-bold text-[#E5C158]">{t.price} MAD/p</span>
                          </div>
                          <p className="text-[10px] text-stone-300 leading-tight font-light">{t.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Bespoke Add-ons */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    4. Add Luxury Culinary & Atmosphere Enhancements
                  </label>
                  <div className="space-y-2">
                    {addonsCatalog.map(addon => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddon(addon.id)}
                              className="w-4 h-4 accent-[#D4AF37] rounded"
                            />
                            <span className="text-xs font-medium text-stone-200">{addon.name}</span>
                          </div>
                          <span className="text-xs font-mono text-[#D4AF37] font-bold">
                            +{addon.price.toLocaleString()} MAD
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Client Contact Details Form */}
                <form id="quote-form" onSubmit={handleSubmitQuote} className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    5. Contact & Event Logistics
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="p-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-stone-400 focus:border-[#D4AF37] focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextInput
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                    />
                    <LuxuryDatePicker
                      value={eventDate}
                      onChange={setEventDate}
                      placeholder="Event Date..."
                    />
                  </div>

                  <TextInput
                    placeholder="Venue / Riad Location (e.g. Palmeraie Villa, Medina Riad)"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                  />

                  <TextArea
                    rows={2}
                    placeholder="Additional notes, dietary restrictions, preferred dishes..."
                    value={specialNotes}
                    onChange={e => setSpecialNotes(e.target.value)}
                  />
                </form>
              </div>

              {/* Right Column: Dynamic Price Summary Box (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-[#1A261C] border border-[#D4AF37]/50 space-y-6 sticky top-4 shadow-xl">
                  <div className="space-y-1 border-b border-[#D4AF37]/20 pb-4">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Estimate Summary</span>
                    </span>
                    <h3 className="font-serif-display text-2xl font-bold text-white">
                      {eventType} Banquet
                    </h3>
                    <p className="text-xs text-stone-400">
                      {guestCount} Guests • Tier: <span className="text-[#D4AF37] font-bold">{tier}</span>
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-stone-300">
                      <span>Menu ({guestCount} x {tierPricePerGuest} MAD)</span>
                      <span className="font-mono text-white">{baseFoodTotal.toLocaleString()} MAD</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-white/10">
                        <p className="text-[10px] text-stone-400 uppercase font-bold">Selected Enhancements:</p>
                        {selectedAddons.map(id => {
                          const item = addonsCatalog.find(a => a.id === id);
                          return (
                            <div key={id} className="flex justify-between text-stone-400 text-[11px]">
                              <span>• {item?.name}</span>
                              <span className="font-mono text-stone-300">+{item?.price.toLocaleString()} MAD</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#D4AF37]/40 flex justify-between items-baseline">
                      <div>
                        <p className="text-[10px] text-stone-400 uppercase font-bold">Estimated Grand Total</p>
                        <p className="font-serif-display text-3xl font-extrabold text-[#E5C158]">
                          {grandTotalMAD.toLocaleString()} <span className="text-xs font-sans text-stone-300">MAD</span>
                        </p>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">
                        ~ ${grandTotalUSD.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  {/* Quick Features List */}
                  <div className="space-y-2 pt-2 text-[11px] text-stone-300 border-t border-white/10">
                    <p className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Includes Master Chef Amina & White-Glove Staff</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Heated Mobile Catering Equipment & Setup</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>100% Organic Saffron & Local Artisanal Produce</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      form="quote-form"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:brightness-105 active:scale-95 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Quotation Request</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowPdfPreview(true)}
                      className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Printer className="w-4 h-4 text-[#D4AF37]" />
                      <span>Preview Printable PDF Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Printable PDF Quote Preview Modal Overlay */}
      <AnimatePresence>
        {showPdfPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white text-stone-900 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 my-8 print:p-0 print:shadow-none"
            >
              <button
                onClick={() => setShowPdfPreview(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 text-stone-600 hover:text-black print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              {/* PDF Header */}
              <div className="flex justify-between items-start border-b-2 border-[#D4AF37] pb-6">
                <div className="space-y-1">
                  <BrandLogo variant="modal" className="mb-1" />
                  <p className="text-xs text-stone-500 uppercase tracking-widest">
                    Haute Moroccan Catering & Gastronomy
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Derb Dabachi No. 42, Medina, Marrakesh • +212 600 000 000
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="inline-block px-3 py-1 rounded bg-[#D4AF37]/20 text-[#2C3E2B] text-xs font-bold uppercase">
                    Official Quotation
                  </span>
                  <p className="text-xs font-mono font-bold text-stone-600">
                    REF: #AK-Q{Math.floor(1000 + Math.random() * 9000)}
                  </p>
                  <p className="text-xs text-stone-500">
                    Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Client & Event Info */}
              <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-stone-50 text-xs">
                <div>
                  <p className="font-bold text-stone-500 uppercase">Prepared For:</p>
                  <p className="font-bold text-stone-900 text-sm">{clientName || 'Lalla / Sidi Guest'}</p>
                  <p>{clientPhone || '+212 ...'}</p>
                  <p>{clientEmail || 'client@example.com'}</p>
                </div>
                <div>
                  <p className="font-bold text-stone-500 uppercase">Event Details:</p>
                  <p className="font-bold text-stone-900">{eventType} Banquet ({guestCount} Guests)</p>
                  <p>Location: {eventLocation}</p>
                  <p>Date: {eventDate || 'To be confirmed'}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-300 uppercase text-stone-500 text-[10px]">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Qty/Guests</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount (MAD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="py-3">
                      <p className="font-bold text-stone-900">{tier} Imperial Banquet Menu</p>
                      <p className="text-[11px] text-stone-500">Full multi-course royal catering & service staff</p>
                    </td>
                    <td className="py-3 text-center font-bold">{guestCount} pax</td>
                    <td className="py-3 text-right">{tierPricePerGuest} MAD</td>
                    <td className="py-3 text-right font-bold">{baseFoodTotal.toLocaleString()} MAD</td>
                  </tr>

                  {selectedAddons.map(id => {
                    const addon = addonsCatalog.find(a => a.id === id);
                    if (!addon) return null;
                    return (
                      <tr key={id}>
                        <td className="py-3">
                          <p className="font-medium text-stone-900">{addon.name}</p>
                          <p className="text-[11px] text-stone-500">Bespoke event enhancement setup</p>
                        </td>
                        <td className="py-3 text-center">1 setup</td>
                        <td className="py-3 text-right">{addon.price.toLocaleString()} MAD</td>
                        <td className="py-3 text-right font-bold">{addon.price.toLocaleString()} MAD</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Grand Total */}
              <div className="flex justify-end pt-4 border-t-2 border-stone-800 text-right space-y-1">
                <div>
                  <p className="text-xs text-stone-500 uppercase font-bold">Estimated Total (TTC)</p>
                  <p className="font-serif-display text-3xl font-extrabold text-[#D4AF37]">
                    {grandTotalMAD.toLocaleString()} MAD
                  </p>
                  <p className="text-xs text-stone-500">
                    Approx. ${(grandTotalUSD).toLocaleString()} USD
                  </p>
                </div>
              </div>

              {/* Printable Footer */}
              <div className="pt-6 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-500">
                <p>Amina Kitchen SARL • IF: 40291029 • RC Marrakesh 89102</p>
                <div className="flex space-x-3 print:hidden">
                  <button
                    onClick={handlePrintQuote}
                    className="px-4 py-2 rounded-xl bg-[#121A13] text-white text-xs font-bold flex items-center space-x-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Print or Save PDF</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

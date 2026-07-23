import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { LuxurySelect } from './LuxurySelect';
import { LuxuryDatePicker } from './LuxuryDatePicker';
import { TextInput, TextArea } from './FormControls';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding Reception',
    guestCount: '50-100 Guests',
    eventDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Hero Banner with Luxury Entrance */}
      <section 
        className="relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/30 p-6 md:p-12 text-center space-y-4 bg-gradient-to-b from-[#121A13]/90 to-[#1C281D]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(18, 26, 19, 0.85), rgba(28, 40, 29, 0.95)), url('/images/Luxury Moroccan entrance..png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="space-y-2 max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Royal Concierge & Catering</span>
          </span>

          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#F7F3E9]">
            Get in Touch with Our Culinary Team
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Inquire about private chef bookings, wedding banquets, custom pastry towers, or daily home deliveries in Marrakesh and Casablanca.
          </p>
        </div>
      </section>

      {/* Main 2-Column Desktop Grid with Dual Sticky Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Sticky Riad Information Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-[110px]">
          <div className="p-6 rounded-3xl glass-card border border-[#D4AF37]/30 space-y-5 shadow-xl">
            <h3 className="font-serif-display text-lg font-bold text-[#D4AF37]">Riad & Atelier Information</h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">Marrakesh Medina Atelier</p>
                  <p className="text-stone-400 text-xs">Derb Dabachi No. 42, Medina, Marrakesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">Direct Line & WhatsApp</p>
                  <p className="text-stone-400 text-xs">+212 600 000 000 / +212 524 000 000</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">Email Inquiries</p>
                  <p className="text-stone-400 text-xs">concierge@aminakitchen.ma</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F7F3E9]">Kitchen & Delivery Hours</p>
                  <p className="text-stone-400 text-xs">Monday – Sunday: 10:00 – 23:00</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <WhatsAppButton variant="primary" text="Instant WhatsApp Concierge" fullWidth />
          </div>
        </div>

        {/* Right Column: Compact Sticky Booking Form (7 cols) */}
        <div className="lg:col-span-7 lg:sticky lg:top-[110px]">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel bg-[#121A13]/95 border border-[#D4AF37]/30 shadow-2xl space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-[#F7F3E9]">
              Request Event Catering or Chef Reservation
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-3 text-center"
              >
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <h4 className="font-serif-display text-lg font-bold">Inquiry Received</h4>
                <p className="text-xs text-emerald-300 leading-relaxed font-light">
                  Thank you, {formData.name}. Our master concierge will review your event requirements and contact you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Row 1: Full Name | Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <TextInput
                    label="Full Name *"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lalla Fatema Zohra"
                  />

                  <TextInput
                    label="Phone / WhatsApp *"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 600 000 000"
                  />
                </div>

                {/* Row 2: Email | Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <TextInput
                    label="Email Address *"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="fatema@example.com"
                  />

                  <LuxurySelect
                    label="Event Type"
                    value={formData.eventType}
                    onChange={val => setFormData({ ...formData, eventType: val })}
                    options={[
                      { value: 'Wedding Reception', label: 'Wedding Reception', desc: 'Imperial wedding banquet' },
                      { value: 'Private Dinner', label: 'Private Chef Dinner', desc: 'Personalized villa dining' },
                      { value: 'Corporate Gala', label: 'Corporate Gala', desc: 'High-end corporate hospitality' },
                      { value: 'Ramadan Iftar', label: 'Ramadan Iftar Spread', desc: 'Artisanal Iftar pastillas' },
                      { value: 'Family Celebration', label: 'Family Celebration', desc: 'Private anniversary or birthday' }
                    ]}
                  />
                </div>

                {/* Row 3: Guest Count | Event Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <LuxurySelect
                    label="Guest Count"
                    value={formData.guestCount}
                    onChange={val => setFormData({ ...formData, guestCount: val })}
                    options={[
                      { value: '10-25 Guests', label: '10-25 Guests' },
                      { value: '25-50 Guests', label: '25-50 Guests' },
                      { value: '50-100 Guests', label: '50-100 Guests' },
                      { value: '100+ Guests', label: '100+ Guests (Royal Banquet)' }
                    ]}
                  />

                  <LuxuryDatePicker
                    label="Target Event Date"
                    value={formData.eventDate}
                    onChange={val => setFormData({ ...formData, eventDate: val })}
                    placeholder="Choose Date..."
                  />
                </div>

                {/* Row 4: Notes (Full Width, 2 rows) */}
                <div>
                  <TextArea
                    label="Culinary Preferences & Notes"
                    rows={2}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide details on preferred dishes, dietary notes, venue setup..."
                  />
                </div>

                {/* Row 5: Submit Button (56px Height) */}
                <button
                  type="submit"
                  className="w-full h-[56px] rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Catering Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

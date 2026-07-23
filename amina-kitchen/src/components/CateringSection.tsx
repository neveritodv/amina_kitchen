import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Users, Calendar, Sparkles, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { LuxurySelect } from './LuxurySelect';
import { LuxuryDatePicker } from './LuxuryDatePicker';
import { TextInput } from './FormControls';
import { LuxurySlider } from './LuxurySlider';

export const CateringSection: React.FC = () => {
  const [guests, setGuests] = useState(50);
  const [eventType, setEventType] = useState('Royal Wedding Reception');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // Estimate calculation: ~350 MAD per guest
  const estimatedCostMAD = guests * 350;
  const estimatedCostUSD = Math.round(estimatedCostMAD / 10);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    let message = `*👑 AMINA KITCHEN — ROYAL CATERING INQUIRY*\n`;
    message += `───────────────────────\n`;
    message += `*Event Type:* ${eventType}\n`;
    message += `*Estimated Guests:* ${guests} Persons\n`;
    message += `*Contact Name:* ${name}\n`;
    message += `*Phone:* ${phone}\n`;
    if (date) message += `*Event Date:* ${date}\n`;
    if (notes) message += `*Notes:* ${notes}\n`;
    message += `───────────────────────\n`;
    message += `*ESTIMATED QUOTE:* ${estimatedCostMAD} MAD (~$${estimatedCostUSD})\n`;
    message += `───────────────────────\n`;
    message += `_Please send me formal menu options and availability._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/212600000000?text=${encoded}`, '_blank');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#D4AF37]/40 shadow-2xl p-8 sm:p-12 text-[#2A2421] dark:text-[#F7F3E9]">
        {/* Background Image Accent */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url('/images/entrance.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Title & Features */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121A13] border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              <Crown className="w-4 h-4 text-[#E5C158]" />
              <span>Imperial Catering & Banquets</span>
            </span>

            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Crafting Unforgettable Moroccan Celebrations
            </h2>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              From grand Marrakesh wedding galas to exclusive private villa receptions, Amina Kitchen brings copper tagine displays, royal silver mint tea ceremonies, and handcrafted pastillas directly to your table.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>On-Location Live Chef Pastilla Cooking & Plating</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Hand-Carved Silver Mint Tea & Fine Porcelain Service</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Custom Dietary Menus & French Fine Pastry Towers</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 space-y-6">
            <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F7F3E9] flex items-center justify-between">
              <span>Catering Calculator</span>
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </h3>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <LuxurySelect
                  label="Event Category"
                  value={eventType}
                  onChange={setEventType}
                  options={[
                    { value: 'Royal Wedding Reception', label: 'Royal Wedding Reception', desc: 'Imperial multi-course banquet' },
                    { value: 'Private Villa Gala', label: 'Private Villa Gala', desc: 'Live chef silver tea & tagine service' },
                    { value: 'Corporate Banquet', label: 'Corporate Banquet', desc: 'High-end VIP corporate hospitality' },
                    { value: 'Ramadan & Iftar Gathering', label: 'Ramadan & Iftar Gathering', desc: 'Artisanal Iftar pastillas & sweets' },
                    { value: 'Family Milestone Celebration', label: 'Family Milestone Celebration', desc: 'Custom milestone banquet' }
                  ]}
                />
              </div>

              <div>
                <LuxurySlider
                  label="Guest Count"
                  unit="Persons"
                  min={20}
                  max={500}
                  step={10}
                  value={guests}
                  onChange={setGuests}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextInput
                  label="Name *"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                />

                <TextInput
                  label="Phone *"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+212 600 000 000"
                />
              </div>

              <div>
                <LuxuryDatePicker
                  label="Target Event Date"
                  value={date}
                  onChange={setDate}
                  placeholder="Select Event Date..."
                />
              </div>

              {/* Estimate Output Box */}
              <div className="p-4 rounded-xl bg-[#121A13] border border-[#D4AF37]/40 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Estimated Banquet Investment</span>
                  <span className="font-serif-display font-bold text-xl text-[#E5C158]">{estimatedCostMAD} MAD</span>
                  <span className="text-xs text-stone-400 ml-1.5">(~${estimatedCostUSD})</span>
                </div>

                <Crown className="w-8 h-8 text-[#D4AF37] opacity-80" />
              </div>

              <WhatsAppButton
                variant="primary"
                text="Request Custom Catering Quote"
                fullWidth
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

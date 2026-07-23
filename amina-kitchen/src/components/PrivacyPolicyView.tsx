import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-[#2A2421] dark:text-[#F7F3E9]">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Legal & Data Governance</span>
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">Last updated: January 2025</p>
      </div>

      <div className="p-8 rounded-3xl glass-card border border-[#D4AF37]/20 space-y-6 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-light">
        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">1. Introduction & Scope</h2>
          <p>
            Amina Kitchen ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy informs you as to how we look after your personal data when you visit our applet or order our luxury catering services in Morocco.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">2. Information We Collect</h2>
          <p>
            We collect personal information necessary to execute orders and deliver private catering services:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Customer Name, Delivery Address, and Phone/WhatsApp Number</li>
            <li>Event dates, guest count, dietary preferences, and custom culinary requests</li>
            <li>Local browser state preferences (such as saved favorites and cart selections)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">3. How We Use Your Data</h2>
          <p>
            Your information is strictly utilized to prepare handcrafted orders, coordinate temperature-controlled courier delivery, manage private chef bookings, and communicate order confirmations via WhatsApp or phone.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">4. Confidentiality & Security</h2>
          <p>
            We do not sell, rent, or trade customer personal data to third-party advertisers. All client records for VIP receptions, royal weddings, and private Riad dinners remain strictly confidential.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">5. Contact Us</h2>
          <p>
            If you have any questions regarding your privacy rights, please contact our data concierge at concierge@aminakitchen.ma.
          </p>
        </section>
      </div>
    </div>
  );
};

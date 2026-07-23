import React from 'react';
import { FileText } from 'lucide-react';

export const TermsView: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-[#2A2421] dark:text-[#F7F3E9]">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Service Agreements</span>
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold">Terms of Service</h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">Effective Date: January 2025</p>
      </div>

      <div className="p-8 rounded-3xl glass-card border border-[#D4AF37]/20 space-y-6 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-light">
        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">1. Order Placement & Lead Times</h2>
          <p>
            By placing an order with Amina Kitchen, you agree to our minimum lead times: 4–6 hours for standard pastry platters and 24 hours for Royal Pastillas and large braised tagines. Event catering deposits are required to confirm date locks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">2. Freshness & Food Handling</h2>
          <p>
            All pastries, breads, and tagines are prepared fresh using organic ingredients. Prepared dishes should be consumed immediately upon delivery or kept refrigerated under appropriate conditions as instructed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">3. Catering Cancellations</h2>
          <p>
            Cancellations for private chef bookings and wedding banquets made at least 7 days prior to the event date qualify for a full deposit refund. Cancellations within 48 hours are subject to a 50% preparation fee due to raw ingredient commitments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-display text-lg font-bold text-[#D4AF37]">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Kingdom of Morocco.
          </p>
        </section>
      </div>
    </div>
  );
};

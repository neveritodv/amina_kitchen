import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Send,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { BrandLogo } from './BrandLogo';

export const PremiumFooter: React.FC = () => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setShowToast(true);
      setNewsletterEmail('');
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const instagramImages = [
    '/images/shebakia.png',
    '/images/k3b ghzal.png',
    '/images/fe9as.png',
    '/images/briwate.png',
    '/images/dejaj m7mer.png'
  ];

  return (
    <footer className="relative mt-24 border-t border-[#D4AF37]/30 bg-[#121A13] text-[#F7F3E9] overflow-hidden">
      {/* Background Moroccan Zellige Geometry Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* 1. Instagram Photo Strip Header */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border-b border-[#D4AF37]/20">
        {instagramImages.map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden group">
            <img
              src={img}
              alt={`Instagram Preview ${i}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <button
              onClick={() => navigate('/gallery')}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#D4AF37]"
            >
              <Instagram className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      {/* 2. Main 5-Column Luxury Footer Body (100px Vertical Padding) */}
      <div className="max-w-[1440px] mx-auto py-[100px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-12 relative z-10">
        
        {/* Column 1: Brand Story & Transparent Local Logo */}
        <div className="space-y-5">
          <BrandLogo variant="footer" onClick={() => navigate('/')} />

          <p className="text-xs text-stone-300 font-light leading-relaxed">
            Imperial Fassi pastillas, slow-simmered saffron tagines, and handmade almond confections crafted according to centuries of royal Moroccan culinary heritage.
          </p>

          {/* Social Links & WhatsApp Button */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-[#D4AF37]"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-[#D4AF37]"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <WhatsAppButton variant="secondary" size="sm" text="Concierge" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li><button onClick={() => navigate('/')} className="hover:text-[#D4AF37] transition-colors">Home Page</button></li>
            <li><button onClick={() => navigate('/menu')} className="hover:text-[#D4AF37] transition-colors">Royal Culinary Menu</button></li>
            <li><button onClick={() => navigate('/gallery')} className="hover:text-[#D4AF37] transition-colors">Visual Gallery Journal</button></li>
            <li><button onClick={() => navigate('/about')} className="hover:text-[#D4AF37] transition-colors">Chef Lalla Amina Story</button></li>
            <li><button onClick={() => navigate('/services')} className="hover:text-[#D4AF37] transition-colors">Private Chef & Events</button></li>
            <li><button onClick={() => navigate('/catering')} className="hover:text-[#D4AF37] transition-colors">Wedding & Banqueting</button></li>
          </ul>
        </div>

        {/* Column 3: Royal Offerings */}
        <div className="space-y-4">
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            Royal Offerings
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li><button onClick={() => navigate('/menu/prestige-chicken-bastilla')} className="hover:text-[#D4AF37] transition-colors">Prestige Pigeon & Chicken Pastilla</button></li>
            <li><button onClick={() => navigate('/menu/lamb-with-prunes')} className="hover:text-[#D4AF37] transition-colors">Atlas Lamb Tagine with Prunes</button></li>
            <li><button onClick={() => navigate('/menu/djaj-mhamer')} className="hover:text-[#D4AF37] transition-colors">Djaj M'hammer Ceremony Poultry</button></li>
            <li><button onClick={() => navigate('/menu/kaab-ghzal')} className="hover:text-[#D4AF37] transition-colors">Kaab El Ghzal & Pastry Pyramids</button></li>
            <li><button onClick={() => navigate('/menu/moroccan-mint-tea')} className="hover:text-[#D4AF37] transition-colors">Live Silver Tea Ceremony</button></li>
            <li><button onClick={() => navigate('/ramadan')} className="hover:text-[#D4AF37] transition-colors">Ramadan Iftar Special Boxes</button></li>
          </ul>
        </div>

        {/* Column 4: Customer Care */}
        <div className="space-y-4">
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li><button onClick={() => navigate('/faq')} className="hover:text-[#D4AF37] transition-colors">FAQ & Delivery Radius</button></li>
            <li><button onClick={() => navigate('/privacy')} className="hover:text-[#D4AF37] transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => navigate('/terms')} className="hover:text-[#D4AF37] transition-colors">Terms of Service</button></li>
            <li><button onClick={() => navigate('/testimonials')} className="hover:text-[#D4AF37] transition-colors">Guest Reviews & Ratings</button></li>
            <li><button onClick={() => navigate('/contact')} className="hover:text-[#D4AF37] transition-colors">Concierge Support</button></li>
          </ul>
        </div>

        {/* Column 5: Contact & Concierge */}
        <div className="space-y-4">
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            Atelier Contact
          </h4>
          <div className="space-y-3 text-xs text-stone-300 font-light">
            <p className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Derb Dabachi No. 42, Medina, Marrakesh, Morocco</span>
            </p>
            <p className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>+212 600 000 000</span>
            </p>
            <p className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>concierge@aminakitchen.ma</span>
            </p>
            <p className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Daily Concierge: 10:00 – 23:00</span>
            </p>
          </div>
        </div>

      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="border-t border-stone-800/80 py-6 px-6 lg:px-12 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
        <p>© {new Date().getFullYear()} Amina Kitchen SARL. Imperial Moroccan Gastronomy & Catering.</p>
        <div className="flex space-x-6">
          <button onClick={() => navigate('/privacy')} className="hover:text-[#D4AF37] transition-colors">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => navigate('/terms')} className="hover:text-[#D4AF37] transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};

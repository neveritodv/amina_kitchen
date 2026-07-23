import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onExploreMenu?: () => void;
  onBookCatering?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onExploreMenu,
  onBookCatering
}) => {
  const navigate = useNavigate();

  const handleExploreMenu = () => {
    if (onExploreMenu) onExploreMenu();
    else navigate('/menu');
  };

  const handleBookCatering = () => {
    if (onBookCatering) onBookCatering();
    else navigate('/catering');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Banner */}
      <section 
        className="relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/30 p-8 md:p-14 text-center space-y-6 bg-gradient-to-b from-[#121A13]/90 to-[#1C281D]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(18, 26, 19, 0.85), rgba(28, 40, 29, 0.95)), url('/images/Moroccan kitchen.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto relative z-10"
        >
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
            <span>Three Generations of Culinary Royalty</span>
          </span>

          <h1 className="font-serif-display text-4xl sm:text-6xl font-extrabold text-[#F7F3E9] leading-tight">
            The Heritage of <span className="text-[#D4AF37] italic">Lalla Amina</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Founded in the historic Medina of Marrakesh, Amina Kitchen brings centuries-old Fassi royal recipes, hand-stretched warka pastries, and slow-simmered saffron delicacies directly to world-class celebrations.
          </p>
        </motion.div>
      </section>

      {/* Founder Story Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[4/3]"
        >
          <img
            src="/images/entrance.png"
            alt="Entrance of Riad Amina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
            <p className="font-serif-display text-lg font-bold text-[#D4AF37]">Grand Riad Amina</p>
            <p className="text-xs text-stone-300">Where Royal Culinary Traditions Were Born</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Our Culinary Genesis
          </span>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
            Preserving Royal Gastronomy & Artisanal Passion
          </h2>

          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-light">
            Lalla Amina learned the art of Moroccan haute cuisine beside her grandmother in Fes, mastering the delicate technique of pulling paper-thin warka sheets over copper domes and simmering complex saffron daghmiras.
          </p>

          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-light">
            Today, Amina Kitchen stands as an ambassador of Moroccan luxury catering, honoring ancient methods while elevating taste for international palates, royal banquets, and intimate family milestones.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div>
              <p className="font-serif-display text-3xl font-bold text-[#D4AF37]">30+</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">Years of Heritage</p>
            </div>
            <div>
              <p className="font-serif-display text-3xl font-bold text-[#D4AF37]">1,200+</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">Royal Banquets Hosted</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Traditional Kitchen & Palatial Atmosphere Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 order-2 lg:order-1"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Palatial Ambiance
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
            The Regal Setting of Moroccan Banquets
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-light">
            Every dish prepared at Amina Kitchen is framed by the opulent heritage of traditional Moroccan architecture. From candlelit cedar archways to intricate hand-chiseled zellige tiles, our culinary experience brings royal hospitality to life.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[4/3] order-1 lg:order-2"
        >
          <img
            src="/images/Luxury Moroccan entrance..png"
            alt="Luxury Moroccan Entrance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
            <p className="font-serif-display text-lg font-bold text-[#D4AF37]">Palatial Arabesque Entrance</p>
            <p className="text-xs text-stone-300">Immersion in Royal Moroccan Atmosphere</p>
          </div>
        </motion.div>
      </section>

      {/* Ingredient Quality Pillars */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif-display text-3xl font-bold">Pillars of Culinary Perfection</h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            We source exclusively organic, origin-certified Moroccan super-ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold">Pure Taliouine Saffron</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Red gold hand-harvested from the Atlas mountains, providing deep crimson hues and intense floral aroma.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold">Aged Smen & Safflower</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Clarified butter aged in clay urns according to ancient Berber tradition, delivering rich Umami undertones.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold">Tafilalet Majhool Dates</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              Plump, caramel-toned dates sourced directly from Saharan oases for break-fast feasts and honey glazes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center p-10 rounded-3xl bg-[#121A13] text-[#F7F3E9] border border-[#D4AF37]/30 space-y-6">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">Experience Royal Gastronomy Today</h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-light">
          Whether organizing an intimate dinner party or an imperial wedding reception, our master chefs are at your service.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleExploreMenu}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all"
          >
            Explore Full Menu
          </button>
          <button
            onClick={handleBookCatering}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-[#D4AF37]/50 text-[#F7F3E9] font-bold text-xs uppercase tracking-wider transition-all"
          >
            Request Private Catering
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  ShieldCheck,
  Truck,
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';

export const InteractiveMapSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'zone1' | 'zone2' | 'zone3' | 'zone4'>('zone1');
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  const zones = [
    {
      id: 'zone1',
      name: 'Zone 1: Medina & Kasbah',
      radius: '0 – 3 km',
      fee: 'FREE Courier',
      eta: '20–30 Mins',
      desc: 'Includes Derb Dabachi, Jemaa el-Fnaa, Kasbah & Riad Quarter. Delivered via heated thermal backpack.'
    },
    {
      id: 'zone2',
      name: 'Zone 2: Gueliz & Hivernage',
      radius: '3 – 8 km',
      fee: '30 MAD (~$3)',
      eta: '30–45 Mins',
      desc: 'Covers New City Gueliz, Hivernage Luxury Hotels & Victor Hugo district.'
    },
    {
      id: 'zone3',
      name: 'Zone 3: Palmeraie & Agdal',
      radius: '8 – 15 km',
      fee: '60 MAD (~$6)',
      eta: '45–60 Mins',
      desc: 'Covers Resort Villas, Golf Estates in Palmeraie, and Agdal Gardens.'
    },
    {
      id: 'zone4',
      name: 'Zone 4: Ourika & Private Estates',
      radius: '15+ km',
      fee: '120 MAD (~$12) or Event Truck',
      eta: 'Scheduled Slot',
      desc: 'Bespoke event delivery truck with temperature-controlled banqueting units.'
    }
  ];

  const currentZoneInfo = zones.find(z => z.id === selectedZone)!;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Atelier & Interactive Delivery Coverage</span>
        </span>

        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
          Explore Our Delivery Radius & Riad Location
        </h2>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto">
          Our culinary atelier operates out of the historic Medina of Marrakesh, serving private riads, luxury villas in Palmeraie, and banqueting estates across Morocco.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            className="px-6 py-2.5 rounded-full bg-[#2C3E2B] dark:bg-[#1C281D] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>{isMapExpanded ? 'Collapse Interactive Map' : 'Expand Interactive Map & Zones'}</span>
            <span className="text-sm">{isMapExpanded ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {isMapExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch overflow-hidden"
        >
        {/* Interactive Map Visualizer Canvas / SVG Container (7 cols) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between p-6">
          {/* Background Map Graphic Overlay */}
          <div className="absolute inset-0 bg-[#121A13] overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Concentric Zone Circles (Marrakesh Center) */}
            <svg className="absolute inset-0 w-full h-full text-[#D4AF37]" viewBox="0 0 600 500">
              {/* Center Pin Pulse */}
              <circle cx="300" cy="250" r="10" fill="#D4AF37" className="animate-ping opacity-40" />
              <circle cx="300" cy="250" r="6" fill="#E5C158" />

              {/* Zone 1 Circle */}
              <circle
                cx="300"
                cy="250"
                r="60"
                fill={selectedZone === 'zone1' ? 'rgba(212, 175, 55, 0.25)' : 'none'}
                stroke="#D4AF37"
                strokeWidth={selectedZone === 'zone1' ? '3' : '1.5'}
                strokeDasharray="4 4"
              />

              {/* Zone 2 Circle */}
              <circle
                cx="300"
                cy="250"
                r="120"
                fill={selectedZone === 'zone2' ? 'rgba(212, 175, 55, 0.2)' : 'none'}
                stroke="#D4AF37"
                strokeWidth={selectedZone === 'zone2' ? '3' : '1.5'}
                strokeDasharray="4 4"
                opacity="0.8"
              />

              {/* Zone 3 Circle */}
              <circle
                cx="300"
                cy="250"
                r="180"
                fill={selectedZone === 'zone3' ? 'rgba(212, 175, 55, 0.15)' : 'none'}
                stroke="#D4AF37"
                strokeWidth={selectedZone === 'zone3' ? '3' : '1.5'}
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Zone 4 Circle */}
              <circle
                cx="300"
                cy="250"
                r="230"
                fill={selectedZone === 'zone4' ? 'rgba(212, 175, 55, 0.1)' : 'none'}
                stroke="#D4AF37"
                strokeWidth={selectedZone === 'zone4' ? '3' : '1.5'}
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* Landmark Pins */}
              {/* Medina Riad */}
              <g transform="translate(300, 250)">
                <circle r="12" fill="#121A13" stroke="#D4AF37" strokeWidth="2" />
                <text x="16" y="4" fill="#F7F3E9" fontSize="11" fontWeight="bold">
                  Amina Riad Atelier
                </text>
              </g>

              {/* Gueliz Pin */}
              <g transform="translate(230, 200)">
                <circle r="5" fill="#E5C158" />
                <text x="10" y="4" fill="#A8A29E" fontSize="9">
                  Gueliz District
                </text>
              </g>

              {/* Palmeraie Pin */}
              <g transform="translate(380, 160)">
                <circle r="5" fill="#E5C158" />
                <text x="10" y="4" fill="#A8A29E" fontSize="9">
                  Palmeraie Golf Villas
                </text>
              </g>
            </svg>
          </div>

          {/* Top Floating Map Status Bar */}
          <div className="relative z-10 flex items-center justify-between bg-[#121A13]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#D4AF37]/30 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-white">Kitchen Live: Open Now</span>
            </div>
            <span className="text-[#D4AF37] font-mono font-bold">10:00 AM – 11:00 PM</span>
          </div>

          {/* Bottom Floating Map Navigation Trigger */}
          <div className="relative z-10 pt-20 flex flex-wrap gap-2 items-center justify-between">
            <div className="bg-[#121A13]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs text-stone-300">
              <p className="font-bold text-white">Derb Dabachi No. 42, Medina, Marrakesh</p>
              <p className="text-[10px] text-stone-400">GPS: 31.6295° N, 7.9811° W</p>
            </div>

            <a
              href="https://maps.google.com/?q=Derb+Dabachi+Marrakesh+Morocco"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg hover:bg-[#E5C158] transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Navigate via Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Zone Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-serif-display text-xl font-bold text-[#2A2421] dark:text-[#F7F3E9]">
              Select Your Delivery Location
            </h3>

            <div className="space-y-2">
              {zones.map(zone => {
                const isSel = selectedZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id as any)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                      isSel
                        ? 'bg-[#121A13] text-[#F7F3E9] border-[#D4AF37] shadow-xl'
                        : 'bg-black/5 dark:bg-white/5 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif-display font-bold text-sm text-[#D4AF37]">
                        {zone.name}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                        {zone.fee}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-light">{zone.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Zone Detail Card */}
          <div className="p-5 rounded-2xl bg-[#121A13] border border-[#D4AF37]/40 text-[#F7F3E9] space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Estimated Delivery Specs</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-stone-400 text-[10px] uppercase font-bold">Courier ETA</p>
                <p className="font-serif-display text-base font-bold text-white">{currentZoneInfo.eta}</p>
              </div>
              <div>
                <p className="text-stone-400 text-[10px] uppercase font-bold">Delivery Charge</p>
                <p className="font-serif-display text-base font-bold text-[#E5C158]">{currentZoneInfo.fee}</p>
              </div>
            </div>

            <p className="text-[11px] text-stone-300 font-light border-t border-white/10 pt-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>All meals delivered in insulated copper & porcelain heat boxes.</span>
            </p>
          </div>
        </div>
      </motion.div>
      )}
    </section>
  );
};

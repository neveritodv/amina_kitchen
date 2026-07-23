import { SeasonalCampaign } from '../types';

export const SEASONAL_CAMPAIGNS: SeasonalCampaign[] = [
  {
    id: 'ramadan-2026',
    title: 'Ramadan Royal Iftar Collection',
    subtitle: 'Pre-order your bespoke Iftar banquets with organic saffron, Tafilalet Majhool dates & pure honey pastillas.',
    targetDateISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12 + 1000 * 60 * 60 * 6).toISOString(),
    bannerImageUrl: '/images/bastila prestige.png',
    badgeText: '✨ Seasonal Ramadan Exclusive',
    ctaText: 'Explore Iftar Banquet Menu',
    categoryFilter: 'Ramadan'
  },
  {
    id: 'wedding-catering-spring',
    title: 'Royal Wedding & Banquet Experiences',
    subtitle: 'Full-service luxury Moroccan gastronomy, silver tea ceremonies & hand-carved copper tagines for your dream day.',
    targetDateISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    bannerImageUrl: '/images/entrance.png',
    badgeText: '👑 Imperial Wedding Catering',
    ctaText: 'Reserve Wedding Date',
    categoryFilter: 'Wedding Catering'
  },
  {
    id: 'eid-mubarak-pastries',
    title: 'Eid Al-Fitr Pastry Towers & Sweet Boxes',
    subtitle: 'Handcrafted Kaab El Ghzal, honeyed Briouats, and Ghriba shortbreads in luxury gold-embossed gift boxes.',
    targetDateISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
    bannerImageUrl: '/images/Luxury Moroccan dessert table..png',
    badgeText: '🌙 Eid Special Collection',
    ctaText: 'Order Gift Boxes',
    categoryFilter: 'Desserts'
  }
];

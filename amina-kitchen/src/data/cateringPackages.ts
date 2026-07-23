export interface CateringPackage {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  pricePerGuestMAD: number;
  pricePerGuestUSD: number;
  minGuests: number;
  maxGuests: number;
  bannerImage: string;
  menuHighlights: string[];
  includedServices: string[];
  badgeText?: string;
  category: 'Wedding' | 'Corporate' | 'Private Event' | 'Seasonal';
}

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'wedding-package',
    name: 'Royal Wedding Banquet Package',
    arabicName: 'باقة الأعراس والحفلات الملكية',
    tagline: 'The ultimate royal multi-course dining experience for grand Moroccan weddings.',
    description: 'An extraordinary multi-course feast served in copper tagines with full silver-uniformed service, pastry pyramids, live mint tea master, and custom floral table styling.',
    pricePerGuestMAD: 650,
    pricePerGuestUSD: 65,
    minGuests: 50,
    maxGuests: 1000,
    badgeText: 'Most Popular',
    category: 'Wedding',
    bannerImage: '/images/entrance.png',
    menuHighlights: [
      'Welcome Milk & Orange Blossom Dates',
      'Prestige Seafood or Pigeon Pastilla',
      'Slow-Braised Ceremony Lamb Mechoui',
      'Poulet M\'hammar with Preserved Lemons',
      'Kaab El Ghzal & Fine Moroccan Pastry Pyramid',
      'Live Silver Tea Ceremony with Mint & Flowers'
    ],
    includedServices: [
      'Full uniformed waiter & hostess service staff',
      'Royal copper chafing dishes & fine porcelain',
      'Live Moroccan mint tea master bar',
      'Temperature-controlled mobile kitchen setup',
      'Menu tasting for bride & groom (up to 4 guests)'
    ]
  },
  {
    id: 'engagement-package',
    name: 'Exclusive Engagement & Henné Reception',
    arabicName: 'باقة الخطوبة والحناء',
    tagline: 'Intimate elegance crafted for henné nights and traditional engagement celebrations.',
    description: 'Delicate savory pastillas, sweet briouats, refined finger pastries, and aromatic tagines tailored to create an enchanted atmosphere for family and close guests.',
    pricePerGuestMAD: 480,
    pricePerGuestUSD: 48,
    minGuests: 20,
    maxGuests: 150,
    category: 'Wedding',
    bannerImage: '/images/Luxury Moroccan entrance..png',
    menuHighlights: [
      'Mini Seafood & Chicken Briouat Platter',
      'Prestige Chicken Pastilla with Toasted Almonds',
      'Lamb Tagine with Glazed Prunes & Sesame',
      'Johara Milk Cream Pastilla Dessert',
      'Traditional Chebakia & Ghriba Trays'
    ],
    includedServices: [
      'Intimate silver tea station setup',
      'Customized floral menu cards',
      'Professional service staff',
      'Setup & breakdown in private Riad or Villa'
    ]
  },
  {
    id: 'corporate-package',
    name: 'Diplomatic & Corporate Gala Package',
    arabicName: 'باقة المؤتمرات والحفلات الرسمية',
    tagline: 'High-capacity luxury catering for corporate summits, embassies, and gala dinners.',
    description: 'Impeccable execution for corporate leaders and international delegations. Features structured buffet layouts, dietary labels, and high-volume hot dish maintenance.',
    pricePerGuestMAD: 550,
    pricePerGuestUSD: 55,
    minGuests: 30,
    maxGuests: 800,
    category: 'Corporate',
    bannerImage: '/images/bastila prestige.png',
    menuHighlights: [
      'Moroccan Mezze Tapas (Zaalouk, Taktouka, Briouats)',
      'Royal Seven-Vegetable Couscous',
      'Atlantic Sea Bass Chermoula Filets',
      'Artisanal Moroccan Cookies & Fresh Tropical Fruits',
      'Premium Espresso & Mint Tea Station'
    ],
    includedServices: [
      'Full event project manager on-site',
      'Bilingual service staff (Arabic, French, English)',
      'Branded corporate dessert options',
      'HACCP certified temperature log'
    ]
  },
  {
    id: 'birthday-package',
    name: 'Private Riad Celebration & Birthday Gala',
    arabicName: 'باقة أعياد الميلاد والحفلات الخاصة',
    tagline: 'Unforgettable private dining in Marrakesh or Casablanca Riads.',
    description: 'A bespoke celebration featuring live cooking stations, personalized menus, custom Moroccan pastry birthday cakes, and rooftop candlelit dining.',
    pricePerGuestMAD: 420,
    pricePerGuestUSD: 42,
    minGuests: 10,
    maxGuests: 60,
    category: 'Private Event',
    bannerImage: '/images/me7nsha prestige.png',
    menuHighlights: [
      'Welcome Cocktail & Mint Tea Mocktails',
      'Fresh Avocado & Almond Cold Soup',
      'Seffa Medfouna Royal or Lamb Shank Tagine',
      'Custom Kaab El Ghzal Tower or Birthday Pastry',
      'Handcrafted Praline & Pistachio Sweet Trays'
    ],
    includedServices: [
      'Private Chef dedicated to your kitchen',
      'Rooftop candlelit table arrangement',
      'Customized music and lighting assistance',
      'Full cleaning & kitchen restoration'
    ]
  },
  {
    id: 'ramadan-iftar-package',
    name: 'Ramadan Royal Iftar Banquet Package',
    arabicName: 'باقة الإفطار الرمضاني الملكي',
    tagline: 'A sacred breakdown feast with authentic heritage soups, honey roses, and hot tagines.',
    description: 'Designed for corporate Iftars, family reunions, and charitable galas during the holy month of Ramadan. Rich, comforting, and deeply rooted in tradition.',
    pricePerGuestMAD: 380,
    pricePerGuestUSD: 38,
    minGuests: 15,
    maxGuests: 500,
    badgeText: 'Seasonal Exclusive',
    category: 'Seasonal',
    bannerImage: '/images/dejaj m7mer.png',
    menuHighlights: [
      'Rich Traditional Harira with Fresh Herbs & Lemon',
      'Tafilalet Majhool Dates & Stuffed Figs',
      'Golden Honey Chebakia & Sellou Bowls',
      'Msemmen, Baghrir & Batbout Stuffed Flatbreads',
      'Slow-Braised Chicken or Beef Tagine',
      'Freshly Pressed Squeezed Juices & Mint Tea'
    ],
    includedServices: [
      'Timely pre-Maghrib delivery & setup',
      'Insulated thermal soup dispensers',
      'Traditional copper lamps & linen',
      'Staffed Iftar serving options'
    ]
  },
  {
    id: 'eid-celebration-package',
    name: 'Eid Al-Adha & Eid Al-Fitr Family Feast',
    arabicName: 'باقة إفطار وولائم العيد المبارك',
    tagline: 'Celebrate holy festivities with whole roasted Mechoui lamb and royal pastillas.',
    description: 'Bring the joy of Eid to your home without the stress of preparation. We deliver complete festive banquets right to your dining room.',
    pricePerGuestMAD: 520,
    pricePerGuestUSD: 52,
    minGuests: 12,
    maxGuests: 200,
    category: 'Seasonal',
    bannerImage: '/images/l7em br9o9.png',
    menuHighlights: [
      'Festive Morning Msemmen & Honey Spread',
      'Whole Roasted Lamb Mechoui or Lamb Shoulder',
      'Prestige Chicken Pastilla with Almonds',
      'Assorted Fekkas, Mlouza & Ghriba Sweets',
      'Royal Moroccan Mint Tea'
    ],
    includedServices: [
      'Festive serving platters and brass bowls',
      'Delivery on Eid morning or afternoon',
      'Heating & serving instructions sheet'
    ]
  },
  {
    id: 'family-gathering-package',
    name: 'Heritage Family Gathering Package',
    arabicName: 'باقة العائلات واللمات المغربية',
    tagline: 'Warm, generous Moroccan meals designed for 10 to 30 family members.',
    description: 'Generous central platters of couscous, tagines, and pastilla that encourage sharing and laughter around the traditional table.',
    pricePerGuestMAD: 320,
    pricePerGuestUSD: 32,
    minGuests: 10,
    maxGuests: 40,
    category: 'Private Event',
    bannerImage: '/images/msemn.png',
    menuHighlights: [
      'Fresh Moroccan Salad Trio (Zaalouk, Taktouka, Bakoula)',
      'Grand Royal Seven-Vegetable Couscous',
      'Chicken M\'hammar with Daghmira',
      'Seasonal Fresh Fruit Basket & Mint Tea'
    ],
    includedServices: [
      'Hot ceramic tagine delivery',
      'Simple set up on your dining table'
    ]
  },
  {
    id: 'luxury-vip-package',
    name: 'Ultra-Luxury VIP Private Chef Experience',
    arabicName: 'التجربة الملكية الخاصة للشيف',
    tagline: 'An uncompromising gastronomic journey curated by Master Chef Lalla Amina.',
    description: 'Exclusive 7-course tasting menu featuring rare Moroccan saffron from Taliouine, pure Argan oil from Essaouira, wild truffle infusions, and gold leaf garnishes.',
    pricePerGuestMAD: 1200,
    pricePerGuestUSD: 120,
    minGuests: 6,
    maxGuests: 30,
    badgeText: 'Ultimate Gastronomy',
    category: 'Private Event',
    bannerImage: '/images/Luxury Moroccan dessert table..png',
    menuHighlights: [
      'Taliouine Saffron & Argan Oil Amuse-Bouche',
      'Deconstructed Lobster Chermoula Pastilla',
      '24-Hour Braised Wagyu Beef Tagine with Truffle Honey',
      'Rose Petal & Gold Leaf Sefa Medfouna',
      'Kaab El Ghzal Soufflé with Orange Blossom Glaze'
    ],
    includedServices: [
      'Master Chef Lalla Amina personal kitchen residency',
      'Sommelier mocktail pairing & infused botanical waters',
      'Custom gold-embossed personalized menu parchment',
      'Crystal glassware & gold cutlery presentation'
    ]
  }
];

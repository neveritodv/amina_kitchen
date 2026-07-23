export type CategoryType = 
  | 'All'
  | 'Traditional Meals'
  | 'Chicken'
  | 'Seafood'
  | 'Pastries'
  | 'Desserts'
  | 'Traditional Bread'
  | 'Cookies'
  | 'Sweets'
  | 'Wedding Catering'
  | 'Ramadan'
  | 'Family Meals'
  | 'Luxury Catering'
  | 'Beverages';

export interface Dish {
  id: string;
  name: string;
  arabicName?: string;
  frenchName?: string;
  category: CategoryType;
  priceMAD: number; // Moroccan Dirham
  priceUSD: number;
  description: string;
  longDescription?: string;
  ingredients: string[];
  imageUrl: string;
  secondaryImages?: string[];
  isChefsRecommendation?: boolean;
  isPopular?: boolean;
  isSeasonal?: boolean;
  prepTimeMinutes: number;
  servings: string; // e.g. "4-6 persons"
  spiceLevel?: 'Mild' | 'Medium' | 'Aromatic & Rich';
  dietaryTags?: string[]; // e.g. "Halal", "Contains Nuts", "Vegetarian"
  rating: number;
  reviewCount: number;
}

export interface OrderItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface SeasonalCampaign {
  id: string;
  title: string;
  subtitle: string;
  targetDateISO: string; // for countdown timer
  bannerImageUrl: string;
  badgeText: string;
  ctaText: string;
  categoryFilter?: CategoryType;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  likes: number;
  category: string;
  location?: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  note?: string;
}

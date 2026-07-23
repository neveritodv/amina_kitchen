import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Sparkles,
  Utensils,
  Clock,
  Users,
  Flame,
  Heart,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
  Check,
  Star,
  ChevronRight,
  Maximize2,
  Share2,
  ShieldCheck,
  Award,
  Truck,
  Leaf
} from 'lucide-react';
import { Dish, OrderItem } from '../types';
import { DISHES } from '../data/dishes';
import { WhatsAppButton } from './WhatsAppButton';
import { LightboxModal } from './LightboxModal';

interface ProductDetailViewProps {
  dish: Dish;
  onBack: () => void;
  onAddToCart: (dish: Dish, quantity: number, instructions?: string) => void;
  onToggleFavorite: (dishId: string) => void;
  isFavorite: boolean;
  onSelectDish: (dish: Dish) => void;
  onOpenCheckoutWithItem: (dish: Dish, quantity: number) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  dish,
  onBack,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  onSelectDish,
  onOpenCheckoutWithItem
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(dish.imageUrl);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPortion, setSelectedPortion] = useState<'standard' | 'medium' | 'large'>('standard');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'story' | 'ingredients' | 'reheating'>('story');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Portion price multiplier logic
  const portionMultiplier = selectedPortion === 'standard' ? 1 : selectedPortion === 'medium' ? 1.6 : 2.2;
  const currentPriceMAD = Math.round(dish.priceMAD * portionMultiplier);
  const currentPriceUSD = Math.round(dish.priceUSD * portionMultiplier);

  const allImages = [dish.imageUrl, ...(dish.secondaryImages || [])];

  useEffect(() => {
    setSelectedImage(dish.imageUrl);
    setQuantity(1);
    setSelectedPortion('standard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dish.id]);

  // Recommended pairings: Includes beverage & dessert complementary suggestions
  const pairings = DISHES.filter(
    d => d.id !== dish.id && (d.id === 'moroccan-mint-tea' || d.id === 'almond-ghriba' || d.category === dish.category || d.isChefsRecommendation)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Amina Kitchen Concierge, I would like to order:\n\n*${dish.name}* (${dish.arabicName || ''})\n- Quantity: ${quantity}\n- Serving Size: ${
        selectedPortion === 'standard' ? 'Standard (4-6 Pax)' : selectedPortion === 'medium' ? 'Medium (8-10 Pax)' : 'Banquet (12-15 Pax)'
      }\n- Total Estimate: ${currentPriceMAD * quantity} MAD (~$${currentPriceUSD * quantity} USD)\n${
        specialInstructions ? `- Notes: ${specialInstructions}\n` : ''
      }\nPlease confirm availability and delivery slot.`
    );
    window.open(`https://wa.me/212600000000?text=${text}`, '_blank');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-[#2A2421] dark:text-[#F7F3E9]">
      {/* SEO Product Schema JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: dish.name,
            image: dish.imageUrl,
            description: dish.description,
            brand: {
              '@type': 'Brand',
              name: 'Amina Kitchen Morocco'
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MAD',
              price: currentPriceMAD,
              availability: 'https://schema.org/InStock',
              url: window.location.href
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: dish.rating,
              reviewCount: dish.reviewCount
            }
          })
        }}
      />

      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu Collection</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-400">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span>Menu</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#D4AF37] font-semibold">{dish.category}</span>
        </div>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#D4AF37] transition-colors relative"
          title="Share Product"
        >
          <Share2 className="w-4 h-4" />
          {copiedLink && (
            <span className="absolute -bottom-8 right-0 bg-[#D4AF37] text-[#121A13] text-[10px] font-bold px-2 py-0.5 rounded shadow">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* Main Product Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Product Gallery & Images (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/30 shadow-2xl group">
            <img
              src={selectedImage}
              alt={dish.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#121A13]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>{dish.category}</span>
              </span>

              {dish.isChefsRecommendation && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#121A13] text-xs font-bold uppercase tracking-wider">
                  Chef's Royal Choice
                </span>
              )}
            </div>

            {/* Action Overlay Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => onToggleFavorite(dish.id)}
                className={`p-3 rounded-full backdrop-blur-md transition-all ${
                  isFavorite
                    ? 'bg-rose-500 text-white shadow-lg scale-110'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
                title="View Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <div>
                <p className="font-serif-display text-xl font-bold">{dish.name}</p>
                {dish.arabicName && <p className="font-serif-arabic text-sm text-[#E5C158]">{dish.arabicName}</p>}
              </div>
              <span className="text-xs text-stone-300 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                Click to inspect
              </span>
            </div>
          </div>

          {/* Secondary Thumbnail Selectors */}
          {allImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-[#D4AF37] shadow-lg scale-105'
                      : 'border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Quality Guarantee Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
              <p className="text-[11px] font-bold">100% Halal Certified</p>
              <p className="text-[9px] text-stone-500 dark:text-stone-400">Authentic royal recipes</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-center space-y-1">
              <Truck className="w-5 h-5 text-[#D4AF37] mx-auto" />
              <p className="text-[11px] font-bold">Heated Courier</p>
              <p className="text-[9px] text-stone-500 dark:text-stone-400">Delivered hot & crisp</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-center space-y-1">
              <Leaf className="w-5 h-5 text-[#D4AF37] mx-auto" />
              <p className="text-[11px] font-bold">Organic Ingredients</p>
              <p className="text-[9px] text-stone-500 dark:text-stone-400">Sourced from Atlas</p>
            </div>
          </div>

          {/* Animated 3-Step Preparation Timeline */}
          <div className="p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-[#D4AF37]/30 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ancestral Preparation Timeline</span>
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-1 p-2 rounded-xl bg-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold inline-flex items-center justify-center">1</span>
                <p className="font-bold text-[11px]">Saffron Marination</p>
                <p className="text-[9px] text-stone-400">12 Hrs Spice Steep</p>
              </div>
              <div className="space-y-1 p-2 rounded-xl bg-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold inline-flex items-center justify-center">2</span>
                <p className="font-bold text-[11px]">Slow Clay Simmer</p>
                <p className="text-[9px] text-stone-400">Low Ember Hearth</p>
              </div>
              <div className="space-y-1 p-2 rounded-xl bg-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121A13] text-[10px] font-bold inline-flex items-center justify-center">3</span>
                <p className="font-bold text-[11px]">Royal Garnishing</p>
                <p className="text-[9px] text-stone-400">Fresh Almonds & Honey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Buying Control (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Title & Ratings Header */}
          <div className="space-y-2 border-b border-[#D4AF37]/20 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dish.category} Gastronomy</span>
              </span>
              <div className="flex items-center space-x-1 text-xs text-[#D4AF37] font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{dish.rating.toFixed(2)}</span>
                <span className="text-stone-400 font-normal">({dish.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold leading-tight">
              {dish.name}
            </h1>

            {dish.arabicName && (
              <p className="font-serif-arabic text-xl text-[#D4AF37] font-medium">
                {dish.arabicName}
              </p>
            )}

            {dish.frenchName && (
              <p className="text-xs italic text-stone-500 dark:text-stone-400">
                {dish.frenchName}
              </p>
            )}

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light pt-2">
              {dish.description}
            </p>
          </div>

          {/* Quick Dish Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center text-center">
              <Clock className="w-4 h-4 text-[#D4AF37] mb-1" />
              <span className="text-[10px] text-stone-400 uppercase font-bold">Prep Time</span>
              <span className="text-xs font-bold">{dish.prepTimeMinutes} Mins</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center text-center">
              <Users className="w-4 h-4 text-[#D4AF37] mb-1" />
              <span className="text-[10px] text-stone-400 uppercase font-bold">Servings</span>
              <span className="text-xs font-bold">{dish.servings}</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center text-center">
              <Flame className="w-4 h-4 text-[#D4AF37] mb-1" />
              <span className="text-[10px] text-stone-400 uppercase font-bold">Spice Level</span>
              <span className="text-xs font-bold">{dish.spiceLevel || 'Mild'}</span>
            </div>
          </div>

          {/* Portion Size Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Select Banquet Serving Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedPortion('standard')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedPortion === 'standard'
                    ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] shadow-md font-bold'
                    : 'bg-black/5 dark:bg-white/5 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                <p className="text-xs">Standard</p>
                <p className="text-[10px] opacity-80">4–6 Persons</p>
              </button>

              <button
                onClick={() => setSelectedPortion('medium')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedPortion === 'medium'
                    ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] shadow-md font-bold'
                    : 'bg-black/5 dark:bg-white/5 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                <p className="text-xs">Medium</p>
                <p className="text-[10px] opacity-80">8–10 Persons</p>
              </button>

              <button
                onClick={() => setSelectedPortion('large')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedPortion === 'large'
                    ? 'bg-[#D4AF37] text-[#121A13] border-[#D4AF37] shadow-md font-bold'
                    : 'bg-black/5 dark:bg-white/5 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                }`}
              >
                <p className="text-xs">Banquet</p>
                <p className="text-[10px] opacity-80">12–15 Persons</p>
              </button>
            </div>
          </div>

          {/* Quantity Counter & Price Calculation */}
          <div className="p-5 rounded-3xl bg-[#121A13] text-[#F7F3E9] border border-[#D4AF37]/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Total Investment</p>
                <p className="font-serif-display text-3xl font-extrabold text-[#E5C158]">
                  {(currentPriceMAD * quantity).toLocaleString()} MAD
                </p>
                <p className="text-xs text-stone-400">
                  ~ ${(currentPriceUSD * quantity).toLocaleString()} USD
                </p>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center space-x-3 bg-white/10 p-1.5 rounded-2xl border border-white/15">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span className="font-serif-display text-base font-bold w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Special Instructions Note */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Custom Preparation Requests (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra cinnamon sugar on side, less spice..."
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Dual CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(dish, quantity, specialInstructions);
                }}
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#121A13] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <WhatsAppButton
                variant="primary"
                text="WhatsApp Order"
                message={`Bonjour Concierge Amina Kitchen, I am interested in ordering *${dish.name}* (${dish.priceMAD} MAD).`}
              />
            </div>
          </div>

          {/* Detailed Tabbed Sections (Story / Ingredients / Reheating) */}
          <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20">
            <div className="flex border-b border-stone-200 dark:border-stone-800 space-x-6 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === 'story'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-stone-400 hover:text-stone-300'
                }`}
              >
                Heritage & Story
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === 'ingredients'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-stone-400 hover:text-stone-300'
                }`}
              >
                Pure Ingredients
              </button>
              <button
                onClick={() => setActiveTab('reheating')}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === 'reheating'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-stone-400 hover:text-stone-300'
                }`}
              >
                Serving Advice
              </button>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light min-h-[120px]">
              {activeTab === 'story' && (
                <p>
                  {dish.longDescription ||
                    `${dish.name} is a cornerstone of royal Moroccan gastronomy. Prepared according to centuries-old recipes passed down through generations of Fassi master cooks, every ingredient is selected for its purity and aroma.`}
                </p>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-2">
                  <p className="font-medium text-[#D4AF37]">Sourced from Certified Artisanal Producers:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {dish.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reheating' && (
                <div className="space-y-2">
                  <p>
                    <strong>Oven Reheating:</strong> Pre-heat oven to 160°C (320°F). Place the dish on baking paper for 8–10 minutes to restore crispiness. Do not microwave pastry shells.
                  </p>
                  <p>
                    <strong>Storage:</strong> Best consumed fresh upon courier delivery. Can be refrigerated up to 48 hours at 4°C.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Pairings Section */}
      {pairings.length > 0 && (
        <div className="pt-12 border-t border-[#D4AF37]/20 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Royal Gastronomy Pairings</span>
              <h3 className="font-serif-display text-2xl font-bold">Customers Also Ordered</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pairings.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectDish(p)}
                className="p-4 rounded-3xl glass-card border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all cursor-pointer flex space-x-4 items-center group"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-20 h-20 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-serif-display font-bold text-sm line-clamp-1">{p.name}</p>
                  <p className="text-xs text-[#D4AF37] font-bold">{p.priceMAD} MAD (~${p.priceUSD})</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p, 1);
                    }}
                    className="text-[10px] font-bold text-[#D4AF37] hover:underline uppercase tracking-wider"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <LightboxModal
          images={allImages}
          initialIndex={allImages.indexOf(selectedImage)}
          onClose={() => setIsLightboxOpen(false)}
          title={dish.name}
        />
      )}
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils, Sparkles, Crown } from 'lucide-react';
import { Dish } from '../types';
import { DISHES } from '../data/dishes';
import { SEASONAL_CAMPAIGNS } from '../data/campaigns';
import { LuxuryHero } from './LuxuryHero';
import { SeasonalBanner } from './SeasonalBanner';
import { ChefRecommendationSection } from './ChefRecommendationSection';
import { InteractiveMapSection } from './InteractiveMapSection';
import { CateringSection } from './CateringSection';
import { InstagramGallery } from './InstagramGallery';
import { DishCard } from './DishCard';

interface HomeViewProps {
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity?: number, instructions?: string) => void;
  onOpenQuotation: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onOpenQuotation
}) => {
  const navigate = useNavigate();
  const featuredDishes = DISHES.slice(0, 6);

  return (
    <div className="space-y-16 pb-12">
      {/* SEO Metadata Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'Amina Kitchen Morocco',
            image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14e8?w=1200',
            description: 'Imperial Moroccan culinary excellence in Marrakesh. Royal pigeon pastillas, saffron poultry, honey briouates, and wedding banquets.',
            servesCuisine: 'Moroccan',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Derb Dabachi No. 42, Medina',
              addressLocality: 'Marrakesh',
              addressCountry: 'MA'
            }
          })
        }}
      />

      {/* 1. Hero Banner */}
      <LuxuryHero
        onExploreMenu={() => navigate('/menu')}
        onBookCatering={() => navigate('/catering')}
        onOpenQuotation={onOpenQuotation}
        featuredDishes={DISHES.slice(0, 4)}
        onSelectDish={(d) => navigate(`/menu/${d.id}`)}
      />

      {/* 2. Reusable Seasonal Campaign Banner */}
      <SeasonalBanner
        campaign={SEASONAL_CAMPAIGNS[0]}
        onSelectCampaign={() => navigate('/menu')}
      />

      {/* 3. Chef's Recommendation Section */}
      <ChefRecommendationSection
        dishes={DISHES}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onQuickView={(dish) => navigate(`/menu/${dish.id}`)}
      />

      {/* 4. Royal Culinary Highlights Grid Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center justify-center sm:justify-start space-x-1">
              <Crown className="w-4 h-4" />
              <span>Gastronomic Showcase</span>
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
              Signature Royal Dishes
            </h2>
          </div>

          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-3 rounded-2xl bg-[#2C3E2B] hover:bg-[#1C281D] text-[#D4AF37] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <span>Explore Full Menu ({DISHES.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {featuredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isFavorite={favoriteIds.has(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onQuickView={(d) => navigate(`/menu/${d.id}`)}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#D4AF37] hover:underline uppercase tracking-wider"
          >
            <span>View All Categories & Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Imperial Catering Teaser */}
      <CateringSection />

      {/* 6. Instagram Gallery Section Teaser */}
      <InstagramGallery />

      {/* 7. Interactive Delivery Map */}
      <InteractiveMapSection />
    </div>
  );
};

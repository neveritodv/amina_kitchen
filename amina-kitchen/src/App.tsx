import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { DISHES } from './data/dishes';
import { Dish, OrderItem, OrderDetails } from './types';

import { ScrollToTop } from './components/ScrollToTop';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { ProductDetailRoute } from './components/ProductDetailRoute';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { CateringPackagesView } from './components/CateringPackagesView';
import { RamadanCollectionView } from './components/RamadanCollectionView';
import { TestimonialsView } from './components/TestimonialsView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { FavoritesView } from './components/FavoritesView';
import { SearchView } from './components/SearchView';
import { OrderView } from './components/OrderView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { NotFoundView } from './components/NotFoundView';

import { CheckoutModal } from './components/CheckoutModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { QuotationModal } from './components/QuotationModal';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { FloatingOrderSummary } from './components/FloatingOrderSummary';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SmartSearchModal } from './components/SmartSearchModal';
import { PremiumFooter } from './components/PremiumFooter';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PageTransitionLoader } from './components/PageTransitionLoader';

function AppContent() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  // Modals & Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [orderDetailsSuccess, setOrderDetailsSuccess] = useState<OrderDetails | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  // Favorites state persisted in localStorage
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('amina_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set(['prestige-chicken-bastilla', 'cornes-de-gazelle-kaab-el-ghzal']);
    } catch {
      return new Set(['prestige-chicken-bastilla', 'cornes-de-gazelle-kaab-el-ghzal']);
    }
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('amina_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // PWA Deferred Prompt State
  const [deferredPwaPrompt, setDeferredPwaPrompt] = useState<any>(null);

  // Dark Mode permanently enabled for luxury dark olive theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('amina_favorites', JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('amina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPwaPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPwa = () => {
    if (deferredPwaPrompt) {
      deferredPwaPrompt.prompt();
      deferredPwaPrompt.userChoice.then(() => {
        setDeferredPwaPrompt(null);
      });
    }
  };

  const toggleFavorite = (dish: Dish) => {
    setFavoriteIds(prev => {
      const updated = new Set(prev);
      if (updated.has(dish.id)) {
        updated.delete(dish.id);
      } else {
        updated.add(dish.id);
      }
      return updated;
    });
  };

  const handleAddToCart = (dish: Dish, quantity: number = 1, specialInstructions?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (specialInstructions) {
          updated[existingIndex].specialInstructions = specialInstructions;
        }
        return updated;
      }
      return [...prev, { dish, quantity, specialInstructions }];
    });
  };

  const handleUpdateCartQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(dishId);
      return;
    }
    setCart(prev => prev.map(item => item.dish.id === dishId ? { ...item, quantity } : item));
  };

  const handleRemoveCartItem = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const favoriteDishes = DISHES.filter(d => favoriteIds.has(d.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121A13] text-[#2A2421] dark:text-[#F7F3E9] transition-colors duration-300 pb-20 xl:pb-0 font-sans">
      <ScrollToTop />

      {/* 1. Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => navigate('/search')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => navigate('/favorites')}
        onOpenAccount={() => setIsAccountOpen(true)}
        favoriteCount={favoriteIds.size}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        deferredPwaPrompt={deferredPwaPrompt}
        onInstallPwa={handleInstallPwa}
      />

      {/* Global Cinematic Page Transition Loader */}
      <PageTransitionLoader />

      {/* 3. Main Route Switcher */}
      <main className="pt-20 min-h-[80vh] w-full">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                onOpenQuotation={() => setIsQuotationOpen(true)}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <MenuView
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                onOpenComparison={() => setIsComparisonOpen(true)}
              />
            }
          />

          <Route
            path="/menu/:dishId"
            element={
              <ProductDetailRoute
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                onOpenCheckoutWithItem={(dish, qty) => {
                  handleAddToCart(dish, qty);
                  setIsCheckoutOpen(true);
                }}
              />
            }
          />

          <Route path="/gallery" element={<GalleryView />} />

          <Route
            path="/about"
            element={
              <AboutView
                onExploreMenu={() => navigate('/menu')}
                onBookCatering={() => navigate('/catering')}
              />
            }
          />

          <Route path="/services" element={<ServicesView onBookClick={() => navigate('/contact')} />} />

          <Route
            path="/catering"
            element={
              <CateringPackagesView onNavigateContact={() => navigate('/contact')} />
            }
          />

          <Route
            path="/ramadan"
            element={
              <RamadanCollectionView
                onAddToCart={handleAddToCart}
                onSelectDish={(d) => navigate(`/menu/${d.id}`)}
              />
            }
          />

          <Route path="/testimonials" element={<TestimonialsView />} />

          <Route path="/faq" element={<FaqView onContactClick={() => navigate('/contact')} />} />

          <Route path="/contact" element={<ContactView />} />

          <Route
            path="/favorites"
            element={
              <FavoritesView
                favoriteDishes={favoriteDishes}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                onQuickView={(dish) => navigate(`/menu/${dish.id}`)}
                onBackToMenu={() => navigate('/menu')}
              />
            }
          />

          <Route
            path="/search"
            element={
              <SearchView
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/order"
            element={
              <OrderView
                cart={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={() => setCart([])}
                onOpenCheckout={() => setIsCheckoutOpen(true)}
              />
            }
          />

          <Route path="/privacy-policy" element={<PrivacyPolicyView />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />

          <Route path="/terms-of-service" element={<TermsView />} />
          <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />

          <Route path="*" element={<NotFoundView onBackHome={() => navigate('/')} />} />
        </Routes>
      </main>

      {/* 4. Footer */}
      <PremiumFooter />

      {/* Modals & Slide-over Drawers */}
      <QuotationModal
        isOpen={isQuotationOpen}
        onClose={() => setIsQuotationOpen(false)}
      />

      <CustomerAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        favoriteDishes={favoriteDishes}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
        onSelectDish={(d) => {
          setIsAccountOpen(false);
          navigate(`/menu/${d.id}`);
        }}
      />

      <FloatingOrderSummary
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onOrderSuccess={(details) => {
          setOrderDetailsSuccess(details);
          setIsOrderSuccessOpen(true);
          setCart([]);
        }}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => setCart([])}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
        />
      )}

      {isComparisonOpen && (
        <ProductComparisonModal
          onClose={() => setIsComparisonOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      <SmartSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        dishes={DISHES}
        onSelectDish={(d) => {
          setIsSearchOpen(false);
          navigate(`/menu/${d.id}`);
        }}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderDetails={orderDetailsSuccess}
      />

      {/* Global Floating WhatsApp FAB */}
      <WhatsAppButton variant="floating" />

      {/* Mobile & Tablet Bottom Navigation */}
      <MobileBottomNav
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        favoriteCount={favoriteIds.size}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

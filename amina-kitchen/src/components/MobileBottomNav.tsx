import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, UtensilsCrossed, Image as GalleryIcon, Heart, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  favoriteCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  favoriteCount
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const items = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: UtensilsCrossed },
    { path: '/gallery', label: 'Gallery', icon: GalleryIcon },
    { path: '/favorites', label: 'Saved', icon: Heart, badge: favoriteCount },
    { path: '/order', label: 'Order', icon: ShoppingBag, badge: cartCount }
  ];

  return (
    <div className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg pb-safe">
      <div className="glass-panel bg-[#121A13]/90 backdrop-blur-2xl border border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] rounded-2xl px-3 py-2 flex items-center justify-between">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex-1 py-1.5 px-2 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none ${
                isActive ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {/* Active Indicator Background */}
              {isActive && (
                <motion.div
                  layoutId="mobileBottomNavActiveGlow"
                  className="absolute inset-0 bg-[#D4AF37]/15 rounded-xl border border-[#D4AF37]/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center space-y-1">
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-[#D4AF37]' : ''} transition-transform`} />
                  
                  {/* Badge */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full bg-[#D4AF37] text-[#121A13] text-[9px] font-extrabold flex items-center justify-center px-1 shadow-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] tracking-wide ${isActive ? 'font-bold text-[#D4AF37]' : 'font-medium'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

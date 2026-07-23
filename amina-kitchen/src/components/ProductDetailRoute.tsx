import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DISHES } from '../data/dishes';
import { Dish } from '../types';
import { ProductDetailView } from './ProductDetailView';
import { NotFoundView } from './NotFoundView';

interface ProductDetailRouteProps {
  favoriteIds: Set<string>;
  onToggleFavorite: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity?: number, instructions?: string) => void;
  onOpenCheckoutWithItem: (dish: Dish, quantity: number) => void;
}

export const ProductDetailRoute: React.FC<ProductDetailRouteProps> = ({
  favoriteIds,
  onToggleFavorite,
  onAddToCart,
  onOpenCheckoutWithItem
}) => {
  const { dishId } = useParams<{ dishId: string }>();
  const navigate = useNavigate();

  const dish = DISHES.find(d => d.id === dishId);

  if (!dish) {
    return <NotFoundView onBackHome={() => navigate('/menu')} />;
  }

  return (
    <ProductDetailView
      dish={dish}
      onBack={() => navigate('/menu')}
      onAddToCart={onAddToCart}
      onToggleFavorite={(id) => {
        const found = DISHES.find(x => x.id === id);
        if (found) onToggleFavorite(found);
      }}
      isFavorite={favoriteIds.has(dish.id)}
      onSelectDish={(d) => navigate(`/menu/${d.id}`)}
      onOpenCheckoutWithItem={onOpenCheckoutWithItem}
    />
  );
};

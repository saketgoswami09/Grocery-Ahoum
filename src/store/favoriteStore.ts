import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface FavoriteState {
  favorites: Product[];

  // Actions
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product: Product) => {
        const exists = get().favorites.some((f) => f.id === product.id);
        if (!exists) {
          set({ favorites: [...get().favorites, product] });
        }
      },

      removeFavorite: (productId: string) => {
        set({
          favorites: get().favorites.filter((f) => f.id !== productId),
        });
      },

      toggleFavorite: (product: Product) => {
        if (get().isFavorite(product.id)) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },

      isFavorite: (productId: string) => {
        return get().favorites.some((f) => f.id === productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'nectar-favorites',
    }
  )
);

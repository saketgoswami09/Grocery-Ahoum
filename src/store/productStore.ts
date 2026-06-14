import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, FilterState } from '@/types';
import { ProductCategory } from '@/types';
import { products as allProducts } from '@/data/products';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  filters: FilterState;
  isLoading: boolean;
  selectedCategory: ProductCategory | null;

  // Actions
  fetchProducts: () => Promise<void>;
  searchProducts: (query: string) => void;
  setCategory: (category: ProductCategory | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  getExclusiveOffers: () => Product[];
  getBestSelling: () => Product[];
}

const defaultFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 50],
  isOrganic: false,
  sortBy: 'popular',
};

const applyFilters = (
  products: Product[],
  filters: FilterState,
  searchQuery: string,
  selectedCategory: ProductCategory | null
): Product[] => {
  let result = [...products];

  // Category filter
  if (selectedCategory) {
    result = result.filter((p) => p.category === selectedCategory);
  } else if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Price range
  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  // Organic filter
  if (filters.isOrganic) {
    result = result.filter((p) => p.isOrganic);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price_low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return result;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      searchQuery: '',
      filters: defaultFilters,
      isLoading: false,
      selectedCategory: null,

      fetchProducts: async () => {
        set({ isLoading: true });
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            set({
              products: allProducts,
              filteredProducts: allProducts,
              isLoading: false,
            });
            resolve();
          }, 800);
        });
      },

      searchProducts: (query: string) => {
        const state = get();
        set({
          searchQuery: query,
          filteredProducts: applyFilters(
            state.products,
            state.filters,
            query,
            state.selectedCategory
          ),
        });
      },

      setCategory: (category: ProductCategory | null) => {
        const state = get();
        set({
          selectedCategory: category,
          filteredProducts: applyFilters(
            state.products,
            state.filters,
            state.searchQuery,
            category
          ),
        });
      },

      setFilters: (newFilters: Partial<FilterState>) => {
        const state = get();
        const merged = { ...state.filters, ...newFilters };
        set({
          filters: merged,
          filteredProducts: applyFilters(
            state.products,
            merged,
            state.searchQuery,
            state.selectedCategory
          ),
        });
      },

      resetFilters: () => {
        const state = get();
        set({
          filters: defaultFilters,
          selectedCategory: null,
          searchQuery: '',
          filteredProducts: applyFilters(
            state.products,
            defaultFilters,
            '',
            null
          ),
        });
      },

      getProductById: (id: string) => {
        return get().products.find((p) => p.id === id);
      },

      getProductsByCategory: (category: ProductCategory) => {
        return get().products.filter((p) => p.category === category);
      },

      getExclusiveOffers: () => {
        return get().products.filter((p) => p.originalPrice);
      },

      getBestSelling: () => {
        return [...get().products]
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 8);
      },
    }),
    {
      name: 'nectar-products',
      partialize: () => ({}),
    }
  )
);

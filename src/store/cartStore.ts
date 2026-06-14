import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, OrderStatus } from '@/types';

interface CartState {
  items: CartItem[];
  orderStatus: OrderStatus | null;
  orderId: string | null;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getItemQuantity: (productId: string) => number;
  placeOrder: () => Promise<boolean>;
  resetOrder: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderStatus: null,
      orderId: null,

      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((i) => i.product.id === productId);
        return item ? item.quantity : 0;
      },

      placeOrder: async () => {
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const success = Math.random() > 0.15; // 85% success rate
            if (success) {
              const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
              set({
                orderStatus: 'delivered' as OrderStatus,
                orderId,
                items: [],
              });
              resolve(true);
            } else {
              set({
                orderStatus: 'failed' as OrderStatus,
                orderId: null,
              });
              resolve(false);
            }
          }, 2000);
        });
      },

      resetOrder: () => {
        set({ orderStatus: null, orderId: null });
      },
    }),
    {
      name: 'nectar-cart',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

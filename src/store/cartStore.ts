import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];

  addItem: (product: Product) => void;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  getItemQuantity: (
    productId: string
  ) => number;

  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find(
          (item) => item.product.id === product.id
        );

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });

          return;
        }

        set({
          items: [
            ...get().items,
            {
              product,
              quantity: 1,
            },
          ],
        });
      },

      updateQuantity: (
        productId,
        quantity
      ) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find(
          (item) => item.product.id === productId
        );

        return item?.quantity ?? 0;
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            item.product.price *
              item.quantity,
          0
        );
      },
    }),
    {
      name: "nectar-cart",
    }
  )
);
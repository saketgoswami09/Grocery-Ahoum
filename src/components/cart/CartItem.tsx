import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { CartItem as CartItemType } from "@/types";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 py-5 border-b border-[#E2E2E2]">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-contain"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-dark">{product.name}</h3>

            <p className="text-sm text-gray">{product.unit}</p>
          </div>

          <button
            onClick={() => {
              console.log("remove clicked");
              removeItem(product.id);
            }}
          >
            <X size={18} className="text-gray" />
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Minus size={18} />
            </button>

            <span className="border border-[#E2E2E2] rounded-lg px-3 py-1 font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-primary"
            >
              <Plus size={18} />
            </button>
          </div>

          <p className="font-bold text-lg">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

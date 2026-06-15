import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";

export default function StickyCartPanel() {
  const navigate = useNavigate();
  const { items, getTotal, getItemCount, updateQuantity, removeItem } = useCartStore();
  const total = getTotal();
  const count = getItemCount();

  return (
    <aside className="hidden lg:block w-[300px] shrink-0 self-start sticky top-[80px]">
      <div className="bg-white rounded-2xl border border-gray-lighter/60 shadow-card overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-lightest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-dark tracking-wide uppercase">Cart</h3>
          </div>
          {count > 0 && (
            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
              {count} {count === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="w-14 h-14 mx-auto mb-3 bg-gray-lightest rounded-2xl flex items-center justify-center">
              <ShoppingBag size={24} className="text-gray-light" />
            </div>
            <p className="text-sm font-semibold text-gray">Your cart is empty</p>
            <p className="text-xs text-gray-light mt-1">Add items to get started</p>
          </div>
        ) : (
          <>
            <div className="max-h-[320px] overflow-y-auto no-scrollbar divide-y divide-gray-lightest">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 px-4 py-3 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-contain shrink-0 rounded-lg bg-gray-lightest/50 p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/40x40/F2F3F2/53B175?text=${product.name[0]}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-dark truncate">{product.name}</p>
                    <p className="text-[10px] text-gray">{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 rounded-md border border-gray-lighter flex items-center justify-center text-gray hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={10} strokeWidth={2.5} />
                    </button>
                    <span className="text-xs font-bold text-dark w-5 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                    >
                      <Plus size={10} strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-1">
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-gray-light hover:text-error transition-colors mb-0.5"
                    >
                      <X size={12} />
                    </button>
                    <span className="text-xs font-bold text-dark">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-lightest px-5 py-4 space-y-2">
              <div className="flex justify-between text-xs text-gray">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray">
                <span>Delivery</span>
                <span className="font-semibold text-primary">Free</span>
              </div>
              <hr className="border-gray-lightest" />
              <div className="flex justify-between text-sm font-bold text-dark">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="px-4 pb-4">
              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button text-sm"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

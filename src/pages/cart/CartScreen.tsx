import CartItem from "@/components/cart/CartItem";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CartScreen = () => {
  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { items, getTotal, placeOrder, resetOrder } = useCartStore();

  const total = getTotal();
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    resetOrder();
    const success = await placeOrder();
    setIsCheckingOut(false);
    navigate(success ? "/order-success" : "/order-failed", { replace: true });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-6">My Cart</h1>

      <div>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="w-full bg-primary text-white font-semibold py-4 rounded-lg mt-4 mb-6"
        >
          {isCheckingOut ? (
            "Processing..."
          ) : (
            <>
              Go to Checkout
              <span className="bg-white/20 px-3 py-0.5 rounded-md text-sm">
                ${total.toFixed(2)}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartScreen;

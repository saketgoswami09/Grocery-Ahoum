import CartItem from "@/components/cart/CartItem";
import { useCartStore } from "@/store/cartStore";

const CartScreen = () => {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-6">My Cart</h1>

      <div>
  {items.map((item) => (
    <CartItem
      key={item.product.id}
      item={item}
    />
  ))}
</div>
    </div>
  );
};

export default CartScreen;

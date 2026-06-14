import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import EmptyState from '@/components/skeleton/EmptyState';
import CheckoutSheet from '@/components/ui/CheckoutSheet';

export default function CartScreen() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="px-5 pt-6 pb-4"><h1 className="text-xl font-bold text-dark text-center">My Cart</h1></div>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState icon="🛒" title="Your cart is empty" description="Browse products and add items to your cart" actionLabel="Start Shopping" onAction={() => navigate('/home')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="px-5 pt-6 pb-4 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h1 className="text-xl font-bold text-dark text-center lg:text-left lg:text-2xl mb-6">My Cart</h1>
      </div>

      <div className="lg:max-w-7xl lg:mx-auto lg:px-6 lg:flex lg:gap-8">
        {/* Cart Items */}
        <div className="flex-1 px-5 lg:px-0">
          <div className="flex flex-col divide-y divide-gray-lightest">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 py-5 animate-fade-in">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/64x64/F2F3F2/53B175?text=${product.name[0]}`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-dark truncate">{product.name}</h3>
                  <p className="text-xs text-gray mb-2">{product.unit}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 border border-gray-lighter rounded-xl flex items-center justify-center text-gray hover:border-primary hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <span className="text-sm font-bold border border-gray-lighter rounded-lg px-3 py-1 min-w-[32px] text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button onClick={() => removeItem(product.id)} className="p-1 text-gray hover:text-error transition-colors" aria-label="Remove item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <p className="text-base font-bold text-dark">${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary (Desktop sticky sidebar) */}
        <div className="lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-24 px-5 lg:px-0">
            <div className="hidden lg:block bg-gray-lightest rounded-2xl p-6 mb-4">
              <h3 className="text-lg font-bold text-dark mb-4">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray mb-2"><span>Subtotal</span><span className="font-semibold text-dark">${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-gray mb-2"><span>Delivery</span><span className="font-semibold text-primary">Free</span></div>
              <hr className="my-3 border-gray-lighter" />
              <div className="flex justify-between text-lg font-bold text-dark"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button flex items-center justify-center gap-3 mt-4 lg:mt-0"
              id="go-to-checkout-btn"
            >
              Go to Checkout
              <span className="bg-white/20 px-3 py-0.5 rounded-md text-sm">${total.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Bottom Sheet */}
      <CheckoutSheet isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
       
    </div>
  );
}

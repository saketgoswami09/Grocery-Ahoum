import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutSheet({ isOpen, onClose }: CheckoutSheetProps) {
  const navigate = useNavigate();
  const { getTotal, placeOrder, resetOrder } = useCartStore();
  const [isPlacing, setIsPlacing] = useState(false);

  const total = getTotal();

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    resetOrder();
    const success = await placeOrder();
    setIsPlacing(false);
    onClose();
    navigate(success ? '/order-success' : '/order-failed', { replace: true });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-[9999] flex items-end justify-center lg:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-overlay-fade"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl lg:rounded-3xl animate-modal-slide-up shadow-modal overflow-hidden">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 lg:hidden">
          <div className="w-10 h-1 bg-gray-lighter rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-xl font-bold text-dark">Checkout</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-lightest transition-colors"
            aria-label="Close checkout"
            id="checkout-close-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <hr className="border-gray-lightest" />

        {/* Checkout Options */}
        <div className="divide-y divide-gray-lightest">
          {/* Delivery */}
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-lightest/50 transition-colors group"
            id="checkout-delivery"
          >
            <span className="text-base text-gray-dark">Delivery</span>
            <div className="flex items-center gap-2 text-sm text-dark font-medium">
              <span className="group-hover:text-primary transition-colors">Select Method</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>

          {/* Payment */}
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-lightest/50 transition-colors group"
            id="checkout-payment"
          >
            <span className="text-base text-gray-dark">Payment</span>
            <div className="flex items-center gap-2 text-sm">
              {/* Card icon */}
              <div className="w-7 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[3px] flex items-center justify-center shadow-sm">
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 bg-white/80 rounded-full" />
                  <div className="w-2 h-2 bg-white/40 rounded-full -ml-0.5" />
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>

          {/* Promo Code */}
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-lightest/50 transition-colors group"
            id="checkout-promo"
          >
            <span className="text-base text-gray-dark">Promo Code</span>
            <div className="flex items-center gap-2 text-sm text-dark font-medium">
              <span className="group-hover:text-primary transition-colors">Pick discount</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>

          {/* Total Cost */}
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-lightest/50 transition-colors group"
            id="checkout-total"
          >
            <span className="text-base text-gray-dark">Total Cost</span>
            <div className="flex items-center gap-2 text-sm text-dark font-bold">
              <span>${total.toFixed(2)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        </div>

        <hr className="border-gray-lightest" />

        {/* Terms */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-xs text-gray leading-relaxed">
            By placing an order you agree to our{' '}
            <span className="text-dark font-semibold">Terms</span> And{' '}
            <span className="text-dark font-semibold">Conditions</span>
          </p>
        </div>

        {/* Place Order Button */}
        <div className="px-6 pt-2 pb-8">
          <button
            onClick={handlePlaceOrder}
            disabled={isPlacing}
            className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-60 flex items-center justify-center gap-3"
            id="place-order-btn"
          >
            {isPlacing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

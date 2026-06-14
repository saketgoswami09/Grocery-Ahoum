import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';

export default function OrderFailedScreen() {
  const navigate = useNavigate();
  const resetOrder = useCartStore((s) => s.resetOrder);
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowButtons(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleRetry = () => {
    resetOrder();
    navigate('/cart', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-error/5 via-white to-error/3" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Error Illustration */}
        <div className="relative mb-10 animate-success-pop">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-error/10 animate-pulse-ring" style={{ margin: '-20px' }} />

          <div className="w-36 h-36 bg-error/10 rounded-full flex items-center justify-center relative">
            {/* Dashed ring */}
            <div
              className="absolute inset-2 rounded-full"
              style={{ border: '1.5px dashed rgba(223, 21, 37, 0.2)' }}
            />

            <div className="w-28 h-28 bg-error rounded-full flex items-center justify-center shadow-lg relative z-10">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <line
                  x1="18" y1="6" x2="6" y2="18"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round"
                  className="animate-check-draw"
                  style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
                />
                <line
                  x1="6" y1="6" x2="18" y2="18"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round"
                  className="animate-check-draw"
                  style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.15s' }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-700 ease-out ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-[26px] font-bold text-dark mb-3 leading-tight">Oops! Order Failed</h1>
          <p className="text-gray text-sm leading-relaxed">
            Something went wrong while processing your order. Please try again.
          </p>
        </div>

        {/* Buttons */}
        <div
          className={`w-full mt-10 transition-all duration-700 ease-out delay-200 ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={handleRetry}
            className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button mb-5"
            id="retry-order-btn"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/home', { replace: true })}
            className="text-sm text-dark font-semibold hover:text-primary transition-colors"
            id="failed-back-home-btn"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

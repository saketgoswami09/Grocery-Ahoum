import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
          <Check size={42} className="text-white" strokeWidth={3} />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-dark mb-4">
        Your Order has been accepted
      </h1>

      <p className="text-gray max-w-sm mb-10">
        Your items have been placed and are being processed.
      </p>

      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="w-full py-4 rounded-xl border border-gray-lighter font-semibold text-dark"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
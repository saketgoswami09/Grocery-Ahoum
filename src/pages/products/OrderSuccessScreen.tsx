import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center mb-8">
        <Check size={48} color="white" />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Your Order has been accepted
      </h1>

      <p className="text-gray mb-10">
        Your items have been placed and are being processed.
      </p>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-primary text-white py-4 rounded-xl"
      >
        Continue Shopping
      </button>
    </div>
  );
}
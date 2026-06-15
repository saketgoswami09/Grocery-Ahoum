import { useState } from "react"; // Added useState
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { ChevronLeft, Heart, Minus, Plus, Star } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useFavoriteStore } from "@/store/favoriteStore";

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Local state to manage counter volume
  const [quantity, setQuantity] = useState<number>(1);

  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const favorites = useFavoriteStore((s) => s.favorites);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div className="p-5 text-center font-semibold">Product not found</div>;
  }

  const loved = favorites.some((f) => f.id === product.id);

  // Counter helper functions
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevents counter going below 1
  };

  return (
    <div className="p-2 pb-20 max-w-xl mx-auto">
      {/* Product Image Section Wrapper */}
      <div className="relative bg-[#F2F3F2] rounded-b-3xl overflow-hidden">
        <div className="absolute top-5 left-5 z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white/60 backdrop-blur-xs rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        </div>
        <div className="h-64 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>
      </div>

      {/* Title & Favorite Row */}
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
        <button
          onClick={() => toggleFavorite(product)}
          className="p-2 shrink-0 hover:bg-gray-lightest rounded-full transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart
            size={24}
            fill={loved ? "#FF4D4F" : "transparent"}
            color={loved ? "#FF4D4F" : "#181725"}
          />
        </button>
      </div>
      <p className="text-gray text-sm mt-1">{product.unit}</p>

      {/* Interactive Counter & Pricing Row */}
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 border border-gray-lighter rounded-xl flex items-center justify-center text-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>
          
          {/* Dynamic Counter Target */}
          <span className="text-lg font-bold min-w-[40px] text-center px-2 py-1.5">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            className="w-10 h-10 border border-gray-lighter rounded-xl flex items-center justify-center text-primary hover:border-primary active:scale-95 transition-all"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <p className="text-2xl font-bold text-dark">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>

      <hr className="my-6 border-[#E2E2E2]" />
      
      {/* Details Section */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-dark mb-2">Product Detail</h3>
        <p className="text-sm text-gray leading-relaxed">{product.description}</p>
      </div>
      
      <hr className="my-4 border-[#E2E2E2]" />

      {/* Nutrition Facts Toggle Row */}
      <div className="flex items-center justify-between py-2">
        <span className="text-base font-bold text-dark">Nutritions</span>
        <span className="bg-[#F2F3F2] px-2.5 py-1 rounded-md text-xs font-semibold text-gray">
          {product.nutritionFacts ? product.nutritionFacts.length : "0"}
        </span>
      </div>
      
      <hr className="my-4 border-[#E2E2E2]" />

      {/* Review Ratings Row */}
      <div className="pt-2 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-dark">Review</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="#F3603F" color="#F3603F" />
              ))}
            </div>
            <span className="text-xs font-medium text-gray">({product.reviewCount || 0})</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="w-full bg-primary text-white font-semibold py-4 rounded-xl shadow-button hover:bg-primary-dark active:scale-[0.99] transition-all mt-4"
        onClick={() => {
        
          for (let i = 0; i < quantity; i++) {
            addItem(product);
          }
          navigate("/cart");
        }}
      >
        Add To Basket
      </button>
    </div>
  );
};

export default ProductDetailScreen;
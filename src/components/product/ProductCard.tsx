import { Plus } from "lucide-react";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        group
        w-full
        bg-white
        border
        border-[#E2E2E2]
        rounded-lg p-4 lg:p-5
        flex flex-col
        cursor-pointer
        hover:shadow-card
        hover:border-primary/30
        transition-all duration-300
        lg:hover:-translate-y-1
      "
    >
      <div className="h-24 lg:h-32 flex items-center justify-center mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/120x120/F2F3F2/53B175?text=${product.name[0]}`;
          }}
        />
      </div>

      <h3 className="font-semibold text-[15px] lg:text-base line-clamp-1 text-dark">
        {product.name}
      </h3>
      <p className="text-[13px] text-[#7C7C7C] mb-3 lg:mb-4">{product.unit}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-base font-bold text-dark">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="
            w-11 h-11 lg:w-10 lg:h-10
            rounded-[14px]
            bg-primary
            text-white
            flex items-center justify-center
            hover:scale-110 hover:bg-primary-dark
            active:scale-95
            transition-all duration-200
            shadow-sm
          "
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

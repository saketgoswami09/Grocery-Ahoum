import { Plus } from "lucide-react";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <div
     onClick={() => navigate(`/product/${product.id}`)}
      className="
      group
   w-45
  bg-white
  border
  border-[#E2E2E2]
   rounded-lg  p-5
  flex
  flex-col
  "
    >
      <div className=" h-27.5  flex items-center justify-center mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full w-auto object-contain"
        />
      </div>
      <h3
        className="
       font-semibold text-[16px] line-clamp-1"
      >
        {product.name}
      </h3>
      <p className="text-[14px] text-[#7C7C7C] mb-4">{product.unit}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-base font-bold text-dark">
          ${product.price.toFixed(2)}
        </span>

        <button
          className="
    w-12 h-12
    rounded-[17px]
    bg-primary
    text-white
    flex items-center justify-center
    hover:scale-105
    transition-all
  "
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

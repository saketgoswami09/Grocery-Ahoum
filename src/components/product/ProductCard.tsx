import { Plus } from "lucide-react";
import type { Product } from "../../types";
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      className="
      group

  bg-white
  border
  border-[#E2E2E2]
rounded-[18px]  p-5
  flex
  flex-col
  "
    >
      <div className="h-36 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300 "
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/200x150/E6F2EA/53B175?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      <h3
        className="
        text-[14px]
        mb-5 font-bold leading-tight line-clamp-2"
      >
        {product.name}
      </h3>{" "}
      <p className="text-xs text-gray mb-3">{product.unit}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-base font-bold text-dark">${product.price}</span>

        <button className="w-12 h-12 rounded-[17px] bg-primary text-white flex items-center justify-center">
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

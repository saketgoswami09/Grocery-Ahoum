import type { Product } from "../../types";
import ProductCard from "./ProductCard";

type ProductCarouselProps = {
  products: Product[];
};

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
      {products.map((product) => (
        <div key={product.id} className="min-w-40">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
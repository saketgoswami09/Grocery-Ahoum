import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { ChevronLeft, Heart, Minus, Plus, Star } from "lucide-react";

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-2">
      <div className="bg-gray-lightest rounded-b-3xl lg:rounded-3xl overflow-hidden lg:flex-1 lg:max-w-lg lg:sticky lg:top-24 lg:self-start">
        <div className="absolute top-5 left-5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <div className="bg-[#F2F3F2] rounded-b-3xl">
        <div className="h-52 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-48 object-contain"
          />
        </div>
      </div>

      <div className="flex items-center justify-between    ">
        <h1 className="text-2xl font-bold mt-6">{product.name}</h1>
        <Heart size={22} />
      </div>
      <p className="text-gray mt-1">{product.unit}</p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray hover:border-primary hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus />
          </button>
          <span className="text-lg font-bold min-w-6 text-center border border-gray-lighter rounded-md px-4 py-1.5">
            1
          </span>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-primary hover:border-primary hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            <Plus />
          </button>
        </div>
        <p className="text-2xl font-bold mt-4">${product.price}</p>
      </div>
      {/*  Product Detail*/}
      <hr className="my-6 border-[#E2E2E2]" />
      <div className="mb-4">
        <h3 className="text-base font-bold text-dark mb-2">Product Detail</h3>
        <p className="text-sm text-gray leading-relaxed">
          {product.description}
        </p>
        
      </div>
      <hr className="my-4 border-[#E2E2E2]" />

      <div className="flex items-center justify-between py-2">
        <span className="text-base font-bold">Nutritions</span>

        <div className="flex items-center gap-2">
          <span className="bg-[#F2F3F2] px-2 py-1 rounded-md text-xs text-gray">
            {product.nutritionFacts?.length}
          </span>
        </div>
      </div>
      <hr className="my-4 border-[#E2E2E2]" />

      <div className="border-t border-gray-lightest pt-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-dark">Review</span>
          <div className="flex gap-0.5 ml-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#F3603F" color="#F3603F" />
            ))}
          </div>
          <span className="text-xs text-gray">({product.reviewCount})</span>
        </div>
      </div>

      <button
        className="
    w-full
    bg-primary
    text-white
    font-semibold
    py-4
    rounded-lg
    mt-8
  "
      >
        Add To Basket
      </button>
    </div>
  );
};

export default ProductDetailScreen;

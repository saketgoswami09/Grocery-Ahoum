import ProductCard from "../../components/product/ProductCard";
import { products } from "../../data/products";
import carrot from "../../assets/icons/sw.png";
import location from "../../assets/icons/location.png";
import { Search } from "lucide-react";

const HomeScreen = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-center pt-8 gap-1 mb-1">
        <img src={carrot} />
      </div>

      {/* Search */}
      <div className="flex items-center justify-center gap-1">
        <img src={location} />
        <span className="text-sm font-semibold text-gray-dark">
          Dhaka, Bangladesh
        </span>
      </div>
      <div className="px-4 mt-4">
        <button className="w-full bg-[#F2F3F2] rounded-xl px-4 py-3 flex items-center gap-3">
          <Search />

          <span className="text-[#7C7C7C] text-sm">Search Store</span>
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;

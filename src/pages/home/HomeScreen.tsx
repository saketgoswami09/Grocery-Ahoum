import ProductCard from "../../components/product/ProductCard";
import { products } from "../../data/products";
import carrot from "../../assets/icons/sw.png";
import location from "../../assets/icons/location.png";
import { Search } from "lucide-react";
import SectionHeader from "../../components/product/SectionHeader";

const HomeScreen = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-center pt-6 gap-1 mb-1">
        <img src={carrot} />
      </div>

      {/* Search */}
      <div className="flex items-center justify-center gap-1">
        <img src={location} />
        <span className="text-[16px] font-semibold text-gray-dark">
          Dhaka, Bangladesh
        </span>
      </div>

      <div className="px-4 mt-4">
        <button className="w-full bg-[#F2F3F2] rounded-xl px-4 py-3 flex items-center gap-3">
          <Search />

          <span className="text-[#7C7C7C] text-sm">Search Store</span>
        </button>
      </div>
      {/* Baner */}
      <div className="lg:hidden px-5 mb-6 pt-4">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl py-7 px-5 text-center">
          <p className="text-lg font-bold text-dark">Fresh Vegetables</p>
          <p className="text-[14px] font-medium text-primary mt-1">
            Get Up To 40% OFF
          </p>
        </div>
      </div>
      {/* section header */}
      <SectionHeader title="Exclusive Offer" />
      {/* Products */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="min-w-40   lg:min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <SectionHeader title="Best Selling" />
      <section className="mb-8">
        <div className="flex items-center justify-between px-5 lg:px-0 mb-4"></div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="min-w-40   lg:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;

import { products } from "../../data/products";
import carrot from "../../assets/icons/sw.png";
import location from "../../assets/icons/location.png";
import { Search } from "lucide-react";
import SectionHeader from "../../components/product/SectionHeader";
import ProductCarousel from "@/components/product/ProductCarousel";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
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
        <button onClick={() => navigate("/search")} className="w-full bg-[#F2F3F2] rounded-xl px-4 py-3 flex items-center gap-3">
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
      {/* Exclusive Offer */}
      <section className="mb-8">
        <SectionHeader title="Exclusive Offer" />
        <ProductCarousel products={products.slice(0, 4)} />
      </section>
      {/*Best Selling  */}
      <section className="mb-8">
        <SectionHeader title="Best Selling" />
        <ProductCarousel products={products.slice(2, 6)} />
      </section>

       {/*Best Selling  */}
      <section className="mb-8">
        <SectionHeader title="Groceries" />
        <ProductCarousel products={products.slice(4, 8)} />
      </section>
    </div>
  );
};

export default HomeScreen;

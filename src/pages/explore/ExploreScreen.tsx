import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/category/CategoryCard";
import { useNavigate } from "react-router-dom";

const ExploreScreen = () => {
    const navigate = useNavigate()
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold text-center mb-6">
        Find Products
      </h1>

      <div className="px-4 mt-4">
        <button onClick={() => navigate("/search")} className="w-full bg-[#F2F3F2] rounded-xl px-4 py-3 flex items-center gap-3">
          <Search />

          <span className="text-[#7C7C7C] text-sm">Search Store</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
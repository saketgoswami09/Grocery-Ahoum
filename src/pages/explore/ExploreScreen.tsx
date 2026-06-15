import { useRef } from "react";
import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/category/CategoryCard";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ExploreScreen = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];

      gsap
        .timeline()
        .from(titleRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          searchRef.current,
          { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          cards,
          {
            opacity: 0,
            y: 16,
            scale: 0.96,
            duration: 0.5,
            ease: "power3.out",
            stagger: {
              each: 0.05,
              grid: "auto",
              from: "start",
            },
          },
          "-=0.25"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="p-4 pb-24">
      <h1 ref={titleRef} className="text-2xl font-bold text-center mb-6">
        Find Products
      </h1>

      <div ref={searchRef} className="px-4 mt-4">
        <button
          onClick={() => navigate("/search")}
          className="w-full bg-[#F2F3F2] rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <Search />
          <span className="text-[#7C7C7C] text-sm">Search Store</span>
        </button>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 gap-4 mt-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
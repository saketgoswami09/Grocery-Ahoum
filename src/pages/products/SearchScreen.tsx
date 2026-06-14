import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/skeleton/EmptyState";
import Skeleton from "@/components/skeleton/Skeleton";
import filter from "@/assets/icons/filter.svg";
import { ChevronLeft, CircleX,  Search, Smile } from "lucide-react";

export default function SearchScreen() {
  const navigate = useNavigate();
  const { products, fetchProducts, isLoading } = useProductStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState(products);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    const q = debouncedQuery.toLowerCase();
    setResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      ),
    );
  }, [debouncedQuery, products]);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="px-5 pt-6 lg:max-w-7xl lg:mx-auto lg:px-6">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-1 shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft />
          </button>
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7C7C7C"
              strokeWidth="2"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="w-full bg-gray-lightest rounded-md pl-11 pr-4 py-3 text-sm text-dark placeholder:text-gray-light outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
                aria-label="Clear search"
              >
                <CircleX className="bg-gray-light rounded-3xl stroke-1 border-0 " />
              </button>
            )}
          </div>
          <button
            onClick={() => navigate("/filters")}
            className="p-2 shrink-0"
            aria-label="Filters"
          >
            <img src={filter} />
          </button>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-52 rounded-xl" count={6} />
          </div>
        ) : !debouncedQuery.trim() ? (
          <EmptyState
            icon={<Search />}
            title="Search for products"
            description="Type something to find fresh groceries"
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={<Smile />}
            title="No results found"
            description={`We couldn't find anything for "${debouncedQuery}"`}
            actionLabel="Browse All"
            onAction={() => navigate("/explore")}
          />
        ) : (
          <>
            <p className="text-sm text-gray mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

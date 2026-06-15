import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import ProductCard from "@/components/product/ProductCard";
import Skeleton from "@/components/skeleton/Skeleton";
import DesktopHeader from "@/components/layout/DesktopHeader";
import CategorySidebar from "@/components/layout/CategorySidebar";
import StickyCartPanel from "@/components/layout/StickyCartPanel";
import veggies from "@/assets/edited-photo.png";

import {
  ChevronRight,
  Search,
  
} from "lucide-react";
import carrot from "../../assets/icons/sw.png";
import locationIcon from "../../assets/icons/location.png";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Quick-stat data (static, no need for state) ── */


/* ── Reusable product-section to avoid repeating grid markup ── */
function ProductSection({
  title,
  products,
  isLoading,
  skeletonCount = 4,
  onViewAll,
  badge,
}: {
  title: string;
  products: ReturnType<typeof useProductStore.getState>["products"];
  isLoading: boolean;
  skeletonCount?: number;
  onViewAll?: () => void;
  badge?: string;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-dark">{title}</h2>
        {onViewAll ? (
          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
          >
            View all <ChevronRight size={16} />
          </button>
        ) : badge ? (
          <span className="text-xs text-gray font-medium">{badge}</span>
        ) : null}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton key={i} className="h-60 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card-anim">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Mobile product carousel (horizontal scroll) ── */
function MobileProductCarousel({
  title,
  products,
  isLoading,
  onViewAll,
}: {
  title: string;
  products: ReturnType<typeof useProductStore.getState>["products"];
  isLoading: boolean;
  onViewAll: () => void;
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between px-5 mb-4">
        <h2 className="text-xl font-bold text-dark">{title}</h2>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-primary"
        >
          View all
        </button>
      </div>
      {isLoading ? (
        <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-52 w-40 rounded-xl shrink-0" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 px-5 overflow-x-auto no-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="product-card-anim min-w-[160px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════ */
/*                HOME SCREEN                      */
/* ═══════════════════════════════════════════════ */
export default function HomeScreen() {
  const navigate = useNavigate();
  const {
    products,
    isLoading,
    fetchProducts,
    getExclusiveOffers,
    getBestSelling,
  } = useProductStore();
  const selectedLocation = useAuthStore((s) => s.selectedLocation);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const exclusiveOffers = getExclusiveOffers();
  const bestSelling = getBestSelling();

  // Scroll-reveal animation for product cards
  useGSAP(
    () => {
      if (isLoading) return;
      ScrollTrigger.batch(".product-card-anim", {
        scroller: scrollContainerRef.current,
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 24,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    },
    {
      dependencies: [isLoading, exclusiveOffers, bestSelling],
      scope: scrollContainerRef,
    },
  );

  const goExplore = () => navigate("/explore");

  return (
    <div className="h-screen w-screen overflow-hidden bg-background lg:flex lg:items-stretch">
      <div className="h-screen flex-1 min-w-0 flex flex-col overflow-hidden">
        <DesktopHeader />

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pb-20 lg:pb-6 no-scrollbar"
        >
          {/* ═══ MOBILE ONLY ═══ */}
          <div className="lg:hidden px-5 pt-6 pb-4">
            <div className="flex items-center justify-center gap-1 mb-1">
              <img src={carrot} alt="Nectar logo" />
            </div>
            <div className="flex items-center justify-center gap-1">
              <img src={locationIcon} alt="Location" />
              <span className="text-sm font-semibold text-gray-dark">
                {selectedLocation
                  ? `${selectedLocation.zone}, ${selectedLocation.area}`
                  : "Dhaka, Bangladesh"}
              </span>
            </div>
          </div>

          <div className="px-5 mb-6 lg:hidden">
            <button
              onClick={() => navigate("/search")}
              className="w-full bg-gray-lightest rounded-md px-4 py-3 flex items-center gap-3 hover:bg-gray-lighter/60 transition-colors"
            >
              <Search />
              <span className="text-gray text-sm">Search Store</span>
            </button>
          </div>

          <div className="lg:hidden px-5 mb-6">
            <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl p-5 text-center">
              <p className="text-lg font-bold text-dark">Fresh Vegetables</p>
              <p className="text-sm text-primary font-semibold">
                Get Up To 40% OFF
              </p>
            </div>
          </div>

          {/* ═══ DESKTOP LAYOUT ═══ */}
          <div className="hidden lg:block">
            {/* Hero Banner */}
            <div className="max-w-7xl mx-auto px-6 pt-6 pb-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#e8f5e9] via-[#f1faf3] to-[#c8e6c9] px-12 py-16">
                <div className="grid grid-cols-2 items-center gap-10">
                  {/* Content */}
                  <div className="max-w-xl">
                    <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                      🌿 100% Organic
                    </span>

                    <h1 className="text-5xl font-bold text-dark leading-tight mb-5">
                      Fresh Groceries,
                      <br />
                      Delivered to Your Door
                    </h1>

                    <p className="text-base text-gray-dark/80 mb-8 max-w-md leading-relaxed">
                      Skip crowded stores and long checkout lines. Farm-fresh
                      produce and pantry essentials delivered right when you
                      need them.
                    </p>

                    <button
                      onClick={goExplore}
                      className="bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-button flex items-center gap-2"
                    >
                      Shop Now <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center">
                    <img
                      src={veggies}
                      alt="Fresh groceries"
                      className="w-full max-w-187.5 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3-Column Layout */}
            <div className="max-w-7xl mx-auto px-6 pb-10 flex gap-6 items-start">
              <CategorySidebar activeCat={activeCat} onSelect={setActiveCat} />

              <div className="flex-1 min-w-0 space-y-10">
                <ProductSection
                  title="Exclusive Offers"
                  products={exclusiveOffers}
                  isLoading={isLoading}
                  onViewAll={goExplore}
                />
                <ProductSection
                  title="Best Selling"
                  products={bestSelling}
                  isLoading={isLoading}
                  onViewAll={goExplore}
                />
                <ProductSection
                  title="All Products"
                  products={products}
                  isLoading={isLoading}
                  skeletonCount={8}
                  badge={`${products.length} products`}
                />
              </div>

              <div className="hidden xl:block">
                <StickyCartPanel />
              </div>
            </div>
          </div>

          {/* ═══ MOBILE CAROUSELS ═══ */}
          <div className="lg:hidden">
            <MobileProductCarousel
              title="Exclusive Offer"
              products={exclusiveOffers}
              isLoading={isLoading}
              onViewAll={goExplore}
            />
            <MobileProductCarousel
              title="Best Selling"
              products={bestSelling.slice(0, 5)}
              isLoading={isLoading}
              onViewAll={goExplore}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import { categories } from "@/data/categories";
import ProductCard from "@/components/product/ProductCard";
import Skeleton from "@/components/skeleton/Skeleton";

// Layout & Sectional Elements
import Sidebar from "@/components/layout/DesktopSidebar";
import DesktopHeader from "@/components/layout/DesktopHeader"; // Integrated Header

import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import carrot from "../../assets/icons/sw.png";
import location from "../../assets/icons/location.png";
import bannerBag from "../../assets/2771 1.png";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  const catScrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const exclusiveOffers = getExclusiveOffers();
  const bestSelling = getBestSelling();

  const scrollCategories = (dir: "left" | "right") => {
    if (!catScrollRef.current) return;
    const scrollAmount = 260;
    catScrollRef.current.scrollBy({
      left: dir === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCatScroll = () => {
    if (!catScrollRef.current) return;
    const el = catScrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const heroSlides = [
    {
      badge: "100% Organic",
      title: "Fresh groceries,\ndelivered fast",
      description:
        "Get your daily essentials delivered in as fast as 10 minutes",
      bgFrom: "#F2F9F5",
      bgTo: "#E6F4EC",
    },
  ];

  const [activeSlide] = useState(0);

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
    { dependencies: [isLoading, exclusiveOffers, bestSelling], scope: scrollContainerRef }
  );

  return (
    /* Fix 1: Locked global view canvas boundary container */
    <div className="h-screen w-screen overflow-hidden bg-background lg:flex lg:items-stretch">
      {/* ─── DESKTOP SIDEBAR ─── */}
      <div className="hidden lg:block w-55 shrink-0 border-r border-gray-lighter bg-white">
        <Sidebar />
      </div>

      {/* ─── MAIN APP CANVAS ─── */}
      {/* Fix 2: Isolated vertical middle channel structure */}
      <div className="h-screen flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* DESKTOP HEADER (Only visible on wide ports inside the mid-channel) */}
        <DesktopHeader />

        {/* Dynamic Inner Scroll Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pb-20 lg:pb-6 no-scrollbar"
        >
          {/* MOBILE ONLY: Top Brand Location bar */}
          <div className="lg:hidden px-5 pt-6 pb-4">
            <div className="flex items-center justify-center gap-1 mb-1">
              <img src={carrot} alt="Nectar logo" />
            </div>
            <div className="flex items-center justify-center gap-1">
              <img src={location} alt="Location" />
              <span className="text-sm font-semibold text-gray-dark">
                {selectedLocation
                  ? `${selectedLocation.zone}, ${selectedLocation.area}`
                  : "Dhaka, Bangladesh"}
              </span>
            </div>
          </div>

          {/* MOBILE ONLY: Dummy Search Anchor */}
          <div className="px-5 mb-6 lg:hidden">
            <button
              onClick={() => navigate("/search")}
              className="w-full bg-gray-lightest rounded-md px-4 py-3 flex items-center gap-3 hover:bg-gray-lighter/60 transition-colors"
            >
              <Search />
              <span className="text-gray text-sm">Search Store</span>
            </button>
          </div>

          {/* DESKTOP HERO BANNER */}
          <div className="hidden lg:block lg:px-6 lg:pt-6">
            <section className="mb-8">
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  // Replicating the background gradient from image_bda162.png
                  background:
                    "linear-gradient(102.5deg, #F3ECE3 0%, #F5EAE9 45%, #E9F4EE 100%)",
                  minHeight: "280px",
                }}
              >
                {/* Target Wrapper - Added relative to anchor our absolute child layers safely */}
                <div className="flex flex-row items-center h-full relative min-h-[280px]">
                  {/* Left Content Column */}
                  <div className="flex-1 p-12 flex flex-col justify-center z-10">
                    <h1 className="text-[38px] font-extrabold text-dark leading-tight mb-3 whitespace-pre-line">
                      {heroSlides[activeSlide].title}
                    </h1>
                    <p className="text-sm text-gray mb-5 max-w-sm">
                      {heroSlides[activeSlide].description}
                    </p>
                    <button
                      onClick={() => navigate("/explore")}
                      className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-primary-dark transition-all active:scale-95 shadow-button w-fit"
                    >
                      Shop Now
                      <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Right Graphic Column: Main Vegetable Pile (image_bda162.png Aspect) */}
                  <div className="absolute right-12 bottom-0 top-0 w-1/2 flex items-end justify-center overflow-hidden z-10">
                    <div className="relative w-full h-[95%] flex items-end justify-center">
                      <img
                        src={bannerBag}
                        alt="Fresh groceries"
                        className="h-full object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Layer 1: Top Right Floating Tomato & Salad Mix */}

                {/* Decorative Layer 2: Bottom Right Corner Single Green Leaf */}

                {/* Center-Bottom Slider Pagination Tracker (8119f339-ccdf-4ba3-8b22-f468a9ca9892.png style) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  <span className="w-5 h-1.5 rounded-full bg-primary transition-all duration-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-light/40 transition-all duration-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-light/40 transition-all duration-300" />
                </div>
              </div>
            </section>
          </div>
          {/* MOBILE ONLY: Special Deal Snippet */}
          <div className="lg:hidden px-5 mb-6">
            <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl p-5 text-center">
              <p className="text-lg font-bold text-dark">Fresh Vegetables</p>
              <p className="text-sm text-primary font-semibold">
                Get Up To 40% OFF
              </p>
            </div>
          </div>

          {/* DESKTOP ONLY: Shop by Categories */}
          <div className="hidden lg:block lg:px-6">
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-dark">
                  Shop by Categories
                </h2>
              </div>
              <div className="relative">
                {canScrollLeft && (
                  <button
                    onClick={() => scrollCategories("left")}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-gray-lighter flex items-center justify-center"
                  >
                    <ChevronLeft size={18} className="text-dark" />
                  </button>
                )}
                {canScrollRight && (
                  <button
                    onClick={() => scrollCategories("right")}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-md border border-gray-lighter flex items-center justify-center"
                  >
                    <ChevronRight size={18} className="text-dark" />
                  </button>
                )}

                <div
                  ref={catScrollRef}
                  onScroll={handleCatScroll}
                  className="flex gap-4 overflow-x-auto no-scrollbar"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className="flex flex-col items-center gap-2 shrink-0 group"
                    >
                      <div
                        className="w-19 h-19 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                        style={{ backgroundColor: cat.color + "20" }}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <span className="text-[12px] font-semibold text-dark text-center leading-tight">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* PRODUCT CAROUSELS / GRIDS */}
          <div className="lg:px-6">
            {/* Featured / Exclusive Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between px-5 lg:px-0 mb-4">
                <h2 className="text-xl lg:text-lg font-bold text-dark">
                  <span className="lg:hidden">Exclusive Offer</span>
                  <span className="hidden lg:inline">Featured Products</span>
                </h2>
                <button
                  onClick={() => navigate("/explore")}
                  className="text-sm font-semibold text-primary"
                >
                  View all
                </button>
              </div>
              {isLoading ? (
                <div className="flex gap-4 px-5 lg:px-0 overflow-x-auto no-scrollbar">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-52 w-40 rounded-xl shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 px-5 lg:px-0 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-5">
                  {exclusiveOffers.map((product) => (
                    <div
                      key={product.id}
                      className="product-card-anim min-w-[160px] lg:min-w-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Best Selling Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between px-5 lg:px-0 mb-4">
                <h2 className="text-xl lg:text-lg font-bold text-dark">
                  Best Selling
                </h2>
                <button
                  onClick={() => navigate("/explore")}
                  className="text-sm font-semibold text-primary"
                >
                  View all
                </button>
              </div>
              {isLoading ? (
                <div className="flex gap-4 px-5 lg:px-0 overflow-x-auto no-scrollbar">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-52 w-40 rounded-xl shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 px-5 lg:px-0 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-5">
                  {bestSelling.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="product-card-anim min-w-[160px] lg:min-w-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP RIGHT CART SIDE PANEL ─── */}
    </div>
  );
}
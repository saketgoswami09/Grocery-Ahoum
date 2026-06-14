import { NavLink, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";

// Define a type for the navigation items to keep TypeScript happy
interface NavItem {
  to: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

export default function BottomNav() {
  const location = useLocation();
  // Ensure your Zustand store returns a number (fallback to 0 if undefined)
  const itemCount = useCartStore((s) => s.getItemCount?.() ?? 0);

  // Don't show on auth/onboarding pages
  const hideOnRoutes = [
    "/",
    "/filters",
    "/onboarding",
    "/login",
    "/signup",
    "/otp",
    "/location",
  ];
  
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navItems: NavItem[] = [
    {
      to: "/home",
      label: "Shop",
      // Pass the active state to dynamically style the icon colors/fills
      icon: (active) => (
        <Home className={active ? "text-primary" : "text-dark"} />
      ),
    },
    {
      to: "/explore",
      label: "Explore",
      icon: (active) => (
        <Search className={active ? "text-primary" : "text-dark"} />
      ),
    },
    {
      to: "/cart",
      label: "Cart",
      icon: (active) => (
        <ShoppingCart className={active ? "text-primary" : "text-dark"} />
      ),
    },
    {
      to: "/favorites",
      label: "Favourite",
      icon: (active) => (
        <Heart className={active ? "text-primary fill-primary" : "text-dark"} />
      ),
    },
    {
      to: "/account",
      label: "Account",
      icon: (active) => (
        <User className={active ? "text-primary" : "text-dark"} />
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-nav z-50 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          // Check if current path matches item route
          const isActive = location.pathname.startsWith(item.to);
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-0.5 py-1 relative"
              aria-label={item.label}
            >
              <div className="relative">
                {/* Fixed: Pass the standard isActive boolean here */}
                {item.icon(isActive)}
                
                {item.to === "/cart" && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-dark"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
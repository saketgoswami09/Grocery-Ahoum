import { NavLink, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  // Adjusted callback signature so classes can be injected cleanly
  icon: (className: string) => React.ReactNode;
}

export default function BottomNav() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount?.() ?? 0);

  const hideOnRoutes = [
    "/number",
    "/signin",
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
      icon: (cls) => <Home className={cls} />,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: (cls) => <Search className={cls} />,
    },
    {
      to: "/cart",
      label: "Cart",
      icon: (cls) => <ShoppingCart className={cls} />,
    },
    {
      to: "/favorites",
      label: "Favourite",
      icon: (cls) => (
        <Heart className={`${cls} ${cls.includes("text-primary") ? "fill-primary" : ""}`} />
      ),
    },
    {
      to: "/account",
      label: "Account",
      icon: (cls) => <User className={cls} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-nav z-50 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            // Leverage React Router's built-in isActive callback state
            className={({ isActive }) => 
              `flex flex-col items-center gap-0.5 py-1 relative w-full ${
                isActive ? "text-primary" : "text-dark"
              }`
            }
            aria-label={item.label}
          >
            {/* The render prop signature context automatically updates classes */}
            {({ isActive }) => {
              const iconClass = isActive ? "text-primary" : "text-dark";
              
              return (
                <>
                  <div className="relative">
                    {item.icon(iconClass)}

                    {item.to === "/cart" && itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {itemCount > 9 ? "9+" : itemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold transition-colors">
                    {item.label}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
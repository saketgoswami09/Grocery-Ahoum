import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import {
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";
export default function BottomNav() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());

  // Don't show on auth/onboarding pages
  const hideOnRoutes = [ '/onboarding', '/login', '/signup', '/otp', '/location'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navItems = [
    {
      to: '/',
      label: 'Shop',
      icon: (isActive: boolean) => (
       <Home/>
      ),
    },
    {
      to: '/explore',
      label: 'Explore',
      icon: () => (
        <Search/>
      ),
    },
    {
      to: '/cart',
      label: 'Cart',
      icon: () => (
        <ShoppingCart/>
      ),
    },
    {
      to: '/favorites',
      label: 'Favourite',
      icon: () => (
        <Heart/>
      ),
    },
    {
      to: '/account',
      label: 'Account',
      icon: () => (
        <User/>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-nav z-50 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-0.5 py-1 relative"
              aria-label={item.label}
            >
              <div className="relative">
                {item.icon(isActive)}
                {item.to === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-primary' : 'text-dark'
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

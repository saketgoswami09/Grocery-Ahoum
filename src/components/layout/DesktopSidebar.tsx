import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import {
  Home,
  Compass,
  LayoutGrid,
  Heart,
  ShoppingCart,
  Sprout, // 💡 Brand Leaf Logo replacement
  ArrowRight,
} from 'lucide-react';

export default function DesktopSidebar() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const favCount = useFavoriteStore((s) => s.favorites.length);

  // Don't show on auth/onboarding pages
  const hideOnRoutes = ['/', '/onboarding', '/login', '/signup', '/otp', '/location', '/signin', '/number'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  const navItems = [
    { to: '/home', label: 'Home', icon: Home, badge: 0 },
    { to: '/explore', label: 'Explore', icon: Compass, badge: 0 },
    { to: '/search', label: 'Categories', icon: LayoutGrid, badge: 0 },
    { to: '/favorites', label: 'Favorites', icon: Heart, badge: favCount },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: itemCount },
  ];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden lg:flex flex-col sticky top-0 h-screen shrink-0 z-40 w-[220px] bg-white border-r border-gray-lighter/60 justify-between"
    >
      <div>
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-2.5 px-6 pt-7 pb-6">
          <div className="w-8 h-8 flex items-center justify-center text-primary">
            {/* 💡 Replaced raw SVG with Lucide Sprout Icon */}
            <Sprout size={26} strokeWidth={2.5} className="fill-primary/10" />
          </div>
          <span className="text-lg font-bold text-dark tracking-tight">Nectar</span>
        </NavLink>

        {/* Navigation */}
        <nav className="px-3">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || 
                (item.to === '/home' && location.pathname.startsWith('/home')) ||
                (item.to === '/explore' && location.pathname.startsWith('/explore')) ||
                (item.to === '/search' && (location.pathname.startsWith('/category') || location.pathname.startsWith('/search')));
              
              const IconComp = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-gray-dark hover:bg-gray-lightest/80 hover:text-dark'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <IconComp
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-primary' : 'text-gray group-hover:text-dark'
                        }`}
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.7}
                        fill={isActive && item.to === '/home' ? 'currentColor' : 'none'}
                      />
                      {item.badge > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-0.5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[13px] font-semibold">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Promo Card Wrapper */}
      <div className="px-4 pb-5">
        <div
          className="rounded-2xl p-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
          }}
        >
          <p className="text-sm font-bold text-dark leading-snug">
            Get 20% off
          </p>
          <p className="text-[11px] text-gray-dark mt-0.5 mb-3">
            on your first order
          </p>
          <NavLink
            to="/explore"
            className="inline-flex items-center gap-1.5 bg-primary text-white text-[11px] font-semibold px-3.5 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Shop Now
            {/* 💡 Replaced raw button arrow inline SVG with Lucide ArrowRight */}
            <ArrowRight size={13} strokeWidth={2.5} />
          </NavLink>
          <div className="absolute -bottom-2 -right-2 text-4xl opacity-60 rotate-12 select-none">🥬</div>
          <div className="absolute bottom-6 right-1 text-2xl opacity-50 -rotate-12 select-none">🥕</div>
        </div>
      </div>
    </aside>
  );
}
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Bell, MapPin, ChevronDown, Search } from 'lucide-react';

export default function DesktopHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const selectedLocation = useAuthStore((s) => s.selectedLocation);
  const itemCount = useCartStore((s) => s.getItemCount());

  // Don't show on auth/onboarding pages
  const hideOnRoutes = ['/', '/onboarding', '/login', '/signup', '/otp', '/location', '/signin', '/number'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <header className="hidden lg:flex items-center justify-between h-[64px] px-6 bg-white border-b border-gray-lighter/60 sticky top-0 z-30">
      {/* Search Bar */}
      <button
        onClick={() => navigate('/search')}
        className="flex items-center gap-2.5 bg-gray-lightest/70 rounded-xl px-4 py-2.5 w-[380px] hover:bg-gray-lightest transition-colors group"
      >
        <Search className="text-gray" size={16} strokeWidth={2} />
        <span className="text-[13px] text-gray flex-1 text-left">
          Search for fruits, vegetables, groceries...
        </span>
        <div className="flex items-center gap-0.5 text-[11px] text-gray-light border border-gray-lighter rounded-md px-1.5 py-0.5">
          <span>⌘</span><span>K</span>
        </div>
      </button>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Deliver to */}
        <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <MapPin className="text-primary" size={16} strokeWidth={2} />
          <div className="text-left">
            <p className="text-[10px] text-gray leading-none">Deliver to</p>
            <div className="flex items-center gap-1">
              <p className="text-xs font-bold text-dark">
                {selectedLocation ? `${selectedLocation.zone}, ${selectedLocation.city}` : 'New York, USA'}
              </p>
              <ChevronDown size={12} className="text-gray" />
            </div>
          </div>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-lightest rounded-xl transition-colors">
          <Bell size={20} strokeWidth={1.7} className="text-dark" />
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
          )}
        </button>

        {/* User Profile */}
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-primary">
                {user?.name?.charAt(0) || 'A'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-semibold text-dark">
              Hi, {user?.name?.split(' ')[0] || 'Guest'}
            </span>
            <ChevronDown size={14} className="text-gray" />
          </div>
        </button>
      </div>
    </header>
  );
}

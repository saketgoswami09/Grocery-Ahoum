import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Ticket, 
  Bell, 
  HelpCircle, 
  Info, 
  User, 
  SquarePen, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';

export default function AccountScreen() {
  const navigate = useNavigate();
  const { user, logout, selectedLocation } = useAuthStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const clearFavorites = useFavoriteStore((s) => s.clearFavorites);

  const handleLogout = () => {
    logout();
    clearCart();
    clearFavorites();
    navigate('/', { replace: true });
  };

  // Swapped out text emojis for Lucide Component mappings
  const menuItems = [
    { icon: <ShoppingBag size={20} />, label: 'Orders', action: () => {} },
    { icon: <MapPin size={20} />, label: 'Delivery Address', action: () => {} },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', action: () => {} },
    { icon: <Ticket size={20} />, label: 'Promo Code', action: () => {} },
    { icon: <Bell size={20} />, label: 'Notifications', action: () => {} },
    { icon: <HelpCircle size={20} />, label: 'Help', action: () => {} },
    { icon: <Info size={20} />, label: 'About', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="lg:max-w-7xl lg:mx-auto lg:px-6">
        
        {/* Profile Header */}
        <div className="px-5 pt-8 pb-6 flex items-center gap-4 border-b border-gray-lightest">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0 overflow-hidden text-primary">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-dark truncate">{user?.name || 'Guest'}</h2>
            <p className="text-sm text-gray truncate">{user?.email || 'guest@example.com'}</p>
          </div>
          <button className="p-2 text-primary shrink-0 hover:bg-primary/5 rounded-lg transition-colors" aria-label="Edit profile">
            <SquarePen size={20} />
          </button>
        </div>

        {/* Location */}
        {selectedLocation && (
          <div className="px-5 py-3 border-b border-gray-lightest flex items-center gap-3">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm text-gray">{selectedLocation.zone}, {selectedLocation.area}</span>
          </div>
        )}

        {/* Menu Items */}
        <div className="px-5 py-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-4 py-4 border-b border-gray-lightest hover:bg-gray-lightest/40 transition-colors -mx-2 px-2 rounded-lg group"
            >
              {/* Dynamic Lucide Icon Injection */}
              <div className="text-gray group-hover:text-primary transition-colors">
                {item.icon}
              </div>
              <span className="text-base font-semibold text-dark flex-1 text-left">{item.label}</span>
              <ChevronRight size={16} className="text-gray-light" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="px-5 py-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-[var(--radius-lg)] border-2 border-gray-lightest text-primary font-semibold hover:bg-primary/5 hover:border-primary/30 transition-all max-w-lg mx-auto"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
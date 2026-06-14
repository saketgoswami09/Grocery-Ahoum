import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import EmptyState from '@/components/skeleton/EmptyState';

export default function FavoritesScreen() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavoriteStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddAllToCart = () => {
    favorites.forEach((product) => addItem(product));
    navigate('/cart');
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="px-5 pt-6 pb-4"><h1 className="text-xl font-bold text-dark text-center">Favourites</h1></div>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState icon="❤️" title="No favourites yet" description="Add products to your favourites to see them here" actionLabel="Explore Products" onAction={() => navigate('/explore')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="px-5 pt-6 pb-4 lg:max-w-7xl lg:mx-auto lg:px-6">
        <h1 className="text-xl font-bold text-dark text-center lg:text-left lg:text-2xl mb-6">Favourites</h1>
      </div>

      <div className="px-5 lg:max-w-7xl lg:mx-auto lg:px-6">
        <div className="flex flex-col divide-y divide-gray-lightest">
          {favorites.map((product) => (
            <div key={product.id} className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-lightest/40 -mx-3 px-3 rounded-xl transition-colors" onClick={() => navigate(`/product/${product.id}`)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-contain shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/56x56/F2F3F2/53B175?text=${product.name[0]}`;
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-dark truncate">{product.name}</h3>
                <p className="text-xs text-gray">{product.unit}</p>
              </div>
              <p className="text-base font-bold text-dark shrink-0">${product.price.toFixed(2)}</p>
              <button
                onClick={(e) => { e.stopPropagation(); removeFavorite(product.id); }}
                className="p-1.5 text-gray hover:text-error transition-colors shrink-0"
                aria-label="Remove from favorites"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddAllToCart}
          className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark transition-colors shadow-button mt-6 max-w-lg mx-auto block"
        >
          Add All To Cart
        </button>
      </div>
    </div>
  );
}
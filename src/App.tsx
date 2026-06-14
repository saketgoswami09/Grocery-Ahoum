import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import ProductDetailScreen from "./pages/products/ProductDetailScreen";
import CartScreen from "./pages/cart/CartScreen";
import BottomNav from "./components/layout/BottomNav";
import ExploreScreen from "./pages/explore/ExploreScreen";
import FavoritesScreen from "./pages/products/FavoritesScreen";
import SearchScreen from "./pages/products/SearchScreen";
import FiltersScreen from "./pages/explore/FiltersScreen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/filters" element={<FiltersScreen />} />
      </Routes>

      <BottomNav />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import ProductDetailScreen from "./pages/products/ProductDetailScreen";
import CartScreen from "./pages/cart/CartScreen";
import BottomNav from "./components/layout/BottomNav";
import ExploreScreen from "./pages/explore/ExploreScreen";
import FavoritesScreen from "./pages/products/FavoritesScreen";
import SearchScreen from "./pages/products/SearchScreen";
import FiltersScreen from "./pages/explore/FiltersScreen";
import OrderSuccessScreen from "./pages/products/OrderSuccessScreen";
import OrderFailedScreen from "./pages/products/OrderFailedScreen";
import SplashScreen from "./pages/onboarding/SplashScreen";
import OnboardingScreen from "./pages/onboarding/OnboardingScreen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />

        
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/filters" element={<FiltersScreen />} />
        <Route path="/order-success" element={<OrderSuccessScreen />} />

        <Route path="/order-failed" element={<OrderFailedScreen />} />
      </Routes>

      <BottomNav />
    </>
  );
}

export default App;

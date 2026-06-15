import { Routes, Route, Navigate } from "react-router-dom";
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
import AccountScreen from "./pages/auth/AccountsScreen";
import SignInScreen from "./pages/auth/SignInScreen";
import NumberScreen from "./pages/auth/NumberScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import { useAuthStore } from "./store/authStore";
import OTPScreen from "./pages/auth/OTPScreen";
import LocationScreen from "./pages/auth/LocationScreen";
import SignupScreen from "./pages/auth/SignupScreen";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/onboarding" replace />;
}

function App() {
  return (
    <>
      <Routes>
        {/* ─── Public Unauthenticated Routes ─── */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/number" element={<NumberScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/location" element={<LocationScreen />} />

        {/* ─── Protected App Routes (Require Authentication) ─── */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <ExploreScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountScreen />
            </ProtectedRoute>
          }
        />

        {/* ─── Secondary Product/Utility Routing ─── */}
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/filters" element={<FiltersScreen />} />
        <Route path="/order-success" element={<OrderSuccessScreen />} />
        <Route path="/order-failed" element={<OrderFailedScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav />
    </>
  );
}

export default App;
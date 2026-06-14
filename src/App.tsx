import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import ProductDetailScreen from "./pages/products/ProductDetailScreen";
import CartScreen from "./pages/cart/CartScreen";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/product/:productId" element={<ProductDetailScreen />} />
      <Route path="/cart" element={<CartScreen />} />
    </Routes>
  );
}

export default App;

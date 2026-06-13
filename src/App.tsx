import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import ProductDetailScreen from "./pages/products/ProductDetailScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route
        path="/product/:productId"
        element={<ProductDetailScreen />}
      />
    </Routes>
  );
}

export default App;
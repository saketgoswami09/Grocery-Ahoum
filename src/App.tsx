import "./App.css";
import ProductCard from "./components/product/ProductCard";
import { products } from "./data/products";

function App() {
  return (
    <div className="p-8">
      <ProductCard product={products[0]} />
    </div>
  );
}

export default App;
import { products } from "./data/products";
import ProductCard from "./components/product/ProductCard";

function App() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-x-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;

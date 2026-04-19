import { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useCart } from "../../CartContext";

const ProductList = () => {
  const { state, dispatch } = useCart();

  useEffect(() => {
    if (state.products.length > 0) return;

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      });
  }, []);

  if (state.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-gray-400">
        <div className="animate-pulse text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* 🔥 Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Explore Products
          </h1>
          <p className="text-gray-400 mt-2">
            Discover something you’ll actually want to buy
          </p>
        </div>

        {/* 🔥 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {state.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductList;

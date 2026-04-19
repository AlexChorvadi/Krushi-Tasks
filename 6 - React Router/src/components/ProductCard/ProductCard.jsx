import { useCart } from "../../CartContext";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useCart();

  const isFav = state?.fav.some((item) => item.id === product.id);
  const inCart = state?.cart.some((item) => item.id === product.id);

  return (
    <div className="group relative bg-[#0f172a] rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden shadow-md hover:shadow-indigo-500/20">

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-xl"></div>

      {/* Image */}
      <div className="relative bg-[#020617] p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Fav Button */}
        <button
          onClick={() => {
            const type = isFav ? "REMOVE_FROM_FAV" : "ADD_TO_FAV";
            dispatch({ type, payload: product });
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border border-white/10 transition
          ${
            isFav
              ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          ❤️
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 relative z-10">

        {/* Category */}
        <span className="text-xs font-medium text-indigo-400 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-100 line-clamp-1">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
          ${product.price.toFixed(2)}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Button */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              if (inCart) {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
                return;
              }
              dispatch({ type: "ADD_TO_CART", payload: product });
            }}
            className={`flex-1 py-2 rounded-xl font-medium transition transform
            ${
              inCart
                ? "bg-red-700 text-red-400 hover:bg-red-600/80 shadow-inner"
                : "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-indigo-500/30"
            }`}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

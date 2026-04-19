import { useCart } from "../../CartContext";

const FavModal = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="p-4 flex flex-col h-full">

      {/* Empty State */}
      {state.fav.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400">
          <span className="text-5xl mb-3 animate-pulse">💔</span>
          <p className="text-lg">No favourites yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Start adding items you like
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">

          {state.fav.map((item) => {
            const inCart = state.cart.some((c) => c.id === item.id);

            return (
              <li
                key={item.id}
                className="group relative bg-[#0f172a] border border-white/10 rounded-xl p-3 hover:border-indigo-500/40 transition-all shadow hover:shadow-indigo-500/20 flex flex-col"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-xl"></div>

                {/* Image */}
                <div className="bg-[#020617] rounded-lg p-2 flex items-center justify-center h-24 mb-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                {/* Info */}
                <h3 className="text-sm font-medium text-gray-100 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  ${item.price.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="mt-3 flex gap-2 relative z-10">

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      if (!inCart) {
                        dispatch({ type: "ADD_TO_CART", payload: item });
                      }
                    }}
                    className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition transform
                      ${inCart
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:scale-105 shadow shadow-indigo-500/30"
                      }`}
                  >
                    {inCart ? "Added ✓" : "Add"}
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_FAV", payload: item })
                    }
                    className="text-red-400 hover:text-red-500 text-xs px-2 py-1 rounded-md hover:bg-red-500/10 transition"
                  >
                    Remove
                  </button>


                </div>
              </li>
            );
          })}

        </ul>
      )}
    </div>
  );
};

export default FavModal;

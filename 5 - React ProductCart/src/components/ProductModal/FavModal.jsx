const FavModal = ({ state, dispatch }) => {
  return (
    <div className="p-4 flex flex-col h-full">

      {/* Empty State */}
      {state.fav.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <span className="text-4xl mb-2">💔</span>
          <p>No favourites yet</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <ul className="grid grid-cols-2 gap-3 overflow-y-auto">

            {state.fav.map((item) => {
              const inCart = state.cart.some((c) => c.id === item.id);

              return (
                <li
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition flex flex-col"
                >

                  {/* Image */}
                  <div className="bg-white rounded-lg p-2 flex items-center justify-center h-24 mb-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-sm font-medium line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-teal-600 font-semibold">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Actions */}
                  <div className="mt-2 flex gap-2">

                    {/* Move to Cart */}
                    <button
                      onClick={() => {
                        if (!inCart) {
                          dispatch({ type: "ADD_TO_CART", payload: item });
                        }
                      }}
                      className={`flex-1 text-xs py-1 rounded-md transition
                        ${
                          inCart
                            ? "bg-gray-200 text-gray-500"
                            : "bg-teal-600 text-white hover:bg-teal-500"
                        }`}
                    >
                      {inCart ? "Added" : "Add"}
                    </button>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_FAV", payload: item })
                      }
                      className="text-red-500 text-sm px-2"
                    >
                      ✕
                    </button>

                  </div>
                </li>
              );
            })}

          </ul>
        </>
      )}
    </div>
  );
};

export default FavModal;

const ProductCard = ({ product, dispatch, state }) => {
    const isFav = state?.fav.some((item) => item.id === product.id);
    const inCart = state?.cart.some((item) => item.id === product.id);

    return (
        <div className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden">

            <div className="relative bg-gray-100 p-4 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                />

                <button
                    onClick={() => {
                        const type = isFav ? "REMOVE_FROM_FAV" : "ADD_TO_FAV";
                        dispatch({ type, payload: product });
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow 
          ${isFav ? "grayscale-0" : "grayscale hover:bg-white"}`}
                >
                    ❤️
                </button>
            </div>

            <div className="p-4 flex flex-col gap-2">

                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {product.category}
                </span>

                <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.title}
                </h3>

                <p className="text-lg font-bold text-teal-600">
                    ${product.price.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-3 flex gap-2">

                    <button
                        onClick={() => {
                            if (inCart) {
                                alert("Item already added to the cart");
                                return;
                            }
                            dispatch({ type: "ADD_TO_CART", payload: product });
                        }}
                        className={`flex-1 py-2 rounded-lg font-medium transition 
              ${inCart
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-teal-600 text-white hover:bg-teal-500"
                            }`}
                    >
                        {inCart ? "Added" : "Add to Cart"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;

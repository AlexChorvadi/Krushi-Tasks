const ProductModal = ({ dispatch, state }) => {
    const total = state.cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="p-4 flex flex-col h-full">

            {/* Empty State */}
            {state.cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-500">
                    <span className="text-4xl mb-2">🛒</span>
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    {/* Items */}
                    <ul className="flex-1 overflow-y-auto space-y-4 pr-1">

                        {state.cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                            >

                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-16 w-16 object-contain bg-white rounded-lg p-1"
                                />

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() =>
                                        dispatch({ type: "REMOVE_FROM_CART", payload: item })
                                    }
                                    className="text-red-500 hover:text-red-600 text-sm"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}

                    </ul>

                    {/* Footer */}
                    <div className="border-t pt-4 mt-4">

                        <div className="flex justify-between mb-3 text-sm text-gray-600">
                            <span>Total</span>
                            <span className="font-semibold text-black">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button className="w-full py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-500 transition">
                            Checkout
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default ProductModal;

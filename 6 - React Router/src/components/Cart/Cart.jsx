import { useCart } from "../../CartContext";

export default function Cart() {
  const { state, dispatch } = useCart();

  const total = state.cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const total_qty = state.cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const discountPR = 0.1;
  const discount = total * discountPR;
  const finalTotal = total - discount;

  return (
    <div className="min-h-screen bg-[#020617] py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Shopping Cart
          </h1>

          {state.cart.length === 0 ? (
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-10 text-center">
              <p className="text-gray-400 text-lg">Your cart is empty 🛒</p>
            </div>
          ) : (
            state.cart.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#0f172a] border border-white/10 rounded-2xl p-4 flex gap-4 items-center hover:border-indigo-500/40 transition-all shadow hover:shadow-indigo-500/20"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-xl"></div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-xl bg-[#020617] p-2"
                />

                <div className="flex-1 relative z-10">
                  <h2 className="font-semibold text-lg text-gray-100 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Quantity UI (still basic) */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        dispatch({ type: "DEC_QTY", payload: item })
                      }
                      className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20"
                    >
                      -
                    </button>

                    <span className="font-medium text-gray-200">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        dispatch({ type: "INC_QTY", payload: item })
                      }
                      className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>

                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-2 relative z-10">
                  <p className="font-semibold text-indigo-400">
                    {/* ${item.price.toFixed(2)} */}
                    ₹{(item.price * item.qty).toFixed(2)}

                  </p>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                    className="text-red-400 text-sm hover:text-red-500"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        {state.cart.length > 0 && (
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 h-fit sticky top-6 shadow hover:shadow-indigo-500/20 transition">

            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-400 mb-2">
              <span>Items</span>
              <span>{total_qty}</span>
            </div>

            <div className="flex justify-between text-gray-400 mb-4">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-green-400 mb-4">
              <span>Discount ({(discountPR * 100).toFixed(0)}%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between font-semibold text-lg text-gray-100">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-medium hover:scale-105 transition transform shadow-lg shadow-indigo-500/30">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

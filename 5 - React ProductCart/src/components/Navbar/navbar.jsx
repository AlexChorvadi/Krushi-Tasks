import { useState } from "react";

const Navbar = ({ state, onOpenModal, onOpenFavModal }) => {
  const favCount = state.fav.length;
  const cartCount = state.cart.length;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          <h1 className="text-lg font-bold text-teal-600">
            Krushi's Shop
          </h1>

          <div className="hidden md:flex items-center gap-4">

            <button
              onClick={onOpenFavModal}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
            >
              ❤️
              <span>Fav</span>
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full">
                  {favCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenModal}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition"
            >
              🛒
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-teal-600 text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">

            <button onClick={onOpenFavModal} className="relative flex items-center justify-between px-4 py-2 rounded-lg bg-pink-100 text-pink-600">
              <span>Favourite</span>
              <span className="bg-pink-500 text-white text-xs px-2 rounded-full">
                {favCount}
              </span>
            </button>

            <button
              onClick={onOpenModal}
              className="relative flex items-center justify-between px-4 py-2 rounded-lg bg-teal-600 text-white"
            >
              <span>Cart</span>
              <span className="bg-white text-teal-600 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            </button>

          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";

const Navbar = ({ onOpenModal, onOpenFavModal }) => {
  const { state } = useCart();
  const favCount = state.fav.length;
  const cartCount = state.cart.length;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#020617] border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* 🔥 Logo */}
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            Krushi's Store
          </h1>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">

            <Link to="/">
              <button className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition backdrop-blur">
                Home
              </button>
            </Link>

            {/* ❤️ Fav */}
            <button
              onClick={onOpenFavModal}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition backdrop-blur border border-pink-500/20"
            >
              <span className="text-lg">❤️</span>
              <span>Fav</span>

              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center bg-pink-500 text-white text-xs px-1.5 rounded-full shadow-lg shadow-pink-500/50">
                  {favCount}
                </span>
              )}
            </button>

            {/* 🛒 Cart */}
            <Link to="/cart">
              <button className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:scale-105 transition transform shadow-lg shadow-indigo-500/40">
                <span className="text-lg">🛒</span>
                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center bg-white text-indigo-600 text-xs px-1.5 rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 pb-4">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 text-gray-200 backdrop-blur">
                Home
              </button>
            </Link>

            <button
              onClick={() => {
                onOpenFavModal();
                setMenuOpen(false);
              }}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-pink-500/20 text-pink-400 backdrop-blur"
            >
              <span>❤️ Favourite</span>
              {favCount > 0 && (
                <span className="bg-pink-500 text-white text-xs px-2 rounded-full">
                  {favCount}
                </span>
              )}
            </button>

            <Link className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow" to="/cart" onClick={() => setMenuOpen(false)}>
              <button>
                <span>🛒 Cart </span>
                {cartCount > 0 && (
                  <span className="bg-white text-indigo-600 text-xs px-2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

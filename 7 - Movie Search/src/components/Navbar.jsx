import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMovies } from "../MovieContext.jsx";
import FavoritesDrawer from "./FavoritesDrawer"; // 1. Import the new component

export default function Navbar() {
  const { state, dispatch } = useMovies();
  const [query, setQuery] = useState("");
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 2. Add Drawer State


  const searchMovies = async () => {
    if (!query) return;

    dispatch({ type: "SET_LOADING", payload: true })
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          // alert(data.Error);
          dispatch({ type: "ADD_MOVIE", payload: [] })
          dispatch({ type: "SET_LOADING", payload: false })
          dispatch({ type: "SET_ERROR_MSG", payload: data.Error })
        }
        else {
          dispatch({ type: "ADD_MOVIE", payload: data.Search })
          dispatch({ type: "SET_LOADING", payload: false })
          dispatch({ type: "SET_ERROR_MSG", payload: null })
        }
        navigate(`/`);
      });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-cyan-500/20">
        {/* 1. Changed to flex-col for mobile, flex-row for medium screens (md:) */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">

          {/* 2. Grouped Logo and Home button to stay on the same line on mobile */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <h1
              className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate('/')}
            >
              🎬 NeonFlix
            </h1>

          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            {/* 4. The new Favorites Toggle Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-center p-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors"
              aria-label="Open Favorites"
            >
              <svg className="w-5 h-5 text-pink-500 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {/* Optional: Show a little badge with the count */}

              <span className="text-xs bg-pink-500 text-black px-1.5 py-0.5 rounded-full ml-1">
                {state.FavMovies?.length || 0}
              </span>

            </button>
          </div>
          <div>
            {/* 3. Search Bar takes full width (w-full) on mobile, and flex-1 on desktop */}
            <div className="flex w-full md:flex-1 max-w-xl bg-white/5 border border-cyan-400/20 rounded-full px-3 py-2 focus-within:border-pink-500 transition-colors">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies()}
                className="bg-transparent w-full outline-none text-white text-sm px-2"
              />
              <button
                onClick={searchMovies}
                className="ml-2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </nav>
      <FavoritesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
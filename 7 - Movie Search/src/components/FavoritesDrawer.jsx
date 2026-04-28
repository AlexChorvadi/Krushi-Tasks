import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from "../MovieContext.jsx";

const FavoritesDrawer = ({ isOpen, onClose }) => {
  const { state, dispatch } = useMovies();
  const navigate = useNavigate();

  // Assuming your reducer stores favorites in state.favorites
  // Adjust 'state.favorites' if you named the array differently in your Context
  const favorites = state.FavMovies || []; 

  const handleRemove = (e, movie) => {
    e.stopPropagation(); // Don't trigger the navigation click
    dispatch({ type: "REMOVE_FAV_MOVIE", payload: movie });
  };

  const handleNavigate = (imdbID) => {
    onClose(); // Close the drawer first
    navigate(`/Details/${imdbID}`);
  };

  return (
    <>
      {/* Dark Blurred Backdrop Overlay */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* The Slide-out Drawer */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] z-50 bg-[#0a0a0a]/95 border-l border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.1)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            My Favorites
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-3">
              <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p>No favorites yet.<br/>Go find some gems!</p>
            </div>
          ) : (
            favorites.map((movie) => (
              // Mini Card
              <div 
                key={movie.imdbID}
                onClick={() => handleNavigate(movie.imdbID)}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                {/* Tiny Poster */}
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/100x150?text=No+Poster'} 
                  alt={movie.Title}
                  className="w-14 h-20 object-cover rounded-md shadow-md"
                />
                
                {/* Title & Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{movie.Title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{movie.Year}</p>
                </div>

                {/* Remove Button (Appears on hover for desktop, always there on mobile) */}
                <button
                  onClick={(e) => handleRemove(e, movie)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
                  title="Remove from favorites"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesDrawer;
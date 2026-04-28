import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from "../MovieContext.jsx";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { state, dispatch } = useMovies();

  const {
    Title = 'Unknown Title',
    Type = 'movie',
    Poster = 'N/A',
    imdbID = null
  } = movie;

  const imageSource = Poster !== 'N/A'
    ? Poster
    : 'https://placehold.co/300x450?text=No+Poster+Available';

  useEffect(() => {
    if (state.FavMovies.some(favMovie => favMovie.imdbID === imdbID)) {
      setIsFavorite(true);
    }
    else {
      setIsFavorite(!true);
    }
  }, [state.FavMovies, imdbID]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();   // Stops the <Link> from navigating
    e.stopPropagation();  // Stops the event from bubbling up

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Using the new state directly ensures the correct action is dispatched
    if (newFavoriteState) {
      dispatch({ type: "ADD_FAV_MOVIE", payload: movie });
    } else {
      dispatch({ type: "REMOVE_FAV_MOVIE", payload: movie });
    }
  };

  return (
    // Merged the Link and Div wrapper to clean up the DOM
    <Link
      to={`/Details/${imdbID}`}
      className="group relative block w-full max-w-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-gray-900 cursor-pointer"
    >
      {/* Poster Image Container */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-800">
        <img
          src={imageSource}
          alt={`${Title} poster`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Favorite Button (Top Left) */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 left-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-colors z-20 focus:outline-none"
        aria-label="Toggle Favorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'text-red-500 scale-110' : 'text-white hover:text-red-400'
            }`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Glassmorphism Type Badge (Top Right) */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full z-10 pointer-events-none">
        <span className="text-xs font-semibold text-white uppercase tracking-widest">
          {Type}
        </span>
      </div>

      {/* Gradient Overlay for Text Readability - Slightly darker by default for mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>

      {/* Title & Hover Action Content */}
      {/* UPDATE: Added md: prefixes so it stays visible on mobile, and hides/animates only on desktop */}
      <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end pointer-events-none transition-transform duration-300 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 z-10">
        <h3 className="text-xl font-bold text-white leading-tight mb-1 line-clamp-2 drop-shadow-md">
          {Title}
        </h3>

        {/* UPDATE: Visible on mobile, hidden on md, visible on md hover */}
        <div className="mt-2 opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:opacity-100 flex items-center text-sm font-medium text-blue-400">
          View Details
          <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
import { useMovies } from "../MovieContext.jsx";

export default function Home() {
  const { state, dispatch } = useMovies();
  const { search, filter } = useParams();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const moviesPerPage = 10;
  const totalPages = Math.ceil(state.totalMovies / moviesPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let currentPage = state.currentPage || 1;
    setCurrentPage(currentPage);
    //alert(currentPage);
  }, [state.MoviesList]);

  useEffect(() => {

    if(search === undefined) {
      dispatch({ type: "ADD_MOVIE", payload: [] });
      dispatch({ type: "SET_TOTAL_MOVIES", payload: 0 });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });

    let apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;

    // Add type only if selected
    if (filter) {
      apiUrl += `&type=${filter}`;
    }

    fetch(
      `${apiUrl}&page=${currentPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          dispatch({ type: "ADD_MOVIE", payload: [] });
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_ERROR_MSG", payload: data.Error });
          dispatch({ type: "SET_TOTAL_MOVIES", payload: 0 });
        } else {
          dispatch({ type: "ADD_MOVIE", payload: data.Search });
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_ERROR_MSG", payload: null });
          dispatch({ type: "SET_TOTAL_MOVIES", payload: data.totalResults });
        }
        //navigate(`/${search}`);
      });
  }, [currentPage]);

  const currentMovies = state.MoviesList

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="pt-24 px-4 sm:px-6 md:px-10 pb-10">
        {/* Loading State */}
        {state.isLoading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Error State */}
        {state.errorMsg && !state.isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
              {state.errorMsg}
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-md">
              Try: Avatar, Batman, Interstellar...
            </p>
          </div>
        )}

        {/* Empty State */}
        {state.MoviesList.length === 0 &&
          !state.isLoading &&
          !state.errorMsg && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                Search for a movie
              </h1>

              <p className="text-base md:text-lg text-gray-400 max-w-md">
                Try: Avatar, Batman, Interstellar...
              </p>
            </div>
          )}

        {/* Grid */}
        {state.MoviesList.length > 0 && !state.isLoading && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {currentMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {/* Optimized Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                {/* Prev */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#111] border border-gray-700 hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Prev
                </button>

                {/* Current Page Text */}
                <div className="text-sm text-gray-400">Page</div>

                {/* Dropdown */}
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-pink-500 transition"
                >
                  {Array.from({ length: totalPages }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                {/* Total Pages */}
                <div className="text-sm text-gray-400">of {totalPages}</div>

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#111] border border-gray-700 hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

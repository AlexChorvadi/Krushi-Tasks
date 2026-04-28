import React from "react";
// Cleaned up unused imports (useState, Navbar, Route, API_KEY)
import MovieCard from "./MovieCard";
import { useMovies } from "../MovieContext.jsx";

export default function Home() {
    // You only need 'state' here unless you plan to use 'dispatch' later in this component
    const { state } = useMovies(); 

    return (
        <div className="bg-[#050505] min-h-screen text-white">

            <div className="pt-24 px-4 sm:px-6 md:px-10 pb-10">

                {/* Loading State */}
                {state.isLoading && (
                    // Changed from min-h-screen to min-h-[60vh] to avoid the double-scrollbar bug
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                    </div>
                )}

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
                {state.MoviesList.length === 0 && !state.isLoading && !state.errorMsg && (
                    // Used Flexbox to perfectly center this block vertically and horizontally
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        {/* Responsive text: smaller on mobile, larger on md+ */}
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
                    /* Responsive Grid: 
                       - Starts at 2 columns on mobile with a small gap (gap-4)
                       - Scales up to 6 columns on massive screens
                       - Gap scales up automatically (sm:gap-6, lg:gap-8)
                    */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
                        {state.MoviesList.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
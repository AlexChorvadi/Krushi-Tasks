import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from "../MovieContext.jsx";

const MovieDetails = ({ apiKey }) => {
  const { state, dispatch } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    // It's safer to use 'i=' for exact ID lookups rather than 't=' for titles
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
          setError(null);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, apiKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p className="text-xl text-red-400">{error || "Movie not found"}</p>
      </div>
    );
  }

  // Split genres string into an array for individual badges
  const genres = movie.Genre !== "N/A" ? movie.Genre.split(", ") : [];

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">

      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center blur-3xl scale-110"
        style={{ backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : 'https://placehold.co/300x450?text=No+Poster+Available'})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column: Poster */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
          <div className="w-full max-w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : 'https://placehold.co/300x450?text=No+Poster+Available'}
              alt={`${movie.Title} Poster`}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col space-y-6">

          {/* Header Area */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-300 font-medium">
              <span>{movie.Year}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span className="px-2 py-0.5 border border-gray-600 rounded-md text-xs tracking-wider">{movie.Rated}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span>{movie.Runtime}</span>
              {movie.totalSeasons && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                  <span>{movie.totalSeasons} {movie.totalSeasons === 1 ? "season" : "seasons"}</span>
                </>
              )}
            </div>
          </div>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-200"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Plot */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              {movie.Plot}
            </p>
          </div>

          {/* Cast & Crew Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Director</p>
              <p className="text-gray-100">{movie.Director}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Writers</p>
              <p className="text-gray-100">{movie.Writer}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Stars</p>
              <p className="text-gray-100">{movie.Actors}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Language</p>
              <p className="text-gray-100">{movie.Language}</p>
            </div>

          </div>

          {/* Ratings Section */}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="pt-6 mt-4">
              <div className="flex flex-wrap gap-4">
                {movie.Ratings.map((rating, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 min-w-[100px]">
                    <span className="text-lg font-bold text-white">{rating.Value}</span>
                    <span className="text-xs text-gray-400 text-center mt-1">
                      {rating.Source === "Internet Movie Database" ? "IMDb" : rating.Source}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
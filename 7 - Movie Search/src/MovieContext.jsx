import { createContext, useReducer, useContext } from "react";
export const MovieContext = createContext();

const initialState = {
    MoviesList: [],
    totalMovies: 0,
    currentPage: 1,
    isLoading: false,
    errorMsg: null,
    FavMovies:[],
    IMDBID:null
}

const MovieReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return {
                ...state,
                MoviesList: action.payload
            };
        case 'REMOVE_MOVIE':
            return {
                ...state,
                MoviesList: state.MoviesList.filter(movie => movie.imdbID !== action.payload.imdbID)
            };
        case 'ADD_FAV_MOVIE':
            return {
                ...state,
                FavMovies: [...state.FavMovies, action.payload]
            };
        case 'REMOVE_FAV_MOVIE':
            return {
                ...state,
                FavMovies: state.FavMovies.filter(movie => movie.imdbID !== action.payload.imdbID)
            };
        case 'SET_IMDB':
            return {
                ...state,
                IMDBID:action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading:action.payload
            };
        case 'SET_ERROR_MSG':
            return {
                ...state,
                errorMsg: action.payload
            };
        case 'SET_TOTAL_MOVIES':
            return {
                ...state,
                totalMovies: action.payload
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        default:
            return state;
    }
};

export function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);

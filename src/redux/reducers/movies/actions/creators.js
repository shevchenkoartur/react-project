import moviesActions from "./constants";

export const getMovies = (movies) => ({type: moviesActions.GET_MOVIES, payload: {movies}})
export const getMovie = (movie) => ({type: moviesActions.GET_MOVIE, payload: {movie}})
export const searchFilm = (movies) => ({type: moviesActions.SEARCH_FILM, payload: {movies}})
export const toggleLoader = () => ({type: moviesActions.TOGGLE_LOADER})
export const updatePagination = (totalPages, page) => ({
    type: moviesActions.UPDATE_PAGINATION,
    payload: {totalPages, page}
})
export const updateSearchInputValue = (newValue) => ({
    type: moviesActions.UPDATE_SEARCH_INPUT_VALUE,
    payload: {newValue}
})
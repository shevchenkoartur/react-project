import {fetchMovies} from "../../../../api/routes/movies";
import {getMovies, toggleLoader, updatePagination} from "../actions/creators";

const getMoviesAsync = (page) => {
    return (dispatch) => {
        dispatch(toggleLoader())
        fetchMovies(page)
            .then(response => {
                dispatch(updatePagination(response.data.total_pages, response.data.page))
                dispatch(getMovies(response.data.results))
                dispatch(toggleLoader())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default getMoviesAsync;
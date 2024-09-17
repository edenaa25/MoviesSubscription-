import { getAllMovies, editMovie , getMovieById } from '../Services/moviesService';

const fetchMovies =() => async (dispatch) => {
        try {
            const movies = await getAllMovies();
            dispatch({ type: 'LOAD_MOVIES', payload: movies });

        } catch (error) {
            console.error('Fetch movies failed:', error.message);
        }
}

 const fetchMovieById = (id) => async (dispatch) => {
    try {
        const result = await getMovieById(id);
        console.log(result)

        dispatch({ type: 'FETCH_MOVIE_SUCCESS', payload: result });
    } catch (error) {
        console.error('Fetch movie by ID failed:', error.message);
    }
};


const updateMovie = (id, updatedMovieData) => async (dispatch) => {
    try {
        const result = await editMovie(id, updatedMovieData);
        dispatch({ type: 'UPDATE_MOVIE_SUCCESS', payload: result });
        return result;
    } catch (error) {
        console.error('Update movie failed:', error.message);
        throw error; // rethrow error to handle it in the component
    }
};

const findMovies = (movies,movieString)=>{
    const moviesResult = movies.map(movie => movie.Name.toLowerCase() === movieString.toLowerCase())
    return moviesResult
}

export {fetchMovies , findMovies , updateMovie, fetchMovieById}
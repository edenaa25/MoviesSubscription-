const moviesRep = require("../repositories/moviesRepository");
const movieModel = require("../models/movieModel");
const subModel = require("../models/subscriptionModel");
const subService = require ("../services/subscriptionsService")

const saveMoviesToDB = async () => {
    try {
        const movieCount = await movieModel.countDocuments();
        if (movieCount === 0) {
            const { data: movies } = await moviesRep.getAllMovies();
            const moviesData = movies.map(movie => ({
                Name: movie.name,
                Genres: movie.genres,
                Image: movie.image.medium,
                Premiered: movie.premiered
            }));

            await movieModel.insertMany(moviesData);
            console.log('Movies initially loaded into DB');
        } 
        return "Movies processed in DB...";
    } catch (error) {
        console.error('Error processing movies in DB:', error);
        throw error;
    }
};

const getAllMovies =()=>{
    return movieModel.find({}, { __v: 0 });
}

const getMoviesWithSubscriptions = async()=>{
    const movies = await movieModel.find({})
    const movieDetails = await Promise.all(movies.map(async (movie) => {
        const subscriptions = await subService.allSubByMovieId(movie.id); // Fetch subscriptions
        return {
            ...movie,
            subscriptions // Attach subscriptions to the movie
        };
    }));
    return movieDetails;
}

const getMovieById = (id)=>{
    return movieModel.findById(id, { __v: 0 });
}

const updateMovie =async(id,newData)=>{
    await movieModel.findByIdAndUpdate(id,newData)
    return "Movie Updated..."
}


const deleteMovie = async (movieId) => {

    try {
        // Delete the movie from the movies collection
        await movieModel.findByIdAndDelete(movieId);

        // Remove the movie from the Movies list in the subscriptions collection
        await subModel.updateMany(
            { "Movies.movieId": movieId },
            { $pull: { Movies: { movieId: movieId } } },
            
        );

        return "Movie and related subscriptions deleted successfully" ;
    } catch (error) {
        console.error("Error deleting movie and related subscriptions:", error);
        throw error;
    }
};

const createMovie = async (movie) => {
    try {
        const newMovie = new movieModel({
            Name: movie.Name,
            Genres: movie.Genres,
            Image: movie.Image,
            Premiered: new Date(movie.Premiered) // Ensure the date is properly formatted
        });
        console.log(newMovie)

        await newMovie.save();
        return "Movie created successfully.";
    } catch (error) {
        console.error("Error saving movie:", error);
        throw new Error("Failed to create movie.");
    }
};


module.exports = {getMoviesWithSubscriptions, saveMoviesToDB , createMovie , deleteMovie, updateMovie, getMovieById, getAllMovies};

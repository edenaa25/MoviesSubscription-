import React, { useState , useEffect} from 'react';
import { fetchMovies } from '../../actions/moviesActions'
import { useNavigate  , useParams} from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import Movie from './Movie'

function Movies(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams() //just if navigate from subscriptions
    const permissions = useSelector(state => state.users.permissions)
    const movies = useSelector(state => state.movies.movies);
    const [moviesToShow,setMoviesToShow]=  useState([])
    const [movieSearch,setMovieSearch]=  useState("")
    const hasViewMoviesPermission = permissions.includes('View Movies')


    useEffect(()=>{
        if(hasViewMoviesPermission){
            dispatch(fetchMovies())
        }
     
    },[permissions,dispatch, hasViewMoviesPermission])

 

    useEffect(() => {
         if (id) {
            // If there's an ID in the URL, show only that movie
            const filteredMovie = movies.find(movie => movie._id === id);
            setMoviesToShow(filteredMovie ? [filteredMovie] : []);
        } else {
            // No search term or ID, show all movies
            setMoviesToShow(movies);
        }
    }, [movies, id]);
    
    if (!hasViewMoviesPermission) {
        return <p>You do not have permission to view movies.</p>;
    }

    const HandleMovieSearch =()=>{
        const matchMovies = movies.filter(movie => movie.Name.toLowerCase().includes(movieSearch.toLowerCase()))
        setMoviesToShow(matchMovies)
    }

    const allMovies = ()=>{
        setMoviesToShow(movies)
        setMovieSearch("")
    }

    return(
        <div>
            <h1>Movies</h1>
            <button onClick={allMovies}>All Movies</button>
            {
                permissions.includes("Create Movies") && <button onClick={()=>navigate('../movies/addMovie')}>Add Movie</button>

            }
            Find Movie: <input value={movieSearch} onChange={(e)=>setMovieSearch(e.target.value)}></input>
            <button onClick={HandleMovieSearch}>Find</button> <br/> <br/>
            
            {
                 moviesToShow.map(movie => {
                    return <Movie key={movie._id} movieData={movie} />
                })
            }
           

        </div>
    )
}


export default Movies;

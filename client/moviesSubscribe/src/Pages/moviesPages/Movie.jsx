import React , {memo } from 'react';
import MovieSubscriptions from './MovieSubscriptions'
import {checkPermission} from '../../actions/permissionsAcations'
import {deleteMovie} from '../../Services/moviesService'
import { fetchMovies } from '../../actions/moviesActions'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../../styles/Styles.css'


function Movie({movieData}){
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleDeleteMovie = async()=>{
        try{
            const result = await deleteMovie(movieData._id)
            console.log(result)
            dispatch(fetchMovies())
        }catch(error){
            console.error('Delete movie failed:', error.message);
        }
    }


    return(
        <div className='border padding width' >
                <h2>{movieData.Name}</h2>
                
                <div className='padding' >
                     <div >Geners: {movieData.Genres.join(', ')} </div> <br/>
                     <div className='rightLeftContainer'>
                        <div className='left'><img  src={movieData.Image} alt="movie img" height={200} width={160}></img></div>
                        <div className='right'><MovieSubscriptions movieId={movieData._id} /></div>
                    </div>
                </div>
                {
                    checkPermission("Update Movies") && <button onClick={()=>navigate(`../movies/editMovie/${movieData._id}`)}>Edit</button>
                }
                {
                    checkPermission("Delete Movies") && <button onClick={handleDeleteMovie}>Delete</button>
                }
                
        </div>
    )

}

export default memo(Movie)
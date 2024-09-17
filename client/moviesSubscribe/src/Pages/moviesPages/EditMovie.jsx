import React, { useState , useEffect} from 'react';
import {editMovie , getMovieById} from '../../Services/moviesService'
import {  useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


function EditMovie(){
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.permissions)
    const hasEditMoviesPermission = permissions.includes('Update Movies');
    const [movieData,setMovieData] = useState({ Name: '', Genres: '', Image: '' })
    const [movieName,setMovieName] = useState("")
    const [premieredDate, setPremieredDate] = useState("");
    const {id} = useParams()


    useEffect(()=>{
        console.log("edit movie page")
    })


    useEffect(()=>{
        const getMovieData = async()=>{
            try{
                console.log(id)
                const result = await getMovieById(id)
                setMovieData({...result})
                setMovieName(result.Name)

                // Convert the existing ISO date to dd/mm/yyyy format for display
                const date = new Date(result.Premiered);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                setPremieredDate(formattedDate);
            }catch(error){
                console.error('get movie by id failed:', error.message);
            }
        }
        getMovieData()
    },[id])


    const handleDateChange = (e) => {
        setPremieredDate(e.target.value);
    };

    const handleGenresChange = (e) => {
        const genresArray = e.target.value.split(',').map(genre => genre.trim());
        setMovieData({ ...movieData, Genres: genresArray });
    };

    const updateMovie = async (event) => {

        try {
            event.preventDefault();

            // Convert dd/mm/yyyy to ISO format
            const [day, month, year] = premieredDate.split('/');
            const isoDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();

            const updatedMovieData = { ...movieData, Premiered: isoDate };
            const result = await editMovie(id, updatedMovieData);
            console.log(result);
            alert(result.status);
        } catch (error) {
            alert(error.message)
            console.error('update movie failed:', error.message);
        }
    };

    if (!hasEditMoviesPermission) {
        return <p>You do not have permission to view movies.</p>;
    }

    return(
        <div className='margin padding width'>
           <h1>Edit Movie: {movieName?.Name}</h1>
           <form onSubmit={updateMovie} >
                <div className='formMargin'> Name: <input type="text" value={movieData?.Name || ""} onChange={(e)=>setMovieData({...movieData,Name:e.target.value})} /> </div>
                <div className='formMargin'>Genres: <input type="text" value={movieData?.Genres || ""} onChange={handleGenresChange} /> </div>
                <div className='formMargin'> Image URL: <input type="text" value={movieData?.Image || ""} onChange={(e)=>setMovieData({...movieData,Image:e.target.value})} /></div>
                <div className='formMargin'>Premiered: <input type="text" placeholder={premieredDate} onChange={handleDateChange} /> </div>
                <button type="submit">update</button> 
                <button type="button" onClick={() => navigate('/main/movies')}>cancle</button> 
           </form>
        </div>
    )

}

export default EditMovie
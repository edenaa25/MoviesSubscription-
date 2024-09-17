import axios from "axios"

const URL= "http://127.0.0.1:8001/movies"

const getAllMovies = async()=>{
    try {
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
          console.log(error)
        throw new Error(error.response?.data?.message || 'get movies failed');
      }
}

const getMovieById = async(movieId)=>{
    try {
        const response = await axios.get(`${URL}/${movieId}`);
        return response.data;
      } catch (error) {
          console.log(error)
        throw new Error(error.response?.data?.message || 'get movie by id failed');
      }
}


const getSubscriptionsByMovieId = async(movieId)=>{
    try{
        const response = await axios.get(`${URL}/subscriptions/${movieId}`)
        return response.data;
      } catch (error) {
          console.log(error)
        throw new Error(error.response?.data?.message || 'get Subscriptions By UserId failed');
      }
}


const addMovie = async(movieData)=>{
    try{
        const response = await axios.post(URL,movieData)
        return response.data;
      } catch (error) {
          console.log(error)
          throw new Error(error.response?.data?.message || 'add movie to server failed');
      }
}

const editMovie = async(movieId,movieData)=>{
    try{
        const response = await axios.put(`${URL}/${movieId}`,movieData)
        return response.data
    }catch(error){
        console.log(error)
          throw new Error(error.response?.data?.message || 'edit movie to server failed');
    }
}

const deleteMovie = async(movieId)=>{
    try{
        const response = await axios.delete(`${URL}/${movieId}`)
        return response.data
    }catch(error){
        console.log(error)
        throw new Error(error.response?.data?.message || 'delete movie to server failed');
    }
}

export {getMovieById,deleteMovie,editMovie,addMovie,getSubscriptionsByMovieId,getAllMovies}

import { getAllMembers } from '../Services/subscriptionsService';
import {getAllMovies} from '../Services/moviesService'


const fetchMembers =() => async (dispatch) => {
        try {
            const members = await getAllMembers();
            dispatch({ type: 'LOAD_MEMBERS', payload: members });

        } catch (error) {
            console.error('Fetch members failed:', error.message);
        }
}

const getMoviesNotWached = async(moviesWachedIds)=>{
    try {
        const allMovies = await getAllMovies();
        const moviesNotWached = allMovies.filter(movie=> !moviesWachedIds?.includes(movie._id))
        return moviesNotWached
    } catch (error) {
        console.error('getMoviesNotWached function failed:', error.message);
    }
}

const showDate = (dateString)=>{
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

const formatDateToServer = (dateString)=>{
    const [day, month, year] = dateString.split('/');

    // Create a new Date object (month is zero-based in JS)
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    // Get the formatted date in the server's format
    const serverFormattedDate = date.toISOString();

    return serverFormattedDate;
}

export {fetchMembers , getMoviesNotWached, showDate , formatDateToServer}
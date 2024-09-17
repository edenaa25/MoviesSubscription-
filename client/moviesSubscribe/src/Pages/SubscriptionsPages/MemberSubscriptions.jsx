import React, { useState , useEffect , memo} from 'react';
import {  Link  } from "react-router-dom";
import { useSelector } from 'react-redux';
import {getMemberSubsById} from '../../Services/subscriptionsService'
import {getMoviesNotWached,showDate , formatDateToServer} from '../../actions/subscriptionsActions'
import AddSubscriptionComp  from './addSubscription'

function MemberSubscriptions({memberId}){
   
    const permissions = useSelector(state => state.users.permissions)
    const [memberSubs,setMemberSubs] = useState()
    const [addSubscription , setAddSubscription]= useState(false)
    const [moviesToSubscribe , setMoviesToSubscribe] = useState() 
    const hasViewPermission = permissions.includes('View Subscriptions');
    const hasCreatePermission = permissions.includes('Create Subscriptions');

    const getUserSubs = async()=>{
        try{
            const res = await getMemberSubsById(memberId)
            setMemberSubs(res)
        }catch(error){
            console.error('get member sunbscriptions by id failed:', error.message);
        }           
    }

    useEffect(()=>{
        
        getUserSubs()
    },[memberId])

    useEffect(()=>{

            const getUserMoviesNotWached = async()=>{
                try{
                    const moviesWached = memberSubs?.map(sub => sub.movieId)
                    const moviesNotWached = await getMoviesNotWached(moviesWached)
                    setMoviesToSubscribe(moviesNotWached)
                }catch(error){
                    console.error('getUserMoviesNotWached function failed:', error.message);
                } 
               
            }
            getUserMoviesNotWached()
    },[memberSubs])


    return(
        <div className='border padding width'>
            <h2>Movies watched</h2>
            {
                hasCreatePermission &&
                <button onClick={()=>setAddSubscription(!addSubscription)}>Subscribe to new movie</button>

            }
            <br/>
            {
                addSubscription &&
                <AddSubscriptionComp memberId={memberId} movies={moviesToSubscribe} getUserSubsFunction={getUserSubs} />
            }
            <ul>
         

             {
                hasViewPermission &&
                memberSubs?.length > 0 ? 
                (
                    memberSubs?.map((sub,index) =>{
                        return <li key={index}>
                            <Link to={`/main/movies/${sub.movieId}`} >{sub.Name} </Link>
                            , {showDate(sub.date)}
                        </li>
                    })
                )
                
                : 
                (
                    <p>Member doesn't have any subscriptions yet</p>
                )
             }
            </ul>
            
        </div>
    )
}


export default memo(MemberSubscriptions)

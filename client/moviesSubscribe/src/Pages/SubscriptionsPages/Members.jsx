import React, { useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector ,useDispatch } from 'react-redux';
import { fetchMembers } from '../../actions/subscriptionsActions'
import Member from './Member'

function Members(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.permissions)
    const hasViewSubscriptionsPermission = permissions.includes('View Subscriptions');
    const members = useSelector(state => state.members.members);
    const {id}= useParams()

    useEffect(()=>{
        console.log("members page")
    })

    useEffect(()=>{
        if(hasViewSubscriptionsPermission){
            dispatch(fetchMembers())
        }
     
    },[permissions])


    if (!hasViewSubscriptionsPermission) {
        return <p>You do not have permission to view movies.</p>
    }


    const handleEditClick = (memberId) => {
        navigate(`/main/subscriptions/editMember/${memberId}`)
    }

    return(
        <div className='width' >

            {id ? (
                // If there's an ID in the URL, find and show the specific member
                members
                    .filter(member => member._id === id)
                    .map(member => (
                        <Member 
                            key={member._id} 
                            memberData={member} 
                            onEdit={() => handleEditClick(member._id)} 
                        />
                    ))
            ) : (
                // If there's no ID, show all members
                members.map(member => (
                    <Member 
                        key={member._id} 
                        memberData={member} 
                        onEdit={() => handleEditClick(member._id)} 
                    />
                ))
            )}
        </div>
    )
}


export default Members;

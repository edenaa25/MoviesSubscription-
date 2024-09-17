import React, { memo} from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import MemberSubscriptions from '../SubscriptionsPages/MemberSubscriptions'
import {deleteMember} from '../../Services/subscriptionsService'
import {fetchMembers} from '../../actions/subscriptionsActions'

function Member({memberData , onEdit}){
    const dispatch = useDispatch()
    const permissions = useSelector(state => state.users.permissions)
   
   

    const handleDeleteMember = async()=>{
        try{
            const result = await deleteMember(memberData._id)
            dispatch(fetchMembers())
            console.log(result)
            alert("Member deleted successfully")
        }catch(error){
            console.error('delete member failed:', error.message);
        }
    }

    return(
        <div className='border padding margin'>
            <h2>{memberData.Name}</h2>
            
            Email: {memberData.Email} <br />
            City: {memberData.City}  <br />
            <br />
            {
                permissions.includes("Update Subscriptions") &&
                <button onClick={onEdit}>Edit</button>
            }
            {
                permissions.includes("Delete Subscriptions") && <button onClick={handleDeleteMember}>Delete</button>
            }
            <br/> <br/>
            
            <MemberSubscriptions memberId={memberData._id} />

        </div>
    )
}


export default memo(Member)

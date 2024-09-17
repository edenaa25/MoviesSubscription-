import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector  } from 'react-redux';
import {addMember} from '../../Services/subscriptionsService'

function AddMember(){
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.permissions)
    const hasCreatePermission = permissions.includes('Create Subscriptions');
    const [newMemberData, setNewMemberData] = useState({Name:"",Email:"",City:""})


    if (!hasCreatePermission) {
        return <p>You do not have permission to create member.</p>;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    };

    const handleAddMember = async(e)=>{
        e.preventDefault()
        if(!newMemberData.Name || !newMemberData.Email || !newMemberData.City){
            alert('Please fill in the required fields: Name, Email, and City cannot be left empty.')
            return
        }
        if (!isValidEmail(newMemberData.Email)) {
            alert('Please enter a valid email address.')
            return
        }
        try{
            const result = await addMember(newMemberData)
            console.log(result)
            alert('Member added successfully')
            setNewMemberData({Name:"",Email:"",City:""})
        }catch(error){
            console.error('create member failed:', error.message)
        }
    }


    return(
        <div>
           <h2>Add new member</h2> 
           <form onSubmit={handleAddMember}>
                <div className='formMargin'>Name: <input type='text' value={newMemberData.Name} onChange={(e)=>setNewMemberData({...newMemberData,Name:e.target.value})} /></div>
                <div className='formMargin'> Email: <input type='text' value={newMemberData.Email} onChange={(e)=>setNewMemberData({...newMemberData,Email:e.target.value})} /></div>
                <div className='formMargin'> City: <input type='text' value={newMemberData.City}  onChange={(e)=>setNewMemberData({...newMemberData,City:e.target.value})} /></div>
                <button type='submit'>save</button>
                <button type='button' onClick={()=>navigate('../')}>cancel</button>
           </form>
        </div>
    )
}


export default AddMember;

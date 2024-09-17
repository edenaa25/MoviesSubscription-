import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {getMemberById , editMember} from '../../Services/subscriptionsService'


function EditMember(){
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.permissions)
    const hasEditPermission = permissions.includes('Update Subscriptions');
    const [memberData,setMemberData] = useState({})
    const {id} = useParams()


    useEffect(()=>{
        const getMemberData = async()=>{
            try{
                const result = await getMemberById(id)
                setMemberData({...result})
               
            }catch(error){
                console.error('get member by id failed:', error.message);
            }
        }
        getMemberData()
    },[id])

 


    const updateMember = async (event) => {
        event.preventDefault();
        try {
                      
            const result = await editMember(id, memberData);
            console.log(result);
            alert(result.status);
        } catch (error) {
            alert(error.message)
            console.error('update member failed:', error.message);
        }
    };

    if (!hasEditPermission) {
        return <p>You do not have permission to view movies.</p>;
    }

    return(
        <div>
           <h1>Edit Member: {memberData?.Name} </h1>
           <form onSubmit={updateMember}>
                <div className='formMargin'>Name: <input type="text" value={memberData?.Name || ""} onChange={(e)=>setMemberData({...memberData,Name:e.target.value})} /> </div>
                <div className='formMargin'>Email: <input type="text" value={memberData?.Email || ""}  onChange={(e)=>setMemberData({...memberData,Email:e.target.value})} /></div>
                <div className='formMargin'>City : <input type="text" value={memberData?.City || ""} onChange={(e)=>setMemberData({...memberData,City:e.target.value})} /> </div>
                <button type="submit">update</button> 
                <button type="button" onClick={() => navigate('../')}>cancle</button> 
           </form>
        </div>
    )

}

export default EditMember
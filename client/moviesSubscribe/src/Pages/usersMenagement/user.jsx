import React, { memo} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteUserInServer } from '../../Services/usersService';
import { fetchUsers } from '../../actions/usersActions'

function User({userData}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteUser = async()=>{
        try {
            const result = await deleteUserInServer(userData.Id)
            console.log(result)
            dispatch(fetchUsers())
        } catch (error) {
            console.error('Delete user failed:', error.message);
          }
          
    }

    const handleEditUser = () => {
        navigate('../users/editUser', { state: { user: userData } });
      };

    return(
        <div className='border width padding margin'>
            Name: {userData.Fname} {userData.Lname} <br/>
            User Name: {userData.UserName} <br/>
            Seassion time out (Minutes) : {userData.SessionTimeOut} <br/>
            Created date: {userData.CreatedDate}  <br/>
            Permissions: {userData.Permissions.join(', ')} <br/>
            <button onClick={()=>handleEditUser()}>Edit</button>  
            <button onClick={()=>handleDeleteUser()}>Delete</button>
        </div>
    )
}


export default memo(User);

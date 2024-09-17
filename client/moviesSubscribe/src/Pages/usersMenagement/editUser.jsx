import React, { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import {handlePermissionsChange} from '../../actions/usersActions'
import { fetchUsers } from '../../actions/usersActions'
import { useDispatch } from 'react-redux';
import {editUserInServer} from '../../Services/usersService'


function EditUser(){
    const location = useLocation();
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const { user } = location.state || {}; // Retrieve the user data from the state
    const [newUserData , setNewUserData] = useState({...user})

    const handleCheckboxChange = (e)=>{
        const updatePermissions = handlePermissionsChange(e,newUserData.Permissions)

        setNewUserData({...newUserData,Permissions:updatePermissions})
    }

    const saveChanges = async(e)=>{
        e.preventDefault()
        try{
            const res= await editUserInServer(user.Id,newUserData)
            console.log(res)
            dispatch(fetchUsers())
            navigate('/main/users')

        } catch (error) {
            console.error('Edit user failed:', error.message);
            alert('Edit user failed: '+ error.message)          }
    }

    return(
        <div>
        <h1>Users</h1>
        <h2>Edit User: {user?.Fname} {user?.Lname}</h2>
        {user ? (
          <div  className='margin padding border'>
            <form onSubmit={saveChanges}>
                First Name: <input value={newUserData.Fname} onChange={(e)=>setNewUserData({...newUserData, Fname:e.target.value})}></input> <br/>
                Last Name: <input value={newUserData.Lname} onChange={(e)=>setNewUserData({...newUserData, Lname:e.target.value})}></input> <br/>
                User Name: <input value={newUserData.UserName} onChange={(e)=>setNewUserData({...newUserData, UserName:e.target.value})}></input> <br/>
                Session Time Out: <input value={newUserData.SessionTimeOut} onChange={(e)=>setNewUserData({...newUserData, SessionTimeOut:e.target.value})}></input><br/>
                Creation date: {newUserData.CreatedDate} <br/>
                Permissions: <br/>
                <label><input type="checkbox" value="View Subscriptions" checked={newUserData.Permissions.includes('View Subscriptions')} onChange={handleCheckboxChange} />
                View Subscriptions</label> <br/>

                <label><input type="checkbox" value="Create Subscriptions" checked={newUserData.Permissions.includes('Create Subscriptions')} onChange={handleCheckboxChange} />
                Create Subscriptions</label> <br/>

                <label><input type="checkbox" value="Delete Subscriptions" checked={newUserData.Permissions.includes('Delete Subscriptions')} onChange={handleCheckboxChange} />
                Delete Subscriptions</label> <br/>

                <label><input type="checkbox" value="Update Subscriptions" checked={newUserData.Permissions.includes('Update Subscriptions')} onChange={handleCheckboxChange} />
                Update Subscriptions</label> <br/>

                <label><input type="checkbox" value="View Movies" checked={newUserData.Permissions.includes('View Movies')} onChange={handleCheckboxChange} />
                View Movies</label> <br/>

                <label><input type="checkbox" value="Create Movies" checked={newUserData.Permissions.includes('Create Movies')} onChange={handleCheckboxChange} />
                Create Movies</label> <br/>

               
                <label><input type="checkbox" value="Delete Movies" checked={newUserData.Permissions.includes('Delete Movies')} onChange={handleCheckboxChange} />
                Delete Movies</label> <br/>

                <label><input type="checkbox" value="Update Movies" checked={newUserData.Permissions.includes('Update Movies')} onChange={handleCheckboxChange} />
                Update Movies</label> <br/>  <br/>
                
                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate('/main/users')}>Cencel</button>
            </form>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    )
}


export default EditUser;

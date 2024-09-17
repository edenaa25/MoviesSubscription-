import  React, { useState , useEffect} from "react"
import {handlePermissionsChange} from '../../actions/usersActions'
import {addUserInServer} from '../../Services/usersService'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../actions/usersActions'

function AddUser(){
    const [newUserData , setNewUserData] = useState({Fname:"", Lname:"", SessionTimeOut:0 , Permissions:[], UserName:""})
    const navigate = useNavigate()
    const dispatch= useDispatch()

    const handleCheckboxChange = (e)=>{
        const updatePermissions = handlePermissionsChange(e,newUserData.Permissions)

        setNewUserData({...newUserData,Permissions:updatePermissions})
    }


    const addUserToDB = async(e)=>{
        e.preventDefault()
        if(!newUserData.UserName) return alert("username is a Mandatory field")
        try{
            await addUserInServer(newUserData)
            dispatch(fetchUsers())
            alert('add user success')
            navigate('/main/users')

        } catch (error) {
            alert('add user failed: '+ error.message)
        }
    }

    return (
        <div>
            <h1>Add New User</h1>
            <div className='margin padding border'>
            <form >
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
                
                <button type="submit" onClick={(e)=>addUserToDB(e)}>Add</button>
                <button type="button" onClick={() => navigate('/main/users')}>Cencel</button>
            </form>
          </div>
        </div>
    )
}


export default AddUser;

import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch } from 'react-redux';
import User from './user'
import { fetchUsers } from '../../actions/usersActions'

function Users(){
    const isAdmin = useSelector(state => state.users.isAdmin)
    const users = useSelector(state => state.users.users)
    const [showUsers, setShowUsers] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const getUsers= async() => {
        try{
            dispatch(fetchUsers())
        }catch(error) {
            console.error('Get users failed:', error.message);
            alert('Get users failed: ' + error.message)
        }
    }

    useEffect(() => {
        if (isAdmin) {
            getUsers();
        }
    }, [isAdmin]);
    

    return(
        <div>
            <h1>Users</h1>
            <button onClick={()=>setShowUsers(!showUsers)}>All Users</button>
            <button onClick={()=>navigate("../users/addUser")}>Add User</button>
            {
                showUsers? 
                <div>
                    {
                        users?.map(user => {
                            return <User key={user.Id} userData={user}></User>
                        })
                    }
                </div>

                :
                null
            }
        </div>
    )
}


export default Users;

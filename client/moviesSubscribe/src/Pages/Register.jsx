import React, { useState } from 'react';
import { newUser } from '../Services/authService'
import { useNavigate } from "react-router-dom";


function Register(){
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(!password) return alert("enter password")
        try{
            const res = await newUser(username, password)
           
            console.log('Registration successful:', res);
            alert( res.message);  

            navigate('/');  
        }catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            alert('Registration failed: ' + (error.response?.data?.message || error.message));
        }
        
    }

    return(
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit} >
                <div className='margin'>User name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> </div>
                <div className='margin'>Password: <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} /> </div>
                <button type="submit">Create</button> <br/>
            </form><br/>
            <button type="button" onClick={()=>navigate('/')}>login page</button>
        </div>
    )
}


export default Register;

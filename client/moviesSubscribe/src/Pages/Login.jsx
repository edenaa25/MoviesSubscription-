import React, { useState } from 'react';
import {login} from '../Services/authService'
import { useNavigate, Link} from "react-router-dom";
// import setupAxiosInterceptors from '../Services/axiosConfig'
import {setIsLoggingOut}  from '../Services/axiosConfig.js'



function Login(){
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(!password || !username) return alert("Enter user name and password")
        try{
            const res = await login(username, password)
            if (res.token) {
                sessionStorage.setItem('authToken', res.token);
            } else {
                throw new Error('Unexpected response format');
            }
                     
            setIsLoggingOut(false)
            console.log('Login successful');
            navigate('/main')

        }catch (error) {
            const errorMessage = error?.message || 'Login failed: Unexpected error occurred';
            alert(errorMessage);
        }
        
    }



    return(
        <div>
            <h1>Log in Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='margin'>User name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                <div className='margin'>Password: <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} /> </div>
                <button type="submit">Login</button> <br/>
            </form>
            <br/>
            New User? <Link to='/register' >Create Account</Link>
        </div>
    )
}


export default Login;

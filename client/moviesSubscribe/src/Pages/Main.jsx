import React, { useCallback, useEffect } from 'react';
import { useNavigate , Outlet} from "react-router-dom";
import '../styles/Styles.css'
import { useDispatch , useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import {setIsLoggingOut}  from '../Services/axiosConfig.js'

function Main(){
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = sessionStorage.getItem('name');
    const isAdmin = useSelector(state => state.users.isAdmin)
    
    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    useEffect(()=>{
      console.log("main page")

    })

    useEffect(() => {
      const getUserInfo = () => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode(token);
          return {
            id: decoded.id,
            name: decoded.name,
            permissions: decoded.permissions,
            isAdmin: decoded.isAdmin
          };
        }
        return null;
      };
  
      const userInfo = getUserInfo();
      if (userInfo) {
        sessionStorage.setItem('id', userInfo.id);
        sessionStorage.setItem('name', userInfo.name);
        console.log(userInfo.isAdmin)
        dispatch({ type: 'SET_USER', payload: { isAdmin: userInfo.isAdmin, permissions: userInfo.permissions } });
      }

    }, [dispatch]);

   

  const handleLogOut = ()=>{
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');

    setIsLoggingOut(true)

    dispatch({type: 'LOGOUT'})
    navigate('/');
  }


    return(
        <div>
          <h1 className='center'>Movies - Subscriptions Web Site</h1> 
          <h3 className='center'> welocome {name}</h3>
          
          <div className='center'>
              <button onClick={() => handleNavigate("movies")}>Movies</button>
              <button onClick={() => handleNavigate("subscriptions")}>Subscriptions</button>
              {
                    isAdmin?  <button onClick={() => handleNavigate("users")}>Users Management </button> : null
              }
              
              <button onClick={()=>handleLogOut()}>Logout</button>
          </div>
          
          <Outlet />
        </div>
    )
}


export default Main;

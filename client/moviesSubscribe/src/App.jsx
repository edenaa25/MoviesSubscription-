import { useEffect , useState} from 'react';
import * as React from 'react';
import {Routes, Route , useNavigate  } from 'react-router-dom'
import {setupAxiosInterceptors}  from './Services/axiosConfig.js'
import { useDispatch } from 'react-redux';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Main from './Pages/Main'
import Movies from './Pages/moviesPages/Movies'
import Users from './Pages/usersMenagement/usersPage'
import EditUser from './Pages/usersMenagement/editUser'
import AddUser from './Pages/usersMenagement/addUser'
import AdminRoute from './Pages/AdminRoute';
import EditMovie from './Pages/moviesPages/EditMovie'
import AddMovie from './Pages/moviesPages/AddMovie.jsx';
import Members from './Pages/SubscriptionsPages/Members.jsx'
import Subscriptions from './Pages/SubscriptionsPages/SubscriptionsPage.jsx'
import AddMember from './Pages/SubscriptionsPages/AddMember.jsx';
import EditMember from './Pages/SubscriptionsPages/EditMember.jsx' 

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [interceptorsConfigured, setInterceptorsConfigured] = useState(false);


  useEffect(()=>{
    console.log("app")
  })

  useEffect(() => {
    console.log("Setting up Axios interceptors");
    setupAxiosInterceptors(navigate, dispatch);
    setInterceptorsConfigured(true)
  }, []);



  if (!interceptorsConfigured) {
    return <div>Loading...</div>; // Display a loading state until interceptors are set up
  }

  return (
    <div style={{margin:"0px 5px"}}>
      <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/main' element={<Main />} >
                <Route path='movies' element={<Movies />} />
                <Route path='movies/:id' element={<Movies />} />
                <Route path='movies/editMovie/:id' element={<EditMovie />} />
                <Route path='movies/addMovie' element={<AddMovie />} />
                <Route element={<AdminRoute />}>
                    <Route path='users' element={<Users />} />
                    <Route path='users/editUser' element={<EditUser />} />
                    <Route path='users/addUser' element={<AddUser />} />
                </Route>
                <Route path='subscriptions' element={<Subscriptions />}>
                     <Route path='' element={<Members />} />
                     <Route path=':id' element={<Members />} />
                     <Route path='editMember/:id' element={<EditMember />} />
                     <Route path='addMember' element={<AddMember />} />
                </Route>

            </Route>
        </Routes>
    </div>
  )
}

export default App

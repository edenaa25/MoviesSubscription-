import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute(){
    const isAdmin = useSelector(state => state.users.isAdmin)

    console.log("AdminRoute - isAdmin:", isAdmin)

    if (isAdmin==="") {
        return <div>Loading...</div> // Wait for user info
      }

    return isAdmin ? <Outlet /> : <Navigate to="/main" />
}

export default AdminRoute
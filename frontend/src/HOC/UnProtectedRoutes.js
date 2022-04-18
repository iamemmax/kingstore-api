import React from "react";
import { Outlet, Navigate, useLocation} from "react-router-dom";

const UnProtectedRoutes = ({user}) => {
  
const location = useLocation()
console.log(user)
  return  !user ? <Outlet/> : <Navigate to="/" state={{from:location}} replace />
    
};

export default UnProtectedRoutes;

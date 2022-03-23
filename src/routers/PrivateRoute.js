import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../auth/AuthContext';

export const PrivateRoute = ({ isAuthenticated,children }) => {
  
  // const { user } = useContext( AuthContext )
  // const {pathname, search} = useLocation();

  return isAuthenticated
          ? children
          : <Navigate to="/auth/login" />       
  ;
}


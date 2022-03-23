import { useContext } from 'react'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({  isAuthenticated,children }) => {
  
  // const { user } = useContext( AuthContext )

  return isAuthenticated
          ? <Navigate to="/" replace />
          : children      
  ;
}

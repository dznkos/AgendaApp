import React,{ useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import JournalScreen from '../components/journal/JournalScreen'

import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import AuthRouter from './AuthRouter'
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async ( user )=> {
      // console.log(user);

      if ( user?.uid ) {        
        dispatch( login( user.uid, user.displayName ) );  
        setIsLoggedIn( true );

        const notes = await loadNotes( user.uid );
        dispatch( setNotes( notes ) )

      } else {
        setIsLoggedIn( false );
      }
      setChecking( false );

    });
    
  }, [dispatch, setChecking])


  if( checking ){
    return (
      <h1> Wait... </h1>
    )
  }
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/auth/*' element={ 
          <PublicRoute isAuthenticated={ isLoggedIn }>
            <AuthRouter/> 
          </PublicRoute>
        }/>
        <Route exact path='/' element={ 
          <PrivateRoute isAuthenticated={ isLoggedIn } >
            <JournalScreen/> 
          </PrivateRoute>
        }/>

        <Route
          path="*"
          element={ <Navigate to="/auth/login"/> }
        />
      
      </Routes>
    </BrowserRouter>
  )
}

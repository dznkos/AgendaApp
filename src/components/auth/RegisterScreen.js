import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {


  const dispatch = useDispatch();

  const state = useSelector( state => state );

  console.log(state);

  const [ formValues , handleInputChange ] = useForm({
    name: 'Ceres',
    email: 'ceres@gmail.com',
    password: '123456',
    password2: '123456'
  })

  const { name, email, password, password2 } = formValues

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
      dispatch( startRegisterWithEmailPasswordName( email, password, name) )
    }
  }

  const isFormValid = () => {

    if ( name.trim().length === 0 ) { 
      dispatch( setError('Name is required') )
      return false;      
    }
    else if ( !validator.isEmail( email )){
      dispatch( setError('Email is not valid') )
      return false;
    } 
    else if ( password !== password2 || password.length < 5 ){
      dispatch( setError('password debe tener minimo 6 caracteres') )     
      return false;
    }

    dispatch( removeError() )

    return true;
  }


  return (
    <>
      <h3 className='auth__title' >Register</h3>
      <form 
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={ handleRegister }
      >
        {/* { msgError &&
          (
          <div className='auth__alert-error'>  
          { msgError }          
          </div>
          )
        } */}
        <input 
          className='auth__input'
          type="text"
          placeholder='Name'
          name='name' 
          value={ name }
          onChange = { handleInputChange }
          autoComplete='off'
        />
        <input 
          className='auth__input'
          type="text"
          placeholder='Email'
          name='email' 
          value={ email }
          onChange = { handleInputChange }
          autoComplete='off'
        />
        <input 
          className='auth__input'
          type="password"
          placeholder='Password'
          name='password' 
          value={ password }
          onChange = { handleInputChange }
          autoComplete='off'
        />
        <input 
          className='auth__input'
          type="password"
          placeholder='Confirm Password'
          name='password2' 
          value={ password2 }
          onChange = { handleInputChange }
          autoComplete='off'
        />

        <button 
          type='submit' 
          className='btn btn-primary btn-block mb-5'
        >
          Register
        </button>
                
        <Link to='/auth/login' className='link'>
          Already registered?
        </Link>

      </form>


    </>
  )
}

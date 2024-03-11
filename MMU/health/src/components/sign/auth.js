import React from 'react'
import Login from './login'
import SignIn from './signIn'
import { NavLink } from 'react-router-dom';

function SignPage() {
  return (
    <div>
        <h1 className='text-3xl'>Hospitali Mkononi</h1>


  <div className='p-2 underline'>
    <NavLink to={Login}>
      Login
    </NavLink>{" "}
    or {" "}
    <NavLink to='/signin'>
      SignIn
    </NavLink>
    
  </div>
  <Login />
    
    </div>
    
  )
}

export default SignPage
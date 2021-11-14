import React, { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import '../css/auth.css';
import { useState } from 'react';

export default function Auth() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setSignup(false);
    } else if (window.innerWidth > 1000) {
      setSignup(true);
    }
  }, []);

  return (
    <div className='auth'>
      <h3
        onClick={() => {
          setLogin(true);
          setSignup(false);
        }}
        className='form__header auth__login__header'
        id={login ? 'active__header' : ''}
      >
        sign in
      </h3>
      {login ? <Login /> : ''}
      {/* <div className='auth__border'></div> */}
      <h3
        onClick={() => {
          setSignup(true);
          setLogin(false);
        }}
        className='form__header  auth__signup__header'
        id={signup ? 'active__header' : ''}
      >
        sign up
      </h3>
      {signup ? <Signup /> : ''}
    </div>
  );
}

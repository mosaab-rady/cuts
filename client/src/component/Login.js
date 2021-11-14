import React, { useContext } from 'react';
import { myContext } from '../Context';
import { loginFn } from '../js/authentication';

export default function Login() {
  const { dispatch } = useContext(myContext);

  return (
    <div className='login'>
      <form className='form' onSubmit={(e) => loginFn(e, dispatch)}>
        <div className='form__group'>
          <label htmlFor='email' className='form__group__label'>
            email
          </label>
          <input
            className='form__group__in'
            type='email'
            name='email'
            placeholder='email'
            required
          />
        </div>
        <div className='form__group'>
          <label htmlFor='password' className='form__group__label'>
            password
          </label>
          <input
            type='password'
            className='form__group__in'
            name='password'
            placeholder='password'
            required
            minLength='8'
          />
        </div>
        <div className='err--div' id='login--err'></div>
        <button className='form__btn'>sign in</button>
      </form>
    </div>
  );
}

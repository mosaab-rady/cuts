import { request } from './axios';

export const signup = async (e, dispatch) => {
  e.preventDefault();

  const errDiv = document.getElementById('signup--err');

  const res = await request('POST', '/api/v1/users/signup', {
    name: e.target.firstname.value + ' ' + e.target.lastname.value,
    email: e.target.email.value,
    password: e.target.password.value,
  });

  if (res) {
    if (res.data.status === 'success') {
      dispatch({ type: 'LOG_IN', payload: res.data.data.user });
    } else if (res.data.status === 'fail' || res.data.status === 'error') {
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const loginFn = async (e, dispatch) => {
  e.preventDefault();

  const errDiv = document.getElementById('login--err');

  const res = await request('POST', '/api/v1/users/login', {
    email: e.target.email.value,
    password: e.target.password.value,
  });

  if (res) {
    if (res.data.status === 'success') {
      dispatch({ type: 'LOG_IN', payload: res.data.data.user });
    } else if (res.data.status === 'fail' || res.data.status === 'error') {
      errDiv.insertAdjacentHTML(
        'afterbegin',
        `<h4 class='err--div__h4' >the following error occur :<li> ${res.data.message}</li> </h4>`
      );
    }
  }
};

export const logout = async (dispatch) => {
  const res = await request('GET', '/api/v1/users/logout');
  if (res) {
    if (res.data.status === 'success') {
      setTimeout(() => dispatch({ type: 'LOG_OUT' }), 1500);
    }
  }
};

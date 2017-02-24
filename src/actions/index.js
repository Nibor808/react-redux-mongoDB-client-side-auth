import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  // for reduxThnk we can return a function instead of an action object
  return function(dispatch) {
    //submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if request is good...
        // update state to indicate user is authenticated with dispatch({action})
        dispatch({ type: AUTH_USER });

        // save JWT token in LocalStorage (browser storage) with a key and the data
        localStorage.setItem('token', response.data.token);

        // redirect to protected route
        browserHistory.push('/feature');
      })
      .catch(() => {
         // if request is bad...
        // show error
        dispatch(authError('Bad Login info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error))
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

// fetch data returned from server root url
// include JWT in the headers
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
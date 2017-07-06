import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';

export function signinUser({email, password}, callback) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(() => {
        dispatch(authError('Bad login info!'));
      });
  };
}

export function signupUser({email, password}, callback) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(error => {
        dispatch(authError(error.message));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
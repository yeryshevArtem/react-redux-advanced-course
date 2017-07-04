import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3090';
const history = createHistory();

import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from './types';

export function signinUser({email, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem('token', response.data.token);
        history.push('/feature');
      })
      .catch(() => {
        
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}